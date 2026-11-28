// wireframe-design-validator · READ-ONLY page-level aggregate extractor for use_figma. Verified 2026-11-28 on 88 frames (2 calls).
// Use for page / section scope: aggregates every metric across frames and returns keys with counts and up to 3 example frames,
// so one underlying problem appears once. Replace __PAGE__, __FROM__, __TO__ (≈ 40–45 frames per call; run calls in parallel).
const PAGE_ID = "__PAGE__";
const FROM = __FROM__, TO = __TO__;
const RULES = { spacing:[0,2,4,8,12,16,20,24,32,40,48], typeScale:[11,12,13,15,16,17,20,22,28,34], minTouch:44, minText:11, statusBarH:44, homeIndicatorH:34, ignorePrefix:['Note/'], device:[390,844] };
const page = await figma.getNodeByIdAsync(PAGE_ID);
if (!page || page.type !== 'PAGE') return { error: 'pageNotFound' };
await figma.setCurrentPageAsync(page);
const hex = c => '#' + [c.r,c.g,c.b].map(v => Math.round(v*255).toString(16).padStart(2,'0')).join('').toUpperCase();
const ignored = n => RULES.ignorePrefix.some(p => n.name.startsWith(p));
const visibleIn = (n, root) => { for (let p = n; p && p !== root.parent; p = p.parent) if (p.visible === false) return false; return true; };
const A = {}; const add = (cat, key, frame) => { const o = A[cat] || (A[cat] = {}); const e = o[key] || (o[key] = { n: 0, f: new Set() }); e.n++; if (frame) e.f.add(frame); };
const mcInfo = {};
const infoOf = mc => { if (!mc) return null; if (!mcInfo[mc.id]) { const set = mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent : null; const chain = []; for (let p = (set || mc).parent; p && p.type !== 'DOCUMENT'; p = p.parent) chain.push(p.name); mcInfo[mc.id] = { name: (set || mc).name, variant: set ? mc.name : null, remote: mc.remote, where: chain.reverse().join(' › ') }; } return mcInfo[mc.id]; };
const ownerOf = (n, f) => { let own = null; for (let p = n; p && p !== f; p = p.parent) if (p.type === 'INSTANCE') own = p; if (!own) return 'screen'; let mc = null; try { mc = own.mainComponent; } catch (e) {} const i = infoOf(mc); return i ? i.name : '?'; };
const nearestOwner = (n, f) => { for (let p = n; p && p !== f; p = p.parent) if (p.type === 'INSTANCE') { let mc=null; try { mc = p.mainComponent; } catch(e){} const i = infoOf(mc); return i ? i.name : '?'; } return 'screen'; };
const frames = [];
for (const s of page.children) if (s.type === 'SECTION') for (const c of s.children) if (c.type === 'FRAME' && !ignored(c)) frames.push(c);
const batch = frames.slice(FROM, TO);
const meta = { totalFrames: frames.length, batch: batch.length };
const lists = { overflow: [], clipped: [], textOverflow: [], underStatus: [], detached: [], noStatusBar: [], absStacks: [] };
let instances = 0, remote = 0, texts = 0, textLinked = 0, paints = 0, paintLinked = 0, alProps = 0, alLinked = 0, effects = 0;
for (const f of batch) {
  const fn = f.name.length > 60 ? f.name.slice(0, 60) + '…' : f.name;
  add('sizes', `${Math.round(f.width)}x${Math.round(f.height)}`, fn);
  if (!/^(CT|ON|PR|ST)-\d+/.test(f.name)) add('nonConvNames', f.name.split(' · ')[0].slice(0, 20), fn);
  add('frameChrome', `r${f.cornerRadius} clip${f.clipsContent} fill${f.fills[0] && f.fills[0].type==='SOLID' ? hex(f.fills[0].color) : '-'} stroke${f.strokes.length ? hex(f.strokes[0].color)+'/'+f.strokeWeight : '-'}`, fn);
  const sb = f.findOne(n => /status bar/i.test(n.name) && n.visible);
  if (!sb) lists.noStatusBar.push(fn); else { const y = Math.round(sb.absoluteBoundingBox.y - f.absoluteBoundingBox.y); if (y !== 0 || Math.round(sb.height) !== RULES.statusBarH) add('statusBarGeom', `y${y} h${Math.round(sb.height)}`, fn); }
  const nodes = f.findAll(n => !ignored(n) && visibleIn(n, f));
  const fb = f.absoluteBoundingBox;
  for (const n of nodes) {
    const b = n.absoluteBoundingBox; if (!b) continue;
    const rx = Math.round(b.x - fb.x), ry = Math.round(b.y - fb.y), rw = Math.round(b.width), rh = Math.round(b.height);
    let inInst = false; for (let p = n.parent; p && p !== f; p = p.parent) if (p.type === 'INSTANCE') { inInst = true; break; }
    const owner = n.type === 'INSTANCE' ? ownerOf(n, f) : nearestOwner(n, f);
    if (['FRAME','INSTANCE','COMPONENT'].includes(n.type) && !inInst) {
      if (n.layoutMode && n.layoutMode !== 'NONE') {
        const keys = ['paddingTop','paddingRight','paddingBottom','paddingLeft','itemSpacing']; const bv = n.boundVariables || {};
        keys.forEach(k => { alProps++; if (bv[k]) alLinked++; const v = n[k]; add('spacingHist', String(v));
          if (!RULES.spacing.includes(v) && !(k === 'itemSpacing' && n.primaryAxisAlignItems === 'SPACE_BETWEEN')) add('offScale', `${n.type==='INSTANCE' ? 'main '+owner : 'screen-layer '+n.name.slice(0,40)} · ${k}=${v}`, fn); });
      } else if (n.type === 'FRAME' && n !== f && n.children.filter(c => c.visible && !ignored(c)).length >= 3 && !/Parent \(dimmed\)/.test(n.name)) add('absStacks', n.name.slice(0, 50), fn);
    }
    if (!inInst && n.layoutPositioning === 'ABSOLUTE') add('absChildren', n.name.slice(0, 40), fn);
    if (!inInst && (n.parent === f) && rw < f.width - 1 && !/Scrim|Parent \(dimmed\)|Viewfinder|Bottom sheet|Sheet/.test(n.name)) { add('leftEdge', String(rx)); add('rightEdge', String(Math.round(f.width - rx - rw))); if (rx !== 0 && rx !== 16) add('edgeOdd', `${n.name.slice(0,40)} L${rx} R${Math.round(f.width-rx-rw)}`, fn); }
    if (n.type === 'TEXT') { texts++; if (n.textStyleId && n.textStyleId !== '' ) textLinked++;
      const font = n.fontName === figma.mixed ? 'mixed' : `${n.fontName.family} ${n.fontName.style}`; const lh = n.lineHeight === figma.mixed ? 'mixed' : (n.lineHeight.unit === 'AUTO' ? 'auto' : n.lineHeight.value + (n.lineHeight.unit === 'PIXELS' ? 'px' : '%'));
      add('fontFamily', n.fontName === figma.mixed ? 'mixed' : n.fontName.family); add('fontWeight', n.fontName === figma.mixed ? 'mixed' : n.fontName.style); add('fontSize', String(n.fontSize)); add('typeCombo', `${font}/${String(n.fontSize)}/lh ${lh}`);
      if (typeof n.fontSize === 'number' && !RULES.typeScale.includes(n.fontSize)) add('offScaleSize', `${n.fontSize}px · ${owner}`, fn);
      if (typeof n.fontSize === 'number' && n.fontSize < RULES.minText) add('smallText', `${n.fontSize}px ${n.name.slice(0,25)} · ${owner}`, fn);
      if (n.textAutoResize === 'NONE' && n.textTruncation === 'DISABLED' && n.characters.length > 3) add('fixedText', `${n.name.slice(0,30)} ${rw}x${rh} · ${owner}`, fn);
      const r = n.absoluteRenderBounds; if (r && (r.width > b.width + 1 || r.height > b.height + 1) && lists.textOverflow.length < 30) lists.textOverflow.push(`${fn} › ${n.name} «${n.characters.slice(0,25)}» box ${rw}x${rh} render ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
    for (const key of ['fills','strokes']) { const ps = n[key]; if (!ps || ps === figma.mixed) continue; const sid = key === 'fills' ? n.fillStyleId : n.strokeStyleId;
      for (const p of ps) { if (p.visible === false) continue; if (p.type !== 'SOLID') { add('nonSolid', p.type); continue; } paints++; if ((p.boundVariables && p.boundVariables.color) || (sid && sid !== figma.mixed && sid !== '')) paintLinked++;
        const h = hex(p.color) + (p.opacity < 1 ? '@' + Math.round(p.opacity * 100) : ''); add('colors', h); const c = p.color; if (Math.max(c.r,c.g,c.b) - Math.min(c.r,c.g,c.b) > 0.08) add('chroma', `${h} ${n.name.slice(0,30)} · ${owner}`, fn); } }
    if ('cornerRadius' in n && n.type !== 'TEXT' && n.cornerRadius !== 0) add('radii', n.cornerRadius === figma.mixed ? 'mixed' : String(n.cornerRadius));
    if ('effects' in n && n.effects && n.effects.filter(e => e.visible !== false).length) { effects++; add('effects', `${n.name.slice(0,30)} · ${owner}`, fn); }
    if (n.type === 'INSTANCE') { instances++; let mc = null; try { mc = n.mainComponent; } catch (e) {} const i = infoOf(mc); if (i) { add('components', i.name + ' @' + i.where.split(' › ').slice(0,2).join(' › ')); if (i.remote) remote++; if (/Deprecated|архів|Archive/i.test(i.where + ' ' + i.name)) add('deprecatedUse', i.name, fn); }
      if (!inInst) { const fl = new Set(); n.overrides.forEach(o => o.overriddenFields.forEach(x => fl.add(x))); ['width','height','paddingLeft','paddingRight','paddingTop','paddingBottom','itemSpacing','fills','strokes','cornerRadius','fontSize','fontName','effects','opacity'].forEach(k => { if (fl.has(k)) add('overrides', `${i ? i.name : '?'} · ${k}`, fn); }); } }
    if (n.type === 'FRAME' && n.detachedInfo) lists.detached.push(`${fn} › ${n.name}`);
    if ((n.type === 'FRAME' || n.type === 'GROUP') && /^WF\//.test(n.name)) add('wfNamed', n.name.slice(0,40));
    if (!inInst && n.parent && n.parent !== f.parent && n.parent.absoluteBoundingBox) { const pb = n.parent.absoluteBoundingBox; const t = 0.5;
      if (b.x < pb.x - t || b.y < pb.y - t || b.x + b.width > pb.x + pb.width + t || b.y + b.height > pb.y + pb.height + t) {
        const rec = `${fn} › ${n.name.slice(0,40)} in ${n.parent === f ? '(screen)' : n.parent.name.slice(0,30)} box ${rx},${ry} ${rw}x${rh}`;
        if (n.parent.clipsContent) { if (lists.clipped.length < 40) lists.clipped.push(rec); } else if (lists.overflow.length < 40) lists.overflow.push(rec); } }
    let interactive = !!(n.reactions && n.reactions.length) || /^(Action\/|Button|Btn|Tab |Chip|Toggle|Close|Back|Quick add|Added)/i.test(n.name);
    if (n.type === 'INSTANCE') { let mc=null; try{mc=n.mainComponent}catch(e){} const i = infoOf(mc); if (i && /Button|Chip|Toggle|Stepper|FAB|Close|More|Filter|Link/.test(i.name)) interactive = true; }
    if (interactive) { if (rw < RULES.minTouch || rh < RULES.minTouch) add('smallTargets', `${n.name.slice(0,35)} ${rw}x${rh} · ${owner}`, fn);
      if (ry + rh > f.height - RULES.homeIndicatorH && ry + rh <= f.height && f.height === RULES.device[1]) add('bottomZone', `${n.name.slice(0,35)} bottom ${ry+rh} · ${owner}`, fn);
      if (ry < RULES.statusBarH && ry + rh > 0 && lists.underStatus.length < 20 && !/status/i.test(n.name)) lists.underStatus.push(`${fn} › ${n.name.slice(0,30)} y${ry} h${rh}`); }
  }
  const conts = [f, ...nodes.filter(n => n.type === 'FRAME' && n.layoutMode === 'NONE')];
  for (const c of conts) { const ch = c.children.filter(k => k.visible && !ignored(k) && k.absoluteBoundingBox && !/Scrim|Parent \(dimmed\)|Viewfinder|Camera|Track|Arc|Empty|Num|Badge|background|Sheet chrome|Keyboard/i.test(k.name));
    for (let i = 0; i < ch.length; i++) for (let j = i + 1; j < ch.length; j++) { const a = ch[i].absoluteBoundingBox, d = ch[j].absoluteBoundingBox; const ix = Math.min(a.x+a.width, d.x+d.width) - Math.max(a.x, d.x), iy = Math.min(a.y+a.height, d.y+d.height) - Math.max(a.y, d.y);
      if (ix > 1 && iy > 1) add('overlaps', `${ch[i].name.slice(0,30)} × ${ch[j].name.slice(0,30)} in ${c === f ? '(screen)' : c.name.slice(0,25)} ${Math.round(ix)}x${Math.round(iy)}`, fn); } }
}
const fmt = (o, lim = 25, withFrames = true) => Object.entries(o || {}).sort((a, b) => b[1].n - a[1].n).slice(0, lim).map(([k, v]) => withFrames && v.f.size ? `${k} | n${v.n} | ${v.f.size}fr: ${[...v.f].slice(0,3).join(' ; ')}` : `${k} | n${v.n}`);
const res = { meta, totals: { instances, remote, texts, textLinked, paints, paintLinked, alProps, alLinked, effects }, lists,
  sizes: fmt(A.sizes, 10), nonConvNames: fmt(A.nonConvNames, 15), frameChrome: fmt(A.frameChrome, 8), statusBarGeom: fmt(A.statusBarGeom, 5),
  offScale: fmt(A.offScale, 25), spacingHist: fmt(A.spacingHist, 20, false), absStacks: fmt(A.absStacks, 10), absChildren: fmt(A.absChildren, 10),
  leftEdge: fmt(A.leftEdge, 12, false), rightEdge: fmt(A.rightEdge, 12, false), edgeOdd: fmt(A.edgeOdd, 20),
  fontFamily: fmt(A.fontFamily, 5, false), fontWeight: fmt(A.fontWeight, 6, false), fontSize: fmt(A.fontSize, 16, false), typeCombos: Object.keys(A.typeCombo || {}).length,
  offScaleSize: fmt(A.offScaleSize, 25), smallText: fmt(A.smallText, 15), fixedText: fmt(A.fixedText, 12),
  colors: fmt(A.colors, 40, false), chroma: fmt(A.chroma, 15), nonSolid: fmt(A.nonSolid, 5, false), radii: fmt(A.radii, 20, false), effects: fmt(A.effects, 8),
  components: fmt(A.components, 90, false), deprecatedUse: fmt(A.deprecatedUse, 10), overrides: fmt(A.overrides, 20), wfNamed: fmt(A.wfNamed, 8, false),
  overlaps: fmt(A.overlaps, 20), smallTargets: fmt(A.smallTargets, 30), bottomZone: fmt(A.bottomZone, 20) };
const s = JSON.stringify(res); res.meta.bytes = s.length; return s.length > 90000 ? { tooBig: s.length } : res;
