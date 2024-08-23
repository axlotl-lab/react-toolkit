import React from "react";
import { TranslationsProviderContext } from "./translations-provider";

export const useLocale = () => {
  const context = React.useContext(TranslationsProviderContext);

  if (!context) {
    console.info('It seems that the provider `TranslationsProvider` is not implemented.')
  }

  return context?.locale;
};
