# Validation — docs/uk/product/onboarding-flow.md

## Handoff
- Spec SHA-256: 5cf6c4447faf357d98ca63aba146c4d00816fe03cee8be1b1437396611d6d538 · validated 2026-11-20 · iteration 09
- Status: PASS
- Scope: онбординг першого запуску ON-01 → ON-12 (згода) → ON-02…ON-11 і перехід у CT-02 / CT-01; ON-11 «Продовжити без норми» → CT-01 без норми (D20, `core-calorie-tracking-flow.md` Q38); стани .SE перевикористовуються з налаштувань (ST-02, `settings.md`). Поза обсягом: акаунт/вхід, підписка, нагадування, Health/Health Connect, адаптивний двигун · mobile, low-fidelity, 390 × 844 · мова UI: українська
- Format (spec-format.md): Full — кожен екран (включно з ON-12) має картку Goal / Entry / Layout / Actions / States; приклад «Олена» з конкретними значеннями.
- Blocked for wireframes: none
- Proceed with defaults: Q2 — контакти підтримки на ON-11.S-ed `[текст не задано]`; ON-12 — текст згоди `[текст не задано]` до юридичної перевірки (OQ-07); Q3–Q11 — як у §5. Ілюстрація ON-01 — `[ілюстрація]`. Прийнятих ризиків немає.

## Issues
| ID | Title | Severity | Category | Status | Resolution | Note |
|---|---|---|---|---|---|---|
| RV-001 | Діаграма §1.3 не містить переходів .SE → ON-08.SE, .SE → ON-11 і гілки ON-04.S5 | LOW | V2 | VERIFIED | Automatic | виправлено в ітерації 01 (FIX), підтверджено в 02 |
| RV-002 | Q1: режим CT-01 «без норми» змінює наявну специфікацію CT-01 | LOW | V1 | VERIFIED | Requires Product Owner Decision | вирішено D20 (2026-11-20); режим описано в `core-calorie-tracking-flow.md` Q38 |
| RV-003 | ON-11.S-ed: зміст контактів підтримки не задано | LOW | V1 | OPEN | Requires Product Owner Decision | малюється `[текст не задано]` (Q2) |
| RV-004 | §1.3 «Назад»: діапазон «ON-02…ON-11» не містить нового ON-12, хоча його картка має «‹» | LOW | V2 | VERIFIED | Automatic | fix 2 |

## Decisions
| Issue | Question | Decision (short) | Decided by (as reported) | Date |
|---|---|---|---|---|
| — | Темп за замовчуванням | «Комфортно» ≈0,4 кг/тиж; варіанти Легко / Комфортно / Активно (D14) | власник продукту (у чаті) | 2026-11-17 |
| — | Показ норми | коридор ±100 ккал, середнє за тиждень, рядок про солодке на ON-09 (D15; CT-01 — Q31 базової специфікації) | власник продукту | 2026-11-17 |
| — | Перенесення між днями | немає: норма не залежить від попередніх днів; тиждень — середнє (D17; CT-01 — Q34) | власник продукту | 2026-11-17 |
| — | Поради користування | картка «Кілька порад» на ON-09: зважування 2–3 рази на тиждень (можна щодня), середнє замість одного зважування, солодке в нормі; без вимог (D18) | власник продукту | 2026-11-17 |
| — | «Зриви» | не визначаються; лише нейтральні тексти за фактами (D16; CT-01 — Q32) | власник продукту | 2026-11-17 |
| — | Зважування й користь записів | щоденне зважування зранку; на ON-09 картка «Як ваша норма стане точнішою» замість примітки; «Кілька порад» — 2 пункти (D19) | власник продукту (у чаті) | 2026-11-19 |
| RV-002 | Як виглядає CT-01 без норми (Q1) | «Сьогодні» без норми: лише спожито, без кільця, коридору й рядка тижня (D20) | власник продукту (у чаті) | 2026-11-20 |
| — | Згода на дані про здоров'я | окремий екран ON-12 після ON-01, текст — заглушка (D21) | власник продукту (у чаті) | 2026-11-20 |

D1–D13 лишаються пропозиціями автора; Q2–Q11 мають значення за замовчуванням; Q1 вирішено D20.

## Latest report

### 1. Summary
- Документ: `docs/uk/product/onboarding-flow.md` · SHA-256 5cf6c444… · iteration 09 · 2026-11-20
- Привід: рішення власника D22 — картку «Як ваша норма стане точнішою» прибрано з ON-09 (частково замінює D19).
- Статус: **PASS** · BLOCKER 0 · HIGH 0 · MEDIUM 0 · LOW 1 (OPEN: RV-003) · verified 0, reopened 0, new 0.

### 2. Findings
- [RV-003] без змін. Перевірка змін: Layout ON-09 перенумеровано (6 How calculated · 7 Edit · 8 Tips · 9 Bottom actions); ON-09.V-medical тепер над «Кілька порад»; D19 позначено як частково замінене; посилання з `../features/progress/requirements.md` PR-D20 оновлено.

### 3. Missing information · Contradictions · Unresolved product decisions
- Missing: RV-003. Contradictions: None. Unresolved: None.

### 4. Figma readiness
Усі чотири — Ready. Оновити обидва кадри ON-09: прибрати `Region/Accuracy`.

### 6. Decision
**PASS** для ON-01…ON-12.

## Last fix log
Fix 2 (2026-11-20) · SHA-256 e785fcac… → ad0836f5…
- RV-004 · §1.3 «Назад» — "«‹» у заголовку ON-02…ON-11" → "«‹» у заголовку ON-02…ON-12" · джерело: картка ON-12, Layout «Header «‹»» · FIXED → VERIFIED (it. 08)
Escalated: none.

## History
Iteration 01 (2026-11-17) — PASS: LOW 3 (RV-001 Automatic, RV-002, RV-003 decisions); fix: RV-001.
Iteration 02 (2026-11-17) — PASS: LOW 2 OPEN; verified RV-001; reopened 0; new 0.
Iteration 03 (2026-11-17) — PASS: LOW 2 OPEN; decisions D14–D16 recorded and applied by the author at the owner's request; no new issues.
Iteration 04 (2026-11-17) — PASS: LOW 2 OPEN; D15 уточнено (середнє замість бюджету), додано D17; посилання на Q33/Q34 базової специфікації перевірено; вайрфрейми онбордингу не змінюються (крім копії CT-01).
Iteration 05 (2026-11-17) — PASS: LOW 2 OPEN; D18 додано; ON-09 Layout перенумеровано (6 Tips, 7 Estimate note, 8 How calculated, 9 Edit, 10 Bottom actions), додано варіант ON-09.V-male; рядок про солодке тепер лише в Tips (дублю немає); посилання на E7–E10 існують.
Iteration 06 (2026-11-19) — PASS: зміна D19 (ON-09: регіони Accuracy, How calculated, Edit, Tips у новому порядку; V-male, V-medical узгоджено). Нових дефектів немає; RV-002, RV-003 — без змін (LOW, OPEN).
Iteration 07 (2026-11-20) — PASS: рішення D20, D21 записано; RV-002 VERIFIED (вирішено D20); new RV-004 (LOW, Automatic); fix 2.
Iteration 08 (2026-11-20) — PASS: LOW 1 (RV-003); RV-004 verified.
Iteration 09 (2026-11-20) — PASS: рішення D22 записано; LOW 1 (RV-003); нових дефектів немає.
