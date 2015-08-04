import _ from 'lodash';
export function onecmptiv(cl, v, dose, times) {
	var c0 = dose/v;
  var ke = cl/v;
  var res = _.map(times, function(t) {
		return(
			{'x': t,
			'y': c0*Math.exp(-ke*t)}
		);
		});
	return res;
}

export function sampleIntervals(regimen, sampleTimes) {
  var intervals = [];
    for(let i = 0; i < regimen['times'].length; ++i) {
      let timeSlice = [];
      let nextDoseTime = (i == regimen['times'].length-1 ? Infinity : regimen['times'][i + 1]);
      console.log(nextDoseTime);
      if (regimen['times'][i] !== sampleTimes[0]) {
          timeSlice.push(regimen['times'][i]);
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
        dose: regimen['doses'][i],
        time: timeSlice
      });
    }
    return intervals;
}
