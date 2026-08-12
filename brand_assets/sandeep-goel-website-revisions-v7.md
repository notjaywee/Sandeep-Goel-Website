# Sandeep Goel — Website Revisions v7 (Header Patch 2)

Follow-up to v5 and v6 — read alongside both. Three adjustments off the current live state at
https://meek-paprenjak-dd9be6.netlify.app/. Everything else already shipped (nav hover, ring
effect, gold token, underline removal, icon fixes) stays as-is.

Note on method: the deltas below (10%, 15%) are relative to whatever is currently live right
now, not relative to my earlier guessed numbers from v5/v6. Compute off the actual current
computed styles in the browser, not off the values written in those earlier docs — three rounds
of estimated pixel values compounding on top of each other is how you end up drifting from what
you actually asked for. Read current, apply the percentage, done.

---

## 1. Header bar — 10% bigger

Read the header's current computed vertical padding (and height, if it's set directly rather
than derived from padding) and increase by 10%.

```css
.site-header {
  /* current-padding-value * 1.10 — pull the real number from computed styles first */
}
```

## 2. Icons — 15% bigger

Same method: read current computed size for `.social-icon` and its glyph, scale up 15%.
Starting from v6's values as a reference point (30px circle / 14px glyph / -5px ring inset),
that comes out to approximately:

```css
.social-icon {
  width: 34px;   /* 30px × 1.15 */
  height: 34px;
}

.social-icon svg,
.social-icon img {
  width: 16px;   /* 14px × 1.15 */
  height: 16px;
}

.social-icon::before {
  inset: -6px;   /* scaled proportionally with the larger circle */
}
```

Confirm these are actually the values live right now before applying — if v6 didn't ship
exactly as spec'd, scale off the real number instead of this one.

## 3. Get Involved (header) — way smaller, and fix why it's stretching

This isn't just a padding problem. A button that's filling the "whole height and width of the
bar" almost always means it's being stretched by its parent container — e.g. `align-items:
stretch` on the header's flex row, or the button has `height: 100%` / `flex: 1` / no `width:
auto` set. Padding alone won't fix that; find the sizing rule that's making it expand to fill
its container and correct that first.

```css
.cta-button {
  align-self: center;   /* stop stretching to header height */
  width: auto;           /* stop stretching to fill row width — remove flex: 1 if present */
  height: auto;
  padding: 8px 20px;     /* down from 10px 24px in v6 */
  font-size: 13px;
}
```

Once the stretch behavior is fixed, this should read as a compact pill sitting comfortably
inside the (now slightly taller) header bar — not touching the top/bottom edges, not spanning
toward the nav links.

---

## Verification checklist

- [ ] Header bar height increased ~10% from its current live state, confirmed against computed
      styles before/after, not eyeballed
- [ ] All four social icons increased ~15%, ring scales proportionally, still reads balanced
      next to each other (same check as v6 — visual weight, not just bounding box)
- [ ] Get Involved button no longer stretches to header height or row width — root cause (stretch
      / flex-grow / height:100%) identified and fixed, not just padded smaller
- [ ] Button reads as a compact, centered pill with clear breathing room above/below and on
      either side within the header
- [ ] Existing hover/lift treatment on the button still intact after the sizing fix
