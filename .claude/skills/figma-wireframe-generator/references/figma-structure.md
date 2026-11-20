# Figma structure and tool usage

## 1. Tools

Names vary by installation (`mcp__…__use_figma`). Load all needed schemas in one `ToolSearch` call
(`use_figma, create_session, get_metadata, get_screenshot, whoami, create_new_file, get_figma_skill`).

| Need | Tool |
|---|---|
| Start work on a file (required before any file tool; reuse the `sessionId`) | `create_session` |
| Create / edit frames, shapes, text, components, reactions; read nodes; inline screenshots | `use_figma` (Plugin API JavaScript) |
| Structure read-back: page list (no `nodeId`) or XML of a node | `get_metadata` |
| Visual read-back — mandatory | `get_screenshot` or `await node.screenshot()` |
| New file | `whoami` → `create_new_file` (ask which plan if several) |

Do **not** use `generate_diagram` (FigJam) for the output.

Before the first `use_figma`, load the `figma-use` skill (installed skill or
`skill://figma/figma-use/SKILL.md`) and, before the first mutating call,
`figma-generate-design`; pass their names in `skillNames`. Their API rules apply: `return` node IDs,
`await figma.setCurrentPageAsync` (once per call), load fonts before text edits, colours 0–1,
`createAutoLayout` for stacks, `HUG`/`FILL` only after `appendChild`. For wireframes reuse only
wireframe-level components of the target file — do not import a brand design system.

### Verified constraints
- `connector`, sticky and shape-with-text nodes are blocked in design files → arrows are Vector
  lines with an arrowhead stroke cap (`setVectorNetworkAsync`).
- `setPluginData`, `loadAllPagesAsync`, `createImageAsync`, `figma.notify` do not work; images are
  grey placeholder boxes. `node.description` exists only on components.
- **Prototype reactions persist** (`node.setReactionsAsync`: NODE/NAVIGATE, NODE/OVERLAY, BACK read
  back correctly). Probe once per file anyway (§6). They only link top-level frames **on the same
  page**. `overlayPositionType` is read-only on frames.
- A clone/instance inside an overlay's dimmed backdrop keeps its reactions — clear them.
- A transient "classifier gave no verdict" error from the tool is not a Figma failure: retry the
  identical call once, then continue with other work.
- Figma draws each top-level frame's **name above it** — never put text there.

If a tool is missing or an operation keeps failing, stop that operation and report the exact error.
Never call something done without a read-back.

## 2. Target file

A Figma URL from the user (`/design/:fileKey/…`; for `/branch/:branchKey/` use the branch key;
`/board/` is FigJam — wireframes need a design file), else the link in the sidecar, else ask whether
to create `<Product> — Wireframes`. Use only links returned by a tool. Then `create_session`, then a
read-only inspection: pages (order), top-level frames with sizes, existing components, fonts. Adopt
an existing convention; never delete or rename user content without asking.

## 3. Pages — by functional area (project convention since 2026-11-20)

One file for the whole app. Pages follow functional areas and user flows, not screen types; system
states sit in a `States: <ScreenID>` row next to their screen, not on a separate page. Adopt an
existing file's structure; create only pages the MVP needs.

| # | Page | Contents |
|---|---|---|
| 0 | `00 — Overview` | One screen: compact chip map of all flows (ID + name, `→`) and a status table; never states or prose |
| 1 | `01 — Onboarding` | ON- flow rows, its states row, end copies of the screens it hands over to |
| 2 | `02 — Daily Logging` | Today (CT-01), food logging (CT-02…CT-08), editing (CT-04), settings (ST-) — one page because they form one loop and prototype links cannot cross pages; states rows next to their screens |
| 3 | `03 — Progress` | PR- rows and states; entry is a copy of CT-01 with the tab bar |
| 4 | `04 — Components` | Wireframe components in sections Core / Daily logging / Onboarding / Progress |
| 5 | `05 — Archive` | Replaced frames and earlier versions (one section per change, with a note why) |

A new area gets its own page only if its frames are not reached from another page's flow.
Prototype links cannot cross pages, so everything a user taps to reach within one flow lives on that
flow's page; a frame moved to another page loses its outgoing links (note it as not represented).
Where a flow continues on another page, end the row with a copy of the next screen `(копія)`.

## 4. Arrangement on a flow page

- **Rows = journeys.** Row 1 = the spec's main journey, entry → completion. Further rows = branches
  and secondary flows in the order their entry appears in the main journey. Each row is a `Section`
  named `Flow: <name>`.
- **Inside a row** frames follow the journey: screen → the overlay/state its action opens → the next
  screen. A state reached by a tap sits at its point in the journey.
- **Branches** start in the column of their origin frame, one row below; a screen is drawn once, a
  later row refers to it in a caption.
- Frame pitch 470 px (390 + 80 gap); section height = 40 + 844 + caption area (~1060); rows ~240 px
  apart. No large empty areas inside a flow.

## 5. Phone frames, naming, components

- One device size for the project (spec → user → existing file → 390 × 844, assumption `A-01`).
  Every screen / overlay / layout-changing state is a top-level FRAME of exactly that size,
  `clipsContent`, white, 1 px `#BDBDBD` stroke, corner radius 32. No bezel or notch drawing.
