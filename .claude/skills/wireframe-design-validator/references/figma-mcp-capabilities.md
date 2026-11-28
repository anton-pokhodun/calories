# Figma MCP capabilities — verified

Verified on 2026-11-28 against file `fBMPokQnQHUsG1G0KfOuJn` (read-only calls only). Re-verify
when the Figma MCP server changes: a quick probe is to run the extractor on one frame and check
that every field is populated. Use only what is marked ✅; anything else goes to *Limitations*.

## 1. Tools

| Tool | Status | Use in this skill |
|---|---|---|
| `create_session` | ✅ | Once per task; pass `sessionId` on every file call |
| `get_metadata` | ✅ | Page list (no `nodeId`); XML of a node: id, type, name, x, y, width, height **only** (no styles, no Auto Layout) |
| `use_figma` | ✅ | Main data source — read-only Plugin API scripts (extractor). Also the only write path (FIX) |
| `get_screenshot` | ✅ | Visual evidence (returns a short-lived URL); inline alternative: `await node.screenshot()` inside `use_figma` |
| `get_variable_defs` | ✅ | Variables used by a node; returned `{}` here (no variables in the file) |
| `get_libraries` | ✅ | Subscribed / available libraries |
| `search_design_system` | Available, not exercised | Library components / variables / styles lookup when a library is the source of truth |
| `get_design_context` | Available, not used | Design-to-code output; not needed for validation |
| `whoami` | ✅ | Only for access problems |
| Not to be used | — | `generate_diagram`, `create_new_file`, `send_code_to_figma`, `upload_assets`, Weave / shader / generative tools |

## 2. Properties retrievable through `use_figma` (verified)

| Requirement | Property / API | Status |
|---|---|---|
| Frame dimensions | `width`, `height`, `absoluteBoundingBox` | ✅ |
| Element positions and sizes | `x`, `y`, `width`, `height`, `absoluteBoundingBox`, `absoluteRenderBounds` | ✅ |
| Auto Layout | `layoutMode`, `primaryAxisAlignItems`, `counterAxisAlignItems`, `layoutWrap`, `counterAxisSpacing`, `minWidth`/`maxWidth` | ✅ |
| Padding and spacing | `paddingTop/Right/Bottom/Left`, `itemSpacing`, `boundVariables` on them | ✅ |
| Sizing | `layoutSizingHorizontal/Vertical` (FIXED/HUG/FILL), `layoutPositioning` (AUTO/ABSOLUTE), `constraints` | ✅ |
| Component properties | `getMainComponentAsync()` (name, parent set, page, `remote`), `componentProperties`, `overrides[].overriddenFields`, `exposedInstances` | ✅ |
| Detached instances | `detachedInfo` on FRAME (`{type:'local', componentId}` or library) | ✅ |
| Text styles and typography | `fontName`, `fontSize`, `lineHeight`, `letterSpacing`, `textAlignHorizontal`, `textAutoResize`, `textTruncation`, `maxLines`, `textStyleId`, `getStyledTextSegments()` | ✅ |
| Colours, fills, borders | `fills`, `strokes` (with `boundVariables`), `fillStyleId`, `strokeStyleId`, `strokeWeight`, `strokeAlign`, `opacity` | ✅ |
| Corner radius | `cornerRadius` (or `figma.mixed`) and `topLeftRadius` … | ✅ |
| Effects | `effects`, `effectStyleId` | ✅ |
| Parent-child relationships | `parent`, `children`, `findAll`, `findAllWithCriteria`, `query()` | ✅ |
| Clipping | `clipsContent` | ✅ |
| Prototype | `reactions` (read) | ✅ |
| Local variables and styles | `figma.variables.getLocalVariableCollectionsAsync()`, `getLocalPaintStylesAsync`, `getLocalTextStylesAsync`, `getLocalEffectStylesAsync`, `getLocalGridStylesAsync` | ✅ (all empty in this file on 2026-11-28) |

## 3. Limitations — cannot be retrieved or needs visual / device inspection

| Area | Limitation | Consequence in the report |
|---|---|---|
| Touch targets | Figma has no hit-area concept; only the visual box is measurable | Size findings are *Verified*; "real hit area" is *Device* |
| Safe areas | No safe-area metadata on frames; status bar / home indicator inferred from conventions (rules §10) | Safe-area items are *Device* unless an element clearly overlaps the status bar |
| Text rendering | Real-device font metrics, Dynamic Type, localisation length, truncation on device | *Visual* / *Device* recommendations |
| Contrast | Colours are readable but stacked opacity / blend modes are approximated | Contrast only as a recommendation |
| Gradients, image fills | Extractor analyses SOLID paints only | Listed as not inspected if present |
| Mixed text | `fontName`/`fontSize` can be `mixed`; segment-level needs `getStyledTextSegments` | Reported as "mixed" unless a targeted read is done |
| Library assets | Internals of remote main components and library variables are not listed by local APIs | Library compliance only via `remote` flag and `search_design_system` |
| Scrolling | `overflowDirection` and real scroll behaviour not verified | Content below the fold judged only from frame geometry |
| Optical alignment, visual weight | Not measurable | *Visual* |
| Plugin API restrictions in `use_figma` | `loadAllPagesAsync`, `setPluginData`, `figma.notify`, `createImageAsync` unsupported; page context resets every call; one page switch per call | Per-page parallel calls; no file-wide single scan |
| Return size | Large returns fail or get truncated | Extractor aggregates and caps lists; ≤ 8 frames per call |
| `get_metadata` | Geometry only | Not sufficient for spacing / style checks — always use the extractor |
