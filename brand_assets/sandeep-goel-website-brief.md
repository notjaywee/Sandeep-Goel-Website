# Sandeep Goel Campaign Website — Build Brief

**Candidate:** Sandeep Goel, Regional Councillor Candidate, City of Brampton, Wards 3 & 4
**Election:** October 26, 2026 (2026 Brampton municipal election)
**Domain:** votesandeepgoel.ca (registered on GoDaddy)
**Format:** One-page site, static HTML/CSS/JS (no framework, no build step)
**Reference builds:** devvashi.ca for structure/flow/interactions (hero, countdown, ward map, volunteer flow); Mandeep Forward 5's card-grid for the issues section, which handles a higher item count better than Dev Vashi's 3-pillar layout

Content and brand below are sourced directly from Sandeep's printed campaign literature (photographed and reviewed) plus the approved "Why I'm Running" video script. One open decision is flagged at the top — everything else is ready to build.

---

## 0. Open decision

**Tagline:** the literature uses *"Listening. Leading. Delivering."* as the tagline and *"A Stronger Brampton. A Better Future."* as the headline. A separate line, *"Just Vote for Change,"* was mentioned earlier for the website specifically. Default below is to use the literature's actual headline/tagline for brand consistency — say the word if "Just Vote for Change" should replace or sit alongside it instead.

---

## 1. Tech stack & deployment

- Plain static HTML/CSS/JS. No Astro, no framework, no build pipeline.
- **Repo:** GitHub (Claude Code creates and pushes to this).
- **Hosting:** Netlify, connected to the GitHub repo for auto-deploy on every push.
- **Domain:** GoDaddy stays the registrar only. DNS is pointed at Netlify (one-time change, Netlify provides the exact records).
- **Forms:** Netlify Forms (native `<form data-netlify="true">` handling) — no backend/serverless code needed. Submissions route to voteforsandeep@gmail.com.

## 2. Confirmed build decisions

| Item | Decision |
|---|---|
| Starting point | Fresh build — no existing live site |
| Countdown to election day | Yes — live ticking band to Oct 26, 2026 |
| Social feed (Instagram/YouTube grid) | Skip |
| News section | Skip |
| Email signup block | Skip — contact form covers it |
| Donate button | Skip for now — Stripe form isn't built yet |
| Contact/volunteer section | Full "pick a way to help" card flow, devvashi.ca structure |
| Ward boundary data | Brampton GeoHub "Ward Boundaries" dataset — confirmed current for 2026; cross-check against the street-boundary description below |
| Ward display | Wards 3 & 4 shown as **one combined boundary** |
| Photos/headshots | Files exist and are ready, but **use placeholders in the initial build** |

## 3. Brand & visual identity (from the literature)

**Colors** (estimated from the photographed flyer — confirm against the original design file if exact matching matters for print/digital consistency):
- Navy blue (primary) — approx. `#1B2A52`
- Red (secondary/accent) — approx. `#C8102E`
- Gold/yellow (tertiary accent, used sparingly for emphasis text) — approx. `#F2C230`
- White background, dark navy text on white for body copy

**Recurring visual motifs:**
- A small red maple leaf icon appears twice on the flyer — worth carrying through as a recurring accent (favicon, footer, section dividers)
- A "name-plate" badge treatment — "SANDEEP GOEL [maple leaf] / REGIONAL COUNCILLOR / WARDS 3 & 4" stacked in a signage-style block — this could translate well into the site's logo lockup or hero badge
- Section headers use solid navy bars with white text; the flyer alternates navy/red/gold for headline text to create visual rhythm across sections

**Fonts:** not specified on the flyer — recommend a clean, high-legibility sans-serif for body copy (e.g., Inter or Work Sans) and a bold condensed face for big headlines, consistent with the flyer's bold all-caps section headers.

## 4. Hero section

- **Headline:** "A Stronger Brampton. A Better Future." (pending tagline decision above)
- **Subhead/tagline:** "Listening. Leading. Delivering."
- **Formal title:** "City of Brampton Regional Councillor Candidate for Wards 3 & 4" — use in meta description and hero eyebrow text, matching how Dev Vashi's site frames his race in its title tag
- **Video:** ready in both orientations — horizontal for the desktop background loop, vertical for mobile / embedded short
- CTA buttons: Get Involved / Meet Sandeep

## 5. "Who is Sandeep" — bio

Blended from the flyer's three official points and the richer personal narrative already approved in the video script, so the website has more depth than the flyer without contradicting it:

> Sandeep Goel is a devoted father and entrepreneur who has lived and worked in Ward 4 for most of his life. He came to Canada nineteen years ago with ten years of experience as an engineer, and started over — working in a warehouse to build a new life here. He went on to build a career at Litens Automotive, and in 2015, Sandeep and his wife Divya opened their own business right here in Ward 4.
>
> Having watched this community grow and change over the years, Sandeep understands the priorities of local families, seniors, and small businesses — because he's lived them. He's proud to be raising his own family here.
>
> Sandeep isn't running to be a politician. He believes in listening to residents, finding practical solutions, and working together — someone who shows up, and fights for what's fair for a stronger, safer, and more prosperous Brampton.

**TODO:** confirm as-is, or edit.

## 6. My Commitment to You

Direct from the flyer, as a five-item trust strip (icon + short line each) — works well as a band between the bio and the issues section:

1. I will listen to your concerns.
2. I will be accessible and responsive.
3. I will work with honesty and transparency.
4. I will put community first.
5. I will deliver real results.

