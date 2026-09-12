# AGENTS.md — Working rules for AI coding agents

This file governs how any AI agent (Claude Code, etc.) works in this repository.
**Read it fully before making changes.** The site owner is **non-technical, will
never read the code, and will not review your diffs.** You are effectively
unsupervised — so correctness, consistency, and self-verification are on you.

---

## 0. How the owner will talk to you

She describes what she wants in plain English ("make the homepage headline
bigger", "add a photo here", "change the About text"). Your job:

- **Interpret intent, then act.** Don't ask her to make technical decisions
  (frameworks, file structure, CSS approaches) — decide using this file.
- **Explain what you did in plain language**, not code. One or two sentences:
  "I made the headline larger and checked it still fits on phones."
- **Always verify your own work visually before saying it's done** (see §10).
  She can't catch mistakes for you.
- **Never leave the site in a broken state.** If a change doesn't work, revert
  it rather than shipping something half-done.
- **She does not use git.** You publish for her (see §11) — but ONLY after she
  gives an explicit go-ahead. By default, make changes locally and let her
  preview them first; do not commit or push until she says to.

---

## 1. What this project is

A **static personal portfolio website** for Madeline Heller (art historian /
curator). Plain HTML, CSS, and vanilla JavaScript. **No framework, no build
step, no server.** It is hosted free on **GitHub Pages**, which can only serve
static files.

Pages: Home, Info, Virtual Exhibition, Dissertation, Migration Portfolio,
The Inheritance of Post-Maoism, Hallockville.

---

## 2. Golden rules (non-negotiable)

1. **Stay static.** No backend, no Node build, no bundlers, no server-side code,
   no databases. It must run by opening the HTML files directly. Anything that
   needs a server will silently fail on GitHub Pages.
2. **No build tooling.** Do not introduce npm/webpack/Vite/React/Tailwind-CLI/
   Sass compilers/etc. If a library is truly needed, load it from a CDN via a
   `<script>`/`<link>` tag — but prefer writing plain code.
3. **Use relative links only** (`info.html`, `css/tokens.css`,
   `assets/images/x.jpg`). Never use leading-slash absolute paths (`/info.html`)
   — the site lives in a subfolder on GitHub Pages and absolute paths break it.
4. **Don't rename or move existing files** (HTML pages, `css/`, `js/site.js`)
   unless explicitly asked. Pages link to each other by filename and the nav is
   generated from those names.
5. **Keep all pages consistent.** They share one design system and one nav.
   A change to shared structure must work on every page.
6. **Every change must be responsive and work in both light and dark contexts.**
   See §7.
7. **Verify before finishing.** See §10. Never report success without checking.

---

## 3. Repository map

```
index.html                 Home
info.html                  Info (résumé-style)
virtual-exhibition.html    Project page
dissertation.html          Project page (placeholder copy)
migration-portfolio.html   Project page
post-maoism.html           Project page (placeholder copy)
hallockville.html          Project page (placeholder copy)

css/
  tokens.css       Design tokens — colors, fonts, spacing. EDIT HERE to re-theme.
  base.css         Reset + page themes (theme-home / theme-info / theme-project).
  components.css   Nav, footer, buttons, cards, wave dividers, placeholders.
  pages.css        Per-page layouts (hero, info, project).

js/
  site.js          Injects the shared nav + footer; mobile menu; active link.

assets/images/     Real images go here.
robots.txt         Search-engine visibility control (see §8).
.nojekyll          Tells GitHub Pages not to run Jekyll. Leave it.
```

Pages that say "placeholder copy" contain **lorem ipsum** — replace with real
text when the owner provides it, don't invent biographical facts.

---

## 4. The shared nav & footer live in ONE place

The navigation bar and footer are **not** written into each HTML file. Each page
has `<div data-nav></div>` and `<div data-footer></div>`, and
[`js/site.js`](js/site.js) replaces them at load time.

- To change **nav links**, edit the `NAV_LINKS` array in `js/site.js`.
- To change **contact info or social links** (footer), edit the `CONTACT` and
  `SOCIAL` objects in `js/site.js`.
- **If you add a new page**, add it to `NAV_LINKS` so it appears in the nav, and
  copy the `<head>`, `<div data-nav>`, and `<div data-footer>` boilerplate from
  an existing page so it inherits everything.

Never hand-write a `<nav>` into a single page — it will desync from the others.

---

## 5. Design system — change tokens, not scattered values

All colors, fonts, and spacing are CSS variables in
[`css/tokens.css`](css/tokens.css). **Use the existing variables**
(`var(--c-lilac)`, `var(--sp-4)`, `var(--font-serif)`, etc.) instead of
hard-coding hex colors, pixel spacing, or font names in page HTML/CSS.

- Re-theming the whole site = editing values in `tokens.css`.
- Fonts are Google Fonts (Cormorant Garamond, EB Garamond, Inter, plus Asset for
  the hero word). If the owner wants different typefaces, swap the `<link>` in
  each page's `<head>` and the `--font-*` tokens.
- The three page "themes" (`theme-home`, `theme-info`, `theme-project` on the
  `<body>`) set background/nav colors. Reuse them; don't invent per-page colors.

Prefer editing CSS files over inline `style="..."`. Some inline styles exist for
one-offs; if you find yourself repeating one, promote it to a class in the right
CSS file.

---

## 6. Editing content & images

- **Text:** edit the visible copy inside the relevant page's `<main>`. Keep the
  existing HTML structure/classes intact.
- **Images:** put files in `assets/images/`, then replace a placeholder
  `<div class="placeholder">…</div>` with:
  ```html
  <img src="assets/images/her-photo.jpg" alt="Descriptive alt text">
  ```
  - **Always write meaningful `alt` text** (what the image shows).
  - Keep images reasonably sized — a full-width photo over ~2500px wide or a
    file over ~1–2 MB should be downscaled first. GitHub Pages has no image
    optimization; large files make the site slow.
  - Prefer `.jpg` for photos, `.png`/`.svg` for graphics/logos, `.webp` if small.
- **Documents (e.g. dissertation PDF):** anything committed to this repo is
  **publicly downloadable** (see §8). Confirm with the owner before adding a PDF
  she may not want public. If she wants it gated, link out to an
  access-controlled host instead of committing the file.

---

## 7. Accessibility & responsive — required, not optional

Because no human reviews the output, these are hard requirements for every change:

- **Responsive:** must look right from ~360px (phone) up to large desktop. Use
  the existing fluid tokens (`clamp(...)`), flexbox/grid, and `max-width:100%`
  on media. Never cause horizontal page scrolling. Test at a narrow width.
- **Mobile nav:** the hamburger menu (in `site.js`/`components.css`) must keep
  working — don't break it when touching the nav.
- **Contrast:** text must be readable on its background in both the dark
  (black/taupe) and light (cream) sections.
- **Semantics:** use real headings in order (`h1` → `h2` → `h3`), `<button>` for
  actions, `<a>` for links, `alt` on images, labels on any form fields.
- **Keyboard:** interactive things must be reachable/operable by keyboard; keep
  the `:focus-visible` outline that exists in `base.css`.
- **Motion:** respect the existing `prefers-reduced-motion` handling; don't add
  animations that ignore it.

---

## 8. SEO / visibility — the site is currently HIDDEN

**Right now this site is deliberately kept out of Google and other search
engines** while it's a work in progress. Two mechanisms do this:

1. `<meta name="robots" content="noindex, nofollow">` in the `<head>` of **every**
   HTML page.
2. `robots.txt` at the repo root with `Disallow: /`.

Important consequences:
- If you **add a new page**, add the same `noindex` meta tag to its `<head>` so
  it stays hidden and consistent.
- The site is still reachable by anyone who has the URL — `noindex` only stops
  search *listing*, it is not a password/privacy wall. Do not describe it as
  "private" to the owner; describe it as "not showing up in Google yet."

### Turning search visibility back ON (when she's ready to launch publicly)
When the owner says she wants the site to be findable on Google, do all of this:
1. **Remove** the `<meta name="robots" content="noindex, nofollow">` line from
   every HTML page.
2. **Edit `robots.txt`** to allow crawling:
   ```
   User-agent: *
   Disallow:
   ```
3. Consider adding a `sitemap.xml` and real `<title>`/`<meta name="description">`
   per page (titles already exist; keep them accurate).
4. Tell her it can take days/weeks for Google to index a new site.

---

## 9. What will NOT work here (don't attempt without flagging)

These need a server or paid service — GitHub Pages can't do them. If asked,
explain the limitation and offer the free static-compatible workaround:

- **Contact / signup forms** → no server to receive them. Use a free third-party
  form service (e.g. Formspree) whose endpoint the form posts to. Confirm before
  wiring one up (it involves an external account).
- **E-commerce / payments / bookings** → require a hosted service (Stripe,
  Snipcart, etc.). Not free/static.
- **Logins, user accounts, private/gated pages, databases, server-side search.**
- **Anything reading secrets/API keys** — never commit keys; they'd be public.

For genuinely private content, link out to an access-controlled host rather than
building it here.

---

## 10. Verify before you finish (mandatory)

You are the last line of defense. Before telling the owner a change is done:

1. **Preview it.** Serve the site and open the affected page(s):
   ```bash
   cd ~/Desktop/madeline-heller-website && python3 -m http.server 8000
   ```
   (then open http://localhost:8000). Use a browser tool to screenshot and
   actually look at the result.
2. **Check the page you changed AND at least one other page** (shared nav/footer
   changes affect all pages).
3. **Check a narrow/mobile width** and a wide desktop width.
4. **Check the browser console for errors** (a broken `site.js` means no nav/footer
   on every page).
5. Confirm no horizontal scrolling, no overlapping text, links still work.

If anything is off, fix it before reporting. Don't claim success you didn't see.

### 10.1 Letting her preview on localhost
When she wants to see the current state ("show me", "let me see it", "open it"),
start the local preview server and give her the link to open:
```bash
cd ~/Desktop/madeline-heller-website && python3 -m http.server 8000
```
Tell her to open **http://localhost:8000** in her browser, and that this preview
is private to her computer — nothing is public until she asks you to publish. If
port 8000 is busy, use 8001. Leave the server running while she reviews; she can
refresh the page after you make more changes.

---

## 11. Publishing changes — YOU do the git, and ONLY on her go-ahead

**The owner does not know git and will never run git commands.** Publishing is
your job. But it is **not** automatic.

**Default: iterate locally.** Make the change, verify it (§10), let her preview
it on localhost (§10.1). **Do NOT commit or push until she explicitly tells you
to.** Localhost is private to her computer; nothing is public until you push.

**When she gives the go-ahead, publish:**

```bash
cd ~/Desktop/madeline-heller-website
git add -A
git commit -m "Short plain-English description of what changed"
git push
```

Then tell her in one sentence, e.g. *"Published — it'll be live in about a
minute."* Within ~1 minute GitHub Pages redeploys automatically.

Phrases that mean "publish now / go-ahead to push": *"publish", "make it live",
"put it online", "push it", "ship it", "update the live site", "deploy",
"looks good, publish".* If she only says a change looks good but doesn't ask to
publish, keep iterating — don't push yet. If in doubt, ask: *"Want me to publish
this so it goes live?"*

Rules:
- **Only publish a verified, working change.** If something is broken, fix or
  revert first — never push a broken site (§2.7, §10). A bad push goes live.
- Keep commits focused; write plain-English commit messages.
- **Never** commit secrets, tokens, API keys, or large unneeded binaries.
- **Never** force-push or rewrite history unless she explicitly asks.
- If a push fails on authentication, do NOT ask her for a password or token in
  chat. Tell her: *"The GitHub login for pushing has expired — you'll need a
  developer to refresh it,"* and stop. (Auth is stored in the macOS keychain by
  whoever set the project up.)

### If git isn't set up yet in a fresh copy
If `git push` fails because there's no remote or no auth, the repo may be a fresh
clone. Report this plainly rather than guessing credentials — a developer needs
to connect it once.

---

## 12. Definition of done

A change is done only when ALL are true:
- [ ] Matches what she asked for, in plain terms.
- [ ] Static, relative-pathed, no build step introduced.
- [ ] Uses existing design tokens/classes; shared nav/footer untouched or updated
      in `site.js` only.
- [ ] Responsive (phone → desktop), readable contrast, accessible markup.
- [ ] New pages carry the `noindex` meta tag while the site is hidden.
- [ ] Previewed in a browser on desktop + mobile widths; no console errors.
- [ ] Explained to her in one or two plain sentences.
