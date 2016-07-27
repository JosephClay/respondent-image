# respondent-image

`npm i -S respondent-image`

## Idea

Based off of [responsively-lazy](https://github.com/ivopetkov/responsively-lazy/)

- optimized for performance using requestAnimationFrame
- better api: manually `.update()`, `.maximize()` or `.destroy()`
- background image support
- request optimization: resizing smaller doesn't trigger image loads

## Setup: html

```
<!-- sample image -->
<img src="images/2500.jpg" data-srcset="images/400.jpg 400w, images/400.webp 400w, images/600.jpg 600w, images/1000.jpg 1000w" srcset="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />

<!-- sample bg -->
<div data-bg="images/2500.jpg" data-srcset="images/400.jpg 400w, images/400.webp 400w, images/600.jpg 600w, images/1000.jpg 1000w"></div>
```

```js
// the default image, for SEO and browsers that don't support srcset
src="images/2500.jpg"
// the image definition for responsive images
data-srcset="images/400.jpg 400w, images/400.webp 400w, images/600.jpg 600w, images/1000.jpg 1000w"
// a small, base64 encoded image that prevents the src from loading
srcset="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
```

## Usage: js

Plain old js:

```js
const respondent = require('respondent-image');

// all the images
respondent('img');
// a particular image
respondent('#an-image');

// an element with a background
respondent.bg(document.querySelector('#img'));

// calling respondent returns an array of instances
const results = respondent('img');
// results => [inst, inst, inst ...]
```

With jQuery:

```js
const $ = require('jquery');
require('respondent-image/jquery');

$('img').respondent();
$('div').respondentBg();
```

As a React component:

NOTE: uses Object Rest Spread proposal, following [React's recommendations](https://facebook.github.io/react/docs/transferring-props.html).
The babel plugin [transform-object-rest-spread](https://babeljs.io/docs/plugins/transform-object-rest-spread/) will be needed.

```jsx
const Img = require('respondent-image/Img.jsx');
const render = function() {
	return (
		<Img src="images/2500.jpg" srcset="images/400.jpg 400w, images/400.webp 400w, images/600.jpg 600w, images/1000.jpg 1000w" />
	);
};

const Bg = require('respondent-image/Bg.jsx');
const render = function() {
	return (
		<Bg bg="images/2500.jpg" srcset="images/400.jpg 400w, images/400.webp 400w, images/600.jpg 600w, images/1000.jpg 1000w" />
	);
};
```