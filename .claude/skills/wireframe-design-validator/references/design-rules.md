# Design rules — configuration

Editable configuration for `wireframe-design-validator`. These are **initial defaults, not universal
design decisions.** Change values here, not in the skill. Every rule carries its source:

- **Project rule** — already decided for this project (sources: `.claude/skills/figma-wireframe-generator/references/wireframe-principles.md`,
  `figma-structure.md`, specs in `docs/uk/`). Deviations can be Critical … Minor.
- **Default** — recommended default (platform guidelines, common practice). Deviations are at most Minor,
  usually Suggestion.
- **Observed** — filled in after an audit confirms the file's own dominant pattern and the owner accepts it.
  Until accepted, the validator derives observed patterns itself on every run.

Wireframes are low-fidelity: greyscale (plus the `link` colour for tappable text), one font family, placeholder icons. Rules below describe that
level of fidelity, not a final visual design.

## 1. Target device

| Rule | Value | Source |
|---|---|---|
| Screen frame size | 390 × 844 | Project rule (A-01 in `*.wireframes.md`) |
| Orientation | Portrait | Project rule |
| Frame corner radius / stroke | 32 · 1 px `#BDBDBD` · `clipsContent = true` | Project rule |
| Allowed other sizes | see §12 Exceptions (scroll-extended frames, comparison boards) | Project rule |
| Size tolerance | 0 px (any other size is a finding unless excepted) | Default |

## 2. Frame naming

| Rule | Value | Source |
|---|---|---|
| Screen | `<ScreenID> <Screen name>` (e.g. `CT-01 Сьогодні`) | Project rule (`figma-structure.md` §5) |
| State / overlay | `… / State: <state>` · `… / Overlay` | Project rule |
| Regions | `Region/<name>` | Project rule |
| Components | `WF/<Category>/<Name>` + variant properties | Project rule |
| Annotations (ignored by the validator) | `Note/…` | Project rule |
| Numbered / variant-board prefixes (`1 · …`, `Гілка · …`, `Страви 05 · …`) | Allowed only on variant/comparison boards; flag on screens of a main flow | Default |

## 3. Spacing scale

Since 2026-11-28 the scale is the variable collection `size` (`space/0 … space/48`, scope Gap, mode `Wireframe`). On-scale padding / gap in main components is bound; an unbound on-scale value is a J finding, an off-scale value a B finding. Zeros are not bound.

| Rule | Value | Source |
|---|---|---|
| Spacing scale (px) | 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48 | Default 4–48 from the task + 0 / 2 from Project rule (`wireframe-principles.md` §3) |
| Value explicitly stated in a spec | Wins over the scale | Project rule |
| Gap with `SPACE_BETWEEN` | Not checked against the scale | Default |
| Off-scale value inside a main component | One finding on the component, not per instance | Default |

## 4. Screen margins and content boundaries

| Rule | Value | Source |
|---|---|---|
| Horizontal screen margin | 16 px left and right | Project rule |
| Full-bleed elements (status bar, headers, list rows, sheets, tab bar, viewfinder) | 0 px margin allowed | Project rule |
| Inner card padding | 16 px | Project rule (`wireframe-principles.md` §2 Card) |
| Section spacing (vertical) | 24 px before a section header | Project rule |

## 5. Typography scale

Decision of the owner (2026-11-28): the wireframes follow the **iOS text styles** (Dynamic Type, default size).

| Role (iOS text style) | Size / weight | Source |
|---|---|---|
| Large Title | 34 Regular | Project rule (iOS) |
| Title 1 | 28 Regular / Semi Bold | Project rule (iOS) |
| Title 2 | 22 | Project rule (iOS) |
| Title 3 | 20 | Project rule (iOS) |
| Headline | 17 Semi Bold | Project rule (iOS) |
| Body | 17 Regular | Project rule (iOS) |
| Callout | 16 | Project rule (iOS) |
| Subheadline | 15 | Project rule (iOS) |
| Footnote | 13 | Project rule (iOS) |
| Caption 1 | 12 | Project rule (iOS) |
| Caption 2 | 11 (minimum) | Project rule (iOS) |

