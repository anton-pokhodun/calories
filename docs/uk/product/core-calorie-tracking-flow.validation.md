# Validation — docs/uk/product/core-calorie-tracking-flow.md

## Handoff
- Spec SHA-256: 07d8c4591e8b83d1518ab693ed69bde7046ec52ba9077ba8fb769e5bcc2d11cd · validated 2026-11-17 · iteration 10
- Status: PASS
- Scope: базовий потік CT-01 → CT-02 → CT-03 → CT-01 з редагуванням запису (CT-04); за рішеннями власника в MVP також фото/AI (CT-05, CT-06), штрихкод (CT-07), швидке додавання калорій (CT-08). Поза обсягом: звіт/серії, оцінка продукту, вода, голодування, вправи, повні Nutrition Facts · mobile, low-fidelity · мова UI: українська
- Format (spec-format.md): Workable — екрани описані таблицею §4 (компоненти в порядку зверху вниз, дії, стани, переходи) і §5, а не картками Layout / Actions / States; генератор уже побудував із неї вайрфрейми (RV-034, LOW).
- Blocked for wireframes: none
- Proceed with defaults: Q5 — автофокус пошуку вимкнено (D5); Q6 — підказка «Готово» не показується (D4). Тексти, яких немає в специфікації: підказки порожніх станів (CT-01, CT-02), повідомлення про видалення на CT-04, підказка на CT-07, повідомлення про помилку AI — малюються як `[текст не задано]`. Прийнятих ризиків немає. Q31–Q34 (2026-11-17): кільце — за Q33 (штрихований сегмент понад коло, риска коридору); рядок тижня (середнє, без смужки) — між підсумком і смужками Б/В/Ж; банер повернення — між заголовком дати й підсумком.

