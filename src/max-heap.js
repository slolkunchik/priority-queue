const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.last = 0;
		this.items = [];
	}

	push(data, priority) {

	}

	pop() {

	}

	detachRoot() {

	}

	restoreRootFromLastInsertedNode(detached) {

	}

	size() {
		return this.items.length;
	}

	isEmpty() {
		return this.items.length === 0;
	}

	clear() {
		return this.items.length = 0;
	}

	insertNode(node) {
		const swap = (firstPos, secondPos) => {
			let temp = this.items[ firstPos ];
			this.items[ firstPos ] = this.items[ secondPos ];
			this.items[ secondPos ] = temp;
		};

		if(this.root === null) {
			this.root = node;
			this.last++;
			this.items[this.last] = this.root;
		} else {
			this.last++;
			this.items[this.last] = node;

			let currentPosition = this.last;
			let parentPosition;
			let parent;

			while(currentPosition > 1) {
				parentPosition = Math.floor(currentPosition / 2);
				parent = this.items[ parentPosition ];
				parent.appendChild(node);

				if (parent.data < node.data) {
					return;
				}
				swap(parentPosition, currentPosition);
				currentPosition = parentPosition;
				node.swapWithParent();
			}
		}
	}

	shiftNodeUp(node) {

	}

	shiftNodeDown(node) {

	}
}

module.exports = MaxHeap;
