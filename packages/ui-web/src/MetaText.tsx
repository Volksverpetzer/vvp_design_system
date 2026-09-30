import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import "./MetaText.css";

export type MetaTextProps<T extends ElementType = "span"> = {
  children: ReactNode;
  /**
   * Element to render. Defaults to an inline `span`; use `p` or `div` when
   * the line should sit on its own under a title. Remaining props are typed
   * for the chosen element.
   */
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/**
 * Secondary info line — author, date, duration, reading time, category.
 * Small size + muted color, for the "meta" text that sits under a title
 * or alongside a badge, so it looks the same everywhere instead of each
 * consumer picking its own font-size/color for the same kind of content.
 * Mirrors vvp_app's `Typography type="meta"` role, which resolves to the
 * same --vvp-text-muted token.
 */
export function MetaText<T extends ElementType = "span">({
  as,
  className,
  children,
  ...rest
}: MetaTextProps<T>) {
  const Component: ElementType = as ?? "span";
  const classes = ["vvp-ui-meta-text", className].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
