import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const CoreIdeaSection = () => {
  const { ref, visible } = useInView();

  const stepBase =
    "transition-all duration-[700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

  const stepVisible = "opacity-100 translate-x-0";
  const stepHidden = "opacity-0 translate-x-3";

  const arrowBase =
    "transition-all duration-[500ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section className="py-20 md:py-28 bg-muted/30 border-t border-divider">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="max-w-2xl mb-14"
        >
          <h2 
            className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${stepBase} ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Everything starts with the client
          </h2>
          <p 
            className={`text-text-secondary text-lg ${stepBase} ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            A client-first hierarchy where every task, document, and deadline has context.
          </p>
        </div>

        {/* Diagram */}
        <div className="bg-card rounded-xl border border-border p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">

            {/* Step 1 — Anchor (stronger visual weight) */}
            <div 
              className={`${stepBase} ${visible ? stepVisible : stepHidden} w-max`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="px-6 py-4 bg-primary text-primary-foreground rounded-lg shadow-md">
                <p className="text-xs uppercase tracking-wide opacity-70 mb-1">
                  Your
                </p>
                <p className="font-semibold">CA Firm</p>
              </div>
            </div>

            {/* Arrow 1 */}
            <ArrowRight
              className={`hidden md:block w-5 h-5 text-text-tertiary ${arrowBase} ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "380ms" }}
            />

            {/* Step 2 */}
            <div
              className={`${stepBase} ${visible ? stepVisible : stepHidden} w-max`}
              style={{ transitionDelay: "460ms" }}
            >
              <div className="px-6 py-4 bg-accent border border-border rounded-lg">
                <p className="text-xs uppercase tracking-wide text-text-tertiary mb-1">
                  Select
                </p>
                <p className="font-medium">Client</p>
              </div>
            </div>

            {/* Arrow 2 */}
            <ArrowRight
              className={`hidden md:block w-5 h-5 text-text-tertiary ${arrowBase} ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "640ms" }}
            />

            {/* Step 3 */}
            <div
              className={`${stepBase} ${visible ? stepVisible : stepHidden} w-max`}
              style={{ transitionDelay: "720ms" }}
            >
              <div className="px-6 py-4 bg-accent border border-border rounded-lg">
                <p className="text-xs uppercase tracking-wide text-text-tertiary mb-1">
                  Choose
                </p>
                <p className="font-medium">Financial Year</p>
              </div>
            </div>

            {/* Arrow 3 */}
            <ArrowRight
              className={`hidden md:block w-5 h-5 text-text-tertiary ${arrowBase} ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "900ms" }}
            />

            {/* Step 4 */}
            <div
              className={`${stepBase} ${visible ? stepVisible : stepHidden} w-max`}
              style={{ transitionDelay: "980ms" }}
            >
              <div className="px-6 py-4 bg-accent border border-border rounded-lg">
                <p className="text-xs uppercase tracking-wide text-text-tertiary mb-1">
                  Track
                </p>
                <p className="font-medium">Compliance Tasks</p>
              </div>
            </div>

            {/* Arrow 4 */}
            <ArrowRight
              className={`hidden md:block w-5 h-5 text-text-tertiary ${arrowBase} ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "1160ms" }}
            />

            {/* Step 5 */}
            <div
              className={`${stepBase} ${visible ? stepVisible : stepHidden} w-max`}
              style={{ transitionDelay: "1240ms" }}
            >
              <div className="px-6 py-4 bg-accent border border-border rounded-lg">
                <p className="text-xs uppercase tracking-wide text-text-tertiary mb-1">
                  Attach
                </p>
                <p className="font-medium">Documents</p>
              </div>
            </div>
          </div>

          {/* Explanation — delayed payoff */}
          <div
            className={`${stepBase} mt-10 pt-8 border-t border-divider ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "1500ms" }}
          >
            <p className="text-text-secondary mx-auto text-center leading-relaxed max-w-xl">
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
