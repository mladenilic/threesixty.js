import Events from './threesixty/events';

class ThreeSixty {
  #index = 0;

  #loopTimeoutId = null;
  #looping = false;

  #events = null;

  constructor(container, options) {
    this.container = container;

    this.options = Object.assign({
      width: 300,
      height: 300,
      count: 0,
      perRow: 0,
      speed: 100,
      dragTolerance: 10,
      swipeTolerance: 10,
      draggable: true,
      swipeable: true,
      keys: true,
      inverted: false
    }, options);

    this.options.swipeTarget = this.options.swipeTarget || this.container;

    this.sprite = !Array.isArray(this.options.image);
    if (!this.sprite) {
      this.options.count = this.options.image.length;
    }

    Object.freeze(this.options);

    this.#events = new Events(this, this.options);

    this._initContainer();
  }

  get index() {
    return this.#index;
  }

  get looping() {
    return this.#looping;
  }

  next() {
    this.goto(this.options.inverted ? this.#index - 1 : this.#index + 1);
  }

  prev() {
    this.goto(this.options.inverted ? this.#index + 1 : this.#index - 1);
  }

  goto(index) {
    this.#index = (this.options.count + index) % this.options.count;

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

  destroy() {
    this.stop();

    this.#events.destroy();

    this.container.style.width = '';
    this.container.style.height = '';
    this.container.style.backgroundImage = '';
    this.container.style.backgroundPositionX = '';
    this.container.style.backgroundPositionY = '';
    this.container.style.backgroundSize = '';
  }

   _loop(reversed) {
    reversed ? this.prev() : this.next();

    this.#loopTimeoutId = global.setTimeout(() => {
      this._loop(reversed);
    }, this.options.speed);
  }

  _update () {
    if (this.sprite) {
      this.container.style.backgroundPositionX = -(this.#index % this.options.perRow) * this.options.width + 'px';
      this.container.style.backgroundPositionY = -Math.floor(this.#index / this.options.perRow) * this.options.height + 'px';
    } else {
      this.container.style.backgroundImage = `url("${this.options.image[this.#index]}")`;
    }
  }

  _initContainer() {
    this.container.style.width = this.options.width + 'px';
    this.container.style.height = this.options.height + 'px';

    if (this.sprite) {
      this.container.style.backgroundImage = `url("${this.options.image}")`;
      this.container.style.backgroundSize = (this.options.perRow * 100) + '%';
    }

    this._update();
  }
}

export default ThreeSixty;
