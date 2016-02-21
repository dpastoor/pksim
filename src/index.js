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
  let res = _.map(times, function(t) {
		return({
      'time': t,
			'dv': _.round(c0*Math.exp(-ke*(t-t0)), digits)
      });
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
// export function sampleIntervals(regimen, sampleTimes) {
//
// }
//
//
//
// export function oldSampleIntervalFunction(regimen, sampleTimes) {
//
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
