const createLogger = () => {
  const begin = Date.now();
  let i = 1;

  return (...content) => {
    console.log(((Date.now() - begin) / 1000).toFixed(3), i++, ...content);
  };
};

const logPromise = createLogger();

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    logPromise('enter-timeout-callback', promise);

    resolve('hello');

    logPromise('leave-timeout-callback', promise);
  }, 1000);
});

logPromise('after-declaring-promise', promise);

promise.then(
  (value) => {
    logPromise('enter-then-onfulfilled', promise);
    console.log(value);
    logPromise('leave-then-onfulfilled', promise);
  },
  (reason) => {
    logPromise('enter-then-onrejected', promise);
    console.log(reason);
    logPromise('leave-then-onrejected', promise);
  }
);

logPromise('after-add-then', promise);
