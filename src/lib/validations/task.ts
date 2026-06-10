import { z } from "zod";
import { CATEGORIES, VISUAL_STYLES, LANGUAGES, ASPECT_RATIOS, DURATIONS, GENERATION_MODES } from "../constants";

export const createTaskSchema = z.object({
  title: z.string().max(120).optional().default("Untitled Project"),
  originalText: z.string().min(20).max(20000),
  category: z.enum(CATEGORIES.map((c) => c.value) as [string, ...string[]]),
  inputLanguage: z.enum(LANGUAGES.map((l) => l.value) as [string, ...string[]]).default("auto"),
  outputLanguage: z.string().default("en-US"),
  subtitleLanguage: z.string().optional(),
  secondarySubtitleLanguage: z.string().optional(),
  bilingualSubtitles: z.boolean().default(false),
  aspectRatio: z.enum(ASPECT_RATIOS.map((a) => a.value) as [string, ...string[]]).default("9:16"),
  visualStyle: z.enum(VISUAL_STYLES.map((v) => v.value) as [string, ...string[]]).default("cinematic"),
  voiceId: z.string().default("en_calm_narrator"),
  duration: z.enum(DURATIONS.map((d) => String(d.value)) as [string, ...string[]]).transform((val) => parseInt(val)).default(60),
  generationMode: z.enum(GENERATION_MODES.map((g) => g.value) as [string, ...string[]]).default("standard"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;