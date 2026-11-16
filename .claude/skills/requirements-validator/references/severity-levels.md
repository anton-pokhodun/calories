# Severity levels

Severity measures **impact on reliable wireframe generation within the declared scope** — not
how easy the fix is, not how many times the problem appears.

## BLOCKER
Wireframes for the main flow cannot be generated reliably.
- Main user journey missing or broken.
- Contradictory navigation on the main path (two destinations for one action).
- Undefined behaviour for a critical action (the step that completes the core task).
- Essential screen missing.
- Unresolved product decision that significantly changes screen structure (which screens
  exist, or what a main screen contains).

## HIGH
Wireframes would be produced but likely incorrect or incomplete.
- Missing critical UI state on the main path.
- Undefined interaction behaviour of a main-path component.
- Ambiguous component behaviour that changes what is drawn.
- Missing important navigation transition.
- Inconsistent screen specifications (same screen described differently).

## MEDIUM
Main flow is understandable; quality of the output suffers.
- Incomplete secondary-action description.
- Missing non-critical state.
- Inconsistent terminology (when names still resolve to the same thing).
- Insufficient component detail on a secondary element.

## LOW
Documentation clarity only.
- Formatting inconsistencies, minor naming issues, redundant descriptions.

## How to choose

Ask in order and stop at the first "yes":

1. Without resolving this, can the agent not produce the main-flow frames at all, or must it
   pick between structurally different versions? → **BLOCKER**
2. Would the agent likely draw a main-path frame, state or transition wrongly, or omit one?
   → **HIGH**
3. Would a secondary element or non-critical state be wrong or missing? → **MEDIUM**
4. Only a human reader is inconvenienced? → **LOW**

## Rules
- Do not inflate. A long list of LOW issues does not add up to a HIGH.
- A product decision's severity is the severity of its impact. "Needs a decision" is a
  resolution type, not a severity.
- Main path vs secondary path is defined by the document's own flows; if the document does
  not say which path is main, that itself may be a finding.
- Severity may change between iterations only with a stated reason (e.g. a decision moved the
  feature into scope). Record the reason in the ledger.
- Report order: by severity, then by document order.
