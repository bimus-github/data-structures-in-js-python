class HashTable {
  constructor() {
    this.table = {};
  }

  // Hash function to convert keys into numerical indices
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37; // Modulo 37 for simplicity
  }

  // Insert key-value pair into the hash table
  insert(key, value) {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    this.table[index].push([key, value]);
  }

  // Retrieve value associated with the given key
  get(key) {
    const index = this.hash(key);
    if (this.table[index]) {
      for (let pair of this.table[index]) {
        if (pair[0] === key) {
          return pair[1];
        }
      }
    }
    return undefined; // Key not found
  }

  // Remove key-value pair from the hash table
  remove(key) {
    const index = this.hash(key);
    if (this.table[index]) {
      this.table[index] = this.table[index].filter((pair) => pair[0] !== key);
    }
  }
}

// Example usage:
const myHashTable = new HashTable();
myHashTable.insert("name", "John");
myHashTable.insert("age", 30);
myHashTable.insert("city", "New York");
myHashTable.insert("city", "New York 2");

console.log(myHashTable.get("name")); // Output: John
console.log(myHashTable.get("age")); // Output: 30
console.log(myHashTable.get("city")); // Output: New York

myHashTable.remove("age");
console.log(myHashTable.get("age")); // Output: undefined (age has been removed)

console.log(myHashTable.table);
