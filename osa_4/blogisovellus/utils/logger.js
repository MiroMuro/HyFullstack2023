const clog = (...x) => {
  console.log(...x);
};

const error = (...x) => {
  console.error(...x);
};

module.exports = { clog, error };
