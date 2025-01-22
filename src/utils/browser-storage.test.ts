import { LocalStorageUtils, SessionStorageUtils } from "./browser-storage";

describe('Storage Utils', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('LocalStorageUtils', () => {
    it('should store and retrieve an object', () => {
      const key = "settings";
      const value = { theme: "dark" };

      LocalStorageUtils.setObject(key, value);
      const retrieved = LocalStorageUtils.getObject<typeof value>(key);

      expect(retrieved).toEqual(value);
    });

    it('should remove an item', () => {
      const key = "settings";
      LocalStorageUtils.setObject(key, { theme: "dark" });
      LocalStorageUtils.remove(key);

      const retrieved = LocalStorageUtils.getObject(key);
      expect(retrieved).toBeUndefined();
    });

    it('should not retrieve an expired item', () => {
      const key = "settings";
      const value = { theme: "dark" };

      // Set item with expiration of 1 millisecond
      LocalStorageUtils.setObject(key, value, 1);
      // Wait for 2 milliseconds
      setTimeout(() => {
        const retrieved = LocalStorageUtils.getObject<typeof value>(key);
        expect(retrieved).toBeUndefined();
      }, 2);
    });
  });

  describe('SessionStorageUtils', () => {
    it('should store and retrieve an object', () => {
      const key = "user";
      const value = { name: "John" };

      SessionStorageUtils.setObject(key, value);
      const retrieved = SessionStorageUtils.getObject<typeof value>(key);

      expect(retrieved).toEqual(value);
    });

    it('should remove an item', () => {
      const key = "user";
      SessionStorageUtils.setObject(key, { name: "John" });
      SessionStorageUtils.remove(key);

      const retrieved = SessionStorageUtils.getObject(key);
      expect(retrieved).toBeUndefined();
    });

    it('should not retrieve an expired item', () => {
      const key = "user";
      const value = { name: "John" };

      // Set item with expiration of 1 millisecond
      SessionStorageUtils.setObject(key, value, 1);
      // Wait for 2 milliseconds
      setTimeout(() => {
        const retrieved = SessionStorageUtils.getObject<typeof value>(key);
        expect(retrieved).toBeUndefined();
      }, 2);
    });
  });
});