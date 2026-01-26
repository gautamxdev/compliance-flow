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
                className={`w-full text-left p-6 rounded-2xl border transition-colors duration-300 relative overflow-hidden ${
                  activeRoleId === role.id
                    ? "bg-card border-transparent shadow-sm"
                    : "bg-transparent border-transparent text-text-secondary hover:bg-muted/50"
                }`}
                style={
                  activeRoleId === role.id
                    ? {
                        boxShadow: "0 0 0 1px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.06)",
                      }
                    : { boxShadow: "none" }
                }
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
            <div
              className="bg-[#F8FAFC] rounded-2xl p-8 h-[440px] flex flex-col relative overflow-hidden transition-shadow duration-300"
              style={{
                boxShadow: "0 0 0 1px rgba(15,23,42,0.08), 0 24px 64px rgba(15,23,42,0.08)",
              }}
            >
              <div
                key={activeRoleId}
                className={`flex-1 flex flex-col transition-opacity transition-transform duration-200 ${
                  activeRoleId === activeRole.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                }`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="h-6 w-32 rounded-full bg-slate-100 ring-1 ring-slate-300/50" />
                  <div className="h-4 w-20 rounded-full bg-indigo-100 ring-1 ring-indigo-300/40" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center text-center">
                  <div className="text-6xl font-bold mb-4 text-slate-900">
                    {activeRole.stat}
                  </div>
                  <div className="text-slate-500 font-medium mb-8 uppercase tracking-widest text-xs">
                    {activeRole.highlight}
                  </div>
                  
                  <div className="space-y-3 max-w-xs mx-auto w-full">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={`h-12 rounded-lg border shadow-sm flex items-center px-4 gap-3 transition-colors duration-300 ${
                          i === 1
                            ? "bg-white border-slate-200"
                            : i === 2
                            ? "bg-slate-50/90 border-slate-200/60"
                            : "bg-indigo-50/60 border-indigo-200/40"
                        } hover:shadow-md hover:-translate-y-[1px]`}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            background:
                              i === 1
                                ? "rgb(15,23,42)"
                                : i === 2
                                ? "rgb(71,85,105)"
                                : "rgb(99,102,241)",
                          }}
                        />
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
    </section>
  );
};

export default VisibilitySection;
