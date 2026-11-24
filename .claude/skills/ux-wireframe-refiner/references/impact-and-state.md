# Change impact and state preservation

A small visual change can break behaviour elsewhere. Find the real dependencies **before**
editing, from the spec and the Figma read-back — not from a generic list.

## 1. Tracing dependencies

Start from the changed element and follow every link:

1. **Spec** — every screen card whose Layout, Actions or States rows mention the element, its
   region or its result; decisions (D-n, Q-n) that fixed its position or behaviour (a change that
   contradicts an approved decision is at least moderate and must say so); interaction details
   (toasts, persistent panels, recalculation).
2. **Figma** — the target frame; its `/ State:` frames; overlays whose `Region/Parent (dimmed)`
   copies it; every instance of the components involved (a component edit propagates everywhere);
   incoming and outgoing prototype reactions; transition marks, arrows and captions that point at
   the element.
3. **Journey** — previous and next screens, back/close behaviour, other entry points to the same
   screen, persistent elements that must stay on later frames.

Write the result as the proposal's Impact analysis. List only what is affected; "not affected"
checks stay out of the reply unless the user would reasonably worry about them.

## 2. Impact checklist

**A. Layout** — elements that move or resize; conflicts with fixed elements (headers, bottom
panels, FABs, toasts, home indicator / safe areas); content hierarchy; visible content area.
**B. Interaction** — trigger changes; extra taps; discoverability; consistency of the same
component across related screens; gestures that may conflict (scroll vs swipe, pull-down).
**C. Navigation** — entering and leaving the screen; back behaviour; conflict with bottom
navigation or other bottom-anchored controls; prototype targets that move.
**D. UI states** — empty, results, no results, loading, error, offline, selected, disabled,
keyboard-visible; which existing state frames must be redrawn; which new state the change makes
necessary (a bottom field makes the keyboard-open layout part of the design).
**E. Data and context** — what the user has entered or selected that the change could lose
(§3).
**F. Accessibility** — reachability; obscured by the keyboard; touch target ≥ 44 × 44 pt (iOS) /
48 × 48 dp (Android); purpose clear without context; works on small (e.g. 375 × 667) and large
screens; reading / focus order.

## 3. State preservation

Moving or reshaping a component must not quietly destroy user context — and must not blindly keep
context that the product intends to reset. For each state the change touches, answer:

1. What exists before the change?
2. Is it affected by the change?
3. Should it be preserved?
4. When is it reset (and by what user action or system event)?
5. What happens on back navigation?
6. What happens when the relevant UI is closed and reopened?
7. Does it persist across screens?

Decide from, in order: the spec and approved decisions → established platform behaviour and
evidence ([G]/[R]) → the observable behaviour of comparable apps ([O]). If the answer is still
unclear **and** it materially affects the experience (loss of entered data, unexpected reset,
surprise navigation), ask the user; otherwise choose, tag it [A] and list it.

Candidates to check in this kind of app: search query, filters, results, selected tab
(Recent / Saved…), selected meal, items added in the session and the running total, quantity /
unit / portion in a sheet, expanded or collapsed sections, scroll position, unsaved input, focus
and keyboard visibility, previously selected options.

## 4. State transition table

Required for every moderate or major change; use the app's real states and real names:

| State | Before change | Expected after change | Reset when | Reason |
|---|---|---|---|---|
| Search query «яблуко» on CT-02 | Typed in the top field | Preserved in the bottom field | Clearing ✕, leaving CT-02 via «Готово» | Avoid losing input [I] |
| Session items + total in the «Додано» panel | 2 items · 254 kcal | Preserved, panel stays visible above the field | Per spec: last item removed / «Готово» | Persistent element per spec §5 |
| Keyboard | Hidden until the field is tapped (Q5) | Same; when open, field and results sit above it | Field loses focus | Spec Q5 default |

The table goes into the proposal; the validation later checks each row in
Figma (`refinement-validation.md` §4 C).
