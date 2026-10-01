---
"@volksverpetzer/ui-web": minor
---

Vendor the house webfont (Source Sans Pro, weights 400/600/700) at build time from `@fontsource/source-sans-pro` into `dist/fonts/`, and prepend its `@font-face` CSS to `dist/styles.css`. Consumers that already `@import "@volksverpetzer/ui-web/styles.css"` get the real font with no further changes; the separate `@fontsource/source-sans-pro` dependency and per-weight CSS imports in each app's root layout can be dropped. `@volksverpetzer/design-tokens`'s `font-family.css` still just names the font via `--vvp-font-family` — this is what actually makes that name resolve to loaded glyphs instead of falling back to `system-ui`.
