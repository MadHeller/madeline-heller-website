/* Acquisitions: filter the Available Works by type.
   Each card carries data-category="paintings", "prints" or "drawings". */
(function () {
  var bar = document.querySelector('[data-acq-filter]');
  if (!bar) return;
  var section = bar.closest('section');
  var cards = [].slice.call(section.querySelectorAll('.acq-work'));
  var buttons = [].slice.call(bar.querySelectorAll('button[data-show]'));
  var status = section.querySelector('[data-acq-filter-status]');

  function matches(card, type) {
    return type === 'all' || card.getAttribute('data-category') === type;
  }

  buttons.forEach(function (button) {
    var type = button.getAttribute('data-show');
    var count = cards.filter(function (c) { return matches(c, type); }).length;
    button.appendChild(document.createTextNode(' (' + count + ')'));
    button.hidden = count === 0;
    button.addEventListener('click', function () {
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); });
      var shown = 0;
      cards.forEach(function (c) {
        c.hidden = !matches(c, type);
        if (!c.hidden) shown++;
      });
      if (status) status.textContent = 'Showing ' + shown + (shown === 1 ? ' work' : ' works');
    });
  });

  bar.hidden = false;
})();
