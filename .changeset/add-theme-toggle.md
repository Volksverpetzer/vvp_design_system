---
"@volksverpetzer/ui-web": minor
---

Add `ThemeToggle`, moved out of vvp_link_shortener and vectorcrawl where it was hand-rolled identically in both. A fixed-corner light/dark switch: persists the choice to `localStorage`, falls back to `prefers-color-scheme`, and flips the `dark` class on `<html>` — the same convention the `--vvp-*` tokens' `.dark` scope already expects. Browser-only by nature, so there's no Divi/React Native variant.
