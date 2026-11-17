/* Gestione Orto PWA - componenti d'interfaccia: creazione DOM, finestre di dialogo, moduli, toast. */
(function () {
  'use strict';
  const GO = window.GO;
  const UI = (GO.UI = {});

  /** h('div', {class:'x', onclick:fn, text:'..'}, ...figli) */
  const h = (tag, props, ...kids) => {
    const el = document.createElement(tag);
    if (props) {
      for (const k of Object.keys(props)) {
        const v = props[k];
        if (v == null || v === false) continue;
        if (k === 'class') el.className = v;
        else if (k === 'text') el.textContent = v;
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
        else if (k === 'value') el.value = v;
        else if (k === 'checked' || k === 'disabled' || k === 'selected' || k === 'hidden') el[k] = !!v;
        else el.setAttribute(k, v === true ? '' : v);
      }
    }
    UI.append(el, kids);
    return el;
  };
  UI.append = (el, kids) => {
    for (const k of kids.flat(Infinity)) {
      if (k == null || k === false) continue;
      el.append(k.nodeType ? k : document.createTextNode(String(k)));
    }
    return el;
  };
  UI.h = h;
  UI.clear = (el) => { while (el.firstChild) el.removeChild(el.firstChild); return el; };

  // ---------- Toast ----------
  let toastTimer = null;
  UI.toast = (msg) => {
    let t = document.getElementById('toast');
    if (!t) { t = h('div', { id: 'toast', role: 'status' }); document.body.append(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  };

  // ---------- Modale generica ----------
  const stack = [];
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && stack.length) stack[stack.length - 1].cancel();
  });
  /** build(close) -> elemento; la promessa si risolve col valore passato a close (o cancelValue). */
  UI.modal = (build, opts) => new Promise((resolve) => {
    opts = opts || {};
    const ov = h('div', { class: 'ov' });
    const dlg = h('div', { class: 'dlg' + (opts.wide ? ' wide' : ''), role: 'dialog', 'aria-modal': 'true' });
    let chiuso = false;
    const close = (v) => {
      if (chiuso) return;
      chiuso = true;
      const i = stack.findIndex((x) => x.ov === ov);
      if (i >= 0) stack.splice(i, 1);
      ov.classList.add('out');
      setTimeout(() => ov.remove(), 120);
      document.body.classList.toggle('noscroll', stack.length > 0);
      resolve(v);
    };
    const cancel = () => close(opts.cancelValue === undefined ? null : opts.cancelValue);
    dlg.append(build(close));
    ov.append(dlg);
    ov.addEventListener('pointerdown', (e) => { if (e.target === ov) cancel(); });
    document.body.append(ov);
    document.body.classList.add('noscroll');
    stack.push({ ov, cancel });
    const f = dlg.querySelector('[data-autofocus]');
    if (f) setTimeout(() => { try { f.focus({ preventScroll: true }); if (f.select) f.select(); } catch (e) { /* ignore */ } }, 60);
  });

  UI.alert = (titolo, msg, ok) => UI.modal((close) => h('div', null,
    h('h2', { class: 'dlg-t', text: titolo }),
    msg ? h('p', { class: 'dlg-m', text: msg }) : null,
    h('div', { class: 'dlg-b' }, h('button', { class: 'btn primary', 'data-autofocus': '1', onclick: () => close(true), text: ok || 'OK' }))), { cancelValue: true });

  UI.confirm = (titolo, msg, o) => {
    o = o || {};
    return UI.modal((close) => h('div', null,
      h('h2', { class: 'dlg-t', text: titolo }),
      msg ? h('p', { class: 'dlg-m', text: msg }) : null,
      h('div', { class: 'dlg-b' },
        h('button', { class: 'btn', onclick: () => close(false), text: o.cancel || 'Annulla' }),
        h('button', { class: 'btn ' + (o.danger ? 'danger' : 'primary'), 'data-autofocus': '1', onclick: () => close(true), text: o.ok || 'OK' }))), { cancelValue: false });
  };

  /** Foglio di azioni. voci: stringhe o {label, value, danger, sub}. Restituisce value (o la stringa) oppure null. */
  UI.sheet = (titolo, voci, o) => {
    o = o || {};
    return UI.modal((close) => h('div', null,
      titolo ? h('div', { class: 'sheet-t', text: titolo }) : null,
      h('div', { class: 'sheet-l' },
        voci.map((v) => {
          const x = typeof v === 'string' ? { label: v, value: v } : v;
          return h('button', { class: 'sheet-i' + (x.danger ? ' danger' : ''), onclick: () => close(x.value === undefined ? x.label : x.value) },
            h('span', { text: x.label }), x.sub ? h('small', { text: x.sub }) : null);
        })),
      h('button', { class: 'sheet-x', onclick: () => close(null), text: o.cancel || 'Chiudi' })), { cancelValue: null });
  };

  // ---------- Campi ----------
  /**
   * spec: {key, label, type: text|number|int|date|time|select|textarea|checkbox|info, value, options:[{v,l}], placeholder, hint, max, min, autofocus}
   * Restituisce {el, get(), set(v), input}.
   */
  UI.field = (spec) => {
    let input, get, set;
    const t = spec.type || 'text';
    if (t === 'select') {
      input = h('select', { class: 'inp' });
      (spec.options || []).forEach((op, i) => input.append(h('option', { value: String(i), text: op.l })));
      const sel = (spec.options || []).findIndex((op) => op.v === spec.value);
      input.selectedIndex = sel >= 0 ? sel : spec.options && spec.options.length ? 0 : -1;
      get = () => (input.selectedIndex >= 0 ? spec.options[input.selectedIndex].v : null);
      set = (v) => { const i = spec.options.findIndex((op) => op.v === v); if (i >= 0) input.selectedIndex = i; };
    } else if (t === 'textarea') {
      input = h('textarea', { class: 'inp', rows: 3, placeholder: spec.placeholder || '' });
      input.value = spec.value || '';
      get = () => input.value.trim();
      set = (v) => { input.value = v || ''; };
    } else if (t === 'checkbox') {
      input = h('input', { type: 'checkbox', checked: !!spec.value });
      get = () => input.checked;
      set = (v) => { input.checked = !!v; };
    } else {
      const map = { number: ['text', 'decimal'], int: ['text', 'numeric'], date: ['date', null], time: ['time', null], text: ['text', null] };
      const [type, im] = map[t] || map.text;
      input = h('input', { class: 'inp', type, placeholder: spec.placeholder || '', inputmode: im, max: spec.max, min: spec.min, autocomplete: 'off', autocapitalize: spec.cap || 'sentences' });
      input.value = spec.value == null ? '' : String(spec.value);
      get = () => input.value.trim();
      set = (v) => { input.value = v == null ? '' : String(v); };
    }
    if (spec.autofocus) input.setAttribute('data-autofocus', '1');
    let el;
    if (t === 'checkbox') el = h('label', { class: 'fld chk' }, input, h('span', { text: spec.label }));
    else el = h('label', { class: 'fld' }, spec.label ? h('span', { class: 'fld-l', text: spec.label }) : null, input, spec.hint ? h('small', { class: 'fld-h', text: spec.hint }) : null);
    return { el, get, set, input };
  };

  /** Modulo in finestra. Restituisce un oggetto {chiave: valore} oppure null. validate(valori) -> messaggio d'errore | null. */
  UI.form = (titolo, campi, o) => {
    o = o || {};
    return UI.modal((close) => {
      const fs = campi.map((c, i) => Object.assign({ autofocus: i === 0 }, c)).map((c) => ({ c, f: UI.field(c) }));
      const err = h('p', { class: 'err', hidden: true });
      const raccogli = () => { const v = {}; fs.forEach(({ c, f }) => { if (c.type !== 'info') v[c.key] = f.get(); }); return v; };
      const ok = () => {
        const v = raccogli();
        const e = o.validate ? o.validate(v) : null;
        if (e) { err.textContent = e; err.hidden = false; return; }
        close(v);
      };
      const form = h('form', { onsubmit: (e) => { e.preventDefault(); ok(); } },
        h('h2', { class: 'dlg-t', text: titolo }),
        o.msg ? h('p', { class: 'dlg-m', text: o.msg }) : null,
        fs.map(({ c, f }) => (c.type === 'info' ? h('p', { class: 'dlg-m', text: c.label }) : f.el)),
        err,
        h('div', { class: 'dlg-b' },
          h('button', { type: 'button', class: 'btn', onclick: () => close(null), text: o.cancel || 'Annulla' }),
          h('button', { type: 'submit', class: 'btn primary', text: o.ok || 'Salva' })));
      return form;
    }, { cancelValue: null });
  };

  UI.prompt = async (titolo, msg, o) => {
    o = o || {};
    const r = await UI.form(titolo, [{ key: 'v', label: msg || '', type: o.type || 'text', value: o.value, placeholder: o.placeholder, cap: o.cap }],
      { ok: o.ok || 'Salva', cancel: o.cancel, validate: o.validate ? (v) => o.validate(v.v) : null });
    return r ? r.v : null;
  };

  /** Chiede una data (ISO). Restituisce ISO oppure null. */
  UI.askDate = async (titolo, iso, o) => {
    o = o || {};
    const r = await UI.form(titolo, [{ key: 'd', label: 'Data', type: 'date', value: iso, max: o.max, autofocus: false }],
      { ok: 'OK', validate: (v) => (v.d ? null : 'Scegli una data.') });
    return r ? r.d : null;
  };

  /** Scelta multipla con caselle. items: [{id,label}]. Restituisce gli id scelti o null. */
  UI.pickMany = (titolo, msg, items, okLabel) => UI.modal((close) => {
    const boxes = items.map((it) => ({ it, cb: h('input', { type: 'checkbox' }) }));
    const err = h('p', { class: 'err', hidden: true });
    const tutte = h('button', { type: 'button', class: 'btn small', text: 'Tutte', onclick: () => { const all = boxes.every((b) => b.cb.checked); boxes.forEach((b) => (b.cb.checked = !all)); } });
    return h('div', null,
      h('h2', { class: 'dlg-t', text: titolo }),
      msg ? h('p', { class: 'dlg-m', text: msg }) : null,
      h('div', { class: 'row-end' }, tutte),
      h('div', { class: 'pick' }, boxes.map((b) => h('label', { class: 'pick-i' }, b.cb, h('span', { text: b.it.label })))),
      err,
      h('div', { class: 'dlg-b' },
        h('button', { class: 'btn', onclick: () => close(null), text: 'Annulla' }),
        h('button', { class: 'btn primary', text: okLabel || 'OK', onclick: () => {
          const ids = boxes.filter((b) => b.cb.checked).map((b) => b.it.id);
          if (!ids.length) { err.textContent = 'Scegli almeno una voce.'; err.hidden = false; return; }
          close(ids);
        } })));
  }, { cancelValue: null });

  // ---------- Piccoli componenti ----------
  UI.seg = (voci, corrente, onchange) => h('div', { class: 'seg', role: 'tablist' },
    voci.map((v) => h('button', { class: v.id === corrente ? 'on' : '', role: 'tab', 'aria-selected': v.id === corrente ? 'true' : 'false', onclick: () => onchange(v.id), text: v.label })));
  UI.bar = (p, colore) => h('div', { class: 'bar' }, h('i', { style: { width: `${Math.round(Math.max(0, Math.min(1, p)) * 100)}%`, background: colore || '#43A047' } }));
  UI.card = (...kids) => h('div', { class: 'card' }, ...kids);
  UI.empty = (txt) => h('p', { class: 'empty', text: txt });
  UI.note = (txt, cls) => h('p', { class: 'note ' + (cls || ''), text: txt });
  UI.chip = (txt, bg, fg, onclick) => h('div', { class: 'chip' + (onclick ? ' tap' : ''), style: { background: bg, color: fg || '#000' }, onclick }, txt);
})();
