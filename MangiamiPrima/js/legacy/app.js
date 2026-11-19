function _toConsumableArray(a) { return _arrayWithoutHoles(a) || _iterableToArray(a) || _unsupportedIterableToArray(a) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { var e = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { for (var t, o = [], a = e.call(r); !(t = a.next()).done;) o.push(t.value); return o; } }
function _arrayWithoutHoles(a) { if (Array.isArray(a)) return _arrayLikeToArray(a); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, e, o = "function" == typeof Symbol ? Symbol : {}, n = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function i(o, n, a, i) { var u = n && n.prototype instanceof Generator ? n : Generator, f = Object.create(u.prototype); return _regeneratorDefine2(f, "_invoke", function (t, o, n) { var a, i, u, f = 0, p = n || [], y = !1, G = { p: 0, n: 0, v: r, a: l, f: l.bind(r, 4), d: function d(t, e) { return a = t, i = 0, u = r, G.n = e, c; } }; function l(t, o) { for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) { var n, a = p[e], l = G.p, F = a[2]; t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0)); } if (n || t > 1) return c; throw y = !0, o; } return function (n, p, F) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) { a || (i ? (i > 1 && (G.n = i < 3 ? -1 : u), l(i, u)) : G.v = u); try { if (f = 2, a) { if (i || (n = "next"), e = a[n]) { if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object"); if (!e.done) return e; u = e.value, i < 2 && (i = 0); } else 1 === i && (e = a.return) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1); a = r; } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break; } catch (t) { a = r, i = 1, u = t; } finally { f = 1; } } return { value: e, done: y }; }; }(o, a, i), !0), f; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} e = Object.getPrototypeOf; var u = [][n] ? e(e([][n]())) : (_regeneratorDefine2(e = {}, n, function () { return this; }), e), f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(r, a, "GeneratorFunction")), r.prototype = Object.create(f), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefine2(f), _regeneratorDefine2(f, a, "Generator"), _regeneratorDefine2(f, n, function () { return this; }), _regeneratorDefine2(f, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: p }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(e, i) { return _iterableToArrayLimit(e, i) || _unsupportedIterableToArray(e, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(t, e) { if (t) { if ("string" == typeof t) return _arrayLikeToArray(t, e); var o = {}.toString.call(t).slice(8, -1); return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? _arrayLikeToArray(t, e) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, t) { var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { var l, n, i, a, u = [], o = !0, f = !1; try { if (i = (e = e.call(r)).next, 0 === t) { if (Object(e) !== e) return; o = !1; } else for (; !(o = (l = i.call(e)).done) && (u.push(l.value), u.length !== t); o = !0); } catch (r) { f = !0, n = r; } finally { try { if (!o && null != e.return && (a = e.return(), Object(a) !== a)) return; } finally { if (f) throw n; } } return u; } }
/* Mangiami Prima - interfaccia: router a hash, schermate e funzioni. */
(function () {
  'use strict';

  var MP = window.MP;
  var store = MP.store,
    P = MP.prodotto,
    date = MP.date;

  /* ================= Utilita' ================= */
  var esc = function esc(s) {
    return String(s !== null && s !== void 0 ? s : '').replace(/[&<>"']/g, function (c) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[c];
    });
  };
  var httpsUrl = function httpsUrl(u) {
    try {
      var x = new URL(String(u));
      return x.protocol === 'https:' ? x.href : '';
    } catch (e) {
      return '';
    }
  };
  var $ = function $(sel, r) {
    return (r || document).querySelector(sel);
  };
  var vista = $('#vista');
  var wait = function wait(ms) {
    return new Promise(function (r) {
      return setTimeout(r, ms);
    });
  };

  /** Equivalente di DisplayAlert: bottoni = [{testo, valore, primario}], ritorna il valore scelto. */
  function dialogo(titolo, testo, bottoni) {
    var dlg = $('#dialogo');
    bottoni = bottoni || [{
      testo: 'OK',
      valore: true,
      primario: true
    }];
    $('#dialogo-titolo').textContent = titolo;
    $('#dialogo-testo').textContent = testo;
    var box = $('#dialogo-bottoni');
    box.textContent = '';
    return new Promise(function (resolve) {
      var esito = bottoni[bottoni.length - 1].valore;
      bottoni.forEach(function (b) {
        var el = document.createElement('button');
        el.type = 'button';
        el.textContent = b.testo;
        if (!b.primario) el.className = 'sec';
        el.addEventListener('click', function () {
          esito = b.valore;
          dlg.close();
        });
        box.appendChild(el);
      });
      dlg.addEventListener('close', function () {
        return resolve(esito);
      }, {
        once: true
      });
      if (typeof dlg.showModal === 'function') dlg.showModal();else {
        alert("".concat(titolo, "\n").concat(testo));
        resolve(bottoni[0].valore);
      }
    });
  }
  var avviso = function avviso(titolo, testo) {
    return dialogo(titolo, testo);
  };
  var conferma = function conferma(titolo, testo, si, no) {
    return dialogo(titolo, testo, [{
      testo: no || 'Annulla',
      valore: false
    }, {
      testo: si || 'OK',
      valore: true,
      primario: true
    }]);
  };

  /* ================= Tema ================= */
  function applicaTema() {
    var t = store.impostazioni().tema;
    var r = document.documentElement;
    if (t === 'chiaro' || t === 'scuro') r.dataset.tema = t;else delete r.dataset.tema;
    var scuro = t === 'scuro' || t === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.content = scuro ? '#1f1f1f' : '#ffffff';
    });
  }

  /* ================= Router ================= */
  var pagine = {};
  var pulisciCorrente = null;
  var navigazioni = 0;
  function route() {
    var nome = (location.hash.replace(/^#\/?/, '') || '').split('?')[0] || 'home';
    var pagina = pagine[nome] || pagine.home;
    if (pulisciCorrente) {
      try {
        pulisciCorrente();
      } catch (e) {/* ignore */}
      pulisciCorrente = null;
    }
    navigazioni++;
    vista.textContent = '';
    $('#titolo').textContent = 'MANGIAMI PRIMA';
    $('#indietro').hidden = pagina === pagine.home;
    pulisciCorrente = pagina(vista) || null;
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  $('#indietro').addEventListener('click', function () {
    if (navigazioni > 1 && history.length > 1) history.back();else location.hash = '#/';
  });
  var vai = function vai(nome) {
    location.hash = '#/' + (nome === 'home' ? '' : nome);
  };

  /* Delegazione click: data-az="nome" con handler per pagina. */
  function collegaAzioni(root, azioni) {
    root.addEventListener('click', function (e) {
      var el = e.target.closest('[data-az]');
      if (!el || !root.contains(el)) return;
      var f = azioni[el.dataset.az];
      if (f) f(el, e);
    });
  }

  /* ================= Home ================= */
  function bannerScadenze() {
    var lista = MP.notifiche.prodottiInScadenza();
    if (!lista.length) return '';
    var scaduti = lista.filter(P.scaduto).length;
    var righe = lista.slice(0, 6).map(function (p) {
      return "<li>".concat(esc(p.titolo), ": <strong>").concat(esc(P.testoScadenza(p).toLowerCase()), "</strong></li>");
    }).join('');
    var altri = lista.length > 6 ? "<li>... e altri ".concat(lista.length - 6, "</li>") : '';
    var titolo = scaduti ? "".concat(lista.length === 1 ? '1 prodotto scaduto o in scadenza' : lista.length + ' prodotti scaduti o in scadenza') : lista.length === 1 ? '1 prodotto in scadenza' : "".concat(lista.length, " prodotti in scadenza");
    return "<section class=\"banner ".concat(scaduti ? 'rosso' : '', "\" role=\"status\" aria-label=\"Prodotti in scadenza\">\n      <h3>").concat(titolo, "</h3><ul>").concat(righe).concat(altri, "</ul>\n      <div class=\"azioni\"><button type=\"button\" class=\"pillola\" data-az=\"dispensa\">Vedi in dispensa</button></div></section>");
  }
  function notaNotifiche() {
    var s = MP.notifiche.stato();
    if (s === 'serve-installazione') {
      return "<div class=\"nota\"><strong>Per ricevere le notifiche di scadenza su iPhone/iPad aggiungi Mangiami Prima alla schermata Home.</strong> Non serve scaricare nulla dall'App Store.\n        <ol><li>Apri questa pagina in Safari.</li><li>Tocca il pulsante Condividi (il quadrato con la freccia in su).</li><li>Scegli \"Aggiungi alla schermata Home\" e conferma.</li><li>Chiudi Safari e apri Mangiami Prima dalla nuova icona.</li><li>Dall'app aperta con l'icona tocca \"Attiva notifiche\" (lo trovi qui in Home e in Impostazioni) e consenti.</li></ol></div>";
    }
    if (s === 'default') {
      return "<p class=\"nota\">Vuoi essere avvisato quando i prodotti stanno per scadere? <button type=\"button\" class=\"pillola\" data-az=\"attiva-notifiche\">Attiva notifiche</button></p>";
    }
    return '';
  }
  pagine.home = function (root) {
    var voci = [['aggiungi', 'AGGIUNGI'], ['dispensa', 'IN DISPENSA'], ['idee', 'COSA POSSO MANGIARE?'], ['spesa', 'LISTA DELLA SPESA'], ['nuova', 'NUOVA RICETTA'], ['impostazioni', 'IMPOSTAZIONI']];
    root.innerHTML = "<div class=\"home\">".concat(bannerScadenze(), "\n      ").concat(voci.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        r = _ref2[0],
        t = _ref2[1];
      return "<button type=\"button\" class=\"grande\" data-vai=\"".concat(r, "\">").concat(t, "</button>");
    }).join(''), "\n      ").concat(notaNotifiche(), "</div>");
    root.onclick = function (e) {
      var b = e.target.closest('[data-vai]');
      if (b) {
        vai(b.dataset.vai);
        return;
      }
      var a = e.target.closest('[data-az]');
      if (!a) return;
      if (a.dataset.az === 'dispensa') vai('dispensa');
      if (a.dataset.az === 'attiva-notifiche') MP.notifiche.richiediPermesso().then(function () {
        return route();
      });
    };
    return function () {
      root.onclick = null;
    };
  };

  /* ================= Aggiungi ================= */
  var MESI = {
    gennaio: 1,
    febbraio: 2,
    marzo: 3,
    aprile: 4,
    maggio: 5,
    giugno: 6,
    luglio: 7,
    agosto: 8,
    settembre: 9,
    ottobre: 10,
    novembre: 11,
    dicembre: 12
  };
  var NUMERI = {
    primo: 1,
    uno: 1,
    due: 2,
    tre: 3,
    quattro: 4,
    cinque: 5,
    sei: 6,
    sette: 7,
    otto: 8,
    nove: 9,
    dieci: 10,
    undici: 11,
    dodici: 12,
    tredici: 13,
    quattordici: 14,
    quindici: 15,
    sedici: 16,
    diciassette: 17,
    diciotto: 18,
    diciannove: 19,
    venti: 20,
    ventuno: 21,
    ventun: 21,
    ventidue: 22,
    ventitre: 23,
    'ventitré': 23,
    ventiquattro: 24,
    venticinque: 25,
    ventisei: 26,
    ventisette: 27,
    ventotto: 28,
    ventinove: 29,
    trenta: 30,
    trentuno: 31,
    trentun: 31
  };

  /** Es. "sette dicembre 2026" -> '2026-12-07'; null se non riconosciuta. */
  function estraiDataDaVoce(testo) {
    var parole = testo.toLowerCase().split(/[ \t\n',.]+/).filter(Boolean);
    var iMese = parole.findIndex(function (p) {
      return p in MESI;
    });
    if (iMese < 0) return null;
    var mese = MESI[parole[iMese]];
    var giorno = 0;
    for (var i = iMese - 1; i >= 0 && i >= iMese - 3 && !giorno; i--) {
      if (/^\d{1,2}$/.test(parole[i])) {
        var n = parseInt(parole[i], 10);
        if (n >= 1 && n <= 31) giorno = n;
      } else if (parole[i] in NUMERI) giorno = NUMERI[parole[i]];
    }
    if (!giorno) return null;
    var m = testo.match(/\b(\d{4})\b/);
    if (!m) return null;
    var iso = "".concat(m[1], "-").concat(String(mese).padStart(2, '0'), "-").concat(String(giorno).padStart(2, '0'));
    return date.valida(iso) ? iso : null;
  }
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  /** Scanner con BarcodeDetector + getUserMedia. Ritorna il codice o null (annullato). */
  function scansiona() {
    return _scansiona.apply(this, arguments);
  }
  function _scansiona() {
    _scansiona = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
      var formati, sup, rilevatore, stream, ov, video, _t1, _t10;
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.p = _context12.n) {
          case 0:
            if (!(!('BarcodeDetector' in window) || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)) {
              _context12.n = 1;
              break;
            }
            throw new Error('non-supportato');
          case 1:
            formati = ['ean_13', 'ean_8', 'upc_a', 'upc_e'];
            _context12.p = 2;
            _context12.n = 3;
            return window.BarcodeDetector.getSupportedFormats();
          case 3:
            sup = _context12.v;
            formati = formati.filter(function (f) {
              return sup.includes(f);
            });
            _context12.n = 5;
            break;
          case 4:
            _context12.p = 4;
            _t1 = _context12.v;
          case 5:
            if (formati.length) {
              _context12.n = 6;
              break;
            }
            throw new Error('non-supportato');
          case 6:
            rilevatore = new window.BarcodeDetector({
              formats: formati
            });
            _context12.n = 7;
            return navigator.mediaDevices.getUserMedia({
              video: {
                facingMode: {
                  ideal: 'environment'
                }
              },
              audio: false
            });
          case 7:
            stream = _context12.v;
            ov = document.createElement('div');
            ov.className = 'scanner';
            ov.setAttribute('role', 'dialog');
            ov.setAttribute('aria-label', 'Scansione codice a barre');
            ov.innerHTML = "<video playsinline muted autoplay></video><div class=\"mirino\"></div>\n      <div class=\"info\">Inquadra il codice a barre del prodotto</div>\n      <button type=\"button\" class=\"chiudi\">Annulla</button>";
            document.body.appendChild(ov);
            video = $('video', ov);
            video.srcObject = stream;
            _context12.p = 8;
            _context12.n = 9;
            return video.play();
          case 9:
            _context12.n = 11;
            break;
          case 10:
            _context12.p = 10;
            _t10 = _context12.v;
          case 11:
            return _context12.a(2, new Promise(function (resolve) {
              var finito = false;
              var chiudi = function chiudi(valore) {
                if (finito) return;
                finito = true;
                clearInterval(timer);
                stream.getTracks().forEach(function (t) {
                  return t.stop();
                });
                ov.remove();
                resolve(valore);
              };
              $('.chiudi', ov).addEventListener('click', function () {
                return chiudi(null);
              });
              var occupato = false;
              var timer = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
                var trovati, r, _t0;
                return _regenerator().w(function (_context11) {
                  while (1) switch (_context11.p = _context11.n) {
                    case 0:
                      if (!(occupato || finito || video.readyState < 2)) {
                        _context11.n = 1;
                        break;
                      }
                      return _context11.a(2);
                    case 1:
                      occupato = true;
                      _context11.p = 2;
                      _context11.n = 3;
                      return rilevatore.detect(video);
                    case 3:
                      trovati = _context11.v;
                      // solo il primo risultato fatto di sole cifre (ignora QR con URL ecc.)
                      r = trovati.find(function (x) {
                        return /^[0-9]{8,14}$/.test(x.rawValue || '');
                      });
                      if (r) chiudi(r.rawValue);
                      _context11.n = 5;
                      break;
                    case 4:
                      _context11.p = 4;
                      _t0 = _context11.v;
                    case 5:
                      occupato = false;
                    case 6:
                      return _context11.a(2);
                  }
                }, _callee11, null, [[2, 4]]);
              })), 250);
            }));
        }
      }, _callee12, null, [[8, 10], [2, 4]]);
    }));
    return _scansiona.apply(this, arguments);
  }
  pagine.aggiungi = function (root) {
    var codiceTrovato = null;
    var immagineUrl = null;
    var dataScadenza = null;
    var inRicerca = false;
    var recognition = null;
    root.innerHTML = "\n      <label class=\"etichetta\" for=\"codice\" style=\"font-size:18px\">Codice a barre del prodotto</label>\n      <div class=\"riga\">\n        <input id=\"codice\" type=\"text\" inputmode=\"numeric\" autocomplete=\"off\" placeholder=\"Codice a barre\" aria-label=\"Codice a barre\">\n        <button type=\"button\" class=\"quadrato\" id=\"cerca\" aria-label=\"Cerca prodotto\">&#128269;</button>\n        <button type=\"button\" class=\"quadrato\" id=\"foto\" aria-label=\"Scansiona con la fotocamera\">&#128247;</button>\n      </div>\n      <input id=\"nome\" type=\"text\" autocomplete=\"off\" placeholder=\"Scrivi il nome del prodotto\" aria-label=\"Nome del prodotto\">\n      <img id=\"img\" class=\"immagine-prodotto\" alt=\"\" hidden referrerpolicy=\"no-referrer\">\n      <hr class=\"separatore\">\n      <label class=\"etichetta\" for=\"scadenza\" style=\"font-size:18px\">Data di scadenza</label>\n      <div class=\"riga\">\n        <input id=\"scadenza\" type=\"date\" aria-label=\"Data di scadenza\">\n        <button type=\"button\" class=\"quadrato\" id=\"mic\" aria-label=\"Detta la data a voce\" ".concat(SR ? '' : 'hidden', ">&#127908;</button>\n        <button type=\"button\" class=\"quadrato sec\" id=\"azzera\" aria-label=\"Cancella la data\" style=\"width:44px;font-size:16px\">&#10005;</button>\n      </div>\n      <button type=\"button\" class=\"medio\" id=\"salva\" disabled>Salva</button>\n      <div class=\"spinner\" id=\"spin\" hidden role=\"status\" aria-label=\"Caricamento\"></div>");
    var el = function el(id) {
      return $('#' + id, root);
    };
    var nome = el('nome');
    function aggiornaSalva() {
      el('salva').disabled = inRicerca || !nome.value.trim();
    }
    function impostaImmagine(url) {
      immagineUrl = url || null;
      var img = el('img');
      if (url) {
        img.src = url;
        img.hidden = false;
      } else {
        img.removeAttribute('src');
        img.hidden = true;
      }
    }
    function impostaScadenza(iso) {
      dataScadenza = iso || null;
      el('scadenza').value = dataScadenza || '';
    }
    function occupato(v) {
      inRicerca = v;
      el('spin').hidden = !v;
      el('cerca').disabled = el('foto').disabled = v;
      aggiornaSalva();
    }
    function cerca(_x) {
      return _cerca.apply(this, arguments);
    }
    function _cerca() {
      _cerca = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(codice) {
        var r, _t2;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              codice = (codice || '').trim();
              if (codice) {
                _context6.n = 2;
                break;
              }
              _context6.n = 1;
              return avviso('Attenzione', 'Inserisci o scansiona un codice.');
            case 1:
              return _context6.a(2);
            case 2:
              occupato(true);
              nome.value = '';
              impostaScadenza(null);
              codiceTrovato = null;
              impostaImmagine(null);
              _context6.p = 3;
              _context6.n = 4;
              return MP.openFoodFacts.cerca(codice);
            case 4:
              r = _context6.v;
              if (r.titolo) {
                nome.value = r.titolo;
                impostaImmagine(r.immagineUrl);
                codiceTrovato = codice;
              } else {
                nome.placeholder = r.erroreRete ? 'Ricerca non riuscita (rete o servizio): riprova o scrivi il nome' : 'Prodotto non trovato: scrivi il nome del prodotto';
                codiceTrovato = codice;
                nome.focus();
              }
              _context6.n = 6;
              break;
            case 5:
              _context6.p = 5;
              _t2 = _context6.v;
              _context6.n = 6;
              return avviso('Errore', "Impossibile completare la ricerca: ".concat(_t2.message));
            case 6:
              _context6.p = 6;
              occupato(false);
              return _context6.f(6);
            case 7:
              return _context6.a(2);
          }
        }, _callee6, null, [[3, 5, 6, 7]]);
      }));
      return _cerca.apply(this, arguments);
    }
    el('cerca').addEventListener('click', function () {
      return cerca(el('codice').value);
    });
    el('codice').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        cerca(el('codice').value);
      }
    });
    nome.addEventListener('input', aggiornaSalva);
    el('scadenza').addEventListener('change', function (e) {
      return impostaScadenza(e.target.value);
    });
    el('azzera').addEventListener('click', function () {
      return impostaScadenza(null);
    });
    el('foto').addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var codice, negato, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return scansiona();
          case 1:
            codice = _context.v;
            if (!codice) {
              _context.n = 2;
              break;
            }
            el('codice').value = codice;
            _context.n = 2;
            return cerca(codice);
          case 2:
            _context.n = 9;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            negato = _t && (_t.name === 'NotAllowedError' || _t.name === 'SecurityError');
            if (!negato) {
              _context.n = 5;
              break;
            }
            _context.n = 4;
            return avviso('Permesso negato', "E' necessario il permesso fotocamera per scansionare il codice a barre.");
          case 4:
            _context.n = 8;
            break;
          case 5:
            if (!(_t && _t.message === 'non-supportato')) {
              _context.n = 7;
              break;
            }
            _context.n = 6;
            return avviso('Scansione non disponibile', 'Questo browser non supporta la lettura dei codici a barre: scrivi il codice a mano e tocca la lente.');
          case 6:
            _context.n = 8;
            break;
          case 7:
            _context.n = 8;
            return avviso('Errore', "Impossibile usare la fotocamera: ".concat(_t && _t.message ? _t.message : _t));
          case 8:
            el('codice').focus();
          case 9:
            return _context.a(2);
        }
      }, _callee, null, [[0, 3]]);
    })));
    el('mic').addEventListener('click', function () {
      if (!SR) return;
      if (recognition) {
        recognition.stop();
        return;
      }
      var btn = el('mic');
      var rec = new SR();
      recognition = rec;
      rec.lang = 'it-IT';
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      btn.disabled = false;
      btn.style.outline = '3px solid var(--accent)';
      el('spin').hidden = false;
      var timeout = setTimeout(function () {
        return rec.stop();
      }, 15000);
      var gestito = false;
      var fine = function fine() {
        clearTimeout(timeout);
        recognition = null;
        btn.style.outline = '';
        el('spin').hidden = !inRicerca;
      };
      rec.onresult = /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(ev) {
          var alt, data, _i, _alt, a;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                gestito = true;
                alt = Array.from(ev.results[0] || []);
                data = null;
                _i = 0, _alt = alt;
              case 1:
                if (!(_i < _alt.length)) {
                  _context2.n = 3;
                  break;
                }
                a = _alt[_i];
                data = estraiDataDaVoce(a.transcript);
                if (!data) {
                  _context2.n = 2;
                  break;
                }
                return _context2.a(3, 3);
              case 2:
                _i++;
                _context2.n = 1;
                break;
              case 3:
                if (!data) {
                  _context2.n = 4;
                  break;
                }
                impostaScadenza(data);
                _context2.n = 5;
                break;
              case 4:
                _context2.n = 5;
                return avviso('Attenzione', alt[0] ? "Non sono riuscito a riconoscere una data valida da: \"".concat(alt[0].transcript, "\".") : 'Non ho capito, riprova.');
              case 5:
                return _context2.a(2);
            }
          }, _callee2);
        }));
        return function (_x2) {
          return _ref4.apply(this, arguments);
        };
      }();
      rec.onerror = /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(ev) {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                gestito = true;
                if (!(ev.error === 'not-allowed' || ev.error === 'service-not-allowed')) {
                  _context3.n = 2;
                  break;
                }
                _context3.n = 1;
                return avviso('Permesso negato', "E' necessario il permesso microfono / riconoscimento vocale per acquisire la data a voce.");
              case 1:
                _context3.n = 5;
                break;
              case 2:
                if (!(ev.error === 'no-speech')) {
                  _context3.n = 4;
                  break;
                }
                _context3.n = 3;
                return avviso('Attenzione', 'Non ho capito, riprova.');
              case 3:
                _context3.n = 5;
                break;
              case 4:
                if (!(ev.error !== 'aborted')) {
                  _context3.n = 5;
                  break;
                }
                _context3.n = 5;
                return avviso('Errore', "Impossibile acquisire la data a voce (".concat(ev.error, ")."));
              case 5:
                return _context3.a(2);
            }
          }, _callee3);
        }));
        return function (_x3) {
          return _ref5.apply(this, arguments);
        };
      }();
      rec.onend = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var g;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              g = gestito;
              fine();
              if (g) {
                _context4.n = 1;
                break;
              }
              _context4.n = 1;
              return avviso('Attenzione', 'Non ho capito, riprova.');
            case 1:
              return _context4.a(2);
          }
        }, _callee4);
      }));
      try {
        rec.start();
      } catch (e) {
        fine();
        avviso('Errore', 'Impossibile avviare il riconoscimento vocale.');
      }
    });
    el('salva').addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var titolo, codice, ok;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            titolo = nome.value.trim();
            if (titolo) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2);
          case 1:
            codice = (codiceTrovato || el('codice').value).trim();
            if (codice) {
              _context5.n = 3;
              break;
            }
            _context5.n = 2;
            return avviso('Attenzione', 'Inserisci o scansiona un codice.');
          case 2:
            return _context5.a(2);
          case 3:
            ok = store.salvaProdotto({
              codice,
              titolo,
              immagineUrl,
              dataScadenza
            });
            el('codice').value = '';
            nome.value = '';
            impostaScadenza(null);
            codiceTrovato = null;
            impostaImmagine(null);
            nome.placeholder = 'Scrivi il nome del prodotto';
            aggiornaSalva();
            if (!ok) {
              _context5.n = 5;
              break;
            }
            _context5.n = 4;
            return avviso('Salvato', 'Prodotto salvato.');
          case 4:
            _context5.n = 6;
            break;
          case 5:
            _context5.n = 6;
            return avviso('Attenzione', 'Prodotto aggiunto, ma la memoria del dispositivo non permette di conservarlo: esporta i dati dalle Impostazioni.');
          case 6:
            return _context5.a(2);
        }
      }, _callee5);
    })));
    impostaScadenza(null);
    return function () {
      if (recognition) {
        try {
          recognition.abort();
        } catch (e) {/* ignore */}
      }
    };
  };

  /* ================= In dispensa ================= */
  pagine.dispensa = function (root) {
    var decrescente = false;
    root.innerHTML = "\n      <input id=\"filtro\" type=\"search\" placeholder=\"Cerca per nome prodotto\" aria-label=\"Cerca per nome prodotto\" autocomplete=\"off\">\n      <div class=\"riga\">\n        <label for=\"ordine\" style=\"flex:none\">Ordina per</label>\n        <select id=\"ordine\"><option value=\"scadenza\">Scadenza</option><option value=\"quantita\">Quantità</option><option value=\"prodotto\">Prodotto</option></select>\n        <button type=\"button\" id=\"direzione\" class=\"sec\" style=\"flex:none\"></button>\n      </div>\n      <div><div class=\"testata\" aria-hidden=\"true\"><span>Quantità</span><span style=\"padding:0 6px\">Prodotto</span><span>Scadenza</span></div>\n      <div id=\"elenco\"></div></div>";
    var cmp = new Intl.Collator('it', {
      sensitivity: 'base'
    }).compare;
    function ordina(lista, tipo) {
      var nullUltimi = function nullUltimi(a, b) {
        return (a.dataScadenza === null) - (b.dataScadenza === null);
      };
      var perScad = function perScad(a, b) {
        return nullUltimi(a, b) || (a.dataScadenza || '').localeCompare(b.dataScadenza || '');
      };
      var dir = decrescente ? -1 : 1;
      if (tipo === 'prodotto') return lista.sort(function (a, b) {
        return dir * cmp(a.titolo, b.titolo) || perScad(a, b);
      });
      if (tipo === 'quantita') return lista.sort(function (a, b) {
        return dir * (a.quantita - b.quantita) || perScad(a, b);
      });
      return lista.sort(function (a, b) {
        return nullUltimi(a, b) || dir * (a.dataScadenza || '').localeCompare(b.dataScadenza || '') || b.dataInserimento.localeCompare(a.dataInserimento);
      });
    }
    function disegna() {
      $('#direzione', root).textContent = decrescente ? 'Decrescente ↓' : 'Crescente ↑';
      var filtro = $('#filtro', root).value.trim().toLowerCase();
      var lista = store.prodotti();
      if (filtro) lista = lista.filter(function (p) {
        return p.titolo.toLowerCase().includes(filtro);
      });
      lista = ordina(lista, $('#ordine', root).value);
      $('#elenco', root).innerHTML = lista.length ? lista.map(function (p) {
        var classe = P.scaduto(p) ? 'scaduto' : P.inScadenza(p) ? 'in-scadenza' : '';
        var img = httpsUrl(p.immagineUrl);
        return "<div class=\"prodotto ".concat(classe, "\" data-id=\"").concat(p.id, "\">\n          <span class=\"barra-scad\"></span>\n          <div class=\"qta\"><div class=\"num\" aria-label=\"Quantità ").concat(p.quantita, "\">").concat(p.quantita, "</div>\n            <div class=\"bottoni\"><button type=\"button\" class=\"piccolo\" data-az=\"meno\" aria-label=\"Diminuisci quantità\">-</button>\n            <button type=\"button\" class=\"piccolo\" data-az=\"piu\" aria-label=\"Aumenta quantità\">+</button></div></div>\n          <div class=\"nome\">").concat(img ? "<img src=\"".concat(esc(img), "\" alt=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer\" onerror=\"this.remove()\">") : '', "<span>").concat(esc(p.titolo), "</span></div>\n          <div class=\"scad\"><div>").concat(esc(date.formatta(p.dataScadenza)), "</div>").concat(P.daUsareSubito(p) ? "<div class=\"testo\">".concat(esc(P.testoScadenza(p)), "</div>") : '', "</div>\n        </div>");
      }).join('') : '<p class="vuoto">Nessun prodotto salvato.</p>';
    }
    $('#filtro', root).addEventListener('input', disegna);
    $('#ordine', root).addEventListener('change', disegna);
    collegaAzioni(root, {
      direzione: function direzione() {
        decrescente = !decrescente;
        disegna();
      },
      meno: function meno(el) {
        store.diminuisci(Number(el.closest('.prodotto').dataset.id));
        disegna();
      },
      piu: function piu(el) {
        store.aumenta(Number(el.closest('.prodotto').dataset.id));
        disegna();
      }
    });
    $('#direzione', root).dataset.az = 'direzione';
    disegna();
  };

  /* ================= Cosa posso mangiare? ================= */
  pagine.idee = function (root) {
    var corrente = 0;
    root.innerHTML = "\n      <div class=\"riga\"><h2 style=\"flex:1\">Cosa posso mangiare?</h2>\n        <button type=\"button\" class=\"pillola\" id=\"aggiorna\" style=\"min-height:44px;flex:none\">AGGIORNA</button></div>\n      <p>Ricette adatte a quello che hai in casa.</p>\n      <div class=\"spinner\" id=\"spin\" hidden role=\"status\" aria-label=\"Caricamento\"></div>\n      <p class=\"messaggio\" id=\"msg\" hidden></p>\n      <div id=\"ricette\" style=\"display:grid;gap:15px\"></div>";
    var msg = function msg(t, errore) {
      var m = $('#msg', root);
      m.textContent = t || '';
      m.hidden = !t;
      m.classList.toggle('errore', !!errore);
    };
    function carica() {
      return _carica.apply(this, arguments);
    }
    function _carica() {
      _carica = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var mio, prodotti, _yield$MP$ricette$get, ricette, daCache, _t3;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              mio = ++corrente;
              $('#aggiorna', root).disabled = true;
              $('#spin', root).hidden = false;
              msg('');
              $('#ricette', root).textContent = '';
              _context8.p = 1;
              prodotti = store.prodotti();
              if (prodotti.length) {
                _context8.n = 2;
                break;
              }
              msg('Non hai ancora prodotti: aggiungi qualche prodotto per ricevere idee.');
              return _context8.a(2);
            case 2:
              _context8.n = 3;
              return MP.ricette.getIdee(prodotti);
            case 3:
              _yield$MP$ricette$get = _context8.v;
              ricette = _yield$MP$ricette$get.ricette;
              daCache = _yield$MP$ricette$get.daCache;
              if (!(mio !== corrente)) {
                _context8.n = 4;
                break;
              }
              return _context8.a(2);
            case 4:
              if (ricette.length) {
                _context8.n = 5;
                break;
              }
              msg('Nessuna ricetta trovata con gli ingredienti che hai in casa.');
              return _context8.a(2);
            case 5:
              if (daCache) msg('Sei offline: queste sono le ultime ricette scaricate.');
              $('#ricette', root).innerHTML = ricette.map(schedaRicetta).join('');
              $('#ricette', root)._ricette = ricette;
              _context8.n = 7;
              break;
            case 6:
              _context8.p = 6;
              _t3 = _context8.v;
              if (mio === corrente) msg("Impossibile recuperare le ricette: ".concat(_t3.message), true);
            case 7:
              _context8.p = 7;
              if (mio === corrente) {
                $('#aggiorna', root).disabled = false;
                $('#spin', root).hidden = true;
              }
              return _context8.f(7);
            case 8:
              return _context8.a(2);
          }
        }, _callee8, null, [[1, 6, 7, 8]]);
      }));
      return _carica.apply(this, arguments);
    }
    function schedaRicetta(r, i) {
      var n = r.posseduti;
      var compat = "Hai ".concat(n, " ").concat(n === 1 ? 'ingrediente' : 'ingredienti', " su ").concat(r.ingredienti.length);
      var inScad = r.inScadenza.map(function (x) {
        return "".concat(x.ingrediente, ": ").concat(date.giorniDa(x.scadenza) < 0 ? 'scaduto il' : 'scade il', " ").concat(date.formatta(x.scadenza));
      }).join('\n');
      return "<article class=\"ricetta\" data-i=\"".concat(i, "\">\n        <h3>").concat(esc(r.titolo), "</h3>\n        <div class=\"compat\">").concat(esc(compat), "</div>\n        ").concat(inScad ? "<div class=\"scad-ing\">".concat(esc(inScad), "</div>") : '', "\n        ").concat(r.mancanti.length ? "<div>".concat(esc('Ti mancano: ' + r.mancanti.join(', ')), "</div>") : '', "\n        ").concat(r.tempo_preparazione ? "<div class=\"corsivo\">".concat(esc('Tempo di preparazione: ' + r.tempo_preparazione), "</div>") : '', "\n        <div class=\"procedimento\">").concat(esc(r.procedimento || ''), "</div>\n        ").concat(r.autore_nome && String(r.autore_nome).trim() ? "<div class=\"corsivo\">".concat(esc('Autore: ' + r.autore_nome), "</div>") : '', "\n        ").concat(r.mancanti.length ? "<button type=\"button\" class=\"pillola\" data-az=\"mancanti\" style=\"min-height:40px;font-size:13px\">AGGIUNGI MANCANTI ALLA SPESA</button>" : '', "\n      </article>");
    }
    $('#aggiorna', root).addEventListener('click', carica);
    collegaAzioni(root, {
      mancanti: function () {
        var _mancanti = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(el) {
          var r, aggiunti, m, apri;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                r = $('#ricette', root)._ricette[Number(el.closest('.ricetta').dataset.i)];
                aggiunti = store.aggiungiAllaSpesa(r.mancanti);
                m = aggiunti === 0 ? 'Gli ingredienti mancanti sono già nella lista della spesa.' : "Aggiunti ".concat(aggiunti, " ingredienti alla lista della spesa.");
                _context7.n = 1;
                return dialogo('Lista della spesa', m, [{
                  testo: 'OK',
                  valore: false
                }, {
                  testo: 'Apri lista',
                  valore: true,
                  primario: true
                }]);
              case 1:
                apri = _context7.v;
                if (apri) vai('spesa');
              case 2:
                return _context7.a(2);
            }
          }, _callee7);
        }));
        function mancanti(_x4) {
          return _mancanti.apply(this, arguments);
        }
        return mancanti;
      }()
    });
    carica();
    return function () {
      corrente++;
    };
  };

  /* ================= Lista della spesa ================= */
  pagine.spesa = function (root) {
    root.innerHTML = "\n      <h2>Lista della spesa</h2>\n      <div class=\"riga\"><input id=\"nuovo\" type=\"text\" placeholder=\"Aggiungi un prodotto\" enterkeyhint=\"done\" autocomplete=\"off\" aria-label=\"Nuovo elemento\">\n        <button type=\"button\" id=\"aggiungi\" style=\"flex:none\">Aggiungi</button></div>\n      <div id=\"lista\"></div>\n      <button type=\"button\" class=\"pillola\" id=\"rimuovi\" style=\"width:100%;min-height:44px\">RIMUOVI GLI ACQUISTATI</button>";
    function disegna() {
      var l = store.listaSpesa();
      $('#lista', root).innerHTML = l.length ? l.map(function (e) {
        return "<div class=\"elemento ".concat(e.acquistato ? 'fatto' : '', "\" data-id=\"").concat(e.id, "\">\n        <button type=\"button\" class=\"piccolo sec\" style=\"width:40px;min-height:40px\" data-az=\"spunta\" role=\"checkbox\" aria-checked=\"").concat(e.acquistato, "\" aria-label=\"Acquistato: ").concat(esc(e.nome), "\">").concat(e.acquistato ? '✓' : '○', "</button>\n        <span class=\"testo\">").concat(esc(e.nome), "</span>\n        <button type=\"button\" class=\"piccolo sec\" style=\"width:40px;min-height:40px\" data-az=\"elimina\" aria-label=\"Elimina ").concat(esc(e.nome), "\">✕</button></div>");
      }).join('') : '<p class="vuoto">La lista è vuota.</p>';
    }
    function aggiungi() {
      var i = $('#nuovo', root);
      var n = i.value.trim();
      if (!n) return;
      store.aggiungiAllaSpesa([n]);
      i.value = '';
      disegna();
    }
    $('#aggiungi', root).addEventListener('click', aggiungi);
    $('#nuovo', root).addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        aggiungi();
      }
    });
    $('#rimuovi', root).addEventListener('click', function () {
      store.rimuoviAcquistati();
      disegna();
    });
    collegaAzioni(root, {
      spunta: function spunta(el) {
        var id = Number(el.closest('.elemento').dataset.id);
        var e = store.listaSpesa().find(function (x) {
          return x.id === id;
        });
        if (e) store.impostaAcquistato(id, !e.acquistato);
        disegna();
      },
      elimina: function elimina(el) {
        store.eliminaElementoSpesa(Number(el.closest('.elemento').dataset.id));
        disegna();
      }
    });
    disegna();
  };

  /* ================= Nuova ricetta ================= */
  pagine.nuova = function (root) {
    root.innerHTML = "\n      <h2>Nuova ricetta</h2>\n      <div><label class=\"etichetta\" for=\"r-titolo\">Titolo</label><input id=\"r-titolo\" type=\"text\" placeholder=\"Es. Pasta al pomodoro\" autocomplete=\"off\"></div>\n      <div><label class=\"etichetta\" for=\"r-ing\">Ingredienti</label><textarea id=\"r-ing\" placeholder=\"Uno per riga oppure separati da virgola (es. pasta, pomodoro, basilico)\"></textarea></div>\n      <div><label class=\"etichetta\" for=\"r-tempo\">Tempo di preparazione</label><input id=\"r-tempo\" type=\"text\" placeholder=\"Es. 20 minuti\" autocomplete=\"off\"></div>\n      <div><label class=\"etichetta\" for=\"r-proc\">Procedimento</label><textarea id=\"r-proc\" style=\"min-height:150px\" placeholder=\"Descrivi i passaggi della ricetta\"></textarea></div>\n      <div><label class=\"etichetta\" for=\"r-autore\">Autore (facoltativo)</label><input id=\"r-autore\" type=\"text\" placeholder=\"Il tuo nome\" autocomplete=\"name\"></div>\n      <div class=\"spinner\" id=\"spin\" hidden role=\"status\" aria-label=\"Invio in corso\"></div>\n      <button type=\"button\" class=\"medio\" id=\"salva\">Salva ricetta</button>\n      <p class=\"soft centro\" id=\"coda\" hidden></p>";
    var v = function v(id) {
      return $('#' + id, root).value.trim();
    };
    var aggCoda = function aggCoda() {
      var n = MP.ricette.inCoda();
      var c = $('#coda', root);
      c.hidden = !n;
      c.textContent = n ? "".concat(n, " ").concat(n === 1 ? 'ricetta in attesa' : 'ricette in attesa', " di invio (verranno inviate appena torna la connessione).") : '';
    };
    aggCoda();
    $('#salva', root).addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      var titolo, procedimento, ingredienti, btn, esito, _t4;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            titolo = v('r-titolo');
            procedimento = v('r-proc');
            ingredienti = _toConsumableArray(new Set(v('r-ing').split(/[,;\n\r]+/).map(function (i) {
              return i.trim().toLowerCase();
            }).filter(Boolean)));
            if (!(!titolo || !ingredienti.length || !procedimento)) {
              _context9.n = 2;
              break;
            }
            _context9.n = 1;
            return avviso('Attenzione', 'Titolo, ingredienti e procedimento sono obbligatori.');
          case 1:
            return _context9.a(2);
          case 2:
            btn = $('#salva', root);
            btn.disabled = true;
            $('#spin', root).hidden = false;
            _context9.p = 3;
            _context9.n = 4;
            return MP.ricette.salvaRicetta({
              titolo,
              ingredienti,
              procedimento,
              tempo: v('r-tempo'),
              autore: v('r-autore')
            });
          case 4:
            esito = _context9.v;
            if (!(esito === 'inviata')) {
              _context9.n = 6;
              break;
            }
            _context9.n = 5;
            return avviso('Salvata', 'Ricetta aggiunta.');
          case 5:
            _context9.n = 7;
            break;
          case 6:
            _context9.n = 7;
            return avviso('Offline', 'Non c\'è connessione: la ricetta è stata salvata sul dispositivo e verrà inviata appena possibile.');
          case 7:
            vai('home');
            _context9.n = 10;
            break;
          case 8:
            _context9.p = 8;
            _t4 = _context9.v;
            _context9.n = 9;
            return avviso('Errore', "Impossibile salvare la ricetta: ".concat(_t4.message));
          case 9:
            btn.disabled = false;
            $('#spin', root).hidden = true;
            aggCoda();
          case 10:
            return _context9.a(2);
        }
      }, _callee9, null, [[3, 8]]);
    })));
  };

  /* ================= Impostazioni ================= */
  function testoGiorni(g) {
    return g === 0 ? 'Avvisami il giorno stesso della scadenza' : g === 1 ? 'Avvisami 1 giorno prima della scadenza' : "Avvisami ".concat(g, " giorni prima della scadenza");
  }
  function testoStatoNotifiche() {
    switch (MP.notifiche.stato()) {
      case 'granted':
        if (store.impostazioni().notifiche === false) return 'Notifiche disattivate: non riceverai avvisi di scadenza. Attiva l\'interruttore per riceverli.';
        if (MP.push && MP.push.attivo()) return 'Notifiche attive: l\'avviso arriva dal server anche con l\'app chiusa.';
        return 'Notifiche attive. Se l\'app è chiusa, l\'avviso arriva solo dove il sistema consente l\'esecuzione in background; altrimenti compare all\'apertura dell\'app e nel riquadro in Home.';
      case 'denied':
        return 'Notifiche bloccate: abilitale dalle impostazioni del browser o del sistema. Nel frattempo i prodotti in scadenza compaiono nel riquadro in Home.';
      case 'serve-installazione':
        return 'Su iPhone/iPad le notifiche funzionano solo se apri Mangiami Prima dall\'icona sulla schermata Home (non serve l\'App Store). In Safari tocca Condividi, poi "Aggiungi alla schermata Home" e conferma; chiudi Safari, apri Mangiami Prima dalla nuova icona e attiva di nuovo le notifiche.';
      case 'non-supportato':
        return 'Questo browser non supporta le notifiche: i prodotti in scadenza compaiono nel riquadro in Home.';
      default:
        return 'Le notifiche non sono ancora attivate: attiva l\'interruttore e consenti l\'invio.';
    }
  }
  pagine.impostazioni = function (root) {
    var imp = store.impostazioni();
    root.innerHTML = "<div class=\"impostazioni\">\n      <h2 class=\"centro\">Impostazioni</h2>\n      <strong>Notifica di scadenza</strong>\n      <div class=\"riga\"><span id=\"giorni-testo\" style=\"flex:1\"></span>\n        <div class=\"stepper\"><button type=\"button\" class=\"piccolo sec\" id=\"meno\" aria-label=\"Un giorno in meno\" style=\"width:44px;min-height:44px\">-</button>\n          <output id=\"giorni-n\" aria-live=\"polite\"></output>\n          <button type=\"button\" class=\"piccolo sec\" id=\"piu\" aria-label=\"Un giorno in più\" style=\"width:44px;min-height:44px\">+</button></div></div>\n      <div class=\"riga\"><label for=\"orario\" style=\"flex:1\">Ora della notifica</label><input id=\"orario\" type=\"time\" style=\"width:auto;flex:none\" value=\"".concat(esc(imp.orario), "\"></div>\n      <div class=\"riga-switch\"><label for=\"notifiche\">Notifiche di scadenza</label>\n        <input type=\"checkbox\" id=\"notifiche\" class=\"interruttore\" role=\"switch\"></div>\n      <div class=\"stato-notifiche soft\" id=\"stato-notifiche\"></div>\n      <div class=\"riga\"><label for=\"tema\" style=\"flex:1\">Tema</label>\n        <select id=\"tema\" style=\"width:auto;flex:none\"><option value=\"auto\">Automatico</option><option value=\"chiaro\">Chiaro</option><option value=\"scuro\">Scuro</option></select></div>\n\n      <hr class=\"separatore\" style=\"margin:6px 0\">\n      <strong>I tuoi dati</strong>\n      <p class=\"soft\" style=\"font-size:14px\">I prodotti e la lista della spesa restano su questo dispositivo. Se attivi le notifiche, nome e data di scadenza dei prodotti vengono inviati al server solo per poterti avvisare. Esporta un file di backup o importalo su un altro dispositivo.</p>\n      <div class=\"riga\"><button type=\"button\" id=\"esporta\" class=\"sec\" style=\"flex:1\">Esporta JSON</button>\n        <button type=\"button\" id=\"importa\" class=\"sec\" style=\"flex:1\">Importa JSON</button></div>\n      <input type=\"file\" id=\"file\" accept=\"application/json,.json\" hidden>\n\n      <hr class=\"separatore\" style=\"margin:6px 0\">\n      <p>MANGIAMI PRIMA ti aiuta a tenere traccia di cosa hai in casa, tra frigo, freezer e dispensa: cerca un prodotto tramite il codice a barre o la fotocamera, indica la data di scadenza (anche a voce) e premi 'Salva'. Se il prodotto non viene trovato, puoi scriverne il nome a mano.</p>\n      <p>Nella sezione 'In dispensa' puoi consultare, cercare e aggiornare le quantità dei prodotti salvati. I prodotti sono ordinati per scadenza, per quantità o per nome del prodotto, in modo crescente o decrescente, a tua scelta: quelli scaduti sono segnati in rosso e quelli che scadono entro 3 giorni in arancione.</p>\n      <p>Nella sezione 'Cosa posso mangiare?' trovi le ricette più adatte a quello che hai in casa, arrivano da un database online e con il pulsante 'Aggiorna' puoi ricaricarle. Per ogni ricetta vedi quali ingredienti ti mancano e quali dei tuoi prodotti sono scaduti o in scadenza, con la data: le ricette che li usano hanno la precedenza. Con 'Aggiungi mancanti alla spesa' mandi gli ingredienti che non hai nella lista della spesa.</p>\n      <p>Nella 'Lista della spesa' puoi aggiungere prodotti a mano, spuntare quelli già acquistati, eliminarli o rimuovere in una volta tutti quelli acquistati. Con 'Nuova ricetta' puoi inserire una tua ricetta nel database.</p>\n      <p class=\"copyright\">@Marco Rosano<br>Versione ").concat(esc(MP.VERSIONE), "</p></div>");
    $('#tema', root).value = imp.tema;
    function aggiorna() {
      var g = store.impostazioni().giorniPreavviso;
      $('#giorni-testo', root).textContent = testoGiorni(g);
      $('#giorni-n', root).textContent = g;
      $('#meno', root).disabled = g <= 0;
      $('#piu', root).disabled = g >= MP.MASSIMO_GIORNI;
      $('#stato-notifiche', root).textContent = testoStatoNotifiche();
      var s = MP.notifiche.stato();
      var sw = $('#notifiche', root);
      sw.checked = s === 'granted' && store.impostazioni().notifiche !== false;
      sw.disabled = s !== 'default' && s !== 'granted'; // bloccate, non supportate o app da installare: non si puo' cambiare da qui
    }
    $('#notifiche', root).addEventListener('change', /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(e) {
        var sw, _t5;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              sw = e.target;
              sw.disabled = true;
              _context0.p = 1;
              _context0.n = 2;
              return MP.notifiche.imposta(sw.checked);
            case 2:
              _context0.n = 4;
              break;
            case 3:
              _context0.p = 3;
              _t5 = _context0.v;
              console.warn('Notifiche:', _t5);
            case 4:
              aggiorna();
            case 5:
              return _context0.a(2);
          }
        }, _callee0, null, [[1, 3]]);
      }));
      return function (_x5) {
        return _ref9.apply(this, arguments);
      };
    }());
    $('#meno', root).addEventListener('click', function () {
      store.impostaImpostazioni({
        giorniPreavviso: store.impostazioni().giorniPreavviso - 1,
        ultimaNotifica: ''
      });
      aggiorna();
    });
    $('#piu', root).addEventListener('click', function () {
      store.impostaImpostazioni({
        giorniPreavviso: store.impostazioni().giorniPreavviso + 1,
        ultimaNotifica: ''
      });
      aggiorna();
    });
    $('#orario', root).addEventListener('change', function (e) {
      if (e.target.value) store.impostaImpostazioni({
        orario: e.target.value,
        ultimaNotifica: ''
      });
    });
    $('#tema', root).addEventListener('change', function (e) {
      store.impostaImpostazioni({
        tema: e.target.value
      });
      applicaTema();
    });
    $('#esporta', root).addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
      var blob, nomeFile, file, url, a, _t6;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.p = _context1.n) {
          case 0:
            blob = new Blob([store.esporta()], {
              type: 'application/json'
            });
            nomeFile = "mangiamiprima-".concat(date.oggi(), ".json");
            _context1.p = 1;
            file = new File([blob], nomeFile, {
              type: 'application/json'
            });
            if (!(navigator.canShare && navigator.canShare({
              files: [file]
            }) && MP.notifiche.isIOS())) {
              _context1.n = 3;
              break;
            }
            _context1.n = 2;
            return navigator.share({
              files: [file],
              title: 'Mangiami Prima'
            });
          case 2:
            return _context1.a(2);
          case 3:
            _context1.n = 5;
            break;
          case 4:
            _context1.p = 4;
            _t6 = _context1.v;
            if (!(_t6 && _t6.name === 'AbortError')) {
              _context1.n = 5;
              break;
            }
            return _context1.a(2);
          case 5:
            url = URL.createObjectURL(blob);
            a = document.createElement('a');
            a.href = url;
            a.download = nomeFile;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(function () {
              return URL.revokeObjectURL(url);
            }, 4000);
          case 6:
            return _context1.a(2);
        }
      }, _callee1, null, [[1, 4]]);
    })));
    $('#importa', root).addEventListener('click', function () {
      return $('#file', root).click();
    });
    $('#file', root).addEventListener('change', /*#__PURE__*/function () {
      var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(e) {
        var f, r, _t7, _t8, _t9;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              f = e.target.files[0];
              e.target.value = '';
              if (f) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2);
            case 1:
              _context10.n = 2;
              return conferma('Importa dati', 'I prodotti e la lista della spesa attuali verranno sostituiti con quelli del file. Continuare?', 'Importa');
            case 2:
              if (_context10.v) {
                _context10.n = 3;
                break;
              }
              return _context10.a(2);
            case 3:
              _context10.p = 3;
              _t7 = store;
              _t8 = _t7.importa;
              _context10.n = 4;
              return f.text();
            case 4:
              r = _t8.call(_t7, _context10.v);
              applicaTema();
              _context10.n = 5;
              return avviso('Importato', "Importati ".concat(r.prodotti, " prodotti e ").concat(r.spesa, " elementi della spesa."));
            case 5:
              route();
              _context10.n = 7;
              break;
            case 6:
              _context10.p = 6;
              _t9 = _context10.v;
              _context10.n = 7;
              return avviso('Errore', _t9.message);
            case 7:
              return _context10.a(2);
          }
        }, _callee10, null, [[3, 6]]);
      }));
      return function (_x6) {
        return _ref1.apply(this, arguments);
      };
    }());
    aggiorna();
  };

  /* ================= Avvio ================= */
  function registraServiceWorker() {
    if (!('serviceWorker' in navigator) || !/^(https:|http:\/\/(localhost|127\.0\.0\.1))/.test(location.protocol + '//' + location.hostname)) return;
    // Quando arriva una versione nuova, ricarica la pagina: altrimenti resta visibile quella vecchia fino alla riapertura successiva.
    var aveva = !!navigator.serviceWorker.controller;
    var ricarica = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (!aveva || ricarica) return;
      ricarica = true;
      location.reload();
    });
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      return reg.update().catch(function () {});
    }).catch(function (e) {
      return console.warn('Service worker non registrato', e);
    });
  }
  function sincronizzaCoda() {
    return _sincronizzaCoda.apply(this, arguments);
  }
  function _sincronizzaCoda() {
    _sincronizzaCoda = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
      var n;
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.n) {
          case 0:
            if (MP.ricette.inCoda()) {
              _context13.n = 1;
              break;
            }
            return _context13.a(2);
          case 1:
            _context13.n = 2;
            return MP.ricette.svuotaCoda();
          case 2:
            n = _context13.v;
            if (n) avviso('Ricette inviate', n === 1 ? 'La ricetta in attesa è stata inviata.' : "".concat(n, " ricette in attesa sono state inviate."));
          case 3:
            return _context13.a(2);
        }
      }, _callee13);
    }));
    return _sincronizzaCoda.apply(this, arguments);
  }
  applicaTema();
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', applicaTema);else if (mq.addListener) mq.addListener(applicaTema); // Safari < 14
  }
  route();
  MP.push.avvia();
  MP.notifiche.avvia();
  registraServiceWorker();
  sincronizzaCoda();
  window.addEventListener('online', sincronizzaCoda);
})();