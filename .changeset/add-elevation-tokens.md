---
"@volksverpetzer/design-tokens": minor
---

Add an `elevation` token category (`xs`/`sm`/`md`/`lg`) for neutral
drop-shadows, so `vvp_app` doesn't have to hand-roll `boxShadow`/`elevation`
values per component. `xs` and `sm` are sourced directly from `vvp_app`'s
existing card-lift and floating-button shadows, not invented — `md`/`lg`
extend the same progression for overlays/modals.

- CSS: `@volksverpetzer/design-tokens/css/elevation.css` — ready-to-use
  `--vvp-elevation-*` `box-shadow` values.
- React Native: `elevation` from `@volksverpetzer/design-tokens/rn/shared` —
  each step has `offsetY`/`blur`/`opacity`/`android` plus a pre-assembled
  `boxShadow` string for the RN "New Architecture" `boxShadow` View style
  prop.

Color is always neutral black — brand-colored shadows (e.g. a pink CTA
glow) stay local/hand-written, not part of this scale.
