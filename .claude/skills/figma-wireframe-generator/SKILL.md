---
name: figma-wireframe-generator
description: Turns a validated requirements spec (the output of requirements-validator — a spec in the wireframe-ready format plus its validation Handoff) into low-fidelity mobile app wireframes in Figma — one phone-sized frame per screen with its real UI laid out inside, screens placed side by side in user-flow order, every tap marked and linked to the screen it leads to, plus prototype connections. Use when asked to generate or draw wireframes, mobile screens or a low-fi prototype in Figma from a spec; wireframe one flow or screen; update wireframes after the spec changed; re-lay out wireframes that came out as a diagram; validate or fix wireframes. Not a flowchart/diagram generator and not final UI design; does not write requirements or make product decisions.
---

# Figma Wireframe Generator

Second step of the pipeline `requirements-validator → figma-wireframe-generator`. It draws what the
validated spec says — screens, states, interactions — as **low-fidelity phone screens in Figma**,
arranged like a clickable prototype. Structure and behaviour come from the spec; visuals stay plain.

## 0. The deliverable is phone screens, not a diagram

The primary output is rows of 390 × 844 (or the project's device size) frames, each a complete
mobile screen with its UI drawn inside, side by side in the order the user meets them.

| This is a wireframe | This is NOT |
|---|---|
| A frame with status bar, header, search field with placeholder, tabs, five food rows (name · portion · kcal · "+"), a bottom summary bar | A rectangle labelled "Add Food Screen" |
| The same screen in its "No results" state, drawn in full | A node "No results" joined by an arrow |
| A dimmed parent screen with a bottom sheet holding stepper, unit toggle and "Add · 120 kcal" | A box "Portion sheet" with its states listed as text |

Never produce rectangles standing for screens, nodes standing for states, flowcharts, or text
descriptions instead of a layout; never use `generate_diagram`/FigJam. A compact flow overview is
optional and comes last. If the first thing a viewer sees looks like a flowchart, the run failed.

Three concepts: **screen** = its own frame · **UI state** = a component variant (only an element
changes) or a full frame of that screen (the layout changes) · **interaction** = a marked tap
target, a numbered arrow to the next frame and a prototype connection (`figma-structure.md` §6).

## 1. Operations

| The user says… | Operation |
|---|---|
| "Generate wireframes for X.md", "draw this flow / screen" | **GENERATE** (all, or the named flow / screen) |
| "The spec changed, update the wireframes" | **UPDATE** (§4) |
| "It looks like a diagram", "rearrange into screens" | **RELAYOUT** (`figma-structure.md` §9) |
| "Validate / review the wireframes" | **VALIDATE** |
| "Fix the wireframe issues" | **FIX** → VALIDATE |
| "What's the wireframe status?" | **STATUS** (read the sidecar, change nothing) |

GENERATE, UPDATE, RELAYOUT and FIX end with VALIDATE in the same request. No spec named and
several candidates → list and ask; never wireframe research notes or prompts.

## 2. Inputs and state — three files, nothing else

| File | Role | Written by |
|---|---|---|
| `<dir>/<stem>.md` | The spec (source of truth, `requirements-validator/references/spec-format.md`) | requirements-validator |
| `<dir>/<stem>.validation.md` | Verdict: **Handoff** block (hash, status, scope, format, blocked parts, defaults) | requirements-validator |
| `<dir>/<stem>.wireframes.md` | Figma link, device, spec hash used, design assumptions, not-represented list, last validation | this skill |

No inventory, flow-map, layout or traceability files: the spec's screen cards **are** the
inventory, flow map and layouts; the Figma file is the layout; frame names carry the spec's screen
and state IDs and `Region/<name>` layers carry its Layout rows. Never write into the spec or the
validation file. Format of the sidecar: `figma-structure.md` §10.

References — read them when the step says so:
`references/requirements-input.md` (reading the Handoff and the spec, readiness) ·
`references/wireframe-principles.md` (how each UI element is drawn, states, overlays, components) ·
`references/figma-structure.md` (tools, pages, rows, naming, transitions, build order, sidecar) ·
`references/quality-checklist.md` (validation).

## 3. Workflow

**Step 0 — Prerequisites.** Load the Figma MCP tool schemas in one `ToolSearch` call. If Figma is
unavailable, stop after Step 1 and say plainly that nothing was drawn. Target file: a URL from the
user, the link in the sidecar, or — only after a yes — a new file. Device size: spec → user →
existing file → default 390 × 844 recorded as assumption `A-01`.

**Step 1 — Read and gate** (`requirements-input.md`). Read the Handoff and check its hash against
the spec. PASS → proceed. CONDITIONAL → draw only what is not blocked. FAIL, missing or stale →
stop and send the user to `requirements-validator`; do not re-derive a verdict yourself. Parse the
screen cards, state your plan in the reply in three lines (rows, number of frames, what is
excluded), and ask only if something needed is genuinely absent.

**Step 2 — Build** (`figma-structure.md` §7–8): components first → one phone frame per screen drawn
region by region from the spec's Layout rows → overlays over a dimmed copy of the parent → state
frames → arrange in journey rows. Persistent elements stay in every later frame of the journey
until the spec removes them (`wireframe-principles.md` §5). Screenshot each journey row and look at
it before continuing: it must read as a row of app screens.

**Step 3 — Connect** (`figma-structure.md` §6): number every tap, add arrows and captions, wire
prototype connections (probe first), set the starting point. Interactions that cannot be wired go
to the sidecar's *Not represented*.

**Step 4 — Validate** (`quality-checklist.md`): read the file back (metadata, read-only script,
screenshots) and compare it with the spec. Successful tool calls are not evidence.

**Step 5 — Correct.** Fix whatever preserves product intent (missing regions, box-only frames,
lost persistent elements, naming, arrangement, overlapping notes, wrong reactions). Anything that
needs a product decision → ask (§5). Re-inspect the affected frames; update the sidecar.

## 4. UPDATE after the spec changed

The spec hash differs from the sidecar's → re-run the Handoff check (a changed spec needs a new
validation first). Then compare the spec with the Figma file by read-back — frame names, regions,
states, reactions — and change only what differs, in place, keeping unrelated frames and their
IDs; add new frames at their journey position (shift the following frames), move removed ones to the
`05 — Archive` page. Revalidate the changed frames and every frame they connect to. Report
spec changes, wireframe changes and visual adjustments separately. Never rebuild the file
wholesale unless asked.

