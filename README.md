# react-viewport-observer

## Usage

#### `ViewportObserver`

```jsx
import React from "react";
import ViewportObserver from "react-viewport-observer";

const Component = () => {
  return (
    <ViewportObserver>
      {(intersected) => {
        return <div>My Lazy loaded component</div>;
      }}
    </ViewportObserver>
  );
};
```
