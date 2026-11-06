const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../../project/components/bundle.js'),'utf8');
const section=source.slice(source.indexOf('  var SY ='),source.indexOf('  /* ---------- nougats:'));
function harness(voices=[],saved={}){
 const queue=[],events=[],SY={getVoices:()=>voices,speak:u=>queue.push(u),cancel(){},pause(){},resume(){}};
 const w={speechSynthesis:SY,SpeechSynthesisUtterance:class{constructor(t){this.text=t;}},addEventListener(){}};
 const d={documentElement:{lang:'en'}};
 const read=vm.runInNewContext('(function(){'+section+';return read;})()',{w,d,$:()=>null,$$:()=>[],get:(k,def)=>saved[k]??def,put:(k,v)=>saved[k]=v,emit:(n,v)=>events.push({n,...v}),esc:String,icon:()=>'',setInterval,clearInterval});
 return{read,queue,events,SY,saved};
}
const voice=(name,lang='en-IE',extra={})=>({name,lang,voiceURI:name,localService:true,default:false,...extra});
let h=harness([voice('Moira'),voice('Moira (Enhanced)'),voice('Zoe (Premium)','en-US'),voice('Bad News','en-US'),voice('French premium','fr-FR')]);
assert.equal(h.read.pick().name,'Moira (Enhanced)');assert.equal(h.read.pick('Moira').name,'Moira');
h.saved['sb:voice']='Moira';assert.equal(h.read.pick().name,'Moira');h.saved['sb:voiceURI']='Zoe (Premium)';assert.equal(h.read.pick().name,'Zoe (Premium)');
h=harness([voice('Moira'),voice('Daniel (Enhanced)','en-GB')]);assert.equal(h.read.pick().name,'Daniel (Enhanced)');
h=harness([voice('Moira','en-IE',{voiceURI:'com.apple.voice.enhanced.en-IE.Moira'}),voice('Moira (compact)')]);assert.match(h.read.pick().voiceURI,/enhanced/);
h=harness([voice('Bad News'),voice('Whisper'),voice('French','fr-FR')]);assert.equal(h.read.pick(),null);
h=harness([voice('Daniel','en-GB'),voice('Daniel enhanced','en-GB',{localService:false})]);assert.equal(h.read.pick().name,'Daniel enhanced');
h=harness();assert.equal(h.read.pick(),null);h.SY.getVoices=()=>[voice('Samantha','en-US')];assert.equal(h.read.pick().name,'Samantha');
for(const text of ['', 'A sentence. Another one!', 'Word '.repeat(250), 'x'.repeat(601), 'First paragraph.\n\nSecond paragraph with punctuation: more.']){
 const chunks=h.read._chunk(text);assert.equal(chunks.map(x=>x.text).join(''),text);let offset=0;for(const c of chunks){assert.equal(c.start,offset);assert.ok(c.text.length<=220);offset+=c.text.length;}
}
h=harness([voice('Moira (Enhanced)')]);assert.equal(h.read.speak('Hello there.'),true);assert.equal(h.queue[0].pitch,1);assert.equal(h.queue[0].rate,1);assert.equal(h.queue[0].voice.name,'Moira (Enhanced)');
const old=h.queue[0];h.read.speak('New story.');assert.equal(h.queue.length,2);old.onend();old.onerror({error:'canceled'});assert.equal(h.queue.length,2);assert.equal(h.read.state,'speaking');assert.equal(h.read._i,0);
h.queue[1].onerror({error:'not-allowed'});assert.equal(h.read.state,'idle');assert.match(h.read.error,/Press play/);assert.equal(h.queue.length,2);
h.read.speak('Another story.');h.read.pause();assert.equal(h.read.state,'paused');h.read.resume();assert.equal(h.read.state,'speaking');const canceled=h.queue[2];h.read.stop();canceled.onend();assert.equal(h.read.state,'idle');assert.equal(h.queue.length,3);
h.read.speak('Bounds.',{rate:99,pitch:-1});assert.equal(h.queue[3].rate,2);assert.equal(h.queue[3].pitch,.5);
h.read.stop();h.read.speak('');assert.equal(h.read.state,'idle');
console.log('PASS: enhanced/browser-available voice ranking, explicit saved choices, novelty exclusion, late enumeration, natural pitch/rate, bounded exact text chunks, stale cancel events, errors, pause/resume/stop.');
