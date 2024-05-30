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

    resolve('===== hello =====');

    logPromise('leave-timeout-callback', promise);
  }, 1000);
})
  .then(
    (value) => {
      logPromise('enter-then-1-onfulfilled', promise);
      console.log(value);
      logPromise('leave-then-1-onfulfilled', promise);

      return `=====${value}=====`;
    },
    (reason) => {
      logPromise('enter-then-1-onrejected', promise);
      console.log(reason);
      logPromise('leave-then-1-onrejected', promise);
    }
  )
  .then(
    (value) => {
      logPromise('enter-then-2-onfulfilled', promise);
      console.log(value);
      logPromise('leave-then-2-onfulfilled', promise);

      return `=====${value}=====`;
    },
    (reason) => {
      logPromise('enter-then-2-onrejected', promise);
      console.log(reason);
      logPromise('leave-then-2-onrejected', promise);
    }
  )
  .then(
    (value) => {
      logPromise('enter-then-3-onfulfilled', promise);
      console.log(value);
      logPromise('leave-then-3-onfulfilled', promise);

      return `=====${value}=====`;
    },
    (reason) => {
      logPromise('enter-then-3-onrejected', promise);
      console.log(reason);
      logPromise('leave-then-3-onrejected', promise);
    }
  );

logPromise('after-declaring-promise', promise);

setTimeout(() => logPromise('complete', promise), 2000);
