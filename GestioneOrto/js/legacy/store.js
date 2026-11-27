function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, e, o = "function" == typeof Symbol ? Symbol : {}, n = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function i(o, n, a, i) { var u = n && n.prototype instanceof Generator ? n : Generator, f = Object.create(u.prototype); return _regeneratorDefine2(f, "_invoke", function (t, o, n) { var a, i, u, f = 0, p = n || [], y = !1, G = { p: 0, n: 0, v: r, a: l, f: l.bind(r, 4), d: function d(t, e) { return a = t, i = 0, u = r, G.n = e, c; } }; function l(t, o) { for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) { var n, a = p[e], l = G.p, F = a[2]; t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0)); } if (n || t > 1) return c; throw y = !0, o; } return function (n, p, F) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) { a || (i ? (i > 1 && (G.n = i < 3 ? -1 : u), l(i, u)) : G.v = u); try { if (f = 2, a) { if (i || (n = "next"), e = a[n]) { if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object"); if (!e.done) return e; u = e.value, i < 2 && (i = 0); } else 1 === i && (e = a.return) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1); a = r; } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break; } catch (t) { a = r, i = 1, u = t; } finally { f = 1; } } return { value: e, done: y }; }; }(o, a, i), !0), f; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} e = Object.getPrototypeOf; var u = [][n] ? e(e([][n]())) : (_regeneratorDefine2(e = {}, n, function () { return this; }), e), f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(r, a, "GeneratorFunction")), r.prototype = Object.create(f), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefine2(f), _regeneratorDefine2(f, a, "Generator"), _regeneratorDefine2(f, n, function () { return this; }), _regeneratorDefine2(f, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: p }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(e, t) { var _n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"]; if (!_n) { if (Array.isArray(e) || (_n = _unsupportedIterableToArray(e)) || t && e && "number" == typeof e.length) { _n && (e = _n); var o = 0, F = function F() {}; return { s: F, n: function n() { return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var a, u, i = !0; return { s: function s() { _n = _n.call(e); }, n: function n() { i = !0; var r = _n.next(); return r.done ? { done: !0 } : { value: r.value, done: i = !1 }; }, e: function e(r) { a = !0, u = r; }, f: function f() { try { i || null == _n.return || _n.return(); } finally { if (a) throw u; } } }; }
function _unsupportedIterableToArray(t, e) { if (t) { if ("string" == typeof t) return _arrayLikeToArray(t, e); var o = {}.toString.call(t).slice(8, -1); return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? _arrayLikeToArray(t, e) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/* Gestione Orto PWA - persistenza locale (localStorage), operazioni sui dati e servizi di rete (meteo, città, prezzi). */
(function () {
  'use strict';

  var GO = window.GO;
  var D = GO.D;
  var L = GO.L;
  var S = GO.S = {};
  var KEY = 'gestioneorto.dati.v1';
  var TABELLE = ['orti', 'coltivazioni', 'oggetti', 'letture', 'materiali', 'trattSolco', 'trattVerdura', 'raccolti', 'registro', 'abbinamenti', 'spese', 'prezzi'];
  S.SETTINGS_DEFAULT = {
    tema: 'auto',
    promAttivo: true,
    promGiorni: 2,
    promOra: '09:00',
    annAttiva: true,
    annGiorni: 3,
    annOra: '18:00',
    annIntelligente: true,
    pioggiaOraria: true,
    pioggiaSoglia: 5,
    geloAttivo: true,
    seminaAttiva: true,
    trapiantoAttivo: true,
    concimazioneAttiva: true,
    struttureAttive: true,
    notificheBrowser: false,
    unitaPref: {}
  };
  var vuoto = function vuoto() {
    var d = {
      seq: 0,
      settings: Object.assign({}, S.SETTINGS_DEFAULT),
      meteo: {},
      prezziAgg: {}
    };
    TABELLE.forEach(function (t) {
      return d[t] = [];
    });
    return d;
  };
  var normalizza = function normalizza(d) {
    var v = vuoto();
    Object.keys(v).forEach(function (k) {
      if (d && d[k] !== undefined) v[k] = d[k];
    });
    v.settings = Object.assign({}, S.SETTINGS_DEFAULT, v.settings || {});
    TABELLE.forEach(function (t) {
      if (!Array.isArray(v[t])) v[t] = [];
    });
    var max = 0;
    TABELLE.forEach(function (t) {
      return v[t].forEach(function (r) {
        if (r && r.id > max) max = r.id;
      });
    });
    v.seq = Math.max(v.seq || 0, max);
    return v;
  };
  S.db = vuoto();
  S.erroreSalvataggio = null;
  S.load = function () {
    try {
      var raw = localStorage.getItem(KEY);
      S.db = normalizza(raw ? JSON.parse(raw) : null);
    } catch (e) {
      S.db = vuoto();
    }
    return S.db;
  };
  var timer = null;
  S.salvaOra = function () {
    clearTimeout(timer);
    try {
      localStorage.setItem(KEY, JSON.stringify(S.db));
      S.erroreSalvataggio = null;
      return true;
    } catch (e) {
      S.erroreSalvataggio = 'Impossibile salvare i dati: spazio esaurito o archivio non disponibile. Esporta un backup.';
      return false;
    }
  };
  S.save = function () {
    S.salvaOra();
    if (S.onChange) S.onChange();
  };
  window.addEventListener('pagehide', function () {
    return S.salvaOra();
  });
  window.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') S.salvaOra();
  });
  S.id = function () {
    return ++S.db.seq;
  };
  S.set = function () {
    return S.db.settings;
  };
  var byId = function byId(t, id) {
    return S.db[t].find(function (x) {
      return x.id === id;
    }) || null;
  };
  S.get = byId;

  // ---------- Orti ----------
  S.orto = function (id) {
    return byId('orti', id);
  };
  S.orti = function () {
    return L.sortBy(S.db.orti, function (o) {
      return o.nome.toLowerCase();
    });
  };
  S.addOrto = function (o) {
    o.id = S.id();
    S.db.orti.push(o);
    S.save();
    return o;
  };
  S.updateOrto = function () {
    return S.save();
  };
  S.deleteOrto = function (id) {
    var oggIds = new Set(S.db.oggetti.filter(function (o) {
      return o.ortoId === id;
    }).map(function (o) {
      return o.id;
    }));
    S.db.coltivazioni = S.db.coltivazioni.filter(function (c) {
      return c.ortoId !== id;
    });
    S.db.oggetti = S.db.oggetti.filter(function (o) {
      return o.ortoId !== id;
    });
    S.db.letture = S.db.letture.filter(function (x) {
      return !oggIds.has(x.oggettoId);
    });
    S.db.materiali = S.db.materiali.filter(function (x) {
      return !oggIds.has(x.oggettoId);
    });
    S.db.registro = S.db.registro.filter(function (x) {
      return !oggIds.has(x.oggettoId);
    });
    S.db.trattSolco = S.db.trattSolco.filter(function (t) {
      return t.ortoId !== id;
    });
    S.db.trattVerdura = S.db.trattVerdura.filter(function (t) {
      return t.ortoId !== id;
    });
    S.db.orti = S.db.orti.filter(function (o) {
      return o.id !== id;
    });
    S.save();
  };
  S.coltivazioni = function (ortoId) {
    return L.sortBy(S.db.coltivazioni.filter(function (c) {
      return c.ortoId === ortoId;
    }), function (c) {
      return c.data;
    }).reverse();
  };
  S.oggettiOrto = function (ortoId) {
    return S.db.oggetti.filter(function (o) {
      return o.ortoId === ortoId;
    });
  };
  S.trattSolchi = function (ortoId) {
    return S.db.trattSolco.filter(function (t) {
      return t.ortoId === ortoId;
    });
  };
  S.trattVerdure = function (ortoId) {
    return S.db.trattVerdura.filter(function (t) {
      return t.ortoId === ortoId;
    });
  };
  S.raccoltiOrto = function (ortoId) {
    return S.db.raccolti.filter(function (r) {
      return r.ortoId === ortoId;
    });
  };
  S.totaleSolchi = function (ortoId) {
    return L.totaleSolchi(S.orto(ortoId), S.db.coltivazioni.filter(function (c) {
      return c.ortoId === ortoId;
    }), S.trattSolchi(ortoId));
  };

  // ---------- Coltivazioni ----------
  S.newColt = function (ortoId) {
    return {
      id: 0,
      ortoId,
      verdura: '',
      tipologia: null,
      data: L.iso(L.today()),
      note: null,
      solco: null,
      distP: null,
      distS: null,
      oggettoId: null,
      ultimaAnn: null,
      quantita: null,
      trapiantata: false
    };
  };
  S.addColt = function (c) {
    c.id = S.id();
    S.db.coltivazioni.push(c);
    S.save();
    return c;
  };
  S.updateColt = function () {
    return S.save();
  };

  /** Annota nel posto da cui una verdura se ne va (per la rotazione). */
  var ricordaColturaRimossa = function ricordaColturaRimossa(colt) {
    if (!colt || !L.famiglia(colt.verdura)) return;
    if (colt.oggettoId == null && !(colt.solco > 0)) return;
    var solco = colt.oggettoId == null ? colt.solco : 0;
    var ogg = colt.oggettoId == null ? null : colt.oggettoId;
    var gia = S.db.trattSolco.some(function (t) {
      return t.ortoId === colt.ortoId && t.solco === solco && t.note === 'Coltura rimossa' && (t.oggettoId == null ? null : t.oggettoId) === ogg && t.data === colt.data && L.eq(t.sostanza, colt.verdura);
    });
    if (gia) return;
    S.db.trattSolco.push({
      id: S.id(),
      ortoId: colt.ortoId,
      solco,
      oggettoId: ogg,
      data: colt.data,
      sostanza: colt.verdura,
      note: 'Coltura rimossa'
    });
  };
  S.deleteColt = function (id) {
    var c = byId('coltivazioni', id);
    ricordaColturaRimossa(c);
    S.db.trattVerdura = S.db.trattVerdura.filter(function (t) {
      return t.coltId !== id;
    });
    S.db.coltivazioni = S.db.coltivazioni.filter(function (x) {
      return x.id !== id;
    });
    S.save();
  };
  S.annaffiaTutto = function (ortoId) {
    var oggi = L.iso(L.today());
    var v = S.db.coltivazioni.filter(function (c) {
      return c.ortoId === ortoId;
    });
    v.forEach(function (c) {
      return c.ultimaAnn = oggi;
    });
    S.save();
    return v.length;
  };
  /** Pioggia confermata: segna annaffiate le verdure in piena terra e in aiuola rialzata. */
  S.segnaAnnaffiateDallaPioggia = function (giorno, ortiIds) {
    var g = L.iso(giorno);
    var aiuole = new Set(S.db.oggetti.filter(function (o) {
      return o.tipo === D.AIUOLA;
    }).map(function (o) {
      return o.id;
    }));
    var v = S.db.coltivazioni.filter(function (c) {
      return (!ortiIds || ortiIds.includes(c.ortoId)) && c.data <= g && (c.oggettoId == null || aiuole.has(c.oggettoId)) && !(c.ultimaAnn && c.ultimaAnn >= g);
    });
    v.forEach(function (c) {
      return c.ultimaAnn = g;
    });
    S.save();
    return v.length;
  };
  S.trapianta = function (coltId, ortoId, solco, oggettoId, nota, quantita) {
    var colt = byId('coltivazioni', coltId);
    if (!colt) return;
    var presente = S.db.coltivazioni.find(function (x) {
      return x.ortoId === ortoId && x.id !== coltId && (x.oggettoId == null ? null : x.oggettoId) === (oggettoId == null ? null : oggettoId) && (oggettoId != null || x.solco === solco) && L.eq(x.verdura, colt.verdura);
    });
    var da = colt.oggettoId != null ? byId('oggetti', colt.oggettoId) : null;
    var daVaschetta = da && L.tipo(da.tipo).conAlveoli;
    if (presente) {
      var spostate = quantita != null && quantita < L.piantine(colt) ? quantita : L.piantine(colt);
      presente.quantita = L.piantine(presente) + spostate;
      if (spostate < L.piantine(colt)) {
        colt.quantita = L.piantine(colt) - spostate;
        S.save();
        return;
      }
      if (!daVaschetta) ricordaColturaRimossa(colt);
      S.db.trattVerdura.forEach(function (t) {
        if (t.coltId === coltId) {
          t.coltId = presente.id;
          t.ortoId = ortoId;
        }
      });
      S.db.raccolti.forEach(function (r) {
        if (r.coltId === coltId) {
          r.coltId = presente.id;
          r.ortoId = ortoId;
        }
      });
      S.db.coltivazioni = S.db.coltivazioni.filter(function (x) {
        return x.id !== coltId;
      });
      S.save();
      return;
    }
    if (quantita != null && quantita < L.piantine(colt)) {
      colt.quantita = L.piantine(colt) - quantita;
      S.db.coltivazioni.push(Object.assign({}, colt, {
        id: S.id(),
        ortoId,
        solco,
        oggettoId,
        quantita,
        note: colt.note && colt.note.trim() ? "".concat(colt.note.trim(), "; ").concat(nota) : nota
      }));
      S.save();
      return;
    }
    if (!daVaschetta) ricordaColturaRimossa(colt);
    var ortoPrima = colt.ortoId;
    colt.ortoId = ortoId;
    colt.solco = solco;
    colt.oggettoId = oggettoId;
    colt.note = colt.note && colt.note.trim() ? "".concat(colt.note.trim(), "; ").concat(nota) : nota;
    if (ortoPrima !== ortoId) {
      S.db.trattVerdura.forEach(function (t) {
        if (t.coltId === coltId) t.ortoId = ortoId;
      });
      S.db.raccolti.forEach(function (r) {
        if (r.coltId === coltId) r.ortoId = ortoId;
      });
    }
    S.save();
  };

  // ---------- Solchi ----------
  S.inserisciSolco = function (ortoId, posizione, totaleAttuale) {
    S.db.coltivazioni.forEach(function (c) {
      if (c.ortoId === ortoId && c.oggettoId == null && c.solco >= posizione) c.solco++;
    });
    S.orto(ortoId).solchi = totaleAttuale + 1;
    S.db.trattSolco.forEach(function (t) {
      if (t.ortoId === ortoId && t.solco >= posizione) t.solco++;
    });
    S.db.oggetti.forEach(function (o) {
      if (o.ortoId === ortoId && o.dopoSolco != null && o.dopoSolco >= posizione) o.dopoSolco++;
    });
    S.save();
  };
  var verdureNelSolco = function verdureNelSolco(ortoId, solco) {
    return S.db.coltivazioni.filter(function (x) {
      return x.ortoId === ortoId && x.oggettoId == null && x.solco === solco;
    });
  };
  var storicoSolco = function storicoSolco(ortoId, solco) {
    return S.db.trattSolco.filter(function (t) {
      return t.ortoId === ortoId && t.oggettoId == null && t.solco === solco;
    });
  };
  S.anteprimaRimozioneSolco = function (ortoId, solco) {
    var orto = S.orto(ortoId);
    if (!orto) throw new Error('Orto non trovato.');
    if (L.isBalcone(orto)) throw new Error('Un orto su balcone non ha solchi.');
    var totale = S.totaleSolchi(ortoId);
    if (solco < 1 || solco > totale) throw new Error("Il solco deve essere compreso fra 1 e ".concat(totale, "."));
    var storico = storicoSolco(ortoId, solco);
    var prima = L.uniqueCI(verdureNelSolco(ortoId, solco - 1).map(function (v) {
      return v.verdura;
    }));
    var dopo = L.uniqueCI(verdureNelSolco(ortoId, solco + 1).map(function (v) {
      return v.verdura;
    }));
    var vicini = [];
    var _iterator = _createForOfIteratorHelper(prima),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var a = _step.value;
        var _iterator2 = _createForOfIteratorHelper(dopo),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var b = _step2.value;
            if (!L.eq(a, b) && L.valuta(a, b, S.db.abbinamenti) < 0) vicini.push("".concat(a, " (solco ").concat(solco - 1, ") e ").concat(b, " (solco ").concat(solco + 1, ") diventeranno vicini: abbinamento sconsigliato."));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return {
      verdure: verdureNelSolco(ortoId, solco).map(function (v) {
        return v.verdura;
      }),
      concimi: storico.filter(function (t) {
        return t.note !== 'Coltura rimossa';
      }).length,
      colture: storico.filter(function (t) {
        return t.note === 'Coltura rimossa';
      }).length,
      nuoviVicini: vicini,
      passaggioPossibile: solco > 1 && solco < totale
    };
  };
  var nomeLibero = function nomeLibero(ortoId, base) {
    var usati = new Set(S.db.oggetti.filter(function (o) {
      return o.ortoId === ortoId;
    }).map(function (o) {
      return o.nome.toLowerCase();
    }));
    var n = 1;
    while (usati.has("".concat(base, " ").concat(n).toLowerCase())) n++;
    return "".concat(base, " ").concat(n);
  };
  /** sostituzione: 'nessuna' | 'aiuola' | 'passaggio' */
  S.rimuoviSolco = function (ortoId, solco, sostituzione, eliminaVerdure) {
    S.anteprimaRimozioneSolco(ortoId, solco); // validazioni
    var orto = S.orto(ortoId);
    var totale = S.totaleSolchi(ortoId);
    if (sostituzione === 'passaggio' && (solco === 1 || solco === totale)) throw new Error('Un passaggio sta fra due solchi: non può sostituire il primo o l\'ultimo.');
    var verdure = verdureNelSolco(ortoId, solco);
    if (verdure.length > 0 && sostituzione !== 'aiuola' && !eliminaVerdure) throw new Error("Il solco ".concat(solco, " contiene ").concat(verdure.length, " verdure: confermare l'eliminazione o sostituirlo con un'aiuola rialzata."));
    var storico = storicoSolco(ortoId, solco);
    if (sostituzione === 'aiuola') {
      var a = {
        id: S.id(),
        ortoId,
        tipo: D.AIUOLA,
        nome: nomeLibero(ortoId, L.tipoBase(L.tipo(D.AIUOLA))),
        data: L.iso(L.today()),
        note: null,
        dopoSolco: solco === totale ? null : solco - 1,
        alveoli: null,
        profCm: null
      };
      S.db.oggetti.push(a);
      verdure.forEach(function (v) {
        v.solco = null;
        v.oggettoId = a.id;
      });
      storico.forEach(function (t) {
        t.solco = 0;
        t.oggettoId = a.id;
      });
    } else {
      var ids = new Set(verdure.map(function (v) {
        return v.id;
      }));
      S.db.trattVerdura = S.db.trattVerdura.filter(function (t) {
        return !ids.has(t.coltId);
      });
      S.db.coltivazioni = S.db.coltivazioni.filter(function (c) {
        return !ids.has(c.id);
      });
      var sid = new Set(storico.map(function (t) {
        return t.id;
      }));
      S.db.trattSolco = S.db.trattSolco.filter(function (t) {
        return !sid.has(t.id);
      });
    }
    S.db.coltivazioni.forEach(function (c) {
      if (c.ortoId === ortoId && c.oggettoId == null && c.solco > solco) c.solco--;
    });
    S.db.trattSolco.forEach(function (t) {
      if (t.ortoId === ortoId && t.oggettoId == null && t.solco > solco) t.solco--;
    });
    S.db.oggetti.forEach(function (o) {
      if (o.ortoId === ortoId && o.dopoSolco != null && o.dopoSolco >= solco) o.dopoSolco--;
    });
    var nuovo = totale - 1;
    orto.solchi = nuovo > 0 ? nuovo : null;
    // passaggi: via quelli di testa/coda e i doppioni
    var passaggi = S.db.oggetti.filter(function (o) {
      return o.ortoId === ortoId && o.tipo === D.PASSAGGIO && o.dopoSolco != null;
    });
    var via = new Set(passaggi.filter(function (p) {
      return p.dopoSolco < 1 || p.dopoSolco >= nuovo;
    }).map(function (p) {
      return p.id;
    }));
    passaggi = passaggi.filter(function (p) {
      return !via.has(p.id);
    });
    var visti = new Set();
    passaggi.slice().sort(function (a, b) {
      return a.id - b.id;
    }).forEach(function (p) {
      if (visti.has(p.dopoSolco)) via.add(p.id);else visti.add(p.dopoSolco);
    });
    if (sostituzione === 'passaggio' && !visti.has(solco - 1)) S.db.oggetti.push({
      id: S.id(),
      ortoId,
      tipo: D.PASSAGGIO,
      nome: 'Passaggio',
      data: L.iso(L.today()),
      note: null,
      dopoSolco: solco - 1,
      alveoli: null,
      profCm: null
    });
    S.db.oggetti = S.db.oggetti.filter(function (o) {
      return !via.has(o.id);
    });
    S.save();
  };

  // ---------- Oggetti ----------
  S.addOggetto = function (o) {
    o.id = S.id();
    S.db.oggetti.push(o);
    S.save();
    return o;
  };
  S.deleteOggetto = function (id) {
    S.db.oggetti = S.db.oggetti.filter(function (o) {
      return o.id !== id;
    });
    S.db.letture = S.db.letture.filter(function (x) {
      return x.oggettoId !== id;
    });
    S.db.materiali = S.db.materiali.filter(function (x) {
      return x.oggettoId !== id;
    });
    S.db.registro = S.db.registro.filter(function (x) {
      return x.oggettoId !== id;
    });
    S.db.trattSolco = S.db.trattSolco.filter(function (t) {
      return t.oggettoId !== id;
    });
    S.save();
  };
  // Verdure che con il raccolto spariscono dall'orto (la pianta viene tolta): il raccolto scala le piantine.
  var SI_TOGLIE = ['cipolla', 'porro', 'aglio', 'aglione', 'scalogno', 'carota', 'ravanello', 'rapa', 'barbabietola', 'patata', 'finocchio', 'sedano', 'lattuga', 'radicchio', 'cicoria', 'indivia', 'cavolfiore', 'cavolo cappuccio', 'verza', 'cavolo rapa', 'cime di rapa'];
  S.aggiustaPiantine = function (r, verso) {
    if (!r || r.numero == null || r.unita !== 'pz' && r.unita !== 'cespi' || SI_TOGLIE.indexOf(String(r.verdura).trim().toLowerCase()) < 0) return;
    var c = S.get('coltivazioni', r.coltId);
    if (!c || c.quantita == null) return;
    c.quantita = Math.max(0, c.quantita + verso * Math.floor(r.numero));
  };
  S.addRiga = function (tabella, riga) {
    riga.id = S.id();
    S.db[tabella].push(riga);
    if (tabella === 'raccolti') S.aggiustaPiantine(riga, -1);
    S.save();
    return riga;
  };
  S.delRiga = function (tabella, id) {
    if (tabella === 'raccolti') S.aggiustaPiantine(S.get('raccolti', id), 1);
    S.db[tabella] = S.db[tabella].filter(function (x) {
      return x.id !== id;
    });
    S.save();
  };

  // ---------- Backup ----------
  S.esporta = function () {
    var copia = Object.assign({}, S.db, {
      meteo: {}
    });
    return JSON.stringify({
      app: 'gestione-orto-pwa',
      versione: 1,
      esportato: new Date().toISOString(),
      dati: copia
    }, null, 1);
  };
  S.importa = function (testo) {
    var j = JSON.parse(testo);
    var dati = j && j.dati ? j.dati : j;
    if (!dati || !Array.isArray(dati.orti) || !Array.isArray(dati.coltivazioni)) throw new Error('Il file non contiene dati di Gestione Orto.');
    S.db = normalizza(dati);
    S.save();
  };
  S.azzera = function () {
    S.db = vuoto();
    S.save();
  };

  // ---------- Rete: meteo, città, quota, prezzi ----------
  var ST = GO.net = {};
  var conTimeout = /*#__PURE__*/function () {
    var _conTimeout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(url) {
      var ms,
        ctl,
        t,
        r,
        _args = arguments;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            ms = _args.length > 1 && _args[1] !== undefined ? _args[1] : 9000;
            ctl = new AbortController();
            t = setTimeout(function () {
              return ctl.abort();
            }, ms);
            _context.p = 1;
            _context.n = 2;
            return fetch(url, {
              signal: ctl.signal
            });
          case 2:
            r = _context.v;
            return _context.a(2, r);
          case 3:
            _context.p = 3;
            clearTimeout(t);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[1,, 3, 4]]);
    }));
    function conTimeout(_x) {
      return _conTimeout.apply(this, arguments);
    }
    return conTimeout;
  }();
  ST.online = function () {
    return navigator.onLine !== false;
  };
  var analizza = function analizza(json, scaricata) {
    if (!json) return null;
    var j = typeof json === 'string' ? JSON.parse(json) : json;
    var d = j.daily;
    if (!d || !d.time) return null;
    var giorni = d.time.map(function (t, i) {
      return {
        data: L.parse(t),
        tMax: typeof d.temperature_2m_max[i] === 'number' ? d.temperature_2m_max[i] : 20,
        pioggia: typeof d.precipitation_sum[i] === 'number' ? d.precipitation_sum[i] : 0,
        tMin: d.temperature_2m_min && typeof d.temperature_2m_min[i] === 'number' ? d.temperature_2m_min[i] : 20
      };
    });
    return {
      scaricata: new Date(scaricata),
      giorni
    };
  };
  ST.leggiCache = function (pos) {
    try {
      var c = S.db.meteo[L.suffissoLuogo(pos)];
      if (!c || Date.now() - c.ts > 3 * 86400000) return null;
      return analizza(c.json, c.ts);
    } catch (e) {
      return null;
    }
  };
  ST.ultimoAggiornamento = function (pos) {
    var c = S.db.meteo[L.suffissoLuogo(pos)];
    return c ? new Date(c.ts) : null;
  };
  /** Scarica le previsioni se la cache ha più di un'ora (o con forza). Offline resta la cache. */
  ST.previsione = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(pos, forza) {
      var cache, url, r, json, nuova, _t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            cache = ST.leggiCache(pos);
            if (!(!forza && cache && Date.now() - cache.scaricata.getTime() < 3600000)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, cache);
          case 1:
            _context2.p = 1;
            url = "https://api.open-meteo.com/v1/forecast?latitude=".concat(pos.lat, "&longitude=").concat(pos.lon, "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&past_days=7&forecast_days=8&timezone=auto");
            _context2.n = 2;
            return conTimeout(url);
          case 2:
            r = _context2.v;
            if (r.ok) {
              _context2.n = 3;
              break;
            }
            return _context2.a(2, cache);
          case 3:
            _context2.n = 4;
            return r.json();
          case 4:
            json = _context2.v;
            nuova = analizza(json, Date.now());
            if (!(!nuova || !nuova.giorni.length)) {
              _context2.n = 5;
              break;
            }
            return _context2.a(2, cache);
          case 5:
            S.db.meteo[L.suffissoLuogo(pos)] = {
              json,
              ts: Date.now()
            };
            S.salvaOra();
            return _context2.a(2, nuova);
          case 6:
            _context2.p = 6;
            _t = _context2.v;
            return _context2.a(2, cache);
        }
      }, _callee2, null, [[1, 6]]);
    }));
    return function (_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
  /** Previsioni di ogni luogo degli orti (una volta per luogo): Map suffisso -> previsione|null */
  ST.meteoPerOrti = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(orti, forza) {
      var m, _iterator3, _step3, o, p, k, _t2, _t3, _t4, _t5;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            m = new Map();
            _iterator3 = _createForOfIteratorHelper(orti);
            _context3.p = 1;
            _iterator3.s();
          case 2:
            if ((_step3 = _iterator3.n()).done) {
              _context3.n = 6;
              break;
            }
            o = _step3.value;
            p = L.posizione(o);
            if (p) {
              _context3.n = 3;
              break;
            }
            return _context3.a(3, 5);
          case 3:
            k = L.suffissoLuogo(p);
            if (m.has(k)) {
              _context3.n = 5;
              break;
            }
            _t2 = m;
            _t3 = _t2.set;
            _t4 = k;
            _context3.n = 4;
            return ST.previsione(p, forza);
          case 4:
            _t3.call(_t2, _t4, _context3.v);
          case 5:
            _context3.n = 2;
            break;
          case 6:
            _context3.n = 8;
            break;
          case 7:
            _context3.p = 7;
            _t5 = _context3.v;
            _iterator3.e(_t5);
          case 8:
            _context3.p = 8;
            _iterator3.f();
            return _context3.f(8);
          case 9:
            return _context3.a(2, function (orto) {
              var p = L.posizione(orto);
              return p ? m.get(L.suffissoLuogo(p)) || null : null;
            });
        }
      }, _callee3, null, [[1, 7, 8, 9]]);
    }));
    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();
  ST.pioggiaOraria = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(pos) {
      var r, j, ore, mm, adesso, ieri, oggi, piove, oggiS, ieriS, i, ora, _t6;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.p = 0;
            _context4.n = 1;
            return conTimeout("https://api.open-meteo.com/v1/forecast?latitude=".concat(pos.lat, "&longitude=").concat(pos.lon, "&hourly=precipitation&past_days=1&forecast_days=1&timezone=auto"));
          case 1:
            r = _context4.v;
            if (r.ok) {
              _context4.n = 2;
              break;
            }
            return _context4.a(2, null);
          case 2:
            _context4.n = 3;
            return r.json();
          case 3:
            j = _context4.v;
            ore = j.hourly.time, mm = j.hourly.precipitation;
            adesso = new Date();
            ieri = 0, oggi = 0, piove = false;
            oggiS = L.iso(adesso), ieriS = L.iso(L.add(adesso, -1));
            i = 0;
          case 4:
            if (!(i < ore.length)) {
              _context4.n = 7;
              break;
            }
            ora = new Date(ore[i]);
            if (typeof mm[i] === 'number' && mm[i] > 0 && ora > new Date(adesso.getTime() - 3600000) && ora <= new Date(adesso.getTime() + 3600000 - adesso.getMinutes() * 60000 - adesso.getSeconds() * 1000)) piove = true;
            if (!(ora > adesso || typeof mm[i] !== 'number')) {
              _context4.n = 5;
              break;
            }
            return _context4.a(3, 6);
          case 5:
            if (ore[i].slice(0, 10) === oggiS) oggi += mm[i];else if (ore[i].slice(0, 10) === ieriS) ieri += mm[i];
          case 6:
            i++;
            _context4.n = 4;
            break;
          case 7:
            return _context4.a(2, {
              ieri,
              oggi,
              piove
            });
          case 8:
            _context4.p = 8;
            _t6 = _context4.v;
            return _context4.a(2, null);
        }
      }, _callee4, null, [[0, 8]]);
    }));
    return function (_x6) {
      return _ref3.apply(this, arguments);
    };
  }();
  ST.altitudine = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(lat, lon) {
      var r, j, _t7;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            _context5.p = 0;
            _context5.n = 1;
            return conTimeout("https://api.open-meteo.com/v1/elevation?latitude=".concat(lat, "&longitude=").concat(lon), 8000);
          case 1:
            r = _context5.v;
            _context5.n = 2;
            return r.json();
          case 2:
            j = _context5.v;
            return _context5.a(2, j.elevation && typeof j.elevation[0] === 'number' ? j.elevation[0] : null);
          case 3:
            _context5.p = 3;
            _t7 = _context5.v;
            return _context5.a(2, null);
        }
      }, _callee5, null, [[0, 3]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();
  /** Cerca città per nome (Open-Meteo geocoding): elenco di {nome, lat, lon, alt, desc} o lancia un errore. */
  ST.cercaCitta = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(nome) {
      var r, j;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            _context6.n = 1;
            return conTimeout("https://geocoding-api.open-meteo.com/v1/search?name=".concat(encodeURIComponent(nome), "&count=6&language=it&format=json"));
          case 1:
            r = _context6.v;
            if (r.ok) {
              _context6.n = 2;
              break;
            }
            throw new Error('Ricerca non riuscita.');
          case 2:
            _context6.n = 3;
            return r.json();
          case 3:
            j = _context6.v;
            return _context6.a(2, (j.results || []).map(function (x) {
              return {
                nome: x.name,
                lat: x.latitude,
                lon: x.longitude,
                alt: typeof x.elevation === 'number' ? x.elevation : null,
                desc: [x.name, x.admin1, x.country].filter(Boolean).join(', ')
              };
            }));
        }
      }, _callee6);
    }));
    return function (_x9) {
      return _ref5.apply(this, arguments);
    };
  }();
  ST.posizioneAttuale = function () {
    return new Promise(function (res, rej) {
      if (!navigator.geolocation) return rej(new Error('Il dispositivo non supporta la geolocalizzazione.'));
      navigator.geolocation.getCurrentPosition(/*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(p) {
          var localita, r, j, a, _t8;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.p = _context7.n) {
              case 0:
                localita = null;
                _context7.p = 1;
                _context7.n = 2;
                return conTimeout("https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&accept-language=it&lat=".concat(p.coords.latitude, "&lon=").concat(p.coords.longitude), 7000);
              case 2:
                r = _context7.v;
                _context7.n = 3;
                return r.json();
              case 3:
                j = _context7.v;
                a = j.address || {};
                localita = a.city || a.town || a.village || a.municipality || a.county || null;
                _context7.n = 5;
                break;
              case 4:
                _context7.p = 4;
                _t8 = _context7.v;
              case 5:
                res({
                  lat: p.coords.latitude,
                  lon: p.coords.longitude,
                  localita: localita || 'Posizione attuale',
                  alt: typeof p.coords.altitude === 'number' ? p.coords.altitude : null
                });
              case 6:
                return _context7.a(2);
            }
          }, _callee7, null, [[1, 4]]);
        }));
        return function (_x0) {
          return _ref6.apply(this, arguments);
        };
      }(), function (err) {
        return rej(new Error(err.code === 1 ? 'Permesso di posizione negato.' : 'Posizione non disponibile.'));
      }, {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 600000
      });
    });
  };

  // Prezzi di mercato (Agri-food data portal UE). Se il portale non è raggiungibile resta quanto già salvato.
  ST.prezziDaAggiornare = function (anno) {
    var ts = S.db.prezziAgg[anno];
    if (!ts) return true;
    if (anno < new Date().getFullYear() && new Date(ts).getFullYear() > anno) return false;
    return Date.now() - ts > 3 * 86400000;
  };
  ST.scaricaPrezzi = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(anno) {
      var prodotti, cfg, _ctl, _timer, r, nuovi, _t9, _t0, _t1;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            _context8.p = 0;
            prodotti = Array.from(new Set(Object.values(D.PRODOTTI_PREZZI))).join(','); // L'API UE non ammette il CORS: la richiesta passa dalla Edge Function "prezzi-orto" del progetto Supabase (vedi push.js).
            cfg = GO.supabase;
            if (cfg) {
              _context8.n = 1;
              break;
            }
            return _context8.a(2, 'Servizio prezzi non configurato.');
          case 1:
            _ctl = new AbortController();
            _timer = setTimeout(function () {
              return _ctl.abort();
            }, 55000);
            _context8.p = 2;
            _context8.n = 3;
            return fetch("".concat(cfg.url, "/functions/v1/prezzi-orto?years=").concat(anno, "&products=").concat(encodeURIComponent(prodotti)), {
              headers: {
                apikey: cfg.key
              },
              signal: _ctl.signal
            });
          case 3:
            r = _context8.v;
          case 4:
            _context8.p = 4;
            clearTimeout(_timer);
            return _context8.f(4);
          case 5:
            if (!(r.status === 429)) {
              _context8.n = 6;
              break;
            }
            return _context8.a(2, 'Servizio prezzi momentaneamente al limite delle richieste: riprova più tardi.');
          case 6:
            if (!(r.status >= 500)) {
              _context8.n = 7;
              break;
            }
            return _context8.a(2, 'Il portale UE dei prezzi è temporaneamente non disponibile: riprova più tardi.');
          case 7:
            if (!(r.status !== 404 && !r.ok)) {
              _context8.n = 8;
              break;
            }
            return _context8.a(2, "Il servizio prezzi ha risposto ".concat(r.status, "."));
          case 8:
            if (!(r.status === 404)) {
              _context8.n = 9;
              break;
            }
            _t9 = [];
            _context8.n = 11;
            break;
          case 9:
            _t0 = interpretaPrezzi;
            _context8.n = 10;
            return r.json();
          case 10:
            _t9 = _t0(_context8.v);
          case 11:
            nuovi = _t9;
            S.db.prezzi = S.db.prezzi.filter(function (p) {
              return L.parse(p.inizio).getFullYear() !== anno;
            }).concat(nuovi);
            S.db.prezziAgg[anno] = Date.now();
            S.save();
            return _context8.a(2, null);
          case 12:
            _context8.p = 12;
            _t1 = _context8.v;
            return _context8.a(2, 'Servizio prezzi non raggiungibile: controlla la connessione.');
        }
      }, _callee8, null, [[2,, 4, 5], [0, 12]]);
    }));
    return function (_x1) {
      return _ref7.apply(this, arguments);
    };
  }();
  var interpretaPrezzi = function interpretaPrezzi(arr) {
    var t = function t(e, k) {
      return typeof e[k] === 'string' ? e[k] : '';
    };
    var dIso = function dIso(s) {
      var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s);
      return m ? "".concat(m[3], "-").concat(m[2], "-").concat(m[1]) : null;
    };
    var grezzi = [];
    var _iterator4 = _createForOfIteratorHelper(arr),
      _step4;
    try {
      var _loop = function _loop() {
          var e = _step4.value;
          if (t(e, 'productStage') !== 'Ex-packaging station price' || t(e, 'unit') !== '€/100Kg') return 0; // continue
          var varieta = t(e, 'variety');
          var verdura = Object.keys(D.PRODOTTI_PREZZI).find(function (k) {
            return varieta.toLowerCase().startsWith(D.PRODOTTI_PREZZI[k].toLowerCase());
          });
          if (!verdura) return 0; // continue
          var p = parseFloat(t(e, 'price').replace('€', '').trim());
          var ini = dIso(t(e, 'beginDate')),
            fin = dIso(t(e, 'endDate'));
          if (isNaN(p) || !ini || !fin) return 0; // continue
          grezzi.push({
            verdura,
            ini,
            fin,
            tutte: varieta.toLowerCase().includes('all types and varieties'),
            p: p / 100
          });
        },
        _ret;
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        _ret = _loop();
        if (_ret === 0) continue;
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    var gruppi = new Map();
    grezzi.forEach(function (g) {
      var k = "".concat(g.verdura, "|").concat(g.ini, "|").concat(g.fin);
      if (!gruppi.has(k)) gruppi.set(k, []);
      gruppi.get(k).push(g);
    });
    return Array.from(gruppi.values()).map(function (g) {
      var sc = g.some(function (x) {
        return x.tutte;
      }) ? g.filter(function (x) {
        return x.tutte;
      }) : g;
      return {
        verdura: g[0].verdura,
        inizio: g[0].ini,
        fine: g[0].fin,
        euroKg: sc.reduce(function (s, x) {
          return s + x.p;
        }, 0) / sc.length
      };
    });
  };
})();