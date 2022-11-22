"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _events2 = _interopRequireDefault(require("./threesixty/events"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _options = /*#__PURE__*/new WeakMap();
var _index = /*#__PURE__*/new WeakMap();
var _loopTimeoutId = /*#__PURE__*/new WeakMap();
var _looping = /*#__PURE__*/new WeakMap();
var _maxloops = /*#__PURE__*/new WeakMap();
var _events = /*#__PURE__*/new WeakMap();
var _sprite = /*#__PURE__*/new WeakMap();
var ThreeSixty = /*#__PURE__*/function () {
  function ThreeSixty(container, options) {
    _classCallCheck(this, ThreeSixty);
    _classPrivateFieldInitSpec(this, _options, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _index, {
      writable: true,
      value: 0
    });
    _classPrivateFieldInitSpec(this, _loopTimeoutId, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _looping, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(this, _maxloops, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _events, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _sprite, {
      writable: true,
      value: false
    });
    this.container = container;
    _classPrivateFieldSet(this, _options, Object.assign({
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
    }, options));
    _classPrivateFieldGet(this, _options).swipeTarget = _classPrivateFieldGet(this, _options).swipeTarget || this.container;
    _classPrivateFieldSet(this, _sprite, !Array.isArray(_classPrivateFieldGet(this, _options).image));
    if (!this.sprite) {
      _classPrivateFieldGet(this, _options).count = _classPrivateFieldGet(this, _options).image.length;
    }
    Object.freeze(_classPrivateFieldGet(this, _options));
    _classPrivateFieldSet(this, _events, new _events2["default"](this, _classPrivateFieldGet(this, _options)));
    this._windowResizeListener = this._windowResizeListener.bind(this);
    this._initContainer();
    this.nloops = 0;
  }
  _createClass(ThreeSixty, [{
    key: "isResponsive",
    get: function get() {
      return _classPrivateFieldGet(this, _options).aspectRatio > 0;
    }
  }, {
    key: "containerWidth",
    get: function get() {
      return this.isResponsive ? this.container.clientWidth : _classPrivateFieldGet(this, _options).width;
    }
  }, {
    key: "containerHeight",
    get: function get() {
      return this.isResponsive ? this.container.clientWidth * _classPrivateFieldGet(this, _options).aspectRatio : _classPrivateFieldGet(this, _options).height;
    }
  }, {
    key: "index",
    get: function get() {
      return _classPrivateFieldGet(this, _index);
    }
  }, {
    key: "looping",
    get: function get() {
      return _classPrivateFieldGet(this, _looping);
    }
  }, {
    key: "sprite",
    get: function get() {
      return _classPrivateFieldGet(this, _sprite);
    }
  }, {
    key: "next",
    value: function next() {
      this["goto"](_classPrivateFieldGet(this, _options).inverted ? _classPrivateFieldGet(this, _index) - 1 : _classPrivateFieldGet(this, _index) + 1);
    }
  }, {
    key: "prev",
    value: function prev() {
      this["goto"](_classPrivateFieldGet(this, _options).inverted ? _classPrivateFieldGet(this, _index) + 1 : _classPrivateFieldGet(this, _index) - 1);
    }
  }, {
    key: "goto",
    value: function goto(index) {
      _classPrivateFieldSet(this, _index, (_classPrivateFieldGet(this, _options).count + index) % _classPrivateFieldGet(this, _options).count);
      this._update();
    }
  }, {
    key: "play",
    value: function play(reversed, maxloops) {
      if (this.looping) {
        return;
      }
      this._loop(reversed);
      _classPrivateFieldSet(this, _looping, true);
      _classPrivateFieldSet(this, _maxloops, maxloops);
      this.nloops = 0;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this.looping) {
        return;
      }
      global.clearTimeout(_classPrivateFieldGet(this, _loopTimeoutId));
      _classPrivateFieldSet(this, _looping, false);
      _classPrivateFieldSet(this, _maxloops, null);
      this.nloops = 0;
    }
  }, {
    key: "toggle",
    value: function toggle(reversed) {
      this.looping ? this.stop() : this.play(reversed);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stop();
      _classPrivateFieldGet(this, _events).destroy();
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
  }, {
    key: "_loop",
    value: function _loop(reversed) {
      var _this = this;
      reversed ? this.prev() : this.next();
      if (_classPrivateFieldGet(this, _index) === 0) {
        this.nloops += 1;
        if (_classPrivateFieldGet(this, _maxloops) && this.nloops >= _classPrivateFieldGet(this, _maxloops)) {
          this.stop();
          return;
        }
      }
      _classPrivateFieldSet(this, _loopTimeoutId, global.setTimeout(function () {
        _this._loop(reversed);
      }, _classPrivateFieldGet(this, _options).speed));
    }
  }, {
    key: "_update",
    value: function _update() {
      if (this.sprite) {
        this.container.style.backgroundPositionX = -(_classPrivateFieldGet(this, _index) % _classPrivateFieldGet(this, _options).perRow) * this.containerWidth + 'px';
        this.container.style.backgroundPositionY = -Math.floor(_classPrivateFieldGet(this, _index) / _classPrivateFieldGet(this, _options).perRow) * this.containerHeight + 'px';
      } else {
        this.container.style.backgroundImage = "url(\"".concat(_classPrivateFieldGet(this, _options).image[_classPrivateFieldGet(this, _index)], "\")");
      }
    }
  }, {
    key: "_windowResizeListener",
    value: function _windowResizeListener() {
      this.container.style.height = this.containerHeight + 'px';
      this._update();
    }
  }, {
    key: "_initContainer",
    value: function _initContainer() {
      if (!this.isResponsive) {
        this.container.style.width = this.containerWidth + 'px';
      }
      this.container.style.height = this.containerHeight + 'px';
      if (this.sprite) {
        this.container.style.backgroundImage = "url(\"".concat(_classPrivateFieldGet(this, _options).image, "\")");
        var cols = _classPrivateFieldGet(this, _options).perRow;
        var rows = Math.ceil(_classPrivateFieldGet(this, _options).count / _classPrivateFieldGet(this, _options).perRow);
        this.container.style.backgroundSize = cols * 100 + '% ' + rows * 100 + '%';
      }
      if (this.isResponsive) {
        window.addEventListener('resize', this._windowResizeListener);
      }
      this._update();
    }
  }]);
  return ThreeSixty;
}();
var _default = ThreeSixty;
exports["default"] = _default;