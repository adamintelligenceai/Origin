import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App.js";

afterEach(() => {
  cleanup();
});

describe("desktop product loop", () => {
  it("moves a decision from approve to verified and opens a receipt", async () => {
    render(<App />);
    await screen.findByText("Good morning.");
    const approve = screen.getAllByRole("button", { name: "Approve" }).at(0);
    if (!approve) {
      throw new Error("expected an approve button");
    }
    fireEvent.click(approve);
    expect(screen.getAllByText("Executing").length).toBeGreaterThan(0);
    await waitFor(() => {
      expect(screen.getAllByText("Verified").length).toBeGreaterThan(0);
    });
    expect(screen.getByLabelText("Action receipt")).toBeTruthy();
  });

  it("shows a distinctive privacy badge on the privacy route", async () => {
    render(<App />);
    await screen.findByText("Good morning.");
    fireEvent.click(screen.getByRole("button", { name: /Privacy/ }));
    expect(screen.getAllByText("On this device").length).toBeGreaterThan(0);
    expect(screen.getByText(/Email, calendar notes/)).toBeTruthy();
  });
});
