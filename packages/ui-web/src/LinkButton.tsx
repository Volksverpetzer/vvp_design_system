import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import type { ButtonSize } from "./Button";
import "./Button.css";
import "./LinkButton.css";

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  size?: ButtonSize;
  children: ReactNode;
}

/**
 * Anchor-based counterpart to `Button` — for navigation (external links,
 * downloads), where an actual link is the correct element, not a button
 * with an onClick that changes location.
 *
 * Unlike `Button`, this has no `variant` choice: a link is inherently a
 * secondary/tertiary action, never a page's primary CTA, so it always
 * renders the one bordered, low-emphasis look (see LinkButton.css) rather
 * than reusing `Button`'s ghost variant directly — `Button`'s ghost shape
 * is shared with `ThemeToggle`, which needs its own pill/circle geometry.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton({ size = "md", className, children, ...rest }, ref) {
    const classes = [
      "vvp-ui-btn",
      "vvp-ui-linkbtn",
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
