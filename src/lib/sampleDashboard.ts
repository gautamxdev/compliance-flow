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

/** "11 Nov 2026" — the compact due-date style used across the dashboard. */
export function formatDueDate(date: Date): string {
  return format(date, "d MMM yyyy");
}

/** yyyy-mm-dd for <time dateTime>, built from local date parts. */
export function toIsoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}
