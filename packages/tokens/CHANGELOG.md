# @volksverpetzer/design-tokens

## 0.3.0

### Minor Changes

- [`cdacf9c`](https://github.com/Volksverpetzer/vvp_design_system/commit/cdacf9cf98b16c2fa03a7f18167958d577ea1cde) - Add a plain-CSS export with the `--brand-*` WP-admin override hook (`./css/volksverpetzer-brand.css`, `./css/mimikama-brand.css`), alongside the existing `.scss` one. The plain `./css/volksverpetzer.css` export has no override hook and different variable names (`--vvp-primary` vs `--vvp-color-primary`) — consumers that need the overridable form without using Sass (e.g. vvp_divi5_extensions, after dropping Sass) need this instead.

## 0.2.0

### Minor Changes

- [`0c743e0`](https://github.com/Volksverpetzer/vvp_design_system/commit/0c743e084084660ba42b976881d9e7c287c3224c) - Add an SCSS export for the radius scale (`./scss/radius.scss`), alongside the existing CSS one. Sass doesn't inline `@import "foo.css"` at build time, so consumers using the radius scale via Sass (e.g. vvp_divi5_extensions) need a real `.scss` file the way colors already have.
