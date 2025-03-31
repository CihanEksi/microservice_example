const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customers',
            required: true,
        },
        note: {
            type: String,
            trim: true,
            default: '',
        },
    },
    { timestamps: true, collection: 'notes' }
);

const Notes = mongoose.model('notes', notesSchema);

module.exports = Notes;