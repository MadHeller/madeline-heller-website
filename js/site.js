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
  var NAV_LINKS = [
    { label: "Home",                         href: "index.html" },
    { label: "Info",                         href: "info.html" },
    { label: "Virtual Exhibition",           href: "virtual-exhibition.html" },
    { label: "Dissertation",                 href: "dissertation.html" },
    { label: "Migration Portfolio",          href: "migration-portfolio.html" },
    { label: "The Inheritance of Post-Maoism", href: "post-maoism.html" },
    { label: "Hallockville",                 href: "hallockville.html" }
  ];

  var CONTACT = {
    email: "Madeline-Heller@outlook.com",
    phone: "+1 (631) 559 - 9364  /  +44 7312 134728",
    location: "New York & London"
  };

  var SOCIAL = [
    { label: "Instagram", href: "https://www.instagram.com/maddy_heller_/?hl=en" },
    { label: "Email",     href: "mailto:Madeline-Heller@outlook.com" },
    { label: "LinkedIn",  href: "https://www.linkedin.com/in/madeline-heller-95a119304" }
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

    var links = NAV_LINKS.map(function (l) {
      var active = l.href === page ? " is-active" : "";
      var aria = active ? ' aria-current="page"' : "";
      return '<a class="site-nav__link' + active + '" href="' + l.href + '"' + aria + '>' + l.label + "</a>";
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
    toggle.addEventListener("click", function () { setOpen(!panel.classList.contains("is-open")); });
    backdrop.addEventListener("click", function () { setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });

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
        '<p class="site-footer__row">' + CONTACT.phone + "</p>" +
        '<p class="site-footer__row">' + CONTACT.location + "</p>" +
        '<div class="site-footer__meta">' +
          '<span class="site-footer__made">© ' + new Date().getFullYear() + " Madeline Heller</span>" +
          '<nav class="site-footer__social" aria-label="Social">' + social + "</nav>" +
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
