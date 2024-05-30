async function f() {
  return 'hello';
}

f().then(
  (value) => {
    console.log(`[f] resolved: ${value}`);
  },
  (reason) => {
    console.log(`[f] rejected: ${reason}`);
  }
);

async function g() {
  throw 'bye';
}

g().then(
  (value) => {
    console.log(`[g] resolved: ${value}`);
  },
  (reason) => {
    console.log(`[g] rejected: ${reason}`);
  }
);
