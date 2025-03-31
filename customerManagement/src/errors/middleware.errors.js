
const errorCodes = require('./mergedErrors.errors');

const middlewareError = (errorCode, res) => {
  const errorGet = errorCodes[errorCode] || errorCodes["UNKNOWN_ERROR"];

  res.status(errorGet.status || 500).send(errorGet);
};

module.exports = middlewareError;