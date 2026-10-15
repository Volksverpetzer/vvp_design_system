---
"@volksverpetzer/design-tokens": patch
---

Adjust `linkText` so link text passes WCAG AA (≥ 4.5:1) on both `background` and `surface` in every brand and scheme:

- Volksverpetzer dark `linkText` goes from `#3588B3` to `#4A9CC7` (4.13:1 → 5.33:1 on `surface`).
- Mimikama dark `linkText` goes from `#FE5150` to `#FF7A78` (3.91:1 → 5.00:1 on `surface`).
- Mimikama light `linkText` goes from `#DB0301` to `#D40201` (4.496:1 → 4.75:1 on `surface`). It no longer equals light `primary`, which stays `#DB0301`.

`primary`, `primaryMuted` and all other values are unchanged. A new contrast test (`pnpm test`) now checks `linkText` against `background` and `surface` in every brand and scheme.
