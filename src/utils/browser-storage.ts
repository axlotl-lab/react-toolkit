
export type StorageKey = string;

/**
 * Stores an object in the specified storage.
 * @param storage - The storage (localStorage or sessionStorage).
 * @param key - The key under which the object is stored.
 * @param value - The object to store.
 * @param expiration - (Optional) Time in milliseconds before the object expires.
 */
const setObjectItem = (storage: Storage, key: string, value: any, expiration?: number) => {
  if (!value) {
    storage.removeItem(key);
    return;
  }
  const item = {
    value,
    expiration: expiration ? Date.now() + expiration : null
  };
  storage.setItem(key, JSON.stringify(item));
};

/**
 * Retrieves an object from the specified storage.
 * @param storage - The storage (localStorage or sessionStorage).
 * @param key - The key under which the object is stored.
 * @returns The retrieved object or undefined if it doesn't exist or has expired.
 */
const getObjectItem = <T = any>(storage: Storage, key: string): T | undefined => {
  const item = storage.getItem(key);
  if (item) {
    const parsed = JSON.parse(item);
    if (parsed.expiration && Date.now() > parsed.expiration) {
      storage.removeItem(key);
      return undefined;
    }
    return parsed.value as T;
  }
  return undefined;
};

/**
 * Utilities for handling objects in sessionStorage.
 */
export const SessionStorageUtils = {
  setObject: (key: StorageKey, obj: any, expiration?: number) => setObjectItem(sessionStorage, key, obj, expiration),
  getObject: <T = any>(key: StorageKey): T | undefined => getObjectItem<T>(sessionStorage, key),
  remove: (key: StorageKey) => sessionStorage.removeItem(key)
};

/**
 * Utilities for handling objects in localStorage.
 */
export const LocalStorageUtils = {
  setObject: (key: StorageKey | string, obj: any, expiration?: number) => setObjectItem(localStorage, key, obj, expiration),
  getObject: <T = any>(key: StorageKey | string): T | undefined => getObjectItem<T>(localStorage, key),
  remove: (key: StorageKey) => localStorage.removeItem(key)
};