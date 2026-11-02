# Media not duplicated in this staging tree

This tree is a faithful copy of the repo's site files for review of the
four-places pass. Only **two** unchanged binary items are not duplicated
here, because the GitHub connector refuses files above ~1 MB
("too large to display", no blob returned). Copy them from a normal
repo checkout before running the site:

- `reference/image(20261031-023436).png` — the supplied Aesthete portrait
  (1,531,132 bytes; never repainted)
- `edited-excerpts.mp3` (root) — the 4:41.62 edited cut (3,380,300 bytes)

Everything else — HTML, CSS, JS, SVG scenery, vendor toolkit files, the
bundled fonts, all 10 excerpt clips and the noscript SRT — is present
and verified against the repo: fonts by git blob SHA (Sans.ttf blob
`adbfc467…` matches the connector's stated SHA) and by repo-listed byte
sizes, clips by repo-listed byte sizes (10/10 match).
