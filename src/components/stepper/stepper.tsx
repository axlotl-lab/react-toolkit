import classNames from "classnames";
import React, { ComponentPropsWithoutRef } from "react";

type StepperProps = ComponentPropsWithoutRef<'div'> & {

};

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ children, style, className, ...props }, ref) => (
    <div role="listbox" ref={ref}
      className={classNames("axlotl-stepper", className)}
      style={{ ...style }}
      {...props}
    >
      {children}
    </div>
  )
);

Stepper.displayName = "Stepper";

export { Stepper };
export type { StepperProps };

