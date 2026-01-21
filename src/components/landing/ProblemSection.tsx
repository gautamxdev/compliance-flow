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
    description: "Partners don't know who handled what. Work attribution relies on memory and verbal updates.",
  },
  {
    icon: Clock,
    title: "Missed deadlines",
    description: "Deadlines missed without accountability. No systematic tracking until it's too late.",
  },
];

const ProblemSection = () => {
  return (
    <section id="problem" className="py-20 md:py-28 border-t border-divider">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            How compliance work actually breaks
          </h2>
          <p className="text-text-secondary text-lg">
            The day-to-day reality of running compliance work at most CA firms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border bg-card hover:border-border/80 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                <problem.icon className="w-5 h-5 text-text-secondary" />
              </div>
              <h3 className="font-medium text-lg mb-2">{problem.title}</h3>
              <p className="text-text-secondary leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
