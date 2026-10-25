var N = null;
function yt() {
  let e = window.AudioContext || window.webkitAudioContext;
  e && ((N ??= new e()), N.state === `suspended` && N.resume());
}
function bt(e, t, n = 0.4) {
  if (!N || !e || n <= 0) return;
  let r = N.currentTime,
    i = t / 1e3,
    a = N.createOscillator();
  ((a.type = `square`), (a.frequency.value = e));
  let o = N.createGain(),
    s = 0.06 * n;
  (o.gain.setValueAtTime(0, r),
    o.gain.linearRampToValueAtTime(s, r + 0.006),
    o.gain.setValueAtTime(s, Math.max(r + 0.006, r + i - 0.03)),
    o.gain.linearRampToValueAtTime(0, r + i),
    a.connect(o).connect(N.destination),
    a.start(r),
    a.stop(r + i + 0.02));
}
var P = null;
function xt(e, t = 0.4) {
  if (!N || !e || t <= 0) {
    St();
    return;
  }
  if (P?.hz === e) return;
  St();
  let n = N.currentTime,
    r = N.createOscillator();
  ((r.type = `square`), (r.frequency.value = e));
  let i = N.createGain();
  (i.gain.setValueAtTime(0, n),
    i.gain.linearRampToValueAtTime(0.06 * t, n + 0.006),
    r.connect(i).connect(N.destination),
    r.start(n),
    (P = { osc: r, gain: i, hz: e }));
}
function St() {
  if (!P) return;
  let { osc: e, gain: t } = P;
  P = null;
  let n = N.currentTime;
  (t.gain.cancelScheduledValues(n),
    t.gain.setValueAtTime(t.gain.value, n),
    t.gain.linearRampToValueAtTime(0, n + 0.02),
    e.stop(n + 0.03));
}
export { yt, bt, xt, St };
