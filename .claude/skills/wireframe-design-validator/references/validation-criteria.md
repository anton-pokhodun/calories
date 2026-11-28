# Validation criteria (categories A–J)

For each check: what is measured, where the data comes from (extractor field or Plugin API
property), whether it is **objective** (verifiable from structured data) or needs **visual** /
**device** inspection, and the default severity. Severity can go down for an intentional
exception or a default-only rule (SKILL.md §5), and up when the problem breaks layout.

General rules
- Compare like with like: the same component, the same region name, the same role across screens.
- Derive the **observed pattern** per element type before judging a value: dominant value with
  ≥ 60 % share and ≥ 3 occurrences. A value is a deviation from the pattern, not from your taste.
- A value set in a main component is reported once, on the component (all instances inherit it).
- Instance internals (`insideInstance`) are excluded from per-screen spacing / overflow checks.

## A. Frame dimensions

| Check | Data | Type | Default severity |
|---|---|---|---|
| A1 Screen size = target device (rules §1) unless excepted | `w`, `h` | Objective | Critical (wrong size) · Suggestion (unlisted tall scroll frame) |
| A2 Orientation portrait | `orientation` | Objective | Critical |
| A3 Accidental resize: size off by a few px (e.g. 390 × 843) | `w`, `h` | Objective | Critical |
| A4 Frame chrome consistent (radius, stroke, clip) | `radius`, `clips` | Objective | Minor |
| A5 Naming convention (rules §2) | `name` | Objective | Minor |

## B. Spacing and padding

| Check | Data | Type | Default severity |
|---|---|---|---|
| B1 Auto Layout padding / gap on the spacing scale | `spacing`, `offScaleSpacing` | Objective | Minor (Suggestion if Default-only) |
| B2 Same component / region uses the same padding on every screen | per-element `paddingX`, overrides with `padding*` | Objective | Major |
| B3 Horizontal screen margin = 16 (non-full-bleed regions) | `leftEdges`, `rightEdges` | Objective | Major if inconsistent across screens, Minor if one-off |
| B4 Vertical spacing between sections consistent | y gaps between consecutive `Region/` children (targeted read) | Objective | Minor |
| B5 One-off values (used once in the scope) | `spacing` histogram | Objective | Suggestion |

## C. Alignment

| Check | Data | Type | Default severity |
|---|---|---|---|
| C1 Common left/right content boundary | `leftEdges` / `rightEdges` histograms (values other than 0, 16 and full-bleed) | Objective | Minor; Major if a repeated element sits on different edges across screens |
| C2 Items inside repeated components align (icon, text, trailing value) | main-component children x positions (targeted read) | Objective | Minor |
| C3 Same element at the same position across screens (header title, close button, primary CTA, tab bar) | node box by name / component across frames | Objective | Major if ≥ 4 px difference |
| C4 Optical alignment, centring of glyphs | screenshot | Visual | Suggestion |

## D. Component consistency

Element families: buttons, inputs, cards, navigation bars, headers, tabs, icons, progress indicators,
list rows, sheets.

| Check | Data | Type | Default severity |
|---|---|---|---|
| D1 Same family → same size, padding, radius, typography | instances by `mainComponent`, overrides (`width`, `height`, `padding*`, `cornerRadius`, `fontSize`) | Objective | Major |
| D2 Look-alike elements built from different components or as plain frames | components with similar names / sizes; non-instance frames similar to a component | Objective + Visual | Suggestion (unconfirmed) → Major (confirmed) |
| D3 Instance resized instead of Fill/Hug | overrides `width`/`height` on instances in Auto Layout parents | Objective | Suggestion |
| D4 Variant usage consistent (e.g. same state shown with the same variant) | `variant` in `components` | Objective | Minor |

## E. Typography

| Check | Data | Type | Default severity |
|---|---|---|---|
| E1 One font family | `type` keys | Objective | Major |
| E2 Sizes on the type scale | `type` keys | Objective | Minor per value; Major if ≥ 3 off-scale sizes are used across screens |
| E3 Minimum size (rules §5, 11) | `smallText` | Objective | Minor (Major for body text) |
| E4 Weights from the allowed set | `type` keys | Objective | Suggestion |
| E5 Line heights consistent per role | `type` keys (lh) | Objective | Suggestion |
| E6 Alignment consistent per role | `type` keys (align) | Objective | Minor |
| E7 Text styles applied | `textStyleLinked` vs `textHardcoded` | Objective | see J |

## F. Auto Layout

