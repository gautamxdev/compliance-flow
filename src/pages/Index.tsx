import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import CoreIdeaSection from "@/components/landing/CoreIdeaSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import AccountabilitySection from "@/components/landing/AccountabilitySection";
import VisibilitySection from "@/components/landing/VisibilitySection";
import WhoItsForSection from "@/components/landing/WhoItsForSection";
import WhatThisIsNotSection from "@/components/landing/WhatThisIsNotSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <CoreIdeaSection />
        <HowItWorksSection />
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
