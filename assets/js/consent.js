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
        '<div class="fa-cookie-body">' +
          '<p><strong>Файлы cookie:</strong> мы используем аналитику (Яндекс.Метрика и Google Analytics) для улучшения сервиса. ' +
          '<a href="cookies.html">Подробнее</a></p>' +
        '</div>' +
        '<div class="fa-cookie-actions">' +
          '<button type="button" class="fa-cookie-ok" data-cookie-choice="granted">Принять</button>' +
          '<button type="button" class="fa-cookie-no" data-cookie-choice="denied">Только необходимые</button>' +
        '</div>' +
        '<button type="button" class="fa-cookie-close" aria-label="Закрыть" data-cookie-choice="denied">&times;</button>' +
      '</div>';
    document.body.appendChild(banner);
    var h = banner.offsetHeight || 110;
    document.body.style.paddingBottom = (h + 16) + 'px';
  }

  var style = document.createElement('style');
  style.textContent =
    '#fa-cookie{position:fixed;left:50%;transform:translateX(-50%);bottom:24px;width:calc(100% - 48px);max-width:740px;z-index:9990;background:rgba(15,23,42,.94);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.14);border-radius:16px;box-shadow:0 16px 40px -4px rgba(0,0,0,.45),0 0 0 1px rgba(99,102,241,.18);padding:12px 18px;box-sizing:border-box;max-height:calc(100dvh - 32px);overflow-y:auto}' +
    '#fa-cookie .fa-cookie-card{display:flex;align-items:center;justify-content:space-between;gap:16px;position:relative;padding-right:28px}' +
    '#fa-cookie .fa-cookie-body{flex:1;min-width:0}' +
    '#fa-cookie p{margin:0;font:13px/1.45 Inter,system-ui,Segoe UI,Roboto,sans-serif;color:#e2e8f0 !important;-webkit-text-fill-color:#e2e8f0}' +
    '#fa-cookie strong{color:#fff !important;-webkit-text-fill-color:#fff;font-weight:600}' +
    '#fa-cookie a{color:#a5b4fc !important;-webkit-text-fill-color:#a5b4fc;text-decoration:underline;text-underline-offset:2px;font-weight:500}' +
    '#fa-cookie a:hover{color:#c7d2fe !important;-webkit-text-fill-color:#c7d2fe}' +
    '#fa-cookie .fa-cookie-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}' +
    '#fa-cookie .fa-cookie-ok{background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%) !important;color:#fff !important;-webkit-text-fill-color:#fff;border:none;border-radius:9px;padding:8px 18px;font:600 13px/1 Inter,system-ui,sans-serif;cursor:pointer;box-shadow:0 4px 14px rgba(99,102,241,.4);white-space:nowrap}' +
    '#fa-cookie .fa-cookie-no{background:rgba(255,255,255,.08) !important;color:#cbd5e1 !important;-webkit-text-fill-color:#cbd5e1;border:1px solid rgba(255,255,255,.14);border-radius:9px;padding:7px 14px;font:500 12px/1 Inter,system-ui,sans-serif;cursor:pointer;text-decoration:none;white-space:nowrap}' +
    '#fa-cookie .fa-cookie-close{position:absolute;top:50%;transform:translateY(-50%);right:0;width:24px;height:24px;background:transparent;border:none;color:#94a3b8;font-size:20px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:50%;padding:0}' +
    '#fa-cookie .fa-cookie-close:hover{color:#fff;background:rgba(255,255,255,.1)}' +
    '@media(max-width:720px){#fa-cookie{width:calc(100% - 20px);left:10px;right:10px;transform:none;bottom:max(10px,env(safe-area-inset-bottom,10px));padding:11px 13px;border-radius:14px}#fa-cookie .fa-cookie-card{flex-direction:column;align-items:stretch;gap:9px;padding-right:22px}#fa-cookie p{font-size:12.5px;line-height:1.38}#fa-cookie .fa-cookie-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%}#fa-cookie .fa-cookie-ok,#fa-cookie .fa-cookie-no{width:100%;text-align:center;padding:8px 6px;font-size:12px;display:flex;align-items:center;justify-content:center;border-radius:8px}#fa-cookie .fa-cookie-close{top:0;transform:none;right:0}}' +
    '@media(max-width:360px){#fa-cookie{width:calc(100% - 12px);left:6px;right:6px;padding:10px 11px}#fa-cookie p{font-size:11.5px;line-height:1.35}#fa-cookie .fa-cookie-actions{gap:6px}#fa-cookie .fa-cookie-ok,#fa-cookie .fa-cookie-no{font-size:11px;padding:7px 4px}}';
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
