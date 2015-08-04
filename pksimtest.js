var pksim = require('./lib/index.js');

var seq = [];
for (var i = 0; i <= 48; i++) {
	seq.push(i);
}

var reg = {doses: [100, 10, 1], times: [0, 12, 24]};

console.log(pksim.sampleIntervals(reg, seq));
