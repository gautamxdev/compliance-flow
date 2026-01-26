import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";

const CTASection = () => {
  const { ref, visible } = useInView();

  return (
    <section className="relative py-32 md:py-40 bg-gradient-to-br from-[#0F172A] to-[#0A0A0B] text-white overflow-hidden">
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full animate-pulse duration-[8s]" />

      <div 
        ref={ref}
        className="container relative z-10 mx-auto px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          Ready to structure your firm?
        </h2>
        <p className="text-gray-400 text-xl mb-12 max-w-xl mx-auto">
          Join the select CA firms building high-trust operations.
        </p>
        
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="group relative h-14 px-10 text-lg bg-primary hover:bg-primary/90 text-primary-foreground overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]"
          >
            <span className="relative z-10">Request a demo</span>
            {/* Continuous White Shimmer Sweep */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-[shimmer-sweep_4s_infinite]" />
          </Button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer-sweep {
          0% { left: -100%; }
          30% { left: 150%; }
          100% { left: 150%; }
        }
      `}} />
    </section>
  );
};

export default CTASection;
