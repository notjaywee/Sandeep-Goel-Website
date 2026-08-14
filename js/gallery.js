(function () {
  "use strict";

  var GALLERY_DATA_URL = "data/gallery.json";
  var IMAGE_BASE = "images/gallery/";
  var PLACEHOLDER_ICON =
    '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6">' +
    '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/>' +
    '<path d="M21 16l-5-5-4 4-3-3-6 6"/></svg>';

  var tracks = {
    1: document.getElementById("marquee-track-1"),
    2: document.getElementById("marquee-track-2"),
    3: document.getElementById("marquee-track-3")
  };
  if (!tracks[1] && !tracks[2] && !tracks[3]) return;

  function buildCard(photo) {
    var li = document.createElement("li");
    li.className = "marquee-card";

    var figure = document.createElement("figure");
    figure.className = "who-photo who-photo--" + photo.ratio;

    if (photo.placeholder) {
      var placeholder = document.createElement("div");
      placeholder.className = "placeholder-media";
      placeholder.innerHTML = PLACEHOLDER_ICON;
      figure.appendChild(placeholder);
    } else {
      var img = document.createElement("img");
      img.className = "who-photo-media";
      img.src = IMAGE_BASE + photo.file;
      img.alt = photo.alt;
      img.loading = "lazy";
      img.decoding = "async";
      figure.appendChild(img);
    }

    li.appendChild(figure);
    return li;
  }

  function renderRow(track, photos) {
    if (!track || !photos.length) return;
    var realCards = photos.map(buildCard);
    realCards.forEach(function (li) { track.appendChild(li); });

    realCards.forEach(function (li) {
      var clone = li.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      var img = clone.querySelector("img");
      if (img) img.alt = "";
      track.appendChild(clone);
    });
  }

  fetch(GALLERY_DATA_URL)
    .then(function (res) { return res.json(); })
    .then(function (photos) {
      var byRow = { 1: [], 2: [], 3: [] };
      photos.forEach(function (photo) {
        var row = photo.row || 1;
        if (!byRow[row]) byRow[row] = [];
        byRow[row].push(photo);
      });
      Object.keys(tracks).forEach(function (row) {
        renderRow(tracks[row], byRow[row] || []);
      });
    })
    .catch(function (err) {
      console.error("Gallery failed to load:", err);
    });
})();
