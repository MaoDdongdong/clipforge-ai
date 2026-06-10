import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { Workflow } from "@/components/marketing/workflow";
import { UseCases } from "@/components/marketing/use-cases";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { Faq } from "@/components/marketing/faq";
import { Footer } from "@/components/marketing/footer";
import { Providers } from "@/components/providers/session-provider";

export default function HomePage() {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Features />
          <Workflow />
          <UseCases />
          <PricingPreview />
          <Faq />
        </main>
        <Footer />
      </div>
    </Providers>
  );
}