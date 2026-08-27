import { forwardRef } from "react";
import type { CSSProperties, InputHTMLAttributes } from "react";

import "./Slider.css";

export interface SliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "onChange"
> {
  value: number;
  min?: number;
  max: number;
  step?: number;
  onValueChange?: (value: number) => void;
}

/**
 * Single-thumb range control — audio/video scrubbing, volume, numeric
 * filters. A native `<input type="range">` under the hood (keyboard, touch,
 * and screen-reader support come for free) themed with `--vvp-*` tokens.
 * The filled portion up to the thumb is a CSS gradient driven by a custom
 * property computed from `value`, so no extra DOM is needed for the track.
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { value, min = 0, max, step = 1, onValueChange, className, style, ...rest },
  ref,
) {
  const rawPercent = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const percent = Math.min(100, Math.max(0, rawPercent));
  const classes = ["vvp-ui-slider", className].filter(Boolean).join(" ");
  const fillStyle = {
    ...style,
    "--vvp-ui-slider-fill": `${percent}%`,
  } as CSSProperties;

  return (
    <input
      ref={ref}
      type="range"
      className={classes}
      value={value}
      min={min}
      max={max}
      step={step}
      style={fillStyle}
      onChange={(event) => onValueChange?.(event.target.valueAsNumber)}
      {...rest}
    />
  );
});
