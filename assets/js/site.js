/* Sara Larocca Wellness - site behaviour */
var CONFIG = {
  // Sara's email address. Booking requests and newsletter sign-ups are sent here
  // (through the visitor's own email app) until Cal.com / a newsletter tool is connected.
  email: "hello@saralaroccawellness.com",

  // When Sara's Cal.com account is ready, put her Cal.com link here,
  // e.g. "saralarocca" (shows both session types) or "saralarocca/in-person".
  // Leave it empty to keep the "request a time" form.
  calLink: "saralaroccawellness",

  // The two session types in Cal.com (the last part of each session's link).
  calEvents: { "in-person": "biofield-tuning-in-person", "distance": "biofield-tuning-distance" }
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

  // Colours for the Cal.com calendar, matched to the page
  var CAL_LOOK = {
    "cal-brand": "#6A4541", "cal-brand-emphasis": "#573834", "cal-brand-text": "#F4E8D2",
    "cal-brand-subtle": "#E2C3B6", "cal-brand-accent": "#F4E8D2",
    "cal-text": "#4A4630", "cal-text-emphasis": "#3E3B26", "cal-text-subtle": "#6B6650",
    "cal-text-muted": "#8C8670", "cal-text-inverted": "#F4E8D2",
    "cal-bg": "#F7EEDD", "cal-bg-emphasis": "#E8D7C8", "cal-bg-subtle": "#EFE3CC",
    "cal-bg-muted": "#F2E6CF", "cal-bg-inverted": "#3E3B26",
    "cal-border": "rgba(86,83,51,0.28)", "cal-border-emphasis": "#565333",
    "cal-border-subtle": "rgba(86,83,51,0.2)", "cal-border-muted": "rgba(86,83,51,0.12)",
    "cal-border-booker": "rgba(86,83,51,0)", "cal-border-booker-width": "0px",
    "radius": "2px"
  };

  // Cal.com booking, once a link is configured
  if (CONFIG.calLink) {
    var calBox = document.getElementById('cal-box');
    if (form && calBox) {
      form.hidden = true; calBox.hidden = false;
      document.querySelectorAll('[data-when="request"]').forEach(function (e) { e.hidden = true; });
      document.querySelectorAll('[data-when="cal"]').forEach(function (e) { e.hidden = false; });
      (function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      var loaded = {};
      var showCal = function (kind) {
        document.getElementById('wrap-in-person').hidden = kind !== 'in-person';
        document.getElementById('wrap-distance').hidden = kind !== 'distance';
        var radio = calBox.querySelector('input[value="' + kind + '"]');
        if (radio) radio.checked = true;
        if (loaded[kind]) return;
        loaded[kind] = true;
        var ns = kind === 'in-person' ? 'inperson' : 'distance';
        Cal("init", ns, { origin: "https://cal.com" });
        Cal.ns[ns]("inline", {
          elementOrSelector: '#cal-' + kind,
          calLink: CONFIG.calLink + '/' + (CONFIG.calEvents[kind] || kind),
          config: { theme: "light", layout: "month_view" }
        });
        Cal.ns[ns]("ui", { theme: "light", hideEventTypeDetails: true, layout: "month_view", cssVarsPerTheme: { light: CAL_LOOK } });
      };
      calBox.querySelectorAll('input[name="cal-session"]').forEach(function (r) {
        r.addEventListener('change', function () { if (r.checked) showCal(r.value); });
      });
      document.querySelectorAll('a[data-session]').forEach(function (a) {
        a.addEventListener('click', function () { showCal(a.getAttribute('data-session')); });
      });
      showCal('in-person');
    }
  }
})();
