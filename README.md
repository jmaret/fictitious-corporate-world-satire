# Satyre — Fictitious Satire

A lightweight satirical cartoon gallery published at [satyre.xyz](https://satyre.xyz).

## Vision

Satyre is a curated stage for short-form visual satire about everyday systems—especially corporate theater and civilian absurdity. Each piece is a standalone cartoon with a pointed caption; together they form two ongoing collections:

- **Fictitious Corporate World Satire** — meetings about meetings, performative leadership, and the quiet violence of “per my last email.”
- **Fictitious Civilian Life Satire** — errands, group chats, parking signs, and the soft bureaucracy of ordinary life.

The product goal is simple: ship sharp cartoons quickly, keep the experience fast and readable, and let the art carry the joke. The site stays deliberately small so new work can be published with minimal ceremony.

## Technical architecture

The site is a static front-end with no build step, no framework, and no backend.

| Layer | Role |
| --- | --- |
| `index.html` | Structure: shared sticky nav, two tab panels, cartoon cards, image lightbox, footer |
| `style.css` | Presentation: layout, responsive gallery grid, card treatments, evening theme, modal/popover UI |
| `script.js` | Behavior: tab switching, card entrance animation, image lightbox, version popover, time-of-day theme |
| `images/` | Assets: PNG cartoons plus author/brand imagery |
| `CNAME` | Custom domain binding for GitHub Pages (`satyre.xyz`) |

### Runtime shape

1. **Shared shell** — Sticky nav hosts branding, collection tabs, version info, and contact, so both collections share one chrome.
2. **Collection panels** — Each tab is a self-contained panel with its own hero copy and responsive card gallery (1 / 2 / 3 columns by breakpoint).
3. **Card pattern** — Image + title + series label; newest pieces are prepended so the first row is always the latest work.
4. **Interaction layer** — Vanilla JS powers tab swaps, lightbox zoom, and a version popover. No dependencies beyond Google Fonts.
5. **Release metadata** — `SITE_VERSION` in `script.js` records version, latest-change notes, and deploy timestamp (with timezone) for the nav info control.

### Delivery

- Hosted on **GitHub Pages** from the `main` branch root.
- Custom domain via `CNAME` → `satyre.xyz`.
- Changes merge to `main` and publish as static files; update `SITE_VERSION` when shipping noticeable updates.

## Local preview

```bash
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765/index.html`.

Or open `index.html` directly in a browser.

## GitHub Pages deployment

1. Push to the repository’s `main` branch.
2. Enable GitHub Pages from `main` / root.
3. Keep `CNAME` set to `satyre.xyz` (or your domain).
4. Point DNS with a CNAME to `jmaret.github.io`.

## Repository layout

- `index.html` — page markup and gallery content
- `style.css` — site styles
- `script.js` — interactions and release metadata
- `images/` — cartoon and brand PNGs
- `CNAME` — GitHub Pages custom domain
- `README.md` — this document
