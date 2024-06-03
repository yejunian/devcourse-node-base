const error = new Error('에러입니다');
const syntaxError = new SyntaxError('문법 에러입니다');
const referenceError = new ReferenceError('참조 에러입니다');

console.log(error.name);
console.log(error.message);
console.log(error.stack);

console.log(syntaxError.name, syntaxError.message);
console.log(referenceError.name, referenceError.message);
