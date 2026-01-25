import { Shield, BarChart3, ClipboardList } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const personas = [
  {
    icon: Shield,
    title: "CA Partners",
    benefits: [
      "Complete visibility into firm operations",
      "Risk reduction through systematic tracking",
      "Clear audit trail for every decision",
    ],
  },
  {
    icon: BarChart3,
    title: "Managers",
    benefits: [
      "Task clarity across all team members",
      "Workload balance and capacity planning",
      "Easy delegation and reassignment",
    ],
  },
  {
    icon: ClipboardList,
    title: "Articles & Staff",
    benefits: [
      "Clear task assignments and priorities",
      "No confusion about what's expected",
      "Work attribution and recognition",
    ],
  },
];

const WhoItsForSection = () => {
  const { ref, visible } = useInView();

  const baseTransition = "transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)]";

  return (
    <section id="who-its-for" className="py-20 md:py-28 bg-muted/30 border-t border-divider">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="max-w-2xl mb-14"
        >
          <h2 
            className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${baseTransition} ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            Built for every role in your firm
          </h2>
          <p 
            className={`text-text-secondary text-lg ${baseTransition} ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            Different needs, one unified system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border border-border bg-card ${baseTransition} ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div 
                className={`w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-5 ${baseTransition} ${
                  visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ transitionDelay: `${350 + index * 80}ms` }}
              >
                <persona.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-4">{persona.title}</h3>
              <ul className="space-y-3">
                {persona.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-primary mt-1">—</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsForSection;
