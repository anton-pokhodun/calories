# Editing the wireframes and validating the change

Tools, API rules, verified constraints, naming, overlays, transition marks and prototype wiring are
those of `figma-wireframe-generator/references/figma-structure.md` (§1, §5, §6) and
`wireframe-principles.md`. Load `figma-use` before the first `use_figma` and pass it in
`skillNames`. The target file is the one in the sidecar or given by the user; never create a new
file unless explicitly asked.

## 1. Read-only inspection (before the proposal)

One read-only `use_figma` per page involved, returning for the target and related frames: name,
size, Section, `Region/` children with bounds, instances with `mainComponent` and variant, text,
`reactions` with destinations, `Note/` marks and captions pointing at the element. Plus:
- all frames that contain instances of the components to be changed;
- overlays whose `Region/Parent (dimmed) — copy of <target>` must follow the target;
- incoming reactions from other frames into the target.
Screenshot the journey row(s). Keep this dump — it is the "before" for scope control.

## 2. Plan

List exactly: frames to modify · state frames to redraw · new state frames the approved change
requires (named `<ScreenID> <Screen> / State: <state>`, placed at their journey position, following
frames shifted) · components or variants to change vs instances to override · backdrop copies to
refresh · reactions to rewire · transition marks, arrows and captions to move or rewrite ·
frames that must not change. Prefer changing a component when every instance should change;
override or detach only when the change is local.

## 3. Implementation rules

- Modify existing frames, regions and instances in place; keep frame names, IDs and region names
  (rename a `Region/` only if its meaning changed, matching the spec's Layout row).
- Small logical steps, one or two frames per call, every call retry-safe and returning the IDs it
  touched; screenshot after each step.
- Propagate: every related screen and state frame showing the element; every dimmed backdrop copy;
  persistent elements stay on every later frame of the journey.
- Fixed elements: respect the status bar and home-indicator safe areas; nothing overlaps another
  fixed element; content scroll area adjusts.
- Keyboard: when the change makes the keyboard-open layout part of the interaction (e.g. a bottom
  input), draw that state as a full frame with a low-fi keyboard block, the field and the results
  above it.
- Prototype: re-point reactions on the moved element, remove reactions to removed targets, keep
  `BACK` where closing returns to the origin; re-check the flow starting point.
- Removed frames go to `99 - Archive`, never deleted. Unrelated frames are not touched.
- No new elements beyond the approved scope; structural consequences listed in the proposal are
  allowed; design assumptions are logged.

## 4. Post-change validation — a separate pass

Evidence: a fresh read-only dump of the changed and related frames, compared field by field with
the "before" dump; screenshots of every affected row; the approved proposal and its state table.

**A. Requested change** — implemented on every frame in scope; matches the approved proposal, not
an earlier draft.
**B. Usability** — the interaction is understandable at a glance; the component is discoverable;
labels and affordances clear; consistent across related screens.
**C. State preservation** — every row of the state transition table is represented: preserved
values visible on the following frames, resets only at the agreed trigger, no frame shows user
input disappearing without cause.
**D. Layout** — no overlaps or clipped content; nothing hidden by the keyboard, bottom panels,
toasts or the home indicator; safe areas respected; touch targets ≥ 44 pt; text ≥ 12 px; content
still readable and the visible list portion sensible.
**E. Flow integrity** — every reaction on the changed frames points to an existing frame; incoming
reactions still land; arrows, badges and captions match the new positions; numbering per row still
consistent; dimmed backdrops match their parents.
**F. Scope control** — diff against the "before" dump: only planned frames changed; no unrelated
frame, component or reaction changed; no feature or behaviour introduced outside the proposal;
no copy changed that the proposal did not mention.
**G. Generator checklist** — run `figma-wireframe-generator/references/quality-checklist.md` §2
for the affected frames (G, T, D, F categories at least).

Severity and decision follow that checklist (CRITICAL / MAJOR / MINOR → FAIL / CONDITIONAL /
PASS); additionally CRITICAL = lost user input without approval, unrelated screen changed, a
broken main-journey reaction. Fix what preserves the approved intent and re-validate the touched
frames; stop at PASS, at decisions only, or after an issue survives two fixes (report it).
Update the sidecar's *Last validation* and *Not represented*.
