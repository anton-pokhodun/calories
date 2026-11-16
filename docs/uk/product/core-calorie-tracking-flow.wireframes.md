# Wireframes — docs/uk/product/core-calorie-tracking-flow.md

- Figma: https://www.figma.com/design/fBMPokQnQHUsG1G0KfOuJn (fileKey `fBMPokQnQHUsG1G0KfOuJn`)
- Device: 390 × 844 · Generated from spec SHA-256 3b66054817bc422dca55b2d9ff02f35e191186fc9b5042bce78583a397bd481c on 2026-11-16 · Handoff: PASS, iteration 07
- Page `01 - Mobile Wireframes` (27 frames, 6 rows): Flow: Log food (main journey, 9) · Today — edit & browse (4) · Add Food — tabs, meal, session (3) · Barcode (3) · Photo / AI (4) · Quick add calories (4)
- Page `02 - Screen States` (13 system-triggered frames) · `03 - Components` (25 `WF/…`) · `04 - Flow Overview` (8 chips)
- Prototype: 100 reactive elements on page 01, start on «CT-01 Сьогодні»

## Design assumptions
- A-01 device 390 × 844, greyscale, Inter, 8-pt spacing; icons are labelled boxes; annotation blue only on `Note/` layers and arrows
- A-03 calorie summary as a ring (spec allows ring or bar)
- A-05 loading = skeleton blocks
- A-06 «Інший день без записів»: meal sections omitted — confirm
- A-07 error / offline / no-permission as full-screen message blocks, not dialogs
- A-08 tabs «Нещодавнє / Збережене» hidden while typing, results and no-results — confirm
- A-09 overlays drawn over a dimmed copy of one canonical origin; other origins named in captions
- A-12 placeholder values «000», «Назва продукту» where the spec gives no example
- A-15 search placeholder «Пошук продуктів» — confirm
- Text not specified in the spec is drawn as `[текст не задано]` (empty-state hints, delete message, scanner hint, AI error message)
- Q5 / Q6 drawn with their defaults (no search autofocus; no «Готово» hint)

## Not represented
- Exits of system-state frames (page 02): CT-07 no permission / offline → «Швидко додати калорії»; CT-05 no permission → «Вибрати з галереї»; CT-06 error / offline → retry / quick add; CT-03 invalid; CT-01 other day without records → «Сьогодні» (prototype links cannot cross pages)
- System-triggered steps: no results, barcode not found, no permission, offline, AI error
- «Відкрити налаштування» (leaves the app) · inline deletes (swipe / trash) and the undo effect · live recalculation and rounding · CT-01 update animation · expanded «Більше харчової цінності» (content not specified) · numeric keypad · «Швидке додавання» label for an unnamed item (caption only)
- CT-03 «Додати» is wired to the results-based state; other origins (Recent, scanner) are named in captions

## Approved assumptions / pending in spec
None.

## Last validation
2026-11-16 · PASS · open MINOR: components on page 03 not grouped; placeholder values; CT-05…CT-07 and system frames have < 12 elements because the spec defines nothing more. Fixed after review: panel «Додати» now persists on CT-02 typing / results / sheet backdrops; transition marks (ring · number · arrow · caption) added; captions rebuilt without overlap.
