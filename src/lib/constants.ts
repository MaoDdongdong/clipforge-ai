export const CATEGORIES = [
  { value: "storytelling", labelEn: "Storytelling", labelZh: "故事叙事" },
  { value: "education", labelEn: "Education", labelZh: "知识科普" },
  { value: "history", labelEn: "History", labelZh: "历史人文" },
  { value: "health", labelEn: "Health", labelZh: "健康科普" },
  { value: "business", labelEn: "Business", labelZh: "商业财经" },
  { value: "product", labelEn: "Product Demo", labelZh: "产品种草" },
  { value: "motivation", labelEn: "Motivation", labelZh: "励志成长" },
  { value: "news", labelEn: "News Commentary", labelZh: "热点解读" },
] as const;

export const VISUAL_STYLES = [
  { value: "cinematic", labelEn: "Cinematic", labelZh: "电影质感" },
  { value: "realistic", labelEn: "Realistic", labelZh: "写实摄影" },
  { value: "documentary", labelEn: "Documentary", labelZh: "纪录片风格" },
  { value: "watercolor", labelEn: "Watercolor", labelZh: "水彩治愈" },
  { value: "oil_painting", labelEn: "Oil Painting", labelZh: "油画风格" },
  { value: "anime", labelEn: "Anime Illustration", labelZh: "动漫插画" },
  { value: "3d", labelEn: "3D Animation", labelZh: "3D 动画" },
  { value: "ink_wash", labelEn: "Chinese Ink Wash", labelZh: "中国水墨" },
  { value: "commercial", labelEn: "Commercial", labelZh: "商业广告" },
] as const;

export const LANGUAGES = [
  { value: "auto", labelEn: "Auto Detect", labelZh: "自动检测" },
  { value: "en-US", labelEn: "English", labelZh: "英文" },
  { value: "zh-CN", labelEn: "Simplified Chinese", labelZh: "简体中文" },
] as const;

export const OUTPUT_LANGUAGES = [
  { value: "en-US", labelEn: "English", labelZh: "英文" },
  { value: "zh-CN", labelEn: "Simplified Chinese", labelZh: "简体中文" },
] as const;

export const ASPECT_RATIOS = [
  { value: "9:16", labelEn: "9:16 (Portrait)", labelZh: "9:16 (竖屏)" },
  { value: "16:9", labelEn: "16:9 (Landscape)", labelZh: "16:9 (横屏)" },
  { value: "1:1", labelEn: "1:1 (Square)", labelZh: "1:1 (方形)" },
] as const;

export const DURATIONS = [
  { value: 30, labelEn: "30 seconds", labelZh: "30 秒" },
  { value: 60, labelEn: "60 seconds", labelZh: "60 秒" },
  { value: 90, labelEn: "90 seconds", labelZh: "90 秒" },
  { value: 180, labelEn: "180 seconds", labelZh: "180 秒" },
] as const;

export const GENERATION_MODES = [
  { value: "fast", labelEn: "Fast", labelZh: "快速" },
  { value: "standard", labelEn: "Standard", labelZh: "标准" },
  { value: "advanced", labelEn: "Advanced", labelZh: "高级" },
] as const;

export const TASK_STATUSES = [
  { value: "PENDING", labelEn: "Pending", labelZh: "待处理" },
  { value: "REWRITING", labelEn: "Rewriting", labelZh: "文案改写中" },
  { value: "STORYBOARDING", labelEn: "Storyboarding", labelZh: "分镜生成中" },
  { value: "GENERATING_ASSETS", labelEn: "Generating Assets", labelZh: "素材生成中" },
  { value: "VOICEOVER", labelEn: "Voiceover", labelZh: "配音处理中" },
  { value: "SUBTITLES", labelEn: "Subtitles", labelZh: "字幕生成中" },
  { value: "COMPOSING", labelEn: "Composing", labelZh: "视频合成中" },
  { value: "COMPLETED", labelEn: "Completed", labelZh: "已完成" },
  { value: "FAILED", labelEn: "Failed", labelZh: "失败" },
] as const;

export const PLAN_TYPES = [
  { value: "FREE", labelEn: "Free", labelZh: "免费版" },
  { value: "CREATOR", labelEn: "Creator", labelZh: "创作者版" },
  { value: "PRO", labelEn: "Pro", labelZh: "专业版" },
  { value: "ENTERPRISE", labelEn: "Enterprise", labelZh: "企业版" },
] as const;

export const CREDIT_PACKAGES = [
  { credits: 100, price: 0, labelEn: "Free Plan", labelZh: "免费版" },
  { credits: 2000, price: 19, labelEn: "Creator Plan", labelZh: "创作者版" },
  { credits: 8000, price: 49, labelEn: "Pro Plan", labelZh: "专业版" },
  { credits: -1, price: -1, labelEn: "Enterprise", labelZh: "企业版" },
] as const;

export const TASK_COST_CREDITS = 10;

export const DEFAULT_VOICE_ID = "en_calm_narrator";