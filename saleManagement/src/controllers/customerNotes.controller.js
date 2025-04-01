const customerNoteService = require('../services/customerNote.service.js');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');

const createCustomerNote = asyncHandler(async (req, res) => {
  const customerId = req.params.customerId;
  const data = req.body;
  const note = await customerNoteService.createCustomerNote(customerId, data.note);
  res.status(201).json({
    note: {
      _id: note._id,
      note: note.note,
      noteId: note._id
    }
  });
});

const deleteCustomerNote = asyncHandler(async (req, res) => {
  const { customerNoteId } = req.params;
  await customerNoteService.deleteCustomerNote(customerNoteId);
  res.status(204).json();
});

const updateCustomerNote = asyncHandler(async (req, res) => {
  const { customerNoteId } = req.params;
  const data = req.body;
  await customerNoteService.updateCustomerNote(customerNoteId,data);
  res.status(204).json();
});

module.exports = {
  createCustomerNote,
  deleteCustomerNote,
  updateCustomerNote,
};
