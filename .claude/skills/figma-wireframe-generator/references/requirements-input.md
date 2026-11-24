# Reading the spec and the Handoff

The generator does not re-validate requirements: `requirements-validator` did, and left a verdict.
This file says how to use it and what to do when it is not enough.

## 1. Locate

1. Files named by the user, exactly.
2. Otherwise the spec candidates under `docs/**/product/` (`*.md` with screen cards or flows);
   exclude research notes, prompts and `*.validation.md` / `*.wireframes.md`. One → use it and say
   so; several → list and ask.
3. `<dir>/<stem>.validation.md` next to the spec (its **Handoff** block) and, for UPDATE / STATUS,
   `<dir>/<stem>.wireframes.md`.
4. Hash the spec (`shasum -a 256`) and take the date (`date +%F`).
5. Read cited research only to resolve references, never as a source of new requirements.

## 2. Handoff check

| Situation | Meaning | Do |
|---|---|---|
| Handoff hash = spec hash, Status PASS | Validated | Proceed |
| Same hash, CONDITIONAL | Validated, some parts blocked | Draw only what is not listed under *Blocked for wireframes*; list the rest as not drawn |
| FAIL | Main flow not ready | Stop; summarise the blockers from the Handoff; send the user to `requirements-validator` |
| Hash differs | Spec changed after validation | Stop; ask for a new validation (draw from a stale spec only if the user explicitly insists; mark every result "unvalidated") |
| No validation file | Never validated | Stop; recommend running `requirements-validator` |
| Explicit user instructions only, no spec | Nothing to trace to | Ask for a spec; if the user insists, write the instructions into a minimal screen-card spec first and treat the result as unvalidated |

Never upgrade a status ("looks fine, so PASS").

## 3. Read the spec (format: `requirements-validator/references/spec-format.md`)

Extract, keeping the spec's IDs:
- **Journeys** — the main journey first; it becomes row 1.
- **Screen cards** — Goal, Entry, **Layout** rows (→ `Region/<name>` top to bottom, with their
  fixed / scrolls / sticky behaviour), **Actions** (element · gesture · result → a tap target and
  a transition), **States** (trigger, variant or own frame, what differs, persistent items).
- **Components** with variants; **decisions**; **open questions with their defaults** (draw the
  default); **content** (exact copy, the worked example run, sample values).

If the Handoff says **Format: Workable**, bridge the named gaps — derive region order from the
card's component list, treat an unclassified state as *own frame* if its layout visibly changes —
and record each bridge as a design assumption. **Format: Not met** is a stop (send the user back
to the validator). A fact that is genuinely absent (not just reshaped) is a gap: ask once, do not
invent.

## 4. Readiness inside the generator

The validator's gate is authoritative; the generator only notices what surfaces while parsing:
a screen with no Layout and no component list, a transition whose target does not exist, two
sources that disagree. Each is a question to the user (SKILL.md §5), not a guess. Blocked parts
from a CONDITIONAL Handoff are never drawn, nor anything reachable only through them.

User approval to draw a blocked part under a stated interpretation: record it (who, what, date)
in the sidecar under *Pending in spec*; silence is not approval.
