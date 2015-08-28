import * as _ from 'lodash';

/**
 * Represents a IV bolus.
 * @
 * @param {numeric} cl - clearance value
 * @param {numeric} v - volume of distribution
 * @param {numeric} dose - the dose (amount) to add at t0
 * @param {array} times - array of time values to sampel at
 * @returns {object} two arrays of time, concentration values at requested time points
 */
export function onecmptiv(cl, v, dose, times) {
	var c0 = dose/v;
  var ke = cl/v;
  var t0 = times[0];
  var res = _.map(times, function(t) {
		return(
			{'x': t,
			'y': c0*Math.exp(-ke*(t-t0))}
		);
		});
	return res;
}
/**
 * Represents a regimen.
 * @
 * @param {object} regimen - json object with equal length arrays for times and doses
 * @param {array} sampleTimes - the sample times requested for 'observed' PK concentration values
 * @returns {array} array of objects each with with doseNum, dose and time
 */
export function sampleIntervals(regimen, sampleTimes) {
  var intervals = [];
    for(let i = 0; i < regimen.times.length; ++i) {
      let timeSlice = [];
      let nextDoseTime = (i == regimen.times.length-1 ? Infinity : regimen.times[i + 1]);
      if (regimen.times[i] !== sampleTimes[0]) {
          timeSlice.push(regimen.times[i]);
      }
      for(let j = 0; j < sampleTimes.length; ++j) {
          if (nextDoseTime > sampleTimes[j]) {
            timeSlice.push(sampleTimes[j]);
          } else {
            // add next dosetime to get starting amt for next segment
            if (j != sampleTimes.length -1) {
              timeSlice.push(nextDoseTime-0.001);
            }
            sampleTimes.splice(0, j);
            break;
          }
      }
      intervals.push({
        doseNum: i+1,
        dose: regimen.doses[i],
        time: timeSlice
      });
    }
    return intervals;
}
