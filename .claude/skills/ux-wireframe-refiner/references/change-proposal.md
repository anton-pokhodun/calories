# Change levels, approval, proposal, change log

## 1. Change levels

| Level | What it is | Examples |
|---|---|---|
| **L1 Minor visual** | Changes appearance only; no element appears, disappears or changes behaviour; no state or flow affected | Spacing, alignment, resizing, visual hierarchy within a region |
| **L2 Moderate UX** | Changes where or how an existing interaction is done, without changing what the product can do | Search top → bottom; filters into a bottom sheet; list structure; a component's interaction pattern; making an action more prominent |
| **L3 Major behavioural** | Changes what the product does or how it is organised | Navigation architecture; replacing a workflow; how data is entered or saved; a new interaction model; removing a user action; anything contradicting an approved decision in the spec |

Rules: in doubt, the higher level. Re-classify after the impact analysis — an "L1" that turns out
to touch a state, a reaction or another screen is L2. A request that adds a capability the spec
does not have is a new feature: say so and route it through the spec.

## 2. Approval

| Level | Before Figma is touched |
|---|---|
| L1 | Implement directly when the result is unambiguous; one-line plan in the reply |
| L2 | Analysis + proposal + approval — unless the user explicitly authorised immediate execution in this request ("just do it", "no need to ask"); then still write the proposal into the change log and the reply |
| L3 | Proposal + explicit approval of that proposal, always |

Approval of one change does not extend to the next. If implementation reveals something the
proposal did not cover that needs a decision, stop and ask.

## 3. UX Change Proposal — template (reply in the user's language, headings may stay English)

1. **Requested change** — exactly what the user asked, on which screens (ID + what the user sees).
2. **Current implementation** — how the wireframe behaves now (from the Figma read-back and spec),
   including the states and transitions involved.
3. **UX analysis** — prevalence, platform convention, effectiveness, contextual suitability,
   trade-offs (`ux-evidence.md` §2), each claim tagged with a source.
4. **Alternatives** — only meaningful ones (usually 0–2). Per alternative: UX benefits,
   disadvantages, implementation impact, when it fits. A compact table is fine.
5. **Impact analysis** — affected screens, components, interactions, navigation, UI states,
   data/context rules; the state transition table (`impact-and-state.md` §4).
6. **Recommendation** — one option and why; if it differs from the request, say why plainly.
7. **Open questions** — only what the spec and evidence cannot settle, each with the default you
   would use.
8. **Implementation scope** — will change (frames, components, states, reactions, captions) /
   must remain unchanged / spec sync needed (yes/no).

Keep it readable in one screen or two: tables over prose, no padding, no generic UX lectures.

## 4. Change log `<dir>/<stem>.ux-changes.md`

```markdown
# UX changes — <spec path>
Figma: <link> · last entry UXC-NN

## UXC-01 — <short title> · L2 · VALIDATED · spec: SYNCED | PENDING | NOT NEEDED
- Requested (<date>): <request in the user's words>
- Decision: <approved option> — approved by the user on <date> ("<quote>")
- Evidence: [G] … <link> · [O] … <links> · [I] …
- States: <the state transition table or its rows in one line each>
- Scope: changed <frames/components/reactions> · unchanged <…>
- Assumptions: <A-level choices made during implementation>
- Result: <validation outcome, deviations from the proposal, not represented>
```

Statuses: PROPOSED → APPROVED → IMPLEMENTED → VALIDATED, or REJECTED / SUPERSEDED (by UXC-NN).
Entries are appended, never renumbered; rejected proposals stay (they record why an option was
not chosen). Node IDs are not stored — frames are found by name.
