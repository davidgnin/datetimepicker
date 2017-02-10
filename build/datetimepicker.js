(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = require('./utils');

var configDateModify = function configDateModify(config) {
  var beforeClicked = function beforeClicked() {
    if (config.date.month === 0) {
      config.date.month = 11;
      config.date.year -= 1;
    } else {
      config.date.month -= 1;
    }
    config.date.weekDay1 = (0, _utils.getWeekDay1)(config.date.year, config.date.month);
    config.updateDate(config);
  };
  var afterClicked = function afterClicked() {
    if (config.date.month === 11) {
      config.date.month = 0;
      config.date.year += 1;
    } else {
      config.date.month += 1;
    }
    config.date.weekDay1 = (0, _utils.getWeekDay1)(config.date.year, config.date.month);
    config.updateDate(config);
  };
  var daysClicked = function daysClicked(e) {
    if (e.target.className === _utils.PREFIX + '-day') {
      var previousActive = config.gui.days.querySelectorAll('.' + _utils.PREFIX + '-day.' + _utils.PREFIX + '-active');
      if ((typeof previousActive === 'undefined' ? 'undefined' : _typeof(previousActive)) === 'object' && typeof previousActive.length === 'number') {
        for (var i = 0, length = previousActive.length; i < length; i++) {
          previousActive[i].classList.remove(_utils.PREFIX + '-active');
        }
      }
      e.target.classList.add(_utils.PREFIX + '-active');
      config.date.day = parseInt(e.target.innerText, 10);
    }
  };
  var timeChanged = function timeChanged(e) {
    if (e.target === config.gui.hour) {
      config.date.hour = parseInt(e.target.value, 10);
      e.target.value = (0, _utils.ensureDigits)(config.date.hour, 2);
    } else if (e.target === config.gui.min) {
      config.date.min = parseInt(e.target.value, 10);
      e.target.value = (0, _utils.ensureDigits)(config.date.min, 2);
    } else if (e.target === config.gui.sec) {
      config.date.sec = parseInt(e.target.value, 10);
      e.target.value = (0, _utils.ensureDigits)(config.date.sec, 2);
    } else if (e.target === config.gui.ms) {
      config.date.ms = parseInt(e.target.value, 10);
      e.target.value = (0, _utils.ensureDigits)(config.date.ms, 3);
    }
  };

  config.gui.before.addEventListener('click', beforeClicked);
  config.gui.after.addEventListener('click', afterClicked);
  config.gui.days.addEventListener('click', daysClicked);
  config.gui.time.addEventListener('change', timeChanged);

  var oldRemoveInstance = config.removeInstance;
  config.removeInstance = function removeDateModify() {
    config.gui.before.removeEventListener('click', beforeClicked);
    config.gui.after.removeEventListener('click', afterClicked);
    config.gui.days.removeEventListener('click', daysClicked);
    config.gui.time.removeEventListener('change', timeChanged);
    oldRemoveInstance();
  };
};

exports.default = configDateModify;

},{"./utils":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var configPickerOpening = function configPickerOpening(config) {
  var closePicker = void 0;
  var listenClicks = function documentClicked(e) {
    var target = e.target;
    var picker = config.gui.picker;
    var input = config.input;
    var limit = 0;
    while (target !== picker && target !== input && target !== document && target.parentNode && limit < 20) {
      target = target.parentNode;
      limit++;
    }
    if (target === document || !target.parentNode || limit === 20) {
      closePicker();
    }
  };
  var openPicker = function openPicker() {
    config.date = config.inputToDate(config);
    config.updateDate(config);
    config.container.classList.add(_utils.PREFIX + '-open');
    document.addEventListener('click', listenClicks);
  };
  closePicker = function closePicker(writing, now) {
    document.removeEventListener('click', listenClicks);
    config.container.classList.remove(_utils.PREFIX + '-open');
    if (writing) {
      config.dateToInput(config, now);
    }
  };
  var focused = function focused() {
    if (!config.container.classList.contains(_utils.PREFIX + '-open')) {
      openPicker();
    }
  };
  var onOK = function onOK() {
    closePicker('writing');
  };
  var onNow = function onNow() {
    closePicker('writing', 'now');
  };

  config.input.addEventListener('focus', focused);
  config.gui.ok.addEventListener('click', onOK);
  config.gui.now.addEventListener('click', onNow);

  var oldRemoveInstance = config.removeInstance;
  config.removeInstance = function removePickerOpening() {
    config.input.removeEventListener('focus', focused);
    config.gui.ok.removeEventListener('click', onOK);
    config.gui.now.removeEventListener('click', onNow);
    document.removeEventListener('click', listenClicks);
    oldRemoveInstance();
  };
};

exports.default = configPickerOpening;

},{"./utils":11}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var createGUI = function createGUI(config) {
  var picker = document.createElement('div');
  picker.className = _utils.PREFIX + '-picker';
  picker.innerHTML = (0, _utils.generateHTML)();
  picker.style.top = config.input.offsetHeight + 5 + 'px';
  config.container.appendChild(picker);

  var selector = '#' + _utils.PREFIX + '-' + config.id;
  var gui = {
    picker: picker
  };
  gui.month = document.querySelector(selector + ' .' + _utils.PREFIX + '-month');
  gui.before = document.querySelector(selector + ' .' + _utils.PREFIX + '-month-before');
  gui.after = document.querySelector(selector + ' .' + _utils.PREFIX + '-month-after');
  gui.days = document.querySelector(selector + ' .' + _utils.PREFIX + '-days');
  gui.time = document.querySelector(selector + ' .' + _utils.PREFIX + '-time-picker');
  gui.hour = document.querySelector(selector + ' .' + _utils.PREFIX + '-hour');
  gui.min = document.querySelector(selector + ' .' + _utils.PREFIX + '-minute');
  gui.sec = document.querySelector(selector + ' .' + _utils.PREFIX + '-second');
  gui.ms = document.querySelector(selector + ' .' + _utils.PREFIX + '-milisecond');
  gui.now = document.querySelector(selector + ' .' + _utils.PREFIX + '-now');
  gui.ok = document.querySelector(selector + ' .' + _utils.PREFIX + '-ok');

  //Validation
  for (var key in gui) {
    if (gui.hasOwnProperty(key)) {
      if (!(0, _utils.isDOMElement)(gui[key])) {
        throw 'GUI failed creating component: ' + key;
      }
    }
  }

  var oldRemoveInstance = config.removeInstance;
  config.removeInstance = function removeGUI() {
    config.container.removeChild(picker);
    oldRemoveInstance();
  };

  return gui;
};

