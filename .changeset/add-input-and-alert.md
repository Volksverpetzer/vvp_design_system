---
"@volksverpetzer/ui-web": minor
---

Add `Input` and `Alert`, moved out of vvp_link_shortener where both were originally hand-rolled with shadcn/Tailwind. Rebuilt on the same plain, hand-scoped `vvp-ui-*` CSS as the rest of this package (no Tailwind classes) so they also drop into `vvp_divi5_extensions`'s Divi-embedded CSS and the crowdfunding site, which both need a text input and inline form feedback for donation forms.

- `Input` — a single-size text input styled off `--vvp-*` tokens. Validation state is read from the native `aria-invalid` attribute rather than a bespoke prop, so it composes with whatever form library a consumer already uses.
- `Alert` — a plain feedback container (`neutral` | `error`), styled the same minimal way as `Card`: a border-only box, no solid fill.
