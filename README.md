# react-toolkit

## Table of Contents
- [Installation](#installation)
- [Components](#components)
  - [Repeater](#repeater)
- [Hooks](#hooks)
  - [useIdle](#useidle)
  - [useCountdown](#usecountdown)
  - [useTranslations](#usetranslations)
  - [useLoadingDots](#useloadingdots)

## Installation

```bash
npm install @axlotl-lab/react-toolkit
```

## Components

### Repeater

The Repeater component allows you to repeat any content a specified number of times.

#### Usage

```jsx
import { Repeater } from '@axlotl-lab/react-toolkit/components';

<Repeater count={5}>
  <p>Hello</p>
</Repeater>
```

#### Props

| Prop  | Type   | Required | Description                                    |
|-------|--------|----------|------------------------------------------------|
| count | number | Yes      | The number of times the content will be repeated |

## Hooks

### useIdle

The `useIdle` hook detects user inactivity based on a specified time threshold.

#### Usage

```jsx
import { useIdle } from '@axlotl-lab/react-toolkit/hooks';

function MyComponent() {
  const isIdle = useIdle(300); // 5 minutes

  return (
    <div>
      {isIdle ? "User is idle" : "User is active"}
    </div>
  );
}
```

#### Parameters

| Parameter     | Type   | Required | Description                            |
|---------------|--------|----------|----------------------------------------|
| secondsToIdle | number | Yes      | The number of seconds of inactivity before considering the user idle |

#### Return Value

Returns a boolean: `true` if the user is idle, `false` if active.

### useCountdown

The `useCountdown` hook provides a countdown timer functionality with start, stop, and reset capabilities.

#### Usage

```jsx
import { useCountdown } from '@axlotl-lab/react-toolkit/hooks';

function MyComponent() {
  const { count, isRunning, start, stop, reset } = useCountdown({
    initialCount: 60,
    interval: 1000,
    autoStart: false
  });

  return (
    <div>
      <p>Countdown: {count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

#### Parameters

The hook accepts an object with the following properties:

| Parameter    | Type    | Required | Default | Description                                    |
|--------------|---------|----------|---------|------------------------------------------------|
| initialCount | number  | Yes      | -       | The initial value to start the countdown from  |
| interval     | number  | No       | 1000    | The interval in milliseconds between each tick |
| autoStart    | boolean | No       | false   | Whether the countdown should start automatically |

#### Return Value

The hook returns an object with the following properties:

| Property  | Type     | Description                                        |
|-----------|----------|----------------------------------------------------|
| count     | number   | The current count value                            |
| isRunning | boolean  | Whether the countdown is currently running         |
| start     | function | Function to start the countdown                    |
| stop      | function | Function to stop the countdown                     |
| reset     | function | Function to reset the countdown to initial values  |

### useTranslations

The `useTranslations` hook provides a versatile way to manage translations in your React application, supporting nested keys, parameter interpolation, and rich content with React components.

#### Usage

```typescript
import { useTranslations } from '@axlotl-lab/react-toolkit/hooks';

const translations = {
  greetings: {
    hello: { en: 'Hello', es: 'Hola' },
    welcome: { en: 'Welcome, {name}!', es: '¡Bienvenido, {name}!' },
    richWelcome: { 
      en: 'Welcome to our <bold>website</bold>! <image/>',
      es: '¡Bienvenido a nuestro <bold>sitio web</bold>! <image/>'
    }
  }
};

function MyComponent() {
  const locale = 'es'
  const t = useTranslations({ locale, translations });

  return (
    <div>
      <p>{t('greetings.hello')}</p>
      <p>{t('greetings.welcome', { name: 'John' })}</p>
      {t.rich('greetings.richWelcome', {
        bold: (text) => <strong>{text}</strong>,
        image: () => <img src="/logo.png" alt="Logo" />
      })}
    </div>
  );
}
```

#### Parameters

| Parameter     | Type                      | Required | Default | Description                                    |
|---------------|---------------------------|----------|---------|------------------------------------------------|
| locale        | string                    | Yes      | -       | The current locale to use for translations     |
| translations  | NestedTranslations<T>     | Yes      | -       | An object containing the translations   |
| defaultLocale | string                    | No       | 'en'    | Fallback locale if translation is not found    |

#### Return Value

The hook returns an object with two functions:

1. A static translation function (default):
   ```typescript
   (key: FlattenObjectKeys<T>, params?: Record<string, string | number>) => string
   ```
   - `key`: A string representing the nested path to the translation (e.g., 'greetings.hello')
   - `params`: An optional object containing parameters to interpolate into the translation

2. A rich translation function (accessed via `.rich`):
   ```typescript
   rich: (key: FlattenObjectKeys<T>, components?: Record<string, ComponentFunction>) => React.ReactNode
   ```
   - `key`: A string representing the nested path to the translation
   - `components`: An object where keys are component names and values are functions that return React elements

#### Features

1. **Nested Translations**: Supports deeply nested translation objects.
2. **Type Safety**: Uses TypeScript to ensure type safety for translation keys.
3. **Parameter Interpolation**: Allows passing parameters to be interpolated into the translation strings.
4. **Rich Content**: Supports embedding React components within translations.
5. **Fallback Locale**: Uses a default locale if the translation is not found in the current locale.
6. **Warning for Missing Translations**: Logs a warning to the console if a translation key is not found.

#### Notes

- Ensure that all your translation objects follow the same structure across different locales.
- The hook will return the key itself if no translation is found, allowing for easy identification of missing translations.
- When using rich translations, make sure to provide all necessary component functions to avoid unprocessed tags in the output.

### useLoadingDots

The `useLoadingDots` hook provides a simple way to create an animated loading indicator using dots. It's useful for showing that a process is ongoing or content is loading.

#### Usage

```jsx
import React from 'react';
import { useLoadingDots } from '@axlotl-lab/react-toolkit/hooks';

function LoadingComponent() {
  const dots = useLoadingDots();

  return <div>Loading{dots}</div>;
}
```

#### Parameters

| Parameter    | Type   | Required | Default | Description                                    |
|--------------|--------|----------|---------|------------------------------------------------|
| intervalTime | number | No       | 500     | The interval in milliseconds between dot updates |

#### Return Value

The hook returns a string (`dots`) that represents the current state of the loading indicator. The string cycles through '', '.', '..', and '...'.

#### Features

1. **Customizable Interval**: The speed of the animation can be adjusted by changing the `intervalTime` parameter.
2. **Automatic Cycling**: The dots automatically cycle from no dots to three dots and back.
3. **Clean Up**: The hook properly cleans up the interval when the component unmounts.

#### Example

```jsx
import React from 'react';
import { useLoadingDots } from '@axlotl-lab/react-toolkit/hooks';

function LoadingButton({ isLoading, onClick, children }) {
  const dots = useLoadingDots(300); // faster animation

  return (
    <button onClick={onClick} disabled={isLoading}>
      {isLoading ? `Loading${dots}` : children}
    </button>
  );
}
```