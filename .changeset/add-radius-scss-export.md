---
"@volksverpetzer/design-tokens": minor
---

Add an SCSS export for the radius scale (`./scss/radius.scss`), alongside the existing CSS one. Sass doesn't inline `@import "foo.css"` at build time, so consumers using the radius scale via Sass (e.g. vvp_divi5_extensions) need a real `.scss` file the way colors already have.
