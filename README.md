# vvp_design_system

Shared design tokens and web components for Volksverpetzer's apps:

- [`packages/tokens`](packages/tokens) — `@volksverpetzer/design-tokens`. Single source of truth for colors (per brand, per light/dark), spacing, font sizes, radii, and icon sizes, transformed via [Style Dictionary](https://styledictionary.com/) into platform-native output: a React Native/TypeScript module for `vvp_app`, CSS custom properties for `vvp_link_shortener`, and Sass custom properties for `vvp_divi5_extensions`.
- [`packages/ui-web`](packages/ui-web) — `@volksverpetzer/ui-web`. A small set of brand-visible React components (Button, Badge, Card) shared between `vvp_link_shortener` and `vvp_divi5_extensions`. Built with plain, hand-scoped CSS (`vvp-ui-*` class prefix, no Tailwind utility classes and no build-time CSS Modules tooling) so they drop into both a Tailwind app and Divi's WordPress-embedded CSS without conflict. Not usable from `vvp_app` — React Native has no CSS/DOM.

## Consuming

Both packages publish to the public npm registry as `@volksverpetzer/*` — no `.npmrc` registry mapping or auth needed to install them. Install a pinned version explicitly — versions are never auto-bumped, consistent with this org's existing caution about un-reviewed dependency updates:

```bash
pnpm add @volksverpetzer/design-tokens@<version>
```

## Releasing

Versioning uses [Changesets](https://github.com/changesets/changesets), mirroring `Volksverpetzer/eslint-plugin-react-native-a11y`. Run `pnpm changeset` to describe a change; merging to `main` opens a "Version Packages" PR, and merging that PR publishes to npm.

Publishing to npm uses [Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) (OIDC) — no `NPM_TOKEN` secret, nothing to rotate or leak. The workflow already has the `id-token: write` permission it needs. Two things to know:

- **The first version of each package can't go out via CI.** npm requires a package to already exist before Trusted Publishing can be configured for it, so `@volksverpetzer/design-tokens` and `@volksverpetzer/ui-web` each need one manual `npm publish` (from an account with access to the `@volksverpetzer` scope) before any of this applies.
- **After that**, go to each package's Settings → Trusted Publisher on npmjs.com and add: repository `Volksverpetzer/vvp_design_system`, workflow file `release.yml`, environment left blank. From then on, `changeset publish` in CI authenticates via OIDC automatically.
- Stay on pnpm 10.x for this repo (already pinned via `packageManager`) — pnpm 11.0.8+ has a [known regression](https://github.com/pnpm/pnpm/issues/11513) that breaks OIDC publishing (404s). Check that issue before bumping pnpm here.

## Why tokens only for `vvp_app`

`vvp_app` is React Native — there is no CSS or DOM, so it can only ever consume token *values* (colors, spacing numbers, etc.), never component code from `ui-web`. Its own `Ui*` component layer stays local to that repo.

## Testing unpublished changes locally

Both packages are published (`0.1.0` at time of writing) and every consumer repo depends on a real pinned version — not a local path. If you're changing this repo and want to test against a consumer before cutting a new release, pnpm's `link:` protocol (a relative-path dependency, e.g. `"@volksverpetzer/design-tokens": "link:../vvp_design_system/packages/tokens"`) works for `vvp_app` (Metro) but **not** for Next.js apps' `next dev` under Turbopack (`vvp_link_shortener`, `crowdfunding`, `wordpress-audio-converter`): Turbopack's CSS `@import` resolution panics when it has to follow a symlink that points outside the project root, which is exactly what `link:` creates for a sibling repo.

For those, build the package (`pnpm build`) and install it as a local tarball instead (`pnpm pack`, then depend on the resulting `.tgz` via `file:`) — that installs real files inside `node_modules/.pnpm/`, which Turbopack can resolve. Revert to the real pinned version before committing; don't commit a `file:` path to a temp directory.
