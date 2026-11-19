# Validation — docs/uk/features/progress/requirements.md

## Handoff
- Spec SHA-256: c2aeb1712b7e3748bb44d85301e8d63a427a28522f7fd0523e01025ea9886e3f · validated 2026-11-18 · iteration 02
- Status: PASS
- Scope: Прогрес — PR-01 тиждень, PR-02 місяць, PR-03 деталі дня, PR-04 пояснення; панель вкладок на CT-01 (лише копія CT-01 у рядку Прогресу) · mobile 390 × 844 · low-fi · українська
- Format (spec-format.md): Full — screen cards з Goal / Entry / Layout / Actions / States для CT-01 (зміна), PR-01…PR-04; компоненти §5.1; рішення і питання §12 з типовими значеннями; приклад §13
- Blocked for wireframes: none
- Proceed with defaults: PR-Q1 — повний день = ≥ 3 з 4 прийомів; PR-Q2 — рядок тижня CT-01 не змінюється; PR-Q4 — 3 / 4 / 10 днів; PR-Q5 — без цілі: лише споживання, без підсумків (варіант, окремий кадр не обов'язковий); PR-Q6 — Б/В/Ж дня лише за повними даними; PR-Q7 — CT-01 з панеллю вкладок малюється як копія в рядку Прогресу, наявні кадри CT-01 не змінюються

## Issues
| ID | Title | Severity | Category | Status | Resolution | Note |
|---|---|---|---|---|---|---|
| RV-001 | Кнопки станів без рядка Actions: «До сьогодні» (PR-01.S4), «Спробувати знову» (PR-01.S6), «Перейти до сьогодні» (PR-03.S3) | MEDIUM | V3 | VERIFIED | Automatic | результати були в описі станів; перенесено в Actions |
| RV-002 | Немає вмісту для кадру-результату «PR-01 — тиждень 12–18 жовтня» (крок 4 шляху 4.3) | MEDIUM | V1 | VERIFIED | Automatic | значення перераховано скриптом і додано в §13 |
| RV-003 | AC-04: неправильні числа календарного середнього | LOW | V2 | VERIFIED | Automatic | 1 407 і 1 642 перераховано |
| RV-004 | PR-D3 змінює Q15 для CT-01, але `core-calorie-tracking-flow.md` ще не оновлено | MEDIUM | V2 (між документами) | NEEDS_DECISION | Requires Product Owner Decision | PR-Q7; типове значення в Handoff. Не блокує Прогрес |
| RV-005 | Дві різні «середні тижня»: рядок CT-01 (дні з записами, разом з неповними) і Прогрес (повні дні) | MEDIUM | V2 (між документами) | NEEDS_DECISION | Requires Product Owner Decision | PR-Q2; різні підписи зменшують плутанину |

## Decisions
PR-D1…PR-D4 — рішення користувача від 2026-11-18, записані в специфікації §12.1. PR-D5…PR-D12 — пропозиції автора, позначені як такі.

## Latest report

### 1. Summary
Документ `docs/uk/features/progress/requirements.md`, SHA-256 c2aeb171…6e3f, ітерація 02, 2026-11-18. Обсяг задекларовано (шапка, §2–§3). Статус PASS. Відкриті: BLOCKER 0, HIGH 0, MEDIUM 2 (обидва NEEDS_DECISION між документами), LOW 0. З минулої ітерації: VERIFIED 3, reopened 0, new 0.

### 2. Findings
**[RV-004] PR-D3 ще не застосовано до специфікації CT-01** · MEDIUM · V2 · carried · §12.1 PR-D3 і `core-calorie-tracking-flow.md` §5 «Розташування (рішення Q15, Q30): CT-01 — … нижньої навігаційної панелі немає» · Basis: Explicit · Проблема: два документи суперечать один одному щодо CT-01. Для вайрфреймів: генератор може або змінити наявні кадри CT-01, або не показати вкладку. · Рекомендація: оновити `core-calorie-tracking-flow.md` (Q35 = PR-D3) через requirements-validator і змінити кадри CT-01 через ux-wireframe-refiner; до того — копія CT-01 з панеллю в рядку Прогресу. · Requires Product Owner Decision (коли застосувати).

**[RV-005] Різні означення «середнього тижня»** · MEDIUM · V2 · carried · §12.2 PR-Q2; `core-calorie-tracking-flow.md` §5 «середнє за дні цього тижня (пн–нд) до сьогодні, у які є записи» · Basis: Explicit · Проблема: людина побачить різні числа на CT-01 і в Прогресі за той самий тиждень. Для вайрфреймів: впливає лише на підписи; кадри Прогресу малюються з підписом «за повні дні (n)». · Рекомендація: вирішити PR-Q2. · Requires Product Owner Decision.

### 3. Missing information · Contradictions · Unresolved product decisions
- Missing information: None.
- Contradictions: RV-004, RV-005 (між документами; усередині специфікації — немає).
- Unresolved: PR-Q1…PR-Q7, кожне з типовим значенням.

### 4. Figma readiness
| Deliverable | Rating | Reason |
|---|---|---|
| Main flow frames | Ready | CT-01 (копія) → PR-01.S1 → PR-01 → PR-03 визначено з вмістом |
| Alternative state frames | Ready | PR-01.S4–S6, PR-02.S1/S3, PR-03.S1–S4 описано з текстами |
| Reusable components | Ready | §5.1 з варіантами |
| Interactive prototypes | Ready | усі дії мають результат; закриття шторок — за походженням |

| V7 | Answer |
|---|---|
| 1 Які кадри | Yes |
| 2 Які стани | Yes |
| 3 Повторні компоненти | Yes |
| 4 Варіанти | Yes |
| 5 Переходи | Yes |
| 6 Оверлеї | Yes (PR-03, PR-04) |
| 7 Fixed / scroll / sticky | Yes |
| 8 Вміст і ієрархія | Yes (§13, TC-02/05/09) |
| 9 Основний / другорядний | Yes (§4) |
| 10 Після кожної дії | Yes |

### 5. Next actions
1. Власнику продукту — PR-Q1…PR-Q7 (§12.2), насамперед PR-Q5 (користувачі з РХП) і PR-Q2.
2. Після рішення PR-Q7 — оновити `core-calorie-tracking-flow.md` і кадри CT-01.
3. Специфікацію перевіряв її автор — рекомендовано незалежний перегляд.

### 6. Decision
PASS для задекларованого обсягу Прогресу: вайрфрейми можна будувати; два MEDIUM — розбіжності з іншою специфікацією, що мають типові значення.

## Last fix log
SHA-256 до: (ітерація 01, не збережено) → після: c2aeb1712b7e3748bb44d85301e8d63a427a28522f7fd0523e01025ea9886e3f
- RV-001 · §5 PR-01 Actions — додано рядки «До сьогодні», «Спробувати знову»; §5 PR-03 Actions — додано «Перейти до сьогодні». Джерело: описи станів PR-01.S4, PR-01.S6, PR-03.S3. FIXED → VERIFIED (ітерація 02).
- RV-002 · §13 — додано рядок «Тиждень 12–18 жовтня …». Джерело: `calculation_reference.py` (дані TC-05). FIXED → VERIFIED.
- RV-003 · §11 AC-04 — «7 640 / 7 … 8 280 / 6» → «1 407 (9 850 / 7) … 1 642 (9 850 / 6)». FIXED → VERIFIED.
Escalated: RV-004, RV-005.

## History
Iteration 01 (2026-11-18) — PASS (з відкритими MEDIUM): MEDIUM 4, LOW 1; new 5; fix: RV-001…RV-003.
Iteration 02 (2026-11-18) — PASS: MEDIUM 2 (NEEDS_DECISION); verified 3.
