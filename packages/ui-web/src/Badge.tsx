import type { HTMLAttributes, ReactNode } from "react";

import "./Badge.css";

export type BadgeVariant = "primary" | "accent" | "neutral" | "error";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

/** Small pill label — category tags, status markers, counts. */
export function Badge({ variant = "neutral", className, children, ...rest }: BadgeProps) {
  const classes = ["vvp-ui-badge", `vvp-ui-badge--${variant}`, className].filter(Boolean).join(" ");

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
