import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import type { ButtonSize, ButtonVariant } from "./Button";
import "./Button.css";

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

/**
 * Same look and variants as `Button`, rendered as an `<a>` instead of a
 * `<button>` — for navigation (external links, downloads), where an actual
 * link is the correct element, not a button with an onClick that changes
 * location. Shares Button.css's classes directly; nothing in there is
 * scoped to the `<button>` tag.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(
    { variant = "primary", size = "md", className, children, ...rest },
    ref,
  ) {
    const classes = [
      "vvp-ui-btn",
      `vvp-ui-btn--${variant}`,
      `vvp-ui-btn--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <a ref={ref} className={classes} {...rest}>
        {children}
      </a>
    );
  },
);