Auto Layout is **not** required everywhere: overlays' dimmed backdrops, camera overlays, rings and
other drawn graphics may be absolute. Judge by purpose.

| Check | Data | Type | Default severity |
|---|---|---|---|
| F1 Stacks of ≥ 3 related children without Auto Layout | `absoluteStacks` | Objective | Minor (Suggestion if a drawing / exception) |
| F2 Absolute-positioned children inside Auto Layout | `absoluteChildren` | Objective | Suggestion unless it overlaps content |
| F3 Sizing: Fill / Hug / Fixed fit the role (full-width rows Fill, labels Hug, icons Fixed) | `layoutSizingHorizontal/Vertical` (targeted read) | Objective | Minor |
| F4 Fixed-size text boxes that will clip longer content | `fixedTextRisk` (`textAutoResize = NONE`, no truncation) | Objective | Minor; Suggestion for 1–2-character glyphs |
| F5 Padding / gap consistency in Auto Layout | see B | Objective | — |

## G. Overflow and clipping

| Check | Data | Type | Default severity |
|---|---|---|---|
| G1 Element outside its parent (no clip) | `overflow` | Objective | Major; Critical if outside the screen |
| G2 Element clipped by a clipping parent | `clipped` | Objective | Critical if content is cut; Suggestion if only padding is cut |
| G3 Text render bounds larger than its box | `overflow` kind "text exceeds its box" | Objective | Critical |
| G4 Overlapping siblings | `overlaps` (exclude exceptions: scrim, sheets, viewfinder, badges, rings) | Objective + Visual | Major if content hidden (confirm by screenshot) |
| G5 Long text / localisation risk on small screens | fixed widths + screenshot | Visual / Device | Suggestion |

## H. Safe areas and mobile usability

| Check | Data | Type | Default severity |
|---|---|---|---|
| H1 Status bar present at y = 0, height 44 | `statusBar` (or inside the page component) | Objective | Minor |
| H2 Nothing interactive under the status bar | boxes with y < 44 | Objective | Major |
| H3 Interactive element ending in the bottom 34 px | `bottomZone` | Device | Minor (device check) |
| H4 Touch targets ≥ 44 × 44 | `smallTargets` (visual box; hit area may be larger in code) | Objective (size) / Device (hit area) | Major for primary/row actions, Minor otherwise |
| H5 Bottom navigation pinned to bottom, content not hidden behind it | positions + screenshot | Objective + Visual | Major |
| H6 Readability (size, contrast within greyscale) | `smallText`, colours | Objective + Visual | Minor |

## I. Visual consistency

| Check | Data | Type | Default severity |
|---|---|---|---|
| I1 Colours from the ramp (rules §9) | `colors` | Objective | Minor per value; Major if near-duplicates are used for the same role |
| I2 Blue only as the `link` colour on tappable text, never on fills, borders or static text | `colors` + layer names | Objective | Minor |
| I3 Corner radii from the set (rules §8) | `radii` | Objective | Suggestion / Minor |
| I4 Shadows / effects (wireframes: none) | `effects` | Objective | Minor |
| I5 Icon sizes consistent (20–24) | `WF/Icon` instances, sizes | Objective | Minor |
| I6 Repeated visual patterns look the same | screenshots side by side | Visual | Suggestion |

## J. Design-system governance and compliance

Full method in `design-system-governance.md`. Checks: J1 components source of truth exists ·
J2 reusable elements are instances · J3 detached instances · J4 duplicate components · J5 instances of
deprecated / library components · J6 unnecessary overrides · J7 Variables / Styles exist and are
applied · J8 hardcoded values classified (linked / matches token / violates / exception) · J9 main
components outside the designated place · J10 token sheet on `04 — Components` exists and lists
every variable and text style with current values (Minor; `design-system-governance.md` §5a).

## K. Screen structure

Data: `structure-audit.js`, `layout-diagnostics.js`. Objective.

| ID | Check | Default severity |
|---|---|---|
| K1 | A plain screen (not an overlay) has no auto layout — regions are positioned by hand | Major (Project rule, `design-rules.md` §14) |
| K2 | Double wrapper: `Region/…` → unpainted frame → single instance | Minor |
| K3 | `Region/…` frame around one instance with no padding / fill — the instance should be the region | Suggestion |
| K4 | The same non-component frame structure on ≥ 3 screens — should be a `WF/…` component | Major |
| K5 | Visible sheet bottom ≠ screen bottom (or keyboard top); flow regions overlap | Minor; overlap of visible content → Major |
