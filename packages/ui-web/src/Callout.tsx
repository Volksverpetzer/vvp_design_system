import type { HTMLAttributes, ReactNode } from "react";

import "./Callout.css";

export type CalloutVariant = "info" | "warning" | "success" | "error";

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  /** @default "info" */
  variant?: CalloutVariant;
  /** Shown left of the content in the variant color — an SVG icon. */
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * Highlighted note inside running text — corrections, "Update:" notes,
 * warnings in an article. A colored stripe on the left and a light tint of
 * the same color; the text keeps the normal text color. Unlike `Alert`
 * (form/status feedback, announced to screen readers), this is static
 * content, so it is a `note`, not an `alert`.
 *
 * vvp_app renders the same look natively from the same color tokens, and
 * vvp_wp_patches renders legacy WPBakery message boxes with these classes.
 */
export function Callout({
  variant = "info",
  icon,
  className,
  children,
  ...rest
}: CalloutProps) {
  const classes = ["vvp-ui-callout", `vvp-ui-callout--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div role="note" className={classes} {...rest}>
      {icon ? (
        <span className="vvp-ui-callout__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <div className="vvp-ui-callout__content">{children}</div>
    </div>
  );
}