## 7. Key Issues (7 items, grid layout)

The flyer has seven issues — too many for Dev Vashi's 3-pillar "lead + support" layout, so this uses a clean grid instead (closer to Mandeep's 6-card pattern, extended to 7). Each is smoothed into a fuller sentence for the website — same commitments, no new policy claims added beyond what's on the flyer:

1. **Safe & Vibrant Neighbourhoods** — Stronger community partnerships, more visible policing, and smart solutions to keep our neighbourhoods safe.
2. **More Job Opportunities for Youth** — Creating pathways, partnerships, and real opportunities for tomorrow's leaders right here in Wards 3 & 4.
3. **Working to Keep Property Taxes Affordable** — Advocating for responsible spending and full financial transparency at City Hall.
4. **The Residential Rental Licensing (RRL)** — Responsible homeowners should be treated with trust and respect, not unnecessary regulation.
5. **Better Health Services & Peel Memorial Completion** — Fighting for improved health services and the completion of Peel Memorial Hospital.
6. **University for Brampton** — Continuing to advocate and work for a university presence that gives our youth more opportunity close to home.
7. **Hire City Employees from Brampton** — Supporting local hiring and creating local jobs, keeping opportunity in the community.

Minor observation, not a blocking decision: on the flyer, three of these (Job Opportunities for Youth, Health Services, University for Brampton) are set in red headline text while the other four are navy — could be intentional emphasis. Flat 7-card grid is the simple default; say the word if you want 3 of these pulled out as "lead" priorities instead.

## 8. Election Information (new section, not on either reference site)

Real, useful, and grounded directly in the flyer — good candidate for its own compact section or a strip near the footer:

- **Advance Voting:** Oct 9, 2026 (12pm–8pm) · Oct 10–11, 2026 (10am–5pm) · Oct 16, 2026 (12pm–8pm) · Oct 17, 2026 (10am–5pm)
- **Home Voting Service:** Oct 13–15, 2026, 8:30am–4:30pm
- **Election Day:** Oct 26, 2026, 10am–8pm

## 9. Ward map feature ("Are We Neighbours?" pattern)

Same mechanism as devvashi.ca:
- **Map engine:** MapLibre GL JS
- **Tiles:** OpenFreeMap (free, no API key)
- **Boundary:** GeoJSON polygon from Brampton GeoHub, Wards 3 & 4 merged into one outline
- **QA reference from the flyer's own map** — cross-check the pulled GeoJSON against these named streets before shipping:
  - Ward 4 bounded by Mississauga Rd (west), Queen St (north), McLaughlin Rd (east, shared border with Ward 3), Steeles Ave W, Mavis Rd, and 407 ETR (south)
  - Ward 3 bounded by McLaughlin Rd (west, shared border with Ward 4), Queen St (north), Dixie Rd (east), Hurontario St (internal), and 407 ETR (south)
- **Address/postal code lookup:** client-side geocoding via OpenStreetMap's Nominatim API, no server-side storage. Reuse the privacy copy: *"The lookup runs through OpenStreetMap's free address service. The campaign never sees or stores what you type."*
- **Attribution required in the map footer:** OpenFreeMap, © OpenMapTiles, Data from OpenStreetMap
- **Landmark pins:** Downtown Brampton / Gage Park (Ward 3 anchor), Flower City Community Campus, 8850 McLaughlin Rd S (Ward 4 anchor) — both verified during the shoot-location research. Optional third pin for Sandeep's business storefront if you send the name/address.

## 10. Photo/video gallery ("Out in the Ward")

Confirmed ready to hand off — build with placeholder images sized/cropped to match the real assets so the swap later is a drop-in replacement.

## 11. Contact / volunteer section — full spec

**Task cards** (pick one or more):
- Take a lawn sign
- Share online
- Deliver flyers
- Knock doors

Selecting a card updates a sign-up form below it with:
- Name (required)
- Phone (required, "fastest way to coordinate")
- Email (required)
- Checkbox: "I live in Ward 3 or 4" + optional postal code field
- Submit → Netlify Forms → voteforsandeep@gmail.com

**Direct contact info to display** (from the flyer):
- Phone: 416-417-0230
- Email: voteforsandeep@gmail.com
- Website: votesandeepgoel.ca
- Facebook: /votesandeepgoel

## 12. Compliance notes carried over from prior work

- Personal card charges for campaign expenses require documented reimbursement from the campaign bank account; records retained through November 2030.
- Filming/photos at Brampton City Hall grounds needs confirmation from the City Clerk on the exact "City Property" definition before use — public sidewalk is the safe fallback.
- The ward lookup tool's privacy design (no server-side storage of addresses) supports a clean compliance posture under Ontario's Municipal Elections Act.

## 13. Outstanding items before this goes to Claude Code

- [ ] **Tagline decision** (Section 0) — literature's tagline, "Just Vote for Change," or both
- [ ] Confirm or edit the blended bio (Section 5)
- [ ] Confirm the flat 7-issue grid, or specify 3 "lead" issues (Section 7)
- [ ] Exact hex/Pantone colors, if pixel-perfect matching to print matters
- [ ] Business storefront name/address, if you want it pinned on the map
- [ ] Logo file, if a standalone vector logo exists beyond the flyer's name-plate treatment

---

*This is ready to hand to Claude Code as-is once the tagline call is made — everything else has a locked default.*
