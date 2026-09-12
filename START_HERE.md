# START HERE — Cursor

## Your first action

1. Download/extract this folder.
2. Open **the folder itself** in Cursor.
3. Open `docs/MASTER_BLUEPRINT.md`.
4. Put Cursor in Agent mode using the strongest coding/reasoning model available to you.
5. Paste `CURSOR_BOOTSTRAP_PROMPT.txt`.
6. Do not ask Cursor to build the whole product in one run.
7. After Phase 0 is green, execute one phase at a time from `docs/CURSOR_PROMPTS.md`.

## Why the phases are strict

This product can access extremely sensitive personal context. The dangerous failure mode is not an ugly button; it is accidentally sending private content to logs/cloud, storing a token incorrectly, or letting untrusted email text reach an action tool.

Therefore:
- UI can iterate quickly.
- security boundaries fail closed.
- mutations arrive late.
- cloud stays content-blind.
- every external action is verified.
- naming stays last.

## Immediate milestone

Get to a desktop synthetic-data build where you can experience:

**Today → Decision → Approve → Executing → Verified → Receipt**

before connecting Gmail.

That is the product loop we will validate first.
