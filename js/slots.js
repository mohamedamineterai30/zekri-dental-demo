// Calcul des créneaux, partagé entre le site et la function Netlify.
globalThis.RDV = {
  toMin: (s) => +s.slice(0, 2) * 60 + +s.slice(3, 5),
  fmt: (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"),
  // Heure d'Algérie (UTC+1, pas de changement d'heure)
  nowDZ() {
    const d = new Date(Date.now() + 3600e3);
    return { date: d.toISOString().slice(0, 10), min: d.getUTCHours() * 60 + d.getUTCMinutes() };
  },
  addDays(dateStr, n) {
    const d = new Date(dateStr + "T00:00:00Z");
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
  },
  dow: (dateStr) => new Date(dateStr + "T00:00:00Z").getUTCDay(),
  // Créneaux encore réservables pour une date (au moins 1h à l'avance)
  slots(cfg, dateStr) {
    const now = this.nowDZ();
    if (dateStr < now.date || dateStr > this.addDays(now.date, cfg.daysAhead)) return [];
    const out = [];
    for (const [a, b] of cfg.hours[this.dow(dateStr)] || []) {
      for (let m = this.toMin(a); m + cfg.slotMinutes <= this.toMin(b); m += cfg.slotMinutes) {
        if (dateStr > now.date || m >= now.min + 60) out.push(this.fmt(m));
      }
    }
    return out;
  },
  days(cfg) {
    const now = this.nowDZ();
    const out = [];
    for (let i = 0; i <= cfg.daysAhead; i++) {
      const d = this.addDays(now.date, i);
      if (this.slots(cfg, d).length) out.push(d);
    }
    return out;
  },
  validPhone: (p) => /^0[5-7]\d{8}$/.test(p) || /^0[2-4]\d{7}$/.test(p),
  cleanPhone: (p) => String(p || "").replace(/[^\d+]/g, "").replace(/^(\+|00)213/, "0"),
};
