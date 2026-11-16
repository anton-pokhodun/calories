# Validation — docs/uk/product/core-calorie-tracking-flow.md

## Handoff
- Spec SHA-256: 3b66054817bc422dca55b2d9ff02f35e191186fc9b5042bce78583a397bd481c · validated 2026-11-15 · iteration 07
- Status: PASS
- Scope: базовий потік CT-01 → CT-02 → CT-03 → CT-01 з редагуванням запису (CT-04); за рішеннями власника в MVP також фото/AI (CT-05, CT-06), штрихкод (CT-07), швидке додавання калорій (CT-08). Поза обсягом: звіт/серії, оцінка продукту, вода, голодування, вправи, повні Nutrition Facts · mobile, low-fidelity · мова UI: українська
- Format (spec-format.md): Not assessed — ітерація 07 передує критерію V8. Екрани описані таблицею в §4 (компоненти, дії, стани, переходи), а не картками Layout / Actions / States; wireframes успішно побудовані з неї. Наступний запуск requirements-validator оцінить формат і, за потреби, механічно перебудує §4 у картки без нових фактів.
- Blocked for wireframes: none
- Proceed with defaults: Q5 — автофокус пошуку вимкнено (D5); Q6 — підказка «Готово» не показується (D4). Тексти, яких немає в специфікації: підказки порожніх станів (CT-01, CT-02), повідомлення про видалення на CT-04, підказка на CT-07, повідомлення про помилку AI — малюються як `[текст не задано]`. Прийнятих ризиків немає.

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

## Decisions
Усі рішення власника продукту (Q3, Q7–Q29; рішення D1–D7 затверджені як Q16) записані у специфікації, §6 «Прийняті рішення власника продукту» (з посиланнями на RV-ID) і застосовані у тексті. Рішення прийняті 2026-11-15 власником продукту (за словами користувача). Прийнятих ризиків немає.

## Latest report
Iteration 07 · 2026-11-15 · **PASS** · 0 BLOCKER / 0 HIGH / 0 MEDIUM / 0 LOW · verified 1 (RV-031), reopened 0, new 0.

- Findings, missing information, contradictions, unresolved product decisions: None. Відкриті питання Q5, Q6 — необов'язкові, мають значення за замовчуванням (D5, D4) і не змінюють кількість екранів.
- Figma readiness: Main flow frames — Ready · Alternative state frames — Ready (стани CT-01…CT-08, включно з офлайн і помилками) · Reusable components — Ready · Interactive prototypes — Ready (переходи, закриття й повернення визначені для всіх шляхів). Усі десять питань V7 — Yes.
- Next actions: специфікація готова до генерації вайрфреймів; за бажанням вирішити Q5 і Q6.
- Decision: PASS для заявленого обсягу: основний потік CT-01 → CT-04 з додатковими екранами CT-05…CT-08.

## Last fix log
Fix 6 (2026-11-15): RV-031 — офлайн на CT-06: повідомлення «AI недоступний без з'єднання» і дія «Швидко додати калорії» (без «Спробувати знову»), рішення Q29; змінено §2.2 (вузол XO, ребра R→XO, XO→K) і §4 CT-06 «Стани». Подальших змін специфікації не було.

## History
- 1 (2026-11-15) CONDITIONAL 0B/3H/10M/6L · fix: 7 FIXED, 12 → NEEDS_DECISION
- 2 (2026-11-15) CONDITIONAL 0/2/8/3 · verified 7, new 1 · fix: 11 FIXED
- 3 (2026-11-15) CONDITIONAL 0/1/6/1 · verified 11, new 6 · fix: 8 FIXED from decisions Q18–Q25 (додано CT-07, CT-08)
- 4 (2026-11-15) PASS 0/0/4/0 · verified 8, new 4 · fix: 4 FIXED (Q26–Q28)
- 5 (2026-11-15) PASS 0/0/0/2 · verified 4, new 2 · fix: 1 FIXED
- 6 (2026-11-15) PASS 0/0/0/1 · verified 1 · fix: RV-031 (Q29)
- 7 (2026-11-15) PASS 0/0/0/0 · verified 1