| Rule | Value | Source |
|---|---|---|
| Allowed sizes (px) | 11, 12, 13, 15, 16, 17, 20, 22, 28, 34 | Project rule |
| Font family | Inter (one family; stands in for SF Pro in wireframes) | Project rule |
| Weights | Regular, Medium, Semi Bold — each has its own text style | Project rule (owner, 2026-11-28) |
| Minimum size | 11 px (Caption 2) | Project rule |
| Text used as an icon glyph (✕, +, ⌕ …) | Not checked against the scale; sized as an icon | Project rule |
| Line height | Auto (as in the text styles) | Project rule (2026-11-28) |
| Text styles | Local styles `iOS/<Role>/<Weight>` (21) exist since 2026-11-28; every non-glyph text in a main component must use one → otherwise Major (J) | Project rule (owner, 2026-11-28) |

## 6. Buttons

| Rule | Value | Source |
|---|---|---|
| Primary / secondary button height | 48 px, full width minus margins | Project rule |
| Icon button visual size | ≥ 36 px allowed visually if the **hit area** ≥ 44 px | Default |
| FAB | 56 px circle | Project rule |
| Disabled | ≈ 40 % opacity + "disabled" in the layer name | Project rule |

## 7. Inputs

| Rule | Value | Source |
|---|---|---|
| Input field height | 48 px | Project rule |
| Search bar height | 44 px | Project rule |
| List row height | 56–72 px | Project rule |

## 8. Corner radius

Since 2026-11-28: variables `radius/2, 4, 8, 12, 16, 32, full` (collection `size`). `radius/full` = 999 is used wherever radius = half the element's smaller side (pills, round buttons, thin bars). Any other value is off-scale (the 5 / 6 / 10 / 14 / 18 found at creation were snapped on 2026-11-28: 10 → 12 for cards, 8 for fields and controls).

| Rule | Value | Source |
|---|---|---|
| Controls, fields | 8 | Project rule |
| Cards, sheets | 12 (16 for sheet tops observed) | Project rule / Observed |
| Pills, circular buttons | height / 2 (full) | Default |
| Screen frame | 32 | Project rule |
| Any other radius | Suggestion (tokenization), Minor if it differs for the same element across screens | Default |

## 9. Colour tokens (greyscale wireframe ramp)

Since 2026-11-28 these are local Figma variables: collection `color`, mode `Wireframe` (a `Design` / `Dark` mode can be added later with the same names). Fills and strokes in main components must be bound to them; a raw value that matches a token is a governance finding (J).

| Token | Value | Source |
|---|---|---|
| `text/primary` | `#1A1A1A` | Project rule |
| `text/secondary` | `#6B6B6B` | Project rule |
| `text/tertiary` | `#8A8A8A` — placeholders, hints | Project rule (owner, 2026-11-28) |
| `border/default` | `#BDBDBD` | Project rule |
| `border/subtle` | `#E0E0E0` — light outlines, dividers | Project rule (owner, 2026-11-28) |
| `fill/strong` | `#E0E0E0` | Project rule |
| `fill/subtle` | `#F2F2F2` | Project rule |
| `bg/default` | `#FFFFFF` | Project rule |
| `scrim` | `#000000` @ 40 % | Project rule |
| `link` | `#3D7BFF` — tappable text actions and links inside UI («N інгредієнтів», «Готово», `WF/Link`, «Додати фото»), their glyphs / icons, and the focus outline of an active field | Project rule (owner, 2026-11-28; may change later) |
| `annotation` | `#3D7BFF` — `Note/` layers and arrows. Same value as `link` for now: inside UI blue is valid only in the `link` uses above, not on backgrounds, dividers or static text | Project rule |
| Colour tolerance | ΔRGB ≤ 2 per channel counts as the same value | Default |

## 10. Touch targets and safe areas

