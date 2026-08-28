import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

import "./InputButton.css";
import { Button } from "./Button";
import { Input } from "./Input";

// useLayoutEffect warns when it runs during SSR (no DOM to measure yet);
// useEffect is a no-op there and picks up the real measurement on mount.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface InputButtonProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "children"
> {
  /** Rendered inside the embedded action button, e.g. "Shorten". */
  buttonLabel: ReactNode;
  /** Disables just the action button — the input stays interactive (e.g. while a submission triggered by it is in flight). */
  buttonDisabled?: boolean;
  /** aria-label for the action button, for icon-only labels. */
  buttonAriaLabel?: string;
}

/**
 * A text input with a primary action button embedded in its right edge —
 * the "paste a value and go" pattern (a URL shortener, an email signup
 * field). Composes `Input` and `Button` (`variant="primary"`, `size="sm"`,
 * `type="submit"`) rather than inventing new styling.
 *
 * The button's own rendered width is measured and applied as the input's
 * right padding, so a longer label (e.g. a "Shortening…" loading state)
 * never overlaps typed text. A fixed fallback covers the brief window
 * before that measurement lands (first paint, or SSR).
 */
export const InputButton = forwardRef<HTMLInputElement, InputButtonProps>(
  function InputButton(
    { buttonLabel, buttonDisabled, buttonAriaLabel, style, ...rest },
    ref,
  ) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [buttonWidth, setButtonWidth] = useState(0);

    useIsomorphicLayoutEffect(() => {
      const button = buttonRef.current;
      if (!button) return;

      const observer = new ResizeObserver(([entry]) => {
        setButtonWidth(
          entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width,
        );
      });
      observer.observe(button);
      return () => observer.disconnect();
    }, []);

    return (
      <div className="vvp-ui-input-button">
        <Input
          ref={ref}
          className="vvp-ui-input-button__field"
          style={{
            ...style,
            paddingRight: buttonWidth ? buttonWidth + 8 : undefined,
          }}
          {...rest}
        />
        <Button
          ref={buttonRef}
          type="submit"
          size="sm"
          disabled={buttonDisabled}
          aria-label={buttonAriaLabel}
          className="vvp-ui-input-button__action"
        >
          {buttonLabel}
        </Button>
      </div>
    );
  },
);
