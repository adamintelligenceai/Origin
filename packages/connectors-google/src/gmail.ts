export interface GmailMessage {
  id: string;
  threadId: string;
  from: string;
  subject: string;
  text: string;
}

export function stripActiveHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractText(message: {
  payload?: { mimeType?: string; body?: { data?: string }; parts?: unknown[] };
  snippet?: string;
}): string {
  if (message.payload?.body?.data) {
    return Buffer.from(message.payload.body.data, "base64url").toString("utf8");
  }
  return message.snippet ?? "";
}
