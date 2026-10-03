/** Indian financial year runs 1 April – 31 March. */
export function getIndianFinancialYear(date: Date = new Date()): {
  startYear: number;
  endYear: number;
  label: string;
} {
  const month = date.getMonth(); // 0-indexed; April = 3
  const year = date.getFullYear();
  const startYear = month >= 3 ? year : year - 1;
  const endYear = startYear + 1;
  const endShort = String(endYear).slice(-2);
  return {
    startYear,
    endYear,
    label: `FY ${startYear}-${endShort}`,
  };
}
