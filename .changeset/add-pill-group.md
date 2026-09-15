---
"@volksverpetzer/ui-web": minor
---

Add `PillGroup`, a row of pill-shaped options for choosing one of a small, fixed set of values — the web port of vvp_app's "pills over dropdowns" convention, as an alternative to a native `<select>`.

Implements the ARIA APG radiogroup pattern: one `role="radio"` pill per option, roving tabindex, and Left/Right/Up/Down arrow keys move both focus and selection. First consumer is vvp_reisekosten's upcoming Next.js frontend (transport method, meal coverage, and accommodation type selectors).
