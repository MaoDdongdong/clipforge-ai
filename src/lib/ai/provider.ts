export type SupportedLanguage = "auto" | "en-US" | "zh-CN";

export interface DetectedLanguageResult {
  language: "zh-CN" | "en-US" | "mixed" | "unknown";
  confidence: number;
}

export interface RewriteScriptParams {
  originalText: string;
  inputLanguage: SupportedLanguage;
  outputLanguage: SupportedLanguage;
  category: string;
  duration: number;
  tone?: string;
}

export interface RewriteScriptResult {
  rewrittenText: string;
  hook: string;
  publishTitle: string;
  publishDescription: string;
  hashtags: string[];
}

export interface StoryboardScene {
  sceneIndex: number;
  voiceover: string;
  subtitle: string;
  secondarySubtitle?: string;
  visualDescription: string;
  imagePrompt: string;
  negativePrompt?: string;
  duration: number;
  cameraMotion?: string;
  transition?: string;
}

export interface GenerateStoryboardParams {
  rewrittenText: string;
  outputLanguage: SupportedLanguage;
  visualStyle: string;
  aspectRatio: string;
  duration: number;
  bilingualSubtitles?: boolean;
  secondarySubtitleLanguage?: SupportedLanguage;
}

export interface GenerateStoryboardResult {
  scenes: StoryboardScene[];
}

export interface AIProvider {
  detectLanguage(input: string): Promise<DetectedLanguageResult>;
  rewriteScript(params: RewriteScriptParams): Promise<RewriteScriptResult>;
  generateStoryboard(params: GenerateStoryboardParams): Promise<GenerateStoryboardResult>;
}