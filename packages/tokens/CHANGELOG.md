# @volksverpetzer/design-tokens

## 0.2.0

### Minor Changes

- [`0c743e0`](https://github.com/Volksverpetzer/vvp_design_system/commit/0c743e084084660ba42b976881d9e7c287c3224c) - Add an SCSS export for the radius scale (`./scss/radius.scss`), alongside the existing CSS one. Sass doesn't inline `@import "foo.css"` at build time, so consumers using the radius scale via Sass (e.g. vvp_divi5_extensions) need a real `.scss` file the way colors already have.
