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

export type FilingScope = "all" | "open" | "overdue";

/** Narrow the sample filings to the chosen scope: everything, open (not Filed), or overdue open ones. */
export function filterTasksByScope(
  tasks: SampleTask[],
  scope: FilingScope,
  today: Date = new Date(),
): SampleTask[] {
  if (scope === "open") return tasks.filter((task) => task.status !== "Filed");
  if (scope === "overdue") return tasks.filter((task) => isOverdue(task, today));
  return tasks;
}

/** How many sample filings are still open (anything not Filed). */
export function countOpenTasks(tasks: SampleTask[]): number {
  return tasks.reduce((n, task) => (task.status === "Filed" ? n : n + 1), 0);
}
