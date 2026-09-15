import { useId } from "react";
import type { KeyboardEvent } from "react";

import "./PillGroup.css";

export interface PillGroupOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface PillGroupProps {
  /** Visually hidden unless `label` is also rendered by the consumer via `aria-labelledby` — falls back to this as the accessible name. */
  "aria-label"?: string;
  options: PillGroupOption[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md";
  disabled?: boolean;
  className?: string;
}

/**
 * A row of pill-shaped options for choosing one of a small, fixed set of
 * values — the house alternative to a native `<select>` (see vvp_app's
 * "pills over dropdowns" convention, now ported to web). Implements the
 * ARIA APG radiogroup pattern: one `role="radio"` per pill, roving
 * tabindex, and Left/Right (and Up/Down) arrow keys move both focus and
 * selection, matching native `<select>`/radio-group keyboard behavior.
 */
export function PillGroup({
  "aria-label": ariaLabel,
  options,
  value,
  onChange,
  size = "md",
  disabled = false,
  className,
}: PillGroupProps) {
  const groupId = useId();

  const selectNext = (fromIndex: number, direction: 1 | -1) => {
    const enabled = options
      .map((opt, i) => ({ opt, i }))
      .filter(({ opt }) => !opt.disabled);
    if (enabled.length === 0) return;
    const currentPos = enabled.findIndex(({ i }) => i === fromIndex);
    const nextPos = (currentPos + direction + enabled.length) % enabled.length;
    const next = enabled[nextPos];
    if (next) onChange(next.opt.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        selectNext(i, 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        selectNext(i, -1);
        break;
    }
  };

  const classes = ["vvp-ui-pill-group", className].filter(Boolean).join(" ");

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={classes}
      data-size={size}
    >
      {options.map((option, i) => {
        const checked = option.value === value;
        return (
          <button
            key={option.value}
            id={`${groupId}-${option.value}`}
            type="button"
            role="radio"
            aria-checked={checked}
            disabled={disabled || option.disabled}
            tabIndex={checked ? 0 : -1}
            className="vvp-ui-pill-group__option"
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
