---
"@volksverpetzer/ui-web": minor
---

Add `ToolPage`, a full-page shell for a single-purpose tool page: centered icon + title, a full-width content slot (a search input, a list, a form), optional help text below it, optional feature/category `tags` rendered as `Badge`s, a fixed top-right corner combining `ThemeToggle` with an optional GitHub icon link, and a decorative jagged brand-blue shape along the top edge (togglable via `background`). A `centered` flag vertically centers the icon/title/tags/content/help block in the middle of the viewport — the pre-results look on `ai.volksverpetzer.de` — for pages where that reads better than top-aligning. Supersedes the `PageHeader` component from the previous PR — that only covered eyebrow/title/description and didn't account for the rest of what these tool pages (ai.volksverpetzer.de, vvp_wp_audio_converter's landing page) actually need: the content slot, the corner toolbar, and the page-level background treatment.
