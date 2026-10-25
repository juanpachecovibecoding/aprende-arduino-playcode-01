import { n } from "../index.js";
var ce = (e) => String(e).padStart(2, `0`),
  le = new Set([`ko`]);
function ue(e) {
  try {
    return le.has(n)
      ? new Intl.DateTimeFormat(n, {
          year: `numeric`,
          month: `2-digit`,
          day: `2-digit`,
        }).format(e)
      : new Intl.DateTimeFormat(n, {
          month: `short`,
          day: `2-digit`,
          year: `numeric`,
        })
          .format(e)
          .replace(/\./g, ``)
          .toLocaleUpperCase(n);
  } catch {
    return e.toDateString().toUpperCase();
  }
}
function de(e, t) {
  let n = () => {
    let n = new Date();
    ((e.textContent = ue(n)),
      (t.textContent = `${ce(n.getHours())}:${ce(n.getMinutes())}:${ce(n.getSeconds())}`));
  };
  (n(), setInterval(n, 1e3));
}
export { de };
