(function () {
  "use strict";

  /* ---------- Sticky nav background on scroll ---------- */
  var nav = document.getElementById("site-nav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("nav-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var toggleIcon = document.getElementById("nav-toggle-icon");
  var MENU_PATH = "M4 7h16M4 12h16M4 17h16";
  var CLOSE_PATH = "M6 6l12 12M18 6L6 18";

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggleIcon.setAttribute("d", MENU_PATH);
  }

  toggle.addEventListener("click", function () {
    var open = mobileMenu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggleIcon.setAttribute("d", open ? CLOSE_PATH : MENU_PATH);
  });

  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ---------- Countdown to Election Day: Oct 26, 2026, 10:00am ET ---------- */
  var ELECTION_DATE = new Date("2026-10-26T10:00:00-04:00");
  var elDays = document.getElementById("cd-days");
  var elHours = document.getElementById("cd-hours");
  var elMins = document.getElementById("cd-mins");
  var elSecs = document.getElementById("cd-secs");

  function pad(n) { return String(n).padStart(2, "0"); }

  function tickCountdown() {
    var diff = ELECTION_DATE.getTime() - Date.now();
    if (diff <= 0) {
      elDays.textContent = "00";
      elHours.textContent = "00";
      elMins.textContent = "00";
      elSecs.textContent = "00";
      return;
    }
    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var mins = Math.floor((totalSeconds % 3600) / 60);
    var secs = totalSeconds % 60;
    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent = pad(mins);
    elSecs.textContent = pad(secs);
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---------- About section shorts embed ----------
     Matches devvashi.ca's actual live "short-frame" component, which is a
     bare youtube-nocookie.com iframe in this same wrapper — not the
     avatar/title-overlay/play-button/share-icon card described in the v8
     spec text. Flagging this: the spec's written description doesn't match
     what's actually live on the reference site. */
  (function () {
    var VIDEO_URL = "https://youtube.com/shorts/nqTzQxbA7LM";
    var embedEl = document.getElementById("short-embed");
    if (!embedEl || !VIDEO_URL) return;

    var match = VIDEO_URL.match(/(?:shorts\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
    if (!match) return;

    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + match[1] + "?rel=0&modestbranding=1&playsinline=1";
    iframe.title = "Sandeep Kumar Goel — campaign video";
    iframe.loading = "lazy";
    iframe.allow = "encrypted-media; picture-in-picture; web-share; fullscreen";
    iframe.allowFullscreen = true;
    embedEl.innerHTML = "";
    embedEl.appendChild(iframe);
  })();

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
