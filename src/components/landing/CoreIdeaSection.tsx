import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const CoreIdeaSection = () => {
  const { ref, visible } = useInView();

const stepBase =
  "transition-all duration-[950ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

const stepVisible = "opacity-100 translate-x-0";
const stepHidden = "opacity-0 translate-x-8";

const arrowBase =
  "transition-all duration-[750ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section className="py-20 md:py-28 bg-muted/30 border-t border-divider">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
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
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">

            {/* Step 1 — Anchor */}
            <div className={`${stepBase} ${visible ? "opacity-100" : "opacity-0"} w-max`}>
              <div className="px-6 py-4 bg-primary text-primary-foreground rounded-lg">
                <p className="text-xs uppercase tracking-wide opacity-70 mb-1">
                  Your
                </p>
                <p className="font-medium">CA Firm</p>
              </div>
            </div>

            {/* Arrow 1 */}
            <ArrowRight
              className={`hidden md:block w-5 h-5 text-text-tertiary ${arrowBase} ${
                visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              style={{ transitionDelay: "200ms" }}
            />

            {/* Step 2 */}
            <div
              className={`${stepBase} ${visible ? stepVisible : stepHidden}w-max`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="px-6 py-4 bg-accent border border-border rounded-lg shadow-sm">
                <p className="text-xs uppercase tracking-wide text-text-tertiary mb-1">
                  Select
                </p>
                <p className="font-medium">Client</p>
              </div>
            </div>

            {/* Arrow 2 */}
            <ArrowRight
              className={`hidden md:block w-5 h-5 text-text-tertiary ${arrowBase} ${
                visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              style={{ transitionDelay: "450ms" }}
            />

            {/* Step 3 */}
            <div
              className={`${stepBase} ${visible ? stepVisible : stepHidden}w-max`}
              style={{ transitionDelay: "600ms" }}
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
                visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              style={{ transitionDelay: "650ms" }}
            />

            {/* Step 4 */}
            <div
              className={`${stepBase} ${visible ? stepVisible : stepHidden}w-max`}
              style={{ transitionDelay: "800ms" }}
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
                visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              style={{ transitionDelay: "850ms" }}
            />

            {/* Step 5 */}
            <div
              className={`${stepBase} ${visible ? stepVisible : stepHidden}w-max`}
              style={{ transitionDelay: "1050ms" }}
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
            className={`${stepBase} mt-8 pt-6 border-t border-divider ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            style={{ transitionDelay: "1150ms" }}
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
