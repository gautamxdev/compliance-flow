import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          Built for firms that take compliance seriously
        </h2>
        <p className="text-primary-foreground/70 text-lg mb-10 max-w-xl mx-auto">
          Structure your work. Track accountability. Run your practice with clarity.
        </p>
        
        <Button 
          size="lg" 
          variant="secondary"
          className="h-12 px-8 text-base bg-white text-primary hover:bg-white/90"
        >
          Request early access
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <p className="mt-6 text-sm text-primary-foreground/50">
          Currently onboarding select CA firms
        </p>
      </div>
    </section>
  );
};

export default CTASection;
