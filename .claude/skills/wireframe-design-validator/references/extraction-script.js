// wireframe-design-validator · READ-ONLY extractor for use_figma (Plugin API). Verified 2026-11-28.
// Usage: replace __PAGE__ with the page id and __FRAMES__ with a JS array of ≤ 8 frame ids on that page,
// copy RULES values from design-rules.md (spacing §3, touch §10, min text §5, ignored layers §13).
// The script only reads. Do not add setters. Output: one aggregate object per frame (see validation-criteria.md).
const PAGE_ID = '__PAGE__';
const FRAME_IDS = __FRAMES__;
const RULES = { spacing:[0,2,4,8,12,16,20,24,32,40,48], minTouch:44, minText:11, statusBarH:44, homeIndicatorH:34, ignorePrefix:['Note/'] };

const page = await figma.getNodeByIdAsync(PAGE_ID);
if (!page || page.type !== 'PAGE') return { error: 'pageNotFound', PAGE_ID };
await figma.setCurrentPageAsync(page);

const hex = c => '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
const ignored = n => RULES.ignorePrefix.some(p => n.name.startsWith(p));
const isVisible = (n, root) => { for (let p = n; p && p !== root.parent; p = p.parent) { if (p.visible === false) return false; } return true; };
const inc = (o, k, ex) => { if (!o[k]) o[k] = { n: 0, ex: [] }; o[k].n++; if (ex && o[k].ex.length < 3) o[k].ex.push(ex); };
const pageOf = n => { let p = n; while (p && p.type !== 'PAGE') p = p.parent; return p ? p.name : null; };
const mcCache = {};
async function mainOf(inst) {
  const mc = await inst.getMainComponentAsync();
  if (!mc) return null;
  if (!mcCache[mc.id]) {
    const set = mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent : null;
    mcCache[mc.id] = { id: mc.id, name: set ? set.name : mc.name, variant: set ? mc.name : null, remote: mc.remote, page: mc.remote ? '(library)' : pageOf(mc) };
  }
  return mcCache[mc.id];
}
const rel = (n, f) => { const b = n.absoluteBoundingBox, fb = f.absoluteBoundingBox; return b ? { x: Math.round(b.x - fb.x), y: Math.round(b.y - fb.y), w: Math.round(b.width), h: Math.round(b.height) } : null; };

