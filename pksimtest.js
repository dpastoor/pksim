import {oneCmptIvBolus, sampleIntervals, oldSampleIntervalFunction} from './src/index.js';
import _ from 'lodash';
import fs from 'fs';
console.log(oneCmptIvBolus(1,10, 100, [0, 1, 2, 3, 4, 5]));
console.time('sampleIntervals');
let intervals = sampleIntervals({
	doses: [200, 50, 50],
	times: [0, 12, 24]
}, _.range(0, 36, 0.5));
console.timeEnd('sampleIntervals');
// console.log(intervals);
console.time('onecmpt');

let onecmpt = _.reduce(intervals, (acc, value, i, array) => {
	if (!acc.length) {
		return acc.concat(oneCmptIvBolus(1,10, value.dose, value.times));
	}
	let lastConc = acc[acc.length - 1].dv;
	return acc.concat(oneCmptIvBolus(1,10, value.dose, value.times, lastConc));
}, []);
console.timeEnd('onecmpt');
console.log(onecmpt)

fs.writeFileSync('pkexample.json', JSON.stringify(onecmpt,null, 4));
//
// var seq = [];
// for (var i = 0; i <= 48; i++) {
// 	seq.push(i);
// }
//
// var reg = {doses: [100, 10, 1], times: [0, 12, 24]};
//
// var regimen = pksim.sampleIntervals(reg, seq);
// console.log(regimen);
//
//
// var sim = [];
//
// var lastAmt = 0;
// var Cl = 1;
// var Vd = 10;
// var simInterval;
// for(var i = 0; i < regimen.length; ++i) {
// 	console.log(lastAmt);
// 	simInterval = pksim.onecmptiv(Cl, Vd, regimen[i].dose + lastAmt, regimen[i].time);
// 	lastAmt = simInterval[simInterval.length-1].y*Vd;
// 	sim.push(simInterval);
// 	console.log(simInterval);
// }
//
// console.log(sim);
