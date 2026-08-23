# @volksverpetzer/ui-web

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
