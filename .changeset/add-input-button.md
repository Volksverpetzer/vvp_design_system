---
"@volksverpetzer/ui-web": minor
---

Add `InputButton`, an `Input` with a primary action button embedded in its right edge — the "paste a value and go" pattern (a URL shortener, an email signup field). Moved out of vvp_link_shortener, which had been hand-positioning a separate `Input` and `Button` with inline styles for the merged look.

Composes the existing `Input` and `Button` (`variant="primary"`, `size="sm"`, `type="submit"`) rather than inventing new styling, and measures the button's own rendered width to reserve exactly that much padding on the input, so a longer label (e.g. a "Shortening…" loading state) never overlaps typed text.
