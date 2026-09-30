import type { ElementType, HTMLAttributes, ReactNode } from "react";

import "./MetaText.css";

export interface MetaTextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /**
   * Element to render. Defaults to an inline `span`; use `p` or `div` when
   * the line should sit on its own under a title.
   */
  as?: ElementType;
}

/**
 * Secondary info line — author, date, duration, reading time, category.
 * Small size + muted color, for the "meta" text that sits under a title
 * or alongside a badge, so it looks the same everywhere instead of each
 * consumer picking its own font-size/color for the same kind of content.
 * Mirrors vvp_app's `Typography type="meta"` role, which resolves to the
 * same --vvp-text-muted token.
 */
export function MetaText({
  as: Component = "span",
  className,
  children,
  ...rest
}: MetaTextProps) {
  const classes = ["vvp-ui-meta-text", className].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
