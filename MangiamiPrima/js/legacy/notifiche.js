function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, e, o = "function" == typeof Symbol ? Symbol : {}, n = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function i(o, n, a, i) { var u = n && n.prototype instanceof Generator ? n : Generator, f = Object.create(u.prototype); return _regeneratorDefine2(f, "_invoke", function (t, o, n) { var a, i, u, f = 0, p = n || [], y = !1, G = { p: 0, n: 0, v: r, a: l, f: l.bind(r, 4), d: function d(t, e) { return a = t, i = 0, u = r, G.n = e, c; } }; function l(t, o) { for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) { var n, a = p[e], l = G.p, F = a[2]; t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0)); } if (n || t > 1) return c; throw y = !0, o; } return function (n, p, F) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) { a || (i ? (i > 1 && (G.n = i < 3 ? -1 : u), l(i, u)) : G.v = u); try { if (f = 2, a) { if (i || (n = "next"), e = a[n]) { if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object"); if (!e.done) return e; u = e.value, i < 2 && (i = 0); } else 1 === i && (e = a.return) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1); a = r; } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break; } catch (t) { a = r, i = 1, u = t; } finally { f = 1; } } return { value: e, done: y }; }; }(o, a, i), !0), f; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} e = Object.getPrototypeOf; var u = [][n] ? e(e([][n]())) : (_regeneratorDefine2(e = {}, n, function () { return this; }), e), f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(r, a, "GeneratorFunction")), r.prototype = Object.create(f), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefine2(f), _regeneratorDefine2(f, a, "Generator"), _regeneratorDefine2(f, n, function () { return this; }), _regeneratorDefine2(f, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: p }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* Mangiami Prima - notifiche di scadenza (Notification API + service worker) e banner in-app. */
(function () {
  'use strict';

  var MP = window.MP = window.MP || {};
  var standalone = function standalone() {
    return window.matchMedia && window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  };
  var isIOS = function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  };

  /** Stato: 'non-supportato' | 'serve-installazione' (iOS in Safari) | 'default' | 'granted' | 'denied' */
  function stato() {
    if (isIOS() && !standalone()) return 'serve-installazione';
    if (!('Notification' in window)) return 'non-supportato';
    return Notification.permission;
  }
  function richiediPermesso() {
    return _richiediPermesso.apply(this, arguments);
  }
  /** Interruttore delle Impostazioni. true = accese, false = spente. Restituisce lo stato finale (true/false). */
  function _richiediPermesso() {
    _richiediPermesso = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var p, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if ('Notification' in window) {
              _context.n = 1;
              break;
            }
            return _context.a(2, 'non-supportato');
          case 1:
            _context.p = 1;
            _context.n = 2;
            return Notification.requestPermission();
          case 2:
            p = _context.v;
            if (!(p === 'granted')) {
              _context.n = 5;
              break;
            }
            MP.store.impostaImpostazioni({
              notifiche: true,
              ultimaNotifica: ''
            });
            _context.n = 3;
            return registraSincronizzazione();
          case 3:
            if (!MP.push) {
              _context.n = 4;
              break;
            }
            _context.n = 4;
            return MP.push.attiva();
          case 4:
            // push dal server: arriva anche ad app chiusa
            controlla();
          case 5:
            return _context.a(2, p);
          case 6:
            _context.p = 6;
            _t = _context.v;
            return _context.a(2, Notification.permission);
        }
      }, _callee, null, [[1, 6]]);
    }));
    return _richiediPermesso.apply(this, arguments);
  }
  function imposta(_x) {
    return _imposta.apply(this, arguments);
  }
  /* ---------- Testo ---------- */
  function _imposta() {
    _imposta = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(acceso) {
      var p;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (!acceso) {
              _context2.n = 5;
              break;
            }
            if (!(Notification.permission !== 'granted')) {
              _context2.n = 2;
              break;
            }
            _context2.n = 1;
            return richiediPermesso();
          case 1:
            p = _context2.v;
            return _context2.a(2, p === 'granted');
          case 2:
            MP.store.impostaImpostazioni({
              notifiche: true,
              ultimaNotifica: ''
            });
            _context2.n = 3;
            return registraSincronizzazione();
          case 3:
            if (!MP.push) {
              _context2.n = 4;
              break;
            }
            _context2.n = 4;
            return MP.push.attiva();
          case 4:
            controlla();
            return _context2.a(2, true);
          case 5:
            MP.store.impostaImpostazioni({
              notifiche: false
            });
            if (!MP.push) {
              _context2.n = 6;
              break;
            }
            _context2.n = 6;
            return MP.push.disattiva();
          case 6:
            _context2.n = 7;
            return salvaSnapshot();
          case 7:
            return _context2.a(2, false);
        }
      }, _callee2);
    }));
    return _imposta.apply(this, arguments);
  }
  function testo(titoli, giorni) {
    var quando = giorni === 0 ? 'oggi' : giorni === 1 ? 'domani' : "tra ".concat(giorni, " giorni");
    return titoli.length === 1 ? "".concat(titoli[0], " scade ").concat(quando) : "".concat(titoli.length, " prodotti scadono ").concat(quando, ": ").concat(titoli.join(', '));
  }

  /** Prodotti che oggi vanno notificati: scadenza == oggi + giorni di preavviso (come PianificaAsync). */
  function daNotificareOggi() {
    var imp = MP.store.impostazioni();
    var bersaglio = MP.date.aggiungiGiorni(MP.date.oggi(), imp.giorniPreavviso);
    return MP.store.prodotti().filter(function (p) {
      return p.dataScadenza === bersaglio;
    }).map(function (p) {
      return p.titolo;
    });
  }
  function mostra(_x2) {
    return _mostra.apply(this, arguments);
  }
  /** Se e' l'ora giusta e non e' gia' stato fatto oggi, mostra la notifica di scadenza. */
  function _mostra() {
    _mostra = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(corpo) {
      var opzioni, reg, _t2, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            opzioni = {
              body: corpo,
              icon: 'icons/icon-192.png',
              badge: 'icons/icon-192.png',
              tag: 'scadenza-' + MP.date.oggi(),
              lang: 'it'
            };
            _context3.p = 1;
            if (!('serviceWorker' in navigator)) {
              _context3.n = 3;
              break;
            }
            _context3.n = 2;
            return navigator.serviceWorker.getRegistration();
          case 2:
            _t2 = _context3.v;
            _context3.n = 4;
            break;
          case 3:
            _t2 = null;
          case 4:
            reg = _t2;
            if (!reg) {
              _context3.n = 6;
              break;
            }
            _context3.n = 5;
            return reg.showNotification('Mangiami Prima', opzioni);
          case 5:
            return _context3.a(2, true);
          case 6:
            new Notification('Mangiami Prima', opzioni);
            return _context3.a(2, true);
          case 7:
            _context3.p = 7;
            _t3 = _context3.v;
            return _context3.a(2, false);
        }
      }, _callee3, null, [[1, 7]]);
    }));
    return _mostra.apply(this, arguments);
  }
  function controlla() {
    return _controlla.apply(this, arguments);
  }
  /* ---------- Snapshot per il service worker (IndexedDB) + Periodic Background Sync ---------- */
  function _controlla() {
    _controlla = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var imp, adesso, hhmm, titoli;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            if (!(stato() !== 'granted')) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            if (!(MP.push && MP.push.attivo())) {
              _context4.n = 2;
              break;
            }
            return _context4.a(2);
          case 2:
            // ci pensa il server (evita la notifica doppia)
            imp = MP.store.impostazioni();
            if (!(imp.notifiche === false)) {
              _context4.n = 3;
              break;
            }
            return _context4.a(2);
          case 3:
            // spente dall'interruttore delle Impostazioni
            adesso = new Date();
            hhmm = "".concat(String(adesso.getHours()).padStart(2, '0'), ":").concat(String(adesso.getMinutes()).padStart(2, '0'));
            if (!(hhmm < imp.orario || imp.ultimaNotifica === MP.date.oggi())) {
              _context4.n = 4;
              break;
            }
            return _context4.a(2);
          case 4:
            titoli = daNotificareOggi();
            MP.store.impostaImpostazioni({
              ultimaNotifica: MP.date.oggi()
            });
            if (!titoli.length) {
              _context4.n = 5;
              break;
            }
            _context4.n = 5;
            return mostra(testo(titoli, imp.giorniPreavviso));
          case 5:
            return _context4.a(2);
        }
      }, _callee4);
    }));
    return _controlla.apply(this, arguments);
  }
  function apriDb() {
    return new Promise(function (res, rej) {
      var r = indexedDB.open('mangiamiprima', 1);
      r.onupgradeneeded = function () {
        return r.result.createObjectStore('kv');
      };
      r.onsuccess = function () {
        return res(r.result);
      };
      r.onerror = function () {
        return rej(r.error);
      };
    });
  }
  function salvaSnapshot() {
    return _salvaSnapshot.apply(this, arguments);
  }
  function _salvaSnapshot() {
    _salvaSnapshot = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var imp, snap, db, _t4;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            _context5.p = 0;
            imp = MP.store.impostazioni();
            snap = {
              push: !!(MP.push && MP.push.attivo()),
              attive: imp.notifiche !== false,
              giorniPreavviso: imp.giorniPreavviso,
              orario: imp.orario,
              ultimaNotifica: imp.ultimaNotifica,
              scadenze: MP.store.prodotti().filter(function (p) {
                return p.dataScadenza;
              }).map(function (p) {
                return {
                  titolo: p.titolo,
                  scadenza: p.dataScadenza
                };
              })
            };
            _context5.n = 1;
            return apriDb();
          case 1:
            db = _context5.v;
            _context5.n = 2;
            return new Promise(function (res, rej) {
              var tx = db.transaction('kv', 'readwrite');
              tx.objectStore('kv').put(snap, 'snapshot');
              tx.oncomplete = res;
              tx.onerror = function () {
                return rej(tx.error);
              };
            });
          case 2:
            db.close();
            _context5.n = 4;
            break;
          case 3:
            _context5.p = 3;
            _t4 = _context5.v;
          case 4:
            return _context5.a(2);
        }
      }, _callee5, null, [[0, 3]]);
    }));
    return _salvaSnapshot.apply(this, arguments);
  }
  function registraSincronizzazione() {
    return _registraSincronizzazione.apply(this, arguments);
  }
  /* ---------- Banner in-app ---------- */
  function _registraSincronizzazione() {
    _registraSincronizzazione = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var reg, _t5;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            _context6.p = 0;
            _context6.n = 1;
            return navigator.serviceWorker.ready;
          case 1:
            reg = _context6.v;
            if (!reg.periodicSync) {
              _context6.n = 2;
              break;
            }
            _context6.n = 2;
            return reg.periodicSync.register('scadenze', {
              minInterval: 6 * 60 * 60 * 1000
            });
          case 2:
            _context6.n = 4;
            break;
          case 3:
            _context6.p = 3;
            _t5 = _context6.v;
          case 4:
            return _context6.a(2);
        }
      }, _callee6, null, [[0, 3]]);
    }));
    return _registraSincronizzazione.apply(this, arguments);
  }
  function prodottiInScadenza() {
    return MP.store.prodotti().filter(MP.prodotto.daUsareSubito).sort(function (a, b) {
      return a.dataScadenza.localeCompare(b.dataScadenza);
    });
  }
  function avvia() {
    MP.store.onChange(salvaSnapshot);
    salvaSnapshot();
    if (stato() === 'granted') registraSincronizzazione();
    controlla();
    setInterval(controlla, 60000);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) controlla();
    });
  }
  MP.notifiche = {
    stato,
    richiediPermesso,
    imposta,
    controlla,
    avvia,
    prodottiInScadenza,
    isIOS,
    standalone,
    testo
  };
})();