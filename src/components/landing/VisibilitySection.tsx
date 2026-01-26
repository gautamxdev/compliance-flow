import { Filter } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const filters = [
  "All pending GST filings this week",
  "All work handled by Rahul M.",
  "All FY 2022-23 audits",
  "Clients with active notices",
  "Tasks due in next 7 days",
  "Completed filings this month",
];

// Randomized delays for organic feel
const filterDelays = [280, 350, 300, 420, 380, 320];

const VisibilitySection = () => {
  const { ref, visible } = useInView();

  const baseTransition = "transition-all duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section className="py-20 md:py-28 border-t border-divider">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Filters Preview */}
          <div className="order-2 lg:order-1">
            <div 
              className={`bg-card rounded-xl border border-border p-6 ${baseTransition} ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-text-secondary" />
                <span className="text-sm font-medium">Quick Filters</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 text-sm bg-muted text-text-secondary rounded-lg border border-transparent 
                      hover:bg-accent hover:text-text-primary hover:border-border hover:-translate-y-0.5 hover:shadow-sm
                      transition-all duration-200 text-left ${baseTransition} ${
                      visible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${filterDelays[index]}ms` }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <h2 
              className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${baseTransition} ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              Firm-wide visibility without micromanagement
            </h2>
            <p 
              className={`text-text-secondary text-lg mb-6 ${baseTransition} ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              These are views, not folders — dynamic filters into your firm's work. No extra reporting. No chasing staff.
            </p>
            <p 
              className={`text-text-secondary ${baseTransition} ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: "180ms" }}
            >
              Partners see the complete picture. Managers track workload. Staff know exactly what's assigned. All without constant check-ins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisibilitySection;
