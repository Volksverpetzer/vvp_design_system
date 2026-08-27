import type { HTMLAttributes } from "react";

import "./Alert.css";

export type AlertVariant = "neutral" | "error";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** @default "neutral" */
  variant?: AlertVariant;
}

/**
 * Inline form/status feedback — validation errors, submission results.
 * Plain container like `Card`; put whatever content (text, a title, an
 * icon) you need inside.
 */
export function Alert({ variant = "neutral", className, ...rest }: AlertProps) {
  const classes = [
    "vvp-ui-alert",
    variant === "error" && "vvp-ui-alert--error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div role="alert" className={classes} {...rest} />;
}
