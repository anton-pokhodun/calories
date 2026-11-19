# Wireframes — docs/uk/product/core-calorie-tracking-flow.md

- Figma: https://www.figma.com/design/fBMPokQnQHUsG1G0KfOuJn (fileKey `fBMPokQnQHUsG1G0KfOuJn`)
- Device: 390 × 844 · Generated from spec SHA-256 3b66054817bc422dca55b2d9ff02f35e191186fc9b5042bce78583a397bd481c on 2026-11-16 · Handoff: PASS, iteration 07 · refined by UXC-01 → matches spec SHA-256 a537d06474d61152204770f069e6afa121c0e92fe92459161ae58138150682d2 (iteration 08, Q30) · updated 2026-11-17 for spec SHA-256 07d8c4591e8b83d1518ab693ed69bde7046ec52ba9077ba8fb769e5bcc2d11cd (iteration 10, Q31–Q34)
- Page `01 - Mobile Wireframes` (30 frames, 6 rows): Flow: Log food (main journey, 9) · Today — edit & browse (4) · Add Food row split into 3 branch sections — «вкладка Збережене», «зміна прийому», «список позицій сесії» (2 each: start copy → result) · Barcode (3) · Photo / AI (4) · Quick add calories (4)
- Page `02 - Screen States` (16 system-triggered frames; CT-01: + «У межах плану», «Понад план, тиждень теж», «Повернення після перерви»; «Понад ціль» → «Понад план») · `03 - Components` (25 `WF/…` + `WF/Summary/Week`, `WF/Summary/Note`, `WF/Banner/Return`; `WF/Summary/Calories`: Over goal → Over plan, новий Within plan; + 6 `WF/Onboarding/…` для онбордингу) · `04 - Flow Overview` (8 chips)
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
- A-17 branch sections of the Add Food row start with a copy of their origin screen (`… — початок гілки (копія)`, reactions kept) so the starting state, the tap and the result are visible together; refresh these copies when CT-02 / «Позицію додано з результатів» change
- A-16 keyboard drawn as a low-fi block (`WF/System/Keyboard`) only on CT-02 «Введення» (UXC-01)
- Text not specified in the spec is drawn as `[текст не задано]` (empty-state hints, delete message, scanner hint, AI error message)
- Q5 / Q6 drawn with their defaults (no search autofocus; no «Готово» hint)

- A-18 (Q31/Q32) рядок тижня — `Region/Week` усередині `Region/Calorie summary` на всіх кадрах CT-01 (включно із затемненими копіями); вміст нижче зсунуто на 41 px; значення — плейсхолдери «0 000 з 00 000»
- A-19 (Q33) штрихування в low-fi — сегмент з 30 % заливкою і пунктирним контуром; межа коридору — крапка на кільці (позиція для цілі 1 750); рядок-пояснення й банер — сірі блоки без кольору
- A-20 (Q34) рядок тижня — лише текст середнього, без смужки; висота блоку збережена (41 px)

## Not represented
- Exits of system-state frames (page 02): CT-07 no permission / offline → «Швидко додати калорії»; CT-05 no permission → «Вибрати з галереї»; CT-06 error / offline → retry / quick add; CT-03 invalid; CT-01 other day without records → «Сьогодні» (prototype links cannot cross pages)
- System-triggered steps: no results, barcode not found, no permission, offline, AI error
- «Відкрити налаштування» (leaves the app) · inline deletes (swipe / trash) and the undo effect · live recalculation and rounding · CT-01 update animation · expanded «Більше харчової цінності» (content not specified) · numeric keypad · «Швидке додавання» label for an unnamed item (caption only)
- CT-03 «Додати» is wired to the results-based state; other origins (Recent, scanner) are named in captions

## Approved assumptions / pending in spec
None. (UXC-01 — CT-02 search at the bottom — is now in the spec as Q30, iteration 08.)

## Last validation
2026-11-16 · UXC-01 refinement · PASS for the 12 changed CT-02 frames and 6 overlays (overlaps, safe area, backdrop parity, reactions)
2026-11-16 · PASS · open MINOR: components on page 03 not grouped; placeholder values; CT-05…CT-07 and system frames have < 12 elements because the spec defines nothing more. Fixed after review: panel «Додати» now persists on CT-02 typing / results / sheet backdrops; transition marks (ring · number · arrow · caption) added; captions rebuilt without overlap.
2026-11-17 · Q31/Q32 update · PASS: рядок тижня на всіх 6 кадрах CT-01 сторінки 01 і 3 кадрах сторінки 02; 3 нові системні стани; прототипні реакції не змінювались (нові стани системні); стрілку 1 основного ряду перевирівняно після зсуву
2026-11-17 · Q33/Q34 update · PASS: варіанти кільця Within plan / Over plan (штрихований сегмент, крапка коридору) оновлено в компоненті — зміна на всіх екземплярах; `WF/Summary/Week` — текст середнього без смужки; підписи станів на сторінці 02 оновлено
