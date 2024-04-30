const arr = ['a', 'b', 'c', 'd', 'e'];

const forEachArr = arr.forEach((value) => {
  return `forEach-${value}`;
});

const mapArr = arr.map((value) => {
  return `map-${value}`;
});

console.log(arr); // [ 'a', 'b', 'c', 'd', 'e' ]
console.log(forEachArr); // undefined
console.log(mapArr); // [ 'map-a', 'map-b', 'map-c', 'map-d', 'map-e' ]
