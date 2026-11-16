# Validation file — `<dir>/<stem>.validation.md`

One file next to the spec holds all validator state: handoff, issue ledger, decisions, latest
report, last fix log, history. It is rewritten in place on every run — no per-iteration files, no
snapshots. The requirements document itself is never used for validator output.

## Layout

```markdown
# Validation — <spec path>

## Handoff
- Spec SHA-256: <hash> · validated <YYYY-MM-DD> · iteration NN
- Status: PASS | CONDITIONAL | FAIL
- Scope: <flows in / out> · platform · fidelity · language
- Format (spec-format.md): Full | Workable (<gaps the generator will bridge>) | Not met (<what is missing>)
- Blocked for wireframes: <screens / transitions that must not be drawn, with issue IDs> | none
- Proceed with defaults: <open questions with the default to draw, accepted risks> | none

## Issues
| ID | Title | Severity | Category | Status | Resolution | Note |
|---|---|---|---|---|---|---|
(OPEN and NEEDS_DECISION rows in full; VERIFIED rows one line each, kept so IDs are never reused)

## Decisions
| Issue | Question | Decision (short) | Decided by (as reported) | Date |
(or one line saying where the decisions are recorded in the spec, once they are all applied)

## Latest report
<report sections, below>

## Last fix log
<per edit: issue ID · location · before → after · source of truth; replaces snapshots. Replaced by
the next FIX>

## History
Iteration NN (<date>) — <PASS|CONDITIONAL|FAIL>: <counts>; <verified/reopened/new>; fix: <summary>
```

## Issue IDs and statuses

- IDs `RV-001`… per document, sequential, never reused or renumbered. A VERIFIED defect that
  reappears is reopened under the same ID; a different defect always gets a new ID.

| Status | Meaning | Set by |
|---|---|---|
| OPEN | Defect present, not addressed | VALIDATE |
| FIXED | Document edited to address it, not yet verified | FIX only |
| VERIFIED | A later validation confirmed it is gone | VALIDATE only |
| ACCEPTED_RISK | Product owner explicitly accepted it | RECORD DECISIONS, on explicit approval |
| NEEDS_DECISION | Cannot be fixed without a product-owner decision | VALIDATE or FIX |

FIXED ≠ VERIFIED. ACCEPTED_RISK needs the acceptance statement quoted in the Note. NEEDS_DECISION
stays visible in every report until the decision is recorded and applied.

## Reconciliation (VALIDATE step 9)

Do the fresh V1–V8 pass first, then reconcile, so the old ledger does not anchor the review.

For each fresh finding: match it to a ledger issue if it is the same defect (same root cause and
fact; wording and location may differ). Matched: OPEN / NEEDS_DECISION → keep; FIXED → the fix did
not work, set OPEN ("fix ineffective"); VERIFIED → regression, set OPEN ("reappeared");
ACCEPTED_RISK → keep unless the text changed materially. Not matched → new ID, OPEN (or
NEEDS_DECISION).

For each ledger issue in OPEN / FIXED / NEEDS_DECISION that the fresh pass did not find: FIXED →
VERIFIED; OPEN → re-check directly (gone → VERIFIED "resolved outside FIX"; still there → keep
OPEN and add it to the findings); NEEDS_DECISION → VERIFIED if the document now contains the
decision, else keep. After reconciliation no issue is left in FIXED.

## Report (section "Latest report")

Field labels stay in English; evidence quoted verbatim in the document's language; prose in the
user's language. Omit nothing — write "None." for an empty part.

1. **Summary** — document, SHA-256, iteration, date, declared scope (and any scope you had to
   assume), overall status, counts by severity, since last iteration (verified / reopened / new /
   accepted).
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

## Fix log (section "Last fix log")

For each issue acted on: ID · original problem (one line) · every changed location as
`§ — "before" → "after"` · reason / source of truth (decision ID, section or diagram node) · new
status FIXED. Then "Escalated": issues the automatic-fix gate rejected, with the question for the
product owner. The document's SHA-256 before and after the fix goes on the first line.
