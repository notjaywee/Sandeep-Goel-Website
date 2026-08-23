(function () {
  "use strict";

  var GALLERY_DATA_URL = "data/gallery.json";
  var IMAGE_BASE = "images/gallery/";
  var PLACEHOLDER_ICON =
    '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6">' +
    '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/>' +
    '<path d="M21 16l-5-5-4 4-3-3-6 6"/></svg>';
  var ROTATE_CAP_DEG = 2;

  var tracks = {
    1: document.getElementById("marquee-track-1"),
    2: document.getElementById("marquee-track-2")
  };
  if (!tracks[1] && !tracks[2]) return;

  Object.keys(tracks).forEach(function (row) {
    var marquee = tracks[row] && tracks[row].closest(".marquee");
    if (!marquee) return;
    marquee.addEventListener("mousedown", function (e) {
      if (e.target.closest(".marquee-card")) e.preventDefault();
    });
  });

  function buildCard(photo) {
    var li = document.createElement("li");
    li.className = "marquee-card";
    var rotate = (Math.random() * ROTATE_CAP_DEG * 2 - ROTATE_CAP_DEG).toFixed(2);
    li.style.setProperty("--card-rotate", rotate + "deg");

    var figure = document.createElement("figure");
    figure.className = "who-photo who-photo--" + photo.ratio;

    if (photo.placeholder) {
      var placeholder = document.createElement("div");
      placeholder.className = "placeholder-media";
      placeholder.innerHTML = PLACEHOLDER_ICON;
      figure.appendChild(placeholder);
    } else {
      var picture = document.createElement("picture");
      var source = document.createElement("source");
      source.type = "image/avif";
      source.srcset = IMAGE_BASE + photo.file.replace(/\.jpg$/i, ".avif");
      picture.appendChild(source);

      var img = document.createElement("img");
      img.className = "who-photo-media";
      img.src = IMAGE_BASE + photo.file;
      img.alt = photo.alt;
      img.loading = "lazy";
      img.decoding = "async";
      picture.appendChild(img);

      figure.appendChild(picture);
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
      var byRow = { 1: [], 2: [] };
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
