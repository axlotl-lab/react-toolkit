import { renderHook } from '@testing-library/react';
import React from 'react';
import { setGlobalTranslations, useTranslations } from './../translations';

jest.mock('./use-locale');

describe('Translations', () => {
  describe('setGlobalTranslations', () => {
    it('should set global translations correctly', () => {
      const globalTranslations = {
        common: {
          hello: {
            en: 'Hello',
            es: 'Hola'
          }
        }
      };
      setGlobalTranslations(globalTranslations);
      const t = useTranslations({ locale: 'en' });
      expect(t('common.hello' as any)).toBe('Hello');
    });
  });

  describe('useTranslations', () => {
    const localTranslations = {
      greetings: {
        goodMorning: {
          en: 'Good morning',
          es: 'Buenos días'
        }
      }
    };

    it('should return correct translation for the given locale', () => {
      const t = useTranslations({ locale: 'es', translations: localTranslations });
      expect(t('greetings.goodMorning')).toBe('Buenos días');
    });

    it('should fall back to default locale if translation is missing', () => {
      const t = useTranslations({ locale: 'fr', translations: localTranslations, defaultLocale: 'en' });
      expect(t('greetings.goodMorning')).toBe('Good morning');
    });

    it('should merge global and local translations', () => {
      setGlobalTranslations({
        common: {
          hello: {
            en: 'Hello',
            es: 'Hola'
          }
        }
      });
      const t = useTranslations({ locale: 'es', translations: localTranslations });
      expect(t('common.hello' as any)).toBe('Hola');
      expect(t('greetings.goodMorning')).toBe('Buenos días');
    });

    it('should handle nested keys correctly', () => {
      const nestedTranslations = {
        very: {
          nested: {
            key: {
              en: 'Nested value',
              es: 'Valor anidado'
            }
          }
        }
      };
      const t = useTranslations({ locale: 'es', translations: nestedTranslations });
      expect(t('very.nested.key')).toBe('Valor anidado');
    });

    it('should interpolate values correctly', () => {
      const interpolationTranslations = {
        welcome: {
          en: 'Welcome, {name}!',
          es: '¡Bienvenido, {name}!'
        }
      };
      const t = useTranslations({ locale: 'en', translations: interpolationTranslations });
      expect(t('welcome', { name: 'John' })).toBe('Welcome, John!');
    });

    it('should handle rich text translations', () => {
      const richTextTranslations = {
        richWelcome: {
          en: 'Welcome, <name>John</name>!',
          es: '¡Bienvenido, <name>Juan</name>!'
        }
      };
      const t = useTranslations({ locale: 'en', translations: richTextTranslations });
      const result = t.rich('richWelcome', {
        name: (content) => <strong>{content}</strong>
      });
      expect(result).toEqual(['Welcome, ', <strong>John</strong>, '!']);
    });

    it('should return key if translation is not found', () => {
      const t = useTranslations({ locale: 'en', translations: {} });
      expect(t('nonexistent.key' as any)).toBe('nonexistent.key');
    });

    it('should maintain separate translations for multiple hook calls', () => {
      // Primera llamada al hook
      const { result: result1 } = renderHook(() =>
        useTranslations({
          locale: 'es',
          translations: {
            key1: { es: 'Valor 1', en: 'Value 1' },
            shared: { es: 'Compartido 1', en: 'Shared 1' }
          }
        })
      );

      // Segunda llamada al hook
      const { result: result2 } = renderHook(() =>
        useTranslations({
          locale: 'es',
          translations: {
            key2: { es: 'Valor 2', en: 'Value 2' },
            shared: { es: 'Compartido 2', en: 'Shared 2' }
          }
        })
      );

      // Verificar que cada hook mantiene sus propias traducciones
      expect(result1.current('key1')).toBe('Valor 1');
      expect(result2.current('key2')).toBe('Valor 2');

      // Verificar que las claves compartidas no se pisan entre sí
      expect(result1.current('shared')).toBe('Compartido 1');
      expect(result2.current('shared')).toBe('Compartido 2');

      // Verificar que las claves no definidas en un hook no afectan al otro
      expect(result1.current('key2' as any)).toBe('key2');
      expect(result2.current('key1' as any)).toBe('key1');
    });

    describe('handling non-existent keys', () => {
      let consoleSpy: jest.SpyInstance;

      beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
      });

      afterEach(() => {
        consoleSpy.mockRestore();
      });

      const localTranslations = {
        existingKey: {
          en: 'Existing translation'
        },
        parent: {
          child: {
            en: 'Nested translation'
          }
        },
        richKey: {
          en: 'Rich <bold>translation</bold>'
        }
      };

      it('should return the key and log a warning when the translation key does not exist for static messages', () => {
        const t = useTranslations({ locale: 'en', translations: localTranslations });

        const nonExistentKey = 'non.existent.key';
        const result = t(nonExistentKey as any);

        expect(result).toBe(nonExistentKey);
        expect(consoleSpy).toHaveBeenCalledWith(`Translation key "${nonExistentKey}" not found`);
      });

      it('should return the key for non-existent nested keys for static messages', () => {
        const t = useTranslations({ locale: 'en', translations: localTranslations });

        const nonExistentNestedKey = 'parent.nonexistent.key';
        const result = t(nonExistentNestedKey as any);

        expect(result).toBe(nonExistentNestedKey);
        expect(consoleSpy).toHaveBeenCalledWith(`Translation key "${nonExistentNestedKey}" not found`);
      });

      it('should return the key and log a warning when the translation key does not exist for rich messages', () => {
        const t = useTranslations({ locale: 'en', translations: localTranslations });

        const nonExistentKey = 'non.existent.rich.key';
        const result = t.rich(nonExistentKey as any);

        expect(result).toBe(nonExistentKey);
        expect(consoleSpy).toHaveBeenCalledWith(`Translation key "${nonExistentKey}" not found`);
      });

      it('should return the key for non-existent nested keys for rich messages', () => {
        const t = useTranslations({ locale: 'en', translations: localTranslations });

        const nonExistentNestedKey = 'parent.nonexistent.rich.key';
        const result = t.rich(nonExistentNestedKey as any);

        expect(result).toBe(nonExistentNestedKey);
        expect(consoleSpy).toHaveBeenCalledWith(`Translation key "${nonExistentNestedKey}" not found`);
      });

      it('should handle existing keys correctly for both static and rich messages', () => {
        const t = useTranslations({ locale: 'en', translations: localTranslations });

        expect(t('existingKey')).toBe('Existing translation');
        expect(t('parent.child')).toBe('Nested translation');

        const richResult = t.rich('richKey', { bold: (content) => <b>{content}</b> });
        expect(richResult).toEqual(['Rich ', <b>translation</b>]);

        expect(consoleSpy).not.toHaveBeenCalled();
      });
    });

    describe('checking if translation key exists', () => {
      const localTranslations = {
        existingKey: {
          en: 'Existing translation'
        },
      };

      it('should return false if the key does not exist', () => {
        const t = useTranslations({ locale: 'en', translations: localTranslations });

        const nonExistentKey = 'non.existent.key';
        const nonExistingResult = t.exists(nonExistentKey as any);
        const existingResult = t.exists('existingKey');

        expect(nonExistingResult).toBeFalsy();
        expect(existingResult).toBeTruthy();
      });
    })

    describe('not using using translations provider', () => {

      it('should fail if the locale is not passed to the hook', () => {

        const translations = {
          hello: { en: "Hello", es: "Hola" }
        };

        const t = () => {
          renderHook(() => useTranslations({ translations }));
        }

        expect(t).toThrow();
      })
    })
  });
});