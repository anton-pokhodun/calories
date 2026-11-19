# UX changes — docs/uk/product/core-calorie-tracking-flow.md
Figma: https://www.figma.com/design/fBMPokQnQHUsG1G0KfOuJn (fileKey `fBMPokQnQHUsG1G0KfOuJn`) · last entry UXC-01

## UXC-01 — CT-02: поле пошуку вниз · L3 (changes Q15) · VALIDATED · spec: SYNCED (Q30 [RV-033], validation iteration 08 PASS)
- Requested (2026-11-16): «перенеси пошук вниз, мені здається що так буде зручніше»
- Decision: variant B — search field pinned at the very bottom (above the home-indicator safe area), «Додано» panel directly above it, toast above the panel; header, Прийом ▾, tabs, rows unchanged; database search model unchanged (no chat / AI text). While the keyboard is open the panel is hidden and returns with the same totals when the keyboard closes. Approved by the user on 2026-11-16 ("Лише розкладку"; "Ховати на час введення").
- Evidence:
  [G] Apple HIG, Search fields (iOS, updated 2025-06 / 2026-06): "Place search at the bottom if there's room… useful in any situation where search is a priority"; "Place search at the top when it's important to defer to content at the bottom of the screen, or there's no bottom toolbar" — https://developer.apple.com/design/human-interface-guidelines/search-fields
  [O] Mobbin, one targeted query "food logging search at the bottom" (2026-11-16): top search in all 9 nutrition apps returned — BitePal, Noom, Yazio, Alma, MacroFactor, Lifesum, MyFitnessPal, Garmin Connect, Fitbit; captures may predate iOS 26
  [O] Project research `docs/uk/research/cross-app-comparison.md`: top search in BitePal, Lifesum, MyFitnessPal
  [U] Material Design 3 search guidance — page not readable by the tool; Android convention not verified; spec does not name the platform
  [U] NN/g / Baymard: no primary source found on bottom vs top search; secondary thumb-zone figures attributed to NN/g are unverified and not used
  [I] Fitts's Law / thumb reach: search is CT-02's primary entry (D5), so a bottom field shortens the most frequent reach on 390 × 844
- States:
  Search query — preserved in the bottom field; reset when CT-02 is left (Готово / ✕) [I]
  Tab Нещодавнє / Збережене — unchanged; hidden while typing / results (A-08)
  Session items + «Додано» panel — preserved, panel sits above the field; hidden while the keyboard is open, shown again with the same totals when it closes (user decision)
  Toast «Додано до … · Скасувати» — above the panel (above the field when there is no panel)
  Keyboard — hidden on entry (Q5 default); tap on field → keyboard, field docks above it
  Scroll position, meal (Прийом ▾) — unaffected
- Scope: change `Region/Search` position in 13 CT-02 frames (10 on page 01, 3 on page 02), `Region/Food list` / `Region/No results` heights, toast position; refresh 6 dimmed backdrops (CT-03 ×2, CT-08 ×2, Меню прийому, Список позицій сесії); move tap-target marks and arrows for search / camera / barcode; redraw «Введення» with a keyboard block. Unchanged: header, Прийом ▾, tabs, rows, all reactions' destinations, CT-01, CT-04…CT-07.
- Variant B (asked 2026-11-16: "swap the «Додано» panel and search"): search at the very bottom, panel above it.
  + field never moves — in variant A it jumps up 73 px when the panel first appears, right when the user searches for the next item [I]
  + the most frequent action (search, many times per session) gets the lowest spot; «Готово» is tapped once per session [I]
  − contradicts approved decision Q15 («панель доданих прикріплена внизу») → L3, needs explicit approval and spec change
  − completion bar at the bottom edge is common in the category: BitePal «Log», Yazio «Done», Lifesum «TRACK» [O]; MFP, Noom, Garmin keep Done in the header [O]
  − field at the bottom edge needs home-indicator safe-area padding (structural)
  = keyboard: in both variants the panel cannot reasonably stay visible while typing (results area would shrink to ~290 px) — same open question
- User reference (2026-11-16): Lifesum "Logging a food (AI)" — https://mobbin.com/flows/437f7696-b5fb-4880-b3fb-4420ffab35d9 [O]
  manual entry screen keeps search at the top; AI mode is a chat: composer pinned at the very bottom (camera · mic · send), suggestion chips «Often tracked for breakfast» above it, keyboard opens on entry, result card with edit ✎ and 👍👎, «DONE TRACKING» button placed ABOVE the composer
  → supports variant B's order (input lowest, completion above it); the chat/AI-text logging itself is a new interaction model (L3, spec first), not part of UXC-01 unless the user asks
- Assumptions: low-fi keyboard = new component `WF/System/Keyboard` (390 × 336, page 03); «Результати» keeps the keyboard closed (the keyboard-open moment is shown on «Введення» only); field sits 34 px above the bottom edge (home indicator)
- Result (2026-11-16): page 01 — 9 CT-02 frames relaid out (search 756, «Додано» panel 683, toast 638; tabs 91, list / no-results moved up 54 px); «Введення»: field 454 above the keyboard instance, panel hidden; 6 dimmed backdrops (CT-03 ×2, CT-08 ×2, Меню прийому, Список позицій сесії) updated to match; tap marks 2, 3, 4, 5, 8 (main row) and 1 (quick add) with their arrows moved. Page 02 — «Перше використання», «Збережене порожнє», «Офлайн» relaid out. Validation PASS: no region overlaps, no element in the safe area, backdrops = parents, reaction counts unchanged (CT-02: 11), no other frames touched. Captions unchanged (their wording does not name the position).
