(() => {
  const C = globalThis.CLINIC, RDV = globalThis.RDV, API = globalThis.API;
  const $ = (id) => document.getElementById(id);
  const el = (tag, props = {}, ...kids) => {
    const n = Object.assign(document.createElement(tag), props);
    n.append(...kids);
    return n;
  };

  const T = {
    fr: {
      navSoins: "Soins", navCabinet: "Le cabinet", navInfos: "Horaires & accès", cta: "Prendre rendez-vous", ctaShort: "Rendez-vous",
      bookTitle: "Réservez votre rendez-vous", s1: "Choisissez le soin", s2: "Choisissez le jour", s3: "Choisissez l'heure", s4: "Vos coordonnées",
      name: "Nom et prénom", phone: "Téléphone (05 / 06 / 07…)", submit: "Confirmer le rendez-vous", sending: "Envoi…",
      fine: "Gratuit et sans engagement. Paiement au cabinet.",
      doneTitle: "Rendez-vous enregistré", doneWa: "Recevoir la confirmation sur WhatsApp", again: "Prendre un autre rendez-vous",
      soinsTitle: "Nos soins", book: "Réserver →", galleryTitle: "Avant / après", hoursTitle: "Horaires", addrTitle: "Adresse", map: "Ouvrir dans Google Maps",
      contactTitle: "Contact", wa: "Écrire sur WhatsApp", faqTitle: "Questions fréquentes", call: "Appeler", closed: "Fermé",
      openNow: "Ouvert maintenant", closedNow: "Fermé pour le moment, réservez en ligne", noSlots: "Plus de place ce jour-là. Essayez un autre jour.",
      days: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"], daysLong: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      months: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
      demo: "Maquette de démonstration · les rendez-vous ne sont pas encore transmis au cabinet", today: "Auj.", at: "à", ig: "Voir sur Instagram", other: "عربي",
      e_service: "Choisissez un soin.", e_time: "Choisissez le jour et l'heure.", e_name: "Écrivez votre nom.", e_phone: "Numéro invalide. Exemple : 0550 12 34 56",
      e_pris: "Ce créneau vient d'être pris. Choisissez une autre heure.", e_deja: "Vous avez déjà un rendez-vous ce jour-là.", e_net: "Connexion impossible. Appelez-nous ou écrivez sur WhatsApp.",
      waMsg: (r) => `Bonjour, je confirme mon rendez-vous : ${r.service}, ${r.day} à ${r.time}. Nom : ${r.name}.`,
      waHello: "Bonjour, je voudrais un renseignement.",
    },
    ar: {
      navSoins: "العلاجات", navCabinet: "العيادة", navInfos: "الأوقات والعنوان", cta: "احجز موعدا", ctaShort: "احجز موعدا",
      bookTitle: "احجز موعدك", s1: "اختر العلاج", s2: "اختر اليوم", s3: "اختر الساعة", s4: "معلوماتك",
      name: "الاسم واللقب", phone: "رقم الهاتف (05 / 06 / 07…)", submit: "تأكيد الموعد", sending: "جاري الإرسال…",
      fine: "الحجز مجاني وبدون التزام. الدفع في العيادة.",
      doneTitle: "تم تسجيل موعدك", doneWa: "استلم التأكيد على واتساب", again: "حجز موعد آخر",
      soinsTitle: "علاجاتنا", book: "احجز ←", galleryTitle: "قبل / بعد", hoursTitle: "أوقات العمل", addrTitle: "العنوان", map: "افتح في خرائط جوجل",
      contactTitle: "اتصل بنا", wa: "راسلنا على واتساب", faqTitle: "أسئلة شائعة", call: "اتصل", closed: "مغلق",
      openNow: "مفتوح الآن", closedNow: "مغلق حاليا، احجز عبر الموقع", noSlots: "لا توجد أماكن في هذا اليوم. جرّب يوما آخر.",
      days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      months: ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
      demo: "نموذج تجريبي · المواعيد لا تُرسل بعد إلى العيادة", today: "اليوم", at: "على", ig: "شاهد على إنستغرام", other: "Français",
      e_service: "اختر العلاج.", e_time: "اختر اليوم والساعة.", e_name: "اكتب اسمك.", e_phone: "رقم غير صحيح. مثال: 0550 12 34 56",
      e_pris: "هذا الموعد حُجز للتو. اختر ساعة أخرى.", e_deja: "لديك موعد في هذا اليوم.", e_net: "تعذر الاتصال. اتصل بنا أو راسلنا على واتساب.",
      waMsg: (r) => `السلام عليكم، أؤكد موعدي: ${r.service}، ${r.day} على ${r.time}. الاسم: ${r.name}.`,
      waHello: "السلام عليكم، أريد استفسارا.",
    },
  };
  T.ar.daysLong = T.ar.days;

  const LKEY = "lang-" + (C.instagram || "site");
  let lang = C.lang || "fr";
  try { lang = localStorage.getItem(LKEY) || lang; } catch {}
  document.documentElement.dataset.style = C.style || "luxe";
  const t = () => T[lang];
  const L = (x) => (x && typeof x === "object" ? x[lang] || x.fr : x || "");
  const st = { service: null, date: null, time: null };
  const dayLabel = (d) => `${t().daysLong[RDV.dow(d)]} ${+d.slice(8)} ${t().months[+d.slice(5, 7) - 1]}`;
  const wa = (msg) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;
  const telPretty = (C.phone || "").replace(/^(\d{4})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4");

  function theme() {
    const s = document.documentElement.style;
    s.setProperty("--p", C.theme.primary);
    s.setProperty("--dark", C.theme.dark);
    s.setProperty("--accent", C.theme.accent);
  }

  function render() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = `${C.name} · ${L(C.specialty)} · ${L(C.city)}`;
    document.querySelector("meta[name=description]").content = L(C.intro);
    document.querySelectorAll("[data-t]").forEach((n) => (n.textContent = t()[n.dataset.t]));
    $("demoBar").hidden = !C.demo;
    $("demoBar").textContent = t().demo;
    $("lang").textContent = t().other;
    $("logo").textContent = C.short;
    $("brandName").textContent = C.name;
    $("brandSub").textContent = L(C.city);
    $("eyebrow").textContent = `${L(C.specialty)} · ${L(C.city)}`;
    $("tagline").textContent = L(C.tagline);
    $("intro").textContent = L(C.intro);
    $("points").replaceChildren(...C.points.map((p) => el("li", { textContent: L(p) })));
    $("needs").replaceChildren(...(C.needs || []).map((n) => {
      const b = el("button", { type: "button", textContent: L(n.label) });
      b.onclick = () => { st.service = n.service; render(); $("rdv").scrollIntoView({ block: "center" }); };
      return b;
    }));
    $("proof").replaceChildren(...(C.proof || []).map((p) => el("div", {}, el("b", { textContent: p.n }), el("span", { textContent: L(p.l) }))));
    $("name").placeholder = t().name;
    $("phone").placeholder = t().phone;

    $("services").replaceChildren(...C.services.map((s) => {
      const b = el("button", { type: "button", textContent: L(s.name), className: st.service === s.id ? "on" : "" });
      b.onclick = () => { st.service = s.id; render(); };
      return b;
    }));
    $("serviceCards").replaceChildren(...C.services.map((s, i) => {
      const b = el("button", { type: "button", textContent: t().book });
      b.onclick = () => { st.service = s.id; render(); $("rdv").scrollIntoView(); };
      const body = el("div", { className: "svc-body" }, el("i", { textContent: String(i + 1).padStart(2, "0") }), el("b", { textContent: L(s.name) }), el("p", { textContent: L(s.desc) }), b);
      return el("div", { className: "svc" }, ...(s.img ? [el("img", { src: s.img, alt: L(s.name), loading: "lazy" })] : []), body);
    }));

    const today = RDV.nowDZ().date;
    const days = RDV.days(C);
    if (!st.date || !days.includes(st.date)) st.date = days[0] || null;
    $("days").replaceChildren(...days.map((d) => {
      const b = el("button", { type: "button", className: d === st.date ? "on" : "" },
        el("small", { textContent: d === today ? t().today : t().days[RDV.dow(d)] }),
        el("b", { textContent: String(+d.slice(8)) }),
        el("small", { textContent: t().months[+d.slice(5, 7) - 1] }));
      b.onclick = () => { st.date = d; st.time = null; render(); };
      return b;
    }));
    renderSlots();

    // Cabinet
    const p = $("portrait");
    p.replaceChildren(C.doctor.photo ? el("img", { src: C.doctor.photo, alt: C.doctor.name }) : C.short);
    $("docName").textContent = C.doctor.name;
    $("docTitle").textContent = L(C.doctor.title);
    $("docBio").textContent = L(C.doctor.bio);
    $("igLink").textContent = `${t().ig} · @${C.instagram}`;
    $("igLink").href = `https://www.instagram.com/${C.instagram}/`;
    $("igLink").hidden = !C.instagram;
    const F = C.film;
    $("film").hidden = !F;
    if (F) {
      const v = $("filmVideo");
      if (!v.getAttribute("src")) {
        v.poster = F.poster || "";
        v.autoplay = true;
        v.src = F.video;
      }
      $("filmTitle").textContent = L(F.title);
      $("filmText").textContent = L(F.text);
    }
    const M = C.method;
    $("methodSec").hidden = !M;
    if (M) {
      $("methodTitle").textContent = L(M.title);
      $("methodQuote").textContent = L(M.quote);
      $("method").replaceChildren(...M.steps.map((s) => el("li", {}, el("b", { textContent: L(s.t) }), el("span", { textContent: L(s.d) }))));
    }
    if (C.galleryTitle) document.querySelector("#gallerySec h2").textContent = L(C.galleryTitle);
    $("gallerySec").hidden = !C.gallery.length;
    $("gallery").replaceChildren(...C.gallery.map((src) => el("img", { src, alt: "", loading: "lazy" })));

    // Infos
    const dz = RDV.nowDZ();
    const todayDow = RDV.dow(dz.date);
    $("hours").replaceChildren(...[6, 0, 1, 2, 3, 4, 5].map((d) => {
      const r = C.hours[d] || [];
      return el("tr", { className: d === todayDow ? "today" : "" },
        el("td", { textContent: t().daysLong[d] }),
        el("td", { textContent: r.length ? r.map((x) => x.join(" – ")).join("  ·  ") : t().closed, dir: r.length ? "ltr" : "" }));
    }));
    const open = (C.hours[todayDow] || []).some(([a, b]) => dz.min >= RDV.toMin(a) && dz.min < RDV.toMin(b));
    $("openNow").textContent = open ? t().openNow : t().closedNow;
    $("openNow").className = "open" + (open ? " on" : "");
    $("address").textContent = L(C.address);
    $("mapLink").href = C.mapsUrl;
    $("mapLink").hidden = !C.mapsUrl;
    $("telLink").textContent = telPretty;
    $("telLink").href = $("barTel").href = "tel:" + C.phone;
    $("waLink").href = $("barWa").href = wa(t().waHello);
    for (const id of ["telLink", "barTel"]) $(id).hidden = !C.phone;
    for (const id of ["waLink", "barWa", "waConfirm"]) $(id).hidden = !C.whatsapp;
    $("faq").replaceChildren(...C.faq.map((f) => el("details", {}, el("summary", { textContent: L(f.q) }), el("p", { textContent: L(f.a) }))));
    $("foot").textContent = `© ${dz.date.slice(0, 4)} ${C.name} · ${L(C.city)}`;
  }

  let slotReq = 0;
  async function renderSlots() {
    const box = $("slots");
    if (!st.date) return box.replaceChildren(el("p", { className: "empty", textContent: t().noSlots }));
    const req = ++slotReq, date = st.date;
    let taken = [];
    try { taken = (await API.call("GET", { date })).data.taken || []; } catch {}
    if (req !== slotReq) return;
    const free = RDV.slots(C, date).filter((s) => !taken.includes(s));
    if (!free.includes(st.time)) st.time = null;
    if (!free.length) return box.replaceChildren(el("p", { className: "empty", textContent: t().noSlots }));
    box.replaceChildren(...free.map((s) => {
      const b = el("button", { type: "button", textContent: s, className: s === st.time ? "on" : "" });
      b.onclick = () => { st.time = s; box.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b)); $("err").textContent = ""; };
      return b;
    }));
  }

  $("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target, err = $("err");
    const name = f.name.value.trim(), phone = RDV.cleanPhone(f.phone.value);
    const fail = (k) => { err.textContent = t()[k]; };
    if (!st.service) return fail("e_service");
    if (!st.date || !st.time) return fail("e_time");
    if (name.length < 2) return fail("e_name");
    if (!RDV.validPhone(phone)) return fail("e_phone");
    err.textContent = "";
    const btn = $("submit");
    btn.disabled = true;
    btn.textContent = t().sending;
    let res;
    try {
      res = await API.call("POST", {}, { date: st.date, time: st.time, service: st.service, name, phone, website: f.website.value });
    } catch { res = { status: 0, data: {} }; }
    btn.disabled = false;
    btn.textContent = t().submit;
    if (!res.data.ok) {
      const code = res.data.error;
      fail(code === "deja" ? "e_deja" : code === "pris" || code === "creneau" ? "e_pris" : code === "champs" ? "e_phone" : "e_net");
      if (code === "pris" || code === "creneau") renderSlots();
      return;
    }
    const svc = L(C.services.find((s) => s.id === st.service).name);
    const r = { service: svc, day: dayLabel(st.date), time: st.time, name };
    $("recap").replaceChildren(el("b", { textContent: `${r.day} ${t().at} ${r.time}` }), `${svc} · ${name}`);
    $("waConfirm").href = wa(t().waMsg(r));
    f.hidden = true;
    $("done").hidden = false;
    $("rdv").scrollIntoView({ block: "center" });
  });

  $("again").onclick = () => {
    st.time = null;
    $("done").hidden = true;
    $("form").hidden = false;
    render();
  };
  $("lang").onclick = () => {
    lang = lang === "fr" ? "ar" : "fr";
    try { localStorage.setItem(LKEY, lang); } catch {}
    render();
  };

  theme();
  render();
})();
