---
"@volksverpetzer/ui-web": minor
---

Add `Field`: label + control + optional hint/error, stacked, so apps stop hand-rolling `.field` CSS for their forms. With `htmlFor` it renders a `<label>` and links the hint/error to the control via `aria-describedby` (and sets `aria-invalid` when `error` is given). Without `htmlFor`, for composite controls, the label is a `<span>` with `labelId`. `PillGroup` gains an `aria-labelledby` prop to pair with it.
