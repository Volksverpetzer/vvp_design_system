# @volksverpetzer/ui-web

## 0.10.0

### Minor Changes

- [#32](https://github.com/Volksverpetzer/vvp_design_system/pull/32) [`7c0e993`](https://github.com/Volksverpetzer/vvp_design_system/commit/7c0e9933c4a0596c2fe9cfba7ac2d7ac0155e6b1) Thanks [@rejas](https://github.com/rejas)! - Add `InputButton`, an `Input` with a primary action button embedded in its right edge — the "paste a value and go" pattern (a URL shortener, an email signup field). Moved out of vvp_link_shortener, which had been hand-positioning a separate `Input` and `Button` with inline styles for the merged look.

  Composes the existing `Input` and `Button` (`variant="primary"`, `size="sm"`, `type="submit"`) rather than inventing new styling, and measures the button's own rendered width to reserve exactly that much padding on the input, so a longer label (e.g. a "Shortening…" loading state) never overlaps typed text.

## 0.9.0

### Minor Changes

- [#30](https://github.com/Volksverpetzer/vvp_design_system/pull/30) [`363d5f0`](https://github.com/Volksverpetzer/vvp_design_system/commit/363d5f07a7bc142129cd8704d9e195fe88d22a1d) Thanks [@rejas](https://github.com/rejas)! - Add `LinkButton` — an anchor-based counterpart to `Button`, rendered as
  an `<a>` instead of a `<button>`. For navigation (external links,
  downloads) where an actual link is the correct element, not a button
  with a location-changing `onClick`. Unlike `Button`, it has no
  `variant` choice: it always renders one bordered, low-emphasis look
  (a link is inherently a secondary/tertiary action, never a page's
  primary CTA), only `size` is configurable.

  Its shadow comes from `@volksverpetzer/design-tokens`'
  `--vvp-elevation-accent-rest`/`-hover` (added alongside this) with a
  matching literal fallback, so it still renders correctly for apps on an
  older `design-tokens` version that hasn't loaded that token yet.

## 0.8.0

### Minor Changes

- [#29](https://github.com/Volksverpetzer/vvp_design_system/pull/29) [`aa5394c`](https://github.com/Volksverpetzer/vvp_design_system/commit/aa5394c53c422933f40e52df0644b448daa8a3bb) Thanks [@rejas](https://github.com/rejas)! - Add `ThemeToggle`, moved out of vvp_link_shortener and vectorcrawl where it was hand-rolled identically in both. A fixed-corner light/dark switch: persists the choice to `localStorage`, falls back to `prefers-color-scheme`, and flips the `dark` class on `<html>` — the same convention the `--vvp-*` tokens' `.dark` scope already expects. Browser-only by nature, so there's no Divi/React Native variant.

### Patch Changes

- [#27](https://github.com/Volksverpetzer/vvp_design_system/pull/27) [`41067c2`](https://github.com/Volksverpetzer/vvp_design_system/commit/41067c29578253e7553f0d3e85f49654e7ef7f98) Thanks [@rejas](https://github.com/rejas)! - `Input`'s radius/border-color/padding now use whichever existing token
  lands closest to `vvp_crowdfunding`'s donation-form input — its actual
  first real consumer — instead of the arbitrary `--vvp-radius-sm`/
  `--vvp-surface-input`/`--vvp-spacing-sm`+`--vvp-spacing-md` picked before
  any real consumer existed. Also switched the focus style from a
  box-shadow ring to a 2px outline, matching that same consumer.

## 0.7.0

### Minor Changes

- [#23](https://github.com/Volksverpetzer/vvp_design_system/pull/23) [`b13d805`](https://github.com/Volksverpetzer/vvp_design_system/commit/b13d805bc9c0ab0d22103fdcd23319d16af95a9f) Thanks [@rejas](https://github.com/rejas)! - Add `Input` and `Alert`, moved out of vvp_link_shortener where both were originally hand-rolled with shadcn/Tailwind. Rebuilt on the same plain, hand-scoped `vvp-ui-*` CSS as the rest of this package (no Tailwind classes) so they also drop into `vvp_divi5_extensions`'s Divi-embedded CSS and the crowdfunding site, which both need a text input and inline form feedback for donation forms.

  - `Input` — a single-size text input styled off `--vvp-*` tokens. Validation state is read from the native `aria-invalid` attribute rather than a bespoke prop, so it composes with whatever form library a consumer already uses.
  - `Alert` — a plain feedback container (`neutral` | `error`), styled the same minimal way as `Card`: a border-only box, no solid fill.

- [#24](https://github.com/Volksverpetzer/vvp_design_system/pull/24) [`14810c7`](https://github.com/Volksverpetzer/vvp_design_system/commit/14810c7d9f9fc5deb237bca5210db8156325c812) Thanks [@rejas](https://github.com/rejas)! - Add `Slider`, a single-thumb range control (audio/video scrubbing, volume, numeric filters) for consumers that need something interactive beyond the read-only `ProgressBar`. Wraps a native `<input type="range">` — keyboard, touch, and screen-reader support come for free — themed with the `--vvp-*` tokens the rest of `ui-web` already uses, with the filled portion driven by a CSS custom property computed from `value` rather than an extra DOM node. Motivated by `vvp_wp_audio_converter`'s audio player, which currently hand-rolls its seek bar with Radix `Slider` + Tailwind; no consumer has switched to it yet.

## 0.6.0

### Minor Changes

- [#19](https://github.com/Volksverpetzer/vvp_design_system/pull/19) [`cb431eb`](https://github.com/Volksverpetzer/vvp_design_system/commit/cb431eb48300c4cc77f7a5ebca5f81585e7e2d1f) Thanks [@rejas](https://github.com/rejas)! - Add a `size` prop to Badge (`"sm" | "md"`, default `"md"`). `md` matches vvp_divi5_extensions's category badges (Prüfpunkt, YouTube, Instagram, Podcast tags): `--vvp-font-size-base` (16px) rather than the compact `--vvp-font-size-xs` (12px) `sm` size. `md` is the default since it matches Badge's only real-world reference point; Badge has no other consumers yet, so this isn't a breaking change in practice.

## 0.5.0

### Minor Changes

- [`2f4a7cd`](https://github.com/Volksverpetzer/vvp_design_system/commit/2f4a7cd12a9722aa746fcbfc3dc0690d714442e7) - Redesign Badge to match vvp_divi5_extensions's category badges (Prüfpunkt, YouTube, Instagram, Podcast tags): soft/tinted style (a light tint of the variant color as background, the variant color as text) instead of a solid fill, plus an optional `icon` prop. Adds a `pruefpunkt` variant alongside the existing primary/accent/neutral/error ones. This is a visual change to every existing variant, not just an addition — Badge had no real consumers yet, so there was no existing look to preserve.

## 0.4.1

### Patch Changes

- [`0b436b5`](https://github.com/Volksverpetzer/vvp_design_system/commit/0b436b5d56070193a1047dfe5379c28e25b3b6a2) - Add the missing `license` field (MIT) — npm was showing "UNKNOWN" for both packages since neither `package.json` declared one. Also adds a `LICENSE` file at the repo root.

## 0.4.0

### Minor Changes

- [#6](https://github.com/Volksverpetzer/vvp_design_system/pull/6) [`da366bc`](https://github.com/Volksverpetzer/vvp_design_system/commit/da366bc5ba001f76697e870cd78c3d4441b2ca95) Thanks [@rejas](https://github.com/rejas)! - `Button` now forwards its `ref` to the underlying `<button>` element (via
  `React.forwardRef`), so consumers can attach DOM refs — e.g. for scroll/
  visibility tracking with `IntersectionObserver` — the same way they would
  with a plain `<button>`.

## 0.3.0

### Minor Changes

- [#4](https://github.com/Volksverpetzer/vvp_design_system/pull/4) [`ff84e41`](https://github.com/Volksverpetzer/vvp_design_system/commit/ff84e413a01c735f1e0d92dfa3ce24e07e3993c2) Thanks [@rejas](https://github.com/rejas)! - Add `ProgressBar`, a campaign donation progress bar with one segment by
  default (0 to `goal`) or multiple stacked segments via `milestones` for
  campaigns with stretch goals. Styling (pink gradient fill, rounded pill
  track) matches `vvp_divi5_extensions`' existing `CampaignProgress` module,
  now built on the shared `--vvp-*` tokens instead of a local copy.

## 0.2.0

### Minor Changes

- [`2f41df1`](https://github.com/Volksverpetzer/vvp_design_system/commit/2f41df137b2260c35a3d2924f2688491ee04aaad) - Add `accent` variant to Button, for donation/campaign CTAs that use the pink brand accent instead of primary blue (e.g. vvp_divi5_extensions's campaign-donate module and the crowdfunding site's donate button).