exports.default = createGUI;

},{"./utils":11}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dateToInput = function dateToInput(config) {
  var now = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var date = void 0;
  if (now) {
    date = new Date();
  } else {
    var val = {
      year: config.withDate ? config.date.year : 1970,
      month: config.withDate ? config.date.month : 0,
      day: config.withDate ? config.date.day : 1,
      hour: config.withTime ? config.date.hour : 0,
      min: config.withTime ? config.date.min : 0,
      sec: config.withTime ? config.date.sec : 0,
      ms: config.withTime ? config.date.ms : 0
    };
    date = new Date(Date.UTC(val.year, val.month, val.day, val.hour, val.min, val.sec, val.ms));
  }

  var isoString = void 0;
  try {
    isoString = date.toISOString();
  } catch (err) {
    console.error('Invalid date/time. Nothing written', config.date);
    return;
  }

  var toWrite = void 0;

  if (config.outputFunc === 'toISOString') {
    toWrite = isoString;
  } else if (typeof config.outputFunc === 'string') {
    try {
      toWrite = date[config.outputFunc]();
    } catch (err) {
      console.error('Invalid output function.', err);
    }
  } else {
    try {
      toWrite = config.outputFunc(date);
    } catch (err) {
      console.error('Invalid output function.', err);
    }
  }

  if (toWrite !== undefined) {
    config.input.value = toWrite;
  }
};

