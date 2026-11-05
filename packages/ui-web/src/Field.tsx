import { cloneElement, isValidElement } from "react";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";

import "./Field.css";

export interface FieldProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Visible label above the control. */
  label: ReactNode;
  /**
   * `id` of the control. Renders the label as `<label htmlFor>` and derives
   * the hint/error ids (`<htmlFor>-hint`, `<htmlFor>-error`) that get wired
   * to the control's `aria-describedby`. Leave it out for composite
   * controls like `PillGroup`, which have no single labelable element:
   * the label is then a plain `<span>` with `labelId`, for the control's
   * `aria-labelledby`.
   */
  htmlFor?: string;
  /** `id` of the label when there is no `htmlFor` (see above). */
  labelId?: string;
  /** Muted help text below the control. */
  hint?: ReactNode;
  /**
   * Validation message below the control. Also sets `aria-invalid` on the
   * control, which `Input` styles as invalid.
   */
  error?: ReactNode;
  /** The control, e.g. an `Input`. */
  children: ReactNode;
}

/**
 * Label + control + optional hint/error, stacked — the form-field layout
 * every app otherwise rebuilds with its own `.field` CSS. With `htmlFor`
 * and a single element child, the hint/error are linked to the control via
 * `aria-describedby` automatically. Spacing between fields is up to the
 * surrounding layout (e.g. a flex/grid gap), not this component.
 */
export function Field({
  label,
  htmlFor,
  labelId,
  hint,
  error,
  children,
  className,
  ...rest
}: FieldProps) {
  const classes = ["vvp-ui-field", className].filter(Boolean).join(" ");
  const hintId = htmlFor && hint ? `${htmlFor}-hint` : undefined;
  const errorId = htmlFor && error ? `${htmlFor}-error` : undefined;

  let control = children;
  if (htmlFor && isValidElement(children)) {
    const child = children as ReactElement<{
      "aria-describedby"?: string;
      "aria-invalid"?: boolean | "true" | "false";
    }>;
    const describedBy = [child.props["aria-describedby"], hintId, errorId]
      .filter(Boolean)
      .join(" ");
    control = cloneElement(child, {
      "aria-describedby": describedBy || undefined,
      ...(error ? { "aria-invalid": true } : {}),
    });
  }

  return (
    <div className={classes} {...rest}>
      {htmlFor ? (
        <label className="vvp-ui-field__label" htmlFor={htmlFor}>
          {label}
        </label>
      ) : (
        <span className="vvp-ui-field__label" id={labelId}>
          {label}
        </span>
      )}
      {control}
      {hint && (
        <small className="vvp-ui-field__hint" id={hintId}>
          {hint}
        </small>
      )}
      {error && (
        <small className="vvp-ui-field__error" id={errorId}>
          {error}
        </small>
      )}
    </div>
  );
}
