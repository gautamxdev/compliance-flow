import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const roles = [
  {
    id: "partners",
    label: "Partners",
    outcomes: [
      "See firm risk before deadlines hit",
      "Zero status meetings",
      "Complete audit visibility",
    ],
    mockText: "Firm Risk & Health Dashboard",
  },
  {
    id: "managers",
    label: "Managers",
    outcomes: [
      "Balance workload visually",
      "Reassign tasks without chaos",
      "Spot bottlenecks instantly",
    ],
    mockText: "Resource & Workload Management",
  },
  {
    id: "staff",
    label: "Staff",
    outcomes: [
      "Clear ownership",
      "Clear priorities",
      "No ambiguity on what's next",
    ],
    mockText: "Task Clarity & Ownership",
  },
];

const VisibilitySection = () => {
  const { ref, visible } = useInView();
  const [activeRoleId, setActiveRoleId] = useState(roles[0].id);
  const activeRole = roles.find(r => r.id === activeRoleId)!;

  return (
    <section className="py-20 md:py-28 border-t border-divider overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-12 text-center">
          Firm-wide clarity, tailored by role
        </h2>
        
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Dashboard Mockup */}
          <div className="order-2 lg:order-1">
            <div className="bg-[#F8FAFC] rounded-2xl border border-border p-8 h-[400px] flex flex-col shadow-inner">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-3 rounded-full bg-slate-200" />
                <div className="w-8 h-3 rounded-full bg-slate-200" />
                <div className="w-20 h-3 rounded-full bg-slate-200 ml-auto" />
              </div>
              
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <div className="relative w-full max-w-sm">
                  <div key={activeRoleId} className="animate-[fade-in_0.3s_ease-out]">
                    <div className="h-4 w-48 bg-primary/10 rounded-full mx-auto mb-4" />
                    <div className="text-xl font-medium text-slate-800 mb-2">{activeRole.mockText}</div>
                    <div className="h-2 w-full bg-slate-100 rounded-full" />
                    <div className="grid grid-cols-3 gap-2 mt-8">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                          <div className={`w-8 h-8 rounded-full ${i === 1 ? "bg-green-100" : "bg-slate-50"}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Role Explanation */}
          <div className="order-1 lg:order-2">
            <div className="flex gap-1 p-1 bg-muted rounded-xl mb-8 w-fit">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setActiveRoleId(role.id)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeRoleId === role.id 
                    ? "bg-card text-text-primary shadow-sm" 
                    : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>

            <div key={activeRoleId} className="animate-[crossfade_0.2s_ease-out] space-y-6">
              <ul className="space-y-4">
                {activeRole.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-text-secondary text-lg">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes crossfade {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </section>
  );
};

export default VisibilitySection;
