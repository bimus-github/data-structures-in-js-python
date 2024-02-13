class Node {
  constructor(id, name, price, date, color) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.date = date;
    this.color = color; // 1 for red, 0 for black
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class RedBlackTree {
  constructor() {
    this.root = null;
  }

  add(id, name, price, date) {
    const newNode = new Node(id, name, price, date, 1); // New nodes are always red
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
    this.fixTree(newNode);
  }

  insertNode(root, newNode) {
    if (newNode.id < root.id) {
      if (root.left === null) {
        root.left = newNode;
        newNode.parent = root;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
        newNode.parent = root;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }

  fixTree(node) {
    while (node !== this.root && node.parent.color === 1) {
      let parentNode = node.parent;
      let grandParentNode = node.parent.parent;

      // Case A: Parent is left child of grandparent
      if (parentNode === grandParentNode.left) {
        let uncleNode = grandParentNode.right;
        // Case 1: Uncle is also red, only recoloring needed
        if (uncleNode !== null && uncleNode.color === 1) {
          grandParentNode.color = 1;
          parentNode.color = 0;
          uncleNode.color = 0;
          node = grandParentNode;
        } else {
          // Case 2: Node is right child, left rotation needed
          if (node === parentNode.right) {
            node = parentNode;
            this.rotateLeft(node);
          }
          // Case 3: Node is left child, right rotation needed
          node.parent.color = 0;
          grandParentNode.color = 1;
          this.rotateRight(grandParentNode);
        }
      } else {
        // Case B: Parent is right child of grandparent
        let uncleNode = grandParentNode.left;
        // Case 1: Uncle is also red, only recoloring needed
        if (uncleNode !== null && uncleNode.color === 1) {
          grandParentNode.color = 1;
          parentNode.color = 0;
          uncleNode.color = 0;
          node = grandParentNode;
        } else {
          // Case 2: Node is left child, right rotation needed
          if (node === parentNode.left) {
            node = parentNode;
            this.rotateRight(node);
          }
          // Case 3: Node is right child, left rotation needed
          node.parent.color = 0;
          grandParentNode.color = 1;
          this.rotateLeft(grandParentNode);
        }
      }
    }
    this.root.color = 0; // Root must always be black
  }

  rotateLeft(node) {
    let rightChild = node.right;
    node.right = rightChild.left;
    if (rightChild.left !== null) {
      rightChild.left.parent = node;
    }
    rightChild.parent = node.parent;
    if (node.parent === null) {
      this.root = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }
    rightChild.left = node;
    node.parent = rightChild;
  }

  rotateRight(node) {
    let leftChild = node.left;
    node.left = leftChild.right;
    if (leftChild.right !== null) {
      leftChild.right.parent = node;
    }
    leftChild.parent = node.parent;
    if (node.parent === null) {
      this.root = leftChild;
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }
    leftChild.right = node;
    node.parent = leftChild;
  }

  search(id) {
    return {
      id: this.searchNode(this.root, id).id,
      name: this.searchNode(this.root, id).name,
      price: this.searchNode(this.root, id).price,
    };
  }

  searchNode(node, id) {
    if (node === null || node.id === id) {
      return node;
    }
    if (id < node.id) {
      return this.searchNode(node.left, id);
    }
    return this.searchNode(node.right, id);
  }
}

// Example Usage of red-black tree
const tree = new RedBlackTree();

const asyncFunc = async () => {
  for (let i = 0; i < 10000000; i++) {
    tree.add(i, `Item ${i}`, Math.random());
  }
};

asyncFunc().then(() => {
  console.log("Tree created successfully");
});

const div = document.querySelector("div");
const searchInput = document.querySelector("input");
const search = document.querySelector("button");

search.onclick = () => {
  const item = tree.search(parseInt(+searchInput.value));
  div.innerHTML = item.id + " " + item.name + " " + item.price;
};
