---
name: ux-wireframe-refiner
description: Analyses, evaluates and implements user-requested changes to existing mobile-app wireframes in Figma (the output of figma-wireframe-generator) — e.g. move search to the bottom, reposition a primary action, replace tabs with another navigation pattern, restructure a list, move filters into a bottom sheet, change how items are selected, change how screens connect, simplify a workflow, change a component's behaviour, make an action more visible or accessible. Before touching Figma it researches the pattern (Apple HIG, Material, NN/g, Baymard, Mobbin, project research), analyses impact on layout, interaction, navigation, UI states and user context, writes a UX Change Proposal and asks for approval; then edits the existing frames in place, validates the result and hands behaviour changes back to the spec. Use when asked to change, move, rework, simplify or improve a screen, component or interaction in existing wireframes. Not for generating wireframes from a spec, visual polish or validating requirements.
---

# UX Wireframe Refiner

Third skill of the pipeline
`requirements-validator → figma-wireframe-generator → ux-wireframe-refiner`.
It takes a change the user asks for in **existing** wireframes, decides with evidence whether and
how to make it, and makes it without damaging the rest of the product.

**Main principle: improve the requested interaction without unintentionally damaging the existing
user experience or product behaviour.** The request is a hypothesis to evaluate, not an order to
execute blindly — and the user, not this skill, makes the product decision.

## 0. What this skill is and is not

| Is | Is not |
|---|---|
| A UX-driven refinement of an interaction, with evidence, impact analysis and state rules | A general visual editor or restyling tool |
| An in-place edit of the frames, components and prototype links involved | A rebuild of the file (that is `figma-wireframe-generator`) |
| A proposal the user approves before behaviour changes | A product owner: it never silently decides scope or behaviour |
| A source of decisions that then flow back into the spec | A replacement for `requirements-validator` |

## 1. Operations

| The user says… | Operation |
|---|---|
| "Move search to the bottom", "put filters in a sheet", "simplify adding food" | **REFINE** (§3, full workflow) |
| "Would X be better?", "analyse this change", "what are the options for…" | **ANALYSE** (§3 Steps 0–4, stops at the proposal; nothing changes in Figma) |
| "Yes, do it", "go with option B", answering a proposal | **IMPLEMENT** the approved proposal (§3 Steps 5–8) |
| "Check the change", "validate the refinement" | **VALIDATE** (§3 Step 7 on the last change) |
| "What changes are pending / what did we change?" | **STATUS** (read the change log, change nothing) |

Several requested changes in one message → one proposal per independent change, one combined
proposal for changes that affect each other. Target screen ambiguous → list candidates by ID and
by what the user sees, and ask.

## 2. Inputs and files

| File | Role | Written by |
|---|---|---|
| `<dir>/<stem>.md` | Spec — source of truth for behaviour, screens, states, decisions | requirements-validator (FIX) |
| `<dir>/<stem>.validation.md` | Handoff: hash, status, defaults | requirements-validator |
| `<dir>/<stem>.wireframes.md` | Sidecar: Figma link, device, assumptions, not represented, pending in spec | figma-wireframe-generator; this skill updates *Pending in spec*, *Not represented*, *Last validation* |
| `<dir>/<stem>.ux-changes.md` | Change log: one `UXC-NN` entry per change — proposal, evidence, state table, decision, result | this skill |
| `docs/**/research/*.md` | Prior pattern research (Mobbin analyses, comparisons) — read before researching anew | — |

Never edit the spec or the validation file yourself. Behaviour changes reach the spec through
`requirements-validator` RECORD DECISIONS (§3 Step 8). Formats: `references/change-proposal.md` §4.

References — read them when the step says so:
`references/ux-evidence.md` (sources, research procedure, evidence tags, prevalence vs quality) ·
`references/impact-and-state.md` (impact checklist, dependency tracing, state preservation, state
transition table) · `references/change-proposal.md` (change levels, approval, proposal template,
change log) · `references/refinement-validation.md` (Figma editing rules, post-change validation).
Figma conventions (tools, naming, regions, overlays, transition marks, prototype wiring) are those
of `figma-wireframe-generator/references/figma-structure.md` and `wireframe-principles.md` — follow
them; do not invent a second convention.

## 3. Workflow

**Step 0 — Inspect the project.** Find the spec, validation file, sidecar and change log; read the
spec's screen cards, decisions and open questions for the screens involved; read prior research and
any UX guidelines in `docs/`. Note existing skills. Load the Figma tool schemas in one `ToolSearch`
call. Figma unavailable → you can still ANALYSE; say plainly that nothing was changed.

**Step 1 — Inspect Figma, read-only** (`refinement-validation.md` §1). `create_session`, then
pages, the target frame, its state frames, overlays whose dimmed backdrop copies it, components it
uses (and every other frame using them), incoming and outgoing prototype reactions, captions and
transition marks. Screenshot the target row. The Figma file, not your memory of the spec, tells you
what is drawn now; the spec tells you what is intended. A mismatch between them is reported, not
silently fixed.

