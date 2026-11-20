# Wireframes — docs/uk/product/core-calorie-tracking-flow.md

- Figma: https://www.figma.com/design/fBMPokQnQHUsG1G0KfOuJn (fileKey `fBMPokQnQHUsG1G0KfOuJn`)
- Device: 390 × 844 · Generated from spec SHA-256 3b660548… on 2026-11-16 · **updated 2026-11-20 for spec SHA-256 4409895b661e95fe2a911908e442934760592c4792a520fd8b8769149b93d021 (Handoff: PASS, iteration 13 — Q35–Q41)**
- File structure (2026-11-20): `00 — Overview` · `01 — Onboarding` · `02 — Daily Logging` · `03 — Progress` · `04 — Components` · `05 — Archive`; сторінку `02 - Screen States` розформовано — стани стоять поруч зі своїми екранами
- Page `02 — Daily Logging` (59 frames, 13 rows): Flow: Log food (main journey, 9) · Today — edit & browse (5: CT-04 → видалено → **минулий день → CT-02 на минулий день → позицію додано** → прийом згорнуто) · States: CT-01 (8, + «Без норми») · Add Food: «Збережене» / зміна прийому / список позицій сесії (2 + 2 + 2) · States: CT-02 (4, + «Помилка пошуку») · States: CT-03 (1) · Quick add calories (4) · Barcode (3) · Photo / AI (4) · States: CT-05 / CT-06 / CT-07 (5) · Settings — my plan (5) · Settings — privacy & delete (4) — останні два ряди ведуться в `settings.wireframes.md`
- Components: `04 — Components`, секції Core / Daily logging / Onboarding / Progress; `WF/Header/Date` має ⚙ праворуч (Q37)
- Prototype: 297 зв'язків на сторінці `02`; один старт «Daily logging» на «CT-01 Сьогодні»; кадрів без виходу немає

## Design assumptions
- A-01 device 390 × 844, greyscale, Inter, 8-pt spacing; icons are labelled boxes; annotation blue only on `Note/` layers and arrows
- A-03 calorie summary as a ring (spec allows ring or bar)
- A-05 loading = skeleton blocks
- A-06 «Інший день без записів»: розділи прийомів не показано; додати їжу — плаваючою «+» (Q36) — confirm
- A-07 error / offline / no-permission as full-screen message blocks, not dialogs
- A-08 tabs «Нещодавнє / Збережене» hidden while typing, results and no-results — confirm
- A-09 overlays drawn over a dimmed copy of one canonical origin; other origins named in captions
- A-12 placeholder values «000», «Назва продукту» where the spec gives no example
- A-15 search placeholder «Пошук продуктів» — confirm
- A-17 branch sections of the Add Food row start with a copy of their origin screen (`… — початок гілки (копія)`, reactions kept) so the starting state, the tap and the result are visible together; refresh these copies when CT-02 / «Позицію додано з результатів» change
- A-16 keyboard drawn as a low-fi block (`WF/System/Keyboard`) only on CT-02 «Введення» (UXC-01)
- Тексти порожніх станів, повідомлення про видалення, підказка сканера, помилка AI — за Q41
- Q5 / Q6 drawn with their defaults (no search autofocus; no «Готово» hint)

- A-18 (Q31/Q32) рядок тижня — `Region/Week` усередині `Region/Calorie summary` на всіх кадрах CT-01 (включно із затемненими копіями); вміст нижче зсунуто на 41 px; значення — плейсхолдери «0 000 з 00 000»
- A-19 (Q33) штрихування в low-fi — сегмент з 30 % заливкою і пунктирним контуром; межа коридору — крапка на кільці (позиція для цілі 1 750); рядок-пояснення й банер — сірі блоки без кольору
- A-20 (Q34) рядок тижня — лише текст середнього, без смужки; висота блоку збережена (41 px)
- A-21 (Q35) рядок тижня прихований на «Порожньому дні» і першому дні після онбордингу; на решті кадрів CT-01 вважаємо, що повних днів ≥ 3
- A-22 (Q38) «Без норми» — сіра картка «Спожито · 0 000 ккал · Ви записуєте їжу без денної норми»; смужки Б/В/Ж приховані, лишаються грами
- A-23 (Q37) ⚙ — гліф у `WF/Icon`, абсолютно праворуч у `WF/Header/Date`; стрілки дат зсунуто лівіше
- A-24 (Q39) «Помилка пошуку» — той самий блок, що «Немає результатів», з діями «Спробувати знову» / «Швидко додати калорії»; у полі зберігається запит «банан»

## Not represented
- Вкладка «Прогрес» на кадрах CT-01 → PR-01 і ⚙ → «Видалити» → ON-01: інша сторінка (Figma не з'єднує сторінки); показано в підписах
- System-triggered steps: no results, barcode not found, no permission, offline, AI error
- «Відкрити налаштування» (leaves the app) · inline deletes (swipe / trash) and the undo effect · live recalculation and rounding · CT-01 update animation · numeric keypad · «Швидке додавання» label for an unnamed item (caption only)
- CT-03 «Додати» is wired to the results-based state; other origins (Recent, scanner) are named in captions

## Approved assumptions / pending in spec
None.

## Last validation
2026-11-16 · UXC-01 refinement · PASS for the 12 changed CT-02 frames and 6 overlays (overlaps, safe area, backdrop parity, reactions)
2026-11-16 · PASS · open MINOR: components on page 03 not grouped; placeholder values; CT-05…CT-07 and system frames have < 12 elements because the spec defines nothing more. Fixed after review: panel «Додати» now persists on CT-02 typing / results / sheet backdrops; transition marks (ring · number · arrow · caption) added; captions rebuilt without overlap.
2026-11-17 · Q31/Q32 update · PASS: рядок тижня на всіх 6 кадрах CT-01 сторінки 01 і 3 кадрах сторінки 02; 3 нові системні стани; прототипні реакції не змінювались (нові стани системні); стрілку 1 основного ряду перевирівняно після зсуву
2026-11-17 · Q33/Q34 update · PASS: варіанти кільця Within plan / Over plan (штрихований сегмент, крапка коридору) оновлено в компоненті — зміна на всіх екземплярах; `WF/Summary/Week` — текст середнього без смужки; підписи станів на сторінці 02 оновлено
2026-11-20 · Stage 2 refinement (Q35–Q39, перевалідована специфікація it. 12) · PASS: усі кадри 390 × 844; 0 зв'язків на іншу сторінку; 0 відсутніх цілей; 0 кадрів без виходу; реакцій у затемнених фонах 0 (оновлено фони CT-04 і CT-03 «Некоректно»); один старт. Нове: «Минулий день» (редагований, Q36) + CT-02 на минулий день; «Без норми» (Q38); «Помилка пошуку» (Q39); ⚙ у заголовку (Q37); виходи на всіх системних станах; «Запис видалено» — дії й «Скасувати». Стара версія «Інший день (перегляд)» — у `05 — Archive`. MINOR: плейсхолдер-значення «0 000»; кільця тап-цілей на рядках на всю ширину виходять за край кадру
2026-11-20 · Q40, Q41 · PASS: «Більше харчової цінності» прибрано з CT-03 (×3) і CT-04, шторки прикріплено до низу; тексти Q41 у 9 кадрах і 3 підписах; новий стан «CT-02 / Минулий день — позицію додано» (швидке «+» з'єднано, «Готово» / ✕ → минулий день). 297 зв'язків, 0 на іншу сторінку, 0 без виходу
