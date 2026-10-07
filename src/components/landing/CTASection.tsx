import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { prefersReducedMotion } from "@/lib/scrollToId";

const DEMO_EMAIL = "hello@compliancework.in";
const DEMO_MAILTO =
  "mailto:hello@compliancework.in?subject=FirmOps%20demo%20request&body=Hi%20FirmOps%20team%2C%0A%0AI%27d%20like%20to%20request%20a%20demo%20for%20our%20CA%20firm.%0A%0AFirm%20name%3A%20%0ACity%3A%20%0A";

const COPIED_RESET_MS = 2000;

const CTASection = () => {
  const reduceMotion = prefersReducedMotion();
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
    },
    [],
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DEMO_EMAIL);
      setCopied(true);
      // Restart the confirmation window on repeat clicks instead of letting an
      // earlier timer flip the label back early.
      if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = window.setTimeout(() => {
        resetTimerRef.current = null;
        setCopied(false);
      }, COPIED_RESET_MS);
    } catch {
      // Fallback for environments without clipboard permission
      window.prompt("Copy this email address:", DEMO_EMAIL);
    }
  };

  return (
    <section
      id="cta"
      className="relative scroll-mt-24 overflow-hidden rounded-2xl py-32 text-white md:py-40"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#0A0A0B]" />

      {/* Moving Border Glow — paused when reduced motion is preferred */}
      <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl">
        <div
          className={`
            pointer-events-none absolute inset-0 rounded-2xl
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
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      {/* Subtle Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />

      {/* Ambient Glow */}
      <div
        className={`absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] ${
          reduceMotion ? "" : "animate-pulse duration-[10s]"
        }`}
      />

      <div className="container relative z-20 mx-auto px-6 text-center">
        <h2 className="mb-6 text-4xl font-semibold tracking-tight text-slate-100 md:text-5xl">
          Ready to structure your firm?
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-xl text-slate-400">
          Join the select CA firms building high-trust operations.
        </p>

        <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group relative h-14 overflow-hidden bg-primary px-10 text-lg text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] active:scale-[0.98]"
          >
            <a href={DEMO_MAILTO}>
              <span className="relative z-10">Request a demo</span>
              {!reduceMotion && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-[100%] h-full w-full skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer-sweep_10s_infinite] group-hover:animate-none"
                />
              )}
            </a>
          </Button>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="h-14 border-white/20 bg-transparent px-8 text-lg text-slate-100 hover:bg-white/10 hover:text-white"
            onClick={copyEmail}
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" aria-hidden="true" />
                Email copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
                Copy email
              </>
            )}
          </Button>
        </div>
        <p className="mt-4 text-sm text-slate-500">{DEMO_EMAIL}</p>
        <p role="status" className="sr-only">
          {copied ? `${DEMO_EMAIL} copied to clipboard` : ""}
        </p>
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
