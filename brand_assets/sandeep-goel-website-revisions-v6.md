# Sandeep Goel — Website Revisions v6 (Header Patch)

Patches two items from v5 that came back wrong after the first pass. Read alongside
`sandeep-goel-website-revisions-v5.md` — everything else from that file (nav hover, underline
removal, header spacing, gold token) stands as-is. This only touches: the icon set, and the
header CTA.

Reference: hero section's "GET INVOLVED" button (navy text on gold, comfortably sized pill) is
the ground-truth style for the header CTA — they should look like siblings, not like two
different buttons that happen to share a color.

---

## 1. Icon set — broken Facebook glyph + inconsistent sizing

Two separate bugs showing up in the same row:

- **Facebook icon is rendering the wrong glyph entirely** — not a sizing issue, the actual mark
  is wrong (showing something like a stray character instead of the "f" logo). Same root cause
  as the X icon fix in v5 section 5: wrong asset mapped, or a broken icon-font codepoint.
  Extend that fix to cover Facebook too — pull the correct FB mark from a known-working
  reference (Dev Vashi's site has one) and swap it in.
- **X renders noticeably larger than Facebook, Instagram, and YouTube.** This means the icons
  aren't all going through the same size constraint — likely X was added a different way than
  the other three (e.g. a raw text glyph or a different icon source) and never got wrapped in
  the same fixed-size container the others use. Don't fix this by shrinking X in isolation —
  find why it's the odd one out and bring it into the same system as the other three, or this
  will keep drifting every time an icon gets swapped.

Fix: every icon glyph gets a fixed, identical box regardless of source format, and the ring
shrinks slightly to match.

```css
.social-icon {
  width: 30px;   /* down from 36px in v5 */
  height: 30px;
}

.social-icon svg,
.social-icon img {
  width: 14px;   /* standardizes visual weight across all four icons */
  height: 14px;
  display: block;
}

.social-icon::before {
  inset: -5px;   /* scaled down to match the smaller circle */
}
```

Verify by screenshotting the icon row at rest — all four glyphs should read as the same visual
weight side by side, not just the same bounding box. A skinny X glyph in a 14px box next to a
bold FB glyph in the same box can still look mismatched; eyeball it, don't just trust the CSS.

## 2. Header CTA — oversized, wrong text color

v5's padding bump (`14px 32px`) overshot. Current state is too large and the white text is low
contrast against the gold fill. Fix both, and pull sizing from the hero button rather than
guessing again:

```css
.cta-button {
  padding: 10px 24px;
  font-size: 14px;
  color: #1B2A52; /* navy, not white — matches hero CTA */
  border-radius: 10px;
  background-color: var(--accent-gold);
}
```

Better fix if the codebase allows it without a big refactor: check whether the hero
"Get Involved" button and the header "Get Involved" button are already sharing a class. If
they're not, that's almost certainly why they drifted apart (header CTA got styled separately
and inherited the wrong defaults). Point the header CTA at the same class the hero button uses
— exact same padding, font-size, and color — instead of maintaining two separate definitions
that have to be kept in sync by hand.

---

## Verification checklist

- [ ] Facebook icon shows the correct "f" mark, not a fallback glyph
- [ ] X icon matches Facebook/Instagram/YouTube in visual size, not just bounding-box size
- [ ] Ring circle diameter reduced and still centers correctly around each icon at rest and hover
- [ ] Header "Get Involved" button visually matches the hero "Get Involved" button — same scale,
      same navy-on-gold text, side-by-side comparison confirms they read as the same button
- [ ] Both CTAs still pass the existing lift + drop-shadow hover treatment
