import type { StoryObj } from '@storybook/react';
import React from 'react';
import { useDebounce } from './use-debounce';

const meta = {
  title: 'Hooks/useDebounce'
}

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
  render: function () {
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search, 300);

    React.useEffect(() => {
      // Esta función solo se ejecutará 300ms después del último cambio
      console.log('Buscando:', debouncedSearch);
    }, [debouncedSearch]);

    return (
      <>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div>{debouncedSearch}</div>
      </>
    );
  }
};