/* Gestione Orto PWA - schermate principali: Attività, Orti, dettaglio orto, Schema + azioni condivise (menu verdura, solco, contenitore). */
(function () {
  'use strict';
  const GO = window.GO;
  const { D, L, S, UI, net: ST } = GO;
  const h = UI.h;
  const V = (GO.V = {});
  V.st = {
    att: { sez: 'cal', orto: 0, ricerca: '' },
    orto: { sez: 'pan', filtro: 'Tutte le verdure', ricerca: '' },
    schema: { ortoId: 0 },
  };
  const go = (x) => GO.nav.go(x);
  const gruppoVoci = (arr, key) => { const m = new Map(); arr.forEach((x) => { const k = key(x); if (!m.has(k)) m.set(k, []); m.get(k).push(x); }); return m; };
  const nomeOrto = (id) => { const o = S.orto(id); return o ? o.nome : 'orto eliminato'; };

  // =====================================================================
  // Azioni condivise
  // =====================================================================
  V.scegliSostanza = async (titolo) => {
    const n = await UI.sheet(titolo, D.SUGGERIMENTI_CONCIMI.concat(['Altro…']), { cancel: 'Annulla' });
    if (!n) return null;
    if (n === 'Altro…') {
      const a = await UI.prompt('Altra sostanza', 'Nome della sostanza:', { ok: 'Avanti', validate: (v) => (v ? null : 'Scrivi il nome della sostanza.') });
      return a ? a.trim() : null;
    }
    return n;
  };

  V.aggiungiConcimeVerdura = async (c) => {
    const nome = await V.scegliSostanza(`Cosa aggiungi a ${c.verdura}?`);
    if (!nome) return false;
    const data = await UI.askDate(`Data di inserimento: ${nome}`, L.iso(L.today()));
    if (!data) return false;
    S.addRiga('trattVerdura', { ortoId: c.ortoId, coltId: c.id, sostanza: nome, data });
    return true;
  };
  const scegliVoce = async (titolo, etichette) => {
    const i = await UI.sheet(titolo, etichette.map((e, i) => ({ label: e, value: i })), { cancel: 'Annulla' });
    return i == null ? -1 : i;
  };
  V.modificaSostanzaData = async (sostanza, data) => {
    const nome = await UI.prompt('Modifica sostanza', 'Nome della sostanza:', { value: sostanza, ok: 'Avanti', validate: (v) => (v ? null : 'Scrivi il nome della sostanza.') });
    if (!nome) return null;
    const nd = await UI.askDate(`Data di inserimento: ${nome.trim()}`, data);
    return nd ? { sostanza: nome.trim(), data: nd } : null;
  };

  const formRaccolto = async (verdura, r) => {
    const pref = S.set().unitaPref[verdura.trim().toLowerCase()] || 'pz';
    const res = await UI.form(r ? `Modifica raccolto: ${verdura}` : `Registra raccolto: ${verdura}`, [
      { key: 'data', label: 'Data del raccolto', type: 'date', value: r ? r.data : L.iso(L.today()), autofocus: false },
      { key: 'numero', label: 'Quantità raccolta (solo il numero, es. 5 o 2,5; facoltativa)', type: 'number', value: r && r.numero != null ? L.num(r.numero) : '', autofocus: true },
      { key: 'unita', label: 'Unità di misura', type: 'select', options: D.UNITA.map((u) => ({ v: u, l: u })), value: r && r.unita ? r.unita : pref },
    ], { ok: 'Salva', validate: (v) => (!v.data ? 'Scegli la data.' : v.numero && !(L.parseNum(v.numero) >= 0) ? 'Scrivi un numero, ad esempio 5 oppure 2,5.' : null) });
    if (!res) return null;
    const numero = res.numero ? L.parseNum(res.numero) : null;
    if (numero != null) S.set().unitaPref[verdura.trim().toLowerCase()] = res.unita;
    return { data: res.data, numero, unita: numero == null ? '' : res.unita };
  };
  V.registraRaccolto = async (c) => {
    const r = await formRaccolto(c.verdura, null);
    if (!r) return false;
    const orto = S.orto(c.ortoId);
    S.addRiga('raccolti', { ortoId: c.ortoId, coltId: c.id, verdura: c.verdura, orto: orto ? orto.nome : '', data: r.data, numero: r.numero, unita: r.unita, note: null });
    return true;
  };
  V.modificaRaccoltoVoce = async (r) => {
    const n = await formRaccolto(r.verdura, r);
    if (!n) return false;
    Object.assign(r, n);
    S.save();
    return true;
  };

  /** Menu che si apre toccando una verdura. Ritorna true se qualcosa è cambiato. */
  V.menuVerdura = async (coltId) => {
    const c = S.get('coltivazioni', coltId);
    if (!c) return false;
    const concimi = L.sortBy(S.db.trattVerdura.filter((t) => t.coltId === c.id), (t) => t.data);
    const raccolti = L.sortBy(S.db.raccolti.filter((r) => r.coltId === c.id), (r) => r.data, (r) => r.id);
    const cont = c.oggettoId != null ? S.get('oggetti', c.oggettoId) : null;
    const luogo = `${nomeOrto(c.ortoId)} · ${cont ? cont.nome : c.solco > 0 ? `solco ${c.solco}` : 'senza posto'}`;
    const titolo = `${L.emoji(c.verdura)} ${c.verdura}${c.tipologia ? ' ' + c.tipologia : ''}\n${L.dettagliColt(c, luogo, concimi, raccolti)}`;
    const voci = [
      { label: '💧 Annaffiata oggi', value: 'ann' }, { label: "💧 Annaffiata in un'altra data…", value: 'annd' },
      { label: '🧪 Aggiungi concime / sostanza', value: 'cadd' },
    ];
    if (concimi.length) voci.push({ label: '🧪 Modifica un concime', value: 'cmod' }, { label: '🧪 Elimina un concime', value: 'cdel' });
    voci.push({ label: '🧺 Registra un raccolto', value: 'radd' });
    if (raccolti.length) voci.push({ label: '🧺 Modifica un raccolto', value: 'rmod' }, { label: '🧺 Elimina un raccolto', value: 'rdel' });
    voci.push({ label: '🌱 Trapianta…', value: 'trap' }, { label: 'Modifica', value: 'mod' }, { label: 'Elimina', value: 'del', danger: true });
    const s = await UI.sheet(titolo, voci);
    switch (s) {
      case 'ann': c.ultimaAnn = L.iso(L.today()); S.save(); return true;
      case 'annd': { const d = await UI.askDate("Data dell'annaffiatura", c.ultimaAnn || L.iso(L.today())); if (!d) return false; c.ultimaAnn = d; S.save(); return true; }
      case 'cadd': return V.aggiungiConcimeVerdura(c);
      case 'cmod': {
        const i = await scegliVoce(`Modifica quale voce di ${c.verdura}?`, concimi.map((t) => `${t.sostanza} (${L.fmtS(t.data)})`));
        if (i < 0) return false;
        const n = await V.modificaSostanzaData(concimi[i].sostanza, concimi[i].data);
        if (!n) return false;
        Object.assign(concimi[i], n); S.save(); return true;
      }
      case 'cdel': {
        const i = await scegliVoce(`Elimina quale voce di ${c.verdura}?`, concimi.map((t) => `${t.sostanza} (${L.fmtS(t.data)})`));
        if (i < 0) return false;
        S.delRiga('trattVerdura', concimi[i].id); return true;
      }
      case 'radd': return V.registraRaccolto(c);
      case 'rmod': {
        const i = await scegliVoce(`Modifica quale raccolto di ${c.verdura}?`, raccolti.map(L.descriviRaccolto));
        return i >= 0 && V.modificaRaccoltoVoce(raccolti[i]);
      }
      case 'rdel': {
        const i = await scegliVoce(`Elimina quale raccolto di ${c.verdura}?`, raccolti.map(L.descriviRaccolto));
        if (i < 0) return false;
        S.delRiga('raccolti', raccolti[i].id); return true;
      }
      case 'trap': return V.trapianta(c);
      case 'mod': go(`#/orto/${c.ortoId}/verdura/${c.id}`); return false;
      case 'del': return V.eliminaColt(c);
      default: return false;
    }
  };

  V.eliminaColt = async (c) => {
    const fam = L.famiglia(c.verdura);
    const posto = c.oggettoId != null ? 'in questa serra o aiuola' : c.solco > 0 ? `nel solco ${c.solco}` : null;
    let avviso = 'Verranno eliminati anche i suoi concimi e trattamenti. I raccolti registrati restano.';
    if (fam && posto) avviso += `\n\nPer la rotazione resterà annotato che ${posto} c'era una pianta di famiglia ${fam}: potrai toglierlo a mano dalla lista del solco o dallo storico dell'oggetto.`;
    if (!(await UI.confirm(`Elimina ${c.verdura}`, avviso, { ok: 'Elimina', danger: true }))) return false;
    S.deleteColt(c.id);
    return true;
  };

  // ---------- Trapianto ----------
  const occupanti = (colture) => {
    const m = new Map();
    colture.forEach((x) => { const k = x.verdura.toLowerCase(); const cur = m.get(k) || { n: x.verdura, q: 0 }; cur.q += Math.max(1, L.piantine(x)); m.set(k, cur); });
    return m.size ? Array.from(m.values()).map((g) => `${g.n} x ${g.q}`).join(', ') : 'libero';
  };
  V.trapianta = async (c) => {
    const orti = S.orti().slice().sort((a, b) => (a.id === c.ortoId ? -1 : b.id === c.ortoId ? 1 : L.cmpText(a.nome, b.nome)));
    const attuale = S.orto(c.ortoId);
    if (!attuale) return false;
    const cont0 = c.oggettoId != null ? S.get('oggetti', c.oggettoId) : null;
    const origine = `${attuale.nome} · ${cont0 ? cont0.nome : c.solco > 0 ? `solco ${c.solco}` : 'senza posto'}`;
    const scelta = await UI.modal((close) => {
      const pOrto = UI.field({ label: 'In quale orto?', type: 'select', options: orti.map((o) => ({ v: o.id, l: `${L.isBalcone(o) ? '🪴' : '🌾'} ${o.nome}${o.id === c.ortoId ? ' (questo orto)' : ''}` })), value: c.ortoId });
      const pPosto = UI.field({ label: 'Dove? (solco o contenitore)', type: 'select', options: [] });
      const qta = UI.field({ label: `Quante piantine? (in questo posto ce ne sono ${L.piantine(c)})`, type: 'int', value: String(L.piantine(c)) });
      const nessuno = h('p', { class: 'note warn', hidden: true });
      const riepilogo = h('p', { class: 'dlg-m' });
      const avvisi = h('p', { class: 'note warn', hidden: true });
      const err = h('p', { class: 'err', hidden: true });
      const ok = h('button', { class: 'btn primary', text: '🌱 Trapianta' });
      let posti = [], altre = [], storico = [];
      const dest = () => S.orto(pOrto.get());
      const carica = () => {
        const d = dest();
        const cont = S.oggettiOrto(d.id).filter((o) => L.tipo(o.tipo).ospita && o.id !== c.oggettoId);
        const solchi = L.isBalcone(d) ? 0 : S.totaleSolchi(d.id);
        altre = S.db.coltivazioni.filter((x) => x.ortoId === d.id && x.id !== c.id);
        storico = S.db.trattSolco.filter((t) => t.ortoId === d.id && t.note === 'Coltura rimossa');
        posti = cont.map((o) => ({ l: `${L.tipo(o.tipo).emoji} ${o.nome} — ${occupanti(altre.filter((x) => x.oggettoId === o.id))}`, solco: null, cont: o }));
        const stesso = d.id === c.ortoId && c.oggettoId == null;
        for (let k = 1; k <= solchi; k++) if (!(stesso && c.solco === k)) posti.push({ l: `🌾 Solco ${k} — ${occupanti(altre.filter((x) => x.oggettoId == null && x.solco === k))}`, solco: k, cont: null });
        UI.clear(pPosto.input);
        posti.forEach((p, i) => pPosto.input.append(h('option', { value: String(i), text: p.l })));
        pPosto.input.selectedIndex = posti.length ? 0 : -1;
        nessuno.hidden = posti.length > 0;
        nessuno.textContent = L.isBalcone(d) ? `In «${d.nome}» non c'è ancora nessun vaso, cassetta o altro contenitore: aggiungine uno dagli oggetti dell'orto.`
          : `In «${d.nome}» non ci sono solchi né contenitori: indica i solchi da «Modifica orto» oppure aggiungi un oggetto.`;
        aggiorna();
      };
      const posto = () => (pPosto.input.selectedIndex >= 0 ? posti[pPosto.input.selectedIndex] : null);
      const aggiorna = () => {
        err.hidden = true;
        const p = posto();
        ok.disabled = !p;
        if (!p) { riepilogo.textContent = ''; avvisi.hidden = true; return; }
        const d = dest();
        const av = L.avvisiRotazione(c.verdura, L.iso(L.today()), p.solco, p.cont ? p.cont.id : null, altre, storico);
        const vicini = p.cont ? altre.filter((x) => x.oggettoId === p.cont.id) : altre.filter((x) => x.oggettoId == null && x.solco > 0 && Math.abs(x.solco - p.solco) <= 1);
        L.uniqueCI(vicini.map((x) => x.verdura)).forEach((n) => { if (!L.eq(n, c.verdura) && L.valuta(c.verdura, n, S.db.abbinamenti) < 0) av.push(`⚠️ ${n}: meglio tenerla separata da ${c.verdura}.`); });
        av.push(...L.avvisiBalcone(c.verdura, d, p.cont));
        riepilogo.textContent = `Da: ${origine}\nA: ${d.nome} · ${p.cont ? p.cont.nome : `solco ${p.solco}`}\n\nResta la data di messa a dimora originale; concimi e raccolti già registrati seguono la verdura.`;
        avvisi.textContent = av.join('\n\n');
        avvisi.hidden = av.length === 0;
      };
      pOrto.input.addEventListener('change', carica);
      pPosto.input.addEventListener('change', aggiorna);
      ok.addEventListener('click', () => {
        const p = posto();
        if (!p) return;
        let quantita = null;
        if (L.piantine(c) > 1) {
          const n = parseInt(qta.get(), 10);
          if (!(n >= 1 && n <= L.piantine(c)) || String(n) !== qta.get()) { err.textContent = `Numero non valido: inserisci un numero da 1 a ${L.piantine(c)}.`; err.hidden = false; return; }
          if (n < L.piantine(c)) quantita = n;
        }
        close({ ortoId: dest().id, solco: p.solco, oggettoId: p.cont ? p.cont.id : null, quantita });
      });
      carica();
      return h('div', null,
        h('h2', { class: 'dlg-t', text: `Trapianta ${c.verdura}` }),
        h('p', { class: 'dlg-m', text: `${L.emoji(c.verdura)} ${c.verdura}\nDa: ${origine}` }),
        orti.length > 1 ? pOrto.el : null, pPosto.el, nessuno, L.piantine(c) > 1 ? qta.el : null, riepilogo, avvisi, err,
        h('div', { class: 'dlg-b' }, h('button', { class: 'btn', onclick: () => close(null), text: 'Annulla' }), ok));
    }, { cancelValue: null });
    if (!scelta) return false;
    S.trapianta(c.id, scelta.ortoId, scelta.solco, scelta.oggettoId, `trapiantata il ${L.fmt(L.today())} da ${origine}`, scelta.quantita);
    return true;
  };

  // ---------- Solchi, contenitori, passaggi ----------
  V.titoloContenitore = (o, dentro) => {
    let t = `${L.tipo(o.tipo).emoji} ${o.nome}`;
    if (!dentro.length) return t;
    t += `\n${dentro.length === 1 ? '1 verdura' : `${dentro.length} verdure`}:\n` + dentro.slice(0, 8).map(L.rigaCompatta).join('\n');
    if (dentro.length > 8) t += `\n… e altre ${dentro.length - 8}`;
    return t;
  };
  const menuTratt = async (ortoId, titolo, delPosto, nuova, rottaVerdura, extra) => {
    const voci = [{ label: '🥕 Aggiungi una verdura', value: 'v' }, { label: 'Aggiungi concime / sostanza', value: 'c' }, { label: 'Modifica una voce', value: 'm' }, { label: 'Elimina una voce', value: 'e' }]
      .concat(extra.map((x, i) => ({ label: x.voce, value: `x${i}`, danger: x.danger })));
    const s = await UI.sheet(titolo, voci);
    if (!s) return false;
    if (s === 'v') { go(rottaVerdura); return false; }
    if (s === 'c') {
      const nome = await V.scegliSostanza('Cosa aggiungi?');
      if (!nome) return false;
      const data = await UI.askDate(`Data di inserimento: ${nome}`, L.iso(L.today()));
      if (!data) return false;
      S.addRiga('trattSolco', Object.assign(nuova(), { sostanza: nome, data, note: null }));
      return true;
    }
    if (s === 'm' || s === 'e') {
      const righe = S.trattSolchi(ortoId).filter(delPosto);
      if (!righe.length) { await UI.alert('Nessuna voce', "Qui non c'è ancora nessuna sostanza registrata."); return false; }
      const i = await scegliVoce(s === 'm' ? 'Modifica quale voce?' : 'Elimina quale voce?', righe.map(L.descriviTratt));
      if (i < 0) return false;
      if (s === 'e') { S.delRiga('trattSolco', righe[i].id); return true; }
      const n = await V.modificaSostanzaData(righe[i].sostanza, righe[i].data);
      if (!n) return false;
      Object.assign(righe[i], n); S.save(); return true;
    }
    const x = extra[parseInt(s.slice(1), 10)];
    return x ? x.azione() : false;
  };
  V.menuSolco = (ortoId, solco) => menuTratt(ortoId, `Solco ${solco}`, (t) => t.oggettoId == null && t.solco === solco,
    () => ({ ortoId, solco, oggettoId: null }), `#/orto/${ortoId}/verdura/0?solco=${solco}`,
    [{ voce: '🗑️ Rimuovi solco…', azione: () => V.rimuoviSolcoUI(ortoId, solco) }]);
  V.menuContenitore = async (o) => {
    const dentro = L.sortBy(S.db.coltivazioni.filter((c) => c.oggettoId === o.id), (c) => c.data);
    return menuTratt(o.ortoId, V.titoloContenitore(o, dentro), (t) => t.oggettoId === o.id, () => ({ ortoId: o.ortoId, solco: 0, oggettoId: o.id }),
      `#/orto/${o.ortoId}/verdura/0?oggetto=${o.id}`,
      [{ voce: 'Sposta o rinomina…', azione: () => V.gestisciPosizioneOggetto(o) }, { voce: 'Apri registro', azione: async () => { go(`#/oggetto/${o.id}`); return false; } }]);
  };
  V.rimuoviSolcoUI = async (ortoId, solco) => {
    let info;
    try { info = S.anteprimaRimozioneSolco(ortoId, solco); } catch (e) { await UI.alert('Solco non rimovibile', e.message); return false; }
    const cont = [];
    if (info.verdure.length) { const u = L.uniqueCI(info.verdure); cont.push(`${info.verdure.length} verdure (${u.slice(0, 5).join(', ')}${u.length > 5 ? '…' : ''})`); }
    if (info.concimi > 0) cont.push(`${info.concimi} concimi/sostanze`);
    if (info.colture > 0) cont.push(`${info.colture} colture nello storico della rotazione`);
    const titolo = `Rimuovi il solco ${solco}` + (cont.length === 0 ? ' (vuoto)' : `\nContiene: ${cont.join(', ')}`);
    const voci = [{ label: 'Rimuovi e rinumera i solchi successivi', value: 'nessuna' }, { label: "Sostituisci con un'aiuola rialzata", value: 'aiuola' }];
    if (info.passaggioPossibile) voci.push({ label: 'Sostituisci con un passaggio', value: 'passaggio' });
    const sost = await UI.sheet(titolo, voci, { cancel: 'Annulla' });
    if (!sost) return false;
    const inAiuola = sost === 'aiuola';
    const conseg = [];
    if (inAiuola) { if (info.verdure.length) conseg.push(`Le ${info.verdure.length} verdure passano nella nuova aiuola, con i loro concimi e lo storico della rotazione.`); }
    else {
      if (info.verdure.length) conseg.push(`Verranno eliminate ${info.verdure.length} verdure con i loro concimi (i raccolti già registrati restano).`);
      if (info.concimi + info.colture > 0) conseg.push(`Verranno cancellati i concimi del solco e lo storico della rotazione (${info.concimi + info.colture} voci).`);
    }
    info.nuoviVicini.forEach((v) => conseg.push(`⚠️ ${v}`));
    conseg.push("I solchi successivi scalano di uno. L'operazione non si può annullare.");
    if (!(await UI.confirm(`Rimuovere il solco ${solco}?`, conseg.join('\n\n'), { ok: 'Rimuovi', danger: true }))) return false;
    try { S.rimuoviSolco(ortoId, solco, sost, !inAiuola); } catch (e) { await UI.alert('Solco non rimosso', e.message); return false; }
    return true;
  };
  V.gestisciPassaggio = async (id) => {
    const p = S.get('oggetti', id);
    if (!p) return false;
    const totale = S.totaleSolchi(p.ortoId);
    const s = await UI.sheet(`Passaggio tra il solco ${p.dopoSolco} e il solco ${p.dopoSolco + 1}`, [{ label: '↕️ Sposta…', value: 's' }, { label: '🗑️ Elimina', value: 'e', danger: true }]);
    if (s === 'e') { S.delRiga('oggetti', id); return true; }
    if (s !== 's') return false;
    const occ = new Set(S.db.oggetti.filter((o) => o.ortoId === p.ortoId && o.tipo === D.PASSAGGIO && o.id !== p.id).map((o) => o.dopoSolco));
    const libere = []; for (let k = 1; k <= totale - 1; k++) if (!occ.has(k) && k !== p.dopoSolco) libere.push(k);
    if (!libere.length) { await UI.alert('Nessuna posizione libera', "Tra gli altri solchi c'è già un passaggio."); return false; }
    const i = await scegliVoce('Dove sposti il passaggio?', libere.map((k) => `Tra il solco ${k} e il solco ${k + 1}`));
    if (i < 0) return false;
    p.dopoSolco = libere[i]; S.save(); return true;
  };
  V.gestisciPosizioneOggetto = async (o) => {
    const tipo = L.tipo(o.tipo);
    const totale = S.totaleSolchi(o.ortoId);
    const dove = L.descriviPosizione(o.dopoSolco, totale);
    const voci = [];
    if (totale > 0) voci.push({ label: '↕️ Sposta tra i solchi…', value: 's' });
    voci.push({ label: '✏️ Rinomina…', value: 'r' });
    if (tipo.conProfondita) voci.push({ label: '📏 Profondità…', value: 'p' });
    if (tipo.conAlveoli) voci.push({ label: '🔢 Alveoli…', value: 'a' });
    const s = await UI.sheet(dove ? `${o.nome} (${dove})` : o.nome, voci);
    if (s === 'p') {
      const t = await UI.prompt('Profondità', 'Profondità del terriccio in cm (vuoto = non indicata):', { value: o.profCm == null ? '' : o.profCm, type: 'int', ok: 'Salva',
        validate: (v) => (v === '' || (/^\d+$/.test(v) && +v >= 1 && +v <= 200) ? null : 'Inserisci un numero di centimetri da 1 a 200.') });
      if (t == null) return false;
      const cm = t === '' ? null : parseInt(t, 10);
      if (cm === o.profCm) return false;
      o.profCm = cm; S.save(); return true;
    }
    if (s === 'a') {
      const i = await scegliVoce('Quanti alveoli ha la vaschetta?', D.ALVEOLI.map((n) => `${n} alveoli`));
      if (i < 0 || D.ALVEOLI[i] === o.alveoli) return false;
      o.alveoli = D.ALVEOLI[i]; S.save(); return true;
    }
    if (s === 's') {
      const op = L.opzioniPosizione(totale);
      const i = await scegliVoce(`Dove metti ${o.nome}?`, op.map((x) => x.label));
      if (i < 0) return false;
      o.dopoSolco = op[i].dopo; S.save(); return true;
    }
    if (s === 'r') {
      const n = await UI.prompt('Rinomina', 'Nuovo nome:', { value: o.nome, validate: (v) => (v ? null : 'Scrivi un nome.') });
      if (!n || n.trim() === o.nome) return false;
      o.nome = n.trim(); S.save(); return true;
    }
    return false;
  };
  V.gestisciStorico = async (o) => {
    const voci = L.sortBy(S.trattSolchi(o.ortoId).filter((t) => t.note === 'Coltura rimossa' && t.oggettoId === o.id), (t) => t.data).reverse();
    if (!voci.length) { await UI.alert(o.nome, 'Nessuna coltura nello storico. Qui compaiono le verdure eliminate da questo posto, che la rotazione continua a considerare.'); return; }
    const i = await scegliVoce(`Storico di ${o.nome}: tocca per eliminare`, voci.map((t, k) => `${k + 1}. ${L.descriviTratt(t)}`));
    if (i < 0) return;
    if (await UI.confirm('Elimina dallo storico', `${L.descriviTratt(voci[i])}\nLa rotazione non terrà più conto di questa coltura.`, { ok: 'Elimina', danger: true })) S.delRiga('trattSolco', voci[i].id);
  };
  V.apriOggetto = async (o) => {
    if (L.tipo(o.tipo).ospita) {
      const a = await UI.sheet(o.nome, [{ label: 'Apri', value: 'a' }, { label: 'Storico colture…', value: 's' }, { label: 'Sposta o rinomina…', value: 'm' }]);
      if (a === 's') return V.gestisciStorico(o);
      if (a === 'm') return V.gestisciPosizioneOggetto(o);
      if (a !== 'a') return;
    }
    go(`#/oggetto/${o.id}`);
  };

  // =====================================================================
  // Avvisi di oggi (sostituiscono le notifiche native)
  // =====================================================================
  V.calcolaAvvisi = async (meteoDi, oggi) => {
    oggi = oggi || L.today();
    const set = S.set();
    const res = [];
    const attivita = L.costruisciAttivita(S.db, oggi, meteoDi, set.annGiorni);
    const nome = (id) => nomeOrto(id);
    const raggruppa = (items, fn) => { const m = gruppoVoci(items, (a) => a.ortoId); return Array.from(m, ([id, v]) => `${nome(id)}: ${v.map(fn).join(', ')}`); };
    const verdura = (a) => a.titolo.replace(/^\S+\s+\S+\s+/, '');

    if (set.promAttivo) {
      const r = attivita.filter((a) => a.tipo === 'raccogli' && L.diff(a.data, oggi) <= set.promGiorni);
      if (r.length) res.push({ icona: '🧺', titolo: 'Raccolta', righe: raggruppa(r, (a) => `${verdura(a)} (${L.quando(a.data, oggi)})`) });
    }
    if (set.annAttiva) {
      const da = [];
      for (const c of S.db.coltivazioni) {
        const cont = c.oggettoId != null ? S.get('oggetti', c.oggettoId) : null;
        const allAperto = !(cont && L.protetto(cont.tipo));
        const orto = S.orto(c.ortoId);
        if (!orto) continue;
        let esito;
        if (set.annIntelligente) esito = L.valutaAnnaffiatura(c, oggi, L.intervalloBase(c.verdura), allAperto, meteoDi ? meteoDi(orto) : null);
        else esito = { annaffiare: L.add(L.parse(c.ultimaAnn || c.data), set.annGiorni) <= oggi, nota: null };
        if (esito.annaffiare) da.push({ ortoId: c.ortoId, titolo: `x x ${c.verdura}`, nota: esito.nota });
      }
      if (da.length) res.push({ icona: '💧', titolo: 'Da annaffiare', righe: raggruppa(da, (a) => verdura(a) + (a.nota ? ` (${a.nota})` : '')) });
    }
    if (set.geloAttivo && meteoDi) {
      const domani = L.add(oggi, 1);
      const righe = [];
      for (const orto of S.orti()) {
        const prev = meteoDi(orto);
        const g = prev && prev.giorni.find((x) => L.iso(x.data) === L.iso(domani) && x.tMin <= L.SOGLIA_GELO);
        if (!g) continue;
        const da = S.db.coltivazioni.filter((c) => c.ortoId === orto.id).filter((c) => {
          const cont = c.oggettoId != null ? S.get('oggetti', c.oggettoId) : null;
          if (cont && L.protetto(cont.tipo)) return false;
          return L.sensibileGelo(c.verdura) || L.diff(oggi, L.parse(c.data)) < 30;
        });
        if (da.length) righe.push(`${orto.nome}: minima ${Math.round(g.tMin)} °C domani notte. Da coprire: ${L.uniqueCI(da.map((c) => c.verdura)).join(', ')}`);
      }
      if (righe.length) res.push({ icona: '❄️', titolo: 'Gelo previsto', righe });
    }
    if (set.trapiantoAttivo) {
      const t = attivita.filter((a) => a.tipo === 'trapianta' && a.data <= oggi);
      if (t.length) res.push({ icona: '🌿', titolo: 'Da trapiantare', righe: raggruppa(t, verdura) });
    }
    if (set.concimazioneAttiva) {
      const c = attivita.filter((a) => {
        if (a.tipo !== 'concima' || a.data > oggi) return false;
        const col = S.get('coltivazioni', a.coltId);
        const cat = col && L.trova(col.verdura);
        if (!cat) return true;
        return L.diff(L.add(L.parse(col.data), L.giorniAlRaccolto(col)), oggi) > 14;
      });
      if (c.length) res.push({ icona: '🧪', titolo: 'Da concimare', righe: raggruppa(c, (a) => `${verdura(a)} (${a.posto.split(' · ')[2] || ''})`) });
    }
    if (set.seminaAttiva && oggi.getDate() <= 7) {
      const righe = [];
      for (const orto of S.orti()) {
        const cl = L.clima(orto);
        let v = D.CATALOGO.filter((x) => L.siPuoSeminare(x, cl, oggi.getMonth() + 1));
        if (L.isBalcone(orto)) v = v.filter((x) => L.adattaBalcone(x.nome, orto));
        if (v.length) righe.push(`${orto.nome}: ${v.slice(0, 10).map((x) => x.emoji + ' ' + x.nome).join(', ')}${v.length > 10 ? '…' : ''}`);
      }
      if (righe.length) res.push({ icona: '🌱', titolo: `A ${D.MESI_LUNGHI[oggi.getMonth()]} puoi seminare`, righe });
    }
    return res;
  };

  // =====================================================================
  // ATTIVITÀ
  // =====================================================================
  V.attivita = () => {
    const st = V.st.att;
    const root = h('div');
    const tok = GO.token;
    const orti = S.orti();
    root.append(UI.seg([{ id: 'cal', label: 'Calendario' }, { id: 'sem', label: 'Cosa seminare' }, { id: 'sch', label: 'Schede' }], st.sez, (id) => { st.sez = id; GO.render(); }));
    const tools = h('div', { class: 'row-gap' },
      h('button', { class: 'btn small', onclick: () => go('#/semine'), text: '📅 Calendario semine' }),
      h('button', { class: 'btn small', onclick: () => go('#/compagni'), text: '🤝 Compagni' }));
    root.append(tools);

    const senzaPos = orti.filter((o) => !L.haPosizione(o)).map((o) => `«${o.nome}»`);
    if (st.sez !== 'cal' && (orti.length === 0 || senzaPos.length))
      root.append(UI.note(orti.length === 0 ? 'Crea un orto e indicane la città: i mesi di semina si adattano alla sua latitudine e altitudine.'
        : `${senzaPos.length === 1 ? "L'orto" : 'Gli orti'} ${senzaPos.join(', ')} non ${senzaPos.length === 1 ? 'ha' : 'hanno'} una posizione: indicala in «Calendario semine» o in «Modifica orto». Intanto uso il clima del Centro Italia in pianura.`, 'warn'));

    if (st.sez === 'cal') {
      const avvisiBox = h('div');
      const filtro = orti.length > 1 ? UI.field({ label: '', type: 'select', options: [{ v: 0, l: 'Tutti gli orti' }].concat(orti.map((o) => ({ v: o.id, l: o.nome }))), value: st.orto }) : null;
      if (filtro) { filtro.input.addEventListener('change', () => { st.orto = filtro.get(); mostra(); }); root.append(filtro.el); }
      root.append(avvisiBox);
      const lista = h('div');
      root.append(lista);
      const statoMeteo = h('p', { class: 'note small' });
      root.append(statoMeteo);
      let meteoDi = (o) => { const p = L.posizione(o); return p ? ST.leggiCache(p) : null; };
      const mostra = () => {
        const oggi = L.today();
        const att = L.costruisciAttivita(S.db, oggi, meteoDi, S.set().annGiorni);
        const oid = st.orto;
        const fascia = (d) => (d <= oggi ? '⚠️ Da fare ora' : L.diff(d, oggi) <= 7 ? '📆 Questa settimana' : L.diff(d, oggi) <= 30 ? '🗓️ Prossimi 30 giorni' : '⏳ Più avanti');
        UI.clear(lista);
        let n = 0;
        for (const o of orti.filter((x) => !oid || x.id === oid)) {
          const righe = att.filter((a) => a.ortoId === o.id);
          if (!righe.length) continue;
          n++;
          lista.append(h('h3', { class: 'grp', text: `🌱 ${o.nome} (${righe.length})` }),
            h('div', { class: 'card flush' }, righe.map((a) => h('button', { class: 'row', onclick: async () => { if (await V.menuVerdura(a.coltId)) { /* rerender automatico */ } } },
              h('div', { class: 'row-t', text: a.titolo }),
              h('div', { class: 'row-s', text: `${fascia(a.data)} · ${L.fmt(a.data)} (${L.quando(a.data, oggi)}) · ${a.posto}` })))));
        }
        if (!n) lista.append(UI.card(h('div', { class: 'row-t', text: '📅 Non ci sono attività in programma' }), h('div', { class: 'row-s', text: 'Aggiungi delle verdure a un orto: qui comparirà quando annaffiare, concimare, trapiantare e raccogliere.' })));
        const luoghi = orti.map((o) => L.posizione(o)).filter(Boolean);
        statoMeteo.textContent = luoghi.length ? meteoStato(luoghi) : 'Senza la posizione dell\'orto non c\'è il meteo: il calendario usa solo gli intervalli di annaffiatura e il fine ciclo.';
      };
      const meteoStato = (luoghi) => {
        const date = luoghi.map((p) => ST.ultimoAggiornamento(p));
        if (date.some((d) => !d)) return '⚠️ Meteo non ancora scaricato per qualche luogo: serve la connessione a internet.';
        const vecchio = new Date(Math.min(...date));
        const quando = L.iso(vecchio) === L.iso(new Date()) ? `oggi alle ${L.pad(vecchio.getHours())}:${L.pad(vecchio.getMinutes())}` : `il ${L.fmtDM(vecchio)} alle ${L.pad(vecchio.getHours())}:${L.pad(vecchio.getMinutes())}`;
        return Date.now() - vecchio.getTime() > 12 * 3600000 ? `⚠️ Meteo non aggiornato: ultimo scaricamento ${quando}. Senza meteo gli avvisi di pioggia e gelo non sono affidabili.` : `🌦️ Meteo aggiornato ${quando}.`;
      };
      mostra();
      (async () => {
        meteoDi = await ST.meteoPerOrti(orti);
        if (tok !== GO.token) return;
        mostra();
        const avvisi = await V.calcolaAvvisi(meteoDi);
        if (tok !== GO.token) return;
        UI.clear(avvisiBox);
        avvisiBox.append(V.boxAvvisi(avvisi));
        // pioggia oraria
        const set = S.set();
        if (set.pioggiaOraria && set.annAttiva) {
          const visti = new Set();
          for (const o of orti) {
            const p = L.posizione(o);
            if (!p || visti.has(L.suffissoLuogo(p))) continue;
            visti.add(L.suffissoLuogo(p));
            const pr = await ST.pioggiaOraria(p);
            if (tok !== GO.token) return;
            if (pr && pr.oggi >= set.pioggiaSoglia) {
              const ids = orti.filter((x) => { const q = L.posizione(x); return q && L.suffissoLuogo(q) === L.suffissoLuogo(p); }).map((x) => x.id);
              const luogo = p.localita || 'questo luogo';
              avvisiBox.append(UI.card(h('div', { class: 'row-t', text: `🌧️ Oggi a ${luogo} sono caduti circa ${L.num(pr.oggi, 1)} mm di pioggia${pr.piove ? ' (sta piovendo)' : ''}` }),
                h('div', { class: 'row-s', text: 'Confermi che ha piovuto? Le verdure nei solchi e nelle aiuole rialzate risulteranno annaffiate oggi.' }),
                h('div', { class: 'row-gap' }, h('button', { class: 'btn primary small', text: 'Sì, ha piovuto', onclick: () => { const n = S.segnaAnnaffiateDallaPioggia(L.today(), ids); UI.toast(n ? `${n} verdure segnate come annaffiate` : 'Niente da aggiornare'); } }))));
            }
          }
        }
      })();
    } else if (st.sez === 'sem') {
      const mese = L.today().getMonth() + 1;
      const nomeMese = L.cap(D.MESI_LUNGHI[mese - 1]);
      const abb = S.db.abbinamenti;
      let alMenoUno = false;
      for (const orto of orti) {
        const colt = S.db.coltivazioni.filter((c) => c.ortoId === orto.id);
        const ogg = S.oggettiOrto(orto.id);
        if (!L.haPosti(orto, colt, ogg)) continue;
        alMenoUno = true;
        const cl = L.clima(orto);
        let sem = D.CATALOGO.filter((v) => L.siPuoSeminare(v, cl, mese));
        if (L.isBalcone(orto)) sem = sem.filter((v) => L.adattaBalcone(v.nome, orto));
        const prop = L.proponi(sem, orto, colt, ogg, abb);
        const citta = orto.localita ? ` a ${orto.localita}` : '';
        const titolo = L.isBalcone(orto) ? `🪴 A ${nomeMese} sul tuo balcone «${orto.nome}»${citta}${orto.esposizione ? ` (esposto a ${orto.esposizione})` : ''}` : `🌱 A ${nomeMese} nel tuo orto «${orto.nome}»${citta}`;
        root.append(h('h3', { class: 'grp', text: titolo }),
          h('div', { class: 'card flush' }, (prop.length ? prop : [{ titolo: 'Nessun posto adatto adesso', dettaglio: 'Solchi e contenitori sono occupati o le verdure di stagione non stanno bene accanto a quelle già piantate.' }])
            .map((p) => h('div', { class: 'row static' }, h('div', { class: 'row-t', text: p.titolo }), h('div', { class: 'row-s', text: p.dettaglio })))));
      }
      if (!alMenoUno) {
        if (orti.length === 0) {
          const v = D.CATALOGO.filter((x) => L.siPuoSeminare(x, { sp: 0, sud: false }, mese));
          root.append(h('h3', { class: 'grp', text: `✅ A ${nomeMese} puoi seminare (${v.length})` }),
            h('div', { class: 'card flush' }, v.map((x) => h('div', { class: 'row static' }, h('div', { class: 'row-t', text: `${x.emoji} ${x.nome}` }), h('div', { class: 'row-s', text: `${x.come} · mesi: ${x.mesi.slice().sort((a, b) => a - b).map((m) => D.MESI[m - 1]).join(', ')}` })))));
        } else root.append(h('h3', { class: 'grp', text: '🌱 Nel tuo orto' }), UI.card(h('div', { class: 'row-t', text: 'Indica i solchi del tuo orto' }),
          h('div', { class: 'row-s', text: 'Apri l\'orto → Modifica e inserisci il numero di solchi (oppure aggiungi una serra o un\'aiuola rialzata): qui ti dirò dove seminare in base ai posti liberi e ai compagni.' })));
      }
    } else {
      const q = UI.field({ label: '', type: 'text', placeholder: '🔍 Cerca una verdura', value: st.ricerca });
      root.append(q.el);
      const lista = h('div');
      root.append(lista);
      const climi = (() => {
        if (!orti.length) return [{ cl: { sp: 0, sud: false }, nomi: '' }];
        const g = gruppoVoci(orti, (o) => L.climaKey(L.clima(o)));
        return Array.from(g.values()).map((os) => ({ cl: L.clima(os[0]), nomi: g.size === 1 ? '' : os.map((o) => o.nome).join(', ') }));
      })();
      const disegna = () => {
        UI.clear(lista);
        const t = st.ricerca.toLowerCase();
        const v = D.CATALOGO.slice().sort((a, b) => L.cmpText(a.nome, b.nome)).filter((x) => !t || x.nome.toLowerCase().includes(t));
        lista.append(h('div', { class: 'card flush' }, v.map((x) => {
          const r = [x.come];
          climi.forEach(({ cl, nomi }) => r.push(`🗓️ Si semina${nomi ? ` (${nomi})` : ''}: ${L.mesiPer(x, cl).sort((a, b) => a - b).map((m) => D.MESI[m - 1]).join(', ')}`));
          r.push(`🧺 Raccolta dopo circa ${x.giorni} giorni dalla messa a dimora`);
          if (x.perenne) r.push("🔁 Pianta perenne: resta nell'orto per anni e, dopo la prima raccolta, continua a produrre");
          const gt = L.giorniTrapianto(x.nome); if (gt != null) r.push(`🌿 Trapianto dalla vaschetta dopo circa ${gt} giorni`);
          const d = L.distanze(x.nome); if (d) r.push(`📏 Distanze: ${d.piantine} cm fra le piantine, ${d.solco} cm dal solco accanto`);
          r.push(`💧 Annaffiatura: promemoria ogni ${L.intervalloBase(x.nome)} giorni con clima mite (intervallo di base)`);
          const p = L.piano(x.nome); if (p) r.push(`🧪 Concime: ${p.concime}, la prima volta dopo ${p.primoGiorno} giorni${p.ogniGiorni != null ? `, poi ogni ${p.ogniGiorni}` : ''}`);
          const c = L.compagniDi(x.nome);
          if (c.amici.length) r.push(`🤝 Sta bene con: ${c.amici.join(', ')}`);
          if (c.nemici.length) r.push(`🚫 Da tenere lontana da: ${c.nemici.join(', ')}`);
          return h('div', { class: 'row static' }, h('div', { class: 'row-t', text: `${x.emoji} ${x.nome}` }), h('div', { class: 'row-s pre', text: r.join('\n') }));
        })));
      };
      q.input.addEventListener('input', () => { st.ricerca = q.get(); disegna(); });
      disegna();
    }
    return { title: 'Attività', el: root };
  };

  V.boxAvvisi = (avvisi) => {
    if (!avvisi.length) return h('div');
    return h('div', { class: 'card avvisi' }, h('div', { class: 'row-t', text: '🔔 Avvisi di oggi' }),
      avvisi.map((a) => h('div', { class: 'avviso' }, h('div', { class: 'av-t', text: `${a.icona} ${a.titolo}` }), a.righe.map((r) => h('div', { class: 'av-r', text: r })))));
  };

  // =====================================================================
  // ORTI (elenco)
  // =====================================================================
  V.orti = () => {
    const root = h('div');
    const orti = S.orti();
    if (!orti.length) root.append(UI.empty('Nessun orto ancora.\nTocca «Nuovo orto» per iniziare 🌱'));
    for (const o of orti) {
      const colt = S.db.coltivazioni.filter((c) => c.ortoId === o.id);
      const oggetti = S.db.oggetti.filter((x) => x.ortoId === o.id && x.tipo !== D.PASSAGGIO).length;
      const piantine = colt.reduce((s, c) => s + L.piantine(c), 0);
      const righe = [L.isBalcone(o) ? (o.esposizione ? `🪴 Balcone a ${o.esposizione}` : '🪴 Balcone') : '🌾 Terreno'];
      if (L.haPosizione(o)) righe.push(`📍 ${o.localita || 'posizione propria'}`);
      if (o.mq > 0) righe.push(`📐 ${L.num(o.mq, 2)} m²`);
      root.append(h('button', { class: 'card tap orto-card', onclick: () => go(`#/orto/${o.id}`) },
        h('div', { class: 'orto-n', text: o.nome }),
        h('div', { class: 'orto-s', text: `${righe.join(' · ')}\n${colt.length} verdure · ${L.piantineTxt(piantine)} · ${oggetti} oggetti` })));
    }
    root.append(h('div', { class: 'fab-space' }));
    return { title: 'I miei orti', el: root, fab: { label: '＋ Nuovo orto', onclick: () => go('#/orto/nuovo') } };
  };

  // =====================================================================
  // DETTAGLIO ORTO
  // =====================================================================
  V.ortoDettaglio = ({ id }) => {
    const orto = S.orto(+id);
    if (!orto) return { title: 'Orto', back: '#/orti', el: UI.empty('Orto non trovato.') };
    const st = V.st.orto;
    const root = h('div');
    const colt = S.coltivazioni(orto.id);
    const oggetti = S.oggettiOrto(orto.id);
    const tratt = S.trattSolchi(orto.id);
    const abb = S.db.abbinamenti;
    const balcone = L.isBalcone(orto);
    const contenitori = oggetti.filter((o) => o.tipo !== D.PASSAGGIO);
    const totale = L.totaleSolchi(orto, colt, tratt);
    const haSolchi = !balcone && totale > 0;
    if (st.sez === 'sol' && !haSolchi) st.sez = 'pan';

    root.append(h('div', { class: 'pg-riga' },
      h('h2', { class: 'pg-t', text: orto.nome }),
      h('div', { class: 'row-gap' },
        h('button', { class: 'btn small', onclick: () => go(`#/orto/${orto.id}/modifica`), text: '✏️ Modifica orto' }),
        h('button', { class: 'btn small danger', text: '🗑️ Elimina orto', onclick: async () => {
          if (!(await UI.confirm('Elimina orto', 'Verranno eliminati anche verdure e oggetti. Continuare?', { ok: 'Elimina', danger: true }))) return;
          S.deleteOrto(orto.id);
          GO.nav.replace('#/orti');
        } }))));
    const ri = L.riepilogoOrto(orto, colt);
    if (ri.visibile) root.append(UI.card(h('div', { class: 'pre', text: ri.testo })));
    root.append(h('div', { class: 'row-gap' },
      h('button', { class: 'btn primary small', onclick: () => go(`#/orto/${orto.id}/verdura/0`), text: '🥕 Aggiungi verdura' }),
      h('button', { class: 'btn small', onclick: () => go(`#/orto/${orto.id}/oggetto`), text: '🧰 Aggiungi oggetto' }),
      h('button', { class: 'btn small', text: '💧 Annaffia tutto', onclick: async () => {
        if (!colt.length) { await UI.alert('Annaffia tutto', 'Non ci sono verdure da annaffiare in questo orto.'); return; }
        if (await UI.confirm('Annaffia tutto', `Segnare come annaffiate oggi tutte le verdure di questo orto (${colt.length})?`, { ok: 'Sì' })) S.annaffiaTutto(orto.id);
      } }),
      h('button', { class: 'btn small', text: '💧 Annaffia…', onclick: async () => {
        if (!colt.length) { await UI.alert('Annaffia', 'Non ci sono verdure da annaffiare in questo orto.'); return; }
        const ids = await UI.pickMany('💧 Annaffia', 'Scegli le verdure da segnare come annaffiate oggi.', vociSelezione(colt, oggetti), 'Annaffia');
        if (!ids) return;
        ids.forEach((i) => { const c = S.get('coltivazioni', i); if (c) c.ultimaAnn = L.iso(L.today()); });
        S.save();
      } }),
      h('button', { class: 'btn small', text: '🧪 Concima…', onclick: async () => {
        if (!colt.length) { await UI.alert('Concima', 'Non ci sono verdure da concimare in questo orto.'); return; }
        const sost = await V.scegliSostanza('Quale concime usi?');
        if (!sost) return;
        const ids = await UI.pickMany(`🧪 Concima: ${sost}`, 'Scegli le verdure da concimare.', vociSelezione(colt, oggetti), 'Concima');
        if (!ids) return;
        const data = await UI.askDate(`Data di inserimento: ${sost}`, L.iso(L.today()));
        if (!data) return;
        ids.forEach((i) => { const c = S.get('coltivazioni', i); if (c) S.db.trattVerdura.push({ id: S.id(), ortoId: c.ortoId, coltId: c.id, sostanza: sost, data }); });
        S.save();
      } })));
    const sezioni = [{ id: 'pan', label: 'Panoramica' }];
    if (haSolchi) sezioni.push({ id: 'sol', label: 'Solchi' });
    sezioni.push({ id: 'ogg', label: 'Oggetti' });
    root.append(UI.seg(sezioni, st.sez, (s) => { st.sez = s; GO.render(); }));

    if (st.sez === 'pan') {
      if (colt.length) {
        const luogoDi = (c) => L.luogo(c, contenitori.find((o) => o.id === c.oggettoId));
        const voci = colt.map((c) => ({ c, luogo: luogoDi(c) }));
        const luoghi = L.sortBy(L.uniqueCI(voci.map((v) => v.luogo.nome)).map((n) => voci.find((v) => v.luogo.nome === n).luogo), (l) => l.gruppo, (l) => l.solco || 0, (l) => l.nome).map((l) => l.nome);
        const opzioni = ['Tutte le verdure', '💧 Da annaffiare', '🧺 Pronte da raccogliere'].concat(luoghi);
        if (!opzioni.includes(st.filtro)) st.filtro = 'Tutte le verdure';
        const q = UI.field({ label: '', type: 'text', placeholder: '🔍 Cerca per nome o posto', value: st.ricerca });
        const f = UI.field({ label: '', type: 'select', options: opzioni.map((o) => ({ v: o, l: o })), value: st.filtro });
        root.append(h('div', { class: 'row-gap grow' }, q.el, f.el));
        const lista = h('div');
        root.append(lista);
        const disegna = () => {
          UI.clear(lista);
          const oggi = L.today();
          const t = st.ricerca.toLowerCase();
          const vis = voci.filter(({ c, luogo }) => {
            if (t && ![c.verdura, c.tipologia || '', c.note || '', luogo.nome].some((s) => s.toLowerCase().includes(t))) return false;
            if (st.filtro === '💧 Da annaffiare') return !c.ultimaAnn || L.diff(oggi, L.parse(c.ultimaAnn)) >= S.set().annGiorni;
            if (st.filtro === '🧺 Pronte da raccogliere') return L.trova(c.verdura) && L.add(L.parse(c.data), L.giorniAlRaccolto(c)) <= oggi;
            return st.filtro === 'Tutte le verdure' || luogo.nome === st.filtro;
          });
          if (!vis.length) { lista.append(UI.empty('Nessuna verdura corrisponde alla ricerca.')); return; }
          const grp = gruppoVoci(vis, (v) => `${v.c.verdura.trim().toLowerCase()}|${(v.c.tipologia || '').trim().toLowerCase()}`);
          const chiavi = Array.from(grp.keys()).sort(L.cmpText);
          for (const k of chiavi) {
            const items = L.sortBy(grp.get(k), (v) => v.luogo.gruppo, (v) => v.luogo.solco || 0, (v) => v.luogo.nome, (v) => v.c.data);
            const p = items[0].c;
            const piantine = items.reduce((s, v) => s + L.piantine(v.c), 0);
            let titolo = `${L.emoji(p.verdura)} ${p.verdura.trim()}${p.tipologia && p.tipologia.trim() ? ' ' + p.tipologia.trim() : ''} · ${L.piantineTxt(piantine)}`;
            if (items.length > 1) titolo += ` (${items.length})`;
            lista.append(h('div', { class: 'card' }, h('div', { class: 'grp-t', text: titolo }),
              items.map(({ c, luogo }) => {
                const cont = contenitori.find((o) => o.id === c.oggettoId);
                const giorni = L.diff(oggi, L.parse(c.data));
                let det = `${luogo.nome} · Messa il ${L.fmtS(c.data)} · ${c.ultimaAnn ? `💧 Annaffiata il ${L.fmtS(c.ultimaAnn)}` : '💧 Mai annaffiata'}`;
                if (c.quantita > 1) det += ` · ${c.quantita} piantine`;
                const tr = L.statoTrapianto(c, !!(cont && L.tipo(cont.tipo).conAlveoli), oggi);
                if (tr) det += ` · ${tr}`;
                const av = L.trova(c.verdura) ? L.avanzamento(giorni, L.giorniAlRaccolto(c)) : null;
                return h('button', { class: 'row', onclick: () => V.menuVerdura(c.id) },
                  h('div', { class: 'row-s', text: det }), av ? [UI.bar(av.p, av.colore), h('div', { class: 'row-s small', text: av.stato })] : null);
              })));
          }
        };
        q.input.addEventListener('input', () => { st.ricerca = q.get(); disegna(); });
        f.input.addEventListener('change', () => { st.filtro = f.get(); disegna(); });
        disegna();
      } else root.append(UI.empty('Nessuna verdura piantata.'));
    }

    if (st.sez === 'sol' && haSolchi) {
      root.append(h('div', { class: 'row-gap' },
        h('button', { class: 'btn small', text: '＋ Inserisci solco', onclick: () => inserisciSolco(orto, colt) }),
        h('button', { class: 'btn small', text: '🚶 Inserisci passaggio', onclick: () => inserisciPassaggio(orto) })));
      const inTerra = colt.filter((c) => c.oggettoId == null);
      const perSolco = gruppoVoci(inTerra.filter((c) => c.solco > 0), (c) => c.solco);
      const passaggi = oggetti.filter((o) => o.tipo === D.PASSAGGIO);
      const avvisi = [];
      const card = h('div', { class: 'card flush' });
      for (let s = 1; s <= totale; s++) {
        const piante = L.uniqueCI((perSolco.get(s) || []).map((c) => c.verdura));
        let t = piante.length === 0 ? `Solco ${s}: libero` : `Solco ${s}: ${piante.join(', ')}`;
        const sost = tratt.filter((x) => x.solco === s && x.oggettoId == null).map(L.descriviTratt);
        if (sost.length) t += `\n   🧺 ${sost.join(', ')}`;
        card.append(h('button', { class: 'row', onclick: () => V.menuSolco(orto.id, s) }, h('div', { class: 'row-t pre', text: t })));
        passaggi.filter((p) => p.dopoSolco === s).forEach((p) => card.append(h('button', { class: 'row', onclick: () => V.gestisciPassaggio(p.id) }, h('div', { class: 'row-s', text: `🚶 Passaggio tra il solco ${s} e il solco ${s + 1}` }))));
        const vicine = L.uniqueCI(piante.concat((perSolco.get(s + 1) || []).map((c) => c.verdura)));
        for (let i = 0; i < vicine.length; i++) for (let j = i + 1; j < vicine.length; j++)
          if (L.valuta(vicine[i], vicine[j], abb) < 0) { const x = `⚠️ ${vicine[i]} e ${vicine[j]} non stanno bene vicine (solchi ${s}–${s + 1})`; if (!avvisi.includes(x)) avvisi.push(x); }
      }
      root.append(card);
      if (avvisi.length) root.append(UI.note(avvisi.join('\n'), 'warn'));
    }

    if (st.sez === 'ogg') {
      if (!contenitori.length) root.append(UI.empty('Nessun oggetto: aggiungi una lombricompostiera, un vaso, una serra…'));
      const stor = S.trattSolchi(orto.id).filter((t) => t.oggettoId != null);
      const grp = gruppoVoci(L.ordinaOggetti(contenitori), (o) => `${D.TIPI.indexOf(L.tipo(o.tipo))}|${o.alveoli || 0}`);
      for (const items of grp.values()) {
        const tipo = L.tipo(items[0].tipo);
        root.append(h('h3', { class: 'grp', text: L.titoloGruppoOggetti(tipo, items[0].alveoli || 0, items.length) }),
          h('div', { class: 'card flush' }, items.map((o) => h('button', { class: 'row', onclick: () => V.apriOggetto(o) },
            h('div', { class: 'row-t', text: o.nome }),
            h('div', { class: 'row-s pre', text: L.dettaglioOggetto(o, colt, totale, abb, stor.filter((t) => t.oggettoId === o.id && t.note !== 'Coltura rimossa'), stor.filter((t) => t.oggettoId === o.id && t.note === 'Coltura rimossa')) })))));
      }
    }

    return { title: orto.nome, back: '#/orti', el: root };
  };

  const vociSelezione = (colt, oggetti) => L.sortBy(colt.map((c) => ({ c, l: L.luogo(c, oggetti.find((o) => o.id === c.oggettoId)) })), (x) => x.l.gruppo, (x) => x.l.solco || 0, (x) => x.l.nome, (x) => x.c.verdura.toLowerCase())
    .map((x) => ({ id: x.c.id, label: `${x.c.verdura.trim()}${x.c.tipologia && x.c.tipologia.trim() ? ' ' + x.c.tipologia.trim() : ''} · ${x.l.nome}` }));

  const inserisciSolco = async (orto, colt) => {
    const totale = L.totaleSolchi(orto, colt, S.trattSolchi(orto.id));
    if (totale >= 999) { await UI.alert('Troppi solchi', 'Il massimo è 999 solchi.'); return; }
    const op = [], pos = [];
    if (totale === 0) { op.push('Primo solco'); pos.push(1); }
    else {
      op.push("All'inizio (prima del solco 1)"); pos.push(1);
      for (let s = 1; s < totale; s++) { op.push(`Tra il solco ${s} e il solco ${s + 1}`); pos.push(s + 1); }
      op.push(`In fondo (dopo il solco ${totale})`); pos.push(totale + 1);
    }
    const i = await scegliVoce('Dove inserire il nuovo solco?', op);
    if (i >= 0) S.inserisciSolco(orto.id, pos[i], totale);
  };
  const inserisciPassaggio = async (orto) => {
    const totale = S.totaleSolchi(orto.id);
    const esist = new Set(S.oggettiOrto(orto.id).filter((o) => o.tipo === D.PASSAGGIO).map((o) => o.dopoSolco));
    const libere = []; for (let s = 1; s <= totale - 1; s++) if (!esist.has(s)) libere.push(s);
    if (!libere.length) { await UI.alert('Nessuna posizione libera', totale < 2 ? 'Servono almeno due solchi per inserire un passaggio fra di loro.' : "Tra tutti i solchi c'è già un passaggio."); return; }
    const i = await scegliVoce('Dove inserire il passaggio?', libere.map((s) => `Tra il solco ${s} e il solco ${s + 1}`));
    if (i >= 0) S.addOggetto({ ortoId: orto.id, tipo: D.PASSAGGIO, nome: 'Passaggio', data: L.iso(L.today()), note: null, dopoSolco: libere[i], alveoli: null, profCm: null });
  };

  // =====================================================================
  // SCHEMA
  // =====================================================================
  const COL = { terra: '#6D4C41', pianta: '#C8E6C9', conflitto: '#FFCC80', sostanza: '#FFF59D', serra: '#B3E5FC', aiuola: '#D7CCC8', altro: '#E0E0E0', passaggio: '#BCAAA4' };
  V.schema = () => {
    const st = V.st.schema;
    const root = h('div');
    const orti = S.orti();
    if (!orti.length) { root.append(UI.empty('Nessun orto ancora: creane uno dalla scheda Orti.')); return { title: 'Schema', el: root }; }
    if (!orti.some((o) => o.id === st.ortoId)) st.ortoId = orti[0].id;
    const sel = UI.field({ label: '', type: 'select', options: orti.map((o) => ({ v: o.id, l: o.nome })), value: st.ortoId });
    sel.input.addEventListener('change', () => { st.ortoId = sel.get(); GO.render(true); });
    root.append(sel.el);
    const orto = S.orto(st.ortoId);
    const colt = S.db.coltivazioni.filter((c) => c.ortoId === orto.id);
    const concimi = gruppoVoci(S.trattVerdure(orto.id), (t) => t.coltId);
    const racc = gruppoVoci(S.raccoltiOrto(orto.id), (r) => r.coltId);
    const tutti = S.oggettiOrto(orto.id);
    const passaggi = gruppoVoci(tutti.filter((o) => o.tipo === D.PASSAGGIO), (o) => o.dopoSolco || 0);
    const oggetti = L.ordinaOggetti(tutti.filter((o) => o.tipo !== D.PASSAGGIO));
    const abb = S.db.abbinamenti;
    const serre = new Set(tutti.filter((o) => L.protetto(o.tipo)).map((o) => o.id));
    const vasch = new Set(tutti.filter((o) => L.tipo(o.tipo).conAlveoli).map((o) => o.id));
    const oggi = L.today();
    const info = [];
    if (orto.mq > 0) info.push(`📐 ${L.num(orto.mq, 2)} m²`);
    if (orto.solchi > 0) info.push(`🌾 ${orto.solchi} solchi`);
    if (info.length) root.append(UI.note(info.join(' · ')));
    if (orto.solchi > 0) root.append(UI.note('Tocca il titolo di un solco per aggiungere verdure o concimi.', 'small'));

    const daAnnaffiare = (c) => {
      if (!S.set().annIntelligente) return L.add(L.parse(c.ultimaAnn || c.data), S.set().annGiorni) <= oggi;
      return L.valutaAnnaffiatura(c, oggi, L.intervalloBase(c.verdura), !serre.has(c.oggettoId), null).annaffiare;
    };
    const conflitto = (c, vicini) => vicini.some((v) => v.id !== c.id && L.valuta(c.verdura, v.verdura, abb) < 0);
    const chip = (c, conf) => {
      let t = `${conf ? '⚠️ ' : ''}${daAnnaffiare(c) ? '❗ ' : ''}${L.emoji(c.verdura)} ${c.verdura}${c.quantita > 1 ? ` ×${c.quantita}` : ''}`;
      const tr = L.statoTrapianto(c, vasch.has(c.oggettoId), oggi); if (tr) t += ` · ${tr}`;
      if (c.tipologia && c.tipologia.trim()) t += ` (${c.tipologia.trim()})`;
      if (c.ultimaAnn) t += ` · 💧 Annaffiato il ${L.fmtS(c.ultimaAnn)}`;
      const haR = (racc.get(c.id) || []).length > 0;
      if (!haR && L.trova(c.verdura)) t += ` · 🧺 ~${L.fmt(L.add(L.parse(c.data), L.giorniAlRaccolto(c)))}`;
      if ((concimi.get(c.id) || []).length) t += `\n🧪 ${L.ultimiConcimiPerTipo(concimi.get(c.id))}`;
      if (haR) t += `\n${L.totaliRaccolti(racc.get(c.id))}`;
      return UI.chip(t, conf ? COL.conflitto : COL.pianta, '#000', () => V.menuVerdura(c.id));
    };
    const scatola = (titolo, sfondo, testo, contenuto, vuoto, tap) => h('div', { class: 'scatola', style: { background: sfondo, color: testo } },
      h('div', { class: 'sc-t' + (tap ? ' tap' : ''), text: titolo, onclick: tap }),
      contenuto.length ? h('div', null, contenuto) : vuoto ? h('div', { class: 'sc-v', text: vuoto }) : null);

    const inTerra = colt.filter((c) => c.oggettoId == null && c.solco > 0);
    const trAll = S.trattSolchi(orto.id);
    const trSolco = gruppoVoci(trAll, (t) => t.solco);
    const trOgg = gruppoVoci(trAll.filter((t) => t.oggettoId != null), (t) => t.oggettoId);
    let totale = Math.max(orto.solchi || 0, ...inTerra.map((c) => c.solco), 0);
    totale = Math.max(totale, ...trAll.filter((t) => t.oggettoId == null).map((t) => t.solco), 0);
    const perSolco = gruppoVoci(inTerra, (c) => c.solco);
    const ps = (s) => perSolco.get(s) || [];
    const ospitanti = oggetti.filter((o) => L.tipo(o.tipo).ospita);
    const sost = (t) => UI.chip(`${t.note === 'Coltura rimossa' ? '🌱' : '🧪'} ${t.sostanza} · ${L.fmtS(t.data)}`, COL.sostanza);
    const disegnaOspitanti = (dopo) => {
      for (const o of ospitanti.filter((x) => Math.min(x.dopoSolco == null ? totale : x.dopoSolco, totale) === dopo)) {
        const dentro = colt.filter((c) => c.oggettoId === o.id);
        const tipo = L.tipo(o.tipo);
        const cont = dentro.map((c) => chip(c, conflitto(c, dentro))).concat(L.sortBy(trOgg.get(o.id) || [], (t) => t.data).map(sost));
        root.append(scatola(`${tipo.emoji} ${o.nome}${o.alveoli > 0 ? ` (${dentro.reduce((s, c) => s + L.piantine(c), 0)}/${o.alveoli} alveoli)` : ''}`, tipo.coperto ? COL.serra : COL.aiuola, '#000', cont, 'vuota', () => V.menuContenitore(o)));
      }
    };
    disegnaOspitanti(0);
    for (let s = 1; s <= totale; s++) {
      const vicini = ps(s - 1).concat(ps(s), ps(s + 1));
      const cont = ps(s).map((c) => chip(c, conflitto(c, vicini))).concat(L.sortBy((trSolco.get(s) || []).filter((t) => t.oggettoId == null), (t) => t.data).map(sost));
      root.append(scatola(`Solco ${s}`, COL.terra, '#fff', cont, 'libero', () => V.menuSolco(orto.id, s)));
      disegnaOspitanti(s);
      (passaggi.get(s) || []).forEach((p) => root.append(h('div', { class: 'passaggio', onclick: () => V.gestisciPassaggio(p.id) })));
    }
    const altri = oggetti.filter((o) => !L.tipo(o.tipo).ospita);
    if (altri.length) root.append(scatola('🧰 Altri oggetti', COL.altro, '#000', altri.map((o) => UI.chip(`${L.tipo(o.tipo).emoji} ${o.nome}`, '#fff')), ''));
    const senza = colt.filter((c) => c.oggettoId == null && !(c.solco > 0));
    if (senza.length) root.append(scatola('❓ Senza posto assegnato', COL.altro, '#000', senza.map((c) => chip(c, false)), ''));
    if (!colt.length && !oggetti.length && !totale) root.append(UI.empty(L.isBalcone(orto) ? 'Questo orto è ancora vuoto: aggiungi vasi, cassette o altri oggetti, poi le verdure.' : 'Questo orto è ancora vuoto: aggiungi solchi, verdure o oggetti.'));
    return { title: 'Schema', el: root };
  };
})();
