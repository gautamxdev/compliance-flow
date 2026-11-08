import { format } from "date-fns";
import { getIndianFinancialYear } from "@/lib/indianFy";

export type SampleTaskStatus = "Filed" | "Pending" | "In Progress";

export type SampleTask = {
  task: string;
  status: SampleTaskStatus;
  assignee: string;
  due: Date;
};

/**
 * Sample filings for the hero dashboard, with statutory-style due dates that
 * fall inside the financial year the dashboard is showing.
 */
export function getSampleDashboardTasks(date: Date = new Date()): SampleTask[] {
  const { startYear } = getIndianFinancialYear(date);
  return [
    { task: "GST R1 - October", status: "Filed", assignee: "Rahul M.", due: new Date(startYear, 10, 11) },
    { task: "GST R1 - November", status: "Pending", assignee: "Priya K.", due: new Date(startYear, 11, 11) },
    { task: "ITR Filing", status: "Filed", assignee: "Amit S.", due: new Date(startYear, 6, 31) },
    { task: "Tax Audit", status: "In Progress", assignee: "Rahul M.", due: new Date(startYear, 8, 30) },
  ];
}

/** Calendar-day compare: open (non-Filed) tasks past their due date. */
export function isOverdue(task: SampleTask, today: Date = new Date()): boolean {
  if (task.status === "Filed") return false;
  const dueDay = new Date(task.due.getFullYear(), task.due.getMonth(), task.due.getDate());
  const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return dueDay.getTime() < todayDay.getTime();
}

/** How far ahead the "Due soon" view looks, in calendar days (today included). */
export const DUE_SOON_DAYS = 7;

/** Open (non-Filed) tasks due today or within the next DUE_SOON_DAYS days. Overdue ones are not "soon". */
export function isDueSoon(task: SampleTask, today: Date = new Date()): boolean {
  if (task.status === "Filed") return false;
  const days = calendarDaysBetween(today, task.due);
  return days >= 0 && days <= DUE_SOON_DAYS;
}

/** "11 Nov 2026" — the compact due-date style used across the dashboard. */
export function formatDueDate(date: Date): string {
  return format(date, "d MMM yyyy");
}

/** yyyy-mm-dd for <time dateTime>, built from local date parts. */
export function toIsoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

