/* four-places.js — the site's own layer over vendor/four-styles.
   Vendor files are unchanged (TOOLKIT-PROVENANCE.md). This script only
   listens for the controller's public `fourstyles:change` event and
   gives the switch a small ritual: a paper veil sweep (an echo of the
   chapter fold) and a place card naming where you have arrived.
   It changes no state of its own; the controller keeps your place.
   Quiet mode / reduced motion: no veil, no card animation — the card
   still names the place, briefly and still. */
(() => {
  const root = document.body;
  const veil = document.getElementById('fs-veil');
  const card = document.getElementById('fs-placecard');
  const cardName = card?.querySelector('b');
  const cardLine = card?.querySelector('span');
  const placeLine = document.getElementById('fs-place-line');
  if (!veil || !card || !cardName || !cardLine) return;

  const PLACES = {
    gen4:     ['Cinema',    'the darkened room — listen by lantern light'],
    gen2:     ['Storybook', 'the book open on the table, in daylight'],
    skeptic:  ['Evidence',  'the record, open — what is the source?'],
    semiotic: ['Symbols',   'the signs, by themselves: wind, crown, moon'],
  };
  const still = () =>
    root.dataset.fsReduced === 'true' || root.dataset.fsQuiet === 'true' ||
    matchMedia('(prefers-reduced-motion: reduce)').matches;

  let veilTimer = 0, cardTimer = 0;
  function arrive(style) {
    const place = PLACES[style];
    if (!place) return;
    cardName.textContent = place[0];
    cardLine.textContent = place[1];
    if (placeLine) placeLine.textContent = `You are in ${place[0]} — ${place[1]}.`;
    clearTimeout(veilTimer); clearTimeout(cardTimer);
    if (still()) {
      veil.classList.remove('on'); /* never strand a veil from an earlier switch */
      card.classList.add('on');
      cardTimer = setTimeout(() => card.classList.remove('on'), 2400);
      return;
    }
    veil.classList.add('on');
    card.classList.add('on');
    veilTimer = setTimeout(() => veil.classList.remove('on'), 400);
    cardTimer = setTimeout(() => card.classList.remove('on'), 3000);
  }

  root.addEventListener('fourstyles:change', e => arrive(e.detail?.style));
  const start = PLACES[root.dataset.fsStyle];
  if (start && placeLine) placeLine.textContent = `You are in ${start[0]} — ${start[1]}.`;
})();
