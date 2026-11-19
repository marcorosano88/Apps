function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, e, o = "function" == typeof Symbol ? Symbol : {}, n = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function i(o, n, a, i) { var u = n && n.prototype instanceof Generator ? n : Generator, f = Object.create(u.prototype); return _regeneratorDefine2(f, "_invoke", function (t, o, n) { var a, i, u, f = 0, p = n || [], y = !1, G = { p: 0, n: 0, v: r, a: l, f: l.bind(r, 4), d: function d(t, e) { return a = t, i = 0, u = r, G.n = e, c; } }; function l(t, o) { for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) { var n, a = p[e], l = G.p, F = a[2]; t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0)); } if (n || t > 1) return c; throw y = !0, o; } return function (n, p, F) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) { a || (i ? (i > 1 && (G.n = i < 3 ? -1 : u), l(i, u)) : G.v = u); try { if (f = 2, a) { if (i || (n = "next"), e = a[n]) { if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object"); if (!e.done) return e; u = e.value, i < 2 && (i = 0); } else 1 === i && (e = a.return) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1); a = r; } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break; } catch (t) { a = r, i = 1, u = t; } finally { f = 1; } } return { value: e, done: y }; }; }(o, a, i), !0), f; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} e = Object.getPrototypeOf; var u = [][n] ? e(e([][n]())) : (_regeneratorDefine2(e = {}, n, function () { return this; }), e), f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(r, a, "GeneratorFunction")), r.prototype = Object.create(f), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefine2(f), _regeneratorDefine2(f, a, "Generator"), _regeneratorDefine2(f, n, function () { return this; }), _regeneratorDefine2(f, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: p }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(e, i) { return _iterableToArrayLimit(e, i) || _unsupportedIterableToArray(e, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, t) { var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { var l, n, i, a, u = [], o = !0, f = !1; try { if (i = (e = e.call(r)).next, 0 === t) { if (Object(e) !== e) return; o = !1; } else for (; !(o = (l = i.call(e)).done) && (u.push(l.value), u.length !== t); o = !0); } catch (r) { f = !0, n = r; } finally { try { if (!o && null != e.return && (a = e.return(), Object(a) !== a)) return; } finally { if (f) throw n; } } return u; } }
function _createForOfIteratorHelper(e, t) { var _n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"]; if (!_n) { if (Array.isArray(e) || (_n = _unsupportedIterableToArray(e)) || t && e && "number" == typeof e.length) { _n && (e = _n); var o = 0, F = function F() {}; return { s: F, n: function n() { return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var a, u, i = !0; return { s: function s() { _n = _n.call(e); }, n: function n() { i = !0; var r = _n.next(); return r.done ? { done: !0 } : { value: r.value, done: i = !1 }; }, e: function e(r) { a = !0, u = r; }, f: function f() { try { i || null == _n.return || _n.return(); } finally { if (a) throw u; } } }; }
function _unsupportedIterableToArray(t, e) { if (t) { if ("string" == typeof t) return _arrayLikeToArray(t, e); var o = {}.toString.call(t).slice(8, -1); return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? _arrayLikeToArray(t, e) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/* Gestione Orto PWA - componenti d'interfaccia: creazione DOM, finestre di dialogo, moduli, toast. */
(function () {
  'use strict';

  var GO = window.GO;
  var UI = GO.UI = {};

  /** h('div', {class:'x', onclick:fn, text:'..'}, ...figli) */
  var h = function h(tag, props) {
    var el = document.createElement(tag);
    if (props) {
      for (var _i = 0, _Object$keys = Object.keys(props); _i < _Object$keys.length; _i++) {
        var k = _Object$keys[_i];
        var v = props[k];
        if (v == null || v === false) continue;
        if (k === 'class') el.className = v;else if (k === 'text') el.textContent = v;else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);else if (k === 'value') el.value = v;else if (k === 'checked' || k === 'disabled' || k === 'selected' || k === 'hidden') el[k] = !!v;else el.setAttribute(k, v === true ? '' : v);
      }
    }
    for (var _len = arguments.length, kids = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      kids[_key - 2] = arguments[_key];
    }
    UI.append(el, kids);
    return el;
  };
  UI.append = function (el, kids) {
    var _iterator = _createForOfIteratorHelper(kids.flat(Infinity)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var k = _step.value;
        if (k == null || k === false) continue;
        el.append(k.nodeType ? k : document.createTextNode(String(k)));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return el;
  };
  UI.h = h;
  UI.clear = function (el) {
    while (el.firstChild) el.removeChild(el.firstChild);
    return el;
  };

  // ---------- Toast ----------
  var toastTimer = null;
  UI.toast = function (msg) {
    var t = document.getElementById('toast');
    if (!t) {
      t = h('div', {
        id: 'toast',
        role: 'status'
      });
      document.body.append(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      return t.classList.remove('show');
    }, 2600);
  };

  // ---------- Modale generica ----------
  var stack = [];
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && stack.length) stack[stack.length - 1].cancel();
  });
  /** build(close) -> elemento; la promessa si risolve col valore passato a close (o cancelValue). */
  UI.modal = function (build, opts) {
    return new Promise(function (resolve) {
      opts = opts || {};
      var ov = h('div', {
        class: 'ov'
      });
      var dlg = h('div', {
        class: 'dlg' + (opts.wide ? ' wide' : ''),
        role: 'dialog',
        'aria-modal': 'true'
      });
      var chiuso = false;
      var close = function close(v) {
        if (chiuso) return;
        chiuso = true;
        var i = stack.findIndex(function (x) {
          return x.ov === ov;
        });
        if (i >= 0) stack.splice(i, 1);
        ov.classList.add('out');
        setTimeout(function () {
          return ov.remove();
        }, 120);
        document.body.classList.toggle('noscroll', stack.length > 0);
        resolve(v);
      };
      var cancel = function cancel() {
        return close(opts.cancelValue === undefined ? null : opts.cancelValue);
      };
      dlg.append(build(close));
      ov.append(dlg);
      ov.addEventListener('pointerdown', function (e) {
        if (e.target === ov) cancel();
      });
      document.body.append(ov);
      document.body.classList.add('noscroll');
      stack.push({
        ov,
        cancel
      });
      var f = dlg.querySelector('[data-autofocus]');
      if (f) setTimeout(function () {
        try {
          f.focus({
            preventScroll: true
          });
          if (f.select) f.select();
        } catch (e) {/* ignore */}
      }, 60);
    });
  };
  UI.alert = function (titolo, msg, ok) {
    return UI.modal(function (close) {
      return h('div', null, h('h2', {
        class: 'dlg-t',
        text: titolo
      }), msg ? h('p', {
        class: 'dlg-m',
        text: msg
      }) : null, h('div', {
        class: 'dlg-b'
      }, h('button', {
        class: 'btn primary',
        'data-autofocus': '1',
        onclick: function onclick() {
          return close(true);
        },
        text: ok || 'OK'
      })));
    }, {
      cancelValue: true
    });
  };
  UI.confirm = function (titolo, msg, o) {
    o = o || {};
    return UI.modal(function (close) {
      return h('div', null, h('h2', {
        class: 'dlg-t',
        text: titolo
      }), msg ? h('p', {
        class: 'dlg-m',
        text: msg
      }) : null, h('div', {
        class: 'dlg-b'
      }, h('button', {
        class: 'btn',
        onclick: function onclick() {
          return close(false);
        },
        text: o.cancel || 'Annulla'
      }), h('button', {
        class: 'btn ' + (o.danger ? 'danger' : 'primary'),
        'data-autofocus': '1',
        onclick: function onclick() {
          return close(true);
        },
        text: o.ok || 'OK'
      })));
    }, {
      cancelValue: false
    });
  };

  /** Foglio di azioni. voci: stringhe o {label, value, danger, sub}. Restituisce value (o la stringa) oppure null. */
  UI.sheet = function (titolo, voci, o) {
    o = o || {};
    return UI.modal(function (close) {
      return h('div', null, titolo ? h('div', {
        class: 'sheet-t',
        text: titolo
      }) : null, h('div', {
        class: 'sheet-l'
      }, voci.map(function (v) {
        var x = typeof v === 'string' ? {
          label: v,
          value: v
        } : v;
        return h('button', {
          class: 'sheet-i' + (x.danger ? ' danger' : ''),
          onclick: function onclick() {
            return close(x.value === undefined ? x.label : x.value);
          }
        }, h('span', {
          text: x.label
        }), x.sub ? h('small', {
          text: x.sub
        }) : null);
      })), h('button', {
        class: 'sheet-x',
        onclick: function onclick() {
          return close(null);
        },
        text: o.cancel || 'Chiudi'
      }));
    }, {
      cancelValue: null
    });
  };

  // ---------- Campi ----------
  /**
   * spec: {key, label, type: text|number|int|date|time|select|textarea|checkbox|info, value, options:[{v,l}], placeholder, hint, max, min, autofocus}
   * Restituisce {el, get(), set(v), input}.
   */
  UI.field = function (spec) {
    var input, get, set;
    var t = spec.type || 'text';
    if (t === 'select') {
      input = h('select', {
        class: 'inp'
      });
      (spec.options || []).forEach(function (op, i) {
        return input.append(h('option', {
          value: String(i),
          text: op.l
        }));
      });
      var sel = (spec.options || []).findIndex(function (op) {
        return op.v === spec.value;
      });
      input.selectedIndex = sel >= 0 ? sel : spec.options && spec.options.length ? 0 : -1;
      get = function get() {
        return input.selectedIndex >= 0 ? spec.options[input.selectedIndex].v : null;
      };
      set = function set(v) {
        var i = spec.options.findIndex(function (op) {
          return op.v === v;
        });
        if (i >= 0) input.selectedIndex = i;
      };
    } else if (t === 'textarea') {
      input = h('textarea', {
        class: 'inp',
        rows: 3,
        placeholder: spec.placeholder || ''
      });
      input.value = spec.value || '';
      get = function get() {
        return input.value.trim();
      };
      set = function set(v) {
        input.value = v || '';
      };
    } else if (t === 'checkbox') {
      input = h('input', {
        type: 'checkbox',
        checked: !!spec.value
      });
      get = function get() {
        return input.checked;
      };
      set = function set(v) {
        input.checked = !!v;
      };
    } else {
      var map = {
        number: ['text', 'decimal'],
        int: ['text', 'numeric'],
        date: ['date', null],
        time: ['time', null],
        text: ['text', null]
      };
      var _ref = map[t] || map.text,
        _ref2 = _slicedToArray(_ref, 2),
        type = _ref2[0],
        im = _ref2[1];
      input = h('input', {
        class: 'inp',
        type,
        placeholder: spec.placeholder || '',
        inputmode: im,
        max: spec.max,
        min: spec.min,
        autocomplete: 'off',
        autocapitalize: spec.cap || 'sentences'
      });
      input.value = spec.value == null ? '' : String(spec.value);
      get = function get() {
        return input.value.trim();
      };
      set = function set(v) {
        input.value = v == null ? '' : String(v);
      };
    }
    if (spec.autofocus) input.setAttribute('data-autofocus', '1');
    var el;
    if (t === 'checkbox') el = h('label', {
      class: 'fld chk'
    }, input, h('span', {
      text: spec.label
    }));else el = h('label', {
      class: 'fld'
    }, spec.label ? h('span', {
      class: 'fld-l',
      text: spec.label
    }) : null, input, spec.hint ? h('small', {
      class: 'fld-h',
      text: spec.hint
    }) : null);
    return {
      el,
      get,
      set,
      input
    };
  };

  /** Modulo in finestra. Restituisce un oggetto {chiave: valore} oppure null. validate(valori) -> messaggio d'errore | null. */
  UI.form = function (titolo, campi, o) {
    o = o || {};
    return UI.modal(function (close) {
      var fs = campi.map(function (c, i) {
        return Object.assign({
          autofocus: i === 0
        }, c);
      }).map(function (c) {
        return {
          c,
          f: UI.field(c)
        };
      });
      var err = h('p', {
        class: 'err',
        hidden: true
      });
      var raccogli = function raccogli() {
        var v = {};
        fs.forEach(function (_ref3) {
          var c = _ref3.c,
            f = _ref3.f;
          if (c.type !== 'info') v[c.key] = f.get();
        });
        return v;
      };
      var ok = function ok() {
        var v = raccogli();
        var e = o.validate ? o.validate(v) : null;
        if (e) {
          err.textContent = e;
          err.hidden = false;
          return;
        }
        close(v);
      };
      var form = h('form', {
        onsubmit: function onsubmit(e) {
          e.preventDefault();
          ok();
        }
      }, h('h2', {
        class: 'dlg-t',
        text: titolo
      }), o.msg ? h('p', {
        class: 'dlg-m',
        text: o.msg
      }) : null, fs.map(function (_ref4) {
        var c = _ref4.c,
          f = _ref4.f;
        return c.type === 'info' ? h('p', {
          class: 'dlg-m',
          text: c.label
        }) : f.el;
      }), err, h('div', {
        class: 'dlg-b'
      }, h('button', {
        type: 'button',
        class: 'btn',
        onclick: function onclick() {
          return close(null);
        },
        text: o.cancel || 'Annulla'
      }), h('button', {
        type: 'submit',
        class: 'btn primary',
        text: o.ok || 'Salva'
      })));
      return form;
    }, {
      cancelValue: null
    });
  };
  UI.prompt = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(titolo, msg, o) {
      var r;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            o = o || {};
            _context.n = 1;
            return UI.form(titolo, [{
              key: 'v',
              label: msg || '',
              type: o.type || 'text',
              value: o.value,
              placeholder: o.placeholder,
              cap: o.cap
            }], {
              ok: o.ok || 'Salva',
              cancel: o.cancel,
              validate: o.validate ? function (v) {
                return o.validate(v.v);
              } : null
            });
          case 1:
            r = _context.v;
            return _context.a(2, r ? r.v : null);
        }
      }, _callee);
    }));
    return function (_x, _x2, _x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  /** Chiede una data (ISO). Restituisce ISO oppure null. */
  UI.askDate = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(titolo, iso, o) {
      var r;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            o = o || {};
            _context2.n = 1;
            return UI.form(titolo, [{
              key: 'd',
              label: 'Data',
              type: 'date',
              value: iso,
              max: o.max,
              autofocus: false
            }], {
              ok: 'OK',
              validate: function validate(v) {
                return v.d ? null : 'Scegli una data.';
              }
            });
          case 1:
            r = _context2.v;
            return _context2.a(2, r ? r.d : null);
        }
      }, _callee2);
    }));
    return function (_x4, _x5, _x6) {
      return _ref6.apply(this, arguments);
    };
  }();

  /** Scelta multipla con caselle. items: [{id,label}]. Restituisce gli id scelti o null. */
  UI.pickMany = function (titolo, msg, items, okLabel) {
    return UI.modal(function (close) {
      var boxes = items.map(function (it) {
        return {
          it,
          cb: h('input', {
            type: 'checkbox'
          })
        };
      });
      var err = h('p', {
        class: 'err',
        hidden: true
      });
      var tutte = h('button', {
        type: 'button',
        class: 'btn small',
        text: 'Tutte',
        onclick: function onclick() {
          var all = boxes.every(function (b) {
            return b.cb.checked;
          });
          boxes.forEach(function (b) {
            return b.cb.checked = !all;
          });
        }
      });
      return h('div', null, h('h2', {
        class: 'dlg-t',
        text: titolo
      }), msg ? h('p', {
        class: 'dlg-m',
        text: msg
      }) : null, h('div', {
        class: 'row-end'
      }, tutte), h('div', {
        class: 'pick'
      }, boxes.map(function (b) {
        return h('label', {
          class: 'pick-i'
        }, b.cb, h('span', {
          text: b.it.label
        }));
      })), err, h('div', {
        class: 'dlg-b'
      }, h('button', {
        class: 'btn',
        onclick: function onclick() {
          return close(null);
        },
        text: 'Annulla'
      }), h('button', {
        class: 'btn primary',
        text: okLabel || 'OK',
        onclick: function onclick() {
          var ids = boxes.filter(function (b) {
            return b.cb.checked;
          }).map(function (b) {
            return b.it.id;
          });
          if (!ids.length) {
            err.textContent = 'Scegli almeno una voce.';
            err.hidden = false;
            return;
          }
          close(ids);
        }
      })));
    }, {
      cancelValue: null
    });
  };

  // ---------- Piccoli componenti ----------
  UI.seg = function (voci, corrente, onchange) {
    return h('div', {
      class: 'seg',
      role: 'tablist'
    }, voci.map(function (v) {
      return h('button', {
        class: v.id === corrente ? 'on' : '',
        role: 'tab',
        'aria-selected': v.id === corrente ? 'true' : 'false',
        onclick: function onclick() {
          return onchange(v.id);
        },
        text: v.label
      });
    }));
  };
  UI.bar = function (p, colore) {
    return h('div', {
      class: 'bar'
    }, h('i', {
      style: {
        width: "".concat(Math.round(Math.max(0, Math.min(1, p)) * 100), "%"),
        background: colore || '#43A047'
      }
    }));
  };
  UI.card = function () {
    for (var _len2 = arguments.length, kids = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      kids[_key2] = arguments[_key2];
    }
    return h.apply(void 0, ['div', {
      class: 'card'
    }].concat(kids));
  };
  UI.empty = function (txt) {
    return h('p', {
      class: 'empty',
      text: txt
    });
  };
  UI.note = function (txt, cls) {
    return h('p', {
      class: 'note ' + (cls || ''),
      text: txt
    });
  };
  UI.chip = function (txt, bg, fg, onclick) {
    return h('div', {
      class: 'chip' + (onclick ? ' tap' : ''),
      style: {
        background: bg,
        color: fg || '#000'
      },
      onclick
    }, txt);
  };
})();