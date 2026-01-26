import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import CoreIdeaSection from "@/components/landing/CoreIdeaSection";
import AccountabilitySection from "@/components/landing/AccountabilitySection";
import VisibilitySection from "@/components/landing/VisibilitySection";
import WhoItsForSection from "@/components/landing/WhoItsForSection";
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
        <AccountabilitySection />
        <VisibilitySection />
        <WhoItsForSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
