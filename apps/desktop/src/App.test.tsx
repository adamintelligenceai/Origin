import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App.js";
import { resetRuntime } from "./runtime/session.js";

afterEach(() => {
  cleanup();
  resetRuntime();
});

describe("desktop product loop", () => {
  it("moves a decision from approve to verified and opens a receipt", async () => {
    render(<App />);
    await screen.findByText("Good morning.");
    expect(screen.getByText("Board prep with Amina")).toBeTruthy();
    expect(screen.getByText(/Tomorrow's meeting needs these three documents/)).toBeTruthy();
    expect(screen.getAllByText(/Overlaps/).length).toBeGreaterThan(0);
    const approve = screen.getAllByRole("button", { name: "Approve" }).at(0);
    if (!approve) {
      throw new Error("expected an approve button");
    }
    fireEvent.click(approve);
    expect(screen.getAllByRole("button", { name: "Executing" }).length).toBeGreaterThan(0);
    await waitFor(() => {
      expect(screen.getByLabelText("Action receipt")).toBeTruthy();
    });
    expect(screen.getAllByRole("button", { name: "Verified" }).length).toBeGreaterThan(0);
    expect(screen.getByText(/External state matched/)).toBeTruthy();
  });

  it("shows a distinctive privacy badge on the privacy route", async () => {
    render(<App />);
    await screen.findByText("Good morning.");
    fireEvent.click(screen.getByRole("button", { name: /Privacy/ }));
    expect(screen.getAllByText("On this device").length).toBeGreaterThan(0);
    expect(screen.getByText(/Email, calendar notes/)).toBeTruthy();
  });

  it("lets the user edit a proposed action before approval", async () => {
    render(<App />);
    await screen.findByText("Good morning.");
    const edit = screen.getAllByRole("button", { name: "Edit" }).at(0);
    if (!edit) {
      throw new Error("expected an edit button");
    }
    fireEvent.click(edit);
    const editor = screen.getByLabelText("Edit proposed action");
    fireEvent.change(editor, { target: { value: "Prepare a shorter follow-up" } });
    fireEvent.click(screen.getByRole("button", { name: "Save action" }));
    expect(screen.getByText(/Prepare a shorter follow-up/)).toBeTruthy();
  });

  it("answers Chief with structured work items", async () => {
    render(<App />);
    await screen.findByText("Good morning.");
    fireEvent.click(screen.getByRole("button", { name: "Ask Chief" }));
    expect(screen.getByText("Prepared for tomorrow")).toBeTruthy();
    expect(screen.getByText(/Structured work, not an essay/)).toBeTruthy();
  });

  it("wipes local state without offering cloud recovery", async () => {
    render(<App />);
    await screen.findByText("Good morning.");
    fireEvent.click(screen.getByRole("button", { name: /Privacy/ }));
    fireEvent.click(screen.getByRole("button", { name: "Wipe this device" }));
    fireEvent.click(screen.getByRole("button", { name: "Confirm wipe" }));
    fireEvent.click(screen.getByRole("button", { name: /Today/ }));
    expect(await screen.findByText("This device is empty.")).toBeTruthy();
  });
});
