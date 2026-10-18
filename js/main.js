(function () {
  // Oude links uit de single-page versie (index.html#projecten) doorsturen naar de nieuwe pagina's
  var OUD = { diensten: "diensten.html", projecten: "projecten.html", over: "over-ons.html", contact: "contact.html" };
  var h = (location.hash || "").replace("#", "");
  if (OUD[h] && !document.getElementById(h)) {
    location.replace(OUD[h]);
    return;
  }

  var burger = document.getElementById("burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var mn = document.getElementById("mobile-nav");
      var open = mn.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var filter = document.getElementById("filter");
  if (filter) {
    filter.addEventListener("click", function (e) {
      var b = e.target.closest(".filter-btn");
      if (!b) return;
      var f = b.getAttribute("data-filter");
      filter.querySelectorAll(".filter-btn").forEach(function (x) {
        x.classList.toggle("is-active", x === b);
      });
      document.querySelectorAll("#proj-grid .proj").forEach(function (p) {
        p.classList.toggle("is-hidden", f !== "alles" && p.getAttribute("data-tag") !== f);
      });
    });
  }

  var form = document.getElementById("offerte-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      // Geen server: open het mailprogramma met de ingevulde gegevens
      e.preventDefault();
      var f = form.elements;
      var body = "Naam: " + f.naam.value + "\nE-mail: " + f.mail.value + "\nTelefoon: " + f.tel.value +
        "\nAdres: " + f.adres.value + "\n\n" + f.msg.value;
      window.location.href = "mailto:info@voegkoninglp.nl?subject=" +
        encodeURIComponent("Offerteaanvraag via website") + "&body=" + encodeURIComponent(body);
      var btn = form.querySelector("button[type=submit]");
      btn.textContent = "Uw mailprogramma wordt geopend…";
    });
  }

  var jaar = document.getElementById("jaar");
  if (jaar) jaar.textContent = new Date().getFullYear();
})();
