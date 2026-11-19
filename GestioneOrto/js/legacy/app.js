function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, e, o = "function" == typeof Symbol ? Symbol : {}, n = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function i(o, n, a, i) { var u = n && n.prototype instanceof Generator ? n : Generator, f = Object.create(u.prototype); return _regeneratorDefine2(f, "_invoke", function (t, o, n) { var a, i, u, f = 0, p = n || [], y = !1, G = { p: 0, n: 0, v: r, a: l, f: l.bind(r, 4), d: function d(t, e) { return a = t, i = 0, u = r, G.n = e, c; } }; function l(t, o) { for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) { var n, a = p[e], l = G.p, F = a[2]; t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0)); } if (n || t > 1) return c; throw y = !0, o; } return function (n, p, F) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) { a || (i ? (i > 1 && (G.n = i < 3 ? -1 : u), l(i, u)) : G.v = u); try { if (f = 2, a) { if (i || (n = "next"), e = a[n]) { if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object"); if (!e.done) return e; u = e.value, i < 2 && (i = 0); } else 1 === i && (e = a.return) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1); a = r; } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break; } catch (t) { a = r, i = 1, u = t; } finally { f = 1; } } return { value: e, done: y }; }; }(o, a, i), !0), f; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} e = Object.getPrototypeOf; var u = [][n] ? e(e([][n]())) : (_regeneratorDefine2(e = {}, n, function () { return this; }), e), f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(r, a, "GeneratorFunction")), r.prototype = Object.create(f), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefine2(f), _regeneratorDefine2(f, a, "Generator"), _regeneratorDefine2(f, n, function () { return this; }), _regeneratorDefine2(f, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: p }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(e, i) { return _iterableToArrayLimit(e, i) || _unsupportedIterableToArray(e, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(t, e) { if (t) { if ("string" == typeof t) return _arrayLikeToArray(t, e); var o = {}.toString.call(t).slice(8, -1); return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? _arrayLikeToArray(t, e) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, t) { var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { var l, n, i, a, u = [], o = !0, f = !1; try { if (i = (e = e.call(r)).next, 0 === t) { if (Object(e) !== e) return; o = !1; } else for (; !(o = (l = i.call(e)).done) && (u.push(l.value), u.length !== t); o = !0); } catch (r) { f = !0, n = r; } finally { try { if (!o && null != e.return && (a = e.return(), Object(a) !== a)) return; } finally { if (f) throw n; } } return u; } }
/* Gestione Orto PWA - avvio, router a hash, intestazione, barra delle schede, tema, service worker, notifiche. */
(function () {
  'use strict';

  var GO = window.GO;
  var L = GO.L,
    S = GO.S,
    UI = GO.UI,
    ST = GO.net,
    V = GO.V;
  var h = UI.h;
  GO.token = 0;

  // ---------- Navigazione ----------
  GO.nav = {
    depth: 0,
    go(hash) {
      GO.nav.depth++;
      location.hash = hash;
    },
    tab(hash) {
      GO.nav.depth = 0;
      location.hash = hash;
    },
    replace(hash) {
      location.replace(hash);
    },
    back(parent) {
      if (GO.nav.depth > 0) {
        GO.nav.depth--;
        history.back();
      } else location.replace(parent || '#/attivita');
    }
  };
  var TABS = [{
    id: 'attivita',
    ic: '🗓️',
    lb: 'Attività',
    hash: '#/attivita'
  }, {
    id: 'orti',
    ic: '🌱',
    lb: 'Orti',
    hash: '#/orti'
  }, {
    id: 'schema',
    ic: '🗺️',
    lb: 'Schema',
    hash: '#/schema'
  }, {
    id: 'statistiche',
    ic: '📊',
    lb: 'Statistiche',
    hash: '#/statistiche'
  }, {
    id: 'impostazioni',
    ic: '⚙️',
    lb: 'Impost.',
    hash: '#/impostazioni'
  }];
  var ROUTES = [[/^\/attivita$/, 'attivita', function () {
    return V.attivita();
  }], [/^\/orti$/, 'orti', function () {
    return V.orti();
  }], [/^\/orto\/nuovo$/, 'orti', function () {
    return V.modificaOrto({
      id: 'nuovo'
    });
  }], [/^\/orto\/(\d+)$/, 'orti', function (m) {
    return V.ortoDettaglio({
      id: m[1]
    });
  }], [/^\/orto\/(\d+)\/modifica$/, 'orti', function (m) {
    return V.modificaOrto({
      id: m[1]
    });
  }], [/^\/orto\/(\d+)\/verdura\/(\d+)$/, 'orti', function (m, q) {
    return V.nuovaColtivazione({
      id: m[1],
      cid: m[2],
      query: q
    });
  }], [/^\/orto\/(\d+)\/oggetto$/, 'orti', function (m) {
    return V.nuovoOggetto({
      id: m[1]
    });
  }], [/^\/oggetto\/(\d+)$/, 'orti', function (m) {
    return V.oggetto({
      id: m[1]
    });
  }], [/^\/schema$/, 'schema', function () {
    return V.schema();
  }], [/^\/statistiche$/, 'statistiche', function () {
    return V.statistiche();
  }], [/^\/spese$/, 'statistiche', function () {
    return V.spese();
  }], [/^\/impostazioni$/, 'impostazioni', function () {
    return V.impostazioni();
  }], [/^\/semine$/, 'attivita', function () {
    return V.semine();
  }], [/^\/compagni$/, 'attivita', function () {
    return V.compagni();
  }]];
  var $main, $title, $back, $tabs, $fab;
  var lastHash = null;
  var parseHash = function parseHash() {
    var raw = (location.hash || '').replace(/^#/, '') || '/attivita';
    var i = raw.indexOf('?');
    return {
      path: i < 0 ? raw : raw.slice(0, i),
      query: i < 0 ? '' : raw.slice(i + 1)
    };
  };
  GO.render = function (top) {
    if (!$main) return;
    var y = window.scrollY;
    var _parseHash = parseHash(),
      path = _parseHash.path,
      query = _parseHash.query;
    var hash = location.hash || '#/attivita';
    GO.token++;
    var view = null,
      tab = 'attivita';
    for (var _i = 0, _ROUTES = ROUTES; _i < _ROUTES.length; _i++) {
      var _ROUTES$_i = _slicedToArray(_ROUTES[_i], 3),
        re = _ROUTES$_i[0],
        t = _ROUTES$_i[1],
        fn = _ROUTES$_i[2];
      var m = re.exec(path);
      if (m) {
        tab = t;
        try {
          view = fn(m, query);
        } catch (e) {
          console.error(e);
          view = {
            title: 'Errore',
            el: UI.note("Si è verificato un errore: ".concat(e.message), 'warn')
          };
        }
        break;
      }
    }
    if (!view) {
      location.replace('#/attivita');
      return;
    }
    GO.formAttivo = !!view.form;
    UI.clear($main);
    $main.append(view.el);
    $title.textContent = view.title || 'Gestione Orto';
    document.title = "".concat(view.title || 'Gestione Orto', " · Gestione Orto");
    $back.hidden = !view.back;
    $back.onclick = function () {
      return GO.nav.back(view.back);
    };
    UI.clear($fab);
    if (view.fab) {
      $fab.append(h('button', {
        class: 'fab',
        onclick: view.fab.onclick,
        text: view.fab.label
      }));
    }
    Array.from($tabs.querySelectorAll('button')).forEach(function (b) {
      return b.classList.toggle('on', b.dataset.id === tab);
    });
    if (top || hash !== lastHash) window.scrollTo(0, 0);else window.scrollTo(0, y);
    lastHash = hash;
    if (path === '/spese' && hash !== GO._lastSpese) {
      GO._lastSpese = hash;
      V.speseAvvio();
    }
    if (path !== '/spese') GO._lastSpese = null;
  };
  var pending = false;
  S.onChange = function () {
    if (pending || GO.formAttivo) return;
    pending = true;
    Promise.resolve().then(function () {
      pending = false;
      GO.render();
    });
  };

  // ---------- Tema ----------
  GO.applicaTema = function () {
    var t = S.set().tema;
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);else document.documentElement.removeAttribute('data-theme');
  };

  // ---------- Notifiche all'apertura ----------
  var notificaAvvisi = /*#__PURE__*/function () {
    var _notificaAvvisi = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var set, oggi, ultima, meteoDi, avvisi, corpo, reg, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            set = S.set();
            if (!(!set.notificheBrowser || !('Notification' in window) || Notification.permission !== 'granted')) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            if (!(GO.push && GO.push.attivo())) {
              _context.n = 2;
              break;
            }
            return _context.a(2);
          case 2:
            // i promemoria arrivano dal server (push): niente notifica doppia all'apertura
            oggi = L.iso(L.today());
            ultima = null;
            try {
              ultima = localStorage.getItem('gestioneorto.ultimaNotifica');
            } catch (e) {/* ignore */}
            if (!(ultima === oggi)) {
              _context.n = 3;
              break;
            }
            return _context.a(2);
          case 3:
            meteoDi = function meteoDi(o) {
              var p = L.posizione(o);
              return p ? ST.leggiCache(p) : null;
            };
            _context.n = 4;
            return V.calcolaAvvisi(meteoDi);
          case 4:
            avvisi = _context.v;
            if (avvisi.length) {
              _context.n = 5;
              break;
            }
            return _context.a(2);
          case 5:
            corpo = avvisi.map(function (a) {
              return "".concat(a.icona, " ").concat(a.titolo);
            }).join(' · ');
            try {
              localStorage.setItem('gestioneorto.ultimaNotifica', oggi);
            } catch (e) {/* ignore */}
            _context.p = 6;
            if (!('serviceWorker' in navigator)) {
              _context.n = 8;
              break;
            }
            _context.n = 7;
            return navigator.serviceWorker.getRegistration();
          case 7:
            _t = _context.v;
            _context.n = 9;
            break;
          case 8:
            _t = null;
          case 9:
            reg = _t;
            if (!(reg && reg.showNotification)) {
              _context.n = 11;
              break;
            }
            _context.n = 10;
            return reg.showNotification('Gestione Orto', {
              body: corpo,
              icon: 'icons/icon-192.png',
              badge: 'icons/icon-192.png',
              tag: 'avvisi-orto'
            });
          case 10:
            _context.n = 12;
            break;
          case 11:
            new Notification('Gestione Orto', {
              body: corpo,
              icon: 'icons/icon-192.png'
            });
          case 12:
            _context.n = 14;
            break;
          case 13:
            _context.p = 13;
            _t2 = _context.v;
          case 14:
            return _context.a(2);
        }
      }, _callee, null, [[6, 13]]);
    }));
    function notificaAvvisi() {
      return _notificaAvvisi.apply(this, arguments);
    }
    return notificaAvvisi;
  }();

  // ---------- Service worker ----------
  var registraSW = function registraSW() {
    if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
    var aveva = !!navigator.serviceWorker.controller;
    var ricarica = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (!aveva || ricarica) return;
      ricarica = true;
      UI.toast('App aggiornata: ricarico…');
      setTimeout(function () {
        return location.reload();
      }, 900);
    });
    navigator.serviceWorker.register('sw.js').catch(function (e) {
      return console.warn('Service worker non registrato', e);
    });
  };

  // ---------- Avvio ----------
  var start = function start() {
    S.load();
    GO.applicaTema();
    var app = document.getElementById('app');
    $back = h('button', {
      class: 'back',
      'aria-label': 'Indietro',
      text: '‹',
      hidden: true
    });
    $title = h('h1', {
      text: 'Gestione Orto'
    });
    $main = h('main', {
      id: 'main'
    });
    $fab = h('div');
    $tabs = h('nav', {
      class: 'tabs',
      'aria-label': 'Sezioni'
    }, h('div', {
      class: 'tabs-in'
    }, TABS.map(function (t) {
      return h('button', {
        'data-id': t.id,
        onclick: function onclick() {
          return GO.nav.tab(t.hash);
        },
        'aria-label': t.lb
      }, h('span', {
        class: 'ic',
        text: t.ic
      }), h('span', {
        class: 'lb',
        text: t.lb
      }));
    })));
    app.append(h('header', {
      class: 'top'
    }, $back, $title), $main, $fab, $tabs);
    window.addEventListener('hashchange', function () {
      return GO.render();
    });
    GO.render();
    registraSW();
    if (S.erroreSalvataggio) UI.toast(S.erroreSalvataggio);
    setTimeout(notificaAvvisi, 1200);
    // Se si torna all'app dopo ore, ricalcola avvisi e meteo
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible' && !GO.formAttivo) GO.render();
    });
    window.addEventListener('online', function () {
      if (!GO.formAttivo) GO.render();
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);else start();
})();