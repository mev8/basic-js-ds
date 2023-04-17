const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}


class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }

    let currentNode = this.rootNode;

    while (currentNode) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          break;
        }
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          break;
        }
        currentNode = currentNode.right;
      } else {
        break;
      }
    }
  }

  has(data) {
    let currentNode = this.rootNode;

    while (currentNode) {
      if (data === currentNode.data) {
        return true;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return false;
  }

  find(data) {
    let currentNode = this.rootNode;

    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  remove(data) {
    let currentNode = this.rootNode;
    let parentNode = null;
    let direction = null;

    while (currentNode) {
      if (data === currentNode.data) {
        if (!currentNode.left && !currentNode.right) {
          if (!parentNode) {
            this.rootNode = null;
          } else {
            if (direction === 'left') {
              parentNode.left = null;
            } else {
              parentNode.right = null;
            }
          }
        } else if (!currentNode.left) {
          if (!parentNode) {
            this.rootNode = currentNode.right;
          } else {
            if (direction === 'left') {
              parentNode.left = currentNode.right;
            } else {
              parentNode.right = currentNode.right;
            }
          }
        } else if (!currentNode.right) {
          if (!parentNode) {
            this.rootNode = currentNode.left;
          } else {
            if (direction === 'left') {
              parentNode.left = currentNode.left;
            } else {
              parentNode.right = currentNode.left;
            }
          }
        } else {
          let minRightNode = currentNode.right;

          while (minRightNode.left) {
            minRightNode = minRightNode.left;
          }

          this.remove(minRightNode.data);

          currentNode.data = minRightNode.data;
        }

        return;
      } else if (data < currentNode.data) {
        parentNode = currentNode;
        direction = 'left';
        currentNode = currentNode.left;
      } else {
        parentNode = currentNode;
        direction = 'right';
        currentNode = currentNode.right;
      }
    }
  }

  min() {
    let currentNode = this.rootNode;

    while (currentNode && currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode ? currentNode.data : null;
  }

  max() {
    let currentNode = this.rootNode;

    while (currentNode && currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode ? currentNode.data : null;
  }
}

module.exports = {
  BinarySearchTree
};