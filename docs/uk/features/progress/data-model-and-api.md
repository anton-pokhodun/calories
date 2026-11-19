# Прогрес — дані, архітектура розрахунків і контракти

Статус: **пропозиція; не реалізовано.** У репозиторії немає коду, схеми БД чи API (див. `calculation-specification.md` §0, G1). Тут описано мінімум змін до моделі даних із продуктових документів і рекомендований спосіб рахувати Прогрес.
Пов'язані: `calculation-specification.md` (формули), `requirements.md` (поведінка), `../../product/onboarding-questionnaire.md` §4, `../../product/calculation-model.md` §6, `../../product/adaptive-personalization.md` §2.

---

## 1. Що вже визначено в документах

| Сутність | Де | Поля | Придатність для Прогресу |
|---|---|---|---|
| `OnboardingAnswers` | `onboarding-questionnaire.md` §4 | незмінний знімок відповідей, `created_at`, `model_version` | не потрібна напряму |
| `CalorieEstimate` | `calculation-model.md` §6 | незмінний запис: `model_version`, `inputs`, BMR, PAL, TDEE, дефіцит, `target_kcal`, `created_at` | **історія цілей є**; бракує локальної дати дії |
| `WeightEntry` | `onboarding-questionnaire.md` §4 | `measured_at`, `kg`, `source` | у Прогресі v1 не використовується |
| `FoodEntry` | `adaptive-personalization.md` §2 | `logged_at`, `meal`, `kcal`, `source`, `edited` | **недостатньо**: немає Б/В/Ж, кількості, одиниці, `food_id`, локальної дати, ознаки видалення |
| `DayLog` | `adaptive-personalization.md` §2 | `date, entries_count, kcal_total, meals_covered, user_marked_complete?, fasting_marked?` | концепція; пропонуємо **не зберігати**, а обчислювати (= `DaySummary`, §3) |
| `GoalChange` | `adaptive-personalization.md` §2 | `at, goal, pace, goal_weight` | дублює `CalorieEstimate` для цілей Прогресу; не потрібна |

Цілей Б/В/Ж немає ніде (рішення PR-D1: не вводимо). Позначки «день завершено» немає (рішення PR-D2: не вводимо; `user_marked_complete` лишається невикористаним).

---

## 2. Пропоновані зміни моделі

### 2.1 `FoodEntry` — розширення зі знімками (без дублювання наявних полів)

| Поле | Тип | Нове? | Призначення |
|---|---|---|---|
| `id` | UUID, генерує клієнт | так (явно) | ідемпотентність синхронізації, дедуплікація |
| `user_id` | UUID | так (явно) | |
| `version` | int ≥ 1 | так | редагування CT-04 = `version + 1` того самого `id` |
| `food_id` | UUID? | так | посилання на довідник; `null` для швидкого додавання й частини фото/AI |
| `food_name` | string | так | знімок назви («Швидке додавання» для CT-08 без назви) |
| `logged_at` | timestamp UTC | є | |
| `tz` | IANA string | так | аудит; напр. `Europe/Kyiv` |
| `local_date` | date | так | **ключ групування** (`calculation-specification.md` §3) |
| `meal` | enum breakfast / lunch / dinner / snack | є | |
| `quantity`, `unit` | decimal, enum g / ml / serving / одиниця продукту | так | знімок порції CT-03 |
| `kcal` | decimal ≥ 0 | є | **знімок** на момент запису |
| `protein_g`, `carbs_g`, `fat_g` | decimal?, 1 знак | так | **знімки**; `null` = невідомо (не 0) |
| `source` | enum search / recent / saved / barcode / photo_ai / quick_add | є (розширено значенням recent/saved — за потреби) | |
| `deleted_at` | timestamp? | так | м'яке видалення (CT-04 «Видалити», скасування, панель CT-02) |
| `edited` | bool | є | можна виводити з `version > 1` |

