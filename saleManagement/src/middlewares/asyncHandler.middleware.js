const errorHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res);
        } catch (err) {
            next(err); 
        }
    };
};

module.exports = errorHandler;