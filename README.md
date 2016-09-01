# ThreeSixty.js
Let's you easily create 360 degree product image view.

### Demo

View on Codepen - [http://codepen.io/mladenilic/full/zKOpmg/](http://codepen.io/mladenilic/full/zKOpmg/)

### Dependencies

No dependacies! Written in plain javascript.

### Example
```js
var threesixty = new ThreeSixty(document.getElementById('threesixty'), {
  image: 'images/example.jpg',
  count: 19,
  perRow: 4,
  prev: document.getElementById('prev'),
  next: document.getElementById('next')
});
```
### Options

```js
{
  // Mandatory options
  image: 'images/example.jpg', // Path to 360 image sprite
  count: 30,                   // Total number of images. Default: 0
  perRow: 5,                   // Number of images per row. Default: 0

  // Width & Height
  width: 300,  // Image width. Default 300
  height: 300, // Image height. Default 300

  // Navigation
  prev: document.getElementById('prev'), // Previous button element. Default: null
  next: document.getElementById('next'), // Next button element. Default: null
  keys: true,         // Rotate image on arrow keys. Default: true
  draggable: true,    // Rotate image by draging. Default: true
  swipeable: true,    // Rotate image by swiping on mobile screens. Default: true
  dragTolerance: 10,  // Rotation speed when dragging. Default: 10
  swipeTolerance: 10, // Rotation speed when swiping. Default: 10

  // Misc
  speed: 100,     // Rotation speed during 'play' mode. Default: 10
  inverted: false // Inverts rotation direction
}
```

### Methods

```js
{
  threesixty.next(); // Rotate image forward
  threesixty.prev(); // Rotate image backward
  threesixty.goTo(int index); // Turn to image (0 < index < options.count)

  threesixty.play(boolean reversed); // Auto-rotate image
  threesixty.stop(); // Stop auto-rotate
}
```

### Licence

Licensed under the MIT license.
