---
"@volksverpetzer/ui-web": patch
---

Use the new `--vvp-link-text` token (from `@volksverpetzer/design-tokens`) instead of `--vvp-primary` for standalone text/link colors — `LinkButton`, `Button`'s ghost variant (text + border), and `ToolPage`'s header icon — fixing dark-mode contrast that had been compromised by `primary` also serving as a button-fill color.
