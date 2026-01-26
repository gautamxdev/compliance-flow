import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const roles = [
  {
    id: "partners",
    label: "Partners",
    stat: "42",
    insight: "Filings due this week across firm",
    highlight: "Overdue Filings View",
  },
  {
    id: "managers",
    label: "Managers",
    stat: "85%",
    insight: "Current resource capacity utilization",
    highlight: "Workload Balance View",
  },
  {
    id: "staff",
    label: "Staff",
    stat: "3",
    insight: "Urgent tasks assigned to you",
    highlight: "Clear Next Task View",
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
          {/* Role Switcher Tabs */}
          <div className="order-1 lg:order-1 flex flex-col gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRoleId(role.id)}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  activeRoleId === role.id 
                  ? "bg-card border-slate-200 shadow-sm ring-1 ring-slate-100" 
                  : "bg-transparent border-transparent text-text-secondary hover:bg-muted/50"
                }`}
              >
                <div className="text-sm font-semibold uppercase tracking-wider mb-1">{role.label}</div>
                <div className={`text-lg transition-colors ${activeRoleId === role.id ? "text-text-primary" : "text-text-secondary"}`}>
                  {role.insight}
                </div>
              </button>
            ))}
          </div>

          {/* Dashboard Preview Card */}
          <div className="order-2 lg:order-2">
            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-8 h-[440px] flex flex-col shadow-inner relative overflow-hidden">
              <div key={activeRoleId} className="animate-[role-switch_0.3s_ease-out] flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-6 w-32 bg-slate-200/50 rounded-full" />
                  <div className="h-4 w-20 bg-primary/10 rounded-full" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center text-center">
                  <div className="text-6xl font-bold text-primary mb-4">{activeRole.stat}</div>
                  <div className="text-slate-500 font-medium mb-8 uppercase tracking-widest text-xs">
                    {activeRole.highlight}
                  </div>
                  
                  <div className="space-y-3 max-w-xs mx-auto w-full">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-12 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center px-4 gap-3 ${i === 1 ? "ring-1 ring-primary/20" : ""}`}>
                        <div className={`w-2 h-2 rounded-full ${i === 1 ? "bg-primary" : "bg-slate-200"}`} />
                        <div className={`h-2 rounded-full bg-slate-100 ${i === 1 ? "w-24" : i === 2 ? "w-32" : "w-20"}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes role-switch {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </section>
  );
};

export default VisibilitySection;
