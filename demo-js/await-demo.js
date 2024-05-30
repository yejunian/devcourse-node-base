async function f() {
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('111'), 1000);
  });
  const result1 = await promise1;

  console.log(result1);

  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${result1} 222`), 1000);
  });
  const result2 = await promise2;

  console.log(result2);

  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${result2} 333`), 1000);
  });
  const result3 = await promise3;

  console.log(result3);
}

f();
