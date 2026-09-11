import { describe, expect, it } from "vitest";
import { ACCEPTED_UPLOAD_EXTENSIONS, REJECTED_UPLOAD_EXTENSIONS } from "@marginshield/schemas";

describe("upload security contract", () => {
  it("accepts only csv and xlsx in v1", () => {
    expect(ACCEPTED_UPLOAD_EXTENSIONS).toEqual([".csv", ".xlsx"]);
  });

  it("rejects macro-capable workbook formats", () => {
    expect(REJECTED_UPLOAD_EXTENSIONS).toEqual([".xlsm", ".xlsb", ".xls"]);
  });
});
