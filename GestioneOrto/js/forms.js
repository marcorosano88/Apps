/* Gestione Orto PWA - moduli e schermate secondarie: verdura, orto, oggetto, calendario semine, compagni, statistiche, spese, impostazioni. */
(function () {
  'use strict';
  const GO = window.GO;
  const { D, L, S, UI, net: ST, V } = GO;
  const h = UI.h;
  const go = (x) => GO.nav.go(x);
  const back = (p) => GO.nav.back(p);
  const ALTRA = 'Altra verdura…';
  const parseQuery = (q) => { const o = {}; new URLSearchParams(q || '').forEach((v, k) => (o[k] = v)); return o; };
  GO.VERSION = '1.0.0';

  const bottoniForm = (annulla, salva, label) => h('div', { class: 'row-gap form-b' },
    h('button', { type: 'button', class: 'btn', onclick: annulla, text: 'Annulla' }),
    h('button', { type: 'submit', class: 'btn primary', text: label || 'Salva' }));
  const grp = (arr, key) => { const m = new Map(); arr.forEach((x) => { const k = key(x); if (!m.has(k)) m.set(k, []); m.get(k).push(x); }); return m; };

  // =====================================================================
  // NUOVA / MODIFICA VERDURA
  // =====================================================================
  V.nuovaColtivazione = ({ id, cid, query }) => {
    const ortoId = +id;
    const q = parseQuery(query);
    const orto = S.orto(ortoId);
    if (!orto) return { title: 'Verdura', back: '#/orti', el: UI.empty('Orto non trovato.') };
    const esistente = +cid > 0 ? S.get('coltivazioni', +cid) : null;
    const altre = S.db.coltivazioni.filter((c) => c.ortoId === ortoId && (!esistente || c.id !== esistente.id));
    const storico = S.db.trattSolco.filter((t) => t.ortoId === ortoId && t.note === 'Coltura rimossa');
    const abb = S.db.abbinamenti;
    const contenitori = S.oggettiOrto(ortoId).filter((o) => L.tipo(o.tipo).ospita);
    const solchi = Math.max(orto.solchi || 0, (esistente && esistente.solco) || 0, ...altre.map((c) => c.solco || 0));
    const posti = [];
    for (let i = 1; i <= solchi; i++) posti.push({ l: `🌾 Solco ${i}`, solco: i, cont: null });
    contenitori.forEach((o) => posti.push({ l: `${L.tipo(o.tipo).emoji} ${o.nome}`, solco: null, cont: o }));

    const nomi = L.nomiCatalogo();
    const fVerdura = UI.field({ label: 'Verdura', type: 'select', options: [{ v: '', l: 'Scegli una verdura…' }].concat(nomi.map((n) => ({ v: n, l: `${L.emoji(n)} ${n}` })), [{ v: ALTRA, l: ALTRA }]), value: '' });
    const fAltra = UI.field({ label: 'Nome della verdura', type: 'text', placeholder: 'es. Topinambur' });
    fAltra.el.hidden = true;
    const fTip = UI.field({ label: 'Tipologia (facoltativa, es. bianca o rossa)', type: 'text', value: esistente ? esistente.tipologia : '' });
    const fDove = UI.field({ label: 'Dove la pianti?', type: 'select', options: [{ v: -1, l: 'Scegli il posto…' }].concat(posti.map((p, i) => ({ v: i, l: p.l }))), value: -1 });
    const nessunPosto = h('p', { class: 'note warn', hidden: posti.length > 0, text: "In questo orto non c'è nessun posto: aggiungi un vaso, una cassetta o un altro contenitore dagli oggetti dell'orto (oppure, in un orto su terreno, indica i solchi da «Modifica orto»)." });
    const fData = UI.field({ label: 'Data di messa a dimora', type: 'date', value: esistente ? esistente.data : L.iso(L.today()), max: L.iso(L.today()) });
    const fModo = UI.field({ label: 'Come la metti a dimora?', type: 'select', options: [{ v: false, l: 'Semina' }, { v: true, l: 'Piantina già cresciuta (trapianto)' }], value: esistente ? !!esistente.trapiantata : false });
    const fQta = UI.field({ label: 'Numero di piantine (facoltativo)', type: 'int', value: esistente && esistente.quantita != null ? esistente.quantita : '' });
    const fDP = UI.field({ label: 'Distanza fra le piantine (cm)', type: 'int', value: esistente && esistente.distP != null ? esistente.distP : '' });
    const fDS = UI.field({ label: 'Distanza dal solco accanto (cm)', type: 'int', value: esistente && esistente.distS != null ? esistente.distS : '' });
    const fNote = UI.field({ label: 'Note', type: 'textarea', value: esistente ? esistente.note : '' });
    const lblConsig = h('p', { class: 'note', hidden: true });
    const lblModo = h('p', { class: 'note warn', hidden: true });
    const lblBalcone = h('p', { class: 'note', hidden: true });
    const lblVicini = h('p', { class: 'note', hidden: true });
    const lblRot = h('p', { class: 'note warn', hidden: true });
    let sugP = null, sugS = null;

    const nome = () => { const s = fVerdura.get(); const n = s === ALTRA ? fAltra.get() : s; return n || null; };
    const posto = () => { const i = fDove.get(); return i >= 0 ? posti[i] : null; };
    const show = (el, txt) => { el.textContent = txt || ''; el.hidden = !txt; };
    const avvisiRot = () => { const n = nome(), p = posto(); return !n || !p ? [] : L.avvisiRotazione(n, fData.get() || L.iso(L.today()), p.solco, p.cont ? p.cont.id : null, altre, storico); };
    const precompila = (campo, prec, nuova) => { if (!campo.get() || campo.get() === prec) campo.set(nuova); };
    const aggiorna = () => {
      const n = nome(), p = posto();
      fAltra.el.hidden = fVerdura.get() !== ALTRA;
      // consigliate
      const d = n ? L.distanze(n) : null;
      precompila(fDP, sugP, d ? String(d.piantine) : null); precompila(fDS, sugS, d ? String(d.solco) : null);
      sugP = d ? String(d.piantine) : null; sugS = d ? String(d.solco) : null;
      show(lblConsig, d ? `Consigliate per ${n}: ${d.piantine} cm fra le piantine, ${d.solco} cm dal solco accanto. Puoi cambiarle.` : '');
      // vicini
      if (!n || !p) lblVicini.hidden = true;
      else {
        const vic = p.cont ? altre.filter((c) => c.oggettoId === p.cont.id) : altre.filter((c) => c.oggettoId == null && c.solco > 0 && Math.abs(c.solco - p.solco) <= 1);
        const righe = [];
        vic.forEach((c) => {
          if (L.eq(c.verdura, n)) return;
          const loc = p.cont ? '' : ` (solco ${c.solco})`;
          const e = L.valuta(n, c.verdura, abb);
          const r = e > 0 ? `👍 ${c.verdura}${loc}: stanno bene vicine` : e < 0 ? `⚠️ ${c.verdura}${loc}: meglio tenerle separate` : null;
          if (r && !righe.includes(r)) righe.push(r);
        });
        show(lblVicini, righe.length ? righe.join('\n') : 'Nessuna indicazione per le verdure già presenti qui intorno.');
      }
      show(lblRot, avvisiRot().join('\n'));
      // balcone
      const bal = [];
      if (n) { if (L.isBalcone(orto) && L.consiglioBalcone(n)) bal.push(L.consiglioBalcone(n)); bal.push(...L.avvisiBalcone(n, orto, p ? p.cont : null)); }
      show(lblBalcone, bal.join('\n'));
      // modo
      const trap = fModo.get() === true;
      const vasch = !!(p && p.cont && L.tipo(p.cont.tipo).conAlveoli);
      show(lblModo, trap ? (vasch ? '⚠️ Una vaschetta alveolare serve per le semine: scegli «Semina» oppure un altro posto.' : 'Il raccolto è stimato togliendo il tempo del semenzaio, perché la piantina è già cresciuta.') : '');
    };
    [fVerdura, fDove, fModo].forEach((f) => f.input.addEventListener('change', aggiorna));
    fData.input.addEventListener('change', aggiorna);
    fAltra.input.addEventListener('input', aggiorna);

    if (esistente) {
      const known = nomi.find((x) => L.eq(x, esistente.verdura));
      if (known) fVerdura.set(known); else { fVerdura.set(ALTRA); fAltra.set(esistente.verdura); }
      const i = esistente.oggettoId != null ? posti.findIndex((p) => p.cont && p.cont.id === esistente.oggettoId) : esistente.solco > 0 ? posti.findIndex((p) => !p.cont && p.solco === esistente.solco) : -1;
      if (i >= 0) fDove.set(i);
      sugP = esistente.distP != null ? String(esistente.distP) : null; sugS = esistente.distS != null ? String(esistente.distS) : null;
    } else if (+q.solco > 0) { const i = posti.findIndex((p) => !p.cont && p.solco === +q.solco); if (i >= 0) fDove.set(i); }
    else if (+q.oggetto > 0) { const i = posti.findIndex((p) => p.cont && p.cont.id === +q.oggetto); if (i >= 0) fDove.set(i); }
    aggiorna();

    const salva = async (e) => {
      e.preventDefault();
      const n = nome();
      if (!n) { await UI.alert('Verdura mancante', 'Scegli o scrivi il nome della verdura.'); return; }
      const p = posto();
      if (!p) { await UI.alert('Luogo mancante', posti.length === 0 ? nessunPosto.textContent : 'Scegli dove pianti la verdura: un solco o un contenitore (vaso, cassetta, vaschetta, serra, aiuola…).'); return; }
      const dist = (f) => { const t = f.get(); if (!t) return { ok: true, v: null }; const v = /^\d+$/.test(t) ? +t : NaN; return v >= 1 && v <= 500 ? { ok: true, v } : { ok: false }; };
      const dp = dist(fDP), ds = dist(fDS);
      if (!dp.ok || !ds.ok) { await UI.alert('Distanza non valida', 'Inserisci un numero intero di centimetri, da 1 a 500.'); return; }
      let quantita = null;
      if (fQta.get()) {
        if (!/^\d+$/.test(fQta.get()) || +fQta.get() < 1 || +fQta.get() > 9999) { await UI.alert('Numero non valido', 'Inserisci il numero di piantine, da 1 a 9999.'); return; }
        quantita = +fQta.get();
      }
      const trap = fModo.get() === true;
      if (p.cont && p.cont.alveoli) {
        const occupati = altre.filter((c) => c.oggettoId === p.cont.id).reduce((s, c) => s + L.piantine(c), 0) + (quantita || 1);
        if (occupati > p.cont.alveoli && !(await UI.confirm('Vaschetta piena', `${p.cont.nome} ha ${p.cont.alveoli} alveoli e con questa verdura ne servirebbero ${occupati}.`, { ok: 'Pianta lo stesso' }))) return;
      }
      if (trap && p.cont && L.tipo(p.cont.tipo).conAlveoli) { await UI.alert('Trapianto in vaschetta', 'Una vaschetta alveolare serve per le semine: scegli «Semina» oppure un altro posto.'); return; }
      const rot = avvisiRot();
      if (rot.length && !(await UI.confirm('Rotazione delle colture', rot.join('\n\n'), { ok: 'Pianta lo stesso' }))) return;
      const c = esistente || S.newColt(ortoId);
      Object.assign(c, { verdura: n, tipologia: fTip.get() || null, data: fData.get() || L.iso(L.today()), note: fNote.get() || null, oggettoId: p.cont ? p.cont.id : null, solco: p.solco, distP: dp.v, distS: ds.v, quantita, trapiantata: trap });
      if (esistente) S.updateColt(); else S.addColt(c);
      back(`#/orto/${ortoId}`);
    };
    const form = h('form', { class: 'form', onsubmit: salva },
      fVerdura.el, fAltra.el, fTip.el, fDove.el, nessunPosto, lblBalcone, lblVicini, lblRot, fData.el, fModo.el, lblModo, fQta.el, fDP.el, fDS.el, lblConsig, fNote.el,
      bottoniForm(() => back(`#/orto/${ortoId}`), salva, esistente ? 'Salva' : 'Aggiungi'));
    return { form: true, title: esistente ? 'Modifica verdura' : 'Nuova verdura', back: `#/orto/${ortoId}`, el: form };
  };

  // =====================================================================
  // NUOVO / MODIFICA ORTO
  // =====================================================================
  V.modificaOrto = ({ id }) => {
    const nuovo = id === 'nuovo';
    const orto = nuovo ? { nome: '', mq: null, solchi: 1, spazio: 'Terreno', esposizione: null, note: null, lat: null, lon: null, localita: null, alt: null } : S.orto(+id);
    if (!orto) return { title: 'Orto', back: '#/orti', el: UI.empty('Orto non trovato.') };
    let pos = L.posizione(orto);
    const fNome = UI.field({ label: 'Nome', type: 'text', value: orto.nome, placeholder: 'es. Orto di casa' });
    const fSpazio = UI.field({ label: 'Tipo di spazio', type: 'select', options: [{ v: 'Terreno', l: '🌾 Terreno (solchi, serre, aiuole)' }, { v: 'Balcone', l: '🪴 Balcone o terrazzo (vasi e cassette)' }], value: L.isBalcone(orto) ? 'Balcone' : 'Terreno' });
    const fMq = UI.field({ label: 'Superficie in m² (facoltativa)', type: 'number', value: orto.mq != null ? L.num(orto.mq, 2) : '' });
    const fSolchi = UI.field({ label: nuovo ? 'Numero di solchi in tutto (obbligatorio, almeno 1)' : 'Numero di solchi in tutto', type: 'int', value: orto.solchi != null ? orto.solchi : '' });
    const fEsp = UI.field({ label: 'Esposizione del balcone', type: 'select', options: [{ v: null, l: 'Non indicata' }].concat(D.ESPOSIZIONI.map((e) => ({ v: e, l: `A ${e}` }))), value: orto.esposizione || null });
    const fNote = UI.field({ label: 'Note', type: 'textarea', value: orto.note });
    const lblPos = h('p', { class: 'note' });
    const fCitta = UI.field({ label: 'Città dell\'orto (per meteo, avvisi e mesi di semina)', type: 'text', placeholder: 'es. Firenze' });
    const mostraPos = () => {
      lblPos.textContent = pos ? `📍 ${pos.localita || `${pos.lat.toFixed(2)}°, ${pos.lon.toFixed(2)}°`}${L.descriviQuota(pos)}: meteo, avvisi e mesi di semina di questo orto useranno questo luogo.`
        : 'Nessuna posizione: senza di essa non ci sono meteo e avvisi di pioggia e gelo per questo orto, e per la semina uso il clima del Centro Italia in pianura.';
    };
    mostraPos();
    const spazio = () => fSpazio.get();
    const sync = () => { fSolchi.el.hidden = spazio() === 'Balcone'; fEsp.el.hidden = spazio() !== 'Balcone'; };
    fSpazio.input.addEventListener('change', sync); sync();
    const conQuota = async (p) => { if (p.alt == null) p.alt = await ST.altitudine(p.lat, p.lon); return p; };
    const cerca = async () => {
      const nome = fCitta.get();
      if (!nome) return;
      try {
        const r = await ST.cercaCitta(nome);
        if (!r.length) { await UI.alert('Città non trovata', `Non trovo «${nome}»: controlla il nome.`); return; }
        let s = r[0];
        if (r.length > 1) { const i = await UI.sheet('Quale città?', r.map((x, i) => ({ label: x.desc, value: i })), { cancel: 'Annulla' }); if (i == null) return; s = r[i]; }
        pos = await conQuota({ lat: s.lat, lon: s.lon, localita: s.nome, alt: s.alt });
        fCitta.set(''); mostraPos();
      } catch (e) { await UI.alert('Ricerca non riuscita', 'Serve la connessione a internet.'); }
    };
    const gps = async () => {
      try { pos = await conQuota(await ST.posizioneAttuale()); mostraPos(); } catch (e) { await UI.alert('Posizione non disponibile', e.message); }
    };
    const salva = async (e) => {
      e.preventDefault();
      const nome = fNome.get();
      if (!nome) { await UI.alert('Nome mancante', "Dai un nome all'orto."); return; }
      let mq = null;
      if (fMq.get()) { mq = L.parseNum(fMq.get()); if (!(mq > 0)) { await UI.alert('Metri quadrati non validi', 'Inserisci un numero maggiore di zero, es. 120 o 85,5.'); return; } }
      let solchi = null;
      const balcone = spazio() === 'Balcone';
      if (balcone) {
        if (!nuovo && S.db.coltivazioni.some((c) => c.ortoId === orto.id && c.oggettoId == null && c.solco > 0)) { await UI.alert('Verdure nei solchi', 'In questo orto ci sono verdure piantate nei solchi: spostale in un contenitore (o trapiantale altrove) prima di passare a balcone.'); return; }
      } else if (fSolchi.get()) {
        const t = fSolchi.get();
        if (!/^\d+$/.test(t) || +t < 1 || +t > 999) { await UI.alert('Solchi non validi', 'Inserisci un numero intero da 1 a 999.'); return; }
        solchi = +t;
        if (!nuovo) {
          const totale = S.totaleSolchi(orto.id);
          if (solchi < totale) {
            const occ = L.uniqueCI([]).concat(Array.from(new Set(S.db.coltivazioni.filter((c) => c.ortoId === orto.id && c.oggettoId == null && c.solco > solchi).map((c) => c.solco)
              .concat(S.trattSolchi(orto.id).filter((x) => x.oggettoId == null && x.solco > solchi).map((x) => x.solco))))).sort((a, b) => a - b);
            if (occ.length) { await UI.alert('Solchi occupati', `Per arrivare a ${solchi} solchi bisognerebbe togliere anche ${occ.length === 1 ? 'il solco' : 'i solchi'} ${occ.join(', ')}, che contengono verdure o concimi. Usa «Rimuovi solco» dal menu del solco: puoi eliminarlo, oppure sostituirlo con un'aiuola rialzata o un passaggio.`); return; }
            if (!(await UI.confirm('Togliere dei solchi?', `Passi da ${totale} a ${solchi} solchi: gli ultimi ${totale - solchi} sono vuoti e verranno tolti.`, { ok: 'Togli' }))) return;
            for (let s = totale; s > solchi; s--) S.rimuoviSolco(orto.id, s, 'nessuna', false);
          }
        }
      } else if (nuovo) { await UI.alert('Solchi mancanti', 'Un nuovo orto deve avere almeno 1 solco.'); return; }
      else solchi = orto.solchi;
      Object.assign(orto, { nome, mq, solchi, spazio: balcone ? 'Balcone' : 'Terreno', esposizione: balcone ? fEsp.get() : null, note: fNote.get() || null,
        lat: pos ? pos.lat : null, lon: pos ? pos.lon : null, localita: pos ? pos.localita : null, alt: pos ? pos.alt : null });
      if (nuovo) S.addOrto(orto); else S.updateOrto();
      if (nuovo) GO.nav.replace(`#/orto/${orto.id}`); else back(`#/orto/${orto.id}`);
    };
    const form = h('form', { class: 'form', onsubmit: salva },
      fNome.el, fSpazio.el, fMq.el, fSolchi.el, fEsp.el,
      h('div', { class: 'card' }, h('div', { class: 'row-t', text: '📍 Posizione' }), lblPos, fCitta.el,
        h('div', { class: 'row-gap' }, h('button', { type: 'button', class: 'btn small', onclick: cerca, text: '🔎 Cerca città' }), h('button', { type: 'button', class: 'btn small', onclick: gps, text: '📍 Usa la mia posizione' }),
          h('button', { type: 'button', class: 'btn small', onclick: () => { pos = null; mostraPos(); }, text: 'Rimuovi' }))),
      fNote.el, bottoniForm(() => (nuovo ? back('#/orti') : back(`#/orto/${orto.id}`)), salva));
    return { form: true, title: nuovo ? 'Nuovo orto' : 'Modifica orto', back: nuovo ? '#/orti' : `#/orto/${orto.id}`, el: form };
  };

  // =====================================================================
  // NUOVO OGGETTO
  // =====================================================================
  V.nuovoOggetto = ({ id }) => {
    const orto = S.orto(+id);
    if (!orto) return { title: 'Oggetto', back: '#/orti', el: UI.empty('Orto non trovato.') };
    const balcone = L.isBalcone(orto);
    const tipi = L.perSpazio(balcone);
    const esistenti = S.oggettiOrto(orto.id);
    const posizioni = L.opzioniPosizione(S.totaleSolchi(orto.id));
    const fTipo = UI.field({ label: 'Tipo di oggetto', type: 'select', options: tipi.map((t) => ({ v: t, l: `${t.emoji} ${t.nome}` })), value: tipi[0] });
    const fNome = UI.field({ label: 'Nome', type: 'text', value: L.nomeSuggerito(tipi[0], esistenti) });
    const fData = UI.field({ label: 'Data di installazione', type: 'date', value: L.iso(L.today()), max: L.iso(L.today()) });
    const fPos = UI.field({ label: 'Posizione fra i solchi', type: 'select', options: posizioni.map((p) => ({ v: p.dopo, l: p.label })), value: null });
    const fAlv = UI.field({ label: 'Numero di alveoli', type: 'select', options: D.ALVEOLI.map((n) => ({ v: n, l: `${n} alveoli` })), value: 6 });
    const fProf = UI.field({ label: 'Profondità del terriccio in cm (facoltativa)', type: 'int' });
    const fTemp = UI.field({ label: 'Temperatura iniziale in °C (facoltativa)', type: 'number' });
    const fMat = UI.field({ label: 'Materiali già inseriti (separati da virgola)', type: 'textarea' });
    const fNote = UI.field({ label: 'Note', type: 'textarea' });
    let suggerito = fNome.get();
    const sync = () => {
      const t = fTipo.get();
      if (!fNome.get() || fNome.get() === suggerito) { suggerito = L.nomeSuggerito(t, esistenti); fNome.set(suggerito); }
      fTemp.el.hidden = fMat.el.hidden = !t.conTemperatura;
      fPos.el.hidden = !(t.ospita && !balcone);
      fAlv.el.hidden = !t.conAlveoli; fProf.el.hidden = !t.conProfondita;
    };
    fTipo.input.addEventListener('change', sync); sync();
    const salva = async (e) => {
      e.preventDefault();
      const t = fTipo.get();
      const nome = fNome.get();
      if (!nome) { await UI.alert('Nome mancante', "Dai un nome all'oggetto."); return; }
      let gradi = null;
      if (t.conTemperatura && fTemp.get()) { gradi = L.parseNum(fTemp.get()); if (isNaN(gradi)) { await UI.alert('Temperatura non valida', 'Inserisci un numero, es. 20 o 20,5.'); return; } }
      let prof = null;
      if (t.conProfondita && fProf.get()) { if (!/^\d+$/.test(fProf.get()) || +fProf.get() < 1 || +fProf.get() > 200) { await UI.alert('Profondità non valida', 'Inserisci un numero di centimetri da 1 a 200.'); return; } prof = +fProf.get(); }
      const data = fData.get() || L.iso(L.today());
      const o = S.addOggetto({ ortoId: orto.id, tipo: t.nome, nome, data, note: fNote.get() || null, dopoSolco: t.ospita && !balcone ? fPos.get() : null, profCm: prof, alveoli: t.conAlveoli ? fAlv.get() : null });
      if (t.conTemperatura) {
        fMat.get().split(/[,\n]/).map((x) => x.trim()).filter(Boolean).forEach((m) => S.db.materiali.push({ id: S.id(), oggettoId: o.id, data, nome: m }));
        if (gradi != null) S.db.letture.push({ id: S.id(), oggettoId: o.id, data: `${data}T${L.pad(new Date().getHours())}:${L.pad(new Date().getMinutes())}`, gradi });
        S.save();
      }
      back(`#/orto/${orto.id}`);
    };
    return { form: true, title: 'Nuovo oggetto', back: `#/orto/${orto.id}`, el: h('form', { class: 'form', onsubmit: salva }, fTipo.el, fNome.el, fData.el, fPos.el, fAlv.el, fProf.el, fTemp.el, fMat.el, fNote.el, bottoniForm(() => back(`#/orto/${orto.id}`), salva, 'Aggiungi')) };
  };

  // =====================================================================
  // OGGETTO (lombricompostiera / compostiera / registro generico)
  // =====================================================================
  const giudizio = (tipo, g) => {
    if (tipo === 'Compostiera') {
      if (g < 20) return ['Fredda: attività lenta. Mescola e aggiungi materiale verde (azoto).', '#1E88E5'];
      if (g < 40) return ['Tiepida: il processo è avviato, rivolta ogni tanto.', '#4682B4'];
      if (g <= 65) return ['Fase calda ideale 👍', '#2E8B57'];
      if (g <= 70) return ['Molto calda: rivolta il cumulo e controlla l\'umidità.', '#FF8C00'];
      return ['Troppo calda: rivolta subito e inumidisci.', '#E53935'];
    }
    if (g < 10) return ['Troppo freddo: le lombriche rallentano. Riparala o aggiungi materiale che scalda.', '#1E88E5'];
    if (g < 15) return ['Un po\' fredda: l\'attività è ridotta.', '#4682B4'];
    if (g <= 25) return ['Temperatura ideale 👍', '#2E8B57'];
    if (g <= 30) return ['Un po\' calda: tienila all\'ombra e controlla l\'umidità.', '#FF8C00'];
    return ['Troppo calda: rischio per le lombriche! Sposta all\'ombra e inumidisci.', '#E53935'];
  };
  V.oggetto = ({ id }) => {
    const o = S.get('oggetti', +id);
    if (!o) return { title: 'Oggetto', back: '#/orti', el: UI.empty('Oggetto non trovato.') };
    const tipo = L.tipo(o.tipo);
    const root = h('div');
    const backTo = `#/orto/${o.ortoId}`;
    root.append(h('h2', { class: 'pg-t', text: `${tipo.emoji} ${o.nome}` }));
    if (tipo.conTemperatura) {
      root.append(UI.note(`${o.tipo === D.LOMBRI ? 'Installata' : 'Installato'} il ${L.fmtS(o.data)} (${L.diff(L.today(), L.parse(o.data))} giorni fa)`));
      if (o.note) root.append(UI.note(o.note));
      const letture = L.sortBy(S.db.letture.filter((x) => x.oggettoId === o.id), (x) => x.data, (x) => x.id).reverse();
      const att = h('div', { class: 'temp' });
      if (letture.length) { const [t, c] = giudizio(o.tipo, letture[0].gradi); att.append(h('div', { class: 'temp-n', text: `${L.num(letture[0].gradi, 1)} °C` }), h('div', { class: 'temp-g', style: { color: c }, text: t })); }
      else att.append(h('div', { class: 'temp-n', text: '—' }), h('div', { class: 'temp-g', text: 'Registra la prima temperatura.' }));
      root.append(UI.card(att));
      root.append(h('div', { class: 'row-gap' },
        h('button', { class: 'btn primary small', text: '🌡️ Aggiungi temperatura', onclick: async () => {
          const t = await UI.prompt('Temperatura', 'Gradi °C misurati:', { type: 'number', placeholder: 'es. 21,5', validate: (v) => (isNaN(L.parseNum(v)) ? 'Inserisci un numero, es. 21 o 21,5.' : null) });
          if (t != null) S.addRiga('letture', { oggettoId: o.id, data: L.nowISO(), gradi: L.parseNum(t) });
        } }),
        h('button', { class: 'btn small', text: '➕ Aggiungi materiale', onclick: async () => {
          const n = await UI.prompt('Materiale', 'Cosa hai aggiunto?', { placeholder: 'es. bucce di patate', validate: (v) => (v ? null : 'Scrivi cosa hai aggiunto.') });
          if (n) S.addRiga('materiali', { oggettoId: o.id, data: L.iso(L.today()), nome: n.trim() });
        } })));
      root.append(h('h3', { class: 'grp', text: 'Temperature (ultime 30)' }), letture.length ? h('div', { class: 'card flush' }, letture.slice(0, 30).map((l) => h('button', { class: 'row', onclick: async () => { if (await UI.confirm('Elimina temperatura', `${L.fmtDT(l.data)} · ${L.num(l.gradi, 1)} °C`, { ok: 'Elimina', danger: true })) S.delRiga('letture', l.id); } }, h('div', { class: 'row-s', text: `${L.fmtDT(l.data)} · ${L.num(l.gradi, 1)} °C` })))) : UI.empty('Nessuna temperatura registrata.'));
      const mat = L.sortBy(S.db.materiali.filter((x) => x.oggettoId === o.id), (x) => x.data, (x) => x.id).reverse();
      root.append(h('h3', { class: 'grp', text: 'Materiali aggiunti' }), mat.length ? h('div', { class: 'card flush' }, mat.map((m) => h('button', { class: 'row', onclick: async () => { if (await UI.confirm('Elimina materiale', m.nome, { ok: 'Elimina', danger: true })) S.delRiga('materiali', m.id); } }, h('div', { class: 'row-s', text: `• ${m.nome}  (${L.fmtS(m.data)})` })))) : UI.empty('Nessun materiale registrato.'));
    } else {
      root.append(UI.note(`${o.tipo} · installato il ${L.fmtS(o.data)}`));
      if (o.note) root.append(UI.note(o.note));
      root.append(h('button', { class: 'btn primary small', text: '＋ Aggiungi voce', onclick: async () => {
        const t = await UI.prompt('Nuova voce', 'Cosa vuoi annotare?', { placeholder: tipo.esempio, validate: (v) => (v ? null : 'Scrivi qualcosa.') });
        if (t) S.addRiga('registro', { oggettoId: o.id, data: L.nowISO(), testo: t.trim() });
      } }));
      const reg = L.sortBy(S.db.registro.filter((x) => x.oggettoId === o.id), (x) => x.data, (x) => x.id).reverse();
      root.append(h('h3', { class: 'grp', text: 'Registro' }), reg.length ? h('div', { class: 'card flush' }, reg.map((v) => h('button', { class: 'row', onclick: async () => { if (await UI.confirm('Elimina voce', v.testo, { ok: 'Elimina', danger: true })) S.delRiga('registro', v.id); } }, h('div', { class: 'row-s', text: `${L.fmtDT(v.data)} · ${v.testo}` })))) : UI.empty('Nessuna voce nel registro.'));
    }
    root.append(h('div', { class: 'sep' }), h('button', { class: 'btn danger block', text: '🗑️ Elimina oggetto', onclick: async () => {
      const dentro = S.db.coltivazioni.filter((c) => c.oggettoId === o.id);
      if (dentro.length) {
        const nomi = L.uniqueCI(dentro.map((c) => c.verdura));
        await UI.alert('Non si può eliminare', `${o.nome} contiene ancora ${dentro.length === 1 ? '1 verdura' : `${dentro.length} verdure`} (${nomi.length > 5 ? nomi.slice(0, 5).join(', ') + '…' : nomi.join(', ')}). Sposta le verdure in un altro posto (Modifica) oppure eliminale, poi riprova.`);
        return;
      }
      if (!(await UI.confirm('Elimina', tipo.conTemperatura ? 'Eliminare questo oggetto con tutto il suo storico?' : 'Eliminare questo oggetto con tutto il suo registro?', { ok: 'Elimina', danger: true }))) return;
      S.deleteOggetto(o.id);
      GO.nav.replace(backTo);
    } }));
    return { title: o.nome, back: backTo, el: root };
  };

  // =====================================================================
  // CALENDARIO SEMINE
  // =====================================================================
  const st2 = { semOrto: 0, soloAdesso: false };
  V.semine = () => {
    const root = h('div');
    const tok = GO.token;
    const orti = S.orti();
    if (st2.semOrto >= orti.length) st2.semOrto = 0;
    const orto = orti[st2.semOrto] || null;
    const cl = L.clima(orto);
    if (orti.length > 1) {
      const sel = UI.field({ label: 'Orto', type: 'select', options: orti.map((o, i) => ({ v: i, l: o.nome })), value: st2.semOrto });
      sel.input.addEventListener('change', () => { st2.semOrto = sel.get(); GO.render(); });
      root.append(sel.el);
    }
    root.append(UI.note(orto ? L.descriviClima(orto) : 'Nessun orto: uso il clima del Centro Italia in pianura'));
    if (orto) {
      const bt = h('div', { class: 'row-gap' },
        h('button', { class: 'btn small', text: '📍 Usa la mia posizione', onclick: async (e) => {
          e.target.disabled = true;
          try { const p = await ST.posizioneAttuale(); if (p.alt == null) p.alt = await ST.altitudine(p.lat, p.lon); Object.assign(orto, { lat: p.lat, lon: p.lon, localita: p.localita, alt: p.alt }); S.save(); }
          catch (err) { await UI.alert('Posizione non disponibile', err.message); } finally { e.target.disabled = false; }
        } }),
        h('button', { class: 'btn small', text: '🔎 Cerca città', onclick: async () => {
          const n = await UI.prompt('Cerca città', 'Nome della città:', { placeholder: 'es. Firenze', ok: 'Cerca', validate: (v) => (v ? null : 'Scrivi il nome della città.') });
          if (!n) return;
          try {
            const r = await ST.cercaCitta(n);
            if (!r.length) { await UI.alert('Città non trovata', `Non trovo «${n}»: controlla il nome.`); return; }
            let s = r[0];
            if (r.length > 1) { const i = await UI.sheet('Quale città?', r.map((x, i) => ({ label: x.desc, value: i })), { cancel: 'Annulla' }); if (i == null) return; s = r[i]; }
            Object.assign(orto, { lat: s.lat, lon: s.lon, localita: s.nome, alt: s.alt == null ? await ST.altitudine(s.lat, s.lon) : s.alt }); S.save();
          } catch (e) { await UI.alert('Ricerca non riuscita', 'Serve la connessione a internet.'); }
        } }));
      root.append(bt);
    }
    const solo = UI.field({ label: 'Solo le verdure da seminare adesso', type: 'checkbox', value: st2.soloAdesso });
    solo.input.addEventListener('change', () => { st2.soloAdesso = solo.get(); GO.render(); });
    root.append(solo.el);
    root.append(h('div', { class: 'legenda' }, h('span', null, h('i', { class: 'lg semina' }), ' Semina'), h('span', null, h('i', { class: 'lg racc' }), ' Raccolta (stimata)')));
    const adesso = L.today().getMonth() + 1;
    const anno = L.today().getFullYear();
    const tab = h('div', { class: 'cal' });
    tab.append(h('div', { class: 'cal-n' }));
    for (let m = 1; m <= 12; m++) tab.append(h('div', { class: 'cal-m' + (m === adesso ? ' now' : ''), text: D.MESI[m - 1].charAt(0).toUpperCase(), title: L.cap(D.MESI_LUNGHI[m - 1]) }));
    D.CATALOGO.slice().sort((a, b) => L.cmpText(a.nome, b.nome)).forEach((v) => {
      const sem = new Set(L.mesiPer(v, cl));
      if (st2.soloAdesso && !sem.has(adesso)) return;
      const rac = new Set(Array.from(sem).map((m) => new Date(anno, m - 1, 15 + v.giorni).getMonth() + 1));
      tab.append(h('button', { class: 'cal-n', text: `${v.emoji} ${v.nome}`, onclick: () => {
        const mesi = (s) => Array.from(s).sort((a, b) => a - b).map((m) => D.MESI[m - 1]).join(', ');
        const d = L.distanze(v.nome);
        UI.alert(`${v.emoji} ${v.nome}`, `${v.come}\n\nSemina: ${mesi(sem)}\nRaccolta stimata: ${mesi(rac)}\nMaturazione: circa ${v.giorni} giorni${d ? `\nDistanze: ${d.piantine} cm fra le piantine, ${d.solco} cm fra i solchi.` : ''}${v.perenne ? '\n🔁 Pianta perenne: resta per anni e continua a produrre.' : ''}`);
      } }));
      for (let m = 1; m <= 12; m++) tab.append(h('div', { class: 'cal-c' }, h('i', { class: sem.has(m) ? 'on s' : '' }), h('i', { class: rac.has(m) ? 'on r' : '' })));
    });
    root.append(h('div', { class: 'cal-wrap' }, tab));
    void tok;
    return { title: 'Calendario semine', back: '#/attivita', el: root };
  };

  // =====================================================================
  // COMPAGNI
  // =====================================================================
  V.compagni = () => {
    const root = h('div');
    root.append(h('h3', { class: 'grp', text: 'I miei abbinamenti' }));
    const miei = S.db.abbinamenti;
    root.append(miei.length ? h('div', { class: 'card flush' }, miei.map((a) => h('button', { class: 'row', onclick: async () => {
      if (await UI.confirm('Elimina abbinamento', `${a.esito > 0 ? '👍' : '👎'} ${a.a} + ${a.b}${a.note ? '\n' + a.note : ''}`, { ok: 'Elimina', danger: true })) S.delRiga('abbinamenti', a.id);
    } }, h('div', { class: 'row-s pre', text: `${a.esito > 0 ? '👍' : '👎'} ${a.a} + ${a.b}${a.note ? '\n' + a.note : ''}` })))) : UI.empty('Nessun abbinamento personale. Aggiungi quelli che hai verificato nel tuo orto: hanno la precedenza sul catalogo.'));
    root.append(h('button', { class: 'btn primary small', text: '＋ Nuovo abbinamento', onclick: nuovoAbbinamento }));
    root.append(h('h3', { class: 'grp', text: 'Catalogo' }),
      h('div', { class: 'card flush' }, L.verdureConCompagni().map((n) => {
        const c = L.compagniDi(n);
        const parti = [];
        if (c.amici.length) parti.push(`👍 ${c.amici.join(', ')}`);
        if (c.nemici.length) parti.push(`👎 ${c.nemici.join(', ')}`);
        return h('div', { class: 'row static' }, h('div', { class: 'row-s pre', text: `${L.emoji(n)} ${n}: ${parti.join('  ·  ')}` }));
      })));
    return { title: 'Compagni', back: '#/attivita', el: root };
  };
  const scegliVerdura = async (titolo) => {
    const nomi = L.nomiCatalogo();
    const s = await UI.sheet(titolo, nomi.concat([ALTRA]), { cancel: 'Annulla' });
    if (!s) return null;
    if (s !== ALTRA) return s;
    const n = await UI.prompt(titolo, 'Nome della verdura:', { ok: 'OK', validate: (v) => (v ? null : 'Scrivi il nome.') });
    return n ? n.trim() : null;
  };
  const nuovoAbbinamento = async () => {
    const a = await scegliVerdura('Prima verdura'); if (!a) return;
    const b = await scegliVerdura(`Insieme a ${a}…`); if (!b) return;
    if (L.eq(a, b)) { await UI.alert('Scelta non valida', 'Scegli due verdure diverse.'); return; }
    const e = await UI.sheet(`${a} + ${b}`, [{ label: '👍 Stanno bene vicine', value: 1 }, { label: '👎 Meglio separarle', value: -1 }], { cancel: 'Annulla' });
    if (e == null) return;
    const note = await UI.prompt('Note', 'Vuoi aggiungere una nota? (facoltativa)', { ok: 'Salva', cancel: 'Salta' });
    S.addRiga('abbinamenti', { a, b, esito: e, note: note && note.trim() ? note.trim() : null });
  };

  // =====================================================================
  // STATISTICHE
  // =====================================================================
  const stS = { orto: '', unita: '' };
  const COLORI_ANNO = ['#2E7D32', '#FB8C00', '#1E88E5', '#8E24AA', '#E53935', '#00ACC1', '#6D4C41', '#F9A825'];
  const nomeVerduraR = (r) => (r.verdura && r.verdura.trim() ? r.verdura : (S.get('coltivazioni', r.coltId) || {}).verdura || 'Verdura eliminata');
  V.statistiche = () => {
    const root = h('div');
    const tutti = S.db.raccolti;
    root.append(h('button', { class: 'btn small', text: '💰 Spese e valore dei raccolti', onclick: () => go('#/spese') }));
    if (!tutti.length) { root.append(UI.empty('Nessun raccolto registrato.\nApri una verdura e scegli «Registra un raccolto».')); return { title: 'Statistiche', el: root }; }
    const orti = L.uniqueCI(tutti.map((r) => r.orto).filter((o) => o && o.trim())).sort(L.cmpText);
    if (stS.orto && !orti.includes(stS.orto)) stS.orto = '';
    const fo = UI.field({ label: 'Orto', type: 'select', options: [{ v: '', l: 'Tutti gli orti' }].concat(orti.map((o) => ({ v: o, l: o }))), value: stS.orto });
    fo.input.addEventListener('change', () => { stS.orto = fo.get(); GO.render(); });
    root.append(fo.el);
    const voci = tutti.filter((r) => !stS.orto || L.eq(r.orto, stS.orto));
    const anni = Array.from(new Set(voci.map((r) => +r.data.slice(0, 4)))).sort((a, b) => b - a);
    const verdure = L.uniqueCI(voci.map(nomeVerduraR)).sort(L.cmpText);
    const perUnita = grp(voci.filter((r) => r.numero != null), (r) => r.unita || '');
    const unitaPresenti = Array.from(perUnita.keys()).sort((a, b) => perUnita.get(b).length - perUnita.get(a).length);
    let unita = stS.unita;
    if (!unitaPresenti.includes(unita)) unita = unitaPresenti[0] || '';
    if (unitaPresenti.length > 1) {
      const fu = UI.field({ label: 'Unità del grafico', type: 'select', options: unitaPresenti.map((u) => ({ v: u, l: u || '(senza unità)' })), value: unita });
      fu.input.addEventListener('change', () => { stS.unita = fu.get(); GO.render(); });
      root.append(fu.el);
    }
    const somma = (rs) => rs.filter((r) => r.numero != null && (r.unita || '') === unita).reduce((s, r) => s + r.numero, 0);
    if (unita) root.append(UI.note(`Il grafico mostra le quantità in ${unita}.`, 'small'));
    // grafico a barre raggruppate
    const valori = verdure.map((v) => anni.map((a) => somma(voci.filter((r) => +r.data.slice(0, 4) === a && L.eq(nomeVerduraR(r), v)))));
    const max = Math.max(1, ...valori.flat());
    const gw = 18, gap = 22, H = 200, padL = 36, padB = 74;
    const larg = padL + verdure.length * (anni.length * gw + gap) + 10;
    const NS = 'http://www.w3.org/2000/svg';
    const el = (n, a, t) => { const e = document.createElementNS(NS, n); Object.keys(a || {}).forEach((k) => e.setAttribute(k, a[k])); if (t != null) e.textContent = t; return e; };
    const svg = el('svg', { viewBox: `0 0 ${larg} ${H + padB}`, width: Math.max(larg, 300), height: H + padB, class: 'chart', role: 'img', 'aria-label': 'Grafico dei raccolti per verdura e anno' });
    for (let i = 0; i <= 4; i++) {
      const y = H - (H * i) / 4;
      svg.append(el('line', { x1: padL, x2: larg, y1: y, y2: y, class: 'ch-grid' }), el('text', { x: padL - 4, y: y + 3, 'text-anchor': 'end', class: 'ch-t' }, L.num((max * i) / 4, 1)));
    }
    verdure.forEach((v, vi) => {
      const x0 = padL + vi * (anni.length * gw + gap) + gap / 2;
      anni.forEach((a, ai) => {
        const val = valori[vi][ai];
        const hh = (val / max) * H;
        svg.append(el('rect', { x: x0 + ai * gw, y: H - hh, width: gw - 2, height: Math.max(hh, val > 0 ? 1 : 0), fill: COLORI_ANNO[ai % COLORI_ANNO.length], rx: 2 }));
      });
      const t = el('text', { x: x0 + (anni.length * gw) / 2, y: H + 12, 'text-anchor': 'end', class: 'ch-t', transform: `rotate(-40 ${x0 + (anni.length * gw) / 2} ${H + 12})` }, v);
      svg.append(t);
    });
    root.append(h('div', { class: 'chart-wrap' }, svg));
    root.append(h('div', { class: 'legenda' }, anni.map((a, i) => h('span', null, h('i', { class: 'lg', style: { background: COLORI_ANNO[i % COLORI_ANNO.length] } }), ` ${a}`))));
    const totali = (rs) => {
      const p = grp(rs.filter((r) => r.numero != null), (r) => r.unita || '');
      const parti = Array.from(p.keys()).sort((a, b) => { const i = D.UNITA.indexOf(a), j = D.UNITA.indexOf(b); return (i < 0 ? 99 : i) - (j < 0 ? 99 : j); }).map((u) => L.formattaQuantita(p.get(u).reduce((s, r) => s + r.numero, 0), u));
      return parti.length ? parti.join(' · ') : 'nessuna quantità';
    };
    anni.forEach((a, ai) => {
      root.append(h('h3', { class: 'grp', style: { color: COLORI_ANNO[ai % COLORI_ANNO.length] }, text: String(a) }));
      const card = h('div', { class: 'card flush' });
      verdure.forEach((v) => {
        const g = voci.filter((r) => +r.data.slice(0, 4) === a && L.eq(nomeVerduraR(r), v));
        if (!g.length) return;
        const ultima = g.map((r) => r.data).sort().pop();
        card.append(h('button', { class: 'row', onclick: () => elencoRaccolti(v, g) }, h('div', { class: 'row-s', text: `${L.emoji(v)} ${v} - totali ${totali(g)} - ${L.fmtS(ultima)}` })));
      });
      root.append(card);
    });
    return { title: 'Statistiche', el: root };
  };
  const elencoRaccolti = async (verdura, gruppo) => {
    const voci = L.sortBy(gruppo, (r) => r.data, (r) => r.id);
    const i = await UI.sheet(`${verdura}: tocca un raccolto`, voci.map((r, k) => ({ label: `${k + 1}. ${L.descriviRaccolto(r)}`, value: k })));
    if (i == null) return;
    const r = voci[i];
    const s = await UI.sheet(`${verdura}: ${L.descriviRaccolto(r)}`, [{ label: 'Modifica', value: 'm' }, { label: 'Elimina', value: 'e', danger: true }]);
    if (s === 'm') await V.modificaRaccoltoVoce(r);
    else if (s === 'e' && (await UI.confirm('Elimina raccolto', `${verdura}: ${L.descriviRaccolto(r)}`, { ok: 'Elimina', danger: true }))) S.delRiga('raccolti', r.id);
  };

  // =====================================================================
  // SPESE
  // =====================================================================
  const stSp = { anno: null, orto: 0, scarico: false, errore: null };
  V.spese = () => {
    const root = h('div');
    const tok = GO.token;
    const spese = S.db.spese, raccolti = S.db.raccolti, orti = S.orti();
    const anni = Array.from(new Set(spese.map((s) => +s.data.slice(0, 4)).concat(raccolti.map((r) => +r.data.slice(0, 4)), [L.today().getFullYear()]))).sort((a, b) => b - a);
    if (!anni.includes(stSp.anno)) stSp.anno = anni[0];
    if (stSp.orto && !orti.some((o) => o.id === stSp.orto)) stSp.orto = 0;
    const anno = stSp.anno, oid = stSp.orto;
    const fa = UI.field({ label: 'Anno', type: 'select', options: anni.map((a) => ({ v: a, l: String(a) })), value: anno });
    const fo = UI.field({ label: 'Orto', type: 'select', options: [{ v: 0, l: 'Tutti gli orti' }].concat(orti.map((o) => ({ v: o.id, l: o.nome }))), value: oid });
    fa.input.addEventListener('change', () => { stSp.anno = fa.get(); GO.render(); scaricaSeServe(stSp.anno); });
    fo.input.addEventListener('change', () => { stSp.orto = fo.get(); GO.render(); });
    root.append(h('div', { class: 'row-gap grow' }, fa.el, fo.el));
    const nomeO = (id) => (id === 0 ? 'generale' : (S.orto(id) || {}).nome || 'orto eliminato');
    const vs = L.sortBy(spese.filter((s) => +s.data.slice(0, 4) === anno && (!oid || s.ortoId === oid)), (s) => s.data, (s) => s.id).reverse();
    const vr = raccolti.filter((r) => +r.data.slice(0, 4) === anno && (!oid || r.ortoId === oid));
    const valoreRacc = (rs) => rs.reduce((tot, r) => {
      const n = nomeVerduraR(r);
      const { kg } = L.inChili(n, r.numero, r.unita);
      const p = L.trovaPrezzo(S.db.prezzi, n, r.data);
      return kg == null || !p ? tot : tot + kg * p.euroKg;
    }, 0);
    const totS = vs.reduce((s, x) => s + x.importo, 0);

    root.append(h('h3', { class: 'grp', text: 'Spese' }));
    root.append(vs.length ? h('div', { class: 'card flush' }, vs.map((s) => h('button', { class: 'row', onclick: () => menuSpesa(s) },
      h('div', { class: 'row-s pre', text: `${L.fmtS(s.data)} · ${s.categoria}${s.descrizione ? ' · ' + s.descrizione : ''}\n${L.euro(s.importo)} · ${nomeO(s.ortoId)}` })))) : UI.empty('Nessuna spesa registrata per questo anno.'));
    root.append(h('button', { class: 'btn primary small', text: '＋ Aggiungi spesa', onclick: async () => { const n = await chiediSpesa(null); if (n) { S.addRiga('spese', n); stSp.anno = +n.data.slice(0, 4); } } }));

    root.append(h('h3', { class: 'grp', text: 'Valore dei raccolti (prezzi di mercato)' }));
    let totR = 0;
    const gruppi = grp(vr, (r) => nomeVerduraR(r).toLowerCase());
    const righe = [];
    Array.from(gruppi.keys()).sort(L.cmpText).forEach((k) => {
      const g = gruppi.get(k), nome = nomeVerduraR(g[0]);
      let kgTot = 0, euro = 0, senza = 0, stim = false;
      g.forEach((r) => {
        const { kg, stimato } = L.inChili(nome, r.numero, r.unita);
        const p = L.trovaPrezzo(S.db.prezzi, nome, r.data);
        if (kg == null || !p) { senza++; return; }
        kgTot += kg; euro += kg * p.euroKg; stim = stim || stimato;
      });
      totR += euro;
      const tit = `${L.emoji(nome)} ${nome}`;
      let t;
      if (kgTot > 0) {
        t = `${tit} · ${L.num(kgTot, 2)} kg · ≈ ${L.euro(euro)} (${L.euro(euro / kgTot)}/kg)`;
        if (stim) t += '\n   peso dei pezzi stimato con un peso medio';
        if (senza > 0) t += `\n   ${senza} raccolt${senza === 1 ? 'o non valorizzato' : 'i non valorizzati'}`;
      } else if (!L.haPrezzo(nome)) t = `${tit} · verdura non coperta dal servizio prezzi`;
      else t = `${tit} · nessun prezzo disponibile per il periodo dei raccolti (o quantità non convertibile in kg)`;
      righe.push(h('div', { class: 'row static' }, h('div', { class: 'row-s pre', text: t })));
    });
    root.append(righe.length ? h('div', { class: 'card flush' }, righe) : UI.empty('Nessun raccolto registrato per questo anno.'));
    const saldo = totR - totS;
    root.append(UI.card(h('div', { class: 'row-t', text: `Spese: ${L.euro(totS)}` }), h('div', { class: 'row-t', text: `Valore dei raccolti (stima): ${L.euro(totR)}` }),
      h('div', { class: 'row-t ' + (saldo >= 0 ? 'pos' : 'neg'), text: `Saldo stimato: ${saldo >= 0 ? '+' : '−'}${L.euro(Math.abs(saldo))}` })));

    // confronto per anno
    root.append(h('h3', { class: 'grp', text: 'Confronto fra anni' }));
    const tb = h('div', { class: 'tbl' }, ['Anno', 'Spese', 'Raccolti', 'Saldo'].map((t) => h('div', { class: 'th', text: t })));
    anni.forEach((a) => {
      const sp = spese.filter((s) => +s.data.slice(0, 4) === a && (!oid || s.ortoId === oid)).reduce((t, s) => t + s.importo, 0);
      const rs = raccolti.filter((r) => +r.data.slice(0, 4) === a && (!oid || r.ortoId === oid));
      const disp = rs.length === 0 || S.db.prezzi.some((p) => +p.inizio.slice(0, 4) === a);
      const val = disp ? valoreRacc(rs) : null;
      const sal = val == null ? null : val - sp;
      const cls = a === anno ? ' sel' : '';
      const tap = () => { stSp.anno = a; GO.render(); scaricaSeServe(a); };
      [String(a), L.euro0(sp), val == null ? 'n.d.' : L.euro0(val), sal == null ? 'n.d.' : `${sal >= 0 ? '+' : '−'}${L.euro0(Math.abs(sal))}`].forEach((t, i) =>
        tb.append(h('button', { class: 'td' + cls + (i === 3 && sal != null ? (sal >= 0 ? ' pos' : ' neg') : ''), text: t, onclick: tap })));
    });
    root.append(tb);

    const ultimo = S.db.prezziAgg[anno] ? new Date(S.db.prezziAgg[anno]) : null;
    const stato = h('p', { class: 'note small' });
    const aggiornaStato = () => { stato.textContent = (stSp.scarico ? 'Scarico i prezzi di mercato…' : ultimo ? `Prezzi di mercato aggiornati il ${L.fmt(ultimo)}.` : 'Prezzi di mercato non ancora scaricati.') + (stSp.errore ? ' ' + stSp.errore : ''); };
    aggiornaStato();
    root.append(stato, h('button', { class: 'btn small', text: '🔄 Aggiorna prezzi', onclick: () => scaricaSeServe(anno, true) }),
      UI.note('Prezzi medi all\'ingrosso (€/kg) dall\'Agri-food data portal della Commissione Europea. Servono la connessione e un portale raggiungibile; i dati scaricati restano salvati sul dispositivo.', 'small'));
    void tok;
    return { title: 'Spese e raccolti', back: '#/statistiche', el: root };
  };
  const scaricaSeServe = async (anno, forza) => {
    if (stSp.scarico || (!forza && !ST.prezziDaAggiornare(anno))) return;
    stSp.scarico = true; stSp.errore = null; GO.render();
    stSp.errore = await ST.scaricaPrezzi(anno);
    stSp.scarico = false;
    GO.render();
  };
  V.speseAvvio = () => {
    const anni = Array.from(new Set(S.db.raccolti.map((r) => +r.data.slice(0, 4)).concat([L.today().getFullYear()]))).sort((a, b) => b - a);
    const da = anni.find((a) => ST.prezziDaAggiornare(a));
    if (da && S.db.raccolti.length && ST.online()) scaricaSeServe(da);
  };
  const menuSpesa = async (s) => {
    const a = await UI.sheet(`${s.categoria} · ${L.euro(s.importo)}`, [{ label: 'Modifica', value: 'm' }, { label: 'Elimina', value: 'e', danger: true }]);
    if (a === 'm') { const n = await chiediSpesa(s); if (n) { Object.assign(s, n); S.save(); } }
    else if (a === 'e' && (await UI.confirm('Elimina spesa', `${L.fmtS(s.data)} · ${s.categoria} · ${L.euro(s.importo)}`, { ok: 'Elimina', danger: true }))) S.delRiga('spese', s.id);
  };
  const chiediSpesa = async (es) => {
    const orti = S.orti();
    const opzOrti = [{ v: 0, l: 'Nessun orto in particolare' }].concat(orti.map((o) => ({ v: o.id, l: o.nome })));
    const r = await UI.form(es ? 'Modifica spesa' : 'Nuova spesa', [
      { key: 'categoria', label: 'Categoria', type: 'select', options: D.CATEGORIE_SPESE.map((c) => ({ v: c, l: c })), value: es ? es.categoria : 'Altro', autofocus: false },
      { key: 'descrizione', label: 'Descrizione (facoltativa)', type: 'text', value: es ? es.descrizione : '' },
      { key: 'importo', label: 'Importo in euro (es. 12,50)', type: 'number', value: es ? L.num(es.importo, 2) : '', autofocus: true },
      { key: 'data', label: 'Data', type: 'date', value: es ? es.data : L.iso(L.today()) },
      { key: 'ortoId', label: 'Orto', type: 'select', options: opzOrti, value: es ? es.ortoId : (stSp.orto || (orti.length === 1 ? orti[0].id : 0)) },
    ], { validate: (v) => (!(L.parseNum(v.importo) > 0) ? 'Scrivi un importo maggiore di zero, ad esempio 12,50.' : !v.data ? 'Scegli la data.' : null) });
    if (!r) return null;
    return { categoria: r.categoria, descrizione: r.descrizione, importo: L.parseNum(r.importo), data: r.data, ortoId: r.ortoId };
  };

  // =====================================================================
  // IMPOSTAZIONI
  // =====================================================================
  const salvaFile = async (nome, testo) => {
    const file = new File([testo], nome, { type: 'application/json' });
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: 'Backup Gestione Orto' }); return; }
    } catch (e) { if (e && e.name === 'AbortError') return; }
    const url = URL.createObjectURL(file);
    const a = h('a', { href: url, download: nome });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };
  V.impostazioni = () => {
    const set = S.set();
    const root = h('div');
    root.append(h('h2', { class: 'pg-t', text: '🌱 Gestione Orto' }), UI.note(`Versione ${GO.VERSION} · app web installabile (PWA)`));
    const sw = (label, key, onchange) => {
      const f = UI.field({ label, type: 'checkbox', value: set[key] });
      f.el.classList.add('switch');
      f.input.addEventListener('change', () => { set[key] = f.get(); if (onchange) onchange(f.get()); S.save(); });
      return f.el;
    };
    const num = (label, key, min, max) => {
      const f = UI.field({ label, type: 'int', value: set[key] });
      f.input.addEventListener('change', () => { const v = parseInt(f.get(), 10); if (!isNaN(v)) set[key] = Math.max(min, Math.min(max, v)); S.save(); });
      return f.el;
    };
    const ora = (label, key) => {
      const f = UI.field({ label, type: 'time', value: set[key] });
      f.input.addEventListener('change', () => { if (f.get()) { set[key] = f.get(); S.save(); } });
      return f.el;
    };
    const sec = (t) => h('h3', { class: 'grp', text: t });
    const sel = UI.field({ label: 'Tema', type: 'select', options: [{ v: 'auto', l: 'Automatico (come il dispositivo)' }, { v: 'light', l: 'Chiaro' }, { v: 'dark', l: 'Scuro' }], value: set.tema });
    sel.input.addEventListener('change', () => { set.tema = sel.get(); GO.applicaTema(); S.save(); });
    root.append(sec('🎨 Aspetto'), sel.el);

    root.append(sec('🔔 Avvisi e promemoria'),
      UI.note('Con le notifiche attive i promemoria (raccolta, annaffiatura, gelo, semina, trapianto, concimazione) arrivano all\'ora giusta anche con l\'app chiusa. Per farlo, l\'app invia al server l\'elenco dei prossimi promemoria (titolo e testo, con i nomi di orti e verdure) e si aggiorna ogni volta che apri l\'app o cambi i dati. Se non le attivi, gli avvisi compaiono nella scheda Attività.', 'small'));
    const notif = 'Notification' in window;
    const nb = UI.field({ label: 'Notifiche (anche con l\'app chiusa)', type: 'checkbox', value: set.notificheBrowser && notif && Notification.permission === 'granted' });
    nb.el.classList.add('switch');
    nb.input.addEventListener('change', async () => {
      if (!nb.get()) { set.notificheBrowser = false; S.save(); if (GO.push) GO.push.disattiva(); return; }
      if (!notif || !GO.push || !GO.push.supportato()) { await UI.alert('Notifiche non disponibili', 'Questo browser non supporta le notifiche. Su iPhone servono iOS 16.4 o successivo e l\'app aggiunta alla schermata Home.'); nb.set(false); return; }
      if (GO.push.isIOS() && !GO.push.standalone()) { await UI.alert('Installa prima l\'app', 'Su iPhone le notifiche funzionano solo con l\'app installata: in Safari tocca Condividi e poi «Aggiungi alla schermata Home», quindi riaprila da lì.'); nb.set(false); return; }
      const p = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
      if (p !== 'granted') { set.notificheBrowser = false; nb.set(false); S.save(); await UI.alert('Permesso negato', 'Per attivare le notifiche consenti il permesso dalle impostazioni del browser.'); return; }
      set.notificheBrowser = true;
      S.save();
      const ok = await GO.push.attiva();
      if (!ok) await UI.alert('Notifiche attivate, ma…', 'Non sono riuscito a registrare il dispositivo sul server (rete o servizio non raggiungibile). Riproverò al prossimo avvio o alla prossima modifica.');
    });
    root.append(nb.el);
    root.append(sw('🧺 Avvisami prima della raccolta', 'promAttivo'), num('Giorni di anticipo (0-30)', 'promGiorni', 0, 30));
    root.append(sw('💧 Ricordami di annaffiare', 'annAttiva'), num('Ogni quanti giorni (1-30)', 'annGiorni', 1, 30), sw('🌦️ Adatta a verdura e meteo', 'annIntelligente'),
      UI.note('Ogni verdura ha il suo intervallo (i pomodori più spesso delle cipolle), più frequente per le piantine appena messe. Il meteo della città di ciascun orto (Open-Meteo) conta la pioggia come annaffiatura, rimanda se domani piove e anticipa se fa molto caldo. Serre e tunnel ignorano la pioggia.', 'small'),
      sw('🌧️ Controlla la pioggia di oggi', 'pioggiaOraria'), num('Soglia pioggia in mm (1-30)', 'pioggiaSoglia', 1, 30),
      UI.note('Quando la pioggia di oggi supera la soglia, nella scheda Attività ti viene chiesto di confermare: con «Sì» le piante nei solchi e nelle aiuole rialzate risultano annaffiate.', 'small'));
    root.append(sw('❄️ Avvisi di gelo', 'geloAttivo'), UI.note('Con una minima di 2 °C o meno prevista per domani, elenca le verdure all\'aperto da coprire (quelle sensibili e le piantine messe a dimora da meno di 30 giorni). Serve la città dell\'orto.', 'small'),
      sw('🌱 Avvisi di semina', 'seminaAttiva'), UI.note('Nei primi giorni del mese elenca cosa si può seminare nel tuo orto.', 'small'),
      sw('🌿 Avvisi di trapianto', 'trapiantoAttivo'), sw('🧪 Avvisi di concimazione', 'concimazioneAttiva'));

    root.append(sec('💾 Dati'),
      UI.note('I dati sono salvati solo su questo dispositivo (nel browser). Esporta un backup JSON per conservarli o spostarli su un altro dispositivo.', 'small'),
      h('div', { class: 'row-gap' },
        h('button', { class: 'btn small', text: '⬇️ Esporta dati (JSON)', onclick: () => salvaFile(`gestione-orto-${L.iso(new Date())}.json`, S.esporta()) }),
        h('button', { class: 'btn small', text: '⬆️ Importa dati…', onclick: () => fileInput.click() }),
        h('button', { class: 'btn small danger', text: '🗑️ Cancella tutti i dati', onclick: async () => {
          if (!(await UI.confirm('Cancella tutti i dati', 'Verranno eliminati orti, verdure, raccolti, spese e impostazioni di questo dispositivo. Esporta prima un backup se vuoi conservarli.', { ok: 'Cancella tutto', danger: true }))) return;
          S.azzera(); GO.applicaTema(); UI.toast('Dati cancellati');
        } })));
    const fileInput = h('input', { type: 'file', accept: '.json,application/json', hidden: true, onchange: async (e) => {
      const f = e.target.files[0];
      e.target.value = '';
      if (!f) return;
      try {
        const testo = await f.text();
        const j = JSON.parse(testo);
        const d = j.dati || j;
        if (!Array.isArray(d.orti)) throw new Error('Il file non contiene dati di Gestione Orto.');
        if (!(await UI.confirm('Importa dati', `Il file contiene ${d.orti.length} orti e ${(d.coltivazioni || []).length} verdure. Sostituirà tutti i dati attuali di questo dispositivo.`, { ok: 'Importa', danger: true }))) return;
        S.importa(testo); GO.applicaTema(); UI.toast('Dati importati');
      } catch (err) { await UI.alert('Importazione non riuscita', err.message || 'File non valido.'); }
    } });
    root.append(fileInput);
    if (S.erroreSalvataggio) root.append(UI.note(S.erroreSalvataggio, 'warn'));

    root.append(sec('📲 Installazione'), UI.note('Su iPhone e iPad apri la pagina in Safari, tocca Condividi e poi «Aggiungi alla schermata Home». Su Android e su computer usa «Installa app» del browser. Dopo il primo caricamento l\'app funziona anche senza rete (il meteo e i prezzi richiedono la connessione).', 'small'));
    root.append(sec('Cosa fa l\'app'), h('div', { class: 'card' }, h('div', { class: 'pre small', text: [
      '• Orti: crea uno o più orti, su terreno (con metri quadrati e numero di solchi) oppure su balcone o terrazzo (solo vasi e cassette, con l\'esposizione). Con la città dell\'orto meteo, avvisi e mesi di semina si adattano al luogo.',
      '• Verdure: annota cosa hai piantato, quando e dove (solco o contenitore), quante piantine e le distanze. Per ognuna stima il raccolto e annota annaffiature, concimi e raccolti (data, numero e unità).',
      '• Trapianto: dal menu di una verdura sposta tutte o alcune piantine in un altro solco o contenitore, anche di un altro orto.',
      '• Balcone: profondità del terriccio e luce consigliate, con avvisi se il contenitore o l\'esposizione non vanno bene.',
      '• Rotazione: avviso se nello stesso posto c\'era la stessa famiglia botanica negli ultimi 2 anni.',
      '• Solchi: sostanze date a tutto il solco, inserimento di solchi e passaggi, rimozione con rinumerazione.',
      '• Oggetti: lombricompostiera e compostiera (temperature e materiali), vasi, cassette, vaschette alveolari, serre, aiuole rialzate, irrigazione e altro, ciascuno con il suo registro.',
      '• Attività: calendario di annaffiatura, concimazione, trapianto, raccolta e rimozione; cosa seminare e dove; schede delle verdure; calendario delle semine; compagni.',
      '• Schema: il disegno dell\'orto con solchi, verdure e oggetti.',
      '• Statistiche e spese: raccolti per anno e verdura, spese e valore stimato dei raccolti.',
    ].join('\n\n') })));
    root.append(h('p', { class: 'copyright', text: '@Marco Rosano' }));
    return { title: 'Impostazioni', el: root };
  };
})();
