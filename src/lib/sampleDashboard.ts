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
