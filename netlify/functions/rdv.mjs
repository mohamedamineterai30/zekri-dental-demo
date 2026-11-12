// API des rendez-vous : /api/rdv
//   GET  ?date=YYYY-MM-DD            -> { taken: ["09:00", ...] }            (public)
//   POST { date,time,service,name,phone,note } -> { ok, id }                 (public)
//   GET  ?admin=1                    -> { days: { date: [rdv...] } }         (x-admin-key)
//   PATCH { date, id, status }       -> { ok }                               (x-admin-key)
// Variable d'environnement Netlify à créer : ADMIN_KEY (le code du cabinet).
import { getStore } from "@netlify/blobs";
import "../../site.config.js";
import "../../js/slots.js";

const cfg = globalThis.CLINIC;
const RDV = globalThis.RDV;
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s || "");
const active = (r) => r.status !== "annule";

export default async (req) => {
  const store = getStore("rdv");
  const url = new URL(req.url);
  const load = async (date) => (await store.get("d/" + date, { type: "json" })) || [];
  const isAdmin = () => {
    const key = Netlify.env.get("ADMIN_KEY");
    return !!key && req.headers.get("x-admin-key") === key;
  };

  if (req.method === "GET" && url.searchParams.get("admin")) {
    if (!isAdmin()) return json({ error: "code" }, 401);
    const today = RDV.nowDZ().date;
    const days = {};
    for (let i = -1; i <= cfg.daysAhead; i++) {
      const d = RDV.addDays(today, i);
      const list = await load(d);
      if (list.length) days[d] = list;
    }
    return json({ days });
  }

  if (req.method === "GET") {
    const date = url.searchParams.get("date");
    if (!isDate(date)) return json({ error: "date" }, 400);
    return json({ taken: (await load(date)).filter(active).map((r) => r.time) });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "json" }, 400);
  }

  if (req.method === "POST") {
    if (body.website) return json({ ok: true, id: "x" }); // piège à robots
    const date = body.date;
    const time = String(body.time || "");
    const name = String(body.name || "").trim().slice(0, 60);
    const phone = RDV.cleanPhone(body.phone);
    const service = cfg.services.find((s) => s.id === body.service);
    if (!isDate(date) || !service || name.length < 2 || !RDV.validPhone(phone)) return json({ error: "champs" }, 400);
    if (!RDV.slots(cfg, date).includes(time)) return json({ error: "creneau" }, 409);
    const list = await load(date);
    if (list.some((r) => active(r) && r.time === time)) return json({ error: "pris" }, 409);
    if (list.some((r) => active(r) && r.phone === phone)) return json({ error: "deja" }, 409);
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    list.push({ id, date, time, service: service.id, name, phone, note: String(body.note || "").slice(0, 200), status: "nouveau", at: new Date().toISOString() });
    list.sort((a, b) => a.time.localeCompare(b.time));
    await store.setJSON("d/" + date, list);
    return json({ ok: true, id });
  }

  if (req.method === "PATCH") {
    if (!isAdmin()) return json({ error: "code" }, 401);
    if (!isDate(body.date) || !["nouveau", "confirme", "venu", "annule"].includes(body.status)) return json({ error: "champs" }, 400);
    const list = await load(body.date);
    const r = list.find((x) => x.id === body.id);
    if (!r) return json({ error: "introuvable" }, 404);
    r.status = body.status;
    await store.setJSON("d/" + body.date, list);
    return json({ ok: true });
  }

  return json({ error: "methode" }, 405);
};

export const config = { path: "/api/rdv" };
