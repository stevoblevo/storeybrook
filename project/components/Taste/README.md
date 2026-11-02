# Taste

`Storeybrook.taste()` reads a rendered page against this brand book and against the tells that make a page look generated, and returns what it finds, each with the rule, a sample and the fix. It never changes anything.

**Provide** nothing. Open a page with `?sb-taste` in its address and `Storeybrook.init()` shows the findings in a small panel (bottom left). Or call `Storeybrook.taste({ scope, log })` → `[{ rule, severity: 'warn' | 'info', count, sample, fix }]`, and `Storeybrook.taste.badge(findings)` to show them.

| Rule | Looks for | Chapter |
|---|---|---|
| `letterspaced-caps` | all-caps labels and letter-spaced eyebrows (Comix and its balloons excepted) | Type |
| `exclamation`, `emoji`, `words-to-leave-out` | "!" outside Comix, emoji, "Oops", "simply", "just" in a button | Writing |
| `button-names` | Start, Go, Submit, Next, Continue, Listen, Rewards… and the name to use instead | Writing |
| `lock-without-why` | a lock or a locked look with no reason | Rewards and progression |
| `dark-pattern` | "only today", "hurry", "streak", lives left | Rewards and progression |
| `too-many-washes`, `gamboge-text`, `story-alignment` | six washes or more; gamboge text on light paper; centered or justified story | Paper, Color, Type |
| `identical-tiles`, `mode-stack`, `becomes-slogan`, `diminutive-tic`, `stock-face`, `unnamed-control` | the generated tells shared with Depthfield's Taste | Taste |

- Run it in each look you ship, Meta Daylight first; the gamboge and caps rules depend on the look.
- `warn` breaks a rule written in this book; `info` is a second look. A page can ship with an `info` it means.

**Accessibility**: the panel is a `<details>` of text, shown only when asked for. It is a tool for authors, never for readers.
