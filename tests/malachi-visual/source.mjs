import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {MOMENTS,BRIEFS} from '../../show-tell/malachi-art/moments.js';
const text=await readFile(new URL('../../show-tell/malachi-site/episode-data.js',import.meta.url),'utf8');
const data=JSON.parse(text.slice(text.indexOf('{')).trim().replace(/;$/,''));
assert.equal(data.episode_id,'tbcphoenix-2026-10-25-whats-going-on');
assert.equal(BRIEFS.length,16);assert.equal(MOMENTS.length,17);
assert.equal(new Set(BRIEFS.flatMap(b=>b.imgs.map(im=>im.src))).size,18);
assert.deepEqual(MOMENTS.filter(m=>m.n!=='gospel').map(m=>m.n),BRIEFS.map(b=>b.n));
assert.equal(MOMENTS.findIndex(m=>m.clipId==='gospel'),12);
let last=-1;
for(const m of MOMENTS){
 if(m.at!==null){const clip=data.timeline.find(c=>c.id===m.clipId);assert(clip?.source_in!==undefined);assert(m.at>=clip.start&&m.at<clip.end);assert(m.at>=last);last=m.at;}
 for(const im of m.imgs){assert(im.alt.length>20);assert((await readFile(resolve('show-tell/malachi-art',im.src))).length>0);}
}
assert.equal(MOMENTS[0].at,null,'Opening art must not invent a spoken cue');
assert.match(data.timeline.find(c=>c.id==='gospel').transcript,/wrath of God/);
assert.match(data.timeline.find(c=>c.id==='faithful').transcript,/not.*always|always evidence/);
console.log('PASS: 16 original briefs / 18 unchanged image paths, gospel placement, exact sermon identity, ordered source-contained cues, descriptive alternatives.');

const html=await readFile(new URL('../../show-tell/malachi-site/index.html',import.meta.url),'utf8');
assert.match(html,/href="https:\/\/listen.saelion.co\/listen\/"/);
assert.match(html,/A separate Revivalism talk/);
assert(!/<(?:audio|iframe|script)[^>]+(?:src|data-src)="https:\/\/listen.saelion.co/.test(html));
