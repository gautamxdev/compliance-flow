import { FolderOpen, HelpCircle, Users, Clock } from "lucide-react";

const problems = [
  {
    icon: FolderOpen,
    title: "Scattered files", 
    description: "Files across Drive, desktop, and WhatsApp with no single source of truth.",
  },
  {
    icon: HelpCircle,
    title: "No clarity on status",
    description: "Unclear which financial year, what filing status, or what's actually done.",
  },
  {
    icon: Users,
    title: "Lost accountability",
    description: "Partners don't know who handled what, or where things stalled.",
  },
  {
    icon: Clock,
    title: "Deadlines tracked too late",
    description: "No systematic tracking until it's already too late.",
  },
];

// Asymmetric vertical offsets for premium feel
const cardOffsets = ["md:translate-y-0", "md:translate-y-3", "md:-translate-y-2", "md:translate-y-4"];

const ProblemSection = () => {
  return (
    <section className="py-20 md:py-28 border-t border-divider">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
            Where compliance work quietly breaks
          </h2>
          <p className="text-text-secondary text-base leading-relaxed">
            The day-to-day reality at most CA firms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`
                group p-6 rounded-xl border border-border bg-card shadow-sm
                ${cardOffsets[index]}
                transition-all duration-200
                hover:-translate-y-1 hover:shadow-md hover:border-border/80
              `}
            >
              {/* Icon with dashboard color */}
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                <problem.icon className="w-5 h-5 text-text-tertiary group-hover:text-warning transition-colors duration-200" />
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
