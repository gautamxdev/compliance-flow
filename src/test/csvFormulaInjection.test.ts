import { describe, it, expect } from "vitest";
import { csvField, tasksToCsv, type SampleTask } from "@/lib/sampleDashboard";

describe("CSV formula injection guard", () => {
  it.each(["=SUM(A1:A2)", "+91 98765", "-2+3", "@cmd", "\tTab", "\rCR"])(
    "neutralises a field starting with a formula trigger: %j",
    (value) => {
      const out = csvField(value);
      const unquoted = out.startsWith('"') ? out.slice(1, -1) : out;
      expect(unquoted.startsWith("'")).toBe(true);
    },
  );

  it("leaves ordinary values and inner dashes untouched", () => {
    expect(csvField("GST R1 - October")).toBe("GST R1 - October");
    expect(csvField("Rahul M.")).toBe("Rahul M.");
    expect(csvField("2026-09-30")).toBe("2026-09-30");
    expect(csvField("")).toBe("");
  });

  it("still quotes a neutralised value that holds a comma or quote", () => {
    expect(csvField('=HYPERLINK("x","y")')).toBe('"\'=HYPERLINK(""x"",""y"")"');
  });

  it("guards task and assignee names in the exported CSV", () => {
    const tasks: SampleTask[] = [
      { task: "=1+1", status: "Pending", assignee: "@evil", due: new Date(2026, 11, 11) },
    ];
    expect(tasksToCsv(tasks, new Date(2026, 11, 1)).split("\r\n")[1]).toBe(
      "'=1+1,Pending,'@evil,2026-12-11,in 10 days",
    );
  });
});
