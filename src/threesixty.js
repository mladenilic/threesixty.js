import Events from './threesixty/events';

class ThreeSixty {
  #options = null;
  #index = 0;

  #loopTimeoutId = null;
  #looping = false;
  #allowScroll = false;

  #events = null;

  constructor(container, options) {
    this.container = container;

    this.#options = Object.assign({
      width: 300,
      height: 300,
      aspectRatio: 0,
      count: 0,
      perRow: 0,
      speed: 100,
      dragTolerance: 10,
      swipeTolerance: 10,
      draggable: true,
      swipeable: true,
      keys: true,
      inverted: false,
      containerName: 'reactThreesixtyContainer'
    }, options);
    this.#index = options.startIndex ? options.startIndex : 0;
    this.#options.swipeTarget = this.#options.swipeTarget || this.container;
    this.#options.count = this.#options.image.length;

    Object.freeze(this.#options);

    this.#events = new Events(this, this.#options);

    this._windowResizeListener = this._windowResizeListener.bind(this);

    this._initContainer();
  }

  get isResponsive() {
    return this.#options.aspectRatio > 0;
  }

  get containerWidth() {
    return this.isResponsive ? this.container.clientWidth : this.#options.width;
  }

  get containerHeight() {
    return this.isResponsive
      ? this.container.clientWidth * this.#options.aspectRatio
      : this.#options.height;
  }

  get index() {
    return this.#index;
  }

  get looping() {
    return this.#looping;
  }

  get prevIndex() {
    let prev_index = this.#options.inverted ? this.#index + 1 : this.#index - 1;
    return (this.#options.count + prev_index) % this.#options.count;
  }

  next() {
    if(this.#allowScroll) {
      this.goto(this.#options.inverted ? this.#index - 1 : this.#index + 1);
    }
  }

  prev() {
    if(this.#allowScroll) {
      this.goto(this.#options.inverted ? this.#index + 1 : this.#index - 1);
    }
  }

  goto(index) {
    let prev_index = this.#index;
    let prev_image = document.querySelector(`#${this.#options.containerName} > .reactThreesixtyImage_${prev_index}`);
    if(prev_image) {
      prev_image.style.visibility = 'hidden';
    }
    this.#index = (this.#options.count + index) % this.#options.count;

    this._update();
  }

  play (reversed) {
    if (this.looping) {
      return;
    }

    this._loop(reversed);
    this.#looping = true;
  }

  stop () {
    if (!this.looping) {
      return;
    }

    global.clearTimeout(this.#loopTimeoutId);
    this.#looping = false;
  }

  toggle(reversed) {
    this.looping ? this.stop() : this.play(reversed);
  }

  destroy() {
    this.stop();

    this.#events.destroy();

    this.container.style.width = '';
    this.container.style.height = '';

    if (this.isResponsive) {
      window.removeEventListener('resize', this._windowResizeListener);
    }
  }

  _loop(reversed) {
    reversed ? this.prev() : this.next();

    this.#loopTimeoutId = global.setTimeout(() => {
      this._loop(reversed);
    }, this.#options.speed);
  }

  _update () {
    let new_image = document.querySelector(`#${this.#options.containerName} > .reactThreesixtyImage_${this.#index}`);
    if(new_image) {
      var imageChanged = new CustomEvent(`${this.#options.containerName}_image_changed`, {detail : {"image_index" : this.#index}});
      document.dispatchEvent(imageChanged);
      new_image.style.visibility = 'visible';
    }
  }

  _stopScroll () {
    this.#allowScroll = false;
  }

  _allowScroll () {
    this.#allowScroll = true;
  }

  _updateImage (updatedImage) {
    this.#options = {
      ...this.#options,
      image : updatedImage
    };
    this._initializeImage();
  }

  _initializeImage () {
    this.container.setAttribute('id', `${this.#options.containerName}`)
    this.container.setAttribute('class', `${this.#options.containerName}`)
    this.container.style.height = "100%";
    this.container.style.width = "100%";
    this.container.innerHTML = "";
    this.#options.image.map((image, index) => {
      let elem = document.createElement('div');
      elem.setAttribute('style', `visibility:${index === this.#index ? 'visible' : 'hidden'};position:absolute;width:100%;height: 100%;left:0px;top:0px;background-position:center;background-size:contain;background-repeat:no-repeat;background-image:url(${image})`)
      elem.setAttribute('class', `reactThreesixtyImage_${index}`)
      this.container.appendChild(elem)
    })
  }

  _windowResizeListener() {
    this.container.style.height = this.containerHeight + 'px';
    this._update()
  }

  _initContainer() {
    if (!this.isResponsive) {
      this.container.style.width = this.containerWidth + 'px';
    }
    this.container.style.height = this.containerHeight + 'px';

    if (this.isResponsive) {
      window.addEventListener('resize', this._windowResizeListener);
    }

    this._initializeImage();
  }
}

export default ThreeSixty;
