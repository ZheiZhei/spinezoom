/*!
 * Name: Tiny.js
 * Description: The Tiny engine is an HTML5 game engine designed to be lightweight and concise JavaScript-friendly syntax, it will friendly for mobile.
 * Author: yiqi
 * Version: v1.3.1
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Tiny = {})));
}(this, (function (exports) { 'use strict';

	var ActionInterval = /*#__PURE__*/Object.freeze({
		get MoveBy () { return MoveBy; },
		get MoveTo () { return MoveTo; },
		get ScaleBy () { return ScaleBy; },
		get ScaleTo () { return ScaleTo; },
		get RotateBy () { return RotateBy; },
		get RotateTo () { return RotateTo; },
		get JumpTo () { return JumpTo; },
		get Blink () { return Blink; },
		get FadeTo () { return FadeTo; },
		get FadeIn () { return FadeIn; },
		get FadeOut () { return FadeOut; },
		get TintBy () { return TintBy; },
		get TintTo () { return TintTo; },
		get RepeatForever () { return RepeatForever; },
		get Repeat () { return Repeat; },
		get Back () { return Back; }
	});

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
		return Object(val);
	}
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
			var test1 = new String('abc');
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
			return true;
		} catch (err) {
			return false;
		}
	}
	var _objectAssign_4_1_1_objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
		return to;
	};

	if (!Object.assign) {
	  Object.assign = _objectAssign_4_1_1_objectAssign;
	}

	var ONE_FRAME_TIME = 16;
	if (!(Date.now && Date.prototype.getTime)) {
	  Date.now = function now() {
	    return new Date().getTime();
	  };
	}
	if (!(window.performance && window.performance.now && window.performance.timing)) {
	  var startTime = null;
	  if (!window.performance) {
	    window.performance = {};
	  }
	  if (window.performance.timing && window.performance.timing.navigationStart) {
	    startTime = window.performance.timing.navigationStart;
	  } else {
	    startTime = Date.now();
	    window.performance.timing = {
	      navigationStart: startTime
	    };
	  }
	  window.performance.now = function () {
	    return Date.now() - startTime;
	  };
	}
	var lastTime = Date.now();
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	  var p = vendors[x];
	  window.requestAnimationFrame = window[p + 'RequestAnimationFrame'];
	  window.cancelAnimationFrame = window[p + 'CancelAnimationFrame'] || window[p + 'CancelRequestAnimationFrame'];
	}
	if (!window.requestAnimationFrame) {
	  window.requestAnimationFrame = function (callback) {
	    if (typeof callback !== 'function') {
	      throw new TypeError(callback + 'is not a function');
	    }
	    var currentTime = Date.now();
	    var delay = ONE_FRAME_TIME + lastTime - currentTime;
	    if (delay < 0) {
	      delay = 0;
	    }
	    lastTime = currentTime;
	    return setTimeout(function () {
	      lastTime = Date.now();
	      callback(window.performance.now());
	    }, delay);
	  };
	}
	if (!window.cancelAnimationFrame) {
	  window.cancelAnimationFrame = function (id) {
	    return clearTimeout(id);
	  };
	}

	if (!Math.sign) {
	  Math.sign = function mathSign(x) {
	    x = Number(x);
	    if (x === 0 || isNaN(x)) {
	      return x;
	    }
	    return x > 0 ? 1 : -1;
	  };
	}

	if (!Number.isInteger) {
	  Number.isInteger = function numberIsInteger(value) {
	    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
	  };
	}

	if (!window.ArrayBuffer) {
	  window.ArrayBuffer = Array;
	}
	if (!window.Float32Array) {
	  window.Float32Array = Array;
	}
	if (!window.Uint32Array) {
	  window.Uint32Array = Array;
	}
	if (!window.Uint16Array) {
	  window.Uint16Array = Array;
	}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _eventemitter3_3_1_2_eventemitter3 = createCommonjsModule(function (module) {
	var has = Object.prototype.hasOwnProperty
	  , prefix = '~';
	function Events() {}
	if (Object.create) {
	  Events.prototype = Object.create(null);
	  if (!new Events().__proto__) prefix = false;
	}
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}
	function addListener(emitter, event, fn, context, once) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('The listener must be a function');
	  }
	  var listener = new EE(fn, context || emitter, once)
	    , evt = prefix ? prefix + event : event;
	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
	  else emitter._events[evt] = [emitter._events[evt], listener];
	  return emitter;
	}
	function clearEvent(emitter, evt) {
	  if (--emitter._eventsCount === 0) emitter._events = new Events();
	  else delete emitter._events[evt];
	}
	function EventEmitter() {
	  this._events = new Events();
	  this._eventsCount = 0;
	}
	EventEmitter.prototype.eventNames = function eventNames() {
	  var names = []
	    , events
	    , name;
	  if (this._eventsCount === 0) return names;
	  for (name in (events = this._events)) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }
	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }
	  return names;
	};
	EventEmitter.prototype.listeners = function listeners(event) {
	  var evt = prefix ? prefix + event : event
	    , handlers = this._events[evt];
	  if (!handlers) return [];
	  if (handlers.fn) return [handlers.fn];
	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
	    ee[i] = handlers[i].fn;
	  }
	  return ee;
	};
	EventEmitter.prototype.listenerCount = function listenerCount(event) {
	  var evt = prefix ? prefix + event : event
	    , listeners = this._events[evt];
	  if (!listeners) return 0;
	  if (listeners.fn) return 1;
	  return listeners.length;
	};
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;
	  if (!this._events[evt]) return false;
	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;
	  if (listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }
	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }
	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;
	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }
	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }
	  return true;
	};
	EventEmitter.prototype.on = function on(event, fn, context) {
	  return addListener(this, event, fn, context, false);
	};
	EventEmitter.prototype.once = function once(event, fn, context) {
	  return addListener(this, event, fn, context, true);
	};
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;
	  if (!this._events[evt]) return this;
	  if (!fn) {
	    clearEvent(this, evt);
	    return this;
	  }
	  var listeners = this._events[evt];
	  if (listeners.fn) {
	    if (
	      listeners.fn === fn &&
	      (!once || listeners.once) &&
	      (!context || listeners.context === context)
	    ) {
	      clearEvent(this, evt);
	    }
	  } else {
	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
	      if (
	        listeners[i].fn !== fn ||
	        (once && !listeners[i].once) ||
	        (context && listeners[i].context !== context)
	      ) {
	        events.push(listeners[i]);
	      }
	    }
	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
	    else clearEvent(this, evt);
	  }
	  return this;
	};
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  var evt;
	  if (event) {
	    evt = prefix ? prefix + event : event;
	    if (this._events[evt]) clearEvent(this, evt);
	  } else {
	    this._events = new Events();
	    this._eventsCount = 0;
	  }
	  return this;
	};
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	EventEmitter.prefixed = prefix;
	EventEmitter.EventEmitter = EventEmitter;
	{
	  module.exports = EventEmitter;
	}
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	var get = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = Object.getOwnPropertyDescriptor(object, property);

	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var _Group = function () {
	  function _Group() {
	    classCallCheck(this, _Group);
	    this._tweens = {};
	    this._tweensAddedDuringUpdate = {};
	  }
	  createClass(_Group, [{
	    key: 'getAll',
	    value: function getAll() {
	      return Object.keys(this._tweens).map(function (tweenId) {
	        return this._tweens[tweenId];
	      }.bind(this));
	    }
	  }, {
	    key: 'removeAll',
	    value: function removeAll() {
	      this._tweens = {};
	    }
	  }, {
	    key: 'add',
	    value: function add(tween) {
	      this._tweens[tween.getId()] = tween;
	      this._tweensAddedDuringUpdate[tween.getId()] = tween;
	    }
	  }, {
	    key: 'remove',
	    value: function remove(tween) {
	      delete this._tweens[tween.getId()];
	      delete this._tweensAddedDuringUpdate[tween.getId()];
	    }
	  }, {
	    key: 'update',
	    value: function update(time, preserve) {
	      var tweenIds = Object.keys(this._tweens);
	      if (tweenIds.length === 0) {
	        return false;
	      }
	      time = time !== undefined ? time : TWEEN.now();
	      while (tweenIds.length > 0) {
	        this._tweensAddedDuringUpdate = {};
	        for (var i = 0; i < tweenIds.length; i++) {
	          if (this._tweens[tweenIds[i]] && this._tweens[tweenIds[i]]._isPlaying) {
	            var t = this._tweens[tweenIds[i]]._passedTime;
	            if (this._tweens[tweenIds[i]].update(t ? time - t : time) === false) {
	              this._tweens[tweenIds[i]] && (this._tweens[tweenIds[i]]._isPlaying = false);
	              if (!preserve) {
	                delete this._tweens[tweenIds[i]];
	              }
	            }
	          }
	        }
	        tweenIds = Object.keys(this._tweensAddedDuringUpdate);
	      }
	      return true;
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      var tweenIds = Object.keys(this._tweens);
	      if (tweenIds.length === 0) {
	        return false;
	      }
	      for (var i = 0; i < tweenIds.length; i++) {
	        this._tweens[tweenIds[i]].pause();
	      }
	    }
	  }, {
	    key: 'resume',
	    value: function resume() {
	      var tweenIds = Object.keys(this._tweens);
	      if (tweenIds.length === 0) {
	        return false;
	      }
	      for (var i = 0; i < tweenIds.length; i++) {
	        this._tweens[tweenIds[i]].resume();
	      }
	    }
	  }]);
	  return _Group;
	}();
	var TWEEN = new _Group();
	TWEEN.Group = _Group;
	TWEEN._nextId = 0;
	TWEEN.nextId = function () {
	  return TWEEN._nextId++;
	};
	if (typeof window === 'undefined' && typeof process !== 'undefined') {
	  TWEEN.now = function () {
	    var time = process.hrtime();
	    return time[0] * 1000 + time[1] / 1000000;
	  };
	} else if (typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined) {
	  TWEEN.now = window.performance.now.bind(window.performance);
	} else if (Date.now !== undefined) {
	  TWEEN.now = Date.now;
	} else {
	  TWEEN.now = function () {
	    return new Date().getTime();
	  };
	}
	TWEEN.Tween = function (object, group) {
	  this._object = object;
	  this._valuesStart = {};
	  this._valuesEnd = {};
	  this._valuesStartRepeat = {};
	  this._duration = 1000;
	  this._repeat = 0;
	  this._repeatDelayTime = undefined;
	  this._yoyo = false;
	  this._isPlaying = false;
	  this._reversed = false;
	  this._pauseTime = 0;
	  this._passedTime = 0;
	  this._delayTime = 0;
	  this._startTime = null;
	  this._easingFunction = TWEEN.Easing.Linear.None;
	  this._interpolationFunction = TWEEN.Interpolation.Linear;
	  this._chainedTweens = [];
	  this._onStartCallback = null;
	  this._onStartCallbackFired = false;
	  this._onUpdateCallback = null;
	  this._onCompleteCallback = null;
	  this._onStopCallback = null;
	  this._group = group || TWEEN;
	  this._id = TWEEN.nextId();
	};
	TWEEN.Tween.prototype = {
	  getId: function getId() {
	    return this._id;
	  },
	  isPlaying: function isPlaying() {
	    return this._isPlaying;
	  },
	  to: function to(properties, duration) {
	    this._valuesEnd = properties;
	    if (duration !== undefined) {
	      this._duration = duration;
	    }
	    return this;
	  },
	  start: function start(time) {
	    this._group.add(this);
	    this._isPlaying = true;
	    this._onStartCallbackFired = false;
	    this._startTime = time !== undefined ? time : TWEEN.now();
	    this._startTime += this._delayTime;
	    for (var property in this._valuesEnd) {
	      if (this._valuesEnd[property] instanceof Array) {
	        if (this._valuesEnd[property].length === 0) {
	          continue;
	        }
	        this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);
	      }
	      if (this._object[property] === undefined) {
	        continue;
	      }
	      this._valuesStart[property] = this._object[property];
	      if (this._valuesStart[property] instanceof Array === false) {
	        this._valuesStart[property] *= 1.0;
	      }
	      this._valuesStartRepeat[property] = this._valuesStart[property] || 0;
	    }
	    return this;
	  },
	  stop: function stop() {
	    if (!this._isPlaying) {
	      return this;
	    }
	    this._group.remove(this);
	    this._isPlaying = false;
	    if (this._onStopCallback !== null) {
	      this._onStopCallback.call(this._object, this._object);
	    }
	    this.stopChainedTweens();
	    return this;
	  },
	  pause: function pause() {
	    if (!this._isPlaying) {
	      return this;
	    }
	    this._isPlaying = false;
	    this._pauseTime = TWEEN.now() - this._passedTime;
	  },
	  resume: function resume() {
	    if (this._isPlaying) {
	      return this;
	    }
	    this._isPlaying = true;
	    this._passedTime = TWEEN.now() - this._pauseTime;
	  },
	  end: function end() {
	    this.update(this._startTime + this._duration);
	    return this;
	  },
	  stopChainedTweens: function stopChainedTweens() {
	    for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
	      this._chainedTweens[i].stop();
	    }
	  },
	  delay: function delay(amount) {
	    this._delayTime = amount;
	    return this;
	  },
	  repeat: function repeat(times) {
	    this._repeat = times;
	    return this;
	  },
	  repeatDelay: function repeatDelay(amount) {
	    this._repeatDelayTime = amount;
	    return this;
	  },
	  yoyo: function yoyo(_yoyo) {
	    this._yoyo = _yoyo;
	    return this;
	  },
	  easing: function easing(_easing) {
	    this._easingFunction = _easing;
	    return this;
	  },
	  interpolation: function interpolation(_interpolation) {
	    this._interpolationFunction = _interpolation;
	    return this;
	  },
	  chain: function chain() {
	    this._chainedTweens = arguments;
	    return this;
	  },
	  onStart: function onStart(callback) {
	    this._onStartCallback = callback;
	    return this;
	  },
	  onUpdate: function onUpdate(callback) {
	    this._onUpdateCallback = callback;
	    return this;
	  },
	  onComplete: function onComplete(callback) {
	    this._passedTime = 0;
	    this._onCompleteCallback = callback;
	    return this;
	  },
	  onStop: function onStop(callback) {
	    this._onStopCallback = callback;
	    return this;
	  },
	  update: function update(time) {
	    var property = void 0;
	    var elapsed = void 0;
	    if (time < this._startTime) {
	      return true;
	    }
	    if (this._onStartCallbackFired === false) {
	      if (this._onStartCallback !== null) {
	        this._onStartCallback.call(this._object, this._object);
	      }
	      this._onStartCallbackFired = true;
	    }
	    elapsed = (time - this._startTime) / this._duration;
	    elapsed = elapsed > 1 ? 1 : elapsed;
	    var value = this._easingFunction(elapsed);
	    for (property in this._valuesEnd) {
	      if (this._valuesStart[property] === undefined) {
	        continue;
	      }
	      var start = this._valuesStart[property] || 0;
	      var end = this._valuesEnd[property];
	      if (end instanceof Array) {
	        this._object[property] = this._interpolationFunction(end, value);
	      } else {
	        if (typeof end === 'string') {
	          if (end.charAt(0) === '+' || end.charAt(0) === '-') {
	            end = start + parseFloat(end);
	          } else {
	            end = parseFloat(end);
	          }
	        }
	        if (typeof end === 'number') {
	          this._object[property] = start + (end - start) * value;
	        }
	      }
	    }
	    if (this._onUpdateCallback !== null) {
	      this._onUpdateCallback.call(this._object, value);
	    }
	    if (elapsed === 1) {
	      if (this._repeat > 0) {
	        if (isFinite(this._repeat)) {
	          this._repeat--;
	        }
	        for (property in this._valuesStartRepeat) {
	          if (typeof this._valuesEnd[property] === 'string') {
	            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
	          }
	          if (this._yoyo) {
	            var tmp = this._valuesStartRepeat[property];
	            this._valuesStartRepeat[property] = this._valuesEnd[property];
	            this._valuesEnd[property] = tmp;
	          }
	          this._valuesStart[property] = this._valuesStartRepeat[property];
	        }
	        if (this._yoyo) {
	          this._reversed = !this._reversed;
	        }
	        if (this._repeatDelayTime !== undefined) {
	          this._startTime = time + this._repeatDelayTime;
	        } else {
	          this._startTime = time + this._delayTime;
	        }
	        return true;
	      } else {
	        if (this._onCompleteCallback !== null) {
	          this._onCompleteCallback.call(this._object, this._object);
	        }
	        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
	          this._chainedTweens[i].start(this._startTime + this._duration);
	        }
	        return false;
	      }
	    }
	    return true;
	  }
	};
	TWEEN.Easing = {
	  Linear: {
	    None: function None(k) {
	      return k;
	    }
	  },
	  Quadratic: {
	    In: function In(k) {
	      return k * k;
	    },
	    Out: function Out(k) {
	      return k * (2 - k);
	    },
	    InOut: function InOut(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k;
	      }
	      return -0.5 * (--k * (k - 2) - 1);
	    }
	  },
	  Cubic: {
	    In: function In(k) {
	      return k * k * k;
	    },
	    Out: function Out(k) {
	      return --k * k * k + 1;
	    },
	    InOut: function InOut(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k * k;
	      }
	      return 0.5 * ((k -= 2) * k * k + 2);
	    }
	  },
	  Quartic: {
	    In: function In(k) {
	      return k * k * k * k;
	    },
	    Out: function Out(k) {
	      return 1 - --k * k * k * k;
	    },
	    InOut: function InOut(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k * k * k;
	      }
	      return -0.5 * ((k -= 2) * k * k * k - 2);
	    }
	  },
	  Quintic: {
	    In: function In(k) {
	      return k * k * k * k * k;
	    },
	    Out: function Out(k) {
	      return --k * k * k * k * k + 1;
	    },
	    InOut: function InOut(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k * k * k * k;
	      }
	      return 0.5 * ((k -= 2) * k * k * k * k + 2);
	    }
	  },
	  Sinusoidal: {
	    In: function In(k) {
	      return 1 - Math.cos(k * Math.PI / 2);
	    },
	    Out: function Out(k) {
	      return Math.sin(k * Math.PI / 2);
	    },
	    InOut: function InOut(k) {
	      return 0.5 * (1 - Math.cos(Math.PI * k));
	    }
	  },
	  Exponential: {
	    In: function In(k) {
	      return k === 0 ? 0 : Math.pow(1024, k - 1);
	    },
	    Out: function Out(k) {
	      return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
	    },
	    InOut: function InOut(k) {
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      if ((k *= 2) < 1) {
	        return 0.5 * Math.pow(1024, k - 1);
	      }
	      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
	    }
	  },
	  Circular: {
	    In: function In(k) {
	      return 1 - Math.sqrt(1 - k * k);
	    },
	    Out: function Out(k) {
	      return Math.sqrt(1 - --k * k);
	    },
	    InOut: function InOut(k) {
	      if ((k *= 2) < 1) {
	        return -0.5 * (Math.sqrt(1 - k * k) - 1);
	      }
	      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
	    }
	  },
	  Elastic: {
	    In: function In(k) {
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
	    },
	    Out: function Out(k) {
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
	    },
	    InOut: function InOut(k) {
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      k *= 2;
	      if (k < 1) {
	        return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
	      }
	      return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
	    }
	  },
	  Back: {
	    In: function In(k) {
	      var s = 1.70158;
	      return k * k * ((s + 1) * k - s);
	    },
	    Out: function Out(k) {
	      var s = 1.70158;
	      return --k * k * ((s + 1) * k + s) + 1;
	    },
	    InOut: function InOut(k) {
	      var s = 1.70158 * 1.525;
	      if ((k *= 2) < 1) {
	        return 0.5 * (k * k * ((s + 1) * k - s));
	      }
	      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	    }
	  },
	  Bounce: {
	    In: function In(k) {
	      return 1 - TWEEN.Easing.Bounce.Out(1 - k);
	    },
	    Out: function Out(k) {
	      if (k < 1 / 2.75) {
	        return 7.5625 * k * k;
	      } else if (k < 2 / 2.75) {
	        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
	      } else if (k < 2.5 / 2.75) {
	        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
	      } else {
	        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
	      }
	    },
	    InOut: function InOut(k) {
	      if (k < 0.5) {
	        return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
	      }
	      return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
	    }
	  }
	};
	TWEEN.Interpolation = {
	  Linear: function Linear(v, k) {
	    var m = v.length - 1;
	    var f = m * k;
	    var i = Math.floor(f);
	    var fn = TWEEN.Interpolation.Utils.Linear;
	    if (k < 0) {
	      return fn(v[0], v[1], f);
	    }
	    if (k > 1) {
	      return fn(v[m], v[m - 1], m - f);
	    }
	    return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
	  },
	  Bezier: function Bezier(v, k) {
	    var b = 0;
	    var n = v.length - 1;
	    var pw = Math.pow;
	    var bn = TWEEN.Interpolation.Utils.Bernstein;
	    for (var i = 0; i <= n; i++) {
	      b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
	    }
	    return b;
	  },
	  CatmullRom: function CatmullRom(v, k) {
	    var m = v.length - 1;
	    var f = m * k;
	    var i = Math.floor(f);
	    var fn = TWEEN.Interpolation.Utils.CatmullRom;
	    if (v[0] === v[m]) {
	      if (k < 0) {
	        i = Math.floor(f = m * (1 + k));
	      }
	      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
	    } else {
	      if (k < 0) {
	        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
	      }
	      if (k > 1) {
	        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
	      }
	      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
	    }
	  },
	  Utils: {
	    Linear: function Linear(p0, p1, t) {
	      return (p1 - p0) * t + p0;
	    },
	    Bernstein: function Bernstein(n, i) {
	      var fc = TWEEN.Interpolation.Utils.Factorial;
	      return fc(n) / fc(i) / fc(n - i);
	    },
	    Factorial: function () {
	      var a = [1];
	      return function (n) {
	        var s = 1;
	        if (a[n]) {
	          return a[n];
	        }
	        for (var i = n; i > 1; i--) {
	          s *= i;
	        }
	        a[n] = s;
	        return s;
	      };
	    }(),
	    CatmullRom: function CatmullRom(p0, p1, p2, p3, t) {
	      var v0 = (p2 - p0) * 0.5;
	      var v1 = (p3 - p1) * 0.5;
	      var t2 = t * t;
	      var t3 = t * t2;
	      return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
	    }
	  }
	};

	var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	function encodeBinary(input) {
	  var output = '';
	  var inx = 0;
	  while (inx < input.length) {
	    var bytebuffer = [0, 0, 0];
	    var encodedCharIndexes = [0, 0, 0, 0];
	    for (var jnx = 0; jnx < bytebuffer.length; ++jnx) {
	      if (inx < input.length) {
	        bytebuffer[jnx] = input.charCodeAt(inx++) & 0xff;
	      } else {
	        bytebuffer[jnx] = 0;
	      }
	    }
	    encodedCharIndexes[0] = bytebuffer[0] >> 2;
	    encodedCharIndexes[1] = (bytebuffer[0] & 0x3) << 4 | bytebuffer[1] >> 4;
	    encodedCharIndexes[2] = (bytebuffer[1] & 0x0f) << 2 | bytebuffer[2] >> 6;
	    encodedCharIndexes[3] = bytebuffer[2] & 0x3f;
	    var paddingBytes = inx - (input.length - 1);
	    switch (paddingBytes) {
	      case 2:
	        encodedCharIndexes[3] = 64;
	        encodedCharIndexes[2] = 64;
	        break;
	      case 1:
	        encodedCharIndexes[3] = 64;
	        break;
	      default:
	        break;}
	    for (var _jnx = 0; _jnx < encodedCharIndexes.length; ++_jnx) {
	      output += _keyStr.charAt(encodedCharIndexes[_jnx]);
	    }
	  }
	  return output;
	}

	var b64 = /*#__PURE__*/Object.freeze({
		encodeBinary: encodeBinary
	});

	function mixin(target, source) {
	  if (!target || !source) return;
	  var keys = Object.keys(source);
	  for (var i = 0; i < keys.length; ++i) {
	    var propertyName = keys[i];
	    Object.defineProperty(target, propertyName, Object.getOwnPropertyDescriptor(source, propertyName));
	  }
	}
	var mixins = [];
	function delayMixin(target, source) {
	  mixins.push(target, source);
	}
	function performMixins() {
	  for (var i = 0; i < mixins.length; i += 2) {
	    mixin(mixins[i], mixins[i + 1]);
	  }
	  mixins.length = 0;
	}

	var mixin$1 = /*#__PURE__*/Object.freeze({
		mixin: mixin,
		delayMixin: delayMixin,
		performMixins: performMixins
	});

	var _parseUri_1_0_0_parseUri = function parseURI (str, opts) {
	  opts = opts || {};
	  var o = {
	    key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
	    q: {
	      name: 'queryKey',
	      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	    },
	    parser: {
	      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
	      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	    }
	  };
	  var m = o.parser[opts.strictMode ? 'strict' : 'loose'].exec(str);
	  var uri = {};
	  var i = 14;
	  while (i--) uri[o.key[i]] = m[i] || '';
	  uri[o.q.name] = {};
	  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
	    if ($1) uri[o.q.name][$1] = $2;
	  });
	  return uri
	};

	function resolve(source, relative) {
	  var sUrl = _parseUri_1_0_0_parseUri(source, { strictMode: true });
	  var rUrl = _parseUri_1_0_0_parseUri(relative, { strictMode: true });
	  if (rUrl.protocol) {
	    return relative;
	  } else {
	    relative = relative.replace(/^(\.)\//, '');
	    if (/^\.{2}\//.test(relative)) {
	      relative = relative.replace(/^(\.){2}\//, '');
	      source = source.replace(/[^\/]*\/[^\/]*$/, '');
	    }
	    if (/^\/[^\/]*/.test(relative)) {
	      return source.replace(new RegExp(sUrl.path + '$'), relative);
	    } else {
	      return source.replace(sUrl.file, '') + relative;
	    }
	  }
	}

	var url = /*#__PURE__*/Object.freeze({
		resolve: resolve,
		parse: _parseUri_1_0_0_parseUri
	});

	var tempAnchor = void 0;
	function determineCrossOrigin(url) {
	  var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;
	  if (url.indexOf('data:') === 0) {
	    return '';
	  }
	  if (!tempAnchor) {
	    tempAnchor = document.createElement('a');
	  }
	  tempAnchor.href = url;
	  url = _parseUri_1_0_0_parseUri(tempAnchor.href, { strictMode: true });
	  var samePort = !url.port && loc.port === '' || url.port === loc.port;
	  var protocol = url.protocol ? url.protocol + ':' : '';
	  if (url.host !== loc.hostname || !samePort || protocol !== loc.protocol) {
	    return 'anonymous';
	  }
	  return '';
	}

	var apple_phone = /iPhone/i,
	    apple_ipod = /iPod/i,
	    apple_tablet = /iPad/i,
	    android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
	    android_tablet = /Android/i,
	    amazon_phone = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
	    amazon_tablet = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
	    windows_phone = /Windows Phone/i,
	    windows_tablet = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
	    other_blackberry = /BlackBerry/i,
	    other_blackberry_10 = /BB10/i,
	    other_opera = /Opera Mini/i,
	    other_chrome = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
	    other_firefox = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
	    seven_inch = new RegExp('(?:' + 'Nexus 7' + '|' + 'BNTV250' + '|' + 'Kindle Fire' + '|' + 'Silk' + '|' + 'GT-P1000' + ')', 'i');
	var match = function match(regex, userAgent) {
	  return regex.test(userAgent);
	};
	var IsMobile = function IsMobile(userAgent) {
	  var ua = userAgent || navigator.userAgent;
	  var tmp = ua.split('[FBAN');
	  if (typeof tmp[1] !== 'undefined') {
	    ua = tmp[0];
	  }
	  tmp = ua.split('Twitter');
	  if (typeof tmp[1] !== 'undefined') {
	    ua = tmp[0];
	  }
	  this.apple = {
	    phone: match(apple_phone, ua),
	    ipod: match(apple_ipod, ua),
	    tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
	    device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
	  };
	  this.amazon = {
	    phone: match(amazon_phone, ua),
	    tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
	    device: match(amazon_phone, ua) || match(amazon_tablet, ua)
	  };
	  this.android = {
	    phone: match(amazon_phone, ua) || match(android_phone, ua),
	    tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
	    device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
	  };
	  this.windows = {
	    phone: match(windows_phone, ua),
	    tablet: match(windows_tablet, ua),
	    device: match(windows_phone, ua) || match(windows_tablet, ua)
	  };
	  this.other = {
	    blackberry: match(other_blackberry, ua),
	    blackberry10: match(other_blackberry_10, ua),
	    opera: match(other_opera, ua),
	    firefox: match(other_firefox, ua),
	    chrome: match(other_chrome, ua),
	    device: match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
	  };
	  this.seven_inch = match(seven_inch, ua);
	  this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
	  this.phone = this.apple.phone || this.android.phone || this.windows.phone;
	  this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;
	  if (typeof window === 'undefined') {
	    return this;
	  }
	};
	var instantiate = function instantiate() {
	  var IM = new IsMobile();
	  IM.Class = IsMobile;
	  return IM;
	};
	var isMobile = instantiate();

	var PI_2 = Math.PI * 2;
	var RAD_TO_DEG = 180 / Math.PI;
	var DEG_TO_RAD = Math.PI / 180;
	var URL_FILE_EXTENSION = /\.(\w{3,4})(?:$|\?|#)/i;
	var DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;
	var SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;
	var RETINA_PREFIX = /@([0-9\.]+)x/;
	var isArray = Array.isArray || function (obj) {
	  return Object.prototype.toString.call(obj) === '[object Array]';
	};
	function isFunction(obj) {
	  return Object.prototype.toString.call(obj) === '[object Function]';
	}
	function isNumber(obj) {
	  return Object.prototype.toString.call(obj) === '[object Number]';
	}
	function isString(obj) {
	  return typeof obj === 'string';
	}
	function isUndefined(obj) {
	  return obj === void 0;
	}
	function isObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	}
	function getTime() {
	  return window.performance.timing.navigationStart + window.performance.now();
	}
	function sign(n) {
	  return Math.sign(n);
	}
	function random(min, max) {
	  if (isArray(min)) {
	    max = min[1];
	    min = min[0];
	  }
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function randomInt() {
	  return random.call.apply(random, [this].concat(Array.prototype.slice.call(arguments)));
	}
	function randomFloat(min, max) {
	  return min + Math.random() * (max - min);
	}
	function randomBool(chance) {
	  chance = chance ? chance : 0.5;
	  return Math.random() < chance;
	}
	function randomPM(chance) {
	  chance = chance ? chance : 0.5;
	  return Math.random() > chance ? -1 : 1;
	}
	function randomFromArray(arr) {
	  return arr[random(0, arr.length - 1)];
	}
	function hex2rgb(hex, out) {
	  out = out || [];
	  out[0] = (hex >> 16 & 0xFF) / 255;
	  out[1] = (hex >> 8 & 0xFF) / 255;
	  out[2] = (hex & 0xFF) / 255;
	  return out;
	}
	function hex2string(hex) {
	  hex = hex.toString(16);
	  hex = '000000'.substr(0, 6 - hex.length) + hex;
	  return '#' + hex;
	}
	function rgb2hex(rgb) {
	  return (rgb[0] * 255 << 16) + (rgb[1] * 255 << 8) + (rgb[2] * 255 | 0);
	}
	function color2hex(color) {
	  return rgb2hex([color.colorR / 255, color.colorG / 255, color.colorB / 255]);
	}
	function hex2color(hex) {
	  var rgb = hex2rgb(hex);
	  return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
	}
	function deg2radian(deg) {
	  return deg * DEG_TO_RAD;
	}
	function radian2deg(radian) {
	  return radian * RAD_TO_DEG;
	}
	function randomColor() {
	  var letters = '0123456789ABCDEF';
	  var color = '0x';
	  for (var i = 0; i < 6; i++) {
	    color += letters[Math.floor(Math.random() * 16)];
	  }
	  return rgb2hex(hex2rgb(Number(color)));
	}
	var _XMLHttpRequest = null;
	function getXMLHttpRequest() {
	  var xhr = _XMLHttpRequest;
	  if (!xhr) {
	    xhr = new XMLHttpRequest();
	    _XMLHttpRequest = xhr;
	  } else {
	    if (+xhr.readyState !== 4) {
	      return new XMLHttpRequest();
	    }
	  }
	  return xhr;
	}
	function detect(obj, iterator, context, arg1, arg2) {
	  var result = void 0;
	  if (obj === null) {
	    return;
	  }
	  if (obj.length === +obj.length) {
	    for (var i = 0, l = obj.length; i < l; i++) {
	      result = iterator.call(context, obj[i], i, arg1, arg2);
	      if (result) {
	        return result;
	      }
	    }
	    return false;
	  } else {
	    for (var key in obj) {
	      result = iterator.call(context, obj[key], key, arg1, arg2);
	      if (result) {
	        return result;
	      }
	    }
	    return false;
	  }
	}
	function arrayRemoveObject(arr, delObj) {
	  for (var i = 0, l = arr.length; i < l; i++) {
	    if (arr[i] === delObj) {
	      arr.splice(i, 1);
	      break;
	    }
	  }
	}
	function removeItems(arr, startIdx, removeCount) {
	  var length = arr.length;
	  if (startIdx >= length || removeCount === 0) {
	    return;
	  }
	  removeCount = startIdx + removeCount > length ? length - startIdx : removeCount;
	  var len = length - removeCount;
	  for (var i = startIdx; i < len; ++i) {
	    arr[i] = arr[i + removeCount];
	  }
	  arr.length = len;
	}
	function getSvgSize(svgString) {
	  var sizeMatch = SVG_SIZE.exec(svgString);
	  var size = {};
	  if (sizeMatch) {
	    size[sizeMatch[1]] = Math.round(parseFloat(sizeMatch[3]));
	    size[sizeMatch[5]] = Math.round(parseFloat(sizeMatch[7]));
	  }
	  return size;
	}
	function getUrlFileExtension(url) {
	  var extension = URL_FILE_EXTENSION.exec(url);
	  if (extension) {
	    return extension[1].toLowerCase();
	  }
	  return undefined;
	}
	function decomposeDataUri(dataUri) {
	  var dataUriMatch = DATA_URI.exec(dataUri);
	  if (dataUriMatch) {
	    return {
	      mediaType: dataUriMatch[1] ? dataUriMatch[1].toLowerCase() : undefined,
	      subType: dataUriMatch[2] ? dataUriMatch[2].toLowerCase() : undefined,
	      charset: dataUriMatch[3] ? dataUriMatch[3].toLowerCase() : undefined,
	      encoding: dataUriMatch[4] ? dataUriMatch[4].toLowerCase() : undefined,
	      data: dataUriMatch[5]
	    };
	  }
	  return undefined;
	}
	function getResolutionOfUrl(url, defaultValue) {
	  var resolution = RETINA_PREFIX.exec(url);
	  if (resolution) {
	    return parseFloat(resolution[1]);
	  }
	  return defaultValue !== undefined ? defaultValue : 1;
	}
	function point(x, y) {
	  return {
	    x: x,
	    y: y === void 0 ? x : y
	  };
	}
	function scale(x, y) {
	  return {
	    scaleX: x,
	    scaleY: y === void 0 ? x : y
	  };
	}
	function color(red, green, blue) {
	  return {
	    colorR: isUndefined(red) ? 255 : red,
	    colorG: isUndefined(green) ? 255 : green,
	    colorB: isUndefined(blue) ? 255 : blue
	  };
	}

	var VERSION = '1.3.1';
	var RENDERER_TYPE = {
	  UNKNOWN: 0,
	  WEBGL: 1,
	  CANVAS: 2
	};
	var BLEND_MODES = {
	  NORMAL: 0,
	  ADD: 1,
	  MULTIPLY: 2,
	  SCREEN: 3,
	  OVERLAY: 4,
	  DARKEN: 5,
	  LIGHTEN: 6,
	  COLOR_DODGE: 7,
	  COLOR_BURN: 8,
	  HARD_LIGHT: 9,
	  SOFT_LIGHT: 10,
	  DIFFERENCE: 11,
	  EXCLUSION: 12,
	  HUE: 13,
	  SATURATION: 14,
	  COLOR: 15,
	  LUMINOSITY: 16,
	  NORMAL_NPM: 17,
	  ADD_NPM: 18,
	  SCREEN_NPM: 19
	};
	var DRAW_MODES = {
	  POINTS: 0,
	  LINES: 1,
	  LINE_LOOP: 2,
	  LINE_STRIP: 3,
	  TRIANGLES: 4,
	  TRIANGLE_STRIP: 5,
	  TRIANGLE_FAN: 6
	};
	var SCALE_MODES = {
	  LINEAR: 0,
	  NEAREST: 1
	};
	var WRAP_MODES = {
	  CLAMP: 0,
	  REPEAT: 1,
	  MIRRORED_REPEAT: 2
	};
	var GC_MODES = {
	  AUTO: 0,
	  MANUAL: 1
	};
	var SHAPES = {
	  POLY: 0,
	  RECT: 1,
	  CIRC: 2,
	  ELIP: 3,
	  RREC: 4
	};
	var PRECISION = {
	  LOW: 'lowp',
	  MEDIUM: 'mediump',
	  HIGH: 'highp'
	};
	var TRANSFORM_MODE = {
	  STATIC: 0,
	  DYNAMIC: 1
	};
	var TEXT_GRADIENT = {
	  LINEAR_VERTICAL: 0,
	  LINEAR_HORIZONTAL: 1
	};
	var UPDATE_PRIORITY = {
	  INTERACTION: 50,
	  HIGH: 25,
	  NORMAL: 0,
	  LOW: -25,
	  UTILITY: -50
	};
	var WIN_SIZE = {
	  width: 0,
	  height: 0
	};

	var Point = function () {
	  function Point() {
	    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    classCallCheck(this, Point);
	    this.x = x;
	    this.y = y;
	  }
	  createClass(Point, [{
	    key: "clone",
	    value: function clone() {
	      return new Point(this.x, this.y);
	    }
	  }, {
	    key: "copy",
	    value: function copy(p) {
	      this.set(p.x, p.y);
	    }
	  }, {
	    key: "equals",
	    value: function equals(p) {
	      return p.x === this.x && p.y === this.y;
	    }
	  }, {
	    key: "set",
	    value: function set$$1(x, y) {
	      this.x = x || 0;
	      this.y = y || (y !== 0 ? this.x : 0);
	    }
	  }]);
	  return Point;
	}();

	var ObservablePoint = function () {
	  function ObservablePoint(cb, scope) {
	    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	    classCallCheck(this, ObservablePoint);
	    this._x = x;
	    this._y = y;
	    this.cb = cb;
	    this.scope = scope;
	  }
	  createClass(ObservablePoint, [{
	    key: "clone",
	    value: function clone() {
	      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	      var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	      var _cb = cb || this.cb;
	      var _scope = scope || this.scope;
	      return new ObservablePoint(_cb, _scope, this._x, this._y);
	    }
	  }, {
	    key: "set",
	    value: function set$$1(x, y) {
	      var _x = x || 0;
	      var _y = y || (y !== 0 ? _x : 0);
	      if (this._x !== _x || this._y !== _y) {
	        this._x = _x;
	        this._y = _y;
	        this.cb.call(this.scope);
	      }
	    }
	  }, {
	    key: "copy",
	    value: function copy(point) {
	      if (this._x !== point.x || this._y !== point.y) {
	        this._x = point.x;
	        this._y = point.y;
	        this.cb.call(this.scope);
	      }
	    }
	  }, {
	    key: "equals",
	    value: function equals(p) {
	      return p.x === this._x && p.y === this._y;
	    }
	  }, {
	    key: "x",
	    get: function get$$1() {
	      return this._x;
	    },
	    set: function set$$1(value) {
	      if (this._x !== value) {
	        this._x = value;
	        this.cb.call(this.scope);
	      }
	    }
	  }, {
	    key: "y",
	    get: function get$$1() {
	      return this._y;
	    },
	    set: function set$$1(value) {
	      if (this._y !== value) {
	        this._y = value;
	        this.cb.call(this.scope);
	      }
	    }
	  }]);
	  return ObservablePoint;
	}();

	var Matrix = function () {
	  function Matrix() {
	    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
	    var tx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
	    var ty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
	    classCallCheck(this, Matrix);
	    this.a = a;
	    this.b = b;
	    this.c = c;
	    this.d = d;
	    this.tx = tx;
	    this.ty = ty;
	    this.array = null;
	  }
	  createClass(Matrix, [{
	    key: 'fromArray',
	    value: function fromArray(array) {
	      this.a = array[0];
	      this.b = array[1];
	      this.c = array[3];
	      this.d = array[4];
	      this.tx = array[2];
	      this.ty = array[5];
	    }
	  }, {
	    key: 'set',
	    value: function set$$1(a, b, c, d, tx, ty) {
	      this.a = a;
	      this.b = b;
	      this.c = c;
	      this.d = d;
	      this.tx = tx;
	      this.ty = ty;
	      return this;
	    }
	  }, {
	    key: 'toArray',
	    value: function toArray$$1(transpose, out) {
	      if (!this.array) {
	        this.array = new Float32Array(9);
	      }
	      var array = out || this.array;
	      if (transpose) {
	        array[0] = this.a;
	        array[1] = this.b;
	        array[2] = 0;
	        array[3] = this.c;
	        array[4] = this.d;
	        array[5] = 0;
	        array[6] = this.tx;
	        array[7] = this.ty;
	        array[8] = 1;
	      } else {
	        array[0] = this.a;
	        array[1] = this.c;
	        array[2] = this.tx;
	        array[3] = this.b;
	        array[4] = this.d;
	        array[5] = this.ty;
	        array[6] = 0;
	        array[7] = 0;
	        array[8] = 1;
	      }
	      return array;
	    }
	  }, {
	    key: 'apply',
	    value: function apply(pos, newPos) {
	      newPos = newPos || new Point();
	      var x = pos.x;
	      var y = pos.y;
	      newPos.x = this.a * x + this.c * y + this.tx;
	      newPos.y = this.b * x + this.d * y + this.ty;
	      return newPos;
	    }
	  }, {
	    key: 'applyInverse',
	    value: function applyInverse(pos, newPos) {
	      newPos = newPos || new Point();
	      var id = 1 / (this.a * this.d + this.c * -this.b);
	      var x = pos.x;
	      var y = pos.y;
	      newPos.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id;
	      newPos.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id;
	      return newPos;
	    }
	  }, {
	    key: 'translate',
	    value: function translate(x, y) {
	      this.tx += x;
	      this.ty += y;
	      return this;
	    }
	  }, {
	    key: 'scale',
	    value: function scale$$1(x, y) {
	      this.a *= x;
	      this.d *= y;
	      this.c *= x;
	      this.b *= y;
	      this.tx *= x;
	      this.ty *= y;
	      return this;
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate(angle) {
	      var cos = Math.cos(angle);
	      var sin = Math.sin(angle);
	      var a1 = this.a;
	      var c1 = this.c;
	      var tx1 = this.tx;
	      this.a = a1 * cos - this.b * sin;
	      this.b = a1 * sin + this.b * cos;
	      this.c = c1 * cos - this.d * sin;
	      this.d = c1 * sin + this.d * cos;
	      this.tx = tx1 * cos - this.ty * sin;
	      this.ty = tx1 * sin + this.ty * cos;
	      return this;
	    }
	  }, {
	    key: 'append',
	    value: function append(matrix) {
	      var a1 = this.a;
	      var b1 = this.b;
	      var c1 = this.c;
	      var d1 = this.d;
	      this.a = matrix.a * a1 + matrix.b * c1;
	      this.b = matrix.a * b1 + matrix.b * d1;
	      this.c = matrix.c * a1 + matrix.d * c1;
	      this.d = matrix.c * b1 + matrix.d * d1;
	      this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
	      this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;
	      return this;
	    }
	  }, {
	    key: 'setTransform',
	    value: function setTransform(x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY) {
	      this.a = Math.cos(rotation + skewY) * scaleX;
	      this.b = Math.sin(rotation + skewY) * scaleX;
	      this.c = -Math.sin(rotation - skewX) * scaleY;
	      this.d = Math.cos(rotation - skewX) * scaleY;
	      this.tx = x - (pivotX * this.a + pivotY * this.c);
	      this.ty = y - (pivotX * this.b + pivotY * this.d);
	      return this;
	    }
	  }, {
	    key: 'prepend',
	    value: function prepend(matrix) {
	      var tx1 = this.tx;
	      if (matrix.a !== 1 || matrix.b !== 0 || matrix.c !== 0 || matrix.d !== 1) {
	        var a1 = this.a;
	        var c1 = this.c;
	        this.a = a1 * matrix.a + this.b * matrix.c;
	        this.b = a1 * matrix.b + this.b * matrix.d;
	        this.c = c1 * matrix.a + this.d * matrix.c;
	        this.d = c1 * matrix.b + this.d * matrix.d;
	      }
	      this.tx = tx1 * matrix.a + this.ty * matrix.c + matrix.tx;
	      this.ty = tx1 * matrix.b + this.ty * matrix.d + matrix.ty;
	      return this;
	    }
	  }, {
	    key: 'decompose',
	    value: function decompose(transform) {
	      var a = this.a;
	      var b = this.b;
	      var c = this.c;
	      var d = this.d;
	      var skewX = -Math.atan2(-c, d);
	      var skewY = Math.atan2(b, a);
	      var delta = Math.abs(skewX + skewY);
	      if (delta < 0.00001 || Math.abs(PI_2 - delta) < 0.00001) {
	        transform.rotation = skewY;
	        if (a < 0 && d >= 0) {
	          transform.rotation += transform.rotation <= 0 ? Math.PI : -Math.PI;
	        }
	        transform.skew.x = transform.skew.y = 0;
	      } else {
	        transform.rotation = 0;
	        transform.skew.x = skewX;
	        transform.skew.y = skewY;
	      }
	      transform.scale.x = Math.sqrt(a * a + b * b);
	      transform.scale.y = Math.sqrt(c * c + d * d);
	      transform.position.x = this.tx;
	      transform.position.y = this.ty;
	      return transform;
	    }
	  }, {
	    key: 'invert',
	    value: function invert() {
	      var a1 = this.a;
	      var b1 = this.b;
	      var c1 = this.c;
	      var d1 = this.d;
	      var tx1 = this.tx;
	      var n = a1 * d1 - b1 * c1;
	      this.a = d1 / n;
	      this.b = -b1 / n;
	      this.c = -c1 / n;
	      this.d = a1 / n;
	      this.tx = (c1 * this.ty - d1 * tx1) / n;
	      this.ty = -(a1 * this.ty - b1 * tx1) / n;
	      return this;
	    }
	  }, {
	    key: 'identity',
	    value: function identity() {
	      this.a = 1;
	      this.b = 0;
	      this.c = 0;
	      this.d = 1;
	      this.tx = 0;
	      this.ty = 0;
	      return this;
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	      var matrix = new Matrix();
	      matrix.a = this.a;
	      matrix.b = this.b;
	      matrix.c = this.c;
	      matrix.d = this.d;
	      matrix.tx = this.tx;
	      matrix.ty = this.ty;
	      return matrix;
	    }
	  }, {
	    key: 'copy',
	    value: function copy(matrix) {
	      matrix.a = this.a;
	      matrix.b = this.b;
	      matrix.c = this.c;
	      matrix.d = this.d;
	      matrix.tx = this.tx;
	      matrix.ty = this.ty;
	      return matrix;
	    }
	  }], [{
	    key: 'IDENTITY',
	    get: function get$$1() {
	      return new Matrix();
	    }
	  }, {
	    key: 'TEMP_MATRIX',
	    get: function get$$1() {
	      return new Matrix();
	    }
	  }]);
	  return Matrix;
	}();

	var ux = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1];
	var uy = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1];
	var vx = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1];
	var vy = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1];
	var tempMatrices = [];
	var mul = [];
	function signum(x) {
	  if (x < 0) {
	    return -1;
	  }
	  if (x > 0) {
	    return 1;
	  }
	  return 0;
	}
	function init() {
	  for (var i = 0; i < 16; i++) {
	    var row = [];
	    mul.push(row);
	    for (var j = 0; j < 16; j++) {
	      var _ux = signum(ux[i] * ux[j] + vx[i] * uy[j]);
	      var _uy = signum(uy[i] * ux[j] + vy[i] * uy[j]);
	      var _vx = signum(ux[i] * vx[j] + vx[i] * vy[j]);
	      var _vy = signum(uy[i] * vx[j] + vy[i] * vy[j]);
	      for (var k = 0; k < 16; k++) {
	        if (ux[k] === _ux && uy[k] === _uy && vx[k] === _vx && vy[k] === _vy) {
	          row.push(k);
	          break;
	        }
	      }
	    }
	  }
	  for (var _i = 0; _i < 16; _i++) {
	    var mat = new Matrix();
	    mat.set(ux[_i], uy[_i], vx[_i], vy[_i], 0, 0);
	    tempMatrices.push(mat);
	  }
	}
	init();
	var GroupD8 = {
	  E: 0,
	  SE: 1,
	  S: 2,
	  SW: 3,
	  W: 4,
	  NW: 5,
	  N: 6,
	  NE: 7,
	  MIRROR_VERTICAL: 8,
	  MIRROR_HORIZONTAL: 12,
	  uX: function uX(ind) {
	    return ux[ind];
	  },
	  uY: function uY(ind) {
	    return uy[ind];
	  },
	  vX: function vX(ind) {
	    return vx[ind];
	  },
	  vY: function vY(ind) {
	    return vy[ind];
	  },
	  inv: function inv(rotation) {
	    if (rotation & 8) {
	      return rotation & 15;
	    }
	    return -rotation & 7;
	  },
	  add: function add(rotationSecond, rotationFirst) {
	    return mul[rotationSecond][rotationFirst];
	  },
	  sub: function sub(rotationSecond, rotationFirst) {
	    return mul[rotationSecond][GroupD8.inv(rotationFirst)];
	  },
	  rotate180: function rotate180(rotation) {
	    return rotation ^ 4;
	  },
	  isVertical: function isVertical(rotation) {
	    return (rotation & 3) === 2;
	  },
	  byDirection: function byDirection(dx, dy) {
	    if (Math.abs(dx) * 2 <= Math.abs(dy)) {
	      if (dy >= 0) {
	        return GroupD8.S;
	      }
	      return GroupD8.N;
	    } else if (Math.abs(dy) * 2 <= Math.abs(dx)) {
	      if (dx > 0) {
	        return GroupD8.E;
	      }
	      return GroupD8.W;
	    } else if (dy > 0) {
	      if (dx > 0) {
	        return GroupD8.SE;
	      }
	      return GroupD8.SW;
	    } else if (dx > 0) {
	      return GroupD8.NE;
	    }
	    return GroupD8.NW;
	  },
	  matrixAppendRotationInv: function matrixAppendRotationInv(matrix, rotation) {
	    var tx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var ty = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	    var mat = tempMatrices[GroupD8.inv(rotation)];
	    mat.tx = tx;
	    mat.ty = ty;
	    matrix.append(mat);
	  }
	};

	var Rectangle = function () {
	  function Rectangle() {
	    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	    classCallCheck(this, Rectangle);
	    this.x = Number(x);
	    this.y = Number(y);
	    this.width = Number(width);
	    this.height = Number(height);
	    this.type = SHAPES.RECT;
	  }
	  createClass(Rectangle, [{
	    key: 'clone',
	    value: function clone() {
	      return new Rectangle(this.x, this.y, this.width, this.height);
	    }
	  }, {
	    key: 'copy',
	    value: function copy(rectangle) {
	      this.x = rectangle.x;
	      this.y = rectangle.y;
	      this.width = rectangle.width;
	      this.height = rectangle.height;
	      return this;
	    }
	  }, {
	    key: 'contains',
	    value: function contains(x, y) {
	      if (this.width <= 0 || this.height <= 0) {
	        return false;
	      }
	      if (x >= this.x && x < this.x + this.width) {
	        if (y >= this.y && y < this.y + this.height) {
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: 'pad',
	    value: function pad(paddingX, paddingY) {
	      paddingX = paddingX || 0;
	      paddingY = paddingY || (paddingY !== 0 ? paddingX : 0);
	      this.x -= paddingX;
	      this.y -= paddingY;
	      this.width += paddingX * 2;
	      this.height += paddingY * 2;
	    }
	  }, {
	    key: 'fit',
	    value: function fit(rectangle) {
	      if (this.x < rectangle.x) {
	        this.width += this.x;
	        if (this.width < 0) {
	          this.width = 0;
	        }
	        this.x = rectangle.x;
	      }
	      if (this.y < rectangle.y) {
	        this.height += this.y;
	        if (this.height < 0) {
	          this.height = 0;
	        }
	        this.y = rectangle.y;
	      }
	      if (this.x + this.width > rectangle.x + rectangle.width) {
	        this.width = rectangle.width - this.x;
	        if (this.width < 0) {
	          this.width = 0;
	        }
	      }
	      if (this.y + this.height > rectangle.y + rectangle.height) {
	        this.height = rectangle.height - this.y;
	        if (this.height < 0) {
	          this.height = 0;
	        }
	      }
	    }
	  }, {
	    key: 'enlarge',
	    value: function enlarge(rectangle) {
	      var x1 = Math.min(this.x, rectangle.x);
	      var x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width);
	      var y1 = Math.min(this.y, rectangle.y);
	      var y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);
	      this.x = x1;
	      this.width = x2 - x1;
	      this.y = y1;
	      this.height = y2 - y1;
	    }
	  }, {
	    key: 'left',
	    get: function get$$1() {
	      return this.x;
	    }
	  }, {
	    key: 'right',
	    get: function get$$1() {
	      return this.x + this.width;
	    }
	  }, {
	    key: 'top',
	    get: function get$$1() {
	      return this.y;
	    }
	  }, {
	    key: 'bottom',
	    get: function get$$1() {
	      return this.y + this.height;
	    }
	  }], [{
	    key: 'EMPTY',
	    get: function get$$1() {
	      return new Rectangle(0, 0, 0, 0);
	    }
	  }]);
	  return Rectangle;
	}();

	var Circle = function () {
	  function Circle() {
	    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    classCallCheck(this, Circle);
	    this.x = x;
	    this.y = y;
	    this.radius = radius;
	    this.type = SHAPES.CIRC;
	  }
	  createClass(Circle, [{
	    key: 'clone',
	    value: function clone() {
	      return new Circle(this.x, this.y, this.radius);
	    }
	  }, {
	    key: 'contains',
	    value: function contains(x, y) {
	      if (this.radius <= 0) {
	        return false;
	      }
	      var r2 = this.radius * this.radius;
	      var dx = this.x - x;
	      var dy = this.y - y;
	      dx *= dx;
	      dy *= dy;
	      return dx + dy <= r2;
	    }
	  }, {
	    key: 'getBounds',
	    value: function getBounds() {
	      return new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
	    }
	  }]);
	  return Circle;
	}();

	var Ellipse = function () {
	  function Ellipse() {
	    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	    classCallCheck(this, Ellipse);
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.type = SHAPES.ELIP;
	  }
	  createClass(Ellipse, [{
	    key: 'clone',
	    value: function clone() {
	      return new Ellipse(this.x, this.y, this.width, this.height);
	    }
	  }, {
	    key: 'contains',
	    value: function contains(x, y) {
	      if (this.width <= 0 || this.height <= 0) {
	        return false;
	      }
	      var normx = (x - this.x) / this.width;
	      var normy = (y - this.y) / this.height;
	      normx *= normx;
	      normy *= normy;
	      return normx + normy <= 1;
	    }
	  }, {
	    key: 'getBounds',
	    value: function getBounds() {
	      return new Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
	    }
	  }]);
	  return Ellipse;
	}();

	var Polygon = function () {
	  function Polygon() {
	    for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) {
	      points[_key] = arguments[_key];
	    }
	    classCallCheck(this, Polygon);
	    if (Array.isArray(points[0])) {
	      points = points[0];
	    }
	    if (points[0] instanceof Point) {
	      var p = [];
	      for (var i = 0, il = points.length; i < il; i++) {
	        p.push(points[i].x, points[i].y);
	      }
	      points = p;
	    }
	    this.closed = true;
	    this.points = points;
	    this.type = SHAPES.POLY;
	  }
	  createClass(Polygon, [{
	    key: 'clone',
	    value: function clone() {
	      return new Polygon(this.points.slice());
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      var points = this.points;
	      if (points[0] !== points[points.length - 2] || points[1] !== points[points.length - 1]) {
	        points.push(points[0], points[1]);
	      }
	    }
	  }, {
	    key: 'contains',
	    value: function contains(x, y) {
	      var inside = false;
	      var length = this.points.length / 2;
	      for (var i = 0, j = length - 1; i < length; j = i++) {
	        var xi = this.points[i * 2];
	        var yi = this.points[i * 2 + 1];
	        var xj = this.points[j * 2];
	        var yj = this.points[j * 2 + 1];
	        var intersect = yi > y !== yj > y && x < (xj - xi) * ((y - yi) / (yj - yi)) + xi;
	        if (intersect) {
	          inside = !inside;
	        }
	      }
	      return inside;
	    }
	  }]);
	  return Polygon;
	}();

	var RoundedRectangle = function () {
	  function RoundedRectangle() {
	    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	    var radius = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 20;
	    classCallCheck(this, RoundedRectangle);
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.radius = radius;
	    this.type = SHAPES.RREC;
	  }
	  createClass(RoundedRectangle, [{
	    key: 'clone',
	    value: function clone() {
	      return new RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
	    }
	  }, {
	    key: 'contains',
	    value: function contains(x, y) {
	      if (this.width <= 0 || this.height <= 0) {
	        return false;
	      }
	      if (x >= this.x && x <= this.x + this.width) {
	        if (y >= this.y && y <= this.y + this.height) {
	          if (y >= this.y + this.radius && y <= this.y + this.height - this.radius || x >= this.x + this.radius && x <= this.x + this.width - this.radius) {
	            return true;
	          }
	          var dx = x - (this.x + this.radius);
	          var dy = y - (this.y + this.radius);
	          var radius2 = this.radius * this.radius;
	          if (dx * dx + dy * dy <= radius2) {
	            return true;
	          }
	          dx = x - (this.x + this.width - this.radius);
	          if (dx * dx + dy * dy <= radius2) {
	            return true;
	          }
	          dy = y - (this.y + this.height - this.radius);
	          if (dx * dx + dy * dy <= radius2) {
	            return true;
	          }
	          dx = x - (this.x + this.radius);
	          if (dx * dx + dy * dy <= radius2) {
	            return true;
	          }
	        }
	      }
	      return false;
	    }
	  }]);
	  return RoundedRectangle;
	}();

	function pluginTarget(obj) {
	  obj.__plugins = {};
	  obj.registerPlugin = function registerPlugin(pluginName, ctor) {
	    obj.__plugins[pluginName] = ctor;
	  };
	  obj.prototype.initPlugins = function initPlugins() {
	    this.plugins = this.plugins || {};
	    for (var o in obj.__plugins) {
	      this.plugins[o] = new obj.__plugins[o](this);
	    }
	  };
	  obj.prototype.destroyPlugins = function destroyPlugins() {
	    for (var o in this.plugins) {
	      this.plugins[o].destroy();
	      this.plugins[o] = null;
	    }
	    this.plugins = null;
	  };
	}
	var pluginTarget$1 = {
	  mixin: function mixin(obj) {
	    pluginTarget(obj);
	  }
	};

	function mapPremultipliedBlendModes() {
	  var pm = [];
	  var npm = [];
	  for (var i = 0; i < 32; i++) {
	    pm[i] = i;
	    npm[i] = i;
	  }
	  pm[BLEND_MODES.NORMAL_NPM] = BLEND_MODES.NORMAL;
	  pm[BLEND_MODES.ADD_NPM] = BLEND_MODES.ADD;
	  pm[BLEND_MODES.SCREEN_NPM] = BLEND_MODES.SCREEN;
	  npm[BLEND_MODES.NORMAL] = BLEND_MODES.NORMAL_NPM;
	  npm[BLEND_MODES.ADD] = BLEND_MODES.ADD_NPM;
	  npm[BLEND_MODES.SCREEN] = BLEND_MODES.SCREEN_NPM;
	  var array = [];
	  array.push(npm);
	  array.push(pm);
	  return array;
	}

	var earcut_1 = earcut;
	var default_1 = earcut;
	function earcut(data, holeIndices, dim) {
	    dim = dim || 2;
	    var hasHoles = holeIndices && holeIndices.length,
	        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
	        outerNode = linkedList(data, 0, outerLen, dim, true),
	        triangles = [];
	    if (!outerNode || outerNode.next === outerNode.prev) return triangles;
	    var minX, minY, maxX, maxY, x, y, invSize;
	    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);
	    if (data.length > 80 * dim) {
	        minX = maxX = data[0];
	        minY = maxY = data[1];
	        for (var i = dim; i < outerLen; i += dim) {
	            x = data[i];
	            y = data[i + 1];
	            if (x < minX) minX = x;
	            if (y < minY) minY = y;
	            if (x > maxX) maxX = x;
	            if (y > maxY) maxY = y;
	        }
	        invSize = Math.max(maxX - minX, maxY - minY);
	        invSize = invSize !== 0 ? 1 / invSize : 0;
	    }
	    earcutLinked(outerNode, triangles, dim, minX, minY, invSize);
	    return triangles;
	}
	function linkedList(data, start, end, dim, clockwise) {
	    var i, last;
	    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
	        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
	    } else {
	        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
	    }
	    if (last && equals(last, last.next)) {
	        removeNode(last);
	        last = last.next;
	    }
	    return last;
	}
	function filterPoints(start, end) {
	    if (!start) return start;
	    if (!end) end = start;
	    var p = start,
	        again;
	    do {
	        again = false;
	        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
	            removeNode(p);
	            p = end = p.prev;
	            if (p === p.next) break;
	            again = true;
	        } else {
	            p = p.next;
	        }
	    } while (again || p !== end);
	    return end;
	}
	function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
	    if (!ear) return;
	    if (!pass && invSize) indexCurve(ear, minX, minY, invSize);
	    var stop = ear,
	        prev, next;
	    while (ear.prev !== ear.next) {
	        prev = ear.prev;
	        next = ear.next;
	        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
	            triangles.push(prev.i / dim);
	            triangles.push(ear.i / dim);
	            triangles.push(next.i / dim);
	            removeNode(ear);
	            ear = next.next;
	            stop = next.next;
	            continue;
	        }
	        ear = next;
	        if (ear === stop) {
	            if (!pass) {
	                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);
	            } else if (pass === 1) {
	                ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
	                earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);
	            } else if (pass === 2) {
	                splitEarcut(ear, triangles, dim, minX, minY, invSize);
	            }
	            break;
	        }
	    }
	}
	function isEar(ear) {
	    var a = ear.prev,
	        b = ear,
	        c = ear.next;
	    if (area(a, b, c) >= 0) return false;
	    var p = ear.next.next;
	    while (p !== ear.prev) {
	        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
	            area(p.prev, p, p.next) >= 0) return false;
	        p = p.next;
	    }
	    return true;
	}
	function isEarHashed(ear, minX, minY, invSize) {
	    var a = ear.prev,
	        b = ear,
	        c = ear.next;
	    if (area(a, b, c) >= 0) return false;
	    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
	        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
	        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
	        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);
	    var minZ = zOrder(minTX, minTY, minX, minY, invSize),
	        maxZ = zOrder(maxTX, maxTY, minX, minY, invSize);
	    var p = ear.prevZ,
	        n = ear.nextZ;
	    while (p && p.z >= minZ && n && n.z <= maxZ) {
	        if (p !== ear.prev && p !== ear.next &&
	            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
	            area(p.prev, p, p.next) >= 0) return false;
	        p = p.prevZ;
	        if (n !== ear.prev && n !== ear.next &&
	            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
	            area(n.prev, n, n.next) >= 0) return false;
	        n = n.nextZ;
	    }
	    while (p && p.z >= minZ) {
	        if (p !== ear.prev && p !== ear.next &&
	            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
	            area(p.prev, p, p.next) >= 0) return false;
	        p = p.prevZ;
	    }
	    while (n && n.z <= maxZ) {
	        if (n !== ear.prev && n !== ear.next &&
	            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
	            area(n.prev, n, n.next) >= 0) return false;
	        n = n.nextZ;
	    }
	    return true;
	}
	function cureLocalIntersections(start, triangles, dim) {
	    var p = start;
	    do {
	        var a = p.prev,
	            b = p.next.next;
	        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
	            triangles.push(a.i / dim);
	            triangles.push(p.i / dim);
	            triangles.push(b.i / dim);
	            removeNode(p);
	            removeNode(p.next);
	            p = start = b;
	        }
	        p = p.next;
	    } while (p !== start);
	    return filterPoints(p);
	}
	function splitEarcut(start, triangles, dim, minX, minY, invSize) {
	    var a = start;
	    do {
	        var b = a.next.next;
	        while (b !== a.prev) {
	            if (a.i !== b.i && isValidDiagonal(a, b)) {
	                var c = splitPolygon(a, b);
	                a = filterPoints(a, a.next);
	                c = filterPoints(c, c.next);
	                earcutLinked(a, triangles, dim, minX, minY, invSize);
	                earcutLinked(c, triangles, dim, minX, minY, invSize);
	                return;
	            }
	            b = b.next;
	        }
	        a = a.next;
	    } while (a !== start);
	}
	function eliminateHoles(data, holeIndices, outerNode, dim) {
	    var queue = [],
	        i, len, start, end, list;
	    for (i = 0, len = holeIndices.length; i < len; i++) {
	        start = holeIndices[i] * dim;
	        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
	        list = linkedList(data, start, end, dim, false);
	        if (list === list.next) list.steiner = true;
	        queue.push(getLeftmost(list));
	    }
	    queue.sort(compareX);
	    for (i = 0; i < queue.length; i++) {
	        eliminateHole(queue[i], outerNode);
	        outerNode = filterPoints(outerNode, outerNode.next);
	    }
	    return outerNode;
	}
	function compareX(a, b) {
	    return a.x - b.x;
	}
	function eliminateHole(hole, outerNode) {
	    outerNode = findHoleBridge(hole, outerNode);
	    if (outerNode) {
	        var b = splitPolygon(outerNode, hole);
	        filterPoints(b, b.next);
	    }
	}
	function findHoleBridge(hole, outerNode) {
	    var p = outerNode,
	        hx = hole.x,
	        hy = hole.y,
	        qx = -Infinity,
	        m;
	    do {
	        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
	            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
	            if (x <= hx && x > qx) {
	                qx = x;
	                if (x === hx) {
	                    if (hy === p.y) return p;
	                    if (hy === p.next.y) return p.next;
	                }
	                m = p.x < p.next.x ? p : p.next;
	            }
	        }
	        p = p.next;
	    } while (p !== outerNode);
	    if (!m) return null;
	    if (hx === qx) return m;
	    var stop = m,
	        mx = m.x,
	        my = m.y,
	        tanMin = Infinity,
	        tan;
	    p = m;
	    do {
	        if (hx >= p.x && p.x >= mx && hx !== p.x &&
	                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
	            tan = Math.abs(hy - p.y) / (hx - p.x);
	            if (locallyInside(p, hole) &&
	                (tan < tanMin || (tan === tanMin && (p.x > m.x || (p.x === m.x && sectorContainsSector(m, p)))))) {
	                m = p;
	                tanMin = tan;
	            }
	        }
	        p = p.next;
	    } while (p !== stop);
	    return m;
	}
	function sectorContainsSector(m, p) {
	    return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
	}
	function indexCurve(start, minX, minY, invSize) {
	    var p = start;
	    do {
	        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize);
	        p.prevZ = p.prev;
	        p.nextZ = p.next;
	        p = p.next;
	    } while (p !== start);
	    p.prevZ.nextZ = null;
	    p.prevZ = null;
	    sortLinked(p);
	}
	function sortLinked(list) {
	    var i, p, q, e, tail, numMerges, pSize, qSize,
	        inSize = 1;
	    do {
	        p = list;
	        list = null;
	        tail = null;
	        numMerges = 0;
	        while (p) {
	            numMerges++;
	            q = p;
	            pSize = 0;
	            for (i = 0; i < inSize; i++) {
	                pSize++;
	                q = q.nextZ;
	                if (!q) break;
	            }
	            qSize = inSize;
	            while (pSize > 0 || (qSize > 0 && q)) {
	                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
	                    e = p;
	                    p = p.nextZ;
	                    pSize--;
	                } else {
	                    e = q;
	                    q = q.nextZ;
	                    qSize--;
	                }
	                if (tail) tail.nextZ = e;
	                else list = e;
	                e.prevZ = tail;
	                tail = e;
	            }
	            p = q;
	        }
	        tail.nextZ = null;
	        inSize *= 2;
	    } while (numMerges > 1);
	    return list;
	}
	function zOrder(x, y, minX, minY, invSize) {
	    x = 32767 * (x - minX) * invSize;
	    y = 32767 * (y - minY) * invSize;
	    x = (x | (x << 8)) & 0x00FF00FF;
	    x = (x | (x << 4)) & 0x0F0F0F0F;
	    x = (x | (x << 2)) & 0x33333333;
	    x = (x | (x << 1)) & 0x55555555;
	    y = (y | (y << 8)) & 0x00FF00FF;
	    y = (y | (y << 4)) & 0x0F0F0F0F;
	    y = (y | (y << 2)) & 0x33333333;
	    y = (y | (y << 1)) & 0x55555555;
	    return x | (y << 1);
	}
	function getLeftmost(start) {
	    var p = start,
	        leftmost = start;
	    do {
	        if (p.x < leftmost.x || (p.x === leftmost.x && p.y < leftmost.y)) leftmost = p;
	        p = p.next;
	    } while (p !== start);
	    return leftmost;
	}
	function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
	    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
	           (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
	           (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
	}
	function isValidDiagonal(a, b) {
	    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) &&
	           (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) &&
	            (area(a.prev, a, b.prev) || area(a, b.prev, b)) ||
	            equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0);
	}
	function area(p, q, r) {
	    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
	}
	function equals(p1, p2) {
	    return p1.x === p2.x && p1.y === p2.y;
	}
	function intersects(p1, q1, p2, q2) {
	    var o1 = sign$1(area(p1, q1, p2));
	    var o2 = sign$1(area(p1, q1, q2));
	    var o3 = sign$1(area(p2, q2, p1));
	    var o4 = sign$1(area(p2, q2, q1));
	    if (o1 !== o2 && o3 !== o4) return true;
	    if (o1 === 0 && onSegment(p1, p2, q1)) return true;
	    if (o2 === 0 && onSegment(p1, q2, q1)) return true;
	    if (o3 === 0 && onSegment(p2, p1, q2)) return true;
	    if (o4 === 0 && onSegment(p2, q1, q2)) return true;
	    return false;
	}
	function onSegment(p, q, r) {
	    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
	}
	function sign$1(num) {
	    return num > 0 ? 1 : num < 0 ? -1 : 0;
	}
	function intersectsPolygon(a, b) {
	    var p = a;
	    do {
	        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
	                intersects(p, p.next, a, b)) return true;
	        p = p.next;
	    } while (p !== a);
	    return false;
	}
	function locallyInside(a, b) {
	    return area(a.prev, a, a.next) < 0 ?
	        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
	        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
	}
	function middleInside(a, b) {
	    var p = a,
	        inside = false,
	        px = (a.x + b.x) / 2,
	        py = (a.y + b.y) / 2;
	    do {
	        if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
	                (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
	            inside = !inside;
	        p = p.next;
	    } while (p !== a);
	    return inside;
	}
	function splitPolygon(a, b) {
	    var a2 = new Node(a.i, a.x, a.y),
	        b2 = new Node(b.i, b.x, b.y),
	        an = a.next,
	        bp = b.prev;
	    a.next = b;
	    b.prev = a;
	    a2.next = an;
	    an.prev = a2;
	    b2.next = a2;
	    a2.prev = b2;
	    bp.next = b2;
	    b2.prev = bp;
	    return b2;
	}
	function insertNode(i, x, y, last) {
	    var p = new Node(i, x, y);
	    if (!last) {
	        p.prev = p;
	        p.next = p;
	    } else {
	        p.next = last.next;
	        p.prev = last;
	        last.next.prev = p;
	        last.next = p;
	    }
	    return p;
	}
	function removeNode(p) {
	    p.next.prev = p.prev;
	    p.prev.next = p.next;
	    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
	    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
	}
	function Node(i, x, y) {
	    this.i = i;
	    this.x = x;
	    this.y = y;
	    this.prev = null;
	    this.next = null;
	    this.z = null;
	    this.prevZ = null;
	    this.nextZ = null;
	    this.steiner = false;
	}
	earcut.deviation = function (data, holeIndices, dim, triangles) {
	    var hasHoles = holeIndices && holeIndices.length;
	    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;
	    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
	    if (hasHoles) {
	        for (var i = 0, len = holeIndices.length; i < len; i++) {
	            var start = holeIndices[i] * dim;
	            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
	            polygonArea -= Math.abs(signedArea(data, start, end, dim));
	        }
	    }
	    var trianglesArea = 0;
	    for (i = 0; i < triangles.length; i += 3) {
	        var a = triangles[i] * dim;
	        var b = triangles[i + 1] * dim;
	        var c = triangles[i + 2] * dim;
	        trianglesArea += Math.abs(
	            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
	            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
	    }
	    return polygonArea === 0 && trianglesArea === 0 ? 0 :
	        Math.abs((trianglesArea - polygonArea) / polygonArea);
	};
	function signedArea(data, start, end, dim) {
	    var sum = 0;
	    for (var i = start, j = end - dim; i < end; i += dim) {
	        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
	        j = i;
	    }
	    return sum;
	}
	earcut.flatten = function (data) {
	    var dim = data[0][0].length,
	        result = {vertices: [], holes: [], dimensions: dim},
	        holeIndex = 0;
	    for (var i = 0; i < data.length; i++) {
	        for (var j = 0; j < data[i].length; j++) {
	            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
	        }
	        if (i > 0) {
	            holeIndex += data[i - 1].length;
	            result.holes.push(holeIndex);
	        }
	    }
	    return result;
	};
	earcut_1.default = default_1;

	function rectContainsRect(rect1, rect2) {
	  if (!rect1 || !rect2) {
	    return false;
	  }
	  return !(rect1.x >= rect2.x || rect1.y >= rect2.y || rect1.x + rect1.width <= rect2.x + rect2.width || rect1.y + rect1.height <= rect2.y + rect2.height);
	}
	function rectGetMaxX(rect) {
	  return rect.x + rect.width;
	}
	function rectGetMidX(rect) {
	  return rect.x + rect.width / 2.0;
	}
	function rectGetMinX(rect) {
	  return rect.x;
	}
	function rectGetMaxY(rect) {
	  return rect.y + rect.height;
	}
	function rectGetMidY(rect) {
	  return rect.y + rect.height / 2.0;
	}
	function rectGetMinY(rect) {
	  return rect.y;
	}
	function rectContainsPoint(rect, point) {
	  return point.x >= rectGetMinX(rect) && point.x <= rectGetMaxX(rect) && point.y >= rectGetMinY(rect) && point.y <= rectGetMaxY(rect);
	}
	function rectIntersectsRect(rectA, rectB) {
	  return !(rectGetMaxX(rectA) < rectGetMinX(rectB) || rectGetMaxX(rectB) < rectGetMinX(rectA) || rectGetMaxY(rectA) < rectGetMinY(rectB) || rectGetMaxY(rectB) < rectGetMinY(rectA));
	}
	function rectUnion(rectA, rectB) {
	  var rect = Rectangle.EMPTY;
	  rect.x = Math.min(rectA.x, rectB.x);
	  rect.y = Math.min(rectA.y, rectB.y);
	  rect.width = Math.max(rectA.x + rectA.width, rectB.x + rectB.width) - rect.x;
	  rect.height = Math.max(rectA.y + rectA.height, rectB.y + rectB.height) - rect.y;
	  return rect;
	}
	function isPixelCollision(first, x, y, isFirstCentred, other, x2, y2, isOtherCentred) {
	  x = Math.round(x);
	  y = Math.round(y);
	  x2 = Math.round(x2);
	  y2 = Math.round(y2);
	  var w = first.collisionWidth || first.width;
	  var h = first.collisionHeight || first.height;
	  var w2 = other.collisionWidth || other.width;
	  var h2 = other.collisionHeight || other.height;
	  if (isFirstCentred) {
	    x -= w / 2 + 0.5 << 0;
	    y -= h / 2 + 0.5 << 0;
	  }
	  if (isOtherCentred) {
	    x2 -= w2 / 2 + 0.5 << 0;
	    y2 -= h2 / 2 + 0.5 << 0;
	  }
	  var xMin = Math.max(x, x2);
	  var yMin = Math.max(y, y2);
	  var xMax = Math.min(x + w, x2 + w2);
	  var yMax = Math.min(y + h, y2 + h2);
	  if (xMin >= xMax || yMin >= yMax) {
	    return false;
	  }
	  var xDiff = xMax - xMin;
	  var yDiff = yMax - yMin;
	  var pixels = first.data;
	  var pixels2 = other.data;
	  if (!pixels || !pixels2) {
	    throw new Error('The Sprit\'s data cannot be null' + (!pixels && ', first.data is ' + pixels) + (!pixels2 && ', other.data is ' + pixels2 + '.'));
	  }
	  if (xDiff < 4 && yDiff < 4) {
	    for (var pixelX = xMin; pixelX < xMax; pixelX++) {
	      for (var pixelY = yMin; pixelY < yMax; pixelY++) {
	        if (pixels[(pixelX - x + (pixelY - y) * w) * 4 + 3] !== 0 && pixels2[(pixelX - x2 + (pixelY - y2) * w2) * 4 + 3] !== 0) {
	          return true;
	        }
	      }
	    }
	  } else {
	    var incX = xDiff / 3.0;
	    var incY = yDiff / 3.0;
	    incX = ~~incX === incX ? incX : incX + 1 | 0;
	    incY = ~~incY === incY ? incY : incY + 1 | 0;
	    for (var offsetY = 0; offsetY < incY; offsetY++) {
	      for (var offsetX = 0; offsetX < incX; offsetX++) {
	        for (var _pixelY = yMin + offsetY; _pixelY < yMax; _pixelY += incY) {
	          for (var _pixelX = xMin + offsetX; _pixelX < xMax; _pixelX += incX) {
	            if (pixels[(_pixelX - x + (_pixelY - y) * w) * 4 + 3] !== 0 && pixels2[(_pixelX - x2 + (_pixelY - y2) * w2) * 4 + 3] !== 0) {
	              return true;
	            }
	          }
	        }
	      }
	    }
	  }
	  return false;
	}

	var nextUid = 0;
	function uid() {
	  return ++nextUid;
	}
	function isWebGLSupported() {
	  var contextOptions = { stencil: true, failIfMajorPerformanceCaveat: true };
	  try {
	    if (!window.WebGLRenderingContext) {
	      return false;
	    }
	    var canvas = document.createElement('canvas');
	    var gl = canvas.getContext('webgl', contextOptions) || canvas.getContext('experimental-webgl', contextOptions);
	    var success = !!(gl && gl.getContextAttributes().stencil);
	    if (gl) {
	      var loseContext = gl.getExtension('WEBGL_lose_context');
	      if (loseContext) {
	        loseContext.loseContext();
	      }
	    }
	    gl = null;
	    return success;
	  } catch (e) {
	    return false;
	  }
	}
	var TextureCache = Object.create(null);
	var BaseTextureCache = Object.create(null);
	var CountDownCache = [];
	function destroyTextureCache() {
	  var key = void 0;
	  for (key in TextureCache) {
	    TextureCache[key].destroy();
	  }
	  for (key in BaseTextureCache) {
	    BaseTextureCache[key].destroy();
	  }
	}
	function clearTextureCache() {
	  var key = void 0;
	  for (key in TextureCache) {
	    delete TextureCache[key];
	  }
	  for (key in BaseTextureCache) {
	    delete BaseTextureCache[key];
	  }
	}
	var premultiplyBlendMode = mapPremultipliedBlendModes();
	function correctBlendMode(blendMode, premultiplied) {
	  return premultiplyBlendMode[premultiplied ? 1 : 0][blendMode];
	}
	function premultiplyTint(tint, alpha) {
	  if (alpha === 1.0) {
	    return (alpha * 255 << 24) + tint;
	  }
	  if (alpha === 0.0) {
	    return 0;
	  }
	  var R = tint >> 16 & 0xFF;
	  var G = tint >> 8 & 0xFF;
	  var B = tint & 0xFF;
	  R = R * alpha + 0.5 | 0;
	  G = G * alpha + 0.5 | 0;
	  B = B * alpha + 0.5 | 0;
	  return (alpha * 255 << 24) + (R << 16) + (G << 8) + B;
	}
	function premultiplyRgba(rgb, alpha, out, premultiply) {
	  out = out || new Float32Array(4);
	  if (premultiply || premultiply === undefined) {
	    out[0] = rgb[0] * alpha;
	    out[1] = rgb[1] * alpha;
	    out[2] = rgb[2] * alpha;
	  } else {
	    out[0] = rgb[0];
	    out[1] = rgb[1];
	    out[2] = rgb[2];
	  }
	  out[3] = alpha;
	  return out;
	}
	function premultiplyTintToRgba(tint, alpha, out, premultiply) {
	  out = out || new Float32Array(4);
	  out[0] = (tint >> 16 & 0xFF) / 255.0;
	  out[1] = (tint >> 8 & 0xFF) / 255.0;
	  out[2] = (tint & 0xFF) / 255.0;
	  if (premultiply || premultiply === undefined) {
	    out[0] *= alpha;
	    out[1] *= alpha;
	    out[2] *= alpha;
	  }
	  out[3] = alpha;
	  return out;
	}
	exports.FrameCount = 0;
	function __frameDot() {
	  exports.FrameCount++;
	}
	function equalsFramCount(fps) {
	  switch (fps) {
	    case 10:
	      return !(exports.FrameCount % 6);
	    case 20:
	      return !(exports.FrameCount % 3);
	    case 30:
	      return !(exports.FrameCount % 2);
	    case 40:
	      return exports.FrameCount % 3;
	    case 50:
	      return exports.FrameCount % 6;
	    default:
	      return true;
	  }
	}

	function maxRecommendedTextures(max) {
	  if (isMobile.tablet || isMobile.phone) {
	    return 4;
	  }
	  return max;
	}

	function canUploadSameBuffer() {
	  var ios = !!navigator.platform && /ipad|iphone|ipod/.test(navigator.platform.toLowerCase());
	  return !ios;
	}

	var settings = {
	  TARGET_FPMS: 0.06,
	  MIPMAP_TEXTURES: true,
	  RESOLUTION: 1,
	  FILTER_RESOLUTION: 1,
	  SPRITE_MAX_TEXTURES: maxRecommendedTextures(32),
	  SPRITE_BATCH_SIZE: 4096,
	  RENDER_OPTIONS: {
	    view: null,
	    antialias: false,
	    autoResize: false,
	    transparent: false,
	    backgroundColor: 0x000000,
	    clearBeforeRender: true,
	    preserveDrawingBuffer: false,
	    roundPixels: false,
	    legacy: false
	  },
	  TRANSFORM_MODE: 0,
	  GC_MODE: 0,
	  GC_MAX_IDLE: 60 * 60,
	  GC_MAX_CHECK_COUNT: 60 * 10,
	  WRAP_MODE: 0,
	  SCALE_MODE: 0,
	  PRECISION_VERTEX: 'highp',
	  PRECISION_FRAGMENT: 'mediump',
	  CAN_UPLOAD_SAME_BUFFER: canUploadSameBuffer()
	};
	var config = {
	  width: null,
	  height: null,
	  referWidth: 320,
	  fixSize: false,
	  canvasId: 'TinyCanvas',
	  orientation: 0,
	  dpi: 1,
	  fps: 60,
	  showFPS: false,
	  debug: false,
	  viewTouched: false,
	  renderType: 0,
	  renderOptions: {},
	  extraContextAttributes: {},
	  autoRender: 1 };
	var defaultConfig = Object.freeze(Object.assign({}, config));

	var TickerListener = function () {
	  function TickerListener(fn) {
	    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	    classCallCheck(this, TickerListener);
	    this.fn = fn;
	    this.context = context;
	    this.priority = priority;
	    this.once = once;
	    this.next = null;
	    this.previous = null;
	    this._destroyed = false;
	  }
	  createClass(TickerListener, [{
	    key: "match",
	    value: function match(fn, context) {
	      context = context || null;
	      return this.fn === fn && this.context === context;
	    }
	  }, {
	    key: "emit",
	    value: function emit(deltaTime) {
	      if (this.fn) {
	        if (this.context) {
	          this.fn.call(this.context, deltaTime);
	        } else {
	          this.fn(deltaTime);
	        }
	      }
	      var redirect = this.next;
	      if (this.once) {
	        this.destroy(true);
	      }
	      if (this._destroyed) {
	        this.next = null;
	      }
	      return redirect;
	    }
	  }, {
	    key: "connect",
	    value: function connect(previous) {
	      this.previous = previous;
	      if (previous.next) {
	        previous.next.previous = this;
	      }
	      this.next = previous.next;
	      previous.next = this;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      var hard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	      this._destroyed = true;
	      this.fn = null;
	      this.context = null;
	      if (this.previous) {
	        this.previous.next = this.next;
	      }
	      if (this.next) {
	        this.next.previous = this.previous;
	      }
	      var redirect = this.next;
	      this.next = hard ? null : redirect;
	      this.previous = null;
	      return redirect;
	    }
	  }]);
	  return TickerListener;
	}();

	var Ticker = function () {
	  function Ticker() {
	    var _this = this;
	    classCallCheck(this, Ticker);
	    this._head = new TickerListener(null, null, Infinity);
	    this._requestId = null;
	    this._maxElapsedMS = 100;
	    this.autoStart = false;
	    this.deltaTime = 1;
	    this.elapsedMS = 1 / settings.TARGET_FPMS;
	    this.lastTime = -1;
	    this.speed = 1;
	    this.started = false;
	    this._tick = function (time) {
	      _this._requestId = null;
	      if (_this.started) {
	        _this.update(time);
	        if (_this.started && _this._requestId === null && _this._head.next) {
	          _this._requestId = window.requestAnimationFrame(_this._tick);
	        }
	      }
	    };
	  }
	  createClass(Ticker, [{
	    key: '_requestIfNeeded',
	    value: function _requestIfNeeded() {
	      if (this._requestId === null && this._head.next) {
	        this.lastTime = window.performance.now();
	        this._requestId = window.requestAnimationFrame(this._tick);
	      }
	    }
	  }, {
	    key: '_cancelIfNeeded',
	    value: function _cancelIfNeeded() {
	      if (this._requestId !== null) {
	        window.cancelAnimationFrame(this._requestId);
	        this._requestId = null;
	      }
	    }
	  }, {
	    key: '_startIfPossible',
	    value: function _startIfPossible() {
	      if (this.started) {
	        this._requestIfNeeded();
	      } else if (this.autoStart) {
	        this.start();
	      }
	    }
	  }, {
	    key: 'add',
	    value: function add(fn, context) {
	      var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : UPDATE_PRIORITY.NORMAL;
	      return this._addListener(new TickerListener(fn, context, priority));
	    }
	  }, {
	    key: 'addOnce',
	    value: function addOnce(fn, context) {
	      var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : UPDATE_PRIORITY.NORMAL;
	      return this._addListener(new TickerListener(fn, context, priority, true));
	    }
	  }, {
	    key: '_addListener',
	    value: function _addListener(listener) {
	      if (listener.fn !== __frameDot) {
	        var func = listener.fn;
	        listener.preFn = func;
	        listener.fn = function (t) {
	          if (equalsFramCount(config.fps)) {
	            func.call(this, t);
	          }
	        };
	      }
	      var current = this._head.next;
	      var previous = this._head;
	      if (!current) {
	        listener.connect(previous);
	      } else {
	        while (current) {
	          if (listener.priority > current.priority) {
	            listener.connect(previous);
	            break;
	          }
	          previous = current;
	          current = current.next;
	        }
	        if (!listener.previous) {
	          listener.connect(previous);
	        }
	      }
	      this._startIfPossible();
	      return this;
	    }
	  }, {
	    key: 'remove',
	    value: function remove(fn, context) {
	      if (!isFunction(fn)) {
	        return;
	      }
	      var listener = this._head.next;
	      while (listener) {
	        if (fn === listener.preFn) {
	          listener.fn = listener.preFn;
	        }
	        if (listener.match(fn, context)) {
	          listener = listener.destroy();
	        } else {
	          listener = listener.next;
	        }
	      }
	      if (!this._head.next) {
	        this._cancelIfNeeded();
	      }
	      return this;
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      if (!this.started) {
	        this.started = true;
	        this._requestIfNeeded();
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this.started) {
	        this.started = false;
	        this._cancelIfNeeded();
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.stop();
	      if (this._head) {
	        var listener = this._head.next;
	        while (listener) {
	          listener = listener.destroy(true);
	        }
	        this._head.destroy();
	        this._head = null;
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var currentTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.performance.now();
	      var elapsedMS = void 0;
	      if (currentTime > this.lastTime) {
	        elapsedMS = this.elapsedMS = currentTime - this.lastTime;
	        if (elapsedMS > this._maxElapsedMS) {
	          elapsedMS = this._maxElapsedMS;
	        }
	        this.deltaTime = elapsedMS * settings.TARGET_FPMS * this.speed;
	        var head = this._head;
	        var listener = head.next;
	        while (listener) {
	          listener = listener.emit(this.deltaTime);
	        }
	        if (!head.next) {
	          this._cancelIfNeeded();
	        }
	      } else {
	        this.deltaTime = this.elapsedMS = 0;
	      }
	      this.lastTime = currentTime;
	    }
	  }, {
	    key: 'FPS',
	    get: function get$$1() {
	      return 1000 / this.elapsedMS;
	    }
	  }, {
	    key: 'minFPS',
	    get: function get$$1() {
	      return 1000 / this._maxElapsedMS;
	    },
	    set: function set$$1(fps) {
	      var minFPMS = Math.min(Math.max(0, fps) / 1000, settings.TARGET_FPMS);
	      this._maxElapsedMS = 1 / minFPMS;
	    }
	  }]);
	  return Ticker;
	}();

	var MANUAL_STOP = 'manual stop';
	var MANUAL_PAUSE = 'manual pause';
	var CountDown = function (_EventEmitter) {
	  inherits(CountDown, _EventEmitter);
	  function CountDown(opts) {
	    classCallCheck(this, CountDown);
	    var _this = possibleConstructorReturn(this, (CountDown.__proto__ || Object.getPrototypeOf(CountDown)).call(this));
	    _this.duration = opts.duration || 1e3;
	    _this.times = opts.times || Infinity;
	    _this.count = 0;
	    CountDownCache.push(_this);
	    return _this;
	  }
	  createClass(CountDown, [{
	    key: 'start',
	    value: function start() {
	      var _this2 = this;
	      this._indicate = null;
	      if (this.count >= this.times) {
	        return;
	      }
	      this.ticker = new Ticker();
	      this.startTime = getTime();
	      var tickerHandler = function tickerHandler(time) {
	        var current = getTime();
	        if (_this2.count >= _this2.times) {
	          _this2.ticker.destroy();
	          _this2.emit('complete', time);
	          return;
	        }
	        if (current - _this2.startTime >= _this2.duration) {
	          _this2.startTime = current;
	          _this2.count++;
	          _this2.emit('update', time);
	        }
	      };
	      this.ticker.add(tickerHandler);
	      this.ticker.start();
	    }
	  }, {
	    key: 'pause',
	    value: function pause(auto) {
	      this.ticker.destroy();
	      if (!auto) {
	        this._indicate = MANUAL_PAUSE;
	      }
	      this.emit('pause');
	    }
	  }, {
	    key: 'stop',
	    value: function stop(auto) {
	      this.ticker.destroy();
	      this.count = 0;
	      if (!auto) {
	        this._indicate = MANUAL_STOP;
	      }
	      this.emit('stop');
	    }
	  }, {
	    key: 'isManualPause',
	    value: function isManualPause() {
	      return this._indicate === MANUAL_PAUSE;
	    }
	  }, {
	    key: 'ifManualStop',
	    value: function ifManualStop() {
	      return this._indicate === MANUAL_STOP;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.stop();
	      arrayRemoveObject(CountDownCache, this);
	    }
	  }, {
	    key: 'running',
	    get: function get$$1() {
	      return this.ticker.started;
	    }
	  }]);
	  return CountDown;
	}(_eventemitter3_3_1_2_eventemitter3);

	var shared = new Ticker();
	shared.autoStart = true;
	shared.add(__frameDot);
	shared.destroy = function () {};

	var index = /*#__PURE__*/Object.freeze({
		shared: shared,
		Ticker: Ticker,
		CountDown: CountDown
	});

	var TransformBase = function () {
	  function TransformBase() {
	    classCallCheck(this, TransformBase);
	    this.worldTransform = new Matrix();
	    this.localTransform = new Matrix();
	    this._worldID = 0;
	    this._parentID = 0;
	  }
	  createClass(TransformBase, [{
	    key: 'updateLocalTransform',
	    value: function updateLocalTransform() {}
	  }, {
	    key: 'updateTransform',
	    value: function updateTransform(parentTransform) {
	      var pt = parentTransform.worldTransform;
	      var wt = this.worldTransform;
	      var lt = this.localTransform;
	      wt.a = lt.a * pt.a + lt.b * pt.c;
	      wt.b = lt.a * pt.b + lt.b * pt.d;
	      wt.c = lt.c * pt.a + lt.d * pt.c;
	      wt.d = lt.c * pt.b + lt.d * pt.d;
	      wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
	      wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;
	      this._worldID++;
	    }
	  }]);
	  return TransformBase;
	}();
	TransformBase.prototype.updateWorldTransform = TransformBase.prototype.updateTransform;
	TransformBase.IDENTITY = new TransformBase();

	var TransformStatic = function (_TransformBase) {
	  inherits(TransformStatic, _TransformBase);
	  function TransformStatic() {
	    classCallCheck(this, TransformStatic);
	    var _this = possibleConstructorReturn(this, (TransformStatic.__proto__ || Object.getPrototypeOf(TransformStatic)).call(this));
	    _this.position = new ObservablePoint(_this.onChange, _this, 0, 0);
	    _this.scale = new ObservablePoint(_this.onChange, _this, 1, 1);
	    _this.pivot = new ObservablePoint(_this.onChange, _this, 0, 0);
	    _this.skew = new ObservablePoint(_this.updateSkew, _this, 0, 0);
	    _this._rotation = 0;
	    _this._cx = 1;
	    _this._sx = 0;
	    _this._cy = 0;
	    _this._sy = 1;
	    _this._localID = 0;
	    _this._currentLocalID = 0;
	    return _this;
	  }
	  createClass(TransformStatic, [{
	    key: 'onChange',
	    value: function onChange() {
	      this._localID++;
	    }
	  }, {
	    key: 'updateSkew',
	    value: function updateSkew() {
	      this._cx = Math.cos(this._rotation + this.skew._y);
	      this._sx = Math.sin(this._rotation + this.skew._y);
	      this._cy = -Math.sin(this._rotation - this.skew._x);
	      this._sy = Math.cos(this._rotation - this.skew._x);
	      this._localID++;
	    }
	  }, {
	    key: 'updateLocalTransform',
	    value: function updateLocalTransform() {
	      var lt = this.localTransform;
	      if (this._localID !== this._currentLocalID) {
	        lt.a = this._cx * this.scale._x;
	        lt.b = this._sx * this.scale._x;
	        lt.c = this._cy * this.scale._y;
	        lt.d = this._sy * this.scale._y;
	        lt.tx = this.position._x - (this.pivot._x * lt.a + this.pivot._y * lt.c);
	        lt.ty = this.position._y - (this.pivot._x * lt.b + this.pivot._y * lt.d);
	        this._currentLocalID = this._localID;
	        this._parentID = -1;
	      }
	    }
	  }, {
	    key: 'updateTransform',
	    value: function updateTransform(parentTransform) {
	      var lt = this.localTransform;
	      if (this._localID !== this._currentLocalID) {
	        lt.a = this._cx * this.scale._x;
	        lt.b = this._sx * this.scale._x;
	        lt.c = this._cy * this.scale._y;
	        lt.d = this._sy * this.scale._y;
	        lt.tx = this.position._x - (this.pivot._x * lt.a + this.pivot._y * lt.c);
	        lt.ty = this.position._y - (this.pivot._x * lt.b + this.pivot._y * lt.d);
	        this._currentLocalID = this._localID;
	        this._parentID = -1;
	      }
	      if (this._parentID !== parentTransform._worldID) {
	        var pt = parentTransform.worldTransform;
	        var wt = this.worldTransform;
	        wt.a = lt.a * pt.a + lt.b * pt.c;
	        wt.b = lt.a * pt.b + lt.b * pt.d;
	        wt.c = lt.c * pt.a + lt.d * pt.c;
	        wt.d = lt.c * pt.b + lt.d * pt.d;
	        wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
	        wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;
	        this._parentID = parentTransform._worldID;
	        this._worldID++;
	      }
	    }
	  }, {
	    key: 'setFromMatrix',
	    value: function setFromMatrix(matrix) {
	      matrix.decompose(this);
	      this._localID++;
	    }
	  }, {
	    key: 'rotation',
	    get: function get$$1() {
	      return this._rotation;
	    },
	    set: function set$$1(value) {
	      this._rotation = value;
	      this.updateSkew();
	    }
	  }]);
	  return TransformStatic;
	}(TransformBase);

	var Transform = function (_TransformBase) {
	  inherits(Transform, _TransformBase);
	  function Transform() {
	    classCallCheck(this, Transform);
	    var _this = possibleConstructorReturn(this, (Transform.__proto__ || Object.getPrototypeOf(Transform)).call(this));
	    _this.position = new Point(0, 0);
	    _this.scale = new Point(1, 1);
	    _this.skew = new ObservablePoint(_this.updateSkew, _this, 0, 0);
	    _this.pivot = new Point(0, 0);
	    _this._rotation = 0;
	    _this._cx = 1;
	    _this._sx = 0;
	    _this._cy = 0;
	    _this._sy = 1;return _this;
	  }
	  createClass(Transform, [{
	    key: 'updateSkew',
	    value: function updateSkew() {
	      this._cx = Math.cos(this._rotation + this.skew._y);
	      this._sx = Math.sin(this._rotation + this.skew._y);
	      this._cy = -Math.sin(this._rotation - this.skew._x);
	      this._sy = Math.cos(this._rotation - this.skew._x);
	    }
	  }, {
	    key: 'updateLocalTransform',
	    value: function updateLocalTransform() {
	      var lt = this.localTransform;
	      lt.a = this._cx * this.scale.x;
	      lt.b = this._sx * this.scale.x;
	      lt.c = this._cy * this.scale.y;
	      lt.d = this._sy * this.scale.y;
	      lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c);
	      lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d);
	    }
	  }, {
	    key: 'updateTransform',
	    value: function updateTransform(parentTransform) {
	      var lt = this.localTransform;
	      lt.a = this._cx * this.scale.x;
	      lt.b = this._sx * this.scale.x;
	      lt.c = this._cy * this.scale.y;
	      lt.d = this._sy * this.scale.y;
	      lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c);
	      lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d);
	      var pt = parentTransform.worldTransform;
	      var wt = this.worldTransform;
	      wt.a = lt.a * pt.a + lt.b * pt.c;
	      wt.b = lt.a * pt.b + lt.b * pt.d;
	      wt.c = lt.c * pt.a + lt.d * pt.c;
	      wt.d = lt.c * pt.b + lt.d * pt.d;
	      wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
	      wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;
	      this._worldID++;
	    }
	  }, {
	    key: 'setFromMatrix',
	    value: function setFromMatrix(matrix) {
	      matrix.decompose(this);
	    }
	  }, {
	    key: 'rotation',
	    get: function get$$1() {
	      return this._rotation;
	    },
	    set: function set$$1(value) {
	      this._rotation = value;
	      this.updateSkew();
	    }
	  }]);
	  return Transform;
	}(TransformBase);

	var Bounds = function () {
	  function Bounds() {
	    classCallCheck(this, Bounds);
	    this.minX = Infinity;
	    this.minY = Infinity;
	    this.maxX = -Infinity;
	    this.maxY = -Infinity;
	    this.rect = null;
	  }
	  createClass(Bounds, [{
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return this.minX > this.maxX || this.minY > this.maxY;
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.updateID++;
	      this.minX = Infinity;
	      this.minY = Infinity;
	      this.maxX = -Infinity;
	      this.maxY = -Infinity;
	    }
	  }, {
	    key: 'getRectangle',
	    value: function getRectangle(rect) {
	      if (this.minX > this.maxX || this.minY > this.maxY) {
	        return Rectangle.EMPTY;
	      }
	      rect = rect || new Rectangle(0, 0, 1, 1);
	      rect.x = this.minX;
	      rect.y = this.minY;
	      rect.width = this.maxX - this.minX;
	      rect.height = this.maxY - this.minY;
	      return rect;
	    }
	  }, {
	    key: 'addPoint',
	    value: function addPoint(point) {
	      this.minX = Math.min(this.minX, point.x);
	      this.maxX = Math.max(this.maxX, point.x);
	      this.minY = Math.min(this.minY, point.y);
	      this.maxY = Math.max(this.maxY, point.y);
	    }
	  }, {
	    key: 'addQuad',
	    value: function addQuad(vertices) {
	      var minX = this.minX;
	      var minY = this.minY;
	      var maxX = this.maxX;
	      var maxY = this.maxY;
	      var x = vertices[0];
	      var y = vertices[1];
	      minX = x < minX ? x : minX;
	      minY = y < minY ? y : minY;
	      maxX = x > maxX ? x : maxX;
	      maxY = y > maxY ? y : maxY;
	      x = vertices[2];
	      y = vertices[3];
	      minX = x < minX ? x : minX;
	      minY = y < minY ? y : minY;
	      maxX = x > maxX ? x : maxX;
	      maxY = y > maxY ? y : maxY;
	      x = vertices[4];
	      y = vertices[5];
	      minX = x < minX ? x : minX;
	      minY = y < minY ? y : minY;
	      maxX = x > maxX ? x : maxX;
	      maxY = y > maxY ? y : maxY;
	      x = vertices[6];
	      y = vertices[7];
	      minX = x < minX ? x : minX;
	      minY = y < minY ? y : minY;
	      maxX = x > maxX ? x : maxX;
	      maxY = y > maxY ? y : maxY;
	      this.minX = minX;
	      this.minY = minY;
	      this.maxX = maxX;
	      this.maxY = maxY;
	    }
	  }, {
	    key: 'addFrame',
	    value: function addFrame(transform, x0, y0, x1, y1) {
	      var matrix = transform.worldTransform;
	      var a = matrix.a;
	      var b = matrix.b;
	      var c = matrix.c;
	      var d = matrix.d;
	      var tx = matrix.tx;
	      var ty = matrix.ty;
	      var minX = this.minX;
	      var minY = this.minY;
	      var maxX = this.maxX;
	      var maxY = this.maxY;
	      var x = a * x0 + c * y0 + tx;
	      var y = b * x0 + d * y0 + ty;
	      minX = x < minX ? x : minX;
	      minY = y < minY ? y : minY;
	      maxX = x > maxX ? x : maxX;
	      maxY = y > maxY ? y : maxY;
	      x = a * x1 + c * y0 + tx;
	      y = b * x1 + d * y0 + ty;
	      minX = x < minX ? x : minX;
	      minY = y < minY ? y : minY;
	      maxX = x > maxX ? x : maxX;
	      maxY = y > maxY ? y : maxY;
	      x = a * x0 + c * y1 + tx;
	      y = b * x0 + d * y1 + ty;
	      minX = x < minX ? x : minX;
	      minY = y < minY ? y : minY;
	      maxX = x > maxX ? x : maxX;
	      maxY = y > maxY ? y : maxY;
	      x = a * x1 + c * y1 + tx;
	      y = b * x1 + d * y1 + ty;
	      minX = x < minX ? x : minX;
	      minY = y < minY ? y : minY;
	      maxX = x > maxX ? x : maxX;
	      maxY = y > maxY ? y : maxY;
	      this.minX = minX;
	      this.minY = minY;
	      this.maxX = maxX;
	      this.maxY = maxY;
	    }
	  }, {
	    key: 'addVertices',
	    value: function addVertices(transform, vertices, beginOffset, endOffset) {
	      var matrix = transform.worldTransform;
	      var a = matrix.a;
	      var b = matrix.b;
	      var c = matrix.c;
	      var d = matrix.d;
	      var tx = matrix.tx;
	      var ty = matrix.ty;
	      var minX = this.minX;
	      var minY = this.minY;
	      var maxX = this.maxX;
	      var maxY = this.maxY;
	      for (var i = beginOffset; i < endOffset; i += 2) {
	        var rawX = vertices[i];
	        var rawY = vertices[i + 1];
	        var x = a * rawX + c * rawY + tx;
	        var y = d * rawY + b * rawX + ty;
	        minX = x < minX ? x : minX;
	        minY = y < minY ? y : minY;
	        maxX = x > maxX ? x : maxX;
	        maxY = y > maxY ? y : maxY;
	      }
	      this.minX = minX;
	      this.minY = minY;
	      this.maxX = maxX;
	      this.maxY = maxY;
	    }
	  }, {
	    key: 'addBounds',
	    value: function addBounds(bounds) {
	      var minX = this.minX;
	      var minY = this.minY;
	      var maxX = this.maxX;
	      var maxY = this.maxY;
	      this.minX = bounds.minX < minX ? bounds.minX : minX;
	      this.minY = bounds.minY < minY ? bounds.minY : minY;
	      this.maxX = bounds.maxX > maxX ? bounds.maxX : maxX;
	      this.maxY = bounds.maxY > maxY ? bounds.maxY : maxY;
	    }
	  }, {
	    key: 'addBoundsMask',
	    value: function addBoundsMask(bounds, mask) {
	      var _minX = bounds.minX > mask.minX ? bounds.minX : mask.minX;
	      var _minY = bounds.minY > mask.minY ? bounds.minY : mask.minY;
	      var _maxX = bounds.maxX < mask.maxX ? bounds.maxX : mask.maxX;
	      var _maxY = bounds.maxY < mask.maxY ? bounds.maxY : mask.maxY;
	      if (_minX <= _maxX && _minY <= _maxY) {
	        var minX = this.minX;
	        var minY = this.minY;
	        var maxX = this.maxX;
	        var maxY = this.maxY;
	        this.minX = _minX < minX ? _minX : minX;
	        this.minY = _minY < minY ? _minY : minY;
	        this.maxX = _maxX > maxX ? _maxX : maxX;
	        this.maxY = _maxY > maxY ? _maxY : maxY;
	      }
	    }
	  }, {
	    key: 'addBoundsArea',
	    value: function addBoundsArea(bounds, area) {
	      var _minX = bounds.minX > area.x ? bounds.minX : area.x;
	      var _minY = bounds.minY > area.y ? bounds.minY : area.y;
	      var _maxX = bounds.maxX < area.x + area.width ? bounds.maxX : area.x + area.width;
	      var _maxY = bounds.maxY < area.y + area.height ? bounds.maxY : area.y + area.height;
	      if (_minX <= _maxX && _minY <= _maxY) {
	        var minX = this.minX;
	        var minY = this.minY;
	        var maxX = this.maxX;
	        var maxY = this.maxY;
	        this.minX = _minX < minX ? _minX : minX;
	        this.minY = _minY < minY ? _minY : minY;
	        this.maxX = _maxX > maxX ? _maxX : maxX;
	        this.maxY = _maxY > maxY ? _maxY : maxY;
	      }
	    }
	  }]);
	  return Bounds;
	}();

	var DisplayObject = function (_EventEmitter) {
	  inherits(DisplayObject, _EventEmitter);
	  function DisplayObject() {
	    classCallCheck(this, DisplayObject);
	    var _this = possibleConstructorReturn(this, (DisplayObject.__proto__ || Object.getPrototypeOf(DisplayObject)).call(this));
	    var TransformClass = settings.TRANSFORM_MODE === TRANSFORM_MODE.STATIC ? TransformStatic : Transform;
	    _this.tempDisplayObjectParent = null;
	    _this.transform = new TransformClass();
	    _this.alpha = 1;
	    _this.visible = true;
	    _this.renderable = true;
	    _this.parent = null;
	    _this.worldAlpha = 1;
	    _this.filterArea = null;
	    _this._filters = null;
	    _this._enabledFilters = null;
	    _this._bounds = new Bounds();
	    _this._boundsID = 0;
	    _this._lastBoundsID = -1;
	    _this._boundsRect = null;
	    _this._localBoundsRect = null;
	    _this._mask = null;
	    _this._destroyed = false;
	    _this.name = null;
	    return _this;
	  }
	  createClass(DisplayObject, [{
	    key: 'updateTransform',
	    value: function updateTransform() {
	      this.transform.updateTransform(this.parent.transform);
	      this.worldAlpha = this.alpha * this.parent.worldAlpha;
	      this._bounds.updateID++;
	    }
	  }, {
	    key: '_recursivePostUpdateTransform',
	    value: function _recursivePostUpdateTransform() {
	      if (this.parent) {
	        this.parent._recursivePostUpdateTransform();
	        this.transform.updateTransform(this.parent.transform);
	      } else {
	        this.transform.updateTransform(this._tempDisplayObjectParent.transform);
	      }
	    }
	  }, {
	    key: 'getBounds',
	    value: function getBounds(skipUpdate, rect) {
	      if (!skipUpdate) {
	        if (!this.parent) {
	          this.parent = this._tempDisplayObjectParent;
	          this.updateTransform();
	          this.parent = null;
	        } else {
	          this._recursivePostUpdateTransform();
	          this.updateTransform();
	        }
	      }
	      if (this._boundsID !== this._lastBoundsID) {
	        this.calculateBounds();
	      }
	      if (!rect) {
	        if (!this._boundsRect) {
	          this._boundsRect = new Rectangle();
	        }
	        rect = this._boundsRect;
	      }
	      return this._bounds.getRectangle(rect);
	    }
	  }, {
	    key: 'getLocalBounds',
	    value: function getLocalBounds(rect) {
	      var transformRef = this.transform;
	      var parentRef = this.parent;
	      this.parent = null;
	      this.transform = this._tempDisplayObjectParent.transform;
	      if (!rect) {
	        if (!this._localBoundsRect) {
	          this._localBoundsRect = new Rectangle();
	        }
	        rect = this._localBoundsRect;
	      }
	      var bounds = this.getBounds(false, rect);
	      this.parent = parentRef;
	      this.transform = transformRef;
	      return bounds;
	    }
	  }, {
	    key: 'toGlobal',
	    value: function toGlobal(position, point$$1) {
	      var skipUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      if (!skipUpdate) {
	        this._recursivePostUpdateTransform();
	        if (!this.parent) {
	          this.parent = this._tempDisplayObjectParent;
	          this.displayObjectUpdateTransform();
	          this.parent = null;
	        } else {
	          this.displayObjectUpdateTransform();
	        }
	      }
	      return this.worldTransform.apply(position, point$$1);
	    }
	  }, {
	    key: 'toLocal',
	    value: function toLocal(position, from, point$$1, skipUpdate) {
	      if (from) {
	        position = from.toGlobal(position, point$$1, skipUpdate);
	      }
	      if (!skipUpdate) {
	        this._recursivePostUpdateTransform();
	        if (!this.parent) {
	          this.parent = this._tempDisplayObjectParent;
	          this.displayObjectUpdateTransform();
	          this.parent = null;
	        } else {
	          this.displayObjectUpdateTransform();
	        }
	      }
	      return this.worldTransform.applyInverse(position, point$$1);
	    }
	  }, {
	    key: 'getGlobalPosition',
	    value: function getGlobalPosition() {
	      var point$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Point();
	      var skipUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      if (this.parent) {
	        this.parent.toGlobal(this.position, point$$1, skipUpdate);
	      } else {
	        point$$1.x = this.position.x;
	        point$$1.y = this.position.y;
	      }
	      return point$$1;
	    }
	  }, {
	    key: 'getChildByName',
	    value: function getChildByName(name) {
	      for (var i = 0; i < this.children.length; i++) {
	        if (this.children[i].name === name) {
	          return this.children[i];
	        }
	      }
	      return null;
	    }
	  }, {
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {}
	  }, {
	    key: 'renderCanvas',
	    value: function renderCanvas(renderer) {}
	  }, {
	    key: 'setParent',
	    value: function setParent(container) {
	      if (!container || !container.addChild) {
	        throw new Error('setParent: Argument must be a Container');
	      }
	      container.addChild(this);
	      return container;
	    }
	  }, {
	    key: 'setTransform',
	    value: function setTransform() {
	      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var scaleX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	      var scaleY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
	      var rotation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
	      var skewX = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
	      var skewY = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
	      var pivotX = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
	      var pivotY = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
	      this.position.x = x;
	      this.position.y = y;
	      this.scale.x = !scaleX ? 1 : scaleX;
	      this.scale.y = !scaleY ? 1 : scaleY;
	      this.rotation = rotation;
	      this.skew.x = skewX;
	      this.skew.y = skewY;
	      this.pivot.x = pivotX;
	      this.pivot.y = pivotY;
	      return this;
	    }
	  }, {
	    key: 'setEventEnabled',
	    value: function setEventEnabled(b) {
	      this.interactive = !!b;
	    }
	  }, {
	    key: 'setPosition',
	    value: function setPosition(x, y) {
	      this.position.set(x, y === void 0 ? x : y);
	    }
	  }, {
	    key: 'getPosition',
	    value: function getPosition() {
	      return this.position;
	    }
	  }, {
	    key: 'setPositionX',
	    value: function setPositionX(x) {
	      this.x = x;
	    }
	  }, {
	    key: 'getPositionX',
	    value: function getPositionX() {
	      return this.x;
	    }
	  }, {
	    key: 'setPositionY',
	    value: function setPositionY(y) {
	      this.y = y;
	    }
	  }, {
	    key: 'getPositionY',
	    value: function getPositionY() {
	      return this.y;
	    }
	  }, {
	    key: 'setPivot',
	    value: function setPivot(x, y) {
	      this.pivot.set(x, y === void 0 ? x : y);
	    }
	  }, {
	    key: 'getPivot',
	    value: function getPivot() {
	      return this.pivot;
	    }
	  }, {
	    key: 'setRotation',
	    value: function setRotation(rotation) {
	      this.rotation = rotation;
	    }
	  }, {
	    key: 'getRotation',
	    value: function getRotation() {
	      return this.rotation;
	    }
	  }, {
	    key: 'setOpacity',
	    value: function setOpacity(alpha) {
	      this.alpha = alpha;
	    }
	  }, {
	    key: 'getOpacity',
	    value: function getOpacity() {
	      return this.alpha;
	    }
	  }, {
	    key: 'setVisible',
	    value: function setVisible(visible) {
	      this.visible = visible;
	    }
	  }, {
	    key: 'getVisible',
	    value: function getVisible() {
	      return this.visible;
	    }
	  }, {
	    key: 'setScale',
	    value: function setScale(x, y) {
	      this.scale.set(x, y === void 0 ? x : y);
	    }
	  }, {
	    key: 'getScale',
	    value: function getScale() {
	      return this.scale;
	    }
	  }, {
	    key: 'setSkew',
	    value: function setSkew(x, y) {
	      this.skew.set(x, y === void 0 ? x : y);
	    }
	  }, {
	    key: 'getSkew',
	    value: function getSkew() {
	      return this.skew;
	    }
	  }, {
	    key: 'getNature',
	    value: function getNature() {
	      var tint = hex2rgb(this.tint);
	      return {
	        x: this.x,
	        y: this.y,
	        angle: this.angle || 0,
	        rotation: this.rotation,
	        visible: this.visible,
	        alpha: this.alpha,
	        scaleX: this.scale.x,
	        scaleY: this.scale.y,
	        skewX: this.skew.x,
	        skewY: this.skew.y,
	        colorR: tint[0] * 255,
	        colorG: tint[1] * 255,
	        colorB: tint[2] * 255
	      };
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      if (this.parent) {
	        this.parent.removeChild(this);
	      }
	      this.removeAllListeners();
	      this.transform = null;
	      this.parent = null;
	      this._bounds = null;
	      this._currentBounds = null;
	      this._mask = null;
	      this.filterArea = null;
	      this.interactive = false;
	      this.interactiveChildren = false;
	      this._destroyed = true;
	    }
	  }, {
	    key: '_tempDisplayObjectParent',
	    get: function get$$1() {
	      if (this.tempDisplayObjectParent === null) {
	        this.tempDisplayObjectParent = new DisplayObject();
	      }
	      return this.tempDisplayObjectParent;
	    }
	  }, {
	    key: 'x',
	    get: function get$$1() {
	      return this.position.x;
	    },
	    set: function set$$1(value) {
	      this.transform.position.x = value;
	    }
	  }, {
	    key: 'y',
	    get: function get$$1() {
	      return this.position.y;
	    },
	    set: function set$$1(value) {
	      this.transform.position.y = value;
	    }
	  }, {
	    key: 'worldTransform',
	    get: function get$$1() {
	      return this.transform.worldTransform;
	    }
	  }, {
	    key: 'localTransform',
	    get: function get$$1() {
	      return this.transform.localTransform;
	    }
	  }, {
	    key: 'position',
	    get: function get$$1() {
	      return this.transform.position;
	    },
	    set: function set$$1(value) {
	      this.transform.position.copy(value);
	    }
	  }, {
	    key: 'scale',
	    get: function get$$1() {
	      return this.transform.scale;
	    },
	    set: function set$$1(value) {
	      this.transform.scale.copy(value);
	    }
	  }, {
	    key: 'pivot',
	    get: function get$$1() {
	      return this.transform.pivot;
	    },
	    set: function set$$1(value) {
	      this.transform.pivot.copy(value);
	    }
	  }, {
	    key: 'skew',
	    get: function get$$1() {
	      return this.transform.skew;
	    },
	    set: function set$$1(value) {
	      this.transform.skew.copy(value);
	    }
	  }, {
	    key: 'rotation',
	    get: function get$$1() {
	      return this.transform.rotation;
	    },
	    set: function set$$1(value) {
	      this.transform.rotation = value;
	    }
	  }, {
	    key: 'worldVisible',
	    get: function get$$1() {
	      var item = this;
	      do {
	        if (!item.visible) {
	          return false;
	        }
	        item = item.parent;
	      } while (item);
	      return true;
	    }
	  }, {
	    key: 'mask',
	    get: function get$$1() {
	      return this._mask;
	    },
	    set: function set$$1(value) {
	      if (this._mask) {
	        this._mask.renderable = true;
	        this._mask.isMask = false;
	      }
	      this._mask = value;
	      if (this._mask) {
	        this._mask.renderable = false;
	        this._mask.isMask = true;
	      }
	    }
	  }, {
	    key: 'filters',
	    get: function get$$1() {
	      return this._filters && this._filters.slice();
	    },
	    set: function set$$1(value) {
	      this._filters = value && value.slice();
	    }
	  }]);
	  return DisplayObject;
	}(_eventemitter3_3_1_2_eventemitter3);
	DisplayObject.prototype.displayObjectUpdateTransform = DisplayObject.prototype.updateTransform;

	var Container = function (_DisplayObject) {
	  inherits(Container, _DisplayObject);
	  function Container() {
	    classCallCheck(this, Container);
	    var _this = possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this));
	    _this.children = [];
	    _this.actions = [];
	    _this.on('removed', function () {
	      _this.removeActionsTrace();
	    });
	    return _this;
	  }
	  createClass(Container, [{
	    key: 'removeActions',
	    value: function removeActions() {
	      if (this.actions.length !== 0) {
	        this.actions.forEach(function (action) {
	          TWEEN.remove(action);
	        });
	        this.actions = [];
	      }
	    }
	  }, {
	    key: 'removeActionsTrace',
	    value: function removeActionsTrace() {
	      if (this.children.length !== 0) {
	        this.children.forEach(function (item) {
	          item.removeActionsTrace();
	        });
	      }
	      this.removeActions();
	    }
	  }, {
	    key: 'onChildrenChange',
	    value: function onChildrenChange() {}
	  }, {
	    key: 'addChild',
	    value: function addChild(child) {
	      var argumentsLength = arguments.length;
	      if (argumentsLength > 1) {
	        for (var i = 0; i < argumentsLength; i++) {
	          this.addChild(arguments[i]);
	        }
	      } else {
	        if (child.parent) {
	          child.parent.removeChild(child);
	        }
	        child.parent = this;
	        child.transform._parentID = -1;
	        this.children.push(child);
	        this._boundsID++;
	        this.onChildrenChange(this.children.length - 1);
	        child.emit('added', this);
	      }
	      return child;
	    }
	  }, {
	    key: 'addChildAt',
	    value: function addChildAt(child, index) {
	      if (index < 0 || index > this.children.length) {
	        throw new Error(child + 'addChildAt: The index ' + index + ' supplied is out of bounds ' + this.children.length);
	      }
	      if (child.parent) {
	        child.parent.removeChild(child);
	      }
	      child.parent = this;
	      child.transform._parentID = -1;
	      this.children.splice(index, 0, child);
	      this._boundsID++;
	      this.onChildrenChange(index);
	      child.emit('added', this);
	      return child;
	    }
	  }, {
	    key: 'swapChildren',
	    value: function swapChildren(child, child2) {
	      if (child === child2) {
	        return;
	      }
	      var index1 = this.getChildIndex(child);
	      var index2 = this.getChildIndex(child2);
	      this.children[index1] = child2;
	      this.children[index2] = child;
	      this.onChildrenChange(index1 < index2 ? index1 : index2);
	    }
	  }, {
	    key: 'getChildIndex',
	    value: function getChildIndex(child) {
	      var index = this.children.indexOf(child);
	      if (index === -1) {
	        throw new Error('The supplied DisplayObject must be a child of the caller');
	      }
	      return index;
	    }
	  }, {
	    key: 'setChildIndex',
	    value: function setChildIndex(child, index) {
	      if (index < 0 || index >= this.children.length) {
	        throw new Error('The index ' + index + ' supplied is out of bounds ' + this.children.length);
	      }
	      var currentIndex = this.getChildIndex(child);
	      removeItems(this.children, currentIndex, 1);
	      this.children.splice(index, 0, child);
	      this.onChildrenChange(index);
	    }
	  }, {
	    key: 'getChildAt',
	    value: function getChildAt(index) {
	      if (index < 0 || index >= this.children.length) {
	        throw new Error('getChildAt: Index (' + index + ') does not exist.');
	      }
	      return this.children[index];
	    }
	  }, {
	    key: 'removeChild',
	    value: function removeChild(child) {
	      var argumentsLength = arguments.length;
	      if (argumentsLength > 1) {
	        for (var i = 0; i < argumentsLength; i++) {
	          this.removeChild(arguments[i]);
	        }
	      } else {
	        var index = this.children.indexOf(child);
	        if (index === -1) return null;
	        child.parent = null;
	        child.transform._parentID = -1;
	        removeItems(this.children, index, 1);
	        this._boundsID++;
	        this.onChildrenChange(index);
	        child.emit('removed', this);
	      }
	      return child;
	    }
	  }, {
	    key: 'removeChildAt',
	    value: function removeChildAt(index) {
	      var child = this.getChildAt(index);
	      child.parent = null;
	      child.transform._parentID = -1;
	      removeItems(this.children, index, 1);
	      this._boundsID++;
	      this.onChildrenChange(index);
	      child.emit('removed', this);
	      return child;
	    }
	  }, {
	    key: 'removeChildren',
	    value: function removeChildren() {
	      var beginIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var endIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	      var begin = beginIndex;
	      var end = typeof endIndex === 'number' ? endIndex : this.children.length;
	      var range = end - begin;
	      var removed = void 0;
	      if (range > 0 && range <= end) {
	        removed = this.children.splice(begin, range);
	        for (var i = 0; i < removed.length; ++i) {
	          removed[i].parent = null;
	          if (removed[i].transform) {
	            removed[i].transform._parentID = -1;
	          }
	        }
	        this._boundsID++;
	        this.onChildrenChange(beginIndex);
	        for (var _i = 0; _i < removed.length; ++_i) {
	          removed[_i].emit('removed', this);
	        }
	        return removed;
	      } else if (range === 0 && this.children.length === 0) {
	        return [];
	      }
	      throw new RangeError('removeChildren: numeric values are outside the acceptable range.');
	    }
	  }, {
	    key: 'updateTransform',
	    value: function updateTransform() {
	      this._boundsID++;
	      this.transform.updateTransform(this.parent.transform);
	      this.worldAlpha = this.alpha * this.parent.worldAlpha;
	      for (var i = 0, j = this.children.length; i < j; ++i) {
	        var child = this.children[i];
	        if (child.visible) {
	          child.updateTransform();
	        }
	      }
	    }
	  }, {
	    key: 'calculateBounds',
	    value: function calculateBounds() {
	      this._bounds.clear();
	      this._calculateBounds();
	      for (var i = 0; i < this.children.length; i++) {
	        var child = this.children[i];
	        if (!child.visible || !child.renderable) {
	          continue;
	        }
	        child.calculateBounds();
	        if (child._mask) {
	          child._mask.calculateBounds();
	          this._bounds.addBoundsMask(child._bounds, child._mask._bounds);
	        } else if (child.filterArea) {
	          this._bounds.addBoundsArea(child._bounds, child.filterArea);
	        } else {
	          this._bounds.addBounds(child._bounds);
	        }
	      }
	      this._lastBoundsID = this._boundsID;
	    }
	  }, {
	    key: '_calculateBounds',
	    value: function _calculateBounds() {}
	  }, {
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {
	      if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
	        return;
	      }
	      if (this._mask || this._filters) {
	        this.renderAdvancedWebGL(renderer);
	      } else {
	        this._renderWebGL(renderer);
	        for (var i = 0, j = this.children.length; i < j; ++i) {
	          this.children[i].renderWebGL(renderer);
	        }
	      }
	    }
	  }, {
	    key: 'renderAdvancedWebGL',
	    value: function renderAdvancedWebGL(renderer) {
	      renderer.flush();
	      var filters = this._filters;
	      var mask = this._mask;
	      if (filters) {
	        if (!this._enabledFilters) {
	          this._enabledFilters = [];
	        }
	        this._enabledFilters.length = 0;
	        for (var i = 0; i < filters.length; i++) {
	          if (filters[i].enabled) {
	            this._enabledFilters.push(filters[i]);
	          }
	        }
	        if (this._enabledFilters.length) {
	          renderer.filterManager.pushFilter(this, this._enabledFilters);
	        }
	      }
	      if (mask) {
	        renderer.maskManager.pushMask(this, this._mask);
	      }
	      this._renderWebGL(renderer);
	      for (var _i2 = 0, j = this.children.length; _i2 < j; _i2++) {
	        this.children[_i2].renderWebGL(renderer);
	      }
	      renderer.flush();
	      if (mask) {
	        renderer.maskManager.popMask(this, this._mask);
	      }
	      if (filters && this._enabledFilters && this._enabledFilters.length) {
	        renderer.filterManager.popFilter();
	      }
	    }
	  }, {
	    key: '_renderWebGL',
	    value: function _renderWebGL(renderer) {}
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {}
	  }, {
	    key: 'renderCanvas',
	    value: function renderCanvas(renderer) {
	      if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
	        return;
	      }
	      if (this._mask) {
	        renderer.maskManager.pushMask(this._mask);
	      }
	      this._renderCanvas(renderer);
	      for (var i = 0, j = this.children.length; i < j; ++i) {
	        this.children[i].renderCanvas(renderer);
	      }
	      if (this._mask) {
	        renderer.maskManager.popMask(renderer);
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(options) {
	      get(Container.prototype.__proto__ || Object.getPrototypeOf(Container.prototype), 'destroy', this).call(this);
	      var destroyChildren = typeof options === 'boolean' ? options : options && options.children;
	      var oldChildren = this.removeChildren(0, this.children.length);
	      if (destroyChildren) {
	        for (var i = 0; i < oldChildren.length; ++i) {
	          oldChildren[i].destroy(options);
	        }
	      }
	    }
	  }, {
	    key: 'width',
	    get: function get$$1() {
	      return this.scale.x * this.getLocalBounds().width;
	    },
	    set: function set$$1(value) {
	      var width = this.getLocalBounds().width;
	      if (width !== 0) {
	        this.scale.x = value / width;
	      } else {
	        this.scale.x = 1;
	      }
	      this._width = value;
	    }
	  }, {
	    key: 'height',
	    get: function get$$1() {
	      return this.scale.y * this.getLocalBounds().height;
	    },
	    set: function set$$1(value) {
	      var height = this.getLocalBounds().height;
	      if (height !== 0) {
	        this.scale.y = value / height;
	      } else {
	        this.scale.y = 1;
	      }
	      this._height = value;
	    }
	  }]);
	  return Container;
	}(DisplayObject);
	Container.prototype.containerUpdateTransform = Container.prototype.updateTransform;

	function isPow2(v) {
	  return !(v & v - 1) && !!v;
	}
	function nextPow2(v) {
	  v += v === 0;
	  --v;
	  v |= v >>> 1;
	  v |= v >>> 2;
	  v |= v >>> 4;
	  v |= v >>> 8;
	  v |= v >>> 16;
	  return v + 1;
	}
	function log2(v) {
	  var r = void 0,
	      shift = void 0;
	  r = (v > 0xFFFF) << 4;v >>>= r;
	  shift = (v > 0xFF) << 3;v >>>= shift;r |= shift;
	  shift = (v > 0xF) << 2;v >>>= shift;r |= shift;
	  shift = (v > 0x3) << 1;v >>>= shift;r |= shift;
	  return r | v >> 1;
	}

	var BaseTexture = function (_EventEmitter) {
	  inherits(BaseTexture, _EventEmitter);
	  function BaseTexture(source, scaleMode, resolution) {
	    classCallCheck(this, BaseTexture);
	    var _this = possibleConstructorReturn(this, (BaseTexture.__proto__ || Object.getPrototypeOf(BaseTexture)).call(this));
	    _this.uid = uid();
	    _this.touched = 0;
	    _this.resolution = resolution || settings.RESOLUTION;
	    _this.width = 100;
	    _this.height = 100;
	    _this.realWidth = 100;
	    _this.realHeight = 100;
	    _this.scaleMode = scaleMode !== undefined ? scaleMode : settings.SCALE_MODE;
	    _this.hasLoaded = false;
	    _this.isLoading = false;
	    _this.source = null;
	    _this.origSource = null;
	    _this.imageType = null;
	    _this.sourceScale = 1.0;
	    _this.premultipliedAlpha = true;
	    _this.imageUrl = null;
	    _this.isPowerOfTwo = false;
	    _this.mipmap = settings.MIPMAP_TEXTURES;
	    _this.wrapMode = settings.WRAP_MODE;
	    _this._glTextures = {};
	    _this._enabled = 0;
	    _this._virtalBoundId = -1;
	    _this._destroyed = false;
	    _this.textureCacheIds = [];
	    if (source) {
	      _this.loadSource(source);
	    }
	    return _this;
	  }
	  createClass(BaseTexture, [{
	    key: 'update',
	    value: function update() {
	      if (this.imageType !== 'svg') {
	        this.realWidth = this.source.naturalWidth || this.source.videoWidth || this.source.width;
	        this.realHeight = this.source.naturalHeight || this.source.videoHeight || this.source.height;
	        this._updateDimensions();
	      }
	      this.emit('update', this);
	    }
	  }, {
	    key: '_updateDimensions',
	    value: function _updateDimensions() {
	      this.width = this.realWidth / this.resolution;
	      this.height = this.realHeight / this.resolution;
	      this.isPowerOfTwo = isPow2(this.realWidth) && isPow2(this.realHeight);
	    }
	  }, {
	    key: 'loadSource',
	    value: function loadSource(source) {
	      var wasLoading = this.isLoading;
	      this.hasLoaded = false;
	      this.isLoading = false;
	      if (wasLoading && this.source) {
	        this.source.onload = null;
	        this.source.onerror = null;
	      }
	      var firstSourceLoaded = !this.source;
	      this.source = source;
	      if ((source.src && source.complete || source.getContext) && source.width && source.height) {
	        this._updateImageType();
	        if (this.imageType === 'svg') {
	          this._loadSvgSource();
	        } else {
	          this._sourceLoaded();
	        }
	        if (firstSourceLoaded) {
	          this.emit('loaded', this);
	        }
	      } else if (!source.getContext) {
	        this.isLoading = true;
	        var scope = this;
	        source.onload = function () {
	          scope._updateImageType();
	          source.onload = null;
	          source.onerror = null;
	          if (!scope.isLoading) {
	            return;
	          }
	          scope.isLoading = false;
	          scope._sourceLoaded();
	          if (scope.imageType === 'svg') {
	            scope._loadSvgSource();
	            return;
	          }
	          scope.emit('loaded', scope);
	        };
	        source.onerror = function () {
	          source.onload = null;
	          source.onerror = null;
	          if (!scope.isLoading) {
	            return;
	          }
	          scope.isLoading = false;
	          scope.emit('error', scope);
	        };
	        if (source.complete && source.src) {
	          source.onload = null;
	          source.onerror = null;
	          if (scope.imageType === 'svg') {
	            scope._loadSvgSource();
	            return;
	          }
	          this.isLoading = false;
	          if (source.width && source.height) {
	            this._sourceLoaded();
	            if (wasLoading) {
	              this.emit('loaded', this);
	            }
	          } else if (wasLoading) {
	            this.emit('error', this);
	          }
	        }
	      }
	    }
	  }, {
	    key: '_updateImageType',
	    value: function _updateImageType() {
	      if (!this.imageUrl) {
	        return;
	      }
	      var dataUri = decomposeDataUri(this.imageUrl);
	      var imageType = void 0;
	      if (dataUri && dataUri.mediaType === 'image') {
	        var firstSubType = dataUri.subType.split('+')[0];
	        imageType = getUrlFileExtension('.' + firstSubType);
	        if (!imageType) {
	          throw new Error('Invalid image type in data URI.');
	        }
	      } else {
	        imageType = getUrlFileExtension(this.imageUrl);
	        if (!imageType) {
	          imageType = 'png';
	        }
	      }
	      this.imageType = imageType;
	    }
	  }, {
	    key: '_loadSvgSource',
	    value: function _loadSvgSource() {
	      if (this.imageType !== 'svg') {
	        return;
	      }
	      var dataUri = decomposeDataUri(this.imageUrl);
	      if (dataUri) {
	        this._loadSvgSourceUsingDataUri(dataUri);
	      } else {
	        this._loadSvgSourceUsingXhr();
	      }
	    }
	  }, {
	    key: '_loadSvgSourceUsingDataUri',
	    value: function _loadSvgSourceUsingDataUri(dataUri) {
	      var svgString = void 0;
	      if (dataUri.encoding === 'base64') {
	        if (!atob) {
	          throw new Error('Your browser doesn\'t support base64 conversions.');
	        }
	        svgString = atob(dataUri.data);
	      } else {
	        svgString = dataUri.data;
	      }
	      this._loadSvgSourceUsingString(svgString);
	    }
	  }, {
	    key: '_loadSvgSourceUsingXhr',
	    value: function _loadSvgSourceUsingXhr() {
	      var _this2 = this;
	      var svgXhr = new XMLHttpRequest();
	      svgXhr.onload = function () {
	        if (svgXhr.readyState !== svgXhr.DONE || svgXhr.status !== 200) {
	          throw new Error('Failed to load SVG using XHR.');
	        }
	        _this2._loadSvgSourceUsingString(svgXhr.response);
	      };
	      svgXhr.onerror = function () {
	        return _this2.emit('error', _this2);
	      };
	      svgXhr.open('GET', this.imageUrl, true);
	      svgXhr.send();
	    }
	  }, {
	    key: '_loadSvgSourceUsingString',
	    value: function _loadSvgSourceUsingString(svgString) {
	      var svgSize = getSvgSize(svgString);
	      var svgWidth = svgSize.width;
	      var svgHeight = svgSize.height;
	      if (!svgWidth || !svgHeight) {
	        throw new Error('The SVG image must have width and height defined (in pixels), canvas API needs them.');
	      }
	      this.realWidth = Math.round(svgWidth * this.sourceScale);
	      this.realHeight = Math.round(svgHeight * this.sourceScale);
	      this._updateDimensions();
	      var canvas = document.createElement('canvas');
	      canvas.width = this.realWidth;
	      canvas.height = this.realHeight;
	      canvas._tinyId = 'canvas_' + uid();
	      canvas.getContext('2d').drawImage(this.source, 0, 0, svgWidth, svgHeight, 0, 0, this.realWidth, this.realHeight);
	      this.origSource = this.source;
	      this.source = canvas;
	      BaseTexture.addToCache(this, canvas._tinyId);
	      this.isLoading = false;
	      this._sourceLoaded();
	      this.emit('loaded', this);
	    }
	  }, {
	    key: '_sourceLoaded',
	    value: function _sourceLoaded() {
	      this.hasLoaded = true;
	      this.update();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      if (this.imageUrl) {
	        delete TextureCache[this.imageUrl];
	        this.imageUrl = null;
	        if (!navigator.isCanvasPlus) {
	          this.source.src = '';
	        }
	      }
	      this.source = null;
	      this.dispose();
	      BaseTexture.removeFromCache(this);
	      this.textureCacheIds = null;
	      this._destroyed = true;
	    }
	  }, {
	    key: 'dispose',
	    value: function dispose() {
	      this.emit('dispose', this);
	    }
	  }, {
	    key: 'updateSourceImage',
	    value: function updateSourceImage(newSrc) {
	      this.source.src = newSrc;
	      this.loadSource(this.source);
	    }
	  }], [{
	    key: 'fromImage',
	    value: function fromImage(imageUrl, crossorigin, scaleMode, sourceScale) {
	      var baseTexture = BaseTextureCache[imageUrl];
	      if (!baseTexture) {
	        var image = new Image();
	        if (crossorigin === undefined && imageUrl.indexOf('data:') !== 0) {
	          image.crossOrigin = determineCrossOrigin(imageUrl);
	        } else if (crossorigin) {
	          image.crossOrigin = typeof crossorigin === 'string' ? crossorigin : 'anonymous';
	        }
	        baseTexture = new BaseTexture(image, scaleMode);
	        baseTexture.imageUrl = imageUrl;
	        if (sourceScale) {
	          baseTexture.sourceScale = sourceScale;
	        }
	        baseTexture.resolution = getResolutionOfUrl(imageUrl);
	        image.src = imageUrl;
	        BaseTexture.addToCache(baseTexture, imageUrl);
	      }
	      return baseTexture;
	    }
	  }, {
	    key: 'fromCanvas',
	    value: function fromCanvas(canvas, scaleMode) {
	      var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'canvas';
	      if (!canvas._tinyId) {
	        canvas._tinyId = origin + '_' + uid();
	      }
	      var baseTexture = BaseTextureCache[canvas._tinyId];
	      if (!baseTexture) {
	        baseTexture = new BaseTexture(canvas, scaleMode);
	        BaseTexture.addToCache(baseTexture, canvas._tinyId);
	      }
	      return baseTexture;
	    }
	  }, {
	    key: 'from',
	    value: function from(source, scaleMode, sourceScale) {
	      if (typeof source === 'string') {
	        return BaseTexture.fromImage(source, undefined, scaleMode, sourceScale);
	      } else if (source instanceof HTMLImageElement) {
	        var imageUrl = source.src;
	        var baseTexture = BaseTextureCache[imageUrl];
	        if (!baseTexture) {
	          baseTexture = new BaseTexture(source, scaleMode);
	          baseTexture.imageUrl = imageUrl;
	          if (sourceScale) {
	            baseTexture.sourceScale = sourceScale;
	          }
	          baseTexture.resolution = getResolutionOfUrl(imageUrl);
	          BaseTexture.addToCache(baseTexture, imageUrl);
	        }
	        return baseTexture;
	      } else if (source instanceof HTMLCanvasElement) {
	        return BaseTexture.fromCanvas(source, scaleMode);
	      }
	      return source;
	    }
	  }, {
	    key: 'addToCache',
	    value: function addToCache(baseTexture, id) {
	      if (id) {
	        if (baseTexture.textureCacheIds.indexOf(id) === -1) {
	          baseTexture.textureCacheIds.push(id);
	        }
	        BaseTextureCache[id] = baseTexture;
	      }
	    }
	  }, {
	    key: 'removeFromCache',
	    value: function removeFromCache(baseTexture) {
	      if (typeof baseTexture === 'string') {
	        var baseTextureFromCache = BaseTextureCache[baseTexture];
	        if (baseTextureFromCache) {
	          var index = baseTextureFromCache.textureCacheIds.indexOf(baseTexture);
	          if (index > -1) {
	            baseTextureFromCache.textureCacheIds.splice(index, 1);
	          }
	          delete BaseTextureCache[baseTexture];
	          return baseTextureFromCache;
	        }
	      } else if (baseTexture && baseTexture.textureCacheIds) {
	        for (var i = 0; i < baseTexture.textureCacheIds.length; ++i) {
	          delete BaseTextureCache[baseTexture.textureCacheIds[i]];
	        }
	        baseTexture.textureCacheIds.length = 0;
	        return baseTexture;
	      }
	      return null;
	    }
	  }]);
	  return BaseTexture;
	}(_eventemitter3_3_1_2_eventemitter3);

	var BaseRenderTexture = function (_BaseTexture) {
	  inherits(BaseRenderTexture, _BaseTexture);
	  function BaseRenderTexture() {
	    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
	    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
	    var scaleMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var resolution = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
	    classCallCheck(this, BaseRenderTexture);
	    var _this = possibleConstructorReturn(this, (BaseRenderTexture.__proto__ || Object.getPrototypeOf(BaseRenderTexture)).call(this, null, scaleMode));
	    _this.resolution = resolution || settings.RESOLUTION;
	    _this.width = Math.ceil(width);
	    _this.height = Math.ceil(height);
	    _this.realWidth = _this.width * _this.resolution;
	    _this.realHeight = _this.height * _this.resolution;
	    _this.scaleMode = scaleMode !== undefined ? scaleMode : settings.SCALE_MODE;
	    _this.hasLoaded = true;
	    _this._glRenderTargets = {};
	    _this._canvasRenderTarget = null;
	    _this.valid = false;
	    return _this;
	  }
	  createClass(BaseRenderTexture, [{
	    key: 'resize',
	    value: function resize(width, height) {
	      width = Math.ceil(width);
	      height = Math.ceil(height);
	      if (width === this.width && height === this.height) {
	        return;
	      }
	      this.valid = width > 0 && height > 0;
	      this.width = width;
	      this.height = height;
	      this.realWidth = this.width * this.resolution;
	      this.realHeight = this.height * this.resolution;
	      if (!this.valid) {
	        return;
	      }
	      this.emit('update', this);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      get(BaseRenderTexture.prototype.__proto__ || Object.getPrototypeOf(BaseRenderTexture.prototype), 'destroy', this).call(this, true);
	      this.renderer = null;
	    }
	  }]);
	  return BaseRenderTexture;
	}(BaseTexture);

	var VideoBaseTexture = function (_BaseTexture) {
	  inherits(VideoBaseTexture, _BaseTexture);
	  function VideoBaseTexture(source, scaleMode) {
	    classCallCheck(this, VideoBaseTexture);
	    if (!source) {
	      throw new Error('No video source element specified.');
	    }
	    if ((source.readyState === source.HAVE_ENOUGH_DATA || source.readyState === source.HAVE_FUTURE_DATA) && source.width && source.height) {
	      source.complete = true;
	    }
	    var _this = possibleConstructorReturn(this, (VideoBaseTexture.__proto__ || Object.getPrototypeOf(VideoBaseTexture)).call(this, source, scaleMode));
	    _this.width = source.videoWidth;
	    _this.height = source.videoHeight;
	    _this._autoUpdate = true;
	    _this._isAutoUpdating = false;
	    _this.autoPlay = true;
	    _this.update = _this.update.bind(_this);
	    _this._onCanPlay = _this._onCanPlay.bind(_this);
	    source.addEventListener('play', _this._onPlayStart.bind(_this));
	    source.addEventListener('pause', _this._onPlayStop.bind(_this));
	    _this.hasLoaded = false;
	    _this.__loaded = false;
	    if (!_this._isSourceReady()) {
	      source.addEventListener('canplay', _this._onCanPlay);
	      source.addEventListener('canplaythrough', _this._onCanPlay);
	    } else {
	      _this._onCanPlay();
	    }
	    return _this;
	  }
	  createClass(VideoBaseTexture, [{
	    key: '_isSourcePlaying',
	    value: function _isSourcePlaying() {
	      var source = this.source;
	      return source.currentTime > 0 && source.paused === false && source.ended === false && source.readyState > 2;
	    }
	  }, {
	    key: '_isSourceReady',
	    value: function _isSourceReady() {
	      return this.source.readyState === 3 || this.source.readyState === 4;
	    }
	  }, {
	    key: '_onPlayStart',
	    value: function _onPlayStart() {
	      if (!this.hasLoaded) {
	        this._onCanPlay();
	      }
	      if (!this._isAutoUpdating && this.autoUpdate) {
	        shared.add(this.update, this, UPDATE_PRIORITY.HIGH);
	        this._isAutoUpdating = true;
	      }
	    }
	  }, {
	    key: '_onPlayStop',
	    value: function _onPlayStop() {
	      if (this._isAutoUpdating) {
	        shared.remove(this.update, this);
	        this._isAutoUpdating = false;
	      }
	    }
	  }, {
	    key: '_onCanPlay',
	    value: function _onCanPlay() {
	      this.hasLoaded = true;
	      if (this.source) {
	        this.source.removeEventListener('canplay', this._onCanPlay);
	        this.source.removeEventListener('canplaythrough', this._onCanPlay);
	        this.width = this.source.videoWidth;
	        this.height = this.source.videoHeight;
	        if (!this.__loaded) {
	          this.__loaded = true;
	          this.emit('loaded', this);
	        }
	        if (this._isSourcePlaying()) {
	          this._onPlayStart();
	        } else if (this.autoPlay) {
	          this.source.play();
	        }
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      if (this._isAutoUpdating) {
	        shared.remove(this.update, this);
	      }
	      if (this.source && this.source._tinyId) {
	        BaseTexture.removeFromCache(this.source._tinyId);
	        delete this.source._tinyId;
	        this.source.pause();
	        this.source.src = '';
	        this.source.load();
	      }
	      get(VideoBaseTexture.prototype.__proto__ || Object.getPrototypeOf(VideoBaseTexture.prototype), 'destroy', this).call(this);
	    }
	  }, {
	    key: 'autoUpdate',
	    get: function get$$1() {
	      return this._autoUpdate;
	    },
	    set: function set$$1(value) {
	      if (value !== this._autoUpdate) {
	        this._autoUpdate = value;
	        if (!this._autoUpdate && this._isAutoUpdating) {
	          shared.remove(this.update, this);
	          this._isAutoUpdating = false;
	        } else if (this._autoUpdate && !this._isAutoUpdating) {
	          shared.add(this.update, this, UPDATE_PRIORITY.HIGH);
	          this._isAutoUpdating = true;
	        }
	      }
	    }
	  }], [{
	    key: 'fromVideo',
	    value: function fromVideo(video, scaleMode) {
	      if (!video._tinyId) {
	        video._tinyId = 'video_' + uid();
	      }
	      var baseTexture = BaseTextureCache[video._tinyId];
	      if (!baseTexture) {
	        baseTexture = new VideoBaseTexture(video, scaleMode);
	        BaseTexture.addToCache(baseTexture, video._tinyId);
	      }
	      return baseTexture;
	    }
	  }, {
	    key: 'fromUrl',
	    value: function fromUrl(videoSrc, scaleMode, crossorigin) {
	      var video = document.createElement('video');
	      video.setAttribute('webkit-playsinline', '');
	      video.setAttribute('playsinline', '');
	      var url = Array.isArray(videoSrc) ? videoSrc[0].src || videoSrc[0] : videoSrc.src || videoSrc;
	      if (crossorigin === undefined && url.indexOf('data:') !== 0) {
	        video.crossOrigin = determineCrossOrigin(url);
	      } else if (crossorigin) {
	        video.crossOrigin = typeof crossorigin === 'string' ? crossorigin : 'anonymous';
	      }
	      if (Array.isArray(videoSrc)) {
	        for (var i = 0; i < videoSrc.length; ++i) {
	          video.appendChild(createSource(videoSrc[i].src || videoSrc[i], videoSrc[i].mime));
	        }
	      } else {
	        video.appendChild(createSource(url, videoSrc.mime));
	      }
	      video.load();
	      return VideoBaseTexture.fromVideo(video, scaleMode);
	    }
	  }]);
	  return VideoBaseTexture;
	}(BaseTexture);
	VideoBaseTexture.fromUrls = VideoBaseTexture.fromUrl;
	function createSource(path, type) {
	  if (!type) {
	    path = path.split('?').shift();
	    type = 'video/' + path.substr(path.lastIndexOf('.') + 1);
	  }
	  var source = document.createElement('source');
	  source.src = path;
	  source.type = type;
	  return source;
	}

	var TextureUvs = function () {
	  function TextureUvs() {
	    classCallCheck(this, TextureUvs);
	    this.x0 = 0;
	    this.y0 = 0;
	    this.x1 = 1;
	    this.y1 = 0;
	    this.x2 = 1;
	    this.y2 = 1;
	    this.x3 = 0;
	    this.y3 = 1;
	    this.uvsUint32 = new Uint32Array(4);
	  }
	  createClass(TextureUvs, [{
	    key: 'set',
	    value: function set$$1(frame, baseFrame, rotate) {
	      var tw = baseFrame.width;
	      var th = baseFrame.height;
	      if (rotate) {
	        var w2 = frame.width / 2 / tw;
	        var h2 = frame.height / 2 / th;
	        var cX = frame.x / tw + w2;
	        var cY = frame.y / th + h2;
	        rotate = GroupD8.add(rotate, GroupD8.NW);
	        this.x0 = cX + w2 * GroupD8.uX(rotate);
	        this.y0 = cY + h2 * GroupD8.uY(rotate);
	        rotate = GroupD8.add(rotate, 2);
	        this.x1 = cX + w2 * GroupD8.uX(rotate);
	        this.y1 = cY + h2 * GroupD8.uY(rotate);
	        rotate = GroupD8.add(rotate, 2);
	        this.x2 = cX + w2 * GroupD8.uX(rotate);
	        this.y2 = cY + h2 * GroupD8.uY(rotate);
	        rotate = GroupD8.add(rotate, 2);
	        this.x3 = cX + w2 * GroupD8.uX(rotate);
	        this.y3 = cY + h2 * GroupD8.uY(rotate);
	      } else {
	        this.x0 = frame.x / tw;
	        this.y0 = frame.y / th;
	        this.x1 = (frame.x + frame.width) / tw;
	        this.y1 = frame.y / th;
	        this.x2 = (frame.x + frame.width) / tw;
	        this.y2 = (frame.y + frame.height) / th;
	        this.x3 = frame.x / tw;
	        this.y3 = (frame.y + frame.height) / th;
	      }
	      this.uvsUint32[0] = (this.y0 * 65535 & 0xFFFF) << 16 | this.x0 * 65535 & 0xFFFF;
	      this.uvsUint32[1] = (this.y1 * 65535 & 0xFFFF) << 16 | this.x1 * 65535 & 0xFFFF;
	      this.uvsUint32[2] = (this.y2 * 65535 & 0xFFFF) << 16 | this.x2 * 65535 & 0xFFFF;
	      this.uvsUint32[3] = (this.y3 * 65535 & 0xFFFF) << 16 | this.x3 * 65535 & 0xFFFF;
	    }
	  }]);
	  return TextureUvs;
	}();

	var Texture = function (_EventEmitter) {
	  inherits(Texture, _EventEmitter);
	  function Texture(baseTexture, frame, orig, trim, rotate, anchor) {
	    classCallCheck(this, Texture);
	    var _this = possibleConstructorReturn(this, (Texture.__proto__ || Object.getPrototypeOf(Texture)).call(this));
	    _this.noFrame = false;
	    if (!frame) {
	      _this.noFrame = true;
	      frame = new Rectangle(0, 0, 1, 1);
	    }
	    if (baseTexture instanceof Texture) {
	      baseTexture = baseTexture.baseTexture;
	    }
	    _this.baseTexture = baseTexture;
	    _this._frame = frame;
	    _this.trim = trim;
	    _this.valid = false;
	    _this.requiresUpdate = false;
	    _this._uvs = null;
	    _this.orig = orig || frame;
	    _this._rotate = Number(rotate || 0);
	    if (rotate === true) {
	      _this._rotate = 2;
	    } else if (_this._rotate % 2 !== 0) {
	      throw new Error('attempt to use diamond-shaped UVs. If you are sure, set rotation manually');
	    }
	    if (baseTexture.hasLoaded) {
	      if (_this.noFrame) {
	        frame = new Rectangle(0, 0, baseTexture.width, baseTexture.height);
	        baseTexture.on('update', _this.onBaseTextureUpdated, _this);
	      }
	      _this.frame = frame;
	    } else {
	      baseTexture.once('loaded', _this.onBaseTextureLoaded, _this);
	    }
	    _this.defaultAnchor = anchor ? new Point(anchor.x, anchor.y) : new Point(0, 0);
	    _this._updateID = 0;
	    _this.transform = null;
	    _this.textureCacheIds = [];
	    return _this;
	  }
	  createClass(Texture, [{
	    key: 'update',
	    value: function update() {
	      this.baseTexture.update();
	    }
	  }, {
	    key: 'onBaseTextureLoaded',
	    value: function onBaseTextureLoaded(baseTexture) {
	      this._updateID++;
	      if (this.noFrame) {
	        this.frame = new Rectangle(0, 0, baseTexture.width, baseTexture.height);
	      } else {
	        this.frame = this._frame;
	      }
	      this.baseTexture.on('update', this.onBaseTextureUpdated, this);
	      this.emit('update', this);
	    }
	  }, {
	    key: 'onBaseTextureUpdated',
	    value: function onBaseTextureUpdated(baseTexture) {
	      this._updateID++;
	      this._frame.width = baseTexture.width;
	      this._frame.height = baseTexture.height;
	      this.emit('update', this);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(destroyBase) {
	      if (this.baseTexture) {
	        if (destroyBase) {
	          if (TextureCache[this.baseTexture.imageUrl]) {
	            Texture.removeFromCache(this.baseTexture.imageUrl);
	          }
	          this.baseTexture.destroy();
	        }
	        this.baseTexture.off('update', this.onBaseTextureUpdated, this);
	        this.baseTexture.off('loaded', this.onBaseTextureLoaded, this);
	        this.baseTexture = null;
	      }
	      this._frame = null;
	      this._uvs = null;
	      this.trim = null;
	      this.orig = null;
	      this.valid = false;
	      Texture.removeFromCache(this);
	      this.textureCacheIds = null;
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	      return new Texture(this.baseTexture, this.frame, this.orig, this.trim, this.rotate);
	    }
	  }, {
	    key: '_updateUvs',
	    value: function _updateUvs() {
	      if (!this._uvs) {
	        this._uvs = new TextureUvs();
	      }
	      this._uvs.set(this._frame, this.baseTexture, this.rotate);
	      this._updateID++;
	    }
	  }, {
	    key: 'frame',
	    get: function get$$1() {
	      return this._frame;
	    },
	    set: function set$$1(frame) {
	      this._frame = frame;
	      this.noFrame = false;
	      var x = frame.x,
	          y = frame.y,
	          width = frame.width,
	          height = frame.height;
	      var xNotFit = x + width > this.baseTexture.width;
	      var yNotFit = y + height > this.baseTexture.height;
	      if (xNotFit || yNotFit) {
	        var relationship = xNotFit && yNotFit ? 'and' : 'or';
	        var errorX = 'X: ' + x + ' + ' + width + ' = ' + (x + width) + ' > ' + this.baseTexture.width;
	        var errorY = 'Y: ' + y + ' + ' + height + ' = ' + (y + height) + ' > ' + this.baseTexture.height;
	        throw new Error('Texture Error: frame does not fit inside the base Texture dimensions: ' + (errorX + ' ' + relationship + ' ' + errorY));
	      }
	      this.valid = width && height && this.baseTexture.hasLoaded;
	      if (!this.trim && !this.rotate) {
	        this.orig = frame;
	      }
	      if (this.valid) {
	        this._updateUvs();
	      }
	    }
	  }, {
	    key: 'rotate',
	    get: function get$$1() {
	      return this._rotate;
	    },
	    set: function set$$1(rotate) {
	      this._rotate = rotate;
	      if (this.valid) {
	        this._updateUvs();
	      }
	    }
	  }, {
	    key: 'width',
	    get: function get$$1() {
	      return this.orig.width;
	    }
	  }, {
	    key: 'height',
	    get: function get$$1() {
	      return this.orig.height;
	    }
	  }], [{
	    key: 'fromImage',
	    value: function fromImage(imageUrl, crossorigin, scaleMode, sourceScale) {
	      var texture = TextureCache[imageUrl];
	      if (!texture) {
	        texture = new Texture(BaseTexture.fromImage(imageUrl, crossorigin, scaleMode, sourceScale));
	        Texture.addToCache(texture, imageUrl);
	      }
	      return texture;
	    }
	  }, {
	    key: 'fromFrame',
	    value: function fromFrame(frameId) {
	      var texture = TextureCache[frameId];
	      if (!texture) {
	        throw new Error('The frameId "' + frameId + '" does not exist in the texture cache');
	      }
	      return texture;
	    }
	  }, {
	    key: 'fromCanvas',
	    value: function fromCanvas(canvas, scaleMode) {
	      var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'canvas';
	      return new Texture(BaseTexture.fromCanvas(canvas, scaleMode, origin));
	    }
	  }, {
	    key: 'fromVideo',
	    value: function fromVideo(video, scaleMode) {
	      if (typeof video === 'string') {
	        return Texture.fromVideoUrl(video, scaleMode);
	      }
	      return new Texture(VideoBaseTexture.fromVideo(video, scaleMode));
	    }
	  }, {
	    key: 'fromVideoUrl',
	    value: function fromVideoUrl(videoUrl, scaleMode) {
	      return new Texture(VideoBaseTexture.fromUrl(videoUrl, scaleMode));
	    }
	  }, {
	    key: 'from',
	    value: function from(source) {
	      if (typeof source === 'string') {
	        var texture = TextureCache[source];
	        if (!texture) {
	          var isVideo = source.match(/\.(mp4|webm|ogg|h264|avi|mov)$/) !== null;
	          if (isVideo) {
	            return Texture.fromVideoUrl(source);
	          }
	          return Texture.fromImage(source);
	        }
	        return texture;
	      } else if (source instanceof HTMLImageElement) {
	        return new Texture(BaseTexture.from(source));
	      } else if (source instanceof HTMLCanvasElement) {
	        return Texture.fromCanvas(source, settings.SCALE_MODE, 'HTMLCanvasElement');
	      } else if (source instanceof HTMLVideoElement) {
	        return Texture.fromVideo(source);
	      } else if (source instanceof BaseTexture) {
	        return new Texture(source);
	      }
	      return source;
	    }
	  }, {
	    key: 'fromLoader',
	    value: function fromLoader(source, imageUrl, name) {
	      var baseTexture = new BaseTexture(source, undefined, getResolutionOfUrl(imageUrl));
	      var texture = new Texture(baseTexture);
	      baseTexture.imageUrl = imageUrl;
	      if (!name) {
	        name = imageUrl;
	      }
	      BaseTexture.addToCache(texture.baseTexture, name);
	      Texture.addToCache(texture, name);
	      if (name !== imageUrl) {
	        BaseTexture.addToCache(texture.baseTexture, imageUrl);
	        Texture.addToCache(texture, imageUrl);
	      }
	      return texture;
	    }
	  }, {
	    key: 'addToCache',
	    value: function addToCache(texture, id) {
	      if (id) {
	        if (texture.textureCacheIds.indexOf(id) === -1) {
	          texture.textureCacheIds.push(id);
	        }
	        TextureCache[id] = texture;
	      }
	    }
	  }, {
	    key: 'removeFromCache',
	    value: function removeFromCache(texture) {
	      if (typeof texture === 'string') {
	        var textureFromCache = TextureCache[texture];
	        if (textureFromCache) {
	          var index = textureFromCache.textureCacheIds.indexOf(texture);
	          if (index > -1) {
	            textureFromCache.textureCacheIds.splice(index, 1);
	          }
	          delete TextureCache[texture];
	          return textureFromCache;
	        }
	      } else if (texture && texture.textureCacheIds) {
	        for (var i = 0; i < texture.textureCacheIds.length; ++i) {
	          if (TextureCache[texture.textureCacheIds[i]] === texture) {
	            delete TextureCache[texture.textureCacheIds[i]];
	          }
	        }
	        texture.textureCacheIds.length = 0;
	        return texture;
	      }
	      return null;
	    }
	  }]);
	  return Texture;
	}(_eventemitter3_3_1_2_eventemitter3);
	function createWhiteTexture() {
	  var canvas = document.createElement('canvas');
	  canvas.width = 10;
	  canvas.height = 10;
	  var context = canvas.getContext('2d');
	  context.fillStyle = 'white';
	  context.fillRect(0, 0, 10, 10);
	  return new Texture(new BaseTexture(canvas));
	}
	function removeAllHandlers(tex) {
	  tex.destroy = function _emptyDestroy() {};
	  tex.on = function _emptyOn() {};
	  tex.once = function _emptyOnce() {};
	  tex.emit = function _emptyEmit() {};
	}
	Texture.EMPTY = new Texture(new BaseTexture());
	removeAllHandlers(Texture.EMPTY);
	removeAllHandlers(Texture.EMPTY.baseTexture);
	Texture.WHITE = createWhiteTexture();
	removeAllHandlers(Texture.WHITE);
	removeAllHandlers(Texture.WHITE.baseTexture);

	var RenderTexture = function (_Texture) {
	  inherits(RenderTexture, _Texture);
	  function RenderTexture(baseRenderTexture, frame) {
	    classCallCheck(this, RenderTexture);
	    var _this = possibleConstructorReturn(this, (RenderTexture.__proto__ || Object.getPrototypeOf(RenderTexture)).call(this, baseRenderTexture, frame));
	    _this.valid = true;
	    _this._updateUvs();
	    return _this;
	  }
	  createClass(RenderTexture, [{
	    key: 'resize',
	    value: function resize(width, height, doNotResizeBaseTexture) {
	      width = Math.ceil(width);
	      height = Math.ceil(height);
	      this.valid = width > 0 && height > 0;
	      this._frame.width = this.orig.width = width;
	      this._frame.height = this.orig.height = height;
	      if (!doNotResizeBaseTexture) {
	        this.baseTexture.resize(width, height);
	      }
	      this._updateUvs();
	    }
	  }], [{
	    key: 'create',
	    value: function create(width, height, scaleMode, resolution) {
	      return new RenderTexture(new BaseRenderTexture(width, height, scaleMode, resolution));
	    }
	  }]);
	  return RenderTexture;
	}(Texture);

	var tempMatrix = new Matrix();
	var SystemRenderer = function (_EventEmitter) {
	  inherits(SystemRenderer, _EventEmitter);
	  function SystemRenderer(system, width, height, options) {
	    classCallCheck(this, SystemRenderer);
	    var _this = possibleConstructorReturn(this, (SystemRenderer.__proto__ || Object.getPrototypeOf(SystemRenderer)).call(this));
	    options = Object.assign({
	      width: width,
	      height: height
	    }, options);
	    options = Object.assign({}, settings.RENDER_OPTIONS, options);
	    _this.options = options;
	    _this.type = RENDERER_TYPE.UNKNOWN;
	    _this.screen = new Rectangle(0, 0, options.width, options.height);
	    _this.view = options.view || document.createElement('canvas');
	    _this.resolution = options.resolution || settings.RESOLUTION;
	    _this.transparent = options.transparent;
	    _this.autoResize = options.autoResize || false;
	    _this.blendModes = null;
	    _this.preserveDrawingBuffer = options.preserveDrawingBuffer;
	    _this.clearBeforeRender = options.clearBeforeRender;
	    _this.roundPixels = options.roundPixels;
	    _this._backgroundColor = 0x000000;
	    _this._backgroundColorRgba = [0, 0, 0, 0];
	    _this._backgroundColorString = '#000000';
	    _this.backgroundColor = options.backgroundColor || _this._backgroundColor;
	    _this._tempDisplayObjectParent = new Container();
	    _this._lastObjectRendered = _this._tempDisplayObjectParent;
	    return _this;
	  }
	  createClass(SystemRenderer, [{
	    key: 'resize',
	    value: function resize(screenWidth, screenHeight) {
	      this.screen.width = screenWidth;
	      this.screen.height = screenHeight;
	      this.view.width = screenWidth * this.resolution;
	      this.view.height = screenHeight * this.resolution;
	      if (this.autoResize) {
	        this.view.style.width = screenWidth + 'px';
	        this.view.style.height = screenHeight + 'px';
	        WIN_SIZE.width = Math.round(this.width);
	        WIN_SIZE.height = Math.round(this.height);
	      }
	    }
	  }, {
	    key: 'generateTexture',
	    value: function generateTexture(displayObject, scaleMode, resolution, region) {
	      region = region || displayObject.getLocalBounds();
	      var renderTexture = RenderTexture.create(region.width | 0, region.height | 0, scaleMode, resolution);
	      tempMatrix.tx = -region.x;
	      tempMatrix.ty = -region.y;
	      this.render(displayObject, renderTexture, false, tempMatrix, !!displayObject.parent);
	      return renderTexture;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(removeView) {
	      if (removeView && this.view.parentNode) {
	        this.view.parentNode.removeChild(this.view);
	      }
	      this.type = RENDERER_TYPE.UNKNOWN;
	      this.view = null;
	      this.screen = null;
	      this.resolution = 0;
	      this.transparent = false;
	      this.autoResize = false;
	      this.blendModes = null;
	      this.options = null;
	      this.preserveDrawingBuffer = false;
	      this.clearBeforeRender = false;
	      this.roundPixels = false;
	      this.backgroundColor = 0;
	      this._backgroundColorRgba = null;
	      this._backgroundColorString = null;
	      this._tempDisplayObjectParent = null;
	      this._lastObjectRendered = null;
	    }
	  }, {
	    key: 'width',
	    get: function get$$1() {
	      return this.view.width;
	    }
	  }, {
	    key: 'height',
	    get: function get$$1() {
	      return this.view.height;
	    }
	  }, {
	    key: 'backgroundColor',
	    get: function get$$1() {
	      return this._backgroundColor;
	    },
	    set: function set$$1(value) {
	      this._backgroundColor = value;
	      this._backgroundColorString = hex2string(value);
	      hex2rgb(value, this._backgroundColorRgba);
	    }
	  }]);
	  return SystemRenderer;
	}(_eventemitter3_3_1_2_eventemitter3);

	var CanvasMaskManager = function () {
	  function CanvasMaskManager(renderer) {
	    classCallCheck(this, CanvasMaskManager);
	    this.renderer = renderer;
	  }
	  createClass(CanvasMaskManager, [{
	    key: 'pushMask',
	    value: function pushMask(maskData) {
	      var renderer = this.renderer;
	      renderer.context.save();
	      var cacheAlpha = maskData.alpha;
	      var transform = maskData.transform.worldTransform;
	      var resolution = renderer.resolution;
	      renderer.context.setTransform(transform.a * resolution, transform.b * resolution, transform.c * resolution, transform.d * resolution, transform.tx * resolution, transform.ty * resolution);
	      if (!maskData._texture) {
	        this.renderGraphicsShape(maskData);
	        renderer.context.clip();
	      }
	      maskData.worldAlpha = cacheAlpha;
	    }
	  }, {
	    key: 'renderGraphicsShape',
	    value: function renderGraphicsShape(graphics) {
	      var context = this.renderer.context;
	      var len = graphics.graphicsData.length;
	      if (len === 0) {
	        return;
	      }
	      context.beginPath();
	      for (var i = 0; i < len; i++) {
	        var data = graphics.graphicsData[i];
	        var shape = data.shape;
	        if (data.type === SHAPES.POLY) {
	          var points = shape.points;
	          context.moveTo(points[0], points[1]);
	          for (var j = 1; j < points.length / 2; j++) {
	            context.lineTo(points[j * 2], points[j * 2 + 1]);
	          }
	          if (points[0] === points[points.length - 2] && points[1] === points[points.length - 1]) {
	            context.closePath();
	          }
	        } else if (data.type === SHAPES.RECT) {
	          context.rect(shape.x, shape.y, shape.width, shape.height);
	          context.closePath();
	        } else if (data.type === SHAPES.CIRC) {
	          context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
	          context.closePath();
	        } else if (data.type === SHAPES.ELIP) {
	          var w = shape.width * 2;
	          var h = shape.height * 2;
	          var x = shape.x - w / 2;
	          var y = shape.y - h / 2;
	          var kappa = 0.5522848;
	          var ox = w / 2 * kappa;
	          var oy = h / 2 * kappa;
	          var xe = x + w;
	          var ye = y + h;
	          var xm = x + w / 2;
	          var ym = y + h / 2;
	          context.moveTo(x, ym);
	          context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	          context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	          context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	          context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	          context.closePath();
	        } else if (data.type === SHAPES.RREC) {
	          var rx = shape.x;
	          var ry = shape.y;
	          var width = shape.width;
	          var height = shape.height;
	          var radius = shape.radius;
	          var maxRadius = Math.min(width, height) / 2 | 0;
	          radius = radius > maxRadius ? maxRadius : radius;
	          context.moveTo(rx, ry + radius);
	          context.lineTo(rx, ry + height - radius);
	          context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
	          context.lineTo(rx + width - radius, ry + height);
	          context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
	          context.lineTo(rx + width, ry + radius);
	          context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
	          context.lineTo(rx + radius, ry);
	          context.quadraticCurveTo(rx, ry, rx, ry + radius);
	          context.closePath();
	        }
	      }
	    }
	  }, {
	    key: 'popMask',
	    value: function popMask(renderer) {
	      renderer.context.restore();
	      renderer.invalidateBlendMode();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {}
	  }]);
	  return CanvasMaskManager;
	}();

	var CanvasRenderTarget = function () {
	  function CanvasRenderTarget(width, height, resolution) {
	    classCallCheck(this, CanvasRenderTarget);
	    this.canvas = document.createElement('canvas');
	    this.context = this.canvas.getContext('2d');
	    this.resolution = resolution || settings.RESOLUTION;
	    this.resize(width, height);
	  }
	  createClass(CanvasRenderTarget, [{
	    key: 'clear',
	    value: function clear() {
	      this.context.setTransform(1, 0, 0, 1, 0, 0);
	      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    }
	  }, {
	    key: 'resize',
	    value: function resize(width, height) {
	      this.canvas.width = width * this.resolution;
	      this.canvas.height = height * this.resolution;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.context = null;
	      this.canvas = null;
	    }
	  }, {
	    key: 'width',
	    get: function get$$1() {
	      return this.canvas.width;
	    },
	    set: function set$$1(val) {
	      this.canvas.width = val;
	    }
	  }, {
	    key: 'height',
	    get: function get$$1() {
	      return this.canvas.height;
	    },
	    set: function set$$1(val) {
	      this.canvas.height = val;
	    }
	  }]);
	  return CanvasRenderTarget;
	}();

	function createColoredCanvas(color) {
	  var canvas = document.createElement('canvas');
	  canvas.width = 6;
	  canvas.height = 1;
	  var context = canvas.getContext('2d');
	  context.fillStyle = color;
	  context.fillRect(0, 0, 6, 1);
	  return canvas;
	}
	function canUseNewCanvasBlendModes() {
	  if (typeof document === 'undefined') {
	    return false;
	  }
	  var magenta = createColoredCanvas('#ff00ff');
	  var yellow = createColoredCanvas('#ffff00');
	  var canvas = document.createElement('canvas');
	  canvas.width = 6;
	  canvas.height = 1;
	  var context = canvas.getContext('2d');
	  context.globalCompositeOperation = 'multiply';
	  context.drawImage(magenta, 0, 0);
	  context.drawImage(yellow, 2, 0);
	  var imageData = context.getImageData(2, 0, 1, 1);
	  if (!imageData) {
	    return false;
	  }
	  var data = imageData.data;
	  return data[0] === 255 && data[1] === 0 && data[2] === 0;
	}

	function mapCanvasBlendModesToTiny() {
	  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  if (canUseNewCanvasBlendModes()) {
	    array[BLEND_MODES.NORMAL] = 'source-over';
	    array[BLEND_MODES.ADD] = 'lighter';
	    array[BLEND_MODES.MULTIPLY] = 'multiply';
	    array[BLEND_MODES.SCREEN] = 'screen';
	    array[BLEND_MODES.OVERLAY] = 'overlay';
	    array[BLEND_MODES.DARKEN] = 'darken';
	    array[BLEND_MODES.LIGHTEN] = 'lighten';
	    array[BLEND_MODES.COLOR_DODGE] = 'color-dodge';
	    array[BLEND_MODES.COLOR_BURN] = 'color-burn';
	    array[BLEND_MODES.HARD_LIGHT] = 'hard-light';
	    array[BLEND_MODES.SOFT_LIGHT] = 'soft-light';
	    array[BLEND_MODES.DIFFERENCE] = 'difference';
	    array[BLEND_MODES.EXCLUSION] = 'exclusion';
	    array[BLEND_MODES.HUE] = 'hue';
	    array[BLEND_MODES.SATURATION] = 'saturate';
	    array[BLEND_MODES.COLOR] = 'color';
	    array[BLEND_MODES.LUMINOSITY] = 'luminosity';
	  } else {
	    array[BLEND_MODES.NORMAL] = 'source-over';
	    array[BLEND_MODES.ADD] = 'lighter';
	    array[BLEND_MODES.MULTIPLY] = 'source-over';
	    array[BLEND_MODES.SCREEN] = 'source-over';
	    array[BLEND_MODES.OVERLAY] = 'source-over';
	    array[BLEND_MODES.DARKEN] = 'source-over';
	    array[BLEND_MODES.LIGHTEN] = 'source-over';
	    array[BLEND_MODES.COLOR_DODGE] = 'source-over';
	    array[BLEND_MODES.COLOR_BURN] = 'source-over';
	    array[BLEND_MODES.HARD_LIGHT] = 'source-over';
	    array[BLEND_MODES.SOFT_LIGHT] = 'source-over';
	    array[BLEND_MODES.DIFFERENCE] = 'source-over';
	    array[BLEND_MODES.EXCLUSION] = 'source-over';
	    array[BLEND_MODES.HUE] = 'source-over';
	    array[BLEND_MODES.SATURATION] = 'source-over';
	    array[BLEND_MODES.COLOR] = 'source-over';
	    array[BLEND_MODES.LUMINOSITY] = 'source-over';
	  }
	  array[BLEND_MODES.NORMAL_NPM] = array[BLEND_MODES.NORMAL];
	  array[BLEND_MODES.ADD_NPM] = array[BLEND_MODES.ADD];
	  array[BLEND_MODES.SCREEN_NPM] = array[BLEND_MODES.SCREEN];
	  return array;
	}

	var CanvasRenderer = function (_SystemRenderer) {
	  inherits(CanvasRenderer, _SystemRenderer);
	  function CanvasRenderer(width, height, options) {
	    classCallCheck(this, CanvasRenderer);
	    var _this = possibleConstructorReturn(this, (CanvasRenderer.__proto__ || Object.getPrototypeOf(CanvasRenderer)).call(this, 'Canvas', width, height, options));
	    _this.type = RENDERER_TYPE.CANVAS;
	    _this._contextOptions = Object.assign({ alpha: _this.transparent }, config.extraContextAttributes || {});
	    _this.rootContext = _this.view.getContext('2d', _this._contextOptions);
	    _this.context = _this.rootContext;
	    _this.refresh = true;
	    _this.maskManager = new CanvasMaskManager(_this);
	    _this.smoothProperty = 'imageSmoothingEnabled';
	    if (!_this.rootContext.imageSmoothingEnabled) {
	      if (_this.rootContext.webkitImageSmoothingEnabled) {
	        _this.smoothProperty = 'webkitImageSmoothingEnabled';
	      } else if (_this.rootContext.mozImageSmoothingEnabled) {
	        _this.smoothProperty = 'mozImageSmoothingEnabled';
	      } else if (_this.rootContext.oImageSmoothingEnabled) {
	        _this.smoothProperty = 'oImageSmoothingEnabled';
	      } else if (_this.rootContext.msImageSmoothingEnabled) {
	        _this.smoothProperty = 'msImageSmoothingEnabled';
	      }
	    }
	    _this.initPlugins();
	    _this.blendModes = mapCanvasBlendModesToTiny();
	    _this._activeBlendMode = null;
	    _this.renderingToScreen = false;
	    _this.resize(_this.options.width, _this.options.height);
	    return _this;
	  }
	  createClass(CanvasRenderer, [{
	    key: 'render',
	    value: function render(displayObject, renderTexture, clear, transform, skipUpdateTransform) {
	      if (!this.view) {
	        return;
	      }
	      this.renderingToScreen = !renderTexture;
	      this.emit('prerender');
	      var rootResolution = this.resolution;
	      if (renderTexture) {
	        renderTexture = renderTexture.baseTexture || renderTexture;
	        if (!renderTexture._canvasRenderTarget) {
	          renderTexture._canvasRenderTarget = new CanvasRenderTarget(renderTexture.width, renderTexture.height, renderTexture.resolution);
	          renderTexture.source = renderTexture._canvasRenderTarget.canvas;
	          renderTexture.valid = true;
	        }
	        this.context = renderTexture._canvasRenderTarget.context;
	        this.resolution = renderTexture._canvasRenderTarget.resolution;
	      } else {
	        this.context = this.rootContext;
	      }
	      var context = this.context;
	      if (!renderTexture) {
	        this._lastObjectRendered = displayObject;
	      }
	      if (!skipUpdateTransform) {
	        var cacheParent = displayObject.parent;
	        var tempWt = this._tempDisplayObjectParent.transform.worldTransform;
	        if (transform) {
	          transform.copy(tempWt);
	          this._tempDisplayObjectParent.transform._worldID = -1;
	        } else {
	          tempWt.identity();
	        }
	        displayObject.parent = this._tempDisplayObjectParent;
	        displayObject.updateTransform();
	        displayObject.parent = cacheParent;
	      }
	      context.save();
	      context.setTransform(1, 0, 0, 1, 0, 0);
	      context.globalAlpha = 1;
	      this._activeBlendMode = BLEND_MODES.NORMAL;
	      context.globalCompositeOperation = this.blendModes[BLEND_MODES.NORMAL];
	      if (clear !== undefined ? clear : this.clearBeforeRender) {
	        if (this.renderingToScreen) {
	          if (this.transparent) {
	            context.clearRect(0, 0, this.width, this.height);
	          } else {
	            context.fillStyle = this._backgroundColorString;
	            context.fillRect(0, 0, this.width, this.height);
	          }
	        }
	      }
	      var tempContext = this.context;
	      this.context = context;
	      displayObject.renderCanvas(this);
	      this.context = tempContext;
	      context.restore();
	      this.resolution = rootResolution;
	      this.emit('postrender');
	    }
	  }, {
	    key: 'clear',
	    value: function clear(clearColor) {
	      var context = this.context;
	      clearColor = clearColor || this._backgroundColorString;
	      if (!this.transparent && clearColor) {
	        context.fillStyle = clearColor;
	        context.fillRect(0, 0, this.width, this.height);
	      } else {
	        context.clearRect(0, 0, this.width, this.height);
	      }
	    }
	  }, {
	    key: 'setBlendMode',
	    value: function setBlendMode(blendMode) {
	      if (this._activeBlendMode === blendMode) {
	        return;
	      }
	      this._activeBlendMode = blendMode;
	      this.context.globalCompositeOperation = this.blendModes[blendMode];
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(removeView) {
	      this.destroyPlugins();
	      get(CanvasRenderer.prototype.__proto__ || Object.getPrototypeOf(CanvasRenderer.prototype), 'destroy', this).call(this, removeView);
	      this.context = null;
	      this.refresh = true;
	      this.maskManager.destroy();
	      this.maskManager = null;
	      this.smoothProperty = null;
	    }
	  }, {
	    key: 'resize',
	    value: function resize(screenWidth, screenHeight) {
	      get(CanvasRenderer.prototype.__proto__ || Object.getPrototypeOf(CanvasRenderer.prototype), 'resize', this).call(this, screenWidth, screenHeight);
	      if (this.smoothProperty) {
	        this.rootContext[this.smoothProperty] = settings.SCALE_MODE === SCALE_MODES.LINEAR;
	      }
	    }
	  }, {
	    key: 'invalidateBlendMode',
	    value: function invalidateBlendMode() {
	      this._activeBlendMode = this.blendModes.indexOf(this.context.globalCompositeOperation);
	    }
	  }]);
	  return CanvasRenderer;
	}(SystemRenderer);
	pluginTarget$1.mixin(CanvasRenderer);

	var WebGLManager = function () {
	  function WebGLManager(renderer) {
	    classCallCheck(this, WebGLManager);
	    this.renderer = renderer;
	    this.renderer.on('context', this.onContextChange, this);
	  }
	  createClass(WebGLManager, [{
	    key: 'onContextChange',
	    value: function onContextChange() {}
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.renderer.off('context', this.onContextChange, this);
	      this.renderer = null;
	    }
	  }]);
	  return WebGLManager;
	}();

	function createContext(canvas, options) {
	  var gl = canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options);
	  if (!gl) {
	    throw new Error('This browser does not support webGL. Try using the canvas renderer');
	  }
	  return gl;
	}

	function setVertexAttribArrays(gl, attribs, state) {
	  var i = void 0;
	  if (state) {
	    var tempAttribState = state.tempAttribState;
	    var attribState = state.attribState;
	    for (i = 0; i < tempAttribState.length; i++) {
	      tempAttribState[i] = false;
	    }
	    for (i = 0; i < attribs.length; i++) {
	      tempAttribState[attribs[i].attribute.location] = true;
	    }
	    for (i = 0; i < attribState.length; i++) {
	      if (attribState[i] !== tempAttribState[i]) {
	        attribState[i] = tempAttribState[i];
	        if (state.attribState[i]) {
	          gl.enableVertexAttribArray(i);
	        } else {
	          gl.disableVertexAttribArray(i);
	        }
	      }
	    }
	  } else {
	    for (i = 0; i < attribs.length; i++) {
	      var attrib = attribs[i];
	      gl.enableVertexAttribArray(attrib.attribute.location);
	    }
	  }
	}

	var EMPTY_ARRAY_BUFFER = new ArrayBuffer(0);
	var Buffer = function () {
	  function Buffer(gl, type, data, drawType) {
	    classCallCheck(this, Buffer);
	    this.gl = gl;
	    this.buffer = gl.createBuffer();
	    this.type = type || gl.ARRAY_BUFFER;
	    this.drawType = drawType || gl.STATIC_DRAW;
	    this.data = EMPTY_ARRAY_BUFFER;
	    if (data) {
	      this.upload(data);
	    }
	    this._updateID = 0;
	  }
	  createClass(Buffer, [{
	    key: "upload",
	    value: function upload(data, offset, dontBind) {
	      if (!dontBind) this.bind();
	      var gl = this.gl;
	      data = data || this.data;
	      offset = offset || 0;
	      if (this.data.byteLength >= data.byteLength) {
	        gl.bufferSubData(this.type, offset, data);
	      } else {
	        gl.bufferData(this.type, data, this.drawType);
	      }
	      this.data = data;
	    }
	  }, {
	    key: "bind",
	    value: function bind() {
	      this.gl.bindBuffer(this.type, this.buffer);
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.gl.deleteBuffer(this.buffer);
	    }
	  }], [{
	    key: "createVertexBuffer",
	    value: function createVertexBuffer(gl, data, drawType) {
	      return new Buffer(gl, gl.ARRAY_BUFFER, data, drawType);
	    }
	  }, {
	    key: "createIndexBuffer",
	    value: function createIndexBuffer(gl, data, drawType) {
	      return new Buffer(gl, gl.ELEMENT_ARRAY_BUFFER, data, drawType);
	    }
	  }, {
	    key: "create",
	    value: function create(gl, type, data, drawType) {
	      return new Buffer(gl, type, data, drawType);
	    }
	  }]);
	  return Buffer;
	}();

	var FLOATING_POINT_AVAILABLE = false;
	var Texture$1 = function () {
	  function Texture(gl, width, height, format, type) {
	    classCallCheck(this, Texture);
	    this.gl = gl;
	    this.texture = gl.createTexture();
	    this.mipmap = false;
	    this.premultiplyAlpha = false;
	    this.width = width || -1;
	    this.height = height || -1;
	    this.format = format || gl.RGBA;
	    this.type = type || gl.UNSIGNED_BYTE;
	  }
	  createClass(Texture, [{
	    key: 'upload',
	    value: function upload(source) {
	      this.bind();
	      var gl = this.gl;
	      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
	      var newWidth = source.videoWidth || source.width;
	      var newHeight = source.videoHeight || source.height;
	      if (newHeight !== this.height || newWidth !== this.width) {
	        gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.format, this.type, source);
	      } else {
	        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.format, this.type, source);
	      }
	      this.width = newWidth;
	      this.height = newHeight;
	    }
	  }, {
	    key: 'uploadData',
	    value: function uploadData(data, width, height) {
	      this.bind();
	      var gl = this.gl;
	      if (data instanceof Float32Array) {
	        if (!FLOATING_POINT_AVAILABLE) {
	          var ext = gl.getExtension('OES_texture_float');
	          if (ext) {
	            FLOATING_POINT_AVAILABLE = true;
	          } else {
	            throw new Error('floating point textures not available');
	          }
	        }
	        this.type = gl.FLOAT;
	      } else {
	        this.type = this.type || gl.UNSIGNED_BYTE;
	      }
	      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
	      if (width !== this.width || height !== this.height) {
	        gl.texImage2D(gl.TEXTURE_2D, 0, this.format, width, height, 0, this.format, this.type, data || null);
	      } else {
	        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, this.format, this.type, data || null);
	      }
	      this.width = width;
	      this.height = height;
	    }
	  }, {
	    key: 'bind',
	    value: function bind(location) {
	      var gl = this.gl;
	      if (location !== undefined) {
	        gl.activeTexture(gl.TEXTURE0 + location);
	      }
	      gl.bindTexture(gl.TEXTURE_2D, this.texture);
	    }
	  }, {
	    key: 'unbind',
	    value: function unbind() {
	      var gl = this.gl;
	      gl.bindTexture(gl.TEXTURE_2D, null);
	    }
	  }, {
	    key: 'minFilter',
	    value: function minFilter(linear) {
	      var gl = this.gl;
	      this.bind();
	      if (this.mipmap) {
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST);
	      } else {
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR : gl.NEAREST);
	      }
	    }
	  }, {
	    key: 'magFilter',
	    value: function magFilter(linear) {
	      var gl = this.gl;
	      this.bind();
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, linear ? gl.LINEAR : gl.NEAREST);
	    }
	  }, {
	    key: 'enableMipmap',
	    value: function enableMipmap() {
	      var gl = this.gl;
	      this.bind();
	      this.mipmap = true;
	      gl.generateMipmap(gl.TEXTURE_2D);
	    }
	  }, {
	    key: 'enableLinearScaling',
	    value: function enableLinearScaling() {
	      this.minFilter(true);
	      this.magFilter(true);
	    }
	  }, {
	    key: 'enableNearestScaling',
	    value: function enableNearestScaling() {
	      this.minFilter(false);
	      this.magFilter(false);
	    }
	  }, {
	    key: 'enableWrapClamp',
	    value: function enableWrapClamp() {
	      var gl = this.gl;
	      this.bind();
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	    }
	  }, {
	    key: 'enableWrapRepeat',
	    value: function enableWrapRepeat() {
	      var gl = this.gl;
	      this.bind();
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	    }
	  }, {
	    key: 'enableWrapMirrorRepeat',
	    value: function enableWrapMirrorRepeat() {
	      var gl = this.gl;
	      this.bind();
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.gl.deleteTexture(this.texture);
	    }
	  }], [{
	    key: 'fromSource',
	    value: function fromSource(gl, source, premultiplyAlpha) {
	      var texture = new Texture(gl);
	      texture.premultiplyAlpha = premultiplyAlpha || false;
	      texture.upload(source);
	      return texture;
	    }
	  }, {
	    key: 'fromData',
	    value: function fromData(gl, data, width, height) {
	      var texture = new Texture(gl);
	      texture.uploadData(data, width, height);
	      return texture;
	    }
	  }]);
	  return Texture;
	}();

	var Framebuffer = function () {
	  function Framebuffer(gl, width, height) {
	    classCallCheck(this, Framebuffer);
	    this.gl = gl;
	    this.framebuffer = gl.createFramebuffer();
	    this.stencil = null;
	    this.texture = null;
	    this.width = width || 100;
	    this.height = height || 100;
	  }
	  createClass(Framebuffer, [{
	    key: 'enableTexture',
	    value: function enableTexture(texture) {
	      var gl = this.gl;
	      this.texture = texture || new Texture$1(gl);
	      this.texture.bind();
	      this.bind();
	      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.texture, 0);
	    }
	  }, {
	    key: 'enableStencil',
	    value: function enableStencil() {
	      if (this.stencil) return;
	      var gl = this.gl;
	      this.stencil = gl.createRenderbuffer();
	      gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencil);
	      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.stencil);
	      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.width, this.height);
	    }
	  }, {
	    key: 'clear',
	    value: function clear(r, g, b, a) {
	      this.bind();
	      var gl = this.gl;
	      gl.clearColor(r, g, b, a);
	      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	    }
	  }, {
	    key: 'bind',
	    value: function bind() {
	      var gl = this.gl;
	      gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
	    }
	  }, {
	    key: 'unbind',
	    value: function unbind() {
	      var gl = this.gl;
	      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	    }
	  }, {
	    key: 'resize',
	    value: function resize(width, height) {
	      var gl = this.gl;
	      this.width = width;
	      this.height = height;
	      if (this.texture) {
	        this.texture.uploadData(null, width, height);
	      }
	      if (this.stencil) {
	        gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencil);
	        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height);
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var gl = this.gl;
	      if (this.texture) {
	        this.texture.destroy();
	      }
	      gl.deleteFramebuffer(this.framebuffer);
	      this.gl = null;
	      this.stencil = null;
	      this.texture = null;
	    }
	  }], [{
	    key: 'createRGBA',
	    value: function createRGBA(gl, width, height, data) {
	      var texture = Texture$1.fromData(gl, null, width, height);
	      texture.enableNearestScaling();
	      texture.enableWrapClamp();
	      var fbo = new Framebuffer(gl, width, height);
	      fbo.enableTexture(texture);
	      fbo.unbind();
	      return fbo;
	    }
	  }, {
	    key: 'createFloat32',
	    value: function createFloat32(gl, width, height, data) {
	      var texture = Texture$1.fromData(gl, data, width, height);
	      texture.enableNearestScaling();
	      texture.enableWrapClamp();
	      var fbo = new Framebuffer(gl, width, height);
	      fbo.enableTexture(texture);
	      fbo.unbind();
	      return fbo;
	    }
	  }]);
	  return Framebuffer;
	}();

	function compileProgram(gl, vertexSrc, fragmentSrc, attributeLocations) {
	  var glVertShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
	  var glFragShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
	  var program = gl.createProgram();
	  gl.attachShader(program, glVertShader);
	  gl.attachShader(program, glFragShader);
	  if (attributeLocations) {
	    for (var i in attributeLocations) {
	      gl.bindAttribLocation(program, attributeLocations[i], i);
	    }
	  }
	  gl.linkProgram(program);
	  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	    console.error('Error: Could not initialize shader.');
	    console.error('gl.VALIDATE_STATUS', gl.getProgramParameter(program, gl.VALIDATE_STATUS));
	    console.error('gl.getError()', gl.getError());
	    if (gl.getProgramInfoLog(program) !== '') {
	      console.warn('Warning: gl.getProgramInfoLog()', gl.getProgramInfoLog(program));
	    }
	    gl.deleteProgram(program);
	    program = null;
	  }
	  gl.deleteShader(glVertShader);
	  gl.deleteShader(glFragShader);
	  return program;
	}var compileShader = function compileShader(gl, type, source) {
	  var shader = gl.createShader(type);
	  gl.shaderSource(shader, source);
	  gl.compileShader(shader);
	  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
	    return null;
	  }
	  return shader;
	};

	var booleanArray = function booleanArray(size) {
	  var array = new Array(size);
	  for (var i = 0; i < array.length; i++) {
	    array[i] = false;
	  }
	  return array;
	};
	function defaultValue(type, size) {
	  switch (type) {
	    case 'float':
	      return 0;
	    case 'vec2':
	      return new Float32Array(2 * size);
	    case 'vec3':
	      return new Float32Array(3 * size);
	    case 'vec4':
	      return new Float32Array(4 * size);
	    case 'int':
	    case 'sampler2D':
	      return 0;
	    case 'ivec2':
	      return new Int32Array(2 * size);
	    case 'ivec3':
	      return new Int32Array(3 * size);
	    case 'ivec4':
	      return new Int32Array(4 * size);
	    case 'bool':
	      return false;
	    case 'bvec2':
	      return booleanArray(2 * size);
	    case 'bvec3':
	      return booleanArray(3 * size);
	    case 'bvec4':
	      return booleanArray(4 * size);
	    case 'mat2':
	      return new Float32Array([1, 0, 0, 1]);
	    case 'mat3':
	      return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
	    case 'mat4':
	      return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
	  }
	}

	var GL_TO_GLSL_TYPES = {
	  'FLOAT': 'float',
	  'FLOAT_VEC2': 'vec2',
	  'FLOAT_VEC3': 'vec3',
	  'FLOAT_VEC4': 'vec4',
	  'INT': 'int',
	  'INT_VEC2': 'ivec2',
	  'INT_VEC3': 'ivec3',
	  'INT_VEC4': 'ivec4',
	  'BOOL': 'bool',
	  'BOOL_VEC2': 'bvec2',
	  'BOOL_VEC3': 'bvec3',
	  'BOOL_VEC4': 'bvec4',
	  'FLOAT_MAT2': 'mat2',
	  'FLOAT_MAT3': 'mat3',
	  'FLOAT_MAT4': 'mat4',
	  'SAMPLER_2D': 'sampler2D'
	};
	var GL_TABLE = null;
	function mapType(gl, type) {
	  if (!GL_TABLE) {
	    var typeNames = Object.keys(GL_TO_GLSL_TYPES);
	    GL_TABLE = {};
	    for (var i = 0; i < typeNames.length; ++i) {
	      var tn = typeNames[i];
	      GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn];
	    }
	  }
	  return GL_TABLE[type];
	}

	var GLSL_TO_SIZE = {
	  'float': 1,
	  'vec2': 2,
	  'vec3': 3,
	  'vec4': 4,
	  'int': 1,
	  'ivec2': 2,
	  'ivec3': 3,
	  'ivec4': 4,
	  'bool': 1,
	  'bvec2': 2,
	  'bvec3': 3,
	  'bvec4': 4,
	  'mat2': 4,
	  'mat3': 9,
	  'mat4': 16,
	  'sampler2D': 1
	};
	function mapSize(type) {
	  return GLSL_TO_SIZE[type];
	}

	function extractAttributes(gl, program) {
	  var attributes = {};
	  var totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
	  var pointer = function pointer(type, normalized, stride, start) {
	    gl.vertexAttribPointer(this.location, this.size, type || gl.FLOAT, normalized || false, stride || 0, start || 0);
	  };
	  for (var i = 0; i < totalAttributes; i++) {
	    var attribData = gl.getActiveAttrib(program, i);
	    var type = mapType(gl, attribData.type);
	    attributes[attribData.name] = {
	      type: type,
	      size: mapSize(type),
	      location: gl.getAttribLocation(program, attribData.name),
	      pointer: pointer
	    };
	  }
	  return attributes;
	}

	function extractUniforms(gl, program) {
	  var uniforms = {};
	  var totalUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
	  for (var i = 0; i < totalUniforms; i++) {
	    var uniformData = gl.getActiveUniform(program, i);
	    var name = uniformData.name.replace(/\[.*?\]/, '');
	    var type = mapType(gl, uniformData.type);
	    uniforms[name] = {
	      type: type,
	      size: uniformData.size,
	      location: gl.getUniformLocation(program, name),
	      value: defaultValue(type, uniformData.size)
	    };
	  }
	  return uniforms;
	}

	var GLSL_SINGLE_SETTERS = {
	  float: function setSingleFloat(gl, location, value) {
	    gl.uniform1f(location, value);
	  },
	  vec2: function setSingleVec2(gl, location, value) {
	    gl.uniform2f(location, value[0], value[1]);
	  },
	  vec3: function setSingleVec3(gl, location, value) {
	    gl.uniform3f(location, value[0], value[1], value[2]);
	  },
	  vec4: function setSingleVec4(gl, location, value) {
	    gl.uniform4f(location, value[0], value[1], value[2], value[3]);
	  },
	  int: function setSingleInt(gl, location, value) {
	    gl.uniform1i(location, value);
	  },
	  ivec2: function setSingleIvec2(gl, location, value) {
	    gl.uniform2i(location, value[0], value[1]);
	  },
	  ivec3: function setSingleIvec3(gl, location, value) {
	    gl.uniform3i(location, value[0], value[1], value[2]);
	  },
	  ivec4: function setSingleIvec4(gl, location, value) {
	    gl.uniform4i(location, value[0], value[1], value[2], value[3]);
	  },
	  bool: function setSingleBool(gl, location, value) {
	    gl.uniform1i(location, value);
	  },
	  bvec2: function setSingleBvec2(gl, location, value) {
	    gl.uniform2i(location, value[0], value[1]);
	  },
	  bvec3: function setSingleBvec3(gl, location, value) {
	    gl.uniform3i(location, value[0], value[1], value[2]);
	  },
	  bvec4: function setSingleBvec4(gl, location, value) {
	    gl.uniform4i(location, value[0], value[1], value[2], value[3]);
	  },
	  mat2: function setSingleMat2(gl, location, value) {
	    gl.uniformMatrix2fv(location, false, value);
	  },
	  mat3: function setSingleMat3(gl, location, value) {
	    gl.uniformMatrix3fv(location, false, value);
	  },
	  mat4: function setSingleMat4(gl, location, value) {
	    gl.uniformMatrix4fv(location, false, value);
	  },
	  sampler2D: function setSingleSampler2D(gl, location, value) {
	    gl.uniform1i(location, value);
	  }
	};
	var GLSL_ARRAY_SETTERS = {
	  float: function setFloatArray(gl, location, value) {
	    gl.uniform1fv(location, value);
	  },
	  vec2: function setVec2Array(gl, location, value) {
	    gl.uniform2fv(location, value);
	  },
	  vec3: function setVec3Array(gl, location, value) {
	    gl.uniform3fv(location, value);
	  },
	  vec4: function setVec4Array(gl, location, value) {
	    gl.uniform4fv(location, value);
	  },
	  int: function setIntArray(gl, location, value) {
	    gl.uniform1iv(location, value);
	  },
	  ivec2: function setIvec2Array(gl, location, value) {
	    gl.uniform2iv(location, value);
	  },
	  ivec3: function setIvec3Array(gl, location, value) {
	    gl.uniform3iv(location, value);
	  },
	  ivec4: function setIvec4Array(gl, location, value) {
	    gl.uniform4iv(location, value);
	  },
	  bool: function setBoolArray(gl, location, value) {
	    gl.uniform1iv(location, value);
	  },
	  bvec2: function setBvec2Array(gl, location, value) {
	    gl.uniform2iv(location, value);
	  },
	  bvec3: function setBvec3Array(gl, location, value) {
	    gl.uniform3iv(location, value);
	  },
	  bvec4: function setBvec4Array(gl, location, value) {
	    gl.uniform4iv(location, value);
	  },
	  sampler2D: function setSampler2DArray(gl, location, value) {
	    gl.uniform1iv(location, value);
	  }
	};
	var generateGetter = function generateGetter(name) {
	  return function () {
	    return this.data[name].value;
	  };
	};
	function generateUniformAccessObject(gl, uniformData) {
	  var uniforms = { data: {} };
	  uniforms.gl = gl;
	  var uniformKeys = Object.keys(uniformData);
	  for (var i = 0; i < uniformKeys.length; i++) {
	    var fullName = uniformKeys[i];
	    var nameTokens = fullName.split('.');
	    var name = nameTokens[nameTokens.length - 1];
	    var uniformGroup = getUniformGroup(nameTokens, uniforms);
	    var uniform = uniformData[fullName];
	    uniformGroup.data[name] = uniform;
	    uniformGroup.gl = gl;
	    Object.defineProperty(uniformGroup, name, {
	      get: generateGetter(name),
	      set: generateSetter(name, uniform)
	    });
	  }
	  return uniforms;
	}function generateSetter(name, uniform) {
	  return function (value) {
	    this.data[name].value = value;
	    var location = this.data[name].location;
	    if (uniform.size === 1) {
	      GLSL_SINGLE_SETTERS[uniform.type](this.gl, location, value);
	    } else {
	      GLSL_ARRAY_SETTERS[uniform.type](this.gl, location, value);
	    }
	  };
	}
	function getUniformGroup(nameTokens, uniform) {
	  var cur = uniform;
	  for (var i = 0; i < nameTokens.length - 1; i++) {
	    var o = cur[nameTokens[i]] || { data: {} };
	    cur[nameTokens[i]] = o;
	    cur = o;
	  }
	  return cur;
	}

	function setPrecision(src, precision) {
	  src = src.replace(/^\s*/, '');
	  if (src instanceof Array) {
	    if (src[0].substring(0, 9) !== 'precision') {
	      var copy = src.slice(0);
	      copy.unshift('precision ' + precision + ' float;');
	      return copy;
	    }
	  } else if (src.substring(0, 9) !== 'precision') {
	    return 'precision ' + precision + ' float;\n' + src;
	  }
	  return src;
	}

	var shader = {
	  compileProgram: compileProgram,
	  defaultValue: defaultValue,
	  extractAttributes: extractAttributes,
	  extractUniforms: extractUniforms,
	  generateUniformAccessObject: generateUniformAccessObject,
	  setPrecision: setPrecision,
	  mapSize: mapSize,
	  mapType: mapType
	};

	var compileProgram$1 = shader.compileProgram,
	    extractAttributes$1 = shader.extractAttributes,
	    extractUniforms$1 = shader.extractUniforms,
	    setPrecision$1 = shader.setPrecision,
	    generateUniformAccessObject$1 = shader.generateUniformAccessObject;
	var Shader = function () {
	  function Shader(gl, vertexSrc, fragmentSrc, precision, attributeLocations) {
	    classCallCheck(this, Shader);
	    this.gl = gl;
	    if (precision) {
	      vertexSrc = setPrecision$1(vertexSrc, precision);
	      fragmentSrc = setPrecision$1(fragmentSrc, precision);
	    }
	    this.program = compileProgram$1(gl, vertexSrc, fragmentSrc, attributeLocations);
	    this.attributes = extractAttributes$1(gl, this.program);
	    this.uniformData = extractUniforms$1(gl, this.program);
	    this.uniforms = generateUniformAccessObject$1(gl, this.uniformData);
	  }
	  createClass(Shader, [{
	    key: 'bind',
	    value: function bind() {
	      this.gl.useProgram(this.program);
	      return this;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.attributes = null;
	      this.uniformData = null;
	      this.uniforms = null;
	      this.gl.deleteProgram(this.program);
	    }
	  }]);
	  return Shader;
	}();

	var VertexArrayObject = function () {
	  function VertexArrayObject(gl, state) {
	    classCallCheck(this, VertexArrayObject);
	    this.nativeVaoExtension = null;
	    if (!VertexArrayObject.FORCE_NATIVE) {
	      this.nativeVaoExtension = gl.getExtension('OES_vertex_array_object') || gl.getExtension('MOZ_OES_vertex_array_object') || gl.getExtension('WEBKIT_OES_vertex_array_object');
	    }
	    this.nativeState = state;
	    if (this.nativeVaoExtension) {
	      this.nativeVao = this.nativeVaoExtension.createVertexArrayOES();
	      var maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
	      this.nativeState = {
	        tempAttribState: new Array(maxAttribs),
	        attribState: new Array(maxAttribs)
	      };
	    }
	    this.gl = gl;
	    this.attributes = [];
	    this.indexBuffer = null;
	    this.dirty = false;
	  }
	  createClass(VertexArrayObject, [{
	    key: 'bind',
	    value: function bind() {
	      if (this.nativeVao) {
	        this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao);
	        if (this.dirty) {
	          this.dirty = false;
	          this.activate();
	          return this;
	        }
	        if (this.indexBuffer) {
	          this.indexBuffer.bind();
	        }
	      } else {
	        this.activate();
	      }
	      return this;
	    }
	  }, {
	    key: 'unbind',
	    value: function unbind() {
	      if (this.nativeVao) {
	        this.nativeVaoExtension.bindVertexArrayOES(null);
	      }
	      return this;
	    }
	  }, {
	    key: 'activate',
	    value: function activate() {
	      var gl = this.gl;
	      var lastBuffer = null;
	      for (var i = 0; i < this.attributes.length; i++) {
	        var attrib = this.attributes[i];
	        if (lastBuffer !== attrib.buffer) {
	          attrib.buffer.bind();
	          lastBuffer = attrib.buffer;
	        }
	        gl.vertexAttribPointer(attrib.attribute.location, attrib.attribute.size, attrib.type || gl.FLOAT, attrib.normalized || false, attrib.stride || 0, attrib.start || 0);
	      }
	      setVertexAttribArrays(gl, this.attributes, this.nativeState);
	      if (this.indexBuffer) {
	        this.indexBuffer.bind();
	      }
	      return this;
	    }
	  }, {
	    key: 'addAttribute',
	    value: function addAttribute(buffer, attribute, type, normalized, stride, start) {
	      this.attributes.push({
	        buffer: buffer,
	        attribute: attribute,
	        location: attribute.location,
	        type: type || this.gl.FLOAT,
	        normalized: normalized || false,
	        stride: stride || 0,
	        start: start || 0
	      });
	      this.dirty = true;
	      return this;
	    }
	  }, {
	    key: 'addIndex',
	    value: function addIndex(buffer) {
	      this.indexBuffer = buffer;
	      this.dirty = true;
	      return this;
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      if (this.nativeVao) {
	        this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao);
	      }
	      this.attributes.length = 0;
	      this.indexBuffer = null;
	      return this;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(type, size, start) {
	      var gl = this.gl;
	      if (this.indexBuffer) {
	        gl.drawElements(type, size || this.indexBuffer.data.length, gl.UNSIGNED_SHORT, (start || 0) * 2);
	      } else {
	        gl.drawArrays(type, start, size || this.getSize());
	      }
	      return this;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.gl = null;
	      this.indexBuffer = null;
	      this.attributes = null;
	      this.nativeState = null;
	      if (this.nativeVao) {
	        this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao);
	      }
	      this.nativeVaoExtension = null;
	      this.nativeVao = null;
	    }
	  }, {
	    key: 'getSize',
	    value: function getSize() {
	      var attrib = this.attributes[0];
	      return attrib.buffer.data.length / (attrib.stride / 4 || attrib.attribute.size);
	    }
	  }]);
	  return VertexArrayObject;
	}();
	VertexArrayObject.FORCE_NATIVE = false;

	var glCore = {
	  createContext: createContext,
	  setVertexAttribArrays: setVertexAttribArrays,
	  GLBuffer: Buffer,
	  GLFramebuffer: Framebuffer,
	  GLShader: Shader,
	  GLTexture: Texture$1,
	  VertexArrayObject: VertexArrayObject,
	  shader: shader
	};

	var defaultValue$1 = glCore.shader.defaultValue;
	function extractUniformsFromSrc(vertexSrc, fragmentSrc, mask) {
	  var vertUniforms = extractUniformsFromString(vertexSrc, mask);
	  var fragUniforms = extractUniformsFromString(fragmentSrc, mask);
	  return Object.assign(vertUniforms, fragUniforms);
	}
	function extractUniformsFromString(string) {
	  var maskRegex = new RegExp('^(projectionMatrix|uSampler|filterArea|filterClamp)$');
	  var uniforms = {};
	  var nameSplit = void 0;
	  var lines = string.replace(/\s+/g, ' ').split(/\s*;\s*/);
	  for (var i = 0; i < lines.length; i++) {
	    var line = lines[i].trim();
	    if (line.indexOf('uniform') > -1) {
	      var splitLine = line.split(' ');
	      var type = splitLine[1];
	      var name = splitLine[2];
	      var size = 1;
	      if (name.indexOf('[') > -1) {
	        nameSplit = name.split(/\[|]/);
	        name = nameSplit[0];
	        size *= Number(nameSplit[1]);
	      }
	      if (!name.match(maskRegex)) {
	        uniforms[name] = {
	          value: defaultValue$1(type, size),
	          name: name,
	          type: type
	        };
	      }
	    }
	  }
	  return uniforms;
	}

	var SOURCE_KEY_MAP = {};
	var Filter = function () {
	  function Filter(vertexSrc, fragmentSrc, uniforms) {
	    classCallCheck(this, Filter);
	    this.vertexSrc = vertexSrc || Filter.defaultVertexSrc;
	    this.fragmentSrc = fragmentSrc || Filter.defaultFragmentSrc;
	    this._blendMode = BLEND_MODES.NORMAL;
	    this.uniformData = uniforms || extractUniformsFromSrc(this.vertexSrc, this.fragmentSrc, 'projectionMatrix|uSampler');
	    this.uniforms = {};
	    for (var i in this.uniformData) {
	      this.uniforms[i] = this.uniformData[i].value;
	      if (this.uniformData[i].type) {
	        this.uniformData[i].type = this.uniformData[i].type.toLowerCase();
	      }
	    }
	    this.glShaders = {};
	    if (!SOURCE_KEY_MAP[this.vertexSrc + this.fragmentSrc]) {
	      SOURCE_KEY_MAP[this.vertexSrc + this.fragmentSrc] = uid();
	    }
	    this.glShaderKey = SOURCE_KEY_MAP[this.vertexSrc + this.fragmentSrc];
	    this.padding = 4;
	    this.resolution = settings.FILTER_RESOLUTION;
	    this.enabled = true;
	    this.autoFit = true;
	  }
	  createClass(Filter, [{
	    key: 'apply',
	    value: function apply(filterManager, input, output, clear, currentState) {
	      filterManager.applyFilter(this, input, output, clear);
	    }
	  }, {
	    key: 'blendMode',
	    get: function get$$1() {
	      return this._blendMode;
	    },
	    set: function set$$1(value) {
	      this._blendMode = value;
	    }
	  }], [{
	    key: 'defaultVertexSrc',
	    get: function get$$1() {
	      return '\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nvoid main(void){\n  gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n  vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n  vTextureCoord = aTextureCoord ;\n}\n';
	    }
	  }, {
	    key: 'defaultFragmentSrc',
	    get: function get$$1() {
	      return '\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D filterSampler;\n\nvoid main(void){\n  vec4 masky = texture2D(filterSampler, vFilterCoord);\n  vec4 sample = texture2D(uSampler, vTextureCoord);\n  vec4 color;\n  if(mod(vFilterCoord.x, 1.0) > 0.5) {\n    color = vec4(1.0, 0.0, 0.0, 1.0);\n  } else {\n    color = vec4(0.0, 1.0, 0.0, 1.0);\n  }\n  gl_FragColor = mix(sample, masky, 0.5);\n  gl_FragColor *= sample.a;\',\n}\n';
	    }
	  }]);
	  return Filter;
	}();

	var tempMat = new Matrix();
	var TextureTransform = function () {
	  function TextureTransform(texture, clampMargin) {
	    classCallCheck(this, TextureTransform);
	    this._texture = texture;
	    this.mapCoord = new Matrix();
	    this.uClampFrame = new Float32Array(4);
	    this.uClampOffset = new Float32Array(2);
	    this._lastTextureID = -1;
	    this.clampOffset = 0;
	    this.clampMargin = typeof clampMargin === 'undefined' ? 0.5 : clampMargin;
	  }
	  createClass(TextureTransform, [{
	    key: 'multiplyUvs',
	    value: function multiplyUvs(uvs, out) {
	      if (out === undefined) {
	        out = uvs;
	      }
	      var mat = this.mapCoord;
	      for (var i = 0; i < uvs.length; i += 2) {
	        var x = uvs[i];
	        var y = uvs[i + 1];
	        out[i] = x * mat.a + y * mat.c + mat.tx;
	        out[i + 1] = x * mat.b + y * mat.d + mat.ty;
	      }
	      return out;
	    }
	  }, {
	    key: 'update',
	    value: function update(forceUpdate) {
	      var tex = this._texture;
	      if (!tex || !tex.valid) {
	        return false;
	      }
	      if (!forceUpdate && this._lastTextureID === tex._updateID) {
	        return false;
	      }
	      this._lastTextureID = tex._updateID;
	      var uvs = tex._uvs;
	      this.mapCoord.set(uvs.x1 - uvs.x0, uvs.y1 - uvs.y0, uvs.x3 - uvs.x0, uvs.y3 - uvs.y0, uvs.x0, uvs.y0);
	      var orig = tex.orig;
	      var trim = tex.trim;
	      if (trim) {
	        tempMat.set(orig.width / trim.width, 0, 0, orig.height / trim.height, -trim.x / trim.width, -trim.y / trim.height);
	        this.mapCoord.append(tempMat);
	      }
	      var texBase = tex.baseTexture;
	      var frame = this.uClampFrame;
	      var margin = this.clampMargin / texBase.resolution;
	      var offset = this.clampOffset;
	      frame[0] = (tex._frame.x + margin + offset) / texBase.width;
	      frame[1] = (tex._frame.y + margin + offset) / texBase.height;
	      frame[2] = (tex._frame.x + tex._frame.width - margin + offset) / texBase.width;
	      frame[3] = (tex._frame.y + tex._frame.height - margin + offset) / texBase.height;
	      this.uClampOffset[0] = offset / texBase.realWidth;
	      this.uClampOffset[1] = offset / texBase.realHeight;
	      return true;
	    }
	  }, {
	    key: 'texture',
	    get: function get$$1() {
	      return this._texture;
	    },
	    set: function set$$1(value) {
	      this._texture = value;
	      this._lastTextureID = -1;
	    }
	  }]);
	  return TextureTransform;
	}();

	var spriteMaskFilter = {
	  frag: '\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n  float clip = step(3.5,\n    step(maskClamp.x, vMaskCoord.x) +\n    step(maskClamp.y, vMaskCoord.y) +\n    step(vMaskCoord.x, maskClamp.z) +\n    step(vMaskCoord.y, maskClamp.w));\n\n  vec4 original = texture2D(uSampler, vTextureCoord);\n  vec4 masky = texture2D(mask, vMaskCoord);\n\n  original *= (masky.r * masky.a * alpha * clip);\n\n  gl_FragColor = original;\n}\n',
	  vert: '\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n'
	};
	var SpriteMaskFilter = function (_Filter) {
	  inherits(SpriteMaskFilter, _Filter);
	  function SpriteMaskFilter(sprite) {
	    classCallCheck(this, SpriteMaskFilter);
	    var maskMatrix = new Matrix();
	    var _this = possibleConstructorReturn(this, (SpriteMaskFilter.__proto__ || Object.getPrototypeOf(SpriteMaskFilter)).call(this, spriteMaskFilter.vert, spriteMaskFilter.frag));
	    sprite.renderable = false;
	    _this.maskSprite = sprite;
	    _this.maskMatrix = maskMatrix;
	    return _this;
	  }
	  createClass(SpriteMaskFilter, [{
	    key: 'apply',
	    value: function apply(filterManager, input, output) {
	      var maskSprite = this.maskSprite;
	      var tex = this.maskSprite.texture;
	      if (!tex.valid) {
	        return;
	      }
	      if (!tex.transform) {
	        tex.transform = new TextureTransform(tex, 0.0);
	      }
	      tex.transform.update();
	      this.uniforms.mask = tex;
	      this.uniforms.otherMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, maskSprite).prepend(tex.transform.mapCoord);
	      this.uniforms.alpha = maskSprite.worldAlpha;
	      this.uniforms.maskClamp = tex.transform.uClampFrame;
	      filterManager.applyFilter(this, input, output);
	    }
	  }]);
	  return SpriteMaskFilter;
	}(Filter);

	var MaskManager = function (_WebGLManager) {
	  inherits(MaskManager, _WebGLManager);
	  function MaskManager(renderer) {
	    classCallCheck(this, MaskManager);
	    var _this = possibleConstructorReturn(this, (MaskManager.__proto__ || Object.getPrototypeOf(MaskManager)).call(this, renderer));
	    _this.scissor = false;
	    _this.scissorData = null;
	    _this.scissorRenderTarget = null;
	    _this.enableScissor = true;
	    _this.alphaMaskPool = [];
	    _this.alphaMaskIndex = 0;
	    return _this;
	  }
	  createClass(MaskManager, [{
	    key: 'pushMask',
	    value: function pushMask(target, maskData) {
	      if (maskData.texture) {
	        this.pushSpriteMask(target, maskData);
	      } else if (this.enableScissor && !this.scissor && this.renderer._activeRenderTarget.root && !this.renderer.stencilManager.stencilMaskStack.length && maskData.isFastRect()) {
	        var matrix = maskData.worldTransform;
	        var rot = Math.atan2(matrix.b, matrix.a);
	        rot = Math.round(rot * (180 / Math.PI));
	        if (rot % 90) {
	          this.pushStencilMask(maskData);
	        } else {
	          this.pushScissorMask(target, maskData);
	        }
	      } else {
	        this.pushStencilMask(maskData);
	      }
	    }
	  }, {
	    key: 'popMask',
	    value: function popMask(target, maskData) {
	      if (maskData.texture) {
	        this.popSpriteMask(target, maskData);
	      } else if (this.enableScissor && !this.renderer.stencilManager.stencilMaskStack.length) {
	        this.popScissorMask(target, maskData);
	      } else {
	        this.popStencilMask(target, maskData);
	      }
	    }
	  }, {
	    key: 'pushSpriteMask',
	    value: function pushSpriteMask(target, maskData) {
	      var alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex];
	      if (!alphaMaskFilter) {
	        alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex] = [new SpriteMaskFilter(maskData)];
	      }
	      alphaMaskFilter[0].resolution = this.renderer.resolution;
	      alphaMaskFilter[0].maskSprite = maskData;
	      target.filterArea = maskData.getBounds(true);
	      this.renderer.filterManager.pushFilter(target, alphaMaskFilter);
	      this.alphaMaskIndex++;
	    }
	  }, {
	    key: 'popSpriteMask',
	    value: function popSpriteMask() {
	      this.renderer.filterManager.popFilter();
	      this.alphaMaskIndex--;
	    }
	  }, {
	    key: 'pushStencilMask',
	    value: function pushStencilMask(maskData) {
	      this.renderer.currentRenderer.stop();
	      this.renderer.stencilManager.pushStencil(maskData);
	    }
	  }, {
	    key: 'popStencilMask',
	    value: function popStencilMask() {
	      this.renderer.currentRenderer.stop();
	      this.renderer.stencilManager.popStencil();
	    }
	  }, {
	    key: 'pushScissorMask',
	    value: function pushScissorMask(target, maskData) {
	      maskData.renderable = true;
	      var renderTarget = this.renderer._activeRenderTarget;
	      var bounds = maskData.getBounds();
	      bounds.fit(renderTarget.size);
	      maskData.renderable = false;
	      this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);
	      var resolution = this.renderer.resolution;
	      this.renderer.gl.scissor(bounds.x * resolution, (renderTarget.root ? renderTarget.size.height - bounds.y - bounds.height : bounds.y) * resolution, bounds.width * resolution, bounds.height * resolution);
	      this.scissorRenderTarget = renderTarget;
	      this.scissorData = maskData;
	      this.scissor = true;
	    }
	  }, {
	    key: 'popScissorMask',
	    value: function popScissorMask() {
	      this.scissorRenderTarget = null;
	      this.scissorData = null;
	      this.scissor = false;
	      var gl = this.renderer.gl;
	      gl.disable(gl.SCISSOR_TEST);
	    }
	  }]);
	  return MaskManager;
	}(WebGLManager);

	var StencilManager = function (_WebGLManager) {
	  inherits(StencilManager, _WebGLManager);
	  function StencilManager(renderer) {
	    classCallCheck(this, StencilManager);
	    var _this = possibleConstructorReturn(this, (StencilManager.__proto__ || Object.getPrototypeOf(StencilManager)).call(this, renderer));
	    _this.stencilMaskStack = null;
	    return _this;
	  }
	  createClass(StencilManager, [{
	    key: 'setMaskStack',
	    value: function setMaskStack(stencilMaskStack) {
	      this.stencilMaskStack = stencilMaskStack;
	      var gl = this.renderer.gl;
	      if (stencilMaskStack.length === 0) {
	        gl.disable(gl.STENCIL_TEST);
	      } else {
	        gl.enable(gl.STENCIL_TEST);
	      }
	    }
	  }, {
	    key: 'pushStencil',
	    value: function pushStencil(graphics) {
	      this.renderer.setObjectRenderer(this.renderer.plugins.graphics);
	      this.renderer._activeRenderTarget.attachStencilBuffer();
	      var gl = this.renderer.gl;
	      var prevMaskCount = this.stencilMaskStack.length;
	      if (prevMaskCount === 0) {
	        gl.enable(gl.STENCIL_TEST);
	      }
	      this.stencilMaskStack.push(graphics);
	      gl.colorMask(false, false, false, false);
	      gl.stencilFunc(gl.EQUAL, prevMaskCount, this._getBitwiseMask());
	      gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
	      this.renderer.plugins.graphics.render(graphics);
	      this._useCurrent();
	    }
	  }, {
	    key: 'popStencil',
	    value: function popStencil() {
	      this.renderer.setObjectRenderer(this.renderer.plugins.graphics);
	      var gl = this.renderer.gl;
	      var graphics = this.stencilMaskStack.pop();
	      if (this.stencilMaskStack.length === 0) {
	        gl.disable(gl.STENCIL_TEST);
	        gl.clear(gl.STENCIL_BUFFER_BIT);
	        gl.clearStencil(0);
	      } else {
	        gl.colorMask(false, false, false, false);
	        gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
	        this.renderer.plugins.graphics.render(graphics);
	        this._useCurrent();
	      }
	    }
	  }, {
	    key: '_useCurrent',
	    value: function _useCurrent() {
	      var gl = this.renderer.gl;
	      gl.colorMask(true, true, true, true);
	      gl.stencilFunc(gl.EQUAL, this.stencilMaskStack.length, this._getBitwiseMask());
	      gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
	    }
	  }, {
	    key: '_getBitwiseMask',
	    value: function _getBitwiseMask() {
	      return (1 << this.stencilMaskStack.length) - 1;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      WebGLManager.prototype.destroy.call(this);
	      this.stencilMaskStack.stencilStack = null;
	    }
	  }]);
	  return StencilManager;
	}(WebGLManager);

	var RenderTarget = function () {
	  function RenderTarget(gl, width, height, scaleMode, resolution, root) {
	    classCallCheck(this, RenderTarget);
	    this.gl = gl;
	    this.frameBuffer = null;
	    this.texture = null;
	    this.clearColor = [0, 0, 0, 0];
	    this.size = new Rectangle(0, 0, 1, 1);
	    this.resolution = resolution || settings.RESOLUTION;
	    this.projectionMatrix = new Matrix();
	    this.transform = null;
	    this.frame = null;
	    this.defaultFrame = new Rectangle();
	    this.destinationFrame = null;
	    this.sourceFrame = null;
	    this.stencilBuffer = null;
	    this.stencilMaskStack = [];
	    this.filterData = null;
	    this.filterPoolKey = '';
	    this.scaleMode = scaleMode !== undefined ? scaleMode : settings.SCALE_MODE;
	    this.root = root;
	    if (!this.root) {
	      this.frameBuffer = Framebuffer.createRGBA(gl, 100, 100);
	      if (this.scaleMode === SCALE_MODES.NEAREST) {
	        this.frameBuffer.texture.enableNearestScaling();
	      } else {
	        this.frameBuffer.texture.enableLinearScaling();
	      }
	      this.texture = this.frameBuffer.texture;
	    } else {
	      this.frameBuffer = new Framebuffer(gl, 100, 100);
	      this.frameBuffer.framebuffer = null;
	    }
	    this.setFrame();
	    this.resize(width, height);
	  }
	  createClass(RenderTarget, [{
	    key: 'clear',
	    value: function clear(clearColor) {
	      var cc = clearColor || this.clearColor;
	      this.frameBuffer.clear(cc[0], cc[1], cc[2], cc[3]);
	    }
	  }, {
	    key: 'attachStencilBuffer',
	    value: function attachStencilBuffer() {
	      if (!this.root) {
	        this.frameBuffer.enableStencil();
	      }
	    }
	  }, {
	    key: 'setFrame',
	    value: function setFrame(destinationFrame, sourceFrame) {
	      this.destinationFrame = destinationFrame || this.destinationFrame || this.defaultFrame;
	      this.sourceFrame = sourceFrame || this.sourceFrame || this.destinationFrame;
	    }
	  }, {
	    key: 'activate',
	    value: function activate() {
	      var gl = this.gl;
	      this.frameBuffer.bind();
	      this.calculateProjection(this.destinationFrame, this.sourceFrame);
	      if (this.transform) {
	        this.projectionMatrix.append(this.transform);
	      }
	      if (this.destinationFrame !== this.sourceFrame) {
	        gl.enable(gl.SCISSOR_TEST);
	        gl.scissor(this.destinationFrame.x | 0, this.destinationFrame.y | 0, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0);
	      } else {
	        gl.disable(gl.SCISSOR_TEST);
	      }
	      gl.viewport(this.destinationFrame.x | 0, this.destinationFrame.y | 0, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0);
	    }
	  }, {
	    key: 'calculateProjection',
	    value: function calculateProjection(destinationFrame, sourceFrame) {
	      var pm = this.projectionMatrix;
	      sourceFrame = sourceFrame || destinationFrame;
	      pm.identity();
	      if (!this.root) {
	        pm.a = 1 / destinationFrame.width * 2;
	        pm.d = 1 / destinationFrame.height * 2;
	        pm.tx = -1 - sourceFrame.x * pm.a;
	        pm.ty = -1 - sourceFrame.y * pm.d;
	      } else {
	        pm.a = 1 / destinationFrame.width * 2;
	        pm.d = -1 / destinationFrame.height * 2;
	        pm.tx = -1 - sourceFrame.x * pm.a;
	        pm.ty = 1 - sourceFrame.y * pm.d;
	      }
	    }
	  }, {
	    key: 'resize',
	    value: function resize(width, height) {
	      width = width | 0;
	      height = height | 0;
	      if (this.size.width === width && this.size.height === height) {
	        return;
	      }
	      this.size.width = width;
	      this.size.height = height;
	      this.defaultFrame.width = width;
	      this.defaultFrame.height = height;
	      this.frameBuffer.resize(width * this.resolution, height * this.resolution);
	      var projectionFrame = this.frame || this.size;
	      this.calculateProjection(projectionFrame);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.frameBuffer.destroy();
	      this.frameBuffer = null;
	      this.texture = null;
	    }
	  }]);
	  return RenderTarget;
	}();

	function createIndicesForQuads(size) {
	  var totalIndices = size * 6;
	  var indices = new Uint16Array(totalIndices);
	  for (var i = 0, j = 0; i < totalIndices; i += 6, j += 4) {
	    indices[i + 0] = j + 0;
	    indices[i + 1] = j + 1;
	    indices[i + 2] = j + 2;
	    indices[i + 3] = j + 0;
	    indices[i + 4] = j + 2;
	    indices[i + 5] = j + 3;
	  }
	  return indices;
	}

	var Quad = function () {
	  function Quad(gl, state) {
	    classCallCheck(this, Quad);
	    this.gl = gl;
	    this.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]);
	    this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
	    this.interleaved = new Float32Array(8 * 2);
	    for (var i = 0; i < 4; i++) {
	      this.interleaved[i * 4] = this.vertices[i * 2];
	      this.interleaved[i * 4 + 1] = this.vertices[i * 2 + 1];
	      this.interleaved[i * 4 + 2] = this.uvs[i * 2];
	      this.interleaved[i * 4 + 3] = this.uvs[i * 2 + 1];
	    }
	    this.indices = createIndicesForQuads(1);
	    this.vertexBuffer = glCore.GLBuffer.createVertexBuffer(gl, this.interleaved, gl.STATIC_DRAW);
	    this.indexBuffer = glCore.GLBuffer.createIndexBuffer(gl, this.indices, gl.STATIC_DRAW);
	    this.vao = new glCore.VertexArrayObject(gl, state);
	  }
	  createClass(Quad, [{
	    key: 'initVao',
	    value: function initVao(shader) {
	      this.vao.clear().addIndex(this.indexBuffer).addAttribute(this.vertexBuffer, shader.attributes.aVertexPosition, this.gl.FLOAT, false, 4 * 4, 0).addAttribute(this.vertexBuffer, shader.attributes.aTextureCoord, this.gl.FLOAT, false, 4 * 4, 2 * 4);
	    }
	  }, {
	    key: 'map',
	    value: function map(targetTextureFrame, destinationFrame) {
	      var x = 0;
	      var y = 0;
	      this.uvs[0] = x;
	      this.uvs[1] = y;
	      this.uvs[2] = x + destinationFrame.width / targetTextureFrame.width;
	      this.uvs[3] = y;
	      this.uvs[4] = x + destinationFrame.width / targetTextureFrame.width;
	      this.uvs[5] = y + destinationFrame.height / targetTextureFrame.height;
	      this.uvs[6] = x;
	      this.uvs[7] = y + destinationFrame.height / targetTextureFrame.height;
	      x = destinationFrame.x;
	      y = destinationFrame.y;
	      this.vertices[0] = x;
	      this.vertices[1] = y;
	      this.vertices[2] = x + destinationFrame.width;
	      this.vertices[3] = y;
	      this.vertices[4] = x + destinationFrame.width;
	      this.vertices[5] = y + destinationFrame.height;
	      this.vertices[6] = x;
	      this.vertices[7] = y + destinationFrame.height;
	      return this;
	    }
	  }, {
	    key: 'upload',
	    value: function upload() {
	      for (var i = 0; i < 4; i++) {
	        this.interleaved[i * 4] = this.vertices[i * 2];
	        this.interleaved[i * 4 + 1] = this.vertices[i * 2 + 1];
	        this.interleaved[i * 4 + 2] = this.uvs[i * 2];
	        this.interleaved[i * 4 + 3] = this.uvs[i * 2 + 1];
	      }
	      this.vertexBuffer.upload(this.interleaved);
	      return this;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var gl = this.gl;
	      gl.deleteBuffer(this.vertexBuffer);
	      gl.deleteBuffer(this.indexBuffer);
	    }
	  }]);
	  return Quad;
	}();

	var Shader$1 = function (_glCore$GLShader) {
	  inherits(Shader, _glCore$GLShader);
	  function Shader(gl, vertexSrc, fragmentSrc, attributeLocations, precision) {
	    classCallCheck(this, Shader);
	    return possibleConstructorReturn(this, (Shader.__proto__ || Object.getPrototypeOf(Shader)).call(this, gl, glCore.shader.setPrecision(vertexSrc, precision || settings.PRECISION_VERTEX), glCore.shader.setPrecision(fragmentSrc, precision || settings.PRECISION_FRAGMENT), undefined, attributeLocations));
	  }
	  return Shader;
	}(glCore.GLShader);

	function calculateScreenSpaceMatrix(outputMatrix, filterArea, textureSize) {
	  var mappedMatrix = outputMatrix.identity();
	  mappedMatrix.translate(filterArea.x / textureSize.width, filterArea.y / textureSize.height);
	  mappedMatrix.scale(textureSize.width, textureSize.height);
	  return mappedMatrix;
	}
	function calculateNormalizedScreenSpaceMatrix(outputMatrix, filterArea, textureSize) {
	  var mappedMatrix = outputMatrix.identity();
	  mappedMatrix.translate(filterArea.x / textureSize.width, filterArea.y / textureSize.height);
	  var translateScaleX = textureSize.width / filterArea.width;
	  var translateScaleY = textureSize.height / filterArea.height;
	  mappedMatrix.scale(translateScaleX, translateScaleY);
	  return mappedMatrix;
	}
	function calculateSpriteMatrix(outputMatrix, filterArea, textureSize, sprite) {
	  var orig = sprite._texture.orig;
	  var mappedMatrix = outputMatrix.set(textureSize.width, 0, 0, textureSize.height, filterArea.x, filterArea.y);
	  var worldTransform = sprite.worldTransform.copy(Matrix.TEMP_MATRIX);
	  worldTransform.invert();
	  mappedMatrix.prepend(worldTransform);
	  mappedMatrix.scale(1.0 / orig.width, 1.0 / orig.height);
	  mappedMatrix.translate(sprite.anchor.x, sprite.anchor.y);
	  return mappedMatrix;
	}

	var FilterState = function () {
	  function FilterState() {
	    classCallCheck(this, FilterState);
	    this.renderTarget = null;
	    this.target = null;
	    this.resolution = 1;
	    this.sourceFrame = new Rectangle();
	    this.destinationFrame = new Rectangle();
	    this.filters = [];
	  }
	  createClass(FilterState, [{
	    key: 'clear',
	    value: function clear() {
	      this.filters = null;
	      this.target = null;
	      this.renderTarget = null;
	    }
	  }]);
	  return FilterState;
	}();
	var screenKey = 'screen';
	var FilterManager = function (_WebGLManager) {
	  inherits(FilterManager, _WebGLManager);
	  function FilterManager(renderer) {
	    classCallCheck(this, FilterManager);
	    var _this = possibleConstructorReturn(this, (FilterManager.__proto__ || Object.getPrototypeOf(FilterManager)).call(this, renderer));
	    _this.gl = _this.renderer.gl;
	    _this.quad = new Quad(_this.gl, renderer.state.attribState);
	    _this.shaderCache = {};
	    _this.pool = {};
	    _this.filterData = null;
	    _this.managedFilters = [];
	    _this.renderer.on('prerender', _this.onPrerender, _this);
	    _this._screenWidth = renderer.view.width;
	    _this._screenHeight = renderer.view.height;
	    return _this;
	  }
	  createClass(FilterManager, [{
	    key: 'pushFilter',
	    value: function pushFilter(target, filters) {
	      var renderer = this.renderer;
	      var filterData = this.filterData;
	      if (!filterData) {
	        filterData = this.renderer._activeRenderTarget.filterStack;
	        var filterState = new FilterState();
	        filterState.sourceFrame = filterState.destinationFrame = this.renderer._activeRenderTarget.size;
	        filterState.renderTarget = renderer._activeRenderTarget;
	        this.renderer._activeRenderTarget.filterData = filterData = {
	          index: 0,
	          stack: [filterState]
	        };
	        this.filterData = filterData;
	      }
	      var currentState = filterData.stack[++filterData.index];
	      var renderTargetFrame = filterData.stack[0].destinationFrame;
	      if (!currentState) {
	        currentState = filterData.stack[filterData.index] = new FilterState();
	      }
	      var fullScreen = target.filterArea && target.filterArea.x === 0 && target.filterArea.y === 0 && target.filterArea.width === renderer.screen.width && target.filterArea.height === renderer.screen.height;
	      var resolution = filters[0].resolution;
	      var padding = filters[0].padding | 0;
	      var targetBounds = fullScreen ? renderer.screen : target.filterArea || target.getBounds(true);
	      var sourceFrame = currentState.sourceFrame;
	      var destinationFrame = currentState.destinationFrame;
	      sourceFrame.x = (targetBounds.x * resolution | 0) / resolution;
	      sourceFrame.y = (targetBounds.y * resolution | 0) / resolution;
	      sourceFrame.width = (targetBounds.width * resolution | 0) / resolution;
	      sourceFrame.height = (targetBounds.height * resolution | 0) / resolution;
	      if (!fullScreen) {
	        if (filterData.stack[0].renderTarget.transform) ; else if (filters[0].autoFit) {
	          sourceFrame.fit(renderTargetFrame);
	        }
	        sourceFrame.pad(padding);
	      }
	      destinationFrame.width = sourceFrame.width;
	      destinationFrame.height = sourceFrame.height;
	      var renderTarget = this.getPotRenderTarget(renderer.gl, sourceFrame.width, sourceFrame.height, resolution);
	      currentState.target = target;
	      currentState.filters = filters;
	      currentState.resolution = resolution;
	      currentState.renderTarget = renderTarget;
	      renderTarget.setFrame(destinationFrame, sourceFrame);
	      renderer.bindRenderTarget(renderTarget);
	      renderTarget.clear();
	    }
	  }, {
	    key: 'popFilter',
	    value: function popFilter() {
	      var filterData = this.filterData;
	      var lastState = filterData.stack[filterData.index - 1];
	      var currentState = filterData.stack[filterData.index];
	      this.quad.map(currentState.renderTarget.size, currentState.sourceFrame).upload();
	      var filters = currentState.filters;
	      if (filters.length === 1) {
	        filters[0].apply(this, currentState.renderTarget, lastState.renderTarget, false, currentState);
	        this.freePotRenderTarget(currentState.renderTarget);
	      } else {
	        var flip = currentState.renderTarget;
	        var flop = this.getPotRenderTarget(this.renderer.gl, currentState.sourceFrame.width, currentState.sourceFrame.height, currentState.resolution);
	        flop.setFrame(currentState.destinationFrame, currentState.sourceFrame);
	        flop.clear();
	        var i = 0;
	        for (i = 0; i < filters.length - 1; ++i) {
	          filters[i].apply(this, flip, flop, true, currentState);
	          var t = flip;
	          flip = flop;
	          flop = t;
	        }
	        filters[i].apply(this, flip, lastState.renderTarget, false, currentState);
	        this.freePotRenderTarget(flip);
	        this.freePotRenderTarget(flop);
	      }
	      currentState.clear();
	      filterData.index--;
	      if (filterData.index === 0) {
	        this.filterData = null;
	      }
	    }
	  }, {
	    key: 'applyFilter',
	    value: function applyFilter(filter, input, output, clear) {
	      var renderer = this.renderer;
	      var gl = renderer.gl;
	      var shader = filter.glShaders[renderer.CONTEXT_UID];
	      if (!shader) {
	        if (filter.glShaderKey) {
	          shader = this.shaderCache[filter.glShaderKey];
	          if (!shader) {
	            shader = new Shader$1(this.gl, filter.vertexSrc, filter.fragmentSrc);
	            filter.glShaders[renderer.CONTEXT_UID] = this.shaderCache[filter.glShaderKey] = shader;
	            this.managedFilters.push(filter);
	          }
	        } else {
	          shader = filter.glShaders[renderer.CONTEXT_UID] = new Shader$1(this.gl, filter.vertexSrc, filter.fragmentSrc);
	          this.managedFilters.push(filter);
	        }
	        renderer.bindVao(null);
	        this.quad.initVao(shader);
	      }
	      renderer.bindVao(this.quad.vao);
	      renderer.bindRenderTarget(output);
	      if (clear) {
	        gl.disable(gl.SCISSOR_TEST);
	        renderer.clear();
	        gl.enable(gl.SCISSOR_TEST);
	      }
	      if (output === renderer.maskManager.scissorRenderTarget) {
	        renderer.maskManager.pushScissorMask(null, renderer.maskManager.scissorData);
	      }
	      renderer.bindShader(shader);
	      var tex = this.renderer.emptyTextures[0];
	      this.renderer.boundTextures[0] = tex;
	      this.syncUniforms(shader, filter);
	      renderer.state.setBlendMode(filter.blendMode);
	      gl.activeTexture(gl.TEXTURE0);
	      gl.bindTexture(gl.TEXTURE_2D, input.texture.texture);
	      this.quad.vao.draw(this.renderer.gl.TRIANGLES, 6, 0);
	      gl.bindTexture(gl.TEXTURE_2D, tex._glTextures[this.renderer.CONTEXT_UID].texture);
	    }
	  }, {
	    key: 'syncUniforms',
	    value: function syncUniforms(shader, filter) {
	      var uniformData = filter.uniformData;
	      var uniforms = filter.uniforms;
	      var textureCount = 1;
	      var currentState = void 0;
	      if (shader.uniforms.filterArea) {
	        currentState = this.filterData.stack[this.filterData.index];
	        var filterArea = shader.uniforms.filterArea;
	        filterArea[0] = currentState.renderTarget.size.width;
	        filterArea[1] = currentState.renderTarget.size.height;
	        filterArea[2] = currentState.sourceFrame.x;
	        filterArea[3] = currentState.sourceFrame.y;
	        shader.uniforms.filterArea = filterArea;
	      }
	      if (shader.uniforms.filterClamp) {
	        currentState = currentState || this.filterData.stack[this.filterData.index];
	        var filterClamp = shader.uniforms.filterClamp;
	        filterClamp[0] = 0;
	        filterClamp[1] = 0;
	        filterClamp[2] = (currentState.sourceFrame.width - 1) / currentState.renderTarget.size.width;
	        filterClamp[3] = (currentState.sourceFrame.height - 1) / currentState.renderTarget.size.height;
	        shader.uniforms.filterClamp = filterClamp;
	      }
	      for (var i in uniformData) {
	        var type = uniformData[i].type;
	        if (type === 'sampler2d' && uniforms[i] !== 0) {
	          if (uniforms[i].baseTexture) {
	            shader.uniforms[i] = this.renderer.bindTexture(uniforms[i].baseTexture, textureCount);
	          } else {
	            shader.uniforms[i] = textureCount;
	            var gl = this.renderer.gl;
	            this.renderer.boundTextures[textureCount] = this.renderer.emptyTextures[textureCount];
	            gl.activeTexture(gl.TEXTURE0 + textureCount);
	            uniforms[i].texture.bind();
	          }
	          textureCount++;
	        } else if (type === 'mat3') {
	          if (uniforms[i].a !== undefined) {
	            shader.uniforms[i] = uniforms[i].toArray(true);
	          } else {
	            shader.uniforms[i] = uniforms[i];
	          }
	        } else if (type === 'vec2') {
	          if (uniforms[i].x !== undefined) {
	            var val = shader.uniforms[i] || new Float32Array(2);
	            val[0] = uniforms[i].x;
	            val[1] = uniforms[i].y;
	            shader.uniforms[i] = val;
	          } else {
	            shader.uniforms[i] = uniforms[i];
	          }
	        } else if (type === 'float') {
	          if (shader.uniforms.data[i].value !== uniformData[i]) {
	            shader.uniforms[i] = uniforms[i];
	          }
	        } else {
	          shader.uniforms[i] = uniforms[i];
	        }
	      }
	    }
	  }, {
	    key: 'getRenderTarget',
	    value: function getRenderTarget(clear, resolution) {
	      var currentState = this.filterData.stack[this.filterData.index];
	      var renderTarget = this.getPotRenderTarget(this.renderer.gl, currentState.sourceFrame.width, currentState.sourceFrame.height, resolution || currentState.resolution);
	      renderTarget.setFrame(currentState.destinationFrame, currentState.sourceFrame);
	      return renderTarget;
	    }
	  }, {
	    key: 'returnRenderTarget',
	    value: function returnRenderTarget(renderTarget) {
	      this.freePotRenderTarget(renderTarget);
	    }
	  }, {
	    key: 'calculateScreenSpaceMatrix',
	    value: function calculateScreenSpaceMatrix$$1(outputMatrix) {
	      var currentState = this.filterData.stack[this.filterData.index];
	      return calculateScreenSpaceMatrix(outputMatrix, currentState.sourceFrame, currentState.renderTarget.size);
	    }
	  }, {
	    key: 'calculateNormalizedScreenSpaceMatrix',
	    value: function calculateNormalizedScreenSpaceMatrix$$1(outputMatrix) {
	      var currentState = this.filterData.stack[this.filterData.index];
	      return calculateNormalizedScreenSpaceMatrix(outputMatrix, currentState.sourceFrame, currentState.renderTarget.size, currentState.destinationFrame);
	    }
	  }, {
	    key: 'calculateSpriteMatrix',
	    value: function calculateSpriteMatrix$$1(outputMatrix, sprite) {
	      var currentState = this.filterData.stack[this.filterData.index];
	      return calculateSpriteMatrix(outputMatrix, currentState.sourceFrame, currentState.renderTarget.size, sprite);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var contextLost = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	      var renderer = this.renderer;
	      var filters = this.managedFilters;
	      renderer.off('prerender', this.onPrerender, this);
	      for (var i = 0; i < filters.length; i++) {
	        if (!contextLost) {
	          filters[i].glShaders[renderer.CONTEXT_UID].destroy();
	        }
	        delete filters[i].glShaders[renderer.CONTEXT_UID];
	      }
	      this.shaderCache = {};
	      if (!contextLost) {
	        this.emptyPool();
	      } else {
	        this.pool = {};
	      }
	    }
	  }, {
	    key: 'getPotRenderTarget',
	    value: function getPotRenderTarget(gl, minWidth, minHeight, resolution) {
	      var key = screenKey;
	      minWidth *= resolution;
	      minHeight *= resolution;
	      if (minWidth !== this._screenWidth || minHeight !== this._screenHeight) {
	        minWidth = nextPow2(minWidth);
	        minHeight = nextPow2(minHeight);
	        key = (minWidth & 0xFFFF) << 16 | minHeight & 0xFFFF;
	      }
	      if (!this.pool[key]) {
	        this.pool[key] = [];
	      }
	      var renderTarget = this.pool[key].pop();
	      if (!renderTarget) {
	        var tex = this.renderer.boundTextures[0];
	        gl.activeTexture(gl.TEXTURE0);
	        renderTarget = new RenderTarget(gl, minWidth, minHeight, null, 1);
	        gl.bindTexture(gl.TEXTURE_2D, tex._glTextures[this.renderer.CONTEXT_UID].texture);
	      }
	      renderTarget.resolution = resolution;
	      renderTarget.defaultFrame.width = renderTarget.size.width = minWidth / resolution;
	      renderTarget.defaultFrame.height = renderTarget.size.height = minHeight / resolution;
	      renderTarget.filterPoolKey = key;
	      return renderTarget;
	    }
	  }, {
	    key: 'emptyPool',
	    value: function emptyPool() {
	      for (var i in this.pool) {
	        var textures = this.pool[i];
	        if (textures) {
	          for (var j = 0; j < textures.length; j++) {
	            textures[j].destroy(true);
	          }
	        }
	      }
	      this.pool = {};
	    }
	  }, {
	    key: 'freePotRenderTarget',
	    value: function freePotRenderTarget(renderTarget) {
	      this.pool[renderTarget.filterPoolKey].push(renderTarget);
	    }
	  }, {
	    key: 'onPrerender',
	    value: function onPrerender() {
	      if (this._screenWidth !== this.renderer.view.width || this._screenHeight !== this.renderer.view.height) {
	        this._screenWidth = this.renderer.view.width;
	        this._screenHeight = this.renderer.view.height;
	        var textures = this.pool[screenKey];
	        if (textures) {
	          for (var j = 0; j < textures.length; j++) {
	            textures[j].destroy(true);
	          }
	        }
	        this.pool[screenKey] = [];
	      }
	    }
	  }]);
	  return FilterManager;
	}(WebGLManager);

	var ObjectRenderer = function (_WebGLManager) {
	  inherits(ObjectRenderer, _WebGLManager);
	  function ObjectRenderer() {
	    classCallCheck(this, ObjectRenderer);
	    return possibleConstructorReturn(this, (ObjectRenderer.__proto__ || Object.getPrototypeOf(ObjectRenderer)).apply(this, arguments));
	  }
	  createClass(ObjectRenderer, [{
	    key: 'start',
	    value: function start() {}
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.flush();
	    }
	  }, {
	    key: 'flush',
	    value: function flush() {}
	  }, {
	    key: 'render',
	    value: function render(object) {}
	  }]);
	  return ObjectRenderer;
	}(WebGLManager);

	var TextureManager = function () {
	  function TextureManager(renderer) {
	    classCallCheck(this, TextureManager);
	    this.renderer = renderer;
	    this.gl = renderer.gl;
	    this._managedTextures = [];
	  }
	  createClass(TextureManager, [{
	    key: 'bindTexture',
	    value: function bindTexture() {}
	  }, {
	    key: 'getTexture',
	    value: function getTexture() {}
	  }, {
	    key: 'updateTexture',
	    value: function updateTexture(texture, location) {
	      var gl = this.gl;
	      var isRenderTexture = !!texture._glRenderTargets;
	      if (!texture.hasLoaded) {
	        return null;
	      }
	      var boundTextures = this.renderer.boundTextures;
	      if (location === undefined) {
	        location = 0;
	        for (var i = 0; i < boundTextures.length; ++i) {
	          if (boundTextures[i] === texture) {
	            location = i;
	            break;
	          }
	        }
	      }
	      boundTextures[location] = texture;
	      gl.activeTexture(gl.TEXTURE0 + location);
	      var glTexture = texture._glTextures[this.renderer.CONTEXT_UID];
	      if (!glTexture) {
	        if (isRenderTexture) {
	          var renderTarget = new RenderTarget(this.gl, texture.width, texture.height, texture.scaleMode, texture.resolution);
	          renderTarget.resize(texture.width, texture.height);
	          texture._glRenderTargets[this.renderer.CONTEXT_UID] = renderTarget;
	          glTexture = renderTarget.texture;
	        } else {
	          glTexture = new Texture$1(this.gl, null, null, null, null);
	          glTexture.bind(location);
	          glTexture.premultiplyAlpha = true;
	          glTexture.upload(texture.source);
	        }
	        texture._glTextures[this.renderer.CONTEXT_UID] = glTexture;
	        texture.on('update', this.updateTexture, this);
	        texture.on('dispose', this.destroyTexture, this);
	        this._managedTextures.push(texture);
	        if (texture.isPowerOfTwo) {
	          if (texture.mipmap) {
	            glTexture.enableMipmap();
	          }
	          if (texture.wrapMode === WRAP_MODES.CLAMP) {
	            glTexture.enableWrapClamp();
	          } else if (texture.wrapMode === WRAP_MODES.REPEAT) {
	            glTexture.enableWrapRepeat();
	          } else {
	            glTexture.enableWrapMirrorRepeat();
	          }
	        } else {
	          glTexture.enableWrapClamp();
	        }
	        if (texture.scaleMode === SCALE_MODES.NEAREST) {
	          glTexture.enableNearestScaling();
	        } else {
	          glTexture.enableLinearScaling();
	        }
	      } else if (isRenderTexture) {
	        texture._glRenderTargets[this.renderer.CONTEXT_UID].resize(texture.width, texture.height);
	      } else {
	        glTexture.upload(texture.source);
	      }
	      return glTexture;
	    }
	  }, {
	    key: 'destroyTexture',
	    value: function destroyTexture(texture, skipRemove) {
	      texture = texture.baseTexture || texture;
	      if (!texture.hasLoaded) {
	        return;
	      }
	      var uid = this.renderer.CONTEXT_UID;
	      var glTextures = texture._glTextures;
	      var glRenderTargets = texture._glRenderTargets;
	      if (glTextures[uid]) {
	        this.renderer.unbindTexture(texture);
	        glTextures[uid].destroy();
	        texture.off('update', this.updateTexture, this);
	        texture.off('dispose', this.destroyTexture, this);
	        delete glTextures[uid];
	        if (!skipRemove) {
	          var i = this._managedTextures.indexOf(texture);
	          if (i !== -1) {
	            removeItems(this._managedTextures, i, 1);
	          }
	        }
	      }
	      if (glRenderTargets && glRenderTargets[uid]) {
	        glRenderTargets[uid].destroy();
	        delete glRenderTargets[uid];
	      }
	    }
	  }, {
	    key: 'removeAll',
	    value: function removeAll() {
	      for (var i = 0; i < this._managedTextures.length; ++i) {
	        var texture = this._managedTextures[i];
	        if (texture._glTextures[this.renderer.CONTEXT_UID]) {
	          delete texture._glTextures[this.renderer.CONTEXT_UID];
	        }
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      for (var i = 0; i < this._managedTextures.length; ++i) {
	        var texture = this._managedTextures[i];
	        this.destroyTexture(texture, true);
	        texture.off('update', this.updateTexture, this);
	        texture.off('dispose', this.destroyTexture, this);
	      }
	      this._managedTextures = null;
	    }
	  }]);
	  return TextureManager;
	}();

	var TextureGarbageCollector = function () {
	  function TextureGarbageCollector(renderer) {
	    classCallCheck(this, TextureGarbageCollector);
	    this.renderer = renderer;
	    this.count = 0;
	    this.checkCount = 0;
	    this.maxIdle = settings.GC_MAX_IDLE;
	    this.checkCountMax = settings.GC_MAX_CHECK_COUNT;
	    this.mode = settings.GC_MODE;
	  }
	  createClass(TextureGarbageCollector, [{
	    key: 'update',
	    value: function update() {
	      this.count++;
	      if (this.mode === GC_MODES.MANUAL) {
	        return;
	      }
	      this.checkCount++;
	      if (this.checkCount > this.checkCountMax) {
	        this.checkCount = 0;
	        this.run();
	      }
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      var tm = this.renderer.textureManager;
	      var managedTextures = tm._managedTextures;
	      var wasRemoved = false;
	      for (var i = 0; i < managedTextures.length; i++) {
	        var texture = managedTextures[i];
	        if (!texture._glRenderTargets && this.count - texture.touched > this.maxIdle) {
	          tm.destroyTexture(texture, true);
	          managedTextures[i] = null;
	          wasRemoved = true;
	        }
	      }
	      if (wasRemoved) {
	        var j = 0;
	        for (var _i = 0; _i < managedTextures.length; _i++) {
	          if (managedTextures[_i] !== null) {
	            managedTextures[j++] = managedTextures[_i];
	          }
	        }
	        managedTextures.length = j;
	      }
	    }
	  }, {
	    key: 'unload',
	    value: function unload(displayObject) {
	      var tm = this.renderer.textureManager;
	      if (displayObject._texture && displayObject._texture._glRenderTargets) {
	        tm.destroyTexture(displayObject._texture, true);
	      }
	      for (var i = displayObject.children.length - 1; i >= 0; i--) {
	        this.unload(displayObject.children[i]);
	      }
	    }
	  }]);
	  return TextureGarbageCollector;
	}();

	function mapWebGLBlendModesToTiny(gl) {
	  var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  array[BLEND_MODES.NORMAL] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.ADD] = [gl.ONE, gl.DST_ALPHA];
	  array[BLEND_MODES.MULTIPLY] = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.SCREEN] = [gl.ONE, gl.ONE_MINUS_SRC_COLOR];
	  array[BLEND_MODES.OVERLAY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.DARKEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.LIGHTEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.COLOR_DODGE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.COLOR_BURN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.HARD_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.SOFT_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.DIFFERENCE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.EXCLUSION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.HUE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.SATURATION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.COLOR] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.LUMINOSITY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.NORMAL_NPM] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
	  array[BLEND_MODES.ADD_NPM] = [gl.SRC_ALPHA, gl.DST_ALPHA, gl.ONE, gl.DST_ALPHA];
	  array[BLEND_MODES.SCREEN_NPM] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_COLOR];
	  return array;
	}

	var BLEND = 0;
	var DEPTH_TEST = 1;
	var FRONT_FACE = 2;
	var CULL_FACE = 3;
	var BLEND_FUNC = 4;
	var WebGLState = function () {
	  function WebGLState(gl) {
	    classCallCheck(this, WebGLState);
	    this.activeState = new Uint8Array(16);
	    this.defaultState = new Uint8Array(16);
	    this.defaultState[0] = 1;
	    this.stackIndex = 0;
	    this.stack = [];
	    this.gl = gl;
	    this.maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
	    this.attribState = {
	      tempAttribState: new Array(this.maxAttribs),
	      attribState: new Array(this.maxAttribs)
	    };
	    this.blendModes = mapWebGLBlendModesToTiny(gl);
	    this.nativeVaoExtension = gl.getExtension('OES_vertex_array_object') || gl.getExtension('MOZ_OES_vertex_array_object') || gl.getExtension('WEBKIT_OES_vertex_array_object');
	  }
	  createClass(WebGLState, [{
	    key: 'push',
	    value: function push() {
	      var state = this.stack[this.stackIndex];
	      if (!state) {
	        state = this.stack[this.stackIndex] = new Uint8Array(16);
	      }
	      ++this.stackIndex;
	      for (var i = 0; i < this.activeState.length; i++) {
	        state[i] = this.activeState[i];
	      }
	    }
	  }, {
	    key: 'pop',
	    value: function pop() {
	      var state = this.stack[--this.stackIndex];
	      this.setState(state);
	    }
	  }, {
	    key: 'setState',
	    value: function setState(state) {
	      this.setBlend(state[BLEND]);
	      this.setDepthTest(state[DEPTH_TEST]);
	      this.setFrontFace(state[FRONT_FACE]);
	      this.setCullFace(state[CULL_FACE]);
	      this.setBlendMode(state[BLEND_FUNC]);
	    }
	  }, {
	    key: 'setBlend',
	    value: function setBlend(value) {
	      value = value ? 1 : 0;
	      if (this.activeState[BLEND] === value) {
	        return;
	      }
	      this.activeState[BLEND] = value;
	      this.gl[value ? 'enable' : 'disable'](this.gl.BLEND);
	    }
	  }, {
	    key: 'setBlendMode',
	    value: function setBlendMode(value) {
	      if (value === this.activeState[BLEND_FUNC]) {
	        return;
	      }
	      this.activeState[BLEND_FUNC] = value;
	      var mode = this.blendModes[value];
	      if (mode.length === 2) {
	        this.gl.blendFunc(mode[0], mode[1]);
	      } else {
	        this.gl.blendFuncSeparate(mode[0], mode[1], mode[2], mode[3]);
	      }
	    }
	  }, {
	    key: 'setDepthTest',
	    value: function setDepthTest(value) {
	      value = value ? 1 : 0;
	      if (this.activeState[DEPTH_TEST] === value) {
	        return;
	      }
	      this.activeState[DEPTH_TEST] = value;
	      this.gl[value ? 'enable' : 'disable'](this.gl.DEPTH_TEST);
	    }
	  }, {
	    key: 'setCullFace',
	    value: function setCullFace(value) {
	      value = value ? 1 : 0;
	      if (this.activeState[CULL_FACE] === value) {
	        return;
	      }
	      this.activeState[CULL_FACE] = value;
	      this.gl[value ? 'enable' : 'disable'](this.gl.CULL_FACE);
	    }
	  }, {
	    key: 'setFrontFace',
	    value: function setFrontFace(value) {
	      value = value ? 1 : 0;
	      if (this.activeState[FRONT_FACE] === value) {
	        return;
	      }
	      this.activeState[FRONT_FACE] = value;
	      this.gl.frontFace(this.gl[value ? 'CW' : 'CCW']);
	    }
	  }, {
	    key: 'resetAttributes',
	    value: function resetAttributes() {
	      for (var i = 0; i < this.attribState.tempAttribState.length; i++) {
	        this.attribState.tempAttribState[i] = 0;
	      }
	      for (var _i = 0; _i < this.attribState.attribState.length; _i++) {
	        this.attribState.attribState[_i] = 0;
	      }
	      for (var _i2 = 1; _i2 < this.maxAttribs; _i2++) {
	        this.gl.disableVertexAttribArray(_i2);
	      }
	    }
	  }, {
	    key: 'resetToDefault',
	    value: function resetToDefault() {
	      if (this.nativeVaoExtension) {
	        this.nativeVaoExtension.bindVertexArrayOES(null);
	      }
	      this.resetAttributes();
	      for (var i = 0; i < this.activeState.length; ++i) {
	        this.activeState[i] = 32;
	      }
	      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
	      this.setState(this.defaultState);
	    }
	  }]);
	  return WebGLState;
	}();

	function mapWebGLDrawModesToTiny(gl) {
	  var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  object[DRAW_MODES.POINTS] = gl.POINTS;
	  object[DRAW_MODES.LINES] = gl.LINES;
	  object[DRAW_MODES.LINE_LOOP] = gl.LINE_LOOP;
	  object[DRAW_MODES.LINE_STRIP] = gl.LINE_STRIP;
	  object[DRAW_MODES.TRIANGLES] = gl.TRIANGLES;
	  object[DRAW_MODES.TRIANGLE_STRIP] = gl.TRIANGLE_STRIP;
	  object[DRAW_MODES.TRIANGLE_FAN] = gl.TRIANGLE_FAN;
	  return object;
	}

	function validateContext(gl) {
	  var attributes = gl.getContextAttributes();
	  if (!attributes.stencil) {
	    console.warn('Provided WebGL context does not have a stencil buffer, masks may not render correctly');
	  }
	}

	var CONTEXT_UID = 0;
	var WebGLRenderer = function (_SystemRenderer) {
	  inherits(WebGLRenderer, _SystemRenderer);
	  function WebGLRenderer(width, height, options) {
	    classCallCheck(this, WebGLRenderer);
	    var _this = possibleConstructorReturn(this, (WebGLRenderer.__proto__ || Object.getPrototypeOf(WebGLRenderer)).call(this, 'WebGL', width, height, options));
	    _this.legacy = _this.options.legacy;
	    if (_this.legacy) {
	      glCore.VertexArrayObject.FORCE_NATIVE = true;
	    }
	    _this.type = RENDERER_TYPE.WEBGL;
	    _this.handleContextLost = _this.handleContextLost.bind(_this);
	    _this.handleContextRestored = _this.handleContextRestored.bind(_this);
	    _this.view.addEventListener('webglcontextlost', _this.handleContextLost, false);
	    _this.view.addEventListener('webglcontextrestored', _this.handleContextRestored, false);
	    _this._contextOptions = Object.assign({
	      alpha: _this.transparent,
	      antialias: _this.options.antialias,
	      premultipliedAlpha: _this.transparent && _this.transparent !== 'notMultiplied',
	      stencil: true,
	      preserveDrawingBuffer: _this.options.preserveDrawingBuffer,
	      powerPreference: _this.options.powerPreference
	    }, config.extraContextAttributes || {});
	    _this._backgroundColorRgba[3] = _this.transparent ? 0 : 1;
	    _this.maskManager = new MaskManager(_this);
	    _this.stencilManager = new StencilManager(_this);
	    _this.emptyRenderer = new ObjectRenderer(_this);
	    _this.currentRenderer = _this.emptyRenderer;
	    _this.textureManager = null;
	    _this.filterManager = null;
	    _this.initPlugins();
	    if (_this.options.context) {
	      validateContext(_this.options.context);
	    }
	    _this.gl = _this.options.context || glCore.createContext(_this.view, _this._contextOptions);
	    _this.CONTEXT_UID = CONTEXT_UID++;
	    _this.state = new WebGLState(_this.gl);
	    _this.renderingToScreen = true;
	    _this.boundTextures = null;
	    _this._activeShader = null;
	    _this._activeVao = null;
	    _this._activeRenderTarget = null;
	    _this._initContext();
	    _this.drawModes = mapWebGLDrawModesToTiny(_this.gl);
	    _this._nextTextureLocation = 0;
	    _this.setBlendMode(0);
	    return _this;
	  }
	  createClass(WebGLRenderer, [{
	    key: '_initContext',
	    value: function _initContext() {
	      var gl = this.gl;
	      if (gl.isContextLost() && gl.getExtension('WEBGL_lose_context')) {
	        gl.getExtension('WEBGL_lose_context').restoreContext();
	      }
	      var maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
	      this._activeShader = null;
	      this._activeVao = null;
	      this.boundTextures = new Array(maxTextures);
	      this.emptyTextures = new Array(maxTextures);
	      this.textureManager = new TextureManager(this);
	      this.filterManager = new FilterManager(this);
	      this.textureGC = new TextureGarbageCollector(this);
	      this.state.resetToDefault();
	      this.rootRenderTarget = new RenderTarget(gl, this.width, this.height, null, this.resolution, true);
	      this.rootRenderTarget.clearColor = this._backgroundColorRgba;
	      this.bindRenderTarget(this.rootRenderTarget);
	      var emptyGLTexture = new glCore.GLTexture.fromData(gl, null, 1, 1);
	      var tempObj = { _glTextures: {} };
	      tempObj._glTextures[this.CONTEXT_UID] = {};
	      for (var i = 0; i < maxTextures; i++) {
	        var empty = new BaseTexture();
	        empty._glTextures[this.CONTEXT_UID] = emptyGLTexture;
	        this.boundTextures[i] = tempObj;
	        this.emptyTextures[i] = empty;
	        this.bindTexture(null, i);
	      }
	      this.emit('context', gl);
	      this.resize(this.screen.width, this.screen.height);
	    }
	  }, {
	    key: 'render',
	    value: function render(displayObject, renderTexture, clear, transform, skipUpdateTransform) {
	      this.renderingToScreen = !renderTexture;
	      this.emit('prerender');
	      if (!this.gl || this.gl.isContextLost()) {
	        return;
	      }
	      this._nextTextureLocation = 0;
	      if (!renderTexture) {
	        this._lastObjectRendered = displayObject;
	      }
	      if (!skipUpdateTransform) {
	        var cacheParent = displayObject.parent;
	        displayObject.parent = this._tempDisplayObjectParent;
	        displayObject.updateTransform();
	        displayObject.parent = cacheParent;
	      }
	      this.bindRenderTexture(renderTexture, transform);
	      this.currentRenderer.start();
	      if (clear !== undefined ? clear : this.clearBeforeRender) {
	        this._activeRenderTarget.clear();
	      }
	      displayObject.renderWebGL(this);
	      this.currentRenderer.flush();
	      this.textureGC.update();
	      this.emit('postrender');
	    }
	  }, {
	    key: 'setObjectRenderer',
	    value: function setObjectRenderer(objectRenderer) {
	      if (this.currentRenderer === objectRenderer) {
	        return;
	      }
	      this.currentRenderer.stop();
	      this.currentRenderer = objectRenderer;
	      this.currentRenderer.start();
	    }
	  }, {
	    key: 'flush',
	    value: function flush() {
	      this.setObjectRenderer(this.emptyRenderer);
	    }
	  }, {
	    key: 'resize',
	    value: function resize(screenWidth, screenHeight) {
	      SystemRenderer.prototype.resize.call(this, screenWidth, screenHeight);
	      this.rootRenderTarget.resize(screenWidth, screenHeight);
	      if (this._activeRenderTarget === this.rootRenderTarget) {
	        this.rootRenderTarget.activate();
	        if (this._activeShader) {
	          this._activeShader.uniforms.projectionMatrix = this.rootRenderTarget.projectionMatrix.toArray(true);
	        }
	      }
	    }
	  }, {
	    key: 'setBlendMode',
	    value: function setBlendMode(blendMode) {
	      this.state.setBlendMode(blendMode);
	    }
	  }, {
	    key: 'clear',
	    value: function clear(clearColor) {
	      this._activeRenderTarget.clear(clearColor);
	    }
	  }, {
	    key: 'setTransform',
	    value: function setTransform(matrix) {
	      this._activeRenderTarget.transform = matrix;
	    }
	  }, {
	    key: 'clearRenderTexture',
	    value: function clearRenderTexture(renderTexture, clearColor) {
	      var baseTexture = renderTexture.baseTexture;
	      var renderTarget = baseTexture._glRenderTargets[this.CONTEXT_UID];
	      if (renderTarget) {
	        renderTarget.clear(clearColor);
	      }
	      return this;
	    }
	  }, {
	    key: 'bindRenderTexture',
	    value: function bindRenderTexture(renderTexture, transform) {
	      var renderTarget = void 0;
	      if (renderTexture) {
	        var baseTexture = renderTexture.baseTexture;
	        if (!baseTexture._glRenderTargets[this.CONTEXT_UID]) {
	          this.textureManager.updateTexture(baseTexture, 0);
	        }
	        this.unbindTexture(baseTexture);
	        renderTarget = baseTexture._glRenderTargets[this.CONTEXT_UID];
	        renderTarget.setFrame(renderTexture.frame);
	      } else {
	        renderTarget = this.rootRenderTarget;
	      }
	      renderTarget.transform = transform;
	      this.bindRenderTarget(renderTarget);
	      return this;
	    }
	  }, {
	    key: 'bindRenderTarget',
	    value: function bindRenderTarget(renderTarget) {
	      if (renderTarget !== this._activeRenderTarget) {
	        this._activeRenderTarget = renderTarget;
	        renderTarget.activate();
	        if (this._activeShader) {
	          this._activeShader.uniforms.projectionMatrix = renderTarget.projectionMatrix.toArray(true);
	        }
	        this.stencilManager.setMaskStack(renderTarget.stencilMaskStack);
	      }
	      return this;
	    }
	  }, {
	    key: 'bindShader',
	    value: function bindShader(shader, autoProject) {
	      if (this._activeShader !== shader) {
	        this._activeShader = shader;
	        shader.bind();
	        if (autoProject !== false) {
	          shader.uniforms.projectionMatrix = this._activeRenderTarget.projectionMatrix.toArray(true);
	        }
	      }
	      return this;
	    }
	  }, {
	    key: 'bindTexture',
	    value: function bindTexture(texture, location, forceLocation) {
	      texture = texture || this.emptyTextures[location];
	      texture = texture.baseTexture || texture;
	      texture.touched = this.textureGC.count;
	      if (!forceLocation) {
	        for (var i = 0; i < this.boundTextures.length; i++) {
	          if (this.boundTextures[i] === texture) {
	            return i;
	          }
	        }
	        if (location === undefined) {
	          this._nextTextureLocation++;
	          this._nextTextureLocation %= this.boundTextures.length;
	          location = this.boundTextures.length - this._nextTextureLocation - 1;
	        }
	      } else {
	        location = location || 0;
	      }
	      var gl = this.gl;
	      var glTexture = texture._glTextures[this.CONTEXT_UID];
	      if (!glTexture) {
	        this.textureManager.updateTexture(texture, location);
	      } else {
	        this.boundTextures[location] = texture;
	        gl.activeTexture(gl.TEXTURE0 + location);
	        gl.bindTexture(gl.TEXTURE_2D, glTexture.texture);
	      }
	      return location;
	    }
	  }, {
	    key: 'unbindTexture',
	    value: function unbindTexture(texture) {
	      var gl = this.gl;
	      texture = texture.baseTexture || texture;
	      for (var i = 0; i < this.boundTextures.length; i++) {
	        if (this.boundTextures[i] === texture) {
	          this.boundTextures[i] = this.emptyTextures[i];
	          gl.activeTexture(gl.TEXTURE0 + i);
	          gl.bindTexture(gl.TEXTURE_2D, this.emptyTextures[i]._glTextures[this.CONTEXT_UID].texture);
	        }
	      }
	      return this;
	    }
	  }, {
	    key: 'createVao',
	    value: function createVao() {
	      return new glCore.VertexArrayObject(this.gl, this.state.attribState);
	    }
	  }, {
	    key: 'bindVao',
	    value: function bindVao(vao) {
	      if (this._activeVao === vao) {
	        return this;
	      }
	      if (vao) {
	        vao.bind();
	      } else if (this._activeVao) {
	        this._activeVao.unbind();
	      }
	      this._activeVao = vao;
	      return this;
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.setObjectRenderer(this.emptyRenderer);
	      this.bindVao(null);
	      this._activeShader = null;
	      this._activeRenderTarget = this.rootRenderTarget;
	      for (var i = 0; i < this.boundTextures.length; i++) {
	        this.boundTextures[i] = this.emptyTextures[i];
	      }
	      this.rootRenderTarget.activate();
	      this.state.resetToDefault();
	      return this;
	    }
	  }, {
	    key: 'handleContextLost',
	    value: function handleContextLost(event) {
	      event.preventDefault();
	    }
	  }, {
	    key: 'handleContextRestored',
	    value: function handleContextRestored() {
	      this.textureManager.removeAll();
	      this.filterManager.destroy(true);
	      this._initContext();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(removeView) {
	      this.destroyPlugins();
	      this.view.removeEventListener('webglcontextlost', this.handleContextLost);
	      this.view.removeEventListener('webglcontextrestored', this.handleContextRestored);
	      this.textureManager.destroy();
	      get(WebGLRenderer.prototype.__proto__ || Object.getPrototypeOf(WebGLRenderer.prototype), 'destroy', this).call(this, removeView);
	      this.uid = 0;
	      this.maskManager.destroy();
	      this.stencilManager.destroy();
	      this.filterManager.destroy();
	      this.maskManager = null;
	      this.filterManager = null;
	      this.textureManager = null;
	      this.currentRenderer = null;
	      this.handleContextLost = null;
	      this.handleContextRestored = null;
	      this._contextOptions = null;
	      this.gl.useProgram(null);
	      if (this.gl.getExtension('WEBGL_lose_context')) {
	        this.gl.getExtension('WEBGL_lose_context').loseContext();
	      }
	      this.gl = null;
	    }
	  }]);
	  return WebGLRenderer;
	}(SystemRenderer);
	pluginTarget$1.mixin(WebGLRenderer);

	var tempPoint = new Point();
	var Sprite = function (_Container) {
	  inherits(Sprite, _Container);
	  function Sprite(texture) {
	    classCallCheck(this, Sprite);
	    var _this = possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this));
	    _this._anchor = new ObservablePoint(_this._onAnchorUpdate, _this, texture ? texture.defaultAnchor.x : 0, texture ? texture.defaultAnchor.y : 0);
	    _this._texture = null;
	    _this._width = 0;
	    _this._height = 0;
	    _this._tint = null;
	    _this._tintRGB = null;
	    _this.tint = 0xFFFFFF;
	    _this.blendMode = BLEND_MODES.NORMAL;
	    _this.shader = null;
	    _this.cachedTint = 0xFFFFFF;
	    _this.texture = texture || Texture.EMPTY;
	    _this.vertexData = new Float32Array(8);
	    _this.vertexTrimmedData = null;
	    _this._transformID = -1;
	    _this._textureID = -1;
	    _this._transformTrimmedID = -1;
	    _this._textureTrimmedID = -1;
	    _this.pluginName = 'sprite';
	    return _this;
	  }
	  createClass(Sprite, [{
	    key: '_onTextureUpdate',
	    value: function _onTextureUpdate() {
	      this._textureID = -1;
	      this._textureTrimmedID = -1;
	      this.cachedTint = 0xFFFFFF;
	      if (this._width) {
	        this.scale.x = Math.sign(this.scale.x) * this._width / this._texture.orig.width;
	      }
	      if (this._height) {
	        this.scale.y = Math.sign(this.scale.y) * this._height / this._texture.orig.height;
	      }
	    }
	  }, {
	    key: '_onAnchorUpdate',
	    value: function _onAnchorUpdate() {
	      this._transformID = -1;
	      this._transformTrimmedID = -1;
	    }
	  }, {
	    key: 'calculateVertices',
	    value: function calculateVertices() {
	      if (this._transformID === this.transform._worldID && this._textureID === this._texture._updateID) {
	        return;
	      }
	      this._transformID = this.transform._worldID;
	      this._textureID = this._texture._updateID;
	      var texture = this._texture;
	      var wt = this.transform.worldTransform;
	      var a = wt.a;
	      var b = wt.b;
	      var c = wt.c;
	      var d = wt.d;
	      var tx = wt.tx;
	      var ty = wt.ty;
	      var vertexData = this.vertexData;
	      var trim = texture.trim;
	      var orig = texture.orig;
	      var anchor = this._anchor;
	      var w0 = 0;
	      var w1 = 0;
	      var h0 = 0;
	      var h1 = 0;
	      if (trim) {
	        w1 = trim.x - anchor._x * orig.width;
	        w0 = w1 + trim.width;
	        h1 = trim.y - anchor._y * orig.height;
	        h0 = h1 + trim.height;
	      } else {
	        w1 = -anchor._x * orig.width;
	        w0 = w1 + orig.width;
	        h1 = -anchor._y * orig.height;
	        h0 = h1 + orig.height;
	      }
	      vertexData[0] = a * w1 + c * h1 + tx;
	      vertexData[1] = d * h1 + b * w1 + ty;
	      vertexData[2] = a * w0 + c * h1 + tx;
	      vertexData[3] = d * h1 + b * w0 + ty;
	      vertexData[4] = a * w0 + c * h0 + tx;
	      vertexData[5] = d * h0 + b * w0 + ty;
	      vertexData[6] = a * w1 + c * h0 + tx;
	      vertexData[7] = d * h0 + b * w1 + ty;
	    }
	  }, {
	    key: 'calculateTrimmedVertices',
	    value: function calculateTrimmedVertices() {
	      if (!this.vertexTrimmedData) {
	        this.vertexTrimmedData = new Float32Array(8);
	      } else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID) {
	        return;
	      }
	      this._transformTrimmedID = this.transform._worldID;
	      this._textureTrimmedID = this._texture._updateID;
	      var texture = this._texture;
	      var vertexData = this.vertexTrimmedData;
	      var orig = texture.orig;
	      var anchor = this._anchor;
	      var wt = this.transform.worldTransform;
	      var a = wt.a;
	      var b = wt.b;
	      var c = wt.c;
	      var d = wt.d;
	      var tx = wt.tx;
	      var ty = wt.ty;
	      var w1 = -anchor._x * orig.width;
	      var w0 = w1 + orig.width;
	      var h1 = -anchor._y * orig.height;
	      var h0 = h1 + orig.height;
	      vertexData[0] = a * w1 + c * h1 + tx;
	      vertexData[1] = d * h1 + b * w1 + ty;
	      vertexData[2] = a * w0 + c * h1 + tx;
	      vertexData[3] = d * h1 + b * w0 + ty;
	      vertexData[4] = a * w0 + c * h0 + tx;
	      vertexData[5] = d * h0 + b * w0 + ty;
	      vertexData[6] = a * w1 + c * h0 + tx;
	      vertexData[7] = d * h0 + b * w1 + ty;
	    }
	  }, {
	    key: '_renderWebGL',
	    value: function _renderWebGL(renderer) {
	      this.calculateVertices();
	      renderer.setObjectRenderer(renderer.plugins[this.pluginName]);
	      renderer.plugins[this.pluginName].render(this);
	    }
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      renderer.plugins[this.pluginName].render(this);
	    }
	  }, {
	    key: '_calculateBounds',
	    value: function _calculateBounds() {
	      var trim = this._texture.trim;
	      var orig = this._texture.orig;
	      if (!trim || trim.width === orig.width && trim.height === orig.height) {
	        this.calculateVertices();
	        this._bounds.addQuad(this.vertexData);
	      } else {
	        this.calculateTrimmedVertices();
	        this._bounds.addQuad(this.vertexTrimmedData);
	      }
	    }
	  }, {
	    key: 'getLocalBounds',
	    value: function getLocalBounds(rect) {
	      if (this.children.length === 0) {
	        this._bounds.minX = this._texture.orig.width * -this._anchor._x;
	        this._bounds.minY = this._texture.orig.height * -this._anchor._y;
	        this._bounds.maxX = this._texture.orig.width * (1 - this._anchor._x);
	        this._bounds.maxY = this._texture.orig.height * (1 - this._anchor._y);
	        if (!rect) {
	          if (!this._localBoundsRect) {
	            this._localBoundsRect = new Rectangle();
	          }
	          rect = this._localBoundsRect;
	        }
	        return this._bounds.getRectangle(rect);
	      }
	      return get(Sprite.prototype.__proto__ || Object.getPrototypeOf(Sprite.prototype), 'getLocalBounds', this).call(this, rect);
	    }
	  }, {
	    key: 'containsPoint',
	    value: function containsPoint(point) {
	      this.worldTransform.applyInverse(point, tempPoint);
	      var width = this._texture.orig.width;
	      var height = this._texture.orig.height;
	      var x1 = -width * this.anchor.x;
	      var y1 = 0;
	      if (tempPoint.x >= x1 && tempPoint.x < x1 + width) {
	        y1 = -height * this.anchor.y;
	        if (tempPoint.y >= y1 && tempPoint.y < y1 + height) {
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(options) {
	      get(Sprite.prototype.__proto__ || Object.getPrototypeOf(Sprite.prototype), 'destroy', this).call(this, options);
	      this._texture && this._texture.off('update', this._onTextureUpdate, this);
	      this._anchor = null;
	      var destroyTexture = typeof options === 'boolean' ? options : options && options.texture;
	      if (destroyTexture && this._texture) {
	        var destroyBaseTexture = typeof options === 'boolean' ? options : options && options.baseTexture;
	        this._texture.destroy(!!destroyBaseTexture);
	      }
	      this._texture = null;
	      this.shader = null;
	    }
	  }, {
	    key: 'setAnchor',
	    value: function setAnchor(x, y) {
	      this.anchor.set(x, y === void 0 ? x : y);
	    }
	  }, {
	    key: 'getAnchor',
	    value: function getAnchor() {
	      return this.anchor;
	    }
	  }, {
	    key: 'width',
	    get: function get$$1() {
	      return Math.abs(this.scale.x) * this._texture.orig.width;
	    },
	    set: function set$$1(value) {
	      var s = Math.sign(this.scale.x) || 1;
	      this.scale.x = s * value / this._texture.orig.width;
	      this._width = value;
	    }
	  }, {
	    key: 'height',
	    get: function get$$1() {
	      return Math.abs(this.scale.y) * this._texture.orig.height;
	    },
	    set: function set$$1(value) {
	      var s = Math.sign(this.scale.y) || 1;
	      this.scale.y = s * value / this._texture.orig.height;
	      this._height = value;
	    }
	  }, {
	    key: 'anchor',
	    get: function get$$1() {
	      return this._anchor;
	    },
	    set: function set$$1(value) {
	      this._anchor.copy(value);
	    }
	  }, {
	    key: 'tint',
	    get: function get$$1() {
	      return this._tint;
	    },
	    set: function set$$1(value) {
	      this._tint = value;
	      this._tintRGB = (value >> 16) + (value & 0xff00) + ((value & 0xff) << 16);
	    }
	  }, {
	    key: 'texture',
	    get: function get$$1() {
	      return this._texture;
	    },
	    set: function set$$1(value) {
	      if (this._texture === value) {
	        return;
	      }
	      this._texture = value || Texture.EMPTY;
	      this.cachedTint = 0xFFFFFF;
	      this._textureID = -1;
	      this._textureTrimmedID = -1;
	      if (value) {
	        if (value.baseTexture.hasLoaded) {
	          this._onTextureUpdate();
	        } else {
	          value.once('update', this._onTextureUpdate, this);
	        }
	      }
	    }
	  }], [{
	    key: 'from',
	    value: function from(source) {
	      return new Sprite(Texture.from(source));
	    }
	  }, {
	    key: 'fromFrame',
	    value: function fromFrame(frameId) {
	      var texture = TextureCache[frameId];
	      if (!texture) {
	        throw new Error('The frameId "' + frameId + '" does not exist in the texture cache');
	      }
	      return new Sprite(texture);
	    }
	  }, {
	    key: 'fromImage',
	    value: function fromImage(imageId, crossorigin, scaleMode) {
	      return new Sprite(Texture.fromImage(imageId, crossorigin, scaleMode));
	    }
	  }]);
	  return Sprite;
	}(Container);

	var AnimatedSprite = function (_Sprite) {
	  inherits(AnimatedSprite, _Sprite);
	  function AnimatedSprite(textures, autoUpdate) {
	    classCallCheck(this, AnimatedSprite);
	    var _this = possibleConstructorReturn(this, (AnimatedSprite.__proto__ || Object.getPrototypeOf(AnimatedSprite)).call(this, textures[0] instanceof Texture ? textures[0] : textures[0].texture));
	    _this._textures = null;
	    _this._durations = null;
	    _this.textures = textures;
	    _this._autoUpdate = autoUpdate !== false;
	    _this.animationSpeed = 1;
	    _this.loop = true;
	    _this.onComplete = null;
	    _this.onFrameChange = null;
	    _this.onLoop = null;
	    _this._currentTime = 0;
	    _this.playing = false;
	    return _this;
	  }
	  createClass(AnimatedSprite, [{
	    key: 'stop',
	    value: function stop() {
	      if (!this.playing) {
	        return;
	      }
	      this.playing = false;
	      if (this._autoUpdate) {
	        shared.remove(this._update, this);
	      }
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      if (this.playing) {
	        return;
	      }
	      this.playing = true;
	      if (this._autoUpdate) {
	        shared.add(this._update, this, UPDATE_PRIORITY.HIGH);
	      }
	    }
	  }, {
	    key: 'gotoAndStop',
	    value: function gotoAndStop(frameNumber) {
	      this.stop();
	      var previousFrame = this.currentFrame;
	      this._currentTime = frameNumber;
	      if (previousFrame !== this.currentFrame) {
	        this.updateTexture();
	      }
	    }
	  }, {
	    key: 'gotoAndPlay',
	    value: function gotoAndPlay(frameNumber) {
	      var previousFrame = this.currentFrame;
	      this._currentTime = frameNumber;
	      if (previousFrame !== this.currentFrame) {
	        this.updateTexture();
	      }
	      this.play();
	    }
	  }, {
	    key: '_update',
	    value: function _update(deltaTime) {
	      var elapsed = this.animationSpeed * deltaTime;
	      var previousFrame = this.currentFrame;
	      if (this._durations !== null) {
	        var lag = this._currentTime % 1 * this._durations[this.currentFrame];
	        lag += elapsed / 60 * 1000;
	        while (lag < 0) {
	          this._currentTime--;
	          lag += this._durations[this.currentFrame];
	        }
	        var sign = Math.sign(this.animationSpeed * deltaTime);
	        this._currentTime = Math.floor(this._currentTime);
	        while (lag >= this._durations[this.currentFrame]) {
	          lag -= this._durations[this.currentFrame] * sign;
	          this._currentTime += sign;
	        }
	        this._currentTime += lag / this._durations[this.currentFrame];
	      } else {
	        this._currentTime += elapsed;
	      }
	      if (this._currentTime < 0 && !this.loop) {
	        this.gotoAndStop(0);
	        if (this.onComplete) {
	          this.onComplete();
	        }
	      } else if (this._currentTime >= this._textures.length && !this.loop) {
	        this.gotoAndStop(this._textures.length - 1);
	        if (this.onComplete) {
	          this.onComplete();
	        }
	      } else if (previousFrame !== this.currentFrame) {
	        if (this.loop && this.onLoop) {
	          if (this.animationSpeed > 0 && this.currentFrame < previousFrame) {
	            this.onLoop();
	          } else if (this.animationSpeed < 0 && this.currentFrame > previousFrame) {
	            this.onLoop();
	          }
	        }
	        this.updateTexture();
	      }
	    }
	  }, {
	    key: 'updateTexture',
	    value: function updateTexture() {
	      this._texture = this._textures[this.currentFrame];
	      this._textureID = -1;
	      this.cachedTint = 0xFFFFFF;
	      if (this.onFrameChange) {
	        this.onFrameChange(this.currentFrame);
	      }
	    }
	  }, {
	    key: 'reverse',
	    value: function reverse() {
	      this._currentTime = this._textures.length - this.currentFrame - 1;
	      this._textures.reverse();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(options) {
	      this.stop();
	      get(AnimatedSprite.prototype.__proto__ || Object.getPrototypeOf(AnimatedSprite.prototype), 'destroy', this).call(this, options);
	    }
	  }, {
	    key: 'totalFrames',
	    get: function get$$1() {
	      return this._textures.length;
	    }
	  }, {
	    key: 'textures',
	    get: function get$$1() {
	      return this._textures;
	    },
	    set: function set$$1(value) {
	      if (value[0] instanceof Texture) {
	        this._textures = value;
	        this._durations = null;
	      } else {
	        this._textures = [];
	        this._durations = [];
	        for (var i = 0; i < value.length; i++) {
	          this._textures.push(value[i].texture);
	          this._durations.push(value[i].time);
	        }
	      }
	      this.gotoAndPlay(0);
	      this.updateTexture();
	    }
	  }, {
	    key: 'currentFrame',
	    get: function get$$1() {
	      var currentFrame = Math.floor(this._currentTime) % this._textures.length;
	      if (currentFrame < 0) {
	        currentFrame += this._textures.length;
	      }
	      return currentFrame;
	    }
	  }], [{
	    key: 'fromFrames',
	    value: function fromFrames(frames) {
	      var textures = [];
	      for (var i = 0; i < frames.length; ++i) {
	        textures.push(Texture.fromFrame(frames[i]));
	      }
	      return new AnimatedSprite(textures);
	    }
	  }, {
	    key: 'fromImages',
	    value: function fromImages(images) {
	      var textures = [];
	      for (var i = 0; i < images.length; ++i) {
	        textures.push(Texture.fromImage(images[i]));
	      }
	      return new AnimatedSprite(textures);
	    }
	  }]);
	  return AnimatedSprite;
	}(Sprite);

	var CanvasTinter = {
	  getTintedTexture: function getTintedTexture(sprite, color$$1) {
	    var texture = sprite._texture;
	    color$$1 = CanvasTinter.roundColor(color$$1);
	    var stringColor = '#' + ('00000' + (color$$1 | 0).toString(16)).substr(-6);
	    texture.tintCache = texture.tintCache || {};
	    var cachedTexture = texture.tintCache[stringColor];
	    var canvas = void 0;
	    if (cachedTexture) {
	      if (cachedTexture.tintId === texture._updateID) {
	        return texture.tintCache[stringColor];
	      }
	      canvas = texture.tintCache[stringColor];
	    } else {
	      canvas = CanvasTinter.canvas || document.createElement('canvas');
	    }
	    CanvasTinter.tintMethod(texture, color$$1, canvas);
	    canvas.tintId = texture._updateID;
	    if (CanvasTinter.convertTintToImage) {
	      var tintImage = new Image();
	      tintImage.src = canvas.toDataURL();
	      texture.tintCache[stringColor] = tintImage;
	    } else {
	      texture.tintCache[stringColor] = canvas;
	      CanvasTinter.canvas = null;
	    }
	    return canvas;
	  },
	  tintWithMultiply: function tintWithMultiply(texture, color$$1, canvas) {
	    var context = canvas.getContext('2d');
	    var crop = texture._frame.clone();
	    var resolution = texture.baseTexture.resolution;
	    crop.x *= resolution;
	    crop.y *= resolution;
	    crop.width *= resolution;
	    crop.height *= resolution;
	    canvas.width = Math.ceil(crop.width);
	    canvas.height = Math.ceil(crop.height);
	    context.save();
	    context.fillStyle = '#' + ('00000' + (color$$1 | 0).toString(16)).substr(-6);
	    context.fillRect(0, 0, crop.width, crop.height);
	    context.globalCompositeOperation = 'multiply';
	    context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
	    context.globalCompositeOperation = 'destination-atop';
	    context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
	    context.restore();
	  },
	  tintWithOverlay: function tintWithOverlay(texture, color$$1, canvas) {
	    var context = canvas.getContext('2d');
	    var crop = texture._frame.clone();
	    var resolution = texture.baseTexture.resolution;
	    crop.x *= resolution;
	    crop.y *= resolution;
	    crop.width *= resolution;
	    crop.height *= resolution;
	    canvas.width = Math.ceil(crop.width);
	    canvas.height = Math.ceil(crop.height);
	    context.save();
	    context.globalCompositeOperation = 'copy';
	    context.fillStyle = '#' + ('00000' + (color$$1 | 0).toString(16)).substr(-6);
	    context.fillRect(0, 0, crop.width, crop.height);
	    context.globalCompositeOperation = 'destination-atop';
	    context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
	    context.restore();
	  },
	  tintWithPerPixel: function tintWithPerPixel(texture, color$$1, canvas) {
	    var context = canvas.getContext('2d');
	    var crop = texture._frame.clone();
	    var resolution = texture.baseTexture.resolution;
	    crop.x *= resolution;
	    crop.y *= resolution;
	    crop.width *= resolution;
	    crop.height *= resolution;
	    canvas.width = Math.ceil(crop.width);
	    canvas.height = Math.ceil(crop.height);
	    context.save();
	    context.globalCompositeOperation = 'copy';
	    context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
	    context.restore();
	    var rgbValues = hex2rgb(color$$1);
	    var r = rgbValues[0];
	    var g = rgbValues[1];
	    var b = rgbValues[2];
	    var pixelData = context.getImageData(0, 0, crop.width, crop.height);
	    var pixels = pixelData.data;
	    for (var i = 0; i < pixels.length; i += 4) {
	      pixels[i + 0] *= r;
	      pixels[i + 1] *= g;
	      pixels[i + 2] *= b;
	    }
	    context.putImageData(pixelData, 0, 0);
	  },
	  roundColor: function roundColor(color$$1) {
	    var step = CanvasTinter.cacheStepsPerColorChannel;
	    var rgbValues = hex2rgb(color$$1);
	    rgbValues[0] = Math.min(255, rgbValues[0] / step * step);
	    rgbValues[1] = Math.min(255, rgbValues[1] / step * step);
	    rgbValues[2] = Math.min(255, rgbValues[2] / step * step);
	    return rgb2hex(rgbValues);
	  },
	  cacheStepsPerColorChannel: 8,
	  convertTintToImage: false,
	  canUseMultiply: canUseNewCanvasBlendModes(),
	  tintMethod: 0
	};
	CanvasTinter.tintMethod = CanvasTinter.canUseMultiply ? CanvasTinter.tintWithMultiply : CanvasTinter.tintWithPerPixel;

	var canvasRenderWorldTransform = new Matrix();
	var CanvasSpriteRenderer = function () {
	  function CanvasSpriteRenderer(renderer) {
	    classCallCheck(this, CanvasSpriteRenderer);
	    this.renderer = renderer;
	  }
	  createClass(CanvasSpriteRenderer, [{
	    key: 'render',
	    value: function render(sprite) {
	      var texture = sprite._texture;
	      var renderer = this.renderer;
	      var width = texture._frame.width;
	      var height = texture._frame.height;
	      var wt = sprite.transform.worldTransform;
	      var dx = 0;
	      var dy = 0;
	      if (texture.orig.width <= 0 || texture.orig.height <= 0 || !texture.baseTexture.source) {
	        return;
	      }
	      renderer.setBlendMode(sprite.blendMode);
	      if (texture.valid) {
	        renderer.context.globalAlpha = sprite.worldAlpha;
	        var smoothingEnabled = texture.baseTexture.scaleMode === SCALE_MODES.LINEAR;
	        if (renderer.smoothProperty && renderer.context[renderer.smoothProperty] !== smoothingEnabled) {
	          renderer.context[renderer.smoothProperty] = smoothingEnabled;
	        }
	        if (texture.trim) {
	          dx = texture.trim.width / 2 + texture.trim.x - sprite.anchor.x * texture.orig.width;
	          dy = texture.trim.height / 2 + texture.trim.y - sprite.anchor.y * texture.orig.height;
	        } else {
	          dx = (0.5 - sprite.anchor.x) * texture.orig.width;
	          dy = (0.5 - sprite.anchor.y) * texture.orig.height;
	        }
	        if (texture.rotate) {
	          wt.copy(canvasRenderWorldTransform);
	          wt = canvasRenderWorldTransform;
	          GroupD8.matrixAppendRotationInv(wt, texture.rotate, dx, dy);
	          dx = 0;
	          dy = 0;
	        }
	        dx -= width / 2;
	        dy -= height / 2;
	        if (renderer.roundPixels) {
	          renderer.context.setTransform(wt.a, wt.b, wt.c, wt.d, wt.tx * renderer.resolution | 0, wt.ty * renderer.resolution | 0);
	          dx = dx | 0;
	          dy = dy | 0;
	        } else {
	          renderer.context.setTransform(wt.a, wt.b, wt.c, wt.d, wt.tx * renderer.resolution, wt.ty * renderer.resolution);
	        }
	        var resolution = texture.baseTexture.resolution;
	        if (sprite.tint !== 0xFFFFFF) {
	          if (sprite.cachedTint !== sprite.tint || sprite.tintedTexture.tintId !== sprite._texture._updateID) {
	            sprite.cachedTint = sprite.tint;
	            sprite.tintedTexture = CanvasTinter.getTintedTexture(sprite, sprite.tint);
	          }
	          renderer.context.drawImage(sprite.tintedTexture, 0, 0, width * resolution, height * resolution, dx * renderer.resolution, dy * renderer.resolution, width * renderer.resolution, height * renderer.resolution);
	        } else {
	          renderer.context.drawImage(texture.baseTexture.source, texture._frame.x * resolution, texture._frame.y * resolution, width * resolution, height * resolution, dx * renderer.resolution, dy * renderer.resolution, width * renderer.resolution, height * renderer.resolution);
	        }
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.renderer = null;
	    }
	  }]);
	  return CanvasSpriteRenderer;
	}();
	CanvasRenderer.registerPlugin('sprite', CanvasSpriteRenderer);

	var fragTemplate = '\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n  vec4 color;\n  float textureId = floor(vTextureId+0.5);\n  %forloop%\n  gl_FragColor = color * vColor;\n}\n';
	var vertTemplate = '\nprecision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n  gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n  vTextureCoord = aTextureCoord;\n  vTextureId = aTextureId;\n  vColor = aColor;\n}\n';
	function generateMultiTextureShader(gl, maxTextures) {
	  var vertexSrc = vertTemplate;
	  var fragmentSrc = fragTemplate;
	  fragmentSrc = fragmentSrc.replace(/%count%/gi, maxTextures);
	  fragmentSrc = fragmentSrc.replace(/%forloop%/gi, generateSampleSrc(maxTextures));
	  var shader = new Shader$1(gl, vertexSrc, fragmentSrc);
	  var sampleValues = [];
	  for (var i = 0; i < maxTextures; i++) {
	    sampleValues[i] = i;
	  }
	  shader.bind();
	  shader.uniforms.uSamplers = sampleValues;
	  return shader;
	}
	function generateSampleSrc(maxTextures) {
	  var src = '';
	  src += '\n';
	  src += '\n';
	  for (var i = 0; i < maxTextures; i++) {
	    if (i > 0) {
	      src += '\nelse ';
	    }
	    if (i < maxTextures - 1) {
	      src += 'if(textureId == ' + i + '.0)';
	    }
	    src += '\n{';
	    src += '\n\tcolor = texture2D(uSamplers[' + i + '], vTextureCoord);';
	    src += '\n}';
	  }
	  src += '\n';
	  src += '\n';
	  return src;
	}

	var fragTemplate$1 = '\nprecision mediump float;\nvoid main(void){\n  float test = 0.1;\n  %forloop%\n  gl_FragColor = vec4(0.0);\n}\n';
	function checkMaxIfStatmentsInShader(maxIfs, gl) {
	  var createTempContext = !gl;
	  if (createTempContext) {
	    var tinyCanvas = document.createElement('canvas');
	    tinyCanvas.width = 1;
	    tinyCanvas.height = 1;
	    gl = glCore.createContext(tinyCanvas);
	  }
	  var shader = gl.createShader(gl.FRAGMENT_SHADER);
	  while (true) {
	    var fragmentSrc = fragTemplate$1.replace(/%forloop%/gi, generateIfTestSrc(maxIfs));
	    gl.shaderSource(shader, fragmentSrc);
	    gl.compileShader(shader);
	    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	      maxIfs = maxIfs / 2 | 0;
	    } else {
	      break;
	    }
	  }
	  if (createTempContext) {
	    if (gl.getExtension('WEBGL_lose_context')) {
	      gl.getExtension('WEBGL_lose_context').loseContext();
	    }
	  }
	  return maxIfs;
	}
	function generateIfTestSrc(maxIfs) {
	  var src = '';
	  for (var i = 0; i < maxIfs; ++i) {
	    if (i > 0) {
	      src += '\nelse ';
	    }
	    if (i < maxIfs - 1) {
	      src += 'if(test == ' + i + '.0){}';
	    }
	  }
	  return src;
	}

	var Buffer$1 = function () {
	  function Buffer(size) {
	    classCallCheck(this, Buffer);
	    this.vertices = new ArrayBuffer(size);
	    this.float32View = new Float32Array(this.vertices);
	    this.uint32View = new Uint32Array(this.vertices);
	  }
	  createClass(Buffer, [{
	    key: "destroy",
	    value: function destroy() {
	      this.vertices = null;
	      this.positions = null;
	      this.uvs = null;
	      this.colors = null;
	    }
	  }]);
	  return Buffer;
	}();

	var TICK = 0;
	var TEXTURE_TICK = 0;
	var SpriteRenderer = function (_ObjectRenderer) {
	  inherits(SpriteRenderer, _ObjectRenderer);
	  function SpriteRenderer(renderer) {
	    classCallCheck(this, SpriteRenderer);
	    var _this = possibleConstructorReturn(this, (SpriteRenderer.__proto__ || Object.getPrototypeOf(SpriteRenderer)).call(this, renderer));
	    _this.vertSize = 5;
	    _this.vertByteSize = _this.vertSize * 4;
	    _this.size = settings.SPRITE_BATCH_SIZE;
	    _this.buffers = [];
	    for (var i = 1; i <= nextPow2(_this.size); i *= 2) {
	      _this.buffers.push(new Buffer$1(i * 4 * _this.vertByteSize));
	    }
	    _this.indices = createIndicesForQuads(_this.size);
	    _this.shader = null;
	    _this.currentIndex = 0;
	    _this.groups = [];
	    for (var k = 0; k < _this.size; k++) {
	      _this.groups[k] = { textures: [], textureCount: 0, ids: [], size: 0, start: 0, blend: 0 };
	    }
	    _this.sprites = [];
	    _this.vertexBuffers = [];
	    _this.vaos = [];
	    _this.vaoMax = 2;
	    _this.vertexCount = 0;
	    _this.renderer.on('prerender', _this.onPrerender, _this);
	    return _this;
	  }
	  createClass(SpriteRenderer, [{
	    key: 'onContextChange',
	    value: function onContextChange() {
	      var gl = this.renderer.gl;
	      if (this.renderer.legacy) {
	        this.MAX_TEXTURES = 1;
	      } else {
	        this.MAX_TEXTURES = Math.min(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS), settings.SPRITE_MAX_TEXTURES);
	        this.MAX_TEXTURES = checkMaxIfStatmentsInShader(this.MAX_TEXTURES, gl);
	      }
	      this.shader = generateMultiTextureShader(gl, this.MAX_TEXTURES);
	      this.indexBuffer = glCore.GLBuffer.createIndexBuffer(gl, this.indices, gl.STATIC_DRAW);
	      this.renderer.bindVao(null);
	      var attrs = this.shader.attributes;
	      for (var i = 0; i < this.vaoMax; i++) {
	        var vertexBuffer = this.vertexBuffers[i] = glCore.GLBuffer.createVertexBuffer(gl, null, gl.STREAM_DRAW);
	        var vao = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(vertexBuffer, attrs.aVertexPosition, gl.FLOAT, false, this.vertByteSize, 0).addAttribute(vertexBuffer, attrs.aTextureCoord, gl.UNSIGNED_SHORT, true, this.vertByteSize, 2 * 4).addAttribute(vertexBuffer, attrs.aColor, gl.UNSIGNED_BYTE, true, this.vertByteSize, 3 * 4);
	        if (attrs.aTextureId) {
	          vao.addAttribute(vertexBuffer, attrs.aTextureId, gl.FLOAT, false, this.vertByteSize, 4 * 4);
	        }
	        this.vaos[i] = vao;
	      }
	      this.vao = this.vaos[0];
	      this.currentBlendMode = 99999;
	      this.boundTextures = new Array(this.MAX_TEXTURES);
	    }
	  }, {
	    key: 'onPrerender',
	    value: function onPrerender() {
	      this.vertexCount = 0;
	    }
	  }, {
	    key: 'render',
	    value: function render(sprite) {
	      if (this.currentIndex >= this.size) {
	        this.flush();
	      }
	      if (!sprite._texture._uvs) {
	        return;
	      }
	      this.sprites[this.currentIndex++] = sprite;
	    }
	  }, {
	    key: 'flush',
	    value: function flush() {
	      if (this.currentIndex === 0) {
	        return;
	      }
	      var gl = this.renderer.gl;
	      var MAX_TEXTURES = this.MAX_TEXTURES;
	      var np2 = nextPow2(this.currentIndex);
	      var log2$$1 = log2(np2);
	      var buffer = this.buffers[log2$$1];
	      var sprites = this.sprites;
	      var groups = this.groups;
	      var float32View = buffer.float32View;
	      var uint32View = buffer.uint32View;
	      var boundTextures = this.boundTextures;
	      var rendererBoundTextures = this.renderer.boundTextures;
	      var touch = this.renderer.textureGC.count;
	      var index = 0;
	      var nextTexture = void 0;
	      var currentTexture = void 0;
	      var groupCount = 1;
	      var textureCount = 0;
	      var currentGroup = groups[0];
	      var vertexData = void 0;
	      var uvs = void 0;
	      var blendMode = premultiplyBlendMode[sprites[0]._texture.baseTexture.premultipliedAlpha ? 1 : 0][sprites[0].blendMode];
	      currentGroup.textureCount = 0;
	      currentGroup.start = 0;
	      currentGroup.blend = blendMode;
	      TICK++;
	      var i = void 0;
	      for (i = 0; i < MAX_TEXTURES; ++i) {
	        var bt = rendererBoundTextures[i];
	        if (bt._enabled === TICK) {
	          boundTextures[i] = this.renderer.emptyTextures[i];
	          continue;
	        }
	        boundTextures[i] = bt;
	        bt._virtalBoundId = i;
	        bt._enabled = TICK;
	      }
	      TICK++;
	      for (i = 0; i < this.currentIndex; ++i) {
	        var sprite = sprites[i];
	        sprites[i] = null;
	        nextTexture = sprite._texture.baseTexture;
	        var spriteBlendMode = premultiplyBlendMode[Number(nextTexture.premultipliedAlpha)][sprite.blendMode];
	        if (blendMode !== spriteBlendMode) {
	          blendMode = spriteBlendMode;
	          currentTexture = null;
	          textureCount = MAX_TEXTURES;
	          TICK++;
	        }
	        if (currentTexture !== nextTexture) {
	          currentTexture = nextTexture;
	          if (nextTexture._enabled !== TICK) {
	            if (textureCount === MAX_TEXTURES) {
	              TICK++;
	              currentGroup.size = i - currentGroup.start;
	              textureCount = 0;
	              currentGroup = groups[groupCount++];
	              currentGroup.blend = blendMode;
	              currentGroup.textureCount = 0;
	              currentGroup.start = i;
	            }
	            nextTexture.touched = touch;
	            if (nextTexture._virtalBoundId === -1) {
	              for (var j = 0; j < MAX_TEXTURES; ++j) {
	                var tIndex = (j + TEXTURE_TICK) % MAX_TEXTURES;
	                var t = boundTextures[tIndex];
	                if (t._enabled !== TICK) {
	                  TEXTURE_TICK++;
	                  t._virtalBoundId = -1;
	                  nextTexture._virtalBoundId = tIndex;
	                  boundTextures[tIndex] = nextTexture;
	                  break;
	                }
	              }
	            }
	            nextTexture._enabled = TICK;
	            currentGroup.textureCount++;
	            currentGroup.ids[textureCount] = nextTexture._virtalBoundId;
	            currentGroup.textures[textureCount++] = nextTexture;
	          }
	        }
	        vertexData = sprite.vertexData;
	        uvs = sprite._texture._uvs.uvsUint32;
	        if (this.renderer.roundPixels) {
	          var resolution = this.renderer.resolution;
	          float32View[index] = (vertexData[0] * resolution | 0) / resolution;
	          float32View[index + 1] = (vertexData[1] * resolution | 0) / resolution;
	          float32View[index + 5] = (vertexData[2] * resolution | 0) / resolution;
	          float32View[index + 6] = (vertexData[3] * resolution | 0) / resolution;
	          float32View[index + 10] = (vertexData[4] * resolution | 0) / resolution;
	          float32View[index + 11] = (vertexData[5] * resolution | 0) / resolution;
	          float32View[index + 15] = (vertexData[6] * resolution | 0) / resolution;
	          float32View[index + 16] = (vertexData[7] * resolution | 0) / resolution;
	        } else {
	          float32View[index] = vertexData[0];
	          float32View[index + 1] = vertexData[1];
	          float32View[index + 5] = vertexData[2];
	          float32View[index + 6] = vertexData[3];
	          float32View[index + 10] = vertexData[4];
	          float32View[index + 11] = vertexData[5];
	          float32View[index + 15] = vertexData[6];
	          float32View[index + 16] = vertexData[7];
	        }
	        uint32View[index + 2] = uvs[0];
	        uint32View[index + 7] = uvs[1];
	        uint32View[index + 12] = uvs[2];
	        uint32View[index + 17] = uvs[3];
	        var alpha = Math.min(sprite.worldAlpha, 1.0);
	        var argb = alpha < 1.0 && nextTexture.premultipliedAlpha ? premultiplyTint(sprite._tintRGB, alpha) : sprite._tintRGB + (alpha * 255 << 24);
	        uint32View[index + 3] = uint32View[index + 8] = uint32View[index + 13] = uint32View[index + 18] = argb;
	        float32View[index + 4] = float32View[index + 9] = float32View[index + 14] = float32View[index + 19] = nextTexture._virtalBoundId;
	        index += 20;
	      }
	      currentGroup.size = i - currentGroup.start;
	      if (!settings.CAN_UPLOAD_SAME_BUFFER) {
	        if (this.vaoMax <= this.vertexCount) {
	          this.vaoMax++;
	          var attrs = this.shader.attributes;
	          var vertexBuffer = this.vertexBuffers[this.vertexCount] = glCore.GLBuffer.createVertexBuffer(gl, null, gl.STREAM_DRAW);
	          var vao = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(vertexBuffer, attrs.aVertexPosition, gl.FLOAT, false, this.vertByteSize, 0).addAttribute(vertexBuffer, attrs.aTextureCoord, gl.UNSIGNED_SHORT, true, this.vertByteSize, 2 * 4).addAttribute(vertexBuffer, attrs.aColor, gl.UNSIGNED_BYTE, true, this.vertByteSize, 3 * 4);
	          if (attrs.aTextureId) {
	            vao.addAttribute(vertexBuffer, attrs.aTextureId, gl.FLOAT, false, this.vertByteSize, 4 * 4);
	          }
	          this.vaos[this.vertexCount] = vao;
	        }
	        this.renderer.bindVao(this.vaos[this.vertexCount]);
	        this.vertexBuffers[this.vertexCount].upload(buffer.vertices, 0, false);
	        this.vertexCount++;
	      } else {
	        this.vertexBuffers[this.vertexCount].upload(buffer.vertices, 0, true);
	      }
	      for (i = 0; i < MAX_TEXTURES; ++i) {
	        rendererBoundTextures[i]._virtalBoundId = -1;
	      }
	      for (i = 0; i < groupCount; ++i) {
	        var group = groups[i];
	        var groupTextureCount = group.textureCount;
	        for (var _j = 0; _j < groupTextureCount; _j++) {
	          currentTexture = group.textures[_j];
	          if (rendererBoundTextures[group.ids[_j]] !== currentTexture) {
	            this.renderer.bindTexture(currentTexture, group.ids[_j], true);
	          }
	          currentTexture._virtalBoundId = -1;
	        }
	        this.renderer.state.setBlendMode(group.blend);
	        gl.drawElements(gl.TRIANGLES, group.size * 6, gl.UNSIGNED_SHORT, group.start * 6 * 2);
	      }
	      this.currentIndex = 0;
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      this.renderer.bindShader(this.shader);
	      if (settings.CAN_UPLOAD_SAME_BUFFER) {
	        this.renderer.bindVao(this.vaos[this.vertexCount]);
	        this.vertexBuffers[this.vertexCount].bind();
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.flush();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      for (var i = 0; i < this.vaoMax; i++) {
	        if (this.vertexBuffers[i]) {
	          this.vertexBuffers[i].destroy();
	        }
	        if (this.vaos[i]) {
	          this.vaos[i].destroy();
	        }
	      }
	      if (this.indexBuffer) {
	        this.indexBuffer.destroy();
	      }
	      this.renderer.off('prerender', this.onPrerender, this);
	      get(SpriteRenderer.prototype.__proto__ || Object.getPrototypeOf(SpriteRenderer.prototype), 'destroy', this).call(this);
	      if (this.shader) {
	        this.shader.destroy();
	        this.shader = null;
	      }
	      this.vertexBuffers = null;
	      this.vaos = null;
	      this.indexBuffer = null;
	      this.indices = null;
	      this.sprites = null;
	      for (var _i = 0; _i < this.buffers.length; ++_i) {
	        this.buffers[_i].destroy();
	      }
	    }
	  }]);
	  return SpriteRenderer;
	}(ObjectRenderer);
	WebGLRenderer.registerPlugin('sprite', SpriteRenderer);

	var defaultStyle = {
	  align: 'left',
	  breakWords: false,
	  dropShadow: false,
	  dropShadowAlpha: 1,
	  dropShadowAngle: Math.PI / 6,
	  dropShadowBlur: 0,
	  dropShadowColor: 'black',
	  dropShadowDistance: 5,
	  fill: 'black',
	  fillGradientType: TEXT_GRADIENT.LINEAR_VERTICAL,
	  fillGradientStops: [],
	  fontFamily: 'Arial',
	  fontSize: 26,
	  fontStyle: 'normal',
	  fontVariant: 'normal',
	  fontWeight: 'normal',
	  letterSpacing: 0,
	  lineHeight: 0,
	  lineJoin: 'miter',
	  miterLimit: 10,
	  padding: 0,
	  stroke: 'black',
	  strokeThickness: 0,
	  textBaseline: 'alphabetic',
	  trim: false,
	  whiteSpace: 'pre',
	  wordWrap: false,
	  wordWrapWidth: 100,
	  leading: 0
	};
	var genericFontFamilies = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui'];
	var TextStyle = function () {
	  function TextStyle(style) {
	    classCallCheck(this, TextStyle);
	    this.styleID = 0;
	    this.reset();
	    deepCopyProperties(this, style, style);
	  }
	  createClass(TextStyle, [{
	    key: 'clone',
	    value: function clone() {
	      var clonedProperties = {};
	      deepCopyProperties(clonedProperties, this, defaultStyle);
	      return new TextStyle(clonedProperties);
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      deepCopyProperties(this, defaultStyle, defaultStyle);
	    }
	  }, {
	    key: 'toFontString',
	    value: function toFontString() {
	      var fontSizeString = typeof this.fontSize === 'number' ? this.fontSize + 'px' : this.fontSize;
	      var fontFamilies = this.fontFamily;
	      if (!Array.isArray(this.fontFamily)) {
	        fontFamilies = this.fontFamily.split(',');
	      }
	      for (var i = fontFamilies.length - 1; i >= 0; i--) {
	        var fontFamily = fontFamilies[i].trim();
	        if (!/([\"\'])[^\'\"]+\1/.test(fontFamily) && genericFontFamilies.indexOf(fontFamily) < 0) {
	          fontFamily = '"' + fontFamily + '"';
	        }
	        fontFamilies[i] = fontFamily;
	      }
	      return this.fontStyle + ' ' + this.fontVariant + ' ' + this.fontWeight + ' ' + fontSizeString + ' ' + fontFamilies.join(',');
	    }
	  }, {
	    key: 'align',
	    get: function get$$1() {
	      return this._align;
	    },
	    set: function set$$1(align) {
	      if (this._align !== align) {
	        this._align = align;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'breakWords',
	    get: function get$$1() {
	      return this._breakWords;
	    },
	    set: function set$$1(breakWords) {
	      if (this._breakWords !== breakWords) {
	        this._breakWords = breakWords;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'dropShadow',
	    get: function get$$1() {
	      return this._dropShadow;
	    },
	    set: function set$$1(dropShadow) {
	      if (this._dropShadow !== dropShadow) {
	        this._dropShadow = dropShadow;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'dropShadowAlpha',
	    get: function get$$1() {
	      return this._dropShadowAlpha;
	    },
	    set: function set$$1(dropShadowAlpha) {
	      if (this._dropShadowAlpha !== dropShadowAlpha) {
	        this._dropShadowAlpha = dropShadowAlpha;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'dropShadowAngle',
	    get: function get$$1() {
	      return this._dropShadowAngle;
	    },
	    set: function set$$1(dropShadowAngle) {
	      if (this._dropShadowAngle !== dropShadowAngle) {
	        this._dropShadowAngle = dropShadowAngle;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'dropShadowBlur',
	    get: function get$$1() {
	      return this._dropShadowBlur;
	    },
	    set: function set$$1(dropShadowBlur) {
	      if (this._dropShadowBlur !== dropShadowBlur) {
	        this._dropShadowBlur = dropShadowBlur;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'dropShadowColor',
	    get: function get$$1() {
	      return this._dropShadowColor;
	    },
	    set: function set$$1(dropShadowColor) {
	      var outputColor = getColor(dropShadowColor);
	      if (this._dropShadowColor !== outputColor) {
	        this._dropShadowColor = outputColor;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'dropShadowDistance',
	    get: function get$$1() {
	      return this._dropShadowDistance;
	    },
	    set: function set$$1(dropShadowDistance) {
	      if (this._dropShadowDistance !== dropShadowDistance) {
	        this._dropShadowDistance = dropShadowDistance;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'fill',
	    get: function get$$1() {
	      return this._fill;
	    },
	    set: function set$$1(fill) {
	      var outputColor = getColor(fill);
	      if (this._fill !== outputColor) {
	        this._fill = outputColor;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'fillGradientType',
	    get: function get$$1() {
	      return this._fillGradientType;
	    },
	    set: function set$$1(fillGradientType) {
	      if (this._fillGradientType !== fillGradientType) {
	        this._fillGradientType = fillGradientType;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'fillGradientStops',
	    get: function get$$1() {
	      return this._fillGradientStops;
	    },
	    set: function set$$1(fillGradientStops) {
	      if (!areArraysEqual(this._fillGradientStops, fillGradientStops)) {
	        this._fillGradientStops = fillGradientStops;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'fontFamily',
	    get: function get$$1() {
	      return this._fontFamily;
	    },
	    set: function set$$1(fontFamily) {
	      if (this.fontFamily !== fontFamily) {
	        this._fontFamily = fontFamily;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'fontSize',
	    get: function get$$1() {
	      return this._fontSize;
	    },
	    set: function set$$1(fontSize) {
	      if (this._fontSize !== fontSize) {
	        this._fontSize = fontSize;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'fontStyle',
	    get: function get$$1() {
	      return this._fontStyle;
	    },
	    set: function set$$1(fontStyle) {
	      if (this._fontStyle !== fontStyle) {
	        this._fontStyle = fontStyle;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'fontVariant',
	    get: function get$$1() {
	      return this._fontVariant;
	    },
	    set: function set$$1(fontVariant) {
	      if (this._fontVariant !== fontVariant) {
	        this._fontVariant = fontVariant;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'fontWeight',
	    get: function get$$1() {
	      return this._fontWeight;
	    },
	    set: function set$$1(fontWeight) {
	      if (this._fontWeight !== fontWeight) {
	        this._fontWeight = fontWeight;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'letterSpacing',
	    get: function get$$1() {
	      return this._letterSpacing;
	    },
	    set: function set$$1(letterSpacing) {
	      if (this._letterSpacing !== letterSpacing) {
	        this._letterSpacing = letterSpacing;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'lineHeight',
	    get: function get$$1() {
	      return this._lineHeight;
	    },
	    set: function set$$1(lineHeight) {
	      if (this._lineHeight !== lineHeight) {
	        this._lineHeight = lineHeight;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'leading',
	    get: function get$$1() {
	      return this._leading;
	    },
	    set: function set$$1(leading) {
	      if (this._leading !== leading) {
	        this._leading = leading;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'lineJoin',
	    get: function get$$1() {
	      return this._lineJoin;
	    },
	    set: function set$$1(lineJoin) {
	      if (this._lineJoin !== lineJoin) {
	        this._lineJoin = lineJoin;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'miterLimit',
	    get: function get$$1() {
	      return this._miterLimit;
	    },
	    set: function set$$1(miterLimit) {
	      if (this._miterLimit !== miterLimit) {
	        this._miterLimit = miterLimit;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'padding',
	    get: function get$$1() {
	      return this._padding;
	    },
	    set: function set$$1(padding) {
	      if (this._padding !== padding) {
	        this._padding = padding;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'stroke',
	    get: function get$$1() {
	      return this._stroke;
	    },
	    set: function set$$1(stroke) {
	      var outputColor = getColor(stroke);
	      if (this._stroke !== outputColor) {
	        this._stroke = outputColor;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'strokeThickness',
	    get: function get$$1() {
	      return this._strokeThickness;
	    },
	    set: function set$$1(strokeThickness) {
	      if (this._strokeThickness !== strokeThickness) {
	        this._strokeThickness = strokeThickness;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'textBaseline',
	    get: function get$$1() {
	      return this._textBaseline;
	    },
	    set: function set$$1(textBaseline) {
	      if (this._textBaseline !== textBaseline) {
	        this._textBaseline = textBaseline;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'trim',
	    get: function get$$1() {
	      return this._trim;
	    },
	    set: function set$$1(trim) {
	      if (this._trim !== trim) {
	        this._trim = trim;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'whiteSpace',
	    get: function get$$1() {
	      return this._whiteSpace;
	    },
	    set: function set$$1(whiteSpace) {
	      if (this._whiteSpace !== whiteSpace) {
	        this._whiteSpace = whiteSpace;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'wordWrap',
	    get: function get$$1() {
	      return this._wordWrap;
	    },
	    set: function set$$1(wordWrap) {
	      if (this._wordWrap !== wordWrap) {
	        this._wordWrap = wordWrap;
	        this.styleID++;
	      }
	    }
	  }, {
	    key: 'wordWrapWidth',
	    get: function get$$1() {
	      return this._wordWrapWidth;
	    },
	    set: function set$$1(wordWrapWidth) {
	      if (this._wordWrapWidth !== wordWrapWidth) {
	        this._wordWrapWidth = wordWrapWidth;
	        this.styleID++;
	      }
	    }
	  }]);
	  return TextStyle;
	}();
	function getSingleColor(color$$1) {
	  if (typeof color$$1 === 'number') {
	    return hex2string(color$$1);
	  } else if (typeof color$$1 === 'string') {
	    if (color$$1.indexOf('0x') === 0) {
	      color$$1 = color$$1.replace('0x', '#');
	    }
	  }
	  return color$$1;
	}
	function getColor(color$$1) {
	  if (!Array.isArray(color$$1)) {
	    return getSingleColor(color$$1);
	  } else {
	    for (var i = 0; i < color$$1.length; ++i) {
	      color$$1[i] = getSingleColor(color$$1[i]);
	    }
	    return color$$1;
	  }
	}
	function areArraysEqual(array1, array2) {
	  if (!Array.isArray(array1) || !Array.isArray(array2)) {
	    return false;
	  }
	  if (array1.length !== array2.length) {
	    return false;
	  }
	  for (var i = 0; i < array1.length; ++i) {
	    if (array1[i] !== array2[i]) {
	      return false;
	    }
	  }
	  return true;
	}
	function deepCopyProperties(target, source, propertyObj) {
	  for (var prop in propertyObj) {
	    if (Array.isArray(source[prop])) {
	      target[prop] = source[prop].slice();
	    } else {
	      target[prop] = source[prop];
	    }
	  }
	}

	var TextMetrics = function () {
	  function TextMetrics(text, style, width, height, lines, lineWidths, lineHeight, maxLineWidth, fontProperties) {
	    classCallCheck(this, TextMetrics);
	    this.text = text;
	    this.style = style;
	    this.width = width;
	    this.height = height;
	    this.lines = lines;
	    this.lineWidths = lineWidths;
	    this.lineHeight = lineHeight;
	    this.maxLineWidth = maxLineWidth;
	    this.fontProperties = fontProperties;
	  }
	  createClass(TextMetrics, null, [{
	    key: 'measureText',
	    value: function measureText(text, style, wordWrap) {
	      var canvas = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TextMetrics._canvas;
	      wordWrap = wordWrap === undefined || wordWrap === null ? style.wordWrap : wordWrap;
	      var font = style.toFontString();
	      var fontProperties = TextMetrics.measureFont(font);
	      var context = canvas.getContext('2d');
	      context.font = font;
	      var outputText = wordWrap ? TextMetrics.wordWrap(text, style, canvas) : text;
	      var lines = outputText.split(/(?:\r\n|\r|\n)/);
	      var lineWidths = new Array(lines.length);
	      var maxLineWidth = 0;
	      for (var i = 0; i < lines.length; i++) {
	        var lineWidth = context.measureText(lines[i]).width + (lines[i].length - 1) * style.letterSpacing;
	        lineWidths[i] = lineWidth;
	        maxLineWidth = Math.max(maxLineWidth, lineWidth);
	      }
	      var width = maxLineWidth + style.strokeThickness;
	      if (style.dropShadow) {
	        width += style.dropShadowDistance;
	      }
	      var lineHeight = style.lineHeight || fontProperties.fontSize + style.strokeThickness;
	      var height = Math.max(lineHeight, fontProperties.fontSize + style.strokeThickness) + (lines.length - 1) * (lineHeight + style.leading);
	      if (style.dropShadow) {
	        height += style.dropShadowDistance;
	      }
	      return new TextMetrics(text, style, width, height, lines, lineWidths, lineHeight + style.leading, maxLineWidth, fontProperties);
	    }
	  }, {
	    key: 'wordWrap',
	    value: function wordWrap(text, style) {
	      var canvas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TextMetrics._canvas;
	      var context = canvas.getContext('2d');
	      var width = 0;
	      var line = '';
	      var lines = '';
	      var cache = {};
	      var letterSpacing = style.letterSpacing,
	          whiteSpace = style.whiteSpace;
	      var collapseSpaces = TextMetrics.collapseSpaces(whiteSpace);
	      var collapseNewlines = TextMetrics.collapseNewlines(whiteSpace);
	      var canPrependSpaces = !collapseSpaces;
	      var wordWrapWidth = style.wordWrapWidth + letterSpacing;
	      var tokens = TextMetrics.tokenize(text);
	      for (var i = 0; i < tokens.length; i++) {
	        var token = tokens[i];
	        if (TextMetrics.isNewline(token)) {
	          if (!collapseNewlines) {
	            lines += TextMetrics.addLine(line);
	            canPrependSpaces = !collapseSpaces;
	            line = '';
	            width = 0;
	            continue;
	          }
	          token = ' ';
	        }
	        if (collapseSpaces) {
	          var currIsBreakingSpace = TextMetrics.isBreakingSpace(token);
	          var lastIsBreakingSpace = TextMetrics.isBreakingSpace(line[line.length - 1]);
	          if (currIsBreakingSpace && lastIsBreakingSpace) {
	            continue;
	          }
	        }
	        var tokenWidth = TextMetrics.getFromCache(token, letterSpacing, cache, context);
	        if (tokenWidth > wordWrapWidth) {
	          if (line !== '') {
	            lines += TextMetrics.addLine(line);
	            line = '';
	            width = 0;
	          }
	          if (TextMetrics.canBreakWords(token, style.breakWords)) {
	            var characters = token.split('');
	            for (var j = 0; j < characters.length; j++) {
	              var char = characters[j];
	              var k = 1;
	              while (characters[j + k]) {
	                var nextChar = characters[j + k];
	                var lastChar = char[char.length - 1];
	                if (!TextMetrics.canBreakChars(lastChar, nextChar, token, j, style.breakWords)) {
	                  char += nextChar;
	                } else {
	                  break;
	                }
	                k++;
	              }
	              j += char.length - 1;
	              var characterWidth = TextMetrics.getFromCache(char, letterSpacing, cache, context);
	              if (characterWidth + width > wordWrapWidth) {
	                lines += TextMetrics.addLine(line);
	                canPrependSpaces = false;
	                line = '';
	                width = 0;
	              }
	              line += char;
	              width += characterWidth;
	            }
	          } else {
	            if (line.length > 0) {
	              lines += TextMetrics.addLine(line);
	              line = '';
	              width = 0;
	            }
	            var isLastToken = i === tokens.length - 1;
	            lines += TextMetrics.addLine(token, !isLastToken);
	            canPrependSpaces = false;
	            line = '';
	            width = 0;
	          }
	        } else {
	          if (tokenWidth + width > wordWrapWidth) {
	            canPrependSpaces = false;
	            lines += TextMetrics.addLine(line);
	            line = '';
	            width = 0;
	          }
	          if (line.length > 0 || !TextMetrics.isBreakingSpace(token) || canPrependSpaces) {
	            line += token;
	            width += tokenWidth;
	          }
	        }
	      }
	      lines += TextMetrics.addLine(line, false);
	      return lines;
	    }
	  }, {
	    key: 'addLine',
	    value: function addLine(line) {
	      var newLine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      line = TextMetrics.trimRight(line);
	      line = newLine ? line + '\n' : line;
	      return line;
	    }
	  }, {
	    key: 'getFromCache',
	    value: function getFromCache(key, letterSpacing, cache, context) {
	      var width = cache[key];
	      if (width === undefined) {
	        var spacing = key.length * letterSpacing;
	        width = context.measureText(key).width + spacing;
	        cache[key] = width;
	      }
	      return width;
	    }
	  }, {
	    key: 'collapseSpaces',
	    value: function collapseSpaces(whiteSpace) {
	      return whiteSpace === 'normal' || whiteSpace === 'pre-line';
	    }
	  }, {
	    key: 'collapseNewlines',
	    value: function collapseNewlines(whiteSpace) {
	      return whiteSpace === 'normal';
	    }
	  }, {
	    key: 'trimRight',
	    value: function trimRight(text) {
	      if (typeof text !== 'string') {
	        return '';
	      }
	      for (var i = text.length - 1; i >= 0; i--) {
	        var char = text[i];
	        if (!TextMetrics.isBreakingSpace(char)) {
	          break;
	        }
	        text = text.slice(0, -1);
	      }
	      return text;
	    }
	  }, {
	    key: 'isNewline',
	    value: function isNewline(char) {
	      if (typeof char !== 'string') {
	        return false;
	      }
	      return TextMetrics._newlines.indexOf(char.charCodeAt(0)) >= 0;
	    }
	  }, {
	    key: 'isBreakingSpace',
	    value: function isBreakingSpace(char) {
	      if (typeof char !== 'string') {
	        return false;
	      }
	      return TextMetrics._breakingSpaces.indexOf(char.charCodeAt(0)) >= 0;
	    }
	  }, {
	    key: 'tokenize',
	    value: function tokenize(text) {
	      var tokens = [];
	      var token = '';
	      if (typeof text !== 'string') {
	        return tokens;
	      }
	      for (var i = 0; i < text.length; i++) {
	        var char = text[i];
	        if (TextMetrics.isBreakingSpace(char) || TextMetrics.isNewline(char)) {
	          if (token !== '') {
	            tokens.push(token);
	            token = '';
	          }
	          tokens.push(char);
	          continue;
	        }
	        token += char;
	      }
	      if (token !== '') {
	        tokens.push(token);
	      }
	      return tokens;
	    }
	  }, {
	    key: 'canBreakWords',
	    value: function canBreakWords(token, breakWords) {
	      return breakWords;
	    }
	  }, {
	    key: 'canBreakChars',
	    value: function canBreakChars(char, nextChar, token, index, breakWords) {
	      return true;
	    }
	  }, {
	    key: 'measureFont',
	    value: function measureFont(font) {
	      if (TextMetrics._fonts[font]) {
	        return TextMetrics._fonts[font];
	      }
	      var properties = {};
	      var canvas = TextMetrics._canvas;
	      var context = TextMetrics._context;
	      context.font = font;
	      var metricsString = TextMetrics.METRICS_STRING + TextMetrics.BASELINE_SYMBOL;
	      var width = Math.ceil(context.measureText(metricsString).width);
	      var baseline = Math.ceil(context.measureText(TextMetrics.BASELINE_SYMBOL).width);
	      var height = 2 * baseline;
	      baseline = baseline * TextMetrics.BASELINE_MULTIPLIER | 0;
	      canvas.width = width;
	      canvas.height = height;
	      context.fillStyle = '#f00';
	      context.fillRect(0, 0, width, height);
	      context.font = font;
	      context.textBaseline = 'alphabetic';
	      context.fillStyle = '#000';
	      context.fillText(metricsString, 0, baseline);
	      var imagedata = context.getImageData(0, 0, width, height).data;
	      var pixels = imagedata.length;
	      var line = width * 4;
	      var i = 0;
	      var idx = 0;
	      var stop = false;
	      for (i = 0; i < baseline; ++i) {
	        for (var j = 0; j < line; j += 4) {
	          if (imagedata[idx + j] !== 255) {
	            stop = true;
	            break;
	          }
	        }
	        if (!stop) {
	          idx += line;
	        } else {
	          break;
	        }
	      }
	      properties.ascent = baseline - i;
	      idx = pixels - line;
	      stop = false;
	      for (i = height; i > baseline; --i) {
	        for (var _j = 0; _j < line; _j += 4) {
	          if (imagedata[idx + _j] !== 255) {
	            stop = true;
	            break;
	          }
	        }
	        if (!stop) {
	          idx -= line;
	        } else {
	          break;
	        }
	      }
	      properties.descent = i - baseline;
	      properties.fontSize = properties.ascent + properties.descent;
	      TextMetrics._fonts[font] = properties;
	      return properties;
	    }
	  }, {
	    key: 'clearMetrics',
	    value: function clearMetrics() {
	      var font = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      if (font) {
	        delete TextMetrics._fonts[font];
	      } else {
	        TextMetrics._fonts = {};
	      }
	    }
	  }]);
	  return TextMetrics;
	}();
	var canvas = document.createElement('canvas');
	canvas.width = canvas.height = 10;
	TextMetrics._canvas = canvas;
	TextMetrics._context = canvas.getContext('2d');
	TextMetrics._fonts = {};
	TextMetrics.METRICS_STRING = '|Éq';
	TextMetrics.BASELINE_SYMBOL = 'M';
	TextMetrics.BASELINE_MULTIPLIER = 1.4;
	TextMetrics._newlines = [0x000A, 0x000D];
	TextMetrics._breakingSpaces = [0x0009, 0x0020, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2008, 0x2009, 0x200A, 0x205F, 0x3000];

	function trimCanvas(canvas) {
	  var width = canvas.width;
	  var height = canvas.height;
	  var context = canvas.getContext('2d');
	  var imageData = context.getImageData(0, 0, width, height);
	  var pixels = imageData.data;
	  var len = pixels.length;
	  var bound = {
	    top: null,
	    left: null,
	    right: null,
	    bottom: null
	  };
	  var data = null;
	  var i = void 0;
	  var x = void 0;
	  var y = void 0;
	  for (i = 0; i < len; i += 4) {
	    if (pixels[i + 3] !== 0) {
	      x = i / 4 % width;
	      y = ~~(i / 4 / width);
	      if (bound.top === null) {
	        bound.top = y;
	      }
	      if (bound.left === null) {
	        bound.left = x;
	      } else if (x < bound.left) {
	        bound.left = x;
	      }
	      if (bound.right === null) {
	        bound.right = x + 1;
	      } else if (bound.right < x) {
	        bound.right = x + 1;
	      }
	      if (bound.bottom === null) {
	        bound.bottom = y;
	      } else if (bound.bottom < y) {
	        bound.bottom = y;
	      }
	    }
	  }
	  if (bound.top !== null) {
	    width = bound.right - bound.left;
	    height = bound.bottom - bound.top + 1;
	    data = context.getImageData(bound.left, bound.top, width, height);
	  }
	  return {
	    height: height,
	    width: width,
	    data: data
	  };
	}

	var defaultDestroyOptions = {
	  texture: true,
	  children: false,
	  baseTexture: true
	};
	var Text = function (_Sprite) {
	  inherits(Text, _Sprite);
	  function Text(text, style, canvas) {
	    classCallCheck(this, Text);
	    canvas = canvas || document.createElement('canvas');
	    canvas.width = 3;
	    canvas.height = 3;
	    var texture = Texture.fromCanvas(canvas, settings.SCALE_MODE, 'text');
	    texture.orig = new Rectangle();
	    texture.trim = new Rectangle();
	    var _this = possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, texture));
	    Texture.addToCache(_this._texture, _this._texture.baseTexture.textureCacheIds[0]);
	    _this.canvas = canvas;
	    _this.context = _this.canvas.getContext('2d');
	    _this.resolution = settings.RESOLUTION;
	    _this._text = null;
	    _this._style = null;
	    _this._styleListener = null;
	    _this._font = '';
	    _this.text = text;
	    _this.style = style;
	    _this.localStyleID = -1;
	    _this._contextScaleFlag = 1;
	    return _this;
	  }
	  createClass(Text, [{
	    key: 'updateText',
	    value: function updateText(respectDirty) {
	      var style = this._style;
	      if (this.localStyleID !== style.styleID) {
	        this.dirty = true;
	        this.localStyleID = style.styleID;
	      }
	      if (!this.dirty && respectDirty) {
	        return;
	      }
	      this._font = this._style.toFontString();
	      var context = this.context;
	      var measured = TextMetrics.measureText(this._text, this._style, this._style.wordWrap, this.canvas);
	      var width = measured.width;
	      var height = measured.height;
	      var lines = measured.lines;
	      var lineHeight = measured.lineHeight;
	      var lineWidths = measured.lineWidths;
	      var maxLineWidth = measured.maxLineWidth;
	      var fontProperties = measured.fontProperties;
	      this.canvas.width = Math.ceil((Math.max(1, width) + style.padding * 2) * this.resolution);
	      this.canvas.height = Math.ceil((Math.max(1, height) + style.padding * 2) * this.resolution);
	      if (this.resolution !== this._contextScaleFlag) {
	        context.scale(this.resolution, this.resolution);
	        if (navigator.isCanvasPlus && navigator.platform !== 'devtools') {
	          this._contextScaleFlag = this.resolution;
	        }
	      }
	      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      context.font = this._font;
	      context.strokeStyle = style.stroke;
	      context.lineWidth = style.strokeThickness;
	      context.textBaseline = style.textBaseline;
	      context.lineJoin = style.lineJoin;
	      context.miterLimit = style.miterLimit;
	      var linePositionX = void 0;
	      var linePositionY = void 0;
	      if (style.dropShadow) {
	        context.fillStyle = style.dropShadowColor;
	        context.globalAlpha = style.dropShadowAlpha;
	        context.shadowBlur = style.dropShadowBlur;
	        if (style.dropShadowBlur > 0) {
	          context.shadowColor = style.dropShadowColor;
	        }
	        var xShadowOffset = Math.cos(style.dropShadowAngle) * style.dropShadowDistance;
	        var yShadowOffset = Math.sin(style.dropShadowAngle) * style.dropShadowDistance;
	        for (var i = 0; i < lines.length; i++) {
	          linePositionX = style.strokeThickness / 2;
	          linePositionY = style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent;
	          if (style.align === 'right') {
	            linePositionX += maxLineWidth - lineWidths[i];
	          } else if (style.align === 'center') {
	            linePositionX += (maxLineWidth - lineWidths[i]) / 2;
	          }
	          if (style.fill) {
	            this.drawLetterSpacing(lines[i], linePositionX + xShadowOffset + style.padding, linePositionY + yShadowOffset + style.padding);
	            if (style.stroke && style.strokeThickness) {
	              context.strokeStyle = style.dropShadowColor;
	              this.drawLetterSpacing(lines[i], linePositionX + xShadowOffset + style.padding, linePositionY + yShadowOffset + style.padding, true);
	              context.strokeStyle = style.stroke;
	            }
	          }
	        }
	      }
	      context.shadowBlur = 0;
	      context.globalAlpha = 1;
	      context.fillStyle = this._generateFillStyle(style, lines);
	      for (var _i = 0; _i < lines.length; _i++) {
	        linePositionX = style.strokeThickness / 2;
	        linePositionY = style.strokeThickness / 2 + _i * lineHeight + fontProperties.ascent;
	        if (style.align === 'right') {
	          linePositionX += maxLineWidth - lineWidths[_i];
	        } else if (style.align === 'center') {
	          linePositionX += (maxLineWidth - lineWidths[_i]) / 2;
	        }
	        if (style.stroke && style.strokeThickness) {
	          this.drawLetterSpacing(lines[_i], linePositionX + style.padding, linePositionY + style.padding, true);
	        }
	        if (style.fill) {
	          this.drawLetterSpacing(lines[_i], linePositionX + style.padding, linePositionY + style.padding);
	        }
	      }
	      this.updateTexture();
	    }
	  }, {
	    key: 'drawLetterSpacing',
	    value: function drawLetterSpacing(text, x, y) {
	      var isStroke = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	      var style = this._style;
	      var letterSpacing = style.letterSpacing;
	      if (letterSpacing === 0) {
	        if (isStroke) {
	          this.context.strokeText(text, x, y);
	        } else {
	          this.context.fillText(text, x, y);
	        }
	        return;
	      }
	      var characters = String.prototype.split.call(text, '');
	      var currentPosition = x;
	      var index = 0;
	      var current = '';
	      while (index < text.length) {
	        current = characters[index++];
	        if (isStroke) {
	          this.context.strokeText(current, currentPosition, y);
	        } else {
	          this.context.fillText(current, currentPosition, y);
	        }
	        currentPosition += this.context.measureText(current).width + letterSpacing;
	      }
	    }
	  }, {
	    key: 'updateTexture',
	    value: function updateTexture() {
	      var canvas = this.canvas;
	      if (this._style.trim) {
	        var trimmed = trimCanvas(canvas);
	        if (trimmed.data) {
	          canvas.width = trimmed.width;
	          canvas.height = trimmed.height;
	          this.context.putImageData(trimmed.data, 0, 0);
	        }
	      }
	      var texture = this._texture;
	      var style = this._style;
	      var padding = style.trim ? 0 : style.padding;
	      var baseTexture = texture.baseTexture;
	      baseTexture.hasLoaded = true;
	      baseTexture.resolution = this.resolution;
	      baseTexture.realWidth = canvas.width;
	      baseTexture.realHeight = canvas.height;
	      baseTexture.width = canvas.width / this.resolution;
	      baseTexture.height = canvas.height / this.resolution;
	      texture.trim.width = texture._frame.width = canvas.width / this.resolution;
	      texture.trim.height = texture._frame.height = canvas.height / this.resolution;
	      texture.trim.x = -padding;
	      texture.trim.y = -padding;
	      texture.orig.width = texture._frame.width - padding * 2;
	      texture.orig.height = texture._frame.height - padding * 2;
	      this._onTextureUpdate();
	      baseTexture.emit('update', baseTexture);
	      this.dirty = false;
	    }
	  }, {
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {
	      if (this.resolution !== renderer.resolution) {
	        this.resolution = renderer.resolution;
	        this.dirty = true;
	      }
	      this.updateText(true);
	      get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'renderWebGL', this).call(this, renderer);
	    }
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      if (this.resolution !== renderer.resolution) {
	        this.resolution = renderer.resolution;
	        this.dirty = true;
	      }
	      this.updateText(true);
	      get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), '_renderCanvas', this).call(this, renderer);
	    }
	  }, {
	    key: 'getLocalBounds',
	    value: function getLocalBounds(rect) {
	      this.updateText(true);
	      return get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'getLocalBounds', this).call(this, rect);
	    }
	  }, {
	    key: '_calculateBounds',
	    value: function _calculateBounds() {
	      this.updateText(true);
	      this.calculateVertices();
	      this._bounds.addQuad(this.vertexData);
	    }
	  }, {
	    key: '_onStyleChange',
	    value: function _onStyleChange() {
	      this.dirty = true;
	    }
	  }, {
	    key: '_generateFillStyle',
	    value: function _generateFillStyle(style, lines) {
	      if (!Array.isArray(style.fill)) {
	        return style.fill;
	      }
	      var gradient = void 0;
	      var totalIterations = void 0;
	      var currentIteration = void 0;
	      var stop = void 0;
	      var width = this.canvas.width / this.resolution;
	      var height = this.canvas.height / this.resolution;
	      var fill = style.fill.slice();
	      var fillGradientStops = style.fillGradientStops.slice();
	      if (!fillGradientStops.length) {
	        var lengthPlus1 = fill.length + 1;
	        for (var i = 1; i < lengthPlus1; ++i) {
	          fillGradientStops.push(i / lengthPlus1);
	        }
	      }
	      fill.unshift(style.fill[0]);
	      fillGradientStops.unshift(0);
	      fill.push(style.fill[style.fill.length - 1]);
	      fillGradientStops.push(1);
	      if (style.fillGradientType === TEXT_GRADIENT.LINEAR_VERTICAL) {
	        gradient = this.context.createLinearGradient(width / 2, 0, width / 2, height);
	        totalIterations = (fill.length + 1) * lines.length;
	        currentIteration = 0;
	        for (var _i2 = 0; _i2 < lines.length; _i2++) {
	          currentIteration += 1;
	          for (var j = 0; j < fill.length; j++) {
	            if (typeof fillGradientStops[j] === 'number') {
	              stop = fillGradientStops[j] / lines.length + _i2 / lines.length;
	            } else {
	              stop = currentIteration / totalIterations;
	            }
	            gradient.addColorStop(stop, fill[j]);
	            currentIteration++;
	          }
	        }
	      } else {
	        gradient = this.context.createLinearGradient(0, height / 2, width, height / 2);
	        totalIterations = fill.length + 1;
	        currentIteration = 1;
	        for (var _i3 = 0; _i3 < fill.length; _i3++) {
	          if (typeof fillGradientStops[_i3] === 'number') {
	            stop = fillGradientStops[_i3];
	          } else {
	            stop = currentIteration / totalIterations;
	          }
	          gradient.addColorStop(stop, fill[_i3]);
	          currentIteration++;
	        }
	      }
	      return gradient;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(options) {
	      if (typeof options === 'boolean') {
	        options = { children: options };
	      }
	      options = Object.assign({}, defaultDestroyOptions, options);
	      get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'destroy', this).call(this, options);
	      this.context = null;
	      this.canvas = null;
	      this._style = null;
	    }
	  }, {
	    key: 'width',
	    get: function get$$1() {
	      this.updateText(true);
	      return Math.abs(this.scale.x) * this._texture.orig.width;
	    },
	    set: function set$$1(value) {
	      this.updateText(true);
	      var s = Math.sign(this.scale.x) || 1;
	      this.scale.x = s * value / this._texture.orig.width;
	      this._width = value;
	    }
	  }, {
	    key: 'height',
	    get: function get$$1() {
	      this.updateText(true);
	      return Math.abs(this.scale.y) * this._texture.orig.height;
	    },
	    set: function set$$1(value) {
	      this.updateText(true);
	      var s = Math.sign(this.scale.y) || 1;
	      this.scale.y = s * value / this._texture.orig.height;
	      this._height = value;
	    }
	  }, {
	    key: 'style',
	    get: function get$$1() {
	      return this._style;
	    },
	    set: function set$$1(style) {
	      style = style || {};
	      if (style instanceof TextStyle) {
	        this._style = style;
	      } else {
	        this._style = new TextStyle(style);
	      }
	      this.localStyleID = -1;
	      this.dirty = true;
	    }
	  }, {
	    key: 'text',
	    get: function get$$1() {
	      return this._text;
	    },
	    set: function set$$1(text) {
	      text = String(text === '' || text === null || text === undefined ? ' ' : text);
	      if (this._text === text) {
	        return;
	      }
	      this._text = text;
	      this.dirty = true;
	    }
	  }]);
	  return Text;
	}(Sprite);

	var GraphicsData = function () {
	  function GraphicsData(lineWidth, lineColor, lineAlpha, fillColor, fillAlpha, fill, nativeLines, shape, lineAlignment) {
	    classCallCheck(this, GraphicsData);
	    this.lineWidth = lineWidth;
	    this.lineAlignment = lineAlignment;
	    this.nativeLines = nativeLines;
	    this.lineColor = lineColor;
	    this.lineAlpha = lineAlpha;
	    this._lineTint = lineColor;
	    this.fillColor = fillColor;
	    this.fillAlpha = fillAlpha;
	    this._fillTint = fillColor;
	    this.fill = fill;
	    this.holes = [];
	    this.shape = shape;
	    this.type = shape.type;
	  }
	  createClass(GraphicsData, [{
	    key: "clone",
	    value: function clone() {
	      return new GraphicsData(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.fill, this.nativeLines, this.shape);
	    }
	  }, {
	    key: "addHole",
	    value: function addHole(shape) {
	      this.holes.push(shape);
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.shape = null;
	      this.holes = null;
	    }
	  }]);
	  return GraphicsData;
	}();

	function bezierCurveTo(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY, n) {
	  var path = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : [];
	  var dt = 0;
	  var dt2 = 0;
	  var dt3 = 0;
	  var t2 = 0;
	  var t3 = 0;
	  path.push(fromX, fromY);
	  for (var i = 1, j = 0; i <= n; ++i) {
	    j = i / n;
	    dt = 1 - j;
	    dt2 = dt * dt;
	    dt3 = dt2 * dt;
	    t2 = j * j;
	    t3 = t2 * j;
	    path.push(dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX, dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY);
	  }
	  return path;
	}

	var canvasRenderer = void 0;
	var tempMatrix$1 = new Matrix();
	var tempPoint$1 = new Point();
	var tempColor1 = new Float32Array(4);
	var tempColor2 = new Float32Array(4);
	var Graphics = function (_Container) {
	  inherits(Graphics, _Container);
	  function Graphics() {
	    var nativeLines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	    classCallCheck(this, Graphics);
	    var _this = possibleConstructorReturn(this, (Graphics.__proto__ || Object.getPrototypeOf(Graphics)).call(this));
	    _this.fillAlpha = 1;
	    _this.lineWidth = 0;
	    _this.nativeLines = nativeLines;
	    _this.lineColor = 0;
	    _this.lineAlignment = 0.5;
	    _this.graphicsData = [];
	    _this.tint = 0xFFFFFF;
	    _this._prevTint = 0xFFFFFF;
	    _this.blendMode = BLEND_MODES.NORMAL;
	    _this.currentPath = null;
	    _this._webGL = {};
	    _this.isMask = false;
	    _this.boundsPadding = 0;
	    _this._localBounds = new Bounds();
	    _this.dirty = 0;
	    _this.fastRectDirty = -1;
	    _this.clearDirty = 0;
	    _this.boundsDirty = -1;
	    _this.cachedSpriteDirty = false;
	    _this._spriteRect = null;
	    _this._fastRect = false;
	    _this._prevRectTint = null;
	    _this._prevRectFillColor = null;
	    return _this;
	  }
	  createClass(Graphics, [{
	    key: 'clone',
	    value: function clone() {
	      var clone = new Graphics();
	      clone.renderable = this.renderable;
	      clone.fillAlpha = this.fillAlpha;
	      clone.lineWidth = this.lineWidth;
	      clone.lineColor = this.lineColor;
	      clone.lineAlignment = this.lineAlignment;
	      clone.tint = this.tint;
	      clone.blendMode = this.blendMode;
	      clone.isMask = this.isMask;
	      clone.boundsPadding = this.boundsPadding;
	      clone.dirty = 0;
	      clone.cachedSpriteDirty = this.cachedSpriteDirty;
	      for (var i = 0; i < this.graphicsData.length; ++i) {
	        clone.graphicsData.push(this.graphicsData[i].clone());
	      }
	      clone.currentPath = clone.graphicsData[clone.graphicsData.length - 1];
	      clone.updateLocalBounds();
	      return clone;
	    }
	  }, {
	    key: '_quadraticCurveLength',
	    value: function _quadraticCurveLength(fromX, fromY, cpX, cpY, toX, toY) {
	      var ax = fromX - (2.0 * cpX + toX);
	      var ay = fromY - (2.0 * cpY + toY);
	      var bx = 2.0 * ((cpX - 2.0) * fromX);
	      var by = 2.0 * ((cpY - 2.0) * fromY);
	      var a = 4.0 * (ax * ax + ay * ay);
	      var b = 4.0 * (ax * bx + ay * by);
	      var c = bx * bx + by * by;
	      var s = 2.0 * Math.sqrt(a + b + c);
	      var a2 = Math.sqrt(a);
	      var a32 = 2.0 * a * a2;
	      var c2 = 2.0 * Math.sqrt(c);
	      var ba = b / a2;
	      return (a32 * s + a2 * b * (s - c2) + (4.0 * c * a - b * b) * Math.log((2.0 * a2 + ba + s) / (ba + c2))) / (4.0 * a32);
	    }
	  }, {
	    key: '_bezierCurveLength',
	    value: function _bezierCurveLength(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY) {
	      var n = 10;
	      var result = 0.0;
	      var t = 0.0;
	      var t2 = 0.0;
	      var t3 = 0.0;
	      var nt = 0.0;
	      var nt2 = 0.0;
	      var nt3 = 0.0;
	      var x = 0.0;
	      var y = 0.0;
	      var dx = 0.0;
	      var dy = 0.0;
	      var prevX = fromX;
	      var prevY = fromY;
	      for (var i = 1; i <= n; ++i) {
	        t = i / n;
	        t2 = t * t;
	        t3 = t2 * t;
	        nt = 1.0 - t;
	        nt2 = nt * nt;
	        nt3 = nt2 * nt;
	        x = nt3 * fromX + 3.0 * nt2 * t * cpX + 3.0 * nt * t2 * cpX2 + t3 * toX;
	        y = nt3 * fromY + 3.0 * nt2 * t * cpY + 3 * nt * t2 * cpY2 + t3 * toY;
	        dx = prevX - x;
	        dy = prevY - y;
	        prevX = x;
	        prevY = y;
	        result += Math.sqrt(dx * dx + dy * dy);
	      }
	      return result;
	    }
	  }, {
	    key: '_segmentsCount',
	    value: function _segmentsCount(length) {
	      var result = Math.ceil(length / Graphics.CURVES.maxLength);
	      if (result < Graphics.CURVES.minSegments) {
	        result = Graphics.CURVES.minSegments;
	      } else if (result > Graphics.CURVES.maxSegments) {
	        result = Graphics.CURVES.maxSegments;
	      }
	      return result;
	    }
	  }, {
	    key: 'lineStyle',
	    value: function lineStyle() {
	      var lineWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var color$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var alpha = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	      var alignment = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.5;
	      this.lineWidth = lineWidth;
	      this.lineColor = color$$1;
	      this.lineAlpha = alpha;
	      this.lineAlignment = alignment;
	      if (this.currentPath) {
	        if (this.currentPath.shape.points.length) {
	          var shape = new Polygon(this.currentPath.shape.points.slice(-2));
	          shape.closed = false;
	          this.drawShape(shape);
	        } else {
	          this.currentPath.lineWidth = this.lineWidth;
	          this.currentPath.lineColor = this.lineColor;
	          this.currentPath.lineAlpha = this.lineAlpha;
	          this.currentPath.lineAlignment = this.lineAlignment;
	        }
	      }
	      return this;
	    }
	  }, {
	    key: 'moveTo',
	    value: function moveTo(x, y) {
	      var shape = new Polygon([x, y]);
	      shape.closed = false;
	      this.drawShape(shape);
	      return this;
	    }
	  }, {
	    key: 'lineTo',
	    value: function lineTo(x, y) {
	      var points = this.currentPath.shape.points;
	      var fromX = points[points.length - 2];
	      var fromY = points[points.length - 1];
	      if (fromX !== x || fromY !== y) {
	        points.push(x, y);
	        this.dirty++;
	      }
	      return this;
	    }
	  }, {
	    key: 'quadraticCurveTo',
	    value: function quadraticCurveTo(cpX, cpY, toX, toY) {
	      if (this.currentPath) {
	        if (this.currentPath.shape.points.length === 0) {
	          this.currentPath.shape.points = [0, 0];
	        }
	      } else {
	        this.moveTo(0, 0);
	      }
	      var points = this.currentPath.shape.points;
	      var xa = 0;
	      var ya = 0;
	      if (points.length === 0) {
	        this.moveTo(0, 0);
	      }
	      var fromX = points[points.length - 2];
	      var fromY = points[points.length - 1];
	      var n = Graphics.CURVES.adaptive ? this._segmentsCount(this._quadraticCurveLength(fromX, fromY, cpX, cpY, toX, toY)) : 20;
	      for (var i = 1; i <= n; ++i) {
	        var j = i / n;
	        xa = fromX + (cpX - fromX) * j;
	        ya = fromY + (cpY - fromY) * j;
	        points.push(xa + (cpX + (toX - cpX) * j - xa) * j, ya + (cpY + (toY - cpY) * j - ya) * j);
	      }
	      this.dirty++;
	      return this;
	    }
	  }, {
	    key: 'bezierCurveTo',
	    value: function bezierCurveTo$$1(cpX, cpY, cpX2, cpY2, toX, toY) {
	      if (this.currentPath) {
	        if (this.currentPath.shape.points.length === 0) {
	          this.currentPath.shape.points = [0, 0];
	        }
	      } else {
	        this.moveTo(0, 0);
	      }
	      var points = this.currentPath.shape.points;
	      var fromX = points[points.length - 2];
	      var fromY = points[points.length - 1];
	      points.length -= 2;
	      var n = Graphics.CURVES.adaptive ? this._segmentsCount(this._bezierCurveLength(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY)) : 20;
	      bezierCurveTo(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY, n, points);
	      this.dirty++;
	      return this;
	    }
	  }, {
	    key: 'arcTo',
	    value: function arcTo(x1, y1, x2, y2, radius) {
	      if (this.currentPath) {
	        if (this.currentPath.shape.points.length === 0) {
	          this.currentPath.shape.points.push(x1, y1);
	        }
	      } else {
	        this.moveTo(x1, y1);
	      }
	      var points = this.currentPath.shape.points;
	      var fromX = points[points.length - 2];
	      var fromY = points[points.length - 1];
	      var a1 = fromY - y1;
	      var b1 = fromX - x1;
	      var a2 = y2 - y1;
	      var b2 = x2 - x1;
	      var mm = Math.abs(a1 * b2 - b1 * a2);
	      if (mm < 1.0e-8 || radius === 0) {
	        if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
	          points.push(x1, y1);
	        }
	      } else {
	        var dd = a1 * a1 + b1 * b1;
	        var cc = a2 * a2 + b2 * b2;
	        var tt = a1 * a2 + b1 * b2;
	        var k1 = radius * Math.sqrt(dd) / mm;
	        var k2 = radius * Math.sqrt(cc) / mm;
	        var j1 = k1 * tt / dd;
	        var j2 = k2 * tt / cc;
	        var cx = k1 * b2 + k2 * b1;
	        var cy = k1 * a2 + k2 * a1;
	        var px = b1 * (k2 + j1);
	        var py = a1 * (k2 + j1);
	        var qx = b2 * (k1 + j2);
	        var qy = a2 * (k1 + j2);
	        var startAngle = Math.atan2(py - cy, px - cx);
	        var endAngle = Math.atan2(qy - cy, qx - cx);
	        this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
	      }
	      this.dirty++;
	      return this;
	    }
	  }, {
	    key: 'arc',
	    value: function arc(cx, cy, radius, startAngle, endAngle) {
	      var anticlockwise = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
	      if (startAngle === endAngle) {
	        return this;
	      }
	      if (!anticlockwise && endAngle <= startAngle) {
	        endAngle += PI_2;
	      } else if (anticlockwise && startAngle <= endAngle) {
	        startAngle += PI_2;
	      }
	      var sweep = endAngle - startAngle;
	      var segs = Graphics.CURVES.adaptive ? this._segmentsCount(Math.abs(sweep) * radius) : Math.ceil(Math.abs(sweep) / PI_2) * 40;
	      if (sweep === 0) {
	        return this;
	      }
	      var startX = cx + Math.cos(startAngle) * radius;
	      var startY = cy + Math.sin(startAngle) * radius;
	      var points = this.currentPath ? this.currentPath.shape.points : null;
	      if (points) {
	        var xDiff = Math.abs(points[points.length - 2] - startX);
	        var yDiff = Math.abs(points[points.length - 1] - startY);
	        if (xDiff < 0.001 && yDiff < 0.001) ; else {
	          points.push(startX, startY);
	        }
	      } else {
	        this.moveTo(startX, startY);
	        points = this.currentPath.shape.points;
	      }
	      var theta = sweep / (segs * 2);
	      var theta2 = theta * 2;
	      var cTheta = Math.cos(theta);
	      var sTheta = Math.sin(theta);
	      var segMinus = segs - 1;
	      var remainder = segMinus % 1 / segMinus;
	      for (var i = 0; i <= segMinus; ++i) {
	        var real = i + remainder * i;
	        var angle = theta + startAngle + theta2 * real;
	        var c = Math.cos(angle);
	        var s = -Math.sin(angle);
	        points.push((cTheta * c + sTheta * s) * radius + cx, (cTheta * -s + sTheta * c) * radius + cy);
	      }
	      this.dirty++;
	      return this;
	    }
	  }, {
	    key: 'beginFill',
	    value: function beginFill() {
	      var color$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	      this.filling = true;
	      this.fillColor = color$$1;
	      this.fillAlpha = alpha;
	      if (this.currentPath) {
	        if (this.currentPath.shape.points.length <= 2) {
	          this.currentPath.fill = this.filling;
	          this.currentPath.fillColor = this.fillColor;
	          this.currentPath.fillAlpha = this.fillAlpha;
	        }
	      }
	      return this;
	    }
	  }, {
	    key: 'endFill',
	    value: function endFill() {
	      this.filling = false;
	      this.fillColor = null;
	      this.fillAlpha = 1;
	      return this;
	    }
	  }, {
	    key: 'drawRect',
	    value: function drawRect(x, y, width, height) {
	      this.drawShape(new Rectangle(x, y, width, height));
	      return this;
	    }
	  }, {
	    key: 'drawRoundedRect',
	    value: function drawRoundedRect(x, y, width, height, radius) {
	      this.drawShape(new RoundedRectangle(x, y, width, height, radius));
	      return this;
	    }
	  }, {
	    key: 'drawCircle',
	    value: function drawCircle(x, y, radius) {
	      this.drawShape(new Circle(x, y, radius));
	      return this;
	    }
	  }, {
	    key: 'drawEllipse',
	    value: function drawEllipse(x, y, width, height) {
	      this.drawShape(new Ellipse(x, y, width, height));
	      return this;
	    }
	  }, {
	    key: 'drawPolygon',
	    value: function drawPolygon(path) {
	      var points = path;
	      var closed = true;
	      if (points instanceof Polygon) {
	        closed = points.closed;
	        points = points.points;
	      }
	      if (!Array.isArray(points)) {
	        points = new Array(arguments.length);
	        for (var i = 0; i < points.length; ++i) {
	          points[i] = arguments[i];
	        }
	      }
	      var shape = new Polygon(points);
	      shape.closed = closed;
	      this.drawShape(shape);
	      return this;
	    }
	  }, {
	    key: 'drawStar',
	    value: function drawStar(x, y, points, radius, innerRadius) {
	      var rotation = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
	      innerRadius = innerRadius || radius / 2;
	      var startAngle = -1 * Math.PI / 2 + rotation;
	      var len = points * 2;
	      var delta = PI_2 / len;
	      var polygon = [];
	      for (var i = 0; i < len; i++) {
	        var r = i % 2 ? innerRadius : radius;
	        var angle = i * delta + startAngle;
	        polygon.push(x + r * Math.cos(angle), y + r * Math.sin(angle));
	      }
	      return this.drawPolygon(polygon);
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      if (this.lineWidth || this.filling || this.graphicsData.length > 0) {
	        this.lineWidth = 0;
	        this.lineAlignment = 0.5;
	        this.filling = false;
	        this.boundsDirty = -1;
	        this.canvasTintDirty = -1;
	        this.dirty++;
	        this.clearDirty++;
	        this.graphicsData.length = 0;
	      }
	      this.currentPath = null;
	      this._spriteRect = null;
	      return this;
	    }
	  }, {
	    key: 'isFastRect',
	    value: function isFastRect() {
	      return this.graphicsData.length === 1 && this.graphicsData[0].shape.type === SHAPES.RECT && !this.graphicsData[0].lineWidth;
	    }
	  }, {
	    key: '_renderWebGL',
	    value: function _renderWebGL(renderer) {
	      if (this.dirty !== this.fastRectDirty) {
	        this.fastRectDirty = this.dirty;
	        this._fastRect = this.isFastRect();
	      }
	      if (this._fastRect) {
	        this._renderSpriteRect(renderer);
	      } else {
	        renderer.setObjectRenderer(renderer.plugins.graphics);
	        renderer.plugins.graphics.render(this);
	      }
	    }
	  }, {
	    key: '_renderSpriteRect',
	    value: function _renderSpriteRect(renderer) {
	      var rect = this.graphicsData[0].shape;
	      if (!this._spriteRect) {
	        this._spriteRect = new Sprite(new Texture(Texture.WHITE));
	      }
	      var sprite = this._spriteRect;
	      var fillColor = this.graphicsData[0].fillColor;
	      if (this.tint === 0xffffff) {
	        sprite.tint = fillColor;
	      } else if (this.tint !== this._prevRectTint || fillColor !== this._prevRectFillColor) {
	        var t1 = tempColor1;
	        var t2 = tempColor2;
	        hex2rgb(fillColor, t1);
	        hex2rgb(this.tint, t2);
	        t1[0] *= t2[0];
	        t1[1] *= t2[1];
	        t1[2] *= t2[2];
	        sprite.tint = rgb2hex(t1);
	        this._prevRectTint = this.tint;
	        this._prevRectFillColor = fillColor;
	      }
	      sprite.alpha = this.graphicsData[0].fillAlpha;
	      sprite.worldAlpha = this.worldAlpha * sprite.alpha;
	      sprite.blendMode = this.blendMode;
	      sprite._texture._frame.width = rect.width;
	      sprite._texture._frame.height = rect.height;
	      sprite.transform.worldTransform = this.transform.worldTransform;
	      sprite.anchor.set(-rect.x / rect.width, -rect.y / rect.height);
	      sprite._onAnchorUpdate();
	      sprite._renderWebGL(renderer);
	    }
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      if (this.isMask === true) {
	        return;
	      }
	      renderer.plugins.graphics.render(this);
	    }
	  }, {
	    key: '_calculateBounds',
	    value: function _calculateBounds() {
	      if (this.boundsDirty !== this.dirty) {
	        this.boundsDirty = this.dirty;
	        this.updateLocalBounds();
	        this.cachedSpriteDirty = true;
	      }
	      var lb = this._localBounds;
	      this._bounds.addFrame(this.transform, lb.minX, lb.minY, lb.maxX, lb.maxY);
	    }
	  }, {
	    key: 'containsPoint',
	    value: function containsPoint(point$$1) {
	      this.worldTransform.applyInverse(point$$1, tempPoint$1);
	      var graphicsData = this.graphicsData;
	      for (var i = 0; i < graphicsData.length; ++i) {
	        var data = graphicsData[i];
	        if (!data.fill) {
	          continue;
	        }
	        if (data.shape) {
	          if (data.shape.contains(tempPoint$1.x, tempPoint$1.y)) {
	            if (data.holes) {
	              for (var _i = 0; _i < data.holes.length; _i++) {
	                var hole = data.holes[_i];
	                if (hole.contains(tempPoint$1.x, tempPoint$1.y)) {
	                  return false;
	                }
	              }
	            }
	            return true;
	          }
	        }
	      }
	      return false;
	    }
	  }, {
	    key: 'updateLocalBounds',
	    value: function updateLocalBounds() {
	      var minX = Infinity;
	      var maxX = -Infinity;
	      var minY = Infinity;
	      var maxY = -Infinity;
	      if (this.graphicsData.length) {
	        var shape = 0;
	        var x = 0;
	        var y = 0;
	        var w = 0;
	        var h = 0;
	        for (var i = 0; i < this.graphicsData.length; i++) {
	          var data = this.graphicsData[i];
	          var type = data.type;
	          var lineWidth = data.lineWidth;
	          shape = data.shape;
	          if (type === SHAPES.RECT || type === SHAPES.RREC) {
	            x = shape.x - lineWidth / 2;
	            y = shape.y - lineWidth / 2;
	            w = shape.width + lineWidth;
	            h = shape.height + lineWidth;
	            minX = x < minX ? x : minX;
	            maxX = x + w > maxX ? x + w : maxX;
	            minY = y < minY ? y : minY;
	            maxY = y + h > maxY ? y + h : maxY;
	          } else if (type === SHAPES.CIRC) {
	            x = shape.x;
	            y = shape.y;
	            w = shape.radius + lineWidth / 2;
	            h = shape.radius + lineWidth / 2;
	            minX = x - w < minX ? x - w : minX;
	            maxX = x + w > maxX ? x + w : maxX;
	            minY = y - h < minY ? y - h : minY;
	            maxY = y + h > maxY ? y + h : maxY;
	          } else if (type === SHAPES.ELIP) {
	            x = shape.x;
	            y = shape.y;
	            w = shape.width + lineWidth / 2;
	            h = shape.height + lineWidth / 2;
	            minX = x - w < minX ? x - w : minX;
	            maxX = x + w > maxX ? x + w : maxX;
	            minY = y - h < minY ? y - h : minY;
	            maxY = y + h > maxY ? y + h : maxY;
	          } else {
	            var points = shape.points;
	            var x2 = 0;
	            var y2 = 0;
	            var dx = 0;
	            var dy = 0;
	            var rw = 0;
	            var rh = 0;
	            var cx = 0;
	            var cy = 0;
	            for (var j = 0; j + 2 < points.length; j += 2) {
	              x = points[j];
	              y = points[j + 1];
	              x2 = points[j + 2];
	              y2 = points[j + 3];
	              dx = Math.abs(x2 - x);
	              dy = Math.abs(y2 - y);
	              h = lineWidth;
	              w = Math.sqrt(dx * dx + dy * dy);
	              if (w < 1e-9) {
	                continue;
	              }
	              rw = (h / w * dy + dx) / 2;
	              rh = (h / w * dx + dy) / 2;
	              cx = (x2 + x) / 2;
	              cy = (y2 + y) / 2;
	              minX = cx - rw < minX ? cx - rw : minX;
	              maxX = cx + rw > maxX ? cx + rw : maxX;
	              minY = cy - rh < minY ? cy - rh : minY;
	              maxY = cy + rh > maxY ? cy + rh : maxY;
	            }
	          }
	        }
	      } else {
	        minX = 0;
	        maxX = 0;
	        minY = 0;
	        maxY = 0;
	      }
	      var padding = this.boundsPadding;
	      this._localBounds.minX = minX - padding;
	      this._localBounds.maxX = maxX + padding;
	      this._localBounds.minY = minY - padding;
	      this._localBounds.maxY = maxY + padding;
	    }
	  }, {
	    key: 'drawShape',
	    value: function drawShape(shape) {
	      if (this.currentPath) {
	        if (this.currentPath.shape.points.length <= 2) {
	          this.graphicsData.pop();
	        }
	      }
	      this.currentPath = null;
	      var data = new GraphicsData(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, this.nativeLines, shape, this.lineAlignment);
	      this.graphicsData.push(data);
	      if (data.type === SHAPES.POLY) {
	        data.shape.closed = data.shape.closed || this.filling;
	        this.currentPath = data;
	      }
	      this.dirty++;
	      return data;
	    }
	  }, {
	    key: 'generateCanvasTexture',
	    value: function generateCanvasTexture(scaleMode) {
	      var resolution = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	      var bounds = this.getLocalBounds();
	      var canvasBuffer = RenderTexture.create(bounds.width, bounds.height, scaleMode, resolution);
	      if (!canvasRenderer) {
	        canvasRenderer = new CanvasRenderer();
	      }
	      this.transform.updateLocalTransform();
	      this.transform.localTransform.copy(tempMatrix$1);
	      tempMatrix$1.invert();
	      tempMatrix$1.tx -= bounds.x;
	      tempMatrix$1.ty -= bounds.y;
	      canvasRenderer.render(this, canvasBuffer, true, tempMatrix$1);
	      var texture = Texture.fromCanvas(canvasBuffer.baseTexture._canvasRenderTarget.canvas, scaleMode, 'graphics');
	      texture.baseTexture.resolution = resolution;
	      texture.baseTexture.update();
	      return texture;
	    }
	  }, {
	    key: 'closePath',
	    value: function closePath() {
	      var currentPath = this.currentPath;
	      if (currentPath && currentPath.shape) {
	        currentPath.shape.close();
	      }
	      return this;
	    }
	  }, {
	    key: 'addHole',
	    value: function addHole() {
	      var hole = this.graphicsData.pop();
	      this.currentPath = this.graphicsData[this.graphicsData.length - 1];
	      this.currentPath.addHole(hole.shape);
	      this.currentPath = null;
	      return this;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(options) {
	      get(Graphics.prototype.__proto__ || Object.getPrototypeOf(Graphics.prototype), 'destroy', this).call(this, options);
	      for (var i = 0; i < this.graphicsData.length; ++i) {
	        this.graphicsData[i].destroy();
	      }
	      for (var id in this._webGL) {
	        for (var j = 0; j < this._webGL[id].data.length; ++j) {
	          this._webGL[id].data[j].destroy();
	        }
	      }
	      if (this._spriteRect) {
	        this._spriteRect.destroy();
	      }
	      this.graphicsData = null;
	      this.currentPath = null;
	      this._webGL = null;
	      this._localBounds = null;
	    }
	  }]);
	  return Graphics;
	}(Container);
	Graphics._SPRITE_TEXTURE = null;
	Graphics.CURVES = {
	  adaptive: false,
	  maxLength: 10,
	  minSegments: 8,
	  maxSegments: 2048
	};

	var WebGLGraphicsData = function () {
	  function WebGLGraphicsData(gl, shader, attribsState) {
	    classCallCheck(this, WebGLGraphicsData);
	    this.gl = gl;
	    this.color = [0, 0, 0];
	    this.points = [];
	    this.indices = [];
	    this.buffer = glCore.GLBuffer.createVertexBuffer(gl);
	    this.indexBuffer = glCore.GLBuffer.createIndexBuffer(gl);
	    this.dirty = true;
	    this.nativeLines = false;
	    this.glPoints = null;
	    this.glIndices = null;
	    this.shader = shader;
	    this.vao = new glCore.VertexArrayObject(gl, attribsState).addIndex(this.indexBuffer).addAttribute(this.buffer, shader.attributes.aVertexPosition, gl.FLOAT, false, 4 * 6, 0).addAttribute(this.buffer, shader.attributes.aColor, gl.FLOAT, false, 4 * 6, 2 * 4);
	  }
	  createClass(WebGLGraphicsData, [{
	    key: 'reset',
	    value: function reset() {
	      this.points.length = 0;
	      this.indices.length = 0;
	    }
	  }, {
	    key: 'upload',
	    value: function upload() {
	      this.glPoints = new Float32Array(this.points);
	      this.buffer.upload(this.glPoints);
	      this.glIndices = new Uint16Array(this.indices);
	      this.indexBuffer.upload(this.glIndices);
	      this.dirty = false;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.color = null;
	      this.points = null;
	      this.indices = null;
	      this.vao.destroy();
	      this.buffer.destroy();
	      this.indexBuffer.destroy();
	      this.gl = null;
	      this.buffer = null;
	      this.indexBuffer = null;
	      this.glPoints = null;
	      this.glIndices = null;
	    }
	  }]);
	  return WebGLGraphicsData;
	}();

	var PrimitiveShader = function (_Shader) {
	  inherits(PrimitiveShader, _Shader);
	  function PrimitiveShader(gl) {
	    classCallCheck(this, PrimitiveShader);
	    return possibleConstructorReturn(this, (PrimitiveShader.__proto__ || Object.getPrototypeOf(PrimitiveShader)).call(this, gl, '\nattribute vec2 aVertexPosition;\nattribute vec4 aColor;\n\nuniform mat3 translationMatrix;\nuniform mat3 projectionMatrix;\n\nuniform float alpha;\nuniform vec3 tint;\n\nvarying vec4 vColor;\n\nvoid main(void){\n  gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n  vColor = aColor * vec4(tint * alpha, alpha);\n}\n', '\nvarying vec4 vColor;\n\nvoid main(void){\n  gl_FragColor = vColor;\n}\n'));
	  }
	  return PrimitiveShader;
	}(Shader$1);

	function buildLine (graphicsData, webGLData, webGLDataNativeLines) {
	  if (graphicsData.nativeLines) {
	    buildNativeLine(graphicsData, webGLDataNativeLines);
	  } else {
	    buildLine$1(graphicsData, webGLData);
	  }
	}
	function buildLine$1(graphicsData, webGLData) {
	  var points = graphicsData.points;
	  if (points.length === 0) {
	    return;
	  }
	  var firstPoint = new Point(points[0], points[1]);
	  var lastPoint = new Point(points[points.length - 2], points[points.length - 1]);
	  if (firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y) {
	    points = points.slice();
	    points.pop();
	    points.pop();
	    lastPoint = new Point(points[points.length - 2], points[points.length - 1]);
	    var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) * 0.5;
	    var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) * 0.5;
	    points.unshift(midPointX, midPointY);
	    points.push(midPointX, midPointY);
	  }
	  var verts = webGLData.points;
	  var indices = webGLData.indices;
	  var length = points.length / 2;
	  var indexCount = points.length;
	  var indexStart = verts.length / 6;
	  var width = graphicsData.lineWidth / 2;
	  var color$$1 = hex2rgb(graphicsData.lineColor);
	  var alpha = graphicsData.lineAlpha;
	  var r = color$$1[0] * alpha;
	  var g = color$$1[1] * alpha;
	  var b = color$$1[2] * alpha;
	  var p1x = points[0];
	  var p1y = points[1];
	  var p2x = points[2];
	  var p2y = points[3];
	  var p3x = 0;
	  var p3y = 0;
	  var perpx = -(p1y - p2y);
	  var perpy = p1x - p2x;
	  var perp2x = 0;
	  var perp2y = 0;
	  var perp3x = 0;
	  var perp3y = 0;
	  var dist = Math.sqrt(perpx * perpx + perpy * perpy);
	  perpx /= dist;
	  perpy /= dist;
	  perpx *= width;
	  perpy *= width;
	  var ratio = graphicsData.lineAlignment;
	  var r1 = (1 - ratio) * 2;
	  var r2 = ratio * 2;
	  verts.push(p1x - perpx * r1, p1y - perpy * r1, r, g, b, alpha);
	  verts.push(p1x + perpx * r2, p1y + perpy * r2, r, g, b, alpha);
	  for (var i = 1; i < length - 1; ++i) {
	    p1x = points[(i - 1) * 2];
	    p1y = points[(i - 1) * 2 + 1];
	    p2x = points[i * 2];
	    p2y = points[i * 2 + 1];
	    p3x = points[(i + 1) * 2];
	    p3y = points[(i + 1) * 2 + 1];
	    perpx = -(p1y - p2y);
	    perpy = p1x - p2x;
	    dist = Math.sqrt(perpx * perpx + perpy * perpy);
	    perpx /= dist;
	    perpy /= dist;
	    perpx *= width;
	    perpy *= width;
	    perp2x = -(p2y - p3y);
	    perp2y = p2x - p3x;
	    dist = Math.sqrt(perp2x * perp2x + perp2y * perp2y);
	    perp2x /= dist;
	    perp2y /= dist;
	    perp2x *= width;
	    perp2y *= width;
	    var a1 = -perpy + p1y - (-perpy + p2y);
	    var b1 = -perpx + p2x - (-perpx + p1x);
	    var c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
	    var a2 = -perp2y + p3y - (-perp2y + p2y);
	    var b2 = -perp2x + p2x - (-perp2x + p3x);
	    var c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
	    var denom = a1 * b2 - a2 * b1;
	    if (Math.abs(denom) < 0.1) {
	      denom += 10.1;
	      verts.push(p2x - perpx * r1, p2y - perpy * r1, r, g, b, alpha);
	      verts.push(p2x + perpx * r2, p2y + perpy * r2, r, g, b, alpha);
	      continue;
	    }
	    var px = (b1 * c2 - b2 * c1) / denom;
	    var py = (a2 * c1 - a1 * c2) / denom;
	    var pdist = (px - p2x) * (px - p2x) + (py - p2y) * (py - p2y);
	    if (pdist > 196 * width * width) {
	      perp3x = perpx - perp2x;
	      perp3y = perpy - perp2y;
	      dist = Math.sqrt(perp3x * perp3x + perp3y * perp3y);
	      perp3x /= dist;
	      perp3y /= dist;
	      perp3x *= width;
	      perp3y *= width;
	      verts.push(p2x - perp3x * r1, p2y - perp3y * r1);
	      verts.push(r, g, b, alpha);
	      verts.push(p2x + perp3x * r2, p2y + perp3y * r2);
	      verts.push(r, g, b, alpha);
	      verts.push(p2x - perp3x * r2 * r1, p2y - perp3y * r1);
	      verts.push(r, g, b, alpha);
	      indexCount++;
	    } else {
	      verts.push(p2x + (px - p2x) * r1, p2y + (py - p2y) * r1);
	      verts.push(r, g, b, alpha);
	      verts.push(p2x - (px - p2x) * r2, p2y - (py - p2y) * r2);
	      verts.push(r, g, b, alpha);
	    }
	  }
	  p1x = points[(length - 2) * 2];
	  p1y = points[(length - 2) * 2 + 1];
	  p2x = points[(length - 1) * 2];
	  p2y = points[(length - 1) * 2 + 1];
	  perpx = -(p1y - p2y);
	  perpy = p1x - p2x;
	  dist = Math.sqrt(perpx * perpx + perpy * perpy);
	  perpx /= dist;
	  perpy /= dist;
	  perpx *= width;
	  perpy *= width;
	  verts.push(p2x - perpx * r1, p2y - perpy * r1);
	  verts.push(r, g, b, alpha);
	  verts.push(p2x + perpx * r2, p2y + perpy * r2);
	  verts.push(r, g, b, alpha);
	  indices.push(indexStart);
	  for (var _i = 0; _i < indexCount; ++_i) {
	    indices.push(indexStart++);
	  }
	  indices.push(indexStart - 1);
	}
	function buildNativeLine(graphicsData, webGLData) {
	  var i = 0;
	  var points = graphicsData.points;
	  if (points.length === 0) return;
	  var verts = webGLData.points;
	  var length = points.length / 2;
	  var color$$1 = hex2rgb(graphicsData.lineColor);
	  var alpha = graphicsData.lineAlpha;
	  var r = color$$1[0] * alpha;
	  var g = color$$1[1] * alpha;
	  var b = color$$1[2] * alpha;
	  for (i = 1; i < length; i++) {
	    var p1x = points[(i - 1) * 2];
	    var p1y = points[(i - 1) * 2 + 1];
	    var p2x = points[i * 2];
	    var p2y = points[i * 2 + 1];
	    verts.push(p1x, p1y);
	    verts.push(r, g, b, alpha);
	    verts.push(p2x, p2y);
	    verts.push(r, g, b, alpha);
	  }
	}

	function buildPoly(graphicsData, webGLData, webGLDataNativeLines) {
	  graphicsData.points = graphicsData.shape.points.slice();
	  var points = graphicsData.points;
	  if (graphicsData.fill && points.length >= 6) {
	    var holeArray = [];
	    var holes = graphicsData.holes;
	    for (var i = 0; i < holes.length; i++) {
	      var hole = holes[i];
	      holeArray.push(points.length / 2);
	      points = points.concat(hole.points);
	    }
	    var verts = webGLData.points;
	    var indices = webGLData.indices;
	    var length = points.length / 2;
	    var color$$1 = hex2rgb(graphicsData.fillColor);
	    var alpha = graphicsData.fillAlpha;
	    var r = color$$1[0] * alpha;
	    var g = color$$1[1] * alpha;
	    var b = color$$1[2] * alpha;
	    var triangles = earcut_1(points, holeArray, 2);
	    if (!triangles) {
	      return;
	    }
	    var vertPos = verts.length / 6;
	    for (var _i = 0; _i < triangles.length; _i += 3) {
	      indices.push(triangles[_i] + vertPos);
	      indices.push(triangles[_i] + vertPos);
	      indices.push(triangles[_i + 1] + vertPos);
	      indices.push(triangles[_i + 2] + vertPos);
	      indices.push(triangles[_i + 2] + vertPos);
	    }
	    for (var _i2 = 0; _i2 < length; _i2++) {
	      verts.push(points[_i2 * 2], points[_i2 * 2 + 1], r, g, b, alpha);
	    }
	  }
	  if (graphicsData.lineWidth > 0) {
	    buildLine(graphicsData, webGLData, webGLDataNativeLines);
	  }
	}

	function buildRectangle(graphicsData, webGLData, webGLDataNativeLines) {
	  var rectData = graphicsData.shape;
	  var x = rectData.x;
	  var y = rectData.y;
	  var width = rectData.width;
	  var height = rectData.height;
	  if (graphicsData.fill) {
	    var color$$1 = hex2rgb(graphicsData.fillColor);
	    var alpha = graphicsData.fillAlpha;
	    var r = color$$1[0] * alpha;
	    var g = color$$1[1] * alpha;
	    var b = color$$1[2] * alpha;
	    var verts = webGLData.points;
	    var indices = webGLData.indices;
	    var vertPos = verts.length / 6;
	    verts.push(x, y);
	    verts.push(r, g, b, alpha);
	    verts.push(x + width, y);
	    verts.push(r, g, b, alpha);
	    verts.push(x, y + height);
	    verts.push(r, g, b, alpha);
	    verts.push(x + width, y + height);
	    verts.push(r, g, b, alpha);
	    indices.push(vertPos, vertPos, vertPos + 1, vertPos + 2, vertPos + 3, vertPos + 3);
	  }
	  if (graphicsData.lineWidth) {
	    var tempPoints = graphicsData.points;
	    graphicsData.points = [x, y, x + width, y, x + width, y + height, x, y + height, x, y];
	    buildLine(graphicsData, webGLData, webGLDataNativeLines);
	    graphicsData.points = tempPoints;
	  }
	}

	function buildRoundedRectangle(graphicsData, webGLData, webGLDataNativeLines) {
	  var rrectData = graphicsData.shape;
	  var x = rrectData.x;
	  var y = rrectData.y;
	  var width = rrectData.width;
	  var height = rrectData.height;
	  var radius = rrectData.radius;
	  var recPoints = [];
	  recPoints.push(x, y + radius);
	  quadraticBezierCurve(x, y + height - radius, x, y + height, x + radius, y + height, recPoints);
	  quadraticBezierCurve(x + width - radius, y + height, x + width, y + height, x + width, y + height - radius, recPoints);
	  quadraticBezierCurve(x + width, y + radius, x + width, y, x + width - radius, y, recPoints);
	  quadraticBezierCurve(x + radius, y, x, y, x, y + radius + 0.0000000001, recPoints);
	  if (graphicsData.fill) {
	    var color$$1 = hex2rgb(graphicsData.fillColor);
	    var alpha = graphicsData.fillAlpha;
	    var r = color$$1[0] * alpha;
	    var g = color$$1[1] * alpha;
	    var b = color$$1[2] * alpha;
	    var verts = webGLData.points;
	    var indices = webGLData.indices;
	    var vecPos = verts.length / 6;
	    var triangles = earcut_1(recPoints, null, 2);
	    for (var i = 0, j = triangles.length; i < j; i += 3) {
	      indices.push(triangles[i] + vecPos);
	      indices.push(triangles[i] + vecPos);
	      indices.push(triangles[i + 1] + vecPos);
	      indices.push(triangles[i + 2] + vecPos);
	      indices.push(triangles[i + 2] + vecPos);
	    }
	    for (var _i = 0, _j = recPoints.length; _i < _j; _i++) {
	      verts.push(recPoints[_i], recPoints[++_i], r, g, b, alpha);
	    }
	  }
	  if (graphicsData.lineWidth) {
	    var tempPoints = graphicsData.points;
	    graphicsData.points = recPoints;
	    buildLine(graphicsData, webGLData, webGLDataNativeLines);
	    graphicsData.points = tempPoints;
	  }
	}
	function getPt(n1, n2, perc) {
	  var diff = n2 - n1;
	  return n1 + diff * perc;
	}
	function quadraticBezierCurve(fromX, fromY, cpX, cpY, toX, toY) {
	  var out = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
	  var n = 20;
	  var points = out;
	  var xa = 0;
	  var ya = 0;
	  var xb = 0;
	  var yb = 0;
	  var x = 0;
	  var y = 0;
	  for (var i = 0, j = 0; i <= n; ++i) {
	    j = i / n;
	    xa = getPt(fromX, cpX, j);
	    ya = getPt(fromY, cpY, j);
	    xb = getPt(cpX, toX, j);
	    yb = getPt(cpY, toY, j);
	    x = getPt(xa, xb, j);
	    y = getPt(ya, yb, j);
	    points.push(x, y);
	  }
	  return points;
	}

	function buildCircle(graphicsData, webGLData, webGLDataNativeLines) {
	  var circleData = graphicsData.shape;
	  var x = circleData.x;
	  var y = circleData.y;
	  var width = void 0;
	  var height = void 0;
	  if (graphicsData.type === SHAPES.CIRC) {
	    width = circleData.radius;
	    height = circleData.radius;
	  } else {
	    width = circleData.width;
	    height = circleData.height;
	  }
	  if (width === 0 || height === 0) {
	    return;
	  }
	  var totalSegs = Math.floor(30 * Math.sqrt(circleData.radius)) || Math.floor(15 * Math.sqrt(circleData.width + circleData.height));
	  var seg = Math.PI * 2 / totalSegs;
	  if (graphicsData.fill) {
	    var color$$1 = hex2rgb(graphicsData.fillColor);
	    var alpha = graphicsData.fillAlpha;
	    var r = color$$1[0] * alpha;
	    var g = color$$1[1] * alpha;
	    var b = color$$1[2] * alpha;
	    var verts = webGLData.points;
	    var indices = webGLData.indices;
	    var vecPos = verts.length / 6;
	    indices.push(vecPos);
	    for (var i = 0; i < totalSegs + 1; i++) {
	      verts.push(x, y, r, g, b, alpha);
	      verts.push(x + Math.sin(seg * i) * width, y + Math.cos(seg * i) * height, r, g, b, alpha);
	      indices.push(vecPos++, vecPos++);
	    }
	    indices.push(vecPos - 1);
	  }
	  if (graphicsData.lineWidth) {
	    var tempPoints = graphicsData.points;
	    graphicsData.points = [];
	    for (var _i = 0; _i < totalSegs; _i++) {
	      graphicsData.points.push(x + Math.sin(seg * -_i) * width, y + Math.cos(seg * -_i) * height);
	    }
	    graphicsData.points.push(graphicsData.points[0], graphicsData.points[1]);
	    buildLine(graphicsData, webGLData, webGLDataNativeLines);
	    graphicsData.points = tempPoints;
	  }
	}

	var GraphicsRenderer = function (_ObjectRenderer) {
	  inherits(GraphicsRenderer, _ObjectRenderer);
	  function GraphicsRenderer(renderer) {
	    classCallCheck(this, GraphicsRenderer);
	    var _this = possibleConstructorReturn(this, (GraphicsRenderer.__proto__ || Object.getPrototypeOf(GraphicsRenderer)).call(this, renderer));
	    _this.graphicsDataPool = [];
	    _this.primitiveShader = null;
	    _this.gl = renderer.gl;
	    _this.CONTEXT_UID = 0;
	    return _this;
	  }
	  createClass(GraphicsRenderer, [{
	    key: 'onContextChange',
	    value: function onContextChange() {
	      this.gl = this.renderer.gl;
	      this.CONTEXT_UID = this.renderer.CONTEXT_UID;
	      this.primitiveShader = new PrimitiveShader(this.gl);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      ObjectRenderer.prototype.destroy.call(this);
	      for (var i = 0; i < this.graphicsDataPool.length; ++i) {
	        this.graphicsDataPool[i].destroy();
	      }
	      this.graphicsDataPool = null;
	    }
	  }, {
	    key: 'render',
	    value: function render(graphics) {
	      var renderer = this.renderer;
	      var gl = renderer.gl;
	      var webGLData = void 0;
	      var webGL = graphics._webGL[this.CONTEXT_UID];
	      if (!webGL || graphics.dirty !== webGL.dirty) {
	        this.updateGraphics(graphics);
	        webGL = graphics._webGL[this.CONTEXT_UID];
	      }
	      var shader = this.primitiveShader;
	      renderer.bindShader(shader);
	      renderer.state.setBlendMode(graphics.blendMode);
	      for (var i = 0, n = webGL.data.length; i < n; i++) {
	        webGLData = webGL.data[i];
	        var shaderTemp = webGLData.shader;
	        renderer.bindShader(shaderTemp);
	        shaderTemp.uniforms.translationMatrix = graphics.transform.worldTransform.toArray(true);
	        shaderTemp.uniforms.tint = hex2rgb(graphics.tint);
	        shaderTemp.uniforms.alpha = graphics.worldAlpha;
	        renderer.bindVao(webGLData.vao);
	        if (webGLData.nativeLines) {
	          gl.drawArrays(gl.LINES, 0, webGLData.points.length / 6);
	        } else {
	          webGLData.vao.draw(gl.TRIANGLE_STRIP, webGLData.indices.length);
	        }
	      }
	    }
	  }, {
	    key: 'updateGraphics',
	    value: function updateGraphics(graphics) {
	      var gl = this.renderer.gl;
	      var webGL = graphics._webGL[this.CONTEXT_UID];
	      if (!webGL) {
	        webGL = graphics._webGL[this.CONTEXT_UID] = { lastIndex: 0, data: [], gl: gl, clearDirty: -1, dirty: -1 };
	      }
	      webGL.dirty = graphics.dirty;
	      if (graphics.clearDirty !== webGL.clearDirty) {
	        webGL.clearDirty = graphics.clearDirty;
	        for (var i = 0; i < webGL.data.length; i++) {
	          this.graphicsDataPool.push(webGL.data[i]);
	        }
	        webGL.data.length = 0;
	        webGL.lastIndex = 0;
	      }
	      var webGLData = void 0;
	      var webGLDataNativeLines = void 0;
	      for (var _i = webGL.lastIndex; _i < graphics.graphicsData.length; _i++) {
	        var data = graphics.graphicsData[_i];
	        webGLData = this.getWebGLData(webGL, 0);
	        if (data.nativeLines && data.lineWidth) {
	          webGLDataNativeLines = this.getWebGLData(webGL, 0, true);
	          webGL.lastIndex++;
	        }
	        if (data.type === SHAPES.POLY) {
	          buildPoly(data, webGLData, webGLDataNativeLines);
	        }
	        if (data.type === SHAPES.RECT) {
	          buildRectangle(data, webGLData, webGLDataNativeLines);
	        } else if (data.type === SHAPES.CIRC || data.type === SHAPES.ELIP) {
	          buildCircle(data, webGLData, webGLDataNativeLines);
	        } else if (data.type === SHAPES.RREC) {
	          buildRoundedRectangle(data, webGLData, webGLDataNativeLines);
	        }
	        webGL.lastIndex++;
	      }
	      this.renderer.bindVao(null);
	      for (var _i2 = 0; _i2 < webGL.data.length; _i2++) {
	        webGLData = webGL.data[_i2];
	        if (webGLData.dirty) {
	          webGLData.upload();
	        }
	      }
	    }
	  }, {
	    key: 'getWebGLData',
	    value: function getWebGLData(gl, type, nativeLines) {
	      var webGLData = gl.data[gl.data.length - 1];
	      if (!webGLData || webGLData.nativeLines !== nativeLines || webGLData.points.length > 320000) {
	        webGLData = this.graphicsDataPool.pop() || new WebGLGraphicsData(this.renderer.gl, this.primitiveShader, this.renderer.state.attribsState);
	        webGLData.nativeLines = nativeLines;
	        webGLData.reset(type);
	        gl.data.push(webGLData);
	      }
	      webGLData.dirty = true;
	      return webGLData;
	    }
	  }]);
	  return GraphicsRenderer;
	}(ObjectRenderer);
	WebGLRenderer.registerPlugin('graphics', GraphicsRenderer);

	var CanvasGraphicsRenderer = function () {
	  function CanvasGraphicsRenderer(renderer) {
	    classCallCheck(this, CanvasGraphicsRenderer);
	    this.renderer = renderer;
	  }
	  createClass(CanvasGraphicsRenderer, [{
	    key: 'render',
	    value: function render(graphics) {
	      var renderer = this.renderer;
	      var context = renderer.context;
	      var worldAlpha = graphics.worldAlpha;
	      var transform = graphics.transform.worldTransform;
	      var resolution = renderer.resolution;
	      context.setTransform(transform.a * resolution, transform.b * resolution, transform.c * resolution, transform.d * resolution, transform.tx * resolution, transform.ty * resolution);
	      if (graphics.canvasTintDirty !== graphics.dirty || graphics._prevTint !== graphics.tint) {
	        this.updateGraphicsTint(graphics);
	      }
	      renderer.setBlendMode(graphics.blendMode);
	      for (var i = 0; i < graphics.graphicsData.length; i++) {
	        var data = graphics.graphicsData[i];
	        var shape = data.shape;
	        var fillColor = data._fillTint;
	        var lineColor = data._lineTint;
	        context.lineWidth = data.lineWidth;
	        if (data.type === SHAPES.POLY) {
	          context.beginPath();
	          this.renderPolygon(shape.points, shape.closed, context);
	          for (var j = 0; j < data.holes.length; j++) {
	            this.renderPolygon(data.holes[j].points, true, context);
	          }
	          if (data.fill) {
	            context.globalAlpha = data.fillAlpha * worldAlpha;
	            context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6);
	            context.fill();
	          }
	          if (data.lineWidth) {
	            context.globalAlpha = data.lineAlpha * worldAlpha;
	            context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6);
	            context.stroke();
	          }
	        } else if (data.type === SHAPES.RECT) {
	          if (data.fillColor || data.fillColor === 0) {
	            context.globalAlpha = data.fillAlpha * worldAlpha;
	            context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6);
	            context.fillRect(shape.x, shape.y, shape.width, shape.height);
	          }
	          if (data.lineWidth) {
	            context.globalAlpha = data.lineAlpha * worldAlpha;
	            context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6);
	            context.strokeRect(shape.x, shape.y, shape.width, shape.height);
	          }
	        } else if (data.type === SHAPES.CIRC) {
	          context.beginPath();
	          context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
	          context.closePath();
	          if (data.fill) {
	            context.globalAlpha = data.fillAlpha * worldAlpha;
	            context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6);
	            context.fill();
	          }
	          if (data.lineWidth) {
	            context.globalAlpha = data.lineAlpha * worldAlpha;
	            context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6);
	            context.stroke();
	          }
	        } else if (data.type === SHAPES.ELIP) {
	          var w = shape.width * 2;
	          var h = shape.height * 2;
	          var x = shape.x - w / 2;
	          var y = shape.y - h / 2;
	          context.beginPath();
	          var kappa = 0.5522848;
	          var ox = w / 2 * kappa;
	          var oy = h / 2 * kappa;
	          var xe = x + w;
	          var ye = y + h;
	          var xm = x + w / 2;
	          var ym = y + h / 2;
	          context.moveTo(x, ym);
	          context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	          context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	          context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	          context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	          context.closePath();
	          if (data.fill) {
	            context.globalAlpha = data.fillAlpha * worldAlpha;
	            context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6);
	            context.fill();
	          }
	          if (data.lineWidth) {
	            context.globalAlpha = data.lineAlpha * worldAlpha;
	            context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6);
	            context.stroke();
	          }
	        } else if (data.type === SHAPES.RREC) {
	          var rx = shape.x;
	          var ry = shape.y;
	          var width = shape.width;
	          var height = shape.height;
	          var radius = shape.radius;
	          var maxRadius = Math.min(width, height) / 2 | 0;
	          radius = radius > maxRadius ? maxRadius : radius;
	          context.beginPath();
	          context.moveTo(rx, ry + radius);
	          context.lineTo(rx, ry + height - radius);
	          context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
	          context.lineTo(rx + width - radius, ry + height);
	          context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
	          context.lineTo(rx + width, ry + radius);
	          context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
	          context.lineTo(rx + radius, ry);
	          context.quadraticCurveTo(rx, ry, rx, ry + radius);
	          context.closePath();
	          if (data.fillColor || data.fillColor === 0) {
	            context.globalAlpha = data.fillAlpha * worldAlpha;
	            context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6);
	            context.fill();
	          }
	          if (data.lineWidth) {
	            context.globalAlpha = data.lineAlpha * worldAlpha;
	            context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6);
	            context.stroke();
	          }
	        }
	      }
	    }
	  }, {
	    key: 'updateGraphicsTint',
	    value: function updateGraphicsTint(graphics) {
	      graphics._prevTint = graphics.tint;
	      graphics.canvasTintDirty = graphics.dirty;
	      var tintR = (graphics.tint >> 16 & 0xFF) / 255;
	      var tintG = (graphics.tint >> 8 & 0xFF) / 255;
	      var tintB = (graphics.tint & 0xFF) / 255;
	      for (var i = 0; i < graphics.graphicsData.length; ++i) {
	        var data = graphics.graphicsData[i];
	        var fillColor = data.fillColor | 0;
	        var lineColor = data.lineColor | 0;
	        data._fillTint = ((fillColor >> 16 & 0xFF) / 255 * tintR * 255 << 16) + ((fillColor >> 8 & 0xFF) / 255 * tintG * 255 << 8) + (fillColor & 0xFF) / 255 * tintB * 255;
	        data._lineTint = ((lineColor >> 16 & 0xFF) / 255 * tintR * 255 << 16) + ((lineColor >> 8 & 0xFF) / 255 * tintG * 255 << 8) + (lineColor & 0xFF) / 255 * tintB * 255;
	      }
	    }
	  }, {
	    key: 'renderPolygon',
	    value: function renderPolygon(points, close, context) {
	      context.moveTo(points[0], points[1]);
	      for (var j = 1; j < points.length / 2; ++j) {
	        context.lineTo(points[j * 2], points[j * 2 + 1]);
	      }
	      if (close) {
	        context.closePath();
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.renderer = null;
	    }
	  }]);
	  return CanvasGraphicsRenderer;
	}();
	CanvasRenderer.registerPlugin('graphics', CanvasGraphicsRenderer);

	var Spritesheet = function () {
	  createClass(Spritesheet, null, [{
	    key: 'BATCH_SIZE',
	    get: function get$$1() {
	      return 1000;
	    }
	  }]);
	  function Spritesheet(baseTexture, data) {
	    var resolutionFilename = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	    classCallCheck(this, Spritesheet);
	    this.baseTexture = baseTexture;
	    this.textures = {};
	    this.animations = {};
	    this.data = data;
	    this.resolution = this._updateResolution(resolutionFilename || this.baseTexture.imageUrl);
	    this._frames = this.data.frames;
	    this._frameKeys = Object.keys(this._frames);
	    this._batchIndex = 0;
	    this._callback = null;
	  }
	  createClass(Spritesheet, [{
	    key: '_updateResolution',
	    value: function _updateResolution(resolutionFilename) {
	      var scale$$1 = this.data.meta.scale;
	      var resolution = getResolutionOfUrl(resolutionFilename, null);
	      if (resolution === null) {
	        resolution = scale$$1 !== undefined ? parseFloat(scale$$1) : 1;
	      }
	      if (resolution !== 1) {
	        this.baseTexture.resolution = resolution;
	        this.baseTexture.update();
	      }
	      return resolution;
	    }
	  }, {
	    key: 'parse',
	    value: function parse(callback) {
	      this._batchIndex = 0;
	      this._callback = callback;
	      if (this._frameKeys.length <= Spritesheet.BATCH_SIZE) {
	        this._processFrames(0);
	        this._processAnimations();
	        this._parseComplete();
	      } else {
	        this._nextBatch();
	      }
	    }
	  }, {
	    key: '_processFrames',
	    value: function _processFrames(initialFrameIndex) {
	      var frameIndex = initialFrameIndex;
	      var maxFrames = Spritesheet.BATCH_SIZE;
	      var sourceScale = this.baseTexture.sourceScale;
	      while (frameIndex - initialFrameIndex < maxFrames && frameIndex < this._frameKeys.length) {
	        var i = this._frameKeys[frameIndex];
	        var data = this._frames[i];
	        var rect = data.frame;
	        if (rect) {
	          var frame = null;
	          var trim = null;
	          var sourceSize = data.trimmed !== false && data.sourceSize ? data.sourceSize : data.frame;
	          var orig = new Rectangle(0, 0, Math.floor(sourceSize.w * sourceScale) / this.resolution, Math.floor(sourceSize.h * sourceScale) / this.resolution);
	          if (data.rotated) {
	            frame = new Rectangle(Math.floor(rect.x * sourceScale) / this.resolution, Math.floor(rect.y * sourceScale) / this.resolution, Math.floor(rect.h * sourceScale) / this.resolution, Math.floor(rect.w * sourceScale) / this.resolution);
	          } else {
	            frame = new Rectangle(Math.floor(rect.x * sourceScale) / this.resolution, Math.floor(rect.y * sourceScale) / this.resolution, Math.floor(rect.w * sourceScale) / this.resolution, Math.floor(rect.h * sourceScale) / this.resolution);
	          }
	          if (data.trimmed !== false && data.spriteSourceSize) {
	            trim = new Rectangle(Math.floor(data.spriteSourceSize.x * sourceScale) / this.resolution, Math.floor(data.spriteSourceSize.y * sourceScale) / this.resolution, Math.floor(rect.w * sourceScale) / this.resolution, Math.floor(rect.h * sourceScale) / this.resolution);
	          }
	          this.textures[i] = new Texture(this.baseTexture, frame, orig, trim, data.rotated ? 2 : 0, data.anchor);
	          Texture.addToCache(this.textures[i], i);
	        }
	        frameIndex++;
	      }
	    }
	  }, {
	    key: '_processAnimations',
	    value: function _processAnimations() {
	      var animations = this.data.animations || {};
	      for (var animName in animations) {
	        this.animations[animName] = [];
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	        try {
	          for (var _iterator = animations[animName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var frameName = _step.value;
	            this.animations[animName].push(this.textures[frameName]);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: '_parseComplete',
	    value: function _parseComplete() {
	      var callback = this._callback;
	      this._callback = null;
	      this._batchIndex = 0;
	      callback.call(this, this.textures);
	    }
	  }, {
	    key: '_nextBatch',
	    value: function _nextBatch() {
	      var _this = this;
	      this._processFrames(this._batchIndex * Spritesheet.BATCH_SIZE);
	      this._batchIndex++;
	      setTimeout(function () {
	        if (_this._batchIndex * Spritesheet.BATCH_SIZE < _this._frameKeys.length) {
	          _this._nextBatch();
	        } else {
	          _this._processAnimations();
	          _this._parseComplete();
	        }
	      }, 0);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var destroyBase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	      for (var i in this.textures) {
	        this.textures[i].destroy();
	      }
	      this._frames = null;
	      this._frameKeys = null;
	      this.data = null;
	      this.textures = null;
	      if (destroyBase) {
	        this.baseTexture.destroy();
	      }
	      this.baseTexture = null;
	    }
	  }]);
	  return Spritesheet;
	}();

	var Debug = function () {
	  function Debug(parent) {
	    classCallCheck(this, Debug);
	    this.container = new Container();
	    parent.addChild(this.container);
	  }
	  createClass(Debug, [{
	    key: 'bound',
	    value: function bound(displayObject) {
	      var _displayObject$getBou = displayObject.getBounds(),
	          x = _displayObject$getBou.x,
	          y = _displayObject$getBou.y,
	          width = _displayObject$getBou.width,
	          height = _displayObject$getBou.height;
	      var color$$1 = displayObject._debugBoundColor;
	      var rect = new Graphics();
	      if (!color$$1) {
	        color$$1 = randomColor();
	        displayObject._debugBoundColor = color$$1;
	      }
	      rect.lineStyle(1, color$$1, 0.2);
	      rect.beginFill(color$$1, 0.1);
	      rect.drawRect(x, y, width, height);
	      rect.endFill();
	      this.container.addChild(rect);
	    }
	  }, {
	    key: 'recursiveCall',
	    value: function recursiveCall(displayObject) {
	      var _this = this;
	      var children = displayObject.children;
	      children.forEach(function (child) {
	        if (child.children.length === 0) {
	          _this.bound(child);
	        } else {
	          _this.recursiveCall(child);
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render(stage) {
	      this.container.removeChildren();
	      this.recursiveCall(stage);
	    }
	  }]);
	  return Debug;
	}();

	var FPSPool = {
	  defaultFPS: 0,
	  actions: []
	};
	var Action = function () {
	  function Action(duration, to) {
	    classCallCheck(this, Action);
	    this.name = '';
	    this.tween = null;
	    this.duration = duration;
	    this.to = to;
	    this.delay = 0;
	    this.yoyo = false;
	    this.repeatTimes = 0;
	    this.repeatDelayTime = 0;
	    this.easing = TWEEN.Easing.Linear.None;
	    this.interpolation = TWEEN.Interpolation.Linear;
	    this._fps = 0;
	  }
	  createClass(Action, [{
	    key: 'create',
	    value: function create() {
	      var self = this;
	      return function (object) {
	        var tween = new TWEEN.Tween(object.getNature()).to(self.to, self.duration).repeat(self.repeatTimes).repeatDelay(self.repeatDelayTime).delay(self.delay).easing(self.easing).yoyo(self.yoyo).interpolation(self.interpolation).onStart(function () {
	          self._onTweenStart();
	          self.onStart(this, object);
	        }).onUpdate(function () {
	          self.onUpdate(this, object);
	        }).onComplete(function () {
	          self._onTweenComplete();
	          self.onComplete(this, object);
	        }).onStop(function () {
	          self.onStop(this, object);
	        });
	        tween.name = self.name;
	        self.tween = tween;
	        return tween;
	      };
	    }
	  }, {
	    key: 'setName',
	    value: function setName(name) {
	      this.name = name;
	    }
	  }, {
	    key: 'onStart',
	    value: function onStart(tween, object) {
	      this._onStart(tween, object);
	    }
	  }, {
	    key: 'onUpdate',
	    value: function onUpdate(tween, object) {
	      this._onUpdate(tween, object);
	    }
	  }, {
	    key: 'onComplete',
	    value: function onComplete(tween, object) {
	      this._onComplete(tween, object);
	    }
	  }, {
	    key: 'onStop',
	    value: function onStop(tween, object) {
	      this._onStop(tween, object);
	    }
	  }, {
	    key: '_onStart',
	    value: function _onStart(tween, object) {}
	  }, {
	    key: '_onUpdate',
	    value: function _onUpdate(tween, object) {}
	  }, {
	    key: '_onComplete',
	    value: function _onComplete(tween, object) {}
	  }, {
	    key: '_onStop',
	    value: function _onStop(tween, object) {}
	  }, {
	    key: '_onTweenStart',
	    value: function _onTweenStart() {
	      if (!FPSPool.defaultFPS) {
	        FPSPool.defaultFPS = Application.FPS;
	      }
	      if (!this._fps) {
	        return;
	      }
	      FPSPool.actions.push(this);
	      if (FPSPool.actions.length) {
	        Application.FPS = Math.max.apply(null, FPSPool.actions.map(function (action) {
	          return action._fps || 60;
	        }));
	      }
	    }
	  }, {
	    key: '_onTweenComplete',
	    value: function _onTweenComplete() {
	      if (!this._fps || !FPSPool.actions.length) {
	        return;
	      }
	      FPSPool.actions = FPSPool.actions.filter(function (action) {
	        return action.isPlaying();
	      });
	      var index = FPSPool.actions.indexOf(this);
	      if (~index) {
	        FPSPool.actions.splice(index, 1);
	      }
	      if (FPSPool.actions.length) {
	        Application.FPS = Math.max.apply(null, FPSPool.actions.map(function (action) {
	          return action._FPS || 60;
	        }));
	      } else {
	        Application.FPS = FPSPool.defaultFPS;
	      }
	    }
	  }, {
	    key: 'setFPS',
	    value: function setFPS() {
	      var fps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60;
	      this._fps = fps;
	    }
	  }, {
	    key: 'setEasing',
	    value: function setEasing(easing) {
	      this.easing = easing;
	    }
	  }, {
	    key: 'setInterpolation',
	    value: function setInterpolation(interpolation) {
	      this.interpolation = interpolation;
	    }
	  }, {
	    key: 'setDelay',
	    value: function setDelay(delay) {
	      this.delay = delay;
	    }
	  }, {
	    key: 'setRepeatDelay',
	    value: function setRepeatDelay(delay) {
	      this.repeatDelayTime = delay;
	    }
	  }, {
	    key: 'isPlaying',
	    value: function isPlaying() {
	      if (this.tween) {
	        return this.tween.isPlaying();
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.tween && this.tween.stop();
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.tween && this.tween.pause();
	    }
	  }, {
	    key: 'resume',
	    value: function resume() {
	      this.tween && this.tween.resume();
	    }
	  }]);
	  return Action;
	}();
	Action.cleanup = function (sprite) {
	  if (sprite && sprite.actions.length !== 0) {
	    sprite.actions.forEach(function (action) {
	      TWEEN.remove(action);
	    });
	    sprite.actions = [];
	  }
	};
	Action.clone = function (action) {
	  if (action === null || !isObject(action)) {
	    return action;
	  }
	  var type = action._type;
	  var to = isUndefined(action._to) ? action.to : action._to;
	  if (isObject(to)) {
	    to = Object.assign(Object.create(Object.prototype), to);
	  }
	  var clone = void 0;
	  switch (type) {
	    case 'Blink':
	    case 'TintBy':
	    case 'TintTo':
	      clone = ActionInterval[type](action._arg[0], action._arg[1]);
	      break;
	    case 'JumpTo':
	      clone = ActionInterval[type](action.duration, to, action._arg[0], action._arg[1]);
	      break;
	    default:
	      clone = ActionInterval[type](action.duration, to);
	  }
	  clone.setDelay(action.delay);
	  clone.setEasing(action.easing);
	  clone.setInterpolation(action.interpolation);
	  clone.setRepeatDelay(action.repeatDelayTime);
	  return clone;
	};
	Container.prototype.runAction = function (actions) {
	  var actionArray = Array.isArray(actions) ? actions : arguments;
	  for (var i = 0; i < actionArray.length; i++) {
	    actionArray[i]._caller = 'runAction';
	    var action = actionArray[i].create()(this).start();
	    this.actions.push(action);
	  }
	};
	Container.prototype.runSequenceAction = function (actions) {
	  var self = this;
	  var actionArray = Array.isArray(actions) ? actions : arguments;
	  var tempArray = [];
	  if (actionArray.length > 0 && actionArray[actionArray.length - 1] == null) {
	    throw new Error('parameters should not be ending with null');
	  }
	  for (var i = 0; i < actionArray.length; i++) {
	    tempArray.push(actionArray[i].create()(self));
	  }
	  for (var _i = tempArray.length - 1; _i > 0; _i--) {
	    tempArray[_i - 1].chain(tempArray[_i]);
	  }
	  tempArray[0].start();
	};

	function MoveBy(duration, to) {
	  var _to = {};
	  Object.assign(_to, to);
	  var action = new Action(duration, _to);
	  action._to = to;
	  action._onStart = function (tween, object) {
	    action.to.x = object.x + to.x;
	    action.to.y = object.y + to.y;
	  };
	  action._onUpdate = function (tween, object) {
	    object.setPosition(tween.x, tween.y);
	  };
	  action._type = 'MoveBy';
	  return action;
	}
	function MoveTo(duration, to) {
	  var action = new Action(duration, to);
	  action._onUpdate = function (tween, object) {
	    object.setPosition(tween.x, tween.y);
	  };
	  action._type = 'MoveTo';
	  return action;
	}
	function ScaleBy(duration, to) {
	  var _to = {};
	  Object.assign(_to, to);
	  var action = new Action(duration, _to);
	  action._to = to;
	  action._onStart = function (tween, object) {
	    action.to.scaleX = object.scale.x * to.scaleX;
	    action.to.scaleY = object.scale.y * to.scaleY;
	  };
	  action._onUpdate = function (tween, object) {
	    object.setScale(tween.scaleX, tween.scaleY);
	  };
	  action._type = 'ScaleBy';
	  return action;
	}
	function ScaleTo(duration, to) {
	  var action = new Action(duration, to);
	  action._onUpdate = function (tween, object) {
	    object.setScale(tween.scaleX, tween.scaleY);
	  };
	  action._type = 'ScaleTo';
	  return action;
	}
	function RotateBy(duration, to) {
	  var _to = {};
	  Object.assign(_to, to);
	  var action = new Action(duration, _to);
	  action._to = to;
	  action._onStart = function (tween, object) {
	    action.to.rotation = deg2radian(radian2deg(object.rotation) + radian2deg(to.rotation));
	  };
	  action._onUpdate = function (tween, object) {
	    object.rotation = tween.rotation;
	  };
	  action._type = 'RotateBy';
	  return action;
	}
	function RotateTo(duration, to) {
	  var action = new Action(duration, to);
	  action._onUpdate = function (tween, object) {
	    object.rotation = tween.rotation;
	  };
	  action._type = 'RotateTo';
	  return action;
	}
	function JumpTo(duration, to, height, times) {
	  var _to = {};
	  Object.assign(_to, to);
	  var newY = [];
	  for (var i = 0; i < times * 2; i++) {
	    if (i % 2 === 0) {
	      newY.push(_to.y - height);
	    } else {
	      newY.push(_to.y);
	    }
	  }
	  _to.y = newY;
	  var action = new Action(duration, _to);
	  action._to = to;
	  action.yoyo = false;
	  action.repeatTimes = 0;
	  action._onUpdate = function (tween, object) {
	    object.setPosition(tween.x, tween.y);
	  };
	  action._type = 'JumpTo';
	  action._arg = [height, times];
	  return action;
	}
	function Blink(hideDuration, showDuration) {
	  var newVisible = [];
	  for (var i = 0; i < hideDuration; i++) {
	    newVisible.push(false);
	  }
	  for (var _i = 0; _i < showDuration; _i++) {
	    newVisible.push(true);
	  }
	  var action = new Action(showDuration + hideDuration, {
	    visible: newVisible
	  });
	  action.yoyo = false;
	  action.repeatTimes = 0;
	  action._onUpdate = function (tween, object) {
	    object.visible = ~~tween.visible;
	  };
	  action._type = 'Blink';
	  action._arg = [hideDuration, showDuration];
	  return action;
	}
	function FadeTo(duration, to) {
	  var action = new Action(duration, {
	    alpha: to
	  });
	  action._to = to;
	  action.yoyo = false;
	  action.repeatTimes = 0;
	  action._onUpdate = function (tween, object) {
	    object.setOpacity(tween.alpha);
	  };
	  action._type = 'FadeTo';
	  return action;
	}
	function FadeIn(duration) {
	  return FadeTo(duration, 1);
	}
	function FadeOut(duration) {
	  return FadeTo(duration, 0);
	}
	function TintBy(duration, color$$1) {
	  if (isNumber(color$$1)) {
	    color$$1 = hex2color(color$$1);
	  }
	  var _to = {};
	  Object.assign(_to, color$$1);
	  var action = TintTo(duration, _to);
	  action._to = color$$1;
	  action._onStart = function (tween, object) {
	    var oc = hex2rgb(object.tint);
	    action.to.colorR = oc[0] * 255 + color$$1.colorR;
	    action.to.colorG = oc[1] * 255 + color$$1.colorG;
	    action.to.colorB = oc[2] * 255 + color$$1.colorB;
	    action.to.colorR <= 0 && (action.to.colorR = 0);
	    action.to.colorG <= 0 && (action.to.colorG = 0);
	    action.to.colorB <= 0 && (action.to.colorB = 0);
	    action.to.colorR >= 255 && (action.to.colorR = 255);
	    action.to.colorG >= 255 && (action.to.colorG = 255);
	    action.to.colorB >= 255 && (action.to.colorB = 255);
	  };
	  action._type = 'TintBy';
	  action._arg = [duration, color$$1];
	  return action;
	}
	function TintTo(duration, color$$1) {
	  if (isNumber(color$$1)) {
	    color$$1 = hex2color(color$$1);
	  }
	  var action = new Action(duration, color$$1);
	  action._onUpdate = function (tween, object) {
	    object.tint = rgb2hex([tween.colorR / 255, tween.colorG / 255, tween.colorB / 255]);
	  };
	  action._type = 'TintTo';
	  action._arg = [duration, color$$1];
	  return action;
	}
	function RepeatForever(action, delay) {
	  return Repeat(Infinity, action, delay);
	}
	function Repeat(times, action, delay) {
	  !delay && action.repeatDelayTime && (delay = action.repeatDelayTime);
	  if (action._type && ['MoveBy', 'ScaleBy', 'RotateBy', 'TintBy'].indexOf(action._type) !== -1) {
	    action._onComplete = function (tween, object) {
	      if (!object.__tmp_times) {
	        object.__tmp_times = 1;
	      }
	      object.__tmp_times++;
	      if (object.__tmp_times > times) {
	        return;
	      }
	      if (action._caller === 'runAction') {
	        var fn = void 0;
	        switch (action._type) {
	          case 'MoveBy':
	            fn = MoveBy;
	            break;
	          case 'ScaleBy':
	            fn = ScaleBy;
	            break;
	          case 'RotateBy':
	            fn = RotateBy;
	            break;
	          case 'TintBy':
	            fn = TintBy;
	            break;
	        }
	        if (!fn) {
	          return;
	        }
	        var act = fn(action.duration, Object.assign(Object.create(Object.prototype), action._to || action.to));
	        act._onComplete = action._onComplete;
	        delay && act.setDelay(delay);
	        act.onStart = action.onStart;
	        act.onUpdate = action.onUpdate;
	        act.onComplete = action.onComplete;
	        object.runAction(act);
	      }
	    };
	    return action;
	  }
	  action.repeatDelayTime = delay;
	  action.repeatTimes = times - 1;
	  action._type = 'Repeat';
	  return action;
	}
	function Back(action) {
	  action.yoyo = true;
	  if (!action.repeatTimes) {
	    action.repeatTimes = 1;
	  }
	  if (action._type === 'Repeat') {
	    action.repeatTimes = (action.repeatTimes - 1) * 2 + 1;
	  }
	  action._type = 'Back';
	  return action;
	}

	var Transition = function () {
	  function Transition(stage, scene, duration) {
	    classCallCheck(this, Transition);
	    this.stage = stage;
	    this.scene = scene;
	    this.duration = duration || 600;
	  }
	  createClass(Transition, [{
	    key: 'Fade',
	    value: function Fade(color$$1) {
	      var self = this;
	      var fadeOutAction = FadeOut(this.duration);
	      var fadeInAction = FadeIn(this.duration);
	      var g = new Graphics();
	      g.beginFill(color$$1 || 0x000000);
	      g.drawRect(0, 0, WIN_SIZE.width, WIN_SIZE.height);
	      g.endFill();
	      g.setOpacity(0);
	      self.stage.addChild(g);
	      fadeInAction.onComplete = function () {
	        self.stage.removeChildren();
	        self.stage.addChild(self.scene);
	        self.stage.addChild(g);
	        self.scene.emit('transitionend');
	        g.runAction(fadeOutAction);
	      };
	      g.runAction(fadeInAction);
	    }
	  }, {
	    key: 'FadeWhite',
	    value: function FadeWhite() {
	      this.Fade(0xFFFFFF);
	    }
	  }, {
	    key: 'FadeColor',
	    value: function FadeColor(arg) {
	      this.Fade(arg[0]);
	    }
	  }, {
	    key: 'Progress',
	    value: function Progress(action, g) {
	      var self = this;
	      self.stage.addChild(self.scene);
	      self.stage.addChild(g);
	      self.scene.mask = g;
	      action.onComplete = function () {
	        self.scene.mask = null;
	        self.stage.removeChildren();
	        self.stage.addChild(self.scene);
	        self.scene.emit('transitionend');
	      };
	      g.runAction(action);
	    }
	  }, {
	    key: 'ProgressH',
	    value: function ProgressH() {
	      var moveToAction = MoveTo(this.duration, { x: WIN_SIZE.width });
	      var g = new Graphics();
	      g.beginFill(0xFFFFFF);
	      g.drawRect(-WIN_SIZE.width, 0, WIN_SIZE.width, WIN_SIZE.height);
	      g.endFill();
	      this.Progress(moveToAction, g);
	    }
	  }, {
	    key: 'ProgressV',
	    value: function ProgressV() {
	      var moveToAction = MoveTo(this.duration, { y: WIN_SIZE.height });
	      var g = new Graphics();
	      g.beginFill(0xFFFFFF);
	      g.drawRect(0, -WIN_SIZE.height, WIN_SIZE.width, WIN_SIZE.height);
	      g.endFill();
	      this.Progress(moveToAction, g);
	    }
	  }, {
	    key: 'ProgressInOut',
	    value: function ProgressInOut() {
	      var scaleToAction = ScaleTo(this.duration, scale(WIN_SIZE.width, WIN_SIZE.height));
	      var g = new Graphics();
	      g.beginFill(0xFFFFFF);
	      g.drawRect(0, 0, 1, 1);
	      g.endFill();
	      g.setPosition(WIN_SIZE.width / 2, WIN_SIZE.height / 2);
	      g.setPivot(0.5);
	      this.Progress(scaleToAction, g);
	    }
	  }, {
	    key: 'ProgressOutIn',
	    value: function ProgressOutIn() {
	      var self = this;
	      var scaleToAction = ScaleTo(this.duration, scale(0));
	      var moveToAction = MoveTo(this.duration, point(WIN_SIZE.width / 2, WIN_SIZE.height / 2));
	      var g = new Graphics();
	      g.beginFill(0xFFFFFF);
	      g.drawRect(0, 0, WIN_SIZE.width, WIN_SIZE.height);
	      g.endFill();
	      g.setPivot(0.5);
	      var container = new Container();
	      self.stage.children.forEach(function (child) {
	        container.addChild(child);
	      });
	      container.mask = g;
	      self.stage.removeChildren();
	      self.stage.addChild(self.scene);
	      self.stage.addChild(container);
	      self.stage.addChild(g);
	      self.scene.emit('transitionend');
	      scaleToAction.onComplete = function () {
	        container.mask = null;
	        self.stage.removeChild(container);
	        self.stage.removeChild(g);
	      };
	      g.runAction([scaleToAction, moveToAction]);
	    }
	  }, {
	    key: 'ProgressRadial',
	    value: function ProgressRadial(ccw) {
	      var rotateXY = function rotateXY(x, y, angle) {
	        var rad = Math.PI * angle / 180;
	        if (ccw) {
	          rad = -rad;
	        }
	        var cosVal = Math.cos(rad);
	        var sinVal = Math.sin(rad);
	        return new Point(cosVal * x - sinVal * y, sinVal * x + cosVal * y);
	      };
	      var computeMaskPolygon = function computeMaskPolygon(x, y, radius, angle) {
	        while (angle < 0) {
	          angle += 360;
	        }
	        angle %= 360;
	        var delta = rotateXY(0, -2 * radius, angle);
	        var a270 = 270;
	        var a90 = 90;
	        var pts = [new Point(x, y - 2 * radius), new Point(x, y), new Point(x + delta.x, y + delta.y)];
	        if (ccw) {
	          a270 = 90;
	          a90 = 270;
	          pts.reverse();
	        }
	        if (angle > a270) {
	          pts.push(new Point(x - 2 * radius, y));
	        }
	        if (angle > 180) {
	          pts.push(new Point(x, y + 2 * radius));
	        }
	        if (angle > a90) {
	          pts.push(new Point(x + 2 * radius, y));
	        }
	        return pts;
	      };
	      var centerX = WIN_SIZE.width / 2;
	      var centerY = WIN_SIZE.height / 2;
	      var radius = Math.max(WIN_SIZE.width, WIN_SIZE.height);
	      var g = new Graphics();
	      var updatePieMask = function updatePieMask(angle) {
	        g.clear();
	        var pts = computeMaskPolygon(centerX, centerY, radius, angle);
	        g.beginFill(0xFFFFFF);
	        g.moveTo(pts[0].x, pts[0].y);
	        for (var i = 1; i < pts.length; ++i) {
	          g.lineTo(pts[i].x, pts[i].y);
	        }
	        g.lineTo(pts[0].x, pts[0].y);
	        g.endFill();
	      };
	      var action = new Action(this.duration, { angle: 360 });
	      action.yoyo = false;
	      action.repeatTimes = 0;
	      action.onUpdate = function (tween, object) {
	        updatePieMask(~~tween.angle);
	      };
	      this.Progress(action, g);
	    }
	  }, {
	    key: 'ProgressRadialCW',
	    value: function ProgressRadialCW() {
	      this.ProgressRadial(false);
	    }
	  }, {
	    key: 'ProgressRadialCCW',
	    value: function ProgressRadialCCW() {
	      this.ProgressRadial(true);
	    }
	  }, {
	    key: 'MoveIn',
	    value: function MoveIn() {
	      var self = this;
	      var action = MoveTo(this.duration, new Point());
	      self.stage.addChild(self.scene);
	      action.onComplete = function () {
	        self.stage.removeChildren();
	        self.stage.addChild(self.scene);
	        self.scene.emit('transitionend');
	      };
	      self.scene.runAction(action);
	    }
	  }, {
	    key: 'MoveInL',
	    value: function MoveInL() {
	      this.scene.setPositionX(-WIN_SIZE.width);
	      this.MoveIn();
	    }
	  }, {
	    key: 'MoveInR',
	    value: function MoveInR() {
	      this.scene.setPositionX(WIN_SIZE.width);
	      this.MoveIn();
	    }
	  }, {
	    key: 'MoveInT',
	    value: function MoveInT() {
	      this.scene.setPositionY(-WIN_SIZE.height);
	      this.MoveIn();
	    }
	  }, {
	    key: 'MoveInB',
	    value: function MoveInB() {
	      this.scene.setPositionY(WIN_SIZE.height);
	      this.MoveIn();
	    }
	  }, {
	    key: 'SlideIn',
	    value: function SlideIn(x, y) {
	      var self = this;
	      var container = new Container();
	      self.stage.children.forEach(function (child) {
	        container.addChild(child);
	      });
	      self.stage.removeChildren();
	      container.addChild(self.scene);
	      self.scene.setPosition(x, y);
	      self.stage.addChild(container);
	      var action = MoveTo(this.duration, { x: -x, y: -y });
	      action.onComplete = function () {
	        self.stage.removeChildren();
	        self.scene.setPosition(0);
	        self.stage.addChild(self.scene);
	        self.scene.emit('transitionend');
	      };
	      container.runAction(action);
	    }
	  }, {
	    key: 'SlideInL',
	    value: function SlideInL() {
	      this.SlideIn(-WIN_SIZE.width, 0);
	    }
	  }, {
	    key: 'SlideInR',
	    value: function SlideInR() {
	      this.SlideIn(WIN_SIZE.width, 0);
	    }
	  }, {
	    key: 'SlideInT',
	    value: function SlideInT() {
	      this.SlideIn(0, -WIN_SIZE.height);
	    }
	  }, {
	    key: 'SlideInB',
	    value: function SlideInB() {
	      this.SlideIn(0, WIN_SIZE.height);
	    }
	  }]);
	  return Transition;
	}();

	var updateKeyId = 0;
	var Application = function (_EventEmitter) {
	  inherits(Application, _EventEmitter);
	  function Application(conf) {
	    classCallCheck(this, Application);
	    var _this = possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this));
	    _this._fps = 0;
	    _this._paused = true;
	    _this._updatePoll = {};
	    _this._tickerHandlers = [];
	    _this.ticker = shared;
	    _this.camera = new Container();
	    _this.stage = new Container();
	    _this.camera.addChild(_this.stage);
	    _this.setup(Object.assign({}, defaultConfig, conf));
	    if (config.showFPS) {
	      _this._createStatsLabel();
	    }
	    if (config.debug) {
	      _this.debug = new Debug(_this.camera);
	    }
	    _this.renderer = _this.autoDetectRenderer(config.newWidth, config.newHeight, {
	      view: _this.view
	    });
	    WIN_SIZE.width = Math.round(_this.renderer.width);
	    WIN_SIZE.height = Math.round(_this.renderer.height);
	    if (config.viewTouched) {
	      _this.view.style['touch-action'] = 'initial';
	      _this.renderer.plugins.interaction.autoPreventDefault = false;
	    }
	    return _this;
	  }
	  createClass(Application, [{
	    key: 'render',
	    value: function render() {
	      if (config.debug) {
	        this.debug && this.debug.render(this.stage);
	      }
	      this.renderer && this.renderer.render(this.camera);
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.pause();
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      if (!this._paused) {
	        return;
	      }
	      this._paused = false;
	      shared.add(Application._tweenUpdateFn);
	      shared.start();
	      this._tickerHandlers.push(Application._tweenUpdateFn);
	    }
	  }, {
	    key: 'resume',
	    value: function resume() {
	      if (!this._paused) {
	        return;
	      }
	      this._paused = false;
	      try {
	        shared.start();
	        CountDownCache.forEach(function (cd) {
	          if (!cd.isManualPause()) {
	            cd.start();
	          }
	        });
	        Tiny.TWEEN.resume();
	        Tiny.audio.manager.resume();
	      } catch (e) {}
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      if (this._paused) {
	        return;
	      }
	      this._paused = true;
	      try {
	        shared.stop();
	        CountDownCache.forEach(function (cd) {
	          cd.pause(true);
	        });
	        Tiny.TWEEN.pause();
	        Tiny.audio.manager.pause();
	      } catch (e) {}
	    }
	  }, {
	    key: 'isPaused',
	    value: function isPaused() {
	      return this._paused;
	    }
	  }, {
	    key: 'autoDetectRenderer',
	    value: function autoDetectRenderer() {
	      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 320;
	      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 568;
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      Object.assign(options, config.renderOptions);
	      if (config.renderType !== RENDERER_TYPE.CANVAS) {
	        if (isWebGLSupported()) {
	          return new WebGLRenderer(width, height, options);
	        }
	      }
	      return new CanvasRenderer(width, height, options);
	    }
	  }, {
	    key: 'run',
	    value: function run(startScene) {
	      this.replaceScene(startScene);
	      if (config.autoRender) {
	        this.mainLoop();
	      } else {
	        this.render();
	      }
	    }
	  }, {
	    key: 'replaceScene',
	    value: function replaceScene(scene, transition, duration) {
	      if (transition) {
	        var instance = new Transition(this.stage, scene, duration);
	        var trans = transition;
	        Array.prototype.splice.call(arguments, 0, 3);
	        instance[trans](arguments);
	      } else {
	        this.stage.removeChildren();
	        this.stage.addChild(scene);
	      }
	      this._currentScene = scene;
	    }
	  }, {
	    key: 'mainLoop',
	    value: function mainLoop() {
	      var renderHandler = function renderHandler(t) {
	        this.render();
	        for (var key in this._updatePoll) {
	          if (this._updatePoll.hasOwnProperty(key)) {
	            this._updatePoll[key].call(this, t);
	          }
	        }
	      };
	      shared.add(renderHandler, this);
	      var __lastTime = 0;
	      var __accumDt = 0;
	      var __fpsOverstepTimes = 0;
	      var fpsLabelHandler = function fpsLabelHandler(t) {
	        __accumDt++;
	        var currentTime = window.performance.now();
	        if (currentTime - __lastTime >= 1000) {
	          var fps = __accumDt;
	          this._fps = fps;
	          this._label && (this._label.text = 'SPF: ' + (1 / fps).toFixed(3) + '\nFPS: ' + fps.toFixed(1));
	          __accumDt = 0;
	          __lastTime = currentTime;
	          if (fps > defaultConfig.fps + 5) {
	            __fpsOverstepTimes++;
	            if (__fpsOverstepTimes >= 3) {
	              this.emit('fps-overstep', fps);
	            }
	          } else {
	            __fpsOverstepTimes = 0;
	          }
	        }
	      };
	      shared.add(fpsLabelHandler, this);
	      this._tickerHandlers.push(renderHandler, fpsLabelHandler);
	      this.start();
	    }
	  }, {
	    key: 'onUpdate',
	    value: function onUpdate(fn) {
	      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var key = fn._tiny_update_key || (fn._tiny_update_key = ++updateKeyId);
	      if (!this._updatePoll[key] || force) {
	        this._updatePoll[key] = fn;
	      }
	    }
	  }, {
	    key: 'offUpdate',
	    value: function offUpdate(fn) {
	      var key = fn._tiny_update_key;
	      key && delete this._updatePoll[key];
	    }
	  }, {
	    key: 'setup',
	    value: function setup(conf) {
	      Object.assign(config, conf);
	      if (!navigator.isCanvasPlus && (isMobile.tablet || isMobile.phone)) {
	        var fontStyle = document.createElement('style');
	        fontStyle.type = 'text/css';
	        document.body.appendChild(fontStyle);
	        fontStyle.textContent = 'body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;-webkit-tap-highlight-color:rgba(0,0,0,0);}';
	      }
	      var view = void 0;
	      if (config.canvasId instanceof HTMLElement) {
	        view = config.canvasId;
	      } else {
	        view = document.getElementById(config.canvasId);
	        if (!view) {
	          view = document.createElement('canvas');
	          view.setAttribute('tabindex', 99);
	          view.id = config.canvasId;
	          view.style.outline = 'none';
	          document.body.appendChild(view);
	        }
	      }
	      this.view = view;
	      this.resize();
	    }
	  }, {
	    key: 'resize',
	    value: function resize() {
	      var multiplier = void 0;
	      var winH = config.fixSize ? config.height : window.innerHeight;
	      var winW = config.fixSize ? config.width : window.innerWidth;
	      var cWidth = config.fixSize ? config.width || winW : config.referWidth;
	      var radio = +config.orientation ? winH / cWidth : winW / cWidth;
	      var isFullScreen = config.width === winW && config.height === winH;
	      isFullScreen && (radio = 1);
	      var width = config.width * radio || winW;
	      var height = config.height * radio || winH;
	      var cHeight = cWidth * (+config.orientation ? width / height : height / width);
	      if (+config.orientation) {
	        var w = cWidth;
	        cWidth = cHeight;
	        cHeight = w;
	      }
	      cWidth = cWidth * config.dpi;
	      cHeight = cHeight * config.dpi;
	      multiplier = Math.min(height / cHeight, width / cWidth);
	      multiplier = Number(multiplier.toFixed(4));
	      config.renderOptions.resolution = Number((1 / multiplier).toFixed(4));
	      config.renderOptions.autoResize = true;
	      config.newWidth = Math.round(cWidth * multiplier);
	      config.newHeight = Math.round(cHeight * multiplier);
	      this.stage.setScale(multiplier);
	    }
	  }, {
	    key: '_createStatsLabel',
	    value: function _createStatsLabel() {
	      this._label = new Text('SPF: -\nFPS: -', {
	        fontSize: 18,
	        fontFamily: 'Helvetica',
	        fill: '#ffffff',
	        stroke: '#666666',
	        strokeThickness: 0.2
	      });
	      this._label.position.set(10, config.newHeight - this._label.height - 10);
	      this.camera.addChild(this._label);
	    }
	  }, {
	    key: 'getCurrentScene',
	    value: function getCurrentScene() {
	      return this._currentScene;
	    }
	  }, {
	    key: 'getCurrentFPS',
	    value: function getCurrentFPS() {
	      return this._fps;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(removeView, stageOptions) {
	      var _this2 = this;
	      TWEEN.removeAll();
	      this._tickerHandlers.forEach(function (item) {
	        _this2.ticker.remove(item, _this2);
	      });
	      this.ticker.stop();
	      this.stage.destroy(stageOptions);
	      this.stage = null;
	      this.camera.destroy(stageOptions);
	      this.camera = null;
	      this.renderer.destroy(removeView);
	      this.renderer = null;
	    }
	  }], [{
	    key: '_tweenUpdateFn',
	    value: function _tweenUpdateFn() {
	      TWEEN.update();
	    }
	  }, {
	    key: 'FPS',
	    get: function get$$1() {
	      return config.fps;
	    },
	    set: function set$$1(fps) {
	      config.fps = fps;
	    }
	  }]);
	  return Application;
	}(_eventemitter3_3_1_2_eventemitter3);

	var InteractionData = function () {
	  function InteractionData() {
	    classCallCheck(this, InteractionData);
	    this.global = new Point();
	    this.target = null;
	    this.originalEvent = null;
	    this.identifier = null;
	    this.isPrimary = false;
	    this.button = 0;
	    this.buttons = 0;
	    this.width = 0;
	    this.height = 0;
	    this.tiltX = 0;
	    this.tiltY = 0;
	    this.pointerType = null;
	    this.pressure = 0;
	    this.rotationAngle = 0;
	    this.twist = 0;
	    this.tangentialPressure = 0;
	  }
	  createClass(InteractionData, [{
	    key: 'getLocalPosition',
	    value: function getLocalPosition(displayObject, point, globalPos) {
	      return displayObject.worldTransform.applyInverse(globalPos || this.global, point);
	    }
	  }, {
	    key: 'copyEvent',
	    value: function copyEvent(event) {
	      if (event.isPrimary) {
	        this.isPrimary = true;
	      }
	      this.button = event.button;
	      this.buttons = Number.isInteger(event.buttons) ? event.buttons : event.which;
	      this.width = event.width;
	      this.height = event.height;
	      this.tiltX = event.tiltX;
	      this.tiltY = event.tiltY;
	      this.pointerType = event.pointerType;
	      this.pressure = event.pressure;
	      this.rotationAngle = event.rotationAngle;
	      this.twist = event.twist || 0;
	      this.tangentialPressure = event.tangentialPressure || 0;
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.isPrimary = false;
	    }
	  }, {
	    key: 'pointerId',
	    get: function get$$1() {
	      return this.identifier;
	    }
	  }]);
	  return InteractionData;
	}();

	var InteractionEvent = function () {
	  function InteractionEvent() {
	    classCallCheck(this, InteractionEvent);
	    this.stopped = false;
	    this.target = null;
	    this.currentTarget = null;
	    this.type = null;
	    this.data = null;
	  }
	  createClass(InteractionEvent, [{
	    key: "stopPropagation",
	    value: function stopPropagation() {
	      this.stopped = true;
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      this.stopped = false;
	      this.currentTarget = null;
	      this.target = null;
	    }
	  }]);
	  return InteractionEvent;
	}();

	var InteractionTrackingData = function () {
	  function InteractionTrackingData(pointerId) {
	    classCallCheck(this, InteractionTrackingData);
	    this._pointerId = pointerId;
	    this._flags = InteractionTrackingData.FLAGS.NONE;
	  }
	  createClass(InteractionTrackingData, [{
	    key: "_doSet",
	    value: function _doSet(flag, yn) {
	      if (yn) {
	        this._flags = this._flags | flag;
	      } else {
	        this._flags = this._flags & ~flag;
	      }
	    }
	  }, {
	    key: "pointerId",
	    get: function get$$1() {
	      return this._pointerId;
	    }
	  }, {
	    key: "flags",
	    get: function get$$1() {
	      return this._flags;
	    },
	    set: function set$$1(flags) {
	      this._flags = flags;
	    }
	  }, {
	    key: "none",
	    get: function get$$1() {
	      return this._flags === this.constructor.FLAGS.NONE;
	    }
	  }, {
	    key: "over",
	    get: function get$$1() {
	      return (this._flags & this.constructor.FLAGS.OVER) !== 0;
	    },
	    set: function set$$1(yn) {
	      this._doSet(this.constructor.FLAGS.OVER, yn);
	    }
	  }, {
	    key: "rightDown",
	    get: function get$$1() {
	      return (this._flags & this.constructor.FLAGS.RIGHT_DOWN) !== 0;
	    },
	    set: function set$$1(yn) {
	      this._doSet(this.constructor.FLAGS.RIGHT_DOWN, yn);
	    }
	  }, {
	    key: "leftDown",
	    get: function get$$1() {
	      return (this._flags & this.constructor.FLAGS.LEFT_DOWN) !== 0;
	    },
	    set: function set$$1(yn) {
	      this._doSet(this.constructor.FLAGS.LEFT_DOWN, yn);
	    }
	  }]);
	  return InteractionTrackingData;
	}();
	InteractionTrackingData.FLAGS = Object.freeze({
	  NONE: 0,
	  OVER: 1 << 0,
	  LEFT_DOWN: 1 << 1,
	  RIGHT_DOWN: 1 << 2
	});

	var interactiveTarget = {
	  interactive: false,
	  interactiveChildren: true,
	  hitArea: null,
	  get buttonMode() {
	    return this.cursor === 'pointer';
	  },
	  set buttonMode(value) {
	    if (value) {
	      this.cursor = 'pointer';
	    } else if (this.cursor === 'pointer') {
	      this.cursor = null;
	    }
	  },
	  cursor: null,
	  get trackedPointers() {
	    if (this._trackedPointers === undefined) this._trackedPointers = {};
	    return this._trackedPointers;
	  },
	  _trackedPointers: undefined
	};

	delayMixin(DisplayObject.prototype, interactiveTarget);
	var MOUSE_POINTER_ID = 1;
	var hitTestEvent = {
	  target: null,
	  data: {
	    global: null
	  }
	};
	var InteractionManager = function (_EventEmitter) {
	  inherits(InteractionManager, _EventEmitter);
	  function InteractionManager(renderer, options) {
	    classCallCheck(this, InteractionManager);
	    var _this = possibleConstructorReturn(this, (InteractionManager.__proto__ || Object.getPrototypeOf(InteractionManager)).call(this));
	    options = options || {};
	    _this.renderer = renderer;
	    _this.autoPreventDefault = options.autoPreventDefault !== undefined ? options.autoPreventDefault : true;
	    _this.interactionFrequency = options.interactionFrequency || 10;
	    _this.mouse = new InteractionData();
	    _this.mouse.identifier = MOUSE_POINTER_ID;
	    _this.mouse.global.set(-999999);
	    _this.activeInteractionData = {};
	    _this.activeInteractionData[MOUSE_POINTER_ID] = _this.mouse;
	    _this.interactionDataPool = [];
	    _this.eventData = new InteractionEvent();
	    _this.interactionDOMElement = null;
	    _this.moveWhenInside = false;
	    _this.eventsAdded = false;
	    _this.mouseOverRenderer = false;
	    _this.supportsTouchEvents = 'ontouchstart' in window;
	    _this.supportsPointerEvents = !!window.PointerEvent;
	    _this.onPointerUp = _this.onPointerUp.bind(_this);
	    _this.processPointerUp = _this.processPointerUp.bind(_this);
	    _this.onPointerCancel = _this.onPointerCancel.bind(_this);
	    _this.processPointerCancel = _this.processPointerCancel.bind(_this);
	    _this.onPointerDown = _this.onPointerDown.bind(_this);
	    _this.processPointerDown = _this.processPointerDown.bind(_this);
	    _this.onPointerMove = _this.onPointerMove.bind(_this);
	    _this.processPointerMove = _this.processPointerMove.bind(_this);
	    _this.onPointerOut = _this.onPointerOut.bind(_this);
	    _this.processPointerOverOut = _this.processPointerOverOut.bind(_this);
	    _this.onPointerOver = _this.onPointerOver.bind(_this);
	    _this.cursorStyles = {
	      default: 'inherit',
	      pointer: 'pointer'
	    };
	    _this.currentCursorMode = null;
	    _this.cursor = null;
	    _this._tempPoint = new Point();
	    _this.resolution = 1;
	    _this.setTargetElement(_this.renderer.view, _this.renderer.resolution);
	    return _this;
	  }
	  createClass(InteractionManager, [{
	    key: 'hitTest',
	    value: function hitTest(globalPoint, root) {
	      hitTestEvent.target = null;
	      hitTestEvent.data.global = globalPoint;
	      if (!root) {
	        root = this.renderer._lastObjectRendered;
	      }
	      this.processInteractive(hitTestEvent, root, null, true);
	      return hitTestEvent.target;
	    }
	  }, {
	    key: 'setTargetElement',
	    value: function setTargetElement(element) {
	      var resolution = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	      this.removeEvents();
	      this.interactionDOMElement = element;
	      this.resolution = resolution;
	      this.addEvents();
	    }
	  }, {
	    key: 'addEvents',
	    value: function addEvents() {
	      if (!this.interactionDOMElement) {
	        return;
	      }
	      shared.add(this.update, this, UPDATE_PRIORITY.INTERACTION);
	      if (window.navigator.msPointerEnabled) {
	        this.interactionDOMElement.style['-ms-content-zooming'] = 'none';
	        this.interactionDOMElement.style['-ms-touch-action'] = 'none';
	      } else if (this.supportsPointerEvents) {
	        this.interactionDOMElement.style['touch-action'] = 'none';
	      }
	      if (this.supportsPointerEvents) {
	        window.document.addEventListener('pointermove', this.onPointerMove, true);
	        this.interactionDOMElement.addEventListener('pointerdown', this.onPointerDown, true);
	        this.interactionDOMElement.addEventListener('pointerleave', this.onPointerOut, true);
	        this.interactionDOMElement.addEventListener('pointerover', this.onPointerOver, true);
	        window.addEventListener('pointercancel', this.onPointerCancel, true);
	        window.addEventListener('pointerup', this.onPointerUp, true);
	      } else {
	        window.document.addEventListener('mousemove', this.onPointerMove, true);
	        this.interactionDOMElement.addEventListener('mousedown', this.onPointerDown, true);
	        this.interactionDOMElement.addEventListener('mouseout', this.onPointerOut, true);
	        this.interactionDOMElement.addEventListener('mouseover', this.onPointerOver, true);
	        window.addEventListener('mouseup', this.onPointerUp, true);
	      }
	      if (this.supportsTouchEvents) {
	        this.interactionDOMElement.addEventListener('touchstart', this.onPointerDown, true);
	        this.interactionDOMElement.addEventListener('touchcancel', this.onPointerCancel, true);
	        this.interactionDOMElement.addEventListener('touchend', this.onPointerUp, true);
	        this.interactionDOMElement.addEventListener('touchmove', this.onPointerMove, true);
	      }
	      this.eventsAdded = true;
	    }
	  }, {
	    key: 'removeEvents',
	    value: function removeEvents() {
	      if (!this.interactionDOMElement) {
	        return;
	      }
	      shared.remove(this.update, this);
	      if (window.navigator.msPointerEnabled) {
	        this.interactionDOMElement.style['-ms-content-zooming'] = '';
	        this.interactionDOMElement.style['-ms-touch-action'] = '';
	      } else if (this.supportsPointerEvents) {
	        this.interactionDOMElement.style['touch-action'] = '';
	      }
	      if (this.supportsPointerEvents) {
	        window.document.removeEventListener('pointermove', this.onPointerMove, true);
	        this.interactionDOMElement.removeEventListener('pointerdown', this.onPointerDown, true);
	        this.interactionDOMElement.removeEventListener('pointerleave', this.onPointerOut, true);
	        this.interactionDOMElement.removeEventListener('pointerover', this.onPointerOver, true);
	        window.removeEventListener('pointercancel', this.onPointerCancel, true);
	        window.removeEventListener('pointerup', this.onPointerUp, true);
	      } else {
	        window.document.removeEventListener('mousemove', this.onPointerMove, true);
	        this.interactionDOMElement.removeEventListener('mousedown', this.onPointerDown, true);
	        this.interactionDOMElement.removeEventListener('mouseout', this.onPointerOut, true);
	        this.interactionDOMElement.removeEventListener('mouseover', this.onPointerOver, true);
	        window.removeEventListener('mouseup', this.onPointerUp, true);
	      }
	      if (this.supportsTouchEvents) {
	        this.interactionDOMElement.removeEventListener('touchstart', this.onPointerDown, true);
	        this.interactionDOMElement.removeEventListener('touchcancel', this.onPointerCancel, true);
	        this.interactionDOMElement.removeEventListener('touchend', this.onPointerUp, true);
	        this.interactionDOMElement.removeEventListener('touchmove', this.onPointerMove, true);
	      }
	      this.interactionDOMElement = null;
	      this.eventsAdded = false;
	    }
	  }, {
	    key: 'update',
	    value: function update(deltaTime) {
	      this._deltaTime += deltaTime;
	      if (this._deltaTime < this.interactionFrequency) {
	        return;
	      }
	      this._deltaTime = 0;
	      if (!this.interactionDOMElement) {
	        return;
	      }
	      if (this.didMove) {
	        this.didMove = false;
	        return;
	      }
	      this.cursor = null;
	      for (var k in this.activeInteractionData) {
	        if (this.activeInteractionData.hasOwnProperty(k)) {
	          var interactionData = this.activeInteractionData[k];
	          if (interactionData.originalEvent && interactionData.pointerType !== 'touch') {
	            var interactionEvent = this.configureInteractionEventForDOMEvent(this.eventData, interactionData.originalEvent, interactionData);
	            this.processInteractive(interactionEvent, this.renderer._lastObjectRendered, this.processPointerOverOut, true);
	          }
	        }
	      }
	      this.setCursorMode(this.cursor);
	    }
	  }, {
	    key: 'setCursorMode',
	    value: function setCursorMode(mode) {
	      mode = mode || 'default';
	      if (this.currentCursorMode === mode) {
	        return;
	      }
	      this.currentCursorMode = mode;
	      var style = this.cursorStyles[mode];
	      if (style) {
	        switch (typeof style === 'undefined' ? 'undefined' : _typeof(style)) {
	          case 'string':
	            this.interactionDOMElement.style.cursor = style;
	            break;
	          case 'function':
	            style(mode);
	            break;
	          case 'object':
	            Object.assign(this.interactionDOMElement.style, style);
	            break;
	        }
	      } else if (typeof mode === 'string' && !Object.prototype.hasOwnProperty.call(this.cursorStyles, mode)) {
	        this.interactionDOMElement.style.cursor = mode;
	      }
	    }
	  }, {
	    key: 'dispatchEvent',
	    value: function dispatchEvent(displayObject, eventString, eventData) {
	      if (!eventData.stopped) {
	        eventData.currentTarget = displayObject;
	        eventData.type = eventString;
	        displayObject.emit(eventString, eventData);
	        if (displayObject[eventString]) {
	          displayObject[eventString](eventData);
	        }
	      }
	    }
	  }, {
	    key: 'mapPositionToPoint',
	    value: function mapPositionToPoint(point$$1, x, y) {
	      var rect = void 0;
	      if (!this.interactionDOMElement.parentElement) {
	        rect = { x: 0, y: 0, width: 0, height: 0 };
	      } else {
	        rect = this.interactionDOMElement.getBoundingClientRect();
	      }
	      if (navigator.isCanvasPlus) {
	        rect = this.interactionDOMElement.getBoundingClientRect();
	      }
	      var resolutionMultiplier = 1.0 / this.resolution;
	      point$$1.x = (x - rect.left) * (this.interactionDOMElement.width / rect.width) * resolutionMultiplier;
	      point$$1.y = (y - rect.top) * (this.interactionDOMElement.height / rect.height) * resolutionMultiplier;
	    }
	  }, {
	    key: 'processInteractive',
	    value: function processInteractive(interactionEvent, displayObject, func, hitTest, interactive) {
	      if (!displayObject || !displayObject.visible) {
	        return false;
	      }
	      var point$$1 = interactionEvent.data.global;
	      interactive = displayObject.interactive || interactive;
	      var hit = false;
	      var interactiveParent = interactive;
	      var hitTestChildren = true;
	      if (displayObject.hitArea) {
	        if (hitTest) {
	          displayObject.worldTransform.applyInverse(point$$1, this._tempPoint);
	          if (!displayObject.hitArea.contains(this._tempPoint.x, this._tempPoint.y)) {
	            hitTest = false;
	            hitTestChildren = false;
	          } else {
	            hit = true;
	          }
	        }
	        interactiveParent = false;
	      } else if (displayObject._mask) {
	        if (hitTest) {
	          if (!displayObject._mask.containsPoint(point$$1)) {
	            hitTest = false;
	            hitTestChildren = false;
	          }
	        }
	      }
	      if (hitTestChildren && displayObject.interactiveChildren && displayObject.children) {
	        var children = displayObject.children;
	        for (var i = children.length - 1; i >= 0; i--) {
	          var child = children[i];
	          var childHit = this.processInteractive(interactionEvent, child, func, hitTest, interactiveParent);
	          if (childHit) {
	            if (!child.parent) {
	              continue;
	            }
	            interactiveParent = false;
	            if (childHit) {
	              if (interactionEvent.target) {
	                hitTest = false;
	              }
	              hit = true;
	            }
	          }
	        }
	      }
	      if (interactive) {
	        if (hitTest && !interactionEvent.target) {
	          if (!displayObject.hitArea && displayObject.containsPoint) {
	            if (displayObject.containsPoint(point$$1) && displayObject.transform._worldID !== 0) {
	              hit = true;
	            }
	          }
	        }
	        if (displayObject.interactive) {
	          if (hit && !interactionEvent.target) {
	            interactionEvent.target = displayObject;
	          }
	          if (func) {
	            func(interactionEvent, displayObject, !!hit);
	          }
	        }
	      }
	      return hit;
	    }
	  }, {
	    key: 'onPointerDown',
	    value: function onPointerDown(originalEvent) {
	      if (this.supportsTouchEvents && originalEvent.pointerType === 'touch') return;
	      var events = this.normalizeToPointerData(originalEvent);
	      if (this.autoPreventDefault && events[0].isNormalized) {
	        originalEvent.preventDefault();
	      }
	      var eventLen = events.length;
	      for (var i = 0; i < eventLen; i++) {
	        var event = events[i];
	        var interactionData = this.getInteractionDataForPointerId(event);
	        var interactionEvent = this.configureInteractionEventForDOMEvent(this.eventData, event, interactionData);
	        interactionEvent.data.originalEvent = originalEvent;
	        this.processInteractive(interactionEvent, this.renderer._lastObjectRendered, this.processPointerDown, true);
	        this.emit('pointerdown', interactionEvent);
	        if (event.pointerType === 'touch') {
	          this.emit('touchstart', interactionEvent);
	        } else if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
	          var isRightButton = event.button === 2;
	          this.emit(isRightButton ? 'rightdown' : 'mousedown', this.eventData);
	        }
	      }
	    }
	  }, {
	    key: 'processPointerDown',
	    value: function processPointerDown(interactionEvent, displayObject, hit) {
	      var data = interactionEvent.data;
	      var id = interactionEvent.data.identifier;
	      if (hit) {
	        if (!displayObject.trackedPointers[id]) {
	          displayObject.trackedPointers[id] = new InteractionTrackingData(id);
	        }
	        this.dispatchEvent(displayObject, 'pointerdown', interactionEvent);
	        if (data.pointerType === 'touch') {
	          this.dispatchEvent(displayObject, 'touchstart', interactionEvent);
	        } else if (data.pointerType === 'mouse' || data.pointerType === 'pen') {
	          var isRightButton = data.button === 2;
	          if (isRightButton) {
	            displayObject.trackedPointers[id].rightDown = true;
	          } else {
	            displayObject.trackedPointers[id].leftDown = true;
	          }
	          this.dispatchEvent(displayObject, isRightButton ? 'rightdown' : 'mousedown', interactionEvent);
	        }
	      }
	    }
	  }, {
	    key: 'onPointerComplete',
	    value: function onPointerComplete(originalEvent, cancelled, func) {
	      var events = this.normalizeToPointerData(originalEvent);
	      var eventLen = events.length;
	      var eventAppend = originalEvent.target !== this.interactionDOMElement ? 'outside' : '';
	      for (var i = 0; i < eventLen; i++) {
	        var event = events[i];
	        var interactionData = this.getInteractionDataForPointerId(event);
	        var interactionEvent = this.configureInteractionEventForDOMEvent(this.eventData, event, interactionData);
	        interactionEvent.data.originalEvent = originalEvent;
	        this.processInteractive(interactionEvent, this.renderer._lastObjectRendered, func, cancelled || !eventAppend);
	        this.emit(cancelled ? 'pointercancel' : 'pointerup' + eventAppend, interactionEvent);
	        if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
	          var isRightButton = event.button === 2;
	          this.emit(isRightButton ? 'rightup' + eventAppend : 'mouseup' + eventAppend, interactionEvent);
	        } else if (event.pointerType === 'touch') {
	          this.emit(cancelled ? 'touchcancel' : 'touchend' + eventAppend, interactionEvent);
	          this.releaseInteractionDataForPointerId(event.pointerId, interactionData);
	        }
	      }
	    }
	  }, {
	    key: 'onPointerCancel',
	    value: function onPointerCancel(event) {
	      if (this.supportsTouchEvents && event.pointerType === 'touch') return;
	      this.onPointerComplete(event, true, this.processPointerCancel);
	    }
	  }, {
	    key: 'processPointerCancel',
	    value: function processPointerCancel(interactionEvent, displayObject) {
	      var data = interactionEvent.data;
	      var id = interactionEvent.data.identifier;
	      if (displayObject.trackedPointers[id] !== undefined) {
	        delete displayObject.trackedPointers[id];
	        this.dispatchEvent(displayObject, 'pointercancel', interactionEvent);
	        if (data.pointerType === 'touch') {
	          this.dispatchEvent(displayObject, 'touchcancel', interactionEvent);
	        }
	      }
	    }
	  }, {
	    key: 'onPointerUp',
	    value: function onPointerUp(event) {
	      if (this.supportsTouchEvents && event.pointerType === 'touch') return;
	      this.onPointerComplete(event, false, this.processPointerUp);
	    }
	  }, {
	    key: 'processPointerUp',
	    value: function processPointerUp(interactionEvent, displayObject, hit) {
	      var data = interactionEvent.data;
	      var id = interactionEvent.data.identifier;
	      var trackingData = displayObject.trackedPointers[id];
	      var isTouch = data.pointerType === 'touch';
	      var isMouse = data.pointerType === 'mouse' || data.pointerType === 'pen';
	      var isMouseTap = false;
	      if (isMouse) {
	        var isRightButton = data.button === 2;
	        var flags = InteractionTrackingData.FLAGS;
	        var test = isRightButton ? flags.RIGHT_DOWN : flags.LEFT_DOWN;
	        var isDown = trackingData !== undefined && trackingData.flags & test;
	        if (hit) {
	          this.dispatchEvent(displayObject, isRightButton ? 'rightup' : 'mouseup', interactionEvent);
	          if (isDown) {
	            this.dispatchEvent(displayObject, isRightButton ? 'rightclick' : 'click', interactionEvent);
	            isMouseTap = true;
	          }
	        } else if (isDown) {
	          this.dispatchEvent(displayObject, isRightButton ? 'rightupoutside' : 'mouseupoutside', interactionEvent);
	        }
	        if (trackingData) {
	          if (isRightButton) {
	            trackingData.rightDown = false;
	          } else {
	            trackingData.leftDown = false;
	          }
	        }
	      }
	      if (hit) {
	        this.dispatchEvent(displayObject, 'pointerup', interactionEvent);
	        if (isTouch) this.dispatchEvent(displayObject, 'touchend', interactionEvent);
	        if (trackingData) {
	          if (!isMouse || isMouseTap) {
	            this.dispatchEvent(displayObject, 'pointertap', interactionEvent);
	          }
	          if (isTouch) {
	            this.dispatchEvent(displayObject, 'tap', interactionEvent);
	            trackingData.over = false;
	          }
	        }
	      } else if (trackingData) {
	        this.dispatchEvent(displayObject, 'pointerupoutside', interactionEvent);
	        if (isTouch) this.dispatchEvent(displayObject, 'touchendoutside', interactionEvent);
	      }
	      if (trackingData && trackingData.none) {
	        delete displayObject.trackedPointers[id];
	      }
	    }
	  }, {
	    key: 'onPointerMove',
	    value: function onPointerMove(originalEvent) {
	      if (this.supportsTouchEvents && originalEvent.pointerType === 'touch') return;
	      var events = this.normalizeToPointerData(originalEvent);
	      if (events[0].pointerType === 'mouse' || events[0].pointerType === 'pen') {
	        this.didMove = true;
	        this.cursor = null;
	      }
	      var eventLen = events.length;
	      for (var i = 0; i < eventLen; i++) {
	        var event = events[i];
	        var interactionData = this.getInteractionDataForPointerId(event);
	        var interactionEvent = this.configureInteractionEventForDOMEvent(this.eventData, event, interactionData);
	        interactionEvent.data.originalEvent = originalEvent;
	        var interactive = event.pointerType === 'touch' ? this.moveWhenInside : true;
	        this.processInteractive(interactionEvent, this.renderer._lastObjectRendered, this.processPointerMove, interactive);
	        this.emit('pointermove', interactionEvent);
	        if (event.pointerType === 'touch') this.emit('touchmove', interactionEvent);
	        if (event.pointerType === 'mouse' || event.pointerType === 'pen') this.emit('mousemove', interactionEvent);
	      }
	      if (events[0].pointerType === 'mouse') {
	        this.setCursorMode(this.cursor);
	      }
	    }
	  }, {
	    key: 'processPointerMove',
	    value: function processPointerMove(interactionEvent, displayObject, hit) {
	      var data = interactionEvent.data;
	      var isTouch = data.pointerType === 'touch';
	      var isMouse = data.pointerType === 'mouse' || data.pointerType === 'pen';
	      if (isMouse) {
	        this.processPointerOverOut(interactionEvent, displayObject, hit);
	      }
	      if (!this.moveWhenInside || hit) {
	        this.dispatchEvent(displayObject, 'pointermove', interactionEvent);
	        if (isTouch) this.dispatchEvent(displayObject, 'touchmove', interactionEvent);
	        if (isMouse) this.dispatchEvent(displayObject, 'mousemove', interactionEvent);
	      }
	    }
	  }, {
	    key: 'onPointerOut',
	    value: function onPointerOut(originalEvent) {
	      if (this.supportsTouchEvents && originalEvent.pointerType === 'touch') return;
	      var events = this.normalizeToPointerData(originalEvent);
	      var event = events[0];
	      if (event.pointerType === 'mouse') {
	        this.mouseOverRenderer = false;
	        this.setCursorMode(null);
	      }
	      var interactionData = this.getInteractionDataForPointerId(event);
	      var interactionEvent = this.configureInteractionEventForDOMEvent(this.eventData, event, interactionData);
	      interactionEvent.data.originalEvent = event;
	      this.processInteractive(interactionEvent, this.renderer._lastObjectRendered, this.processPointerOverOut, false);
	      this.emit('pointerout', interactionEvent);
	      if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
	        this.emit('mouseout', interactionEvent);
	      } else {
	        this.releaseInteractionDataForPointerId(interactionData.identifier);
	      }
	    }
	  }, {
	    key: 'processPointerOverOut',
	    value: function processPointerOverOut(interactionEvent, displayObject, hit) {
	      var data = interactionEvent.data;
	      var id = interactionEvent.data.identifier;
	      var isMouse = data.pointerType === 'mouse' || data.pointerType === 'pen';
	      var trackingData = displayObject.trackedPointers[id];
	      if (hit && !trackingData) {
	        trackingData = displayObject.trackedPointers[id] = new InteractionTrackingData(id);
	      }
	      if (trackingData === undefined) return;
	      if (hit && this.mouseOverRenderer) {
	        if (!trackingData.over) {
	          trackingData.over = true;
	          this.dispatchEvent(displayObject, 'pointerover', interactionEvent);
	          if (isMouse) {
	            this.dispatchEvent(displayObject, 'mouseover', interactionEvent);
	          }
	        }
	        if (isMouse && this.cursor === null) {
	          this.cursor = displayObject.cursor;
	        }
	      } else if (trackingData.over) {
	        trackingData.over = false;
	        this.dispatchEvent(displayObject, 'pointerout', this.eventData);
	        if (isMouse) {
	          this.dispatchEvent(displayObject, 'mouseout', interactionEvent);
	        }
	        if (trackingData.none) {
	          delete displayObject.trackedPointers[id];
	        }
	      }
	    }
	  }, {
	    key: 'onPointerOver',
	    value: function onPointerOver(originalEvent) {
	      var events = this.normalizeToPointerData(originalEvent);
	      var event = events[0];
	      var interactionData = this.getInteractionDataForPointerId(event);
	      var interactionEvent = this.configureInteractionEventForDOMEvent(this.eventData, event, interactionData);
	      interactionEvent.data.originalEvent = event;
	      if (event.pointerType === 'mouse') {
	        this.mouseOverRenderer = true;
	      }
	      this.emit('pointerover', interactionEvent);
	      if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
	        this.emit('mouseover', interactionEvent);
	      }
	    }
	  }, {
	    key: 'getInteractionDataForPointerId',
	    value: function getInteractionDataForPointerId(event) {
	      var pointerId = event.pointerId;
	      var interactionData = void 0;
	      if (pointerId === MOUSE_POINTER_ID || event.pointerType === 'mouse') {
	        interactionData = this.mouse;
	      } else if (this.activeInteractionData[pointerId]) {
	        interactionData = this.activeInteractionData[pointerId];
	      } else {
	        interactionData = this.interactionDataPool.pop() || new InteractionData();
	        interactionData.identifier = pointerId;
	        this.activeInteractionData[pointerId] = interactionData;
	      }
	      interactionData.copyEvent(event);
	      return interactionData;
	    }
	  }, {
	    key: 'releaseInteractionDataForPointerId',
	    value: function releaseInteractionDataForPointerId(pointerId) {
	      var interactionData = this.activeInteractionData[pointerId];
	      if (interactionData) {
	        delete this.activeInteractionData[pointerId];
	        interactionData.reset();
	        this.interactionDataPool.push(interactionData);
	      }
	    }
	  }, {
	    key: 'configureInteractionEventForDOMEvent',
	    value: function configureInteractionEventForDOMEvent(interactionEvent, pointerEvent, interactionData) {
	      interactionEvent.data = interactionData;
	      this.mapPositionToPoint(interactionData.global, pointerEvent.clientX, pointerEvent.clientY);
	      if (pointerEvent.pointerType === 'touch') {
	        pointerEvent.globalX = interactionData.global.x;
	        pointerEvent.globalY = interactionData.global.y;
	      }
	      interactionData.originalEvent = pointerEvent;
	      interactionEvent.reset();
	      return interactionEvent;
	    }
	  }, {
	    key: 'normalizeToPointerData',
	    value: function normalizeToPointerData(event) {
	      var normalizedEvents = [];
	      if (this.supportsTouchEvents && (navigator.isCanvasPlus || window.TouchEvent && event instanceof window.TouchEvent)) {
	        for (var i = 0, li = event.changedTouches.length; i < li; i++) {
	          var touch = event.changedTouches[i];
	          if (typeof touch.button === 'undefined') touch.button = event.touches.length ? 1 : 0;
	          if (typeof touch.buttons === 'undefined') touch.buttons = event.touches.length ? 1 : 0;
	          if (typeof touch.isPrimary === 'undefined') {
	            touch.isPrimary = event.touches.length === 1 && event.type === 'touchstart';
	          }
	          if (typeof touch.width === 'undefined') touch.width = touch.radiusX || 1;
	          if (typeof touch.height === 'undefined') touch.height = touch.radiusY || 1;
	          if (typeof touch.tiltX === 'undefined') touch.tiltX = 0;
	          if (typeof touch.tiltY === 'undefined') touch.tiltY = 0;
	          if (typeof touch.pointerType === 'undefined') touch.pointerType = 'touch';
	          if (typeof touch.pointerId === 'undefined') touch.pointerId = touch.identifier || 0;
	          if (typeof touch.pressure === 'undefined') touch.pressure = touch.force || 0.5;
	          touch.twist = 0;
	          touch.tangentialPressure = 0;
	          if (typeof touch.layerX === 'undefined') touch.layerX = touch.offsetX = touch.clientX;
	          if (typeof touch.layerY === 'undefined') touch.layerY = touch.offsetY = touch.clientY;
	          touch.isNormalized = true;
	          normalizedEvents.push(touch);
	        }
	      } else if (window.MouseEvent && event instanceof window.MouseEvent && (!this.supportsPointerEvents || !(window.PointerEvent && event instanceof window.PointerEvent))) {
	        if (typeof event.isPrimary === 'undefined') event.isPrimary = true;
	        if (typeof event.width === 'undefined') event.width = 1;
	        if (typeof event.height === 'undefined') event.height = 1;
	        if (typeof event.tiltX === 'undefined') event.tiltX = 0;
	        if (typeof event.tiltY === 'undefined') event.tiltY = 0;
	        if (typeof event.pointerType === 'undefined') event.pointerType = 'mouse';
	        if (typeof event.pointerId === 'undefined') event.pointerId = MOUSE_POINTER_ID;
	        if (typeof event.pressure === 'undefined') event.pressure = 0.5;
	        event.twist = 0;
	        event.tangentialPressure = 0;
	        event.isNormalized = true;
	        normalizedEvents.push(event);
	      } else {
	        normalizedEvents.push(event);
	      }
	      return normalizedEvents;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.removeEvents();
	      this.removeAllListeners();
	      this.renderer = null;
	      this.mouse = null;
	      this.eventData = null;
	      this.interactionDOMElement = null;
	      this.onPointerDown = null;
	      this.processPointerDown = null;
	      this.onPointerUp = null;
	      this.processPointerUp = null;
	      this.onPointerCancel = null;
	      this.processPointerCancel = null;
	      this.onPointerMove = null;
	      this.processPointerMove = null;
	      this.onPointerOut = null;
	      this.processPointerOverOut = null;
	      this.onPointerOver = null;
	      this._tempPoint = null;
	    }
	  }]);
	  return InteractionManager;
	}(_eventemitter3_3_1_2_eventemitter3);
	WebGLRenderer.registerPlugin('interaction', InteractionManager);
	CanvasRenderer.registerPlugin('interaction', InteractionManager);



	var index$1 = /*#__PURE__*/Object.freeze({
		InteractionData: InteractionData,
		InteractionManager: InteractionManager,
		interactiveTarget: interactiveTarget,
		InteractionTrackingData: InteractionTrackingData,
		InteractionEvent: InteractionEvent
	});

	var miniSignals = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	var MiniSignalBinding = (function () {
	  function MiniSignalBinding(fn, once, thisArg) {
	    if (once === undefined) once = false;
	    _classCallCheck(this, MiniSignalBinding);
	    this._fn = fn;
	    this._once = once;
	    this._thisArg = thisArg;
	    this._next = this._prev = this._owner = null;
	  }
	  _createClass(MiniSignalBinding, [{
	    key: 'detach',
	    value: function detach() {
	      if (this._owner === null) return false;
	      this._owner.detach(this);
	      return true;
	    }
	  }]);
	  return MiniSignalBinding;
	})();
	function _addMiniSignalBinding(self, node) {
	  if (!self._head) {
	    self._head = node;
	    self._tail = node;
	  } else {
	    self._tail._next = node;
	    node._prev = self._tail;
	    self._tail = node;
	  }
	  node._owner = self;
	  return node;
	}
	var MiniSignal = (function () {
	  function MiniSignal() {
	    _classCallCheck(this, MiniSignal);
	    this._head = this._tail = undefined;
	  }
	  _createClass(MiniSignal, [{
	    key: 'handlers',
	    value: function handlers() {
	      var exists = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	      var node = this._head;
	      if (exists) return !!node;
	      var ee = [];
	      while (node) {
	        ee.push(node);
	        node = node._next;
	      }
	      return ee;
	    }
	  }, {
	    key: 'has',
	    value: function has(node) {
	      if (!(node instanceof MiniSignalBinding)) {
	        throw new Error('MiniSignal#has(): First arg must be a MiniSignalBinding object.');
	      }
	      return node._owner === this;
	    }
	  }, {
	    key: 'dispatch',
	    value: function dispatch() {
	      var node = this._head;
	      if (!node) return false;
	      while (node) {
	        if (node._once) this.detach(node);
	        node._fn.apply(node._thisArg, arguments);
	        node = node._next;
	      }
	      return true;
	    }
	  }, {
	    key: 'add',
	    value: function add(fn) {
	      var thisArg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      if (typeof fn !== 'function') {
	        throw new Error('MiniSignal#add(): First arg must be a Function.');
	      }
	      return _addMiniSignalBinding(this, new MiniSignalBinding(fn, false, thisArg));
	    }
	  }, {
	    key: 'once',
	    value: function once(fn) {
	      var thisArg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      if (typeof fn !== 'function') {
	        throw new Error('MiniSignal#once(): First arg must be a Function.');
	      }
	      return _addMiniSignalBinding(this, new MiniSignalBinding(fn, true, thisArg));
	    }
	  }, {
	    key: 'detach',
	    value: function detach(node) {
	      if (!(node instanceof MiniSignalBinding)) {
	        throw new Error('MiniSignal#detach(): First arg must be a MiniSignalBinding object.');
	      }
	      if (node._owner !== this) return this;
	      if (node._prev) node._prev._next = node._next;
	      if (node._next) node._next._prev = node._prev;
	      if (node === this._head) {
	        this._head = node._next;
	        if (node._next === null) {
	          this._tail = null;
	        }
	      } else if (node === this._tail) {
	        this._tail = node._prev;
	        this._tail._next = null;
	      }
	      node._owner = null;
	      return this;
	    }
	  }, {
	    key: 'detachAll',
	    value: function detachAll() {
	      var node = this._head;
	      if (!node) return this;
	      this._head = this._tail = null;
	      while (node) {
	        node._owner = null;
	        node = node._next;
	      }
	      return this;
	    }
	  }]);
	  return MiniSignal;
	})();
	MiniSignal.MiniSignalBinding = MiniSignalBinding;
	exports['default'] = MiniSignal;
	module.exports = exports['default'];
	});
	var Signal = unwrapExports(miniSignals);

	function _noop() {}
	function eachSeries(array, iterator, callback, deferNext) {
	  var i = 0;
	  var len = array.length;
	  (function next(err) {
	    if (err || i === len) {
	      if (callback) {
	        callback(err);
	      }
	      return;
	    }
	    if (deferNext) {
	      setTimeout(function () {
	        iterator(array[i++], next);
	      }, 1);
	    } else {
	      iterator(array[i++], next);
	    }
	  })();
	}
	function onlyOnce(fn) {
	  return function onceWrapper() {
	    if (fn === null) {
	      throw new Error('Callback was already called.');
	    }
	    var callFn = fn;
	    fn = null;
	    callFn.apply(this, arguments);
	  };
	}
	function queue(worker, concurrency) {
	  if (concurrency == null) {
	    concurrency = 1;
	  } else if (concurrency === 0) {
	    throw new Error('Concurrency must not be zero');
	  }
	  var workers = 0;
	  var q = {
	    _tasks: [],
	    concurrency: concurrency,
	    saturated: _noop,
	    unsaturated: _noop,
	    buffer: concurrency / 4,
	    empty: _noop,
	    drain: _noop,
	    error: _noop,
	    started: false,
	    paused: false,
	    push: function push(data, callback) {
	      _insert(data, false, callback);
	    },
	    kill: function kill() {
	      workers = 0;
	      q.drain = _noop;
	      q.started = false;
	      q._tasks = [];
	    },
	    unshift: function unshift(data, callback) {
	      _insert(data, true, callback);
	    },
	    process: function process() {
	      while (!q.paused && workers < q.concurrency && q._tasks.length) {
	        var task = q._tasks.shift();
	        if (q._tasks.length === 0) {
	          q.empty();
	        }
	        workers += 1;
	        if (workers === q.concurrency) {
	          q.saturated();
	        }
	        worker(task.data, onlyOnce(_next(task)));
	      }
	    },
	    length: function length() {
	      return q._tasks.length;
	    },
	    running: function running() {
	      return workers;
	    },
	    idle: function idle() {
	      return q._tasks.length + workers === 0;
	    },
	    pause: function pause() {
	      if (q.paused === true) {
	        return;
	      }
	      q.paused = true;
	    },
	    resume: function resume() {
	      if (q.paused === false) {
	        return;
	      }
	      q.paused = false;
	      for (var w = 1; w <= q.concurrency; w++) {
	        q.process();
	      }
	    }
	  };
	  function _insert(data, insertAtFront, callback) {
	    if (callback != null && typeof callback !== 'function') {
	      throw new Error('task callback must be a function');
	    }
	    q.started = true;
	    if (data == null && q.idle()) {
	      setTimeout(function () {
	        return q.drain();
	      }, 1);
	      return;
	    }
	    var item = {
	      data: data,
	      callback: typeof callback === 'function' ? callback : _noop
	    };
	    if (insertAtFront) {
	      q._tasks.unshift(item);
	    } else {
	      q._tasks.push(item);
	    }
	    setTimeout(function () {
	      return q.process();
	    }, 1);
	  }
	  function _next(task) {
	    return function next() {
	      workers -= 1;
	      task.callback.apply(task, arguments);
	      if (arguments[0] != null) {
	        q.error(arguments[0], task.data);
	      }
	      if (workers <= q.concurrency - q.buffer) {
	        q.unsaturated();
	      }
	      if (q.idle()) {
	        q.drain();
	      }
	      q.process();
	    };
	  }
	  return q;
	}

	var async = /*#__PURE__*/Object.freeze({
		eachSeries: eachSeries,
		queue: queue
	});

	var STATUS_NONE = 0;
	var STATUS_OK = 200;
	var STATUS_EMPTY = 204;
	var STATUS_IE_BUG_EMPTY = 1223;
	var STATUS_TYPE_OK = 2;
	function _noop$1() {}
	var Resource = function () {
	  createClass(Resource, null, [{
	    key: 'setExtensionLoadType',
	    value: function setExtensionLoadType(extname, loadType) {
	      setExtMap(Resource._loadTypeMap, extname, loadType);
	    }
	  }, {
	    key: 'setExtensionXhrType',
	    value: function setExtensionXhrType(extname, xhrType) {
	      setExtMap(Resource._xhrTypeMap, extname, xhrType);
	    }
	  }]);
	  function Resource(name, url$$1, options) {
	    classCallCheck(this, Resource);
	    if (typeof name !== 'string' || typeof url$$1 !== 'string') {
	      throw new Error('Both name and url are required for constructing a resource.');
	    }
	    options = options || {};
	    this._flags = 0;
	    this._setFlag(Resource.STATUS_FLAGS.DATA_URL, url$$1.indexOf('data:') === 0);
	    this.name = name;
	    this.url = url$$1;
	    this.extension = this._getExtension();
	    this.data = null;
	    this.crossOrigin = options.crossOrigin === true ? 'anonymous' : options.crossOrigin;
	    this.timeout = options.timeout || 0;
	    this.loadType = options.loadType || this._determineLoadType();
	    this.xhrType = options.xhrType;
	    this.metadata = options.metadata || {};
	    this.error = null;
	    this.xhr = null;
	    this.children = [];
	    this.type = Resource.TYPE.UNKNOWN;
	    this.progressChunk = 0;
	    this._dequeue = _noop$1;
	    this._onLoadBinding = null;
	    this._elementTimer = 0;
	    this._boundComplete = this.complete.bind(this);
	    this._boundOnError = this._onError.bind(this);
	    this._boundOnProgress = this._onProgress.bind(this);
	    this._boundOnTimeout = this._onTimeout.bind(this);
	    this._boundXhrOnError = this._xhrOnError.bind(this);
	    this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this);
	    this._boundXhrOnAbort = this._xhrOnAbort.bind(this);
	    this._boundXhrOnLoad = this._xhrOnLoad.bind(this);
	    this.onStart = new Signal();
	    this.onProgress = new Signal();
	    this.onComplete = new Signal();
	    this.onAfterMiddleware = new Signal();
	  }
	  createClass(Resource, [{
	    key: 'complete',
	    value: function complete() {
	      this._clearEvents();
	      this._finish();
	    }
	  }, {
	    key: 'abort',
	    value: function abort(message) {
	      if (this.error) {
	        return;
	      }
	      this.error = new Error(message);
	      this._clearEvents();
	      if (this.xhr) {
	        this.xhr.abort();
	      } else if (this.data) {
	        if (this.data.src) {
	          this.data.src = Resource.EMPTY_GIF;
	        } else {
	          while (this.data.firstChild) {
	            this.data.removeChild(this.data.firstChild);
	          }
	        }
	      }
	      this._finish();
	    }
	  }, {
	    key: 'load',
	    value: function load(cb) {
	      var _this = this;
	      if (this.isLoading) {
	        return;
	      }
	      if (this.isComplete) {
	        if (cb) {
	          setTimeout(function () {
	            return cb(_this);
	          }, 1);
	        }
	        return;
	      } else if (cb) {
	        this.onComplete.once(cb);
	      }
	      this._setFlag(Resource.STATUS_FLAGS.LOADING, true);
	      this.onStart.dispatch(this);
	      if (this.crossOrigin === false || typeof this.crossOrigin !== 'string') {
	        this.crossOrigin = determineCrossOrigin(this.url);
	      }
	      switch (this.loadType) {
	        case Resource.LOAD_TYPE.IMAGE:
	          this.type = Resource.TYPE.IMAGE;
	          this._loadElement('image');
	          break;
	        case Resource.LOAD_TYPE.AUDIO:
	          this.type = Resource.TYPE.AUDIO;
	          this._loadSourceElement('audio');
	          break;
	        case Resource.LOAD_TYPE.VIDEO:
	          this.type = Resource.TYPE.VIDEO;
	          this._loadSourceElement('video');
	          break;
	        case Resource.LOAD_TYPE.XHR:
	        default:
	          this._loadXhr();
	          break;
	      }
	    }
	  }, {
	    key: '_hasFlag',
	    value: function _hasFlag(flag) {
	      return (this._flags & flag) !== 0;
	    }
	  }, {
	    key: '_setFlag',
	    value: function _setFlag(flag, value) {
	      this._flags = value ? this._flags | flag : this._flags & ~flag;
	    }
	  }, {
	    key: '_clearEvents',
	    value: function _clearEvents() {
	      clearTimeout(this._elementTimer);
	      if (this.data && this.data.removeEventListener) {
	        this.data.removeEventListener('error', this._boundOnError, false);
	        this.data.removeEventListener('load', this._boundComplete, false);
	        this.data.removeEventListener('progress', this._boundOnProgress, false);
	        this.data.removeEventListener('canplaythrough', this._boundComplete, false);
	      }
	      if (this.xhr) {
	        if (this.xhr.removeEventListener) {
	          this.xhr.removeEventListener('error', this._boundXhrOnError, false);
	          this.xhr.removeEventListener('timeout', this._boundXhrOnTimeout, false);
	          this.xhr.removeEventListener('abort', this._boundXhrOnAbort, false);
	          this.xhr.removeEventListener('progress', this._boundOnProgress, false);
	          this.xhr.removeEventListener('load', this._boundXhrOnLoad, false);
	        } else {
	          this.xhr.onerror = null;
	          this.xhr.ontimeout = null;
	          this.xhr.onprogress = null;
	          this.xhr.onload = null;
	        }
	      }
	    }
	  }, {
	    key: '_finish',
	    value: function _finish() {
	      if (this.isComplete) {
	        throw new Error('Complete called again for an already completed resource.');
	      }
	      this._setFlag(Resource.STATUS_FLAGS.COMPLETE, true);
	      this._setFlag(Resource.STATUS_FLAGS.LOADING, false);
	      this.onComplete.dispatch(this);
	    }
	  }, {
	    key: '_loadElement',
	    value: function _loadElement(type) {
	      if (this.metadata.loadElement) {
	        this.data = this.metadata.loadElement;
	      } else if (type === 'image' && typeof window.Image !== 'undefined') {
	        this.data = new Image();
	      } else {
	        this.data = document.createElement(type);
	      }
	      if (this.crossOrigin) {
	        this.data.crossOrigin = this.crossOrigin;
	      }
	      if (!this.metadata.skipSource) {
	        this.data.src = this.url;
	      }
	      this.data.addEventListener('error', this._boundOnError, false);
	      this.data.addEventListener('load', this._boundComplete, false);
	      this.data.addEventListener('progress', this._boundOnProgress, false);
	      if (this.timeout) {
	        this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout);
	      }
	    }
	  }, {
	    key: '_loadSourceElement',
	    value: function _loadSourceElement(type) {
	      if (this.metadata.loadElement) {
	        this.data = this.metadata.loadElement;
	      } else if (type === 'audio' && typeof window.Audio !== 'undefined') {
	        this.data = new Audio();
	      } else {
	        this.data = document.createElement(type);
	      }
	      if (this.data === null) {
	        this.abort('Unsupported element: ' + type);
	        return;
	      }
	      if (this.crossOrigin) {
	        this.data.crossOrigin = this.crossOrigin;
	      }
	      if (!this.metadata.skipSource) {
	        if (navigator.isCanvasPlus) {
	          this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
	        } else if (Array.isArray(this.url)) {
	          var mimeTypes = this.metadata.mimeType;
	          for (var i = 0; i < this.url.length; ++i) {
	            this.data.appendChild(this._createSource(type, this.url[i], Array.isArray(mimeTypes) ? mimeTypes[i] : mimeTypes));
	          }
	        } else {
	          var _mimeTypes = this.metadata.mimeType;
	          this.data.appendChild(this._createSource(type, this.url, Array.isArray(_mimeTypes) ? _mimeTypes[0] : _mimeTypes));
	        }
	      }
	      this.data.addEventListener('error', this._boundOnError, false);
	      this.data.addEventListener('load', this._boundComplete, false);
	      this.data.addEventListener('progress', this._boundOnProgress, false);
	      this.data.addEventListener('canplaythrough', this._boundComplete, false);
	      this.data.load();
	      if (this.timeout) {
	        this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout);
	      }
	    }
	  }, {
	    key: '_loadXhr',
	    value: function _loadXhr() {
	      if (typeof this.xhrType !== 'string') {
	        this.xhrType = this._determineXhrType();
	      }
	      var xhr = this.xhr = new XMLHttpRequest();
	      xhr.timeout = this.timeout;
	      xhr.open('GET', this.url, true);
	      if (this.xhrType === Resource.XHR_RESPONSE_TYPE.JSON || this.xhrType === Resource.XHR_RESPONSE_TYPE.DOCUMENT) {
	        xhr.responseType = Resource.XHR_RESPONSE_TYPE.TEXT;
	      } else {
	        xhr.responseType = this.xhrType;
	      }
	      if (xhr.addEventListener) {
	        xhr.addEventListener('error', this._boundXhrOnError, false);
	        xhr.addEventListener('timeout', this._boundXhrOnTimeout, false);
	        xhr.addEventListener('abort', this._boundXhrOnAbort, false);
	        xhr.addEventListener('progress', this._boundOnProgress, false);
	        xhr.addEventListener('load', this._boundXhrOnLoad, false);
	      } else {
	        xhr.onerror = this._boundOnError;
	        xhr.ontimeout = this._boundXhrOnTimeout;
	        xhr.onabort = this._boundXhrOnAbort;
	        xhr.onprogress = this._boundOnProgress;
	        xhr.onload = this._boundXhrOnLoad;
	      }
	      xhr.send();
	    }
	  }, {
	    key: '_createSource',
	    value: function _createSource(type, url$$1, mime) {
	      if (!mime) {
	        mime = type + '/' + this._getExtension(url$$1);
	      }
	      var source = document.createElement('source');
	      source.src = url$$1;
	      source.type = mime;
	      return source;
	    }
	  }, {
	    key: '_onError',
	    value: function _onError(event) {
	      this.abort('Failed to load element using: ' + (event && event.target && event.target.nodeName));
	    }
	  }, {
	    key: '_onProgress',
	    value: function _onProgress(event) {
	      if (event && event.lengthComputable) {
	        this.onProgress.dispatch(this, event.loaded / event.total);
	      }
	    }
	  }, {
	    key: '_onTimeout',
	    value: function _onTimeout() {
	      this.abort('Load timed out.');
	    }
	  }, {
	    key: '_xhrOnError',
	    value: function _xhrOnError() {
	      var xhr = this.xhr;
	      this.abort('[XMLHttpRequest] Request failed. Status: ' + xhr.status + ', text: "' + xhr.statusText + '"');
	    }
	  }, {
	    key: '_xhrOnTimeout',
	    value: function _xhrOnTimeout() {
	      this.abort('[XMLHttpRequest] Request timed out.');
	    }
	  }, {
	    key: '_xhrOnAbort',
	    value: function _xhrOnAbort() {
	      this.abort('[XMLHttpRequest] Request was aborted by the user.');
	    }
	  }, {
	    key: '_xhrOnLoad',
	    value: function _xhrOnLoad() {
	      var xhr = this.xhr;
	      var text = '';
	      var status = typeof xhr.status === 'undefined' ? STATUS_OK : xhr.status;
	      if (xhr.responseType === '' || xhr.responseType === 'text' || typeof xhr.responseType === 'undefined') {
	        text = xhr.responseText;
	      }
	      if (status === STATUS_NONE && (text.length > 0 || xhr.responseType === Resource.XHR_RESPONSE_TYPE.BUFFER)) {
	        status = STATUS_OK;
	      } else if (status === STATUS_IE_BUG_EMPTY) {
	        status = STATUS_EMPTY;
	      }
	      var statusType = status / 100 | 0;
	      if (statusType === STATUS_TYPE_OK) {
	        if (this.xhrType === Resource.XHR_RESPONSE_TYPE.TEXT) {
	          this.data = text;
	          this.type = Resource.TYPE.TEXT;
	        } else if (this.xhrType === Resource.XHR_RESPONSE_TYPE.JSON) {
	          try {
	            this.data = JSON.parse(text);
	            this.type = Resource.TYPE.JSON;
	          } catch (e) {
	            this.abort('Error trying to parse loaded json: ' + e);
	            return;
	          }
	        } else if (this.xhrType === Resource.XHR_RESPONSE_TYPE.DOCUMENT) {
	          try {
	            if (window.DOMParser) {
	              var domparser = new DOMParser();
	              this.data = domparser.parseFromString(text, 'text/xml');
	            } else {
	              var div = document.createElement('div');
	              div.innerHTML = text;
	              this.data = div;
	            }
	            this.type = Resource.TYPE.XML;
	          } catch (e) {
	            this.abort('Error trying to parse loaded xml: ' + e);
	            return;
	          }
	        } else {
	          this.data = xhr.response || text;
	        }
	      } else {
	        this.abort('[' + xhr.status + '] ' + xhr.statusText + ': ' + xhr.responseURL);
	        return;
	      }
	      this.complete();
	    }
	  }, {
	    key: '_determineXhrType',
	    value: function _determineXhrType() {
	      return Resource._xhrTypeMap[this.extension] || Resource.XHR_RESPONSE_TYPE.TEXT;
	    }
	  }, {
	    key: '_determineLoadType',
	    value: function _determineLoadType() {
	      return Resource._loadTypeMap[this.extension] || Resource.LOAD_TYPE.XHR;
	    }
	  }, {
	    key: '_getExtension',
	    value: function _getExtension() {
	      var url$$1 = this.url;
	      var ext = '';
	      if (this.isDataUrl) {
	        var slashIndex = url$$1.indexOf('/');
	        ext = url$$1.substring(slashIndex + 1, url$$1.indexOf(';', slashIndex)).toLowerCase();
	      } else {
	        ext = getUrlFileExtension(url$$1);
	      }
	      return ext;
	    }
	  }, {
	    key: '_getMimeFromXhrType',
	    value: function _getMimeFromXhrType(type) {
	      switch (type) {
	        case Resource.XHR_RESPONSE_TYPE.BUFFER:
	          return 'application/octet-binary';
	        case Resource.XHR_RESPONSE_TYPE.BLOB:
	          return 'application/blob';
	        case Resource.XHR_RESPONSE_TYPE.DOCUMENT:
	          return 'application/xml';
	        case Resource.XHR_RESPONSE_TYPE.JSON:
	          return 'application/json';
	        case Resource.XHR_RESPONSE_TYPE.DEFAULT:
	        case Resource.XHR_RESPONSE_TYPE.TEXT:
	        default:
	          return 'text/plain';
	      }
	    }
	  }, {
	    key: 'isDataUrl',
	    get: function get$$1() {
	      return this._hasFlag(Resource.STATUS_FLAGS.DATA_URL);
	    }
	  }, {
	    key: 'isComplete',
	    get: function get$$1() {
	      return this._hasFlag(Resource.STATUS_FLAGS.COMPLETE);
	    }
	  }, {
	    key: 'isLoading',
	    get: function get$$1() {
	      return this._hasFlag(Resource.STATUS_FLAGS.LOADING);
	    }
	  }]);
	  return Resource;
	}();
	Resource.STATUS_FLAGS = {
	  NONE: 0,
	  DATA_URL: 1 << 0,
	  COMPLETE: 1 << 1,
	  LOADING: 1 << 2
	};
	Resource.TYPE = {
	  UNKNOWN: 0,
	  JSON: 1,
	  XML: 2,
	  IMAGE: 3,
	  AUDIO: 4,
	  VIDEO: 5,
	  TEXT: 6
	};
	Resource.LOAD_TYPE = {
	  XHR: 1,
	  IMAGE: 2,
	  AUDIO: 3,
	  VIDEO: 4
	};
	Resource.XHR_RESPONSE_TYPE = {
	  DEFAULT: 'text',
	  BUFFER: 'arraybuffer',
	  BLOB: 'blob',
	  DOCUMENT: 'document',
	  JSON: 'json',
	  TEXT: 'text'
	};
	Resource._loadTypeMap = {
	  gif: Resource.LOAD_TYPE.IMAGE,
	  png: Resource.LOAD_TYPE.IMAGE,
	  bmp: Resource.LOAD_TYPE.IMAGE,
	  jpg: Resource.LOAD_TYPE.IMAGE,
	  jpeg: Resource.LOAD_TYPE.IMAGE,
	  tif: Resource.LOAD_TYPE.IMAGE,
	  tiff: Resource.LOAD_TYPE.IMAGE,
	  webp: Resource.LOAD_TYPE.IMAGE,
	  tga: Resource.LOAD_TYPE.IMAGE,
	  svg: Resource.LOAD_TYPE.IMAGE,
	  'svg+xml': Resource.LOAD_TYPE.IMAGE,
	  mp3: Resource.LOAD_TYPE.AUDIO,
	  ogg: Resource.LOAD_TYPE.AUDIO,
	  wav: Resource.LOAD_TYPE.AUDIO,
	  mp4: Resource.LOAD_TYPE.VIDEO,
	  webm: Resource.LOAD_TYPE.VIDEO
	};
	Resource._xhrTypeMap = {
	  xhtml: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
	  html: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
	  htm: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
	  xml: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
	  tmx: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
	  svg: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
	  tsx: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
	  gif: Resource.XHR_RESPONSE_TYPE.BLOB,
	  png: Resource.XHR_RESPONSE_TYPE.BLOB,
	  bmp: Resource.XHR_RESPONSE_TYPE.BLOB,
	  jpg: Resource.XHR_RESPONSE_TYPE.BLOB,
	  jpeg: Resource.XHR_RESPONSE_TYPE.BLOB,
	  tif: Resource.XHR_RESPONSE_TYPE.BLOB,
	  tiff: Resource.XHR_RESPONSE_TYPE.BLOB,
	  webp: Resource.XHR_RESPONSE_TYPE.BLOB,
	  tga: Resource.XHR_RESPONSE_TYPE.BLOB,
	  json: Resource.XHR_RESPONSE_TYPE.JSON,
	  text: Resource.XHR_RESPONSE_TYPE.TEXT,
	  txt: Resource.XHR_RESPONSE_TYPE.TEXT,
	  ttf: Resource.XHR_RESPONSE_TYPE.BUFFER,
	  otf: Resource.XHR_RESPONSE_TYPE.BUFFER
	};
	Resource.EMPTY_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
	function setExtMap(map, extname, val) {
	  if (extname && extname.indexOf('.') === 0) {
	    extname = extname.substring(1);
	  }
	  if (!extname) {
	    return;
	  }
	  map[extname] = val;
	}

	var MAX_PROGRESS = 100;
	var rgxExtractUrlHash = /(#[\w-]+)?$/;
	var parse = _parseUri_1_0_0_parseUri;
	var Loader = function () {
	  function Loader() {
	    var _this = this;
	    var baseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var concurrency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
	    classCallCheck(this, Loader);
	    this.baseUrl = baseUrl;
	    this.progress = 0;
	    this.loading = false;
	    this.defaultQueryString = '';
	    this._beforeMiddleware = [];
	    this._afterMiddleware = [];
	    this._resourcesParsing = [];
	    this._boundLoadResource = function (r, d) {
	      return _this._loadResource(r, d);
	    };
	    this._queue = queue(this._boundLoadResource, concurrency);
	    this._queue.pause();
	    this.resources = {};
	    this.onProgress = new Signal();
	    this.onError = new Signal();
	    this.onLoad = new Signal();
	    this.onStart = new Signal();
	    this.onComplete = new Signal();
	    for (var i = 0; i < Loader._defaultBeforeMiddleware.length; ++i) {
	      this.pre(Loader._defaultBeforeMiddleware[i]);
	    }
	    for (var _i = 0; _i < Loader._defaultAfterMiddleware.length; ++_i) {
	      this.use(Loader._defaultAfterMiddleware[_i]);
	    }
	  }
	  createClass(Loader, [{
	    key: 'add',
	    value: function add(name, url$$1, options, cb) {
	      if (Array.isArray(name)) {
	        for (var i = 0; i < name.length; ++i) {
	          this.add(name[i]);
	        }
	        return this;
	      }
	      if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	        cb = url$$1 || name.callback || name.onComplete;
	        options = name;
	        url$$1 = name.url;
	        name = name.name || name.key || name.url;
	      }
	      if (typeof url$$1 !== 'string') {
	        cb = options;
	        options = url$$1;
	        url$$1 = name;
	      }
	      if (typeof url$$1 !== 'string') {
	        throw new Error('No url passed to add resource to loader.');
	      }
	      if (typeof options === 'function') {
	        cb = options;
	        options = null;
	      }
	      if (this.loading && (!options || !options.parentResource)) {
	        throw new Error('Cannot add resources while the loader is running.');
	      }
	      if (this.resources[name]) {
	        throw new Error('Resource named "' + name + '" already exists.');
	      }
	      url$$1 = this._prepareUrl(url$$1);
	      this.resources[name] = new Resource(name, url$$1, options);
	      if (typeof cb === 'function') {
	        this.resources[name].onAfterMiddleware.once(cb);
	      }
	      if (this.loading) {
	        var parent = options.parentResource;
	        var incompleteChildren = [];
	        for (var _i2 = 0; _i2 < parent.children.length; ++_i2) {
	          if (!parent.children[_i2].isComplete) {
	            incompleteChildren.push(parent.children[_i2]);
	          }
	        }
	        var fullChunk = parent.progressChunk * (incompleteChildren.length + 1);
	        var eachChunk = fullChunk / (incompleteChildren.length + 2);
	        parent.children.push(this.resources[name]);
	        parent.progressChunk = eachChunk;
	        for (var _i3 = 0; _i3 < incompleteChildren.length; ++_i3) {
	          incompleteChildren[_i3].progressChunk = eachChunk;
	        }
	        this.resources[name].progressChunk = eachChunk;
	      }
	      this._queue.push(this.resources[name]);
	      return this;
	    }
	  }, {
	    key: 'pre',
	    value: function pre(fn) {
	      this._beforeMiddleware.push(fn);
	      return this;
	    }
	  }, {
	    key: 'use',
	    value: function use(fn) {
	      this._afterMiddleware.push(fn);
	      return this;
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.progress = 0;
	      this.loading = false;
	      this._queue.kill();
	      this._queue.pause();
	      for (var k in this.resources) {
	        var res = this.resources[k];
	        if (res._onLoadBinding) {
	          res._onLoadBinding.detach();
	        }
	        if (res.isLoading) {
	          res.abort();
	        }
	      }
	      this.resources = {};
	      return this;
	    }
	  }, {
	    key: 'load',
	    value: function load(cb) {
	      if (typeof cb === 'function') {
	        this.onComplete.once(cb);
	      }
	      if (this.loading) {
	        return this;
	      }
	      if (this._queue.idle()) {
	        this._onStart();
	        this._onComplete();
	      } else {
	        var numTasks = this._queue._tasks.length;
	        var chunk = MAX_PROGRESS / numTasks;
	        for (var i = 0; i < this._queue._tasks.length; ++i) {
	          this._queue._tasks[i].data.progressChunk = chunk;
	        }
	        this._onStart();
	        this._queue.resume();
	      }
	      return this;
	    }
	  }, {
	    key: '_prepareUrl',
	    value: function _prepareUrl(url$$1) {
	      var parsedUrl = parse(url$$1, { strictMode: true });
	      var result = void 0;
	      if (parsedUrl.protocol || !parsedUrl.path || url$$1.indexOf('//') === 0) {
	        result = url$$1;
	      } else if (this.baseUrl.length && this.baseUrl.lastIndexOf('/') !== this.baseUrl.length - 1 && url$$1.charAt(0) !== '/') {
	        result = this.baseUrl + '/' + url$$1;
	      } else {
	        result = this.baseUrl + url$$1;
	      }
	      if (this.defaultQueryString) {
	        var hash = rgxExtractUrlHash.exec(result)[0];
	        result = result.substr(0, result.length - hash.length);
	        if (result.indexOf('?') !== -1) {
	          result += '&' + this.defaultQueryString;
	        } else {
	          result += '?' + this.defaultQueryString;
	        }
	        result += hash;
	      }
	      return result;
	    }
	  }, {
	    key: '_loadResource',
	    value: function _loadResource(resource, dequeue) {
	      var _this2 = this;
	      resource._dequeue = dequeue;
	      eachSeries(this._beforeMiddleware, function (fn, next) {
	        fn.call(_this2, resource, function () {
	          next(resource.isComplete ? {} : null);
	        });
	      }, function () {
	        if (resource.isComplete) {
	          _this2._onLoad(resource);
	        } else {
	          resource._onLoadBinding = resource.onComplete.once(_this2._onLoad, _this2);
	          resource.load();
	        }
	      }, true);
	    }
	  }, {
	    key: '_onStart',
	    value: function _onStart() {
	      this.progress = 0;
	      this.loading = true;
	      this.onStart.dispatch(this);
	    }
	  }, {
	    key: '_onComplete',
	    value: function _onComplete() {
	      this.progress = MAX_PROGRESS;
	      this.loading = false;
	      this.onComplete.dispatch(this, this.resources);
	    }
	  }, {
	    key: '_onLoad',
	    value: function _onLoad(resource) {
	      var _this3 = this;
	      resource._onLoadBinding = null;
	      this._resourcesParsing.push(resource);
	      resource._dequeue();
	      eachSeries(this._afterMiddleware, function (fn, next) {
	        fn.call(_this3, resource, next);
	      }, function () {
	        resource.onAfterMiddleware.dispatch(resource);
	        _this3.progress = Math.min(MAX_PROGRESS, _this3.progress + resource.progressChunk);
	        _this3.onProgress.dispatch(_this3, resource);
	        if (resource.error) {
	          _this3.onError.dispatch(resource.error, _this3, resource);
	        } else {
	          _this3.onLoad.dispatch(_this3, resource);
	        }
	        _this3._resourcesParsing.splice(_this3._resourcesParsing.indexOf(resource), 1);
	        if (_this3._queue.idle() && _this3._resourcesParsing.length === 0) {
	          _this3._onComplete();
	        }
	      }, true);
	    }
	  }, {
	    key: 'concurrency',
	    get: function get$$1() {
	      return this._queue.concurrency;
	    },
	    set: function set$$1(concurrency) {
	      this._queue.concurrency = concurrency;
	    }
	  }]);
	  return Loader;
	}();
	Loader._defaultBeforeMiddleware = [];
	Loader._defaultAfterMiddleware = [];
	Loader.pre = function LoaderPreStatic(fn) {
	  Loader._defaultBeforeMiddleware.push(fn);
	  return Loader;
	};
	Loader.use = function LoaderUseStatic(fn) {
	  Loader._defaultAfterMiddleware.push(fn);
	  return Loader;
	};

	Loader.Resource = Resource;
	Loader.async = async;

	function textureParser () {
	  return function textureParser(resource, next) {
	    if (resource.data && resource.type === Resource.TYPE.IMAGE) {
	      resource.texture = Texture.fromLoader(resource.data, resource.url, resource.name);
	    }
	    next();
	  };
	}

	function spritesheetParser () {
	  return function spritesheetParser(resource, next) {
	    var imageResourceName = resource.name + '_image';
	    if (!resource.data || resource.type !== Resource.TYPE.JSON || !resource.data.frames || this.resources[imageResourceName]) {
	      next();
	      return;
	    }
	    var loadOptions = {
	      crossOrigin: resource.crossOrigin,
	      metadata: resource.metadata.imageMetadata,
	      parentResource: resource
	    };
	    var resourcePath = getResourcePath(resource, this.baseUrl);
	    this.add(imageResourceName, resourcePath, loadOptions, function onImageLoad(res) {
	      if (res.error) {
	        console.warn(res.error);
	        if (isFunction(resource.metadata.fallback)) {
	          resource.metadata.fallback(res);
	        }
	        next(res.error);
	        return;
	      }
	      var spritesheet = new Spritesheet(res.texture.baseTexture, resource.data, resource.url);
	      spritesheet.parse(function () {
	        resource.spritesheet = spritesheet;
	        resource.textures = spritesheet.textures;
	        next();
	      });
	    });
	  };
	}
	function getResourcePath(resource, baseUrl) {
	  if (resource.isDataUrl) {
	    return resource.data.meta.image;
	  }
	  var image = resource.data.meta.image;
	  if (resource.metadata.image) {
	    image = resource.metadata.image;
	  }
	  return resolve(resource.url.replace(baseUrl, ''), image);
	}

	function JSONObjectParser () {
	  return function JSONObjectParser(resource, next) {
	    if (resource.xhrType === Resource.XHR_RESPONSE_TYPE.JSONOBJECT) {
	      var metadata = _extends({}, resource.metadata);
	      resource.type = Resource.TYPE.JSON;
	      resource.data = resource.metadata.JSONObject;
	      delete metadata.JSONObject;
	      resource.metadata.imageMetadata = metadata;
	      resource.complete();
	    }
	    next();
	  };
	}

	var Loader$1 = function (_ResourceLoader) {
	  inherits(Loader$$1, _ResourceLoader);
	  function Loader$$1(baseUrl, concurrency) {
	    classCallCheck(this, Loader$$1);
	    var _this = possibleConstructorReturn(this, (Loader$$1.__proto__ || Object.getPrototypeOf(Loader$$1)).call(this, baseUrl, concurrency));
	    _eventemitter3_3_1_2_eventemitter3.call(_this);
	    for (var i = 0; i < Loader$$1._tinyPreMiddleware.length; ++i) {
	      _this.pre(Loader$$1._tinyPreMiddleware[i]());
	    }
	    for (var _i = 0; _i < Loader$$1._tinyMiddleware.length; ++_i) {
	      _this.use(Loader$$1._tinyMiddleware[_i]());
	    }
	    _this.onStart.add(function (l) {
	      return _this.emit('start', l);
	    });
	    _this.onProgress.add(function (l, r) {
	      return _this.emit('progress', l, r);
	    });
	    _this.onError.add(function (e, l, r) {
	      return _this.emit('error', e, l, r);
	    });
	    _this.onLoad.add(function (l, r) {
	      return _this.emit('load', l, r);
	    });
	    _this.onComplete.add(function (l, r) {
	      return _this.emit('complete', l, r);
	    });
	    return _this;
	  }
	  createClass(Loader$$1, [{
	    key: 'add',
	    value: function add(name, url$$1, options, cb) {
	      if (isObject(name)) {
	        if (DATA_URI.test(name.url)) {
	          name['crossOrigin'] = false;
	        }
	      } else if (isString(name)) {
	        if (DATA_URI.test(name) || DATA_URI.test(url$$1)) {
	          isObject(url$$1) && (url$$1['crossOrigin'] = false);
	          isObject(options) && (options['crossOrigin'] = false);
	        }
	      }
	      get(Loader$$1.prototype.__proto__ || Object.getPrototypeOf(Loader$$1.prototype), 'add', this).call(this, name, url$$1, options, cb);
	      return this;
	    }
	  }, {
	    key: 'run',
	    value: function run(opts) {
	      if (!opts) {
	        opts = {};
	      }
	      var res = opts.resources;
	      if (Array.isArray(res)) {
	        this.add(res);
	      } else {
	        throw new Error('The param [resources] must be array');
	      }
	      var onError = function onError(error, resourceLoader, resource) {
	        var errorMsg = error + ', url: ' + resource.url;
	        (opts.onError || function () {
	          throw errorMsg;
	        })(errorMsg, resourceLoader, resource);
	      };
	      var onProgress = function onProgress(resourceLoader, resource) {
	        (opts.onProgress || function () {})(Number(resourceLoader.progress.toFixed(2)), resource);
	      };
	      var onComplete = function onComplete(resourceLoader, resource) {
	        (opts.onComplete || function () {})(resourceLoader, resource);
	      };
	      var onAllComplete = function onAllComplete(resourceLoader, object) {
	        (opts.onAllComplete || function () {})(resourceLoader, object);
	      };
	      this.on('load', onComplete);
	      this.on('error', onError);
	      this.on('complete', onAllComplete);
	      this.on('progress', onProgress);
	      this.load();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.removeAllListeners();
	      this.reset();
	    }
	  }], [{
	    key: 'addTinyMiddleware',
	    value: function addTinyMiddleware(fn) {
	      Loader$$1._tinyMiddleware.push(fn);
	    }
	  }, {
	    key: 'addTinyPreMiddleware',
	    value: function addTinyPreMiddleware(fn) {
	      Loader$$1._tinyPreMiddleware.push(fn);
	    }
	  }]);
	  return Loader$$1;
	}(Loader);
	for (var i in _eventemitter3_3_1_2_eventemitter3.prototype) {
	  Loader$1.prototype[i] = _eventemitter3_3_1_2_eventemitter3.prototype[i];
	}
	Loader$1._tinyMiddleware = [textureParser, spritesheetParser];
	Loader$1._tinyPreMiddleware = [JSONObjectParser];
	var Resource$1 = Loader.Resource;
	Resource$1.setExtensionXhrType('fnt', Resource$1.XHR_RESPONSE_TYPE.DOCUMENT);
	Resource$1.XHR_RESPONSE_TYPE.JSONOBJECT = 'JSONObject';

	var BinaryLoader = function () {
	  function BinaryLoader(url$$1) {
	    classCallCheck(this, BinaryLoader);
	    this._url = url$$1;
	  }
	  createClass(BinaryLoader, [{
	    key: 'load',
	    value: function load(opts) {
	      if (!opts) {
	        opts = {};
	      }
	      var self = this;
	      var xhr = getXMLHttpRequest();
	      var onComplete = function onComplete(resourceLoader, resource) {
	        (opts.onComplete || function () {})(resourceLoader, resource);
	      };
	      var onError = function onError(error, resourceLoader, resource) {
	        var errorMsg = error + ', url: ' + resource.url;
	        (opts.onError || function () {
	          throw errorMsg;
	        })(errorMsg, resourceLoader, resource);
	      };
	      xhr.open('GET', self._url, true);
	      if (xhr.overrideMimeType) {
	        xhr.overrideMimeType('ext/plain; charset=x-user-defined');
	      }
	      xhr.onload = function () {
	        if (+xhr.readyState === 4 && +xhr.status === 200) {
	          onComplete(self._str2Uint8Array(xhr.responseText));
	        } else {
	          onError();
	        }
	      };
	      xhr.send(null);
	    }
	  }, {
	    key: '_str2Uint8Array',
	    value: function _str2Uint8Array(strData) {
	      if (!strData) {
	        return null;
	      }
	      var arrData = new Uint8Array(strData.length);
	      for (var i = 0; i < strData.length; i++) {
	        arrData[i] = strData.charCodeAt(i) & 0xff;
	      }
	      return arrData;
	    }
	  }]);
	  return BinaryLoader;
	}();



	var loaders = /*#__PURE__*/Object.freeze({
		Loader: Loader$1,
		BinaryLoader: BinaryLoader,
		spritesheetParser: spritesheetParser,
		getResourcePath: getResourcePath,
		textureParser: textureParser,
		Resource: Resource
	});

	function getExtension(gl, name) {
	  var vendorPrefixes = ['', 'WEBKIT_'];
	  var ext = null;
	  for (var i in vendorPrefixes) {
	    ext = gl.getExtension(vendorPrefixes[i] + name);
	    if (ext) {
	      break;
	    }
	  }
	  return ext;
	}
	var CompressedTextureManager = function (_WebGLManager) {
	  inherits(CompressedTextureManager, _WebGLManager);
	  function CompressedTextureManager(renderer) {
	    classCallCheck(this, CompressedTextureManager);
	    var _this = possibleConstructorReturn(this, (CompressedTextureManager.__proto__ || Object.getPrototypeOf(CompressedTextureManager)).call(this, renderer));
	    _this.extensions = {};
	    return _this;
	  }
	  createClass(CompressedTextureManager, [{
	    key: 'onContextChange',
	    value: function onContextChange() {
	      var gl = this.renderer.gl;
	      this.extensions = {
	        pvrtc: getExtension(gl, 'WEBGL_compressed_texture_pvrtc'),
	        astc: getExtension(gl, 'WEBGL_compressed_texture_astc')
	      };
	    }
	  }, {
	    key: 'getSupportedExtensions',
	    value: function getSupportedExtensions() {
	      return this.extensions;
	    }
	  }]);
	  return CompressedTextureManager;
	}(WebGLManager);

	var COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;
	var COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2;
	var COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3;
	var COMPRESSED_RGB_ATC_WEBGL = 0x8C92;
	var COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 0x8C93;
	var COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 0x87EE;
	var COMPRESSED_RGBA_ASTC_4x4_KHR = 0x93B0;
	var COMPRESSED_RGBA_ASTC_5x4_KHR = 0x93B1;
	var COMPRESSED_RGBA_ASTC_5x5_KHR = 0x93B2;
	var COMPRESSED_RGBA_ASTC_6x5_KHR = 0x93B3;
	var COMPRESSED_RGBA_ASTC_6x6_KHR = 0x93B4;
	var COMPRESSED_RGBA_ASTC_8x5_KHR = 0x93B5;
	var COMPRESSED_RGBA_ASTC_8x6_KHR = 0x93B6;
	var COMPRESSED_RGBA_ASTC_8x8_KHR = 0x93B7;
	var COMPRESSED_RGBA_ASTC_10x5_KHR = 0x93B8;
	var COMPRESSED_RGBA_ASTC_10x6_KHR = 0x93B9;
	var COMPRESSED_RGBA_ASTC_10x8_KHR = 0x93BA;
	var COMPRESSED_RGBA_ASTC_10x10_KHR = 0x93BB;
	var COMPRESSED_RGBA_ASTC_12x10_KHR = 0x93BC;
	var COMPRESSED_RGBA_ASTC_12x12_KHR = 0x93BD;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR = 0x93D0;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR = 0x93D1;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR = 0x93D2;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR = 0x93D3;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR = 0x93D4;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR = 0x93D5;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR = 0x93D6;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR = 0x93D7;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR = 0x93D8;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR = 0x93D9;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR = 0x93DA;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR = 0x93DB;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR = 0x93DC;
	var COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR = 0x93DD;
	var KTX_HEADER_LENGTH = 12 + 13 * 4;
	var COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 0x8C00;
	var COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 0x8C01;
	var COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 0x8C02;
	var COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 0x8C03;
	var COMPRESSED_RGB_ETC1_WEBGL = 0x8D64;
	var CompressedImage = function () {
	  function CompressedImage(src, data, type, width, height, levels, internalFormat) {
	    classCallCheck(this, CompressedImage);
	    this.init.apply(this, arguments);
	  }
	  createClass(CompressedImage, [{
	    key: 'init',
	    value: function init(src, data, type, width, height, levels, internalFormat) {
	      this.src = src;
	      this.width = width;
	      this.height = height;
	      this.data = data;
	      this.type = type;
	      this.levels = levels;
	      this.internalFormat = internalFormat;
	      this.isCompressedImage = true;
	      this.preserveSource = true;
	      var oldComplete = this.complete;
	      this.complete = !!data;
	      if (!oldComplete && this.complete && this.onload) {
	        this.onload({ target: this });
	      }
	      return this;
	    }
	  }, {
	    key: 'loadFromArrayBuffer',
	    value: function loadFromArrayBuffer(arrayBuffer) {
	      var identifier = new Uint8Array(arrayBuffer, 0, 12);
	      if (isKhronosTexture(identifier)) {
	        return this._loadKTX(arrayBuffer);
	      } else {
	        throw new Error('Compressed texture format is not recognized: ' + this.src);
	      }
	    }
	  }, {
	    key: 'generateWebGLTexture',
	    value: function generateWebGLTexture(gl) {
	      if (this.data === null) {
	        throw new Error('Trying to create a second (or more) webgl texture from the same CompressedImage : ' + this.src);
	      }
	      var levels = this.levels;
	      var width = this.width;
	      var height = this.height;
	      var offset = 0;
	      for (var i = 0; i < this.levels; ++i) {
	        var levelSize = textureLevelSize(this.internalFormat, width, height);
	        var dxtLevel = new Uint8Array(this.data.buffer, this.data.byteOffset + offset, levelSize);
	        gl.compressedTexImage2D(gl.TEXTURE_2D, i, this.internalFormat, width, height, 0, dxtLevel);
	        width = width >> 1;
	        if (width < 1) width = 1;
	        height = height >> 1;
	        if (height < 1) height = 1;
	        offset += levelSize;
	      }
	      if (levels > 1) {
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	      } else {
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	      }
	      if (!this.preserveSource) this.data = null;
	    }
	  }, {
	    key: '_loadKTX',
	    value: function _loadKTX(arrayBuffer) {
	      var dataSize = Uint32Array.BYTES_PER_ELEMENT;
	      var headerDataView = new DataView(arrayBuffer, 12, 13 * dataSize);
	      var endianness = headerDataView.getUint32(0, true);
	      var littleEndian = endianness === 0x04030201;
	      var internalFormat = headerDataView.getUint32(4 * dataSize, littleEndian);
	      var width = headerDataView.getUint32(6 * dataSize, littleEndian);
	      var height = headerDataView.getUint32(7 * dataSize, littleEndian);
	      var levels = headerDataView.getUint32(11 * dataSize, littleEndian);
	      var dataOffset = KTX_HEADER_LENGTH + headerDataView.getUint32(12 * dataSize, littleEndian);
	      var imageSize = new Int32Array(arrayBuffer, dataOffset, 1)[0];
	      var dxtData = new Uint8Array(arrayBuffer, dataOffset + 4, imageSize);
	      return this.init(this.src, dxtData, 'KTX', width, height, levels, internalFormat);
	    }
	  }, {
	    key: 'dispose',
	    value: function dispose() {
	      this.data = null;
	    }
	  }], [{
	    key: 'loadFromArrayBuffer',
	    value: function loadFromArrayBuffer(arrayBuffer) {
	      return new CompressedImage().loadFromArrayBuffer(arrayBuffer);
	    }
	  }]);
	  return CompressedImage;
	}();
	function isKhronosTexture(identifier) {
	  return !(identifier[0] !== 0xab || identifier[1] !== 0x4b || identifier[2] !== 0x54 || identifier[3] !== 0x58 || identifier[4] !== 0x20 || identifier[5] !== 0x31 || identifier[6] !== 0x31 || identifier[7] !== 0xbb || identifier[8] !== 0x0d || identifier[9] !== 0x0a || identifier[10] !== 0x1a || identifier[11] !== 0x0a);
	}
	function textureLevelSize(format, width, height) {
	  switch (format) {
	    case COMPRESSED_RGB_S3TC_DXT1_EXT:
	    case COMPRESSED_RGB_ATC_WEBGL:
	    case COMPRESSED_RGB_ETC1_WEBGL:
	      return (width + 3 >> 2) * (height + 3 >> 2) * 8;
	    case COMPRESSED_RGBA_S3TC_DXT3_EXT:
	    case COMPRESSED_RGBA_S3TC_DXT5_EXT:
	    case COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL:
	    case COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL:
	      return (width + 3 >> 2) * (height + 3 >> 2) * 16;
	    case COMPRESSED_RGB_PVRTC_4BPPV1_IMG:
	    case COMPRESSED_RGBA_PVRTC_4BPPV1_IMG:
	      return Math.floor((Math.max(width, 8) * Math.max(height, 8) * 4 + 7) / 8);
	    case COMPRESSED_RGB_PVRTC_2BPPV1_IMG:
	    case COMPRESSED_RGBA_PVRTC_2BPPV1_IMG:
	      return Math.floor((Math.max(width, 16) * Math.max(height, 8) * 2 + 7) / 8);
	    case COMPRESSED_RGBA_ASTC_4x4_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:
	      return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 16;
	    case COMPRESSED_RGBA_ASTC_5x4_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:
	      return Math.floor((width + 4) / 5) * Math.floor((height + 3) / 4) * 16;
	    case COMPRESSED_RGBA_ASTC_5x5_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:
	      return Math.floor((width + 4) / 5) * Math.floor((height + 4) / 5) * 16;
	    case COMPRESSED_RGBA_ASTC_6x5_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:
	      return Math.floor((width + 5) / 6) * Math.floor((height + 4) / 5) * 16;
	    case COMPRESSED_RGBA_ASTC_6x6_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:
	      return Math.floor((width + 5) / 6) * Math.floor((height + 5) / 6) * 16;
	    case COMPRESSED_RGBA_ASTC_8x5_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:
	      return Math.floor((width + 7) / 8) * Math.floor((height + 4) / 5) * 16;
	    case COMPRESSED_RGBA_ASTC_8x6_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:
	      return Math.floor((width + 7) / 8) * Math.floor((height + 5) / 6) * 16;
	    case COMPRESSED_RGBA_ASTC_8x8_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:
	      return Math.floor((width + 7) / 8) * Math.floor((height + 7) / 8) * 16;
	    case COMPRESSED_RGBA_ASTC_10x5_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:
	      return Math.floor((width + 9) / 10) * Math.floor((height + 4) / 5) * 16;
	    case COMPRESSED_RGBA_ASTC_10x6_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:
	      return Math.floor((width + 9) / 10) * Math.floor((height + 5) / 6) * 16;
	    case COMPRESSED_RGBA_ASTC_10x8_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:
	      return Math.floor((width + 9) / 10) * Math.floor((height + 7) / 8) * 16;
	    case COMPRESSED_RGBA_ASTC_10x10_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:
	      return Math.floor((width + 9) / 10) * Math.floor((height + 9) / 10) * 16;
	    case COMPRESSED_RGBA_ASTC_12x10_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:
	      return Math.floor((width + 11) / 12) * Math.floor((height + 9) / 10) * 16;
	    case COMPRESSED_RGBA_ASTC_12x12_KHR:
	    case COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:
	      return Math.floor((width + 11) / 12) * Math.floor((height + 11) / 12) * 16;
	    default:
	      return 0;
	  }
	}

	Resource.setExtensionXhrType('ktx', Resource.XHR_RESPONSE_TYPE.BUFFER);
	function imageParser() {
	  return function (resource, next) {
	    if (/\.ktx$/i.test(resource.url)) {
	      var compressedImage = resource.compressedImage || new CompressedImage(resource.url);
	      if (resource.data) {
	        throw new Error('compressedImageParser middleware must be specified in loader.before() and must have zero resource.data');
	      }
	      resource.isCompressedImage = true;
	      resource.data = compressedImage;
	      resource.onComplete.add(function () {
	        resource.type = Resource.TYPE.IMAGE;
	        compressedImage.loadFromArrayBuffer(resource.data);
	        resource.data = compressedImage;
	      });
	    }
	    next();
	  };
	}

	var extensionChooser = {
	  extensions: [],
	  detect: function detect(renderer) {
	    if (renderer instanceof WebGLRenderer) {
	      var data = renderer.plugins.compressedTextureManager.getSupportedExtensions();
	      if (data.pvrtc) this.extensions.push('.pvr');
	      if (data.astc) this.extensions.push('.astc');
	    }
	  },
	  parse: function parse() {
	    var _imageParser = imageParser();
	    return function (resource, next) {
	      var supportedExtensions = extensionChooser.extensions;
	      var useCompressedTexture = resource.metadata.useCompressedTexture;
	      if (!useCompressedTexture || supportedExtensions.length === 0) {
	        return next();
	      }
	      var url = resource.url;
	      var k = 0;
	      var ext = '';
	      if (supportedExtensions.indexOf('.astc') !== -1) {
	        ext = '.astc';
	      }
	      if (isMobile.apple.device && supportedExtensions.indexOf('.pvr') !== -1) {
	        ext = '.pvr';
	      }
	      if (!resource._defaultUrlChoice) {
	        resource._defaultUrlChoice = url;
	        k = url.lastIndexOf('.');
	        if (k >= 0) {
	          resource._baseUrl = url.substring(0, k);
	        } else {
	          return next();
	        }
	      }
	      if (!/\.json$/i.test(resource.url)) {
	        if (!/\.ktx$/i.test(resource.url)) {
	          resource.url = resource._baseUrl + ext + '.ktx';
	        }
	        resource.extension = 'ktx';
	        resource.loadType = resource._determineLoadType();
	      } else {
	        resource.metadata.imageMetadata = {
	          useCompressedTexture: useCompressedTexture
	        };
	      }
	      return _imageParser(resource, next);
	    };
	  },
	  fixer: function fixer() {
	    return function (resource, next) {
	      if (resource.texture && resource._defaultUrlChoice && resource._defaultUrl !== resource.url) {
	        var texture = resource.texture;
	        var baseTexture = texture.baseTexture;
	        delete BaseTextureCache[baseTexture.imageUrl];
	        delete TextureCache[baseTexture.imageUrl];
	        baseTexture.imageUrl = resource._defaultUrlChoice;
	        BaseTextureCache[baseTexture.imageUrl] = baseTexture;
	        TextureCache[baseTexture.imageUrl] = texture;
	      }
	      next();
	    };
	  }
	};

	var GLTextureMixin = {
	  uploadNotCompressed: Texture$1.prototype.upload,
	  isCompressed: false,
	  upload: function upload(source) {
	    if (!(source instanceof CompressedImage)) {
	      return this.uploadNotCompressed(source);
	    }
	    this.bind();
	    var gl = this.gl;
	    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
	    this.isCompressed = true;
	    source.generateWebGLTexture(gl);
	  },
	  enableMipmap: function enableMipmap() {
	    if (this.isCompressed) {
	      return;
	    }
	    var gl = this.gl;
	    this.bind();
	    this.mipmap = true;
	    gl.generateMipmap(gl.TEXTURE_2D);
	  }
	};

	Object.assign(glCore.GLTexture.prototype, GLTextureMixin);
	WebGLRenderer.registerPlugin('compressedTextureManager', CompressedTextureManager);
	Loader$1.addTinyMiddleware(extensionChooser.fixer);
	Loader$1.addTinyPreMiddleware(extensionChooser.parse);
	var compressedTexture = {
	  init: function init(renderer) {
	    extensionChooser.detect(renderer);
	  },
	  supportedExtensions: function supportedExtensions() {
	    return extensionChooser.extensions;
	  }
	};



	var index$2 = /*#__PURE__*/Object.freeze({
		compressedTexture: compressedTexture
	});

	performMixins();
	var Loader$2 = loaders && Loader$1 ? new Loader$1() : null;

	exports.Transition = Transition;
	exports.interaction = index$1;
	exports.loaders = loaders;
	exports.ResourceLoader = Loader;
	exports.plugins = index$2;
	exports.Loader = Loader$2;
	exports.PI_2 = PI_2;
	exports.RAD_TO_DEG = RAD_TO_DEG;
	exports.DEG_TO_RAD = DEG_TO_RAD;
	exports.URL_FILE_EXTENSION = URL_FILE_EXTENSION;
	exports.DATA_URI = DATA_URI;
	exports.SVG_SIZE = SVG_SIZE;
	exports.RETINA_PREFIX = RETINA_PREFIX;
	exports.isArray = isArray;
	exports.isFunction = isFunction;
	exports.isNumber = isNumber;
	exports.isString = isString;
	exports.isUndefined = isUndefined;
	exports.isObject = isObject;
	exports.getTime = getTime;
	exports.sign = sign;
	exports.random = random;
	exports.randomInt = randomInt;
	exports.randomFloat = randomFloat;
	exports.randomBool = randomBool;
	exports.randomPM = randomPM;
	exports.randomFromArray = randomFromArray;
	exports.hex2rgb = hex2rgb;
	exports.hex2string = hex2string;
	exports.rgb2hex = rgb2hex;
	exports.color2hex = color2hex;
	exports.hex2color = hex2color;
	exports.deg2radian = deg2radian;
	exports.radian2deg = radian2deg;
	exports.randomColor = randomColor;
	exports.getXMLHttpRequest = getXMLHttpRequest;
	exports.detect = detect;
	exports.arrayRemoveObject = arrayRemoveObject;
	exports.removeItems = removeItems;
	exports.getSvgSize = getSvgSize;
	exports.getUrlFileExtension = getUrlFileExtension;
	exports.decomposeDataUri = decomposeDataUri;
	exports.getResolutionOfUrl = getResolutionOfUrl;
	exports.point = point;
	exports.scale = scale;
	exports.color = color;
	exports.TWEEN = TWEEN;
	exports.isMobile = isMobile;
	exports.EventEmitter = _eventemitter3_3_1_2_eventemitter3;
	exports.mixins = mixin$1;
	exports.base64 = b64;
	exports.url = url;
	exports.determineCrossOrigin = determineCrossOrigin;
	exports.settings = settings;
	exports.ticker = index;
	exports.CanvasRenderer = CanvasRenderer;
	exports.WebGLRenderer = WebGLRenderer;
	exports.config = config;
	exports.defaultConfig = defaultConfig;
	exports.glCore = glCore;
	exports.Bounds = Bounds;
	exports.DisplayObject = DisplayObject;
	exports.Container = Container;
	exports.Transform = Transform;
	exports.TransformStatic = TransformStatic;
	exports.TransformBase = TransformBase;
	exports.Sprite = Sprite;
	exports.AnimatedSprite = AnimatedSprite;
	exports.CanvasSpriteRenderer = CanvasSpriteRenderer;
	exports.CanvasTinter = CanvasTinter;
	exports.SpriteRenderer = SpriteRenderer;
	exports.Text = Text;
	exports.TextStyle = TextStyle;
	exports.TextMetrics = TextMetrics;
	exports.Graphics = Graphics;
	exports.GraphicsData = GraphicsData;
	exports.GraphicsRenderer = GraphicsRenderer;
	exports.CanvasGraphicsRenderer = CanvasGraphicsRenderer;
	exports.Spritesheet = Spritesheet;
	exports.Texture = Texture;
	exports.BaseTexture = BaseTexture;
	exports.RenderTexture = RenderTexture;
	exports.BaseRenderTexture = BaseRenderTexture;
	exports.VideoBaseTexture = VideoBaseTexture;
	exports.TextureUvs = TextureUvs;
	exports.TextureTransform = TextureTransform;
	exports.CanvasRenderTarget = CanvasRenderTarget;
	exports.Shader = Shader$1;
	exports.WebGLManager = WebGLManager;
	exports.ObjectRenderer = ObjectRenderer;
	exports.RenderTarget = RenderTarget;
	exports.Quad = Quad;
	exports.SpriteMaskFilter = SpriteMaskFilter;
	exports.Filter = Filter;
	exports.Application = Application;
	exports.VERSION = VERSION;
	exports.RENDERER_TYPE = RENDERER_TYPE;
	exports.BLEND_MODES = BLEND_MODES;
	exports.DRAW_MODES = DRAW_MODES;
	exports.SCALE_MODES = SCALE_MODES;
	exports.WRAP_MODES = WRAP_MODES;
	exports.GC_MODES = GC_MODES;
	exports.SHAPES = SHAPES;
	exports.PRECISION = PRECISION;
	exports.TRANSFORM_MODE = TRANSFORM_MODE;
	exports.TEXT_GRADIENT = TEXT_GRADIENT;
	exports.UPDATE_PRIORITY = UPDATE_PRIORITY;
	exports.WIN_SIZE = WIN_SIZE;
	exports.Point = Point;
	exports.ObservablePoint = ObservablePoint;
	exports.Matrix = Matrix;
	exports.GroupD8 = GroupD8;
	exports.Circle = Circle;
	exports.Ellipse = Ellipse;
	exports.Polygon = Polygon;
	exports.Rectangle = Rectangle;
	exports.RoundedRectangle = RoundedRectangle;
	exports.pluginTarget = pluginTarget$1;
	exports.earcut = earcut_1;
	exports.uid = uid;
	exports.isWebGLSupported = isWebGLSupported;
	exports.TextureCache = TextureCache;
	exports.BaseTextureCache = BaseTextureCache;
	exports.CountDownCache = CountDownCache;
	exports.destroyTextureCache = destroyTextureCache;
	exports.clearTextureCache = clearTextureCache;
	exports.premultiplyBlendMode = premultiplyBlendMode;
	exports.correctBlendMode = correctBlendMode;
	exports.premultiplyTint = premultiplyTint;
	exports.premultiplyRgba = premultiplyRgba;
	exports.premultiplyTintToRgba = premultiplyTintToRgba;
	exports.__frameDot = __frameDot;
	exports.equalsFramCount = equalsFramCount;
	exports.rectContainsRect = rectContainsRect;
	exports.rectGetMaxX = rectGetMaxX;
	exports.rectGetMidX = rectGetMidX;
	exports.rectGetMinX = rectGetMinX;
	exports.rectGetMaxY = rectGetMaxY;
	exports.rectGetMidY = rectGetMidY;
	exports.rectGetMinY = rectGetMinY;
	exports.rectContainsPoint = rectContainsPoint;
	exports.rectIntersectsRect = rectIntersectsRect;
	exports.rectUnion = rectUnion;
	exports.isPixelCollision = isPixelCollision;
	exports.Action = Action;
	exports.MoveBy = MoveBy;
	exports.MoveTo = MoveTo;
	exports.ScaleBy = ScaleBy;
	exports.ScaleTo = ScaleTo;
	exports.RotateBy = RotateBy;
	exports.RotateTo = RotateTo;
	exports.JumpTo = JumpTo;
	exports.Blink = Blink;
	exports.FadeTo = FadeTo;
	exports.FadeIn = FadeIn;
	exports.FadeOut = FadeOut;
	exports.TintBy = TintBy;
	exports.TintTo = TintTo;
	exports.RepeatForever = RepeatForever;
	exports.Repeat = Repeat;
	exports.Back = Back;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
