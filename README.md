# react-toolkit

## Table of Contents
- [Installation](#installation)
- [Components](#components-work-in-progress)
- [Hooks](#hooks)
  - [useIdle](#useidle)
  - [useCountdown](#usecountdown)
  - [Repeater](#repeater)

## Installation

```bash
npm install @axlotl-lab/react-toolkit
```

## Components (Work in Progress)

We are currently developing a set of reusable React components. More details will be available soon.

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

### Repeater

The Repeater component allows you to repeat any content a specified number of times.

#### Usage

```jsx
import { Repeater } from '@axlotl-lab/react-toolkit/hooks';

<Repeater count={5}>
  <p>Hello</p>
</Repeater>
```

#### Props

| Prop  | Type   | Required | Description                                    |
|-------|--------|----------|------------------------------------------------|
| count | number | Yes      | The number of times the content will be repeated |

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
