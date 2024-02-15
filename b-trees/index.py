class TreeNode:
    def __init__(self, leaf=False):
        self.keys = []
        self.children = []
        self.leaf = leaf

class BTree:
    def __init__(self, t):
        self.root = TreeNode(leaf=True)
        self.t = t

    def search(self, key, node=None):
        if node is None:
            node = self.root
        i = 0
        while i < len(node.keys) and key > node.keys[i]:
            i += 1
        if i < len(node.keys) and key == node.keys[i]:
            return True
        elif node.leaf:
            return False
        else:
            return self.search(key, node.children[i])

    def insert(self, key):
        root = self.root
        if len(root.keys) == (2 * self.t) - 1:
            new_root = TreeNode()
            new_root.children.append(root)
            self.split_child(new_root, 0)
            self.root = new_root
            self.insert_non_full(new_root, key)
        else:
            self.insert_non_full(root, key)

    def insert_non_full(self, node, key):
        i = len(node.keys) - 1
        if node.leaf:
            node.keys.append(None)
            while i >= 0 and key < node.keys[i]:
                node.keys[i + 1] = node.keys[i]
                i -= 1
            node.keys[i + 1] = key
        else:
            while i >= 0 and key < node.keys[i]:
                i -= 1
            i += 1
            if len(node.children[i].keys) == (2 * self.t) - 1:
                self.split_child(node, i)
                if key > node.keys[i]:
                    i += 1
            self.insert_non_full(node.children[i], key)

    def split_child(self, parent, index):
        t = self.t
        child = parent.children[index]
        new_child = TreeNode(leaf=child.leaf)

        parent.keys.insert(index, child.keys[t - 1])
        parent.children.insert(index + 1, new_child)

        new_child.keys = child.keys[t:(2 * t) - 1]
        child.keys = child.keys[0:t - 1]

        if not child.leaf:
            new_child.children = child.children[t:2 * t]
            child.children = child.children[0:t - 1]

def main():
    b_tree = BTree(2)
    keys = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
    for key in keys:
        b_tree.insert(key)

    print(b_tree.root)

if __name__ == "__main__":
    main()