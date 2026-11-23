/* Gestione Orto PWA - calcolo di avvisi e promemoria (raccolta, annaffiatura, gelo, semina, trapianto, concimazione).
   Funzioni senza DOM e senza rete: usano solo GO.D, GO.L e GO.S (dati) e il meteo già scaricato (meteoDi).
   Le usa l'app (schermata Attività, push.js) e anche la Edge Function «aggiorna-promemoria», che include questo file così com'è
   (vedi _backend-supabase/genera-funzione-promemoria.mjs): ogni modifica qui vale per entrambe. Va caricato dopo store.js. */
(function () {
  'use strict';
  const GO = window.GO;
  const { D, L, S } = GO;

  const GIORNI_AVANTI = 14; // come l'app nativa: annaffiatura, gelo, concimazione per i prossimi 14 giorni
  const GIORNI_RACCOLTA = 45; // raccolta e trapianto: piu' avanti, perche' sono eventi singoli
  const MAX_PROMEMORIA = 150;
  const ORA_GELO = '18:00'; // la sera prima della notte fredda, come l'app nativa

  const nomeOrto = (id) => { const o = S.orto(id); return o ? o.nome : 'orto eliminato'; };
  const gruppoVoci = (arr, key) => { const m = new Map(); arr.forEach((x) => { const k = key(x); if (!m.has(k)) m.set(k, []); m.get(k).push(x); }); return m; };

  /** Avvisi di un giorno: [{ icona, titolo, righe }]. meteoDi(orto) -> previsione | null. */
  GO.calcolaAvvisi = (meteoDi, oggi) => {
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

  const istante = (giorno, hhmm) => {
    const [h, m] = String(hhmm || '09:00').split(':').map(Number);
    return new Date(giorno.getFullYear(), giorno.getMonth(), giorno.getDate(), h || 0, m || 0, 0);
  };

  /** Elenco { tag, quando (ISO UTC), titolo, testo } dei promemoria futuri, come li programmerebbe l'app nativa. */
  GO.programmati = (meteoDi) => {
    const set = S.set();
    const adesso = new Date();
    const oggi = L.today();
    const out = [];
    const aggiungi = (quando, tag, titolo, testo) => {
      if (quando <= adesso) return;
      out.push({ tag, quando: quando.toISOString(), titolo, testo });
    };
    const verdura = (a) => a.titolo.replace(/^\S+\s+\S+\s+/, '');
    const emoji = (a) => a.titolo.split(' ')[0];

    // Raccolta (N giorni prima) e trapianto (nel giorno): eventi singoli, uno per pianta
    const att = L.costruisciAttivita(S.db, oggi, meteoDi, set.annGiorni);
    if (set.promAttivo) {
      for (const a of att.filter((x) => x.tipo === 'raccogli')) {
        const giorno = L.add(a.data, -set.promGiorni);
        if (L.diff(giorno, oggi) > GIORNI_RACCOLTA) continue;
        const quanto = set.promGiorni === 0 ? 'oggi' : set.promGiorni === 1 ? 'domani' : `fra ${set.promGiorni} giorni`;
        aggiungi(istante(giorno, set.promOra), `racc-${a.coltId}-${L.iso(a.data)}`, `${emoji(a)} ${verdura(a)} quasi pronta`,
          `Raccolta stimata ${quanto} (${L.fmt(a.data)}) · ${a.posto}`);
      }
    }
    if (set.trapiantoAttivo) {
      for (const a of att.filter((x) => x.tipo === 'trapianta')) {
        if (L.diff(a.data, oggi) > GIORNI_RACCOLTA) continue;
        aggiungi(istante(a.data, set.promOra), `trap-${a.coltId}-${L.iso(a.data)}`, `${emoji(a)} ${verdura(a)} pronta da trapiantare`,
          `È il momento di trapiantare (${a.posto}).`);
      }
    }

    // Annaffiatura, concimazione e gelo: una notifica al giorno con l'elenco di quel giorno
    for (let i = 0; i < GIORNI_AVANTI; i++) {
      const giorno = L.add(oggi, i);
      const iso = L.iso(giorno);
      const avvisi = GO.calcolaAvvisi(meteoDi, giorno);
      const di = (icona) => avvisi.find((a) => a.icona === icona);
      const ann = di('💧'), conc = di('🧪'), gelo = di('❄️');
      if (ann) aggiungi(istante(giorno, set.annOra), `ann-${iso}`, '💧 Da annaffiare', ann.righe.join('\n'));
      if (conc) aggiungi(istante(giorno, set.promOra), `conc-${iso}`, '🧪 Da concimare', conc.righe.join('\n'));
      if (gelo) aggiungi(istante(giorno, ORA_GELO), `gelo-${iso}`, '❄️ Rischio gelo stanotte', `Domattina proteggi con tessuto non tessuto o un telo:\n${gelo.righe.join('\n')}`);
    }

    // Semina: il primo giorno dei prossimi 3 mesi
    if (set.seminaAttiva) {
      for (let k = 1; k <= 3; k++) {
        const primo = new Date(oggi.getFullYear(), oggi.getMonth() + k, 1);
        const sem = GO.calcolaAvvisi(meteoDi, primo).find((a) => a.icona === '🌱');
        if (sem) aggiungi(istante(primo, set.promOra), `sem-${L.iso(primo)}`, `🌱 ${sem.titolo}`, `${sem.righe.join('\n')}\nApri «Attività» → «Cosa seminare» per vedere dove.`);
      }
    }

    out.sort((a, b) => a.quando.localeCompare(b.quando));
    return out.slice(0, MAX_PROMEMORIA);
  };
})();
