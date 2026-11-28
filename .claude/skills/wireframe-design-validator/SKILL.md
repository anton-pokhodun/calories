---
name: wireframe-design-validator
description: Validates mobile-app wireframes in Figma for objective, measurable design consistency before implementation — frame dimensions, spacing and padding, alignment, component consistency, typography, Auto Layout, overflow and clipping, safe areas and touch targets, visual consistency, and design-system governance (component instances, detached instances, duplicates, Variables and Styles, hardcoded values). Three modes — AUDIT (report only), FIX (apply only fixes the user approved), AUDIT AND FIX (audit → approval → fix → re-audit). Writes timestamped reports to design/validation/. Use when asked to validate, audit, lint or check wireframes / Figma screens / layout consistency / design-system compliance, or to fix approved findings from such a report. Not a UX redesign tool; does not change flows, content or behaviour.
---

# Wireframe Design Validator

A measurable-quality gate for Figma wireframes, run before a flow is handed to implementation.
It reads structured data from Figma, compares it with configurable rules and with the patterns
the file itself establishes, and reports findings with evidence. It never "improves" a design.

Place in the project pipeline (`CLAUDE.md`):
`requirements-validator → figma-wireframe-generator → ux-wireframe-refiner → **wireframe-design-validator**`.
The generator's own VALIDATE checks the wireframe against the **spec** (screens, states, transitions);
this skill checks **design properties** (numbers, structure, tokens). They do not replace each other.

## 1. When to invoke

| The user says… | Mode |
|---|---|
| "Validate / audit / lint the wireframes", "check spacing / typography / consistency", "design-system compliance report" | **AUDIT** |
| "Fix WDV-003 and WDV-007", "apply the approved fixes from the last report" | **FIX** |
| "Validate and fix", "audit, then fix what I approve" | **AUDIT AND FIX** |
| A plain run (`/wireframe-design-validator <scope>`, "перевір", "validate") with no narrower ask | **FULL PASS** — AUDIT AND FIX over every category, tokens and structure, with one consolidated proposal and one approval (`references/full-pass.md`) |

Not this skill: changing what a screen contains or how it behaves (→ `ux-wireframe-refiner`),
generating frames (→ `figma-wireframe-generator`), spec completeness (→ `requirements-validator`),
subjective visual opinions ("make it nicer").

## 2. Required inputs

1. **Figma file** — URL or file key. Default for this project: `fBMPokQnQHUsG1G0KfOuJn` (see `CLAUDE.md`).
2. **Scope** — whole file, page(s), section(s) (`Flow: …`, `States: …`) or frame IDs/names.
   No scope given → list the pages with frame counts and ask; never silently audit everything.
3. **Rules** — `references/design-rules.md` (read it every run; the user may have edited it).
4. **Mode** — FULL PASS by default (`references/full-pass.md`); AUDIT only when the user asks for a report only. FIX requires a report and the list of approved finding IDs.
5. **Design-system source of truth** — discovered (§3 step 2), then confirmed by the user if ambiguous.

## 3. Workflow

**Step 0 — Tools.** Load Figma MCP schemas in one `ToolSearch` call:
`create_session, get_metadata, use_figma, get_screenshot, get_variable_defs, get_libraries, search_design_system`.
Read `references/figma-mcp-capabilities.md` — use only what is listed there as verified; if a tool is
missing or fails, record it under *Limitations* instead of guessing. Load the `figma-use` skill
(installed or `skill://figma/figma-use/SKILL.md`) before the first `use_figma` call. `create_session` once
per task; pass its `sessionId` on every file call.

**Step 1 — Scope inventory (read-only).** `get_metadata` without `nodeId` → pages. Per page in scope,
one read-only `use_figma` listing sections and top-level frames (`id | name | w×h`). Exclude
annotation layers (`Note/…` prefix and anything listed under *Ignored layers* in the rules).

**Step 2 — Design-system discovery** (`references/design-system-governance.md` §1): local Variables
collections, paint / text / effect styles, component pages and sections, subscribed libraries
(`get_libraries`). Decide the source of truth for components, variants, variables, text and effect
styles, spacing conventions. If none exists, that is an architectural finding (do not invent tokens).
If two candidates exist, ask the user once.

**Step 3 — Extraction (read-only).** For a page or section scope run
`references/extraction-page-aggregate.js` (≈ 40–45 frames per call, parallel calls; it aggregates values
across frames with example frames, which keeps one cause = one finding). For a few named frames run
`references/extraction-script.js` (≤ 8 frames per call, per-frame detail). Substitute the page id, the frame
range or IDs and the `RULES` block from `design-rules.md`. Both return aggregates (spacing,
edges, type, colours, radii, instances, overrides, detached, overflow, clipping, overlaps, touch
targets, bottom zone). Add targeted read-only calls only to confirm a candidate finding
(e.g. whether a value comes from the main component or an instance override).

**Step 4 — Visual evidence.** Screenshot every audited frame (page scope: every frame with a candidate finding plus one frame per flow row) (`await node.screenshot({scale:0.75})`
inside a read-only `use_figma`, or `get_screenshot`) and look at it. Screenshots are supplementary:
they confirm or downgrade a structured finding and produce *visual-inspection* items; they never
replace structured data when it exists.

**Step 5 — Evaluate** with `references/validation-criteria.md` (categories A–J). For every candidate:
classify the rule source (§5), check for an intentional exception, merge duplicates (one underlying
cause = one finding, list every affected frame in it), assign severity (§6) and evidence type.

