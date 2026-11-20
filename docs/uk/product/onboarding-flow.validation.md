# Validation — docs/uk/product/onboarding-flow.md

## Handoff
- Spec SHA-256: 09fa1d2517a4000b7e4c3e9f178f04baf0f11f73ca5563fa810de959b25a5702 · validated 2026-11-19 · iteration 06
- Status: PASS
- Scope: онбординг першого запуску ON-01…ON-11 і перехід у CT-02 / CT-01 (`core-calorie-tracking-flow.md`, без змін). Поза обсягом: акаунт/вхід, підписка, профіль, нагадування, Health/Health Connect, адаптивний двигун, режим CT-01 без норми (Q1) · mobile, low-fidelity, 390 × 844 · мова UI: українська
- Format (spec-format.md): Full — кожен екран має картку з Goal / Entry / Layout / Actions / States; компоненти, рішення, відкриті питання з дефолтами і приклад «Олена» з конкретними значеннями присутні.
- Blocked for wireframes: none
- Proceed with defaults: Q1 — ON-11 «Продовжити без норми» веде на CT-01, сам режим «без норми» не малюється (позначка переходу); Q2 — контакти підтримки на ON-11.S-ed як `[текст не задано]`; Q3–Q11 — як у §5 специфікації. Ілюстрація ON-01 — сіра область `[ілюстрація]`. Прийнятих ризиків немає.

## Issues
| ID | Title | Severity | Category | Status | Resolution | Note |
|---|---|---|---|---|---|---|
| RV-001 | Діаграма §1.3 не містить переходів .SE → ON-08.SE, .SE → ON-11 і гілки ON-04.S5 | LOW | V2 | VERIFIED | Automatic | виправлено в ітерації 01 (FIX), підтверджено в 02 |
| RV-002 | Q1: режим CT-01 «без норми» змінює наявну специфікацію CT-01 | LOW | V1 | OPEN | Requires Product Owner Decision | має дефолт; онбординг-кадри не залежать від відповіді; рішення потрібне до вайрфреймів CT-01 |
| RV-003 | ON-11.S-ed: зміст контактів підтримки не задано | LOW | V1 | OPEN | Requires Product Owner Decision | малюється `[текст не задано]` (Q2) |

## Decisions
| Issue | Question | Decision (short) | Decided by (as reported) | Date |
|---|---|---|---|---|
| — | Темп за замовчуванням | «Комфортно» ≈0,4 кг/тиж; варіанти Легко / Комфортно / Активно (D14) | власник продукту (у чаті) | 2026-11-17 |
| — | Показ норми | коридор ±100 ккал, середнє за тиждень, рядок про солодке на ON-09 (D15; CT-01 — Q31 базової специфікації) | власник продукту | 2026-11-17 |
| — | Перенесення між днями | немає: норма не залежить від попередніх днів; тиждень — середнє (D17; CT-01 — Q34) | власник продукту | 2026-11-17 |
| — | Поради користування | картка «Кілька порад» на ON-09: зважування 2–3 рази на тиждень (можна щодня), середнє замість одного зважування, солодке в нормі; без вимог (D18) | власник продукту | 2026-11-17 |
| — | «Зриви» | не визначаються; лише нейтральні тексти за фактами (D16; CT-01 — Q32) | власник продукту | 2026-11-17 |
| — | Зважування й користь записів | щоденне зважування зранку; на ON-09 картка «Як ваша норма стане точнішою» замість примітки; «Кілька порад» — 2 пункти (D19) | власник продукту (у чаті) | 2026-11-19 |

D1–D13 лишаються пропозиціями автора; Q1–Q11 мають значення за замовчуванням.

## Latest report

### 1. Summary
- Документ: `docs/uk/product/onboarding-flow.md` · SHA-256 df9c5d3d…e8b2e2 · iteration 05 · 2026-11-17
- Привід: рішення власника D14–D16 (м'якший темп, коридор і тижневий бюджет, без визначення «зривів»).
- Статус: **PASS** · BLOCKER 0 · HIGH 0 · MEDIUM 0 · LOW 2 (OPEN: RV-002, RV-003) · verified 0, reopened 0, new 0.

### 2. Findings
- [RV-002] і [RV-003] — без змін (див. ітерацію 02 у History).
- Перевірка змін: назви темпів («Легко / Комфортно / Активно») узгоджені в §1.1, ON-08 (Layout, States, приклад), ON-10, D7, D14, §6 і в `onboarding-questionnaire.md` Q-13 / §3; числа (1 910 / 1 750 / недоступно; 2 190 − 440 = 1 750; коридор 1 650–1 850; 12 250) збігаються з `calculation-model.md` §7 (перераховано скриптом). Рядок «Солодке теж вміщується…» доданий у Layout ON-09 (Estimate note). Посилання на Q31/Q32 базової специфікації існують.

### 3. Missing information · Contradictions · Unresolved product decisions
- Missing: RV-003. Contradictions: None. Unresolved: RV-002 / Q1.

### 4. Figma readiness
Main flow frames — Ready · Alternative state frames — Ready · Reusable components — Ready · Interactive prototypes — Ready. Оновлення потрібні в кадрах ON-08, ON-09 (обидва стани), ON-10.

### 5. Next actions
1. Оновити вайрфрейми ON-08, ON-09, ON-10. 2. Q1, Q2 — як і раніше.

### 6. Decision
**PASS** для ON-01…ON-11 з переходом у CT-02 / CT-01.

## Last fix log
SHA-256 before ab786e2444651fd2fa16276b399914c9cb459c2b50d747e5c2dbba3e199879eb → after e55787001cdb31616cc903c4f9216ec50fa46387d14a25253df6404a8f8f1779
- RV-001 · діаграма не містила трьох переходів, описаних у таблицях Actions · §1.3 mermaid — додано ребра `EDIT → ON08E`, `ON08E → ON10`, `EDIT → ON11`, `ON04 → ON04S5`, `ON04S5 → ON05` · джерело: Actions ON-02 («Зберегти» → ON-08 .SE), ON-03/ON-05 (.SE → ON-11), ON-04 (S5) · FIXED → VERIFIED в ітерації 02.

## History
Iteration 01 (2026-11-17) — PASS: LOW 3 (RV-001 Automatic, RV-002, RV-003 decisions); fix: RV-001.
Iteration 02 (2026-11-17) — PASS: LOW 2 OPEN; verified RV-001; reopened 0; new 0.
Iteration 03 (2026-11-17) — PASS: LOW 2 OPEN; decisions D14–D16 recorded and applied by the author at the owner's request; no new issues.
Iteration 04 (2026-11-17) — PASS: LOW 2 OPEN; D15 уточнено (середнє замість бюджету), додано D17; посилання на Q33/Q34 базової специфікації перевірено; вайрфрейми онбордингу не змінюються (крім копії CT-01).
Iteration 05 (2026-11-17) — PASS: LOW 2 OPEN; D18 додано; ON-09 Layout перенумеровано (6 Tips, 7 Estimate note, 8 How calculated, 9 Edit, 10 Bottom actions), додано варіант ON-09.V-male; рядок про солодке тепер лише в Tips (дублю немає); посилання на E7–E10 існують.
Iteration 06 (2026-11-19) — PASS: зміна D19 (ON-09: регіони Accuracy, How calculated, Edit, Tips у новому порядку; V-male, V-medical узгоджено). Нових дефектів немає; RV-002, RV-003 — без змін (LOW, OPEN).