/** Whole calendar days from `from` to `to` (local midnight). Negative means `to` is earlier. */
export function calendarDaysBetween(from: Date, to: Date): number {
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const b = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

/**
 * Compact relative due label for open filings:
 * "3 days late", "due today", "due tomorrow", "in 12 days".
 * Filed tasks return null — the due date alone is enough.
 */
export function dueRelativeLabel(task: SampleTask, today: Date = new Date()): string | null {
  if (task.status === "Filed") return null;
  const days = calendarDaysBetween(today, task.due);
  if (days < 0) {
    const n = Math.abs(days);
    return n === 1 ? "1 day late" : `${n} days late`;
  }
  if (days === 0) return "due today";
  if (days === 1) return "due tomorrow";
  return `in ${days} days`;
}

export type DueSort = "none" | "asc" | "desc";

/** Header click cycle for the Due column: default order → earliest first → latest first → default. */
export function nextDueSort(current: DueSort): DueSort {
  if (current === "none") return "asc";
  if (current === "asc") return "desc";
  return "none";
}

/**
 * Order tasks by due date without mutating the input. "none" keeps the
 * original order; ties keep their original relative order (stable sort).
 */
export function sortTasksByDue(tasks: SampleTask[], sort: DueSort): SampleTask[] {
  if (sort === "none") return tasks;
  const dir = sort === "asc" ? 1 : -1;
  return [...tasks].sort((a, b) => dir * (a.due.getTime() - b.due.getTime()));
}

export type FilingScope = "all" | "open" | "due-soon" | "overdue";

/**
 * Narrow the sample filings to the chosen scope: everything, open (not Filed),
 * open ones due within the next week, or overdue open ones.
 */
export function filterTasksByScope(
  tasks: SampleTask[],
  scope: FilingScope,
  today: Date = new Date(),
): SampleTask[] {
  if (scope === "open") return tasks.filter((task) => task.status !== "Filed");
  if (scope === "due-soon") return tasks.filter((task) => isDueSoon(task, today));
  if (scope === "overdue") return tasks.filter((task) => isOverdue(task, today));
  return tasks;
}

/** How many sample filings are still open (anything not Filed). */
export function countOpenTasks(tasks: SampleTask[]): number {
  return tasks.reduce((n, task) => (task.status === "Filed" ? n : n + 1), 0);
}

/**
 * Case-insensitive match on task name or assignee. Blank queries keep every
 * task; extra whitespace in the query is ignored.
 */
export function filterTasksByQuery(tasks: SampleTask[], query: string): SampleTask[] {
  const needle = query.trim().replace(/\s+/g, " ").toLowerCase();
  if (!needle) return tasks;
  return tasks.filter(
    (task) =>
      task.task.toLowerCase().includes(needle) || task.assignee.toLowerCase().includes(needle),
  );
}

/**
 * Summary line for the rows currently shown: "1 task", "4 tasks", "2 open",
 * "1 due soon", "1 overdue". Only the "all" scope uses a noun that needs a plural.
 */
export function visibleCountLabel(count: number, scope: FilingScope): string {
  if (scope === "open") return `${count} open`;
  if (scope === "due-soon") return `${count} due soon`;
  if (scope === "overdue") return `${count} overdue`;
  return count === 1 ? "1 task" : `${count} tasks`;
}

export type MatchSegment = { text: string; match: boolean };

/**
 * Split `text` into plain and matching pieces for the search query, using the
 * same normalisation as filterTasksByQuery (trimmed, collapsed whitespace,
 * case-insensitive). A blank query returns the whole text as one plain piece.
 */
export function splitByQuery(text: string, query: string): MatchSegment[] {
  const needle = query.trim().replace(/\s+/g, " ").toLowerCase();
  if (!needle) return [{ text, match: false }];
  const haystack = text.toLowerCase();
  const segments: MatchSegment[] = [];
  let from = 0;
  let at = haystack.indexOf(needle, from);
  while (at !== -1) {
    if (at > from) segments.push({ text: text.slice(from, at), match: false });
    segments.push({ text: text.slice(at, at + needle.length), match: true });
    from = at + needle.length;
    at = haystack.indexOf(needle, from);
  }
  if (from < text.length) segments.push({ text: text.slice(from), match: false });
  return segments;
}

/** Quote a CSV field when it holds a comma, quote or line break (RFC 4180). */
function csvField(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/**
 * CSV for the filings currently on screen, in the order shown. Dates are
 * yyyy-mm-dd so spreadsheets sort them correctly; open filings carry their
 * late/left hint.
 */
export function tasksToCsv(tasks: SampleTask[], today: Date = new Date()): string {
  const rows = [
    ["Task", "Status", "Assigned", "Due", "Note"],
    ...tasks.map((task) => [
      task.task,
      task.status,
      task.assignee,
      toIsoDate(task.due),
      dueRelativeLabel(task, today) ?? "",
    ]),
  ];
  return rows.map((row) => row.map(csvField).join(",")).join("\r\n") + "\r\n";
}

/** "sharma-enterprises-fy-2026-27-filings.csv" from the client and FY label. */
export function filingsCsvFileName(client: string, fyLabel: string): string {
  const slug = `${client} ${fyLabel}`
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug}-filings.csv`;
}

export type DashboardView = { scope: FilingScope; sort: DueSort; query: string };

export const DEFAULT_DASHBOARD_VIEW: DashboardView = { scope: "all", sort: "none", query: "" };

const VIEW_PARAMS = { scope: "filter", sort: "due", query: "q" } as const;
const SCOPES: readonly FilingScope[] = ["all", "open", "due-soon", "overdue"];
const SORTS: readonly DueSort[] = ["none", "asc", "desc"];

/** Read a dashboard view from a URL query string; unknown values fall back to the default view. */
export function parseDashboardView(search: string): DashboardView {
  const params = new URLSearchParams(search);
  const scope = params.get(VIEW_PARAMS.scope) as FilingScope | null;
  const sort = params.get(VIEW_PARAMS.sort) as DueSort | null;
  return {
    scope: scope && SCOPES.includes(scope) ? scope : DEFAULT_DASHBOARD_VIEW.scope,
    sort: sort && SORTS.includes(sort) ? sort : DEFAULT_DASHBOARD_VIEW.sort,
    query: params.get(VIEW_PARAMS.query) ?? "",
  };
}

/**
 * Query string ("?filter=open&q=gst", or "" for the default view) that keeps
 * any unrelated params already in `search`. Default values are left out.
 */
export function dashboardViewSearch(view: DashboardView, search: string = ""): string {
  const params = new URLSearchParams(search);
  const set = (key: string, value: string, fallback: string) => {
    if (value === fallback) params.delete(key);
    else params.set(key, value);
  };
  set(VIEW_PARAMS.scope, view.scope, DEFAULT_DASHBOARD_VIEW.scope);
  set(VIEW_PARAMS.sort, view.sort, DEFAULT_DASHBOARD_VIEW.sort);
  set(VIEW_PARAMS.query, view.query.trim() === "" ? "" : view.query, "");
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}
