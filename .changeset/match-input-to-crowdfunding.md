---
"@volksverpetzer/ui-web": patch
---

`Input`'s radius/border-color/padding now use whichever existing token
lands closest to `vvp_crowdfunding`'s donation-form input — its actual
first real consumer — instead of the arbitrary `--vvp-radius-sm`/
`--vvp-surface-input`/`--vvp-spacing-sm`+`--vvp-spacing-md` picked before
any real consumer existed. Also switched the focus style from a
box-shadow ring to a 2px outline, matching that same consumer.
