import { format } from "date-fns";

/** When the Privacy Policy and Terms of Use were last revised. Update both pages together. */
export const LEGAL_LAST_UPDATED = new Date(2026, 8, 20);

/** "20 September 2026", the long date style used on the legal pages. */
export function formatLegalDate(date: Date): string {
  return format(date, "d MMMM yyyy");
}

/** yyyy-mm-dd for <time dateTime>, from local date parts. */
export function legalIsoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}
