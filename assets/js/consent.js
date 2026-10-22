(function () {
  var KEY = 'fa_cookie_consent';
  var YM_ID = 106247373;
  var GA_ID = 'G-9DB9W3HRN7';
  var loaded = false;

  function readChoice() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function writeChoice(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {}
  }

  function loadYandex() {
    if (window.__faYm) return;
    window.__faYm = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) return; }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=' + YM_ID, 'ym');
    ym(YM_ID, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: 'dataLayer',
      accurateTrackBounce: true,
      trackLinks: true
    });
  }

  function loadGoogle() {
    if (window.__faGa) return;
    window.__faGa = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);
  }

  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    loadYandex();
    loadGoogle();
  }

  function clearAnalyticsCookies() {
    var names = ['_ga', '_gid', '_gat', '_ga_9DB9W3HRN7', '_ym_uid', '_ym_d', '_ym_isad', '_ym_visorc', '_ym_synced', 'ymex'];
    var host = location.hostname;
    var domains = ['', host, '.' + host];
    names.forEach(function (name) {
      domains.forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
      });
    });
  }

  function removeBanner() {
    var banner = document.getElementById('fa-cookie');
    if (banner) banner.remove();
    document.body.style.paddingBottom = '';
  }

  function updateStatus() {
    var node = document.getElementById('cookie-status');
    if (!node) return;
    var choice = readChoice();
    if (choice === 'granted') node.textContent = 'Сейчас аналитика включена.';
    else if (choice === 'denied') node.textContent = 'Сейчас аналитика выключена.';
    else node.textContent = 'Вы ещё не выбирали. Счётчики не запущены.';
  }

  function apply(value) {
    writeChoice(value);
    removeBanner();
    if (value === 'granted') loadAnalytics();
    else clearAnalyticsCookies();
    updateStatus();
  }

  function showBanner() {
    if (document.getElementById('fa-cookie')) return;
    var banner = document.createElement('div');
    banner.id = 'fa-cookie';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Согласие на cookie');
    banner.innerHTML =
      '<div class="fa-cookie-card">' +
        '<p><strong>Cookie для статистики.</strong> Яндекс.Метрика и Google Analytics включатся, если вы согласны. ' +
        '<a href="cookies.html">Подробнее</a></p>' +
        '<div class="fa-cookie-actions">' +
          '<button type="button" class="fa-cookie-ok" data-cookie-choice="granted">Принять</button>' +
          '<button type="button" class="fa-cookie-no" data-cookie-choice="denied">Только необходимые</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);
    document.body.style.paddingBottom = '148px';
  }

  var style = document.createElement('style');
  style.textContent =
    '#fa-cookie{position:fixed;left:0;right:0;bottom:0;z-index:80;background:linear-gradient(90deg,#4338ca,#7c3aed);border-top:4px solid #facc15;box-shadow:0 -10px 40px rgba(67,56,202,.45)}' +
    '.fa-cookie-card{max-width:1040px;margin:0 auto;padding:18px 22px;display:flex;gap:20px;align-items:center;justify-content:space-between;flex-wrap:wrap;color:#fff}' +
    '#fa-cookie p,#fa-cookie strong{margin:0;color:#fff !important;-webkit-text-fill-color:#fff;font:16px/1.4 Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;max-width:620px}' +
    '#fa-cookie a{color:#fde68a !important;-webkit-text-fill-color:#fde68a;font-weight:700}' +
    '.fa-cookie-actions{display:flex;gap:12px;align-items:center;flex-wrap:wrap}' +
    '#fa-cookie .fa-cookie-ok{background:#facc15 !important;color:#1e1b4b !important;-webkit-text-fill-color:#1e1b4b;border:0;border-radius:12px;padding:14px 32px;font:800 17px/1 Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;cursor:pointer;box-shadow:0 8px 18px rgba(250,204,21,.45)}' +
    '#fa-cookie .fa-cookie-no{background:transparent !important;color:#fff !important;-webkit-text-fill-color:#fff;border:0;padding:10px 4px;font:600 13px/1 Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;cursor:pointer;text-decoration:underline}' +
    '@media(max-width:640px){.fa-cookie-card{align-items:stretch;padding:16px}.fa-cookie-actions{width:100%;flex-direction:column;align-items:stretch}.fa-cookie-ok{width:100%}}';
  document.head.appendChild(style);

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var button = target.closest('[data-cookie-choice]');
    if (!button) return;
    apply(button.getAttribute('data-cookie-choice'));
  });

  var choice = readChoice();
  if (choice === 'granted') loadAnalytics();
  else if (choice !== 'denied') showBanner();
  updateStatus();
})();
