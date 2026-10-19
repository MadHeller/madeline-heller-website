/* Events page: switch the calendars between a list and a grid of cards. */
(function () {
  var buttons = document.querySelectorAll(".view-toggle__btn");
  var lists = document.querySelectorAll(".events");
  if (!buttons.length) return;

  function show(view) {
    lists.forEach(function (l) { l.classList.toggle("events--grid", view === "grid"); });
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.view === view)); });
    try { localStorage.setItem("eventsView", view); } catch (e) {}
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { show(b.dataset.view); });
  });

  var saved = null;
  try { saved = localStorage.getItem("eventsView"); } catch (e) {}
  if (saved === "grid") show("grid");
})();
