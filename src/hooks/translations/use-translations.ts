import { FlattenObjectKeys, NestedTranslations } from "./types";

type UseTranslationsProps<T extends Record<string, any>> = {
  locale: string,
  translations: NestedTranslations<T>,
  defaultLocale?: string
}

export const useTranslations = <T extends Record<string, any>>({ locale, translations, defaultLocale = 'en' }: UseTranslationsProps<T>) => {
  const getNestedValue = (obj: any, path: string): string | undefined => {
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
      if (current[part] === undefined) {
        return undefined;
      }
      current = current[part];
    }
    return typeof current === 'object' ? current[locale] || current[defaultLocale] : undefined;
  };

  return (key: FlattenObjectKeys<T>, params?: Record<string, string | number>): string => {
    const translation = getNestedValue(translations, key as string);

    if (translation === undefined) {
      console.warn(`Translation key "${key}" not found`);
      return key as string;
    }

    let result = translation;
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        result = result.replace(`{${param}}`, String(value));
      });
    }

    return result;
  };
};