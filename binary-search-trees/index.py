class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def __setitem__(self, data):
        new_node = Node(data)
        if self.root == None:
            self.root = new_node
        else:
            self._insert(self.root,new_node )

    def _insert(self, node, new_node):
        if new_node.data.id < node.data.id:
            if node.left == None:
                node.left = new_node
            else:
                self._insert(node.left, new_node)
        else:
            if node.right == None:
                node.right = new_node
            else:
                self._insert(node.right, new_node)

    def __getitem__(self, prop, value):
        return self._search(self.root, prop, value)
    
    def _search(self, node, prop, value):
        if node == None:
            return None
        
        
        if node.data[prop] == value:
            return node
        if node.data[prop] > value:
            return self._search(node.left, prop, value)
        else:
            return self._search(node.right, prop, value)
bstree = BST()

    

        