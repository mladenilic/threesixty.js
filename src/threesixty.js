var ThreeSixty = (function (window) {
    'use strict';

    return function (container, options) {
        var self = this;
        var index = 0;

        var loopTimeoutId = null;
        var looping = false;
        var dragOrigin = false;
        var loop = function (reversed) {
            reversed ? self.prev() : self.next();

            loopTimeoutId = window.setTimeout(function () {
                loop(reversed);
            }, options.speed);
        };

        var eventHanlers = {
            container: {
                mousedown: function (e) {
                    dragOrigin = e.pageX;
                },
                touchstart: function (e) {
                    dragOrigin = e.touches[0].clientX;
                },
                touchend: function () {
                    dragOrigin = false;
                }
            },
            prev: {
                mousedown: function (e) {
                    e.preventDefault();
                    self.play(true);
                },
                mouseup: function (e) {
                    e.preventDefault();
                    self.stop();
                },
                touchstart: function (e) {
                    e.preventDefault();
                    self.prev();
                }
            },
            next: {
                mousedown: function (e) {
                    e.preventDefault();
                    self.play();
                },
                mouseup: function (e) {
                    e.preventDefault();
                    self.stop();
                },
                touchstart: function (e) {
                    e.preventDefault();
                    self.next();
                }
            },
            document: {
                mouseup: function () {
                    dragOrigin = false;
                },
                mousemove: function (e) {
                    if (dragOrigin && Math.abs(dragOrigin - e.pageX) > options.dragTolerance) {
                        self.stop();
                        dragOrigin > e.pageX ? self.prev() : self.next();
                        dragOrigin = e.pageX;
                    }
                },
                touchmove: function (e) {
                    if (dragOrigin && Math.abs(dragOrigin - e.touches[0].clientX) > options.swipeTolerance) {
                        self.stop();
                        dragOrigin > e.touches[0].clientX ? self.prev() : self.next();
                        dragOrigin = e.touches[0].clientX;
                    }
                },
                keydown: function (e) {
                    if ([37, 39].includes(e.keyCode)) {
                        self.play(37 === e.keyCode);
                    }
                },
                keyup: function (e) {
                    if ([37, 39].includes(e.keyCode)) {
                        self.stop();
                    }
                }
            }
        }

        options.width = options.width || 300;
        options.height = options.height || 300;
        options.count = options.count || 0;
        options.perRow = options.perRow || 0;
        options.speed = options.speed || 100;
        options.dragTolerance = options.dragTolerance || 10;
        options.swipeTolerance = options.dragTolerance || 10; 
        options.draggable = options.hasOwnProperty("draggable") ? options.draggable : true;
        options.swipeable = options.hasOwnProperty("swipeable") ? options.swipeable : true;
        options.keys = options.hasOwnProperty("keys") ? options.keys : true;        
        options.prev = options.prev || false;
        options.next = options.next || false;
        options.inverted = options.inverted || false;

        container.style.width = options.width + 'px';
        container.style.height = options.height + 'px';
        container.style.backgroundImage = 'url("' + options.image + '")';
        container.style.backgroundPosition = '0 0';
        container.style.backgroundSize = (options.perRow * 100) + '%';

        if (options.draggable) {
            container.addEventListener('mousedown', eventHanlers.container.mousedown);
            document.addEventListener('mouseup', eventHanlers.document.mouseup);
            document.addEventListener('mousemove', eventHanlers.document.mousemove);
        }

        if (options.swipeable) {
            container.addEventListener('touchstart', eventHanlers.container.touchstart);
            container.addEventListener('touchend', eventHanlers.container.touchend);
            document.addEventListener('touchmove', eventHanlers.document.touchmove);
        }

        if (options.keys) {
            document.addEventListener('keydown', eventHanlers.document.keydown);
            document.addEventListener('keyup', eventHanlers.document.keyup);
        }

        if (options.prev) {
            options.prev.addEventListener('mousedown', eventHanlers.prev.mousedown);
            options.prev.addEventListener('mouseup', eventHanlers.prev.mouseup);
            options.prev.addEventListener('touchstart', eventHanlers.prev.touchstart);
        }

        if (options.next) {
            options.next.addEventListener('mousedown', eventHanlers.next.mousedown);
            options.next.addEventListener('mouseup', eventHanlers.next.mouseup);
            options.next.addEventListener('touchstart', eventHanlers.next.touchstart);
        }

        self.next = function () {
            self.goTo(options.inverted ? index + 1 : index - 1);
            self.update();
        };

        self.prev = function () {
            self.goTo(options.inverted ? index - 1 : index + 1);
            self.update();
        };

        self.goTo = function (newIndex) {
            newIndex = newIndex > options.count - 1 ? 0 : newIndex;
            index = newIndex < 0 ? options.count - 1 : newIndex;

            self.update();
        };

        self.update = function () {
            container.style.backgroundPositionX = -(index % options.perRow) * options.width + 'px';
            container.style.backgroundPositionY = -Math.floor(index / options.perRow) * options.height + 'px';
        };

        self.play = function (reversed) {
            if (looping) {
                return;
            }

            loop(reversed);
            looping = true;
        };

        self.stop = function () {
            if (!looping) {
                return;
            }

            window.clearTimeout(loopTimeoutId);
            looping = false;
        };

        self.destroy = function () {
            self.stop();

            container.removeEventListener('mousedown', eventHanlers.container.mousedown);
            container.removeEventListener('touchstart', eventHanlers.container.touchstart);
            container.removeEventListener('touchend', eventHanlers.container.touchend);

            document.removeEventListener('mouseup', eventHanlers.document.mouseup);
            document.removeEventListener('mousemove', eventHanlers.document.mousemove);
            document.removeEventListener('touchmove', eventHanlers.document.touchmove);
            document.removeEventListener('keydown', eventHanlers.document.keydown);
            document.removeEventListener('keyup', eventHanlers.document.keyup);

            if (options.prev) {
                options.prev.removeEventListener('mousedown', eventHanlers.prev.mousedown);
                options.prev.removeEventListener('mouseup', eventHanlers.prev.mouseup);
                options.prev.removeEventListener('touchstart', eventHanlers.prev.touchstart);
            }

            if (options.next) {
                options.next.removeEventListener('mousedown', eventHanlers.next.mousedown);
                options.next.removeEventListener('mouseup', eventHanlers.next.mouseup);
                options.next.removeEventListener('touchstart', eventHanlers.next.touchstart);
            }

            container.style.width = '';
            container.style.height = '';
            container.style.backgroundImage = '';
            container.style.backgroundPosition = '';
            container.style.backgroundSize = '';
        }
    };
} (window));
