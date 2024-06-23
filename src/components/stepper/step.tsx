import classNames from "classnames";
import { Check } from 'lucide-react';
import React from "react";

export type StepProps = React.ComponentPropsWithoutRef<'div'> & {
  step: number
  state?: 'active' | 'done'
  icon?: React.ReactElement
};

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ children, style, className, step, state, icon, ...props }, ref) => (
    <div role="listitem" ref={ref}
      className={classNames("axlotl-step",
        state == "active" && "active",
        state == "done" && "done",
        className)}
      style={{ ...style }}
      {...props}
    >
      <div className="step-container">
        <span className={classNames("circle")}>
          {icon
            ? icon
            : state == 'done' ? <Check /> : step
          }
          <span className="circle-bg" />
        </span>

        <div className="step-label">
          {children}
        </div>
      </div>

      <div className="line">
        <div className="line-bg" />
      </div>

    </div>
  )
);

Step.displayName = "Step";