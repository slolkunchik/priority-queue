class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
       if(this.left === null) {
		   this.left = node;
		   node.parent = this;
	   } else if (this.right === null) {
		   this.right = node;
		   node.parent = this;
	   }
	}

	removeChild(node) {
      	if(this.left === node) {
		  this.left = null;
	  	} else if(this.right === node) {
			this.right = null;
		} else {
			throw new Error("passed node is not a child of this node");
		}
		node.parent = null;
	}

	remove() {
		if(this.parent !== null) {
			this.parent.removeChild(this);
		}
	}


	swapWithParent() {
		if(this.parent !== null) {
			const parentNode = this.parent;
			const leftChild = this.left;
			const rightChild = this.right;
			if(parentNode.parent !== null) { //parent.parent
				if (parentNode.parent.left === parentNode) {
					parentNode.parent.left = this;
				}
				if (parentNode.parent.right === parentNode) {
					parentNode.parent.right = this;
				}
			}
			this.parent = parentNode.parent;
			parentNode.parent = this;

			if(this === parentNode.right) { //siblings and swap
				if(parentNode.left !== null) {
					parentNode.left.parent = this;
				}
				this.right = parentNode;
				this.left= parentNode.left;
			}
			if(this === parentNode.left) {
				if(parentNode.right !== null) {
					parentNode.right.parent = this;
				}
				this.left = parentNode;
				this.right = parentNode.right;
			}
			if(leftChild  !== null) {//children
				parentNode.left = leftChild;
				leftChild.parent = parentNode;
			}
			if(rightChild !== null) {
				parentNode.right = rightChild;
				rightChild.parent = parentNode;
			}
		}
	}
}

module.exports = Node;
