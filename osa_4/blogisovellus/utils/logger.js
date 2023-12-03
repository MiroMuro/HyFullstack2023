const clog = (...x) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...x);
  }
};

const error = (...x) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...x);
  }
};

module.exports = { clog, error };
