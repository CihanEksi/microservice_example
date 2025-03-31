const {
  returnObjectIfValue
} = require('../utils/object.utils');

const validator = (schema) => {
  return (req, res, next) => {
    const merged = {
    }
    
    if (returnObjectIfValue(req.params)) {
      merged.params = req.params;
    }

    if (returnObjectIfValue(req.query)) {
      merged.query = req.query;
    }

    if (returnObjectIfValue(req.body)) {
      merged.body = req.body;
    }

    const { error } = schema.validate(merged, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ errors });
    }
    
    next();
  };
};

module.exports = validator;
