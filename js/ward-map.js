(function () {
  "use strict";

  var mapEl = document.getElementById("ward-map");
  if (!mapEl || typeof maplibregl === "undefined") return;

  var WARD_DATA_URL = "data/wards-3-4.geojson";
  var STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
  var CENTER = [-79.725, 43.664];

  var LANDMARKS = [
    {
      name: "Downtown Brampton / Gage Park",
      note: "Ward 3 anchor",
      lng: -79.7581,
      lat: 43.6837,
    },
    {
      name: "Flower City Community Campus",
      note: "8850 McLaughlin Rd S — Ward 4 anchor",
      lng: -79.7442,
      lat: 43.6567,
    },
  ];

  var map = new maplibregl.Map({
    container: "ward-map",
    style: STYLE_URL,
    center: CENTER,
    zoom: 11.6,
    attributionControl: true,
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

  var wardPolygon = null; // first ring of coordinates, kept for point-in-polygon checks
  var searchMarker = null;

  map.on("load", function () {
    fetch(WARD_DATA_URL)
      .then(function (res) { return res.json(); })
      .then(function (geojson) {
        map.addSource("wards", { type: "geojson", data: geojson });

        map.addLayer({
          id: "wards-fill",
          type: "fill",
          source: "wards",
          paint: { "fill-color": "#1b2a52", "fill-opacity": 0.16 },
        });

        map.addLayer({
          id: "wards-outline",
          type: "line",
          source: "wards",
          paint: { "line-color": "#c8102e", "line-width": 2.5 },
        });

        var feature = geojson.features && geojson.features[0];
        if (feature && feature.geometry && feature.geometry.type === "Polygon") {
          wardPolygon = feature.geometry.coordinates;
        }
      })
      .catch(function (err) {
        console.error("Could not load ward boundary:", err);
      });

    LANDMARKS.forEach(function (landmark) {
      var popup = new maplibregl.Popup({ offset: 18 }).setHTML(
        '<strong>' + landmark.name + '</strong><br>' + landmark.note
      );
      new maplibregl.Marker({ color: "#1b2a52" })
        .setLngLat([landmark.lng, landmark.lat])
        .setPopup(popup)
        .addTo(map);
    });
  });

  /* ---------- Point in polygon (ray casting, single-ring polygon) ---------- */
  function pointInPolygon(point, ring) {
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      var xi = ring[i][0], yi = ring[i][1];
      var xj = ring[j][0], yj = ring[j][1];
      var intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  /* ---------- Address lookup via Nominatim ---------- */
  var form = document.getElementById("lookup-form");
  var input = document.getElementById("lookup-input");
  var resultEl = document.getElementById("lookup-result");

  function setResult(text, status) {
    resultEl.textContent = text;
    resultEl.className = "lookup-result show status-" + status;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var query = input.value.trim();
      if (!query) return;
      if (!/brampton/i.test(query)) query += ", Brampton, Ontario, Canada";

      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      setResult("Looking that up…", "out");

      var url =
        "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=ca" +
        "&viewbox=-79.90,43.78,-79.60,43.58&bounded=0&q=" +
        encodeURIComponent(query);

      fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (results) {
          if (!results || results.length === 0) {
            setResult("We couldn't find that address. Try adding more detail, like a postal code.", "error");
            return;
          }
          var lng = parseFloat(results[0].lon);
          var lat = parseFloat(results[0].lat);

          if (searchMarker) searchMarker.remove();
          searchMarker = new maplibregl.Marker({ color: "#c8102e" }).setLngLat([lng, lat]).addTo(map);
          map.flyTo({ center: [lng, lat], zoom: 14, duration: 1200 });

          if (wardPolygon && pointInPolygon([lng, lat], wardPolygon[0])) {
            setResult("Good news — that address is in Wards 3 & 4! Sandeep would love your support. Scroll down to get involved.", "in");
          } else if (wardPolygon) {
            setResult("That address looks to be outside Wards 3 & 4 — but everyone's welcome to follow along and share the campaign.", "out");
          } else {
            setResult("Found it on the map — the ward boundary is still loading, so we can't confirm which ward yet.", "out");
          }
        })
        .catch(function () {
          setResult("Something went wrong reaching the address lookup service. Please try again in a moment.", "error");
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });
  }
})();
