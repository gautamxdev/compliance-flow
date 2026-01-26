import { Shield, BarChart3, ClipboardList, Filter } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const personas = [
  {
    icon: Shield,
    title: "CA Partners",
    benefits: [
      "Complete visibility into firm operations",
      "Risk reduction through systematic tracking",
    ],
  },
  {
    icon: BarChart3,
    title: "Managers",
    benefits: [
      "Task clarity across all team members",
      "Workload balance and easy delegation",
    ],
  },
  {
    icon: ClipboardList,
    title: "Articles & Staff",
    benefits: [
      "Clear task assignments and priorities",
      "Work attribution and recognition",
    ],
  },
];

const filters = [
  "Pending GST filings this week",
  "Work handled by Rahul M.",
  "FY 2022-23 audits",
  "Clients with active notices",
];

// Asymmetric vertical offsets
const cardOffsets = ["md:translate-y-0", "md:translate-y-3", "md:-translate-y-2"];

const UnifiedVisibilitySection = () => {
  const { ref, visible } = useInView();

  return (
    <section id="visibility" className="py-20 md:py-28 bg-muted/30 border-t border-divider">
      <div className="container mx-auto px-6">
        <div ref={ref} className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Firm-wide visibility, without micromanagement
          </h2>
          <p className="text-text-secondary text-lg">
            Partners, managers, and staff all see exactly what they need — no chasing, no reporting overhead.
          </p>
        </div>

        {/* Role Cards with Asymmetry */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {personas.map((persona, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border border-border bg-card ${cardOffsets[index]} transition-all duration-200 hover:shadow-md hover:border-border/80`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-5">
                <persona.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-4">{persona.title}</h3>
              <ul className="space-y-3">
                {persona.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-success mt-0.5">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Filters Preview */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-text-secondary" />
              <span className="text-sm font-medium">Quick Filters</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter, index) => (
                <button
                  key={index}
                  className="px-3 py-2 text-sm bg-muted text-text-secondary rounded-lg border border-transparent 
                    hover:bg-accent hover:text-text-primary hover:border-border hover:-translate-y-0.5 hover:shadow-sm
                    transition-all duration-200 text-left"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <p className="text-center text-sm text-text-tertiary mt-4">
            Dynamic views into your firm's work — no folders, no extra reporting.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UnifiedVisibilitySection;
