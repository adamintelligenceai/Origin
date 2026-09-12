"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | undefined>();

  function onSubmit(event: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("email");
    const email = typeof value === "string" ? value : "";
    void fetch("/api/v1/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    }).then((response) => {
      if (!response.ok) {
        setError("Invite could not be recorded.");
        return;
      }
      setSubmitted(true);
    });
  }

  if (submitted) {
    return <p className="lede">Invite requested. We stored only the email you typed.</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      {error ? <p className="lede">{error}</p> : null}
      <button type="submit">Request invite</button>
    </form>
  );
}