**Step 2 — Understand the request.** Restate it in one sentence: what moves or changes, on which
screens, and what problem the user is presumably solving (reachability, speed, discoverability…).
If the goal is unclear and the options for it differ materially, ask once. Classify the change
level (`change-proposal.md` §1); in doubt, the higher level.

**Step 3 — Research and analyse** (`ux-evidence.md`, `impact-and-state.md`). Proportional to the
level: a minor change needs no research. For moderate and major changes: platform guidelines and
research for this exact interaction, real-app observations (project research first, then Mobbin),
principles that actually apply; then the impact checklist A–F and the state transition table built
from the app's real states. Trace every dependency into related screens.

**Step 4 — Propose** (`change-proposal.md` §3). Moderate/major: write the UX Change Proposal into
the reply (and as `UXC-NN` with status PROPOSED in the change log). If the evidence says the
request would harm the experience, say so plainly and recommend the better option — but present
the requested one fairly. Ask for approval with AskUserQuestion (§5); open questions that change
the implementation are asked before implementing, one per call. Minor and unambiguous → state the
one-line plan and go to Step 5.

**Step 5 — Plan the edit** (`refinement-validation.md` §2). Exact frames, regions, components,
variants, overlays' backdrop copies, prototype reactions, transition marks and captions to change;
what must remain untouched. Snapshot the "before" (screenshots + read-only dump of the frames).

**Step 6 — Implement in small steps** (`refinement-validation.md` §3). Modify in place; reuse
components; propagate to every related screen and state; rewire reactions; re-screenshot after
each logical step.

**Step 7 — Validate, separately** (`refinement-validation.md` §4). Read back and compare with the
approved proposal, not with your intentions: requested change, usability, state preservation,
layout, flow integrity, scope control, plus the generator's checklist for the affected frames. Fix
what preserves the approved intent; anything needing a decision → ask. Successful tool calls are
not evidence.

**Step 8 — Record and hand back.** Update the change log entry (IMPLEMENTED / VALIDATED, result,
deviations). Minor visual change → done. Behaviour change → add it to the sidecar's
*Approved assumptions / pending in spec* as `UXC-NN` and, unless the user chose "Figma only",
run `requirements-validator` RECORD DECISIONS with the approved proposal as the product-owner
decision (it then does FIX → VALIDATE). Until the spec contains the change, a wireframe UPDATE from
the old spec would revert it — say so if the user declines the sync.

## 4. Never decide for the user

| Class | Example | Action |
|---|---|---|
| **Structural consequence** of the approved change | Search moved down → the toast that sat above the bottom panel must sit above the search too | Do it; list it in the proposal's scope |
| **Design assumption** | Exact spacing, the keyboard-visible frame's sample text | Do it; record in the change log entry |
| **Product decision** | Dropping a tab, removing an action, resetting entered data, adding a filter the spec lacks | Never silently; it is part of the proposal or an open question |

A finding in research or "most apps do X" is evidence for a decision, never the decision. In doubt
between assumption and decision, it is a decision.

## 5. Questions and approval

AskUserQuestion, one decision per call, 2–4 options, recommended first with "(Рекомендовано)" /
"(Recommended)", every screen named by ID **and** by what the user sees, in the user's language.
The approval question for a proposal offers: the recommendation (implement + sync spec) · the
originally requested variant if it differs · Figma only (spec sync later) · do not implement. An
explicit "just do it" from the user authorises moderate changes in that request without a separate
approval; major changes always need an explicit yes to the proposal itself
(`change-proposal.md` §2).

## 6. Boundaries

Not this skill's job: generating wireframes from scratch or after a spec change
(`figma-wireframe-generator`), writing or validating requirements (`requirements-validator`), final
UI/brand styling, app code, creating a new Figma file (only if the user explicitly asks), changing
unrelated screens. If a requested change is really a new feature, say so and route it to the spec
first.

## 7. Report after every run (short, user's language)

1. **Change** — `UXC-NN`, level, what was requested, what was decided.
2. **Evidence** — the 2–5 sources that carried the decision, tagged (`ux-evidence.md` §3).
3. **Figma** — frames / components / overlays / reactions modified, added, archived; link only as
   returned by a tool or given by the user.
4. **Validation** — PASS / CONDITIONAL / FAIL, issues fixed, what remains.
5. **States** — what is preserved, what resets and when (one line each).
6. **Spec sync** — synced via requirements-validator / pending in spec / not needed.
7. **Next actions** — only those that matter.

## 8. Self-check before replying

- The request was evaluated, not just executed; disadvantages of the chosen pattern are named.
- Every evidence claim has a tag and, where possible, a source and link; nothing is invented; "widely
  used" is never claimed from one or two examples.
- Impact analysis lists only real dependencies, traced into related screens, states, overlays'
  backdrop copies, components and prototype links.
- The state table uses the app's actual states; no user input is lost without an approved reason.
- Moderate/major changes were approved before Figma was touched; no product decision was made
  silently.
- Frames were modified in place; unrelated screens unchanged (compared with the "before" dump).
- Claims about Figma rest on read-back and screenshots.
- The change log, sidecar and spec-sync status agree with what was actually done.
