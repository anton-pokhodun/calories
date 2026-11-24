"""
Progress — еталонна реалізація розрахунків (лише для перевірки специфікації).

НЕ код застосунку. Призначення: усі числа в
docs/uk/features/progress/calculation-specification.md і в прикладах вайрфреймів
перераховані цим скриптом (так само, як calculation-model.md §7–8).

Запуск:  python3 calculation_reference.py            → друкує всі тест-кейси
         python3 calculation_reference.py --check    → лише перевірка тверджень (assert)
"""
from __future__ import annotations

import math
import sys
from dataclasses import dataclass, field
from datetime import date, datetime, timedelta, timezone
from zoneinfo import ZoneInfo

# ---------------------------------------------------------------- параметри
NUTRIENTS = ("protein_g", "carbs_g", "fat_g")

P = {
    "CORRIDOR_KCAL": 100,          # calculation-model.md §4.6 (D15/Q31): коридор ціль ± 100
    "USUAL_WINDOW_DAYS": 14,       # вікно «звичного» (попередні 14 днів)
    "USUAL_MIN_DAYS": 7,           # скільки днів у вікні потрібно, щоб «звичне» було відоме
    "LOW_KCAL_SHARE": 0.5,         # PR-D14: менше половини звичних калорій — неповний запис
    "MIN_DAYS_AVG": 3,             # мін. повних днів, щоб показати середнє
    "MIN_DAYS_INSIGHT": {"week": 4, "month": 10},
    "INSIGHT_KCAL_DELTA": 100,     # мін. зміна середнього ккал між періодами для інсайту
    "INSIGHT_MACRO_REL": 0.10,     # мін. відносна зміна Б/В/Ж для інсайту
    "INSIGHT_MACRO_ABS_G": 5,      # і мін. абсолютна зміна, г
    "MAX_INSIGHTS": 2,
}

# статуси дня
COMPLETE, PARTIAL, NO_DATA, IN_PROGRESS, FUTURE, BEFORE_START = (
    "complete", "partial", "no_data", "in_progress", "future", "before_start")
BELOW, WITHIN, ABOVE = "below", "within", "above"


def rnd(x: float) -> int:
    """Округлення half away from zero (не банківське)."""
    return int(math.floor(abs(x) + 0.5)) * (1 if x >= 0 else -1)


def rnd1(x: float) -> float:
    return math.floor(abs(x) * 10 + 0.5) / 10 * (1 if x >= 0 else -1)


# ---------------------------------------------------------------- вхідні дані
@dataclass
class FoodEntry:
    id: str
    local_date: date              # календарна дата користувача в момент запису (незмінна); прийому немає (Q42 / PR-D25)
    kcal: float | None            # знімок на момент запису
    protein_g: float | None = None
    carbs_g: float | None = None
    fat_g: float | None = None
    deleted: bool = False
    version: int = 1              # редагування = нова версія того самого id


@dataclass
class CalorieEstimate:
    id: str
    effective_date: date          # локальна дата, з якої діє
    created_seq: int              # порядок створення (у даних — created_at UTC)
    target_kcal: int | None       # None = режим без норми (ON-11)


@dataclass
class Day:
    date: date
    status: str
    entries: int = 0
    kcal: float | None = None
    target: int | None = None
    diff: int | None = None       # лише для complete з ціллю; = rnd(kcal) − target
    band: str | None = None
    macros: dict = field(default_factory=dict)   # nutrient → float | None (None = неповні дані)
    usual_kcal: float | None = None  # звичні калорії (медіана повних днів за 14 днів) або ціль
    reason: str | None = None        # для неповного: "low_kcal_pending" | "not_all"; для повного «малого» — "confirmed_low"


# ---------------------------------------------------------------- шар 1: день
def valid_entries(entries: list[FoodEntry]) -> list[FoodEntry]:
    latest: dict[str, FoodEntry] = {}
    for e in entries:                              # дедуплікація за id, лишається остання версія
        if e.id not in latest or e.version > latest[e.id].version:
            latest[e.id] = e
    return [e for e in latest.values()
            if not e.deleted and e.kcal is not None and e.kcal >= 0]


