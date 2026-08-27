---
"@volksverpetzer/ui-web": minor
---

Add a `size` prop to Badge (`"sm" | "md"`, default `"md"`). `md` matches vvp_divi5_extensions's category badges (Prüfpunkt, YouTube, Instagram, Podcast tags): `--vvp-font-size-base` (16px) rather than the compact `--vvp-font-size-xs` (12px) `sm` size. `md` is the default since it matches Badge's only real-world reference point; Badge has no other consumers yet, so this isn't a breaking change in practice.
