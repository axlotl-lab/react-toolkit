import { deepMerge } from "../../utils/deep-merge";
import { FlattenObjectKeys, NestedTranslations } from "./types";


type AllTranslations<T> = GlobalTranslations & T;
type TranslationKey<T> = FlattenObjectKeys<AllTranslations<T>>;

type UseTranslationsProps<T extends Record<string, any>> = {
  locale: string,
  translations: NestedTranslations<T>,
  defaultLocale?: string
}

type ComponentFunction = (text?: string) => React.ReactNode;

type StaticTranslationFunction<T> = (
  key: TranslationKey<T>, values?: Record<string, string | number>
) => string

type RichTranslationFunction<T> = (
  key: TranslationKey<T>, components?: Record<string, ComponentFunction>
) => React.ReactNode

let globalTranslations = {};

export function setGlobalTranslations(translations: GlobalTranslations) {
  globalTranslations = translations;
}

export const useTranslations = <T extends Record<string, any>>({ locale, translations, defaultLocale = 'en' }: UseTranslationsProps<T>) => {
  const combinedTranslations = deepMerge(globalTranslations, translations);

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

  const staticMessages: StaticTranslationFunction<T> = (key, values): string => {
    const translation = getNestedValue(combinedTranslations, key as string);

    if (translation === undefined) {
      console.warn(`Translation key "${key}" not found`);
      return key as string;
    }

    let result = translation;
    if (values) {
      Object.entries(values).forEach(([param, value]) => {
        result = result.replace(new RegExp(`{${param}}`, 'g'), String(value));
      });
    }

    return result;
  };

  const richMessages: RichTranslationFunction<T> = (key, components = {}) => {
    const translation = getNestedValue(combinedTranslations, key as string);

    if (translation === undefined) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }

    const regex = /<(\w+)(\s*\/>|>(.*?)<\/\1>)/gs;
    let lastIndex = 0;
    const result: React.ReactNode[] = [];

    translation.replace(regex, (match, tag, _, content, index) => {
      if (index > lastIndex) {
        result.push(translation.slice(lastIndex, index));
      }

      if (components[tag]) {
        result.push(components[tag](content?.trim()));
      } else {
        result.push(match);
      }

      lastIndex = index + match.length;
      return match;
    });

    if (lastIndex < translation.length) {
      result.push(translation.slice(lastIndex));
    }

    return result;
  };

  const t = Object.assign(staticMessages, { rich: richMessages });

  return t;
};