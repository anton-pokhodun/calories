# Wireframe validation

A separate pass after every GENERATE / UPDATE / RELAYOUT / FIX and the whole of VALIDATE. It reads
the Figma file back; the return value of a write call is not evidence.

## 1. Evidence

1. `get_metadata` without `nodeId` → page list and **page order**; then per page frame names, IDs,
   sizes.
2. Read-only `use_figma` per page (parallel, one page switch each): per top-level frame — name,
   size, parent Section and position, `Region/` children, counts of visible non-`Note/`
   descendants by type, instances with `mainComponent` name and variant, all text except `Note/`,
   `reactions` with destinations, minimum font size. Measure the return size.
3. Screenshots: every journey row as a whole, every state section, the overview. Look at each.
4. Compare with the **spec** (screen cards: Layout, Actions, States; decisions; defaults) and the
   Handoff — not with your own notes.

## 2. Categories

**G. Visual wireframe form — first.**
G1 first page = the wireframes page · G2 every screen / overlay / layout-changing state in scope is
a top-level phone frame of the project size · G3 each frame has every `Region/` of its Layout rows,
starting with the status bar · G4 no "title-only" frame (fewer than ~12 visible UI elements is
suspicious — justify it from the spec or rebuild) · G5 nothing represented by a box, chip, node or
text description (chips only on the overview page) · G6 rows follow the journey, branches sit under
their origin · G7 the row screenshots read as a low-fi app prototype; someone can tell what each
screen shows and what is tappable · G8 the overview, if any, is compact and smaller than the
wireframes.

**T. Transitions readable — second.**
T1 every Actions row that leads to another frame has: tap-target ring + number on the element,
numbered arrow to the next frame (neighbours) or a named jump, caption `N · … →` · T2 every frame
not reached by an arrow has an origin line `↳ from …` · T3 captions are one block under the frame,
nothing overlaps another note, a frame-name label, a badge or a frame · T4 no spec IDs or long
paragraphs on the canvas · T5 numbering restarts per row and matches arrows and captions.

**A. Screen completeness** — every screen in scope exists; every entry/exit has a visible trigger;
no main-journey step lacks a frame.
**B. Functional completeness** — every action in the spec is a visible, labelled element; its
result is a target frame, a state frame or an annotated variant.
**C. Navigation** — every Actions row has one prototype reaction on its element, or is listed in
the sidecar's *Not represented* with a reason; no reaction or arrow without a spec row; no dead
ends; back/close per origin; starting point set; reactions inside dimmed backdrops cleared.
**D. States and continuity** — every spec state is represented (variant or frame); conditional
states show their condition; layout-changing states are drawn in full; **persistent elements are
present on every later frame of the journey** until the spec removes them (a bottom summary bar
that disappears two frames after it appeared is a defect); transient elements (toasts) appear only
in the frame showing their moment.
**E. Fidelity** — every element maps to the spec, a structural detail or an `A-NN` assumption; copy
matches the spec's wording; sample values add no fields; nothing implies unsupported behaviour;
re-read the spec text for each screen's primary action.
**F. Figma quality** — naming per `figma-structure.md` §5; repeated elements are instances;
consistent margins; no clipped or overlapping content; text ≥ 12 px; greyscale (annotation blue
only on `Note/` layers and arrows); no probe frames or leftover placeholders; dependent backdrop
copies match their parents.

## 3. Severity and decision

| Severity | Meaning |
|---|---|
| CRITICAL | G1–G5 failure; a main-journey screen or transition missing or wrong; invented feature; spec contradicted |
| MAJOR | G6–G7, T1–T3 failures; a persistent element lost; a required secondary screen / state / action missing; wrong conditional navigation; an unsourced element that implies behaviour |
| MINOR | T4–T5, G8, naming, alignment, cosmetic |

**FAIL** any open CRITICAL · **CONDITIONAL** no CRITICAL but open MAJOR, or documented product
decisions / tool limitations · **PASS** no open CRITICAL or MAJOR (MINOR may remain, listed).

## 4. Corrections

Fix without asking whatever preserves intent: missing regions, box-only frames, lost persistent
elements, missing or colliding transition marks, naming, arrangement, wrong reactions, elements
added without a source. Product decisions → ask. After fixes re-run §1 for the frames and the frames
linked to them, with fresh screenshots. Stop at PASS, at only-decisions-left, or if an issue
survives two fixes (report it).

## 5. Reporting

No report file: put the result in the reply (decision, frame counts, issues found / fixed /
remaining with frame names, not-represented items) and refresh the sidecar's *Last validation* and
*Not represented*. Issue IDs `WV-n` are only for the reply.
