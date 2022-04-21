class Events {
  #dragOrigin = null;
  #options = null;

  #eventHandlers = null;

  constructor(threesixty, options) {
    this.#options = options;

    this.#eventHandlers = {
      container: {
        mousedown: (e) => this.#dragOrigin = e.pageX,
        touchstart: (e) => this.#dragOrigin = e.touches[0].clientX,
        touchend: () => this.#dragOrigin = null,
      },
      prev: {
        mousedown: (e) => {
          e.preventDefault();
          threesixty.play(true);
        },
        mouseup: (e) => {
          e.preventDefault();
          threesixty.stop();
        },
        touchstart: (e) => {
          e.preventDefault();
          threesixty.prev();
        }
      },
      next: {
        mousedown: (e) => {
          e.preventDefault();
          threesixty.play();
        },
        mouseup: (e) => {
          e.preventDefault();
          threesixty.stop();
        },
        touchstart: (e) => {
          e.preventDefault();
          threesixty.next();
        }
      },
      global: {
        mouseup: () => this.#dragOrigin = null,
        mousemove: (e) => {
          if (this.#dragOrigin && Math.abs(this.#dragOrigin - e.pageX) > this.#options.dragTolerance) {
            threesixty.stop();
            this.#dragOrigin > e.pageX ? threesixty.prev() : threesixty.next();
            this.#dragOrigin = e.pageX;
          }
        },
        touchmove: (e) => {
          if (this.#dragOrigin && Math.abs(this.#dragOrigin - e.touches[0].clientX) > this.#options.swipeTolerance) {
            threesixty.stop();
            this.#dragOrigin > e.touches[0].clientX ? threesixty.prev() : threesixty.next();
            this.#dragOrigin = e.touches[0].clientX;
          }
        },
        keydown: (e) => {
          if ([37, 39].includes(e.keyCode)) {
            threesixty.play(37 === e.keyCode);
          }
        },
        keyup: (e) => {
          if ([37, 39].includes(e.keyCode)) {
            threesixty.stop();
          }
        }
      }
    };

    this._initEvents();
  }

  destroy() {
    this.#options.swipeTarget.removeEventListener('mousedown', this.#eventHandlers.container.mousedown);
    this.#options.swipeTarget.removeEventListener('touchstart', this.#eventHandlers.container.touchstart);
    this.#options.swipeTarget.removeEventListener('touchend', this.#eventHandlers.container.touchend);

    window.removeEventListener('mouseup', this.#eventHandlers.global.mouseup);
    window.removeEventListener('mousemove', this.#eventHandlers.global.mousemove);
    window.removeEventListener('touchmove', this.#eventHandlers.global.touchmove);
    window.removeEventListener('keydown', this.#eventHandlers.global.keydown);
    window.removeEventListener('keyup', this.#eventHandlers.global.keyup);

    if (this.#options.prev) {
      this.#options.prev.removeEventListener('mousedown', this.#eventHandlers.prev.mousedown);
      this.#options.prev.removeEventListener('mouseup', this.#eventHandlers.prev.mouseup);
      this.#options.prev.removeEventListener('touchstart', this.#eventHandlers.prev.touchstart);
    }

    if (this.#options.next) {
      this.#options.next.removeEventListener('mousedown', this.#eventHandlers.next.mousedown);
      this.#options.next.removeEventListener('mouseup', this.#eventHandlers.next.mouseup);
      this.#options.next.removeEventListener('touchstart', this.#eventHandlers.next.touchstart);
    }
  }

  _initEvents() {
    if (this.#options.draggable) {
      this.#options.swipeTarget.addEventListener('mousedown', this.#eventHandlers.container.mousedown);
      window.addEventListener('mouseup', this.#eventHandlers.global.mouseup);
      window.addEventListener('mousemove', this.#eventHandlers.global.mousemove);
    }

    if (this.#options.swipeable) {
      this.#options.swipeTarget.addEventListener('touchstart', this.#eventHandlers.container.touchstart);
      this.#options.swipeTarget.addEventListener('touchend', this.#eventHandlers.container.touchend);
      window.addEventListener('touchmove', this.#eventHandlers.global.touchmove);
    }

    if (this.#options.keys) {
      window.addEventListener('keydown', this.#eventHandlers.global.keydown);
      window.addEventListener('keyup', this.#eventHandlers.global.keyup);
    }

    if (this.#options.prev) {
      this.#options.prev.addEventListener('mousedown', this.#eventHandlers.prev.mousedown);
      this.#options.prev.addEventListener('mouseup', this.#eventHandlers.prev.mouseup);
      this.#options.prev.addEventListener('touchstart', this.#eventHandlers.prev.touchstart);
    }

    if (this.#options.next) {
      this.#options.next.addEventListener('mousedown', this.#eventHandlers.next.mousedown);
      this.#options.next.addEventListener('mouseup', this.#eventHandlers.next.mouseup);
      this.#options.next.addEventListener('touchstart', this.#eventHandlers.next.touchstart);
    }
  }
}

export default Events;
