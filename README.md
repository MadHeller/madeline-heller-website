# Madeline Heller — Portfolio Website

A hand-coded static site scaffolded from the Squarespace draft, so the design
can be iterated in code and hosted free on GitHub Pages.

## Status: scaffold

UI/layout mimics the Squarespace draft. Content is a mix of real copy (Home,
Info, Virtual Exhibition, Migration Portfolio) and **lorem ipsum placeholders**
(Dissertation, The Inheritance of Post-Maoism, Hallockville — these were not in
the screenshots). All images are dashed **placeholders** to be swapped for real
assets.

## Structure

```
madeline-heller-website/
├── index.html               # Home (hero, Select Works, Latest Projects)
├── info.html                # Info (summary, experience, education, skills)
├── virtual-exhibition.html  # Project page
├── dissertation.html        # Project page (placeholder copy)
├── migration-portfolio.html # Project page
├── post-maoism.html         # Project page (placeholder copy)
├── hallockville.html        # Project page (placeholder copy)
├── css/
│   ├── tokens.css       # design tokens: colors, fonts, spacing (edit here to re-theme)
│   ├── base.css         # reset + page themes (theme-home / theme-info / theme-project)
│   ├── components.css   # nav, footer, buttons, cards, wave dividers, placeholders
│   └── pages.css        # per-page layouts (hero, info, project)
├── js/
│   └── site.js          # injects the shared nav + footer, mobile menu, active link
└── assets/images/       # drop real images here
```

### How the shared nav/footer works
Each page has `<div data-nav></div>` and `<div data-footer></div>`. `js/site.js`
replaces them with the real markup, so the navigation and footer are edited in
**one place** (the `NAV_LINKS`, `CONTACT`, and `SOCIAL` arrays at the top of
`site.js`).

## Run locally
Open `index.html` directly in a browser, or serve it:

```bash
cd madeline-heller-website
python3 -m http.server 8000
```

Then visit http://localhost:8000

## To customize
- **Colors / fonts / spacing** → `css/tokens.css`
- **Fonts** are Google Fonts (Cormorant Garamond, EB Garamond, Inter) chosen to
  approximate the Squarespace typefaces. Swap for the real ones later.
- **Images** → replace a `<div class="placeholder">…</div>` with
  `<img src="assets/images/your-file.jpg" alt="…">`.
- **Nav / footer / contact info** → `js/site.js`

## Roadmap: screenshots → live on GitHub

1. **Scaffold** (done) — layout, styling, navigation.
2. **Iterate** — swap placeholders for real copy + images, tune the design.
3. **Repo + host** — `git init`, push to a **public** GitHub repo, enable
   GitHub Pages (Settings → Pages → deploy from `main` / root).
4. **Custom domain** — add the domain in Pages settings, create DNS records at
   your registrar (A records for the apex + a CNAME for `www`). Free HTTPS.

### Roadblocks to a free launch (recap)
- GitHub Pages is **static only** — a contact form needs a free third-party
  service (e.g. Formspree). No form is wired up yet.
- Free Pages requires a **public** repo (source is visible). A private repo +
  Pages needs GitHub Pro.
- Squarespace fonts are licensed; the Google Fonts here are free stand-ins.
- Custom domain + HTTPS on Pages is free; only DNS setup is required.
```
