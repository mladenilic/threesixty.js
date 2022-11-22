"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
var _dragOrigin = /*#__PURE__*/new WeakMap();
var _options = /*#__PURE__*/new WeakMap();
var _eventHandlers = /*#__PURE__*/new WeakMap();
var Events = /*#__PURE__*/function () {
  function Events(threesixty, options) {
    var _this = this;
    _classCallCheck(this, Events);
    _classPrivateFieldInitSpec(this, _dragOrigin, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _options, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _eventHandlers, {
      writable: true,
      value: null
    });
    _classPrivateFieldSet(this, _options, options);
    _classPrivateFieldSet(this, _eventHandlers, {
      container: {
        mousedown: function mousedown(e) {
          return _classPrivateFieldSet(_this, _dragOrigin, e.pageX);
        },
        touchstart: function touchstart(e) {
          return _classPrivateFieldSet(_this, _dragOrigin, e.touches[0].clientX);
        },
        touchend: function touchend() {
          return _classPrivateFieldSet(_this, _dragOrigin, null);
        }
      },
      prev: {
        mousedown: function mousedown(e) {
          e.preventDefault();
          threesixty.play(true);
        },
        mouseup: function mouseup(e) {
          e.preventDefault();
          threesixty.stop();
        },
        touchstart: function touchstart(e) {
          e.preventDefault();
          threesixty.prev();
        }
      },
      next: {
        mousedown: function mousedown(e) {
          e.preventDefault();
          threesixty.play();
        },
        mouseup: function mouseup(e) {
          e.preventDefault();
          threesixty.stop();
        },
        touchstart: function touchstart(e) {
          e.preventDefault();
          threesixty.next();
        }
      },
      global: {
        mouseup: function mouseup() {
          return _classPrivateFieldSet(_this, _dragOrigin, null);
        },
        mousemove: function mousemove(e) {
          if (_classPrivateFieldGet(_this, _dragOrigin) && Math.abs(_classPrivateFieldGet(_this, _dragOrigin) - e.pageX) > _classPrivateFieldGet(_this, _options).dragTolerance) {
            threesixty.stop();
            _classPrivateFieldGet(_this, _dragOrigin) > e.pageX ? threesixty.prev() : threesixty.next();
            _classPrivateFieldSet(_this, _dragOrigin, e.pageX);
          }
        },
        touchmove: function touchmove(e) {
          if (_classPrivateFieldGet(_this, _dragOrigin) && Math.abs(_classPrivateFieldGet(_this, _dragOrigin) - e.touches[0].clientX) > _classPrivateFieldGet(_this, _options).swipeTolerance) {
            threesixty.stop();
            _classPrivateFieldGet(_this, _dragOrigin) > e.touches[0].clientX ? threesixty.prev() : threesixty.next();
            _classPrivateFieldSet(_this, _dragOrigin, e.touches[0].clientX);
          }
        },
        keydown: function keydown(e) {
          if ([37, 39].includes(e.keyCode)) {
            threesixty.play(37 === e.keyCode);
          }
        },
        keyup: function keyup(e) {
          if ([37, 39].includes(e.keyCode)) {
            threesixty.stop();
          }
        }
      }
    });
    this._initEvents();
  }
  _createClass(Events, [{
    key: "destroy",
    value: function destroy() {
      _classPrivateFieldGet(this, _options).swipeTarget.removeEventListener('mousedown', _classPrivateFieldGet(this, _eventHandlers).container.mousedown);
      _classPrivateFieldGet(this, _options).swipeTarget.removeEventListener('touchstart', _classPrivateFieldGet(this, _eventHandlers).container.touchstart);
      _classPrivateFieldGet(this, _options).swipeTarget.removeEventListener('touchend', _classPrivateFieldGet(this, _eventHandlers).container.touchend);
      window.removeEventListener('mouseup', _classPrivateFieldGet(this, _eventHandlers).global.mouseup);
      window.removeEventListener('mousemove', _classPrivateFieldGet(this, _eventHandlers).global.mousemove);
      window.removeEventListener('touchmove', _classPrivateFieldGet(this, _eventHandlers).global.touchmove);
      window.removeEventListener('keydown', _classPrivateFieldGet(this, _eventHandlers).global.keydown);
      window.removeEventListener('keyup', _classPrivateFieldGet(this, _eventHandlers).global.keyup);
      if (_classPrivateFieldGet(this, _options).prev) {
        _classPrivateFieldGet(this, _options).prev.removeEventListener('mousedown', _classPrivateFieldGet(this, _eventHandlers).prev.mousedown);
        _classPrivateFieldGet(this, _options).prev.removeEventListener('mouseup', _classPrivateFieldGet(this, _eventHandlers).prev.mouseup);
        _classPrivateFieldGet(this, _options).prev.removeEventListener('touchstart', _classPrivateFieldGet(this, _eventHandlers).prev.touchstart);
      }
      if (_classPrivateFieldGet(this, _options).next) {
        _classPrivateFieldGet(this, _options).next.removeEventListener('mousedown', _classPrivateFieldGet(this, _eventHandlers).next.mousedown);
        _classPrivateFieldGet(this, _options).next.removeEventListener('mouseup', _classPrivateFieldGet(this, _eventHandlers).next.mouseup);
        _classPrivateFieldGet(this, _options).next.removeEventListener('touchstart', _classPrivateFieldGet(this, _eventHandlers).next.touchstart);
      }
    }
  }, {
    key: "_initEvents",
    value: function _initEvents() {
      if (_classPrivateFieldGet(this, _options).draggable) {
        _classPrivateFieldGet(this, _options).swipeTarget.addEventListener('mousedown', _classPrivateFieldGet(this, _eventHandlers).container.mousedown);
        window.addEventListener('mouseup', _classPrivateFieldGet(this, _eventHandlers).global.mouseup);
        window.addEventListener('mousemove', _classPrivateFieldGet(this, _eventHandlers).global.mousemove);
      }
      if (_classPrivateFieldGet(this, _options).swipeable) {
        _classPrivateFieldGet(this, _options).swipeTarget.addEventListener('touchstart', _classPrivateFieldGet(this, _eventHandlers).container.touchstart);
        _classPrivateFieldGet(this, _options).swipeTarget.addEventListener('touchend', _classPrivateFieldGet(this, _eventHandlers).container.touchend);
        window.addEventListener('touchmove', _classPrivateFieldGet(this, _eventHandlers).global.touchmove);
      }
      if (_classPrivateFieldGet(this, _options).keys) {
        window.addEventListener('keydown', _classPrivateFieldGet(this, _eventHandlers).global.keydown);
        window.addEventListener('keyup', _classPrivateFieldGet(this, _eventHandlers).global.keyup);
      }
      if (_classPrivateFieldGet(this, _options).prev) {
        _classPrivateFieldGet(this, _options).prev.addEventListener('mousedown', _classPrivateFieldGet(this, _eventHandlers).prev.mousedown);
        _classPrivateFieldGet(this, _options).prev.addEventListener('mouseup', _classPrivateFieldGet(this, _eventHandlers).prev.mouseup);
        _classPrivateFieldGet(this, _options).prev.addEventListener('touchstart', _classPrivateFieldGet(this, _eventHandlers).prev.touchstart);
      }
      if (_classPrivateFieldGet(this, _options).next) {
        _classPrivateFieldGet(this, _options).next.addEventListener('mousedown', _classPrivateFieldGet(this, _eventHandlers).next.mousedown);
        _classPrivateFieldGet(this, _options).next.addEventListener('mouseup', _classPrivateFieldGet(this, _eventHandlers).next.mouseup);
        _classPrivateFieldGet(this, _options).next.addEventListener('touchstart', _classPrivateFieldGet(this, _eventHandlers).next.touchstart);
      }
    }
  }]);
  return Events;
}();
var _default = Events;
exports["default"] = _default;