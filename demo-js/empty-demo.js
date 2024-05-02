const emptyObject = {};
const notEmptyObject = { key: 'value' };

const emptyObjectKeys = Object.keys(emptyObject);
const notEmptyObjectKeys = Object.keys(notEmptyObject);

console.log(emptyObjectKeys.length, emptyObjectKeys); // 0 []
console.log(notEmptyObjectKeys.length, notEmptyObjectKeys); // 1 [ 'key' ]

const num = 123;
const emptyString = '';
const str = 'zero';

console.log(Object.keys(num)); // []
console.log(Object.keys(emptyString)); // []
console.log(Object.keys(str)); // [ '0', '1', '2', '3' ]

function isEmpty(obj) {
  if (obj instanceof Object) {
    return Object.keys(obj).length === 0;

    // 또는
    // for (key in obj) {
    //   return false;
    // }
    // return true;
  }

  throw new TypeError();
}

console.log(isEmpty(emptyObject)); // true
console.log(isEmpty(notEmptyObject)); // false
