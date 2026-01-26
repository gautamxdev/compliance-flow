import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";

const CTASection = () => {
  const { ref, visible } = useInView();

  return (
    <section className="relative py-32 md:py-40 bg-[#0A0A0B] text-white overflow-hidden">
      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-[mesh_25s_infinite_alternate]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] animate-[mesh_30s_infinite_alternate_reverse]" />
      </div>

      <div 
        ref={ref}
        className="container relative z-10 mx-auto px-6 text-center"
      >
        <h2 className={`text-4xl md:text-5xl font-semibold tracking-tight mb-6 transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
          Ready to structure your firm?
        </h2>
        <p className={`text-gray-400 text-xl mb-12 max-w-xl mx-auto transition-all duration-1000 delay-200 ${visible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
          Join the select CA firms building high-trust operations.
        </p>
        
        <div className={`transition-all duration-1000 delay-400 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <Button 
            size="lg" 
            className="group relative h-14 px-10 text-lg bg-primary hover:bg-primary/90 text-primary-foreground overflow-hidden"
          >
            <span className="relative z-10">Request a demo</span>
            {/* Light Sweep Animation */}
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] animate-[sweep_5s_infinite]" />
          </Button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mesh {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(10%, 10%) scale(1.1); }
        }
        @keyframes sweep {
          0% { left: -100%; }
          20% { left: 150%; }
          100% { left: 150%; }
        }
      `}} />
    </section>
  );
};

export default CTASection;