def target_for(d: date, estimates: list[CalorieEstimate]) -> int | None:
    cands = [e for e in estimates if e.effective_date <= d]
    if not cands:
        return None
    return max(cands, key=lambda e: (e.effective_date, e.created_seq)).target_kcal


def band_of(diff: int) -> str:
    if diff < -P["CORRIDOR_KCAL"]:
        return BELOW
    if diff > P["CORRIDOR_KCAL"]:
        return ABOVE
    return WITHIN


def median(xs):
    xs = sorted(xs)
    n = len(xs)
    return None if n == 0 else (xs[n // 2] if n % 2 else (xs[n // 2 - 1] + xs[n // 2]) / 2)


def classify_all(entries: list[FoodEntry], estimates, today: date, start: date, answers: dict | None = None) -> dict:
    answers = answers or {}   # PR-D21: {date: 'all' | 'not_all'} — відповідь людини про «малий» день
    """Статуси всіх днів від початку обліку до сьогодні — по черзі, бо «звичне» залежить від попередніх днів."""
    days: dict[date, Day] = {}
    d = start
    while d <= today:
        es = [e for e in entries if e.local_date == d]
        day = Day(d, NO_DATA, entries=len(es), target=target_for(d, estimates))
        if es:
            day.kcal = sum(e.kcal for e in es)
            for n in NUTRIENTS:
                vals = [getattr(e, n) for e in es]
                day.macros[n] = None if any(v is None for v in vals) else sum(vals)
        win = [days[d - timedelta(days=i)] for i in range(1, P["USUAL_WINDOW_DAYS"] + 1)
               if d - timedelta(days=i) in days]
        comp = [x.kcal for x in win if x.status == COMPLETE]
        day.usual_kcal = median(comp) if len(comp) >= P["USUAL_MIN_DAYS"] else day.target
        if d == today:
            day.status = IN_PROGRESS
        elif not es:
            day.status = NO_DATA
        elif day.target is not None and day.usual_kcal is not None and day.kcal < P["LOW_KCAL_SHARE"] * day.usual_kcal:
            a = answers.get(d)
            if a == "all":                       # «Так, це все» — день рахується
                day.status, day.reason = COMPLETE, "confirmed_low"
            elif a == "not_all":                 # «Ні, не все»
                day.status, day.reason = PARTIAL, "not_all"
            else:                                # ще без відповіді
                day.status, day.reason = PARTIAL, "low_kcal_pending"
        else:
            day.status = COMPLETE
        if day.status == COMPLETE and day.target is not None:
            day.diff = rnd(day.kcal) - day.target
            day.band = band_of(day.diff)
        days[d] = day
        d += timedelta(days=1)
    return days


def day_summary(d: date, entries, estimates, today: date, start: date, cls: dict | None = None) -> Day:
    if d > today:
        return Day(d, FUTURE)
    if d < start:
        return Day(d, BEFORE_START)
    return (cls or classify_all(entries, estimates, today, start))[d]


# ---------------------------------------------------------------- шар 2: період
def week_days(anchor: date) -> list[date]:
    mon = anchor - timedelta(days=anchor.weekday())
    return [mon + timedelta(days=i) for i in range(7)]


def month_days(anchor: date) -> list[date]:
    first = anchor.replace(day=1)
    nxt = (first + timedelta(days=32)).replace(day=1)
    return [first + timedelta(days=i) for i in range((nxt - first).days)]


def mean(xs):
    return sum(xs) / len(xs) if xs else None


@dataclass
class Period:
    kind: str
    days: list[Day]
    counts: dict
    n_complete: int
    avg_kcal: float | None
    n_cmp: int
    avg_kcal_cmp: float | None
    avg_target_cmp: float | None
    avg_diff: int | None
    avg_band: str | None
    band_counts: dict
    macros: dict                  # nutrient → (avg | None, n)
    segments: list = field(default_factory=list)   # місяць: тижні


def aggregate(kind: str, days: list[Day]) -> Period:
    counts = {s: sum(1 for d in days if d.status == s)
              for s in (COMPLETE, PARTIAL, NO_DATA, IN_PROGRESS, FUTURE, BEFORE_START)}
    comp = [d for d in days if d.status == COMPLETE]
    cmp_ = [d for d in comp if d.target is not None]
    ok_avg = len(comp) >= P["MIN_DAYS_AVG"]
    ok_cmp = len(cmp_) >= P["MIN_DAYS_AVG"]
    avg_kcal = mean([d.kcal for d in comp]) if ok_avg else None
    akc = mean([d.kcal for d in cmp_]) if ok_cmp else None
    atg = mean([d.target for d in cmp_]) if ok_cmp else None
    adiff = rnd(akc) - rnd(atg) if ok_cmp else None
    macros = {}
    for n in NUTRIENTS:
        vals = [d.macros[n] for d in comp if d.macros.get(n) is not None]
        macros[n] = (mean(vals) if len(vals) >= P["MIN_DAYS_AVG"] else None, len(vals))
    return Period(kind, days, counts, len(comp), avg_kcal, len(cmp_), akc, atg, adiff,
                  band_of(adiff) if adiff is not None else None,
                  {b: sum(1 for d in cmp_ if d.band == b) for b in (BELOW, WITHIN, ABOVE)},
                  macros)


def build(kind: str, anchor: date, entries, estimates, today: date, start: date, answers: dict | None = None) -> Period:
    ve = valid_entries(entries)
    ds = week_days(anchor) if kind == "week" else month_days(anchor)
    cls = classify_all(ve, estimates, today, start, answers)
    per = aggregate(kind, [day_summary(d, ve, estimates, today, start, cls) for d in ds])
    if kind == "month":                       # тижневі сегменти (пн–нд), обрізані межами місяця
        seg: list[Day] = []
        for d in per.days:
            seg.append(d)
            if d.date.weekday() == 6 or d is per.days[-1]:
                comp = [x for x in seg if x.status == COMPLETE]
                need = min(P["MIN_DAYS_AVG"], len(seg))
                per.segments.append({
                    "from": seg[0].date, "to": seg[-1].date, "n_complete": len(comp),
                    "avg_kcal": mean([x.kcal for x in comp]) if len(comp) >= need and comp else None,
                    "avg_target": mean([x.target for x in comp if x.target is not None])
                    if len(comp) >= need and comp else None})
                seg = []
    return per


# ---------------------------------------------------------------- шар 4: інсайти
NUT_UA = {"protein_g": "білків", "carbs_g": "вуглеводів", "fat_g": "жирів"}


def insights(cur: Period, prev: Period | None, has_target: bool) -> list[tuple[str, str]]:
    if not has_target:                        # PR-Q5: без норми — без інсайтів
        return []
    need = P["MIN_DAYS_INSIGHT"][cur.kind]
    prev_name = "минулого тижня" if cur.kind == "week" else "минулого місяця"
    out = []
    if cur.n_cmp >= need:                                                  # INS-01
        d = cur.avg_diff
        if cur.avg_band == WITHIN:
            out.append(("INS-01", f"Середнє за повні дні ({cur.n_cmp}) — у межах цілі ±100 ккал."))
        else:
            word = "нижче" if d < 0 else "вище"
            out.append(("INS-01", f"Середнє за повні дні ({cur.n_cmp}) — на {abs(d)} ккал {word} цілі."))
    if prev and cur.n_complete >= need and prev.n_complete >= need:       # INS-03
        delta = rnd(mean([x.kcal for x in cur.days if x.status == COMPLETE])) - \
            rnd(mean([x.kcal for x in prev.days if x.status == COMPLETE]))
        if abs(delta) >= P["INSIGHT_KCAL_DELTA"]:
            word = "більше" if delta > 0 else "менше"
            out.append(("INS-03", f"У середньому на {abs(delta)} ккал на день {word}, ніж {prev_name}."))
    if prev:                                                               # INS-04
        best = None
        for n in NUTRIENTS:
            (ca, cn), (pa, pn) = cur.macros[n], prev.macros[n]
            if cn >= need and pn >= need and ca is not None and pa is not None:
                dg = rnd(ca) - rnd(pa)
                rel = abs(dg) / rnd(pa) if rnd(pa) else 0
                if abs(dg) >= P["INSIGHT_MACRO_ABS_G"] and rel >= P["INSIGHT_MACRO_REL"]:
                    if best is None or rel > best[2]:
                        best = (n, dg, rel, rnd(ca))
        if best:
            n, dg, _, ca = best
            word = "більше" if dg > 0 else "менше"
            out.append(("INS-04", f"У середньому {ca} г {NUT_UA[n]} на день — на {abs(dg)} г {word}, ніж {prev_name}."))
    if cur.n_cmp >= need:                                                  # INS-02
        out.append(("INS-02", f"У межах цілі ±100 ккал — {cur.band_counts[WITHIN]} з {cur.n_cmp} повних днів."))
    return out[: P["MAX_INSIGHTS"]]


# ---------------------------------------------------------------- генератор даних
RATIO = {"protein_g": (0.22, 4), "carbs_g": (0.48, 4), "fat_g": (0.30, 9)}
DAY3 = (0.25, 0.40, 0.35)   # частки ккал між записами дня (лише щоб розкласти суму на кілька записів)
_seq = [0]


def make_day(d: date, kcal: float, split=DAY3,
             no_macro_kcal: float = 0, tilt: float = 0.0) -> list[FoodEntry]:
    """День з `kcal` ккал, розкладених на кілька записів (частки `split`; прийомів немає — PR-D25); `no_macro_kcal` — швидке додавання без Б/В/Ж;
    `tilt` зсуває частку вуглеводів на користь білків (для різноманітності прикладів)."""
    out = []
    base = kcal - no_macro_kcal
    tot = sum(split)
    for w in split:
        _seq[0] += 1
        k = base * w / tot
        pr, cr, fr = 0.22 + tilt, 0.48 - tilt, 0.30
        out.append(FoodEntry(f"e{_seq[0]}", d, k, rnd1(k * pr / 4), rnd1(k * cr / 4), rnd1(k * fr / 9)))
    if no_macro_kcal:
        _seq[0] += 1
        out.append(FoodEntry(f"e{_seq[0]}", d, no_macro_kcal))   # CT-08: лише ккал
    return out


def D(s: str) -> date:
    return date.fromisoformat(s)


OLENA = [CalorieEstimate("ce1", D("2026-08-31"), 1, 1750)]
START = D("2026-08-31")
TODAY = D("2026-11-18")   # середа


def week_nov9():
    """Приклад вайрфреймів: 9–15 листопада 2026 (TC-02) + попередній тиждень 2–8 листопада."""
    e = []
    e += make_day(D("2026-11-09"), 1820)
    e += make_day(D("2026-11-10"), 1690, tilt=0.03)
    e += make_day(D("2026-11-11"), 640, split=(0.25, 0.40))                      # «малий» день
    e += make_day(D("2026-11-12"), 1910, no_macro_kcal=150)                     # без Б/В/Ж
    e += make_day(D("2026-11-13"), 1740, tilt=0.02)
    #            2026-11-14 — немає записів
    e += make_day(D("2026-11-15"), 2050, split=(0.25, 0.40, 0.35, 0.15))
    prev = []
    for d, k in [("02", 1980), ("03", 2010), ("04", 1890), ("06", 2050), ("07", 1870)]:
        prev += make_day(D(f"2026-11-{d}"), k, tilt=0.03)
    prev += make_day(D("2026-11-05"), 900, split=(0.40,))                          # «малий» день
    #            2026-11-08 — немає записів
    return e, prev


OCT = [  # (день, ккал, тип) ; тип: c — повний, p — частковий, n — немає, q — повний із швидким додаванням
    (1, 1780, "c"), (2, 1690, "c"), (3, 2120, "c"), (4, 0, "n"),
    (5, 1810, "c"), (6, 1720, "c"), (7, 650, "p"), (8, 1760, "c"), (9, 1950, "c"), (10, 2240, "c"), (11, 0, "n"),
    (12, 1700, "c"), (13, 1830, "q"), (14, 1660, "c"), (15, 1790, "c"), (16, 1880, "c"), (17, 0, "n"), (18, 0, "n"),
    (19, 1740, "c"), (20, 1690, "c"), (21, 1820, "c"), (22, 980, "p"), (23, 1900, "c"), (24, 2150, "c"), (25, 1810, "c"),
    (26, 1750, "c"), (27, 1630, "c"), (28, 1790, "c"), (29, 0, "n"), (30, 1850, "c"), (31, 2010, "c"),
]


def month_oct():
    e = []
    for day, k, t in OCT:
        d = date(2026, 10, day)
        if t == "c":
            e += make_day(d, k, tilt=0.01 * (day % 3))
        elif t == "q":
            e += make_day(d, k, no_macro_kcal=200)
        elif t == "p":
            e += make_day(d, k, split=(0.25, 0.40))
    return e


def month_sep():
    e = []
    for i in range(30):
        d = date(2026, 9, 1) + timedelta(days=i)
        e += make_day(d, 1650 + (i * 37) % 260, tilt=0.01 * (i % 3))
    return e


# ---------------------------------------------------------------- друк
UA_DOW = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]
ST_UA = {COMPLETE: "повний", PARTIAL: "частковий", NO_DATA: "немає даних",
         IN_PROGRESS: "сьогодні (триває)", FUTURE: "майбутній", BEFORE_START: "до початку обліку"}
BD_UA = {BELOW: "нижче цілі", WITHIN: "у межах цілі", ABOVE: "вище цілі", None: "—"}


def fmt(x, nd=2):
    return "—" if x is None else (f"{x:.{nd}f}" if isinstance(x, float) else str(x))


def show(title: str, per: Period, prev: Period | None = None, has_target=True, days=True):
    print(f"\n### {title}")
    if days:
        print("| Дата | Статус | Записів | ккал (сума) | Показ ккал | Ціль | Різниця | Діапазон | Б, г | В, г | Ж, г |")
        print("|---|---|---|---|---|---|---|---|---|---|---|")
        for d in per.days:
            m = d.macros
            show_k = rnd(d.kcal) if d.kcal is not None else "—"
            print(f"| {UA_DOW[d.date.weekday()]} {d.date.isoformat()} | {ST_UA[d.status]} | {d.entries} | "
                  f"{fmt(d.kcal)} | {show_k} | {fmt(d.target)} | {fmt(d.diff)} | {BD_UA[d.band]} | "
                  + " | ".join(fmt(m.get(n), 1) if n in m else "—" for n in NUTRIENTS) + " |")
    c = per.counts
    past = c[COMPLETE] + c[PARTIAL] + c[NO_DATA]
    print(f"\n- Дні: повні {c[COMPLETE]} · часткові {c[PARTIAL]} · без даних {c[NO_DATA]} · сьогодні {c[IN_PROGRESS]}"
          f" · майбутні {c[FUTURE]} · до початку {c[BEFORE_START]} → **«Повні дні: {c[COMPLETE]} з {past}»**")
    print(f"- Середнє споживання (повні дні, n={per.n_complete}): {fmt(per.avg_kcal)} → показ "
          f"{rnd(per.avg_kcal) if per.avg_kcal is not None else '— (мало даних)'}")
    print(f"- Порівняння з ціллю (n={per.n_cmp}): середнє {fmt(per.avg_kcal_cmp)} · середня ціль {fmt(per.avg_target_cmp)}"
          f" → різниця {fmt(per.avg_diff)} ккал · {BD_UA[per.avg_band]}")
    print(f"- Дні за діапазоном: нижче {per.band_counts[BELOW]} · у межах {per.band_counts[WITHIN]} · вище {per.band_counts[ABOVE]}")
    for n in NUTRIENTS:
        a, k = per.macros[n]
        print(f"- {n}: {fmt(a)} г (n={k}, виключено {per.n_complete - k}) → показ {rnd(a) if a is not None else '—'} г")
    for s in per.segments:
        print(f"- Тиждень {s['from'].day}–{s['to'].day}: повних {s['n_complete']} · середнє "
              f"{rnd(s['avg_kcal']) if s['avg_kcal'] is not None else 'мало даних'}"
              f" · ціль {rnd(s['avg_target']) if s['avg_target'] is not None else '—'}")
    ins = insights(per, prev, has_target)
    print("- Інсайти: " + ("; ".join(f"{i} «{t}»" for i, t in ins) if ins else "немає"))
    return ins


def tz_demo():
    """TC-10: межа доби й зміна часового поясу."""
    kyiv, ny = ZoneInfo("Europe/Kyiv"), ZoneInfo("America/New_York")
    rows = [
        ("t1", datetime(2026, 11, 10, 23, 30, tzinfo=kyiv), "dinner"),
        ("t2", datetime(2026, 11, 11, 0, 15, tzinfo=kyiv), "snack"),
        ("t3", datetime(2026, 11, 12, 20, 0, tzinfo=ny), "dinner"),     # у відрядженні
    ]
    print("\n### TC-10 Межа доби і часовий пояс")
    print("| Запис | logged_at (UTC) | Пояс пристрою | local_date (зберігається) | Дата за UTC (НЕ використовуємо) |")
    print("|---|---|---|---|---|")
    res = {}
    for i, t, _ in rows:
        u = t.astimezone(timezone.utc)
        res[i] = (t.date(), u.date())
        print(f"| {i} | {u.isoformat(timespec='minutes')} | {t.tzinfo.key} | {t.date()} | {u.date()} |")
    return res


def main(check_only=False):
    out = sys.stdout
    if check_only:
        import io
        sys.stdout = io.StringIO()
    e, prev_e = week_nov9()
    hist0 = month_sep() + month_oct()   # історія Олени з вересня: «звичні калорії» для листопадових днів (PR-D14)
    tc02 = build("week", D("2026-11-09"), hist0 + e + prev_e, OLENA, TODAY, START)
    prev = build("week", D("2026-11-02"), hist0 + e + prev_e, OLENA, TODAY, START)
    print("## Тест-кейси (перераховано calculation_reference.py)")

    # TC-01 повний тиждень
    full = []
    for i, k in enumerate([1720, 1810, 1690, 1760, 1850, 1980, 1740]):
        full += make_day(D("2026-10-19") + timedelta(days=i), k)
    tc01 = build("week", D("2026-10-19"), full, OLENA, TODAY, START)
    show("TC-01 Повний тиждень (19–25 жовтня 2026)", tc01)
    show("TC-02 Неповний тиждень (9–15 листопада 2026) — приклад вайрфреймів", tc02, prev)
    show("TC-02a Попередній тиждень (2–8 листопада 2026) — для порівняння", prev)
    tc03 = build("week", D("2026-10-26"), [], OLENA, TODAY, START)
    show("TC-03 Порожній тиждень (26 жовтня – 1 листопада 2026, жодного запису)", tc03)
    sep = build("month", D("2026-09-01"), month_sep(), OLENA, TODAY, START)
    show("TC-04 Повний місяць (вересень 2026, 30 днів)", sep, days=False)
    oct_ = build("month", D("2026-10-01"), month_oct(), OLENA, TODAY, START)
    ins_oct = show("TC-05 Неповний місяць (жовтень 2026, 31 день) — приклад вайрфреймів", oct_, sep)

    # TC-06 зміна цілі посеред тижня (темп «Комфортно» → «Легко» з четверга)
    est6 = OLENA + [CalorieEstimate("ce2", D("2026-10-22"), 2, 1910)]
    tc06 = build("week", D("2026-10-19"), full, est6, TODAY, START)
    show("TC-06 Зміна цілі з четверга 22 жовтня (1 750 → 1 910)", tc06)
    # TC-07 зміна профілю (вага) у п'ятницю: нова оцінка 1 730 лише з 23 жовтня
    est7 = OLENA + [CalorieEstimate("ce3", D("2026-10-23"), 3, 1730)]
    tc07 = build("week", D("2026-10-19"), full, est7, TODAY, START)
    show("TC-07 Нова вага з п'ятниці 23 жовтня (ціль 1 750 → 1 730)", tc07)
    # TC-08 неповні дані Б/В/Ж — тиждень TC-02 (12.11 має швидке додавання)
    # TC-09 поточний неповний день
    cur = []
    cur += make_day(D("2026-11-16"), 1760)
    cur += make_day(D("2026-11-17"), 600)                                  # «малий» день: 3 записи, 600 ккал
    cur += make_day(D("2026-11-18"), 820, split=(0.25, 0.40))
    hist = hist0 + e + prev_e + cur
    tc09 = build("week", D("2026-11-16"), hist, OLENA, TODAY, START)
    show("TC-09 Поточний тиждень, сьогодні середа 18 листопада (вівторок 17 — «малий» день без відповіді)", tc09, tc02)
    d17 = classify_all(valid_entries(hist), OLENA, TODAY, START)[D("2026-11-17")]
    print(f"- Вт 17: {rnd(d17.kcal)} ккал, звичні {rnd(d17.usual_kcal)}, поріг {rnd(0.5 * d17.usual_kcal)} → питання людині")
    tc15 = build("week", D("2026-11-16"), hist, OLENA, TODAY, START, {D("2026-11-17"): "all"})
    show("TC-15 Той самий тиждень після відповіді «Так, це все» про вівторок 17", tc15, tc02)
    tc15n = build("week", D("2026-11-16"), hist, OLENA, TODAY, START, {D("2026-11-17"): "not_all"})
    print(f"\n- Після відповіді «Ні, не все»: Вт 17 — {ST_UA[tc15n.days[1].status]}; повні дні {tc15n.counts[COMPLETE]} з {tc15n.counts[COMPLETE]+tc15n.counts[PARTIAL]+tc15n.counts[NO_DATA]}")
    # TC-11 видалені й дубльовані записи
    dup = make_day(D("2026-10-05"), 1800)
    dup2 = [FoodEntry(dup[0].id, dup[0].local_date, dup[0].kcal + 100, version=2,
                      protein_g=dup[0].protein_g, carbs_g=dup[0].carbs_g, fat_g=dup[0].fat_g),   # редагування
            FoodEntry("x-del", D("2026-10-05"), 300, 5, 40, 12, deleted=True)]           # видалено
    d11 = day_summary(D("2026-10-05"), valid_entries(dup + dup2 + [dup[1]]), OLENA, TODAY, START)
    print(f"\n### TC-11 Дубль, редагування, видалення (5 жовтня)\n- Записів після очищення {d11.entries}; ккал {fmt(d11.kcal)} (1 800 + 100 за редагування; видалений запис 300 не враховано; дубль — один раз)")
    # TC-12 без норми
    tc12 = build("week", D("2026-11-09"), hist0 + e + prev_e, [CalorieEstimate("ce0", START, 1, None)], TODAY, START)
    show("TC-12 Користувач без норми (ON-11), дані TC-02", tc12, prev, has_target=False, days=False)
    # TC-13 людина, що їсть двічі на день, облік з 1 вересня: кількість записів на повноту не впливає (PR-D25)
    two = []
    for i in range(21):
        two += make_day(date(2026, 9, 1) + timedelta(days=i), 1700, split=(0.40, 0.35))
    st13 = classify_all(valid_entries(two), OLENA, D("2026-09-22"), D("2026-09-01"))
    print("\n### TC-13 Двічі на день (2 записи по 1 700 ккал на день), облік з 1 вересня")
    print("| Дні | Записів на день | Статус |\n|---|---|---|")
    print(f"| 1–7 вересня (історії ще немає) | {st13[D('2026-09-01')].entries} | {ST_UA[st13[D('2026-09-07')].status]} |")
    print(f"| 8–21 вересня | {st13[D('2026-09-08')].entries} | {ST_UA[st13[D('2026-09-08')].status]} |")
    # TC-14 «малий» день: три записи, але 700 ккал при звичних ≈1 800
    low = month_sep() + make_day(D("2026-10-01"), 700)
    st14 = classify_all(valid_entries(low), OLENA, D("2026-10-02"), D("2026-09-01"))
    d14 = st14[D("2026-10-01")]
    print(f"\n### TC-14 Мало калорій за звичної кількості записів (1 жовтня)\n- Записано {rnd(d14.kcal)} ккал у {d14.entries} записи; звичні калорії {rnd(d14.usual_kcal)} (медіана повних днів за 14 днів), поріг {rnd(0.5 * d14.usual_kcal)} → **{ST_UA[d14.status]}** (причина: менше половини звичного; поки людина не відповіла)")
    tz = tz_demo()
    sys.stdout = out

    # ---- твердження (усі числа специфікації)
    assert [d.status for d in tc02.days] == [COMPLETE, COMPLETE, PARTIAL, COMPLETE, COMPLETE, NO_DATA, COMPLETE]
    assert rnd(tc02.avg_kcal) == 1842 and tc02.avg_diff == 92 and tc02.avg_band == WITHIN
    assert tc02.band_counts == {BELOW: 0, WITHIN: 3, ABOVE: 2}
    assert tc02.macros["protein_g"][1] == 4                     # 12.11 виключено з Б/В/Ж
    assert tc03.avg_kcal is None and tc03.counts[NO_DATA] == 7
    assert [d.target for d in tc06.days] == [1750, 1750, 1750, 1910, 1910, 1910, 1910]
    assert [d.target for d in tc07.days][:4] == [1750] * 4
    assert tc09.counts[IN_PROGRESS] == 1 and tc09.counts[FUTURE] == 4 and tc09.avg_kcal is None
    assert tc09.days[1].status == PARTIAL and tc09.days[1].reason == "low_kcal_pending"
    assert tc15.days[1].status == COMPLETE and tc15.counts[COMPLETE] == 2 and tc15.days[1].band == BELOW
    assert tc15n.days[1].status == PARTIAL
    assert d11.kcal == 1900
    assert insights(tc12, prev, False) == []
    assert tz["t2"] == (D("2026-11-11"), D("2026-11-10")) and tz["t3"][0] == D("2026-11-12")
    assert oct_.counts[COMPLETE] == 25 and oct_.counts[NO_DATA] == 5 and oct_.counts[PARTIAL] == 1   # PR-D25: 22.10 (980 ккал) тепер повний
    assert all(st13[D("2026-09-%02d" % i)].status == COMPLETE for i in range(1, 22))   # PR-D25: без правила прийомів
    assert d14.status == PARTIAL and d14.reason == "low_kcal_pending"
    print("Усі твердження виконано." if check_only else "\n(твердження перевірено)")
    return dict(tc02=tc02, prev=prev, oct=oct_, sep=sep, tc09=tc09, ins_oct=ins_oct)


if __name__ == "__main__":
    main(check_only="--check" in sys.argv)
