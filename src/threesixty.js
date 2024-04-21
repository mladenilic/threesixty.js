import Events from './threesixty/events.js';

class ThreeSixty {
  #options = null;
  #index = 0;

  #loopTimeoutId = null;
  #looping = false;
  #maxloops = null;

  #events = null;
  #sprite = false;

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
      inverted: false
    }, options);

    this.#options.swipeTarget = this.#options.swipeTarget || this.container;

    this.#sprite = !Array.isArray(this.#options.image);
    if (!this.sprite) {
      this.#options.count = this.#options.image.length;
    }

    Object.freeze(this.#options);

    this.#events = new Events(this, this.#options);

    this._windowResizeListener = this._windowResizeListener.bind(this);

    this._initContainer();

    this.nloops = 0;
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

  get sprite() {
    return this.#sprite;
  }

  next() {
    this.goto(this.#options.inverted ? this.#index - 1 : this.#index + 1);
  }

  prev() {
    this.goto(this.#options.inverted ? this.#index + 1 : this.#index - 1);
  }

  goto(index) {
    this.#index = (this.#options.count + index) % this.#options.count;

    this._update();
  }

  play (reversed, maxloops) {
    if (this.looping) {
      return;
    }

    this._loop(reversed);
    this.#looping = true;
    this.#maxloops = maxloops;
    this.nloops = 0;
  }

  stop () {
    if (!this.looping) {
      return;
    }

    window.clearTimeout(this.#loopTimeoutId);
    this.#looping = false;
    this.#maxloops = null;
    this.nloops = 0;
  }

  toggle(reversed) {
    this.looping ? this.stop() : this.play(reversed);
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

    if (this.isResponsive) {
      window.removeEventListener('resize', this._windowResizeListener);
    }
  }

  _loop(reversed) {
    reversed ? this.prev() : this.next();

    if(this.#index === 0) {
      this.nloops += 1;
      if (this.#maxloops && this.nloops >= this.#maxloops) {
        this.stop();
        return;
      }
    }

    this.#loopTimeoutId = window.setTimeout(() => {
      this._loop(reversed);
    }, this.#options.speed);
  }

  _update () {
    if (this.sprite) {
      this.container.style.backgroundPositionX = -(this.#index % this.#options.perRow) * this.containerWidth + 'px';
      this.container.style.backgroundPositionY = -Math.floor(this.#index / this.#options.perRow) * this.containerHeight + 'px';
    } else {
      this.container.style.backgroundImage = `url("${this.#options.image[this.#index]}")`;
    }
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

    if (this.sprite) {
      this.container.style.backgroundImage = `url("${this.#options.image}")`;

      const cols = this.#options.perRow;
      const rows = Math.ceil(this.#options.count / this.#options.perRow);
      this.container.style.backgroundSize = (cols * 100) + '% ' + (rows * 100) + '%';
    }

    if (this.isResponsive) {
      window.addEventListener('resize', this._windowResizeListener);
    }

    this._update();
  }
}

export default ThreeSixty;
