# Figma readiness

## What "ready" means
The document is clear and complete enough that a wireframe agent can build low-fidelity
frames for the **declared scope** without inventing behaviour. It does not mean the product is
perfect, and it does not require visual styling or technical architecture.

## Definition of Done
All must hold for PASS:

- [ ] The main user journey is complete (entry → completion state).
- [ ] All essential screens are identified.
- [ ] Each screen's responsibility is clear.
- [ ] Primary interactions are defined.
- [ ] Navigation transitions are consistent across diagrams and prose.
- [ ] Important UI states are documented.
- [ ] Reusable component behaviour is understandable.
- [ ] Important ambiguities are resolved.
- [ ] Contradictions are eliminated.
- [ ] Critical assumptions are identified as assumptions.
- [ ] No unresolved BLOCKER.
- [ ] Remaining accepted risks are explicitly documented (ACCEPTED_RISK in the ledger).

## Handoff

The verdict below is copied into the Handoff block of `<stem>.validation.md` together with the
spec hash, the Format verdict (V8), the parts blocked for wireframes, and the defaults the
generator should draw for open questions. `figma-wireframe-generator` reads that block instead of
re-running its own gate, so keep it exact: a part is "blocked" when an OPEN/NEEDS_DECISION
BLOCKER or HIGH touches it, or when a primary interaction has no result, or two sources disagree
on its navigation.

## Readiness assessment (report section 4)

Rate each deliverable **Ready / Partial / Not ready**, with one line of reason that cites
issue IDs.

| Deliverable | Ready when |
|---|---|
| Main flow frames | Every main-path screen is identified and wireframe-able (V4), its transitions are defined (V3), no BLOCKER/HIGH touches it. |
| Alternative state frames | Every state that matters for the main path (empty, no results, error, editing, first use…) is described well enough to draw (V5). |
| Reusable components | Repeated elements are identifiable as the same component, and their variants/states are stated (V5, V7 items 3–4). |
| Interactive prototypes | Every primary interaction has a trigger and destination, overlays have open/dismiss behaviour, back/close outcomes are defined (V3, V7 items 5–6, 10). |

Also answer the ten V7 questions (Yes / Partly / No + issue IDs) in a compact table.

## Decision rules

Counted issues are those with status OPEN or NEEDS_DECISION after reconciliation (no issue
is left in FIXED after a validation run — see validation-file.md).

- **FAIL** — at least one counted BLOCKER.
- **CONDITIONAL** — no counted BLOCKER, but at least one counted HIGH.
- **PASS** — no counted BLOCKER or HIGH, and every Definition-of-Done item holds.
  OPEN MEDIUM/LOW issues and ACCEPTED_RISK issues of any severity may remain; list them.

ACCEPTED_RISK issues are not counted, but are always listed in the report so the wireframe
agent knows about them.

Evaluate against the declared scope. If the document does not declare scope clearly, state
the scope you assumed in the report's executive summary and raise it as a finding if the
ambiguity changes which screens exist.
