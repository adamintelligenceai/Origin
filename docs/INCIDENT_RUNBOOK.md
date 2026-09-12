# Incident runbook

1. Freeze mutating connectors.
2. Rotate any exposed OAuth client secret. Refresh tokens live on devices; revoke them from Google's consent screen if needed.
3. Do not pull user mailbox content into cloud logs while debugging.
4. Prefer local diagnostic bundles that have already been scrubbed.
5. Notify invited users only with content-free facts: what subsystem failed, whether actions were paused, and what they should revoke.