## Issues
| ID | Title | Severity | Category | Status | Resolution |
|---|---|---|---|---|---|
| RV-001 | Діаграма vs проза: повернення після «Додати»/закриття шторки | HIGH | V2 | VERIFIED | Automatic |
| RV-002 | Панель доданих: D3 vs §5/Q7 | HIGH | V2 | VERIFIED | Requires Product Owner Decision |
| RV-003 | «Швидко додати калорії» (Q3) без екрана/переходу | HIGH | V3 | VERIFIED | Requires Product Owner Decision |
| RV-004 | Екран і потік штрихкоду не описані (Q19) | MEDIUM | V1 | VERIFIED | Requires Product Owner Decision |
| RV-005 | Немає ребер закриття/скасування в діаграмі | MEDIUM | V3 | VERIFIED | Automatic |
| RV-006 | Повторне «+» на доданому рядку | MEDIUM | V5 | VERIFIED | Requires Product Owner Decision |
| RV-007 | «Прийом ▾»: варіанти, подання, вплив зміни | MEDIUM | V5 | VERIFIED | Requires Product Owner Decision |
| RV-008 | Розділи прийомів CT-01: розгорнуто/згорнуто | MEDIUM | V5 | VERIFIED | Requires Product Owner Decision |
| RV-009 | Вибір дати CT-01 vs дата логування | MEDIUM | V1 | VERIFIED | Requires Product Owner Decision |
| RV-010 | Вкладка Saved: вміст, порожній стан, термінологія | MEDIUM | V5 | VERIFIED | Requires Product Owner Decision |
| RV-011 | Стан «офлайн» не описаний | MEDIUM | V5 | VERIFIED | Requires Product Owner Decision |
| RV-012 | Фіксовані/липкі елементи, глобальна «+», навігація | MEDIUM | V7 | VERIFIED | Requires Product Owner Decision |
| RV-013 | Відкриті питання Q3/Q5/Q6/Q7 без переліку | MEDIUM | V2 | VERIFIED | Automatic |
| RV-014 | Статус затвердження: чернетка vs «Узгоджений»/«Рішення» | LOW | V6 | VERIFIED | Requires Product Owner Decision |
| RV-015 | Втрачений «+» у D1 | LOW | V2 | VERIFIED | Automatic |
| RV-016 | Невірний шлях `docs/research/` | LOW | V6 | VERIFIED | Automatic |
| RV-017 | Повідомлення приписане Lifesum без доказу | LOW | V6 | VERIFIED | Automatic |
| RV-018 | Вузли N і T без ID | LOW | V2 | VERIFIED | Automatic |
| RV-019 | Типова vs остання використана порція | LOW | V2 | VERIFIED | Requires Product Owner Decision |
| RV-020 | §6: вступ і примітка суперечать щодо Q1, Q2, Q4 | LOW | V2 | VERIFIED | Automatic |
| RV-021 | Список позицій сесії (підсумок панелі) не описаний | MEDIUM | V4 | VERIFIED | Requires Product Owner Decision |
| RV-022 | CT-01 на інших днях: редагування записів і порожній стан | MEDIUM | V5 | VERIFIED | Requires Product Owner Decision |
| RV-023 | Назва вкладки «Recent» не локалізована | LOW | V2 | VERIFIED | Requires Product Owner Decision |
| RV-024 | Рядок показує типову порцію, «+» додає останню використану | MEDIUM | V2 | VERIFIED | Requires Product Owner Decision |
| RV-025 | Шлях AI: переходи і CT-03 не узгоджені | MEDIUM | V3 | VERIFIED | Requires Product Owner Decision |
| RV-026 | Стани CT-05/CT-06 не описані | MEDIUM | V5 | VERIFIED | Requires Product Owner Decision |
| RV-027 | Повернення з додаткових входів: CT-03 зі сканера, CT-08 з діалогу штрихкоду | MEDIUM | V3 | VERIFIED | Requires Product Owner Decision |
| RV-028 | Переходи станів помилки та дозволу у шляху фото/AI; вхід CT-08 з CT-06 | MEDIUM | V3 | VERIFIED | Requires Product Owner Decision |
| RV-029 | Прийом для позицій AI на CT-06 не названий у документі | MEDIUM | V2 | VERIFIED | Automatic |
| RV-030 | Стани CT-07 і CT-08 неповні (дозвіл камери, офлайн, безіменна позиція) | MEDIUM | V5 | VERIFIED | Requires Product Owner Decision |
| RV-031 | Офлайн-стан CT-06: чи є дії «Спробувати знову» / «Швидко додати калорії» | LOW | V2 | VERIFIED | Requires Product Owner Decision |
| RV-032 | Статус документа не відображає прийняті рішення власника | LOW | V6 | VERIFIED | Automatic |
| RV-033 | CT-02: розташування поля пошуку і панелі доданих (зміна UXC-01, замінює Q15 для CT-02) | MEDIUM | V7 | VERIFIED | Requires Product Owner Decision |
| RV-034 | §4 — таблиця екранів замість карток Layout / Actions / States (spec-format.md) | LOW | V8 | OPEN | Automatic | Формат Workable; вайрфрейми вже побудовані з таблиці. Перебудова §4 у картки — механічна, без нових фактів; виконати за запитом |
| RV-035 | CT-01 понад ціль: вигляд кільця підсумку — вирішено Q33 | LOW | V5 | VERIFIED | Requires Product Owner Decision |

## Decisions
Усі рішення власника продукту (Q3, Q7–Q30; рішення D1–D7 затверджені як Q16) записані у специфікації, §6 «Прийняті рішення власника продукту» (з посиланнями на RV-ID) і застосовані у тексті. Q3, Q7–Q29 прийняті 2026-11-15; Q30 [RV-033] — 2026-11-16 (зміна UXC-01 з `core-calorie-tracking-flow.ux-changes.md`: поле пошуку CT-02 внизу, панель доданих над ним, панель прихована під час введення), затвердив користувач як власник продукту. Прийнятих ризиків немає.

## Latest report
Iteration 10 · 2026-11-17 · SHA-256 07d8c459… · **PASS** · 0 BLOCKER / 0 HIGH / 0 MEDIUM / 1 LOW (RV-034) · verified 1 (RV-035 — рішення Q33), reopened 0, new 0.

