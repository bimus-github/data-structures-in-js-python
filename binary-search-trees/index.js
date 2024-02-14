class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    // Helper function to recursively insert nodes
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  search(prop, value) {
    // Helper function to recursively search for a node
    return this.searchNode(this.root, prop, value);
  }

  searchNode(node, prop, value) {
    if (node === null) {
      return null;
    }

    if (node.data[prop] === value) {
      return node.data;
    } else if (value < node.data[prop]) {
      return this.searchNode(node.left, prop, value);
    } else {
      return this.searchNode(node.right, prop, value);
    }
  }

  getArray() {
    return this.getArrayNode(this.root);
  }

  getArrayNode(node) {
    const array = [];

    if (node !== null) {
      array.push(node.data);
      array.push(...this.getArrayNode(node.left));
      array.push(...this.getArrayNode(node.right));
    }

    return array;
  }
}

// Example usage
const bst = new BST();

const asyncFunc = async () => {
  for (let i = 0; i <= 1000; i++) {
    bst.insert({ id: i, name: `Item ${i}`, price: i * 1000 });
  }
};

asyncFunc().then(() => {
  console.log("Tree created successfully");
});

const table = document.querySelector("table");

const searchInputById = document.querySelector("#searchInputById");
const searchInputByName = document.querySelector("#searchInputByName");
const searchInputByPrice = document.querySelector("#searchInputByPrice");

const searchById = document.querySelector("#searchById");
const searchByName = document.querySelector("#searchByName");
const searchByPrice = document.querySelector("#searchByPrice");

// if (table) {
//   bst.getArray().forEach((item) => {
//     table.innerHTML += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.price}</td></tr>`;
//   });
// }

searchById.onclick = () => {
  const item = bst.search("id", parseInt(searchInputById.value));
  table.innerHTML = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.price}</td></tr>`;
};

searchByName.onclick = () => {
  const item = bst.search("name", searchInputByName.value);
  table.innerHTML = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.price}</td></tr>`;
};

searchByPrice.onclick = () => {
  const item = bst.search("price", parseFloat(searchInputByPrice.value));
  table.innerHTML = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.price}</td></tr>`;
};
