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

/**
 * Roving focus for the vertical role tablist (WAI-ARIA tabs pattern):
 * Up/Down (and Left/Right) wrap around, Home/End jump to the first/last tab.
 */
function getNextTabIndex(key: string, current: number, count: number): number | null {
  switch (key) {
    case "ArrowDown":
    case "ArrowRight":
      return (current + 1) % count;
    case "ArrowUp":
    case "ArrowLeft":
      return (current - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}

const VisibilitySection = () => {
  const { ref, visible } = useInView();
  const [activeRoleId, setActiveRoleId] = useState(roles[0].id);
  const activeRole = roles.find((r) => r.id === activeRoleId)!;
  const panelId = `visibility-panel-${activeRole.id}`;

  return (
    <section
      id="visibility"
      className="scroll-mt-24 overflow-hidden border-t border-divider py-20 md:py-28"
      aria-labelledby="visibility-heading"
    >
      <div className="container mx-auto px-6">
        <h2
          id="visibility-heading"
          className="mb-12 text-center text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Firm-wide clarity, tailored by role
        </h2>

        <div
          ref={ref}
          className={`grid items-center gap-12 transition-all duration-500 lg:grid-cols-2 lg:gap-20 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <div
            className="order-1 flex flex-col gap-4 lg:order-1"
            role="tablist"
            aria-label="Role views"
            aria-orientation="vertical"
          >
            {roles.map((role) => {
              const selected = activeRoleId === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  role="tab"
                  id={`visibility-tab-${role.id}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveRoleId(role.id)}
                  onKeyDown={(e) => {
                    const idx = roles.findIndex((r) => r.id === activeRoleId);
                    const nextIdx = getNextTabIndex(e.key, idx, roles.length);
                    if (nextIdx === null) return;
                    e.preventDefault();
                    const next = roles[nextIdx];
                    setActiveRoleId(next.id);
                    requestAnimationFrame(() => {
                      document
                        .getElementById(`visibility-tab-${next.id}`)
                        ?.focus();
                    });
                  }}
                  className={`relative w-full overflow-hidden rounded-2xl border p-6 text-left transition-colors duration-300 ${
                    selected
                      ? "border-transparent bg-card shadow-sm"
                      : "border-transparent bg-transparent text-text-secondary hover:bg-muted/50"
                  }`}
                  style={
                    selected
                      ? {
                          boxShadow:
                            "0 0 0 1px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.06)",
                        }
                      : { boxShadow: "none" }
                  }
                >
                  <div className="mb-1 text-sm font-semibold uppercase tracking-wider">
                    {role.label}
                  </div>
                  <div
                    className={`text-lg transition-colors ${
                      selected ? "text-text-primary" : "text-text-secondary"
                    }`}
                  >
                    {role.insight}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="order-2 lg:order-2">
            <div
              role="tabpanel"
              id={panelId}
              aria-labelledby={`visibility-tab-${activeRole.id}`}
              className="relative flex h-[440px] flex-col overflow-hidden rounded-2xl bg-[#F8FAFC] p-8 transition-shadow duration-300"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(15,23,42,0.08), 0 24px 64px rgba(15,23,42,0.08)",
              }}
            >
              <div
                key={activeRoleId}
                className="flex flex-1 flex-col opacity-100 transition-opacity duration-200"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="h-6 w-32 rounded-full bg-slate-100 ring-1 ring-slate-300/50" />
                  <div className="h-4 w-20 rounded-full bg-indigo-100 ring-1 ring-indigo-300/40" />
                </div>

                <div className="flex flex-1 flex-col justify-center text-center">
                  <div className="mb-4 text-6xl font-bold text-slate-900">
                    {activeRole.stat}
                  </div>
                  <div className="mb-8 text-xs font-medium uppercase tracking-widest text-slate-500">
                    {activeRole.highlight}
                  </div>

                  <div className="mx-auto w-full max-w-xs space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`flex h-12 items-center gap-3 rounded-lg border px-4 shadow-sm transition-colors duration-300 ${
                          i === 1
                            ? "border-slate-200 bg-white"
                            : i === 2
                              ? "border-slate-200/60 bg-slate-50/90"
                              : "border-indigo-200/40 bg-indigo-50/60"
                        } hover:-translate-y-[1px] hover:shadow-md`}
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{
                            background:
                              i === 1
                                ? "rgb(15,23,42)"
                                : i === 2
                                  ? "rgb(71,85,105)"
                                  : "rgb(99,102,241)",
                          }}
                        />
                        <div
                          className={`h-2 rounded-full bg-slate-100 ${
                            i === 1 ? "w-24" : i === 2 ? "w-32" : "w-20"
                          }`}
                        />
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
