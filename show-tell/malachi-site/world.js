import {mount} from './vendor/four-styles.js';
import {MOMENTS} from '../malachi-art/moments.js';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const data=window.SERMON, status=$('#world-status'), root=document.body;
const asset=p=>window.LOCAL_ASSETS?.[p]||p;
const reviewArt=asset('art/far-off.svg');
const chapters=[
 {name:'the dent',title:'What’s<br> going <em>on?</em>',lede:'A little room for the things<br> we cannot know.',eyebrow:'A storm, a dent, a question',art:reviewArt,start:3.5,end:37.6,ids:['hail'],alt:'A folded map, winding paper river and mountains beneath a warm moon; public review scenery.',spot:['the unexpected','A forecast isn’t a promise.','In the opening story, knowledge might have helped Malachi move his car. It did not tell him what was coming.'],prompt:'What can you prepare for? What remains outside your control?'},
 {name:'far off',title:'Wisdom.<br> Still <em>far off.</em>',lede:'A map can guide you.<br> It cannot hold the whole world.',eyebrow:'Knowledge helps. Knowledge has limits.',art:asset('art/far-off.svg'),start:37.95,end:120.55,ids:['knowledge','thesis','wisdom','weather'],alt:'A folded map rests beside a winding paper river; layered mountains recede toward a warm moon and a paper crane.',spot:['unfold the map','Useful. And incomplete.','The sermon values wise decisions while questioning the promise of complete control. Its weather metaphor leaves room for particular lives that surprise us.'],prompt:'Where has knowledge helped you? Where does your map stop?'},
 {name:'the wind',title:'Even a crown<br> has <em>edges.</em>',lede:'The wind keeps moving<br> through our little schemes.',eyebrow:'Schemes, power, and their limits',art:asset('art/wind.svg'),start:120.9,end:178,ids:['schemes','power'],alt:'A folded gold crown sits among mountains as pale wind lines pass over it and an origami crane flies beyond.',spot:['follow the wind','Power cannot answer everything.','Malachi connects our schemes with sin and foolishness, then describes the limits of even the highest human authority.'],prompt:'What are you trying to control? What would responsible action look like without that certainty?'},
 {name:'morning',title:'A cross.<br> An open <em>tomb.</em>',lede:'The sermon’s hope<br> has a particular name.',eyebrow:'Christ’s death and resurrection',art:asset('art/morning.svg'),start:178.35,end:237.8,ids:['gospel'],alt:'A quiet folded-paper landscape holds a cross and an empty tomb, its stone rolled aside and a pale path leading out.',spot:['pause here','The Christian centre of this sermon.','Malachi speaks of Christ freely going through death, bearing God’s wrath in our place, and rising again. This scene holds that claim without turning it into a puzzle to win.'],prompt:'What does this passage invite you to consider? You can simply listen, or leave a question.'},
 {name:'still here',title:'Questions remain.<br> So do <em>we.</em>',lede:'A next faithful step.<br> Even with a dent in the story.',eyebrow:'Trust, without every explanation',art:reviewArt,start:238.15,end:277.62,ids:['trust','faithful'],alt:'A folded map, winding paper river and mountains beneath a warm moon; public review scenery.',spot:['make room','Unanswered is not abandoned.','The closing calls for faithful life amid mystery. It also keeps an essential caveat: suffering is not always the result of personal folly.'],prompt:'What is one small next step? What question can remain open beside it?'}
];
let current=0,foldBusy=false,captionOn=true,lastOpener=null,entered=false,activePlayer=null,activeOffset=0;
const clipPlayers=new Map();
let moment=MOMENTS[0];
const variants=new Map();
const media=matchMedia('(prefers-reduced-motion:reduce)');
const quiet=()=>media.matches||root.dataset.fsReduced==='true';
const fs=mount(root,{storeybrook:window.Storeybrook,preferences:{style:'gen4',theme:'system',words:true},storageKey:'malachi.paperworld.preferences.v02',imageAlt:chapters[0].alt});
Storeybrook.ensureDefs();Storeybrook.mountIcons();
const announce=t=>status.textContent=t;
function time(n){return `${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}`;}
function openDialog(sel,opener){lastOpener=opener||document.activeElement;$(sel).showModal();}
$$('.close-dialog').forEach(b=>b.onclick=()=>b.closest('dialog').close());
$$('dialog').forEach(d=>d.addEventListener('close',()=>{if(lastOpener?.isConnected)lastOpener.focus({preventScroll:true});}));
function sourceText(){const host=$('#source-excerpts');host.replaceChildren();for(const clip of data.timeline.filter(c=>chapters[current].ids.includes(c.id))){const p=document.createElement('p'),mark=document.createElement('strong');mark.textContent=`Original ${time(clip.source_in)}–${time(clip.source_out)} · `;p.append(mark,document.createTextNode(clip.transcript));host.append(p);}}
function setScene(i,{fold=false,seek=false}={}){
 i=Math.max(0,Math.min(4,i));if(foldBusy)return;
 const c=chapters[i],swap=()=>{current=i;$('#world').dataset.scene=String(i);$('#scene-title').innerHTML=c.title;$('#scene-lede').innerHTML=c.lede;$('#eyebrow').textContent=`0${i+1} / 05 · ${c.eyebrow}`;$('#scene-art').src=c.art;$('#scene-art').alt=c.alt;$('#art-description').textContent='Original vector paper scenery; a creative visual adaptation, not historical evidence.';$('#hotspot-label').textContent=c.spot[0];$('#discover').setAttribute('aria-label',`Discover: ${c.spot[0]}`);$('#discover').style.setProperty('--x',i===0||i===4?'83%':'72%');$('#discover').style.setProperty('--y',i===3?'65%':'58%');$('#reflection-prompt').textContent=c.prompt;$('#begin').innerHTML=i===4?'Stay a little <span aria-hidden="true">✦</span>':'Unfold the next scene <span aria-hidden="true">↗</span>';$('#listen').innerHTML=(activePlayer?.paused??true)?'<span aria-hidden="true">▷</span> Listen to this excerpt':'<span aria-hidden="true">Ⅱ</span> Pause recording';$('.art-credit').innerHTML='Original paper scenery'+' <span aria-hidden="true">✦</span>';$$('[data-chapter]').forEach(b=>{if(+b.dataset.chapter===i)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});$('#reveal-note').hidden=true;syncReadalongControl();sourceText();renderMoment(seek||moment.chapter!==i?MOMENTS.find(m=>m.chapter===i):moment);updateWorkshop();announce(`Chapter ${i+1}: ${c.name}. ${c.lede.replace(/<br> /g,' ')}`);};
 if(fold&&!quiet()){foldBusy=true;Storeybrook.fold($('#stage'),swap).then(()=>{foldBusy=false;});$$('.sb-fold-half').forEach(el=>el.inert=true);setTimeout(()=>{foldBusy=false;$$('.sb-fold-half,.sb-fold-crease').forEach(n=>n.remove());},1000);}else swap();
 if(seek){activePlayer?.pause();$('#caption-well').hidden=true;syncReadalongControl();}
}
function killFolds(){if(!quiet())return;$('#stage').getAnimations({subtree:true}).forEach(a=>a.cancel());$$('.sb-fold-half,.sb-fold-crease').forEach(n=>n.remove());foldBusy=false;}
new MutationObserver(killFolds).observe(root,{attributes:true,attributeFilter:['data-fs-reduced']});
$$('[data-chapter]').forEach(b=>b.onclick=()=>setScene(+b.dataset.chapter,{fold:true,seek:true}));
$('#next').onclick=()=>setScene((current+1)%5,{fold:true,seek:true});
$('#begin').onclick=()=>{if(current===0&&!entered){entered=true;$('#discover').click();$('#begin').innerHTML='Unfold the next scene <span aria-hidden="true">↗</span>';return;}current===4?openDialog('#notebook-dialog',$('#begin')):setScene((current+1)%5,{fold:true,seek:true});};
$('#home').onclick=e=>{e.preventDefault();setScene(0,{fold:true,seek:true});};
$('#source-open').onclick=()=>openDialog('#source-dialog',$('#source-open'));
$('#notebook-open').onclick=()=>openDialog('#notebook-dialog',$('#notebook-open'));
$('#recording-open').onclick=()=>openDialog('#recording-dialog',$('#recording-open'));
$('#workshop-open').onclick=()=>openDialog('#workshop-dialog',$('#workshop-open'));
$('#discover').onclick=()=>{const c=chapters[current];$('#reveal-title').textContent=c.spot[1];$('#reveal-copy').textContent=c.spot[2];$('#reveal-note').hidden=false;$('#reveal-close').focus({preventScroll:true});};
$('#reveal-close').onclick=()=>{$('#reveal-note').hidden=true;$('#discover').focus({preventScroll:true});};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#reveal-note').hidden){$('#reveal-note').hidden=true;$('#discover').focus({preventScroll:true});}});
async function playFrom(t,resumeClip){const clip=resumeClip||data.timeline.find(c=>c.source_in!==undefined&&t>=c.start&&t<c.end),player=clipPlayers.get(clip?.id);if(!player)return;$$('.clip-audio').forEach(x=>{if(x!==player)x.pause();});try{player.currentTime=Math.max(0,t-clip.start);await player.play();announce('Playing Malachi’s original excerpt.');}catch{announce('Playback could not start. Use the native audio controls in the listening room.');if(!$('#recording-dialog').open)openDialog('#recording-dialog');}}
$('#listen').onclick=()=>{if(activePlayer&&!activePlayer.paused){activePlayer.pause();return;}const clip=data.timeline.find(c=>clipPlayers.get(c.id)===activePlayer),resume=clip&&chapters[current].ids.includes(clip.id)&&!activePlayer.ended;playFrom(resume?clip.start+activePlayer.currentTime:(moment.at??chapters[current].start),resume?clip:undefined);};
$('#reveal-source').onclick=()=>{playFrom(chapters[current].start);$('#reveal-note').hidden=true;};
$('#stop-audio').onclick=()=>activePlayer?.pause();
$('#captions-toggle').onclick=()=>{captionOn=!captionOn;$('#captions-toggle').textContent=captionOn?'Captions on':'Captions off';$('#captions-toggle').setAttribute('aria-pressed',String(captionOn));updateCaption();};
function syncReadalongControl(){$('#readalong-toggle').textContent=activePlayer&&!activePlayer.paused?'Pause excerpt':'Play excerpt';}
$('#readalong-toggle').onclick=()=>$('#listen').click();
$('#readalong-notes').onclick=()=>openDialog('#workshop-dialog',$('#readalong-notes'));
function updateCaption(){
 const t=(activePlayer?.currentTime||0)+activeOffset;
 const clip=data.timeline.find(c=>clipPlayers.get(c.id)===activePlayer);
 const belongs=clip&&chapters[current].ids.includes(clip.id)&&!activePlayer.ended;
 const c=belongs&&data.captions.find(x=>t>=x.start&&t<x.end);
 if(belongs){const next=MOMENTS.filter(m=>m.clipId===clip.id&&m.at<=t).at(-1);if(next&&next!==moment){renderMoment(next);updateWorkshop();}}
 $('#caption-well').hidden=!captionOn||!c;$('#caption').textContent=c?.text||'';syncReadalongControl();
}
function renderMoment(m){
 moment=m;
 const variant=variants.get(m.n)??Math.max(0,m.imgs.findIndex(im=>im.recommended));
 const im=m.imgs[variant];
 $('#scene-art').src=asset('../malachi-art/'+im.src);$('#scene-art').alt=im.alt;
 $('#art-description').textContent=m.note+' · Creative illustration';
 $('#moment-select').value=String(m.n);
 const clip=data.timeline.find(c=>c.id===m.clipId);
 $('#moment-source').textContent=clip?`Original ${time(clip.source_in+(m.at-clip.start))} · ${clip.heading}`:'Opening illustration · no spoken passage';
 $('#moment-prev').disabled=MOMENTS.indexOf(m)===0;$('#moment-next').disabled=MOMENTS.indexOf(m)===MOMENTS.length-1;
 const host=$('#moment-variants');host.replaceChildren();
 if(m.imgs.length>1)m.imgs.forEach((img,i)=>{const button=document.createElement('button');button.textContent=i===0?'First illustration':'Alternate illustration';button.setAttribute('aria-pressed',String(i===variant));button.onclick=()=>{variants.set(m.n,i);renderMoment(m);host.children[i].focus({preventScroll:true});};host.append(button);});
}
function chooseMoment(m){if(!m)return;activePlayer?.pause();activePlayer=null;activeOffset=0;setScene(m.chapter,{seek:true});renderMoment(m);updateWorkshop();announce(m.moment);}
for(const m of MOMENTS){const option=document.createElement('option');option.value=String(m.n);option.textContent=m.moment;$('#moment-select').append(option);}
$('#moment-select').onchange=e=>chooseMoment(MOMENTS.find(m=>String(m.n)===e.target.value));
$('#moment-prev').onclick=()=>chooseMoment(MOMENTS[MOMENTS.indexOf(moment)-1]);
$('#moment-next').onclick=()=>chooseMoment(MOMENTS[MOMENTS.indexOf(moment)+1]);

