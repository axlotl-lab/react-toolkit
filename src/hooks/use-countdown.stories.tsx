import type { StoryObj } from '@storybook/react';
import React from 'react';
import { useCountdown } from './use-countdown';

const meta = {
  title: 'Hooks/useCountdown'
}

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
  render: function () {
    const { count, isRunning, start, stop, reset } = useCountdown({ initialCount: 50 });

    return (
      <div>
        <p>Countdown: {count}</p>
        <p>Status: {isRunning ? 'Running' : 'Stopped'}</p>
        <button onClick={start} disabled={isRunning}>Start</button>
        <button onClick={stop} disabled={!isRunning}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
    )
  }
};