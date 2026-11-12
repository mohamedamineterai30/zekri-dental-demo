// Démo privée : tet7all ghir b lien li fih ?k=<accessKey> (f site.config.js). Bla accessKey = site ma7loul.
(function () {
  var K = (globalThis.CLINIC || {}).accessKey;
  if (!K) return;
  try {
    var u = new URL(location.href);
    if (u.searchParams.get("k") === K) {
      localStorage.setItem("acces-" + K, "1");
      u.searchParams.delete("k");
      history.replaceState(null, "", u.pathname + u.search + u.hash);
    }
    if (localStorage.getItem("acces-" + K) !== "1") document.documentElement.className = "locked";
  } catch (e) {
    document.documentElement.className = "locked";
  }
})();
