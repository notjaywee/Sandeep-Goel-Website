(function () {
  "use strict";

  var GALLERY_DATA_URL = "data/gallery.json";
  var IMAGE_BASE = "images/gallery/";

  var grid = document.getElementById("gallery-grid");
  if (!grid) return;

  fetch(GALLERY_DATA_URL)
    .then(function (res) { return res.json(); })
    .then(function (photos) {
      photos.forEach(function (photo) {
        var item = document.createElement("figure");
        item.className = "gallery-item";

        var img = document.createElement("img");
        img.src = IMAGE_BASE + photo.file;
        img.alt = photo.alt;
        img.width = photo.width;
        img.height = photo.height;
        img.loading = "lazy";
        img.decoding = "async";
        img.style.aspectRatio = photo.width + " / " + photo.height;

        item.appendChild(img);
        grid.appendChild(item);
      });
    })
    .catch(function (err) {
      console.error("Gallery failed to load:", err);
    });
})();
