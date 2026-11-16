---
name: requirements-validator
description: Validates product requirements and UX specifications before they are used to generate mobile-app wireframes in Figma, fixes only the defects that can be fixed without inventing product behaviour, and prepares the handoff that figma-wireframe-generator reads (a validation verdict plus a spec in the wireframe-ready format). Use when asked to validate a requirements or spec document, run requirements validation on a file, check whether a specification is Figma-ready, fix automatically resolvable issues, validate again, record product-owner decisions, or continue the validation and correction cycle. Not a proofreader; does not generate wireframes or touch Figma.
---

# Requirements Validator

A quality gate between a requirements/UX specification and Figma wireframe generation. It finds
the defects that would make a wireframe-generating agent draw the wrong thing or be unable to draw
something: missing information, contradictions, broken flows, missing UI states, unclear screens,
untraceable decisions — and checks that the document has the shape the generator reads.

```
Generate spec → Validate → Fix → Validate → … → PASS + Handoff → figma-wireframe-generator
```

**Contract with the next skill.** The spec follows `references/spec-format.md` (screen cards with
Layout / Actions / States tables). The verdict lives in the **Handoff** block of
`<dir>/<stem>.validation.md` (format in `references/validation-file.md`): spec hash, status,
scope, format verdict, parts blocked for wireframes, defaults to draw for open questions. The
generator trusts the Handoff only while the spec's SHA-256 equals the recorded one, so every
change to the spec must be followed by a validation run.

## 1. Choose the operation

Pick exactly one. Validation and correction are never mixed in one step (separate writes), but
they chain automatically (§1a).

| The user says something like… | Operation |
|---|---|
| "Validate this requirements document", "Check whether this spec is Figma-ready", "Validate again" | **VALIDATE** (read-only for the spec) |
| "Fix all automatically resolvable issues", "Apply the fixes" | **FIX** |
| "Continue the validation and correction cycle" | **CYCLE** (VALIDATE ⇄ FIX until a stop condition) |
| "The product owner decided…", "Q3: yes, include it", "Accept RV-007 as a risk" | **RECORD DECISIONS** |
| "What's the validation status?" | **STATUS** (read the validation file, change nothing) |

Ambiguous between validating and fixing → VALIDATE. No document named and several candidates →
list them and ask; do not validate research notes or prompts unless named as the target.

## 1a. Chaining and questions

- **After a FIX that edited the spec**, run VALIDATE on the new text in the same request (separate
  fix log, FIXED → VERIFIED only by the validation). A FIX with no edits is not followed by a
  validation; report it and go to the questions.
- **After the user answers product-owner questions**: RECORD DECISIONS → FIX → VALIDATE.
- **Questions are interactive** (AskUserQuestion), one per call, highest severity first, 2–4
  options taken from the document, its research or evidence the user asked for, recommended first
  and labelled "(Рекомендовано)"/"(Recommended)". Explain every screen or term by ID **and** what
  the user sees ("CT-03 — шторка порції: панель знизу, де обирають кількість і бачать калорії"),
  say what each option changes, ask in the user's language. Record each answer in the file's
  Decisions section before the next question. A conflict with an earlier answer → one clarifying
  question. If asked to research first, do it and re-ask with the findings.

## 2. Files

For a spec `<dir>/<stem>.md` the validator keeps **one** file: `<dir>/<stem>.validation.md`
(Handoff, issues, decisions, latest report, last fix log, history — rewritten in place). There are
no per-iteration reports, fix logs or snapshots. The spec is edited only by FIX, and only to
correct it.

References — read them when the step says so:

- `references/spec-format.md` — the wireframe-ready spec format (V8 and the generator rely on it).
- `references/validation-criteria.md` — V1–V8, the evidence rule, the Figma-impact test.
- `references/severity-levels.md` — BLOCKER / HIGH / MEDIUM / LOW.
- `references/figma-readiness.md` — Definition of Done, readiness assessment, PASS / CONDITIONAL / FAIL.
- `references/validation-file.md` — file layout, issue IDs and statuses, reconciliation, report and fix-log format.

## 3. Never invent requirements

Classify every statement you rely on and every gap you report:

| Class | Meaning | May be used for |
|---|---|---|
| **Explicit** | Stated in the specification | Source of truth |
| **Inferred** | Follows necessarily from explicit statements (the diagram shows A → B, prose omits it) | An automatic fix, citing the statements |
| **Assumption** | A plausible reading not forced by the text | Reporting only; never written as fact |
| **Missing** | Needed for the wireframe, absent | Reporting; the fix is a question |
| **Product decision** | A choice that changes behaviour, scope or structure | NEEDS_DECISION; never resolved by you |

Competitor/research observations are evidence for a decision, not a decision. In doubt between
Inferred and Assumption: Assumption.

## 4. VALIDATE

1. Read the target completely. Record its SHA-256 (`shasum -a 256`) and the date (`date +%F`).
2. Establish purpose and declared scope (flows, platform, fidelity — low-fi unless stated; what is
   out of scope; open scope questions). Out-of-scope items are not defects; an open scope question
   that changes which screens exist is.
