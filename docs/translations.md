# useTranslations Hook

The `useTranslations` hook provides an easy way to manage translations in your React application. It supports nested keys, parameter interpolation, and rich content with React components.

## Setup

1. Wrap your app with the `TranslationsProvider`:

```jsx
import { TranslationsProvider } from '@axlotl-lab/react-toolkit/hooks';

function App() {
  return (
    <TranslationsProvider locale="en" fallbackLocale="en">
      <YourApp />
    </TranslationsProvider>
  );
}
```

2. Use the hook in your components:

```jsx
import { useTranslations } from '@axlotl-lab/react-toolkit/hooks';

function MyComponent() {
  const t = useTranslations({
    translations: {
      greeting: { en: 'Hello', es: 'Hola' },
      welcome: { en: 'Welcome, {name}!', es: '¡Bienvenido, {name}!' },
      richText: { en: 'This is <bold>important</bold>', es: 'Esto es <bold>importante</bold>' }
    }
  });

  return (
    <div>
      <p>{t('greeting')}</p>
      <p>{t('welcome', { name: 'John' })}</p>
      {t.rich('richText', {
        bold: (text) => <strong>{text}</strong>
      })}
    </div>
  );
}
```

## Features

- **Nested translations**: Access nested keys using dot notation.
- **Parameter interpolation**: Replace placeholders in translations.
- **Rich content**: Embed React components within translations.
- **Fallback locale**: Uses a default locale if a translation is missing.
- **Global translations**: Set translations that are available across your app.

## API

### useTranslations

```typescript
const t = useTranslations({ translations });
```

Returns an object with the following methods:

- `t(key: string, params?: Record<string, string>): string`
- `t.rich(key: string, components?: Record<string, (text?: string) => React.ReactNode>): React.ReactNode`
- `t.exists(key: string): boolean`

### setGlobalTranslations

Set global translations that are available throughout your app:

```typescript
import { setGlobalTranslations } from '@axlotl-lab/react-toolkit/hooks';

setGlobalTranslations({
  common: {
    submit: { en: 'Submit', es: 'Enviar' }
  }
});
```

### useLocale

Get the current locale:

```typescript
import { useLocale } from '@axlotl-lab/react-toolkit/hooks';

function MyComponent() {
  const locale = useLocale();
  // ...
}
```

## TypeScript Support

To enable autocomplete for global translations in your IDE, you can define a type for your global translations and extend the `GlobalTranslations` interface. Here's how to set it up:

```typescript
// global.d.ts
import { globalTranslations } from './your-translations-file';

declare module "@axlotl-lab/react-toolkit/hooks" {
  type GlobalTranslations = typeof globalTranslations;
}
```

This will provide autocomplete for both global and local translations when using the `useTranslations` hook.