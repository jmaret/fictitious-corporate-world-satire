# Satyre — Fictitious Satire

A lightweight satirical cartoon gallery published at [satyre.xyz](https://satyre.xyz).

Living docs:

- [Product vision & requirements](docs/PRODUCT_VISION_AND_REQUIREMENTS.md)
- [Architecture & design](docs/ARCHITECTURE_AND_DESIGN.md)

## Vision

Satyre is a curated stage for short-form visual satire and reflective storytelling about everyday systems—especially corporate theater, civilian absurdity, and the quiet architecture of relationships. Pieces are standalone: pointed cartoons in the satire collections, and text-first chronicles that open into cartoons on click. Together they form three ongoing collections:

- **Fictitious Corporate World Satire** — meetings about meetings, performative leadership, and the quiet violence of “per my last email.”
- **Fictitious Civilian Life Satire** — errands, group chats, parking signs, and the soft bureaucracy of ordinary life.
- **Fictitious Relationship Chronicles** — reflective, sometimes funny, sometimes poignant notes on closeness and distance; verbiage leads, the cartoon is the payoff.

The product goal is simple: ship sharp work quickly, keep the experience fast and readable, and let the writing or art carry the point. The site stays deliberately small so new work can be published with minimal ceremony.

## Technical architecture

The site is a static front-end with no build step, no framework, and no backend. See [Architecture & design](docs/ARCHITECTURE_AND_DESIGN.md) for the full runtime and extension guide.

| Layer | Role |
| --- | --- |
| `index.html` | Structure: shared sticky nav, collection tab panels, cartoon/chronicle cards, image lightbox, footer |
| `style.css` | Presentation: layout, responsive gallery grid, card treatments, evening theme, modal/popover UI |
| `script.js` | Behavior: tab switching, card entrance animation, image lightbox (including forthcoming state), version popover, time-of-day theme |
| `images/` | Assets: PNG cartoons plus author/brand imagery |
| `CNAME` | Custom domain binding for GitHub Pages (`satyre.xyz`) |
| `docs/` | Product vision/requirements and architecture/design living documents |

### Runtime shape

1. **Shared shell** — Sticky nav hosts branding, collection tabs, version info, and contact, so all collections share one chrome.
2. **Collection panels** — Each tab is a self-contained panel with its own hero copy and responsive card gallery (1 / 2 / 3 columns by breakpoint).
3. **Card patterns** — Satire tabs use image + title + series label. Relationship Chronicles use text-first cards; click (or Enter/Space) opens the cartoon in the shared lightbox. Newest pieces are prepended so the first row is always the latest work.
4. **Interaction layer** — Vanilla JS powers tab swaps, lightbox zoom, chronicle forthcoming-illustration state, and a version popover. No dependencies beyond Google Fonts.
5. **Release metadata** — `SITE_VERSION` in `script.js` records version, latest-change notes, and deploy timestamp (with timezone) for the nav info control. It must be updated on **every** release to `main`.

### Delivery

- Hosted on **GitHub Pages** from the `main` branch root.
- Custom domain via `CNAME` → `satyre.xyz`.
- Changes merge to `main` and publish as static files; **always** update `SITE_VERSION` on every release (version, notes, timestamp with timezone).

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
- `images/` — cartoon and brand PNGs (`cartoon_co_*`, `cartoon_ci_*`, `cartoon_re_*`)
- `docs/` — product and architecture living documents
- `.cursor/rules/` — Cursor agent rules (docs kept in sync on change)
- `CNAME` — GitHub Pages custom domain
- `README.md` — this document
