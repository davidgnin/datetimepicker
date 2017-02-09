'use strict';
import datetimepicker from './main';

/* globals define, module */
(function (factory, root = window) {
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return (root.datetimepicker = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    let datetimepicker = factory();
    module.exports = datetimepicker;
    root.datetimepicker = datetimepicker;
  } else {
    root.datetimepicker = factory();
  }
}(function () {
  return datetimepicker;
}, this));
