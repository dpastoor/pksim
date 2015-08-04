'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.onecmptiv = onecmptiv;
exports.sampleIntervals = sampleIntervals;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function onecmptiv(cl, v, dose, times) {
  var c0 = dose / v;
  var ke = cl / v;
  var res = _lodash2['default'].map(times, function (t) {
    return { 'x': t,
      'y': c0 * Math.exp(-ke * t) };
  });
  return res;
}

function sampleIntervals(regimen, sampleTimes) {
  var intervals = [];
  for (var i = 0; i < regimen['times'].length; ++i) {
    var timeSlice = [];
    var nextDoseTime = i == regimen['times'].length - 1 ? Infinity : regimen['times'][i + 1];
    console.log(nextDoseTime);
    if (regimen['times'][i] !== sampleTimes[0]) {
      timeSlice.push(regimen['times'][i]);
    }
    for (var j = 0; j < sampleTimes.length; ++j) {
      if (nextDoseTime > sampleTimes[j]) {
        timeSlice.push(sampleTimes[j]);
      } else {
        sampleTimes.splice(0, j);
        break;
      }
    }
    intervals.push({
      doseNum: i + 1,
      dose: regimen['doses'][i],
      time: timeSlice
    });
  }
  return intervals;
}