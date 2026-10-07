/* =========================================================================
   contact.js — sends the inquiry form to a form service (e.g. Formspree).
   The service's link goes in the form's data-endpoint attribute (index.html).
   If no link is set yet, or sending fails, visitors are asked to email directly.
   No libraries; works on GitHub Pages (static hosting).
   ========================================================================= */
(function () {
  "use strict";

  var form = document.querySelector("form.inquiry");
  if (!form) return;

  var EMAIL = "Madeline-Heller@outlook.com";
  var endpoint = (form.getAttribute("data-endpoint") || "").trim();
  var status = form.querySelector(".inquiry__status");
  var button = form.querySelector('button[type="submit"]');
  var buttonLabel = button.textContent;

  // Only fixed text goes through innerHTML here (nothing typed by visitors).
  var EMAIL_LINK = '<a class="link" href="mailto:' + EMAIL + '">' + EMAIL + "</a>";

  function say(html, kind) {
    status.className = "inquiry__status inquiry__status--" + kind;
    status.innerHTML = html;
  }

  // "Inquire about this work" buttons (Acquisitions page) fill in the form for the visitor.
  var workButtons = document.querySelectorAll("a[data-work]");
  Array.prototype.forEach.call(workButtons, function (a) {
    a.addEventListener("click", function () {
      if (form.elements["work_or_artist"]) form.elements["work_or_artist"].value = a.getAttribute("data-work");
      if (form.elements["inquiry_type"]) form.elements["inquiry_type"].value = "A work listed above";
      // after the page scrolls to the form, put the cursor in the message box
      setTimeout(function () {
        var msg = form.elements["message"];
        if (msg) msg.focus({ preventScroll: true });
      }, 400);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Spam trap: real visitors never see or fill this field.
    if (form.elements["_gotcha"] && form.elements["_gotcha"].value) {
      say("Thank you! Your message has been sent.", "ok");
      form.reset();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!endpoint) {
      say("This form isn&rsquo;t switched on yet. Please email me at " + EMAIL_LINK + ".", "error");
      return;
    }

    button.disabled = true;
    button.textContent = "Sending…";
    say("", "info");

    fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        say("Thank you! Your message has been sent. I&rsquo;ll be in touch soon.", "ok");
        form.reset();
      })
      .catch(function () {
        say("Sorry, that didn&rsquo;t go through. Please email me at " + EMAIL_LINK + " instead.", "error");
      })
      .then(function () {
        button.disabled = false;
        button.textContent = buttonLabel;
      });
  });
})();
