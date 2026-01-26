import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const CTASection = () => {
  const { ref, visible } = useInView();

  const baseTransition = "transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div 
        ref={ref}
        className="container mx-auto px-6 text-center"
      >
        <h2 
          className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${baseTransition} ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          Built for firms that take compliance seriously
        </h2>
        <p 
          className={`text-primary-foreground/70 text-lg mb-10 max-w-xl mx-auto ${baseTransition} ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "120ms" }}
        >
          Structure your work. Track accountability. Run your practice with clarity.
        </p>
        
        <Button 
          size="lg" 
          variant="secondary"
          className={`h-12 px-8 text-base bg-white text-primary hover:bg-white/90 ${baseTransition} ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "280ms" }}
        >
          Request early access
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <p 
          className={`mt-6 text-sm text-primary-foreground/50 ${baseTransition} ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          Currently onboarding select CA firms
        </p>
      </div>
    </section>
  );
};

export default CTASection;