## 5. Questions

Only for something the spec does not say and the Handoff does not default. AskUserQuestion, one
question per call, 2–4 options from the spec or its research, recommended first, screens explained
by ID **and** by what the user sees, in the user's language. An answer that changes behaviour
belongs in the spec: tell the user to record it through `requirements-validator`; draw from the
answer meanwhile only if the user says so, and list it in the sidecar under *Pending in spec*.

## 6. Never invent requirements

Every drawn element is traced to the spec or classified:

| Class | Meaning | Action |
|---|---|---|
| **Structural detail** | Needed only to draw something specified (status bar, scrim behind a specified sheet, sheet handle for a swipe-down) | Draw it |
| **Design assumption** | Low-impact choice (device size, spacing, illustrative sample values, placeholder wording) | Draw it; list it as `A-NN` in the sidecar |
| **Product decision** | Changes behaviour, scope, content, data or navigation (an extra tab bar, button, field, error text) | Do not draw; ask (§5) |

Competitor screenshots, references and "common practice" show how a wireframe is drawn, never what
the product contains. In doubt between assumption and decision, it is a decision.

## 7. Boundaries

Not this skill's job: writing or rewriting requirements, validating the business idea, product
decisions, final UI/brand styling, a design system, app code, flowcharts. Incomplete requirements
go back to `requirements-validator`. Asked for colour or polish → ask whether the user wants a
separate UI-design phase.

## 8. Report after every run (short)

1. **Input** — spec, hash, Handoff status, scope, device.
2. **Figma** — link (only as returned by a tool or given by the user), pages and rows, frames /
   components created, modified or reused, prototype links.
3. **Validation** — PASS / CONDITIONAL / FAIL, issues found and fixed, what remains.
4. **Assumptions and not represented** — counts, pointing to the sidecar.
5. **Next actions** — only the few that matter.

## 9. Self-check before replying

- Flow pages show phone screens side by side in journey order, not boxes and arrows; the Overview page is one compact screen.
- Every screen, overlay and layout-changing state in scope is a full phone frame with every Layout
  row of the spec as a `Region/`; persistent elements are present wherever the spec says.
- Every ring, badge and arrow is anchored to its element and re-synced after the last edit
  (`figma-structure.md` §6a).
- Every tap that leads to another frame is marked (ring · number · arrow · caption); no text
  collides with Figma's frame-name labels; no spec IDs on the canvas except in frame names.
- Nothing drawn without a source; no product decision resolved by you.
- Claims about Figma rest on a read-back and screenshots.
- The spec and the validation file were not modified; the sidecar matches the file.
