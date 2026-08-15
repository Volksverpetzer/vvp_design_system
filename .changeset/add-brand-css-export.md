---
"@volksverpetzer/design-tokens": minor
---

Add a plain-CSS export with the `--brand-*` WP-admin override hook (`./css/volksverpetzer-brand.css`, `./css/mimikama-brand.css`), alongside the existing `.scss` one. The plain `./css/volksverpetzer.css` export has no override hook and different variable names (`--vvp-primary` vs `--vvp-color-primary`) — consumers that need the overridable form without using Sass (e.g. vvp_divi5_extensions, after dropping Sass) need this instead.
