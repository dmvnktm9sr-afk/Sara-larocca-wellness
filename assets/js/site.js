/* Sara Larocca Wellness - site behaviour */
var CONFIG = {
  // Sara's email address. Booking requests and newsletter sign-ups are sent here
  // (through the visitor's own email app) until Cal.com / a newsletter tool is connected.
  email: "hello@saralaroccawellness.com",

  // When Sara's Cal.com account is ready, put her Cal.com link here,
  // e.g. "saralarocca" (shows both session types) or "saralarocca/in-person".
  // Leave it empty to keep the "request a time" form.
  calLink: ""
};

(function () {
  var sv = document.documentElement.lang === 'sv';

  // Session flow: In person / At a distance
  var tabs = document.querySelectorAll('.flow-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var want = tab.getAttribute('data-flow');
      tabs.forEach(function (t) { t.setAttribute('aria-pressed', String(t === tab)); });
      document.querySelectorAll('[data-flow-panel]').forEach(function (p) {
        p.hidden = p.getAttribute('data-flow-panel') !== want;
      });
    });
  });

  // "Book" buttons on the price labels preselect the session type
  document.querySelectorAll('a[data-session]').forEach(function (a) {
    a.addEventListener('click', function () {
      var r = document.querySelector('#request-form input[name="session"][value="' + a.getAttribute('data-session') + '"]');
      if (r) r.checked = true;
    });
  });

  // Fill in the email address wherever it is shown
  document.querySelectorAll('[data-email]').forEach(function (el) {
    el.textContent = CONFIG.email;
    if (el.tagName === 'A') el.href = 'mailto:' + CONFIG.email;
  });

  function openMail(subject, body) {
    window.location.href = 'mailto:' + CONFIG.email +
      '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  // Booking request form -> opens the visitor's email app with the request filled in
  var form = document.getElementById('request-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var f = form.elements;
      var session = form.querySelector('input[name="session"]:checked');
      var sessionText = session ? session.parentNode.textContent.trim() : '';
      var body = (sv
        ? 'Session: ' + sessionText + '\nNamn: ' + f.name.value + '\nE-post: ' + f.email.value + '\nNär det passar: ' + f.when.value + '\n\n' + f.message.value
        : 'Session: ' + sessionText + '\nName: ' + f.name.value + '\nEmail: ' + f.email.value + '\nWhen suits me: ' + f.when.value + '\n\n' + f.message.value);
      openMail(sv ? 'Bokningsförfrågan - ' + f.name.value : 'Booking request - ' + f.name.value, body);
      var done = document.getElementById('request-done');
      if (done) done.hidden = false;
    });
  }

  // Newsletter form -> same approach until a newsletter tool is connected
  var nl = document.getElementById('newsletter-form');
  if (nl) {
    nl.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!nl.reportValidity()) return;
      var addr = nl.elements.email.value;
      openMail(sv ? 'Brev från landet - anmälan' : 'Letters from the land - sign me up',
        (sv ? 'Lägg gärna till mig på listan: ' : 'Please add me to the list: ') + addr);
      var done = document.getElementById('newsletter-done');
      if (done) done.hidden = false;
    });
  }

  // Cal.com booking, once a link is configured
  if (CONFIG.calLink) {
    var box = document.getElementById('cal-embed');
    if (form && box) {
      form.hidden = true; box.hidden = false;
      document.querySelectorAll('[data-when="request"]').forEach(function (e) { e.hidden = true; });
      document.querySelectorAll('[data-when="cal"]').forEach(function (e) { e.hidden = false; });
      (function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", { origin: "https://cal.com" });
      Cal("inline", { elementOrSelector: "#cal-embed", calLink: CONFIG.calLink, config: { theme: "light", layout: "month_view", locale: sv ? "sv" : "en" } });
      Cal("ui", { theme: "light", cssVarsPerTheme: { light: { "cal-brand": "#6A4541" } }, hideEventTypeDetails: false, layout: "month_view" });
    }
  }
})();
