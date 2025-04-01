const errorCodes = require('./mergedErrors.errors');

const errorHandler = (err, req, res, next) => {
    console.log(err, 'error123');
    const errorCode = err.message;
    const error = errorCodes?.[errorCode];
    const errorMessage = error?.message || "Internal Server Error";
    const status = error?.status || 500;

    return res.status(400).json({
        message: errorMessage
    });
}

module.exports = errorHandler;