import type { HTMLAttributes, ReactNode } from "react";

import "./MetaText.css";

export interface MetaTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

/**
 * Secondary info line — author, date, duration, reading time, category.
 * Small size + muted color, for the "meta" text that sits under a title
 * or alongside a badge, so it looks the same everywhere instead of each
 * consumer picking its own font-size/color for the same kind of content.
 * Mirrors vvp_app's `Typography type="meta"` role, which resolves to the
 * same --vvp-text-muted token.
 */
export function MetaText({ className, children, ...rest }: MetaTextProps) {
  const classes = ["vvp-ui-meta-text", className].filter(Boolean).join(" ");

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
