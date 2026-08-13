# Sandeep Goel — Website Revisions v8

Covers six areas: About section video embed, footer icon/spacing fixes, header X→TikTok swap,
key issues reorder, volunteer form backend swap, full map redesign, and the full-name update
(Sandeep Kumar Goel) — the last of which touches the header and map sections below, so it's
folded in rather than kept separate. Read alongside v5–v7 (header work, still standing) and the
bio update doc (content, already shipped).

One open item at the bottom, not yet spec'd — needs a screenshot before it can be built.

---

## 1. About section — live shorts embed

Currently showing a placeholder card ("SHORT — DROP-IN PENDING" with a static play icon) and a
plain underlined text link below it ("WATCH THE FULL VIDEO ON YOUTUBE SHORTS").

Replace with a live embed matching devvashi.ca's pattern exactly:
- Vertical video card with rounded corners, subtle drop shadow
- Channel avatar + name header bar ("Sandeep Kumar Goel" in place of "Dev Vashi" — see section 6)
- Video title overlaid top area
- Center play button overlay on the thumbnail
- Small circular link/share icon anchored bottom-left of the card

This needs the actual video asset or YouTube Shorts URL to embed — build the component now so
it's ready to receive that link the moment it's supplied, rather than waiting to build the
component until the asset lands.

## 2. Footer

- **Facebook icon is broken** — same category of bug as the header icon fixes in v6 (wrong
  glyph/asset, not the real "f" mark). This is a separate implementation from the header, so
  the earlier fix didn't carry over here — confirm whether footer icons and header icons are
  sharing a component. If they're not, that's worth fixing structurally (one shared icon
  component instead of two independent ones) so this stops recurring every time an icon changes.
- **Replace X with TikTok.** Same swap needed here as the header (see 2a below) — TikTok goes
  in X's old slot, then gets moved to be the **last** icon in the row: Facebook, Instagram,
  YouTube, TikTok.
- **Fix footer spacing and sizing.** General layout pass — column widths, vertical rhythm, and
  spacing between the wordmark/social/legal columns are currently off. Reference the locked
  footer spec: thin gold bar top border, dark navy background, three columns (wordmark +
  candidate line + contact info / "Follow Sandeep" + social row / privacy + compliance line),
  bottom row for copyright + agency credit. Rebuild spacing to read balanced, not cramped or
  uneven, matching the polish level already applied to the header.

## 2a. Header — same X → TikTok swap

The header social row (already through three rounds of fixes in v5–v7) also has X and needs the
same swap: remove X, add TikTok, TikTok goes last. Apply the same sizing/ring-hover treatment
already established there — this is a content swap on an already-fixed component, not a rebuild.

## 3. Key issues — reorder (swap, not full reshuffle)

Swap the positions of **Working to Keep Property Taxes Affordable** and **Better Health
Services & Peel Memorial Completion**. Nothing else moves.

**New lead tier (3):**
1. More Job Opportunities for Youth
2. Working to Keep Property Taxes Affordable *(moved up)*
3. University for Brampton

**New support tier (4):**
4. Better Health Services & Peel Memorial Completion *(moved down)*
5. Safe & Vibrant Neighbourhoods
6. The Residential Rental Licensing (RRL)
7. Hire City Employees from Brampton

Update the numbered badges (01/02/03) on the lead cards to reflect the new order — the card
content/copy for each issue stays exactly as-is, this is a position swap only.

## 4. Volunteer form — switch to Google Forms

Replace the current Netlify Forms implementation with a Google Form. Confirmed field set stays
the same as already spec'd: name, phone, email, optional postal code, Ward 3/4 checkbox.
Submissions should still land wherever the campaign is checking (voteforsandeep@gmail.com, or
directly in Google Forms' own response sheet — confirm which with Sandeep's team since Google
Forms responses live in a Sheet by default, not an inbox).

Note: this swap is confirmed and ready to build. Separate from this — if the hosting location
itself is also changing (off Netlify onto GoDaddy's own hosting, not just the domain
registration), that's a bigger infrastructure change than this form swap and hasn't been
confirmed. Don't touch the deploy pipeline as part of this task — forms only.

## 5. "Are We Neighbours?" map — full redesign to match Dev Vashi

Current map reads as outdated and the boundary is hard to read against the busy default tile
style. Target: match devvashi.ca's map implementation as closely as possible, gold in place of
red, everything else the same. Keep the current landmark content (Gage Park, Flower City
Campus) — don't change what's pinned, only how the whole thing looks.

Specific deltas from current to target:

- **Basemap tile style.** Dev's map uses a muted, desaturated light basemap — Sandeep's
  current map uses a much busier default-style tile set (bright oranges/yellows for roads,
  heavier label density). Inspect devvashi.ca's live map to identify the actual tile source/
  style being used and match it exactly, not just visually approximate it.
