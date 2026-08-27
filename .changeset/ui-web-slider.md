---
"@volksverpetzer/ui-web": minor
---

Add `Slider`, a single-thumb range control (audio/video scrubbing, volume, numeric filters) for consumers that need something interactive beyond the read-only `ProgressBar`. Wraps a native `<input type="range">` — keyboard, touch, and screen-reader support come for free — themed with the `--vvp-*` tokens the rest of `ui-web` already uses, with the filled portion driven by a CSS custom property computed from `value` rather than an extra DOM node. Motivated by `vvp_wp_audio_converter`'s audio player, which currently hand-rolls its seek bar with Radix `Slider` + Tailwind; no consumer has switched to it yet.
