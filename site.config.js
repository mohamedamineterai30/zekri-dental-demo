// Client : Zekri Dental Clinic (@zekri_dental_clinic). Source : profil Instagram public, 12 nov 2026.
// "A CONFIRMER" = ma3louma ma l9inahach f profil (adresse, téléphone, horaires), lazem tji men 3andhom.
globalThis.CLINIC = {
  demo: true,
  accessKey: "zdc-e25a5414",
  style: "noir",
  lang: "ar", // l-profil ta3hom b l-3arbiya
  name: "Zekri Dental Clinic",
  short: "Z",
  specialty: { fr: "Implantologie · esthétique dentaire", ar: "زراعة وتجميل الأسنان" },
  city: { fr: "Algérie", ar: "الجزائر" }, // A CONFIRMER : ville
  tagline: {
    fr: "La première destination de l'implant dentaire en Algérie.",
    ar: "القِبلة الأولى لزراعة الأسنان في الجزائر.",
  },
  intro: {
    fr: "Plus de 31 médecins à votre service. Implants, Hollywood Smile et zircone : réservez votre consultation en ligne, sans attendre au téléphone.",
    ar: "أكثر من 31 طبيب في خدمتك. زراعة، ابتسامة هوليوود وتركيبات الزيركون: احجز استشارتك عبر الموقع، بدون انتظار على الهاتف.",
  },
  doctor: {
    name: "Zekri Dental Clinic",
    title: { fr: "Une équipe de plus de 31 médecins", ar: "فريق من أكثر من 31 طبيب" },
    bio: {
      fr: "Suivie par 1,3 million de personnes, la clinique Zekri traite les cas les plus lourds et forme aussi d'autres dentistes. Chaque patient est pris en charge par l'équipe, du premier examen au dernier contrôle.",
      ar: "عيادة زكري، يتابعها 1,3 مليون شخص، تعالج أصعب الحالات وتكوّن أطباء أسنان آخرين. كل مريض يتكفل به الفريق، من أول فحص إلى آخر مراقبة.",
    },
    photo: "",
  },
  phone: "", // A CONFIRMER : ma kaynch numéro f bio
  whatsapp: "", // A CONFIRMER
  instagram: "zekri_dental_clinic",
  address: { fr: "Adresse de la clinique (à confirmer)", ar: "عنوان العيادة (للتأكيد)" },
  mapsUrl: "",
  theme: { primary: "#c9a24a", dark: "#0a0a0b", accent: "#d9b45a" },

  // A CONFIRMER : horaires réels. 0 = dimanche ... 6 = samedi. [] = fermé.
  hours: {
    0: [["08:30", "12:30"], ["13:30", "17:00"]],
    1: [["08:30", "12:30"], ["13:30", "17:00"]],
    2: [["08:30", "12:30"], ["13:30", "17:00"]],
    3: [["08:30", "12:30"], ["13:30", "17:00"]],
    4: [["08:30", "12:30"], ["13:30", "17:00"]],
    5: [],
    6: [["08:30", "13:00"]],
  },
  slotMinutes: 20, // équipe kbira = créneaux 9sar
  daysAhead: 30,

  services: [
    { id: "implant", img: "assets/implant.jpg", name: { fr: "Implants dentaires", ar: "زراعة الأسنان" }, desc: { fr: "D'une dent à l'arcade complète.", ar: "من سن واحد إلى الفك الكامل." } },
    { id: "hollywood", img: "assets/sourire.jpg", name: { fr: "Hollywood Smile", ar: "ابتسامة هوليوود" }, desc: { fr: "Un sourire redessiné, adapté au visage.", ar: "ابتسامة مصممة حسب ملامح الوجه." } },
    { id: "zircon", img: "assets/zircon.jpg", name: { fr: "Prothèses zircone", ar: "تركيبات الزيركون" }, desc: { fr: "Solides, sans métal, couleur naturelle.", ar: "قوية، بدون معدن، بلون طبيعي." } },
    { id: "consult", name: { fr: "Première consultation", ar: "استشارة أولى" }, desc: { fr: "Examen et plan de traitement.", ar: "فحص وخطة علاج." } },
  ],

  points: [
    { fr: "Réservation en ligne, 24h/24", ar: "حجز عبر الموقع، 24/24" },
    { fr: "Agenda partagé pour toute l'équipe", ar: "أجندة مشتركة لكل الفريق" },
    { fr: "Moins d'appels au secrétariat", ar: "اتصالات أقل على الاستقبال" },
  ],
  proof: [
    { n: "+31", l: { fr: "médecins", ar: "طبيب" } },
    { n: "1,3 M", l: { fr: "abonnés", ar: "متابع" } },
    { n: "770+", l: { fr: "publications", ar: "منشور" } },
  ],
  // Klamhom houma, men post ta3 l-7ala "الضاوية"
  method: {
    title: { fr: "Notre conviction", ar: "قناعتنا" },
    quote: {
      fr: "« Ici, on ne change pas seulement un sourire… on redessine les traits d'une personne, on lui redonne confiance et une nouvelle vie. »",
      ar: "« هنا، لا نغيّر ابتسامة فقط… بل نعيد رسم ملامح إنسان، ونمنح ثقة وحياة جديدة. »",
    },
    steps: [
      { t: { fr: "Examen complet", ar: "فحص شامل" }, d: { fr: "Un bilan avant toute décision.", ar: "تقييم كامل قبل أي قرار." } },
      { t: { fr: "Plan d'équipe", ar: "خطة الفريق" }, d: { fr: "Plusieurs spécialistes autour du même cas.", ar: "عدة مختصين حول نفس الحالة." } },
      { t: { fr: "Suivi", ar: "متابعة" }, d: { fr: "Des contrôles après le traitement.", ar: "مراقبة بعد العلاج." } },
    ],
  },
  gallery: [],
  faq: [
    {
      q: { fr: "Faut-il payer pour réserver ?", ar: "هل يجب الدفع للحجز؟" },
      a: { fr: "Non. La réservation en ligne est gratuite.", ar: "لا. الحجز عبر الموقع مجاني." },
    },
    {
      q: { fr: "Je viens d'une autre wilaya ou de l'étranger", ar: "أنا من ولاية أخرى أو من الخارج" },
      a: { fr: "Réservez une première consultation : l'équipe organise ensuite vos séances.", ar: "احجز استشارة أولى: الفريق ينظم لك الجلسات بعدها." },
    },
    {
      q: { fr: "Comment annuler ou changer l'heure ?", ar: "كيف ألغي أو أغيّر الموعد؟" },
      a: { fr: "Contactez la clinique le plus tôt possible.", ar: "اتصل بالعيادة في أقرب وقت." },
    },
  ],
};