- **Boundary line.** Dev's boundary is a clean line with little to no fill inside it. Sandeep's
  current version has a heavier semi-opaque gray fill muddying the interior, which is likely a
  chunk of the "impossible to read" complaint on its own. Match Dev's line treatment, recolor
  red → gold (`#FFB000`).
- **Logo badge.** Dev's map has an actual branded wordmark badge in the top-left corner (his
  logo lockup), not a plain text pill. Sandeep's currently shows a generic rounded "Sandeep
  Goel" text pill. Replace with a proper branded badge matching Dev's treatment and positioning,
  in Sandeep's navy/gold — using the full name per section 6 below. Given the tight corner
  placement, if "Sandeep Kumar Goel" doesn't fit gracefully on one line even after sizing it
  down, a stacked lockup (mirroring how Dev's badge stacks "Dev" over "Vashi") is a reasonable
  fallback — flag back rather than forcing the full name into a cramped single line.
- **Landmark pins.** Keep Gage Park and Flower City Campus as the two pinned locations — match
  Dev's pin badge shape/sizing/treatment exactly, recolored to fit Sandeep's palette.
- **Sidebar layout.** Dev's sidebar is a simpler structure: heading, short intro paragraph,
  one bordered card containing the address input + button, privacy note below. Sandeep's
  current sidebar has an additional color-swatch legend (boundary / landmark pins) that Dev's
  doesn't have. Match Dev's structure — **open question, flag back before removing the legend
  outright:** the legend may be doing real work for two different pin types even if Dev's
  version doesn't need one (his map may only have one type of marker). Build it matching Dev's
  layout, but check whether dropping the legend actually loses clarity here before finalizing.
- **Bottom-left "Official Boundary" badge, zoom controls, attribution.** Match Dev's exact
  styling and positioning, recolored to gold where his is red.

## 6. Full name update — Sandeep Kumar Goel

Replace every instance of the full name **"Sandeep Goel"** with **"Sandeep Kumar Goel"**
site-wide.

**Exception — first-name-only branding stays as-is.** Moments like "Vote Sandeep," "Follow
Sandeep," "Meet Sandeep" are stylistic CTAs, not identity statements — leave those alone. This
is an assumption, not a confirmed instruction: flag back if the full name should replace those
too.

**Unchanged:** the domain (votesandeepgoel.ca) and email (voteforsandeep@gmail.com) stay as
registered infrastructure — these don't change just because the display name is getting longer.

**Locations to update:**

1. **Header wordmark (nav).** Flag before touching: this is a meaningfully longer string than
   what the last three rounds of header sizing work (v5–v7) were tuned around. Verify the
   wordmark still fits cleanly at the current font-size/letter-spacing without breaking the
   balance already established. If it doesn't fit gracefully, adjust the wordmark's own
   font-size or tracking specifically — don't reopen the overall header height/spacing to solve
   this.

2. **Footer wordmark + candidate line** (left column — see section 2).

3. **Compliance / "authorized by" line.** This is language governed by the Municipal Elections
   Act. The name used here should match whatever's officially registered/filed for the
   campaign — confirm against the actual registration paperwork before finalizing, since this
   carries legal weight beyond brand consistency. Don't treat this as a simple find-and-replace
   without that check.

4. **Map wordmark badge** — see section 5 above, same fallback logic applies (stacked lockup if
   the full name doesn't fit cleanly).

5. **Page title / meta tags,** if the full name is used there — check and update for SEO
   accuracy if applicable.

---

## Verification checklist

- [ ] Shorts embed component built and matches Dev's card layout, ready to receive the video
      asset when supplied
- [ ] Footer Facebook icon shows the correct mark
- [ ] X removed from both header and footer, TikTok added in both, TikTok last in both rows
- [ ] Footer spacing/sizing rebuilt and matches the polish level of the header work
- [ ] Key issues: Property Taxes and Peel Memorial Hospital positions swapped, badge numbers
      updated, no other cards moved or edited
- [ ] Volunteer form running through Google Forms, same field set, confirmed submission
      destination
- [ ] Map: tile style, boundary line, logo badge, pins, and sidebar all matched against
      devvashi.ca side by side, gold in place of red throughout
- [ ] Legend question resolved (kept or cut) rather than silently dropped
- [ ] Every full-name instance updated; first-name-only branding moments left untouched
- [ ] Header wordmark fits cleanly with the longer name — existing header balance from v5–v7
      not broken
- [ ] Compliance line wording checked against actual campaign registration, not just visually
      swapped in
- [ ] Map badge carries the full name at a size that fits, or flags back if a stacked lockup is
      needed instead
- [ ] Meta/page title checked and updated if the name appears there

---

## Open item — not yet spec'd

"Replace this with gold buttons with navy accents instead of white with gold outline, so it
goes well with the rest of the 4 topics that are in navy" — need a screenshot of the specific
button/section being referenced before this can be written up. Not included in this round.
