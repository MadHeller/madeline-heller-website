/* =========================================================================
   gallery.js — simple photo viewer (lightbox) for pages with .g-link photos.
   Click a photo to open it large; arrow keys / buttons move between photos;
   Esc or the close button returns to the page. No libraries.
   ========================================================================= */
(function () {
  "use strict";

  var links = Array.prototype.slice.call(document.querySelectorAll("a.g-link"));
  if (!links.length || typeof HTMLDialogElement === "undefined") return;

  var current = 0;
  var dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Photo viewer");
  dialog.innerHTML =
    '<div class="lightbox__stage"><img class="lightbox__img" alt=""></div>' +
    '<button type="button" class="lightbox__btn lightbox__close" aria-label="Close photo viewer">&times;</button>' +
    '<div class="lightbox__bar"><span class="lightbox__label"></span>' +
    '<span class="lightbox__nav">' +
    '<button type="button" class="lightbox__btn lightbox__prev" aria-label="Previous photo">&#8249;</button>' +
    '<button type="button" class="lightbox__btn lightbox__next" aria-label="Next photo">&#8250;</button>' +
    "</span></div>";
  document.body.appendChild(dialog);

  var img = dialog.querySelector(".lightbox__img");
  var label = dialog.querySelector(".lightbox__label");

  function show(i) {
    current = (i + links.length) % links.length;
    var a = links[current];
    var thumb = a.querySelector("img");
    img.src = a.getAttribute("href");
    img.alt = thumb ? thumb.alt : "";
    label.textContent = (a.getAttribute("data-caption") || "") + "  ·  " + (current + 1) + " / " + links.length;
  }

  function open(i) {
    show(i);
    if (!dialog.open) dialog.showModal();
  }

  links.forEach(function (a, i) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      open(i);
    });
  });

  dialog.querySelector(".lightbox__close").addEventListener("click", function () { dialog.close(); });
  dialog.querySelector(".lightbox__prev").addEventListener("click", function () { show(current - 1); });
  dialog.querySelector(".lightbox__next").addEventListener("click", function () { show(current + 1); });

  // click on the dark area (not the photo or buttons) closes
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog || e.target.classList.contains("lightbox__stage")) dialog.close();
  });

  dialog.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); show(current - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); show(current + 1); }
  });

  dialog.addEventListener("close", function () { img.removeAttribute("src"); });
})();
