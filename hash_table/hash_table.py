# create Hash Table using ord
class HashTable:
    def __init__(self):
        self.MAX = 10
        self.arr = [None for i in range(self.MAX)]

    def get_hash(self, key):
        hash = 0
        for char in key:
            hash += ord(char)
        return hash % self.MAX

    def __setitem__(self, key, value):
        h = self.get_hash(key)
        self.arr[h] = value

    def __getitem__(self, key):
        h = self.get_hash(key)
        return self.arr[h]
    

table = HashTable()

table["march 6"] = 6
table["march 7"] = 7
table["march 8"] = 8
table["march 9"] = 9
table["march 10"] = 10
table["march 11"] = 11
table["march 12"] = 12
table["march 13"] = 13
table["march 14"] = 14
table["march 15"] = 15
table["march 16"] = 16
table["march 17"] = 17

print(table.arr)
print(table["march 10"])