**Step 6 — Report** (`references/report-template.md`). Save to
`design/validation/<YYYY-MM-DD-HHmm>-<scope-slug>-audit.md` (local time; never overwrite an earlier
report). Reply with: status, counts by severity, the 3–5 highest-impact actions, the report path.

**Step 7 — FIX** (FIX / AUDIT AND FIX / FULL PASS, `references/fix-workflow.md`): proposal → explicit
approval of finding IDs → minimal edits → re-audit of affected frames → `…-fix.md` report.
In FULL PASS the proposal covers every phase P1–P10 of `references/full-pass.md` (tokens, binding, snapping,
overrides, structure, restack, marks, token sheet, re-validation, documents) and is approved once; then the
phases run in that order without further questions, unless a phase finds something outside the proposal.

## 4. Rules for interacting with Figma MCP

- **AUDIT is strictly read-only.** Every `use_figma` call in AUDIT must only read; no property
  assignment, no `create*`, `remove`, `detach`, `setReactionsAsync`, `setSharedPluginData`, no
  `placeholder = true`. Re-read your script for setters before sending it.
- **Never modify Figma without explicit approval** of specific finding IDs in this conversation.
  Approval of one fix does not extend to others; "fix everything" still needs the proposal list
  (fix-workflow §2) confirmed once.
- Switch page at most once per `use_figma` call; fan out pages as parallel calls.
- Measure return size; keep each return < 60 KB (the extractor truncates and reports itself).
- Values inside instances belong to their main component: report and fix them there, not per instance.
- Do not use `generate_diagram`, `create_new_file`, `send_code_to_figma` or library imports.
- A tool call returning success is not evidence; read back.

## 5. Rule sources — never treat a default as a decision

Every expected value in a finding names its source:

| Source | Meaning | Can produce |
|---|---|---|
| **Project rule** | Written in `design-rules.md` §1 as *Project rule* (or in the spec) | Critical … Minor |
| **Recommended default** | Industry / platform default in `design-rules.md` | Minor or Suggestion only |
| **Observed pattern** | The dominant value the file itself uses for the same element (≥ 60 % of occurrences, ≥ 3 occurrences) | Major … Suggestion |
| **Intentional exception** | Listed in `design-rules.md` §12, or a documented project convention | Not a finding — counted in the report |

Never invent a missing specification; when neither a rule nor a clear pattern exists, the item is
a **Suggestion** or a question, not an error. Never change a design only because it differs from a
recommended default.

## 6. Severity and status

| Severity | Use for |
|---|---|
| **Critical** | Broken layout; wrong frame size/orientation for a screen; content inaccessible, clipped or outside the screen; overlap that hides content |
| **Major** | Significant inconsistency in spacing, alignment or component dimensions across screens; same UI element with different properties; touch target clearly below the minimum on a primary action; no centralized design system |
| **Minor** | Small deviation from an established rule or pattern (one-off spacing, off-scale size, naming) |
| **Suggestion** | Optional improvement, tokenization opportunity, unconfirmed duplicate, needs designer confirmation |

Evidence type on every finding: **Verified** (structured Figma data) · **Visual** (screenshot only — a
recommendation to inspect) · **Device** (needs real-device testing). Visual/Device items never
exceed Minor unless structured data supports them.

Status: **FAIL** — any Critical · **CONDITIONAL** — no Critical, ≥ 1 Major · **PASS** — only Minor /
Suggestion. Never claim PASS or 100 % compliance for properties listed under *Limitations*.

## 7. Finding format

ID `WDV-NNN` (unique within a report; a FIX report reuses the audit's IDs). Fields, all required:
ID · Screen/frame(s) · Element · Category (A–J) · Expected (value + rule source) · Actual · Severity ·
Evidence · Explanation · Recommended fix (where: main component / instance / frame).
One underlying cause → one finding with all affected frames.

## 8. Reporting requirements

Report sections (template in `references/report-template.md`): Executive summary · Scope and rules
used · Detailed findings (by category, then screen) · Cross-screen consistency · Design system
health report · Compliance metrics · Intentional exceptions · Recommended actions (by impact) ·
Visual-inspection recommendations (separate from verified problems) · Limitations.

## 9. Fix approval requirements (summary — details in `references/fix-workflow.md`)

Before any modification: list each change (finding ID, frame(s), node, current → new value, where it is
applied, what it may affect), and wait for explicit approval. Preserve layout, Auto Layout structure,
component instances, variants and intentional overrides; no redesign, no new tokens or components
without separate approval. When a FIX creates or changes variables or text styles, it also creates or
updates the **token sheet** on `04 — Components` so they are visible on the canvas
(`references/design-system-governance.md` §5a). After fixing: re-audit the affected frames, save a fix report, and — per
`CLAUDE.md` — say which documents need an update (non-behavioural fixes are recorded in the flow's
`<stem>.wireframes.md`; behavioural ones are out of scope and go to `ux-wireframe-refiner`).

## 10. Self-check before replying

- AUDIT made no write to Figma; every claim has structured evidence or is marked Visual/Device.
- Every finding has all 10 fields and a rule source; defaults produced at most Minor.
- No duplicate findings; exceptions are counted, not reported as errors.
- Limitations list what could not be inspected; compliance numbers are not overstated.
- The report file exists under `design/validation/` with a new timestamped name.
- If variables or text styles were created or changed: the token sheet on `04 — Components` is updated and screenshotted.
- FULL PASS: every phase of `references/full-pass.md` either ran, was not needed (say so), or was declined; `structure-audit.js` and `layout-diagnostics.js` were run after the fix and their remaining items are in the report.
