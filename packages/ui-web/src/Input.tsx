import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

import "./Input.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * Shared brand text input. Styled entirely off the `--vvp-*` custom
 * properties emitted by `@volksverpetzer/design-tokens`, same as `Button`.
 * Mark a field invalid with the native `aria-invalid` attribute rather than
 * a bespoke `invalid` prop, so it composes with whatever validation a
 * consumer already has (react-hook-form, Formik, or hand-rolled).
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...rest },
  ref,
) {
  const classes = ["vvp-ui-input", className].filter(Boolean).join(" ");

  return <input ref={ref} className={classes} {...rest} />;
});
