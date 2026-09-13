import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
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
    expect(screen.getByText(/Phone, SMS, mail, calendar notes/)).toBeTruthy();
  });

  it("lists phone, SMS, missed calls and social as local connections", async () => {
    render(<App />);
    await screen.findByText("Good morning.");
    fireEvent.click(screen.getByRole("button", { name: /Connections/ }));
    expect(screen.getByRole("heading", { name: "Connections." })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "This phone" })).toBeTruthy();
    expect(screen.getByText("Phone")).toBeTruthy();
    expect(screen.getByText("SMS")).toBeTruthy();
    expect(screen.getByText("Missed calls")).toBeTruthy();
    expect(screen.getByText("LinkedIn")).toBeTruthy();
    expect(screen.getByText("Instagram")).toBeTruthy();
    expect(screen.getByText("Facebook")).toBeTruthy();
    expect(screen.getByText("X")).toBeTruthy();
    expect(screen.getByText("Drive")).toBeTruthy();
    const phone = screen.getByText("Phone").closest("article");
    if (!phone) {
      throw new Error("expected the Phone card");
    }
    fireEvent.click(within(phone).getByRole("button", { name: "Revoke" }));
    expect(await within(phone).findByText("Revoked")).toBeTruthy();
    fireEvent.click(within(phone).getByRole("button", { name: "Pair" }));
    await waitFor(() => {
      expect(within(phone).queryByText("Revoked")).toBeNull();
      expect(within(phone).getByText("Paired")).toBeTruthy();
    });
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
