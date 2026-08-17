---
"@volksverpetzer/design-tokens": minor
---

Add a `fontFamily` token category, so consumers stop hardcoding the "Source Sans Pro" family name/weight variants as string literals.

- React Native: `fontFamily` (`regular`/`italic`/`bold`/`boldItalic`) from `@volksverpetzer/design-tokens/rn/shared` — the PostScript names `vvp_app` loads via `expo-font`.
- CSS: `@volksverpetzer/design-tokens/css/font-family.css` — a single `--vvp-font-family` var with the web font stack (`'Source Sans Pro', system-ui, sans-serif`). The actual `@font-face` rules stay in `vvp_wp_theme`; this is just the stack value for consumers that need to reference it (e.g. `ui-web` used standalone, outside the Divi theme).
