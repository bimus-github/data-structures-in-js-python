const array = [];

const asyncFunc = async () => {
  for (let i = 0; i <= 10000000; i++) {
    array.push({ id: i, name: `Item ${i}`, price: Math.random() });
  }
};

asyncFunc().then(() => {
  console.log("Array created successfully");
});

const div = document.querySelector("div");
const searchInput = document.querySelector("input");
const search = document.querySelector("button");

search.onclick = () => {
  const item = array.find((item) => item.id === parseInt(searchInput.value));
  div.innerHTML = item.id + " " + item.name + " " + item.price;
};
