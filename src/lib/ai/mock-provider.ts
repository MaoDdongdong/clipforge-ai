import {
  AIProvider,
  SupportedLanguage,
  DetectedLanguageResult,
  RewriteScriptParams,
  RewriteScriptResult,
  GenerateStoryboardParams,
  GenerateStoryboardResult,
  StoryboardScene,
} from "./provider";

export class MockAIProvider implements AIProvider {
  async detectLanguage(input: string): Promise<DetectedLanguageResult> {
    const chineseChars = /[一-龥]/.test(input);
    const englishWords = /[a-zA-Z]+/.test(input);

    if (chineseChars && englishWords) {
      return { language: "mixed", confidence: 0.8 };
    } else if (chineseChars) {
      return { language: "zh-CN", confidence: 0.95 };
    } else if (englishWords) {
      return { language: "en-US", confidence: 0.95 };
    }
    return { language: "unknown", confidence: 0 };
  }

  async rewriteScript(params: RewriteScriptParams): Promise<RewriteScriptResult> {
    const { originalText, outputLanguage, category, duration } = params;

    // Generate mock rewritten text based on output language
    const isEnglish = outputLanguage === "en-US";

    const hookOptionsEn = [
      "What if I told you",
      "Here's the thing nobody talks about",
      "This changed everything for me when",
      "The secret nobody wants you to know",
      "Here's why most people fail at",
    ];

    const hookOptionsZh = [
      "你可能不知道的是",
      "其实真相是",
      "很多人忽略了一个关键点",
      "今天我要揭秘一个",
      "你绝对想不到的是",
    ];

    const hooks = isEnglish ? hookOptionsEn : hookOptionsZh;
    const randomHook = hooks[Math.floor(Math.random() * hooks.length)];

    // Generate rewritten script
    let rewrittenText = isEnglish
      ? this.generateEnglishScript(originalText, category, duration, randomHook)
      : this.generateChineseScript(originalText, category, duration, randomHook);

    // Generate publish assets
    const topicWords = this.extractTopic(originalText);
    const publishTitle = isEnglish
      ? this.generateEnglishTitle(topicWords)
      : this.generateChineseTitle(topicWords);

    const publishDescription = isEnglish
      ? `Discover the truth about ${topicWords}. This game-changing content will transform how you think.`
      : `揭示关于${topicWords}的真相，这将改变你的认知。`;

    const hashtags = isEnglish
      ? [`#${topicWords.replace(/\s+/g, '')}`, "#viral", "#trending", "#mustwatch"]
      : [`#${topicWords}`, "#热门", "#必看", "#科普"];

    return {
      rewrittenText,
      hook: randomHook,
      publishTitle,
      publishDescription,
      hashtags,
    };
  }

