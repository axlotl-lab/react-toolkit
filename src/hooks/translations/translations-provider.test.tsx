import { render } from '@testing-library/react';
import React from 'react';
import { TranslationsProvider, TranslationsProviderContext } from './translations-provider';

describe('TranslationsProvider', () => {
  it('should provide the locale to its children', () => {
    const TestComponent = () => {
      const context = React.useContext(TranslationsProviderContext);
      return <div>{context?.locale}</div>;
    };

    const { getByText } = render(
      <TranslationsProvider locale="en">
        <TestComponent />
      </TranslationsProvider>
    );

    expect(getByText('en')).toBeDefined();
  });

  it('should memoize the context value', () => {
    const TestComponent = () => {
      const context = React.useContext(TranslationsProviderContext);
      return <div>{context?.locale}</div>;
    };

    const { rerender, getByText } = render(
      <TranslationsProvider locale="en">
        <TestComponent />
      </TranslationsProvider>
    );

    expect(getByText('en')).toBeDefined();

    rerender(
      <TranslationsProvider locale="es">
        <TestComponent />
      </TranslationsProvider>
    );

    expect(getByText('es')).toBeDefined();
  });
});