**Знімки, а не перерахунок.** Калорії й Б/В/Ж записуються в запис у момент додавання (CT-03: `ккал = ккал на одиницю × кількість`). Оновлення довідника не змінює історичних записів. Редагування користувачем — нова версія запису, а не перерахунок.

### 2.2 `CalorieEstimate` — одне нове поле

| Поле | Тип | Призначення |
|---|---|---|
| `effective_date` | date | локальна дата, з якої ця ціль діє (`calculation-specification.md` §3.3) |

`target_kcal` може бути `null` для режиму без норми (ON-11) — тоді Прогрес не показує порівнянь. Нових полів цілей Б/В/Ж не додаємо.

### 2.3 Користувач

| Поле | Тип | Призначення |
|---|---|---|
| `tracking_start_date` | date | локальна дата завершення онбордингу; найраніший період у Прогресі; дні до неї — `before_start` |

### 2.4 Індекси (для серверного сховища)

- `food_entry (user_id, local_date)` — вибірка періоду; включає видалені (для синхронізації).
- `food_entry (user_id, id, version)` унікальний — ідемпотентність.
- `calorie_estimate (user_id, effective_date, created_at)`.

---

## 3. Де рахувати: рекомендація

| Варіант | Плюси | Мінуси |
|---|---|---|
| **A. На клієнті з локальних даних** (рекомендовано) | працює офлайн (як «Нещодавнє» і швидке додавання, Q14); обсяг малий (≤ 31 день × десятки записів); не потрібен новий ендпоінт; миттєве оновлення після запису | треба синхронізувати записи й оцінки (потрібно й так для інших пристроїв і двигуна) |
| B. На сервері, ендпоінт `GET /progress` | одна реалізація для всіх клієнтів | не працює офлайн; мережевий запит на кожне перемикання періоду; ще один сервіс |
| C. Предагреговані `DaySummary` у БД | швидкі запити на довгі періоди | ризик розсинхронізації після редагувань; зайва складність для 7–31 дня |

**Рішення-пропозиція:** варіант A з **одним** аналітичним модулем (чисті функції з `calculation-specification.md` §1), що постачається як спільна бібліотека. Той самий модуль пізніше використає сервер для адаптивного двигуна (`adaptive-personalization.md`), тож повний день і середні рахуватимуться однаково всюди. Спільні тест-вектори = кейси TC-01…TC-12 (`calculation-specification.md` §11).
Нова таблиця, ендпоінт агрегації чи кеш **не потрібні** у v1.

### 3.1 Інтерфейс аналітичного модуля

```text
dayStatus / daySummary(date, entries, estimates, today, start, params) → DaySummary
periodSummary(kind: week|month, anchor: date, entries, estimates, today, start, params) → PeriodSummary
compare(current: PeriodSummary, previous: PeriodSummary) → Comparison
insights(current, previous, hasTarget, params) → Insight[]   (≤ 2)
```

Вхід — уже дійсні записи `local_date ∈ [початок попереднього періоду, кінець поточного]` та всі оцінки користувача. Результат не залежить від порядку записів, поточного часу (лише через `today`) і поясу пристрою.

### 3.2 `PeriodSummary` (структура результату; та сама в разі серверного варіанта B)

