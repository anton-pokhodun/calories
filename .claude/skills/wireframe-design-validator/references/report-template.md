# Report template

File: `design/validation/<YYYY-MM-DD-HHmm>-<scope-slug>-audit.md` (FIX: `…-fix.md`). Never overwrite an
earlier report. Headings in English, explanations in Ukrainian (project convention, `CLAUDE.md`).
Keep tables compact; one row per finding.

```markdown
# Wireframe design validation — <scope>

Статус: <PASS | CONDITIONAL | FAIL> · <date time, timezone> · mode: AUDIT
Пов'язані: <spec(s) of the audited flows>, `.claude/skills/wireframe-design-validator/references/design-rules.md`

## Executive summary
| Screens analysed | Findings | Critical | Major | Minor | Suggestions | Status |
|---|---|---|---|---|---|---|
2–4 sentences: the main problems and what blocks implementation.

## Scope and rules
- Figma file, pages, sections, frames (names + IDs)
- Rules version (date of design-rules.md), exceptions applied, ignored layers

## Detailed findings
### <Category letter. Name>
| ID | Screen / frame | Element | Expected (source) | Actual | Severity | Evidence | Explanation | Recommended fix |
(one table per category; inside a category order by screen)

## Cross-screen consistency
Repeated components / patterns that differ between screens (table: element · screens · property · values).

## Design system health report
1. Architecture (source-of-truth table) · 2. Component reuse · 3. Variables & styles ·
4. Detached & duplicates · 5. Hardcoded values · 6. Missing tokens/components (proposal only) ·
7. Recommended improvements

## Compliance metrics
| Metric | Value | Method / denominator | Completeness |

## Intentional exceptions
| Where | What | Rule reference |

## Recommended actions
Ordered by impact (propagation × severity); each names the finding IDs it closes.

## Visual-inspection recommendations
Items with Evidence = Visual / Device — not verified problems.

## Limitations
What could not be inspected in this run and why (from figma-mcp-capabilities.md §3 + run-specific).
```