- Привід: рішення власника Q33 (вигляд кільця понад план) і Q34 (без перенесення між днями; рядок тижня — середнє).
- Перевірка: §4 CT-01 (компоненти, стани), §5 (коридор/середнє, кільце, без перенесення, тексти), §6 (Q31 оновлено, Q33, Q34), статус (Q7–Q34) узгоджені; формулювання «Цей тиждень: {спожито} з {бюджет}» і смужку тижня прибрано всюди; умова «тиждень у межах плану» в §5 узгоджена з `calculation-model.md` §4.6.
- Missing information · Contradictions · Unresolved product decisions: None (крім RV-034, LOW).
- Figma readiness: усі чотири — Ready. Оновити: компонент кільця (варіанти Within plan / Over plan: штриховий сегмент, риска коридору), `WF/Summary/Week` (текст середнього, без смужки).
- Decision: PASS; перевіряв той самий агент, що вносив зміни.

## Last fix log
Fix 7 (2026-11-16) · SHA-256 3b660548… → a537d064… · RV-033 (рішення Q30, UXC-01):
- §0 статус — "(Q3, Q7–Q28)" → "(Q3, Q7–Q30)"
- §2.1 вузол B — "заголовок: Прийом ▾ · пошук · Нещодавнє / Збережене<br/>панель доданих позицій" → "заголовок: Прийом ▾ · Нещодавнє / Збережене<br/>внизу: панель доданих позицій · поле пошуку"
- §4 CT-02 «Основні компоненти» — поле пошуку перенесено з-під заголовка в кінець: "…**панель доданих** (…); **поле пошуку** (+ іконки камери / штрихкоду), закріплене внизу екрана під панеллю доданих (рішення Q30)"
- §4 CT-02 «Стани» — "введення / завантаження;" → "введення / завантаження (поле пошуку над клавіатурою, панель доданих прихована, доки відкрита клавіатура; запит зберігається — Q30);"
- §5 «Повідомлення» — додано "(якщо панелі немає — над полем пошуку)"
- §5 «Розташування (рішення Q15)» → «(рішення Q15, Q30)»; CT-02 — "заголовок і поле пошуку фіксовані, … панель доданих прикріплена внизу, повідомлення з'являється над нею" → поле пошуку внизу, панель над ним, повідомлення над панеллю, поведінка з клавіатурою
- §6 Q15 — додано "(для CT-02 замінено рішенням Q30)"; додано рядок Q30 [RV-033]
Status RV-033 → FIXED → VERIFIED (ітерація 08). Escalated: none.

## History
- 1 (2026-11-15) CONDITIONAL 0B/3H/10M/6L · fix: 7 FIXED, 12 → NEEDS_DECISION
- 2 (2026-11-15) CONDITIONAL 0/2/8/3 · verified 7, new 1 · fix: 11 FIXED
- 3 (2026-11-15) CONDITIONAL 0/1/6/1 · verified 11, new 6 · fix: 8 FIXED from decisions Q18–Q25 (додано CT-07, CT-08)
- 4 (2026-11-15) PASS 0/0/4/0 · verified 8, new 4 · fix: 4 FIXED (Q26–Q28)
- 5 (2026-11-15) PASS 0/0/0/2 · verified 4, new 2 · fix: 1 FIXED
- 6 (2026-11-15) PASS 0/0/0/1 · verified 1 · fix: RV-031 (Q29)
- 7 (2026-11-15) PASS 0/0/0/0 · verified 1
- 8 (2026-11-16) PASS 0/0/0/1 · decision Q30 recorded (UXC-01) · fix: RV-033 FIXED → verified; new RV-034 (V8, LOW)
- 9 (2026-11-17) PASS 0/0/0/2 · decisions Q31, Q32 recorded (з онбордингу) · new RV-035 (V5, LOW)
- 10 (2026-11-17) PASS 0/0/0/1 · decisions Q33, Q34 recorded · RV-035 verified
