# Validation criteria (V1–V8)

## Two rules every finding must pass

### Evidence rule
A finding must point at the document:

- **Location** — section heading (and number), plus diagram node, table row, decision or
  question ID where relevant. Line numbers may be added but are secondary (they shift after
  fixes).
- **Evidence** — a verbatim quote of the text involved. For a *missing* item, quote the
  text that creates the need for it (e.g. the step that leads to a screen with no
  description) and state where you looked and did not find it.

Not acceptable as findings: "the UX could be improved", "more details are needed", "this
screen could be clearer". Say what exactly is missing or inconsistent, where, why it
matters, what it causes in the wireframes, and what should change.

### Figma-impact test
Ask: *If a wireframe agent built frames from this document as written, what would it draw
wrongly, draw arbitrarily, or be unable to draw?* If the answer is "nothing", it is not a
finding (at most a LOW documentation note, and only if it can confuse a reader).

### One root cause = one issue
If the same defect shows up in several places (e.g. one screen named three ways), report one
issue listing all locations.

---

## V1. Completeness

Does the document contain what is needed to build the wireframes for its declared scope?

Check:
- All screens required by the flows are identified (every flow node that is a screen, sheet
  or modal appears in the screen inventory or is described somewhere).
- Every screen has a stated purpose.
- Every primary action is defined; secondary actions documented where they exist.
- Inputs (what the user enters/chooses) and outputs (what the system shows/saves) are defined.
- Business rules that change what is displayed are stated (e.g. how a total is derived,
  default values, limits).
- Navigation destinations are specified for every action.
- Essential user journeys in scope are covered end to end.
- Edge cases that change the UI are addressed (nothing found, first use, duplicate entry…).

Not a finding: backend/API behaviour, analytics, technical architecture, copywriting
polish, anything declared out of scope.

## V2. Internal consistency

Compare every place that states the same fact.

Check:
- Same action described with different behaviour in different sections.
- Screen named differently in the diagram, step list, screen inventory and details.
- Button or control with conflicting behaviour or label.
- Same action leading to different destinations.
- Component described with conflicting states.
- An approved decision (e.g. `D3`) contradicted elsewhere.
- Cross-references: referenced section/decision/question exists and says what the
  reference claims ("see Q7" → Q7 exists and is about that).
- Open questions referenced in text but missing from the open-questions list, and vice versa.
- Terminology: one concept, one term.

Not a finding: deliberate synonyms in explanatory prose when the screen/component names
themselves are consistent.

## V3. User flow integrity

Build the flow graph from all diagrams and prose and walk it.

Check:
- Every flow has an entry point (where the user starts and from which screen).
- Every user action has a system response.
- Every transition has a destination that exists.
- Every important journey reaches a completion state (and what the user sees after it).
- Recovery from errors where errors can occur.
- No dead ends (a screen with no way forward or back).
- Back / close / dismiss behaviour defined where it changes the outcome (e.g. are
  unsaved selections kept or discarded?).
- Multi-step operations keep their context (e.g. selected meal carries through to the
  confirmation).
- Conditional paths documented (if/else branches, first-time vs returning user).
- Important alternative paths not omitted (cancel, edit, remove, nothing found).
- Diagrams and prose describe the same graph.
- Close / back results are given per origin when the same control leads to different places
  depending on where the screen was opened.
- Persistent elements (a summary bar, a toast that stays, a selection) say when they appear, on
  which states they remain visible, and what removes them — otherwise the wireframes lose them
  halfway through the journey.

Not a finding: system-level navigation (OS back gestures) unless the document's behaviour
depends on it.

## V4. Screen specification quality

For every screen (and sheet/modal), check whether the document gives:

- unique screen ID;
- screen name;
- purpose;
- entry conditions (from where / when it opens);
- main UI components;
- primary action;
- secondary actions;
- content and information hierarchy (what is most important, what is secondary);
- the regions of the screen from top to bottom, with what each shows and whether it is fixed,
  scrolls or is sticky — enough to lay the screen out without guessing its order;
