import { Button } from "@/components/ui/button";
import { prefersReducedMotion } from "@/lib/scrollToId";

const DEMO_MAILTO =
  "mailto:hello@compliancework.in?subject=FirmOps%20demo%20request&body=Hi%20FirmOps%20team%2C%0A%0AI%27d%20like%20to%20request%20a%20demo%20for%20our%20CA%20firm.%0A%0AFirm%20name%3A%20%0ACity%3A%20%0A";

const CTASection = () => {
  const reduceMotion = prefersReducedMotion();

  return (
    <section
      id="cta"
      className="relative py-32 md:py-40 text-white overflow-hidden rounded-2xl scroll-mt-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#0A0A0B] rounded-2xl z-0" />

      {/* Moving Border Glow — paused when reduced motion is preferred */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-10">
        <div
          className={`
            absolute inset-0 rounded-2xl pointer-events-none
            before:absolute before:inset-0
            before:rounded-2xl
            before:p-[2px]
            before:bg-[conic-gradient(
              from_0deg,
              transparent_0%,
              rgba(168,85,247,0.0)_15%,
              rgba(168,85,247,0.9)_35%,
              rgba(147,51,234,0.9)_50%,
              rgba(168,85,247,0.9)_65%,
              rgba(168,85,247,0.0)_85%,
              transparent_100%
            )]
            before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
            before:[mask-composite:exclude]
            before:blur-[0.7px]
            ${reduceMotion ? "" : "before:animate-[border-spin_4s_linear_infinite]"}
          `}
        />
      </div>
      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Ambient Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full ${
          reduceMotion ? "" : "animate-pulse duration-[10s]"
        }`}
      />

      <div className="container relative z-20 mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-slate-100">
          Ready to structure your firm?
        </h2>
        <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto">
          Join the select CA firms building high-trust operations.
        </p>

        <div className="flex justify-center relative">
          <Button
            asChild
            size="lg"
            className="group relative h-14 px-10 text-lg bg-primary hover:bg-primary/90 text-primary-foreground overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]"
          >
            <a href={DEMO_MAILTO}>
              <span className="relative z-10">Request a demo</span>
              {/* Continuous White Shimmer Sweep — skipped for reduced motion */}
              {!reduceMotion && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-[shimmer-sweep_10s_infinite] group-hover:animate-none"
                />
              )}
            </a>
          </Button>
        </div>
      </div>
      {!reduceMotion && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
        @keyframes shimmer-sweep {
          0% { left: -100%; }
          15% { left: 150%; }
          100% { left: 150%; }
        }
        @keyframes border-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `,
          }}
        />
      )}
    </section>
  );
};

export default CTASection;
