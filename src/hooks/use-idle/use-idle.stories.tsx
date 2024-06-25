import type { StoryObj } from '@storybook/react';
import React from 'react';
import { useIdle } from './use-idle';

const meta = {
  title: 'Hooks/useIdle'
}

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { secondsToIdle: 3 },
  render: function (args: any) {
    const idle = useIdle(args?.secondsToIdle);

    return (
      <div>
        {idle
          ? <p>Idle</p>
          : <p>Active</p>}
      </div>
    )
  }
};