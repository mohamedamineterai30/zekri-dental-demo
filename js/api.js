// Appels à /api/rdv. En mode démo (ou en local), tout reste dans le navigateur.
(() => {
  const cfg = globalThis.CLINIC;
  const RDV = globalThis.RDV;
  const isLocal = cfg.demo || location.protocol === "file:" || ["localhost", "127.0.0.1"].includes(location.hostname);
  const KEY = "rdv-demo-" + (cfg.instagram || "site");
  const read = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch {
      return {};
    }
  };
  const write = (d) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(d));
    } catch {}
  };
  const active = (r) => r.status !== "annule";

  // Même logique que la function Netlify, pour la démo
  function local(method, params, body, key) {
    const db = read();
    if (method === "GET" && params.admin) {
      if (key !== "demo") return { status: 401, data: { error: "code" } };
      return { status: 200, data: { days: db } };
    }
    if (method === "GET") return { status: 200, data: { taken: (db[params.date] || []).filter(active).map((r) => r.time) } };
    if (method === "POST") {
      const phone = RDV.cleanPhone(body.phone);
      const list = db[body.date] || [];
      if (!RDV.slots(cfg, body.date).includes(body.time)) return { status: 409, data: { error: "creneau" } };
      if (list.some((r) => active(r) && r.time === body.time)) return { status: 409, data: { error: "pris" } };
      if (list.some((r) => active(r) && r.phone === phone)) return { status: 409, data: { error: "deja" } };
      const id = Date.now().toString(36);
      list.push({ id, date: body.date, time: body.time, service: body.service, name: body.name.trim(), phone, note: body.note || "", status: "nouveau", at: new Date().toISOString() });
      list.sort((a, b) => a.time.localeCompare(b.time));
      db[body.date] = list;
      write(db);
      return { status: 200, data: { ok: true, id } };
    }
    if (method === "PATCH") {
      if (key !== "demo") return { status: 401, data: { error: "code" } };
      const r = (db[body.date] || []).find((x) => x.id === body.id);
      if (!r) return { status: 404, data: { error: "introuvable" } };
      r.status = body.status;
      write(db);
      return { status: 200, data: { ok: true } };
    }
  }

  globalThis.API = {
    isLocal,
    async call(method, params = {}, body, key) {
      if (isLocal) return local(method, params, body, key);
      const qs = new URLSearchParams(params).toString();
      const r = await fetch("/api/rdv" + (qs ? "?" + qs : ""), {
        method,
        headers: { "content-type": "application/json", ...(key ? { "x-admin-key": key } : {}) },
        body: body ? JSON.stringify(body) : undefined,
      });
      return { status: r.status, data: await r.json() };
    },
  };
})();
