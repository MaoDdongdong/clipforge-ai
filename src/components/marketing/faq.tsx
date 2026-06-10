"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function Faq() {
  const t = useTranslations("home.faq");

  const questions = ["q1", "q2", "q3", "q4"];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion className="w-full">
            {questions.map((q) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left font-medium">
                  {t(`${q}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t(`${q}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}