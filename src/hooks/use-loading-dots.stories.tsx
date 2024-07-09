import type { StoryObj } from '@storybook/react';
import React from 'react';
import { useLoadingDots } from './use-loading-dots';

const meta = {
  title: 'Hooks/useLoadingDots'
}

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
  render: function () {
    const dots = useLoadingDots(500);

    return (
      <div>
        <p>Loading{dots}</p>
      </div>
    )
  }
};