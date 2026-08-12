# Sandeep Goel — Website Revisions v5 (Header Rebuild)

Supersedes nothing structural from v4 — this is a scoped follow-up focused entirely on the
header bar: sizing/spacing, the broken X icon, the gold color swap, and rebuilding the hover
system to match Dev Vashi's pattern instead of the current flat yellow fill.

Reference screenshots (attached in session, describe to Claude Code as "reference images" if
pasting into a fresh session — file paths below assume they're saved alongside this doc):
- `ref-devvashi-header-default.png` — Dev Vashi header, resting state
- `ref-sandeep-header-current.png` — Sandeep header, current broken state
- `ref-devvashi-nav-hover.png` — Dev's "Home" link on hover (white pill, red text)
- `ref-devvashi-social-hover.png` — Dev's X icon on hover (white circle, red icon, ring pop)
- `ref-sandeep-social-broken.png` — Sandeep's current icon hover ("yellow mush" bug)

---

## 1. Color token: gold accent

Old yellow is being replaced outright, not adjusted. Formalize it as a real custom property
(this was already flagged as owed from the last round):

```css
:root {
  --accent-gold: #FFB000;
}
```

Sweep every hardcoded yellow value in CSS/inline styles (Get Involved button, tagline accent,
any heading highlights) and point them at `var(--accent-gold)`. No hardcoded hex left behind.

## 2. Header bar: sizing and spacing

Current header reads too tall and the internal groups (logo / nav links / social icons / CTA)
aren't on a consistent rhythm — gaps look ad hoc rather than intentional.

- Reduce header vertical padding by roughly 15–20% from current. Target something visually
  closer to Dev Vashi's header proportions (compact, single-line, no crowding) — use Dev's
  live header as the literal ruler: open both side by side and match the ratio of header
  height to logo height.
- Put the three internal groups (nav links, social icons, CTA button) on a shared `gap` token
  rather than individual margins — this is almost certainly why the spacing reads uneven right
  now (mismatched margins compounding instead of one consistent scale).
- Vertically center everything against the logo's baseline, not the tallest element.

## 3. Nav link hover — rebuild to match Dev's "white pill" pattern

This replaces whatever hover rule currently fires "yellow mush" on the text links (About,
Issues, Election Info, Are We Neighbours?, Gallery).

**Behavior:** on hover/focus, the nav item's background fills solid white, and the text color
switches to the footer's navy (`#1B2A52`). No yellow involved in this interaction at all — the
gold is reserved for the CTA button and accent moments, not link hover.

```css
.nav-link {
  position: relative;
  padding: 8px 18px;
  border-radius: 10px; /* matches site's existing button radius */
  color: #FFFFFF;
  text-decoration: none;
  transition: background-color 0.25s ease, color 0.25s ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  background-color: #FFFFFF;
  color: #1B2A52;
}
```

**Also:** find and remove whatever is drawing the gold underline currently sitting under
"ABOUT" (ref: `ref-sandeep-header-current.png` close-up) — likely a `border-bottom` or
`text-decoration: underline` tied to `:hover` or an `.active` class. Delete it site-wide across
every header button/link. The white-pill fill above is the only hover treatment needed; nothing
else should be layered under it.

## 4. Social icons — rebuild with the "ring pop" from Dev's site

This is the piece currently showing as a solid yellow disc with no visible icon (the "mush").

**Default (resting) state:** icon glyph shown clean in white, no filled disc behind it — let it
sit directly on the navy header the way Dev's icons sit directly on his red header. Nothing to
fill in at rest; the circle only becomes visible on interaction.

**Hover/focus state, per your spec — navy fill + white icon + an opaque ring popping outward:**

```css
.social-icon {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #FFFFFF;
  overflow: visible;
  transition: background-color 0.25s ease, color 0.25s ease;
}

.social-icon::before {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.social-icon:hover,
.social-icon:focus-visible {
  background-color: #1B2A52;
}

.social-icon:hover::before,
.social-icon:focus-visible::before {
  opacity: 1;
  transform: scale(1);
}
```

Note on the navy-on-navy question: because the header background is already navy, a flat navy
fill alone won't read as a distinct "pop" the way Dev's white-on-red hover does. The ring
(`::before`) is what carries the pop here — confirm visually once built that the ring plus the
icon flipping to full white against the now-solid circle is enough contrast against the header.
If it reads too subtle in practice, the fallback is using the secondary navy
(`#4D5567`) for the fill instead of the primary, which will show a visible seam against the
header's `#1B2A52`. Flag it back rather than guessing — this is the one spot in this doc where
the literal instruction (navy-on-navy) could end up low-contrast depending on how it renders.

## 5. Fix the X icon

The X (Twitter) logo has been replaced by a fallback character instead of the actual mark —
almost certainly a missing/broken icon reference (icon font glyph that didn't load, or a text
character used as a placeholder that never got swapped for the real SVG). Pull the same X logo
mark used elsewhere on the brand (Dev's site has a working reference — same SVG, same stroke
weight as the Facebook/Instagram/YouTube icons beside it) and confirm it renders correctly at
both default and hover state, not just default.

## 6. "Get Involved" CTA — bigger, evenly spaced

```css
.cta-button {
  padding: 14px 32px; /* up from current — confirm against live computed value first */
  font-size: 15px;
  border-radius: 10px;
}
```

Keep the existing lift + drop-shadow hover interaction already locked from the prior round —
this button isn't getting the white-pill treatment, it stays gold, just bigger and with more
breathing room on both axes so it doesn't read cramped next to the nav group.

---

## Verification checklist before calling this done

- [ ] Every yellow instance site-wide traced to `var(--accent-gold)`, none hardcoded
- [ ] Header height/spacing visually matched against devvashi.ca side by side
- [ ] Nav link hover: white pill + navy text, no yellow, no underline, on all five nav items
- [ ] Underline artifact confirmed gone in both resting and hover states
- [ ] Social icons: clean at rest (no disc), navy + white icon + visible ring on hover, tested
      on all four platforms (X, Facebook, Instagram, YouTube icon slots)
- [ ] X icon renders as the actual logo mark at rest and on hover — not a fallback character
- [ ] Get Involved button resized, spacing rebalanced, existing lift/shadow hover preserved
- [ ] All hover states also confirmed on `:focus-visible` for keyboard nav, not just mouse hover
- [ ] Checked at mobile width — hover-based interactions need a sane tap equivalent, confirm
      nothing depends on hover-only to be usable on a phone

---

## Claude Code kickoff prompt (paste as-is)

```xml
<task>
Rebuild the Sandeep Goel site header per sandeep-goel-website-revisions-v5.md.
Start in plan mode. Do not write code until the plan is confirmed.
</task>

<context>
Reference site: https://devvashi.ca (live, same agency, same component patterns this site
was structurally derived from). Current site: this repo, deployed at
https://meek-paprenjak-dd9be6.netlify.app/
</context>

<plan_first>
1. Locate the header component and its stylesheet.
2. Identify the current hover rule producing the flat yellow fill on nav links and social
   icons — confirm this is the rule to replace, not a different one.
3. Identify what's drawing the underline under nav items (likely border-bottom or
   text-decoration tied to hover/active state) and confirm removal scope.
4. Identify the current X icon reference and confirm it's broken (missing asset, wrong
   glyph, or bad icon-font mapping).
5. Report back the plan before touching code: which files, which rules, expected diff size.
</plan_first>

<implement>
Follow sandeep-goel-website-revisions-v5.md sections 1–6 exactly. Use the CSS given as the
starting point, adapt only as needed to fit the existing component structure.
</implement>

<verify>
Run through every item in the "Verification checklist" section of the spec file. Take
before/after screenshots of the header at rest and on hover (desktop width and mobile width)
and confirm against the checklist explicitly, not just visually skimmed.
</verify>
```