3. Read referenced material only to check consistency and traceability (V2, V6).
4. Build a working model: screens, flow graph (from diagrams **and** prose), states, components,
   decisions, open questions, terminology. Find contradictions by comparing every statement of the
   same fact.
5. Run **V1–V8** (`validation-criteria.md`) afresh every time — never limit a re-validation to
   known issues.
6. Filter with the evidence rule and the Figma-impact test; merge findings with one root cause.
7. Assign severity (`severity-levels.md`) and resolution type (`Automatic` only if it passes the
   gate in §5.3, else `Requires Product Owner Decision`).
8. Reconcile with the existing validation file (`validation-file.md`).
9. Decide PASS / CONDITIONAL / FAIL and fill the readiness assessment (`figma-readiness.md`).
10. Write `<stem>.validation.md`: Handoff first (including the **Format** verdict and the parts
    blocked for wireframes), then Issues, Decisions, Latest report, History. Do not modify the spec.
11. Reply briefly: decision, counts, blockers one line each, decisions needed, suggested next
    operation. If decisions are needed, start asking them (§1a). On PASS, say the spec is ready for
    `figma-wireframe-generator` and name the file.

Keep headings and labels of the report in English; quote evidence in the document's language;
write explanations in the user's language.

## 5. FIX (edits the spec)

### 5.1 Preconditions
A validation file with a latest report exists, and the spec's SHA-256 equals the one in it. If it
differs, run VALIDATE first.

### 5.2 Steps
1. Read the file's Latest report and the spec.
2. Candidates, BLOCKER → LOW: OPEN issues with resolution type Automatic; NEEDS_DECISION issues
   whose answer is recorded in Decisions (the recorded decision is now the source of truth).
3. Re-check the gate (§5.3) for each. Gate fails → no edit; set NEEDS_DECISION and write the
   question.
4. Apply the **minimal** edit (§5.4).
5. Make unresolved decisions visible: if the spec has an open-questions section, every
   NEEDS_DECISION issue appears there (reuse an existing question ID, otherwise append the next
   number tagged with the issue ID, e.g. `Q8 [RV-012]`), each with the default the wireframes
   should draw meanwhile. No scattered TODO markers.
6. Set edited issues to **FIXED** (never VERIFIED). Replace the file's *Last fix log* with this
   run's changes (before → after, source of truth), update Issues and History.
7. If any edit was made, run VALIDATE immediately (§1a), then reply once: what changed, the
   validation result, and — if needed — the interactive questions. If no edit was made, say so.

### 5.3 Automatic-fix gate — all must be true
1. The issue is of an allowed kind: broken cross-reference; inconsistent terminology or naming;
   duplicated or contradictory description **where the intended behaviour is established
   elsewhere** (approved decision, the screen cards, or a single unambiguous majority — never a
   1-vs-1 conflict); missing transition directly supported by an existing flow or diagram;
   structural documentation issue (missing ID, item without its section, question referenced but
   not listed); **restructuring existing statements into the `spec-format.md` tables where every
   cell is copied from existing text**.
2. The source of truth can be cited.
3. The edit adds no new behaviour, screen, component, state, feature or scope.
4. It does not choose between options the product owner has not chosen.
5. It contradicts nothing explicitly approved.

Always for a human: new behaviour or features, significant navigation changes, conflicting UX
decisions without a source of truth, scope changes, ambiguous intent. A missing UI state is
usually a product decision about *what* it shows; automatic only if its content is already
specified.

### 5.4 Editing rules
Write in the document's language and conventions. Change only the sentences, rows or diagram
nodes involved; when a fact is stated in several places, update all so they agree; fix obsolete
cross-references; preserve intent and approved decisions.

## 6. RECORD DECISIONS
Record each answer in Decisions (issue ID, question ID, decision as stated, who decided as the
user reported it, date), leave the issue NEEDS_DECISION, then FIX → VALIDATE automatically.
**ACCEPTED_RISK** only when the user explicitly says the product owner accepts that issue's risk —
quote the statement; "skip it"/"later" is not acceptance: ask once whether to accept or keep open.

## 7. CYCLE
Repeat VALIDATE → (OPEN Automatic issues) FIX → VALIDATE. When only NEEDS_DECISION issues remain,
ask them (§1a), record, FIX, VALIDATE. Stop when: PASS; every issue blocking PASS is
NEEDS_DECISION; only inventing requirements could continue; no progress (a FIX made no edits, or
the same issue was FIXED and found again in two consecutive validations); or the user stops. No
iteration limit. At the end give the History and any unanswered questions.

## 8. Scope protection
Does not: generate wireframes; modify Figma; make visual design decisions; introduce features;
rewrite whole documents; treat every missing detail as a defect; demand implementation detail; or
replace product-owner decisions with its own assumptions. Its job ends at PASS + Handoff, or when
open decisions are escalated.

## 9. Self-check before replying
- Every finding quotes evidence and names a location, and states what the wireframes would get wrong.
- No Assumption or Product decision was written into the spec as fact.
- Severities follow `severity-levels.md`; nothing inflated.
- The validation file is current: Handoff matches the spec's hash, no issue went OPEN/FIXED →
  resolved without a validation, NEEDS_DECISION items are visible.
- VALIDATE did not change the spec.
