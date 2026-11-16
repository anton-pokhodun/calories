# Wireframe-ready spec format

The target shape of a requirements document. `figma-wireframe-generator` draws directly from it:
every screen card below becomes frames, every Layout row becomes a `Region/…` of a frame, every
Actions row becomes a tap target + prototype link, every State row becomes a variant or a frame.
A document in this shape needs no second "inventory" or "flow map" file — the spec **is** that
input. Headings and labels may be in the document's language; the structure is what matters.

## Document skeleton

```
# <Title>
Status · Scope (flows in / out) · Platform and device · Language · Sources (research files)

## 1. Journeys        main journey first; numbered steps: screen → user action → result
## 2. Screens         one card per screen / overlay / dialog / menu / toast (below)
## 3. Components      repeated elements: where used, variants, behaviour
## 4. Decisions       D… (approved), Q… (answers from the product owner)
## 5. Open questions  each with the default the wireframes will use meanwhile
## 6. Content         fixed copy that is not obvious, sample values (e.g. the §1 example run)
```

## Screen card

```
### CT-02 Add Food — type: screen | overlay | dialog | menu | toast
Goal · Entry (from which screen, by which action) · Main journey: yes / no

Layout (top → bottom)
| # | Region | Elements and visible content (copy in quotes) | Behaviour |
| 1 | Header | ✕ · meal selector "Lunch ▾"                    | fixed     |
| 2 | Search | field "Search food" + camera and barcode icons | fixed     |
| 3 | Tabs   | "Recent" (selected) / "Saved"                  | fixed     |
| 4 | List   | rows: name · portion · kcal · "+"              | scrolls   |
| 5 | Panel  | "2 items · 254 kcal" + "Done"                  | sticky; appears after the first add |

Actions
| Element        | Gesture | Condition | Result                                            |
| "+" on a row   | tap     | —         | entry added; state CT-02.S3; panel updated        |
| row body       | tap     | —         | opens CT-03 (overlay)                             |
| ✕              | tap     | —         | CT-01 (updated if items were added)               |

States
| ID      | State         | Trigger                       | Shown as          | What differs from default            |
| CT-02.S2| No results    | system: search finds nothing  | own frame         | List replaced by message + 2 actions |
| CT-02.S3| Row added     | user: tap "+"                 | own frame         | row ✓; toast; panel appears          |
```

## Rules

1. **One fact, one place.** Navigation lives in the Actions tables. A flow diagram is optional and
   must be derivable from them; if both exist and disagree, that is a V2 finding.
2. **Every action has a result** that names a screen, overlay or state ID — or an inline change.
   Close / back results are given for each origin when they differ ("✕ → CT-07 when opened from
   the scanner").
3. **Every state has a trigger** (user action or system condition) and a representation:
   *variant* (only an element changes — selected, disabled, ✓) or *own frame* (the layout
   changes — empty, loading, error, results, sheet open). User-triggered states are steps of the
   journey; system-triggered ones are stand-alone frames.
4. **Persistent elements are explicit**: when an element appears (after which action), on which
   states it stays, and what removes it ("panel stays on all CT-02 states of the session until the
   last item is deleted").
5. **Regions are listed in vertical order** with their behaviour (fixed / scrolls / sticky /
   floating). Bottom navigation, tab bars, FABs exist only if listed.
6. **Copy and examples**: exact labels in quotes; one worked example run with concrete values so
   the wireframes can show realistic content. Unspecified copy is marked `[text not specified]`
   instead of being left out.
7. **IDs are stable** (`CT-02`, `CT-02.S3`, `D5`, `Q9`) and never reused.
8. **Open questions carry a default**, otherwise they block the screens they affect.
9. **No visual design**: no colours, typography, pixel sizes — unless the document says high fidelity.

## Handoff

When the validator finishes with PASS (or CONDITIONAL with the blocked parts named), the Handoff
block at the top of `<stem>.validation.md` tells the wireframe generator exactly what it may use
(format in `validation-file.md`). The generator trusts the Handoff only while the spec's SHA-256
equals the one recorded there.
