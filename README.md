# Sandeep Goel — Campaign Website

Static one-page site for Sandeep Goel, City of Brampton Regional Councillor candidate for Wards 3 & 4. Plain HTML/CSS/JS — no framework, no build step.

## File structure

```
index.html            all sections
css/style.css          brand tokens, layout, components, responsive
js/main.js              nav, countdown, scroll reveal
js/ward-map.js          MapLibre map, ward boundary, landmarks, address lookup
js/volunteer.js         task-card selection + Netlify Forms submit
data/wards-3-4.geojson  combined Ward 3 + 4 boundary polygon
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

- **Headshot, hero video, gallery photos** — currently styled placeholder blocks. Drop real files into `images/` (same crop/aspect ratio as the placeholder containers) and swap the `<img>`/`<video>` sources in `index.html`.
- **Ward boundary polygon** (`data/wards-3-4.geojson`) — hand-built from the campaign literature's own map plus a couple of verified address geocodes, *not* pulled from an authoritative GIS source (Brampton GeoHub's dataset page is JS-rendered and its published data is dated Dec 1, 2014; OpenStreetMap Nominatim doesn't do precise street-intersection geocoding). Treat this as a close visual approximation and do a final verification pass — ideally against the City of Brampton's current official boundary file — before relying on the "Are We Neighbours?" tool as authoritative.
- **Storefront pin** — not added; send the name/address to add a third landmark marker in `js/ward-map.js`.

## Deployment (handled outside this session — git isn't installed on this machine)

1. Install Git (and optionally the GitHub CLI) if not already present.
2. `git init`, commit, create a GitHub repo, and push.
3. In Netlify: "Add new site" → "Import an existing project" → connect the GitHub repo. No build command needed; publish directory is the repo root.
4. Netlify Forms: the `get-involved` form already has `data-netlify="true"` and a honeypot field, so Netlify will pick it up automatically on deploy — no extra config needed. Submissions route to whatever email is set under Site settings → Forms → Form notifications (set this to voteforsandeep@gmail.com).
5. DNS: in GoDaddy, point votesandeepgoel.ca's DNS at Netlify using the records Netlify provides under Domain settings (GoDaddy stays the registrar).
