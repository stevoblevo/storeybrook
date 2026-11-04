// Synthetic logic probes: not browser, visual, AT, or real-download acceptance.
import fs from "node:fs";
import crypto from "node:crypto";

function fixture(source, html, options={}) {
  const byId=new Map(), all=[], listeners=new Map(), scrolls=[], timers=new Map();
  let nextTimer=0, now=1900000000000;
  const store=new Map(Object.entries(options.storage||{})), downloads=[], revoked=[];
  const media={matches:!!options.reduced};
  class Node {
    constructor(tag="div",attrs={}) {
      this.tagName=tag.toUpperCase(); this.attrs={...attrs}; this.children=[]; this.listeners={};
      this.value=attrs.value||""; this.hidden="hidden" in attrs; this.disabled="disabled" in attrs;
      this._checked="checked" in attrs; this._html=""; this._text=""; this.className=attrs.class||"";
      this.style={setProperty(k,v){this[k]=v;}}; this.offsetWidth=100;
      this.classList={
        contains:c=>this.className.split(/\s+/).includes(c),
        add:(...cs)=>{this.className=[...new Set([...this.className.split(/\s+/).filter(Boolean),...cs])].join(" ");},
        remove:(...cs)=>{this.className=this.className.split(/\s+/).filter(c=>!cs.includes(c)).join(" ");},
        toggle:(c,force)=>{const add=force===undefined?!this.classList.contains(c):!!force; this.classList[add?"add":"remove"](c);return add;}
      };
      all.push(this); if(attrs.id) byId.set(attrs.id,this);
    }
    get id(){return this.attrs.id||"";} set id(v){this.attrs.id=v;byId.set(v,this);}
    get checked(){return this._checked;} set checked(v){if(v&&this.attrs.type==="radio")for(const n of all)if(n!==this&&n.attrs.name===this.attrs.name)n._checked=false;this._checked=!!v;}
    get textContent(){return this._text+this.children.map(n=>n.textContent).join("");}
    set textContent(v){this._text=String(v);this._html="";this.children=[];}
    get innerHTML(){return this._html;}
    set innerHTML(v){this._html=String(v);this._text="";this.children=[];}
    setAttribute(k,v){this.attrs[k]=String(v);if(k==="class")this.className=String(v);}
    getAttribute(k){return k==="class"?this.className:(this.attrs[k]??null);}
    removeAttribute(k){delete this.attrs[k];}
    appendChild(n){this.children.push(n);n.parentNode=this;if(this.tagName==="SELECT"&&!this.value)this.value=n.value;return n;}
    addEventListener(type,fn){(this.listeners[type]||=[]).push(fn);}
    fire(type,extra={}){if(type==="click"&&this.disabled)return;for(const fn of this.listeners[type]||[])fn.call(this,{type,target:this,preventDefault(){},...extra});}
    click(){if(this.tagName==="A")downloads.push({href:this.href,filename:this.download});this.fire("click");}
    focus(){doc.activeElement=this;}
    scrollIntoView(args){scrolls.push({id:this.id,dataId:this.attrs["data-id"],...args});}
    getBoundingClientRect(){return {left:0,top:0,width:100,height:40};}
    setPointerCapture(){}
    remove(){if(this.parentNode)this.parentNode.children=this.parentNode.children.filter(n=>n!==this);this.parentNode=null;}
    select(){this.selected=true;}
    querySelector(sel){return this.querySelectorAll(sel)[0]||null;}
    querySelectorAll(sel){const list=[];function walk(n){for(const c of n.children){if(matches(c,sel))list.push(c);walk(c);}}walk(this);return list;}
  }
  function matches(n,selector){
    const sel=selector.replace(/:checked/g,"");
    if(selector.includes(":checked")&&!n.checked)return false;
    const tag=sel.match(/^[\w-]+/);if(tag&&n.tagName!==tag[0].toUpperCase())return false;
    const id=sel.match(/#([\w-]+)/);if(id&&n.id!==id[1])return false;
    for(const m of sel.matchAll(/\.([\w-]+)/g))if(!n.classList.contains(m[1]))return false;
    for(const m of sel.matchAll(/\[([\w-]+)(?:=["']?([^"'\]]+)["']?)?\]/g)){
      if(n.getAttribute(m[1])===null)return false;
      if(m[2]!==undefined&&n.getAttribute(m[1])!==m[2])return false;
    }
    return true;
  }
  const doc={
    body:new Node("body"),activeElement:null,
    getElementById:id=>byId.get(id)||null,
    createElement:tag=>new Node(tag),
    querySelector:sel=>all.find(n=>matches(n,sel))||null,
    querySelectorAll:sel=>all.filter(n=>matches(n,sel)),
    addEventListener(type,fn){(listeners.get(type)||listeners.set(type,[]).get(type)).push(fn);}
  };
  for(const m of html.replace(/<script\b[\s\S]*?<\/script>/gi,"").matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)){
    const attrs={};
    for(const a of m[2].matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+)))?/g))attrs[a[1]]=a[2]??a[3]??a[4]??"";
    new Node(m[1],attrs);
  }
  for(const m of html.matchAll(/<select\b[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/select>/g)){
    const opt=m[2].match(/<option\b([^>]*)>([^<]*)/);if(opt){const val=opt[1].match(/value="([^"]*)"/);byId.get(m[1]).value=val?val[1]:opt[2];}
  }
  const window={
    innerWidth:1200,innerHeight:900,
    matchMedia(){return media;},
    setTimeout(fn){const id=++nextTimer;timers.set(id,fn);return id;},
    clearTimeout(id){timers.delete(id);}
  };
  if(options.downloads){window.Blob=class{constructor(parts,opts){this.parts=parts;this.type=opts.type;}};window.URL={createObjectURL(blob){downloads.push({blob});return "blob:test-only";},revokeObjectURL(url){revoked.push(url);}};}
  const localStorage={
    getItem(k){if(options.readDenied)throw Error("storage denied");return store.get(k)||null;},
    setItem(k,v){if(options.writeDenied)throw Error("quota denied");store.set(k,String(v));}
  };
  class IO{constructor(fn){this.fn=fn;}observe(){}unobserve(){}}
  class TestDate extends Date{constructor(...args){super(...(args.length?args:[now++]));}static now(){return now++;}}
  let error=null;
  try{new Function("document","window","localStorage","IntersectionObserver","Date",source)(doc,window,localStorage,IO,TestDate);}
  catch(e){error=String(e);}
  return {doc,byId,all,store,scrolls,timers,error,downloads,revoked,media,
    get:id=>byId.get(id),
    state:()=>JSON.parse(store.get("bespoke-gig-v5-state")||"null"),
    post(text="A pocket observatory",price="120"){byId.get("g-text").value=text;byId.get("g-price").value=price;byId.get("post-form").fire("submit");},
    propose(index=0){const c=byId.get("board").children[index];c.children.at(-1).children.at(-1).click();},
    arch(i){doc.querySelectorAll(".arch")[i].click();}
  };
}

