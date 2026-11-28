// Read-only. Category K: screen structure on flow pages. Set PAGES (regex on page names).
const PAGES=/^0[123]/;
const isNote=n=>/^Note\//.test(n.name);
const paint=n=>(Array.isArray(n.fills)&&n.fills.some(p=>p.visible!==false))||(Array.isArray(n.strokes)&&n.strokes.some(p=>p.visible!==false))||(n.effects&&n.effects.length);
const inInst=(n,root)=>{let p=n.parent;while(p&&p!==root){if(p.type==='INSTANCE')return true;p=p.parent;}return false;};
const R={screens:{},K1:{plain:[],overlay:0},K2:{},K3:{},K4:{}};
const sig=n=>n.name.replace(/\d+/g,'#')+'('+n.children.filter(c=>!isNote(c)).map(c=>c.type==='INSTANCE'?'I:'+(c.mainComponent?c.mainComponent.id:'?'):c.type[0]+':'+c.name.replace(/\d+/g,'#')).join(',')+')';
for(const pg of figma.root.children){if(!PAGES.test(pg.name))continue;await pg.loadAsync();
 const screens=pg.findAll(n=>n.type==='FRAME'&&n.width===390&&n.parent&&(n.parent.type==='SECTION'||n.parent.type==='PAGE'));R.screens[pg.name]=screens.length;
 for(const s of screens){
  if(s.layoutMode==='NONE'){if(s.children.some(c=>/Scrim|dimmed/i.test(c.name))||/Overlay/.test(s.name))R.K1.overlay++;else R.K1.plain.push(s.id+' '+s.name);}
  const seen=new Set();
  for(const f of s.findAll(n=>n.type==='FRAME'&&!isNote(n)&&!inInst(n,s))){
   const kids=f.children.filter(c=>!isNote(c));
   if(kids.length===1&&!paint(f)){const k=kids[0];
     if(/^Region\//.test(f.name)&&k.type==='INSTANCE'&&!(f.paddingTop||f.paddingBottom||f.paddingLeft||f.paddingRight)){const nm=f.name.replace(/\s*[(«].*$/,'');R.K3[nm]=(R.K3[nm]||0)+1;}
     else if(/^Region\//.test(f.parent.name)&&!/^Region\/Parent/.test(f.parent.name)&&k.type==='INSTANCE'){const nm=f.parent.name.replace(/\s*[(«].*$/,'')+' > '+f.name;R.K2[nm]=(R.K2[nm]||0)+1;}}
   if(!/^Region\//.test(f.name)&&kids.length>=2){const g=sig(f);if(!seen.has(g)){seen.add(g);R.K4[g]=R.K4[g]||{name:f.name,n:0,ex:[]};R.K4[g].n++;if(R.K4[g].ex.length<3)R.K4[g].ex.push(s.id);}}
  }}}
return {screens:R.screens,K1_plainNoAutoLayout:R.K1.plain.length,K1_examples:R.K1.plain.slice(0,10),K1_overlays:R.K1.overlay,
 K2_doubleWrappers:R.K2,K3_singleInstanceRegions:R.K3,
 K4_repeatedFrames:Object.values(R.K4).filter(v=>v.n>=3).sort((a,b)=>b.n-a.n).slice(0,30).map(v=>v.name+' ×'+v.n+' e.g. '+v.ex.join(','))};
