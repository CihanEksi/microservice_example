const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, collection: 'company' }
);

const Company = mongoose.model('company', companySchema);

module.exports = Company;