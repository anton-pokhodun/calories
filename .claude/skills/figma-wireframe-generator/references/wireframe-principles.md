# Wireframe principles

A wireframe here is a **low-fidelity picture of a real mobile screen**: someone who has never read
the spec should look at a frame and understand what the screen shows and what can be done on it.
It is detailed enough to show layout and functionality, without becoming final visual design.

## 1. Classifying unspecified details

Before drawing anything not literally in the spec, ask: *would a developer or product owner
reading this frame believe the product does something the spec does not say?*

- **No**, and it is needed to draw a specified thing → **Structural detail**.
  Examples: status bar; scroll container; scrim behind a specified bottom sheet; a back chevron
  where the spec says "back" without placing it; a placeholder box for a specified image or camera
  view; a sheet's drag handle when the spec says swipe-down closes it.
- **No**, and it is a free visual/layout choice → **Design assumption** (record `A-NN`).
  Examples: device size; spacing scale; ring vs bar where the spec allows either; position of a
  secondary action inside an already-specified header; illustrative sample values (§8).
- **Yes** → **Product decision**. Do not draw. Examples: an extra button, field, tab, filter,
  setting, confirmation dialog, error text the spec does not give, a navigation target, a
  validation rule, a bottom tab bar the spec does not mention, an empty state whose content the
  spec does not define.

Missing structure is never solved by inventing UI: if a screen's regions cannot be listed from the
spec's Layout rows (or, for a *Workable* format, from its component list), it is a gap (ask), not
a creative opportunity.

## 2. Mobile screen anatomy — how to draw each element

Draw every element as real shapes and text inside the phone frame. Use components (§7) when an
element repeats.

| Element | How to draw it (low-fi) |
|---|---|
| Status bar | 44–54 px strip at the top: "9:41" left, small grey signal/battery blocks right |
| Header / navigation bar | 56 px row: back chevron "‹" or ✕ (icon placeholder) left, title text centred or left, specified actions right; thin bottom separator line |
| Large title + supporting text | Title 24–28 px Semi Bold; supporting text 14 px secondary grey below |
| Primary button | Full-width (minus margins) 48 px rounded rect, dark grey fill `#1A1A1A`, white label text from the spec |
| Secondary / text button | Same size, white fill + 1 px border; or label-only text with underline-free emphasis |
| Disabled button | Primary style at ≈ 40 % opacity; layer name includes "disabled" |
| Input field | 48 px rect, 1 px border, placeholder text in secondary grey; label above if the spec has one; helper/error text below only if specified |
| Search bar | 44 px rounded rect, light fill `#F2F2F2`, magnifier icon placeholder, placeholder text; extra icons only if specified |
| Segmented control / tabs | Row of equal segments; selected one darker fill or bold underline |
| List row | 56–72 px: optional leading icon/thumbnail box, primary text, secondary text below, trailing value / chevron / action button; separator line |
| Section header | 13–14 px Semi Bold label (+ value right if specified), 24 px top spacing |
| Card | Rounded rect with 1 px border or `#F2F2F2` fill, 16 px padding, content inside |
| Progress / summary | Ring = two concentric ellipses (grey track + dark arc or partial stroke); bar = grey track rect + dark fill rect; numbers as text |
| Stepper | "−" box · value text · "+" box in a row |
| Toggle / checkbox / radio | Simple geometric shapes; selected state filled |
| Bottom navigation | Fixed 64–83 px bar at the bottom: equal items, icon placeholder + label each, selected item darker. **Only if the spec defines it** |
| FAB | 56 px circle, dark fill, "+" text |
| Bottom sheet | Rounded-top rect from the bottom edge, drag handle (40 × 4 px), title row with ✕ if specified, content, primary button at the bottom; dimmed parent behind (§6) |
| Modal / dialog | Centred card (≈ 300 px wide): title, message, buttons from the spec; scrim behind |
| Menu / dropdown | Card with option rows anchored to its trigger; selected option marked |
| Toast / snackbar | Dark rounded bar near the bottom, message + action text if specified |
| Empty state | Centred icon placeholder box + the spec's message + the spec's action. Only with content the spec defines |
| Loading | Skeleton grey bars in the shape of the content that will load, or a spinner placeholder — whichever the spec states; skeleton by default as a design assumption |
| Image / camera view | Grey box with a diagonal cross or label ("Camera viewfinder"); overlay controls drawn on top |
| Icon | 20–24 px placeholder: outlined square/circle with a 1–2 character glyph ("✕", "+", "‹", "⌕") or a tiny label. No icon art |
| Keyboard | Only when the spec makes the keyboard part of the state (e.g. numeric keypad); grey block of key rectangles at the bottom |

## 3. Layout inside the viewport

- **Margins:** 16 px left/right on every frame; 8-pt spacing scale (8 / 16 / 24 / 32).
- **Vertical order follows mobile conventions:** status bar → header/navigation → title/context →
  search/filters/tabs → main content (scrolls) → sticky actions / summary bar → bottom navigation.
  Change the order only if the spec says so.
- **Important actions are visible** without scrolling: the primary action of the screen is in the
  first viewport or in a sticky region.
- **Content stays inside the viewport.** Lists show the realistic visible portion (e.g. 5–7 rows),
  with the last row cut at the fold or above the sticky region to show that it scrolls.
- **Fixed / sticky regions** as the spec states; annotate "sticky" / "scrolls" with a `Note/` line
  under the frame if it matters.
- Do not imitate iOS or Android system components unless the spec names the platform. Use neutral
  shapes; label platform UI ("system permission dialog") as a box drawn like a dialog.
- **Density check:** a typical screen has 15–60 visible UI elements. A frame with only a title, a
  paragraph or a single rectangle is not a screen.

