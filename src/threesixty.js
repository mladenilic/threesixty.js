class ThreeSixty {
    #index = 0;
    #dragOrigin = null;
    #loopTimeoutId = null;
    #looping = false;

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

        this.eventHandlers = {
            container: {
                mousedown: (e) => this.#dragOrigin = e.pageX,
                touchstart: (e) => this.#dragOrigin = e.touches[0].clientX,
                touchend: () => this.#dragOrigin = null,
            },
            prev: {
                mousedown: (e) => {
                    e.preventDefault();
                    this.play(true);
                },
                mouseup: (e) => {
                    e.preventDefault();
                    this.stop();
                },
                touchstart: (e) => {
                    e.preventDefault();
                    this.prev();
                }
            },
            next: {
                mousedown: (e) => {
                    e.preventDefault();
                    this.play();
                },
                mouseup: (e) => {
                    e.preventDefault();
                    this.stop();
                },
                touchstart: (e) => {
                    e.preventDefault();
                    this.next();
                }
            },
            global: {
                mouseup: () => this.#dragOrigin = null,
                mousemove: (e) => {
                    if (this.#dragOrigin && Math.abs(this.#dragOrigin - e.pageX) > this.options.dragTolerance) {
                        this.stop();
                        this.#dragOrigin > e.pageX ? this.prev() : this.next();
                        this.#dragOrigin = e.pageX;
                    }
                },
                touchmove: (e) => {
                    if (this.#dragOrigin && Math.abs(this.#dragOrigin - e.touches[0].clientX) > this.options.swipeTolerance) {
                        this.stop();
                        this.#dragOrigin > e.touches[0].clientX ? this.prev() : this.next();
                        this.#dragOrigin = e.touches[0].clientX;
                    }
                },
                keydown: (e) => {
                    if ([37, 39].includes(e.keyCode)) {
                        this.play(37 === e.keyCode);
                    }
                },
                keyup: (e) => {
                    if ([37, 39].includes(e.keyCode)) {
                        self.stop();
                    }
                }
            }
        };

        this.initContainer();
        this.initEvents();
    }

    initContainer() {
        this.container.style.width = this.options.width + 'px';
        this.container.style.height = this.options.height + 'px';

        if (this.sprite) {
            this.container.style.backgroundImage = `url("${this.options.image}")`;
            this.container.style.backgroundSize = (this.options.perRow * 100) + '%';
        }

        this.update();
    }

    initEvents() {
        if (this.options.draggable) {
            this.options.swipeTarget.addEventListener('mousedown', this.eventHandlers.container.mousedown);
            global.addEventListener('mouseup', this.eventHandlers.global.mouseup);
            global.addEventListener('mousemove', this.eventHandlers.global.mousemove);
        }

        if (this.options.swipeable) {
            this.options.swipeTarget.addEventListener('touchstart', this.eventHandlers.container.touchstart);
            this.options.swipeTarget.addEventListener('touchend', this.eventHandlers.container.touchend);
            global.addEventListener('touchmove', this.eventHandlers.global.touchmove);
        }

        if (this.options.keys) {
            global.addEventListener('keydown', this.eventHandlers.global.keydown);
            global.addEventListener('keyup', this.eventHandlers.global.keyup);
        }

        if (this.options.prev) {
            this.options.prev.addEventListener('mousedown', this.eventHandlers.prev.mousedown);
            this.options.prev.addEventListener('mouseup', this.eventHandlers.prev.mouseup);
            this.options.prev.addEventListener('touchstart', this.eventHandlers.prev.touchstart);
        }

        if (this.options.next) {
            this.options.next.addEventListener('mousedown', this.eventHandlers.next.mousedown);
            this.options.next.addEventListener('mouseup', this.eventHandlers.next.mouseup);
            this.options.next.addEventListener('touchstart', this.eventHandlers.next.touchstart);
        }
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

        this.update();
    }

    loop(reversed) {
        reversed ? this.prev() : this.next();

        this.#loopTimeoutId = global.setTimeout(() => {
            this.loop(reversed);
        }, this.options.speed);
    }

    play (reversed) {
        if (this.#looping) {
            return;
        }

        this.loop(reversed);
        this.#looping = true;
    }

    stop () {
        if (!this.#looping) {
            return;
        }

        global.clearTimeout(this.#loopTimeoutId);
        this.#looping = false;
    }

    update () {
        if (this.sprite) {
            this.container.style.backgroundPositionX = -(this.#index % this.options.perRow) * this.options.width + 'px';
            this.container.style.backgroundPositionY = -Math.floor(this.#index / this.options.perRow) * this.options.height + 'px';
        } else {
            this.container.style.backgroundImage = `url("${this.options.image[this.#index]}")`;
        }
    }

    destroy() {
        this.stop();

        this.options.swipeTarget.removeEventListener('mousedown', this.eventHandlers.container.mousedown);
        this.options.swipeTarget.removeEventListener('touchstart', this.eventHandlers.container.touchstart);
        this.options.swipeTarget.removeEventListener('touchend', this.eventHandlers.container.touchend);

        global.removeEventListener('mouseup', this.eventHandlers.global.mouseup);
        global.removeEventListener('mousemove', this.eventHandlers.global.mousemove);
        global.removeEventListener('touchmove', this.eventHandlers.global.touchmove);
        global.removeEventListener('keydown', this.eventHandlers.global.keydown);
        global.removeEventListener('keyup', this.eventHandlers.global.keyup);

        if (this.options.prev) {
            this.options.prev.removeEventListener('mousedown', this.eventHandlers.prev.mousedown);
            this.options.prev.removeEventListener('mouseup', this.eventHandlers.prev.mouseup);
            this.options.prev.removeEventListener('touchstart', this.eventHandlers.prev.touchstart);
        }

        if (this.options.next) {
            this.options.next.removeEventListener('mousedown', this.eventHandlers.next.mousedown);
            this.options.next.removeEventListener('mouseup', this.eventHandlers.next.mouseup);
            this.options.next.removeEventListener('touchstart', this.eventHandlers.next.touchstart);
        }

        this.container.style.width = '';
        this.container.style.height = '';
        this.container.style.backgroundImage = '';
        this.container.style.backgroundPositionX = '';
        this.container.style.backgroundPositionY = '';
        this.container.style.backgroundSize = '';
    }
}

export default ThreeSixty;
