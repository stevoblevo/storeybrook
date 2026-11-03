export const BRIEFS = [
  {n:1,  clip:"opening",        moment:"Opening — the question before any answer",   note:"A question, folded open.",
   imgs:[{src:"art-drafts/01-opening-question.png", label:"Draft 01"}]},
  {n:2,  clip:"hail · i",       moment:"Hail (A) — the storm hits",                  note:"The storm nobody forecast.",
   imgs:[{src:"art-drafts/02-hail-storm.png", label:"Draft 02"}]},
  {n:3,  clip:"hail · ii",      moment:"Hail (B) — the dent afterwards",             note:"A dent can remain.",
   imgs:[{src:"art-drafts/03-hail-dent.png", label:"Original 03"},
         {src:"art-drafts/03b-hail-dent-redo.png", label:"Redo 03b", recommended:true}]},
  {n:4,  clip:"knowledge · i",  moment:"Knowledge (A) — forecasts that help",        note:"Useful knowledge, honestly held.",
   imgs:[{src:"art-drafts/04-knowledge-satellite.png", label:"Draft 04"}]},
  {n:5,  clip:"knowledge · ii", moment:"Knowledge (B) — where the map stops",        note:"Every map has an edge.",
   imgs:[{src:"art-drafts/05-knowledge-maps-edge.png", label:"Draft 05"}]},
  {n:6,  clip:"thesis",         moment:"Thesis — enough to live, not enough to control", note:"The sheet will not lie flat.",
   imgs:[{src:"art-drafts/06-thesis-unflattenable-sheet.png", label:"Draft 06"}]},
  {n:7,  clip:"wisdom · i",     moment:"Wisdom (A) — “I will be wise”: the reach",   note:"Reaching is not grasping.",
   imgs:[{src:"art-drafts/07-wisdom-the-reach.png", label:"Draft 07"}]},
  {n:8,  clip:"wisdom · ii",    moment:"Wisdom (B) — far off and deep",              note:"Deep, very deep.",
   imgs:[{src:"art-drafts/08-wisdom-far-off-deep.png", label:"Draft 08"}]},
  {n:9,  clip:"weather · i",    moment:"Weather (A) — climate is what you expect",   note:"The world, working as designed.",
   imgs:[{src:"art-drafts/09-weather-expected.png", label:"Draft 09"}]},
  {n:10, clip:"weather · ii",   moment:"Weather (B) — weather is what you get",      note:"What we get.",
   imgs:[{src:"art-drafts/10-weather-got.png", label:"Draft 10"}]},
  {n:11, clip:"schemes",        moment:"Schemes — our little schemes",               note:"Little plans, tightly folded.",
   imgs:[{src:"art-drafts/11-schemes-paper-ring.png", label:"Draft 11"}]},
  {n:12, clip:"power",          moment:"Power — a crown cannot command the wind",    note:"Wind does not take orders.",
   imgs:[{src:"art-drafts/12-power-crown-wind.png", label:"Original 12"},
         {src:"art-drafts/12b-power-crown-wind-redo.png", label:"Redo 12b", recommended:true}]},
  {n:13, clip:"trust · i",      moment:"Trust (A) — lay down your schemes",          note:"Hands open, plans down.",
   imgs:[{src:"art-drafts/13-trust-lay-down-schemes.png", label:"Draft 13"}]},
  {n:14, clip:"trust · ii",     moment:"Trust (B) — enough for the next step",       note:"Light for one step is enough.",
   imgs:[{src:"art-drafts/14-trust-light-one-step.png", label:"Draft 14"}]},
  {n:15, clip:"faithful · i",   moment:"Faithful (A) — not abandoned",               note:"Unanswered is not abandoned.",
   imgs:[{src:"art-drafts/15-faithful-not-abandoned.png", label:"Draft 15"}]},
  {n:16, clip:"faithful · ii",  moment:"Faithful (B) — one small next step",         note:"Still here. One step.",
   imgs:[{src:"art-drafts/16-faithful-one-small-step.png", label:"Draft 16"}]}
];
// Semantic cue boundaries in the existing edited-excerpt timeline, not original
// recording timestamps. Source time = clip.source_in + (at - clip.start).
// Opening is editorial cover art; it has no invented spoken passage.
const cues = [[0, null, ["An open paper map, a crane and folded mountains beneath a warm faceted moon."]], [0, 3.5, ["Paper hailstones and torn leaves fall around a tan folded car."]], [0, 22.26, ["A small green dented paper car rests among scattered leaves.", "A tan folded car with a dented roof rests in the quiet after the storm."]], [1, 37.95, ["A paper satellite dish sends dotted signals past a crane toward the mountains."]], [1, 58.200562, ["A folded river map ends at a torn edge, beyond which the mountains continue."]], [1, 67.8, ["A creased sheet refuses to lie flat; a crane stands on its raised edge."]], [1, 71.95, ["A folded paper hand reaches toward a crown beyond its grasp."]], [1, 81.360562, ["Folded mountains surround a deep dark valley, with a crown below and a crane above."]], [1, 87.9, ["Ordered paper clouds float over an even winding river."]], [1, 95.913312, ["Torn clouds, hailstones and scattered leaves interrupt a jagged paper river."]], [2, 120.9, ["A tightly folded paper ring encloses a small crown beneath a hovering crane."]], [2, 143.65, ["Dotted wind lines pass through a gold paper crown.", "An open gold paper crown casts a shadow as wind lines flow through it."]], [4, 238.15, ["Small folded plans lie scattered beside a river and a glowing lantern."]], [4, 253.420364, ["A warm lantern lights one section of a folded path beside a paper crane."]], [4, 258.99, ["A lit paper path continues past an open stone doorway through folded hills."]], [4, 272.100365, ["A small lantern and paper crane stand together at the next fold in a path."]]];
export const MOMENTS = BRIEFS.map((b,i)=>({...b, chapter:cues[i][0], at:cues[i][1], clipId:b.clip.split(' · ')[0], imgs:b.imgs.map((im,j)=>({...im,alt:cues[i][2][j]}))}));
// The wall contains no gospel brief. Retain this source-specific interlude.
MOMENTS.splice(12,0,{n:'gospel',chapter:3,at:178.35,clipId:'gospel',moment:'Gospel — Christ’s death and resurrection',note:'The Christian centre of this sermon.',imgs:[{src:'../malachi-site/art/morning.svg',label:'Original vector scene',alt:'A paper cross and an open tomb, with a path leading into morning light.'}]});
