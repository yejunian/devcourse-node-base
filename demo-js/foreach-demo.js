function testArrayForEach() {
  console.log('** Array.prototype.forEach() **');

  const arr = ['a', 'b', 'c', 'd', 'e'];

  arr.forEach((...args) => {
    console.log(args);
  });
}

function testMapForEach() {
  console.log('** Map.prototype.forEach() **');

  const map = new Map([
    [4, '제곱'],
    [16, '네제곱'],
    [8, '세제곱'],
  ]);

  map.forEach((...args) => {
    console.log(args);
  });
}

testArrayForEach();
testMapForEach();
