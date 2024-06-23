import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Repeater } from './repeater';

const meta = {
  title: 'Components/Repeater',
  component: Repeater,
} satisfies Meta<typeof Repeater>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 5,
    children: <p>Winter is coming</p>
  },
  argTypes: {
    children: { table: { disable: true } }
  }
};