function runSuite(fixture,source,html){
 const results=[];
 const check=(v,msg)=>{if(!v)throw Error(msg||"assertion failed");};
 const create=(o={})=>fixture(source,html,o);
 function test(name,fn){try{fn();results.push({name,pass:true});}catch(e){results.push({name,pass:false,error:String(e)});}}
 function funded(){const x=create();check(!x.error,x.error);x.propose();x.get("fund-btn").click();return x;}
 function delivered(){const x=funded();x.get("deliver-btn").click();return x;}
 function snapshot(x){return {storage:Object.fromEntries(x.store)};}
 test("startup retains 14 seed gigs and six arches",()=>{const x=create();check(!x.error,x.error);check(x.get("board").children.length===14);check(x.doc.querySelectorAll(".arch").length===6);});
 test("valid posted brief survives reload",()=>{const x=create();x.post();const y=create(snapshot(x));check(!y.error,y.error);check(y.state().posted[0].title==="A pocket observatory");check(y.get("board").children.length===15);});
 for(const amount of ["5","","-1","NaN","Infinity"]){
  test("reject invalid bounty "+JSON.stringify(amount)+" without changing it",()=>{const x=create();x.post("A pocket observatory",amount);check(x.get("board").children.length===14,"invalid gig added");check(x.get("g-price").value===amount,"amount changed");check(x.get("g-text").value==="A pocket observatory","draft lost");check(x.doc.activeElement===x.get("g-price"),"focus not on error");check(x.get("g-price").getAttribute("aria-invalid")==="true");});
 }
 test("valid decimal bounty is preserved exactly",()=>{const x=create();x.post("A pocket observatory","10.50");check(x.state().posted[0].price===10.5);});
 test("empty request creates no gig",()=>{const x=create();x.post("  ");check(x.get("board").children.length===14);check(x.doc.activeElement===x.get("g-text"));});
 test("posted draft remains available for export",()=>{const x=create();x.post();check(x.get("g-text").value==="A pocket observatory");check(/not published/.test(x.get("posted-msg").textContent));});
 test("storage denial keeps draft and reports unsaved open-page state",()=>{const x=create({writeDenied:true});x.post();check(x.state()===null);check(x.get("g-text").value==="A pocket observatory","draft cleared");check(/not saved or published/.test(x.get("posted-msg").textContent),"misleading confirmation");check(/could not save/.test(x.get("demo-storage-status").textContent));});
 test("storage read denial leaves board usable and explains recovery",()=>{const x=create({readDenied:true});check(!x.error,x.error);check(x.get("board").children.length===14);check(/could not be read/.test(x.get("demo-storage-status").textContent));});
 test("malformed saved gig does not stop startup",()=>{const x=create({storage:{"bespoke-gig-v5-state":'{"posted":[null]}'}});check(!x.error,x.error);check(x.get("board").children.length===14);check(/Some saved/.test(x.get("demo-storage-status").textContent));});
 test("mixed saved entries retain valid gig and shelf record",()=>{const x=delivered();x.get("accept-btn").click();x.post();const s=x.state();s.posted.push(null);s.shelf.push(null);const y=create({storage:{"bespoke-gig-v5-state":JSON.stringify(s)}});check(!y.error,y.error);check(y.get("board").children.length===15);check(y.get("shelf-list").children.length===1);});
 test("malformed JSON reports recovery without crashing",()=>{const x=create({storage:{"bespoke-gig-v5-state":"{"}});check(!x.error,x.error);check(/could not be read/.test(x.get("demo-storage-status").textContent));});
 test("new brief selects its family and focuses highlighted card",()=>{const x=create();x.get("g-family").value="Code & Curious Software";x.get("q").value="no match";x.get("q").fire("input");x.post();const cards=x.get("board").children;check(cards.length===2,"family filter not retained");check(cards[0].classList.contains("fresh"));check(x.doc.activeElement===cards[0]);check(x.get("chips").children.find(n=>n.getAttribute("aria-pressed")==="true").getAttribute("data-fam")==="Code & Curious Software");});
 test("board count and search result are announced",()=>{const x=create();x.get("q").value="typewriter";x.get("q").fire("input");check(x.get("board").children.length===1);check(/1 demo gig.*typewriter/.test(x.get("board-summary").textContent));});
 test("brief download includes Unicode and exact entered values",()=>{const x=create({downloads:true});x.get("g-text").value="Étoile — ☔\nTwo pockets";x.get("g-name").value="Múrin";x.get("g-price").value="37.50";x.get("export-brief").click();const file=x.downloads.find(d=>d.blob)?.blob;check(file&&file.type==="text/plain;charset=utf-8");const text=file.parts.join("");check(text.includes("Étoile — ☔\nTwo pockets"));check(text.includes("Múrin"));check(text.includes("37.50"));check(text.includes("not a published gig"));check(x.downloads.some(d=>d.filename==="bespoke-gig-brief.txt"));check(x.get("g-text").value.includes("Étoile"));check(x.state()===null,"export mutated saved board");});
 test("unsupported download exposes copyable text and focused selection",()=>{const x=create();x.get("g-text").value="Keep these words";x.get("export-brief").click();check(x.get("brief-export").open&&!x.get("brief-export").hidden);check(x.get("brief-copy").value.includes("Keep these words"));check(x.doc.activeElement===x.get("brief-copy"));check(x.get("brief-copy").selected);});
 test("empty draft cannot export a pretend brief",()=>{const x=create({downloads:true});x.get("export-brief").click();check(!x.downloads.length);check(x.doc.activeElement===x.get("g-text"));});
 test("single successful rehearsal still creates exactly one mark",()=>{const x=delivered();x.get("accept-btn").click();x.get("accept-btn").click();check(x.state().shelf.length===1);check(x.state().count===1);check(x.state().pairs["Wick & Weather Atelier"]===85);});
 test("fee arithmetic remains unchanged at funding",()=>{const x=funded(),q=x.state().room.quote;check(q.price===85);check(q.bfee===4.25);check(q.mfee===8.5);check(Math.abs(q.proc-2.88825)<1e-9);check(q.maker===76.5);});
 test("active simulated hold still prevents opening a second case",()=>{const x=funded();x.propose(1);check(x.get("room-title").textContent==="A candle that smells like the harbour at dawn");});
 test("concern immediately prevents acceptance",()=>{const x=delivered();x.get("off-btn").click();check(x.get("accept-btn").disabled,"accept still enabled");x.get("accept-btn").listeners.click[0].call(x.get("accept-btn"));check(x.state().shelf.length===0,"guard released disputed hold");check(x.state().room.disputed);});
 test("escalation truthfully reports no human case sent",()=>{const x=delivered();x.get("off-btn").click();x.get("desk-btn").click();check(/no case was sent.*no human review/.test(x.get("desk-status").textContent));check(x.get("accept-btn").disabled);check(x.state().room.escalated);});
 test("reload retains disputed hold and prevents acceptance",()=>{const x=delivered();x.get("off-btn").click();x.get("desk-btn").click();const y=create(snapshot(x));check(!y.error,y.error);check(y.get("accept-btn").disabled);check(y.get("dispute").classList.contains("on"));check(y.get("desk-btn").disabled);y.get("accept-btn").listeners.click[0].call(y.get("accept-btn"));check(y.state().shelf.length===0);});
 test("explicit resume restores acceptance and one mark",()=>{const x=delivered();x.get("off-btn").click();x.get("resume-rehearsal").click();check(!x.get("accept-btn").disabled);check(x.doc.activeElement===x.get("accept-btn"));x.get("accept-btn").click();check(x.state().shelf.length===1);check(!x.state().room.disputed);});
 test("accepted legacy snapshot still restores receipt",()=>{const x=delivered();x.get("accept-btn").click();const s=x.state();delete s.room.disputed;delete s.room.escalated;const y=create({storage:{"bespoke-gig-v5-state":JSON.stringify(s)}});check(!y.error,y.error);check(y.get("receipt").classList.contains("on"));check(y.get("accept-btn").disabled);check(y.get("shelf-list").children.length===1);});
 test("dance cannot skip forward",()=>{const x=create();x.arch(3);check(x.get("dance-board").disabled);check(x.doc.querySelectorAll(".arch").filter(a=>a.classList.contains("done")).length===0);});
 test("six dance steps finish without a seventh arch",()=>{const x=create();for(let i=0;i<6;i++)x.arch(i);check(!x.get("dance-board").disabled);x.arch(0);check(!/Arch 7/.test(x.get("dance-msg").textContent));check(/all six steps/.test(x.get("dance-msg").textContent));});
 test("dance stage is exposed to assistive technology and reset restores it",()=>{const x=create();x.arch(0);const arches=x.doc.querySelectorAll(".arch");check(arches[1].getAttribute("aria-current")==="step");check(/completed/.test(arches[0].getAttribute("aria-label")));x.get("dance-reset").click();check(arches[0].getAttribute("aria-current")==="step");check(!/completed/.test(arches[0].getAttribute("aria-label")));});
 test("reduced motion disables scripted smooth scroll and bloom",()=>{const x=create({reduced:true});x.post();check(x.scrolls.at(-1).behavior==="auto");x.get("enter-btn").click();check(!x.get("bloom").classList.contains("go"));});
 test("Quiet disables scripted smooth scrolling",()=>{const x=create();x.get("quiet-btn").click();x.post();check(x.scrolls.at(-1).behavior==="auto");});
 test("live reduced-motion change is honored on next action",()=>{const x=create();x.media.matches=true;x.post();check(x.scrolls.at(-1).behavior==="auto");});
 test("ordinary-motion scrolling remains available",()=>{const x=create();x.post();check(x.scrolls.at(-1).behavior==="smooth");});

 test("storage recovery clears stale save failure while preserving drafts",()=>{const options={writeDenied:true};const x=create(options);x.post();options.writeDenied=false;x.post("Second brief");check(x.state().posted.length===2);check(!/could not save/.test(x.get("demo-storage-status").textContent));check(/saved in this browser/.test(x.get("posted-msg").textContent));});
 test("author name constructor is handled as an ordinary repeat-pair name",()=>{const x=create();x.get("g-name").value="constructor";x.post();x.propose();x.get("fund-btn").click();check(x.state().room.quote.pairVol===0);x.get("deliver-btn").click();x.get("accept-btn").click();check(x.state().pairs.constructor===120);});
 return results;
}

const path=process.argv[2];
if(!path) throw new Error("Usage: node v5-regressions.mjs /path/to/bespoke-v5/index.html");
const bytes=fs.readFileSync(path), full=bytes.toString("utf8");
const html=full.replace(/data:image\/[^"'\s)]+/g,"[embedded image omitted]");
const script=html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i)?.[1];
if(!script) throw new Error("Expected the existing v5 inline script");
const results=runSuite(fixture,script,html);
const report={
  sourcePath:path,sourceSHA256:crypto.createHash("sha256").update(bytes).digest("hex"),
  engine:"Synthetic DOM/storage/download fixture executing actual inline script; not browser QA",
  pass:results.filter(r=>r.pass).length,fail:results.filter(r=>!r.pass).length,results
};
console.log(JSON.stringify(report,null,2));
if(report.fail)process.exitCode=1;
