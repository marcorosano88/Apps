function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, e, o = "function" == typeof Symbol ? Symbol : {}, n = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function i(o, n, a, i) { var u = n && n.prototype instanceof Generator ? n : Generator, f = Object.create(u.prototype); return _regeneratorDefine2(f, "_invoke", function (t, o, n) { var a, i, u, f = 0, p = n || [], y = !1, G = { p: 0, n: 0, v: r, a: l, f: l.bind(r, 4), d: function d(t, e) { return a = t, i = 0, u = r, G.n = e, c; } }; function l(t, o) { for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) { var n, a = p[e], l = G.p, F = a[2]; t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0)); } if (n || t > 1) return c; throw y = !0, o; } return function (n, p, F) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) { a || (i ? (i > 1 && (G.n = i < 3 ? -1 : u), l(i, u)) : G.v = u); try { if (f = 2, a) { if (i || (n = "next"), e = a[n]) { if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object"); if (!e.done) return e; u = e.value, i < 2 && (i = 0); } else 1 === i && (e = a.return) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1); a = r; } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break; } catch (t) { a = r, i = 1, u = t; } finally { f = 1; } } return { value: e, done: y }; }; }(o, a, i), !0), f; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} e = Object.getPrototypeOf; var u = [][n] ? e(e([][n]())) : (_regeneratorDefine2(e = {}, n, function () { return this; }), e), f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(r, a, "GeneratorFunction")), r.prototype = Object.create(f), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefine2(f), _regeneratorDefine2(f, a, "Generator"), _regeneratorDefine2(f, n, function () { return this; }), _regeneratorDefine2(f, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: p }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* Mangiami Prima - Web Push: registra il telefono su Supabase perche' il server invii le notifiche di scadenza anche ad app chiusa. */
(function () {
  'use strict';

  var MP = window.MP = window.MP || {};

  // --- Configurazione (vedi _backend-supabase/LEGGIMI.md) ---
  var PUSH_URL = 'https://dqbqebrfwfbtqnvaejel.supabase.co'; // progetto Supabase che contiene le tabelle push_*
  var PUSH_KEY = 'sb_publishable_NvOCatNLryMZhvMJTW0VMA_FgQIJSTG'; // chiave pubblica (anon)
  var VAPID_PUBBLICA = 'BNklMlRmQSUe1XqcEKl0ANKXSG55VsIwLdJohqbktIJZlRqBtqQ510XIv3XwRVNKGQUaTh7nGJWJI9RBARq5f6Q';
  var CH_ID = 'mp_push_id';
  var CH_ATTIVO = 'mp_push_attivo';
  var timer = null;
  var leggi = function leggi(k) {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  };
  var scrivi = function scrivi(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {/* ignora */}
  };
  function supportato() {
    return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  }

  /** true se questo dispositivo e' registrato per il push (e il permesso e' ancora concesso). */
  function attivo() {
    return supportato() && leggi(CH_ATTIVO) === '1' && Notification.permission === 'granted';
  }
  function idDispositivo() {
    var id = leggi(CH_ID);
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
      });
      scrivi(CH_ID, id);
    }
    return id;
  }
  function chiaveDaBase64(b64) {
    var pad = '='.repeat((4 - b64.length % 4) % 4);
    var raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from(raw, function (c) {
      return c.charCodeAt(0);
    });
  }
  function rpc(_x, _x2) {
    return _rpc.apply(this, arguments);
  }
  function _rpc() {
    _rpc = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(nome, corpo) {
      var r, _t, _t2, _t3, _t4;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return fetch("".concat(PUSH_URL, "/rest/v1/rpc/").concat(nome), {
              method: 'POST',
              headers: {
                apikey: PUSH_KEY,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(corpo)
            });
          case 1:
            r = _context.v;
            if (r.ok) {
              _context.n = 3;
              break;
            }
            _t = Error;
            _t2 = "".concat(nome, ": HTTP ").concat(r.status, " ");
            _t3 = _t2.concat;
            _context.n = 2;
            return r.text().catch(function () {
              return '';
            });
          case 2:
            _t4 = _t3.call(_t2, _context.v);
            throw new _t(_t4);
          case 3:
            return _context.a(2);
        }
      }, _callee);
    }));
    return _rpc.apply(this, arguments);
  }
  function sottoscrizione(_x3) {
    return _sottoscrizione.apply(this, arguments);
  }
  /** Invia al server sottoscrizione, impostazioni e scadenze correnti. */
  function _sottoscrizione() {
    _sottoscrizione = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(crea) {
      var reg, chiave, sub, att;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return navigator.serviceWorker.ready;
          case 1:
            reg = _context2.v;
            chiave = chiaveDaBase64(VAPID_PUBBLICA);
            _context2.n = 2;
            return reg.pushManager.getSubscription();
          case 2:
            sub = _context2.v;
            if (!(sub && sub.options && sub.options.applicationServerKey)) {
              _context2.n = 4;
              break;
            }
            att = new Uint8Array(sub.options.applicationServerKey);
            if (!(att.length !== chiave.length || att.some(function (b, i) {
              return b !== chiave[i];
            }))) {
              _context2.n = 4;
              break;
            }
            _context2.n = 3;
            return sub.unsubscribe();
          case 3:
            sub = null;
          case 4:
            if (!(!sub && crea)) {
              _context2.n = 6;
              break;
            }
            _context2.n = 5;
            return reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: chiave
            });
          case 5:
            sub = _context2.v;
          case 6:
            return _context2.a(2, sub);
        }
      }, _callee2);
    }));
    return _sottoscrizione.apply(this, arguments);
  }
  function sincronizzaOra() {
    return _sincronizzaOra.apply(this, arguments);
  }
  /** Raggruppa modifiche ravvicinate in un solo invio. */
  function _sincronizzaOra() {
    _sincronizzaOra = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var sub, imp, _t5;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (attivo()) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            _context3.p = 1;
            _context3.n = 2;
            return sottoscrizione(true);
          case 2:
            sub = _context3.v;
            imp = MP.store.impostazioni();
            _context3.n = 3;
            return rpc('push_sincronizza', {
              p_id: idDispositivo(),
              p_subscription: sub.toJSON(),
              p_ora: imp.orario,
              p_giorni: imp.giorniPreavviso,
              p_fuso: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Rome',
              p_scadenze: MP.store.prodotti().filter(function (p) {
                return p.dataScadenza;
              }).map(function (p) {
                return {
                  nome: p.titolo,
                  data: p.dataScadenza
                };
              })
            });
          case 3:
            scrivi('mp_push_da_inviare', '0');
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t5 = _context3.v;
            console.warn('Sincronizzazione push non riuscita:', _t5);
            scrivi('mp_push_da_inviare', '1'); // riprova al ritorno della rete / alla prossima modifica
          case 5:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 4]]);
    }));
    return _sincronizzaOra.apply(this, arguments);
  }
  function sincronizza() {
    if (!attivo()) return;
    clearTimeout(timer);
    timer = setTimeout(sincronizzaOra, 1500);
  }

  /** Da chiamare dopo che l'utente ha concesso il permesso (o all'avvio se gia' concesso). */
  function attiva() {
    return _attiva.apply(this, arguments);
  }
  function _attiva() {
    _attiva = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            if (!(!supportato() || Notification.permission !== 'granted')) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2, false);
          case 1:
            scrivi(CH_ATTIVO, '1');
            _context4.n = 2;
            return sincronizzaOra();
          case 2:
            return _context4.a(2, leggi('mp_push_da_inviare') !== '1');
        }
      }, _callee4);
    }));
    return _attiva.apply(this, arguments);
  }
  function disattiva() {
    return _disattiva.apply(this, arguments);
  }
  function _disattiva() {
    _disattiva = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var sub, _t6;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            scrivi(CH_ATTIVO, '0');
            _context5.p = 1;
            _context5.n = 2;
            return sottoscrizione(false);
          case 2:
            sub = _context5.v;
            if (!sub) {
              _context5.n = 3;
              break;
            }
            _context5.n = 3;
            return sub.unsubscribe();
          case 3:
            _context5.n = 4;
            return rpc('push_rimuovi', {
              p_id: idDispositivo()
            });
          case 4:
            _context5.n = 6;
            break;
          case 5:
            _context5.p = 5;
            _t6 = _context5.v;
            console.warn('Disattivazione push:', _t6);
          case 6:
            return _context5.a(2);
        }
      }, _callee5, null, [[1, 5]]);
    }));
    return _disattiva.apply(this, arguments);
  }
  function avvia() {
    if (!supportato()) return;
    MP.store.onChange(sincronizza);
    window.addEventListener('online', function () {
      if (leggi('mp_push_da_inviare') === '1') sincronizza();
    });
    if (Notification.permission === 'granted' && MP.store.impostazioni().notifiche !== false) attiva(); // rinnova la sottoscrizione ad ogni apertura
  }
  MP.push = {
    supportato,
    attivo,
    attiva,
    disattiva,
    sincronizza,
    avvia
  };
})();