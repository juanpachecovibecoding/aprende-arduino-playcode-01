import { a as e, i as t, n, o as r, r as i, s as a, t as o } from "./index.js";
import { l, u, d, f, p, m, h, ee, _, te, v } from "./data/lessons.js";
import { se } from "./ui/traces.js";
import { de } from "./ui/clock.js";
import { fe, b } from "./ui/icons.js";
import { yt, bt, xt, St } from "./audio/sound.js";
var s = Object.defineProperty,
  c = (e, t) => {
    let n = {};
    for (var r in e) s(n, r, { get: e[r], enumerable: !0 });
    return (t || s(n, Symbol.toStringTag, { value: "Module" }), n);
  },
  g = i(ee);
var pe = `http://www.w3.org/2000/svg`,
  me = 7;
function x(e, t = {}) {
  let n = document.createElementNS(pe, e);
  for (let [e, r] of Object.entries(t)) n.setAttribute(e, r);
  return n;
}
function he(e, t, n) {
  let r = e.ring ? me : 0,
    i = e.at * n;
  switch (e.side) {
    case `top`:
      return [t.x + i, t.y - r];
    case `left`:
      return [t.x - +!e.ring, t.y + i];
    case `right`:
      return [t.x + t.w + +!e.ring, t.y + i];
    default:
      return [t.x + i, t.y + t.h + r];
  }
}
function ge(e, t, n, r) {
  let i = (e.leg ?? 30) * r;
  if (e.approach === `above`) return [n[0], n[1] - i];
  switch (e.side) {
    case `top`:
      return [t[0], t[1] - i];
    case `left`:
      return [t[0] - i, t[1]];
    case `right`:
      return [t[0] + i, t[1]];
    default:
      return [t[0], t[1] + i];
  }
}
var _e = class {
    constructor({ rig: e, svg: t, tags: n, onFocus: r }) {
      ((this.rig = e),
        (this.svg = t),
        (this.tags = n),
        (this.onFocus = r),
        (this.origin = { x: 0, y: 0 }),
        (this.scale = 1),
        (this.sets = []),
        (this.current = null),
        (this.free = !1),
        (this.hidden = !1),
        (this.floats = new Map()),
        (this.readout = document.createElement(`div`)),
        (this.readout.className = `readout`),
        n.append(this.readout));
    }
    show(e, { delay: t = 0, hold: n = !1 } = {}) {
      for (let e of this.sets) this.retire(e);
      let r = {
        lesson: e,
        items: [],
        aligned: !1,
        root: x(`g`, { class: `leader-set is-hidden` }),
      };
      this.svg.append(r.root);
      for (let t of e.callouts) {
        let e = document.createElement(`article`);
        ((e.className = `callout is-hidden`),
          (e.tabIndex = 0),
          e.style.setProperty(`--x`, `${t.x}px`),
          e.style.setProperty(`--y`, `${t.y}px`),
          e.style.setProperty(`--w`, `${t.w}px`));
        let n = [
          `callout-icon`,
          t.tall ? `tall` : ``,
          t.wide ? `wide` : ``,
        ].join(` `);
        ((e.innerHTML = `${b(t.icon, n)}<div><h3>${t.title}</h3><p>${t.body}</p></div>`),
          this.rig.append(e));
        let i = x(`g`, { class: `leader` }),
          a = x(`path`);
        i.append(a);
        let o = null;
        t.ring &&
          ((o = x(`circle`, { r: 4.6, class: `dot-end` })), i.append(o));
        let s = (e) => {
            let t = x(`g`, { class: `hotspot` });
            return (
              t.append(
                x(`circle`, { r: e + 6, class: `dot-hit` }),
                x(`circle`, { r: e, class: `dot-halo` }),
                x(`circle`, { r: e - 1.2, class: `dot-anchor` }),
              ),
              i.append(t),
              t
            );
          },
          c = t.via ? s(7.2) : null,
          l = s(7.6);
        (t.anchor.startsWith(`part:`) && l.classList.add(`is-passive`),
          r.root.append(i));
        let u = document.createElement(`button`);
        ((u.className = `tag is-hidden`),
          (u.innerHTML = `<span>${t.title}</span>`),
          this.tags.append(u));
        let d = {
            c: t,
            card: e,
            g: i,
            path: a,
            ring: o,
            via: c,
            dot: l,
            tag: u,
            size: null,
          },
          f = () => this.onFocus?.(t);
        (e.addEventListener(`click`, f),
          e.addEventListener(`keydown`, (e) => {
            (e.key === `Enter` || e.key === ` `) && (e.preventDefault(), f());
          }),
          l.addEventListener(`click`, f),
          u.addEventListener(`click`, f));
        for (let t of [e, l, u])
          (t.addEventListener(`pointerenter`, () => i.classList.add(`is-hot`)),
            t.addEventListener(`pointerleave`, () =>
              i.classList.remove(`is-hot`),
            ));
        r.items.push(d);
      }
      (this.sets.push(r), (this.current = r));
      let i = () => {
        this.current === r &&
          (r.root.classList.remove(`is-hidden`),
          r.items.forEach((e, t) => {
            ((e.card.style.transitionDelay = `${t * 60}ms`),
              e.card.classList.remove(`is-hidden`),
              e.tag.classList.remove(`is-hidden`));
          }));
      };
      ((this.held = null),
        n ? (this.held = i) : t ? setTimeout(i, t) : requestAnimationFrame(i));
    }
    release() {
      let e = this.held;
      ((this.held = null), e?.());
    }
    retire(e) {
      e.root.classList.add(`is-hidden`);
      for (let t of e.items)
        ((t.card.style.transitionDelay = `0ms`),
          t.card.classList.add(`is-leaving`),
          t.tag.classList.add(`is-hidden`));
      setTimeout(() => {
        e.root.remove();
        for (let t of e.items) (t.card.remove(), t.tag.remove());
        this.sets = this.sets.filter((t) => t !== e);
      }, 420);
    }
    setFree(e) {
      e !== this.free &&
        ((this.free = e),
        this.rig.classList.toggle(`is-free`, e),
        this.svg.classList.toggle(`is-free`, e),
        this.tags.classList.toggle(`is-free`, e));
    }
    setVisible(e) {
      this.hidden = !e;
      for (let t of [this.rig, this.svg, this.tags])
        t.classList.toggle(`is-off`, !e);
    }
    layoutTags(e, t, n, r = []) {
      let i = [],
        a = e.map(({ a: e }) => e),
        o = (e) =>
          r.every(
            (t) =>
              e.x >= t.x1 + 3 ||
              t.x0 >= e.x + e.w + 3 ||
              e.y >= t.y1 + 3 ||
              t.y0 >= e.y + e.h + 3,
          ),
        s = (e, r) =>
          e.x >= 0 &&
          e.y >= 0 &&
          e.x + e.w <= t &&
          e.y + e.h <= n &&
          o(e) &&
          i.every(
            (t) =>
              e.x >= t.x + t.w + 4 ||
              t.x >= e.x + e.w + 4 ||
              e.y >= t.y + t.h + 3 ||
              t.y >= e.y + e.h + 3,
          ) &&
          a.every(
            (t) =>
              t === r ||
              t[0] < e.x - 9 ||
              t[0] > e.x + e.w + 9 ||
              t[1] < e.y - 9 ||
              t[1] > e.y + e.h + 9,
          );
      e.sort((e, t) => e.a[1] - t.a[1]);
      for (let { it: t, a: n } of e) {
        t.tagSize?.w ||
          (t.tagSize = { w: t.tag.offsetWidth, h: t.tag.offsetHeight });
        let { w: e, h: r } = t.tagSize,
          a = [
            [n[0] + 13, n[1] - 13],
            [n[0] - 13 - e, n[1] - 13],
            [n[0] + 8, n[1] - r - 11],
            [n[0] + 8, n[1] + 11],
            [n[0] - 8 - e, n[1] - r - 11],
            [n[0] - 8 - e, n[1] + 11],
            [n[0] - e / 2, n[1] - r - 30],
            [n[0] + 30, n[1] - r - 22],
            [n[0] - 30 - e, n[1] - r - 22],
            [n[0] - e / 2, n[1] + 30],
          ],
          c = (t) => ({ x: a[t][0], y: a[t][1], w: e, h: r }),
          l = 0;
        (s(c(0), n) ||
          (l =
            t.tagSpot && s(c(t.tagSpot), n)
              ? t.tagSpot
              : Math.max(
                  0,
                  a.findIndex((e, t) => s(c(t), n)),
                )),
          (t.tagSpot = l),
          i.push(c(l)),
          t.tag.classList.toggle(`is-through`, !o(c(l))),
          (t.tag.style.transform = `translate(${a[l][0]}px, ${a[l][1]}px)`));
      }
    }
    invalidate() {
      for (let e of this.sets) {
        e.aligned = !1;
        for (let t of e.items) t.size = null;
      }
    }
    update(e) {
      let { w: t, h: n } = e.size,
        r = [];
      for (let i of this.sets) {
        if (!i.aligned && i === this.current && e.isHome()) {
          for (let t of i.items) {
            if (!t.c.via) continue;
            let n = e.anchor(t.c.via);
            if (!n) continue;
            let [r] = e.project(n);
            (t.card.style.setProperty(
              `--x`,
              `${(r - this.origin.x) / this.scale - t.c.at}px`,
            ),
              (t.size = null));
          }
          i.aligned = !0;
        }
        for (let a of i.items) {
          let o = e.anchor(a.c.anchor);
          if (!o) {
            ((a.g.style.display = `none`), (a.tag.style.display = `none`));
            continue;
          }
          a.g.style.display = ``;
          let s = e.project(o);
          a.size ??= {
            w: a.card.offsetWidth,
            h: a.card.offsetHeight,
            x: a.card.offsetLeft,
            y: a.card.offsetTop,
          };
          let c = this.scale,
            l = {
              x: this.origin.x + a.size.x * c,
              y: this.origin.y + a.size.y * c,
              w: a.size.w * c,
              h: a.size.h * c,
            },
            u = he(a.c, l, c),
            d;
          if (a.c.via) {
            let t = e.anchor(a.c.via),
              n = t ? e.project(t) : u;
            ((d = `M${u[0]} ${u[1]} L${n[0]} ${n[1]} L${s[0]} ${s[1]}`),
              a.via?.setAttribute(`transform`, `translate(${n[0]} ${n[1]})`));
          } else {
            let e = ge(a.c, u, s, c);
            d = `M${u[0]} ${u[1]} L${e[0]} ${e[1]} L${s[0]} ${s[1]}`;
          }
          (a.path.setAttribute(`d`, d),
            a.ring &&
              (a.ring.setAttribute(`cx`, u[0]),
              a.ring.setAttribute(`cy`, u[1])),
            a.dot.setAttribute(`transform`, `translate(${s[0]} ${s[1]})`));
          let f = s[0] > 0 && s[1] > 0 && s[0] < t && s[1] < n;
          ((a.dot.style.display = f ? `` : `none`),
            (a.tag.style.display = f ? `` : `none`),
            f && i === this.current
              ? r.push({ it: a, a: s })
              : (a.tag.style.transform = `translate(${s[0] + 13}px, ${s[1] - 13}px)`));
        }
      }
      this.layoutTags(r, t, n, this.free && r.length ? e.pressRects() : []);
      let i = new Set(e.floats ?? []);
      for (let [e, t] of this.floats)
        i.has(e) || (t.remove(), this.floats.delete(e));
      let a = performance.now();
      for (let t of i) {
        let n = this.floats.get(t);
        n ||
          ((n = document.createElement(`span`)),
          (n.className = `float-note`),
          (n.textContent = t.text),
          n.style.setProperty(`--c`, t.color),
          this.tags.append(n),
          this.floats.set(t, n));
        let r = Math.min(1, (a - t.born) / t.life),
          [i, o] = e.projectPoint(t.position);
        ((n.style.transform = `translate(${i}px, ${o - 46 * r}px) translate(-50%, -100%) scale(${0.8 + 0.2 * Math.min(1, r * 5)})`),
          (n.style.opacity = String(Math.min(1, r * 6) * (1 - r ** 4))));
      }
      let o = e.readoutState;
      if (o) {
        let [t, n] = e.projectPoint(o.position);
        ((this.readout.textContent = o.text),
          (this.readout.style.transform = `translate(${t}px, ${n}px) translate(-50%, -50%)`),
          this.readout.classList.add(`is-on`));
      } else this.readout.classList.remove(`is-on`);
    }
  },
  S = [`overview`, `pinout`, `example`, `specs`];
