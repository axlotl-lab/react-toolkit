import type { StoryObj } from '@storybook/react';
import React from 'react';
import { useLongPress } from './use-long-press';

const meta = {
  title: 'Hooks/useLongPress',
}

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
  render: function () {
    const longPressHandler = useLongPress({
      onLongPress: () => alert("Long press detected!"),
      onPress: () => alert("Short press detected!"),
      delay: 1000,
    });

    return (
      <div>
        <button
          {...longPressHandler}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Hold me!
        </button>
      </div>
    )
  }
};