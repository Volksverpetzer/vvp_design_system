---
"@volksverpetzer/ui-web": patch
---

PillGroup: when no option is checked, the first enabled option is the group's tab stop, so keyboard users can still reach the group (before, every option had `tabIndex=-1`).
