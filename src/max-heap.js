const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.length = 0;
    }

    push(data, priority) {
        const newNode = new Node(data, priority);
        this.insertNode(newNode);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.shiftNodeUp(newNode);
        }
        this.length += 1;
    }

    pop() {
        if (this.root === null) {
            return this;
        }
        this.restoreRootFromLastInsertedNode(this.detachRoot()); //insert arg!!!!;
        this.shiftNodeDown(this.root);
        return this.root ? this.root.data : null;
    }

    detachRoot() {
        let prevRoot = this.root;
        let indexInParents = this.parentNodes.indexOf(this.root);
        this.root = null;
        this.parentNodes.splice(indexInParents, 1);
        return prevRoot;
    }

    restoreRootFromLastInsertedNode(detached) {
        console.log(this.root);
        const lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
        console.log("last", lastInsertedNode);
        this.shiftNodeUp(lastInsertedNode);
        console.log(this.root);
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return this.root === null;
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        return this;
    }

    insertNode(node) {
        if (this.root === null) {
            this.root = node;
            this.parentNodes[0] = node;
        } else {
            this.parentNodes.push(node);
            this.parentNodes[0].appendChild(node);

            if (this.parentNodes[0].right !== null) {
                this.parentNodes.shift();
            }
        }
    }

    shiftNodeUp(node) {
        let parentNodes = this.parentNodes; //without it swap can't see this;

        function swap (node) {
            let indexParentInParents = parentNodes.indexOf(node.parent);
            let indexNodeInParents = parentNodes.indexOf(node);
            if (indexParentInParents >= 0) {
                parentNodes[indexParentInParents] = node;
            }
            if (indexNodeInParents >= 0) {
                parentNodes[indexNodeInParents] = node.parent;
            }

            node.swapWithParent();
            return node;
        }
        if (node && node.parent !== null) {
            return this.shiftNodeUp(swap(node))
        } else if (node) {
            this.root = node;
        }
    }

    shiftNodeDown(node) {
        let parentNodes = this.parentNodes;
        function swap (node) {
            let indexLeftInParents = parentNodes.indexOf(node.left);
            let indexNodeInParents = parentNodes.indexOf(node);
            if (indexLeftInParents >= 0) {
            	parentNodes[indexLeftInParents] = node;
            }
            if (indexNodeInParents >= 0) {
            	parentNodes[indexNodeInParents] = node.left;
            }
            if(( node.right !== null ) && (node.left !== null) && (node.left.priority - node.right.priority) >= 0) {
                node.left.swapWithParent();
            } else if (( node.right !== null ) && (node.left !== null) ) {
                node.right.swapWithParent();
            } else {
                node.left.swapWithParent();
            }
            return node;
        }

        if (node && node.left !== null) {
            swap(node);

            if (node.parent.parent === null) {
                this.root = node.parent;
            }

            return this.shiftNodeDown(node);
        }
    }
}

module.exports = MaxHeap;
