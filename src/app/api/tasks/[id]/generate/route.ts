import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getAIProvider } from "@/lib/ai/get-provider";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const task = await db.videoTask.findUnique({
      where: { id },
      include: { scenes: true },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Check ownership
    if (task.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Check if task is in valid state for generation
    if (task.status !== "PENDING" && task.status !== "FAILED") {
      return NextResponse.json(
        { error: "Task cannot be generated in current state" },
        { status: 400 }
      );
    }

    const provider = getAIProvider();

    // Step 1: REWRITING
    await db.videoTask.update({
      where: { id },
      data: { status: "REWRITING", progress: 15 },
    });

    let rewrittenText = "";
    let publishTitle = "";
    let publishDescription = "";
    let hashtags: string[] = [];

    try {
      const rewriteResult = await provider.rewriteScript({
        originalText: task.originalText,
        inputLanguage: task.inputLanguage as "auto" | "en-US" | "zh-CN",
        outputLanguage: task.outputLanguage as "auto" | "en-US" | "zh-CN",
        category: task.category,
        duration: task.duration,
      });

      rewrittenText = rewriteResult.rewrittenText;
      publishTitle = rewriteResult.publishTitle;
      publishDescription = rewriteResult.publishDescription;
      hashtags = rewriteResult.hashtags;
    } catch (error) {
      await db.videoTask.update({
        where: { id },
        data: { status: "FAILED", errorMessage: "Script rewriting failed" },
      });
      return NextResponse.json(
        { error: "Script rewriting failed" },
        { status: 500 }
      );
    }

    // Step 2: STORYBOARDING
    await db.videoTask.update({
      where: { id },
      data: {
        status: "STORYBOARDING",
        progress: 40,
        rewrittenText,
        publishTitle,
        publishDescription,
        hashtags,
      },
    });

    let scenes: Awaited<ReturnType<typeof provider.generateStoryboard>>["scenes"] = [];

    try {
      const storyboardResult = await provider.generateStoryboard({
        rewrittenText,
        outputLanguage: task.outputLanguage as "auto" | "en-US" | "zh-CN",
        visualStyle: task.visualStyle,
        aspectRatio: task.aspectRatio,
        duration: task.duration,
        bilingualSubtitles: task.bilingualSubtitles,
        secondarySubtitleLanguage: task.secondarySubtitleLanguage as "auto" | "en-US" | "zh-CN",
      });

      scenes = storyboardResult.scenes;
    } catch (error) {
      await db.videoTask.update({
        where: { id },
        data: { status: "FAILED", errorMessage: "Storyboard generation failed" },
      });
      return NextResponse.json(
        { error: "Storyboard generation failed" },
        { status: 500 }
      );
    }

    // Delete old scenes and create new ones
    await db.videoScene.deleteMany({ where: { taskId: id } });

    await db.$transaction(
      scenes.map((scene, index) =>
        db.videoScene.create({
          data: {
            taskId: id,
            sceneIndex: scene.sceneIndex,
            voiceover: scene.voiceover,
            subtitle: scene.subtitle,
            secondarySubtitle: scene.secondarySubtitle,
            visualDescription: scene.visualDescription,
            imagePrompt: scene.imagePrompt,
            negativePrompt: scene.negativePrompt,
            imageUrl: "/placeholder/image-placeholder.svg",
            duration: scene.duration,
            cameraMotion: scene.cameraMotion,
            transition: scene.transition,
          },
        })
      )
    );

    // Step 3: GENERATING_ASSETS
    await db.videoTask.update({
      where: { id },
      data: { status: "GENERATING_ASSETS", progress: 65 },
    });

    // Step 4: VOICEOVER
    await db.videoTask.update({
      where: { id },
      data: { status: "VOICEOVER", progress: 75 },
    });

    // Step 5: SUBTITLES
    await db.videoTask.update({
      where: { id },
      data: { status: "SUBTITLES", progress: 85 },
    });

    // Step 6: COMPOSING
    await db.videoTask.update({
      where: { id },
      data: {
        status: "COMPOSING",
        progress: 95,
        outputVideoUrl: "/placeholder/video-preview.svg",
        coverUrl: "/placeholder/image-placeholder.svg",
      },
    });

    // Step 7: COMPLETED
    await db.videoTask.update({
      where: { id },
      data: { status: "COMPLETED", progress: 100 },
    });

    const updatedTask = await db.videoTask.findUnique({
      where: { id },
      include: { scenes: { orderBy: { sceneIndex: "asc" } } },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    await db.videoTask.update({
      where: { id: (await params).id },
      data: { status: "FAILED", errorMessage: "Generation failed" },
    });
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}