# react-toolkit

## Table of Contents
- [Installation](#installation)
- [Components](#components)
  - [Repeater](#repeater)
- [Hooks](#hooks)
  - [useTranslations](#useTranslations)
  - [useIdle](#useidle)
  - [useCountdown](#usecountdown)
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

### useTranslations
This hook was move to it's own repository [@axlotl-lab/react-i18n](https://github.com/axlotl-lab/react-i18n)

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

### useDebounce

Allows you to debounce a value, which is useful for preventing excessive API calls or expensive operations when a value changes rapidly (e.g., search input).

#### Usage

```jsx
import { useDebounce } from '@axlotl-lab/react-toolkit/hooks';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // This function will only be executed 500ms after the user stops typing
    search(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
```

#### Parameters

| Parameter | Type   | Required | Default | Description                                    |
|-----------|--------|----------|---------|------------------------------------------------|
| value     | any    | Yes      | -       | The value to debounce                         |
| delay     | number | No       | 500     | The delay in milliseconds before executing the function |

#### Return Value

Returns the debounced value.