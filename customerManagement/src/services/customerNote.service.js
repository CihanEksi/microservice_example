const { Notes } = require('../models');
const customerService = require('./customer.service');
const { ObjectId } = require('mongoose').Types;

const createCustomerNoteValidation = async (customerId, note) => {
    const customer = await customerService.getCustomerById(customerId);
    return {
        customer,
    }
}

const createCustomerNote = async (customerId, note) => {
    await createCustomerNoteValidation(customerId);

    const customerNote = await Notes.create({
        customerId,
        note: note.trim(),
    });

    return customerNote;
}

const getCustomerNoteById = async (noteId) => {
    if (!ObjectId.isValid(noteId)) {
        throw new Error('NOTE_NOT_FOUND');
    }
    
    const note = await Notes.findOne({ _id: noteId }).lean();
    
    if (!note) {
        throw new Error('NOTE_NOT_FOUND');
    }

    return note;
}

const deleteCustomerNote = async (noteId) => {
    const note = await getCustomerNoteById(noteId);
    await Notes.deleteOne({ _id: noteId });
    return note;
}

const updateCustomerNote = async (noteId, data) => {
    const note = await getCustomerNoteById(noteId);
    await Notes.updateOne({ _id: note._id }, data);
}


module.exports = {
    createCustomerNote,
    getCustomerNoteById,
    deleteCustomerNote,
    updateCustomerNote,
};