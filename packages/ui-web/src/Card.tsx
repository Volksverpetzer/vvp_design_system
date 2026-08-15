import type { HTMLAttributes, ReactNode } from "react";

import "./Card.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  children: ReactNode;
}

/** Generic content surface — section grouping, list items, form containers. */
export function Card({
  bordered = false,
  className,
  children,
  ...rest
}: CardProps) {
  const classes = [
    "vvp-ui-card",
    bordered && "vvp-ui-card--bordered",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
