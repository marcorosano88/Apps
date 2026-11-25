function _toConsumableArray(a) { return _arrayWithoutHoles(a) || _iterableToArray(a) || _unsupportedIterableToArray(a) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { var e = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { for (var t, o = [], a = e.call(r); !(t = a.next()).done;) o.push(t.value); return o; } }
function _arrayWithoutHoles(a) { if (Array.isArray(a)) return _arrayLikeToArray(a); }
function _createForOfIteratorHelper(e, t) { var _n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"]; if (!_n) { if (Array.isArray(e) || (_n = _unsupportedIterableToArray(e)) || t && e && "number" == typeof e.length) { _n && (e = _n); var o = 0, F = function F() {}; return { s: F, n: function n() { return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var a, u, i = !0; return { s: function s() { _n = _n.call(e); }, n: function n() { i = !0; var r = _n.next(); return r.done ? { done: !0 } : { value: r.value, done: i = !1 }; }, e: function e(r) { a = !0, u = r; }, f: function f() { try { i || null == _n.return || _n.return(); } finally { if (a) throw u; } } }; }
function _slicedToArray(e, i) { return _iterableToArrayLimit(e, i) || _unsupportedIterableToArray(e, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(t, e) { if (t) { if ("string" == typeof t) return _arrayLikeToArray(t, e); var o = {}.toString.call(t).slice(8, -1); return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? _arrayLikeToArray(t, e) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, t) { var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { var l, n, i, a, u = [], o = !0, f = !1; try { if (i = (e = e.call(r)).next, 0 === t) { if (Object(e) !== e) return; o = !1; } else for (; !(o = (l = i.call(e)).done) && (u.push(l.value), u.length !== t); o = !0); } catch (r) { f = !0, n = r; } finally { try { if (!o && null != e.return && (a = e.return(), Object(a) !== a)) return; } finally { if (f) throw n; } } return u; } }
/* Gestione Orto PWA - logica di dominio (porting della logica dell'app iOS). Funzioni pure, senza DOM. */
(function () {
  'use strict';

  var GO = window.GO;
  var D = GO.D;
  var L = GO.L = {};
  var pad = function pad(n) {
    return String(n).padStart(2, '0');
  };

  // ---------- Date e numeri ----------
  L.pad = pad;
  L.iso = function (d) {
    return "".concat(d.getFullYear(), "-").concat(pad(d.getMonth() + 1), "-").concat(pad(d.getDate()));
  };
  L.parse = function (s) {
    if (!s) return null;
    var _String$slice$split$m = String(s).slice(0, 10).split('-').map(Number),
      _String$slice$split$m2 = _slicedToArray(_String$slice$split$m, 3),
      y = _String$slice$split$m2[0],
      m = _String$slice$split$m2[1],
      d = _String$slice$split$m2[2];
    return new Date(y, m - 1, d);
  };
  L.today = function () {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  };
  L.add = function (d, n) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  };
  L.diff = function (a, b) {
    return Math.round((a - b) / 86400000);
  };
  L.fmt = function (d) {
    return "".concat(pad(d.getDate()), "/").concat(pad(d.getMonth() + 1), "/").concat(d.getFullYear());
  };
  L.fmtS = function (s) {
    return s ? L.fmt(L.parse(s)) : '';
  };
  L.fmtDM = function (d) {
    return "".concat(pad(d.getDate()), "/").concat(pad(d.getMonth() + 1));
  };
  L.nowISO = function () {
    var n = new Date();
    return "".concat(L.iso(n), "T").concat(pad(n.getHours()), ":").concat(pad(n.getMinutes()));
  };
  L.fmtDT = function (s) {
    var d = L.parse(s);
    return "".concat(L.fmt(d), " ").concat(String(s).slice(11, 16));
  };
  L.num = function (n) {
    var dec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    return Number(n).toLocaleString('it-IT', {
      maximumFractionDigits: dec
    });
  };
  L.euro = function (v) {
    return Number(v).toLocaleString('it-IT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + ' €';
  };
  L.euro0 = function (v) {
    return Number(v).toLocaleString('it-IT', {
      maximumFractionDigits: 0
    }) + ' €';
  };
  L.parseNum = function (t) {
    if (t == null) return NaN;
    var s = String(t).trim().replace(',', '.');
    return /^-?\d+(\.\d+)?$/.test(s) ? parseFloat(s) : NaN;
  };
  L.cap = function (s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  L.eq = function (a, b) {
    return String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();
  };
  L.piantineTxt = function (n) {
    return n === 1 ? '1 piantina' : "".concat(n, " piantine");
  };
  L.uniqueCI = function (arr) {
    var seen = new Set();
    return arr.filter(function (x) {
      var k = String(x).toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };
  L.sortBy = function (arr) {
    for (var _len = arguments.length, fns = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      fns[_key - 1] = arguments[_key];
    }
    return arr.slice().sort(function (a, b) {
      for (var _i = 0, _fns = fns; _i < _fns.length; _i++) {
        var f = _fns[_i];
        var x = f(a),
          y = f(b);
        if (x < y) return -1;
        if (x > y) return 1;
      }
      return 0;
    });
  };
  L.cmpText = function (a, b) {
    return String(a).localeCompare(String(b), 'it', {
      sensitivity: 'base'
    });
  };

  // ---------- Catalogo ----------
  L.trova = function (nome) {
    return D.idx.catalogo.get(String(nome || '').trim().toLowerCase()) || null;
  };
  L.emoji = function (nome) {
    return (L.trova(nome) || {}).emoji || '🌱';
  };
  L.famiglia = function (nome) {
    return D.idx.famiglie.get(String(nome || '').trim().toLowerCase()) || null;
  };
  L.profilo = function (nome) {
    return D.idx.profili.get(String(nome || '').trim().toLowerCase()) || null;
  };
  L.piano = function (nome) {
    var p = D.idx.piani.get(String(nome || '').trim().toLowerCase());
    return p ? {
      concime: p[0],
      primoGiorno: p[1],
      ogniGiorni: p[2]
    } : null;
  };
  L.intervalloBase = function (nome) {
    return D.idx.intervalli.get(String(nome || '').trim().toLowerCase()) || 3;
  };
  L.distanze = function (nome) {
    var d = D.idx.distanze.get(String(nome || '').trim().toLowerCase());
    return d ? {
      piantine: d[0],
      solco: d[1]
    } : null;
  };
  L.giorniTrapianto = function (nome) {
    var g = D.idx.trapianto.get(String(nome || '').trim().toLowerCase());
    return g == null ? null : g;
  };
  L.sensibileGelo = function (nome) {
    return D.idx.gelo.has(String(nome || '').trim().toLowerCase());
  };
  L.nomiCatalogo = function () {
    return D.CATALOGO.map(function (v) {
      return v.nome;
    }).sort(L.cmpText);
  };
  L.piantine = function (c) {
    return Math.max(c.quantita || 1, 1);
  };
  L.giorniAlRaccolto = function (c) {
    var cat = L.trova(c.verdura);
    if (!cat) return 0;
    var sem = L.giorniTrapianto(c.verdura);
    if (!c.trapiantata || sem == null) return cat.giorni;
    return Math.max(cat.giorni - sem, Math.floor((cat.giorni + 1) / 2));
  };
  /** Avanzamento di crescita: {p (0..1), stato, colore}. */
  L.avanzamento = function (giorniTrascorsi, giorniAlRaccolto) {
    if (giorniTrascorsi < 0) return {
      p: 0,
      stato: giorniTrascorsi === -1 ? 'Messa a dimora domani' : "Messa a dimora tra ".concat(-giorniTrascorsi, " giorni"),
      colore: '#43A047'
    };
    var mancano = giorniAlRaccolto - giorniTrascorsi;
    if (mancano > 0) return {
      p: giorniTrascorsi / giorniAlRaccolto,
      stato: "🌱 ".concat(Math.floor(giorniTrascorsi * 100 / giorniAlRaccolto), "% · ").concat(mancano === 1 ? 'manca 1 giorno' : "mancano ".concat(mancano, " giorni"), " alla raccolta"),
      colore: '#43A047'
    };
    return {
      p: 1,
      stato: mancano === 0 ? '🧺 Pronta da raccogliere oggi' : "🧺 Pronta da raccogliere (da ".concat(-mancano, " ").concat(mancano === -1 ? 'giorno' : 'giorni', ")"),
      colore: '#FB8C00'
    };
  };

  // ---------- Clima e posizione ----------
  L.haPosizione = function (o) {
    return o && o.lat != null && o.lon != null;
  };
  L.posizione = function (o) {
    return L.haPosizione(o) ? {
      lat: o.lat,
      lon: o.lon,
      localita: o.localita || null,
      alt: o.alt == null ? null : o.alt
    } : null;
  };
  L.clima = function (orto) {
    var p = L.posizione(orto);
    if (!p) return {
      sp: 0,
      sud: false
    };
    var eq = Math.abs(p.lat) + Math.max(p.alt || 0, 0) / 100;
    var x = (eq - 43) / 3;
    var mesi = Math.max(-1, Math.min(3, Math.sign(x) * Math.round(Math.abs(x))));
    return {
      sp: mesi,
      sud: p.lat < 0
    };
  };
  L.mesiPer = function (v, clima) {
    var shift = clima.sp + (clima.sud ? 6 : 0);
    return v.mesi.map(function (m) {
      return ((m - 1 + shift) % 12 + 12) % 12 + 1;
    });
  };
  L.siPuoSeminare = function (v, clima, mese) {
    return L.mesiPer(v, clima).includes(mese);
  };
  L.climaKey = function (c) {
    return "".concat(c.sp, "|").concat(c.sud ? 1 : 0);
  };
  L.descriviQuota = function (p) {
    return p.alt != null ? " · ".concat(Math.round(p.alt), " m") : '';
  };
  L.descriviClima = function (orto) {
    var p = L.posizione(orto);
    return p ? "📍 ".concat(p.localita || "".concat(p.lat.toFixed(2), "°, ").concat(p.lon.toFixed(2), "°")).concat(L.descriviQuota(p)).concat(p.lat < 0 ? ' · emisfero sud' : '') : 'Posizione non indicata: uso il clima del Centro Italia in pianura';
  };
  L.suffissoLuogo = function (p) {
    return "_".concat(p.lat.toFixed(2), "_").concat(p.lon.toFixed(2));
  };

  // ---------- Compagnia ----------
  L.compagniDi = function (verdura) {
    var d = D.idx.compagnia.get(String(verdura || '').trim().toLowerCase());
    return d ? {
      amici: d[0],
      nemici: d[1]
    } : {
      amici: [],
      nemici: []
    };
  };
  var contiene = function contiene(arr, n) {
    return arr.some(function (x) {
      return L.eq(x, n);
    });
  };
  L.dalCatalogo = function (a, b) {
    var A = L.compagniDi(a),
      B = L.compagniDi(b);
    if (contiene(A.nemici, b) || contiene(B.nemici, a)) return -1;
    if (contiene(A.amici, b) || contiene(B.amici, a)) return 1;
    return 0;
  };
  /** 1 = vicine, -1 = separate, 0 = nessuna indicazione; gli abbinamenti dell'utente hanno la precedenza. */
  L.valuta = function (a, b, utente) {
    var mio = (utente || []).find(function (x) {
      return L.eq(x.a, a) && L.eq(x.b, b) || L.eq(x.a, b) && L.eq(x.b, a);
    });
    return mio ? mio.esito : L.dalCatalogo(a, b);
  };
  L.verdureConCompagni = function () {
    return Array.from(D.idx.compagnia.keys()).map(function (k) {
      return Object.keys(D.COMPAGNIA).find(function (n) {
        return n.toLowerCase() === k;
      });
    }).sort(L.cmpText);
  };

  // ---------- Tipi di oggetto ----------
  L.tipo = function (nome) {
    var legacy = {
      semenzaio: D.VASCHETTA,
      'vaschetta alveolare da 4': D.VASCHETTA,
      'vaschetta alveolare da 6': D.VASCHETTA,
      'vaschetta alveolare da 12': D.VASCHETTA,
      'vaso o cassetta': 'Vaso'
    };
    var n = legacy[String(nome || '').toLowerCase()] || nome;
    return D.TIPI.find(function (t) {
      return L.eq(t.nome, n);
    }) || D.TIPI[0];
  };
  L.tipoBase = function (t) {
    return t.nomeBase || t.nome;
  };
  L.perSpazio = function (balcone) {
    return balcone ? D.TIPI.filter(function (t) {
      return !t.soloTerreno;
    }) : D.TIPI;
  };
  L.protetto = function (nomeTipo) {
    return L.tipo(nomeTipo).coperto;
  };
  var numFinale = function numFinale(n) {
    var m = /(\d+)\s*$/.exec(n);
    return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER;
  };
  L.ordinaOggetti = function (oggetti) {
    return L.sortBy(oggetti, function (o) {
      return Math.max(0, D.TIPI.indexOf(L.tipo(o.tipo)));
    }, function (o) {
      return o.alveoli || 0;
    }, function (o) {
      return numFinale(o.nome);
    }, function (o) {
      return o.nome.toLowerCase();
    });
  };
  L.nomeSuggerito = function (tipo, esistenti) {
    if (!tipo.ospita) return tipo.nome;
    var usati = new Set(esistenti.map(function (o) {
      return o.nome.trim().toLowerCase();
    }));
    var n = 1;
    while (usati.has("".concat(L.tipoBase(tipo), " ").concat(n).toLowerCase())) n++;
    return "".concat(L.tipoBase(tipo), " ").concat(n);
  };
  L.opzioniPosizione = function (totale) {
    var o = [];
    if (totale > 0) {
      o.push({
        label: 'Prima del solco 1',
        dopo: 0
      });
      for (var s = 1; s < totale; s++) o.push({
        label: "Tra il solco ".concat(s, " e il solco ").concat(s + 1),
        dopo: s
      });
    }
    o.push({
      label: "In fondo (dopo l'ultimo solco)",
      dopo: null
    });
    return o;
  };
  L.descriviPosizione = function (dopo, totale) {
    if (totale === 0) return '';
    if (dopo == null || dopo >= totale) return "dopo l'ultimo solco";
    return dopo === 0 ? 'prima del solco 1' : "tra il solco ".concat(dopo, " e il solco ").concat(dopo + 1);
  };

  // ---------- Luoghi ----------
  L.luogo = function (c, contenitore) {
    return contenitore ? {
      nome: contenitore.nome,
      solco: null,
      senza: false,
      gruppo: 1
    } : c.solco > 0 ? {
      nome: "Solco ".concat(c.solco),
      solco: c.solco,
      senza: false,
      gruppo: 0
    } : {
      nome: 'Senza posto',
      solco: null,
      senza: true,
      gruppo: 2
    };
  };
  L.cmpLuogo = function (a, b) {
    return a.gruppo - b.gruppo || (a.solco != null && b.solco != null ? a.solco - b.solco : 0) || L.cmpText(a.nome, b.nome);
  };

  // ---------- Rotazione ----------
  L.ANNI_RIPOSO = 2;
  L.avvisiRotazione = function (verdura, dataMessa, solco, oggettoId, altre, storico) {
    var avvisi = [];
    var fam = L.famiglia(verdura);
    if (!fam) return avvisi;
    var stessoPosto = function stessoPosto(oggetto, solcoVoce) {
      return oggettoId != null ? oggetto === oggettoId : oggetto == null && solco > 0 && solcoVoce === solco;
    };
    var passate = altre.map(function (c) {
      return {
        v: c.verdura,
        d: c.data,
        qui: stessoPosto(c.oggettoId == null ? null : c.oggettoId, c.solco)
      };
    }).concat((storico || []).filter(function (t) {
      return t.note === 'Coltura rimossa';
    }).map(function (t) {
      return {
        v: t.sostanza,
        d: t.data,
        qui: stessoPosto(t.oggettoId == null ? null : t.oggettoId, t.solco)
      };
    }));
    var _iterator = _createForOfIteratorHelper(passate),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var p = _step.value;
        if (!p.qui || L.famiglia(p.v) !== fam) continue;
        var giorni = L.diff(L.parse(dataMessa), L.parse(p.d));
        if (giorni < 180 || giorni > L.ANNI_RIPOSO * 365) continue;
        var t = "🔄 ".concat(p.v, " (").concat(fam, ") è stata messa qui il ").concat(L.fmtS(p.d), ": la rotazione consiglia di aspettare almeno ").concat(L.ANNI_RIPOSO, " anni prima di rimettere la stessa famiglia.");
        if (!avvisi.includes(t)) avvisi.push(t);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return avvisi;
  };

  // ---------- Balcone ----------
  L.luceDisponibile = function (esp) {
    return {
      sud: 2,
      est: 1,
      ovest: 1,
      nord: 0
    }[String(esp || '').trim().toLowerCase()];
  };
  var nomeLuce = function nomeLuce(l) {
    return l === 2 ? 'sole pieno' : l === 1 ? 'mezza ombra' : 'anche ombra';
  };
  L.adattaBalcone = function (verdura, orto) {
    var p = L.profilo(verdura);
    if (!p) return true;
    if (!p.vaso) return false;
    var disp = L.luceDisponibile(orto.esposizione);
    return disp === undefined || disp >= p.luce;
  };
  L.consiglioBalcone = function (verdura) {
    var p = L.profilo(verdura);
    return p ? "🪴 ".concat(verdura, ": terriccio profondo almeno ").concat(p.prof, " cm, luce: ").concat(nomeLuce(p.luce), ".") : null;
  };
  L.avvisiBalcone = function (verdura, orto, contenitore) {
    var av = [];
    var p = L.profilo(verdura);
    if (!p) return av;
    var balcone = orto && orto.spazio === 'Balcone';
    if (balcone && !p.vaso) av.push("⚠️ ".concat(verdura, " occupa molto spazio: in vaso rende poco, serve un contenitore molto grande."));
    if (contenitore && contenitore.profCm != null && contenitore.profCm < p.prof) av.push("⚠️ ".concat(contenitore.nome, " è profondo ").concat(contenitore.profCm, " cm: ").concat(verdura, " ne vuole almeno ").concat(p.prof, "."));
    if (balcone) {
      var luce = L.luceDisponibile(orto.esposizione);
      if (luce !== undefined && luce < p.luce) av.push("☀️ ".concat(verdura, " vuole ").concat(nomeLuce(p.luce), ", ma il balcone esposto a ").concat(orto.esposizione, " ne riceve meno."));
    }
    return av;
  };
  L.isBalcone = function (o) {
    return !!o && String(o.spazio || '').toLowerCase() === 'balcone';
  };

  // ---------- Unità di raccolto ----------
  L.interpretaQuantita = function (testo) {
    if (!testo || !String(testo).trim()) return null;
    var m = /^\s*(\d+(?:[.,]\d+)?)\s*(.*)$/.exec(testo);
    if (!m) return null;
    var n = parseFloat(m[1].replace(',', '.'));
    var w = m[2].trim().toLowerCase().replace(/\.$/, '');
    if (['kg', 'chili', 'chilo', 'kilo', 'chilogrammi', 'chilogrammo'].includes(w)) return {
      numero: n,
      unita: 'kg'
    };
    if (['g', 'gr', 'grammi', 'grammo'].includes(w)) return {
      numero: n / 1000,
      unita: 'kg'
    };
    if (['mazzo', 'mazzi', 'mazzetto', 'mazzetti'].includes(w)) return {
      numero: n,
      unita: 'mazzi'
    };
    if (['cespo', 'cespi'].includes(w)) return {
      numero: n,
      unita: 'cespi'
    };
    return {
      numero: n,
      unita: 'pz'
    };
  };
  L.formattaQuantita = function (numero, unita) {
    return numero == null ? '' : "".concat(L.num(numero), " ").concat(unita || '').trim();
  };
  L.testoQuantita = function (r) {
    return r.numero != null ? L.formattaQuantita(r.numero, r.unita) : '';
  };
  L.descriviRaccolto = function (r) {
    var q = L.testoQuantita(r);
    return q ? "".concat(L.fmtS(r.data), ": ").concat(q) : L.fmtS(r.data);
  };
  L.totaliRaccolti = function (raccolti) {
    if (!raccolti.length) return '';
    var per = new Map();
    var senza = 0;
    var _iterator2 = _createForOfIteratorHelper(raccolti),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var r = _step2.value;
        if (r.numero == null) {
          senza++;
          continue;
        }
        per.set(r.unita, (per.get(r.unita) || 0) + r.numero);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    var parti = Array.from(per, function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        u = _ref2[0],
        n = _ref2[1];
      return L.formattaQuantita(n, u);
    });
    if (senza > 0) parti.push(parti.length === 0 ? "".concat(senza, " ").concat(senza === 1 ? 'raccolto' : 'raccolti') : "+ ".concat(senza, " senza quantità"));
    return "🧺 Raccolti: ".concat(parti.join(' · '));
  };
  L.ultimiConcimiPerTipo = function (concimi) {
    var m = new Map();
    var _iterator3 = _createForOfIteratorHelper(concimi),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var t = _step3.value;
        var k = t.sostanza.trim().toLowerCase();
        var cur = m.get(k);
        if (!cur || t.data > cur.data || t.data === cur.data && t.id > cur.id) m.set(k, t);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return Array.from(m.values()).sort(function (a, b) {
      return a.data < b.data ? 1 : a.data > b.data ? -1 : L.cmpText(a.sostanza, b.sostanza);
    }).map(function (t) {
      return "".concat(t.sostanza.trim(), " (").concat(L.fmtS(t.data), ")");
    }).join(', ');
  };
  L.eConcime = function (s) {
    s = String(s).trim().toLowerCase();
    return !(s.startsWith('pacciamatura') || L.eStruttura(s) || s === 'calce' || s === 'sabbia' || s === 'cenere');
  };
  // Le strutture (canne, telo, rete…) sono salvate in trattVerdura con questo prefisso: niente cambi al database, e non contano come concimi.
  L.PREFISSO_STRUTTURA = 'Struttura: ';
  L.eStruttura = function (s) {
    return String(s).trim().toLowerCase().startsWith(L.PREFISSO_STRUTTURA.toLowerCase());
  };
  L.nomeSalvatoStruttura = function (nome) {
    return L.PREFISSO_STRUTTURA + String(nome).trim();
  };
  L.nomeStruttura = function (s) {
    return L.eStruttura(s) ? String(s).trim().slice(L.PREFISSO_STRUTTURA.length).trim() : String(s).trim();
  };
  /** Suggerimento { struttura, giorni, consiglio } per le verdure che crescono in altezza, altrimenti null. */
  L.suggerimentoStruttura = function (verdura) {
    var k = String(verdura).trim().toLowerCase();
    var nome = Object.keys(D.SUGGERIMENTI_STRUTTURE).filter(function (x) {
      return x.toLowerCase() === k;
    })[0];
    return nome ? D.SUGGERIMENTI_STRUTTURE[nome] : null;
  };
  /** Giorno dell'avviso "serve una struttura?", oppure null se non serve (nessun suggerimento o struttura già registrata). Può essere già passato. */
  L.dataAvvisoStruttura = function (c, voci) {
    if (!L.suggerimentoStruttura(c.verdura) || voci.some(function (t) {
      return t.coltId === c.id && L.eStruttura(t.sostanza);
    })) return null;
    return L.add(L.parse(c.data), L.suggerimentoStruttura(c.verdura).giorni);
  };
  L.descriviStruttura = function (t) {
    return "".concat(L.nomeStruttura(t.sostanza), " (").concat(L.fmtS(t.data), ")");
  };
  /** Riga di riepilogo: l'ultima data di ogni struttura, es. "Rete (20/03/2026), Telo (01/04/2026)". */
  L.riepilogoStrutture = function (voci) {
    var m = new Map();
    voci.forEach(function (t) {
      if (!L.eStruttura(t.sostanza)) return;
      var k = L.nomeStruttura(t.sostanza).toLowerCase();
      var cur = m.get(k);
      if (!cur || t.data > cur.data || t.data === cur.data && t.id > cur.id) m.set(k, t);
    });
    return Array.from(m.values()).sort(function (a, b) {
      return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;
    }).map(L.descriviStruttura).join(', ');
  };
  L.descriviTratt = function (t) {
    return t.note === 'Coltura rimossa' ? "🌱 ".concat(t.sostanza, " (messa il ").concat(L.fmtS(t.data), ")") : "".concat(t.sostanza, " (").concat(L.fmtS(t.data), ")");
  };

  // ---------- Prezzi di mercato ----------
  L.haPrezzo = function (verdura) {
    return D.idx.prodotti.has(String(verdura).trim().toLowerCase());
  };
  L.inChili = function (verdura, numero, unita) {
    if (numero == null) return {
      kg: null,
      stimato: false
    };
    if (unita === 'kg') return {
      kg: numero,
      stimato: false
    };
    var peso = D.idx.peso.get(String(verdura).trim().toLowerCase());
    if ((unita === 'pz' || unita === 'cespi') && peso != null) return {
      kg: numero * peso,
      stimato: true
    };
    return {
      kg: null,
      stimato: false
    };
  };
  L.trovaPrezzo = function (prezzi, verdura, data) {
    var d = L.parse(data);
    var scarto = function scarto(p) {
      var i = L.parse(p.inizio),
        f = L.parse(p.fine);
      return d < i ? L.diff(i, d) : d > f ? L.diff(d, f) : 0;
    };
    var c = prezzi.filter(function (p) {
      return L.eq(p.verdura, verdura);
    });
    if (!c.length) return null;
    return c.sort(function (a, b) {
      return scarto(a) - scarto(b) || L.diff(L.parse(a.fine), L.parse(a.inizio)) - L.diff(L.parse(b.fine), L.parse(b.inizio));
    })[0];
  };

  // ---------- Trapianto ----------
  L.statoTrapianto = function (c, inVaschetta, oggi) {
    var g = L.giorniTrapianto(c.verdura);
    if (!inVaschetta || c.trapiantata || g == null) return null;
    var mancano = g - L.diff(oggi, L.parse(c.data));
    return mancano <= 0 ? '🌿 pronta da trapiantare' : mancano === 1 ? '🌿 trapianto domani' : "🌿 trapianto fra ".concat(mancano, " giorni");
  };

  // ---------- Descrizioni ----------
  L.riepilogoOrto = function (orto, colt) {
    var info = [];
    if (L.isBalcone(orto)) info.push(orto.esposizione ? "🪴 Balcone a ".concat(orto.esposizione) : '🪴 Balcone');
    if (L.haPosizione(orto)) info.push("📍 ".concat(orto.localita || 'posizione propria'));
    if (orto.mq > 0) info.push("📐 ".concat(L.num(orto.mq, 2), " m²"));
    if (orto.solchi > 0) info.push("🌾 ".concat(orto.solchi, " solchi"));
    var tot = colt.reduce(function (s, c) {
      return s + L.piantine(c);
    }, 0);
    if (tot > 0) info.push("🌱 ".concat(L.piantineTxt(tot), " in totale"));
    if (orto.note && orto.note.trim()) info.push(orto.note.trim());
    var per = new Map();
    var _iterator4 = _createForOfIteratorHelper(colt),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var c = _step4.value;
        var k = c.verdura.trim().toLowerCase();
        per.set(k, (per.get(k) || 0) + L.piantine(c));
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    var righe = Array.from(per.keys()).sort(L.cmpText).map(function (k) {
      return "".concat(L.piantineTxt(per.get(k)), " di ").concat(k);
    });
    var testo = [info.join(' · ')].concat(righe).filter(function (r) {
      return r !== '';
    }).join('\n');
    return {
      testo,
      visibile: info.length > 0
    };
  };
  L.titoloGruppoOggetti = function (tipo, alveoli, quanti) {
    return "".concat(tipo.emoji, " ").concat(tipo.nome).concat(alveoli > 0 ? " · ".concat(alveoli, " alveoli") : '').concat(quanti > 1 ? " (".concat(quanti, ")") : '');
  };
  L.dettaglioOggetto = function (o, colt, totaleSolchi, abbinamenti, concimi, storico) {
    var tipo = L.tipo(o.tipo);
    var dentroColt = colt.filter(function (c) {
      return c.oggettoId === o.id;
    });
    var det = "Installato il ".concat(L.fmtS(o.data));
    if (o.alveoli > 0) det = "".concat(dentroColt.reduce(function (s, c) {
      return s + L.piantine(c);
    }, 0), "/").concat(o.alveoli, " alveoli occupati · ") + det;
    if (o.profCm > 0) det += " · terriccio ".concat(o.profCm, " cm");
    var pos = tipo.ospita ? L.descriviPosizione(o.dopoSolco, totaleSolchi) : '';
    if (pos) det += " · ".concat(pos);
    var dentro = L.uniqueCI(dentroColt.map(function (c) {
      return c.verdura;
    }));
    if (dentro.length) {
      det += "\nContiene: ".concat(dentro.join(', '));
      for (var i = 0; i < dentro.length; i++) for (var j = i + 1; j < dentro.length; j++) if (L.valuta(dentro[i], dentro[j], abbinamenti) < 0) det += "\n⚠️ ".concat(dentro[i], " e ").concat(dentro[j], " non stanno bene vicine");
    }
    var ec = concimi.slice().sort(function (a, b) {
      return a.data < b.data ? -1 : 1;
    });
    if (ec.length) det += "\n🧪 ".concat(ec.map(L.descriviTratt).join(', '));
    var es = storico.slice().sort(function (a, b) {
      return a.data < b.data ? 1 : -1;
    });
    if (es.length) det += "\n🌱 Storico: ".concat(es.map(function (t) {
      return "".concat(t.sostanza, " ").concat(t.data.slice(0, 4));
    }).join(', '));
    return det;
  };
  L.totaleSolchi = function (orto, colt, tratt) {
    var m = orto ? orto.solchi || 0 : 0;
    var _iterator5 = _createForOfIteratorHelper(colt),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var c = _step5.value;
        if (c.oggettoId == null && c.solco > m) m = c.solco;
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    var _iterator6 = _createForOfIteratorHelper(tratt),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var t = _step6.value;
        if (t.solco > m) m = t.solco;
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    return m;
  };
  L.dettagliColt = function (c, luogo, concimi, raccolti, strutture) {
    var giorni = L.diff(L.today(), L.parse(c.data));
    var quando = giorni <= 0 ? 'oggi' : giorni === 1 ? '1 giorno fa' : "".concat(giorni, " giorni fa");
    var r = [];
    if (luogo) r.push("📍 ".concat(luogo));
    r.push("Messa il ".concat(L.fmtS(c.data), " (").concat(quando, ")"));
    if (c.quantita > 0) r.push("🌱 ".concat(L.piantineTxt(c.quantita)));
    var cat = L.trova(c.verdura);
    if (cat) r.push(L.avanzamento(giorni, L.giorniAlRaccolto(c)).stato);
    var dist = [];
    if (c.distP != null) dist.push("".concat(c.distP, " cm fra le piantine"));
    if (c.distS != null) dist.push("".concat(c.distS, " cm dal solco accanto"));
    if (dist.length) r.push("Distanze: ".concat(dist.join(', ')));
    if (c.ultimaAnn) r.push("💧 Annaffiata il ".concat(L.fmtS(c.ultimaAnn)));
    if (concimi && concimi.length) r.push("🧪 ".concat(concimi.map(function (t) {
      return "".concat(t.sostanza, " (").concat(L.fmtS(t.data), ")");
    }).join(', ')));
    if (strutture && strutture.length) r.push("🏗️ ".concat(strutture.map(L.descriviStruttura).join(', ')));
    if (raccolti && raccolti.length) r.push(L.totaliRaccolti(raccolti));
    if (c.note && c.note.trim()) r.push(c.note.trim());
    return r.join('\n');
  };
  L.rigaCompatta = function (c) {
    var cat = L.trova(c.verdura);
    var giorni = L.diff(L.today(), L.parse(c.data));
    var t = "".concat(L.emoji(c.verdura), " ").concat(c.verdura).concat(c.quantita > 1 ? " ×".concat(c.quantita) : '', " · messa il ").concat(L.fmtS(c.data));
    if (cat && giorni >= 0) {
      var ciclo = L.giorniAlRaccolto(c);
      t += giorni >= ciclo ? ' · 🧺 pronta' : " · 🌱 ".concat(Math.floor(giorni * 100 / ciclo), "%");
    }
    var dist = [];
    if (c.distP != null) dist.push("piantine ".concat(c.distP, " cm"));
    if (c.distS != null) dist.push("solco ".concat(c.distS, " cm"));
    if (dist.length) t += " · ".concat(dist.join(', '));
    return t;
  };

  // ---------- Annaffiatura ----------
  L.SOGLIA_PIOGGIA = 5;
  /** previsione: {giorni:[{data:Date,tMax,pioggia,tMin}]} | null */
  L.valutaAnnaffiatura = function (c, giorno, intervalloBase, allAperto, prev) {
    giorno = new Date(giorno.getFullYear(), giorno.getMonth(), giorno.getDate());
    var ultima = L.parse(c.ultimaAnn || c.data);
    var meteo = new Map((prev && prev.giorni || []).map(function (g) {
      return [L.iso(g.data), g];
    }));
    var note = [];
    if (allAperto && prev) {
      var _oggi = L.today();
      var pioggia = null;
      var _iterator7 = _createForOfIteratorHelper(prev.giorni),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var g = _step7.value;
          if (g.data < _oggi && g.data <= giorno && g.pioggia >= L.SOGLIA_PIOGGIA && (!pioggia || g.data > pioggia)) pioggia = g.data;
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      if (pioggia && pioggia > ultima) {
        ultima = pioggia;
        note.push("ha piovuto il ".concat(L.fmtDM(pioggia)));
      }
    }
    var intervallo = intervalloBase;
    if (L.diff(giorno, L.parse(c.data)) < 14) intervallo *= 0.6;
    var oggi = meteo.get(L.iso(giorno));
    if (oggi) {
      var t = oggi.tMax;
      var f = 1,
        d = '';
      if (t >= 32) {
        f = 0.6;
        d = "molto caldo (".concat(Math.round(t), " °C)");
      } else if (t >= 28) {
        f = 0.8;
        d = "caldo (".concat(Math.round(t), " °C)");
      } else if (t <= 6) {
        f = 2.0;
        d = "freddo (".concat(Math.round(t), " °C)");
      } else if (t <= 12) {
        f = 1.5;
        d = "fresco (".concat(Math.round(t), " °C)");
      } else if (t <= 18) {
        f = 1.2;
      }
      intervallo *= f;
      if (d) note.push(d);
    }
    var passati = L.diff(giorno, ultima);
    var soglia = Math.max(1, Math.round(intervallo));
    if (passati < soglia) return {
      annaffiare: false,
      nota: null
    };
    var domani = meteo.get(L.iso(L.add(giorno, 1)));
    if (allAperto && domani && domani.pioggia >= L.SOGLIA_PIOGGIA && passati < soglia * 1.5) return {
      annaffiare: false,
      nota: null
    };
    return {
      annaffiare: true,
      nota: note.length ? note.join(', ') : null
    };
  };

  // ---------- Calendario attività ----------
  L.ORIZZONTE = 90;
  L.MARGINE_RACCOLTA = 14;
  L.SOGLIA_GELO = 2;
  L.quando = function (data, oggi) {
    var g = L.diff(data, oggi);
    if (g < -1) return "in ritardo di ".concat(-g, " giorni");
    if (g === -1) return 'in ritardo di 1 giorno';
    if (g === 0) return 'oggi';
    if (g === 1) return 'domani';
    return "tra ".concat(g, " giorni");
  };
  /** db: i dati; meteoDi(orto) -> previsione|null; giorniAnnaffiatura: da impostazioni */
  L.costruisciAttivita = function (db, oggi, meteoDi, giorniAnnaffiatura) {
    oggi = new Date(oggi.getFullYear(), oggi.getMonth(), oggi.getDate());
    var out = [];
    var agg = function agg(ortoId, data, tipo, titolo, posto, coltId) {
      if (L.diff(data, oggi) <= L.ORIZZONTE) out.push({
        ortoId,
        data,
        tipo,
        titolo,
        posto,
        coltId
      });
    };
    var _iterator8 = _createForOfIteratorHelper(db.orti),
      _step8;
    try {
      var _loop = function _loop() {
        var orto = _step8.value;
        var prev = meteoDi ? meteoDi(orto) : null;
        var gelo = prev ? L.sortBy(prev.giorni.filter(function (g) {
          return g.data > oggi && g.tMin <= L.SOGLIA_GELO;
        }), function (g) {
          return g.data.getTime();
        })[0] : null;
        var oggetti = new Map(db.oggetti.filter(function (o) {
          return o.ortoId === orto.id;
        }).map(function (o) {
          return [o.id, o];
        }));
        var raccolti = db.raccolti.filter(function (r) {
          return r.ortoId === orto.id;
        });
        var raccolte = new Set(raccolti.map(function (r) {
          return r.coltId;
        }));
        var ultimoRaccolto = new Map();
        var _iterator9 = _createForOfIteratorHelper(raccolti),
          _step9;
        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var r = _step9.value;
            var d = L.parse(r.data);
            if (!ultimoRaccolto.has(r.coltId) || d > ultimoRaccolto.get(r.coltId)) ultimoRaccolto.set(r.coltId, d);
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
        var _iterator0 = _createForOfIteratorHelper(db.coltivazioni.filter(function (x) {
            return x.ortoId === orto.id;
          })),
          _step0;
        try {
          var _loop2 = function _loop2() {
            var c = _step0.value;
            var cat = L.trova(c.verdura);
            var emoji = cat ? cat.emoji : '🌱';
            var cont = c.oggettoId != null ? oggetti.get(c.oggettoId) : null;
            var luogo = cont ? cont.nome : c.solco > 0 ? "solco ".concat(c.solco) : 'senza posto';
            var posto = "".concat(orto.nome, " · ").concat(luogo);
            var messa = L.parse(c.data);
            var giorniRacc = cat ? L.giorniAlRaccolto(c) : 0;
            var annaffia = L.add(L.parse(c.ultimaAnn) || messa, giorniAnnaffiatura);
            agg(orto.id, annaffia > messa ? annaffia : messa, 'annaffia', "💧 Annaffia ".concat(c.verdura), posto, c.id);
            var piano = L.piano(c.verdura);
            if (piano) {
              var conc = db.trattVerdura.filter(function (t) {
                return t.coltId === c.id && L.eConcime(t.sostanza);
              }).map(function (t) {
                return L.parse(t.data);
              });
              var ultimo = conc.length ? new Date(Math.max.apply(Math, _toConsumableArray(conc))) : null;
              var prossimo = !ultimo ? L.add(messa, piano.primoGiorno) : piano.ogniGiorni != null ? L.add(ultimo, piano.ogniGiorni) : null;
              if (prossimo) agg(orto.id, prossimo, 'concima', "🧪 Concima ".concat(c.verdura), "".concat(posto, " · ").concat(piano.concime), c.id);
            }
            var inVaschetta = cont && L.tipo(cont.tipo).conAlveoli;
            var gT = L.giorniTrapianto(c.verdura);
            if (inVaschetta && !c.trapiantata && gT != null) agg(orto.id, L.add(messa, gT), 'trapianta', "🌿 Trapianta ".concat(c.verdura), posto, c.id);
            if (cat && !raccolte.has(c.id)) agg(orto.id, L.add(messa, giorniRacc), 'raccogli', "".concat(emoji, " Raccogli ").concat(c.verdura), posto, c.id);
            if (cat && !cat.perenne) {
              var dur = D.idx.durata.get(c.verdura.trim().toLowerCase());
              var fine = L.add(messa, giorniRacc + (dur != null ? dur : L.MARGINE_RACCOLTA));
              var motivo = 'fine ciclo stimata';
              if (dur == null && ultimoRaccolto.has(c.id)) {
                fine = L.add(ultimoRaccolto.get(c.id), 1);
                motivo = 'già raccolta';
              }
              var coperta = cont && L.tipo(cont.tipo).coperto;
              var matura = L.diff(oggi, messa) >= giorniRacc;
              if (gelo && !coperta && matura && L.sensibileGelo(c.verdura) && L.add(gelo.data, -1) < fine) {
                fine = L.add(gelo.data, -1);
                motivo = "gelo previsto il ".concat(L.fmtDM(gelo.data), " (").concat(Math.round(gelo.tMin), " °C): la pianta non lo regge");
              }
              agg(orto.id, fine > messa ? fine : messa, 'rimuovi', "🗑️ Rimuovi ".concat(c.verdura), "".concat(posto, " · ").concat(motivo), c.id);
            }
          };
          for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
            _loop2();
          }
        } catch (err) {
          _iterator0.e(err);
        } finally {
          _iterator0.f();
        }
      };
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
    return L.sortBy(out, function (a) {
      return a.data.getTime();
    }, function (a) {
      return a.titolo;
    });
  };

  // ---------- Cosa seminare (PianoOrto) ----------
  L.haPosti = function (orto, colt, oggetti) {
    return (orto.solchi || 0) > 0 || colt.some(function (c) {
      return c.oggettoId == null && c.solco > 0;
    }) || oggetti.some(function (o) {
      return L.tipo(o.tipo).ospita;
    });
  };
  var esamina = function esamina(verdura, vicini, abbinamenti) {
    var amici = [];
    var nemici = 0;
    var _iterator1 = _createForOfIteratorHelper(vicini),
      _step1;
    try {
      for (_iterator1.s(); !(_step1 = _iterator1.n()).done;) {
        var n = _step1.value;
        if (L.eq(n, verdura)) continue;
        var e = L.valuta(verdura, n, abbinamenti);
        if (e > 0) amici.push(n);else if (e < 0) nemici++;
      }
    } catch (err) {
      _iterator1.e(err);
    } finally {
      _iterator1.f();
    }
    return {
      amici,
      nemici
    };
  };
  var compagniTxt = function compagniTxt(amici) {
    return amici.length === 0 ? '' : ", accanto a ".concat(amici.join(', '), " 👍");
  };
  L.proponi = function (seminabili, orto, colt, oggetti, abbinamenti) {
    var inTerra = colt.filter(function (c) {
      return c.oggettoId == null && c.solco > 0;
    });
    var totale = Math.max.apply(Math, [orto.solchi || 0].concat(_toConsumableArray(inTerra.map(function (c) {
      return c.solco;
    })), [0]));
    var perSolco = new Map();
    var _iterator10 = _createForOfIteratorHelper(inTerra),
      _step10;
    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var c = _step10.value;
        if (!perSolco.has(c.solco)) perSolco.set(c.solco, []);
        perSolco.get(c.solco).push(c.verdura);
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }
    var ps = function ps(s) {
      return perSolco.get(s) || [];
    };
    var contenitori = oggetti.filter(function (o) {
      return L.tipo(o.tipo).ospita;
    });
    var risultato = [];
    var _iterator11 = _createForOfIteratorHelper(seminabili),
      _step11;
    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var v = _step11.value;
        var posti = [];
        for (var s = 1; s <= totale; s++) {
          var vicini = L.uniqueCI(ps(s).concat(ps(s - 1), ps(s + 1)));
          var _esamina = esamina(v.nome, vicini, abbinamenti),
            amici = _esamina.amici,
            nemici = _esamina.nemici;
          if (nemici > 0) continue;
          var libero = ps(s).length === 0;
          if (!libero && amici.length === 0) continue;
          posti.push({
            testo: "solco ".concat(s, " ").concat(libero ? 'libero' : '(occupato)').concat(compagniTxt(amici)),
            punti: amici.length * 2 + (libero ? 1 : 0),
            ordine: s
          });
        }
        var ordine = totale + 1;
        var _iterator12 = _createForOfIteratorHelper(contenitori),
          _step12;
        try {
          var _loop3 = function _loop3() {
            var o = _step12.value;
            var dentro = L.uniqueCI(colt.filter(function (c) {
              return c.oggettoId === o.id;
            }).map(function (c) {
              return c.verdura;
            }));
            var _esamina2 = esamina(v.nome, dentro, abbinamenti),
              amici = _esamina2.amici,
              nemici = _esamina2.nemici;
            if (nemici > 0) return 1; // continue
            posti.push({
              testo: "".concat(o.nome).concat(compagniTxt(amici)),
              punti: amici.length * 2,
              ordine: ordine++
            });
          };
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            if (_loop3()) continue;
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }
        if (!posti.length) continue;
        var migliori = posti.slice().sort(function (a, b) {
          return b.punti - a.punti || a.ordine - b.ordine;
        }).slice(0, 3);
        risultato.push({
          titolo: "".concat(v.emoji, " ").concat(v.nome),
          dettaglio: migliori.map(function (p) {
            return p.testo;
          }).join(' · '),
          punti: migliori[0].punti
        });
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }
    return risultato.map(function (r, i) {
      return {
        r,
        i
      };
    }).sort(function (a, b) {
      return b.r.punti - a.r.punti || a.i - b.i;
    }).map(function (x) {
      return x.r;
    });
  };
})();