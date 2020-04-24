# react-viewport-observer

Wrapper component that uses intersection observer api to tell you when your component is in the viewport. Intersection information is needed for many reasons, such as:

- Lazy-loading of images or other content as a page is scrolled.
- Implementing "infinite scrolling" web sites
- Reporting of visibility of advertisements in order to calculate ad revenues.
- Deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result.

## Usage

#### `ViewportObserver`

#### Props

`rootMargin` - Margin around the root (Default "0px 0px 0px 0px" (top, right, bottom, left))
`threshold` - Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.

More information can be found in https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

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
