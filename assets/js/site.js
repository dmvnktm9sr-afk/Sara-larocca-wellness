/* Sara Larocca Wellness — site behaviour */
var CONFIG = {
  // When Sara's Cal.com account is ready, put her Cal.com link here,
  // e.g. "saralarocca" (shows both session types) or "saralarocca/in-person".
  // Leave it empty to keep the "request a time" form.
  calLink: ""
};

(function () {
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

  // "Book" links on the price list preselect the session type
  document.querySelectorAll('a[data-session]').forEach(function (a) {
    a.addEventListener('click', function () {
      var r = document.querySelector('#request-form input[name="session"][value="' + a.getAttribute('data-session') + '"]');
      if (r) r.checked = true;
    });
  });

  // Cal.com booking, once a link is configured
  if (CONFIG.calLink) {
    var form = document.getElementById('request-form');
    var box = document.getElementById('cal-embed');
    if (form && box) {
      form.hidden = true; box.hidden = false;
      document.querySelectorAll('[data-when="request"]').forEach(function (e) { e.hidden = true; });
      document.querySelectorAll('[data-when="cal"]').forEach(function (e) { e.hidden = false; });
      (function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", { origin: "https://cal.com" });
      Cal("inline", { elementOrSelector: "#cal-embed", calLink: CONFIG.calLink, config: { theme: "dark", layout: "month_view" } });
      Cal("ui", { theme: "dark", cssVarsPerTheme: { dark: { "cal-brand": "#D9A441" } }, hideEventTypeDetails: false, layout: "month_view" });
    }
  }
})();
