---
"@volksverpetzer/ui-web": minor
---

Add `LinkButton` — an anchor-based counterpart to `Button`, rendered as
an `<a>` instead of a `<button>`. For navigation (external links,
downloads) where an actual link is the correct element, not a button
with a location-changing `onClick`. Unlike `Button`, it has no
`variant` choice: it always renders one bordered, low-emphasis look
(a link is inherently a secondary/tertiary action, never a page's
primary CTA), only `size` is configurable.
