---
"@volksverpetzer/design-tokens": minor
---

Add `--vvp-elevation-accent-rest` / `--vvp-elevation-accent-hover` — a
brand-tinted shadow scale, the one deliberate exception to the existing
`--vvp-elevation-*` scale's neutral-black rule. For a shadow that should
read as an accent glow (e.g. `LinkButton`'s outline style) rather than a
depth cue. Color is always `--vvp-primary-muted`, so it tracks the active
brand and light/dark mode automatically. CSS output only for now — no
React Native platform, since there's no RN consumer yet.
