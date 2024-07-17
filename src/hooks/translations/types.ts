type Join<K, P> = K extends string | number ?
  P extends string | number ?
  `${K}${"" extends P ? "" : "."}${P}`
  : never : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

export type NestedTranslations<T> = {
  [K in keyof T]: T[K] extends Record<string, string>
  ? T[K]
  : NestedTranslations<T[K]>
};

export type FlattenObjectKeys<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
  { [K in keyof T]: K extends string | number ?
    T[K] extends Record<string, string> ? `${K}` :
    T[K] extends object ? Join<K, FlattenObjectKeys<T[K], Prev[D]>> :
    never : never
  }[keyof T] : "";