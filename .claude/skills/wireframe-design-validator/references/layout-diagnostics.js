// Read-only. Region overlaps, sheet bottoms, tap-target mark drift on flow pages.
const PAGES=/^0[123]/;const isNote=n=>/^Note\//.test(n.name);
const FLOAT=/sheet|Close|Dialog|Toast|backdrop|Viewfinder|Tab bar|FAB|Bottom action|Keyboard|Keypad/i;
const ov=[],sh=[],drift=[];
for(const pg of figma.root.children){if(!PAGES.test(pg.name))continue;await pg.loadAsync();
 for(const f of pg.findAll(n=>n.type==='FRAME'&&n.width===390&&n.parent&&(n.parent.type==='SECTION'||n.parent.type==='PAGE'))){
  const H=f.height,tag=f.id+' '+f.name.slice(0,40);
  if(f.layoutMode==='NONE'){const kids=f.children.filter(c=>c.visible&&!isNote(c));
   const flow=kids.filter(c=>!(c.y<=1&&c.height>=H-1)&&!FLOAT.test(c.name)).sort((a,b)=>a.y-b.y);
   for(let i=0;i<flow.length-1;i++){const a=flow[i],b=flow[i+1];const o=a.y+a.height-b.y;if(o>0.5&&b.x<a.x+a.width&&a.x<b.x+b.width)ov.push(tag+' :: '+a.name+' / '+b.name+' '+Math.round(o));}
   for(const c of kids){if(!/sheet/i.test(c.name)||c.y<=1)continue;const vis=c.children?c.children.filter(k=>k.visible):[];const inner=vis.length===1?vis[0]:null;const b=inner?c.y+inner.y+inner.height:c.y+c.height;const kb=kids.find(k=>/keyboard|keypad/i.test(k.name));const goal=kb?kb.y:H;if(Math.abs(b-goal)>0.5)sh.push(tag+' :: '+c.name+' visible bottom '+Math.round(b-H));}}
  for(const m of f.children.filter(c=>/Tap target/.test(c.name))){let t;try{t=m.getSharedPluginData('wireframes','target');}catch(e){}if(!t)continue;const tn=await figma.getNodeByIdAsync(t);if(!tn||!tn.absoluteBoundingBox)continue;const a=tn.absoluteBoundingBox,b=m.absoluteBoundingBox;
   const d=[b.x-a.x+4,b.y-a.y+4,b.width-a.width-8,b.height-a.height-8].map(Math.round);if(d.some(v=>v!==0))drift.push(tag+' :: '+m.name+' '+d.join(','));}
 }}
return {overlaps:ov,sheetBottoms:sh,markDrift:drift.slice(0,60),markDriftTotal:drift.length};
