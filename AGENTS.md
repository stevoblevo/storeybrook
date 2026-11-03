# Working on Storeybrook (for every agent and person)

Storeybrook is the day half of Bleve's toolkit family: a light-first design system for storybook pages and little games, in six looks (Meta Daylight, Knight Night, Ink Blot, Comix, Origami, Skein silk). Depthfield is the night half; Hypermetapunk is their child. This repo holds the system (`project/`), its docs site (`docs.html`) and its showcase (`index.html`), served at <https://stevoblevo.github.io/storeybrook/>.

Read these first: the family plan at <https://github.com/stevoblevo/depthfield/blob/main/docs/family.md> (contracts and open tasks across all three systems; it has one copy, in the Depthfield repo), `docs/plan.md` (Storeybrook's own tasks, including Origami), `project/README.md` (the brand book).

## Build and check

```
python3 -I site/build.py              # compiles project/tokens.css, site/hooks.css and site/site.json
python3 -m http.server 8702           # then open http://127.0.0.1:8702/ and /docs.html
```
Run the build after any change under `project/` and commit what it writes. Before pushing, open the showcase and the docs with the console open: no errors, and no sideways scroll at 390 px.

## Rules of the road

- Take a task from `docs/plan.md` or the family plan: your name in **Who**, **Status** `doing` on your branch, `done` with the commit in the change that finishes it. One task per branch, named `<agent>/<task-id>-<topic>`; `main` carries the latest checked build.
- Mark code that belongs to a task with a short comment naming it (`/* plan O1: … */`).
- `project/` is exported from the Claude artifact. Work done here lands in `project/` and is carried back to the artifact at release (family task F8). Never re-export over `project/` without diffing first.
- Never replace a published build; add a version. Never delete another agent's branch or work; it can all be useful.
- `site/immersive.js`, `site/app.*` and `docs.html` are shared with Depthfield and Hypermetapunk: change them in all three or not at all.
- Words follow `project/08-writing.md`: sentence case, real names for things, no slogans. Run `Storeybrook.taste()` on a page you made.
- `show-tell/` and `bespoke-v5/` are other projects hosted here for now; their own rules and tests live in those folders. Do not mix design-system changes with them in one commit.
- No other studio's characters, logos or names. Music, words and art stay original.
- No credentials, services or schedules get added without Bleve's go-ahead.