- Children, top to bottom: `Region/<name>` — one per Layout row of the spec (Status bar first).
  Fixed regions pinned to their edge; the scrolling area between; lists show the realistic visible
  portion, cut at the fold. Use auto-layout for stacks.
- Frame: `<ScreenID> <Screen name>` · state `… / State: <state>` · overlay `… / Overlay` (use the
  spec's IDs). Region: `Region/<name>`. Component: `WF/<Category>/<Name>` + variant properties.
  Annotation: `Note/…` (validation ignores them). Rows: `Flow: …`, `States: <ScreenID>`.
- Overlays: a full frame whose backdrop is a **dimmed copy of the parent's regions** (clone them
  into `Region/Parent (dimmed) — copy of <parent>`, clear their reactions, 40 % scrim above) —
  the copy must be refreshed whenever the parent changes. Placeholders only as a last resort.
- Components first (status bar, headers, rows, buttons, fields, tabs, stepper, sheet chrome, toast,
  sticky bars…), variants only for specified states; describe each in its `description`.

## 6. Marking and wiring transitions

For every Actions row that moves the user to another frame, make it readable **at a glance**:

1. **Tap target** — a 2 px blue outline rectangle (`Note/Tap target N`, radius 6, 4 px padding)
   around the element that is tapped, plus a 22 px numbered badge on its top-right corner
   (`Note/Badge N`).
2. **Arrow** — a 2 px blue arrow in the 80 px gap from the source frame to the next frame at the
   height of the tap target (clamped inside the frame), with a badge of the same number above it
   (`Note/Arrow N`). Numbers restart in each row. Only between neighbouring frames; never across
   content.
3. **Caption block** — one auto-layout block (`Note/Caption block`, 390 wide, 4 px gap, 12 px text)
   under each frame, in this order: origin line `↳ from <screen>: <gesture> <element>` in blue
   semibold (only for frames not reached by the previous frame's arrow, and for the main row's
   start `▶ prototype start`); a grey description of what the screen/state shows (system frames:
   `Система: …`); the outgoing action `N · <gesture> <element> →` in blue semibold. Jumps to other
   rows are named in text (`→ shows the portion sheet (row 1)`).
4. **No spec IDs** (`D3`, `Q9`, `§2.3`) and no long paragraphs on the canvas — mapping to the spec
   is by frame name and `Region/` names. Short, human wording only.
5. **Prototype connections** on the **tapped element**, not the frame: probe once per file (two
   throwaway frames, `ON_CLICK` → `{type:'NODE', destinationId, navigation:'NAVIGATE'}`, read
   `reactions` back, delete them). Then `NAVIGATE` for screens, `OVERLAY`/NAVIGATE to an overlay
   frame for sheets, `BACK` where closing returns to the origin. Set the flow starting point on the
   main row's first frame. Origin-dependent targets: wire the canonical origin, caption the others,
   list them as not represented. System-triggered steps (a scan succeeding, analysis finishing,
   typing) may use the nearest element as a stand-in — say so in the caption.
6. Never wire or draw a transition the spec's Actions tables do not contain.

## 7. Build order

1. Components (return IDs) → 2. row 1, one or two frames per call, regions from the spec; **screenshot
the row and look at it** → 3. branch rows → 4. system-state frames (`States: <ScreenID>` row under the screen's row) → 5. transition marks,
reactions, captions → 6. optional overview, page order → 7. validation.
Every call retry-safe, returns created IDs and counts; `placeholder = true` while building.

## 8. Efficiency

Batch related work per call; fan out multi-page work as parallel calls (one `setCurrentPageAsync`
each); measure large returns. Write element finders by name (`Region/…`, `Quick add (+)`) so marks
and reactions can be rebuilt after a relayout.

## 9. RELAYOUT of an existing file

1. Inventory frames read-only: size, number of non-`Note/` descendants, screenshot; classify each
   *phone screen OK* / *needs regions* / *not a wireframe*.
2. Re-plan rows from the spec's journeys. **Move** good frames into rows by changing parent Section
   and x/y — IDs and reactions survive. Add the missing regions; rebuild box-only frames; archive or
   delete (with the user's say-so) diagram cards.
3. Frames moved between pages lose links — move system states only, after checking nothing targets
   them. Keep the overview to one screen of chips.
4. Rebuild the transition marks (§6) and captions; validate with screenshots.

## 10. Sidecar `<dir>/<stem>.wireframes.md` (the only file this skill writes)

```markdown
# Wireframes — <spec path>
- Figma: <link returned by the tool>
- Device: 390 × 844 · Generated from spec SHA-256 <hash> on <date> · Handoff: <status>, iteration NN
- Rows (page `<NN — Area>`): Flow: <name> (n frames) · … · States: <ScreenID> (n frames) · Components: n

## Design assumptions
A-01 … (one line each: assumption · what it affects)

## Not represented
<transition or element> — <reason: tool limitation / system-triggered / leaves the app / blocked>

## Approved assumptions / pending in spec
<user-approved interpretations and answers not yet in the spec>

## Last validation
<date> · PASS | CONDITIONAL | FAIL · open MINOR issues, if any
```

Node IDs are not stored — find frames by name; the file is rewritten in place. If it grows beyond
a screen or two, something belongs in the spec or the Figma file instead.