exports.default = dateToInput;

},{}],5:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* globals define, module */
(function (factory) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return root.datetimepicker = factory();
    });
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    var _datetimepicker = factory();
    module.exports = _datetimepicker;
    root.datetimepicker = _datetimepicker;
  } else {
    root.datetimepicker = factory();
  }
})(function () {
  return _main2.default;
}, undefined);

},{"./main":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = require('./utils');

var inputToDate = function inputToDate(config) {
  var buildDateObject = function buildDateObject(date) {
    var obj = {};
    if (config.withDate) {
      obj.year = date.getUTCFullYear();
      obj.month = date.getUTCMonth();
      obj.day = date.getUTCDate();
      obj.weekDay1 = (0, _utils.getWeekDay1)(obj.year, obj.month);
    }
    if (config.withTime) {
      obj.hour = date.getUTCHours();
      obj.min = date.getUTCMinutes();
      obj.sec = date.getUTCSeconds();
      obj.ms = date.getUTCMilliseconds();
    }
    return obj;
  };

  var date = config.inputFunc(config.input.value, config.withDate, config.withTime);

  if ((typeof date === 'undefined' ? 'undefined' : _typeof(date)) === 'object' && typeof date.toISOString === 'function') {
    try {
      date.toISOString();
    } catch (err) {
      return buildDateObject(new Date());
    }
  } else {
    return buildDateObject(new Date());
  }

  return buildDateObject(date);
};

exports.default = inputToDate;

},{"./utils":11}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prepare_config = require('./prepare_config');

var _prepare_config2 = _interopRequireDefault(_prepare_config);

var _prepare_container = require('./prepare_container');

var _prepare_container2 = _interopRequireDefault(_prepare_container);

var _create_gui = require('./create_gui');

var _create_gui2 = _interopRequireDefault(_create_gui);

var _config_picker_opening = require('./config_picker_opening');

var _config_picker_opening2 = _interopRequireDefault(_config_picker_opening);

var _config_date_modify = require('./config_date_modify');

var _config_date_modify2 = _interopRequireDefault(_config_date_modify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var datetimepicker = function datetimepicker() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  try {
    var config = (0, _prepare_config2.default)(params);
    config.container = (0, _prepare_container2.default)(config);
    config.gui = (0, _create_gui2.default)(config);

    (0, _config_picker_opening2.default)(config);
    (0, _config_date_modify2.default)(config);

    return {
      remove: config.removeInstance
    };
  } catch (err) {
    console.error('Critical error:', err);
  }
};