- navigation destinations;
- relevant UI states, each with its trigger and whether it changes only an element or the whole
  layout.

Report a screen when it is **too vague to wireframe** — the agent would have to invent its
layout content. Do not require equal detail for all screens; a confirmation toast needs far
less than a search screen. Missing IDs/names across the inventory are one structural issue,
not one issue per screen.

## V5. Interaction and UI states

Check only the states that materially change what is drawn for the specified functionality.

Candidate screen states: default, empty, loading, success, error, search results, no results,
validation error, editing, first-use.
Candidate component states: selected, disabled, expanded, collapsed, focused, filled.

Check that interactive components have defined behaviour:
buttons, search fields, dropdowns/pickers, steppers, bottom sheets, modals, tabs, lists,
swipe actions, floating buttons, persistent bars/panels.

For each: what triggers it, what it shows, what each action does, how it is dismissed, what
changes after the action.

Severity hint: a missing state on the main path that the user will certainly hit (e.g. "no
results" on the only search) is HIGH; a rare or secondary state is MEDIUM.

Not a finding: generic states that cannot occur in the specified functionality, micro-
animation details, haptics.

## V6. Traceability and source reliability

Check that significant product and interaction decisions have an identifiable origin:
competitor research, Mobbin screens/flows, existing documentation, explicit product-owner
decisions, design guidelines, or an inference made while writing the spec.

Check:
- Important conclusions are supported by evidence; if a claim is attributed to research,
  the cited research says it (open the cited file and check).
- Inferred behaviours are labelled as such.
- Assumptions are distinguishable from confirmed requirements.
- Unresolved decisions are visible (listed as open questions), not buried in prose.
- Competitor observations are not presented as universal UX rules ("users expect X" from
  one app).
- Approval status is clear: which decisions are approved vs proposed.

Not a finding: basic UI conventions without citations (a back arrow, a search field at the
top of a search screen).

## V7. Figma readiness

Can a wireframe agent determine:

1. which frames to create;
2. which screen states to represent;
3. which components should be reusable;
4. which components have variants;
5. which interactions connect the frames;
6. which overlays, bottom sheets and modals are needed;
7. which elements are fixed, scrollable or sticky — where it affects layout;
8. what content and hierarchy to use;
9. which screens are main flow vs secondary;
10. what happens after each primary interaction?

V7 findings are usually *consequences* of V1–V5 defects. Do not duplicate: if an item fails
because of an existing finding, reference that finding in the readiness assessment instead of
raising a new issue. Raise a V7 issue only for a gap no other category covers (e.g. no
indication of which elements are sticky when the layout depends on it, or no distinction
between main and secondary screens).

Not required at low fidelity: colours, typography, shadows, branding, pixel dimensions,
icons, final copy — unless the document explicitly asks for them.

## V8. Wireframe format conformance

Compare the document with `spec-format.md`. This category is about **shape**, not content: the
facts may all be present but scattered so that the wireframe generator would have to re-derive
them.

Check:
- Each screen has a card with Goal, Entry, a Layout table (regions top → bottom with behaviour),
  an Actions table (element · gesture · result with a target ID) and a States table.
- Transitions are stated in the Actions tables; diagrams, if any, agree with them.
- States carry trigger and representation (variant / own frame).
- Open questions have defaults; fixed copy and one worked example with concrete values exist.
- IDs exist and are stable for screens, states, decisions and questions.

Report the **Format** verdict in the Handoff: `Full` (all of the above), `Workable` (facts present
and unambiguous, only the shape differs — name the gaps the generator will bridge), or `Not met`
(missing facts, which are V1/V4/V5 findings in their own right).

Severity: a shape gap alone is MEDIUM at most, LOW for secondary screens. It becomes HIGH only if
it hides a main-path fact (then it is also a V4/V5 finding — raise it once, there). Converting
existing statements into the format tables is a mechanical, automatic fix (see SKILL.md §5.3);
the validator never invents the missing cells.
