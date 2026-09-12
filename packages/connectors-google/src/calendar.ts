export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  htmlLink: string;
}

export function detectConflicts(events: CalendarEvent[]): [CalendarEvent, CalendarEvent][] {
  const conflicts: [CalendarEvent, CalendarEvent][] = [];
  const ordered = [...events].sort((left, right) => left.start.localeCompare(right.start));
  for (let index = 1; index < ordered.length; index += 1) {
    const previous = ordered[index - 1];
    const current = ordered[index];
    if (previous && current && previous.end > current.start) {
      conflicts.push([previous, current]);
    }
  }
  return conflicts;
}

export function normalizeEvent(raw: {
  id: string;
  summary?: string;
  htmlLink?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}): CalendarEvent {
  return {
    id: raw.id,
    title: raw.summary ?? "(untitled)",
    start: raw.start.dateTime ?? raw.start.date ?? "",
    end: raw.end.dateTime ?? raw.end.date ?? "",
    htmlLink: raw.htmlLink ?? ""
  };
}
