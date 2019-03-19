# `Vue100vh` Vue component
<!-- [![CircleCI](https://circleci.com/gh/kculmback/vue-div-100vh.svg?style=svg&circle-token=cd3f9e7031e393880d945af301841db926000ec4)](https://circleci.com/gh/kculmback/vue-div-100vh)
[![npm version](https://badge.fury.io/js/vue-div-100vh.svg)](https://badge.fury.io/js/vue-div-100vh) -->

This is a workaround for iOS Safari and other mobile browsers.

Originally forked from [react-div-100vh](https://github.com/mvasin/react-div-100vh) by [mvasin](https://github.com/mvasin).

## The problem

At the top of the page, mobile browsers cover bottom of `100vh` page with "browser chrome" (that's the name for browser navigation/context buttons, don't confuse with the browser from Google), effectively cropping it. If you have something important at the bottom of your splash screen, chances are it will not be visible/available until user scrolls.

More on this issue [here](https://nicolas-hoizey.com/2015/02/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers.html
).

## The solution
### iOS screenshots
| `<div style={{height: '100vh'}}>` | `<Vue100vh>` |
| --- | --- |
| ![Page cropped by bottom Safari chrome](https://raw.githubusercontent.com/kculmback/vue-div-100vh/master/images/regular-div.png) | ![Page cropped by bottom Safari chrome](https://raw.githubusercontent.com/kculmback/vue-div-100vh/master/images/vue-div-100vh.png) |

<!-- ### The demo
Browse https://vue-div-100vh.netlify.com on your phone! -->

## API
- Install it: `npm install --save vue-div-100vh` or `yarn add vue-div-100vh`
- Import the component and wrap your stuff with `<Vue100vh>` as you would with a normal `<div :style="{ height: '100vh' }">`, but this time mobile browsers should display the whole page on load:

### The default behavior

```jsx
<template>
  <Vue100vh>
    <marquee>Your stuff goes here</marquee>
  </Vue100vh>
</template>

<script>
import Vue100vh from 'vue-div-100vh'

export default {
  ...,
  components: { Vue100vh },
}
</script>
```

### Using `vvh` units

If you want to set `min-height` (or any other property) instead, you can use made up `vvh` ("real viewport height") units in values of an object passed to `style` prop. `Vue100vh` will find any style declarations with this unit and calculate the value as a percentage of `window.innerHeight`:

```jsx
  <Vue100vh :style="{ minHeight: '50vvh' }">
    <marquee>This is inside a div that takes at least 50% of viewport height.</marquee>
  </Vue100vh>
```

If you don't specify `style` prop, it works as if you specified `{ height: '100vvh' }`;
`<Vue100vh>` is equivalent to `<Vue100vh :style="{ height: '100vvh'} ">`.

If you do pass anything to the `style` prop, no implicit style is applied. You can do something like:

```jsx
<Vue100vh
  :style="{ maxHeight: '70vvh', color: 'blue'}"
  @click.native="() => { console.log('hi') }"
>
  <p>my content here</p>
</Vue100vh>
```

The rest of the props are passed unchanged to the underlying `div` that `Vue100vh` renders.

## Additional considerations

Please note that most likely you will want to set `body { margin: 0 }` css, unless you use some css reset that does it for you.

<!-- ## Testing
This component is tested with Jest and <a href="https://www.browserstack.com"><img title="BrowserStack Logo" alt="BrowserStack Logo" height="40" src="images/Browserstack-logo.svg"></a> -->