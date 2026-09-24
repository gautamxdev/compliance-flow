import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import CoreIdeaSection from "@/components/landing/CoreIdeaSection";
import AccountabilitySection from "@/components/landing/AccountabilitySection";
import VisibilitySection from "@/components/landing/VisibilitySection";
import WhoItsForSection from "@/components/landing/WhoItsForSection";
import WhatThisIsNotSection from "@/components/landing/WhatThisIsNotSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <CoreIdeaSection />
        <AccountabilitySection />
        <VisibilitySection />
        <WhoItsForSection />
        <WhatThisIsNotSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
