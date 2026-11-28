# FIX and AUDIT AND FIX workflow

The validator fixes **measurable inconsistencies** only. It does not redesign, change flows,
content, copy, states or behaviour. Never modify Figma without explicit approval.

## 1. Preconditions

- An audit report from this skill (`design/validation/…-audit.md`) — or run AUDIT first.
- The user named finding IDs to fix ("fix WDV-003, WDV-007") or approved the proposal list (§2).
- Findings whose fix changes what the user sees or does (adding/removing elements, moving
  actions, changing copy or navigation) are **out of scope** → hand them to `ux-wireframe-refiner`.
- Load `figma-use` and `figma-generate-design` skills before the first mutating `use_figma` call
  (pass both in `skillNames`).

## 2. Proposal (before any change) — post it and wait

For each approved finding:

| Field | Content |
|---|---|
| Finding | `WDV-NNN` — one line |
| Change | node → property: current value → new value |
| Applied in | main component (all instances inherit) / instance / frame |
| Affected frames and components | names (and count of instances affected) |
| Preserved | Auto Layout structure, variants, intentional overrides, reactions, `Note/` marks |
| Side effects | height changes → restack needed; marks need re-sync (`figma-wireframe-generator` `figma-structure.md` §6a) |

New tokens / styles / components needed by a fix are listed separately as a **proposal** (name,
value, scope) and need their own approval. Ask once; the user's answer covers exactly the listed items.

## 3. Applying fixes

1. Smallest change that removes the finding; prefer the main component over instances.
2. One retry-safe `use_figma` call per page; return every mutated node ID and before/after values.
3. Never: detach instances, flatten, delete user content, rename frames other than the approved
   naming fixes, re-order layers beyond the fix, change text content, touch `Note/` layers except
   re-syncing marks after a height change.
4. After size changes inside a flow: re-sync transition marks per `figma-structure.md` §6a.
5. After creating or changing variables / text styles: create or update the token sheet on
   `04 — Components` (`design-system-governance.md` §5a) in the same FIX and screenshot it. Tell the
   user that variables live in *Local variables* (right panel with nothing selected) and the
   sheet shows them on the canvas.

## 4. Re-validation

Re-run the extractor on every affected frame (and frames using an edited main component),
screenshot them, confirm each fixed finding is gone and no new finding appeared. A finding that
survives two attempts → stop and report it.

## 5. Fix report and documents

Save `design/validation/<YYYY-MM-DD-HHmm>-<scope-slug>-fix.md`: approved IDs, applied changes
(before → after), re-validation result per ID, new findings, remaining open findings.
Per `CLAUDE.md`: non-behavioural Figma changes are recorded in the flow's `<stem>.wireframes.md`
(an `A-NN` assumption or the *Last validation* line) — propose that line to the user; do not edit
`*.validation.md` files or specs.

## 6. AUDIT AND FIX sequence

AUDIT (full report) → present the top findings and the proposal table → **wait for approval** →
FIX approved IDs → re-validate → fix report → reply with before/after counts.
