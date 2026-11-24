# Validation — docs/uk/product/core-calorie-tracking-flow.md

## Handoff
- Spec SHA-256: 64a82375ca36a6a48afc1515485b0407ba03de935850c22b133ece38f675191a · validated 2026-11-24
- Status: PASS
- Scope: базовий потік CT-01 → CT-02 → CT-03 → CT-01 з редагуванням запису (CT-04) на сьогодні й минулі дні (Q36); фото/AI (CT-05, CT-06), штрихкод (CT-07), «Ввести вручну» (CT-08) — у MVP (Q8); панель вкладок «Сьогодні / Прогрес» (Q65, PR-D3); «Сьогодні» без норми (Q38); помилка пошуку (Q39); CT-02 — сторінка на весь екран з кошиком і вкладкою «Додано» (Q74–Q77, Q85); єдина шторка порції (Q78–Q81). Поза обсягом: звіт/серії, оцінка продукту, вода, голодування, вправи, повні Nutrition Facts · mobile, low-fidelity · мова UI: українська
- Format (spec-format.md): Workable — екрани описані таблицею §4, а не картками Layout / Actions / States (RV-034, LOW); генератор будує з таблиці.
- Blocked for wireframes: none
- Proceed with defaults: Q5 — автофокус пошуку вимкнено (D5); Q6 — підказка «Записати» після першого додавання не показується (D4). Тексти, яких бракує: пояснення в діалозі «Не записувати N позицій?» і порожня вкладка «Додано» — `[text not specified]` (Q76, Q85). Прийнятих ризиків немає.
- Next issue ID: RV-103

## Issues
| ID | Title | Severity | Category | Status | Resolution | Note |
|---|---|---|---|---|---|---|
| RV-034 | §4 — таблиця екранів замість карток Layout / Actions / States (spec-format.md) | LOW | V8 | OPEN | Automatic | Format Workable; перебудова §4 у картки — окрема велика правка |

## Decisions
None.
