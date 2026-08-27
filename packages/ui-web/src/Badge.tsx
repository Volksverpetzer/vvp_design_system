import type { HTMLAttributes, ReactNode } from "react";

import "./Badge.css";

export type BadgeVariant =
  "primary" | "accent" | "neutral" | "error" | "pruefpunkt";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Rendered before the label — an SVG icon, sized to match the text. */
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * Small pill label — category tags, status markers, counts. Soft/tinted
 * style (a light tint of the variant color as background, the variant
 * color itself as text) rather than a solid fill, so it reads as a label
 * rather than a button.
 */
export function Badge({
  variant = "neutral",
  icon,
  className,
  children,
  ...rest
}: BadgeProps) {
  const classes = ["vvp-ui-badge", `vvp-ui-badge--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {icon ? (
        <span className="vvp-ui-badge__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}