## 4. Low-fidelity visual language

- Greyscale only. Ramp: text `#1A1A1A`, secondary text `#6B6B6B`, borders `#BDBDBD`, fills
  `#E0E0E0` / `#F2F2F2`, background `#FFFFFF`, scrim black at 40 % opacity. One exception: an
  annotation colour (e.g. `#3D7BFF`) used **only** on `Note/` layers and supplementary arrows,
  never inside the UI.
- One font family (Inter, or whatever the file already uses), sizes 12 / 14 / 16 / 20 / 24–28,
  Regular and Semi Bold. Minimum 12 px so screens are readable in screenshots.
- Simple rectangles and ellipses, 1 px borders, small uniform corner radius (8; 12 for cards and
  sheets). No shadows, gradients, illustrations, photos, brand colours or icon art.
- Buttons and other interactive elements must be clearly distinguishable from static text (filled
  or bordered shapes, chevrons, "+").
- Disabled = ≈ 40 % opacity plus "disabled" in the layer name. Selected = darker fill or bold
  border; state it in the layer name too.

## 5. States

- Draw only states the spec lists or a requirement makes necessary (e.g. "button disabled when
  empty" → a disabled variant). Do not add loading / error / empty states the spec does not
  mention; if one seems missing, report it as a gap.
- **Element-level change** (selected row, added ✓, disabled button, filled field) → a component
  variant used inside the screen frame that shows that moment.
- **Layout change** (empty list vs populated list, search results vs recent items, loading
  skeleton, error message replacing content, keyboard shown) → a separate phone frame of the same
  screen, named `<ScreenID> <Screen> / State: <state>`, with the full screen drawn (status bar,
  header, … — not just the changed part).
- Where it goes: a state reached by a user action is placed at its point in the journey row (so it
  can be a prototype target); a system-triggered state goes to the states page or states row
  (`figma-structure.md` §3–4) with a `Note/` line stating its condition.
- Transient feedback (toast, snackbar, ✓) is drawn in the frame showing the moment it is visible.
- **Continuity of persistent elements.** An element the spec keeps on screen across a session (a
  summary bar, a selection, a running total) appears in *every* later frame of that journey —
  including typing, results and the dimmed backdrop of a sheet — until the spec says what removes
  it. Walk each journey row frame by frame and check that nothing that should still be there has
  dropped out; the opposite error (a toast that never goes away) is equally wrong.
- Never draw a state as a box, node or label outside a phone frame.

## 6. Overlays

Bottom sheets, dialogs, menus and toasts:
- Draw the overlay in a full-size phone frame. Behind it, show **the parent screen dimmed**: a
  copy of the parent frame's content with the 40 % scrim on top, so the viewer sees where the
  overlay opens (name them `Region/Parent (dimmed) — copy of <parent>`, clear their prototype
  reactions, and refresh them whenever the parent changes). If the parent is very complex, a simplified copy (header + first content rows) is
  enough; a labelled grey placeholder is the last resort.
- If the overlay opens from several screens, draw one canonical frame (from the main-journey
  origin) and list the other origins in its annotation.
- Name with the spec's ID if it has one; otherwise `<ParentScreenID> / Overlay: <name>`.
- Show the dismiss affordances the spec defines (✕, drag handle for swipe-down, tap outside) —
  only those.

## 7. Reusable components

Make a component when an element appears on two or more frames **with the same behaviour**:
status bar, headers, list rows, buttons, input fields, search bar, tabs, steppers, toggles, cards,
sheet chrome, toasts, sticky bars, bottom navigation.

- Variants for specified states only (`State=Default|Added|Disabled`, `Mode=Add|Edit`).
- Two elements that look alike but behave differently (a row whose tap opens a sheet vs a
  read-only row) are separate components or clearly separate variants.
- Text inside instances is overridden per screen; the component holds placeholder text.
- Put a short purpose line and the source requirement IDs in the component `description`.
- On the Components page, lay components out in labelled groups (Buttons, Inputs, Lists, Cards,
  Navigation, Sheets & dialogs, Feedback) with their variants side by side.
- If the file already contains equivalent components, reuse them instead of creating duplicates.

## 8. Language, copy and sample values

- UI text in the language of the spec, using the spec's exact wording where it gives one (button
  labels, titles, messages). Layer and page names in English with IDs.
- Readable sample values make a wireframe understandable. Use the spec's own examples first. When
  the spec gives none, use plausible neutral values for **data the spec already defines** (e.g. a
  food name, "120 г", "250 ккал" in a list the spec says shows name, portion and kcal) and record
  them once as design assumption "illustrative sample data". Never use sample data to introduce a
  field, attribute or feature the spec does not define.
- Placeholder text in inputs follows the spec; if the spec gives none, a neutral hint
  ("Пошук…" / "Search") is a design assumption.

## 9. Anti-patterns — never produce these

- A frame (or a card on any page) whose content is only the screen name, a description or a list
  of states.
- Screens shown as boxes joined by arrows on the wireframes page.
- UI states drawn as nodes, chips or text outside phone frames.
- A tall flow overview as the first page, or an overview larger than the wireframes.
- Frames of different sizes for screens in the same flow.
- Arrows crossing screen content, or one arrow per transition in addition to prototype links.
- Content spilling outside the frame; text smaller than 12 px; overlapping elements.
- Invented UI used to fill an empty-looking screen.
- A persistent element (summary bar, selection) missing from a later frame of the same journey.
- Notes placed above a frame (Figma draws the frame name there), overlapping captions, spec IDs
  (`D3`, `Q9`, `§2.3`) or paragraphs on the canvas; tap targets with no ring, number or arrow.
