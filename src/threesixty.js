var ThreeSixty = (function (window) {

	return function (container, options) {
		var self = this;
		var index = 0;

		var loopTimeoutId = null;
		var looping = false;
		var loop = function (reversed = false) {
			reversed ? self.prev() : self.next();

			loopTimeoutId = window.setTimeout(loop, options.speed);
		};

		options.width = options.width || 300;
		options.height = options.height || 300;
		options.count = options.count || 0;
		options.perRow = options.perRow || 0;
		options.speed = options.speed || 100;

		container.style.width = options.width + 'px';
		container.style.height = options.height + 'px';
		container.style.backgroundImage = 'url("' + options.image + '")';
		container.style.backgroundPosition = '0 0';

		self.next = function () {
			index = index + 1 > options.count - 1 ? 0 : index + 1;
			self.update();
		};

		self.prev = function () {
			index = index - 1 < 0 ? options.count - 1 : index - 1;
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

			loop();
			looping = true;
		};

		self.stop = function () {
			if (!looping) {
				return;
			}
			
			window.clearTimeout(loopTimeoutId);
			looping = false;
		}
	};
} (window));