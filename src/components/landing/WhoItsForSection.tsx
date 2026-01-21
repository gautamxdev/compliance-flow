import { Shield, BarChart3, ClipboardList } from "lucide-react";

const personas = [
  {
    icon: Shield,
    title: "CA Partners",
    benefits: [
      "Complete visibility into firm operations",
      "Risk reduction through systematic tracking",
      "Client accountability without micromanaging",
      "Clear audit trail for every decision",
    ],
  },
  {
    icon: BarChart3,
    title: "Managers",
    benefits: [
      "Task clarity across all team members",
      "Workload balance and capacity planning",
      "Deadline tracking with early warnings",
      "Easy delegation and reassignment",
    ],
  },
  {
    icon: ClipboardList,
    title: "Articles & Staff",
    benefits: [
      "Clear task assignments and priorities",
      "No confusion about what's expected",
      "Document context always available",
      "Work attribution and recognition",
    ],
  },
];

const WhoItsForSection = () => {
  return (
    <section id="who-its-for" className="py-20 md:py-28 bg-muted/30 border-t border-divider">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Built for every role in your firm
          </h2>
          <p className="text-text-secondary text-lg">
            Different needs, one unified system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-5">
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