const out = [];
for (const id of FRAME_IDS) {
  const f = await figma.getNodeByIdAsync(id);
  if (!f || f.type !== 'FRAME') { out.push({ id, error: 'notFrame' }); continue; }
  const R = { id, name: f.name, section: f.parent && f.parent.type === 'SECTION' ? f.parent.name : null,
    w: f.width, h: f.height, orientation: f.width > f.height ? 'landscape' : 'portrait', clips: f.clipsContent,
    frameFill: f.fills && f.fills[0] && f.fills[0].type === 'SOLID' ? hex(f.fills[0].color) : null, radius: f.cornerRadius,
    counts: {}, spacing: {}, offScaleSpacing: [], leftEdges: {}, rightEdges: {}, type: {}, textStyleLinked: 0, textHardcoded: 0,
    smallText: [], colors: {}, colorLinked: 0, colorHardcoded: 0, radii: {}, effects: 0, effectStyleLinked: 0,
    instances: 0, components: {}, remoteInstances: 0, detached: [], wfNamedNonInstances: [], overrides: {},
    absoluteStacks: [], absoluteChildren: [], fixedTextRisk: [], overflow: [], clipped: [], overlaps: [],
    smallTargets: [], bottomZone: [], statusBar: null, reactions: 0 };
  const nodes = f.findAll(n => !ignored(n) && isVisible(n, f));
  for (const n of nodes) {
    R.counts[n.type] = (R.counts[n.type] || 0) + 1;
    const b = rel(n, f);
    const insideInstance = (() => { for (let p = n.parent; p && p !== f; p = p.parent) if (p.type === 'INSTANCE') return true; return false; })();
    // Auto Layout & spacing (only nodes owned by the screen, not internals of instances: those belong to the main component)
    if ((n.type === 'FRAME' || n.type === 'COMPONENT' || n.type === 'INSTANCE') && !insideInstance) {
      if (n.layoutMode && n.layoutMode !== 'NONE') {
        const vals = [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft, n.itemSpacing];
        const bv = n.boundVariables || {};
        vals.forEach((v, i) => { inc(R.spacing, String(v)); if (!RULES.spacing.includes(v) && !(i === 4 && n.primaryAxisAlignItems === 'SPACE_BETWEEN') && R.offScaleSpacing.length < 15) R.offScaleSpacing.push({ node: n.name, prop: ['pT','pR','pB','pL','gap'][i], v }); });
        R.spacingLinked = (R.spacingLinked || 0) + ['paddingTop','paddingRight','paddingBottom','paddingLeft','itemSpacing'].filter(k => bv[k]).length;
      } else if (n.type === 'FRAME' && 'children' in n && n.children.filter(c => c.visible && !ignored(c)).length >= 3 && n !== f && R.absoluteStacks.length < 15) {
        R.absoluteStacks.push({ node: n.name, children: n.children.length, w: Math.round(n.width), h: Math.round(n.height) });
      }
    }
    if (!insideInstance && n.layoutPositioning === 'ABSOLUTE' && R.absoluteChildren.length < 10) R.absoluteChildren.push(n.name);
    // content boundaries (depth: direct regions and their direct children)
    if (b && (n.parent === f || (n.parent && n.parent.parent === f)) && n.type !== 'VECTOR' && b.w < f.width - 1) {
      inc(R.leftEdges, String(b.x), n.name); inc(R.rightEdges, String(Math.round(f.width - b.x - b.w)), n.name);
    }
    // Typography
    if (n.type === 'TEXT') {
      const fn = n.fontName === figma.mixed ? 'mixed' : `${n.fontName.family} ${n.fontName.style}`;
      const lh = n.lineHeight === figma.mixed ? 'mixed' : (n.lineHeight.unit === 'AUTO' ? 'auto' : n.lineHeight.value + (n.lineHeight.unit === 'PIXELS' ? 'px' : '%'));
      inc(R.type, `${fn} / ${String(n.fontSize)} / lh ${lh} / ${n.textAlignHorizontal}`, n.name);
      if (n.textStyleId && n.textStyleId !== figma.mixed && n.textStyleId !== '') R.textStyleLinked++; else R.textHardcoded++;
      if (typeof n.fontSize === 'number' && n.fontSize < RULES.minText && R.smallText.length < 10) R.smallText.push({ node: n.name, size: n.fontSize, text: n.characters.slice(0, 30) });
      if (n.textAutoResize === 'NONE' && n.textTruncation === 'DISABLED' && R.fixedTextRisk.length < 10) R.fixedTextRisk.push({ node: n.name, text: n.characters.slice(0, 30), w: Math.round(n.width), h: Math.round(n.height) });
      if (n.absoluteRenderBounds && n.absoluteBoundingBox && (n.absoluteRenderBounds.width > n.absoluteBoundingBox.width + 1 || n.absoluteRenderBounds.height > n.absoluteBoundingBox.height + 1) && R.overflow.length < 15) R.overflow.push({ node: n.name, kind: 'text exceeds its box', text: n.characters.slice(0, 30) });
    }
    // Colours (fills + strokes, solid only)
    for (const key of ['fills', 'strokes']) {
      const paints = n[key]; if (!paints || paints === figma.mixed) continue;
      const styleId = key === 'fills' ? n.fillStyleId : n.strokeStyleId;
      for (const p of paints) { if (p.type !== 'SOLID' || p.visible === false) continue;
        const linked = (p.boundVariables && p.boundVariables.color) || (styleId && styleId !== figma.mixed && styleId !== '');
        if (linked) R.colorLinked++; else R.colorHardcoded++;
        inc(R.colors, hex(p.color) + (p.opacity < 1 ? ` @${Math.round(p.opacity * 100)}%` : '') + ` (${key === 'fills' ? 'fill' : 'stroke'})`, insideInstance ? null : n.name);
      }
    }
    if ('cornerRadius' in n && n.cornerRadius !== 0 && n.type !== 'TEXT') inc(R.radii, n.cornerRadius === figma.mixed ? 'mixed' : String(n.cornerRadius), insideInstance ? null : n.name);
    if ('effects' in n && n.effects.length) { R.effects += n.effects.length; if (n.effectStyleId) R.effectStyleLinked++; }
    // Components
    if (n.type === 'INSTANCE') {
      R.instances++;
      const mc = await mainOf(n);
      if (mc) { inc(R.components, mc.name + (mc.remote ? ' [library]' : ''), mc.variant); if (mc.remote) R.remoteInstances++; }
      if (!insideInstance) { const fields = new Set(); n.overrides.forEach(o => o.overriddenFields.forEach(x => fields.add(x))); fields.delete('name'); if (fields.size) R.overrides[n.name] = [...fields].slice(0, 8); }
    }
    if (n.type === 'FRAME' && n.detachedInfo) R.detached.push({ node: n.name, from: n.detachedInfo.type === 'local' ? n.detachedInfo.componentId : 'library' });
    if ((n.type === 'FRAME' || n.type === 'GROUP') && /^WF\//.test(n.name) && R.wfNamedNonInstances.length < 10) R.wfNamedNonInstances.push(n.name);
    // Overflow / clipping against parent (screen-owned nodes only)
    if (!insideInstance && b && n.parent && n.parent.absoluteBoundingBox && n.parent.type !== 'SECTION') {
      const pb = n.parent.absoluteBoundingBox, nb = n.absoluteBoundingBox; const tol = 0.5;
      const out_ = nb.x < pb.x - tol || nb.y < pb.y - tol || nb.x + nb.width > pb.x + pb.width + tol || nb.y + nb.height > pb.y + pb.height + tol;
      if (out_) { const rec = { node: n.name, parent: n.parent === f ? '(screen)' : n.parent.name, box: b }; if (n.parent.clipsContent) { if (R.clipped.length < 12) R.clipped.push(rec); } else if (R.overflow.length < 15) R.overflow.push(rec); }
    }
    // Touch targets: nodes with reactions, or named as actions/buttons
    const interactive = (n.reactions && n.reactions.length) || /^(Action\/|Button|Btn|Tab|Chip|Toggle|Close|Back|✕)/i.test(n.name) || (n.type === 'INSTANCE' && mcCache[(n.mainComponent || {}).id] && /Button|Chip|Toggle|Tab|Stepper|FAB|Close|More/.test(mcCache[n.mainComponent.id].name));
    if (n.reactions && n.reactions.length) R.reactions++;
    if (interactive && b && (b.w < RULES.minTouch || b.h < RULES.minTouch) && R.smallTargets.length < 12) R.smallTargets.push({ node: n.name, w: b.w, h: b.h });
    if (interactive && b && b.y + b.h > f.height - RULES.homeIndicatorH && b.y + b.h <= f.height && R.bottomZone.length < 8) R.bottomZone.push({ node: n.name, bottom: b.y + b.h });
  }
  // sibling overlaps inside non-auto-layout containers owned by the screen
  const containers = [f, ...nodes.filter(n => n.type === 'FRAME' && n.layoutMode === 'NONE')];
  for (const c of containers) { if (!('children' in c)) continue; const ch = c.children.filter(k => k.visible && !ignored(k) && k.absoluteBoundingBox);
    for (let i = 0; i < ch.length; i++) for (let j = i + 1; j < ch.length; j++) { const a = ch[i].absoluteBoundingBox, d = ch[j].absoluteBoundingBox;
      const ix = Math.min(a.x + a.width, d.x + d.width) - Math.max(a.x, d.x), iy = Math.min(a.y + a.height, d.y + d.height) - Math.max(a.y, d.y);
      if (ix > 1 && iy > 1 && R.overlaps.length < 12) R.overlaps.push({ a: ch[i].name, b: ch[j].name, area: Math.round(ix * iy), container: c === f ? '(screen)' : c.name }); } }
  const sb = f.children.find(c => /status bar/i.test(c.name)); R.statusBar = sb ? { y: Math.round(sb.y), h: Math.round(sb.height), instance: sb.type === 'INSTANCE' } : null;
  const top = o => Object.fromEntries(Object.entries(o).sort((a, b) => b[1].n - a[1].n).slice(0, 14).map(([k, v]) => [k, v.ex && v.ex.filter(Boolean).length ? `${v.n} · ${v.ex.filter(Boolean).join(', ')}` : v.n]));
  ['spacing','leftEdges','rightEdges','type','colors','radii','components'].forEach(k => R[k] = top(R[k]));
  out.push(R);
}
const json = JSON.stringify(out);
return json.length > 60000 ? { truncated: true, bytes: json.length, frames: out.map(r => r.name) } : out;
