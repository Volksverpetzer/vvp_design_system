---
"@volksverpetzer/ui-web": minor
---

Add `LinkButton` — the same look and variants as `Button`, rendered as
an `<a>` instead of a `<button>`. For navigation (external links,
downloads) where an actual link is the correct element, not a button
with a location-changing `onClick`. Reuses `Button.css`'s classes
directly — nothing in there is scoped to the `<button>` tag.
