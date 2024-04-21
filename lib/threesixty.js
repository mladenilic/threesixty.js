"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _events2 = _interopRequireDefault(require("./threesixty/events.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
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
    _classPrivateFieldInitSpec(this, _options, null);
    _classPrivateFieldInitSpec(this, _index, 0);
    _classPrivateFieldInitSpec(this, _loopTimeoutId, null);
    _classPrivateFieldInitSpec(this, _looping, false);
    _classPrivateFieldInitSpec(this, _maxloops, null);
    _classPrivateFieldInitSpec(this, _events, null);
    _classPrivateFieldInitSpec(this, _sprite, false);
    this.container = container;
    _classPrivateFieldSet(_options, this, Object.assign({
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
    _classPrivateFieldGet(_options, this).swipeTarget = _classPrivateFieldGet(_options, this).swipeTarget || this.container;
    _classPrivateFieldSet(_sprite, this, !Array.isArray(_classPrivateFieldGet(_options, this).image));
    if (!this.sprite) {
      _classPrivateFieldGet(_options, this).count = _classPrivateFieldGet(_options, this).image.length;
    }
    Object.freeze(_classPrivateFieldGet(_options, this));
    _classPrivateFieldSet(_events, this, new _events2["default"](this, _classPrivateFieldGet(_options, this)));
    this._windowResizeListener = this._windowResizeListener.bind(this);
    this._initContainer();
    this.nloops = 0;
  }
  return _createClass(ThreeSixty, [{
    key: "isResponsive",
    get: function get() {
      return _classPrivateFieldGet(_options, this).aspectRatio > 0;
    }
  }, {
    key: "containerWidth",
    get: function get() {
      return this.isResponsive ? this.container.clientWidth : _classPrivateFieldGet(_options, this).width;
    }
  }, {
    key: "containerHeight",
    get: function get() {
      return this.isResponsive ? this.container.clientWidth * _classPrivateFieldGet(_options, this).aspectRatio : _classPrivateFieldGet(_options, this).height;
    }
  }, {
    key: "index",
    get: function get() {
      return _classPrivateFieldGet(_index, this);
    }
  }, {
    key: "looping",
    get: function get() {
      return _classPrivateFieldGet(_looping, this);
    }
  }, {
    key: "sprite",
    get: function get() {
      return _classPrivateFieldGet(_sprite, this);
    }
  }, {
    key: "next",
    value: function next() {
      this["goto"](_classPrivateFieldGet(_options, this).inverted ? _classPrivateFieldGet(_index, this) - 1 : _classPrivateFieldGet(_index, this) + 1);
    }
  }, {
    key: "prev",
    value: function prev() {
      this["goto"](_classPrivateFieldGet(_options, this).inverted ? _classPrivateFieldGet(_index, this) + 1 : _classPrivateFieldGet(_index, this) - 1);
    }
  }, {
    key: "goto",
    value: function goto(index) {
      _classPrivateFieldSet(_index, this, (_classPrivateFieldGet(_options, this).count + index) % _classPrivateFieldGet(_options, this).count);
      this._update();
    }
  }, {
    key: "play",
    value: function play(reversed, maxloops) {
      if (this.looping) {
        return;
      }
      this._loop(reversed);
      _classPrivateFieldSet(_looping, this, true);
      _classPrivateFieldSet(_maxloops, this, maxloops);
      this.nloops = 0;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this.looping) {
        return;
      }
      window.clearTimeout(_classPrivateFieldGet(_loopTimeoutId, this));
      _classPrivateFieldSet(_looping, this, false);
      _classPrivateFieldSet(_maxloops, this, null);
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
      _classPrivateFieldGet(_events, this).destroy();
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
      if (_classPrivateFieldGet(_index, this) === 0) {
        this.nloops += 1;
        if (_classPrivateFieldGet(_maxloops, this) && this.nloops >= _classPrivateFieldGet(_maxloops, this)) {
          this.stop();
          return;
        }
      }
      _classPrivateFieldSet(_loopTimeoutId, this, window.setTimeout(function () {
        _this._loop(reversed);
      }, _classPrivateFieldGet(_options, this).speed));
    }
  }, {
    key: "_update",
    value: function _update() {
      if (this.sprite) {
        this.container.style.backgroundPositionX = -(_classPrivateFieldGet(_index, this) % _classPrivateFieldGet(_options, this).perRow) * this.containerWidth + 'px';
        this.container.style.backgroundPositionY = -Math.floor(_classPrivateFieldGet(_index, this) / _classPrivateFieldGet(_options, this).perRow) * this.containerHeight + 'px';
      } else {
        this.container.style.backgroundImage = "url(\"".concat(_classPrivateFieldGet(_options, this).image[_classPrivateFieldGet(_index, this)], "\")");
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
        this.container.style.backgroundImage = "url(\"".concat(_classPrivateFieldGet(_options, this).image, "\")");
        var cols = _classPrivateFieldGet(_options, this).perRow;
        var rows = Math.ceil(_classPrivateFieldGet(_options, this).count / _classPrivateFieldGet(_options, this).perRow);
        this.container.style.backgroundSize = cols * 100 + '% ' + rows * 100 + '%';
      }
      if (this.isResponsive) {
        window.addEventListener('resize', this._windowResizeListener);
      }
      this._update();
    }
  }]);
}();
var _default = exports["default"] = ThreeSixty;