| Rule | Value | Source |
|---|---|---|
| Minimum touch target | 44 × 44 px (iOS HIG; Android 48 dp) | Default |
| Status bar | Top 44 px; nothing interactive under it | Project rule (`WF/Status Bar` 390 × 44) |
| Home-indicator zone | Bottom 34 px; interactive elements ending inside it → device check | Default |
| Bottom navigation | Pinned to the bottom edge, content above it | Project rule |

## 11. Design-system governance

| Rule | Value | Source |
|---|---|---|
| Components source of truth | Page `04 — Components` (sections Core / Daily logging / Onboarding / Progress / …) | Project rule (`figma-structure.md` §3) |
| Deprecated components | Section "Deprecated …" on `04 — Components`; instances in flow pages are findings | Observed |
| Library components | None expected (no brand system for wireframes) | Project rule |
| Variables / Styles | Collections `color` (10 variables) and `size` (11 `space/*`, 7 `radius/*`), mode `Wireframe`, and 21 text styles `iOS/…` — enforce per value in main components; screen-level layers and instance overrides still raw at creation (see the token fix report) | Project rule (owner, 2026-11-28) |
| Token sheet | Section `Tokens — змінні кольорів і текстові стилі` on `04 — Components`, left of `Core`; swatches and samples bound to the variables / styles; kept in sync by every token FIX | Project rule (owner, 2026-11-28) |
| Reusable element threshold | Appears on ≥ 2 frames with the same behaviour → should be an instance | Project rule (`wireframe-principles.md` §7) |

## 12. Intentional exceptions

Listed items are counted in the report, not reported as findings. Add new ones only with the owner's say-so.

| Where | What | Why |
|---|---|---|
| Overlay frames (`… / Overlay`, sheets) | `Region/Parent (dimmed) — copy of …` is an absolute, non-Auto-Layout stack overlapping a scrim and the sheet | Project convention for overlays (`wireframe-principles.md` §6) |
| Camera frames (CT-05, CT-07) | Controls overlap the full-screen viewfinder | Camera UI |
| Sheet-style screens (CT-02 Додати їжу) | Frame fill `#525252` behind the sheet chrome | Sheet-over-context presentation |
| `Страви 14 …`, `Страви 16 …` | Frame height > 844 (scroll-extended view, variant board) | **Proposed — confirm** (first sample audit, WDV-001) |
| Bottom sheets | Sheet frame may extend below the screen edge if only its bottom padding is clipped | Drawing convention |
| `WF/Day/Group header` | Horizontal padding 13 (off-scale) | Spec decision Q63 (A-44 in `core-calorie-tracking-flow.wireframes.md`) |
| Bottom sheets | Bottom padding 34 (off-scale) = home-indicator inset | Safe area |
| `Note/…` layers | Ignored entirely | Annotations |
| `WF/Page/Add Food`, `WF/Camera Action`, `WF/Camera Pill` | Unbound colours `#525252`, `#808080`, `#C7C7C7`, `#000000` @ 18 / 35 % | Camera / backdrop, not part of the greyscale ramp |
| `WF/Dish/Composition Panel` | One text in `#D93333` left unbound (no status token yet) | Owner, 2026-11-28 |

## 14. Screen structure

| Rule | Value | Source |
|---|---|---|
| Plain screens | Vertical auto layout; pinned regions (tab bar, FAB, bottom action, sheet) and `Note/` layers use absolute position | Project rule (owner, 2026-11-28) |
| Overlay screens | Layered absolute structure allowed (scrim, dimmed copy, sheet) | Project rule |
| Regions | `Region/<name>`; a region made of one component is that instance; no unpainted wrapper frames between a region and its instance (padding belongs to the region) | Project rule (owner, 2026-11-28) |
| Repeated structures | A frame structure repeated on ≥ 3 screens is a component | Project rule (`wireframe-principles.md` §7) |
| Sheets | Visible sheet bottom = screen bottom, or the keyboard top when a keyboard is shown | Project rule (owner, 2026-11-28) |

## 13. Ignored layers

`Note/` prefix. Section `Tokens — …` / frame `Tokens / Sheet` on `04 — Components` (token sheet, documentation only). Add other prefixes here (e.g. `Debug/`).
