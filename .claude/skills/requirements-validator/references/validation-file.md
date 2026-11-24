# Validation file — `<dir>/<stem>.validation.md`

One file next to the spec holds the validator's **current state only**: handoff, open issues,
pending decisions. It is rewritten in place on every run. It is not a log — no reports, fix logs,
iteration history or resolved issues are kept; git holds the history. The full report and the fix
log go into the reply. The requirements document itself is never used for validator output.

## Layout

```markdown
# Validation — <spec path>

## Handoff
- Spec SHA-256: <hash> · validated <YYYY-MM-DD>
- Status: PASS | CONDITIONAL | FAIL
- Scope: <flows in / out> · platform · fidelity · language
- Format (spec-format.md): Full | Workable (<gaps the generator will bridge>) | Not met (<what is missing>)
- Blocked for wireframes: <screens / transitions that must not be drawn, with issue IDs> | none
- Proceed with defaults: <open questions with the default to draw, accepted risks> | none
- Next issue ID: RV-NNN

## Issues
| ID | Title | Severity | Category | Status | Resolution | Note |
|---|---|---|---|---|---|---|
(only OPEN, FIXED, NEEDS_DECISION and ACCEPTED_RISK rows; "None." when empty)

## Decisions
| Issue | Question | Decision (short) | Decided by (as reported) | Date |
(only decisions recorded but not yet written into the spec; "None." when empty — once a decision
is in the spec, the spec is its record and the row is removed)
```

Keep it short: one line per issue, the note says only what the next run needs.

## Issue IDs and statuses

- IDs `RV-001`… per document, sequential, never reused or renumbered. `Next issue ID` in the
  Handoff keeps the counter, so verified issues can be removed from the file.
- RV IDs live only in the validation file and the reply. They are not written into the spec.

| Status | Meaning | Set by |
|---|---|---|
| OPEN | Defect present, not addressed | VALIDATE |
| FIXED | Document edited to address it, not yet verified | FIX only |
| VERIFIED | A later validation confirmed it is gone → the row is removed | VALIDATE only |
| ACCEPTED_RISK | Product owner explicitly accepted it | RECORD DECISIONS, on explicit approval |
| NEEDS_DECISION | Cannot be fixed without a product-owner decision | VALIDATE or FIX |

FIXED ≠ VERIFIED. ACCEPTED_RISK needs the acceptance statement quoted in the Note. NEEDS_DECISION
stays visible until the decision is recorded and applied.

## Reconciliation (VALIDATE step 8)

Do the fresh V1–V8 pass first, then reconcile, so the old ledger does not anchor the review.

For each fresh finding: match it to a ledger issue if it is the same defect (same root cause and
fact; wording and location may differ). Matched: OPEN / NEEDS_DECISION → keep; FIXED → the fix did
not work, set OPEN ("fix ineffective"); ACCEPTED_RISK → keep unless the text changed materially.
Not matched → new ID from `Next issue ID`, OPEN (or NEEDS_DECISION).

For each ledger issue in OPEN / FIXED / NEEDS_DECISION that the fresh pass did not find: FIXED →
VERIFIED; OPEN → re-check directly (gone → VERIFIED; still there → keep OPEN and add it to the
findings); NEEDS_DECISION → VERIFIED if the document now contains the decision, else keep.
VERIFIED rows are then removed. After reconciliation no issue is left in FIXED.

## Report (in the reply, not in the file)

Field labels stay in English; evidence quoted verbatim in the document's language; prose in the
user's language. Omit nothing — write "None." for an empty part.

1. **Summary** — document, SHA-256, date, declared scope (and any scope you had to assume),
   overall status, counts by severity, since the last run (verified / reopened / new / accepted).
2. **Findings** — every OPEN and NEEDS_DECISION issue, by severity then document order:
   `[RV-NNN] title` · Severity · Category (V1–V8) · Status (new / carried / reopened) · Location ·
   Evidence (quote; for missing items the text that creates the need and where you looked) ·
   Basis (Explicit | Inferred | Assumption | Missing | Product decision) · Problem · Why it matters
   for the wireframes · Recommended resolution (for a decision: the question and options found in
   the document) · Resolution type (Automatic | Requires Product Owner Decision).
3. **Missing information · Contradictions · Unresolved product decisions** — one bullet each with
   the RV IDs and the frames affected.
4. **Figma readiness** — the four-row deliverables table and the ten V7 questions
   (`figma-readiness.md`); accepted risks listed.
5. **Next actions** — numbered, highest impact first; which the FIX operation can do and which
   need the product owner.
6. **Decision** — FAIL | CONDITIONAL | PASS with one or two sentences and the scope it applies to.

A long report may be shortened to Summary, Findings and Decision when the user asked only for
the verdict.

## Fix log (in the reply, not in the file)

For each issue acted on: ID · original problem (one line) · every changed location as
`§ — "before" → "after"` · reason / source of truth (decision ID, section or diagram node) · new
status FIXED. Then "Escalated": issues the automatic-fix gate rejected, with the question for the
product owner.