function ve(t, n) {
  switch (n) {
    case `pinout`:
      return `
        <h2>${e(`Pinout`)}</h2>
        <p class="sub">${t.id === `board` ? e(`How the Uno’s headers are grouped.`) : e(`How this circuit is wired.`)}</p>
        <table class="pin-table">
          <thead><tr><th>${e(`Pin`)}</th><th>${e(`Connects to`)}</th><th>${e(`What it does`)}</th></tr></thead>
          <tbody>${t.pinout.map(([e, t, n, r]) => `<tr><td><span class="wire-dot" style="--c:${r}"></span><code>${e}</code></td><td>${t}</td><td>${n}</td></tr>`).join(``)}</tbody>
        </table>`;
    case `example`:
      return `
        <h2>${e(`How the code works`)}</h2>
        <ol class="steps">${t.example.map((e) => `<li>${e}</li>`).join(``)}</ol>`;
    case `specs`:
      return `
        <h2>${e(`Specifications`)}</h2>
        <dl class="spec-grid">${t.specs.map(([e, t]) => `<div><dt>${e}</dt><dd>${t}</dd></div>`).join(``)}</dl>`;
    default:
      return `
        <h2>${t.heading}</h2>
        <p class="lede">${t.lede}</p>
        <ul class="features">${t.features.map(([e, t]) => `<li><span class="feature-icon">${b(e)}</span><span>${t}</span></li>`).join(``)}</ul>`;
  }
}
var ye = class {
    constructor(e, { onExpand: t } = {}) {
      ((this.root = e),
        (this.onExpand = t),
        (this.tabs = [...e.querySelectorAll(`[role="tab"]`)]),
        (this.content = e.querySelector(`.info-content`)),
        (this.expandBtn = e.querySelector(`.expand`)),
        (this.tab = `overview`),
        (this.lesson = null),
        this.tabs.forEach((e, t) => {
          ((e.dataset.tab = S[t]),
            e.addEventListener(`click`, () => this.setTab(S[t])),
            e.addEventListener(`keydown`, (e) => {
              if (e.key !== `ArrowRight` && e.key !== `ArrowLeft`) return;
              let n =
                (t + (e.key === `ArrowRight` ? 1 : S.length - 1)) % S.length;
              (this.setTab(S[n]), this.tabs[n].focus());
            }));
        }),
        this.expandBtn.addEventListener(`click`, () => this.toggleExpanded()));
    }
    setLesson(e) {
      ((this.lesson = e), this.paint(!0));
    }
    setTab(e) {
      e !== this.tab && ((this.tab = e), this.paint(!1));
    }
    paint(e) {
      this.tabs.forEach((e) => {
        let t = e.dataset.tab === this.tab;
        (e.classList.toggle(`is-active`, t),
          e.setAttribute(`aria-selected`, String(t)),
          (e.tabIndex = t ? 0 : -1));
      });
      let t = this.content;
      (t.classList.remove(`is-in`),
        t.classList.add(`is-out`),
        clearTimeout(this.timer),
        (this.timer = setTimeout(
          () => {
            ((t.innerHTML = ve(this.lesson, this.tab)),
              (t.scrollTop = 0),
              t.classList.remove(`is-out`),
              t.offsetWidth,
              t.classList.add(`is-in`));
          },
          e ? 220 : 120,
        )));
    }
    get expanded() {
      return this.root.classList.contains(`is-expanded`);
    }
    toggleExpanded(t) {
      let n = t ?? !this.expanded;
      if (n === this.expanded) return;
      (this.root.classList.toggle(`is-expanded`, n),
        (this.expandBtn.innerHTML = b(n ? `collapse` : `expand`)),
        this.expandBtn.setAttribute(
          `aria-label`,
          e(n ? `Collapse panel` : `Expand panel`),
        ));
      let r = document.querySelector(`.code-card`);
      (r?.classList.toggle(`is-covered`, n),
        r && (r.inert = n),
        this.onExpand?.(n));
    }
    setCovered(e) {
      (this.root.classList.toggle(`is-covered`, e), (this.root.inert = e));
    }
  },
  be = new Set([
    `void`,
    `int`,
    `long`,
    `const`,
    `for`,
    `if`,
    `else`,
    `while`,
    `return`,
    `unsigned`,
    `bool`,
    `float`,
    `char`,
    `byte`,
    `sizeof`,
    `Servo`,
  ]),
  xe = new Set([
    `HIGH`,
    `LOW`,
    `INPUT`,
    `OUTPUT`,
    `INPUT_PULLUP`,
    `LED_BUILTIN`,
    `A0`,
    `true`,
    `false`,
  ]),
  Se = ``,
  Ce =
    /(\/\/.*$)|("(?:[^"\\]|\\.)*")|\u0001(\w+)\u0002|(\b\d+\b)|([A-Za-z_]\w*)(\s*\()?|([^\w"/\u0001]+|\/)/gm,
  we = /[\u0590-\u08ff]/,
  C = (e) =>
    e.replace(/&/g, `&amp;`).replace(/</g, `&lt;`).replace(/>/g, `&gt;`);
