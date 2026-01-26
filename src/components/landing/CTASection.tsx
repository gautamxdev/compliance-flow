import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";

const CTASection = () => {
  const { ref, visible } = useInView();

  return (
    <section className="relative py-32 md:py-40 text-white overflow-hidden rounded-2xl">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#0A0A0B] rounded-2xl z-0" />

      {/* Moving Border Glow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-10">
        <div
          className="
            absolute inset-0 rounded-2xl pointer-events-none
            before:absolute before:inset-0
            before:rounded-2xl
            before:p-[2px]
            before:bg-[conic-gradient(
              from_0deg,
              transparent 0%,
              rgba(168,85,247,0.0) 15%,
              rgba(168,85,247,0.9) 35%,
              rgba(147,51,234,0.9) 50%,
              rgba(168,85,247,0.9) 65%,
              rgba(168,85,247,0.0) 85%,
              transparent 100%
            )]
            before:animate-[border-spin_4s_linear_infinite]
            before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
            before:[mask-composite:exclude]
            before:blur-[0.7px]
          "
        />
      </div>
      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full animate-pulse duration-[10s]" />

      <div 
        ref={ref}
        className="container relative z-20 mx-auto px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-slate-100">
          Ready to structure your firm?
        </h2>
        <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto">
          Join the select CA firms building high-trust operations.
        </p>
        
        <div className="flex justify-center relative">
          {/* Ambient Glow behind button */}
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <Button 
            size="lg" 
            className="group relative h-14 px-10 text-lg bg-primary hover:bg-primary/90 text-primary-foreground overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]"
          >
            <span className="relative z-10">Request a demo</span>
            {/* Continuous White Shimmer Sweep - Slower */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-[shimmer-sweep_10s_infinite] group-hover:animate-none" />
          </Button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer-sweep {
          0% { left: -100%; }
          15% { left: 150%; }
          100% { left: 150%; }
        }
        @keyframes border-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </section>
  );
};

export default CTASection;
