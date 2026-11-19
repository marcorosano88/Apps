/* Mangiami Prima - interfaccia: router a hash, schermate e funzioni. */
(function () {
  'use strict';
  const MP = window.MP;
  const { store, prodotto: P, date } = MP;

  /* ================= Utilita' ================= */
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const httpsUrl = (u) => { try { const x = new URL(String(u)); return x.protocol === 'https:' ? x.href : ''; } catch (e) { return ''; } };
  const $ = (sel, r) => (r || document).querySelector(sel);
  const vista = $('#vista');
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /** Equivalente di DisplayAlert: bottoni = [{testo, valore, primario}], ritorna il valore scelto. */
  function dialogo(titolo, testo, bottoni) {
    const dlg = $('#dialogo');
    bottoni = bottoni || [{ testo: 'OK', valore: true, primario: true }];
    $('#dialogo-titolo').textContent = titolo;
    $('#dialogo-testo').textContent = testo;
    const box = $('#dialogo-bottoni');
    box.textContent = '';
    return new Promise((resolve) => {
      let esito = bottoni[bottoni.length - 1].valore;
      bottoni.forEach((b) => {
        const el = document.createElement('button');
        el.type = 'button';
        el.textContent = b.testo;
        if (!b.primario) el.className = 'sec';
        el.addEventListener('click', () => { esito = b.valore; dlg.close(); });
        box.appendChild(el);
      });
      dlg.addEventListener('close', () => resolve(esito), { once: true });
      if (typeof dlg.showModal === 'function') dlg.showModal();
      else { alert(`${titolo}\n${testo}`); resolve(bottoni[0].valore); }
    });
  }
  const avviso = (titolo, testo) => dialogo(titolo, testo);
  const conferma = (titolo, testo, si, no) =>
    dialogo(titolo, testo, [{ testo: no || 'Annulla', valore: false }, { testo: si || 'OK', valore: true, primario: true }]);

  /* ================= Tema ================= */
  function applicaTema() {
    const t = store.impostazioni().tema;
    const r = document.documentElement;
    if (t === 'chiaro' || t === 'scuro') r.setAttribute('data-tema', t); else r.removeAttribute('data-tema');
    const scuro = t === 'scuro' || (t === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => { m.content = scuro ? '#1f1f1f' : '#ffffff'; });
  }

  /* ================= Router ================= */
  const pagine = {};
  let pulisciCorrente = null;
  let navigazioni = 0;

  function route() {
    const nome = (location.hash.replace(/^#\/?/, '') || '').split('?')[0] || 'home';
    const pagina = pagine[nome] || pagine.home;
    if (pulisciCorrente) { try { pulisciCorrente(); } catch (e) { /* ignore */ } pulisciCorrente = null; }
    navigazioni++;
    vista.textContent = '';
    $('#titolo').textContent = 'MANGIAMI PRIMA';
    $('#indietro').hidden = pagina === pagine.home;
    pulisciCorrente = pagina(vista) || null;
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  $('#indietro').addEventListener('click', () => {
    if (navigazioni > 1 && history.length > 1) history.back(); else location.hash = '#/';
  });
  const vai = (nome) => { location.hash = '#/' + (nome === 'home' ? '' : nome); };

  /* Delegazione click: data-az="nome" con handler per pagina. */
  function collegaAzioni(root, azioni) {
    root.addEventListener('click', (e) => {
      const el = e.target.closest('[data-az]');
      if (!el || !root.contains(el)) return;
      const f = azioni[el.dataset.az];
      if (f) f(el, e);
    });
  }

  /* ================= Home ================= */
  function bannerScadenze() {
    const lista = MP.notifiche.prodottiInScadenza();
    if (!lista.length) return '';
    const scaduti = lista.filter(P.scaduto).length;
    const righe = lista.slice(0, 6).map((p) => `<li>${esc(p.titolo)}: <strong>${esc(P.testoScadenza(p).toLowerCase())}</strong></li>`).join('');
    const altri = lista.length > 6 ? `<li>... e altri ${lista.length - 6}</li>` : '';
    const titolo = scaduti ? `${lista.length === 1 ? '1 prodotto scaduto o in scadenza' : lista.length + ' prodotti scaduti o in scadenza'}` : (lista.length === 1 ? '1 prodotto in scadenza' : `${lista.length} prodotti in scadenza`);
    return `<section class="banner ${scaduti ? 'rosso' : ''}" role="status" aria-label="Prodotti in scadenza">
      <h3>${titolo}</h3><ul>${righe}${altri}</ul>
      <div class="azioni"><button type="button" class="pillola" data-az="dispensa">Vedi in dispensa</button></div></section>`;
  }

  function notaNotifiche() {
    const s = MP.notifiche.stato();
    if (s === 'serve-installazione') {
      return `<div class="nota"><strong>Per ricevere le notifiche di scadenza su iPhone/iPad aggiungi Mangiami Prima alla schermata Home.</strong> Non serve scaricare nulla dall'App Store.
        <ol><li>Apri questa pagina in Safari.</li><li>Tocca il pulsante Condividi (il quadrato con la freccia in su).</li><li>Scegli "Aggiungi alla schermata Home" e conferma.</li><li>Chiudi Safari e apri Mangiami Prima dalla nuova icona.</li><li>Dall'app aperta con l'icona tocca "Attiva notifiche" (lo trovi qui in Home e in Impostazioni) e consenti.</li></ol></div>`;
    }
    if (s === 'default') {
      return `<p class="nota">Vuoi essere avvisato quando i prodotti stanno per scadere? <button type="button" class="pillola" data-az="attiva-notifiche">Attiva notifiche</button></p>`;
    }
    return '';
  }

  pagine.home = function (root) {
    const voci = [['aggiungi', 'AGGIUNGI'], ['dispensa', 'IN DISPENSA'], ['idee', 'COSA POSSO MANGIARE?'],
      ['spesa', 'LISTA DELLA SPESA'], ['nuova', 'NUOVA RICETTA'], ['impostazioni', 'IMPOSTAZIONI']];
    root.innerHTML = `<div class="home">${bannerScadenze()}
      ${voci.map(([r, t]) => `<button type="button" class="grande" data-vai="${r}">${t}</button>`).join('')}
      ${notaNotifiche()}</div>`;
    root.onclick = (e) => {
      const b = e.target.closest('[data-vai]');
      if (b) { vai(b.dataset.vai); return; }
      const a = e.target.closest('[data-az]');
      if (!a) return;
      if (a.dataset.az === 'dispensa') vai('dispensa');
      if (a.dataset.az === 'attiva-notifiche') MP.notifiche.richiediPermesso().then(() => route());
    };
    return () => { root.onclick = null; };
  };

  /* ================= Aggiungi ================= */
  const MESI = { gennaio: 1, febbraio: 2, marzo: 3, aprile: 4, maggio: 5, giugno: 6, luglio: 7, agosto: 8, settembre: 9, ottobre: 10, novembre: 11, dicembre: 12 };
  const NUMERI = {
    primo: 1, uno: 1, due: 2, tre: 3, quattro: 4, cinque: 5, sei: 6, sette: 7, otto: 8, nove: 9, dieci: 10,
    undici: 11, dodici: 12, tredici: 13, quattordici: 14, quindici: 15, sedici: 16, diciassette: 17, diciotto: 18,
    diciannove: 19, venti: 20, ventuno: 21, ventun: 21, ventidue: 22, ventitre: 23, 'ventitré': 23, ventiquattro: 24,
    venticinque: 25, ventisei: 26, ventisette: 27, ventotto: 28, ventinove: 29, trenta: 30, trentuno: 31, trentun: 31
  };

  const DECINE = { venti: 20, trenta: 30, quaranta: 40, cinquanta: 50, sessanta: 60, settanta: 70, ottanta: 80, novanta: 90 };
  const UNITA = { uno: 1, due: 2, tre: 3, 'tré': 3, quattro: 4, cinque: 5, sei: 6, sette: 7, otto: 8, nove: 9 };

  /** "ventotto" -> 28, "trentatré" -> 33, "dodici" -> 12; null se non riconosciuto (0-99). */
  function numeroInLettere(s) {
    if (s in NUMERI) return NUMERI[s];
    for (const d in DECINE) {
      const radice = d.slice(0, -1);
      if (s === d) return DECINE[d];
      if (s.startsWith(radice)) {
        const r = s.slice(radice.length).replace(/^[ai]/, '');
        if (r in UNITA) return DECINE[d] + UNITA[r];
      }
    }
    return null;
  }

  /** Anno da "2028", "2.028", "2 028" o "duemilaventotto" / "duemila ventotto"; null se assente. */
  function annoDaTesto(testo) {
    const t = testo.toLowerCase()
      .replace(/(\d)[.\s](\d{3})\b/g, '$1$2')
      .replace(/\b(?:due|de|2)\s*mila/g, 'duemila');
    const m = t.match(/\b(\d{4})\b/);
    if (m) return m[1];
    const d2 = t.match(/\bduemila\s*(?:e\s*)?(\d{1,2})\b/) || t.match(/\b20\s(\d{2})\b/);
    if (d2) return String(2000 + parseInt(d2[1], 10));
    const w = t.replace(/duemila\s+(?:e\s+)?/, 'duemila').match(/duemila([a-zàèéìòù]*)/);
    if (!w) return null;
    if (!w[1]) return '2000';
    const n = numeroInLettere(w[1]);
    return n === null ? null : String(2000 + n);
  }

  /** Es. "sette dicembre 2026" o "7/12/2026" -> '2026-12-07'; null se non riconosciuta. */
  function estraiDataDaVoce(testo) {
    const num = testo.match(/\b(\d{1,2})\s*[\/\-. ]\s*(\d{1,2})\s*[\/\-. ]\s*(\d{4})\b/);
    if (num) {
      const isoNum = `${num[3]}-${num[2].padStart(2, '0')}-${num[1].padStart(2, '0')}`;
      if (date.valida(isoNum)) return isoNum;
    }
    const parole = testo.toLowerCase().split(/[ \t\n',.]+/).filter(Boolean);
    const iMese = parole.findIndex((p) => p in MESI);
    if (iMese < 0) return null;
    const mese = MESI[parole[iMese]];
    let giorno = 0;
    for (let i = iMese - 1; i >= 0 && i >= iMese - 3 && !giorno; i--) {
      if (/^\d{1,2}$/.test(parole[i])) { const n = parseInt(parole[i], 10); if (n >= 1 && n <= 31) giorno = n; }
      else if (parole[i] in NUMERI) giorno = NUMERI[parole[i]];
    }
    if (!giorno) return null;
    const anno = annoDaTesto(testo);
    if (!anno) return null;
    const iso = `${anno}-${String(mese).padStart(2, '0')}-${String(giorno).padStart(2, '0')}`;
    return date.valida(iso) ? iso : null;
  }

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  /** Scanner con BarcodeDetector + getUserMedia. Ritorna il codice o null (annullato). */
  async function scansiona() {
    if (!('BarcodeDetector' in window) || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('non-supportato');
    }
    let formati = ['ean_13', 'ean_8', 'upc_a', 'upc_e'];
    try {
      const sup = await window.BarcodeDetector.getSupportedFormats();
      formati = formati.filter((f) => sup.includes(f));
    } catch (e) { /* usa l'elenco completo */ }
    if (!formati.length) throw new Error('non-supportato');
    const rilevatore = new window.BarcodeDetector({ formats: formati });
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });

    const ov = document.createElement('div');
    ov.className = 'scanner';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-label', 'Scansione codice a barre');
    ov.innerHTML = `<video playsinline muted autoplay></video><div class="mirino"></div>
      <div class="info">Inquadra il codice a barre del prodotto</div>
      <button type="button" class="chiudi">Annulla</button>`;
    document.body.appendChild(ov);
    const video = $('video', ov);
    video.srcObject = stream;
    try { await video.play(); } catch (e) { /* autoplay gestito dal browser */ }

    return new Promise((resolve) => {
      let finito = false;
      const chiudi = (valore) => {
        if (finito) return;
        finito = true;
        clearInterval(timer);
        stream.getTracks().forEach((t) => t.stop());
        ov.remove();
        resolve(valore);
      };
      $('.chiudi', ov).addEventListener('click', () => chiudi(null));
      let occupato = false;
      const timer = setInterval(async () => {
        if (occupato || finito || video.readyState < 2) return;
        occupato = true;
        try {
          const trovati = await rilevatore.detect(video);
          // solo il primo risultato fatto di sole cifre (ignora QR con URL ecc.)
          const r = trovati.find((x) => /^[0-9]{8,14}$/.test(x.rawValue || ''));
          if (r) chiudi(r.rawValue);
        } catch (e) { /* frame non valido: si riprova */ }
        occupato = false;
      }, 250);
    });
  }

  pagine.aggiungi = function (root) {
    let codiceTrovato = null;
    let immagineUrl = null;
    let dataScadenza = null;
    let inRicerca = false;
    let recognition = null;

    root.innerHTML = `
      <label class="etichetta" for="codice" style="font-size:18px">Codice a barre del prodotto</label>
      <div class="riga">
        <input id="codice" type="text" inputmode="numeric" autocomplete="off" placeholder="Codice a barre" aria-label="Codice a barre">
        <button type="button" class="quadrato" id="cerca" aria-label="Cerca prodotto">&#128269;</button>
        <button type="button" class="quadrato" id="foto" aria-label="Scansiona con la fotocamera">&#128247;</button>
      </div>
      <input id="nome" type="text" autocomplete="off" placeholder="Scrivi il nome del prodotto" aria-label="Nome del prodotto">
      <img id="img" class="immagine-prodotto" alt="" hidden referrerpolicy="no-referrer">
      <hr class="separatore">
      <label class="etichetta" for="scadenza" style="font-size:18px">Data di scadenza</label>
      <div class="riga">
        <input id="scadenza" type="date" aria-label="Data di scadenza">
        <button type="button" class="quadrato" id="mic" aria-label="Detta la data a voce" ${SR ? '' : 'hidden'}>&#127908;</button>
        <button type="button" class="quadrato sec" id="azzera" aria-label="Cancella la data" style="width:44px;font-size:16px">&#10005;</button>
      </div>
      <button type="button" class="medio" id="salva" disabled>Salva</button>
      <div class="spinner" id="spin" hidden role="status" aria-label="Caricamento"></div>`;

    const el = (id) => $('#' + id, root);
    const nome = el('nome');

    function aggiornaSalva() { el('salva').disabled = inRicerca || !nome.value.trim(); }
    function impostaImmagine(url) {
      immagineUrl = url || null;
      const img = el('img');
      if (url) { img.src = url; img.hidden = false; } else { img.removeAttribute('src'); img.hidden = true; }
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

    async function cerca(codice) {
      codice = (codice || '').trim();
      if (!codice) { await avviso('Attenzione', 'Inserisci o scansiona un codice.'); return; }
      occupato(true);
      nome.value = '';
      impostaScadenza(null);
      codiceTrovato = null;
      impostaImmagine(null);
      try {
        const r = await MP.openFoodFacts.cerca(codice);
        if (r.titolo) {
          nome.value = r.titolo;
          impostaImmagine(r.immagineUrl);
          codiceTrovato = codice;
        } else {
          nome.placeholder = r.erroreRete
            ? 'Ricerca non riuscita (rete o servizio): riprova o scrivi il nome'
            : 'Prodotto non trovato: scrivi il nome del prodotto';
          codiceTrovato = codice;
          nome.focus();
        }
      } catch (e) {
        await avviso('Errore', `Impossibile completare la ricerca: ${e.message}`);
      } finally { occupato(false); }
    }

    el('cerca').addEventListener('click', () => cerca(el('codice').value));
    el('codice').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); cerca(el('codice').value); } });
    nome.addEventListener('input', aggiornaSalva);
    el('scadenza').addEventListener('change', (e) => impostaScadenza(e.target.value));
    el('azzera').addEventListener('click', () => impostaScadenza(null));

    el('foto').addEventListener('click', async () => {
      try {
        const codice = await scansiona();
        if (codice) { el('codice').value = codice; await cerca(codice); }
      } catch (e) {
        const negato = e && (e.name === 'NotAllowedError' || e.name === 'SecurityError');
        if (negato) await avviso('Permesso negato', "E' necessario il permesso fotocamera per scansionare il codice a barre.");
        else if (e && e.message === 'non-supportato') await avviso('Scansione non disponibile', 'Questo browser non supporta la lettura dei codici a barre: scrivi il codice a mano e tocca la lente.');
        else await avviso('Errore', `Impossibile usare la fotocamera: ${e && e.message ? e.message : e}`);
        el('codice').focus();
      }
    });

    el('mic').addEventListener('click', () => {
      if (!SR) return;
      if (recognition) { recognition.stop(); return; }
      const btn = el('mic');
      const rec = new SR();
      recognition = rec;
      rec.lang = 'it-IT';
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      btn.disabled = false;
      btn.style.outline = '3px solid var(--accent)';
      el('spin').hidden = false;
      const timeout = setTimeout(() => rec.stop(), 15000);
      let gestito = false;
      const fine = () => {
        clearTimeout(timeout);
        recognition = null;
        btn.style.outline = '';
        el('spin').hidden = !inRicerca;
      };
      rec.onresult = async (ev) => {
        gestito = true;
        const alt = Array.from(ev.results[0] || []);
        let data = null;
        for (const a of alt) { data = estraiDataDaVoce(a.transcript); if (data) break; }
        if (data) impostaScadenza(data);
        else await avviso('Attenzione', alt[0] ? `Non sono riuscito a riconoscere una data valida da: "${alt[0].transcript}".` : 'Non ho capito, riprova.');
      };
      rec.onerror = async (ev) => {
        gestito = true;
        fine(); // su Safari dopo un errore (es. permesso negato) onend puo' non arrivare: spegni subito spinner ed evidenziazione
        if (ev.error === 'service-not-allowed') await avviso('Riconoscimento vocale non disponibile', "Il servizio di dettatura del dispositivo non e' attivo. Su iPhone/iPad vai in Impostazioni > Generali > Tastiera e attiva 'Abilita dettatura', poi controlla che Siri sia attivo in Impostazioni > Siri. In alternativa usa il microfono della tastiera.");
        else if (ev.error === 'not-allowed') await avviso('Permesso microfono negato', "Consenti l'accesso al microfono per questo sito (su iPhone/iPad: Impostazioni > Safari > Microfono, oppure elimina i dati del sito in Impostazioni > Safari > Avanzate > Dati dei siti web e riprova).");
        else if (ev.error === 'no-speech') await avviso('Attenzione', 'Non ho capito, riprova.');
        else if (ev.error !== 'aborted') await avviso('Errore', `Impossibile acquisire la data a voce (${ev.error}).`);
      };
      rec.onend = async () => { const g = gestito; fine(); if (!g) await avviso('Attenzione', 'Non ho capito, riprova.'); };
      try { rec.start(); } catch (e) { fine(); avviso('Errore', 'Impossibile avviare il riconoscimento vocale.'); }
    });

    el('salva').addEventListener('click', async () => {
      const titolo = nome.value.trim();
      if (!titolo) return;
      const codice = (codiceTrovato || el('codice').value).trim();
      if (!codice) { await avviso('Attenzione', 'Inserisci o scansiona un codice.'); return; }
      const ok = store.salvaProdotto({ codice, titolo, immagineUrl, dataScadenza });
      el('codice').value = ''; nome.value = ''; impostaScadenza(null); codiceTrovato = null; impostaImmagine(null);
      nome.placeholder = 'Scrivi il nome del prodotto';
      aggiornaSalva();
      if (ok) await avviso('Salvato', 'Prodotto salvato.');
      else await avviso('Attenzione', 'Prodotto aggiunto, ma la memoria del dispositivo non permette di conservarlo: esporta i dati dalle Impostazioni.');
    });

    impostaScadenza(null);
    return () => { if (recognition) { try { recognition.abort(); } catch (e) { /* ignore */ } } };
  };

  /* ================= In dispensa ================= */
  pagine.dispensa = function (root) {
    let decrescente = false;
    root.innerHTML = `
      <input id="filtro" type="search" placeholder="Cerca per nome prodotto" aria-label="Cerca per nome prodotto" autocomplete="off">
      <div class="riga">
        <label for="ordine" style="flex:none">Ordina per</label>
        <select id="ordine"><option value="scadenza">Scadenza</option><option value="quantita">Quantità</option><option value="prodotto">Prodotto</option></select>
        <button type="button" id="direzione" class="sec" style="flex:none"></button>
      </div>
      <div><div class="testata" aria-hidden="true"><span>Quantità</span><span style="padding:0 6px">Prodotto</span><span>Scadenza</span></div>
      <div id="elenco"></div></div>`;
    const cmp = new Intl.Collator('it', { sensitivity: 'base' }).compare;

    function ordina(lista, tipo) {
      const nullUltimi = (a, b) => (a.dataScadenza === null) - (b.dataScadenza === null);
      const perScad = (a, b) => nullUltimi(a, b) || (a.dataScadenza || '').localeCompare(b.dataScadenza || '');
      const dir = decrescente ? -1 : 1;
      if (tipo === 'prodotto') return lista.sort((a, b) => dir * cmp(a.titolo, b.titolo) || perScad(a, b));
      if (tipo === 'quantita') return lista.sort((a, b) => dir * (a.quantita - b.quantita) || perScad(a, b));
      return lista.sort((a, b) => nullUltimi(a, b) || dir * (a.dataScadenza || '').localeCompare(b.dataScadenza || '') || b.dataInserimento.localeCompare(a.dataInserimento));
    }

    function disegna() {
      $('#direzione', root).textContent = decrescente ? 'Decrescente ↓' : 'Crescente ↑';
      const filtro = $('#filtro', root).value.trim().toLowerCase();
      let lista = store.prodotti();
      if (filtro) lista = lista.filter((p) => p.titolo.toLowerCase().includes(filtro));
      lista = ordina(lista, $('#ordine', root).value);
      $('#elenco', root).innerHTML = lista.length ? lista.map((p) => {
        const classe = P.scaduto(p) ? 'scaduto' : P.inScadenza(p) ? 'in-scadenza' : '';
        const img = httpsUrl(p.immagineUrl);
        return `<div class="prodotto ${classe}" data-id="${p.id}">
          <span class="barra-scad"></span>
          <div class="qta"><div class="num" aria-label="Quantità ${p.quantita}">${p.quantita}</div>
            <div class="bottoni"><button type="button" class="piccolo" data-az="meno" aria-label="Diminuisci quantità">-</button>
            <button type="button" class="piccolo" data-az="piu" aria-label="Aumenta quantità">+</button></div></div>
          <div class="nome">${img ? `<img src="${esc(img)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : ''}<span>${esc(p.titolo)}</span></div>
          <div class="scad"><div>${esc(date.formatta(p.dataScadenza))}</div>${P.daUsareSubito(p) ? `<div class="testo">${esc(P.testoScadenza(p))}</div>` : ''}</div>
        </div>`;
      }).join('') : '<p class="vuoto">Nessun prodotto salvato.</p>';
    }

    $('#filtro', root).addEventListener('input', disegna);
    $('#ordine', root).addEventListener('change', disegna);
    collegaAzioni(root, {
      direzione: () => { decrescente = !decrescente; disegna(); },
      meno: (el) => { store.diminuisci(Number(el.closest('.prodotto').dataset.id)); disegna(); },
      piu: (el) => { store.aumenta(Number(el.closest('.prodotto').dataset.id)); disegna(); }
    });
    $('#direzione', root).dataset.az = 'direzione';
    disegna();
  };

  /* ================= Cosa posso mangiare? ================= */
  pagine.idee = function (root) {
    let corrente = 0;
    root.innerHTML = `
      <div class="riga"><h2 style="flex:1">Cosa posso mangiare?</h2>
        <button type="button" class="pillola" id="aggiorna" style="min-height:44px;flex:none">AGGIORNA</button></div>
      <p>Ricette adatte a quello che hai in casa.</p>
      <div class="spinner" id="spin" hidden role="status" aria-label="Caricamento"></div>
      <p class="messaggio" id="msg" hidden></p>
      <div id="ricette" style="display:grid;gap:15px"></div>`;
    const msg = (t, errore) => { const m = $('#msg', root); m.textContent = t || ''; m.hidden = !t; m.classList.toggle('errore', !!errore); };

    async function carica() {
      const mio = ++corrente;
      $('#aggiorna', root).disabled = true;
      $('#spin', root).hidden = false;
      msg('');
      $('#ricette', root).textContent = '';
      try {
        const prodotti = store.prodotti();
        if (!prodotti.length) { msg('Non hai ancora prodotti: aggiungi qualche prodotto per ricevere idee.'); return; }
        const { ricette, daCache } = await MP.ricette.getIdee(prodotti);
        if (mio !== corrente) return;
        if (!ricette.length) { msg('Nessuna ricetta trovata con gli ingredienti che hai in casa.'); return; }
        if (daCache) msg('Sei offline: queste sono le ultime ricette scaricate.');
        $('#ricette', root).innerHTML = ricette.map(schedaRicetta).join('');
        $('#ricette', root)._ricette = ricette;
      } catch (e) {
        if (mio === corrente) msg(`Impossibile recuperare le ricette: ${e.message}`, true);
      } finally {
        if (mio === corrente) { $('#aggiorna', root).disabled = false; $('#spin', root).hidden = true; }
      }
    }

    function schedaRicetta(r, i) {
      const n = r.posseduti;
      const compat = `Hai ${n} ${n === 1 ? 'ingrediente' : 'ingredienti'} su ${r.ingredienti.length}`;
      const inScad = r.inScadenza.map((x) => `${x.ingrediente}: ${date.giorniDa(x.scadenza) < 0 ? 'scaduto il' : 'scade il'} ${date.formatta(x.scadenza)}`).join('\n');
      return `<article class="ricetta" data-i="${i}">
        <h3>${esc(r.titolo)}</h3>
        <div class="compat">${esc(compat)}</div>
        ${inScad ? `<div class="scad-ing">${esc(inScad)}</div>` : ''}
        ${r.mancanti.length ? `<div>${esc('Ti mancano: ' + r.mancanti.join(', '))}</div>` : ''}
        ${r.tempo_preparazione ? `<div class="corsivo">${esc('Tempo di preparazione: ' + r.tempo_preparazione)}</div>` : ''}
        <div class="procedimento">${esc(r.procedimento || '')}</div>
        ${r.autore_nome && String(r.autore_nome).trim() ? `<div class="corsivo">${esc('Autore: ' + r.autore_nome)}</div>` : ''}
        ${r.mancanti.length ? `<button type="button" class="pillola" data-az="mancanti" style="min-height:40px;font-size:13px">AGGIUNGI MANCANTI ALLA SPESA</button>` : ''}
      </article>`;
    }

    $('#aggiorna', root).addEventListener('click', carica);
    collegaAzioni(root, {
      mancanti: async (el) => {
        const r = $('#ricette', root)._ricette[Number(el.closest('.ricetta').dataset.i)];
        const aggiunti = store.aggiungiAllaSpesa(r.mancanti);
        const m = aggiunti === 0 ? 'Gli ingredienti mancanti sono già nella lista della spesa.' : `Aggiunti ${aggiunti} ingredienti alla lista della spesa.`;
        const apri = await dialogo('Lista della spesa', m, [{ testo: 'OK', valore: false }, { testo: 'Apri lista', valore: true, primario: true }]);
        if (apri) vai('spesa');
      }
    });
    carica();
    return () => { corrente++; };
  };

  /* ================= Lista della spesa ================= */
  pagine.spesa = function (root) {
    root.innerHTML = `
      <h2>Lista della spesa</h2>
      <div class="riga"><input id="nuovo" type="text" placeholder="Aggiungi un prodotto" enterkeyhint="done" autocomplete="off" aria-label="Nuovo elemento">
        <button type="button" id="aggiungi" style="flex:none">Aggiungi</button></div>
      <div id="lista"></div>
      <button type="button" class="pillola" id="rimuovi" style="width:100%;min-height:44px">RIMUOVI GLI ACQUISTATI</button>`;
    function disegna() {
      const l = store.listaSpesa();
      $('#lista', root).innerHTML = l.length ? l.map((e) => `<div class="elemento ${e.acquistato ? 'fatto' : ''}" data-id="${e.id}">
        <button type="button" class="piccolo sec" style="width:40px;min-height:40px" data-az="spunta" role="checkbox" aria-checked="${e.acquistato}" aria-label="Acquistato: ${esc(e.nome)}">${e.acquistato ? '✓' : '○'}</button>
        <span class="testo">${esc(e.nome)}</span>
        <button type="button" class="piccolo sec" style="width:40px;min-height:40px" data-az="elimina" aria-label="Elimina ${esc(e.nome)}">✕</button></div>`).join('')
        : '<p class="vuoto">La lista è vuota.</p>';
    }
    function aggiungi() {
      const i = $('#nuovo', root);
      const n = i.value.trim();
      if (!n) return;
      store.aggiungiAllaSpesa([n]);
      i.value = '';
      disegna();
    }
    $('#aggiungi', root).addEventListener('click', aggiungi);
    $('#nuovo', root).addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); aggiungi(); } });
    $('#rimuovi', root).addEventListener('click', () => { store.rimuoviAcquistati(); disegna(); });
    collegaAzioni(root, {
      spunta: (el) => { const id = Number(el.closest('.elemento').dataset.id); const e = store.listaSpesa().find((x) => x.id === id); if (e) store.impostaAcquistato(id, !e.acquistato); disegna(); },
      elimina: (el) => { store.eliminaElementoSpesa(Number(el.closest('.elemento').dataset.id)); disegna(); }
    });
    disegna();
  };

  /* ================= Nuova ricetta ================= */
  pagine.nuova = function (root) {
    root.innerHTML = `
      <h2>Nuova ricetta</h2>
      <div><label class="etichetta" for="r-titolo">Titolo</label><input id="r-titolo" type="text" placeholder="Es. Pasta al pomodoro" autocomplete="off"></div>
      <div><label class="etichetta" for="r-ing">Ingredienti</label><textarea id="r-ing" placeholder="Uno per riga oppure separati da virgola (es. pasta, pomodoro, basilico)"></textarea></div>
      <div><label class="etichetta" for="r-tempo">Tempo di preparazione</label><input id="r-tempo" type="text" placeholder="Es. 20 minuti" autocomplete="off"></div>
      <div><label class="etichetta" for="r-proc">Procedimento</label><textarea id="r-proc" style="min-height:150px" placeholder="Descrivi i passaggi della ricetta"></textarea></div>
      <div><label class="etichetta" for="r-autore">Autore (facoltativo)</label><input id="r-autore" type="text" placeholder="Il tuo nome" autocomplete="name"></div>
      <div class="spinner" id="spin" hidden role="status" aria-label="Invio in corso"></div>
      <button type="button" class="medio" id="salva">Salva ricetta</button>
      <p class="soft centro" id="coda" hidden></p>`;
    const v = (id) => $('#' + id, root).value.trim();
    const aggCoda = () => { const n = MP.ricette.inCoda(); const c = $('#coda', root); c.hidden = !n; c.textContent = n ? `${n} ${n === 1 ? 'ricetta in attesa' : 'ricette in attesa'} di invio (verranno inviate appena torna la connessione).` : ''; };
    aggCoda();
    $('#salva', root).addEventListener('click', async () => {
      const titolo = v('r-titolo');
      const procedimento = v('r-proc');
      const ingredienti = [...new Set(v('r-ing').split(/[,;\n\r]+/).map((i) => i.trim().toLowerCase()).filter(Boolean))];
      if (!titolo || !ingredienti.length || !procedimento) { await avviso('Attenzione', 'Titolo, ingredienti e procedimento sono obbligatori.'); return; }
      const btn = $('#salva', root);
      btn.disabled = true; $('#spin', root).hidden = false;
      try {
        const esito = await MP.ricette.salvaRicetta({ titolo, ingredienti, procedimento, tempo: v('r-tempo'), autore: v('r-autore') });
        if (esito === 'inviata') await avviso('Salvata', 'Ricetta aggiunta.');
        else await avviso('Offline', 'Non c\'è connessione: la ricetta è stata salvata sul dispositivo e verrà inviata appena possibile.');
        vai('home');
      } catch (e) {
        await avviso('Errore', `Impossibile salvare la ricetta: ${e.message}`);
        btn.disabled = false; $('#spin', root).hidden = true; aggCoda();
      }
    });
  };

  /* ================= Impostazioni ================= */
  function testoGiorni(g) {
    return g === 0 ? 'Avvisami il giorno stesso della scadenza' : g === 1 ? 'Avvisami 1 giorno prima della scadenza' : `Avvisami ${g} giorni prima della scadenza`;
  }
  function testoStatoNotifiche() {
    switch (MP.notifiche.stato()) {
      case 'granted': if (store.impostazioni().notifiche === false) return 'Notifiche disattivate: non riceverai avvisi di scadenza. Attiva l\'interruttore per riceverli.';
        if (MP.push && MP.push.attivo()) return 'Notifiche attive: l\'avviso arriva dal server anche con l\'app chiusa.';
        return 'Notifiche attive. Se l\'app è chiusa, l\'avviso arriva solo dove il sistema consente l\'esecuzione in background; altrimenti compare all\'apertura dell\'app e nel riquadro in Home.';
      case 'denied': return 'Notifiche bloccate: abilitale dalle impostazioni del browser o del sistema. Nel frattempo i prodotti in scadenza compaiono nel riquadro in Home.';
      case 'serve-installazione': return 'Su iPhone/iPad le notifiche funzionano solo se apri Mangiami Prima dall\'icona sulla schermata Home (non serve l\'App Store). In Safari tocca Condividi, poi "Aggiungi alla schermata Home" e conferma; chiudi Safari, apri Mangiami Prima dalla nuova icona e attiva di nuovo le notifiche.';
      case 'non-supportato': return 'Questo browser non supporta le notifiche: i prodotti in scadenza compaiono nel riquadro in Home.';
      default: return 'Le notifiche non sono ancora attivate: attiva l\'interruttore e consenti l\'invio.';
    }
  }

  pagine.impostazioni = function (root) {
    const imp = store.impostazioni();
    root.innerHTML = `<div class="impostazioni">
      <h2 class="centro">Impostazioni</h2>
      <strong>Notifica di scadenza</strong>
      <div class="riga"><span id="giorni-testo" style="flex:1"></span>
        <div class="stepper"><button type="button" class="piccolo sec" id="meno" aria-label="Un giorno in meno" style="width:44px;min-height:44px">-</button>
          <output id="giorni-n" aria-live="polite"></output>
          <button type="button" class="piccolo sec" id="piu" aria-label="Un giorno in più" style="width:44px;min-height:44px">+</button></div></div>
      <div class="riga"><label for="orario" style="flex:1">Ora della notifica</label><input id="orario" type="time" style="width:auto;flex:none" value="${esc(imp.orario)}"></div>
      <div class="riga-switch"><label for="notifiche">Notifiche di scadenza</label>
        <input type="checkbox" id="notifiche" class="interruttore" role="switch"></div>
      <div class="stato-notifiche soft" id="stato-notifiche"></div>
      <div class="riga"><label for="tema" style="flex:1">Tema</label>
        <select id="tema" style="width:auto;flex:none"><option value="auto">Automatico</option><option value="chiaro">Chiaro</option><option value="scuro">Scuro</option></select></div>

      <hr class="separatore" style="margin:6px 0">
      <strong>I tuoi dati</strong>
      <p class="soft" style="font-size:14px">I prodotti e la lista della spesa restano su questo dispositivo. Se attivi le notifiche, nome e data di scadenza dei prodotti vengono inviati al server solo per poterti avvisare. Esporta un file di backup o importalo su un altro dispositivo.</p>
      <div class="riga"><button type="button" id="esporta" class="sec" style="flex:1">Esporta JSON</button>
        <button type="button" id="importa" class="sec" style="flex:1">Importa JSON</button></div>
      <input type="file" id="file" accept="application/json,.json" hidden>

      <hr class="separatore" style="margin:6px 0">
      <p>MANGIAMI PRIMA ti aiuta a tenere traccia di cosa hai in casa, tra frigo, freezer e dispensa: cerca un prodotto tramite il codice a barre o la fotocamera, indica la data di scadenza (anche a voce) e premi 'Salva'. Se il prodotto non viene trovato, puoi scriverne il nome a mano.</p>
      <p>Nella sezione 'In dispensa' puoi consultare, cercare e aggiornare le quantità dei prodotti salvati. I prodotti sono ordinati per scadenza, per quantità o per nome del prodotto, in modo crescente o decrescente, a tua scelta: quelli scaduti sono segnati in rosso e quelli che scadono entro 3 giorni in arancione.</p>
      <p>Nella sezione 'Cosa posso mangiare?' trovi le ricette più adatte a quello che hai in casa, arrivano da un database online e con il pulsante 'Aggiorna' puoi ricaricarle. Per ogni ricetta vedi quali ingredienti ti mancano e quali dei tuoi prodotti sono scaduti o in scadenza, con la data: le ricette che li usano hanno la precedenza. Con 'Aggiungi mancanti alla spesa' mandi gli ingredienti che non hai nella lista della spesa.</p>
      <p>Nella 'Lista della spesa' puoi aggiungere prodotti a mano, spuntare quelli già acquistati, eliminarli o rimuovere in una volta tutti quelli acquistati. Con 'Nuova ricetta' puoi inserire una tua ricetta nel database.</p>
      <p class="copyright">@Marco Rosano<br>Versione ${esc(MP.VERSIONE)}</p></div>`;

    $('#tema', root).value = imp.tema;
    function aggiorna() {
      const g = store.impostazioni().giorniPreavviso;
      $('#giorni-testo', root).textContent = testoGiorni(g);
      $('#giorni-n', root).textContent = g;
      $('#meno', root).disabled = g <= 0;
      $('#piu', root).disabled = g >= MP.MASSIMO_GIORNI;
      $('#stato-notifiche', root).textContent = testoStatoNotifiche();
      const s = MP.notifiche.stato();
      const sw = $('#notifiche', root);
      sw.checked = s === 'granted' && store.impostazioni().notifiche !== false;
      sw.disabled = s !== 'default' && s !== 'granted'; // bloccate, non supportate o app da installare: non si puo' cambiare da qui
    }
    $('#notifiche', root).addEventListener('change', async (e) => {
      const sw = e.target;
      sw.disabled = true;
      try { await MP.notifiche.imposta(sw.checked); } catch (err) { console.warn('Notifiche:', err); }
      aggiorna();
    });
    $('#meno', root).addEventListener('click', () => { store.impostaImpostazioni({ giorniPreavviso: store.impostazioni().giorniPreavviso - 1, ultimaNotifica: '' }); aggiorna(); });
    $('#piu', root).addEventListener('click', () => { store.impostaImpostazioni({ giorniPreavviso: store.impostazioni().giorniPreavviso + 1, ultimaNotifica: '' }); aggiorna(); });
    $('#orario', root).addEventListener('change', (e) => { if (e.target.value) store.impostaImpostazioni({ orario: e.target.value, ultimaNotifica: '' }); });
    $('#tema', root).addEventListener('change', (e) => { store.impostaImpostazioni({ tema: e.target.value }); applicaTema(); });

    $('#esporta', root).addEventListener('click', async () => {
      const blob = new Blob([store.esporta()], { type: 'application/json' });
      const nomeFile = `mangiamiprima-${date.oggi()}.json`;
      try {
        const file = new File([blob], nomeFile, { type: 'application/json' });
        if (navigator.canShare && navigator.canShare({ files: [file] }) && MP.notifiche.isIOS()) { await navigator.share({ files: [file], title: 'Mangiami Prima' }); return; }
      } catch (e) { if (e && e.name === 'AbortError') return; }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = nomeFile; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    });
    $('#importa', root).addEventListener('click', () => $('#file', root).click());
    $('#file', root).addEventListener('change', async (e) => {
      const f = e.target.files[0];
      e.target.value = '';
      if (!f) return;
      if (!(await conferma('Importa dati', 'I prodotti e la lista della spesa attuali verranno sostituiti con quelli del file. Continuare?', 'Importa'))) return;
      try {
        const r = store.importa(await f.text());
        applicaTema();
        await avviso('Importato', `Importati ${r.prodotti} prodotti e ${r.spesa} elementi della spesa.`);
        route();
      } catch (err) { await avviso('Errore', err.message); }
    });
    aggiorna();
  };

  /* ================= Avvio ================= */
  function registraServiceWorker() {
    if (!('serviceWorker' in navigator) || !/^(https:|http:\/\/(localhost|127\.0\.0\.1))/.test(location.protocol + '//' + location.hostname)) return;
    // Quando arriva una versione nuova, ricarica la pagina: altrimenti resta visibile quella vecchia fino alla riapertura successiva.
    const aveva = !!navigator.serviceWorker.controller;
    let ricarica = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!aveva || ricarica) return;
      ricarica = true;
      location.reload();
    });
    navigator.serviceWorker.register('sw.js').then((reg) => reg.update().catch(() => {})).catch((e) => console.warn('Service worker non registrato', e));
  }

  async function sincronizzaCoda() {
    if (!MP.ricette.inCoda()) return;
    const n = await MP.ricette.svuotaCoda();
    if (n) avviso('Ricette inviate', n === 1 ? 'La ricetta in attesa è stata inviata.' : `${n} ricette in attesa sono state inviate.`);
  }

  applicaTema();
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', applicaTema);
    else if (mq.addListener) mq.addListener(applicaTema); // Safari < 14
  }
  route();
  MP.push.avvia();
  MP.notifiche.avvia();
  registraServiceWorker();
  sincronizzaCoda();
  window.addEventListener('online', sincronizzaCoda);
})();
