---
"@volksverpetzer/ui-web": minor
---

Add `PageHeader`, a page/section hero: optional eyebrow tag + title + optional description. Extracted from `ai.volksverpetzer.de` and the crowdfunding site's campaign pages, which both hand-build the same eyebrow → h1 → intro-copy pattern with raw Tailwind classes today — `vvp_wp_audio_converter` was about to do the same a third time. Deliberately stops at the description; the content that follows (a form, a list, a card) stays the page's own concern.
