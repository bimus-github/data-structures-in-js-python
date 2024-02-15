class NodeTree {
  constructor(leaf = false) {
    this.leaf = leaf;
    this.keys = [];
    this.children = [];
  }
}

class BTree {
  constructor(t) {
    this.root = new NodeTree(true);
    this.t = t;
  }

  insert(key) {
    const root = this.root;
    if (root.keys.length === 2 * this.t - 1) {
      const new_root = new NodeTree();
      new_root.children.push(root);
      this.split_child(new_root, 0);
      this.root = new_root;
      this.insert_nonfull(new_root, key);
    } else {
      this.insert_nonfull(root, key);
    }
  }

  insert_nonfull(root, key) {
    let i = root.keys.length - 1;
    if (root.leaf) {
      while (i >= 0 && root.keys[i] > key) {
        root.keys[i + 1] = root.keys[i];
        i--;
      }
      root.keys[i + 1] = key;
    } else {
      while (i >= 0 && root.keys[i] > key) {
        i--;
      }
      i++;
      if (root.children[i].keys.length === 2 * this.t - 1) {
        this.split_child(root, i);
        if (root.keys[i] < key) {
          i++;
        }
      }
      this.insert_nonfull(root.children[i], key);
    }
  }

  split_child(parent, i) {
    const t = this.t;
    const child = parent.children[i];
    const new_child = new NodeTree(child.leaf);

    parent.keys.splice(i, 0, child.keys[t - 1]);
    parent.children.splice(i + 1, 0, new_child);

    new_child.keys = child.keys.splice(t, t - 1);

    if (!child.leaf) {
      new_child.children = child.children.splice(t, t);
    }
  }

  search(key) {
    let root = this.root;
    while (!root.leaf) {
      let i = 0;
      while (i < root.keys.length && root.keys[i] < key) {
        i++;
      }
      root = root.children[i];
    }
    for (let i = 0; i < root.keys.length; i++) {
      if (root.keys[i] === key) {
        return true;
      }
    }
    return false;
  }
}

const bTree = new BTree(1);

keys = [42, 22, 71, 66, 47, 81, 11, 15];

for (let i = 0; i < keys.length; i++) {
  bTree.insert(keys[i]);
}

keys2 = [100, 200, 300, 400, 500, 600, 700, 800, 900];

for (let i = 0; i < keys2.length; i++) {
  bTree.insert(keys2[i]);
}

console.log(bTree.search(100));
