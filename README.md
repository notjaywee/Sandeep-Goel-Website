# Sandeep Goel — Campaign Website

Static one-page site for Sandeep Goel, City of Brampton Regional Councillor candidate for Wards 3 & 4. Plain HTML/CSS/JS — no framework, no build step.

## File structure

```
index.html            all sections
css/style.css          brand tokens, layout, components, responsive
js/main.js              nav, countdown, scroll reveal
js/ward-map.js          MapLibre map, ward boundary, landmarks, address lookup
js/volunteer.js         task-card selection + Google Forms submit
js/gallery.js           fetches data/gallery.json, renders "Out in the Ward" masonry grid
data/wards-3-4.geojson  combined Ward 3 + 4 boundary polygon
data/gallery.json       gallery photo manifest (file, width, height, alt) — add photos here
images/gallery/         gallery photos referenced by data/gallery.json
images/icons/favicon.svg
brand_assets/            build brief + campaign literature photos
```

## Local preview

Any static file server works, e.g.:

```
npx serve .
```
or
```
python -m http.server 5500
```

Then open the printed localhost URL. No install/build step is required.

## Known placeholders — swap before launch

- **Headshot, hero video** — currently styled placeholder blocks. Drop real files into `images/` (same crop/aspect ratio as the placeholder containers) and swap the `<img>`/`<video>` sources in `index.html`.
- **Gallery photos** — done. Add new photos by dropping a file in `images/gallery/` and an entry in `data/gallery.json` (file, width, height, alt); no HTML changes needed. `js/gallery.js` renders them into a masonry grid.
- **Ward boundary polygon** (`data/wards-3-4.geojson`) — hand-built from the campaign literature's own map plus a couple of verified address geocodes, *not* pulled from an authoritative GIS source (Brampton GeoHub's dataset page is JS-rendered and its published data is dated Dec 1, 2014; OpenStreetMap Nominatim doesn't do precise street-intersection geocoding). Treat this as a close visual approximation and do a final verification pass — ideally against the City of Brampton's current official boundary file — before relying on the "Are We Neighbours?" tool as authoritative.
- **Storefront pin** — not added; send the name/address to add a third landmark marker in `js/ward-map.js`.

## Deployment (handled outside this session — git isn't installed on this machine)

1. Install Git (and optionally the GitHub CLI) if not already present.
2. `git init`, commit, create a GitHub repo, and push.
3. In Netlify: "Add new site" → "Import an existing project" → connect the GitHub repo. No build command needed; publish directory is the repo root.
4. Volunteer form: submits to Google Forms (see the `GOOGLE_FORM` config block at the top of `js/volunteer.js`). Submissions should route to voteforsandeep@gmail.com — set this up as an email notification on the Form's Responses tab (or an onFormSubmit Apps Script on the response Sheet if the Form isn't owned by that account), since the site's fetch() call can't control where Google routes the notification.
5. DNS: in GoDaddy, point votesandeepgoel.ca's DNS at Netlify using the records Netlify provides under Domain settings (GoDaddy stays the registrar).
