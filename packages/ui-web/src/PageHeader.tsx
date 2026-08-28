import type { HTMLAttributes, ReactNode } from "react";

import "./PageHeader.css";

export interface PageHeaderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /**
   * Small tag rendered above the title — e.g. a category `Badge`. Omit for
   * pages where the title is the top-level label with nothing above it.
   */
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}

/**
 * Page/section hero: optional eyebrow tag, title, optional description.
 * Matches the eyebrow → h1 → intro-copy pattern already hand-built on
 * ai.volksverpetzer.de and the crowdfunding site's campaign pages, so new
 * pages get the same title/description type scale for free instead of
 * reimplementing it with raw Tailwind classes each time.
 *
 * Deliberately stops at the description — the content that follows (a
 * form, a list, a card) is the page's own concern, not this component's.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  ...rest
}: PageHeaderProps) {
  const classes = ["vvp-ui-page-header", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...rest}>
      {eyebrow ? (
        <div className="vvp-ui-page-header__eyebrow">{eyebrow}</div>
      ) : null}
      <h1 className="vvp-ui-page-header__title">{title}</h1>
      {description ? (
        <p className="vvp-ui-page-header__description">{description}</p>
      ) : null}
    </div>
  );
}
