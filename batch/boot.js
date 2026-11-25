(async()=>{
const RAW='https://raw.githubusercontent.com/hamzashakeel1221/LaunchWright/1840050/batch/';
const sl=ms=>new Promise(r=>setTimeout(r,ms));
if(!window.__hooked){window.__hooked=true;const oc=HTMLInputElement.prototype.click;
HTMLInputElement.prototype.click=function(){if(this.type==='file'&&window.__pending){const f=window.__pending;window.__pending=null;const dt=new DataTransfer();dt.items.add(f);this.files=dt.files;this.dispatchEvent(new Event('input',{bubbles:true}));this.dispatchEvent(new Event('change',{bubbles:true}));return;}return oc.call(this)};}
window.SCH=window.SCH||await (await fetch(RAW+'schedule.json')).json();
window.getF=async(path,type)=>new File([await (await fetch(RAW+path)).blob()],path.split('/').pop(),{type});
window.pasteCap=(el,text)=>{el.focus();const dt=new DataTransfer();dt.setData('text/plain',text);el.dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true}));};
const labs=()=>[...document.querySelectorAll('label')].filter(e=>e.children.length===0&&/^\d\d$/.test(e.textContent.trim())&&e.getBoundingClientRect().width>0);
window.fh=(n)=>{const L=labs();L[n*2].click();return L.length};
window.coords=()=>JSON.stringify([...document.querySelectorAll('input[placeholder="dd/mm/yyyy"]')].map(e=>{const r=e.getBoundingClientRect();return [Math.round(r.x+r.width/2),Math.round(r.y+r.height/2)]}));
window.arm=async(i)=>{window.__pending=await getF(SCH[i].file,SCH[i].kind==='photo'?'image/jpeg':'video/mp4');return 'armed '+SCH[i].file};
window.fill=async(i)=>{for(let k=0;k<80&&(document.body.innerText.includes('Uploading')||!document.querySelector('[role=switch][aria-label="Set date and time"]'));k++)await sl(500);
 const el=document.querySelector('[contenteditable=true][aria-label^="Write in the dialogue"]');pasteCap(el,SCH[i].caption);await sl(700);
 const sw=document.querySelector('[role=switch][aria-label="Set date and time"]');if(!sw.checked)sw.click();
 for(let k=0;k<40&&document.querySelectorAll('input[placeholder="dd/mm/yyyy"]').length<2;k++)await sl(300);
 sw.scrollIntoView({block:'start'});await sl(900);
 if(document.querySelectorAll('input[placeholder="dd/mm/yyyy"]').length!==2)throw new Error('no date inputs');
 return el.innerText.slice(0,30)+' | '+coords()};
window.verify=(dd,mon,hh)=>{const ins=[...document.querySelectorAll('input[placeholder="dd/mm/yyyy"]')].map(x=>x.value);const l=labs().map(x=>x.textContent.trim());
 const ok=ins.length===2&&ins.every(v=>v.startsWith(dd+' '+mon))&&l.join(',')===hh+',00,'+hh+',00';if(!ok)throw new Error('MISMATCH '+JSON.stringify({ins,l}));return 'verified'};
window.dismiss=()=>{const b=[...document.querySelectorAll('[role=button],button,div')].filter(e=>e.children.length<=1&&e.textContent.trim()==='Maybe later'&&e.getBoundingClientRect().width>0);if(!b.length)throw new Error('no maybe later');b[b.length-1].click();return 'dismissed'};
window.BOOTED=true;
})();
