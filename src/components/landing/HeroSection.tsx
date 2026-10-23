import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpDown, RotateCcw } from "lucide-react";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { prefersReducedMotion, scrollToId } from "@/lib/scrollToId";
import { getIndianFinancialYear } from "@/lib/indianFy";
import {
  countOpenTasks,
  dueRelativeLabel,
  filterTasksByScope,
  formatDueDate,
  getSampleDashboardTasks,
  isOverdue,
  nextDueSort,
  sortTasksByDue,
  toIsoDate,
  type DueSort,
  type FilingScope,
  type SampleTaskStatus,
} from "@/lib/sampleDashboard";

const STATUS_BADGE_CLASS: Record<SampleTaskStatus, string> = {
  Filed: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  "In Progress": "bg-muted text-text-secondary",
};

const FILING_SCOPES: { value: FilingScope; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open only" },
  { value: "overdue", label: "Overdue" },
];

const SCOPE_COUNT_NOUN: Record<FilingScope, string> = {
  all: "tasks",
  open: "open",
  overdue: "overdue",
};

const SCOPE_CAPTION: Record<FilingScope, string> = {
  all: "all filings",
  open: "open filings only",
  overdue: "overdue filings only",
};

const SORT_CAPTION: Record<DueSort, string> = {
  none: "in default order",
  asc: "sorted by due date, earliest first",
  desc: "sorted by due date, latest first",
};

const EMPTY_SCOPE_MESSAGE: Record<FilingScope, string> = {
  all: "No filings yet.",
  open: "Every filing is done.",
  overdue: "Nothing overdue. Every open filing is on schedule.",
};

