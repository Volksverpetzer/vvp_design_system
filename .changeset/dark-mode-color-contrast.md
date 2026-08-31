---
"@volksverpetzer/design-tokens": minor
---

Fix WCAG AA contrast failures in dark-theme colors and add a `linkText` color token.

- Volksverpetzer light `primaryMuted` was too close in luminance to white, failing 4.5:1 (was 3.4:1). Darkened it to `#307EA4` (4.5:1).
- `primary` was reused both as a background fill (paired with `onPrimary` text on top) and as a standalone text/link color (paired against `background`) — a single hue can't satisfy both at 4.5:1 in dark mode, since the two constraints don't overlap. Split the roles: `primary` is now tuned purely for the fill role, and a new `linkText` token is tuned purely for the text/link role, each hitting ~5:1 against its real pairing instead of the ~3.1–3.4:1 that either role hit before.
- Mimikama dark `onPrimary` changed from `#E1C9E1` to `#FFFFFF`, which also fixes an unflagged failure in the accent button variant (was 3.0:1 against the old tinted `onPrimary`, now 4.6:1).

`linkText` equals `primary` in both light themes, since light mode already had enough headroom to serve both roles with one value.
