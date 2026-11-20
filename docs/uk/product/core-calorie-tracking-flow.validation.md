# Validation — docs/uk/product/core-calorie-tracking-flow.md

## Handoff
- Spec SHA-256: 4409895b661e95fe2a911908e442934760592c4792a520fd8b8769149b93d021 · validated 2026-11-20 · iteration 13
- Status: PASS
- Scope: базовий потік CT-01 → CT-02 → CT-03 → CT-01 з редагуванням запису (CT-04) на сьогодні й минулі дні (Q36); фото/AI (CT-05, CT-06), штрихкод (CT-07), швидке додавання (CT-08) — у MVP (Q8; SD-01/SD-02 відхилено 2026-11-20); панель вкладок «Сьогодні / Прогрес» (Q15, PR-D3); «Сьогодні» без норми (Q38); вхід у налаштування ⚙ (Q37 → `settings.md`); помилка пошуку (Q39). Поза обсягом: звіт/серії, оцінка продукту, вода, голодування, вправи, повні Nutrition Facts · mobile, low-fidelity · мова UI: українська
- Format (spec-format.md): Workable — екрани описані таблицею §4 і §5, а не картками Layout / Actions / States (RV-034, LOW); генератор будує з таблиці, як і раніше.
- Blocked for wireframes: none
- Proceed with defaults: Q5 — автофокус пошуку вимкнено (D5); Q6 — підказка «Готово» не показується (D4). Тексти, яких бракувало, задано рішенням Q41. Рядок тижня прихований, поки повних днів < 3 (Q35). Прийнятих ризиків немає.

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
| RV-036 | Діаграма §2.1: «натиснути запис (лише сьогодні)» суперечить Q36 | MEDIUM | V2 | VERIFIED | Automatic | джерело — Q36; виправлено fix 8 |
| RV-037 | CT-01 у §4 без панелі вкладок і переходу «Прогрес» → PR-01 (є лише в §5 «Розташування») | MEDIUM | V2 | VERIFIED | Automatic | джерело — §5, Q15, PR-D3; fix 8 |
| RV-038 | CT-02 у §4 без дати минулого дня біля «Прийом ▾» (є лише в Q36) | MEDIUM | V2 | VERIFIED | Automatic | джерело — Q36; fix 8 |
| RV-039 | Помилка пошуку (Q39): немає в діаграмі §2.1, у точках входу CT-08 і в закритті CT-08 | MEDIUM | V3 | VERIFIED | Automatic | джерело — Q39; fix 8 |
| RV-040 | Статус: «Жодної … роботи у Figma ще не виконано» — неправда | LOW | V6 | VERIFIED | Automatic | джерело — `core-calorie-tracking-flow.wireframes.md`; fix 8 |

## Decisions
Усі рішення власника продукту (Q3, Q7–Q30; рішення D1–D7 затверджені як Q16) записані у специфікації, §6 «Прийняті рішення власника продукту» (з посиланнями на RV-ID) і застосовані у тексті. Q3, Q7–Q29 прийняті 2026-11-15; Q30 [RV-033] — 2026-11-16 (зміна UXC-01 з `core-calorie-tracking-flow.ux-changes.md`: поле пошуку CT-02 внизу, панель доданих над ним, панель прихована під час введення), затвердив користувач як власник продукту. Прийнятих ризиків немає.

## Latest report
Iteration 13 · 2026-11-20 · SHA-256 4409895b… · **PASS** · 0 BLOCKER / 0 HIGH / 0 MEDIUM / 1 LOW (RV-034) · verified 0, reopened 0, new 0.

- Привід: рішення власника Q40 («Більше харчової цінності» прибрано з CT-03 / CT-04) і Q41 (тексти порожніх станів, повідомлення про видалення, підказка сканера, помилка AI).
- Перевірка: §4 CT-01, CT-02, CT-03, CT-04, CT-06, CT-07 і §6 Q40–Q41 узгоджені; посилань на «Більше харчової цінності» поза Q40 не лишилося; `[текст не задано]` у специфікації більше немає.
- Missing information · Contradictions · Unresolved product decisions: None (крім RV-034, LOW).
- Figma readiness: усі чотири — Ready. Оновити кадри: прибрати розкривач на CT-03 / CT-04 і їхніх копіях; вставити тексти Q41.
- Decision: PASS; перевіряв той самий агент, що вносив зміни.

## Last fix log
Fix 8 (2026-11-20) · SHA-256 d029120c… → 16e895b0…
- RV-036 · §2.1 — "натиснути запис (лише сьогодні)" → "натиснути запис (сьогодні або минулий день, Q36)" · Q36 · FIXED → VERIFIED (it. 12)
- RV-037 · §4 CT-01 компоненти — додано "нижня панель вкладок «Сьогодні / Прогрес» (Q15, PR-D3)"; дії — "вкладка «Прогрес» → PR-01"; переходи — "PR-01" · §5 «Розташування», PR-D3 · FIXED → VERIFIED
- RV-038 · §4 CT-02 — "Заголовок: ✕, **Прийом ▾**;" → "… (на минулий день поруч дата, напр. «вт, 17 листопада» — Q36);" · Q36 · FIXED → VERIFIED
- RV-039 · §2.1 — додано вузол SE і ребра C → SE, SE → C, SE → K, K → SE; §4 CT-08 вхід і закриття — додано помилку пошуку · Q39 · FIXED → VERIFIED
- RV-040 · статус — "Жодної візуальної роботи або роботи у Figma ще не виконано." → "Вайрфрейми — Figma, див. `core-calorie-tracking-flow.wireframes.md`." · маніфест вайрфреймів · FIXED → VERIFIED
Escalated: none.

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
- 11 (2026-11-20) PASS 0/0/4/2 · рішення Q37–Q39 записано власником; повна перевірка після Q35/Q36/Q15 · new RV-036…RV-040 · fix 8: 5 FIXED
- 12 (2026-11-20) PASS 0/0/0/1 · verified RV-036…RV-040
- 13 (2026-11-20) PASS 0/0/0/1 · рішення Q40, Q41 записано власником; нових дефектів немає
