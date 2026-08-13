# Claude Code Kickoff — Sandeep Goel v8 (paste as-is)

```xml
<task>
Ship the still-open items from sandeep-goel-website-revisions-v8.md. Locate that file in the
repo and read it directly — do not ask for its contents to be pasted, and do not summarize it
back before starting. Work section by section in the order given below, verifying each against
its own checklist entries before moving to the next.
</task>

<context>
This repo already carries three completed rounds of header polish (v5, v6, v7 — same directory
as v8). Those are done and working. v8 is the next unshipped batch: About section video embed,
footer fixes, header icon swap, key issues reorder, form backend swap, and a full map redesign,
plus a full-name update that touches two of those sections directly.

Reference site: https://devvashi.ca — use it directly. You have browser access. For anything
requiring visual or structural matching (the map, the header wordmark, icon treatment), fetch
the live page and inspect actual computed values — tile source, font-size, spacing, color —
rather than approximating from description. Three earlier rounds on this repo lost time to
guessed pixel values that didn't match reality; don't repeat that here now that you can check
directly.
</context>

<scope>
In scope: v8 sections 1 through 6 exactly as written in the file.
Out of scope: v5–v7 header sizing, spacing, and hover CSS — already shipped, don't touch it
except where v8 sections 2a and 6 explicitly require a change (icon swap, wordmark length).
Also out of scope this round: the bio update doc, and the unresolved "gold buttons" item noted
at the bottom of v8 — that one has no spec yet and is intentionally excluded.
</scope>

<execution_order>
Work in this sequence. Later steps depend on earlier ones being correct first.

1. Full-name update (v8 §6) — global replacement of "Sandeep Goel" → "Sandeep Kumar Goel"
   everywhere except first-name-only branding moments (Vote Sandeep, Follow Sandeep, etc.).
   Handle every location except the header wordmark and map badge — those are sized/fit
   decisions, deal with them in steps 2 and 6 respectively, once the surrounding component work
   is already in progress.

2. Key issues reorder (§3) — swap Property Taxes and Peel Memorial Hospital positions. Content
   and copy unchanged, position and badge numbers only.

3. Footer (§2) — fix the Facebook icon, swap X for TikTok with TikTok last in the row, rebuild
   spacing. Apply the full name from step 1 to the footer wordmark and candidate line while
   you're in this component.

4. Header icon swap (§2a) — same X → TikTok swap as the footer, same final position. Then check
   the wordmark against the longer full name from step 1: does it still fit cleanly at current
   sizing? Adjust the wordmark's own font-size or tracking only if it doesn't. Do not adjust
   overall header height or spacing to solve this.

5. Volunteer form (§4) — swap Netlify Forms for Google Forms, same field set (name, phone,
   email, optional postal code, Ward 3/4 checkbox). This needs an actual Google Form URL to
   wire up — if one hasn't been supplied, build the integration up to that point and flag
   clearly what's needed to finish it, then move on rather than blocking here.

6. About section shorts embed (§1) — build the component to match devvashi.ca's card pattern.
   This needs a video asset/URL to go live — same handling as step 5: build the shell, flag
   what's needed, move on.

7. Map redesign (§5) — the largest item, done last since it benefits from every other section
   already being settled. Match devvashi.ca's actual implementation: tile style, boundary line,
   logo badge (using the full name from step 1, with the stacked-lockup fallback noted in the
   spec if it doesn't fit on one line), pins, sidebar structure. The legend question in the spec
   is a flagged decision, not a default — resolve it deliberately, don't drop it silently.
</execution_order>

<method>
Plan before implementing each section, not just once at the start. A short plan per section is
enough — file(s) touched, the specific rule from v8 being applied, expected diff size. Then
implement, then verify against that section's checklist entries in the v8 file before marking
it done and moving to the next section.

For anything visual (map, wordmark, icons), pull the actual value from devvashi.ca first,
apply it, then compare. Don't submit a visual match on the basis of the written description
alone when the live reference is one fetch away.
</method>

<rules>
- Don't touch the deploy pipeline (GitHub → Netlify → GoDaddy DNS) as part of the form swap in
  step 5 — forms only, infrastructure is out of scope here.
- The compliance/"authorized by" line in the footer needs the full name checked against actual
  campaign registration, not just visually swapped in — flag this back rather than assuming
  it's correct.
- Don't drop the map's color-swatch legend without a deliberate check on whether it's still
  needed for the two pin types — this is called out as an open question in the spec, not a
  default to overwrite.
</rules>

<output>
Commit per section, not one giant commit — keeps rollback clean if something needs fixing.
End with a short summary: what shipped, what's blocked pending an asset (video URL, Google Form
URL) or a decision (legend, compliance line confirmation), and nothing else — no need to
re-explain what the spec file already says.
</output>
```
