import type { ButtonHTMLAttributes, ReactNode } from "react";

import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

/**
 * Shared brand button. Styled entirely off the `--vvp-*` custom properties
 * emitted by `@volksverpetzer/design-tokens` — the consuming app is
 * responsible for loading a brand's token CSS (or SCSS, for Divi) before
 * this renders.
 */
export function Button({ variant = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  const classes = ["vvp-ui-btn", `vvp-ui-btn--${variant}`, `vvp-ui-btn--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