```json
{
  "analytics_version": "progress-1.0",
  "kind": "week",
  "from": "2026-11-09", "to": "2026-11-15",
  "today": "2026-11-18",
  "days": [
    {"date": "2026-11-09", "status": "complete",  "meals_covered": 3, "kcal": 1820.0, "target_kcal": 1750, "diff_kcal": 70,  "band": "within",
     "macros": {"protein_g": 100.0, "carbs_g": 218.4, "fat_g": 60.7}},
    {"date": "2026-11-11", "status": "partial",   "meals_covered": 2, "kcal": 640.0,  "target_kcal": 1750, "diff_kcal": null, "band": null,
     "macros": {"protein_g": 35.2, "carbs_g": 76.8, "fat_g": 21.3}},
    {"date": "2026-11-12", "status": "complete",  "meals_covered": 4, "kcal": 1910.0, "target_kcal": 1750, "diff_kcal": 160, "band": "above",
     "macros": {"protein_g": null, "carbs_g": null, "fat_g": null}},
    {"date": "2026-11-14", "status": "no_data",   "meals_covered": 0, "kcal": null,   "target_kcal": 1750, "diff_kcal": null, "band": null,
     "macros": {"protein_g": null, "carbs_g": null, "fat_g": null}}
  ],
  "counts": {"complete": 5, "partial": 1, "no_data": 1, "in_progress": 0, "future": 0, "before_start": 0, "past": 7},
  "avg_kcal": {"value": 1842.0, "n": 5},
  "target_comparison": {"n": 5, "avg_kcal": 1842.0, "avg_target_kcal": 1750.0, "diff_kcal": 92, "band": "within",
                        "band_counts": {"below": 0, "within": 3, "above": 2}},
  "macros": {"protein_g": {"value": 105.7, "n": 4}, "carbs_g": {"value": 213.65, "n": 4}, "fat_g": {"value": 60.85, "n": 4}},
  "segments": [],
  "insights": [
    {"id": "INS-01", "text": "Середнє за повні дні (5) — у межах цілі ±100 ккал."},
    {"id": "INS-03", "text": "У середньому на 118 ккал на день менше, ніж минулого тижня."}
  ]
}
```
(Масив `days` скорочено; повний — 7 днів тижня або всі дні місяця.)

**Представлення відсутніх даних:** `null` означає «немає даних / не рахується» і ніколи не замінюється нулем; `value: null` у середніх — «мало даних» (менше мінімуму днів). **Історична ціль:** `target_kcal` у кожному дні — ціль, що діяла того дня; поточна ціль окремо не передається.

### 3.3 Дані для клієнта (синхронізація, а не нові ендпоінти Прогресу)
Прогресу потрібні ті самі дані, що вже мають бути на пристрої для CT-01: записи (зокрема видалені — як «надгробки» `deleted_at`) і оцінки. Якщо сервер існуватиме, достатньо інкрементної синхронізації `FoodEntry` за `updated_at` і `CalorieEstimate` — без окремого API Прогресу.

### 3.4 Поведінка при помилках

| Ситуація | Результат модуля | UI |
|---|---|---|
| Немає жодного запису за період | `PeriodSummary` з `no_data`/`future` днями, середні `null` | стан «Немає записів» |
| Мало повних днів | середні `null` | стан «Мало даних» |
| Немає оцінки цілі (ON-11) | `target_kcal: null`, `target_comparison.n = 0` | без лінії цілі й порівнянь |
| Локальні дані не завантажилися (помилка сховища) | виняток модуля не кидається; шар даних повертає помилку | стан «Не вдалося завантажити» + «Спробувати знову» |
| Запис з `kcal < 0` чи невідомим `meal` | відкидається (`calculation-specification.md` §4.1) | — ; подія в логах якості даних |

---

## 4. Узгодженість клієнта й сервера
1. Одна реалізація (спільна бібліотека) — заборонено переписувати формули в UI чи окремо на сервері.
2. `analytics_version` у результаті; зміна параметрів §9 специфікації = нова версія.
3. Спільні тест-вектори TC-01…TC-12 запускаються в CI кожної платформи.

## 5. Міграція наявних даних (якщо записи вже існують)
- `local_date` = дата `logged_at` у поясі пристрою на момент запису; якщо пояс не збережено — у поясі профілю (позначити `tz_inferred = true`).
- `effective_date` = дата `created_at` оцінки в тому ж поясі.
- Б/В/Ж для старих записів без знімка — `null` (не підставляти з довідника, бо він міг змінитися).
- `tracking_start_date` = дата першої `CalorieEstimate` (або першого запису для користувачів без норми).
