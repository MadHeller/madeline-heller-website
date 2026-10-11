# Project rules

Follow all guardrails in @AGENTS.md for every change in this repository.

Key reminders (full detail in AGENTS.md):
- The owner is non-technical and will not read code — verify your own work.
- She does not use git. Iterate locally and let her preview on localhost first;
  commit + push ONLY when she gives an explicit go-ahead ("publish/make it live") (§11).
- Static site only (GitHub Pages). No backend, no build step. Relative paths.
- The site is visible to search engines; add new pages to `sitemap.xml` (§8).
- Shared nav/footer live only in `js/site.js`. Design tokens live in `css/tokens.css`.
- Always preview and check mobile + desktop before finishing.
