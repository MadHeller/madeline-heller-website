# Madeline Heller — Portfolio Website

A hand-coded static site for Madeline Heller — built so the design can be
iterated in code and hosted free on GitHub Pages.

## Status: scaffold

Content is a mix of real copy (Home, Info, Virtual Exhibition, Migration
Portfolio) and **lorem ipsum placeholders** (Dissertation, The Inheritance of
Post-Maoism, Hallockville). All images are dashed **placeholders** to be swapped
for real assets.

## How to work on this site (no coding needed)

You don't need to know any code or git. You describe what you want to Claude
Code, preview it privately on your own computer, and only publish when you're
happy. Here's the loop:

### 1. Ask for a change
Open this project in Claude Code and just say what you want in plain English —
for example:
- "Make the homepage headline smaller."
- "Add my photo to the About page."
- "Change the Dissertation text to this: …"

Claude makes the change on your computer only. **Nothing is public yet.**

### 2. Preview it on your computer (localhost)
"Localhost" just means a private preview that only exists on your Mac — no one
else can see it. Two ways to open it:

**Easiest:** say to Claude *"show me the site"* (or "let me see it"). It will
start the preview and give you a link like **http://localhost:8000** — open that
in your web browser (Safari/Chrome).

**Manual (if you prefer):** open the **Terminal** app and paste this line, then
press Return:
```bash
cd ~/Desktop/madeline-heller-website && python3 -m http.server 8000
```
Then open **http://localhost:8000** in your browser.
- Leave that Terminal window open while you're previewing.
- After Claude makes more changes, just **refresh** the browser tab to see them.
- To stop the preview, click the Terminal window and press **Control + C**.
- If it says the port is "in use," use `8001` instead and open
  http://localhost:8001.

### 3. Keep tweaking
Go back to step 1 as many times as you like. Preview, refine, repeat. Still
nothing is public.

### 4. Publish when you're ready
When it looks right and you want it live on the internet, tell Claude
**"publish it"** (or "make it live"). It will put the changes online for you;
the live site updates in about a minute. Claude will **not** publish until you
say so.

> **Heads up:** the site is currently **hidden from Google on purpose** while
> it's a work in progress (see the SEO section below). When you're ready for the
> world to find it, tell Claude *"make the site show up on Google."*

---

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
- **Fonts** are Google Fonts (Cormorant Garamond, EB Garamond, Inter, plus Asset
  for the hero word). Swap for other typefaces later if desired.
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
- The display fonts here are free Google Fonts; if you ever want a licensed brand
  font, it must be one you're licensed to self-host.
- Custom domain + HTTPS on Pages is free; only DNS setup is required.
```
