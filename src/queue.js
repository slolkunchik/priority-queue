const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
		this.next = null;
		this.length = 0;
	}

	push(data, priority){
		if (this.length === this.maxSize) {
			throw new TypeError();
		}

		this.heap.push(data, priority);
		this.length++;
	}

	shift() {
		if (this.length === 0) {
			throw new Error("queue is empty");
		}
		this.length--;
		return this.heap.pop();
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return this.length === 0;
	}
}

module.exports = PriorityQueue;
