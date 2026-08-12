# Sandeep Goel Website — Revision Document (v3, self-contained)

For Claude Code: this is the complete, current punch list for the already-built site. It fully replaces any earlier revision notes — work from this file only.

---

## 1. Header (nav bar)

- Replace the current stacked badge (SANDEEP GOEL 🍁 + small "Regional Councillor / Wards 3 & 4" role-row) with a single clean text wordmark reading just **"Sandeep Goel"** — same visual weight and positioning as Dev Vashi's header logo. No badge styling, no role-row subtext.
- Header background: navy (`#1B2A52`).
- Nav links unchanged: About / Issues / Election Info / Are We Neighbours? / Gallery / Get Involved (CTA button).
- Add social icon slots matching Dev Vashi's header layout: X, Facebook, YouTube, Instagram. **Only Facebook links anywhere for now** (/votesandeepgoel) — the rest are visual placeholders until other handles are confirmed.

## 2. Typography and component scale

- Bring H1 up from 67.2px to roughly 120px, and H2 from 38.4px to roughly 67px, to match Dev Vashi's poster-scale positioning. Body text (24px) stays as-is.
- Buttons: change from the current full pill (999px radius + red glow shadow) to 10px soft-rounded rectangles, no glow, matching Dev Vashi's flatter button treatment.
- Inputs: change from 8px radius + visible border to 10px radius, no border, no shadow, for consistency with the button change.
- Loosen the spacing rhythm from the current tight base unit (4) toward something closer to Dev Vashi's more generous rhythm (12).

## 3. Hero

- Content unchanged: headline ("A Stronger Brampton. A Better Future."), "Listening. Leading. Delivering.", "It's time. Vote for Change.", Get Involved / Meet Sandeep CTAs.
- Typography scale fix from Section 2 applies here directly — this is where it matters most.
- Horizontal video plays as the autoplay muted background loop, same mechanism as Dev Vashi's hero.

## 4. Countdown

- No changes. Simple, non-interactive ticking band to October 26, 2026.

## 5. Bio section — full replacement

Replace the current bio entirely with the text below. This is the final, approved version — condensed from the full source letter, written in first person, no em dashes, structured as a story rather than a list of dates:

> Hello friends,
>
> My name is Sandeep, and I'm honoured to be your candidate for Regional Councillor in Wards 3 and 4.
>
> I'm not a career politician. I'm a husband, a father of two, an entrepreneur, and I've called Ward 4 home since 2005. My story is one a lot of Brampton families will recognize.
>
> I came to Canada in 2002 with ten years of experience as an electrical engineer in India. Like a lot of newcomers, I started over from scratch, working as a warehouse associate while I figured out how to build a life here. In 2004, I earned my trade licence and joined Litens Automotive as a maintenance technician, where I spent the next ten years. That same year, my wife Nisha and I opened our own business, Goel Travels, right here in Ward 4. Running a small business taught us what families and entrepreneurs are actually up against every day.
>
> This community has raised my kids alongside me. I've watched Ward 4 change over the years, and I understand what local families, seniors, and small business owners need, because I've lived it, not just heard about it in a briefing.
>
> In 2016, I sat on the Blue Ribbon Committee and pushed for a full university right here in Brampton, because our young people deserve that close to home. In 2022, I received the Inspirational Award, and I currently serve as a Brampton Business Ambassador. Outside of that, I'm just a guy who loves hockey and cricket, living with my wife Nisha and my mother, trying to build a safe, welcoming neighbourhood for every generation in it.
>
> I'm running because Wards 3 and 4 deserve a councillor who's accessible, accountable, and actually focused on results, someone who listens first and shows up when it counts. This is personal for me. It's the neighbourhood that raised my kids and built my business.
>
> I'm asking for your trust and your vote, so together we can build a stronger, safer, more affordable Brampton for everyone.
>
> Thank you, and I look forward to meeting you out there.
>
> **Vote Sandeep**
> Candidate for Regional Councillor, Wards 3 & 4, Brampton

## 6. Video embed (separate component from the hero background)

- A vertical YouTube Short embedded in a colored "mat" frame next to the bio, same component Dev Vashi uses (`.short-frame` / `.short-mat` / `.short-embed`), but with a **navy blue** mat/backdrop instead of red.
- The horizontal video is the ambient hero background only. A separate link to watch the full video goes straight to the YouTube Shorts URL rather than building a second player.

## 7. Gallery ("Out in the Ward")

- Source: nomination rally photo coverage, including photos of other attendees, not just Sandeep.
- Interactive gallery format (Dev Vashi's auto-scrolling marquee pattern, or similar).
- Add a pull-quote adapted from Dev Vashi's "The neighbours here are not constituents. They are family." Use **21 years in Ward 4 (since 2005)** as the tenure figure.

## 8. Priorities/Values — restructure to Dev Vashi's numbered "lead + receipts" pattern

3 lead + 4 support, confirmed:

**Lead (3):**
1. More Job Opportunities for Youth
2. Better Health Services & Peel Memorial Completion
3. University for Brampton

**Support (4):**
4. Safe & Vibrant Neighbourhoods
5. Working to Keep Property Taxes Affordable
6. The Residential Rental Licensing (RRL)
7. Hire City Employees from Brampton

Adapt Dev Vashi's "01 lead card + numbered support list + receipts CTA" pattern for this 3+4 split.

## 9. Ward map section

- Functionality unchanged.
- Apply the Section 2 typography scale fix to the heading here too.

## 10. Follow-along

- Reserve the section/space only. No live embed yet — empty placeholder container, to be wired up later.

## 11. Confirmed unchanged

- No news section.
- No email signup block.
- Election Info stays before the ward map section (already correct).
- "Pick a Way to Help" section stays as-is.

## 12. Footer — full replacement, mapped directly from Dev Vashi's footer layout

Same structure as Dev Vashi's footer (thin accent-red bar across the top, dark navy background, three-column layout, divider, bottom row):

- **Left column:** "Sandeep / Goel" stacked text wordmark. Below: "Candidate Sandeep Goel, Regional Councillor, Wards 3 & 4, Brampton." Below: voteforsandeep@gmail.com, then 416-417-0230.
- **Center column:** "Follow Sandeep" label, four circular social icon slots below (X, Facebook, YouTube, Instagram) — same Facebook-only-live caveat as the header.
- **Right column:** "Privacy Policy" link (placeholder href for now, to be wired to a real document later). Below: "Candidate Sandeep Goel, Regional Councillor, Brampton, Wards 3 & 4, authorized by the Sandeep Goel campaign."
- Thin horizontal divider.
- **Bottom row:** "© 2026 Sandeep Goel campaign." left-aligned. "Site by 4Sight Media" right-aligned (optional — omit if you'd rather not credit the agency here).

## Open items still needing your confirmation

- [ ] Button/input shape change (pill → 10px rounded rectangle) — confirmed direction unless you say otherwise
- [ ] Gold accent color — add as a third brand color, or stay navy/red only
- [ ] Any social handles beyond Facebook that should actually link
- [ ] Include the "Site by 4Sight Media" footer credit, or omit it
- [ ] Privacy Policy — real document to link later, or leave as placeholder indefinitely
