"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: { preventDefault(): void }) {
    event.preventDefault();
    setSubmitted(true);
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
      <button type="submit">Request invite</button>
    </form>
  );
}
