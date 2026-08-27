---
"@volksverpetzer/ui-web": minor
---

Redesign Badge to match vvp_divi5_extensions's category badges (Prüfpunkt, YouTube, Instagram, Podcast tags): soft/tinted style (a light tint of the variant color as background, the variant color as text) instead of a solid fill, plus an optional `icon` prop. Adds a `pruefpunkt` variant alongside the existing primary/accent/neutral/error ones. This is a visual change to every existing variant, not just an addition — Badge had no real consumers yet, so there was no existing look to preserve.