function Te(e, t) {
  let n = /^(\s*)(#\w+)(.*)$/.exec(e);
  if (n)
    return `${n[1]}<span class="kw">${n[2]}</span><span class="str">${C(n[3])}</span>`;
  let r = ``;
  Ce.lastIndex = 0;
  let i;
  for (; (i = Ce.exec(e));) {
    let [, e, n, a, o, s, c, l] = i;
    if (e) {
      let [, t, n] = /^(\/\/\s*)(.*)$/.exec(e);
      r += `<span class="cm">${t}${we.test(n) ? `<bdi dir="rtl">${C(n)}</bdi>` : C(n)}</span>`;
    } else if (n) r += `<span class="str">${C(n)}</span>`;
    else if (a)
      r += `<button type="button" class="param" data-param="${a}" title="Click to change">${C(String(t[a] ?? ``))}</button>`;
    else if (o) r += `<span class="num">${o}</span>`;
    else if (s) {
      let e = `id`;
      (be.has(s) || xe.has(s)
        ? (e = `kw`)
        : c && s !== `setup` && s !== `loop` && (e = `fn`),
        (r += `<span class="${e}">${s}</span>${c ? C(c) : ``}`));
    } else l && (r += C(l));
    i[0] === `` && Ce.lastIndex++;
  }
  return r;
}
function Ee(e, t = {}) {
  return e
    .replace(/\{\{(\w+)\}\}/g, `${Se}$1\u0002`)
    .split(
      `
`,
    )
    .map(
      (e, n) =>
        `<span class="line"><span class="ln">${n + 1}</span>${Te(e, t) || ` `}</span>`,
    )
    .join(``);
}
var w = 92,
  De = class {
    constructor(e, { onRun: t, onStop: n, onParam: r, onExpand: i }) {
      ((this.root = e),
        (this.code = e.querySelector(`code`)),
        (this.pre = e.querySelector(`pre`)),
        (this.copyBtn = e.querySelector(`.btn-copy`)),
        (this.expandBtn = e.querySelector(`.btn-expand`)),
        (this.runBtn = e.querySelector(`.btn-run`)),
        (this.consoleEl = e.querySelector(`.console`)),
        (this.lines = e.querySelector(`.console-lines`)),
        (this.status = e.querySelector(`.console-status`)),
        (this.state = `idle`),
        (this.onRun = t),
        (this.onStop = n),
        (this.onExpand = i),
        this.copyBtn.addEventListener(`click`, () => this.copy()),
        this.expandBtn.addEventListener(`click`, () => this.toggleExpanded()),
        this.runBtn.addEventListener(`click`, () => this.toggle()),
        e
          .querySelector(`.console-close`)
          .addEventListener(`click`, () => this.onStop()),
        (this.wrap = e.querySelector(`.code-wrap`)),
        (this.grip = e.querySelector(`.console-grip`)),
        this.resizable(),
        this.code.addEventListener(`click`, (e) => {
          let t = e.target.closest(`.param`);
          t && r?.(t.dataset.param);
        }));
    }
    setLesson(e, t) {
      ((this.lesson = e),
        (this.values = t),
        (this.marked = []),
        this.pre.classList.add(`is-out`),
        clearTimeout(this.swapTimer),
        (this.swapTimer = setTimeout(() => {
          (this.paint(),
            (this.pre.scrollTop = 0),
            this.pre.classList.remove(`is-out`));
        }, 180)),
        this.setState(`idle`));
    }
    paint() {
      let e = v(this.lesson, this.values);
      if (((this.code.innerHTML = Ee(e, this.values)), this.marked?.length))
        for (let e of this.code.querySelectorAll(`.param`))
          e.classList.toggle(
            `is-marked`,
            this.marked.includes(e.dataset.param),
          );
      return (this.markTrace(!1), e);
    }
    trace(e) {
      ((this.traced = e), this.markTrace(!0));
    }
    markTrace(e) {
      let t = [...this.code.querySelectorAll(`.line`)];
      for (let e of t) e.classList.remove(`is-running`);
      if (!this.traced) return;
      let { text: n, nth: r } = this.traced,
        i = t.filter((e) => e.textContent.replace(/^\d+/, ``).includes(n)),
        a = i[Math.min(r, i.length - 1)];
      a &&
        (a.classList.add(`is-running`),
        e && this.reveal(a, this.consoleCover()));
    }
    resizable() {
      let e = `console-height`,
        t = null;
      try {
        t = Number(localStorage.getItem(e)) || null;
      } catch {}
      ((this.consoleH = t ?? w), this.setConsoleHeight(this.consoleH, !1));
      let n = () => {
          try {
            localStorage.setItem(e, String(Math.round(this.consoleH)));
          } catch {}
        },
        r = this.consoleEl.querySelector(`.console-head`),
        i = null,
        a = (e) => {
          e.button !== 0 ||
            e.target.closest(`button`) ||
            document.documentElement.classList.contains(`compact`) ||
            (e.preventDefault(),
            (i = {
              y: e.clientY,
              h: this.consoleEl.offsetHeight,
              target: e.currentTarget,
              id: e.pointerId,
            }),
            i.target.setPointerCapture(e.pointerId),
            this.root.classList.add(`is-sizing`));
        },
        o = (e) => {
          i &&
            e.pointerId === i.id &&
            this.setConsoleHeight(i.h + (i.y - e.clientY));
        },
        s = (e) => {
          i &&
            e.pointerId === i.id &&
            ((i = null), this.root.classList.remove(`is-sizing`), n());
        };
      for (let e of [this.grip, r])
        (e.addEventListener(`pointerdown`, a),
          e.addEventListener(`pointermove`, o),
          e.addEventListener(`pointerup`, s),
          e.addEventListener(`pointercancel`, s));
      (this.grip.addEventListener(`dblclick`, () => {
        (this.setConsoleHeight(w), n());
      }),
        this.grip.addEventListener(`keydown`, (e) => {
          let t = { ArrowUp: 16, ArrowDown: -16, PageUp: 64, PageDown: -64 }[
            e.key
          ];
          t &&
            (e.preventDefault(),
            e.stopPropagation(),
            this.setConsoleHeight(this.consoleEl.offsetHeight + t),
            n());
        }),
        new ResizeObserver(() =>
          this.setConsoleHeight(this.consoleH, !1),
        ).observe(this.wrap));
    }
    setConsoleHeight(e, t = !0) {
      let n = this.wrap.clientHeight - 48;
      t && (this.consoleH = Math.max(w, Math.min(e, n)));
      let r = document.documentElement.classList.contains(`compact`)
        ? w
        : Math.round(Math.max(Math.min(w, n), Math.min(this.consoleH, n)));
      (this.root.style.setProperty(`--console-h`, `${r}px`),
        this.grip.setAttribute(`aria-valuemin`, String(w)),
        this.grip.setAttribute(
          `aria-valuemax`,
          String(Math.max(w, Math.round(n))),
        ),
        this.grip.setAttribute(`aria-valuenow`, String(r)),
        t && this.traced && this.markTrace(!0));
    }
    consoleCover() {
      return this.consoleEl.classList.contains(`is-open`)
        ? Math.max(
            0,
            this.pre.offsetTop +
              this.pre.offsetHeight -
              this.consoleEl.offsetTop,
          )
        : 0;
    }
    update(e, t) {
      if (!this.lesson || this.pre.classList.contains(`is-out`)) return;
      this.values = e;
      let n = [...this.code.querySelectorAll(`.line`)].map((e) =>
        e.textContent.replace(/^\d+/, ``),
      );
      this.paint();
      let r = [...this.code.querySelectorAll(`.line`)],
        i = new Set(n),
        a = null;
      for (let e of r)
        i.has(e.textContent.replace(/^\d+/, ``)) ||
          (e.classList.add(`is-new`), (a ??= e));
      let o = [...this.code.querySelectorAll(`.param`)].filter((e) =>
        [t].flat().includes(e.dataset.param),
      );
      for (let e of o) e.classList.add(`is-flash`);
      this.reveal(o[0] ?? a);
    }
    mark(e) {
      for (let t of this.code.querySelectorAll(`.param`))
        t.classList.toggle(`is-marked`, e.includes(t.dataset.param));
      this.marked = e;
      let t = e.find((e) =>
        this.code.querySelector(`.param[data-param="${e}"]`),
      );
      t && this.reveal(this.code.querySelector(`.param[data-param="${t}"]`));
    }
    reveal(e, t = 0) {
      if (!e) return;
      let n = e.closest(`.line`) ?? e,
        r = n.offsetTop,
        { scrollTop: i } = this.pre,
        a = this.pre.clientHeight - t;
      r < i + 8
        ? this.pre.scrollTo({ top: Math.max(0, r - 30), behavior: `smooth` })
        : r + n.offsetHeight > i + a - 8 &&
          this.pre.scrollTo({
            top: r + n.offsetHeight - a + 30,
            behavior: `smooth`,
          });
    }
    toggle() {
      this.state === `idle` ? this.onRun() : this.onStop();
    }
    get expanded() {
      return this.root.classList.contains(`is-expanded`);
    }
    toggleExpanded(t) {
      let n = t ?? !this.expanded;
      n !== this.expanded &&
        (this.root.classList.toggle(`is-expanded`, n),
        (this.expandBtn.innerHTML = b(n ? `collapse` : `expand`)),
        this.expandBtn.setAttribute(
          `aria-label`,
          e(n ? `Collapse code` : `Expand code`),
        ),
        (this.expandBtn.title = e(n ? `Collapse code` : `Expand code`)),
        this.expandBtn.setAttribute(`aria-expanded`, String(n)),
        this.onExpand?.(n));
    }
    setState(t) {
      ((this.state = t), (this.root.dataset.state = t));
      let n = t !== `idle`;
      ((this.runBtn.innerHTML = b(n ? `stop` : `play`)),
        this.runBtn.setAttribute(
          `aria-label`,
          e(n ? `Stop sketch` : `Run sketch`),
        ),
        this.runBtn.classList.toggle(`is-busy`, t === `uploading`),
        this.consoleEl.classList.toggle(`is-open`, n),
        (this.grip.tabIndex = n ? 0 : -1),
        (this.status.textContent = e(
          t === `uploading`
            ? `Uploading`
            : t === `running`
              ? `Running`
              : `Stopped`,
        )),
        t === `uploading` && (this.lines.innerHTML = ``));
    }
    log(e) {
      let t = document.createElement(`div`);
      for (
        t.textContent = e, this.lines.append(t);
        this.lines.children.length > 40;
      )
        this.lines.firstChild.remove();
      this.lines.scrollTop = this.lines.scrollHeight;
    }
    async copy() {
      let e = this.lesson
        ? te(this.lesson, this.values ?? {}).replace(
            /[\u200e\u200f\u2060]/g,
            ``,
          )
        : ``;
      try {
        await navigator.clipboard.writeText(e);
      } catch {
        let t = document.createElement(`textarea`);
        ((t.value = e),
          document.body.append(t),
          t.select(),
          document.execCommand(`copy`),
          t.remove());
      }
      ((this.copyBtn.innerHTML = b(`check`)),
        this.copyBtn.classList.add(`is-done`),
        clearTimeout(this.copyTimer),
        (this.copyTimer = setTimeout(() => {
          ((this.copyBtn.innerHTML = b(`copy`)),
            this.copyBtn.classList.remove(`is-done`));
        }, 1600)));
    }
  },
  Oe = {
    board: 124,
    led: 72,
    button: 84,
    pot: 78,
    rgb: 72,
    lamp: 84,
    sensor: 96,
    buzzer: 74,
    motor: 104,
    servo: 96,
    gears: 92,
    dryer: 96,
    wheel: 96,
    plant: 76,
    piano: 96,
  },
  ke = {
    board: 316,
    blink: 249,
    button: 268,
    knob: 254,
    rgb: 248,
    light: 252,
    sensor: 282,
    sound: 262,
    piano: 250,
    motor: 300,
    heat: 268,
    servo: 280,
    stepper: 290,
    plant: 268,
    project: 286,
  },
  Ae = (e) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${e}" /></svg>`,
  je = class {
    constructor(t, n, { onSelect: r }) {
      ((this.list = t),
        (this.section = t.closest(`.lessons`)),
        (this.lessons = n),
        (this.done = new Set(this.load())),
        (t.innerHTML = n
          .map(
            (t, n) => `
        <li class="lesson" role="button" tabindex="0" data-id="${t.id}" style="--w: ${ke[t.id] ?? 260}; --tw: ${Oe[t.thumb] ?? 96}" aria-label="${e(`Lesson {n}: {title}`, { n: n + 1, title: t.title })}">
          <img class="lesson-thumb" data-thumb="${t.thumb}" alt="" />
          <span class="lesson-title">${t.cardTitle}</span>
          <span class="lesson-done" aria-hidden="true">${b(`check`)}</span>
          <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5.5 6.5 6.5L9 18.5" /></svg>
        </li>`,
          )
          .join(``)),
        (this.items = [...t.children]));
      for (let e of this.items) {
        let t = () => {
          this.dragged || r(e.dataset.id);
        };
        (e.addEventListener(`click`, t),
          e.addEventListener(`keydown`, (e) => {
            (e.key === `Enter` || e.key === ` `) && (e.preventDefault(), t());
          }));
      }
      (this.paintDone(), this.setupScroll());
    }
    get rtl() {
      return getComputedStyle(this.list).direction === `rtl`;
    }
    get pos() {
      let e = this.list;
      return this.rtl
        ? e.scrollWidth - e.clientWidth + e.scrollLeft
        : e.scrollLeft;
    }
    scrollToPos(e, t) {
      let n = this.list;
      n.scrollTo({
        left: this.rtl ? e - (n.scrollWidth - n.clientWidth) : e,
        behavior: t,
      });
    }
    setupScroll() {
      let t = this.list,
        n = this.section,
        r = document.createElement(`button`);
      ((r.className = `lesson-step prev`),
        r.setAttribute(
          `aria-label`,
          this.rtl ? e(`More lessons`) : e(`Earlier lessons`),
        ),
        (r.innerHTML = Ae(`m15 5.5-6.5 6.5 6.5 6.5`)));
      let i = document.createElement(`button`);
      ((i.className = `lesson-step next`),
        i.setAttribute(
          `aria-label`,
          this.rtl ? e(`Earlier lessons`) : e(`More lessons`),
        ),
        (i.innerHTML = Ae(`m9 5.5 6.5 6.5L9 18.5`)),
        n.append(r, i));
      let a = (e) =>
        t.scrollBy({ left: e * t.clientWidth * 0.7, behavior: `smooth` });
      (r.addEventListener(`click`, () => a(-1)),
        i.addEventListener(`click`, () => a(1)));
      let o = () => {
        let e = t.scrollWidth - t.clientWidth,
          r = this.pos;
        (n.classList.toggle(`can-left`, r > 2),
          n.classList.toggle(`can-right`, r < e - 2));
      };
      (t.addEventListener(`scroll`, o, { passive: !0 }),
        window.addEventListener(`resize`, o),
        requestAnimationFrame(o),
        (this.edges = o),
        t.addEventListener(
          `wheel`,
          (e) => {
            if (t.scrollWidth <= t.clientWidth) return;
            let n =
              Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            n &&
              (e.preventDefault(),
              (t.scrollLeft +=
                (this.rtl ? -1 : 1) * (e.deltaMode === 1 ? n * 16 : n)));
          },
          { passive: !1 },
        ));
      let s = null;
      (t.addEventListener(`pointerdown`, (e) => {
        e.pointerType === `mouse` &&
          e.button === 0 &&
          ((s = { x: e.clientX, left: t.scrollLeft, moved: !1 }),
          (this.dragged = !1));
      }),
        window.addEventListener(`pointermove`, (e) => {
          if (!s) return;
          let n = t.getBoundingClientRect().width / t.offsetWidth || 1,
            r = (e.clientX - s.x) / n;
          (!s.moved &&
            Math.abs(r) > 5 &&
            ((s.moved = !0), t.classList.add(`is-dragging`)),
            s.moved && (t.scrollLeft = s.left - r));
        }),
        window.addEventListener(`pointerup`, () => {
          s &&
            ((this.dragged = s.moved),
            (s = null),
            t.classList.remove(`is-dragging`),
            setTimeout(() => {
              this.dragged = !1;
            }, 0));
        }));
    }
    reveal(e, t = !0) {
      let n = this.list,
        r = n.scrollWidth - n.clientWidth,
        i = e.offsetLeft - n.offsetLeft + (this.rtl ? r : 0),
        a = i + e.offsetWidth,
        o = this.pos,
        s = null;
      (i - 40 < o
        ? (s = i - 40)
        : a + 40 > o + n.clientWidth && (s = a + 40 - n.clientWidth),
        s !== null &&
          this.scrollToPos(Math.max(0, Math.min(r, s)), t ? `smooth` : `auto`));
    }
    load() {
      try {
        return JSON.parse(localStorage.getItem(`learn-arduino:done`) ?? `[]`);
      } catch {
        return [];
      }
    }
    setActive(e) {
      for (let t of this.items) {
        let n = t.dataset.id === e;
        (t.classList.toggle(`is-active`, n),
          t.setAttribute(`aria-current`, n ? `step` : `false`),
          n && requestAnimationFrame(() => this.reveal(t, this.revealed)));
      }
      this.revealed = !0;
    }
    complete(e) {
      if (this.done.has(e)) return !1;
      this.done.add(e);
      try {
        localStorage.setItem(
          `learn-arduino:done`,
          JSON.stringify([...this.done]),
        );
      } catch {}
      return (this.paintDone(e), !0);
    }
    paintDone(e) {
      for (let t of this.items)
        (t.classList.toggle(`is-done`, this.done.has(t.dataset.id)),
          t.dataset.id === e &&
            (t.classList.remove(`just-done`),
            t.offsetWidth,
            t.classList.add(`just-done`)));
    }
  };
function Me(e) {
  try {
    let t = new Intl.DisplayNames([n], { type: `language` }).of(e);
    return t ? t[0].toLocaleUpperCase(n) + t.slice(1) : ``;
  } catch {
    return ``;
  }
}
var Ne = class {
    constructor(e, t, n) {
      ((this.root = e), (this.flyout = t), (this.api = n), (this.open = null));
      let { languages: r, current: i } = n.language(),
        a = e.querySelector(`[data-nav="language"]`);
      if (a) {
        let e = r.find((e) => e.code === i);
        ((a.querySelector(`.side-label`).textContent =
          e?.short ?? e?.name ?? ``),
          (a.querySelector(`.side-code`).textContent = i.toUpperCase()));
      }
      ((this.toggleBtn = e.querySelector(`.side-toggle`)),
        this.toggleBtn.addEventListener(`click`, () =>
          this.setExpanded(!e.classList.contains(`is-open`)),
        ));
      for (let t of e.querySelectorAll(`[data-nav]`))
        t.addEventListener(`click`, (e) => {
          (e.preventDefault(), this.act(t.dataset.nav, t));
        });
      document.addEventListener(`pointerdown`, (e) => {
        this.open &&
          (e.target.closest(`.flyout`) ||
            e.target.closest(`[data-nav]`) ||
            this.close());
      });
    }
    setExpanded(t) {
      (this.root.classList.toggle(`is-open`, t),
        this.toggleBtn.setAttribute(`aria-expanded`, String(t)),
        this.toggleBtn.setAttribute(
          `aria-label`,
          e(t ? `Collapse sidebar` : `Expand sidebar`),
        ),
        this.flyout.classList.toggle(`beside-open`, t));
    }
    act(e, t) {
      e === `home`
        ? (this.close(), this.api.home())
        : e === `run`
          ? (this.close(), this.api.toggleRun())
          : this.open === e
            ? this.close()
            : this.show(e, t);
    }
    setActive(e, t) {
      this.root
        .querySelector(`[data-nav="${e}"]`)
        ?.parentElement.classList.toggle(`is-on`, t);
    }
    close() {
      this.open &&
        (this.setActive(this.open, !1),
        (this.open = null),
        this.flyout.classList.remove(`is-open`));
    }
    refresh() {
      this.open && this.show(this.open, null, !0);
    }
    show(e, t, n = !1) {
      (this.open && this.open !== e && this.setActive(this.open, !1),
        (this.open = e),
        this.setActive(e, !0));
      let r = this.flyout;
      ((r.dataset.kind = e),
        (r.innerHTML = this[`render_${e}`]()),
        t &&
          r.style.setProperty(
            `--top`,
            `${Math.max(40, Math.min(t.parentElement.offsetTop - 6, this.root.offsetHeight - r.offsetHeight - 16))}px`,
          ),
        this.bind(e),
        n || (r.classList.remove(`is-open`), r.offsetWidth),
        r.classList.add(`is-open`));
    }
    render_lessons() {
      let { lessons: t, current: n, done: r } = this.api.state();
      return `
      <header><h2>${e(`Lessons`)}</h2><span>${e(`{done}/{total} done`, { done: r.size, total: t.length })}</span></header>
      <ol class="fly-list">${t
        .map(
          (e, t) => `
        <li><button data-lesson="${e.id}" class="${e.id === n ? `is-current` : ``}">
          <span class="fly-num">${r.has(e.id) ? b(`check`) : t + 1}</span>
          <span class="fly-text"><b>${e.title}</b><small>${e.heading}</small></span>
        </button></li>`,
        )
        .join(``)}</ol>`;
    }
    render_parts() {
      let t = this.api.parts();
      return `
      <header><h2>${e(`Components`)}</h2><span>${e(`{n} in view`, { n: t.length })}</span></header>
      <ul class="fly-list">${t
        .map(
          (e, t) => `
        <li><button data-part="${t}">
          <span class="fly-num">${b(`focus`)}</span>
          <span class="fly-text"><b>${e.name}</b><small>${e.desc ?? ``}</small></span>
        </button></li>`,
        )
        .join(``)}</ul>`;
    }
    render_settings() {
      let t = this.api.settings(),
        n = (e, n, r) => `
      <li><label class="switch">
        <span class="fly-text"><b>${n}</b><small>${r}</small></span>
        <input type="checkbox" data-setting="${e}" ${t[e] ? `checked` : ``} />
        <span class="switch-track"><span></span></span>
      </label></li>`,
        { languages: r, current: i } = this.api.language();
      return `
      <header><h2>${e(`Settings`)}</h2></header>
      <ul class="fly-list">
        <li class="fly-lang"><label>
          <span class="fly-text"><b>${e(`Language`)}</b><small>${e(`Lessons, labels and code comments`)}</small></span>
          <select data-language aria-label="${e(`Language`)}">${r.map((e) => `<option value="${e.code}"${e.code === i ? ` selected` : ``}>${e.name}</option>`).join(``)}</select>
        </label></li>
        ${n(`labels`, e(`Callout labels`), e(`Cards and pointers around the 3D view`))}
        ${n(`flow`, e(`Current flow`), e(`Moving dots and HIGH / LOW on the wires while a sketch runs`))}
        ${n(`grid`, e(`Floor grid`), e(`The faint grid under the board`))}
        ${n(`autoRotate`, e(`Turntable`), e(`Turn a quarter every few seconds when idle`))}
        ${n(`sound`, e(`Sound`), e(`Let the buzzer play out loud`))}
        ${n(`reducedMotion`, e(`Reduce motion`), e(`Near-instant transitions`))}
      </ul>
      <button class="fly-reset" data-reset>${e(`Reset progress`)}</button>`;
    }
    render_language() {
      let { languages: t, current: n } = this.api.language();
      return `
      <header><h2>${e(`Language`)}</h2></header>
      <ul class="fly-list">${t
        .map((e) => {
          let t = Me(e.tag ?? e.code);
          return `
        <li><button data-lang="${e.code}" class="${e.code === n ? `is-current` : ``}"${e.code === n ? ` aria-current="true"` : ``}>
          <span class="fly-num">${e.code === n ? b(`check`) : e.code.toUpperCase()}</span>
          <span class="fly-text"><b lang="${e.tag ?? e.code}">${e.name}</b>${t && t !== e.name ? `<small>${t}</small>` : ``}</span>
        </button></li>`;
        })
        .join(``)}</ul>`;
    }
    bind(e) {
      let t = this.flyout;
      if (
        (e === `lessons` &&
          t.querySelectorAll(`[data-lesson]`).forEach((e) =>
            e.addEventListener(`click`, () => {
              (this.close(), this.api.selectLesson(e.dataset.lesson));
            }),
          ),
        e === `parts`)
      ) {
        let e = this.api.parts();
        t.querySelectorAll(`[data-part]`).forEach((t) =>
          t.addEventListener(`click`, () =>
            this.api.focusPart(e[Number(t.dataset.part)]),
          ),
        );
      }
      (e === `settings` &&
        (t
          .querySelectorAll(`[data-setting]`)
          .forEach((e) =>
            e.addEventListener(`change`, () =>
              this.api.setSetting(e.dataset.setting, e.checked),
            ),
          ),
        t
          .querySelector(`[data-language]`)
          .addEventListener(`change`, (e) =>
            this.api.setLanguage(e.target.value),
          ),
        t.querySelector(`[data-reset]`).addEventListener(`click`, () => {
          (this.api.resetProgress(), this.refresh());
        })),
        e === `language` &&
          t.querySelectorAll(`[data-lang]`).forEach((e) =>
            e.addEventListener(`click`, () => {
              (this.close(), this.api.setLanguage(e.dataset.lang));
            }),
          ));
    }
  },
  Pe = class {
    constructor(e, { onTurn: t, onZoom: n, onReset: r, onToggle: i }) {
      ((this.root = e),
        (this.needle = e.querySelector(`.compass-needle`)),
        (this.resetBtn = e.querySelector(`[data-view="reset"]`)),
        e
          .querySelector(`[data-view="left"]`)
          .addEventListener(`click`, () => t(-1)),
        e
          .querySelector(`[data-view="right"]`)
          .addEventListener(`click`, () => t(1)),
        e
          .querySelector(`[data-view="out"]`)
          .addEventListener(`click`, () => n(1 / 1.35)),
        e
          .querySelector(`[data-view="in"]`)
          .addEventListener(`click`, () => n(1.35)),
        this.resetBtn.addEventListener(`click`, () => r()),
        (this.toggles = {}));
      for (let t of e.querySelectorAll(`button.toggle`))
        ((this.toggles[t.dataset.view] = t),
          t.addEventListener(`click`, () =>
            i?.(t.dataset.view, t.getAttribute(`aria-pressed`) !== `true`),
          ));
      this.hint = e.querySelector(`.view-hint`);
    }
    startHint() {
      this.hintTimer ||
        this.hint?.classList.contains(`is-gone`) ||
        (this.hintTimer = setTimeout(() => this.dismissHint(), 9e3));
    }
    dismissHint() {
      (clearTimeout(this.hintTimer), this.hint?.classList.add(`is-gone`));
    }
    setToggle(e, t) {
      let n = this.toggles[e];
      n &&
        (n.setAttribute(`aria-pressed`, String(t)),
        n.classList.toggle(`is-on`, t));
    }
    update(e, t) {
      ((this.needle.style.transform = `rotate(${-e}deg)`),
        this.root.classList.toggle(`is-away`, !t));
    }
  },
  Fe = {
    board: [`#4a5d99`, `#26324d`],
    breadboard: [`#efe7d6`, `#b9a993`],
    car: [`#e3604b`, `#8c3426`],
    sensor: [`#3a56a0`, `#22325e`],
    motor: [`#cfc9bf`, `#7c766d`],
    lights: [`#2c3242`, `#141a2c`],
  },
  Ie = [`#8e8a84`, `#4f535b`],
  Le = 176,
  Re = 118,
  ze = class {
    constructor(e, { onMove: t }) {
      ((this.root = e),
        (this.onMove = t),
        (this.canvas = e.querySelector(`canvas`)),
        (this.ctx = this.canvas.getContext(`2d`)),
        (this.frame = null),
        (this.visible = !1),
        (this.ratio = 0));
      let n = (e) => {
          if (!this.frame) return null;
          let t = this.canvas.getBoundingClientRect(),
            n = ((e.clientX - t.left) / t.width) * Le,
            r = ((e.clientY - t.top) / t.height) * Re,
            { c: i, right: a, away: o, s, ox: c, oy: l } = this.frame,
            u = (n - c) / s,
            d = (r - l) / s;
          return { x: i.x + a.x * u - o.x * d, z: i.z + a.z * u - o.z * d };
        },
        r = !1;
      (e.addEventListener(`pointerdown`, (t) => {
        (t.preventDefault(), (r = !0), e.setPointerCapture(t.pointerId));
        let i = n(t);
        i && this.onMove(i, !1);
      }),
        e.addEventListener(`pointermove`, (e) => {
          if (!r) return;
          let t = n(e);
          t && this.onMove(t, !0);
        }));
      let i = () => {
        r = !1;
      };
      (e.addEventListener(`pointerup`, i),
        e.addEventListener(`pointercancel`, i));
    }
    setVisible(e) {
      e !== this.visible &&
        ((this.visible = e), this.root.classList.toggle(`is-on`, e));
    }
    resize(e) {
      let t = Math.min(3, Math.max(1, e));
      t !== this.ratio &&
        ((this.ratio = t),
        (this.canvas.width = Math.round(Le * t)),
        (this.canvas.height = Math.round(Re * t)));
    }
    draw(e) {
      if (!this.visible) return;
      let t = this.ctx,
        n = e.controls,
        { right: r, away: i } = n.axes(),
        a = e.footprints(),
        o = `${e.lessonId}|${n.view.azimuth.toFixed(3)}|${a.length}`;
      if (!this.frame || this.fitKey !== o || e.tweens.active) {
        this.fitKey = o;
        let e = 1 / 0,
          t = -1 / 0,
          n = 1 / 0,
          s = -1 / 0,
          c = 0,
          l = 0;
        for (let e of a) ((c += (e.x0 + e.x1) / 2), (l += (e.z0 + e.z1) / 2));
        let u = { x: c / a.length, z: l / a.length },
          d = (e, t) => [
            (e - u.x) * r.x + (t - u.z) * r.z,
            -((e - u.x) * i.x + (t - u.z) * i.z),
          ];
        for (let r of a)
          for (let [i, a] of [
            [r.x0, r.z0],
            [r.x1, r.z0],
            [r.x1, r.z1],
            [r.x0, r.z1],
          ]) {
            let [r, o] = d(i, a);
            ((e = Math.min(e, r)),
              (t = Math.max(t, r)),
              (n = Math.min(n, o)),
              (s = Math.max(s, o)));
          }
        let f = Math.min(152 / (t - e + 44), 94 / (s - n + 44));
        this.frame = {
          c: u,
          right: r,
          away: i,
          s: f,
          ox: Le / 2 - ((e + t) / 2) * f,
          oy: Re / 2 - ((n + s) / 2) * f,
        };
      }
      let { c: s, s: c, ox: l, oy: u } = this.frame,
        d = (e, t) => [
          (e - s.x) * r.x + (t - s.z) * r.z,
          -((e - s.x) * i.x + (t - s.z) * i.z),
        ],
        f = (e, t) => {
          let [n, r] = d(e, t);
          return [l + n * c, u + r * c];
        };
      (t.setTransform(this.ratio, 0, 0, this.ratio, 0, 0),
        t.clearRect(0, 0, Le, Re),
        (t.strokeStyle = `rgba(190, 168, 138, 0.35)`),
        (t.lineWidth = 0.75));
      let p = (e, n) => {
        (t.beginPath(), t.moveTo(...e), t.lineTo(...n), t.stroke());
      };
      for (let e = Math.floor((s.x - 260) / 20) * 20; e <= s.x + 260; e += 20)
        p(f(e, s.z - 260), f(e, s.z + 260));
      for (let e = Math.floor((s.z - 260) / 20) * 20; e <= s.z + 260; e += 20)
        p(f(s.x - 260, e), f(s.x + 260, e));
      for (let e of a) {
        let [n, r] = Fe[e.kind] ?? Ie,
          i = [
            [e.x0, e.z0],
            [e.x1, e.z0],
            [e.x1, e.z1],
            [e.x0, e.z1],
          ].map(([e, t]) => f(e, t));
        (t.beginPath(),
          i.forEach((e, n) => (n ? t.lineTo(...e) : t.moveTo(...e))),
          t.closePath(),
          (t.fillStyle = n),
          t.fill(),
          (t.strokeStyle = r),
          (t.lineWidth = 1.2),
          t.stroke());
      }
      let { w: m, h } = e.size,
        ee = [
          [0, 0],
          [m, 0],
          [m, h],
          [0, h],
        ].map(([e, t]) => {
          let r = n.groundAt(e, t);
          return f(r.x, r.z);
        });
      (t.beginPath(),
        ee.forEach((e, n) => (n ? t.lineTo(...e) : t.moveTo(...e))),
        t.closePath(),
        (t.fillStyle = `rgba(26, 163, 161, 0.12)`),
        t.fill(),
        (t.strokeStyle = `#1aa3a1`),
        (t.lineWidth = 1.6),
        t.stroke());
      let g = n.view.target,
        [_, te] = f(g.x, g.z);
      ((t.fillStyle = `#1aa3a1`),
        t.beginPath(),
        t.arc(_, te, 2.4, 0, Math.PI * 2),
        t.fill());
      let [v, ne] = f(s.x, s.z - 1),
        [re, ie] = f(s.x, s.z),
        ae = Math.atan2(ne - ie, v - re);
      (t.save(),
        t.translate(161, 15),
        t.rotate(ae + Math.PI / 2),
        (t.fillStyle = `#e0523f`),
        t.beginPath(),
        t.moveTo(0, -7),
        t.lineTo(4, 3),
        t.lineTo(-4, 3),
        t.closePath(),
        t.fill(),
        t.restore());
    }
  },
  Be = `http://www.w3.org/2000/svg`,
  Ve = 16,
  He = {
    slide: () => e(`or drag it in the scene`),
    knob: () => e(`or drag around the knob`),
    press: () => e(`Hold it down in the scene`),
    squeeze: () => e(`Press it in the scene, then drag down to push harder`),
    tap: () => e(`or click a weight in the scene`),
  };
function Ue(e, t) {
  return e.unit
    ? e.unit === `%` || e.unit === `°`
      ? `${t}${e.unit}`
      : `${t} ${e.unit}`
    : String(t);
}
var We = class {
    constructor(e, { svg: t, onParam: n, onFocus: r, onClose: i, onRun: a }) {
      ((this.root = e),
        (this.onParam = n),
        (this.onRun = a),
        (this.onFocus = r),
        (this.onClose = i),
        (this.side = 1),
        (this.top = 112),
        (this.dock = `corner`),
        (this.controls = new Map()),
        (this.leader = document.createElementNS(Be, `g`)),
        this.leader.setAttribute(`class`, `insp-leader`),
        (this.path = document.createElementNS(Be, `path`)),
        (this.end = document.createElementNS(Be, `circle`)),
        this.end.setAttribute(`r`, `4.6`),
        this.end.setAttribute(`class`, `dot-end`),
        this.leader.append(this.path, this.end),
        t.append(this.leader),
        e.addEventListener(`keydown`, (e) => {
          e.key === `Escape` && (e.stopPropagation(), this.onClose?.());
        }));
    }
    get isOpen() {
      return this.root.classList.contains(`is-on`);
    }
    open(t, n, r) {
      let i =
        this.isOpen &&
        this.sel &&
        (this.sel.id ?? this.sel.info) === (t.id ?? t.info);
      ((this.sel = t), (this.params = n));
      let a = this.root,
        o = a.contains(document.activeElement) ? document.activeElement : null,
        s = o?.closest(`.insp-row`)?.dataset.key,
        c = o ? [...(o.parentElement?.children ?? [])].indexOf(o) : -1,
        l = t.info ?? {},
        u = He[t.interact]?.();
      a.innerHTML = `
      <header class="insp-head">
        <h3>${l.name ?? e(`Part`)}</h3>
        <button class="insp-close" type="button" aria-label="${e(`Close`)}">${b(`close`)}</button>
      </header>
      ${l.desc ? `<p class="insp-desc">${l.desc}</p>` : ``}
      <div class="insp-rows"></div>
      <footer class="insp-foot">
        <button class="insp-focus" type="button">${b(`focus`)}<span>${e(`Zoom to it`)}</span></button>
        ${u ? `<span class="insp-hint">${u}</span>` : ``}
        ${t.live ? `<button class="insp-run" type="button">${b(`play`)}<span>${e(`Run to see it`)}</span></button>` : ``}
      </footer>`;
      let d = a.querySelector(`.insp-rows`);
      this.controls.clear();
      for (let e of n) d.append(this.row(e, r[e.key]));
      if (
        ((d.hidden = !n.length),
        a
          .querySelector(`.insp-close`)
          .addEventListener(`click`, () => this.onClose?.()),
        a
          .querySelector(`.insp-focus`)
          .addEventListener(`click`, () => this.onFocus?.()),
        a
          .querySelector(`.insp-run`)
          ?.addEventListener(`click`, () => this.onRun?.()),
        (this.size = null),
        (this.placed = !1),
        i || (a.classList.remove(`is-on`), a.offsetWidth),
        a.classList.add(`is-on`),
        this.leader.classList.add(`is-on`),
        s)
      ) {
        let e = a.querySelector(`.insp-row[data-key="${s}"]`);
        (
          e?.querySelector(`[role="radiogroup"]`)?.children[c] ??
          e?.querySelector(`input, button`)
        )?.focus({ preventScroll: !0 });
      }
    }
    setRunning(e) {
      (this.root.classList.toggle(`is-running`, e), (this.size = null));
    }
    close() {
      ((this.sel = null),
        this.root.classList.remove(`is-on`),
        this.leader.classList.remove(`is-on`));
    }
    row(t, n) {
      let r = document.createElement(`div`);
      ((r.className = `insp-row is-${t.type}`), (r.dataset.key = t.key));
      let i = `insp-${t.key}`;
      if (t.type === `range`) {
        r.innerHTML = `
        <label for="${i}"><span>${t.label}</span><output></output></label>
        <input id="${i}" type="range" min="${t.min}" max="${t.max}" step="${t.step ?? 1}" />
        ${t.hint ? `<p class="insp-note">${t.hint}</p>` : ``}`;
        let e = r.querySelector(`input`),
          a = r.querySelector(`output`);
        (t.tint && e.style.setProperty(`--accent`, t.tint),
          e.addEventListener(`input`, () =>
            this.onParam?.(t.key, Number(e.value)),
          ));
        let o = (n) => {
          (document.activeElement !== e || Number(e.value) !== n) &&
            (e.value = n);
          let r = t.step ?? 1;
          ((a.textContent = Ue(t, +(Math.round(n / r) * r).toFixed(2))),
            e.style.setProperty(
              `--fill`,
              `${((n - t.min) / (t.max - t.min)) * 100}%`,
            ));
        };
        return (this.controls.set(t.key, o), o(n), r);
      }
      if (t.type === `toggle`) {
        r.innerHTML = `
        <label class="insp-switch"><input id="${i}" type="checkbox" role="switch" /><span class="track"><span class="knob"></span></span><span>${t.label}</span></label>`;
        let e = r.querySelector(`input`);
        e.addEventListener(`change`, () => this.onParam?.(t.key, e.checked));
        let a = (t) => {
          e.checked = !!t;
        };
        return (this.controls.set(t.key, a), a(n), r);
      }
      let a = t.type === `swatch`;
      r.innerHTML = `
      <div class="insp-label"><span>${t.label}</span>${a ? `<output></output>` : ``}</div>
      <div class="${a ? `swatches` : `seg`}" role="radiogroup" aria-label="${t.label}"></div>
      <p class="insp-note"></p>`;
      let o = r.querySelector(`[role="radiogroup"]`),
        s = r.querySelector(`.insp-note`),
        c = r.querySelector(`output`),
        l = t.options.map((e) => {
          let n = document.createElement(`button`);
          return (
            (n.type = `button`),
            n.setAttribute(`role`, `radio`),
            a
              ? ((n.className = `swatch`),
                n.style.setProperty(`--c`, e.color),
                n.setAttribute(`aria-label`, e.label),
                (n.title = e.label))
              : (n.textContent = e.label),
            n.addEventListener(`click`, () => this.onParam?.(t.key, e.value)),
            o.append(n),
            n
          );
        });
      o.addEventListener(`keydown`, (e) => {
        let n = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }[
          e.key
        ];
        if (!n) return;
        e.preventDefault();
        let r = l.indexOf(document.activeElement),
          i = (Math.max(0, r) + n + l.length) % l.length;
        (l[i].focus(), this.onParam?.(t.key, t.options[i].value));
      });
      let u = (n) => {
        let r = t.options.find((e) => e.value === n);
        (l.forEach((e, r) => {
          let i = t.options[r].value === n;
          (e.classList.toggle(`is-on`, i),
            e.setAttribute(`aria-checked`, String(i)));
        }),
          c && (c.textContent = r?.label ?? (a ? e(`Custom`) : ``)),
          (s.textContent = r?.note ?? ``),
          (s.hidden = !r?.note));
      };
      return (this.controls.set(t.key, u), u(n), r);
    }
    sync(e) {
      if (this.isOpen) {
        for (let [t, n] of this.controls) n(e[t]);
        this.size = null;
      }
    }
    pulse(e) {
      let t = this.root.querySelector(`.insp-row[data-key="${e}"]`);
      t &&
        (t.classList.remove(`is-pulse`),
        t.offsetWidth,
        t.classList.add(`is-pulse`),
        t.querySelector(`input, button`)?.focus({ preventScroll: !0 }));
    }
    get footprint() {
      return this.isOpen && this.dock === `bottom`
        ? this.root.offsetHeight + 20
        : 0;
    }
    place(e, t, n) {
      if (!this.isOpen || !e) return;
      this.size ??= { w: this.root.offsetWidth, h: this.root.offsetHeight };
      let { w: r, h: i } = this.size,
        a = Math.min(Ve, t / 30);
      if (this.dock === `bottom`) {
        let a = (t - r) / 2,
          o = n - i - 10;
        this.root.style.transform = `translate(${Math.round(a)}px, ${Math.round(o)}px)`;
        let s = Math.min(a + r - 30, Math.max(a + 30, e[0])),
          c = e[1] < o - 8;
        (this.path.setAttribute(
          `d`,
          c
            ? `M${s} ${o} L${s} ${Math.max(e[1] + 4, o - 22)} L${e[0]} ${e[1]}`
            : ``,
        ),
          this.end.setAttribute(`cx`, e[0]),
          this.end.setAttribute(`cy`, e[1]),
          this.leader.classList.toggle(
            `is-away`,
            !c || e[0] < -40 || e[0] > t + 40 || e[1] < -40,
          ));
        return;
      }
      let o = Math.max(a, Math.min(this.top, n - i - 58)),
        s = (e) => (e < 0 ? a : t - r - a),
        c = (t) =>
          e[0] > s(t) - 24 && e[0] < s(t) + r + 24 && e[1] < o + i + 24;
      (this.lockSide
        ? (this.side = this.lockSide)
        : this.placed
          ? c(this.side) && !c(-this.side) && (this.side = -this.side)
          : (this.side = e[0] > t / 2 ? -1 : 1),
        (this.placed = !0));
      let l = s(this.side);
      this.root.style.transform = `translate(${Math.round(l)}px, ${Math.round(o)}px)`;
      let u = Math.min(l + r - 30, Math.max(l + 30, e[0])),
        d = o + i,
        f = Math.min(e[1] - 4, d + 26),
        p =
          e[1] > d + 8
            ? `M${u} ${d} L${u} ${f} L${e[0]} ${e[1]}`
            : `M${this.side < 0 ? l + r : l} ${o + i / 2} L${e[0]} ${e[1]}`;
      (this.path.setAttribute(`d`, p),
        this.end.setAttribute(`cx`, e[0]),
        this.end.setAttribute(`cy`, e[1]));
      let m = e[0] < -40 || e[1] < -40 || e[0] > t + 40 || e[1] > n + 40;
      this.leader.classList.toggle(`is-away`, m);
    }
  },
  Ge = class {
    constructor(e) {
      ((this.root = e),
        (this.fill = e?.querySelector(`.loader-fill`)),
        (this.label = e?.querySelector(`.loader-step`)),
        (this.value = 0),
        (this.closed = !e));
    }
    step(e, t) {
      this.closed ||
        (e && (this.label.textContent = e),
        t > this.value &&
          ((this.value = t), (this.fill.style.transform = `scaleX(${t})`)));
    }
    done() {
      return this.closed
        ? Promise.resolve()
        : ((this.closed = !0),
          this.step(e(`Ready`), 1),
          document.documentElement.classList.remove(`is-loading`),
          this.root.classList.add(`is-done`),
          new Promise((e) => {
            let t = () => {
                (this.root.remove(), e());
              },
              n =
                parseFloat(getComputedStyle(this.root).transitionDuration) *
                  1e3 || 0;
            setTimeout(t, n + 50);
          }));
    }
    fail(e) {
      this.root &&
        ((this.closed = !0),
        this.root.classList.add(`is-failed`),
        (this.label.textContent = e));
    }
  },
  Ke = [0.5, 0.42, 0.58, 0.34, 0.66, 0.27, 0.73, 0.2, 0.8],
  qe = class {
    constructor(e) {
      ((this.root = e), (this.items = new Map()));
    }
    update(e, t = []) {
      let n = e.flowOn ? e.signals : null;
      if (!n) {
        this.hide();
        return;
      }
      let { w: r, h: i } = e.size,
        a = t.filter((e) => !e.poly),
        o = new Set();
      for (let t of n) {
        if (!t.text) continue;
        o.add(t.id);
        let n = this.items.get(t.id);
        if (!n) {
          let e = document.createElement(`span`);
          ((e.className = `sig`),
            (e.innerHTML = `<i></i><b></b>`),
            this.root.append(e),
            (n = { el: e, text: null, kind: null, size: null, t: null }),
            this.items.set(t.id, n));
        }
        (n.text !== t.text &&
          ((n.el.lastChild.textContent = t.text),
          (n.text = t.text),
          (n.size = null)),
          n.kind !== t.kind &&
            ((n.el.className = `sig is-${t.kind}`), (n.kind = t.kind)),
          n.el.style.setProperty(`--c`, t.color ?? `#24304a`),
          (n.size ??= { w: n.el.offsetWidth, h: n.el.offsetHeight }));
        let { w: s, h: c } = n.size,
          l = n.t === null ? Ke : [n.t, ...Ke.filter((e) => e !== n.t)],
          u = null;
        for (let n of l) {
          let o = e.wirePoint(t.id, n);
          if (!o) break;
          let [l, d] = e.projectPoint(o),
            f = { x0: l - s / 2, y0: d - c / 2, x1: l + s / 2, y1: d + c / 2 };
          if (
            !(f.x0 < 4 || f.y0 < 4 || f.x1 > r - 4 || f.y1 > i - 4) &&
            !a.some(
              (e) =>
                f.x0 < e.x1 + 3 &&
                e.x0 < f.x1 + 3 &&
                f.y0 < e.y1 + 2 &&
                e.y0 < f.y1 + 2,
            )
          ) {
            u = { t: n, r: f };
            break;
          }
        }
        (n.el.classList.toggle(`is-on`, !!u),
          u &&
            ((n.t = u.t),
            a.push(u.r),
            (n.el.style.transform = `translate(${Math.round(u.r.x0)}px, ${Math.round(u.r.y0)}px)`)));
      }
      for (let [e, t] of this.items)
        o.has(e) || (t.el.remove(), this.items.delete(e));
    }
    hide() {
      if (this.items.size) {
        for (let e of this.items.values()) e.el.remove();
        this.items.clear();
      }
    }
  },
  T = (e, t) => ({ t: `R`, label: e, part: t }),
  E = (e, t, n) => ({ t: `LED`, color: e, part: t, label: n }),
  Je = (e) => ({ t: `BTN`, part: e }),
  Ye = (e) => ({ t: `BUZ`, part: e }),
  Xe = (e, t) => ({ t: `M`, label: e, part: t }),
  Ze = (e) => ({ t: `LDR`, part: e }),
  Qe = (e) => ({ t: `FSR`, part: e }),
  D = () => ({ t: `GND` }),
  O = (e = `5V`) => ({ t: `VCC`, label: e }),
  $e = (e, t = !1) => ({ t: `NODE`, ...e, follow: t }),
  et = (e, t) => ({ t: `Q`, part: e, ...t }),
  tt = (e) => ({ t: `POT`, part: e }),
  nt = (e, t) => ({ t: `BUS`, key: e, label: t }),
  k = {
    red: `#e8392e`,
    yellow: `#f2c23a`,
    green: `#3fbf6a`,
    blue: `#3d7be0`,
    white: `#f2efe6`,
  },
  rt = (e) => k[e.color] ?? k.red,
  it = (e) => (e.ohms >= 1e3 ? `${e.ohms / 1e3} kΩ` : `${e.ohms} Ω`),
  at = {
    board: {
      note: e(`The LED marked L, on the board itself`),
      pins: [`D13`],
      rows: { D13: [T(`1 kΩ`, null), E(`#f0a53a`, null, `L`), D()] },
    },
    blink: {
      pins: [`D13`],
      rows: { D13: [T(it, `resistor`), E(rt, `led`), D()] },
    },
    button: {
      pins: [`D2`, `D13`],
      rows: {
        D2: [
          $e(
            { up: [Je(`button`), O()], down: [T(`10 kΩ`, `pulldown`), D()] },
            !0,
          ),
        ],
        D13: [T(`220 Ω`, `resistor`), E(rt, `led`), D()],
      },
    },
    knob: {
      pins: [`A0`, `D9`],
      rows: {
        A0: [tt(`pot`)],
        D9: [T(`220 Ω`, `resistor`), E(rt, `led`), D()],
      },
    },
    rgb: {
      pins: [`D9`, `D10`, `D11`],
      rows: {
        D9: [T(`220 Ω`, `r-red`), E(k.red, `rgb`), nt(`k`, e(`common`))],
        D10: [T(`220 Ω`, `r-green`), E(k.green, `rgb`), nt(`k`)],
        D11: [T(`220 Ω`, `r-blue`), E(k.blue, `rgb`), nt(`k`)],
      },
    },
    light: {
      pins: [`A0`, `D9`],
      rows: {
        A0: [$e({ up: [Ze(`ldr`), O()], down: [T(`10 kΩ`, `pulldown`), D()] })],
        D9: [T(`220 Ω`, `resistor`), E(k.yellow, `led`), D()],
      },
    },
    sensor: {
      pins: [`5V`, `D9`, `D10`, `GND`],
      blocks: [
        {
          part: `sensor`,
          title: `HC-SR04`,
          pins: [
            [`VCC`, `5V`],
            [`TRIG`, `D9`],
            [`ECHO`, `D10`],
            [`GND`, `GND`],
          ],
        },
      ],
    },
    sound: { pins: [`D8`], rows: { D8: [Ye(`buzzer`), D()] } },
    piano: {
      note: e(`Pulled up inside the Uno: HIGH until a key is pressed`),
      pins: [`D2`, `D3`, `D4`, `D5`, `D6`, `D7`, `D8`, `D9`, `D10`],
      rows: {
        ...Object.fromEntries(
          [0, 1, 2, 3, 4, 5, 6, 7].map((t) => [
            `D${2 + t}`,
            [Je(`key${t}`), nt(`rail`, e(`GND rail`))],
          ]),
        ),
        D10: [Ye(`buzzer`), D()],
      },
    },
    motor: {
      pins: [`D6`],
      rows: {
        D6: [
          T(`1 kΩ`, `r1k`),
          et(`transistor`, { up: [Xe(`M`, `motor`), O()], down: [D()] }),
        ],
      },
    },
    heat: {
      pins: [`5V`, `A0`, `GND`, `D6`],
      blocks: [
        {
          part: `tmp36`,
          title: `TMP36`,
          pins: [
            [`+Vs`, `5V`],
            [`OUT`, `A0`],
            [`GND`, `GND`],
          ],
        },
      ],
      rows: {
        D6: [
          T(`1 kΩ`, `r1k`),
          et(`transistor`, { up: [Xe(e(`FAN`), `fan`), O()], down: [D()] }),
        ],
      },
    },
    servo: {
      pins: [`D9`, `5V`, `GND`],
      blocks: [
        {
          part: `servo`,
          title: e(`SERVO`),
          pins: [
            [`SIG`, `D9`],
            [`+`, `5V`],
            [`−`, `GND`],
          ],
        },
      ],
    },
    stepper: {
      pins: [`D2`, `D8`, `D9`, `D10`, `D11`, `5V`, `GND`],
      rows: {
        D2: [
          $e(
            { up: [Je(`button`), O()], down: [T(`10 kΩ`, `pulldown`), D()] },
            !0,
          ),
        ],
      },
      blocks: [
        {
          part: `driver`,
          title: `ULN2003`,
          pins: [
            [`IN1`, `D8`],
            [`IN2`, `D9`],
            [`IN3`, `D10`],
            [`IN4`, `D11`],
            [`+`, `5V`],
            [`−`, `GND`],
          ],
          motor: { part: `stepper`, label: e(`STEPPER`) },
        },
      ],
    },
    plant: {
      pins: [`5V`, `A0`, `GND`, `3V3`, `SCL`, `SDA`],
      blocks: [
        {
          part: `soil`,
          title: e(`SOIL SENSOR`),
          pins: [
            [`VCC`, `5V`],
            [`AOUT`, `A0`],
            [`GND`, `GND`],
          ],
        },
        {
          part: `oled`,
          title: `OLED`,
          pins: [
            [`VCC`, `3V3`],
            [`SCL`, `SCL`],
            [`SDA`, `SDA`],
            [`GND`, null],
          ],
        },
      ],
    },
    force: {
      pins: [`A0`, `D8`, `D9`, `5V`, `GND`],
      rows: {
        A0: [$e({ up: [Qe(`fsr`), O()], down: [T(it, `pulldown`), D()] })],
        D8: [Ye(`buzzer`), D()],
      },
      blocks: [
        {
          part: `meter`,
          title: e(`SERVO`),
          pins: [
            [`SIG`, `D9`],
            [`+`, `5V`],
            [`−`, `GND`],
          ],
        },
      ],
    },
    project: {
      pins: [`5V`, `D9`, `D10`, `GND`, `D4`, `D3`, `D2`],
      blocks: [
        {
          part: `sensor`,
          title: `HC-SR04`,
          pins: [
            [`VCC`, `5V`],
            [`TRIG`, `D9`],
            [`ECHO`, `D10`],
            [`GND`, `GND`],
          ],
        },
        {
          part: `lights`,
          title: e(`LIGHTS`),
          pins: [
            [`R`, `D4`],
            [`Y`, `D3`],
            [`G`, `D2`],
            [`GND`, null],
          ],
        },
      ],
    },
  },
  ot = new Set([`5V`, `3V3`, `VIN`]);
