# @volksverpetzer/design-tokens

## 0.5.0

### Minor Changes

- [#10](https://github.com/Volksverpetzer/vvp_design_system/pull/10) [`6e6b646`](https://github.com/Volksverpetzer/vvp_design_system/commit/6e6b646de72f108997eb8980c04bfb79156617eb) Thanks [@rejas](https://github.com/rejas)! - Add a `fontFamily` token category, so consumers stop hardcoding the "Source Sans Pro" family name/weight variants as string literals.

  - React Native: `fontFamily` (`regular`/`italic`/`bold`/`boldItalic`) from `@volksverpetzer/design-tokens/rn/shared` — the PostScript names `vvp_app` loads via `expo-font`.
  - CSS: `@volksverpetzer/design-tokens/css/font-family.css` — a single `--vvp-font-family` var with the web font stack (`'Source Sans Pro', system-ui, sans-serif`). The actual `@font-face` rules stay in `vvp_wp_theme`; this is just the stack value for consumers that need to reference it (e.g. `ui-web` used standalone, outside the Divi theme).

## 0.4.1

### Patch Changes

- [`0b436b5`](https://github.com/Volksverpetzer/vvp_design_system/commit/0b436b5d56070193a1047dfe5379c28e25b3b6a2) - Add the missing `license` field (MIT) — npm was showing "UNKNOWN" for both packages since neither `package.json` declared one. Also adds a `LICENSE` file at the repo root.

## 0.4.0

### Minor Changes

- [#7](https://github.com/Volksverpetzer/vvp_design_system/pull/7) [`7d16c95`](https://github.com/Volksverpetzer/vvp_design_system/commit/7d16c95f33f83009a7ec76326a2873140eaab24d) Thanks [@rejas](https://github.com/rejas)! - Add an `elevation` token category (`xs`/`sm`/`md`/`lg`) for neutral
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

## 0.3.0

### Minor Changes

- [`cdacf9c`](https://github.com/Volksverpetzer/vvp_design_system/commit/cdacf9cf98b16c2fa03a7f18167958d577ea1cde) - Add a plain-CSS export with the `--brand-*` WP-admin override hook (`./css/volksverpetzer-brand.css`, `./css/mimikama-brand.css`), alongside the existing `.scss` one. The plain `./css/volksverpetzer.css` export has no override hook and different variable names (`--vvp-primary` vs `--vvp-color-primary`) — consumers that need the overridable form without using Sass (e.g. vvp_divi5_extensions, after dropping Sass) need this instead.

## 0.2.0

### Minor Changes

- [`0c743e0`](https://github.com/Volksverpetzer/vvp_design_system/commit/0c743e084084660ba42b976881d9e7c287c3224c) - Add an SCSS export for the radius scale (`./scss/radius.scss`), alongside the existing CSS one. Sass doesn't inline `@import "foo.css"` at build time, so consumers using the radius scale via Sass (e.g. vvp_divi5_extensions) need a real `.scss` file the way colors already have.
