---
"@volksverpetzer/ui-web": minor
---

`Button` now forwards its `ref` to the underlying `<button>` element (via
`React.forwardRef`), so consumers can attach DOM refs — e.g. for scroll/
visibility tracking with `IntersectionObserver` — the same way they would
with a plain `<button>`.
