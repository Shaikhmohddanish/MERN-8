const products = [
  { name: "Apple", category: "Fruit" },
  { name: "Banana", category: "Fruit" },
  { name: "Carrot", category: "Vegetable" },
  { name: "Lettuce", category: "Vegetable" }
];

const groupedProducts = products.reduce((result, product) => {
  if (!result[product.category]) {
    result[product.category] = [];
  }
  result[product.category].push(product.name);
  return result;
}, {});

console.log(groupedProducts);



