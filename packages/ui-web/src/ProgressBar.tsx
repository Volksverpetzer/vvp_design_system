import type { HTMLAttributes } from "react";

import "./ProgressBar.css";

export interface ProgressBarMilestone {
  value: number;
  label: string;
}

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  total: number;
  goal: number;
  /**
   * Stretch goals to render as separate segments, e.g. for a campaign with
   * multiple funding tiers. Omit (or pass a single entry) for a plain bar
   * with one segment running from 0 to `goal` — the common case.
   */
  milestones?: ProgressBarMilestone[];
}

const formatEuro = (value: number): string =>
  value.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " €";

/**
 * Campaign donation progress bar — one segment by default (0 to `goal`), or
 * multiple stacked segments when `milestones` has more than one entry.
 * Styled off the `--vvp-*` custom properties emitted by
 * `@volksverpetzer/design-tokens`, same as the other components here.
 */
export function ProgressBar({ total, goal, milestones, className, ...rest }: ProgressBarProps) {
  const steps: ProgressBarMilestone[] =
    milestones && milestones.length > 1 ? [...milestones].sort((a, b) => a.value - b.value) : [{ value: goal, label: "" }];
  const isSingleStep = steps.length === 1;
  const target = steps[steps.length - 1].value;

  const segments = steps.map((step, index) => {
    const start = index === 0 ? 0 : steps[index - 1].value;
    const range = step.value - start;
    const filled = Math.min(Math.max(total - start, 0), range);
    const percent = range > 0 ? Math.min(100, (filled / range) * 100) : 0;
    const width = target > 0 ? (range / target) * 100 : 0;
    return { ...step, start, range, filled, percent, width };
  });

  const classes = ["vvp-ui-progress", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...rest}>
      {isSingleStep ? (
        <div className="vvp-ui-progress__amounts">
          <span className="vvp-ui-progress__total">{formatEuro(total)}</span>
          <span className="vvp-ui-progress__goal"> von {formatEuro(goal)}</span>
        </div>
      ) : null}
      <div className="vvp-ui-progress__track-row" role="group" aria-label="Spendenfortschritt">
        {segments.map((segment, index) => {
          const valueNow = Math.min(Math.max(total, segment.start), segment.value);
          return (
            <div
              key={`${segment.value}-${index}`}
              className="vvp-ui-progress__step"
              style={{ flexBasis: `${segment.width}%`, flexGrow: segment.width, flexShrink: 0 }}
            >
              <div
                className="vvp-ui-progress__track"
                role="progressbar"
                aria-valuemin={segment.start}
                aria-valuemax={segment.value}
                aria-valuenow={valueNow}
                aria-valuetext={
                  isSingleStep
                    ? `${formatEuro(total)} von ${formatEuro(goal)}`
                    : `${formatEuro(total)} insgesamt gesammelt, ${formatEuro(segment.filled)} von ${formatEuro(segment.range)} für „${segment.label}“`
                }
                aria-label={
                  isSingleStep
                    ? `${formatEuro(total)} von ${formatEuro(goal)} gesammelt`
                    : `${segment.label} (${formatEuro(segment.value)})`
                }
              >
                <div className="vvp-ui-progress__fill" style={{ width: `${segment.percent}%` }} />
              </div>
              {!isSingleStep ? (
                <div className="vvp-ui-progress__step-label">
                  <strong>{segment.label}</strong>
                  <span>{formatEuro(segment.value)}</span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
