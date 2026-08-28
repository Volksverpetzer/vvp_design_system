import type { HTMLAttributes, ReactNode } from "react";

import type { BadgeVariant } from "./Badge";
import { Badge } from "./Badge";
import { ThemeToggle } from "./ThemeToggle";
import "./ToolPage.css";

export interface ToolPageTag {
  label: ReactNode;
  variant?: BadgeVariant;
}

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.15 0 1.55-.01 2.81-.01 3.19 0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
  </svg>
);

export interface ToolPageProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  icon?: ReactNode;
  title: ReactNode;
  /** Small badges rendered below the title, e.g. feature/category tags. */
  tags?: ToolPageTag[];
  /** The page's actual content — a search input, an audio list, a form. */
  children: ReactNode;
  /** Muted note rendered below `children` — usage hints, empty-state help. */
  helpText?: ReactNode;
  /** Renders a GitHub icon link in the top-right corner, next to the theme toggle. */
  githubUrl?: string;
  /** @default true */
  background?: boolean;
}

/**
 * Full-page shell for a single-purpose tool page — the pattern shared by
 * ai.volksverpetzer.de (icon + centered title, a search input, tag pills)
 * and this app's audio converter list. Centered icon/title/tags header,
 * full-width content slot, optional help text below it, a fixed top-right
 * corner with `ThemeToggle` and an optional GitHub link, and (by default)
 * a decorative jagged brand-blue shape along the top edge.
 */
export function ToolPage({
  icon,
  title,
  tags,
  children,
  helpText,
  githubUrl,
  background = true,
  className,
  ...rest
}: ToolPageProps) {
  const classes = ["vvp-ui-tool-page", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...rest}>
      {background ? (
        <div className="vvp-ui-tool-page__background" aria-hidden="true">
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="var(--vvp-primary, #1b7194)"
          >
            <path d="M0,0 L0,140 L75,70 L155,160 L235,50 L310,170 L390,80 L465,175 L545,60 L620,150 L700,40 L775,165 L855,75 L935,175 L1010,55 L1090,145 L1165,65 L1245,165 L1320,85 L1440,130 L1440,0 Z" />
          </svg>
        </div>
      ) : null}

      <div className="vvp-ui-tool-page__topbar">
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="vvp-ui-btn vvp-ui-btn--ghost vvp-ui-btn--sm vvp-ui-tool-page__icon-link"
          >
            <GithubIcon />
          </a>
        ) : null}
        <ThemeToggle />
      </div>

      <div className="vvp-ui-tool-page__inner">
        <div className="vvp-ui-tool-page__header">
          <h1 className="vvp-ui-tool-page__title">
            {icon ? (
              <span className="vvp-ui-tool-page__icon" aria-hidden="true">
                {icon}
              </span>
            ) : null}
            {title}
          </h1>
          {tags && tags.length > 0 ? (
            <div className="vvp-ui-tool-page__tags">
              {tags.map((tag, index) => (
                <Badge key={index} variant={tag.variant ?? "neutral"} size="sm">
                  {tag.label}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>

        <div className="vvp-ui-tool-page__content">{children}</div>

        {helpText ? <p className="vvp-ui-tool-page__help">{helpText}</p> : null}
      </div>
    </div>
  );
}