  async generateStoryboard(params: GenerateStoryboardParams): Promise<GenerateStoryboardResult> {
    const { outputLanguage, visualStyle, aspectRatio, duration, bilingualSubtitles } = params;

    const isEnglish = outputLanguage === "en-US";
    const sceneCount = this.getSceneCount(duration);
    const scenes: StoryboardScene[] = [];

    const cameraMotions = [
      "slow pan",
      "static shot",
      "zoom in",
      "tracking shot",
      "tilt up",
      "dolly forward",
    ];

    const transitions = [
      "cut",
      "fade",
      "dissolve",
      "wipe",
      "slide",
    ];

    const visualDescriptionsEn = [
      "Dynamic close-up shot with cinematic lighting",
      "Wide establishing shot capturing the entire scene",
      "POV shot from character's perspective",
      "Over-the-shoulder shot for dialogue",
      "Aerial view with subtle camera movement",
      "Intimate portrait with soft bokeh background",
    ];

    const visualDescriptionsZh = [
      "电影光效的动态特写镜头",
      "宽广的建立镜头捕捉整个场景",
      "角色视角的主观镜头",
      "对话场景的过肩镜头",
      "带有轻微相机移动的航拍视角",
      "柔焦背景的亲密人像",
    ];

    const visualDescriptions = isEnglish ? visualDescriptionsEn : visualDescriptionsZh;

    for (let i = 0; i < sceneCount; i++) {
      const sceneDuration = duration / sceneCount;
      const sceneIndex = i + 1;

      const voiceoverEn = this.generateVoiceoverEn(sceneIndex, sceneCount);
      const voiceoverZh = this.generateVoiceoverZh(sceneIndex, sceneCount);

      const subtitleEn = this.generateSubtitleEn(sceneIndex, sceneCount);
      const subtitleZh = this.generateSubtitleZh(sceneIndex, sceneCount);

      const imagePromptEn = this.generateImagePrompt(visualStyle, aspectRatio, isEnglish);
      const imagePromptZh = this.generateImagePrompt(visualStyle, aspectRatio, false);

      const scene: StoryboardScene = {
        sceneIndex,
        voiceover: isEnglish ? voiceoverEn : voiceoverZh,
        subtitle: isEnglish ? subtitleEn : subtitleZh,
        visualDescription: visualDescriptions[i % visualDescriptions.length],
        imagePrompt: isEnglish ? imagePromptEn : imagePromptZh,
        negativePrompt: "blurry, low quality, distorted, watermark",
        duration: sceneDuration,
        cameraMotion: cameraMotions[i % cameraMotions.length],
        transition: transitions[i % transitions.length],
      };

      if (bilingualSubtitles) {
        scene.secondarySubtitle = isEnglish ? subtitleZh : subtitleEn;
      }

      scenes.push(scene);
    }

    return { scenes };
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

  private extractTopic(text: string): string {
    // Extract key topic words from text
    const words = text.split(/\s+/).filter(w => w.length > 3);
    if (words.length === 0) return "topic";
    return words.slice(0, 3).join(" ");
  }

  private generateEnglishScript(text: string, category: string, duration: number, hook: string): string {
    const categoryIntros: Record<string, string[]> = {
      storytelling: ["Let me tell you a story.", "Once upon a time,"],
      education: ["Here's something important.", "Did you know that"],
      history: ["Looking back at history,", "In the past,"],
      health: ["When it comes to your health,", "Here's the truth about"],
      business: ["In the world of business,", "The market reveals that"],
      product: ["Introducing something incredible.", "You need to see this."],
      motivation: ["Push yourself further.", "Believe in your potential."],
      news: ["Breaking news that matters.", "What everyone is talking about."],
    };

    const intros = categoryIntros[category] || categoryIntros.storytelling;
    const intro = intros[Math.floor(Math.random() * intros.length)];

    return `${intro} ${text.substring(0, Math.min(text.length, 200))}. ${hook} when you realize what this means for you.`;
  }

  private generateChineseScript(text: string, category: string, duration: number, hook: string): string {
    const categoryIntros: Record<string, string[]> = {
      storytelling: ["让我给你讲个故事。", "从前有"],
      education: ["有一个重要的事实。", "你知道吗"],
      history: ["回顾历史，", "在过去，"],
      health: ["关于你的健康，", "关于健康的真相是"],
      business: ["在商业世界中，", "市场揭示了"],
      product: ["介绍一个令人难以置信的东西。", "你一定要看看这个。"],
      motivation: ["超越自我。", "相信你的潜力。"],
      news: ["重要的新闻来了。", "大家都在讨论。"],
    };

    const intros = categoryIntros[category] || categoryIntros.storytelling;
    const intro = intros[Math.floor(Math.random() * intros.length)];

    return `${intro}。${text.substring(0, Math.min(text.length, 200))}。${hook}当你意识到这对你意味着什么的时候。`;
  }

  private generateEnglishTitle(topic: string): string {
    const titles = [
      `The Ultimate Guide to ${topic}`,
      `${topic} - What You Need to Know`,
      `Why ${topic} Matters More Than Ever`,
      `How ${topic} Changed Everything`,
      `Everything About ${topic} Explained`,
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private generateChineseTitle(topic: string): string {
    const titles = [
      `${topic}的终极指南`,
      `${topic} - 你需要知道的`,
      `为什么${topic}比以往更重要`,
      `${topic}如何改变了一切`,
      `关于${topic}的一切解释`,
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private generateVoiceoverEn(sceneIndex: number, totalScenes: number): string {
    const templates = [
      "Let's dive deeper into this.",
      "Here's what you need to understand.",
      "This is the key insight.",
      "Pay close attention to this.",
      "The truth is more interesting than you think.",
      "Keep watching to discover more.",
      "This changes everything.",
      "You won't believe what happens next.",
      "The moment of truth is here.",
      "Here's the insider perspective.",
      "This is where it gets real.",
      "Understanding this is crucial.",
    ];
    return templates[(sceneIndex - 1) % templates.length];
  }

  private generateVoiceoverZh(sceneIndex: number, totalScenes: number): string {
    const templates = [
      "让我们深入了解这一点。",
      "这是你需要理解的。",
      "这是关键见解。",
      "密切关注这一点。",
      "真相比你想象的更有趣。",
      "继续观看以发现更多。",
      "这改变了一切。",
      "你不会相信接下来会发生什么。",
      "关键时刻到了。",
      "这是内部视角。",
      "这才是真实的开始。",
      "理解这一点至关重要。",
    ];
    return templates[(sceneIndex - 1) % templates.length];
  }

  private generateSubtitleEn(sceneIndex: number, totalScenes: number): string {
    const templates = [
      "Key Point",
      "Important Detail",
      "The Truth",
      " Insider View",
      "Reality Check",
      "The Facts",
      "Deep Dive",
      "Essential Tip",
      "Critical Info",
      "Game Changer",
      "Must Know",
      "Bottom Line",
    ];
    return templates[(sceneIndex - 1) % templates.length];
  }

  private generateSubtitleZh(sceneIndex: number, totalScenes: number): string {
    const templates = [
      "关键点",
      "重要细节",
      "真相",
      "内部视角",
      "现实核查",
      "事实",
      "深入探讨",
      "基本技巧",
      "关键信息",
      "改变规则",
      "必须知道",
      "底线",
    ];
    return templates[(sceneIndex - 1) % templates.length];
  }

  private generateImagePrompt(style: string, aspectRatio: string, english: boolean): string {
    const stylePrompts: Record<string, string[]> = {
      cinematic: ["cinematic scene with dramatic lighting", "film quality composition"],
      realistic: ["photorealistic render", "natural lighting"],
      documentary: ["documentary style shot", "authentic场景"],
      watercolor: ["watercolor painting style", "soft artistic render"],
      oil_painting: ["oil painting aesthetic", "classical art style"],
      anime: ["anime illustration", "Japanese animation style"],
      "3d": ["3D rendered scene", "computer graphics quality"],
      ink_wash: ["Chinese ink wash painting", "traditional East Asian art"],
      commercial: ["professional commercial shot", "marketing visual"],
    };

    const styles = stylePrompts[style] || stylePrompts.cinematic;
    const styleDesc = styles[Math.floor(Math.random() * styles.length)];

    const aspectMap: Record<string, string> = {
      "9:16": "vertical format, portrait orientation",
      "16:9": "horizontal format, landscape orientation",
      "1:1": "square format",
    };

    const aspectDesc = aspectMap[aspectRatio] || aspectMap["9:16"];

    if (english) {
      return `${styleDesc}, ${aspectDesc}, high quality, 4K`;
    } else {
      return `${styleDesc}, ${aspectDesc}, 高质量, 4K`;
    }
  }
}