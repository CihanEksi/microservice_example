const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'company',
      default: null,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true, collection: 'customers' }
);

const Customer = mongoose.model('customers', customerSchema);

module.exports = Customer;
