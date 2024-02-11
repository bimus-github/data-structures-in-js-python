class MinHeap:

    # __init__ method that initializes two instance variables: heap_list as a list with 0 as the first element, and current_size as 0.
    def __init__(self):
        self.heap_list = [0]
        self.current_size = 0
 
    def sift_up(self, i):
        """
        Move the element at index i up the heap to maintain the heap property.

        Args:
        i (int): The index of the element to be moved up the heap.

        Returns:
        None
        """
        while (i // 2 > 0) and (self.heap_list[i] < self.heap_list[i // 2]):
            self.heap_list[i], self.heap_list[i // 2] = self.heap_list[i // 2], self.heap_list[i]
            i = i // 2
 
    def insert(self, k):
        """
        Insert a new element into the heap.

        Args:
        k: The element to be inserted.

        Returns:
        None
        """
        # Append the element to the heap
        self.heap_list.append(k)
        # Move the element to its position from bottom to the top
        self.sift_up(self.current_size + 1)
        self.current_size += 1
 
    def sift_down(self, i):
        """
        Move the element at index i down in the heap to maintain the heap property.
        
        Args:
        - i: The index of the element to be sifted down
        """
        while (i * 2) <= self.current_size:
            left_child = i * 2
            right_child = (i * 2) + 1 if (i * 2) + 1 <= self.current_size else None
            # Get the index of the min child
            min_child = left_child if right_child is None or self.heap_list[left_child] < self.heap_list[right_child] else right_child
            if self.heap_list[i] > self.heap_list[min_child]:
                self.heap_list[i], self.heap_list[min_child] = self.heap_list[min_child], self.heap_list[i]
            i = min_child
 
    #  This code defines a method to find the minimum child of a given node in a heap data structure. It calculates the indices of the left and right child nodes and returns the index of the smaller value
    def min_child(self, i):
        left_child_index = i * 2
        if left_child_index > self.current_size:
            return left_child_index
        else:
            right_child_index = left_child_index + 1
            return left_child_index if self.heap_list[left_child_index] < self.heap_list[right_child_index] else right_child_index
 
    def delete_min(self):
        if self.current_size == 0:
            return 'Empty heap'

        root = self.heap_list[1]
        self.heap_list[1] = self.heap_list[self.current_size]
        self.heap_list.pop()

        self.current_size -= 1
        self.sift_down(1)

        return root
    
    def find_min(self):
        return self.heap_list[1]

# Same tree as above example.
my_heap = MinHeap()
my_heap.insert(6)
my_heap.insert(9)
my_heap.insert(11)
my_heap.insert(13)
my_heap.insert(5)
my_heap.insert(7)
my_heap.insert(10)

print(my_heap.heap_list)

print(my_heap.min_child(0))
print(my_heap.min_child(1))
print(my_heap.min_child(2))
print(my_heap.min_child(3))
print(my_heap.min_child(4))

# print(my_heap.delete_min()) # removing min node i.e 5 

 