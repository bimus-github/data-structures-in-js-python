class TrieNode {
  constructor() {
    this.children = {}; // Object to store child nodes
    this.isEndOfWord = false; // Flag to mark end of a word
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode(); // Root node of the trie
  }

  // Function to insert a word into the trie
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode(); // Create a new node if the character is not present
      }
      node = node.children[char]; // Move to the next node
    }
    node.isEndOfWord = true; // Mark the end of the word
  }

  // Function to search for a word in the trie
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        return false; // Return false if any character is not found
      }
      node = node.children[char]; // Move to the next node
    }
    return node.isEndOfWord; // Return true if the end of word flag is set
  }

  // Function to check if a word prefix exists in the trie
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
        return false; // Return false if any character is not found
      }
      node = node.children[char]; // Move to the next node
    }
    return true; // Return true if the prefix exists in the trie
  }
}

// Example usage:
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple")); // Output: true
console.log(trie.search("app")); // Output: false
console.log(trie.startsWith("app")); // Output: true
trie.insert("app");
console.log(trie.search("app")); // Output: true

console.log(trie.root);
