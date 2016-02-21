import {onecmptiv} from './src/index.js';

console.log(onecmptiv(1,10, 100, [0, 1, 2,3 , 4, 5]))
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