const HeroSection = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  // Tilt and glow position move together, so keep them in one state update.
  const [pointer, setPointer] = useState({ rotateX: 0, rotateY: 0, bgX: 50, bgY: 50 });
  const tilt = pointer;
  const bgPos = { x: pointer.bgX, y: pointer.bgY };
  const [isHovering, setIsHovering] = useState(false);
  const frameRef = useRef<number | null>(null);
  const lastPointerRef = useRef<{ clientX: number; clientY: number } | null>(null);
  const currentFy = getIndianFinancialYear().label;
  // The sample data only changes with the day, not on every pointer-driven re-render.
  const todayKey = new Date().toDateString();
  const tasks = useMemo(() => getSampleDashboardTasks(new Date(todayKey)), [todayKey]);
  const overdueCount = useMemo(() => tasks.filter((task) => isOverdue(task)).length, [tasks]);
  const openCount = useMemo(() => countOpenTasks(tasks), [tasks]);
  const [filingScope, setFilingScope] = useState<FilingScope>("all");
  const [dueSort, setDueSort] = useState<DueSort>("none");
  const visibleTasks = useMemo(
    () => sortTasksByDue(filterTasksByScope(tasks, filingScope), dueSort),
    [tasks, filingScope, dueSort],
  );
  const isCustomView = filingScope !== "all" || dueSort !== "none";
  const resetView = () => {
    setFilingScope("all");
    setDueSort("none");
  };
  const DueSortIcon = dueSort === "asc" ? ArrowUp : dueSort === "desc" ? ArrowDown : ArrowUpDown;

  const cancelPendingFrame = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  useEffect(() => cancelPendingFrame, [cancelPendingFrame]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion()) return;

    lastPointerRef.current = { clientX: e.clientX, clientY: e.clientY };
    // Mouse events can fire several times per frame; render at most once per frame.
    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      const card = cardRef.current;
      const last = lastPointerRef.current;
      if (!card || !last) return;

      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = last.clientX - rect.left;
      const y = last.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      setPointer({
        rotateY: ((x - centerX) / centerX) * 4,
        rotateX: ((centerY - y) / centerY) * 4,
        bgX: (x / rect.width) * 100,
        bgY: (y / rect.height) * 100,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Drop any queued frame so a late update can't re-tilt the card after leave.
    cancelPendingFrame();
    lastPointerRef.current = null;
    setPointer((prev) => ({ ...prev, rotateX: 0, rotateY: 0 }));
    setIsHovering(false);
  }, [cancelPendingFrame]);

  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotion()) return;
    setIsHovering(true);
  }, []);

  // Shine keyframes live in src/index.css (.animate-hero-shine)
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6 animate-fade-in">
            A structured workspace for CA firms to run compliance work without chaos.
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Clients, financial years, filings, and documents — all connected logically.
            <br />
            No folders. No Excel trackers. No guesswork.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button
              type="button"
              size="lg"
              className="
                relative overflow-hidden
                h-12 px-8 text-base
                bg-primary text-primary-foreground
                shadow-[0_0_0_0_hsl(260_90%_70%/0.0)]
                hover:shadow-[0_0_24px_-4px_hsl(260_90%_70%/0.45)]
                transition-shadow duration-300
              "
              onClick={() => scrollToId("cta")}
            >
              <span className="relative z-10 flex items-center">
                Request early access
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>

              {/* moving light */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-0
                  bg-gradient-to-r
                  from-transparent
                  via-white/60
                  to-transparent
                  -translate-x-full
                  animate-hero-shine
                "
              />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
              onClick={() => scrollToId("core-idea")}
            >
              See how it works
            </Button>
          </div>
        </div>

<div
  ref={dashboardRef}
  id="sample-dashboard"
  className="mt-16 md:mt-20 scroll-mt-32"
  style={{ perspective: "900px" }}
>
  {/* OUTER WRAPPER = BORDER */}
  <div
    ref={cardRef}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    onMouseEnter={handleMouseEnter}
    className="relative rounded-xl"
   style={{
  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
  transition: "transform 120ms ease-out",
  padding: "4px",
background: isHovering
  ? `
radial-gradient(
  120% 120% at ${bgPos.x}% ${bgPos.y}%,
  hsl(210 100% 98%),
  hsl(230 90% 82%),
  hsl(260 85% 65%)
)
  `
  : "hsl(220 13% 90%)",
}}
  >
    {/* REAL CARD */}
    <div
      className="bg-card rounded-[11px] shadow-sm overflow-hidden"
      style={{
        boxShadow: isHovering
          ? "0 8px 28px -8px hsl(220 15% 20% / 0.14)"
          : "0 1px 3px 0 hsl(220 15% 20% / 0.04)",
        transition: "box-shadow 160ms ease-out",
      }}
    >

            {/* Window Controls */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-divider bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[hsl(0,72%,51%)]"></div>
                <div className="w-3 h-3 rounded-full bg-[hsl(45,93%,47%)]"></div>
                <div className="w-3 h-3 rounded-full bg-[hsl(142,71%,45%)]"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-text-tertiary">FirmOps— Client Dashboard</span>
        
              </div>
            </div>
            
            {/* Sidebar + Content */}
            <div className="flex">
              {/* Sidebar */}
              <div className="w-56 border-r border-divider bg-muted/20 p-4 hidden md:block">
                <div className="space-y-1">
                  <div className="px-3 py-2 bg-accent rounded-md text-sm font-medium">All Clients</div>
                  <div className="px-3 py-2 text-sm text-text-secondary hover:bg-accent/50 rounded-md">{currentFy}</div>
                  <button
                    type="button"
                    aria-pressed={filingScope === "open"}
                    aria-label={`Pending Filings, ${openCount} open`}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      filingScope === "open" ? "bg-accent/60 font-medium text-text-primary" : "text-text-secondary"
                    }`}
                    onClick={() => setFilingScope(filingScope === "open" ? "all" : "open")}
                  >
                    Pending Filings
                    <span
                      aria-hidden="true"
                      className="ml-2 inline-flex min-w-5 justify-center rounded-full bg-warning/10 px-1.5 text-xs font-medium text-warning"
                      data-testid="pending-filings-count"
                    >
                      {openCount}
                    </span>
                  </button>
                  <div className="px-3 py-2 text-sm text-text-secondary hover:bg-accent/50 rounded-md">Notices</div>
                </div>
                <div className="mt-6 pt-4 border-t border-divider">
                  <p className="text-xs text-text-tertiary uppercase tracking-wide mb-2 px-3">Clients</p>
                  <div className="space-y-1">
                    <div className="px-3 py-1.5 text-sm text-text-secondary">Sharma Enterprises</div>
                    <div className="px-3 py-1.5 text-sm text-text-secondary">Patel Industries</div>
                    <div className="px-3 py-1.5 text-sm text-text-secondary">Kumar & Sons</div>
                  </div>
                </div>
              </div>

              {/* Main Content - Table */}
              <div className="flex-1 p-6">
                <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-medium">Sharma Enterprises — {currentFy}</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <div
                      className="inline-flex rounded-md border border-border bg-muted/40 p-0.5"
                      role="group"
                      aria-label="Filter filings"
                    >
                      {FILING_SCOPES.map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={filingScope === value}
                          className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                            filingScope === value
                              ? "bg-background text-text-primary shadow-sm"
                              : "text-text-secondary hover:text-text-primary"
                          }`}
                          onClick={() => setFilingScope(value)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-text-tertiary" aria-live="polite">
                      {visibleTasks.length}{" "}
                      {SCOPE_COUNT_NOUN[filingScope]}
                      {overdueCount > 0 && filingScope !== "overdue" ? (
                        <>
                          {" · "}
                          {/* Shortcut to the Overdue view from the summary line. */}
                          <button
                            type="button"
                            className="rounded font-medium text-destructive underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label={`Show ${overdueCount} overdue ${overdueCount === 1 ? "filing" : "filings"}`}
                            onClick={() => setFilingScope("overdue")}
                          >
                            {overdueCount} overdue
                          </button>
                        </>
                      ) : null}
                    </span>
                    {isCustomView ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded text-xs text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        onClick={resetView}
                      >
                        <RotateCcw aria-hidden="true" className="h-3 w-3" />
                        Reset view
                      </button>
                    ) : null}
                  </div>
                </div>
                
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    {/* Tell screen reader users which client, year, filter and order they are hearing. */}
                    <caption className="sr-only" data-testid="sample-dashboard-caption">
                      Sharma Enterprises filings for {currentFy}: {SCOPE_CAPTION[filingScope]},{" "}
                      {SORT_CAPTION[dueSort]}.
                    </caption>
                    <thead className="bg-muted/50">
                      <tr>
                        <th scope="col" className="text-left px-4 py-2.5 font-medium text-text-secondary">Task</th>
                        <th scope="col" className="text-left px-4 py-2.5 font-medium text-text-secondary hidden sm:table-cell">Status</th>
                        <th scope="col" className="text-left px-4 py-2.5 font-medium text-text-secondary hidden md:table-cell">Assigned</th>
                        <th
                          scope="col"
                          aria-sort={
                            dueSort === "asc" ? "ascending" : dueSort === "desc" ? "descending" : "none"
                          }
                          className="text-left px-4 py-2.5 font-medium text-text-secondary hidden lg:table-cell"
                        >
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            onClick={() => setDueSort(nextDueSort)}
                          >
                            Due
                            <DueSortIcon aria-hidden="true" className="h-3.5 w-3.5" />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleTasks.length === 0 ? (
                        <tr className="border-t border-divider">
                          <td colSpan={4} className="px-4 py-6 text-center text-sm text-text-secondary">
                            <p>{EMPTY_SCOPE_MESSAGE[filingScope]}</p>
                            {/* A narrowed view with no rows is a dead end; offer the way back. */}
                            {filingScope !== "all" ? (
                              <button
                                type="button"
                                className="mt-2 rounded text-xs font-medium text-text-primary underline underline-offset-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                onClick={() => setFilingScope("all")}
                              >
                                Show all filings
                              </button>
                            ) : null}
                          </td>
                        </tr>
                      ) : null}
                      {visibleTasks.map((row) => {
                        const overdue = isOverdue(row);
                        const relative = dueRelativeLabel(row);
                        return (
                          <tr key={row.task} className="border-t border-divider">
                            <td className="px-4 py-3">
                              <span className="flex flex-wrap items-baseline gap-x-2">
                                <span data-testid="task-name">{row.task}</span>
                                {/* Assigned column is hidden below md; keep who owns the filing visible. */}
                                <span
                                  className="text-xs text-text-secondary md:hidden"
                                  data-testid="task-assignee-compact"
                                >
                                  <span className="sr-only">Assigned to </span>
                                  {row.assignee}
                                </span>
                              </span>
                              {/* Due column is hidden below lg; keep the date and late/left hint visible here. */}
                              <span
                                className="mt-0.5 block text-xs text-text-tertiary lg:hidden"
                                data-testid="task-due-compact"
                              >
                                {/* Status column is hidden below sm; lead the line with the filing status there. */}
                                <span
                                  className={`mr-1.5 inline-flex items-center rounded px-1.5 py-px text-[10px] font-medium sm:hidden ${STATUS_BADGE_CLASS[row.status]}`}
                                  data-testid="task-status-compact"
                                >
                                  {row.status}
                                </span>
                                Due{" "}
                                <time
                                  dateTime={toIsoDate(row.due)}
                                  className={overdue ? "font-medium text-destructive" : undefined}
                                >
                                  {formatDueDate(row.due)}
                                </time>
                                {relative ? (
                                  <span className={overdue ? "font-medium text-destructive" : undefined}>
                                    {" · "}
                                    {relative}
                                  </span>
                                ) : null}
                              </span>
                            </td>
                            <td className="px-4 py-3 hidden sm:table-cell">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STATUS_BADGE_CLASS[row.status]}`}>{row.status}</span>
                            </td>
                            <td className="px-4 py-3 text-text-secondary hidden md:table-cell">{row.assignee}</td>
                            <td className="px-4 py-3 text-text-tertiary hidden lg:table-cell">
                              <span className="inline-flex flex-col items-start gap-0.5">
                                <time
                                  dateTime={toIsoDate(row.due)}
                                  className={overdue ? "font-medium text-destructive" : undefined}
                                >
                                  {formatDueDate(row.due)}
                                </time>
                                {relative ? (
                                  <span
                                    className={
                                      overdue
                                        ? "text-[10px] font-medium uppercase tracking-wide text-destructive"
                                        : "text-[10px] font-medium uppercase tracking-wide text-text-tertiary"
                                    }
                                  >
                                    {relative}
                                  </span>
                                ) : null}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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

export default HeroSection;