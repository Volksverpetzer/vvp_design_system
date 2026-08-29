---
"@volksverpetzer/ui-web": patch
---

Fix `ToolPage`'s centered title running right up under the fixed top-right topbar (`ThemeToggle`/GitHub link) on mobile — the default 40px top padding was already less than the topbar's own 16px offset plus button height. Below 640px, push the content down further so the title clears it.
