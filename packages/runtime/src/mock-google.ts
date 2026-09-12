export interface MockCalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
}

export class MockGoogleClient {
  events: MockCalendarEvent[] = [
    {
      id: "evt-1841",
      title: "Board prep with Amina",
      start: "2026-09-13T09:00:00.000Z",
      end: "2026-09-13T10:00:00.000Z"
    },
    {
      id: "evt-1842",
      title: "Hold: proposal review",
      start: "2026-09-13T09:30:00.000Z",
      end: "2026-09-13T10:00:00.000Z"
    }
  ];
  drafts: { id: string; action: string }[] = [];
  sent: { id: string; action: string }[] = [];
  private originals = new Map<string, string>();

  listEvents(): Promise<MockCalendarEvent[]> {
    return Promise.resolve(this.events.map((event) => ({ ...event })));
  }

  patchEvent(id: string, end: string): Promise<{ id: string }> {
    const event = this.events.find((item) => item.id === id);
    if (!event) {
      return Promise.reject(new Error("Event not found"));
    }
    if (!this.originals.has(event.id)) {
      this.originals.set(event.id, event.end);
    }
    event.end = end;
    return Promise.resolve({ id: event.id });
  }

  restoreEvent(id: string): Promise<{ id: string }> {
    const event = this.events.find((item) => item.id === id);
    const previous = this.originals.get(id);
    if (!event || !previous) {
      return Promise.reject(new Error("Event not found"));
    }
    event.end = previous;
    this.originals.delete(id);
    return Promise.resolve({ id: event.id });
  }

  createDraft(action: string): Promise<{ id: string }> {
    const id = `draft-${this.drafts.length + 1}`;
    this.drafts.push({ id, action });
    return Promise.resolve({ id });
  }

  sendMail(action: string): Promise<{ id: string }> {
    const id = `sent-${this.sent.length + 1}`;
    this.sent.push({ id, action });
    return Promise.resolve({ id });
  }

  removeDraft(id: string): void {
    this.drafts = this.drafts.filter((item) => item.id !== id);
  }

  removeSent(id: string): void {
    this.sent = this.sent.filter((item) => item.id !== id);
  }

  reset(): void {
    this.events = [];
    this.drafts = [];
    this.sent = [];
    this.originals.clear();
  }
}
