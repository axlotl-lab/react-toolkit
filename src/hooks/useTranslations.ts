type NestedTranslations<T> = {
  [K in keyof T]: T[K] extends Record<string, string>
  ? T[K]
  : NestedTranslations<T[K]>
};

type Join<K, P> = K extends string | number ?
  P extends string | number ?
  `${K}${"" extends P ? "" : "."}${P}`
  : never : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

type FlattenObjectKeys<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
  { [K in keyof T]: K extends string | number ?
    T[K] extends Record<string, string> ? `${K}` :
    T[K] extends object ? Join<K, FlattenObjectKeys<T[K], Prev[D]>> :
    never : never
  }[keyof T] : "";

export const useTranslations = <T extends Record<string, any>>(
  locale: string,
  keys: NestedTranslations<T>,
  defaultLocale: string = 'en'
) => {
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
    const translation = getNestedValue(keys, key as string);

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