exports.default = datetimepicker;

},{"./config_date_modify":1,"./config_picker_opening":2,"./create_gui":3,"./prepare_config":8,"./prepare_container":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _input_to_date = require('./input_to_date');

var _input_to_date2 = _interopRequireDefault(_input_to_date);

var _date_to_input = require('./date_to_input');

var _date_to_input2 = _interopRequireDefault(_date_to_input);

var _update_date = require('./update_date');

var _update_date2 = _interopRequireDefault(_update_date);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prepareConfig = function prepareConfig(params) {
  var config = {
    input: (0, _utils.isDOMElement)(params.input) ? params.input : undefined,
    withDate: params.withDate === false || params.withDate === 'false' ? false : true,
    withTime: params.withTime === false || params.withTime === 'false' ? false : true,
    id: params.id !== undefined ? parseInt(params.id, 10) : 0,
    inputFunc: typeof params.inputFunc === 'function' ? params.inputFunc : _utils.DEF_INPUT_FUNC,
    outputFunc: typeof params.outputFunc === 'string' || typeof params.outputFunc === 'function' ? params.outputFunc : undefined,
    months: _typeof(params.months) === 'object' && params.months.length === 12 ? params.months : _utils.MONTHS,
    weekDays: _typeof(params.weekDays) === 'object' && params.weekDays.length === 7 ? params.weekDays : _utils.WEEK_DAYS,
    date: {
      year: 1970,
      month: 0,
      day: 1,
      weekDay1: 3,
      hour: 0,
      min: 0,
      sec: 0,
      ms: 0
    },
    inputToDate: _input_to_date2.default,
    dateToInput: _date_to_input2.default,
    updateDate: _update_date2.default,
    removeInstance: undefined
  };

  //Ensure non-existing ID for autogenerated values
  if (typeof config.id === 'number') {
    var el = void 0;
    do {
      config.id += 1;
      el = document.getElementById(_utils.PREFIX + '-' + config.id);
    } while (el);
    config.id = parseInt(config.id, 10);
  }

  if (!config.input) {
    throw 'Param `input` is mandarory';
  }
  if (!config.withDate && !config.withTime) {
    throw 'At least `date` or `time` has to be active';
  }

  //Output defaults
  if (config.outputFunc === undefined) {
    if (config.withDate && config.withTime) {
      config.outputFunc = 'toISOString';
    } else if (config.withDate) {
      config.outputFunc = function (date) {
        return date.toISOString().split('T')[0];
      };
    } else {
      //config.withTime
      config.outputFunc = function (date) {
        return date.toISOString().split('T')[1];
      };
    }
  }

  return config;
};

exports.default = prepareConfig;

},{"./date_to_input":4,"./input_to_date":6,"./update_date":10,"./utils":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var prepareContainer = function prepareContainer(config) {
  var container = document.createElement('div');
  container.className = _utils.PREFIX;
  container.id = _utils.PREFIX + '-' + config.id;

  if (config.withDate) {
    container.classList.add(_utils.PREFIX + '-with-date');
  }
  if (config.withTime) {
    container.classList.add(_utils.PREFIX + '-with-time');
  }

  var parent = config.input.parentNode;
  parent.insertBefore(container, config.input);
  parent.removeChild(config.input);
  container.appendChild(config.input);

  config.removeInstance = function removeContainer() {
    config.container.parentNode.insertBefore(config.input, config.container);
    config.container.parentNode.removeChild(config.container);
  };

  return container;
};

exports.default = prepareContainer;

},{"./utils":11}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var updateDate = function updateDate(config) {
  if (config.withDate) {
    config.gui.month.innerText = config.months[config.date.month] + ' ' + config.date.year;

    var days = config.gui.days;
    while (days.firstChild) {
      days.removeChild(days.firstChild);
    }
    for (var i = 0; i < config.date.weekDay1; i++) {
      days.appendChild(document.createElement('div'));
    }
    for (var _i = 1, total = (0, _utils.getMonthDays)(config.date.month, config.date.year), day; _i <= total; _i++) {
      day = document.createElement('div');
      day.classList.add(_utils.PREFIX + '-day');
      if (_i === config.date.day) {
        day.classList.add(_utils.PREFIX + '-active');
      }
      day.appendChild(document.createTextNode(_i));
      days.appendChild(day);
    }
  }

  if (config.withTime) {
    config.gui.hour.value = (0, _utils.ensureDigits)(config.date.hour, 2);
    config.gui.min.value = (0, _utils.ensureDigits)(config.date.min, 2);
    config.gui.sec.value = (0, _utils.ensureDigits)(config.date.sec, 2);
    config.gui.ms.value = (0, _utils.ensureDigits)(config.date.ms, 3);
  }
};

