(function () {
  "use strict";

  var mapEl = document.getElementById("ward-map");
  if (!mapEl || typeof maplibregl === "undefined") return;

  var WARD_DATA_URL = "data/wards-3-4.geojson";
  /* "positron" is OpenFreeMap's muted, desaturated light basemap — matches the
     look devvashi.ca uses instead of the busier default "liberty" style. */
  var STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
  var GOLD = "#FFB000";
  var NAVY = "#1b2a52";
  var MASK_COLOR = "#1b2a52"; // matches --navy

  /* Bounding box used to bias/restrict the address lookup to the Brampton
     area — reused for both the Nominatim query and the client-side sanity
     check on the result. */
  var SEARCH_BOUNDS = { west: -79.90, north: 43.78, east: -79.60, south: 43.58 };
  var SEARCH_VIEWBOX =
    SEARCH_BOUNDS.west + "," + SEARCH_BOUNDS.north + "," + SEARCH_BOUNDS.east + "," + SEARCH_BOUNDS.south;

  var LANDMARKS = [
    {
      name: "Gage Park",
      note: "Downtown Brampton — Ward 3 anchor",
      lng: -79.7581,
      lat: 43.6837,
    },
    {
      name: "Flower City Campus",
      note: "8850 McLaughlin Rd S — Ward 4 anchor",
      lng: -79.7442,
      lat: 43.6567,
    },
    {
      name: "Eldorado Park",
      note: "Creditview Road — Ward 4 anchor",
      lng: -79.780087,
      lat: 43.6451709,
    },
    {
      name: "Sri Guru Nanak Sikh Centre",
      note: "99 Glidden Road — Ward 3 anchor",
      lng: -79.7161397,
      lat: 43.694299,
    },
    {
      name: "Shri Gauri Shankar Mandir",
      note: "1075 Queen Street West — Ward 4 anchor",
      lng: -79.7827478,
      lat: 43.6651833,
    },
    {
      name: "Maa Chintpurni Mandir (Shrijidham)",
      note: "8027 Churchville Road — Ward 4 anchor",
      lng: -79.7621030,
      lat: 43.6407125,
    },
  ];

  var map = new maplibregl.Map({
    container: "ward-map",
    style: STYLE_URL,
    zoom: 11,
    center: [-79.745, 43.66],
    attributionControl: true,
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

  /* ---------- Zoom-reset control ---------- */
  var wardBounds = null;
  function ResetControl() {}
  ResetControl.prototype.onAdd = function (mapInstance) {
    this._map = mapInstance;
    this._btn = document.createElement("button");
    this._btn.type = "button";
    this._btn.className = "maplibregl-ctrl-icon map-reset-btn";
    this._btn.setAttribute("aria-label", "Reset map view");
    this._btn.textContent = "⟲";
    this._btn.addEventListener("click", function () {
      if (wardBounds) mapInstance.fitBounds(wardBounds, { padding: 32, duration: 800 });
    });
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl maplibregl-ctrl-group";
    this._container.appendChild(this._btn);
    return this._container;
  };
  ResetControl.prototype.onRemove = function () {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  };
  map.addControl(new ResetControl(), "top-right");

  var wardUnion = null; // single dissolved Turf feature, used for display + point-in-polygon
  var searchMarker = null;

  function pillMarker(landmark) {
    var el = document.createElement("div");
    el.className = "map-pin-pill";
    el.innerHTML =
      '<span class="map-pin-dot"></span><span class="map-pin-label">' + landmark.name + "</span>";
    var popup = new maplibregl.Popup({ offset: 14 }).setHTML(
      "<strong>" + landmark.name + "</strong><br>" + landmark.note
    );
    new maplibregl.Marker({ element: el, anchor: "left" })
      .setLngLat([landmark.lng, landmark.lat])
      .setPopup(popup)
      .addTo(map);
  }

  map.on("load", function () {
    fetch(WARD_DATA_URL)
      .then(function (res) { return res.json(); })
      .then(function (geojson) {
        var ward3 = geojson.features[0];
        var ward4 = geojson.features[1];

        wardUnion =
          typeof turf !== "undefined" ? turf.union(ward3, ward4) : ward3;

        var displaySource = {
          type: "FeatureCollection",
          features: [wardUnion],
        };

        map.addSource("wards", { type: "geojson", data: displaySource });

        map.addLayer({
          id: "wards-fill",
          type: "fill",
          source: "wards",
          paint: { "fill-color": NAVY, "fill-opacity": 0.03 },
        });

        map.addLayer({
          id: "wards-outline",
          type: "line",
          source: "wards",
          paint: { "line-color": GOLD, "line-width": 2.5 },
        });

        if (typeof turf !== "undefined") {
          var maskPolygon = turf.mask(wardUnion);
          map.addSource("ward-spotlight-mask", { type: "geojson", data: maskPolygon });
          map.addLayer(
            {
              id: "ward-spotlight-mask-layer",
              type: "fill",
              source: "ward-spotlight-mask",
              paint: { "fill-color": MASK_COLOR, "fill-opacity": 0.4 },
            },
            "wards-outline"
          );

          var bbox = turf.bbox(wardUnion);
          wardBounds = [
            [bbox[0], bbox[1]],
            [bbox[2], bbox[3]],
          ];
          map.fitBounds(wardBounds, { padding: 32, duration: 0 });
        }
      })
      .catch(function (err) {
        console.error("Could not load ward boundary:", err);
      });

    LANDMARKS.forEach(pillMarker);
  });

  /* ---------- Address lookup via Nominatim ---------- */
  var form = document.getElementById("lookup-form");
  var input = document.getElementById("lookup-input");
  var resultEl = document.getElementById("lookup-result");

  function setResult(text, status, showCta) {
    resultEl.innerHTML = "";
    resultEl.className = "lookup-result show status-" + status;
    var msg = document.createElement("p");
    msg.className = "lookup-result-text";
    msg.textContent = text;
    resultEl.appendChild(msg);
    if (showCta) {
      var cta = document.createElement("a");
      cta.href = "#involved";
      cta.className = "btn btn-primary lookup-result-cta";
      cta.textContent = "Get Involved";
      resultEl.appendChild(cta);
    }
  }

  function isBarePostalCode(value) {
    // Canadian postal code pattern, with or without a space: L6X 1A1 or L6X1A1
    return /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/.test(value.trim());
  }

  function buildLookupQuery(q) {
    return /brampton/i.test(q) ? q : q + ", Brampton, Ontario, Canada";
  }

  function geocode(q) {
    var url =
      "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=ca" +
      "&viewbox=" + SEARCH_VIEWBOX + "&bounded=1&q=" +
      encodeURIComponent(buildLookupQuery(q));
    return fetch(url).then(function (res) { return res.json(); });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var query = input.value.trim();
      if (!query) return;

      if (isBarePostalCode(query)) {
        setResult("Please enter your full street address — postal code lookup isn't supported.", "error");
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      setResult("Looking that up…", "out");

      geocode(query)
        .then(function (results) {
          if (!results || results.length === 0) {
            setResult("We couldn't find that address. Try adding more detail, like a nearby cross street.", "error");
            return;
          }
          var lng = parseFloat(results[0].lon);
          var lat = parseFloat(results[0].lat);

          var withinSearchArea =
            lng >= SEARCH_BOUNDS.west && lng <= SEARCH_BOUNDS.east &&
            lat >= SEARCH_BOUNDS.south && lat <= SEARCH_BOUNDS.north;

          if (!withinSearchArea) {
            setResult("We couldn't find that address. Try double-checking the spelling or adding more detail.", "error");
            return;
          }

          if (searchMarker) searchMarker.remove();
          searchMarker = new maplibregl.Marker({ color: GOLD }).setLngLat([lng, lat]).addTo(map);
          map.flyTo({ center: [lng, lat], zoom: 14, duration: 1200 });

          var isInside = false;
          if (wardUnion && typeof turf !== "undefined") {
            isInside = turf.booleanPointInPolygon(turf.point([lng, lat]), wardUnion);
          }

          if (wardUnion && isInside) {
            setResult("Good news — that address is in Wards 3 & 4! Sandeep would love your support.", "in", true);
          } else if (wardUnion) {
            setResult("That address looks to be outside Wards 3 & 4 — but everyone's welcome to pitch in. Sandeep would love your support.", "out", true);
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
