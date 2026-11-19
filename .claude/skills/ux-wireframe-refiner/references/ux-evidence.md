# UX evidence — sources, research, claims

Evaluate a change with evidence about **this interaction**, not with taste and not with general UX
articles cited for decoration. Research is proportional: none for a minor visual change; focused
for a moderate one; broader (several sources per claim) for a major one.

## 1. Sources, in the order to consult them

| # | Source | Use it for | How |
|---|---|---|---|
| 1 | Project research (`docs/**/research/*.md`), spec decisions (D-n, Q-n) | What is already known and decided for this app and its competitors | Read first; reuse its observations and tags; do not redo it |
| 2 | Platform guidelines — Apple HIG (developer.apple.com/design/human-interface-guidelines), Material Design 3 (m3.material.io) | Conventions: search placement, tab bars vs navigation bars, sheets, toolbars, touch targets, keyboard behaviour | WebSearch → WebFetch the specific component page; quote the guideline |
| 3 | UX research — Nielsen Norman Group, Baymard Institute, other reputable research (peer-reviewed HCI, e.g. Hoober's thumb-zone studies) | Findings on effectiveness: discoverability, error rates, task time | Quote the finding and the population/context it came from; note paywalled or summarised findings as such |
| 4 | Real apps — Mobbin MCP (`search_screens`, `search_flows`, `search_sections`), the app's product category first (calorie / nutrition / fitness trackers), then adjacent categories | How the pattern is actually implemented, including its states (keyboard open, results, empty) | Search with the interaction, not just the component ("search bar bottom keyboard", "filter bottom sheet"); look at the flow, not one screen; record app name and screen link |
| 5 | Established principles — Fitts's Law, Hick's Law, recognition over recall, consistency and standards, visibility of system status, user control and freedom, accessibility (WCAG 2.2, platform minimum touch targets), cognitive load, platform conventions | Explaining *why* an option is better or worse here | Name the principle only where it changes the outcome; explain the mechanism in this layout |

Do not save to Mobbin collections or comment on Mobbin without being asked. Do not fetch paywalled
content by workarounds; say the source was not accessible.

## 2. Separate four questions — popularity is not quality

For the requested pattern and each alternative answer separately:

| Question | Evidence that answers it |
|---|---|
| **Prevalence** — how often is it used? | Counted observations: "bottom search in 3 of 9 nutrition apps examined on Mobbin (iOS)" |
| **Platform convention** — does iOS / Android expect it? | HIG / Material text; note when the platforms differ |
| **Effectiveness** — does it make *this task* faster, clearer, less error-prone? | Research findings, principles applied to the actual layout |
| **Contextual suitability** — does it fit this app and workflow? | Spec, flows, persistent elements, frequency of the task, the app's users |

Then list **trade-offs**: what the pattern costs. Evaluate the complete interaction — trigger,
keyboard, results, empty and error states, dismissal, scrolling, coexistence with other fixed
elements — not only the resting position of the component.

Worked example — search at the bottom: may improve thumb reach (Fitts's Law, thumb zone) and match
recent iOS conventions for some apps, but can compete with a bottom bar or a fixed summary panel,
reduce visible content, need a defined keyboard-open layout (field rides above the keyboard,
results above it), be less discoverable for users expecting top search, and change where results
appear relative to the field. Each of these must be checked against this app's frames.

## 3. Evidence tags — every significant claim carries one

| Tag | Meaning | Minimum support |
|---|---|---|
| **[G]** Guideline | Stated in Apple HIG or Material | Quote/paraphrase + link to the page |
| **[R]** Research finding | Reported by a research source | Source, link, finding, its context |
| **[P]** Common industry pattern | Used by a clear majority of a stated sample | Sample size and how it was drawn (≥ 5 relevant apps examined); never from one or two |
| **[O]** Observed | Seen in specific named apps | App names + screen/flow links |
| **[I]** Contextual inference | Your reasoning applied to this app | The reasoning in one sentence |
| **[A]** Design assumption | A plausible choice without evidence | Say it is unverified |
| **[U]** Unknown | Evidence was sought and not found | Say what was searched |

Project research uses [O] / [I] / [U]; keep its tags when quoting it.

## 4. Honesty rules

- Never invent research findings, statistics, percentages, quotes, URLs or "expert consensus".
- A link is cited only if you opened it (or a tool returned it) in this run or it is in project
  research.
- One or two apps are [O], not [P]. "Many apps" without a count is not allowed.
- When evidence conflicts, show both sides and say which applies here and why.
- When no evidence exists, say so and mark the reasoning [I] or [A].
- Platform-specific guidance is labelled with its platform; the spec's target platform decides
  which one weighs more.
