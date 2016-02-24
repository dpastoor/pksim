import _ from 'lodash';

/**
 * Represents a IV bolus.
 * @
 * @param {numeric} cl - clearance value
 * @param {numeric} v - volume of distribution
 * @param {numeric} dose - the dose (amount) to add at t0
 * @param {array} times - array of time values to sampel at
 * @returns {object} arrays referenced with keys of time and dv
 */
export function oneCmptIvBolus(cl, v, dose, times, c0 = 0, digits = 3) {
  c0 = c0 + dose/v;
  let ke = cl/v;
  let t0 = times[0];
  return _.map(times, function(t) {
    let dv = c0*Math.exp(-ke*(t-t0));
		return({
      'time': _.round(t, digits),
			'dv': _.round(dv, digits)
      });
    });
}
/**
 * Represents a IV bolus.
 * @
 * @param {Number} cl - clearance value
 * @param {Number} v - volume of distribution
 * @param {Number} ka - absorption rate constant
 * @param {Number} tau - dose interval
 * @param {Number} dose - the dose (amount) to add at t0
 * @param {Number} n - number of doses
 * @param {Array} times - array of time values to sample at
 * @param {Number} c0 - initial concentration
 * @param {Number} digits - number of decimals to round to
 * @returns {Object} arrays referenced with keys of time and dv
 */
export function oneCmptOral(cl, v, ka, tau, dose, n, times, c0 = 0, digits = 3) {
  let ke = cl/v;
  let t0 = times[0];
  return _.map(times, function(t) {
    let dv = (ka*dose/(v*(ka-ke)))*(
      ((1-Math.exp(-n*ke*tau))/(1-Math.exp(-ke*tau)))*Math.exp(-ke*(t-t0)) - (
      ((1-Math.exp(-n*ka*tau))/(1-Math.exp(-ka*tau)))*Math.exp(-ka*(t-t0))
      )
    );
		return({
      'time': _.round(t, digits),
			'dv': _.round(dv, digits)
      });
    });
}
/**
 * Represents a regimen.
 * @
 * @param {Object} regimen - json object with equal length arrays for times and doses
 * @param {Array} sampleTimes - the sample times requested for 'observed' PK concentration values
 * @returns {Array} array of objects each with with doseNum, dose and times
 */
export function sampleIntervals(regimen, sampleTimes) {
  // TODO make so can pass a single dose that will get applied at all times
    let intervals = [];
    let currentIndex = 0;

    for (let i = 0; i < regimen.times.length; i++) {
      let timeSlice = [];
      let stopTime = i === (regimen.times.length - 1) ? Infinity : regimen.times[i + 1];
      // have to use undefined as if just do sampleTimes[currentIndex]
      // if at time 0 will be coerced to false and not evaluate
      while (sampleTimes[currentIndex] !== undefined && sampleTimes[currentIndex] < stopTime) {
        timeSlice.push(sampleTimes[currentIndex]);
        currentIndex++;
      }
      // want to include the stop time in the dosing interval as want to get the
      // last concentration before the next dose would be given to get an appropriate 0
      // but don't want the Infinity stop time
      intervals.push({
        doseNum: i+1,
        dose: regimen.doses[i],
        times: stopTime === Infinity ? timeSlice : timeSlice.concat(stopTime)
      });
    }

    return intervals;
}
//
//
//
// export function oldSampleIntervalFunction(regimen, sampleTimes) {
//   var intervals = [];
//   for(let i = 0; i < regimen.times.length; i++) {
//     let timeSlice = [];
//     let nextDoseTime = (i == regimen.times.length-1 ? Infinity : regimen.times[i + 1]);
//     if (regimen.times[i] !== sampleTimes[0]) {
//         timeSlice.push(regimen.times[i]);
//     }
//     for(let j = 0; j < sampleTimes.length; j++) {
//         if (nextDoseTime > sampleTimes[j]) {
//           timeSlice.push(sampleTimes[j]);
//         } else {
//           // add next dosetime to get starting amt for next segment
//           if (j != sampleTimes.length -1) {
//             timeSlice.push(nextDoseTime-0.001);
//           }
//           sampleTimes.splice(0, j);
//           break;
//         }
//     }
//     intervals.push({
//       doseNum: i+1,
//       dose: regimen.doses[i],
//       time: timeSlice
//     });
//   }
//   return intervals;
// }
