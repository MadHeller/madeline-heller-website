/* =========================================================================
   site.js — Injects the shared nav + footer, handles active link,
   mobile menu, and scrolled-nav state.

   Edit the NAV / FOOTER data in ONE place here and every page updates.
   Each page mounts them via:
     <div data-nav></div>  ... page content ...  <div data-footer></div>
   ========================================================================= */

(function () {
  "use strict";

  /* ---- Site config ------------------------------------------------------ */
  /* A link with `children` becomes a drop-down (e.g. Portfolio). */
  var NAV_LINKS = [
    { label: "Home",                         href: "index.html" },
    { label: "About",                        href: "info.html" },
    { label: "Acquisitions",                 href: "acquisitions.html" },
    { label: "Artists",                      href: "artists.html" },
    { label: "Portfolio", children: [
      { label: "Social Media Work for Toasty Gold Inc.", href: "social-media-toasty-gold.html" },
      { label: "Dissertation",                 href: "dissertation.html" },
      { label: "Critical Debates Portfolio on Migration",          href: "migration-portfolio.html" },
      { label: "Research Paper: The Inheritance of Post-Maoism", href: "post-maoism.html" },
      { label: "Hallockville Internship",                 href: "hallockville.html" },
      { label: "Venice Biennale 2026: In Minor Keys",              href: "venice-biennale.html" },
      { label: "Virtual Exhibition Portfolio",           href: "virtual-exhibition.html" }
    ] }
  ];

  var CONTACT = {
    email: "Madeline-Heller@outlook.com",
    phone: "",   /* left blank on purpose: kept off the footer (still on the About page). To show it again: "+1 (631) 559 - 9364" */
    location: "New York & London"
  };

  var SOCIAL = [
    { label: "Instagram", href: "https://www.instagram.com/maddy_heller_/?hl=en" },
    { label: "Email",     href: "mailto:Madeline-Heller@outlook.com" },
    { label: "LinkedIn",  href: "https://www.linkedin.com/in/madeline-heller-95a119304" },
    { label: "Inquiries", href: "index.html#inquiries" },
    { label: "Acquisitions", href: "acquisitions.html" },
    { label: "Flesch on Instagram", href: "https://www.instagram.com/flesch_inc/" },
    { label: "Flesch on Threads", href: "https://www.threads.net/@flesch_inc" }
  ];

  /* ---- Helpers ---------------------------------------------------------- */
  function currentPage() {
    var path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (html != null) node.innerHTML = html;
    return node;
  }

  /* ---- Build nav -------------------------------------------------------- */
  function buildNav(mount) {
    var page = currentPage();

    function linkHtml(l, extraClass) {
      var active = l.href === page ? " is-active" : "";
      var aria = active ? ' aria-current="page"' : "";
      return '<a class="site-nav__link' + (extraClass || "") + active + '" href="' + l.href + '"' + aria + '>' + l.label + "</a>";
    }

    var links = NAV_LINKS.map(function (l, i) {
      if (!l.children) return linkHtml(l);
      var inGroup = l.children.some(function (c) { return c.href === page; });
      var id = "nav-group-" + i;
      return '<div class="site-nav__group' + (inGroup ? " is-current" : "") + '">' +
          '<button class="site-nav__link site-nav__group-toggle' + (inGroup ? " is-active" : "") + '" type="button" aria-expanded="false" aria-controls="' + id + '">' +
            l.label +
            '<svg class="site-nav__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
          "</button>" +
          '<div class="site-nav__sub" id="' + id + '">' +
            l.children.map(function (c) { return linkHtml(c, " site-nav__sublink"); }).join("") +
          "</div>" +
        "</div>";
    }).join("");

    var nav = el("nav", { class: "site-nav", "aria-label": "Primary" });
    nav.innerHTML =
      '<div class="site-nav__inner">' +
        '<a class="site-nav__brand" href="index.html" aria-label="Madeline Heller — home">Madeline<br>Heller</a>' +
        '<button class="site-nav__toggle" aria-label="Open menu" aria-expanded="false">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" aria-hidden="true">' +
            '<line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>' +
          "</svg>" +
        "</button>" +
        '<div class="site-nav__links" id="nav-links">' + links + "</div>" +
      "</div>";

    mount.replaceWith(nav);

    var backdrop = el("div", { class: "nav-backdrop" });
    document.body.appendChild(backdrop);

    /* Mobile menu toggle */
    var toggle = nav.querySelector(".site-nav__toggle");
    var panel  = nav.querySelector(".site-nav__links");
    function setOpen(open) {
      panel.classList.toggle("is-open", open);
      backdrop.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    toggle.addEventListener("click", function () {
      var open = !panel.classList.contains("is-open");
      /* In the side menu, show the Portfolio pages already expanded when you're on one */
      if (open) groups.forEach(function (g) { setGroupOpen(g, g.classList.contains("is-current")); });
      setOpen(open);
    });
    backdrop.addEventListener("click", function () { setOpen(false); });

    /* Drop-down groups (Portfolio) */
    var groups = Array.prototype.slice.call(nav.querySelectorAll(".site-nav__group"));
    function setGroupOpen(g, open) {
      g.classList.toggle("is-open", open);
      g.querySelector(".site-nav__group-toggle").setAttribute("aria-expanded", String(open));
    }
    groups.forEach(function (g) {
      g.querySelector(".site-nav__group-toggle").addEventListener("click", function () {
        setGroupOpen(g, !g.classList.contains("is-open"));
      });
    });
    document.addEventListener("click", function (e) {
      if (panel.classList.contains("is-open")) return;   /* side menu: leave groups as the visitor set them */
      groups.forEach(function (g) { if (!g.contains(e.target)) setGroupOpen(g, false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var openGroup = groups.filter(function (g) { return g.classList.contains("is-open"); })[0];
      if (openGroup && !panel.classList.contains("is-open")) {
        setGroupOpen(openGroup, false);
        openGroup.querySelector(".site-nav__group-toggle").focus();
      } else {
        setOpen(false);
      }
    });

    /* Scrolled state */
    function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 24); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Build footer ----------------------------------------------------- */
  function buildFooter(mount) {
    var social = SOCIAL.map(function (s) {
      var ext = /^https?:/.test(s.href) ? ' target="_blank" rel="noopener"' : "";
      return '<a href="' + s.href + '"' + ext + ">" + s.label + "</a>";
    }).join("");

    var footer = el("footer", { class: "site-footer" });
    footer.innerHTML =
      '<div class="container">' +
        '<p class="site-footer__name">Madeline Heller</p>' +
        '<p class="site-footer__row"><a class="link" href="mailto:' + CONTACT.email + '">' + CONTACT.email + "</a></p>" +
        (CONTACT.phone ? '<p class="site-footer__row">' + CONTACT.phone + "</p>" : "") +
        '<p class="site-footer__row">' + CONTACT.location + "</p>" +
        '<div class="site-footer__meta">' +
          '<span class="site-footer__made">© ' + new Date().getFullYear() + " Madeline Heller</span>" +
          '<nav class="site-footer__social" aria-label="Contact and links">' + social + "</nav>" +
        "</div>" +
      "</div>";
    mount.replaceWith(footer);
  }

  /* ---- Init ------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var navMount = document.querySelector("[data-nav]");
    if (navMount) buildNav(navMount);
    var footMount = document.querySelector("[data-footer]");
    if (footMount) buildFooter(footMount);
  });
})();
