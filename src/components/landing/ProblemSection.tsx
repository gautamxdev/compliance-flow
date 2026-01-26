import { FolderOpen, HelpCircle, Users, Clock } from "lucide-react";

const problems = [
  {
    icon: FolderOpen,
    title: "Scattered files", 
    description: "Files scattered across Drive, desktop, and WhatsApp groups with no central source of truth.",
  },
  {
    icon: HelpCircle,
    title: "No clarity on status",
    description: "No clarity on which financial year, what filing status, or what's actually been completed.",
  },
  {
    icon: Users,
    title: "Lost accountability",
    description: "Partners don’t know which article handled which filing, or where it stalled.",
  },
  {
    icon: Clock,
    title: "Deadlines tracked too late",
    description: "Deadlines missed without accountability. No systematic tracking until it's too late.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-16 md:py-20 border-t border-divider">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
            Where compliance work quietly breaks
          </h2>
          <p className="text-text-secondary text-base leading-relaxed">
            The day-to-day reality of running compliance work at most CA firms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-2">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="
                group p-7 rounded-xl border border-border bg-card
                transition-all duration-200
                hover:-translate-y-[4px]
                hover:shadow-md
              "
            >
              {/* Icon */}
              <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center mb-4">
                <problem.icon className="w-4.5 h-4.5 text-text-tertiary group-hover:text-text-secondary transition-colors" />
              </div>

              {/* Title */}
              <h3 className="font-medium text-base mb-1.5">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;