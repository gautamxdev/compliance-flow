import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Badge } from "@/components/ui/badge";

const roles = [
  {
    id: "partners",
    label: "Partners",
    insight: "Firm health overview",
    outcome: "Real-time visibility into all client filings without asking for status reports.",
    metric: "42 active filings",
  },
  {
    id: "managers",
    label: "Managers",
    insight: "Workload balance",
    outcome: "Identify bottlenecks in staff allocation and redistribute tasks instantly.",
    metric: "85% capacity",
  },
  {
    id: "staff",
    label: "Staff",
    insight: "Clear next task",
    outcome: "No more scrolling through WhatsApp. Know exactly what to work on next.",
    metric: "3 due today",
  },
];

const VisibilitySection = () => {
  const { ref, visible } = useInView();
  const [activeRole, setActiveRole] = useState(roles[0]);

  return (
    <section className="py-20 md:py-28 border-t border-divider">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Interactive System Panel */}
          <div className="order-2 lg:order-1">
            <div 
              className={`bg-card rounded-xl border border-border flex h-[320px] overflow-hidden transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {/* Left Side: compact filter-style UI */}
              <div className="w-1/3 border-r border-divider bg-muted/20 p-4 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-text-tertiary font-bold px-2 block mb-4">Views</span>
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setActiveRole(role)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                      activeRole.id === role.id 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-text-secondary hover:bg-muted"
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>

              {/* Right Side: content changes based on selected role */}
              <div className="flex-1 p-8 relative overflow-hidden">
                <div 
                  key={activeRole.id}
                  className="animate-[fade-slide_0.4s_ease-out] space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-xs text-text-tertiary font-medium">{activeRole.label} Insight</span>
                    <h3 className="text-2xl font-semibold">{activeRole.insight}</h3>
                  </div>
                  
                  <p className="text-text-secondary leading-relaxed">
                    {activeRole.outcome}
                  </p>

                  <div className="pt-4">
                    <Badge variant="outline" className="px-3 py-1 font-mono text-xs">
                      {activeRole.metric}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Firm-wide visibility without micromanagement
            </h2>
            <p className="text-text-secondary text-lg mb-6">
              Built for every role in your firm. Get instant answers to operational questions without constant check-ins.
            </p>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-slide {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}} />
    </section>
  );
};

export default VisibilitySection;