for(const clip of data.timeline.filter(c=>c.source_in!==undefined)){
 const row=document.createElement('section');row.className='clip-row';
 const h=document.createElement('h3');h.textContent=clip.heading;
 const meta=document.createElement('p');meta.className='clip-meta';meta.textContent=`Original ${time(clip.source_in)}–${time(clip.source_out)} · ${time(clip.end-clip.start)}`;
 const player=document.createElement('audio');player.className='clip-audio';player.controls=true;player.preload='none';player.src=asset(`clips/${clip.id}.mp3`);player.setAttribute('aria-label',`${clip.heading}: original excerpt`);clipPlayers.set(clip.id,player);player.addEventListener('play',()=>{$$('.clip-audio').forEach(x=>{if(x!==player)x.pause();});activePlayer=player;activeOffset=clip.start;setScene(chapters.findIndex(c=>c.ids.includes(clip.id)));$('#listen').innerHTML='<span aria-hidden="true">Ⅱ</span> Pause recording';updateCaption();});player.addEventListener('timeupdate',()=>{if(activePlayer===player)updateCaption();});player.addEventListener('pause',()=>{if(activePlayer===player){$('#listen').innerHTML='<span aria-hidden="true">▷</span> Listen to this excerpt';syncReadalongControl();}});
 player.addEventListener('ended',()=>{if(activePlayer===player){$('#caption-well').hidden=true;$('#listen').innerHTML='<span aria-hidden="true">▷</span> Listen to this excerpt';}});
 const detail=document.createElement('details'),summary=document.createElement('summary'),p=document.createElement('p');summary.textContent='Read this excerpt';p.textContent=clip.transcript;detail.append(summary,p);row.append(h,meta,player,detail);$('#clip-list').append(row);
}
$('#fold-thought').onclick=()=>{if(!$('#reflection').value.trim()){announce('A blank page is welcome too.');return;}$('#reflection').hidden=true;$('#fold-thought').hidden=true;$('#unfold-thought').hidden=false;$('#folded-letter').hidden=false;$('#thought-status').textContent='Folded for this visit. Your words are still here; open them whenever you like.';$('#unfold-thought').focus();};
$('#unfold-thought').onclick=()=>{$('#reflection').hidden=false;$('#fold-thought').hidden=false;$('#unfold-thought').hidden=true;$('#folded-letter').hidden=true;$('#thought-status').textContent='Your words stay in this visit only. Nothing is sent or stored.';$('#reflection').focus();};
function selectedClip(){return data.timeline.find(c=>c.id===moment.clipId)||data.timeline.find(c=>c.id===chapters[current].ids[0]);}
function updateWorkshop(){const clip=selectedClip();$('#workshop-passage').textContent=clip.transcript;}
$('#workshop-original').onclick=()=>playFrom(selectedClip().start);
$('#save-workshop').onclick=()=>{const clip=selectedClip();const payload={format:'passage-notes-v1',episode:data.episode_id,chapter:chapters[current].name,moment:moment.moment,source_clip_id:clip.id,source_in:clip.source_in,source_out:clip.source_out,transcript:clip.transcript,phrase:$('#voice-direction').value,reflection:$('#malachi-feedback').value,status:'Personal notes; not submitted or attributed to the speaker'};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='malachi-passage-notes.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);announce('Passage notes downloaded.');};
root.addEventListener('fourstyles:change',e=>{if(e.detail.style==='skeptic'){$('#reveal-title').textContent='What is the source?';$('#reveal-copy').textContent='The illustration is an interpretation. Open “The original sermon” to compare its exact source passages and caption uncertainties.';$('#reveal-note').hidden=false;}});
sourceText();renderMoment(moment);updateWorkshop();
window.paperWorld={setScene,getState:()=>({chapter:current,moment:moment.n,time:(activePlayer?.currentTime||0)+activeOffset,style:fs.getState(),reflection:$('#reflection').value}),chapters};
const qp=new URLSearchParams(location.search);if(qp.has('scene'))setScene(+qp.get('scene'));if(qp.get('quiet')==='1')$('button[data-fs-quiet]').click();
