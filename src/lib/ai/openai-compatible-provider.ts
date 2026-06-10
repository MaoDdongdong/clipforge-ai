import {
  AIProvider,
  SupportedLanguage,
  DetectedLanguageResult,
  RewriteScriptParams,
  RewriteScriptResult,
  GenerateStoryboardParams,
  GenerateStoryboardResult,
} from "./provider";
import { MockAIProvider } from "./mock-provider";

export class OpenAICompatibleProvider implements AIProvider {
  private baseUrl: string;
  private apiKey: string;
  private model: string;
  private mockProvider: MockAIProvider;

  constructor() {
    this.baseUrl = process.env.OPENAI_COMPATIBLE_BASE_URL || "";
    this.apiKey = process.env.OPENAI_COMPATIBLE_API_KEY || "";
    this.model = process.env.OPENAI_COMPATIBLE_MODEL || "gpt-4";
    this.mockProvider = new MockAIProvider();
  }

  async detectLanguage(input: string): Promise<DetectedLanguageResult> {
    try {
      const response = await this.callAPI("/chat/completions", {
        messages: [
          {
            role: "user",
            content: `Detect the language of this text and respond with JSON: {"language": "en-US" | "zh-CN" | "mixed" | "unknown", "confidence": number}. Text: ${input.substring(0, 500)}`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const parsed = JSON.parse(response);
      return {
        language: parsed.language,
        confidence: parsed.confidence,
      };
    } catch {
      return this.mockProvider.detectLanguage(input);
    }
  }

  async rewriteScript(params: RewriteScriptParams): Promise<RewriteScriptResult> {
    try {
      const isEnglish = params.outputLanguage === "en-US";
      const systemPrompt = isEnglish
        ? "You are a professional short video script writer for English content."
        : "You are a professional short video script writer for Chinese content.";

      const response = await this.callAPI("/chat/completions", {
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Rewrite this script for a ${params.duration} second short video in ${params.category} category. Return JSON with fields: rewrittenText, hook, publishTitle, publishDescription, hashtags (array of4 hashtags).

Original script: ${params.originalText}

Output language: ${params.outputLanguage}`,
          },
        ],
        response_format: { type: "json_object" },
      });

      return JSON.parse(response);
    } catch {
      return this.mockProvider.rewriteScript(params);
    }
  }

  async generateStoryboard(params: GenerateStoryboardParams): Promise<GenerateStoryboardResult> {
    try {
      const isEnglish = params.outputLanguage === "en-US";
      const sceneCount = this.getSceneCount(params.duration);

      const response = await this.callAPI("/chat/completions", {
        messages: [
          {
            role: "system",
            content: isEnglish
              ? "You are a professional storyboard writer for short videos. Return valid JSON array of scenes."
              : "你是一位专业的短视频分镜编剧。返回有效的JSON场景数组。",
          },
          {
            role: "user",
            content: `Generate a storyboard with ${sceneCount} scenes for a ${params.duration} second video.
Output language: ${params.outputLanguage}
Visual style: ${params.visualStyle}
Aspect ratio: ${params.aspectRatio}
${params.bilingualSubtitles ? `Also include secondarySubtitle in ${params.secondarySubtitleLanguage} language.` : ""}

Rewritten script:
${params.rewrittenText}

Return JSON with scenes array, each scene has: sceneIndex, voiceover, subtitle, secondarySubtitle (optional), visualDescription, imagePrompt, negativePrompt, duration, cameraMotion, transition`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const parsed = JSON.parse(response);
      return {
        scenes: parsed.scenes || [],
      };
    } catch {
      return this.mockProvider.generateStoryboard(params);
    }
  }

  private async callAPI(endpoint: string, body: Record<string, unknown>): Promise<string> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        ...body,
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "{}";
  }

  private getSceneCount(duration: number): number {
    switch (duration) {
      case 30:
        return 6;
      case 60:
        return 8;
      case 90:
        return 10;
      case 180:
        return 12;
      default:
        return 8;
    }
  }
}