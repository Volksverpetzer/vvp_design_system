---
"@volksverpetzer/ui-web": patch
---

Fix Badge soft/tinted variants (primary, accent, error, pruefpunkt) failing WCAG 4.5:1 text contrast in dark mode. The light-mode background formula (`color-mix(... 15%, white)`) is theme-independent, so in dark mode it mixed the already-lightened dark-mode brand colors toward a near-white background they were never designed to sit on — contrast fell as low as ~2:1 for some variant/theme pairings.

Each variant's dark-mode background is now tuned to its own safe tint direction and percentage (primary/accent toward white, error/pruefpunkt toward black), verified against the WCAG contrast formula for both Volksverpetzer and Mimikama's dark palettes. Light mode is unchanged.
