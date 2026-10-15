---
"@volksverpetzer/design-tokens": patch
---

Lighten the dark-mode `linkText` color for both brands so link text passes WCAG AA (≥ 4.5:1) on both `background` and `surface`. Volksverpetzer dark `linkText` goes from `#3588B3` to `#4A9CC7` (4.13:1 → 5.33:1 on `surface`), Mimikama dark `linkText` from `#FE5150` to `#FF7A78` (3.91:1 → 5.00:1 on `surface`). `primary`, `primaryMuted` and all light-mode values are unchanged. A new contrast test (`pnpm test`) now checks `linkText` against `background` and `surface` in every brand and scheme.
