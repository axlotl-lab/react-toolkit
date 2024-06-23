import { Story } from '@storybook/blocks';
import { Meta, StoryObj } from "@storybook/react";
import { Eye, FlaskConical } from 'lucide-react';
import React from "react";
import { Step } from "./step";
import { Stepper } from "./stepper";

const meta: Meta = {
  title: 'Components/Stepper'
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    activeStep: 2
  },
  render: function Render(args: any) {
    const activeStep = args.activeStep;

    const steps = [
      { text: 'First', state: 'done' },
      { text: 'Second', state: 'done' },
      { text: 'Third', state: 'active' },
      { text: 'Fourth', state: 'pending' },
    ]

    return (
      <div style={{ width: '600px' }}>
        <Stepper>
          {steps.map((step, i) => {
            return (
              <Step key={i}
                state={
                  i + 1 == activeStep ? 'active' :
                    i + 1 < activeStep ? 'done' : undefined
                }
                step={i + 1}
              >
                {step.text}
              </Step>
            )
          })}
        </Stepper>
      </div>
    )
  }
};

export const DefaultWithIcons: Story = {
  args: {
    activeStep: 2
  },
  render: function Render(args: any) {
    const activeStep = args.activeStep;

    const steps = [
      { text: 'First', state: 'done' },
      { text: 'Second', state: 'done' },
      { text: 'Third', state: 'active' },
      { text: 'Fourth', state: 'pending' },
    ]

    return (
      <div style={{ width: '600px' }}>
        <Stepper>
          {steps.map((step, i) => {
            return (
              <Step
                key={i}
                state={
                  i + 1 == activeStep ? 'active' :
                    i + 1 < activeStep ? 'done' : undefined
                }
                step={i + 1}
                icon={i % 2 == 0 ? <Eye /> : <FlaskConical />}
              >
                {step.text}
              </Step>
            )
          })}
        </Stepper>
      </div>
    )
  }
};