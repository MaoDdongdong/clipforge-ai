import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { createTaskSchema } from "@/lib/validations/task";
import { TASK_COST_CREDITS } from "@/lib/constants";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const adminParam = searchParams.get("admin");

    // Check if admin query is requested and user is admin
    if (adminParam === "true" && session.user.role === "ADMIN") {
      const tasks = await db.videoTask.findMany({
        include: { user: { select: { email: true, name: true } } },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(tasks);
    }

    // Regular user - only their own tasks
    const tasks = await db.videoTask.findMany({
      where: { userId: session.user.id },
      include: { scenes: { orderBy: { sceneIndex: "asc" } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = createTaskSchema.parse(body);

    // Check credits
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || user.credits < TASK_COST_CREDITS) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 400 }
      );
    }

    // Create task and deduct credits in a transaction
    const task = await db.$transaction(async (tx) => {
      // Deduct credits
      await tx.user.update({
        where: { id: session.user.id },
        data: { credits: { decrement: TASK_COST_CREDITS } },
      });

      // Create credit transaction
      await tx.creditTransaction.create({
        data: {
          userId: session.user.id,
          amount: -TASK_COST_CREDITS,
          type: "TASK_CREATION",
          description: `Task creation: ${validated.title || "Untitled Project"}`,
        },
      });

      // Create task
      return tx.videoTask.create({
        data: {
          userId: session.user.id,
          title: validated.title || "Untitled Project",
          originalText: validated.originalText,
          category: validated.category,
          inputLanguage: validated.inputLanguage,
          outputLanguage: validated.outputLanguage,
          subtitleLanguage: validated.subtitleLanguage,
          secondarySubtitleLanguage: validated.secondarySubtitleLanguage,
          bilingualSubtitles: validated.bilingualSubtitles,
          aspectRatio: validated.aspectRatio,
          visualStyle: validated.visualStyle,
          voiceId: validated.voiceId,
          duration: validated.duration,
          generationMode: validated.generationMode,
          status: "PENDING",
          progress: 0,
        },
      });
    });

    return NextResponse.json(task);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}