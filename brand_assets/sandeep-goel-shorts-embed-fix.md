# Sandeep Goel Website — Shorts Embed Card Fix

Single, self-contained revision. Supersedes nothing else in the repo — this only touches the bio-section short-embed component. Do not touch any other section.

---

<task>
Add the missing offset gold shadow card behind the vertical Short embed in the bio section, and swap the placeholder play icon for a circular badge. This matches the visual pattern already used elsewhere in the design system (layered card with accent-color shadow peeking out behind the main frame).
</task>

<context>
- File 1: `index.html` — the short-embed markup lives inside `<section class="bio-section" id="about">`, in a `<div class="short-frame">` block.
- File 2: `style.css` — the relevant rules are under the `/* ---------- Short-frame (vertical video embed) ---------- */` and `/* ---------- Placeholder media ---------- */` comments.
- Design tokens already exist and must be reused, not redefined: `--gold`, `--radius-lg`, `--navy`, `--shadow-md`.
- Do not add a custom header bar, avatar, or title overlay to the embed. When the real video is dropped in as a `youtube-nocookie.com/embed/VIDEO_ID` iframe, YouTube renders its own title/channel/play-button chrome natively before playback — building a custom one would duplicate it.
</context>

<changes>

<change file="index.html">
Find this block (inside `.bio-grid`, after the bio text `<div>`):

```html
<div class="short-frame">
  <div class="short-mat">
    <div class="short-embed" id="short-embed">
      <div class="placeholder-media" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none"/></svg>
        <span>Short — drop-in pending</span>
      </div>
    </div>
  </div>
  <a href="#" class="short-link" id="short-link">Watch the full video on YouTube Shorts</a>
</div>
```

Replace with:

```html
<div class="short-frame">
  <div class="short-shadow" aria-hidden="true"></div>
  <div class="short-mat">
    <div class="short-embed" id="short-embed">
      <div class="placeholder-media" aria-hidden="true">
        <span class="placeholder-media__play">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </span>
        <span>Short — drop-in pending</span>
      </div>
    </div>
  </div>
  <a href="#" class="short-link" id="short-link">Watch the full video on YouTube Shorts</a>
</div>
```
</change>

<change file="style.css">
Find (under the Short-frame comment block):

```css
.short-frame { max-width: 360px; margin: 0 auto; }
```

Replace with:

```css
.short-frame { max-width: 360px; margin: 0 auto; position: relative; }
.short-shadow {
  position: absolute;
  inset: 16px -16px -16px 16px;
  background: var(--gold);
  border-radius: var(--radius-lg);
  z-index: 0;
}
.short-mat { position: relative; z-index: 1; }
```

Note: `.short-mat` already exists further down with its own rules (`background: var(--navy); border-radius: var(--radius-lg); padding: 16px; box-shadow: ...`). Do not duplicate that block — just add `position: relative; z-index: 1;` to the existing `.short-mat` rule, or add this as a second `.short-mat` rule directly after it. Either is fine as long as `position: relative` and `z-index: 1` end up applied.

Then find (under the Placeholder media comment block):

```css
.placeholder-media svg { width: 34px; height: 34px; opacity: 0.7; }
.placeholder-media span { font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; }
```

Replace with:

```css
.placeholder-media__play {
  display: flex; align-items: center; justify-content: center;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.7);
}
.placeholder-media span { font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; }
```

Leave the `.polaroid .placeholder-media` and `.marquee-item--wide .polaroid .placeholder-media` rules further down untouched — they're a different component and share the `.placeholder-media` class name coincidentally.
</change>

</changes>

<future_drop_in>
When the real Short is ready, replace the contents of `<div class="placeholder-media">...</div>` with:

```html
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0&modestbranding=1&playsinline=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>
```

No CSS changes needed at that point — `.short-embed iframe` already handles sizing, and the gold shadow card carries through automatically.
</future_drop_in>

<verification>
1. Run in plan mode first. Confirm the plan touches only `index.html` and `style.css`, and only the short-frame / short-mat / short-shadow / placeholder-media rules.
2. After applying, confirm visually: a gold rectangle should be visible peeking out bottom-right behind the navy short-mat frame, offset by 16px.
3. Confirm the placeholder play icon now renders as a circular badge, not the old monitor-with-play-arrow icon.
4. Confirm no other section's layout shifted (spot check the polaroid/marquee placeholder-media instances still look correct).
5. Commit with a clear message (e.g. `fix: add offset gold shadow card to short-embed placeholder`) and push.
6. Report back the commit hash and confirm which branch it was pushed to.
7. After Netlify redeploys, hard-refresh the live URL and confirm the shadow card is visible there, not just locally.
</verification>
