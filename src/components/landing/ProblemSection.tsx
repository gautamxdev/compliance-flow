import { FolderOpen, HelpCircle, Users, Clock } from "lucide-react";

const problems = [
  {
    icon: FolderOpen,
    title: "Scattered files", 
    description: "Files scattered across Drive, desktop, and WhatsApp groups with no central source of truth.",
    color: "text-slate-500",
  },
  {
    icon: HelpCircle,
    title: "No clarity on status",
    description: "No clarity on which financial year, what filing status, or what's actually been completed.",
    color: "text-amber-500",
  },
  {
    icon: Users,
    title: "Lost accountability",
    description: "Partners don’t know which article handled which filing, or where it stalled.",
    color: "text-red-500",
  },
  {
    icon: Clock,
    title: "Deadlines tracked too late",
    description: "Deadlines missed without accountability. No systematic tracking until it's too late.",
    color: "text-blue-500",
  },
];

const ProblemSection = () => {
  return (
    <section id="problem" className="py-16 md:py-20 border-t border-divider">
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
                transition-all duration-[300ms] ease-out
                hover:-translate-y-2
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                hover:border-slate-300
                relative overflow-hidden
              "
            >
              {/* Icon */}
              <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center mb-4 transition-colors duration-300">
                <problem.icon className={`w-4.5 h-4.5 ${problem.color} opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all`} />
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