# FULL PASS — audit everything, one proposal, one approval, fix in a fixed order

Default when the user runs the skill without naming a narrower mode ("validate", "/wireframe-design-validator <scope>",
"перевір і виправ"). Goal: on one run the file ends up tokenised, on-scale, structurally clean and documented —
without the user having to ask for each step. The only stop is **one approval gate** after the audit
(the Figma file is never changed without explicit approval).

## 1. Audit (read-only) — all of it, every run

Categories A–K (`validation-criteria.md`) on the requested scope **plus always**:

| Check | How | Finding |
|---|---|---|
| Tokens exist | local collections `color`, `size`, text styles `iOS/…` (`design-rules.md` §5, §8, §9) | J7 |
| Main components bound | every colour / text / non-zero padding-gap / radius in active main components on `04 — Components` bound to a variable or style; list raw values with the token they match | J8 |
| Off-scale values | spacing outside §3, radius outside §8, text outside §5 (glyphs exempt) — with the snap target (§3 below) | B / E / H |
| Raw overrides on screens | instance overrides whose raw colour matches a token | J6 |
| Token sheet | `design-system-governance.md` §5a | J10 |
| Screen structure | `references/structure-audit.js`: screens without auto layout, double wrappers, single-instance regions, repeated non-component frames | K1–K4 |
| Layout health | `references/layout-diagnostics.js`: region overlaps, sheets whose visible bottom ≠ screen bottom, tap-target marks not at target −4 / +8 | G, K5, mark drift |

## 2. One consolidated proposal

Write `design/validation/<ts>-<scope>-fix-proposal.md` with **all** phases below that have work, each with
counts, examples, visual effect (none / which components change height) and any new tokens or
components by name. Post one decision card: «Застосувати все» (recommended) / «Лише без візуальних змін»
(phases marked *no visual change*) / «Тільки звіт». The answer covers exactly the listed items.
Name screen-level changes explicitly in the proposal (instance overrides, screen restacking,
mark moves) — approval of "components" alone does not cover screens.

## 3. Fix phases — always in this order

| # | Phase | Visual change | Rules |
|---|---|---|---|
| P1 | Create missing tokens: `color` (mode `Wireframe`), `size` (`space/*`, `radius/*`, `radius/full` = 999), text styles `iOS/<Role>/<Weight>` (Inter, line height auto) | none | Values only from `design-rules.md`; consolidation table for near-duplicate colours (ΔRGB grouping → nearest token by role) is part of the proposal |
| P2 | Bind main components: colours (paint opacity kept; `scrim` → paint opacity 1), text styles (skip glyphs), non-zero on-scale padding / gap, radius (`radius/full` when radius = min(w,h)/2) | none | Own layers only (not nested instances); skip Deprecated, `Tokens`, `Note/`, documented exceptions |
| P3 | Snap off-scale values and bind | yes (heights) | Spacing → nearest scale value, ties → multiple of 8; radius → nearest, 10 → 12 for cards / rows-as-cards, 8 for fields / controls; exceptions in rules §12 stay raw |
| P4 | Rebind raw instance overrides on screens to the same tokens | only if the value changes (e.g. `#CCCCCC` → `#BDBDBD`) | Skip exceptions, `Note/` |
| P5 | Structure: flatten double wrappers (padding moves to the `Region/`), single-instance regions → the instance named `Region/…`, repeated frames (≥ 3 screens) → new `WF/…` components + instances with text overrides, plain screens → vertical auto layout (pinned regions and `Note/` → absolute position, gaps → itemSpacing / region padding) | none | Overlay frames keep layered absolute structure. Moving a node keeps its id, so mark targets stay valid |
| P6 | Restack and anchor | follows P3 | Absolute frames: shift regions by the height change of regions above; sheets: the **visible inner sheet** bottom = screen bottom (or keyboard top); a wrapped chip row pushes the regions below; afterwards no flow-region overlap ≤ 8 px may remain |
| P7 | Transition marks | — | Tap target = target bounds −4 / +8; badge and arrow with the same number move by the same dy; never touch unanchored legacy marks |
| P8 | Token sheet | — | Create / update (`design-system-governance.md` §5a) |
| P9 | Re-validation | — | Run both scripts again + extraction on changed frames; screenshots before/after: one frame per changed component family, every overlay with a changed sheet. Report every remaining overlap / clipping honestly |
| P10 | Documents | — | `design-rules.md` (what became a token / exception), sidecar `A-NN` lines in every flow `*.wireframes.md`, fix report `…-fix.md` |

## 4. Pitfalls learned (2026-11-28)

- Take the geometry snapshot (screen children, mark targets) **before** P3 and compare after; changes in a
  main component may reach instances on other pages only after the script — run P6 / P7 as a
  **separate call** after P3 and diagnose with `layout-diagnostics.js` rather than trusting in-script heights.
- Some sheet regions are taller than their visible sheet (fixed-height wrapper): anchor by the inner
  child's bottom, not the region's.
- A width change (padding 14 → 16) can wrap chip rows → height jumps by a whole row.
- Scripts that split `pluginData` lists on `;` break on instance ids (`I54:1372;3:48`) — use regex.
- Setting `layoutMode` on a frame makes it hug its content immediately: set `strokesIncludedInLayout = false`,
  `primaryAxisSizingMode = 'FIXED'` and `resize(390, H)` right after, and on any revert also restore the size
  with `resizeWithoutConstraints` (constraints would move bottom-pinned children). Check every screen is
  390 × its original height after P5.
- Converting to auto layout: flow regions must have symmetric horizontal margins (centre alignment), no
  overlaps and gaps absorbable into an unpainted auto-layout region's padding; otherwise leave the screen
  absolute and report it. Re-order only flow children into their own layer slots.
- Removing a wrapper can orphan a transition mark that targeted it: after P5 run `layout-diagnostics.js`
  and re-anchor marks with a missing target to the element under them (instance first).
- Componentising: build the master from the most common version; older copies (e.g. `(копія)` frames) become
  identical to the original — list them in the report. Do not componentise data-driven groups whose child
  sizes vary per screen (chart columns with bar heights, lists with a variable number of rows): nested
  instance layers cannot be moved or resized per instance; report them as "already built from components".
- `request_decision` texts: consequence ≤ 200 bytes, reason ≤ 200 bytes (Cyrillic ≈ 2 bytes/char).