exports.default = updateDate;

},{"./utils":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isDOMElement = exports.isDOMElement = function isDOMElement(o) {
  return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? o instanceof HTMLElement : //DOM2
  o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string';
};

var ensureDigits = exports.ensureDigits = function ensureDigits(num, digits) {
  var snum = num.toString();
  while (snum.length < digits) {
    snum = '0' + snum;
  }
  return snum;
};

var getWeekDay1 = exports.getWeekDay1 = function getWeekDay1(year, month) {
  return (7 + new Date(Date.UTC(year, month)).getUTCDay() - 1) % 7;
};

var PREFIX = exports.PREFIX = 'dtp';

var MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//For leap years
var getMonthDays = exports.getMonthDays = function getMonthDays(month, year) {
  if (month === 1 && year % 4 === 0) {
    return 29;
  } else {
    return MONTH_DAYS[month];
  }
};

var DEF_INPUT_FUNC = exports.DEF_INPUT_FUNC = function defInputFunc(input, withDate, withTime) {
  if (withDate) {
    return new Date(input);
  } else if (withTime) {
    var time = input.replace('Z', '').split(':');
    if (time.length === 3) {
      var sec = time[2].split('.');
      if (sec.length === 2) {
        return new Date(Date.UTC(1970, 0, 1, time[0], time[1], sec[0], sec[1]));
      } else if (sec.length === 1) {
        return new Date(Date.UTC(1970, 0, 1, time[0], time[1], time[2]));
      }
    }
  }
};

var MONTHS = exports.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var WEEK_DAYS = exports.WEEK_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

var STYLE = '<style>\n  .dtp {\n    position: relative;\n  }\n  .dtp .dtp-picker {\n    font-family: sans-serif;\n    text-align: center;\n    font-size: 0.8em;\n    position: absolute;\n    left: 0;\n    background-color: #fff;\n    width: 15em;\n    border: solid 1px #ccc;\n    border-radius: 0.25em;\n    padding: 0.5em;\n    display: none;\n  }\n    .dtp.dtp-open .dtp-picker {\n      display: block;\n    }\n  .dtp .dtp-calendar {\n    display: none;\n  }\n    .dtp.dtp-with-date .dtp-calendar {\n      display: block;\n    }\n  .dtp .dtp-month-picker {\n    display: flex;\n    font-weight: bold;\n    padding-bottom: 0.75em;\n  }\n  .dtp .dtp-month, .dtp .dtp-month-pick, .dtp .dtp-week-days > div,\n  .dtp .dtp-days > div {\n    width: 14.2857%;\n    box-sizing: border-box;\n    padding: 0.25em;\n  }\n  .dtp .dtp-month {\n    width: 100%;\n  }\n  .dtp .dtp-month-pick, .dtp .dtp-day {\n    cursor: pointer;\n    border-radius: 0.25em;\n  }\n    .dtp .dtp-month-pick:hover, .dtp .dtp-day:hover {\n      background-color: #ccc;\n    }\n  .dtp .dtp-week-days {\n    font-weight: bold;\n    padding-bottom: 0.25em;\n  }\n  .dtp .dtp-week-days, .dtp .dtp-days {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  .dtp .dtp-day.dtp-active {\n    background-color: #666;\n    color: #fff;\n    cursor: default;\n  }\n  .dtp .dtp-time-picker {\n    padding: 0.5em 0.25em 0.25em;\n    display: none;\n  }\n  .dtp.dtp-with-time .dtp-time-picker, .dtp .dtp-buttons {\n    display: flex;\n    align-items: flex-end;\n  }\n    .dtp .dtp-time-decorator {\n      flex-grow: 1;\n      width: 5%;\n      padding-bottom: 0.25em;\n    }\n    .dtp .dtp-two-digits {\n      flex-grow: 2;\n      box-sizing: border-box;\n      width: 20%;\n    }\n    .dtp .dtp-three-digits {\n      flex-grow: 3;\n      box-sizing: border-box;\n      width: 25%;\n    }\n  .dtp .dtp-buttons {\n    padding: 0.5em 0.25em 0.25em;\n  }\n  .dtp button {\n    width: 50%;\n  }\n  .dtp .dtp-ok {\n    margin-left: 0.5em;\n  }\n</style>';

var generateHTML = exports.generateHTML = function generateHTML() {
  return STYLE + '\n<div class="' + PREFIX + '-calendar">\n  <div class="' + PREFIX + '-month-picker">\n    <div class="dtp-month-before dtp-month-pick">&#x276e;</div>\n    <div class="dtp-month"></div>\n    <div class="dtp-month-after dtp-month-pick">&#x276f;</div>\n  </div>\n  <div class="dtp-day-picker">\n    <div class="dtp-week-days">\n      <div class="dtp-week-day">Mo</div>\n      <div class="dtp-week-day">Tu</div>\n      <div class="dtp-week-day">We</div>\n      <div class="dtp-week-day">Th</div>\n      <div class="dtp-week-day">Fr</div>\n      <div class="dtp-week-day">Sa</div>\n      <div class="dtp-week-day">Su</div>\n    </div>\n    <div class="dtp-days"></div>\n  </div>\n</div>\n<div class="dtp-time-picker">\n  <input class="dtp-hour dtp-two-digits" type="number" min="0" max="23">\n  <span class="dtp-time-decorator">:</span>\n  <input class="dtp-minute dtp-two-digits" type="number" min="0" max="59">\n  <span class="dtp-time-decorator">:</span>\n  <input class="dtp-second dtp-two-digits" type="number" min="0" max="59">\n  <span class="dtp-time-decorator">.</span>\n  <input class="dtp-milisecond dtp-three-digits" type="number" min="0"\n    max="999">\n</div>\n<div class="dtp-buttons">\n  <button class="dtp-now">Now</button>\n  <button class="dtp-ok">OK</button>\n</div>';
};

},{}]},{},[5]);
