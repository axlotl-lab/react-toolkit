'use client'

import React from 'react';

type TranslationsProviderContextType = { locale: string }
type TranslationsProviderProps = { children: React.ReactNode, locale: string }

export const TranslationsProviderContext = React.createContext<TranslationsProviderContextType | undefined>(undefined);

export const TranslationsProvider = ({ locale, children }: TranslationsProviderProps) => {
  const context = React.useMemo(() => {
    return { locale }
  }, [locale]);

  return (
    <TranslationsProviderContext.Provider value={context}>
      {children}
    </TranslationsProviderContext.Provider>
  );
};

TranslationsProvider.displayName = 'TranslationsProvider';