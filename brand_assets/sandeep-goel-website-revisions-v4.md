# Sandeep Goel Website — Revision Document (v4, self-contained)

Supersedes v3 entirely. Work from this file only.

---

## 1. Ward map — fix the boundary rendering (highest priority, functional bug)

The current map does not show a visible ward boundary polygon at all, despite the legend claiming a "Wards 3 & 4 boundary" line. The map also appears centered on the wrong area (Bramalea), which does not match the actual boundary streets from the campaign literature: Ward 4 is bounded by Mississauga Rd, Queen St, McLaughlin Rd, Steeles Ave W, Mavis Rd, and 407 ETR; Ward 3 is bounded by McLaughlin Rd, Queen St, Dixie Rd, Hurontario St, and 407 ETR. This places the wards in the southern part of Brampton near the Mississauga border, not near Bramalea.

- Re-pull and verify the Wards 3 & 4 GeoJSON boundary from Brampton's GeoHub dataset. Confirm it's the correct geometry by checking it against the street boundaries above.
- Confirm the polygon actually renders as a visible outline on the map, matching the legend.
- Center and zoom the default map view on the real combined boundary.
- Recolor the boundary outline to gold, per Section 2.
- Test the address checker against a few known real addresses inside and outside Wards 3 & 4 to confirm accurate results before considering this done.

**Visual treatment — the boundary data itself is now working, this is a styling pass to match Dev Vashi's actual map component:**
- Ward fill is currently a heavy, opaque gray covering the whole interior, making the underlying streets hard to read. Change to a light, semi-transparent tint so the map stays legible through the boundary area — the boundary should read primarily through the outline stroke, not a solid fill block.
- Landmark pins are currently plain teardrop markers. Restyle as labeled pill badges, matching Dev Vashi's "GO Meadowvale" / "GO Streetsville" pattern — e.g. a small badge with the landmark name attached to each pin, not a bare marker.
- Add a small wordmark watermark ("Sandeep Goel") overlaid in the top-left corner of the map itself, matching Dev Vashi's logo placement.
- Add an "Official Wards 3 & 4 Boundary" badge in the bottom-left corner of the map.
- Add a zoom-reset button (⟲) alongside the existing +/- zoom controls.
- Container structure: currently the whole section (heading, checker form, and map) is wrapped in one shared bordered card. Change to match Dev Vashi's structure — the map is its own independent card, while the heading and checker column sit directly on the page background with no shared outer box.

## 2. Colors — lock to gold, formalize as a real token

- Full accent swap: gold replaces red everywhere red currently serves as an accent color. This includes buttons, the countdown/election banner, the "Better Future" hero accent text, "Real Solutions," the issue lead-card numbers, the ward boundary outline, and all social icon hover states.
- Formalize gold as a proper CSS custom property rather than a hardcoded value scattered across individual elements. If gold is already hardcoded somewhere (the tagline, "TO YOU," "VOTE"), pull that exact existing hex and use it consistently as the new variable, rather than introducing a slightly different shade.
- Navy stays as the primary structural color (header, footer, section backgrounds). Red is removed as an accent color site-wide.

## 3. Buttons

- Add a hover interaction to every button: a slight lift plus a drop shadow, so buttons visibly pop out on hover rather than sitting flat.
- "Get Involved" CTA specifically: simplify to a clean flat gold button at rest, with the lift/shadow only appearing on hover.

## 4. Header

- Social icon order, left to right: Facebook, Instagram, YouTube, X.
- Social icon hover color: gold, not red.
- "Sandeep Goel" wordmark font, confirmed: Araboto Black. This isn't a standard Google Font, so it likely needs to be self-hosted (font files) rather than linked. Check whether the font files are available in the project already; if not, flag it back rather than silently substituting a fallback, since a close-but-wrong substitute would look like a mismatch next to the rest of the brand.

## 5. Bio section — fix the broken layout

- Remove the standalone headshot-style placeholder box entirely. It isn't in spec and is very likely what's causing the bad spacing between it and the video.
- Rebuild using Dev Vashi's actual component pattern (`.short-frame` / `.short-mat` / `.short-embed`): one single video element with a navy mat behind it creating a layered drop-shadow effect, in a two-column layout with bio text on the left and video on the right. Not stacked, not two separate boxes.
- Column proportions should match Dev Vashi's grid split (roughly 1fr text to 1.35fr video) so the text column doesn't feel underweighted.
- Remove "Hello friends," as the opening line of the bio.
- Confirm both the horizontal hero video and the vertical bio video are actually rendering live on the site, not placeholder boxes.

## 6. Gallery ("Out in the Ward") — redesign

- Current carousel reads as flat and plain. Rebuild closer to Dev Vashi's actual marquee: mixed wide and tall card sizes rather than uniform tiles, auto-scrolling, polaroid-style presentation.
- Placeholder tiles stay in place until real rally photos are supplied.
- Pull-quote, confirmed final text: "Twenty-one years ago, this ward gave my family a chance to build something. I want to give that same chance to the next family who needs it." This matches the "21 years in Ward 4 (since 2005)" figure used elsewhere on the page — both now consistent.

## 7. Section separation

- Increase the visual distinction between sections, particularly Follow Along into Pick a Way to Help, which currently reads as one continuous block instead of two distinct sections.
- Use background color changes, spacing, and/or dividers so each section reads as clearly separate, matching how strongly Dev Vashi's page distinguishes section to section.

## 8. Spacing — generous rhythm, full desktop and mobile audit

- Move the base spacing unit from 4 toward something closer to Dev Vashi's 12, applied consistently across the whole site, not just the sections already flagged.
- Full desktop audit: compare actual container max-widths, section padding, and viewport-height usage directly against Dev Vashi's live site, not just screenshots, and correct anywhere Sandeep's is running tighter.
- Full mobile audit takes priority over desktop polish, since most visitors will be on phones. Check breakpoints, tap target sizes, and confirm nothing overflows or crowds on narrow viewports.

## 9. Footer

- Add "Site by 4Sight Media" as the bottom-right credit line, matching Dev Vashi's "Site by Built to Rank."

## Status

Everything in this document is confirmed. Font is Araboto Black (self-host if not already in the project, flag back if unavailable rather than substituting). Red is removed as an accent everywhere with no exceptions. Gallery quote text is locked at "twenty-one years," matching the figure used elsewhere on the page. Ready to hand to Claude Code as-is.
