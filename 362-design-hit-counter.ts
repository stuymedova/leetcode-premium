// Design a hit counter which counts the number of hits received in the past 5 minutes.

// Each function accepts a timestamp parameter (in seconds granularity) and you may assume that calls are being made to the system in chronological order (ie, the timestamp is monotonically increasing). You may assume that the earliest timestamp starts at 1.

// It is possible that several hits arrive roughly at the same time.

// Example:

// HitCounter counter = new HitCounter();

// // hit at timestamp 1.
// counter.hit(1);

// // hit at timestamp 2.
// counter.hit(2);

// // hit at timestamp 3.
// counter.hit(3);

// // get hits at timestamp 4, should return 3.
// counter.getHits(4);

// // hit at timestamp 300.
// counter.hit(300);

// // get hits at timestamp 300, should return 4.
// counter.getHits(300);

// // get hits at timestamp 301, should return 3.
// counter.getHits(301);

// Follow up: What if the number of hits per second could be very large? Does your design scale?

const TIME_SPAN_IN_SEC = 300;

type Timestamp = number;

class HitCounter {
	#hits: Timestamp[];

	constructor() {
		this.#hits = [];
	}

	hit(timestamp: Timestamp): void {
		this.#rebalanceHits(timestamp);
		this.#hits.push(timestamp);
	}

	getHits(timestamp: Timestamp): number {
		this.#rebalanceHits(timestamp);
		return this.#hits.length;
	}

	#rebalanceHits(timestamp: Timestamp): void {
		let i = 0;
		while (timestamp - TIME_SPAN_IN_SEC >= this.#hits[i]) {
			i += 1;
		}
		if (i > 0) {
			this.#hits = this.#hits.slice(i);
		}
	}
}

// TEST CASES
const counter = new HitCounter();
counter.hit(1);
counter.hit(2);
counter.hit(3);
const hits1 = counter.getHits(4);
counter.hit(300);
const hits2 = counter.getHits(300);
const hits3 = counter.getHits(301);

console.log(hits1); // 3
console.log(hits2); // 4
console.log(hits3); // 3
