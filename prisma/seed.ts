import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123456", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@clipforge.ai" },
    update: {},
    create: {
      email: "admin@clipforge.ai",
      passwordHash: adminPassword,
      name: "Admin",
      role: "ADMIN",
      credits: 10000,
      preferredLanguage: "en-US",
    },
  });

  // Create demo user
  const demoPassword = await bcrypt.hash("demo123456", 10);
  const demo = await prisma.user.upsert({
    where: { email: "demo@clipforge.ai" },
    update: {},
    create: {
      email: "demo@clipforge.ai",
      passwordHash: demoPassword,
      name: "Demo User",
      role: "USER",
      credits: 500,
      preferredLanguage: "en-US",
    },
  });

  // Create voices
  const voices = [
    {
      name: "zh_calm_male",
      displayNameZh: "沉稳男声",
      displayNameEn: "Calm Mandarin Male",
      provider: "mock",
      providerVoiceId: "zh_calm_male",
      language: "zh-CN",
      gender: "male",
      style: "calm",
    },
    {
      name: "zh_warm_female",
      displayNameZh: "温柔女声",
      displayNameEn: "Warm Mandarin Female",
      provider: "mock",
      providerVoiceId: "zh_warm_female",
      language: "zh-CN",
      gender: "female",
      style: "warm",
    },
    {
      name: "en_calm_narrator",
      displayNameZh: "英文沉稳旁白",
      displayNameEn: "Calm English Narrator",
      provider: "mock",
      providerVoiceId: "en_calm_narrator",
      language: "en-US",
      gender: "male",
      style: "calm",
    },
    {
      name: "en_energetic_creator",
      displayNameZh: "英文活力创作者",
      displayNameEn: "Energetic English Creator",
      provider: "mock",
      providerVoiceId: "en_energetic_creator",
      language: "en-US",
      gender: "female",
      style: "energetic",
    },
  ];

  for (const voice of voices) {
    await prisma.voice.upsert({
      where: { id: voice.name },
      update: {},
      create: {
        id: voice.name,
        ...voice,
      },
    });
  }

  console.log("Seed completed:");
  console.log(`- Admin user: admin@clipforge.ai / admin123456`);
  console.log(`- Demo user: demo@clipforge.ai / demo123456`);
  console.log(`- ${voices.length} voices created`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });