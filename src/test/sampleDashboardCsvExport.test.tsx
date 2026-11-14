import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";
import { filingsCsvFileName, tasksToCsv, type SampleTask } from "@/lib/sampleDashboard";

describe("tasksToCsv", () => {
  it("writes a header, ISO due dates and the late/left hint for open filings", () => {
    const tasks: SampleTask[] = [
      { task: "Tax Audit", status: "In Progress", assignee: "Rahul M.", due: new Date(2026, 8, 30) },
      { task: "ITR Filing", status: "Filed", assignee: "Amit S.", due: new Date(2026, 6, 31) },
    ];
    expect(tasksToCsv(tasks, new Date(2026, 9, 9))).toBe(
      "Task,Status,Assigned,Due,Note\r\n" +
        "Tax Audit,In Progress,Rahul M.,2026-09-30,9 days late\r\n" +
        "ITR Filing,Filed,Amit S.,2026-07-31,\r\n",
    );
  });

  it("quotes fields holding commas or quotes", () => {
    const tasks: SampleTask[] = [
      { task: 'GST R1, "Q3"', status: "Filed", assignee: "Kumar & Sons", due: new Date(2026, 0, 11) },
    ];
    expect(tasksToCsv(tasks).split("\r\n")[1]).toBe('"GST R1, ""Q3""",Filed,Kumar & Sons,2026-01-11,');
  });

  it("names the file after the client and financial year", () => {
    expect(filingsCsvFileName("Sharma Enterprises", "FY 2026-27")).toBe(
      "sharma-enterprises-fy-2026-27-filings.csv",
    );
    expect(filingsCsvFileName("Kumar & Sons", "FY 2026-27")).toBe("kumar-and-sons-fy-2026-27-filings.csv");
  });

  it("names a narrowed scope in the file name", () => {
    expect(filingsCsvFileName("Sharma Enterprises", "FY 2026-27", "overdue")).toBe(
      "sharma-enterprises-fy-2026-27-overdue-filings.csv",
    );
    expect(filingsCsvFileName("Sharma Enterprises", "FY 2026-27", "due-soon")).toBe(
      "sharma-enterprises-fy-2026-27-due-soon-filings.csv",
    );
    expect(filingsCsvFileName("Sharma Enterprises", "FY 2026-27", "all")).toBe(
      "sharma-enterprises-fy-2026-27-filings.csv",
    );
  });
});

describe("sample dashboard CSV export", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("downloads only the filings in the current view", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));
    let blob: Blob | undefined;
    const createObjectURL = vi.fn((b: Blob) => {
      blob = b;
      return "blob:filings";
    });
    const revokeObjectURL = vi.fn();
    Object.assign(URL, { createObjectURL, revokeObjectURL });
    let downloadName = "";
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      downloadName = this.download;
    });

    render(<HeroSection />);
    fireEvent.click(screen.getByRole("button", { name: "Overdue" }));
    fireEvent.click(screen.getByRole("button", { name: "Export CSV" }));

    expect(downloadName).toBe("sharma-enterprises-fy-2026-27-overdue-filings.csv");
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:filings");
    const text = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsText(blob!);
    });
    expect(text.trim().split("\r\n")).toEqual([
      "Task,Status,Assigned,Due,Note",
      "Tax Audit,In Progress,Rahul M.,2026-09-30,9 days late",
    ]);
  });

  it("is disabled when the view has no rows", () => {
    render(<HeroSection />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "zzz" } });
    expect(screen.getByRole("button", { name: "Export CSV" })).toBeDisabled();
  });
});
