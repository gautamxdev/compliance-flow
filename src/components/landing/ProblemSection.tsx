import { FolderOpen, HelpCircle, Users, Clock } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const problems = [
  {
    icon: FolderOpen,
    title: "Scattered files", 
    description: "Files scattered across Drive, desktop, and WhatsApp groups with no central source of truth.",
    stagger: "0px",
  },
  {
    icon: HelpCircle,
    title: "No clarity on status",
    description: "No clarity on which financial year, what filing status, or what's actually been completed.",
    stagger: "12px",
  },
  {
    icon: Users,
    title: "Lost accountability",
    description: "Partners don’t know which article handled which filing, or where it stalled.",
    stagger: "24px",
  },
  {
    icon: Clock,
    title: "Deadlines tracked too late",
    description: "Deadlines missed without accountability. No systematic tracking until it's too late.",
    stagger: "36px",
  },
];

const ProblemSection = () => {
  const { ref, visible } = useInView();

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

        <div ref={ref} className="grid md:grid-cols-2 gap-6 mb-2">
          {problems.map((problem, index) => (
            <div
              key={index}
              style={{ 
                marginTop: problem.stagger,
                transitionDelay: `${index * 120}ms`
              }}
              className={`
                group p-7 rounded-xl border border-border bg-card
                transition-all duration-700 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
                relative overflow-hidden
              `}
            >
              {/* Animated Border Line */}
              <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-transform duration-[2000ms] ease-in-out ${visible ? "translate-x-0" : "-translate-x-full"}`} />

              {/* Icon */}
              <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center mb-4">
                <problem.icon className={`w-4.5 h-4.5 text-text-tertiary transition-opacity duration-1000 ${visible ? "animate-[pulse-once_2s_ease-in-out]" : "opacity-60"}`} />
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
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-once {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}} />
    </section>
  );
};

export default ProblemSection;