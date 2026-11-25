/* Gestione Orto PWA - logica di dominio (porting della logica dell'app iOS). Funzioni pure, senza DOM. */
(function () {
  'use strict';
  const GO = window.GO;
  const D = GO.D;
  const L = (GO.L = {});
  const pad = (n) => String(n).padStart(2, '0');

  // ---------- Date e numeri ----------
  L.pad = pad;
  L.iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  L.parse = (s) => {
    if (!s) return null;
    const [y, m, d] = String(s).slice(0, 10).split('-').map(Number);
    return new Date(y, m - 1, d);
  };
  L.today = () => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); };
  L.add = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  L.diff = (a, b) => Math.round((a - b) / 86400000);
  L.fmt = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  L.fmtS = (s) => (s ? L.fmt(L.parse(s)) : '');
  L.fmtDM = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
  L.nowISO = () => { const n = new Date(); return `${L.iso(n)}T${pad(n.getHours())}:${pad(n.getMinutes())}`; };
  L.fmtDT = (s) => { const d = L.parse(s); return `${L.fmt(d)} ${String(s).slice(11, 16)}`; };
  L.num = (n, dec = 3) => Number(n).toLocaleString('it-IT', { maximumFractionDigits: dec });
  L.euro = (v) => Number(v).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  L.euro0 = (v) => Number(v).toLocaleString('it-IT', { maximumFractionDigits: 0 }) + ' €';
  L.parseNum = (t) => {
    if (t == null) return NaN;
    const s = String(t).trim().replace(',', '.');
    return /^-?\d+(\.\d+)?$/.test(s) ? parseFloat(s) : NaN;
  };
  L.cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  L.eq = (a, b) => String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();
  L.piantineTxt = (n) => (n === 1 ? '1 piantina' : `${n} piantine`);
  L.uniqueCI = (arr) => { const seen = new Set(); return arr.filter((x) => { const k = String(x).toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; }); };
  L.sortBy = (arr, ...fns) => arr.slice().sort((a, b) => { for (const f of fns) { const x = f(a), y = f(b); if (x < y) return -1; if (x > y) return 1; } return 0; });
  L.cmpText = (a, b) => String(a).localeCompare(String(b), 'it', { sensitivity: 'base' });

  // ---------- Catalogo ----------
  L.trova = (nome) => D.idx.catalogo.get(String(nome || '').trim().toLowerCase()) || null;
  L.emoji = (nome) => (L.trova(nome) || {}).emoji || '🌱';
  L.famiglia = (nome) => D.idx.famiglie.get(String(nome || '').trim().toLowerCase()) || null;
  L.profilo = (nome) => D.idx.profili.get(String(nome || '').trim().toLowerCase()) || null;
  L.piano = (nome) => { const p = D.idx.piani.get(String(nome || '').trim().toLowerCase()); return p ? { concime: p[0], primoGiorno: p[1], ogniGiorni: p[2] } : null; };
  L.intervalloBase = (nome) => D.idx.intervalli.get(String(nome || '').trim().toLowerCase()) || 3;
  L.distanze = (nome) => { const d = D.idx.distanze.get(String(nome || '').trim().toLowerCase()); return d ? { piantine: d[0], solco: d[1] } : null; };
  L.giorniTrapianto = (nome) => { const g = D.idx.trapianto.get(String(nome || '').trim().toLowerCase()); return g == null ? null : g; };
  L.sensibileGelo = (nome) => D.idx.gelo.has(String(nome || '').trim().toLowerCase());
  L.nomiCatalogo = () => D.CATALOGO.map((v) => v.nome).sort(L.cmpText);

  L.piantine = (c) => Math.max(c.quantita || 1, 1);
  L.giorniAlRaccolto = (c) => {
    const cat = L.trova(c.verdura);
    if (!cat) return 0;
    const sem = L.giorniTrapianto(c.verdura);
    if (!c.trapiantata || sem == null) return cat.giorni;
    return Math.max(cat.giorni - sem, Math.floor((cat.giorni + 1) / 2));
  };
  /** Avanzamento di crescita: {p (0..1), stato, colore}. */
  L.avanzamento = (giorniTrascorsi, giorniAlRaccolto) => {
    if (giorniTrascorsi < 0)
      return { p: 0, stato: giorniTrascorsi === -1 ? 'Messa a dimora domani' : `Messa a dimora tra ${-giorniTrascorsi} giorni`, colore: '#43A047' };
    const mancano = giorniAlRaccolto - giorniTrascorsi;
    if (mancano > 0)
      return { p: giorniTrascorsi / giorniAlRaccolto, stato: `🌱 ${Math.floor((giorniTrascorsi * 100) / giorniAlRaccolto)}% · ${mancano === 1 ? 'manca 1 giorno' : `mancano ${mancano} giorni`} alla raccolta`, colore: '#43A047' };
    return { p: 1, stato: mancano === 0 ? '🧺 Pronta da raccogliere oggi' : `🧺 Pronta da raccogliere (da ${-mancano} ${mancano === -1 ? 'giorno' : 'giorni'})`, colore: '#FB8C00' };
  };

  // ---------- Clima e posizione ----------
  L.haPosizione = (o) => o && o.lat != null && o.lon != null;
  L.posizione = (o) => (L.haPosizione(o) ? { lat: o.lat, lon: o.lon, localita: o.localita || null, alt: o.alt == null ? null : o.alt } : null);
  L.clima = (orto) => {
    const p = L.posizione(orto);
    if (!p) return { sp: 0, sud: false };
    const eq = Math.abs(p.lat) + Math.max(p.alt || 0, 0) / 100;
    const x = (eq - 43) / 3;
    const mesi = Math.max(-1, Math.min(3, Math.sign(x) * Math.round(Math.abs(x))));
    return { sp: mesi, sud: p.lat < 0 };
  };
  L.mesiPer = (v, clima) => {
    const shift = clima.sp + (clima.sud ? 6 : 0);
    return v.mesi.map((m) => ((((m - 1 + shift) % 12) + 12) % 12) + 1);
  };
  L.siPuoSeminare = (v, clima, mese) => L.mesiPer(v, clima).includes(mese);
  L.climaKey = (c) => `${c.sp}|${c.sud ? 1 : 0}`;
  L.descriviQuota = (p) => (p.alt != null ? ` · ${Math.round(p.alt)} m` : '');
  L.descriviClima = (orto) => {
    const p = L.posizione(orto);
    return p ? `📍 ${p.localita || `${p.lat.toFixed(2)}°, ${p.lon.toFixed(2)}°`}${L.descriviQuota(p)}${p.lat < 0 ? ' · emisfero sud' : ''}`
      : 'Posizione non indicata: uso il clima del Centro Italia in pianura';
  };
  L.suffissoLuogo = (p) => `_${p.lat.toFixed(2)}_${p.lon.toFixed(2)}`;

  // ---------- Compagnia ----------
  L.compagniDi = (verdura) => { const d = D.idx.compagnia.get(String(verdura || '').trim().toLowerCase()); return d ? { amici: d[0], nemici: d[1] } : { amici: [], nemici: [] }; };
  const contiene = (arr, n) => arr.some((x) => L.eq(x, n));
  L.dalCatalogo = (a, b) => {
    const A = L.compagniDi(a), B = L.compagniDi(b);
    if (contiene(A.nemici, b) || contiene(B.nemici, a)) return -1;
    if (contiene(A.amici, b) || contiene(B.amici, a)) return 1;
    return 0;
  };
  /** 1 = vicine, -1 = separate, 0 = nessuna indicazione; gli abbinamenti dell'utente hanno la precedenza. */
  L.valuta = (a, b, utente) => {
    const mio = (utente || []).find((x) => (L.eq(x.a, a) && L.eq(x.b, b)) || (L.eq(x.a, b) && L.eq(x.b, a)));
    return mio ? mio.esito : L.dalCatalogo(a, b);
  };
  L.verdureConCompagni = () => Array.from(D.idx.compagnia.keys()).map((k) => Object.keys(D.COMPAGNIA).find((n) => n.toLowerCase() === k)).sort(L.cmpText);

  // ---------- Tipi di oggetto ----------
  L.tipo = (nome) => {
    const legacy = { semenzaio: D.VASCHETTA, 'vaschetta alveolare da 4': D.VASCHETTA, 'vaschetta alveolare da 6': D.VASCHETTA, 'vaschetta alveolare da 12': D.VASCHETTA, 'vaso o cassetta': 'Vaso' };
    const n = legacy[String(nome || '').toLowerCase()] || nome;
    return D.TIPI.find((t) => L.eq(t.nome, n)) || D.TIPI[0];
  };
  L.tipoBase = (t) => t.nomeBase || t.nome;
  L.perSpazio = (balcone) => (balcone ? D.TIPI.filter((t) => !t.soloTerreno) : D.TIPI);
  L.protetto = (nomeTipo) => L.tipo(nomeTipo).coperto;
  const numFinale = (n) => { const m = /(\d+)\s*$/.exec(n); return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER; };
  L.ordinaOggetti = (oggetti) => L.sortBy(oggetti, (o) => Math.max(0, D.TIPI.indexOf(L.tipo(o.tipo))), (o) => o.alveoli || 0, (o) => numFinale(o.nome), (o) => o.nome.toLowerCase());
  L.nomeSuggerito = (tipo, esistenti) => {
    if (!tipo.ospita) return tipo.nome;
    const usati = new Set(esistenti.map((o) => o.nome.trim().toLowerCase()));
    let n = 1;
    while (usati.has(`${L.tipoBase(tipo)} ${n}`.toLowerCase())) n++;
    return `${L.tipoBase(tipo)} ${n}`;
  };
  L.opzioniPosizione = (totale) => {
    const o = [];
    if (totale > 0) {
      o.push({ label: 'Prima del solco 1', dopo: 0 });
      for (let s = 1; s < totale; s++) o.push({ label: `Tra il solco ${s} e il solco ${s + 1}`, dopo: s });
    }
    o.push({ label: "In fondo (dopo l'ultimo solco)", dopo: null });
    return o;
  };
  L.descriviPosizione = (dopo, totale) => {
    if (totale === 0) return '';
    if (dopo == null || dopo >= totale) return "dopo l'ultimo solco";
    return dopo === 0 ? 'prima del solco 1' : `tra il solco ${dopo} e il solco ${dopo + 1}`;
  };

  // ---------- Luoghi ----------
  L.luogo = (c, contenitore) =>
    contenitore ? { nome: contenitore.nome, solco: null, senza: false, gruppo: 1 }
      : c.solco > 0 ? { nome: `Solco ${c.solco}`, solco: c.solco, senza: false, gruppo: 0 }
        : { nome: 'Senza posto', solco: null, senza: true, gruppo: 2 };
  L.cmpLuogo = (a, b) => (a.gruppo - b.gruppo) || (a.solco != null && b.solco != null ? a.solco - b.solco : 0) || L.cmpText(a.nome, b.nome);

  // ---------- Rotazione ----------
  L.ANNI_RIPOSO = 2;
  L.avvisiRotazione = (verdura, dataMessa, solco, oggettoId, altre, storico) => {
    const avvisi = [];
    const fam = L.famiglia(verdura);
    if (!fam) return avvisi;
    const stessoPosto = (oggetto, solcoVoce) => (oggettoId != null ? oggetto === oggettoId : oggetto == null && solco > 0 && solcoVoce === solco);
    const passate = altre.map((c) => ({ v: c.verdura, d: c.data, qui: stessoPosto(c.oggettoId == null ? null : c.oggettoId, c.solco) }))
      .concat((storico || []).filter((t) => t.note === 'Coltura rimossa').map((t) => ({ v: t.sostanza, d: t.data, qui: stessoPosto(t.oggettoId == null ? null : t.oggettoId, t.solco) })));
    for (const p of passate) {
      if (!p.qui || L.famiglia(p.v) !== fam) continue;
      const giorni = L.diff(L.parse(dataMessa), L.parse(p.d));
      if (giorni < 180 || giorni > L.ANNI_RIPOSO * 365) continue;
      const t = `🔄 ${p.v} (${fam}) è stata messa qui il ${L.fmtS(p.d)}: la rotazione consiglia di aspettare almeno ${L.ANNI_RIPOSO} anni prima di rimettere la stessa famiglia.`;
      if (!avvisi.includes(t)) avvisi.push(t);
    }
    return avvisi;
  };

  // ---------- Balcone ----------
  L.luceDisponibile = (esp) => ({ sud: 2, est: 1, ovest: 1, nord: 0 }[String(esp || '').trim().toLowerCase()]);
  const nomeLuce = (l) => (l === 2 ? 'sole pieno' : l === 1 ? 'mezza ombra' : 'anche ombra');
  L.adattaBalcone = (verdura, orto) => {
    const p = L.profilo(verdura);
    if (!p) return true;
    if (!p.vaso) return false;
    const disp = L.luceDisponibile(orto.esposizione);
    return disp === undefined || disp >= p.luce;
  };
  L.consiglioBalcone = (verdura) => { const p = L.profilo(verdura); return p ? `🪴 ${verdura}: terriccio profondo almeno ${p.prof} cm, luce: ${nomeLuce(p.luce)}.` : null; };
  L.avvisiBalcone = (verdura, orto, contenitore) => {
    const av = [];
    const p = L.profilo(verdura);
    if (!p) return av;
    const balcone = orto && orto.spazio === 'Balcone';
    if (balcone && !p.vaso) av.push(`⚠️ ${verdura} occupa molto spazio: in vaso rende poco, serve un contenitore molto grande.`);
    if (contenitore && contenitore.profCm != null && contenitore.profCm < p.prof) av.push(`⚠️ ${contenitore.nome} è profondo ${contenitore.profCm} cm: ${verdura} ne vuole almeno ${p.prof}.`);
    if (balcone) { const luce = L.luceDisponibile(orto.esposizione); if (luce !== undefined && luce < p.luce) av.push(`☀️ ${verdura} vuole ${nomeLuce(p.luce)}, ma il balcone esposto a ${orto.esposizione} ne riceve meno.`); }
    return av;
  };
  L.isBalcone = (o) => !!o && String(o.spazio || '').toLowerCase() === 'balcone';

  // ---------- Unità di raccolto ----------
  L.interpretaQuantita = (testo) => {
    if (!testo || !String(testo).trim()) return null;
    const m = /^\s*(\d+(?:[.,]\d+)?)\s*(.*)$/.exec(testo);
    if (!m) return null;
    const n = parseFloat(m[1].replace(',', '.'));
    const w = m[2].trim().toLowerCase().replace(/\.$/, '');
    if (['kg', 'chili', 'chilo', 'kilo', 'chilogrammi', 'chilogrammo'].includes(w)) return { numero: n, unita: 'kg' };
    if (['g', 'gr', 'grammi', 'grammo'].includes(w)) return { numero: n / 1000, unita: 'kg' };
    if (['mazzo', 'mazzi', 'mazzetto', 'mazzetti'].includes(w)) return { numero: n, unita: 'mazzi' };
    if (['cespo', 'cespi'].includes(w)) return { numero: n, unita: 'cespi' };
    return { numero: n, unita: 'pz' };
  };
  L.formattaQuantita = (numero, unita) => (numero == null ? '' : `${L.num(numero)} ${unita || ''}`.trim());
  L.testoQuantita = (r) => (r.numero != null ? L.formattaQuantita(r.numero, r.unita) : '');
  L.descriviRaccolto = (r) => { const q = L.testoQuantita(r); return q ? `${L.fmtS(r.data)}: ${q}` : L.fmtS(r.data); };
  L.totaliRaccolti = (raccolti) => {
    if (!raccolti.length) return '';
    const per = new Map();
    let senza = 0;
    for (const r of raccolti) {
      if (r.numero == null) { senza++; continue; }
      per.set(r.unita, (per.get(r.unita) || 0) + r.numero);
    }
    const parti = Array.from(per, ([u, n]) => L.formattaQuantita(n, u));
    if (senza > 0) parti.push(parti.length === 0 ? `${senza} ${senza === 1 ? 'raccolto' : 'raccolti'}` : `+ ${senza} senza quantità`);
    return `🧺 Raccolti: ${parti.join(' · ')}`;
  };
  L.ultimiConcimiPerTipo = (concimi) => {
    const m = new Map();
    for (const t of concimi) {
      const k = t.sostanza.trim().toLowerCase();
      const cur = m.get(k);
      if (!cur || t.data > cur.data || (t.data === cur.data && t.id > cur.id)) m.set(k, t);
    }
    return Array.from(m.values()).sort((a, b) => (a.data < b.data ? 1 : a.data > b.data ? -1 : L.cmpText(a.sostanza, b.sostanza)))
      .map((t) => `${t.sostanza.trim()} (${L.fmtS(t.data)})`).join(', ');
  };
  L.eConcime = (s) => {
    s = String(s).trim().toLowerCase();
    return !(s.startsWith('pacciamatura') || L.eStruttura(s) || s === 'calce' || s === 'sabbia' || s === 'cenere');
  };
  // Le strutture (canne, telo, rete…) sono salvate in trattVerdura con questo prefisso: niente cambi al database, e non contano come concimi.
  L.PREFISSO_STRUTTURA = 'Struttura: ';
  L.eStruttura = (s) => String(s).trim().toLowerCase().startsWith(L.PREFISSO_STRUTTURA.toLowerCase());
  L.nomeSalvatoStruttura = (nome) => L.PREFISSO_STRUTTURA + String(nome).trim();
  L.nomeStruttura = (s) => (L.eStruttura(s) ? String(s).trim().slice(L.PREFISSO_STRUTTURA.length).trim() : String(s).trim());
  /** Suggerimento { struttura, giorni, consiglio } per le verdure che crescono in altezza, altrimenti null. */
  L.suggerimentoStruttura = (verdura) => {
    const k = String(verdura).trim().toLowerCase();
    const nome = Object.keys(D.SUGGERIMENTI_STRUTTURE).find((x) => x.toLowerCase() === k);
    return nome ? D.SUGGERIMENTI_STRUTTURE[nome] : null;
  };
  /** Giorno dell'avviso "serve una struttura?", oppure null se non serve (nessun suggerimento o struttura già registrata). Può essere già passato. */
  L.dataAvvisoStruttura = (c, voci) => {
    if (!L.suggerimentoStruttura(c.verdura) || voci.some((t) => t.coltId === c.id && L.eStruttura(t.sostanza))) return null;
    return L.add(L.parse(c.data), L.suggerimentoStruttura(c.verdura).giorni);
  };
  L.descriviStruttura = (t) => `${L.nomeStruttura(t.sostanza)} (${L.fmtS(t.data)})`;
  /** Riga di riepilogo: l'ultima data di ogni struttura, es. "Rete (20/03/2026), Telo (01/04/2026)". */
  L.riepilogoStrutture = (voci) => {
    const m = new Map();
    for (const t of voci) {
      if (!L.eStruttura(t.sostanza)) continue;
      const k = L.nomeStruttura(t.sostanza).toLowerCase();
      const cur = m.get(k);
      if (!cur || t.data > cur.data || (t.data === cur.data && t.id > cur.id)) m.set(k, t);
    }
    return Array.from(m.values()).sort((a, b) => (a.data < b.data ? -1 : a.data > b.data ? 1 : 0)).map(L.descriviStruttura).join(', ');
  };
  L.descriviTratt = (t) => (t.note === 'Coltura rimossa' ? `🌱 ${t.sostanza} (messa il ${L.fmtS(t.data)})` : `${t.sostanza} (${L.fmtS(t.data)})`);

  // ---------- Prezzi di mercato ----------
  L.haPrezzo = (verdura) => D.idx.prodotti.has(String(verdura).trim().toLowerCase());
  L.inChili = (verdura, numero, unita) => {
    if (numero == null) return { kg: null, stimato: false };
    if (unita === 'kg') return { kg: numero, stimato: false };
    const peso = D.idx.peso.get(String(verdura).trim().toLowerCase());
    if ((unita === 'pz' || unita === 'cespi') && peso != null) return { kg: numero * peso, stimato: true };
    return { kg: null, stimato: false };
  };
  L.trovaPrezzo = (prezzi, verdura, data) => {
    const d = L.parse(data);
    const scarto = (p) => { const i = L.parse(p.inizio), f = L.parse(p.fine); return d < i ? L.diff(i, d) : d > f ? L.diff(d, f) : 0; };
    const c = prezzi.filter((p) => L.eq(p.verdura, verdura));
    if (!c.length) return null;
    return c.sort((a, b) => scarto(a) - scarto(b) || (L.diff(L.parse(a.fine), L.parse(a.inizio)) - L.diff(L.parse(b.fine), L.parse(b.inizio))))[0];
  };

  // ---------- Trapianto ----------
  L.statoTrapianto = (c, inVaschetta, oggi) => {
    const g = L.giorniTrapianto(c.verdura);
    if (!inVaschetta || c.trapiantata || g == null) return null;
    const mancano = g - L.diff(oggi, L.parse(c.data));
    return mancano <= 0 ? '🌿 pronta da trapiantare' : mancano === 1 ? '🌿 trapianto domani' : `🌿 trapianto fra ${mancano} giorni`;
  };

  // ---------- Descrizioni ----------
  L.riepilogoOrto = (orto, colt) => {
    const info = [];
    if (L.isBalcone(orto)) info.push(orto.esposizione ? `🪴 Balcone a ${orto.esposizione}` : '🪴 Balcone');
    if (L.haPosizione(orto)) info.push(`📍 ${orto.localita || 'posizione propria'}`);
    if (orto.mq > 0) info.push(`📐 ${L.num(orto.mq, 2)} m²`);
    if (orto.solchi > 0) info.push(`🌾 ${orto.solchi} solchi`);
    const tot = colt.reduce((s, c) => s + L.piantine(c), 0);
    if (tot > 0) info.push(`🌱 ${L.piantineTxt(tot)} in totale`);
    if (orto.note && orto.note.trim()) info.push(orto.note.trim());
    const per = new Map();
    for (const c of colt) { const k = c.verdura.trim().toLowerCase(); per.set(k, (per.get(k) || 0) + L.piantine(c)); }
    const righe = Array.from(per.keys()).sort(L.cmpText).map((k) => `${L.piantineTxt(per.get(k))} di ${k}`);
    const testo = [info.join(' · ')].concat(righe).filter((r) => r !== '').join('\n');
    return { testo, visibile: info.length > 0 };
  };
  L.titoloGruppoOggetti = (tipo, alveoli, quanti) => `${tipo.emoji} ${tipo.nome}${alveoli > 0 ? ` · ${alveoli} alveoli` : ''}${quanti > 1 ? ` (${quanti})` : ''}`;
  L.dettaglioOggetto = (o, colt, totaleSolchi, abbinamenti, concimi, storico) => {
    const tipo = L.tipo(o.tipo);
    const dentroColt = colt.filter((c) => c.oggettoId === o.id);
    let det = `Installato il ${L.fmtS(o.data)}`;
    if (o.alveoli > 0) det = `${dentroColt.reduce((s, c) => s + L.piantine(c), 0)}/${o.alveoli} alveoli occupati · ` + det;
    if (o.profCm > 0) det += ` · terriccio ${o.profCm} cm`;
    const pos = tipo.ospita ? L.descriviPosizione(o.dopoSolco, totaleSolchi) : '';
    if (pos) det += ` · ${pos}`;
    const dentro = L.uniqueCI(dentroColt.map((c) => c.verdura));
    if (dentro.length) {
      det += `\nContiene: ${dentro.join(', ')}`;
      for (let i = 0; i < dentro.length; i++) for (let j = i + 1; j < dentro.length; j++)
        if (L.valuta(dentro[i], dentro[j], abbinamenti) < 0) det += `\n⚠️ ${dentro[i]} e ${dentro[j]} non stanno bene vicine`;
    }
    const ec = concimi.slice().sort((a, b) => (a.data < b.data ? -1 : 1));
    if (ec.length) det += `\n🧪 ${ec.map(L.descriviTratt).join(', ')}`;
    const es = storico.slice().sort((a, b) => (a.data < b.data ? 1 : -1));
    if (es.length) det += `\n🌱 Storico: ${es.map((t) => `${t.sostanza} ${t.data.slice(0, 4)}`).join(', ')}`;
    return det;
  };
  L.totaleSolchi = (orto, colt, tratt) => {
    let m = orto ? orto.solchi || 0 : 0;
    for (const c of colt) if (c.oggettoId == null && c.solco > m) m = c.solco;
    for (const t of tratt) if (t.solco > m) m = t.solco;
    return m;
  };
  L.dettagliColt = (c, luogo, concimi, raccolti, strutture) => {
    const giorni = L.diff(L.today(), L.parse(c.data));
    const quando = giorni <= 0 ? 'oggi' : giorni === 1 ? '1 giorno fa' : `${giorni} giorni fa`;
    const r = [];
    if (luogo) r.push(`📍 ${luogo}`);
    r.push(`Messa il ${L.fmtS(c.data)} (${quando})`);
    if (c.quantita > 0) r.push(`🌱 ${L.piantineTxt(c.quantita)}`);
    const cat = L.trova(c.verdura);
    if (cat) r.push(L.avanzamento(giorni, L.giorniAlRaccolto(c)).stato);
    const dist = [];
    if (c.distP != null) dist.push(`${c.distP} cm fra le piantine`);
    if (c.distS != null) dist.push(`${c.distS} cm dal solco accanto`);
    if (dist.length) r.push(`Distanze: ${dist.join(', ')}`);
    if (c.ultimaAnn) r.push(`💧 Annaffiata il ${L.fmtS(c.ultimaAnn)}`);
    if (concimi && concimi.length) r.push(`🧪 ${concimi.map((t) => `${t.sostanza} (${L.fmtS(t.data)})`).join(', ')}`);
    if (strutture && strutture.length) r.push(`🏗️ ${strutture.map(L.descriviStruttura).join(', ')}`);
    if (raccolti && raccolti.length) r.push(L.totaliRaccolti(raccolti));
    if (c.note && c.note.trim()) r.push(c.note.trim());
    return r.join('\n');
  };
  L.rigaCompatta = (c) => {
    const cat = L.trova(c.verdura);
    const giorni = L.diff(L.today(), L.parse(c.data));
    let t = `${L.emoji(c.verdura)} ${c.verdura}${c.quantita > 1 ? ` ×${c.quantita}` : ''} · messa il ${L.fmtS(c.data)}`;
    if (cat && giorni >= 0) { const ciclo = L.giorniAlRaccolto(c); t += giorni >= ciclo ? ' · 🧺 pronta' : ` · 🌱 ${Math.floor((giorni * 100) / ciclo)}%`; }
    const dist = [];
    if (c.distP != null) dist.push(`piantine ${c.distP} cm`);
    if (c.distS != null) dist.push(`solco ${c.distS} cm`);
    if (dist.length) t += ` · ${dist.join(', ')}`;
    return t;
  };

  // ---------- Annaffiatura ----------
  L.SOGLIA_PIOGGIA = 5;
  /** previsione: {giorni:[{data:Date,tMax,pioggia,tMin}]} | null */
  L.valutaAnnaffiatura = (c, giorno, intervalloBase, allAperto, prev) => {
    giorno = new Date(giorno.getFullYear(), giorno.getMonth(), giorno.getDate());
    let ultima = L.parse(c.ultimaAnn || c.data);
    const meteo = new Map(((prev && prev.giorni) || []).map((g) => [L.iso(g.data), g]));
    const note = [];
    if (allAperto && prev) {
      const oggi = L.today();
      let pioggia = null;
      for (const g of prev.giorni) if (g.data < oggi && g.data <= giorno && g.pioggia >= L.SOGLIA_PIOGGIA && (!pioggia || g.data > pioggia)) pioggia = g.data;
      if (pioggia && pioggia > ultima) { ultima = pioggia; note.push(`ha piovuto il ${L.fmtDM(pioggia)}`); }
    }
    let intervallo = intervalloBase;
    if (L.diff(giorno, L.parse(c.data)) < 14) intervallo *= 0.6;
    const oggi = meteo.get(L.iso(giorno));
    if (oggi) {
      const t = oggi.tMax;
      let f = 1, d = '';
      if (t >= 32) { f = 0.6; d = `molto caldo (${Math.round(t)} °C)`; }
      else if (t >= 28) { f = 0.8; d = `caldo (${Math.round(t)} °C)`; }
      else if (t <= 6) { f = 2.0; d = `freddo (${Math.round(t)} °C)`; }
      else if (t <= 12) { f = 1.5; d = `fresco (${Math.round(t)} °C)`; }
      else if (t <= 18) { f = 1.2; }
      intervallo *= f;
      if (d) note.push(d);
    }
    const passati = L.diff(giorno, ultima);
    const soglia = Math.max(1, Math.round(intervallo));
    if (passati < soglia) return { annaffiare: false, nota: null };
    const domani = meteo.get(L.iso(L.add(giorno, 1)));
    if (allAperto && domani && domani.pioggia >= L.SOGLIA_PIOGGIA && passati < soglia * 1.5) return { annaffiare: false, nota: null };
    return { annaffiare: true, nota: note.length ? note.join(', ') : null };
  };

  // ---------- Calendario attività ----------
  L.ORIZZONTE = 90;
  L.MARGINE_RACCOLTA = 14;
  L.SOGLIA_GELO = 2;
  L.quando = (data, oggi) => {
    const g = L.diff(data, oggi);
    if (g < -1) return `in ritardo di ${-g} giorni`;
    if (g === -1) return 'in ritardo di 1 giorno';
    if (g === 0) return 'oggi';
    if (g === 1) return 'domani';
    return `tra ${g} giorni`;
  };
  /** db: i dati; meteoDi(orto) -> previsione|null; giorniAnnaffiatura: da impostazioni */
  L.costruisciAttivita = (db, oggi, meteoDi, giorniAnnaffiatura) => {
    oggi = new Date(oggi.getFullYear(), oggi.getMonth(), oggi.getDate());
    const out = [];
    const agg = (ortoId, data, tipo, titolo, posto, coltId) => { if (L.diff(data, oggi) <= L.ORIZZONTE) out.push({ ortoId, data, tipo, titolo, posto, coltId }); };
    for (const orto of db.orti) {
      const prev = meteoDi ? meteoDi(orto) : null;
      const gelo = prev ? L.sortBy(prev.giorni.filter((g) => g.data > oggi && g.tMin <= L.SOGLIA_GELO), (g) => g.data.getTime())[0] : null;
      const oggetti = new Map(db.oggetti.filter((o) => o.ortoId === orto.id).map((o) => [o.id, o]));
      const raccolti = db.raccolti.filter((r) => r.ortoId === orto.id);
      const raccolte = new Set(raccolti.map((r) => r.coltId));
      const ultimoRaccolto = new Map();
      for (const r of raccolti) { const d = L.parse(r.data); if (!ultimoRaccolto.has(r.coltId) || d > ultimoRaccolto.get(r.coltId)) ultimoRaccolto.set(r.coltId, d); }
      for (const c of db.coltivazioni.filter((x) => x.ortoId === orto.id)) {
        const cat = L.trova(c.verdura);
        const emoji = cat ? cat.emoji : '🌱';
        const cont = c.oggettoId != null ? oggetti.get(c.oggettoId) : null;
        const luogo = cont ? cont.nome : c.solco > 0 ? `solco ${c.solco}` : 'senza posto';
        const posto = `${orto.nome} · ${luogo}`;
        const messa = L.parse(c.data);
        const giorniRacc = cat ? L.giorniAlRaccolto(c) : 0;

        const annaffia = L.add(L.parse(c.ultimaAnn) || messa, giorniAnnaffiatura);
        agg(orto.id, annaffia > messa ? annaffia : messa, 'annaffia', `💧 Annaffia ${c.verdura}`, posto, c.id);

        const piano = L.piano(c.verdura);
        if (piano) {
          const conc = db.trattVerdura.filter((t) => t.coltId === c.id && L.eConcime(t.sostanza)).map((t) => L.parse(t.data));
          const ultimo = conc.length ? new Date(Math.max(...conc)) : null;
          const prossimo = !ultimo ? L.add(messa, piano.primoGiorno) : piano.ogniGiorni != null ? L.add(ultimo, piano.ogniGiorni) : null;
          if (prossimo) agg(orto.id, prossimo, 'concima', `🧪 Concima ${c.verdura}`, `${posto} · ${piano.concime}`, c.id);
        }

        const inVaschetta = cont && L.tipo(cont.tipo).conAlveoli;
        const gT = L.giorniTrapianto(c.verdura);
        if (inVaschetta && !c.trapiantata && gT != null) agg(orto.id, L.add(messa, gT), 'trapianta', `🌿 Trapianta ${c.verdura}`, posto, c.id);

        if (cat && !raccolte.has(c.id)) agg(orto.id, L.add(messa, giorniRacc), 'raccogli', `${emoji} Raccogli ${c.verdura}`, posto, c.id);

        if (cat && !cat.perenne) {
          const dur = D.idx.durata.get(c.verdura.trim().toLowerCase());
          let fine = L.add(messa, giorniRacc + (dur != null ? dur : L.MARGINE_RACCOLTA));
          let motivo = 'fine ciclo stimata';
          if (dur == null && ultimoRaccolto.has(c.id)) { fine = L.add(ultimoRaccolto.get(c.id), 1); motivo = 'già raccolta'; }
          const coperta = cont && L.tipo(cont.tipo).coperto;
          const matura = L.diff(oggi, messa) >= giorniRacc;
          if (gelo && !coperta && matura && L.sensibileGelo(c.verdura) && L.add(gelo.data, -1) < fine) {
            fine = L.add(gelo.data, -1);
            motivo = `gelo previsto il ${L.fmtDM(gelo.data)} (${Math.round(gelo.tMin)} °C): la pianta non lo regge`;
          }
          agg(orto.id, fine > messa ? fine : messa, 'rimuovi', `🗑️ Rimuovi ${c.verdura}`, `${posto} · ${motivo}`, c.id);
        }
      }
    }
    return L.sortBy(out, (a) => a.data.getTime(), (a) => a.titolo);
  };

  // ---------- Cosa seminare (PianoOrto) ----------
  L.haPosti = (orto, colt, oggetti) => (orto.solchi || 0) > 0 || colt.some((c) => c.oggettoId == null && c.solco > 0) || oggetti.some((o) => L.tipo(o.tipo).ospita);
  const esamina = (verdura, vicini, abbinamenti) => {
    const amici = [];
    let nemici = 0;
    for (const n of vicini) {
      if (L.eq(n, verdura)) continue;
      const e = L.valuta(verdura, n, abbinamenti);
      if (e > 0) amici.push(n); else if (e < 0) nemici++;
    }
    return { amici, nemici };
  };
  const compagniTxt = (amici) => (amici.length === 0 ? '' : `, accanto a ${amici.join(', ')} 👍`);
  L.proponi = (seminabili, orto, colt, oggetti, abbinamenti) => {
    const inTerra = colt.filter((c) => c.oggettoId == null && c.solco > 0);
    const totale = Math.max(orto.solchi || 0, ...inTerra.map((c) => c.solco), 0);
    const perSolco = new Map();
    for (const c of inTerra) { if (!perSolco.has(c.solco)) perSolco.set(c.solco, []); perSolco.get(c.solco).push(c.verdura); }
    const ps = (s) => perSolco.get(s) || [];
    const contenitori = oggetti.filter((o) => L.tipo(o.tipo).ospita);
    const risultato = [];
    for (const v of seminabili) {
      const posti = [];
      for (let s = 1; s <= totale; s++) {
        const vicini = L.uniqueCI(ps(s).concat(ps(s - 1), ps(s + 1)));
        const { amici, nemici } = esamina(v.nome, vicini, abbinamenti);
        if (nemici > 0) continue;
        const libero = ps(s).length === 0;
        if (!libero && amici.length === 0) continue;
        posti.push({ testo: `solco ${s} ${libero ? 'libero' : '(occupato)'}${compagniTxt(amici)}`, punti: amici.length * 2 + (libero ? 1 : 0), ordine: s });
      }
      let ordine = totale + 1;
      for (const o of contenitori) {
        const dentro = L.uniqueCI(colt.filter((c) => c.oggettoId === o.id).map((c) => c.verdura));
        const { amici, nemici } = esamina(v.nome, dentro, abbinamenti);
        if (nemici > 0) continue;
        posti.push({ testo: `${o.nome}${compagniTxt(amici)}`, punti: amici.length * 2, ordine: ordine++ });
      }
      if (!posti.length) continue;
      const migliori = posti.slice().sort((a, b) => b.punti - a.punti || a.ordine - b.ordine).slice(0, 3);
      risultato.push({ titolo: `${v.emoji} ${v.nome}`, dettaglio: migliori.map((p) => p.testo).join(' · '), punti: migliori[0].punti });
    }
    return risultato.map((r, i) => ({ r, i })).sort((a, b) => b.r.punti - a.r.punti || a.i - b.i).map((x) => x.r);
  };
})();
