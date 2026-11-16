import { ArrowDown, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const steps = [
  { kicker: "Your", label: "CA Firm" },
  { kicker: "Select", label: "Client" },
  { kicker: "Choose", label: "Financial Year" },
  { kicker: "Track", label: "Compliance Tasks" },
  { kicker: "Attach", label: "Documents" },
] as const;

const STEP_STAGGER_MS = 240;

const stepBase =
  "transition-all duration-[650ms] [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)]";

const stepVisible = "opacity-100 translate-y-0";
const stepHidden = "opacity-0 translate-y-2";

const arrowBase =
  "transition-all duration-[750ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

const CoreIdeaSection = () => {
  const { ref, visible } = useInView();

  return (
    <section
      id="core-idea"
      aria-labelledby="core-idea-heading"
      className="scroll-mt-24 py-20 md:py-28 bg-muted/30 border-t border-divider"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <h2 id="core-idea-heading" className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Everything starts with the client
          </h2>
          <p className="text-text-secondary text-lg">
            A client-first hierarchy where every task, document, and deadline has context.
          </p>
        </div>

        {/* Diagram */}
        <div
          ref={ref}
          className="bg-card rounded-xl border border-border p-8 md:p-12"
        >
          {/* The hierarchy is a sequence, so expose it as an ordered list; arrows are decoration. */}
          <ol
            aria-label="How work is organised, from firm to documents"
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
          >
            {steps.map((step, index) => {
              const isAnchor = index === 0;
              const isLast = index === steps.length - 1;
              return (
                <li key={step.label} className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div
                    className={`${stepBase} ${visible ? stepVisible : stepHidden} w-max`}
                    style={index > 0 ? { transitionDelay: `${index * STEP_STAGGER_MS}ms` } : undefined}
                  >
                    {isAnchor ? (
                      <div className="px-6 py-4 bg-primary text-primary-foreground rounded-lg shadow-md">
                        <p className="text-xs uppercase tracking-wide opacity-70 mb-1">{step.kicker}</p>
                        <p className="font-semibold">{step.label}</p>
                      </div>
                    ) : (
                      <div className="px-6 py-4 bg-accent border border-border rounded-lg">
                        <p className="text-xs uppercase tracking-wide text-text-tertiary mb-1">{step.kicker}</p>
                        <p className="font-medium">{step.label}</p>
                      </div>
                    )}
                  </div>

                  {/* Steps stack on small screens, so point the flow downwards there. */}
                  {!isLast && (
                    <ArrowDown
                      aria-hidden="true"
                      data-testid="core-idea-arrow-down"
                      className={`md:hidden w-5 h-5 text-text-tertiary ${arrowBase} ${
                        visible ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * STEP_STAGGER_MS + STEP_STAGGER_MS / 2}ms` }}
                    />
                  )}
                  {!isLast && (
                    <ArrowRight
                      aria-hidden="true"
                      className={`hidden md:block w-5 h-5 text-text-tertiary ${arrowBase} ${
                        visible ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * STEP_STAGGER_MS + STEP_STAGGER_MS / 2}ms` }}
                    />
                  )}
                </li>
              );
            })}
          </ol>

          {/* Explanation — delayed payoff */}
          <div
            className={`${stepBase} mt-8 pt-6 border-t border-divider ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            style={{ transitionDelay: "1200ms" }}
          >
            <p className="text-text-secondary mx-auto text-center leading-relaxed">
              Every task, document, and deadline is tied to a specific client and financial year.
              <span className="text-text-primary font-medium">
                {" "}Nothing floats without context.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreIdeaSection;