function A(e, t) {
  if (ot.has(e))
    return {
      kind: `power`,
      text: e === `3V3` ? `3.3 V` : `5 V`,
      flow: 0.45,
      into: !1,
    };
  if (/^GND/.test(e)) return { kind: `gnd`, text: `GND`, flow: 0, into: !0 };
  let n = t?.[e];
  if (!n) return null;
  let r = n.v;
  if (n.mode === `pullup`) {
    let e = r > 0.5;
    return {
      kind: e ? `high` : `low`,
      text: e ? `HIGH` : `LOW`,
      flow: e ? 0 : 0.25,
      into: !1,
    };
  }
  let i = n.mode === `in` || n.mode === `analog`,
    a;
  a =
    n.mode === `pwm`
      ? r <= 0
        ? `LOW`
        : r >= 1
          ? `HIGH`
          : `PWM ${Math.round(r * 100)}%`
      : n.mode === `out` || (n.mode === `in` && !n.text)
        ? r > 0.5
          ? `HIGH`
          : `LOW`
        : (n.text ?? (r > 0.5 ? `HIGH` : `LOW`));
  let o = i ? (n.mode === `analog` ? 0.12 + 0.2 * r : r * 0.3) : r;
  return {
    kind: n.mode === `analog` ? `analog` : r > 0.02 ? `high` : `low`,
    text: a,
    flow: o,
    into: i,
  };
}
function st(e, t = !0) {
  let n = 0;
  for (let t of Object.values(e ?? {}))
    t.mode !== `in` &&
      t.mode !== `analog` &&
      (n = Math.max(n, t.mode === `pullup` ? (t.v > 0.5 ? 0 : 0.25) : t.v));
  return Math.max(n, t ? 0.3 : 0);
}
var ct = { R: 52, LED: 40, BTN: 44, BUZ: 40, M: 36, LDR: 52, FSR: 52 },
  j = 18,
  lt = 10,
  ut = 86,
  dt = 152,
  ft = 104,
  pt = new Set([`D3`, `D5`, `D6`, `D9`, `D10`, `D11`]),
  mt = (e, t) => (typeof e == `function` ? e(t) : e),
  M = (e) =>
    String(e)
      .replace(/&/g, `&amp;`)
      .replace(/</g, `&lt;`)
      .replace(/"/g, `&quot;`),
  ht = (e) => (pt.has(e) ? `~${e}` : e);
function gt(e, t) {
  switch (e.t) {
    case `R`:
      return `<path d="M0 0H8L11 -6L17 6L23 -6L29 6L35 -6L41 6L44 0H52"/>`;
    case `LED`:
      return `<path d="M0 0H12M28 0H40M28 -9V9"/><path class="fillable" d="M12 -9L12 9L27 0Z" style="fill:${M(mt(e.color, t))}"/><path d="M19 -12l6 -6m0 0h-4m4 0v4M25 -9l6 -6m0 0h-4m4 0v4"/>`;
    case `BTN`:
      return `<path d="M0 0H12M32 0H44M10 -8H34M22 -8V-15M17 -15H27"/><circle class="solid" cx="12" cy="0" r="2.2"/><circle class="solid" cx="32" cy="0" r="2.2"/>`;
    case `BUZ`:
      return `<path d="M0 0H12M28 0H40M12 -9V9M28 -9V9"/><rect x="15" y="-7" width="10" height="14" rx="1"/><path d="M13 -14q7 -6 14 0"/>`;
    case `M`:
      return `<path d="M0 0H4M32 0H36"/><circle cx="18" cy="0" r="14"/>`;
    case `LDR`:
      return `<path d="M0 0H10M42 0H52"/><circle cx="26" cy="0" r="16"/><path d="M14 0L16 -4L19 4L22 -4L25 4L28 -4L31 4L34 -4L36 0"/><path d="M4 -24l7 7m0 0v-4m0 4h-4M12 -28l7 7m0 0v-4m0 4h-4"/>`;
    case `FSR`:
      return `<path d="M0 0H8L11 -6L17 6L23 -6L29 6L35 -6L41 6L44 0H52"/><path d="M26 -25V-11m0 0-4 -4.5m4 4.5 4 -4.5M19 -25H33"/>`;
    default:
      return ``;
  }
}
function _t(e, t) {
  let n = [],
    r = [],
    i = 0,
    a = 0,
    o = (e, t) => {
      ((i = Math.max(i, e)), (a = Math.max(a, t)));
    },
    s = (e, t, i, a, s) => {
      let c = `M${e} ${t}L${i} ${a}`;
      if ((o(Math.max(e, i), Math.max(t, a)), !s)) {
        n.push(`<path class="w" d="${c}"/>`);
        return;
      }
      let l = r.length;
      (r.push(s),
        n.push(
          `<path class="w" data-n="${l}" d="${c}"/><path class="flow" data-n="${l}" d="${s.rev ? `M${i} ${a}L${e} ${t}` : c}"/>`,
        ));
    },
    c = (e, t, r, i = ``, a = `middle`) => {
      (n.push(
        `<text class="${i}" x="${e}" y="${t}" text-anchor="${a}">${M(r)}</text>`,
      ),
        o(a === `start` ? e + r.length * 6.5 : e + r.length * 3.3, t + 4));
    },
    l = (e, t) => {
      (n.push(
        `<path class="w" d="M${e} ${t}V${t + 6}M${e - 9} ${t + 6}H${e + 9}M${e - 6} ${t + 10}H${e + 6}M${e - 3} ${t + 14}H${e + 3}"/>`,
      ),
        o(e + 9, t + 15));
    },
    u = (e, t, r) => {
      (n.push(
        `<path class="w" d="M${e} ${t}V${t - 10}M${e - 8} ${t - 10}H${e + 8}"/>`,
      ),
        c(e, t - 15, r, `net`));
    },
    d = (e, t) => n.push(`<circle class="solid" cx="${e}" cy="${t}" r="2.6"/>`),
    f = (e, r, i, a = 0) => {
      let s = ct[e.t],
        l = a
          ? `translate(${r} ${i}) rotate(${a * 90})`
          : `translate(${r} ${i})`,
        u = `<rect class="hit" x="-2" y="-16" width="${s + 4}" height="32"/>`;
      n.push(
        `<g class="sym" data-part="${M(e.part ?? ``)}"><g transform="${l}">${u}${gt(e, t)}</g>`,
      );
      let d = a ? r : r + s / 2,
        f = a ? i + (a * s) / 2 : i;
      (e.t === `M` &&
        n.push(
          `<text class="sym-t" x="${d}" y="${f + 4.5}" text-anchor="middle">M</text>`,
        ),
        n.push(`</g>`));
      let p =
        e.t === `M`
          ? e.label === `M`
            ? null
            : e.label
          : e.label
            ? mt(e.label, t)
            : null;
      (p &&
        (a
          ? c(r + 16, f + 4, p, `val`, `start`)
          : c(d, i - (e.t === `LED` ? 22 : 13), p, `val`)),
        o(a ? r + 16 : r + s, a ? Math.max(i, i + a * s) : i + 16));
    },
    p = (e, t, n, r, i) => {
      let a = n;
      for (let n of e ?? [])
        n.t === `VCC`
          ? u(t, a, n.label)
          : n.t === `GND`
            ? (s(t, a, t, a + 4, i), l(t, a + 4))
            : (s(t, a, t, a + r * j, { ...i, rev: r < 0 }),
              (a += r * j),
              f(n, t, a, r),
              (a += r * ct[n.t]));
    },
    m = (e) =>
      (e ?? []).reduce(
        (e, t) => e + (t.t === `GND` ? 20 : t.t === `VCC` ? 26 : j + ct[t.t]),
        0,
      ),
    h = e.pins.map((t) => ({ pin: t, chain: e.rows?.[t] ?? [], block: null }));
  for (let t of e.blocks ?? [])
    for (let [, e] of t.pins) {
      let n = h.find((t) => t.pin === e);
      n && (n.block = t);
    }
  for (let e of h) {
    ((e.up = 12), (e.down = 12));
    for (let t of e.chain)
      t.t === `NODE`
        ? ((e.up = Math.max(e.up, m(t.up) + 4)),
          (e.down = Math.max(e.down, m(t.down) + 4)))
        : t.t === `Q`
          ? ((e.up = Math.max(e.up, 16 + m(t.up))),
            (e.down = Math.max(e.down, 16 + m(t.down))))
          : t.t === `POT`
            ? ((e.up = Math.max(e.up, 52)), (e.down = Math.max(e.down, 46)))
            : t.t === `GND`
              ? (e.down = Math.max(e.down, 24))
              : t.t === `LED`
                ? (e.up = Math.max(e.up, t.label ? 28 : 20))
                : (t.t === `R` || t.t === `BTN`) && (e.up = Math.max(e.up, 18));
  }
  let ee = 0;
  h.forEach((e, t) => {
    if (t === 0) ee = 36 + e.up;
    else {
      let n = h[t - 1],
        r = n.block !== e.block && (n.block || e.block) ? 30 : 0;
      ee +=
        Math.max(e.block && n.block === e.block ? 26 : 40, n.down + e.up + 10) +
        r;
    }
    e.y = ee;
  });
  let g = (e) => ({
      role: e === `5V` ? `power` : /^GND/.test(e) ? `gnd` : `sig`,
      pin: e,
      pinDir: !0,
      rev: /^GND/.test(e),
    }),
    _ = new Map();
  for (let e of h) {
    let t = g(e.pin),
      r = dt;
    s(96, e.y, dt, e.y, t);
    for (let i of e.chain)
      if (ct[i.t])
        (s(r, e.y, r + j, e.y, t), (r += j), f(i, r, e.y), (r += ct[i.t]));
      else if (i.t === `GND`)
        (s(r, e.y, r + j, e.y, t),
          (r += j),
          s(r, e.y, r, e.y + 4, t),
          l(r, e.y + 4));
      else if (i.t === `NODE`) {
        (s(r, e.y, r + j, e.y, t), (r += j), d(r, e.y));
        let n = i.follow ? e.pin : null;
        (p(
          i.up,
          r,
          e.y,
          -1,
          i.follow
            ? { role: `sig`, pin: e.pin, pinDir: !1 }
            : { role: `power`, follow: n },
        ),
          p(
            i.down,
            r,
            e.y,
            1,
            i.follow
              ? { role: `sig`, pin: e.pin, pinDir: !1 }
              : { role: `gnd`, follow: n },
          ));
      } else
        i.t === `Q`
          ? (s(r, e.y, r + j, e.y, t),
            (r += j),
            n.push(
              `<g class="sym" data-part="${M(i.part)}"><g transform="translate(${r} ${e.y})"><rect class="hit" x="-2" y="-18" width="34" height="36"/><circle class="ring" cx="16" cy="0" r="16"/><path d="M0 0H10M10 -10V10M10 -5L24 -14V-16M10 5L24 14V16"/><path class="solid" d="M24 14l-7 -0.6 3.4 -5.2z"/></g></g>`,
            ),
            p(i.up, r + 24, e.y - 16, -1, { role: `power`, follow: e.pin }),
            p(i.down, r + 24, e.y + 16, 1, { role: `gnd`, follow: e.pin }),
            (r += 32))
          : i.t === `POT`
            ? (s(r, e.y, r + j, e.y, t),
              (r += j),
              n.push(
                `<g class="sym" data-part="${M(i.part)}"><g transform="translate(${r} ${e.y})"><rect class="hit" x="-2" y="-28" width="30" height="56"/><path d="M0 0H12M18 -26V-18L12 -15L24 -9L12 -3L24 3L12 9L24 15L18 18V26"/><path class="solid" d="M13 0l-6 -3.6v7.2z"/></g></g>`,
              ),
              c(r + 30, e.y + 4, `10 kΩ`, `val`, `start`),
              p([{ t: `VCC`, label: `5V` }], r + 18, e.y - 26, -1, {
                role: `power`,
              }),
              s(r + 18, e.y + 26, r + 18, e.y + 30, { role: `gnd` }),
              l(r + 18, e.y + 30),
              (r += 30))
            : i.t === `BUS` &&
              (_.has(i.key) || _.set(i.key, { rows: [], label: i.label }),
              _.get(i.key).rows.push({ r: e, x: r, net: t }));
    e.end = r;
  }
  for (let e of _.values()) {
    let t = Math.max(...e.rows.map((e) => e.x)) + j;
    for (let n of e.rows) s(n.x, n.r.y, t, n.r.y, n.net);
    let n = e.rows.map((e) => e.r.y).sort((e, t) => e - t),
      r = n[0],
      i = n[n.length - 1];
    for (let e = 0; e < n.length - 1; e++)
      (s(t, n[e], t, n[e + 1], { role: `gnd` }), d(t, n[e + 1]));
    (s(t, i, t, i + 10, { role: `gnd` }),
      l(t, i + 10),
      e.label && c(t + 6, r - 6, e.label, `note`, `start`));
  }
  for (let t of e.blocks ?? []) {
    let e = h.filter((e) => e.block === t),
      r = Math.max(216, ...e.map((e) => e.end + 40)),
      i = e[0]?.y ?? 40,
      a = t.pins.map(([e, t]) => {
        let n = h.find((e) => e.pin === t),
          r = n ? n.y : i + 26;
        return ((i = r), { label: e, pin: t, r: n, y: r });
      }),
      u = Math.min(...a.map((e) => e.y)) - 26,
      d = Math.max(...a.map((e) => e.y)) + 14;
    for (let e of a)
      e.r
        ? s(e.r.end, e.y, r, e.y, g(e.pin))
        : (s(r, e.y, r - 16, e.y, { role: `gnd`, rev: !0 }),
          s(r - 16, e.y, r - 16, e.y + 4, { role: `gnd` }),
          l(r - 16, e.y + 4));
    (n.push(
      `<g class="sym block" data-part="${M(t.part)}"><rect class="box" x="${r}" y="${u}" width="${ft}" height="${d - u}" rx="5"/>`,
    ),
      n.push(
        `<text class="block-t" x="${r + ft / 2}" y="${u + 15}" text-anchor="middle">${M(t.title)}</text>`,
      ));
    for (let e of a)
      n.push(
        `<text class="pin-t" x="${r + 7}" y="${e.y + 4}">${M(e.label)}</text>`,
      );
    if ((n.push(`</g>`), o(r + ft, d), t.motor)) {
      let e = (u + d) / 2,
        i = r + ft + 46;
      for (let t = -2; t <= 2; t++)
        s(r + ft, e + t * 6, i - 18 + Math.abs(t) * 1.6, e + t * 6);
      (n.push(
        `<g class="sym" data-part="${M(t.motor.part)}"><rect class="hit" x="${i - 22}" y="${e - 22}" width="44" height="44"/><circle class="box" cx="${i}" cy="${e}" r="19"/><text class="sym-t" x="${i}" y="${e + 5}" text-anchor="middle">M</text></g>`,
      ),
        c(i, e + 34, t.motor.label, `val`),
        o(i + 24, e + 36));
    }
  }
  let te = h[0].y - 30,
    v = Math.max(a - 6, h[h.length - 1].y + 20);
  n.unshift(
    `<g class="board"><rect class="box" x="${lt}" y="${te}" width="${ut}" height="${v - te}" rx="6"/><text class="block-t" x="53" y="${te + 15}" text-anchor="middle">ARDUINO</text>${h.map((e) => `<text class="pin-t" x="89" y="${e.y + 4}" text-anchor="end">${M(ht(e.pin))}</text><circle class="solid" cx="96" cy="${e.y}" r="2.2"/>`).join(``)}</g>`,
  );
  for (let e of h)
    n.push(
      `<text class="pinval" data-pin="${M(e.pin)}" x="101" y="${e.y - 6}"></text>`,
    );
  e.note && c(lt, v + 22, e.note, `note`, `start`);
  let ne = Math.ceil(i + 14),
    re = Math.ceil(Math.max(a, v) + (e.note ? 34 : 12));
  return {
    svg: `<svg class="sch" viewBox="0 0 ${ne} ${re}" preserveAspectRatio="xMidYMin meet" xmlns="http://www.w3.org/2000/svg">${n.join(``)}</svg>`,
    w: ne,
    h: re,
    nets: r,
  };
}
var vt = class {
  constructor(t, { onHover: n, onSelect: r, onClose: i } = {}) {
    ((this.root = t),
      (this.onHover = n),
      (this.onSelect = r),
      (t.innerHTML = `
      <header class="sch-head">
        <h3>${e(`Schematic`)}</h3>
        <span class="sch-lesson"></span>
        <button class="sch-close" type="button" aria-label="${e(`Close schematic`)}"><svg viewBox="0 0 24 24"><path d="m7 7 10 10M17 7 7 17"/></svg></button>
      </header>
      <div class="sch-body"></div>`),
      (this.body = t.querySelector(`.sch-body`)),
      (this.title = t.querySelector(`.sch-lesson`)),
      t.querySelector(`.sch-close`).addEventListener(`click`, () => i?.()),
      this.body.addEventListener(`pointerover`, (e) => {
        let t = e.target.closest(`.sym`)?.dataset.part || null;
        t !== this.hot && ((this.hot = t), this.onHover?.(t));
      }),
      this.body.addEventListener(`pointerleave`, () => {
        ((this.hot = null), this.onHover?.(null));
      }),
      this.body.addEventListener(`click`, (e) => {
        let t = e.target.closest(`.sym`)?.dataset.part;
        t && this.onSelect?.(t);
      }),
      (this.open = !1),
      (this.active = {}),
      (this.state = []));
  }
  get isOpen() {
    return this.open;
  }
  setOpen(e) {
    if (e === this.open) return;
    this.open = e;
    let t = this.root;
    (t.classList.toggle(`is-on`, e),
      t.classList.toggle(`is-closing`, !e),
      e ||
        (t.addEventListener(
          `animationend`,
          () => t.classList.remove(`is-closing`),
          { once: !0 },
        ),
        setTimeout(() => t.classList.remove(`is-closing`), 400)),
      e && this.render());
  }
  setLesson(e, t) {
    ((this.lesson = e), (this.values = t), this.open && this.render());
  }
  setValues(e) {
    ((this.values = e), this.open && this.render());
  }
  render() {
    if (!this.lesson) return;
    let e = at[this.lesson.id];
    ((this.title.textContent = this.lesson.title),
      e
        ? ((this.drawn = _t(e, this.values ?? {})),
          (this.body.innerHTML = this.drawn.svg),
          (this.wires = [...this.body.querySelectorAll(`.w[data-n]`)]),
          (this.flows = [...this.body.querySelectorAll(`.flow`)]),
          (this.pinvals = [...this.body.querySelectorAll(`.pinval`)]),
          (this.state = []),
          (this.active = {}))
        : ((this.body.innerHTML = `<p class="sch-none">No circuit in this lesson.</p>`),
          (this.drawn = null)));
  }
  size(e, t) {
    if (!this.drawn) return { w: e, h: 80 };
    let n = Math.min(
      1.5,
      (e - 24) / this.drawn.w,
      (t - 40 - 16) / this.drawn.h,
    );
    return { w: e, h: Math.round(54 + this.drawn.h * n) };
  }
  update(e) {
    if (!this.open || !this.drawn) return;
    let t = this.drawn.nets,
      n = e ? st(e) : 0;
    t.forEach((t, r) => {
      let i = ``,
        a = 0,
        o = !!t.rev;
      if (e) {
        if (t.role === `sig`) {
          let n = A(t.pin, e);
          ((i = n?.kind ?? `low`),
            (a = n?.flow ?? 0),
            t.pinDir && n?.into && (o = !o));
        } else
          t.role === `power`
            ? ((i = `power`),
              (a = t.follow ? (A(t.follow, e)?.flow ?? 0) : 0.4))
            : ((i = `gnd`), (a = t.follow ? (A(t.follow, e)?.flow ?? 0) : n));
      }
      let s = a > 0.02,
        c = `${i}|${s ? (Math.round(a * 10) / 10).toFixed(1) : 0}|${o}`;
      if (this.state[r] === c) return;
      this.state[r] = c;
      let l = this.wires[r],
        u = this.flows[r];
      (l.setAttribute(`class`, `w${i ? ` is-${i}` : ``}`),
        u.setAttribute(`class`, `flow${s ? ` is-on` : ``}`),
        (u.style.animationDuration = s
          ? `${(22 / (14 + 70 * a)).toFixed(2)}s`
          : ``),
        (u.style.animationDirection = o ? `reverse` : ``));
    });
    for (let t of this.pinvals) {
      let n = e ? A(t.dataset.pin, e) : null,
        r = n && !/^GND/.test(t.dataset.pin) ? n.text : ``;
      (t.textContent !== r && (t.textContent = r),
        t.setAttribute(`class`, `pinval${n ? ` is-${n.kind}` : ``}`));
    }
  }
  setActive(e, t) {
    if (
      this.open &&
      this.drawn &&
      (this.active.selected !== e || this.active.hot !== t)
    ) {
      this.active = { selected: e, hot: t };
      for (let n of this.body.querySelectorAll(`.sym`)) {
        let r = n.dataset.part;
        (n.classList.toggle(`is-sel`, !!r && r === e),
          n.classList.toggle(`is-hot`, !!r && r === t && r !== e));
      }
    }
  }
};
var Ct = c({}),
  wt = 1672,
  Tt = 941,
  Et = 0.8,
  Dt = 1280,
  Ot = 0.62,
  kt = { x: 10, y: 70 },
  At = 180 / Math.PI,
  F = (e) => document.querySelector(e);
r(document.body);
var I = F(`#app`),
  L = F(`#stage`),
  R = F(`#rig`),
  z = F(`#tip`),
  B = 1,
  V = !1,
  jt = !1,
  Mt = 0.85,
  Nt = g.find((e) => `#${e.id}` === location.hash),
  H = {
    lesson: Nt ?? g[0],
    running: `idle`,
    settings: Ft(),
    saved: Pt(`learn-arduino:values`, {}),
    values: {},
  };
H.values = qt(H.lesson);
function Pt(e, t) {
  try {
    return JSON.parse(localStorage.getItem(e) ?? `null`) ?? t;
  } catch {
    return t;
  }
}
function Ft() {
  let e = {
    labels: !0,
    grid: !0,
    autoRotate: !1,
    sound: !0,
    reducedMotion:
      window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches ?? !1,
    flow: !0,
    schematic: !1,
  };
  try {
    return {
      ...e,
      ...JSON.parse(localStorage.getItem(`learn-arduino:settings`) ?? `{}`),
    };
  } catch {
    return e;
  }
}
function It() {
  try {
    localStorage.setItem(`learn-arduino:settings`, JSON.stringify(H.settings));
  } catch {}
}
function Lt() {
  let e = document.documentElement.clientWidth || window.innerWidth,
    t = document.documentElement.clientHeight || window.innerHeight,
    n = Math.min(e / wt, t / Tt);
  if (
    (n < Et && (n = Math.min(e / Dt, t / Tt, Et)),
    (V = n < Ot || e / t < 0.95),
    document.documentElement.classList.toggle(`compact`, V),
    V)
  ) {
    ((B = 1),
      (I.style.width = ``),
      (I.style.height = ``),
      (I.style.transform = ``),
      Rt());
    return;
  }
  B = n;
  let r = e / B,
    i = t / B;
  ((I.style.width = `${r}px`),
    (I.style.height = `${i}px`),
    (I.style.transform = `scale(${B})`),
    se(F(`#traces`), r, i),
    Rt());
}
function Rt() {
  let e = F(`.side-lang`);
  if (!e) return;
  let t =
    !V &&
    F(`.credit-side`).offsetTop -
      (parseFloat(getComputedStyle(e).top) + e.offsetHeight) <
      24;
  e.classList.toggle(`is-cramped`, t);
}
(Lt(), de(F(`#clock-date`), F(`#clock-time`)));
var U = new ye(F(`.info-card`), { onExpand: (e) => e && G.toggleExpanded(!1) }),
  W = new je(F(`#lesson-list`), g, { onSelect: (e) => Q(e) }),
  G = new De(F(`.code-card`), {
    onRun: () => en(),
    onStop: () => tn(),
    onParam: (e) => Qt(e),
    onExpand: (e) => {
      (e && U.toggleExpanded(!1), U.setCovered(e));
    },
  }),
  K = null,
  zt = 300,
  Bt = null,
  Vt = 0,
  q = new We(F(`#inspector`), {
    svg: F(`#insp-lines`),
    onParam: (e, t) => Xt(e, t),
    onFocus: () => K?.selection && K.focusGroup(K.selection.group),
    onClose: () => K?.select(null),
    onRun: () => en(),
  }),
  J = new _e({
    rig: R,
    svg: F(`#leaders`),
    tags: F(`#tags`),
    onFocus: (e) => {
      K &&
        (e.anchor.startsWith(`part:`) && K.parts.has(e.anchor.slice(5))
          ? K.select(e.anchor.slice(5))
          : K.focusAnchor(e.anchor));
    },
  }),
  Ht = new ze(F(`#minimap`), {
    onMove: (e, t) => {
      if (!K) return;
      let n = K.controls;
      t
        ? (n.stopAnimation(),
          n.view.target.set(e.x, 0, e.z),
          n.clampTarget(),
          K.touch())
        : n.animateTo({ target: [e.x, 0, e.z] }, { duration: 420 });
    },
  }),
  Y = new Pe(F(`#viewbar`), {
    onTurn: (e) => K?.controls.turn(e),
    onZoom: (e) => K?.controls.zoomBy(e),
    onReset: () => K?.resetView(),
    onToggle: (e, t) => Kt(e, t),
  });
(Y.setToggle(`flow`, H.settings.flow),
  Y.setToggle(`schematic`, H.settings.schematic));
var Ut = new qe(F(`#signals`)),
  X = new vt(F(`#schematic`), {
    onHover: (e) => K?.hoverPart(e),
    onSelect: (e) => K?.select(e),
    onClose: () => Kt(`schematic`, !1),
  }),
  Wt = () => {},
  Z = new Ne(F(`.sidebar`), F(`#flyout`), {
    home: () => {
      (Q(g[0].id), K?.resetView());
    },
    toggleRun: () => (H.running === `idle` ? en() : tn()),
    state: () => ({ lessons: g, current: H.lesson.id, done: W.done }),
    selectLesson: (e) => Q(e),
    parts: () => nn(),
    focusPart: (e) => {
      e.group && K && (K.focusGroup(e.group), K.select(e.group));
    },
    settings: () => H.settings,
    setSetting: (e, t) => Kt(e, t),
    language: () => ({ languages: o, current: n }),
    setLanguage: (e) => t(e),
    resetProgress: () => {
      W.done.clear();
      try {
        localStorage.removeItem(`learn-arduino:done`);
      } catch {}
      (W.paintDone(), Gt());
    },
  });
document.addEventListener(`visibilitychange`, () => {
  document.hidden && St();
});
function Gt() {
  let e = W.done.size,
    t = g.length;
  ((F(`#progress-count`).textContent = `${e}/${t}`),
    (F(`#progress-fill`).style.width = `${(e / t) * 100}%`),
    F(`.progress-track`).setAttribute(`aria-valuenow`, String(e)),
    F(`.progress-track`).setAttribute(`aria-valuemax`, String(t)));
}
Gt();
function Kt(e, t) {
  ((H.settings[e] = t),
    It(),
    e === `labels` && J.setVisible(t),
    e === `grid` && K?.setGrid(t),
    e === `autoRotate` && K && (K.autoRotate = t),
    e === `flow` && (K?.setFlow(t), Y.setToggle(`flow`, t), Z.refresh()),
    e === `schematic` &&
      (X.setOpen(t), Y.setToggle(`schematic`, t), Wt({ glide: !0 })),
    e === `reducedMotion` &&
      (K?.setReducedMotion(t),
      document.documentElement.classList.toggle(`reduce-motion`, t)));
}
function qt(e) {
  let t = _(e),
    n = H.saved[e.id] ?? {};
  for (let r of e.params ?? []) {
    if (!(r.key in n)) continue;
    let e = n[r.key];
    r.type === `range` && typeof e == `number`
      ? (t[r.key] = Math.min(r.max, Math.max(r.min, e)))
      : ((r.type === `toggle` && typeof e == `boolean`) ||
          r.options?.some((t) => t.value === e)) &&
        (t[r.key] = e);
  }
  return (e.constrain?.(t), t);
}
var Jt = 0;
function Yt() {
  ((H.saved[H.lesson.id] = { ...H.values }),
    !Jt &&
      (Jt = setTimeout(() => {
        Jt = 0;
        try {
          localStorage.setItem(`learn-arduino:values`, JSON.stringify(H.saved));
        } catch {}
      }, 400)));
}
function Xt(e, t, { fromSim: n = !1 } = {}) {
  let r = H.lesson,
    i = r.params?.find((t) => t.key === e);
  if (!i) return;
  let a = H.values,
    o = t;
  if (
    (i.type === `range` && (o = Math.min(i.max, Math.max(i.min, Number(t)))),
    i.type === `toggle` && (o = !!t),
    a[e] === o)
  )
    return;
  let s = { ...a };
  ((a[e] = o), r.constrain?.(a, e), K?.updateParams(a));
  let c = v(r, a),
    l = (e) => c.includes(`{{${e}}}`) || r.code.includes(`{{${e}.`),
    u = Object.keys(a).filter((e) => a[e] !== s[e] && l(e));
  (u.length && G.update(a, u),
    K?.selection && K.selection.group.userData.part !== q.sel?.info
      ? Zt()
      : q.sync(a),
    n || (Yt(), X.setValues(a)));
}
function Zt() {
  let e = K?.selection;
  if ((rn(null), !e)) {
    (q.close(), G.mark([]));
    return;
  }
  let t = e.id ? (H.lesson.params ?? []).filter((t) => t.part === e.id) : [],
    n = e.id ? K.parts.get(e.id)?.spec.interact : null,
    r = n ? (n.squeeze ? `squeeze` : n.type) : null;
  (q.open(
    {
      id: e.id,
      info: e.group.userData.part,
      interact: r,
      live: !r && t.length > 0,
    },
    t,
    H.values,
  ),
    G.mark(t.map((e) => e.key)),
    K.touch(),
    q.dock === `bottom` &&
      !K.controls.grab &&
      requestAnimationFrame(() => K.revealSelection(q.footprint)));
}
function Qt(e) {
  let t = H.lesson.params?.find((t) => t.key === e);
  t && K && (K.select(t.part), q.pulse(e));
}
function Q(e) {
  let t = g.find((t) => t.id === e) ?? g[0];
  t === H.lesson
    ? K?.resetView()
    : (tn(),
      (H.lesson = t),
      (H.values = qt(t)),
      W.setActive(t.id),
      U.setLesson(t),
      G.setLesson(t, H.values),
      X.setLesson(t, H.values),
      X.isOpen && Wt({ hold: !0 }),
      J.show(t, { delay: H.settings.reducedMotion ? 0 : 1e3 }),
      K?.setLesson(t.id, { values: H.values }),
      Z.refresh(),
      history.replaceState(null, ``, `#${t.id}`),
      (document.title = $t(t)));
}
function $t(t) {
  return `${t.title} · ${e(`Learn Arduino`)}`;
}
async function en() {
  if (!K) return;
  (yt(),
    (H.running = `uploading`),
    G.setState(`uploading`),
    q.setRunning(!0),
    Z.setActive(`run`, !0));
  let e = H.lesson;
  (await K.runSketch(e.sim, {
    out: (e) => G.log(e),
    trace: (e) => G.trace(e),
  })) &&
    e === H.lesson &&
    ((H.running = `running`),
    G.setState(`running`),
    W.complete(e.id) && (Gt(), Z.refresh()));
}
function tn() {
  (K?.stopSim(),
    G.trace(null),
    H.running !== `idle` && G.log(e(`Stopped.`)),
    (H.running = `idle`),
    G.setState(`idle`),
    q.setRunning(!1),
    Z.setActive(`run`, !1));
}
function nn() {
  if (!K) return [];
  let e = [];
  for (let { group: t } of K.parts.values())
    t.userData.part &&
      !t.userData.wire &&
      e.push({ ...t.userData.part, group: t });
  let t = [
    `dip`,
    `usb`,
    `jack`,
    `reset`,
    `digitalA`,
    `power`,
    `analog`,
    `qfn`,
    `crystal`,
  ];
  K.board.traverse((n) => {
    let r = n.userData.part;
    r &&
      t.includes(r.key) &&
      !e.some((e) => e.name === r.name) &&
      e.push({ ...r, group: n });
  });
  let n = (e) => (e.key ? t.indexOf(e.key) + 100 : 0);
  return e.sort((e, t) => n(e) - n(t)).slice(0, 12);
}
function rn(e, t) {
  if ((e && K?.selection?.group.userData.part === e && (e = null), !e || !t)) {
    z.classList.remove(`is-on`);
    return;
  }
  ((z.querySelector(`b`).textContent = e.name),
    (z.querySelector(`span`).textContent = e.desc ?? ``));
  let n = on(t.x, t.y),
    r = n.x > L.offsetWidth - 260;
  ((z.style.transform = `translate(${n.x + (r ? -16 : 16)}px, ${n.y + 18}px) translateX(${r ? `-100%` : `0`})`),
    z.classList.add(`is-on`));
}
function an() {
  let e = L.getBoundingClientRect(),
    t = [],
    n = (n, r = !1) => {
      let i = n.getBoundingClientRect();
      if (!i.width || !i.height) return;
      let a = getComputedStyle(n);
      a.display === `none` ||
        (!r && (a.visibility === `hidden` || Number(a.opacity) < 0.3)) ||
        t.push({
          x0: (i.left - e.left) / B,
          y0: (i.top - e.top) / B,
          x1: (i.right - e.left) / B,
          y1: (i.bottom - e.top) / B,
        });
    };
  return (
    !R.classList.contains(`is-free`) && !R.classList.contains(`is-off`)
      ? (document
          .querySelectorAll(`.callout:not(.is-leaving)`)
          .forEach((e) => n(e, !0)),
        document.querySelectorAll(`.leaders .leader path`).forEach((e) => {
          let n =
            (e.getAttribute(`d`) ?? ``).match(/-?\d+(\.\d+)?/g)?.map(Number) ??
            [];
          for (let e = 0; e + 3 < n.length; e += 2)
            t.push({
              poly: [
                [n[e], n[e + 1]],
                [n[e + 2], n[e + 3]],
              ],
            });
        }))
      : document
          .querySelectorAll(`.tags.is-free .tag:not(.is-hidden)`)
          .forEach((e) => n(e, !0)),
    document
      .querySelectorAll(
        `.viewbar, .minimap, .inspector, .brand, .status, .schematic`,
      )
      .forEach((e) => n(e)),
    t
  );
}
function on(e, t) {
  let n = L.getBoundingClientRect();
  return { x: (e - n.left) / B, y: (t - n.top) / B };
}
(U.setLesson(H.lesson),
  G.setLesson(H.lesson, H.values),
  X.setLesson(H.lesson, H.values),
  X.setOpen(H.settings.schematic),
  W.setActive(H.lesson.id),
  Nt ? (document.title = $t(Nt)) : (document.title = e(document.title)),
  J.setVisible(H.settings.labels),
  document.documentElement.classList.toggle(
    `reduce-motion`,
    H.settings.reducedMotion,
  ));
var $ = new Ge(F(`#loader`)),
  sn = 2e4,
  cn = e(
    `The 3D board is drawn with WebGL, which this browser has turned off. Turn on hardware acceleration in its settings, or try another browser — the lessons and their code still work.`,
  ),
  ln = !1;
function un() {
  ((ln = !0), (F(`#app`).inert = !1), $.done());
}
function dn() {
  !ln && K && (un(), setTimeout(() => J.release(), 180), Y.startHint());
}
function fn() {
  if (ln) return;
  L.classList.add(`no-webgl`);
  let t = document.createElement(`div`);
  ((t.className = `stage-note`),
    t.setAttribute(`role`, `note`),
    (t.innerHTML = `<b>${e(`3D view unavailable`)}</b><p>${cn}</p>`),
    L.append(t),
    un());
}
var pn = (e) =>
  new Promise((t) => {
    let n = () => (e-- > 0 ? requestAnimationFrame(n) : t());
    n();
  });
function mn(e) {
  return new e(F(`#board-canvas`), L, {
    toStage: on,
    onFrame: (e) => {
      J.update(e);
      let t = e.isHome();
      (J.setFree(!t || !!e.selection || jt),
        Y.update((e.view.azimuth - 36 / At) * At, t));
      let n = !V && !e.headingHome(),
        r = performance.now();
      n ? (Bt ??= r) : (Bt = null);
      let i = n && r - Bt >= zt;
      if (
        (Ht.setVisible(i),
        n &&
          !i &&
          !Vt &&
          (Vt = setTimeout(
            () => {
              ((Vt = 0), K && (K.dirty = !0));
            },
            zt - (r - Bt) + 16,
          )),
        Ht.draw(e),
        e.signals && e.flowOn)
      ) {
        let t = document.querySelector(`.readout.is-on`),
          n = an();
        if (t) {
          let e = L.getBoundingClientRect(),
            r = t.getBoundingClientRect();
          n.push({
            x0: (r.left - e.left) / B,
            y0: (r.top - e.top) / B,
            x1: (r.right - e.left) / B,
            y1: (r.bottom - e.top) / B,
          });
        }
        Ut.update(e, n);
      } else Ut.update(e, []);
      (X.update(e.levels),
        X.setActive(e.selection?.id ?? null, e.hoveredId),
        q.place(e.selectionScreen(), e.size.w, e.size.h));
    },
    onHover: (e, t) => rn(e, t),
    onSelect: () => Zt(),
    blockers: () => an(),
    onParam: (e, t, n) => Xt(e, t, n),
    sound: () => H.settings.sound,
  });
}
async function hn() {
  (setTimeout(dn, sn),
    $.step(e(`Loading fonts`), 0.08),
    await Promise.all([
      document.fonts.load(`700 40px "Barlow Semi Condensed"`),
      document.fonts.load(`600 40px "Barlow Semi Condensed"`),
      document.fonts.load(`500 40px "Barlow Semi Condensed"`),
    ]).catch(() => {}),
    $.step(e(`Loading the 3D view`), 0.18));
  let { BoardStage: t } = await a(async () => {
    let { BoardStage: e } = await import("./stage.js");
    return { BoardStage: e };
  });
  ($.step(e(`Building the board`), 0.32), await pn(2));
  try {
    K = mn(t);
  } catch (e) {
    (console.error(e), fn());
    return;
  }
  (K.setGrid(H.settings.grid),
    K.setFlow(H.settings.flow),
    (K.autoRotate = H.settings.autoRotate),
    K.setReducedMotion(H.settings.reducedMotion),
    (window.__app = {
      stage: K,
      selectLesson: Q,
      run: en,
      stop: tn,
      state: H,
      setParam: Xt,
      inspector: q,
      minimap: Ht,
    }));
  let n = ({ glide: e = !1, hold: t = e } = {}) => {
    let n = L.offsetWidth,
      r = L.offsetHeight;
    if (!n || !r) return;
    let i = Math.min(1, n / 1090, r / 800),
      a = X.isOpen;
    jt = V || i < Mt || a;
    let o = V ? 12 : 100,
      s = jt ? { w: n - 28, h: r - o - 70 } : null,
      c = jt ? n / 2 : n / 2 + kt.x * i,
      l = jt ? o + (r - o - 58) / 2 : r / 2 + kt.y * i,
      u = F(`#schematic`);
    if (a && !V) {
      let e = Math.round(Math.min(460, Math.max(300, n * 0.38))),
        t = X.size(e, r - 112 - 24),
        i = 16 + e + 12;
      ((s = { w: n - i - 20, h: r - o - 70 }),
        (c = i + (n - i) / 2),
        u.style.setProperty(`--sch-w`, `${e}px`),
        u.style.setProperty(`--sch-svg-h`, `${t.h - 54}px`),
        (u.style.height = `${t.h}px`),
        (u.style.left = `16px`),
        (u.style.top = `112px`));
    } else if (a) {
      let e = n - 20,
        t = X.size(e, Math.round(r * 0.48)),
        i = t.h + 60;
      ((s = { w: n - 28, h: Math.max(80, r - o - i - 16) }),
        (l = o + (r - o - i) / 2),
        u.style.setProperty(`--sch-w`, `${e}px`),
        u.style.setProperty(`--sch-svg-h`, `${t.h - 50}px`),
        (u.style.height = `${t.h}px`),
        (u.style.left = `10px`),
        (u.style.top = `${Math.round(r - i + 2)}px`));
    }
    q.lockSide = a && !V ? 1 : null;
    let d = K.isHome();
    ((R.style.left = `${c}px`),
      (R.style.top = `${l}px`),
      (R.style.transform = i < 1 ? `scale(${i})` : ``),
      (J.origin = { x: c, y: l }),
      (J.scale = i),
      J.invalidate(),
      (q.top = V ? 12 : 112),
      (q.dock = V ? `bottom` : `corner`));
    let f = Math.min(2, Math.max(1.5, window.devicePixelRatio * B));
    (K.resize(n, r, c, l, f, i, s, { hold: t }),
      Ht.resize(window.devicePixelRatio * B * 1.5),
      e ? K.resetView(900) : d && !t && K.controls.jumpTo(K.homeView()));
  };
  ((Wt = n),
    n(),
    window.addEventListener(`resize`, () => {
      (Lt(), n());
    }),
    new ResizeObserver(() => n()).observe(L),
    K.setLesson(H.lesson.id, { instant: !0, values: H.values }),
    J.show(H.lesson, { hold: !0 }),
    L.addEventListener(`dblclick`, (e) => {
      if (e.target !== F(`#board-canvas`)) return;
      let t = K.pick(e.clientX, e.clientY);
      t && t.info.lift !== !1 ? K.focusGroup(t.group) : K.resetView();
    }),
    L.addEventListener(`pointerdown`, () => Y.dismissHint(), { once: !0 }),
    await pn(2),
    $.step(e(`Drawing the lessons`), 0.6));
  try {
    let { renderThumbnails: t } = await a(async () => {
      let { renderThumbnails: e } = await import("./thumbs.js");
      return { renderThumbnails: e };
    });
    await t(document.querySelectorAll(`[data-thumb]`), {
      renderer: K.renderer,
      environment: K.scene.environment,
      board: K.board,
      onEach: (t, n) =>
        $.step(
          e(`Drawing the lessons · {n} / {total}`, { n: t, total: n }),
          0.6 + (0.38 * t) / n,
        ),
    });
  } catch (e) {
    console.error(e);
  }
  (await pn(1), dn());
}
(window.addEventListener(`keydown`, (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey || !ln) return;
  let t = document.activeElement?.tagName;
  if (t === `INPUT` || t === `TEXTAREA`) return;
  let n =
      t === `BUTTON` ||
      document.activeElement?.getAttribute(`role`) === `button`,
    r = K?.controls,
    i = e.key;
  if (i === `Escape`) {
    if (K?.selection) {
      K.select(null);
      return;
    }
    if ((Z.close(), U.expanded || G.expanded)) {
      (U.toggleExpanded(!1), G.toggleExpanded(!1));
      return;
    }
    K?.resetView();
  } else if (r) {
    if (i === `r` || i === `R` || i === `Home`) K.resetView();
    else if (i === `f` || i === `F`) Kt(`flow`, !H.settings.flow);
    else if (i === `c` || i === `C`) Kt(`schematic`, !H.settings.schematic);
    else if (/^[0-9]$/.test(i) && g[(Number(i) + 9) % 10])
      Q(g[(Number(i) + 9) % 10].id);
    else if (i === `[` || i === `]`) {
      let e = g.indexOf(H.lesson) + (i === `]` ? 1 : -1);
      g[e] && Q(g[e].id);
    } else if (i === ` ` && !n) H.running === `idle` ? en() : tn();
    else return;
    e.preventDefault();
  }
}),
  hn().catch((t) => {
    (console.error(t),
      $.fail(
        e(`Something went wrong while starting. Try reloading the page.`),
      ));
  }));
export { ot as a, m as c, xt as i, bt as n, A as o, St as r, p as s, Ct as t };
