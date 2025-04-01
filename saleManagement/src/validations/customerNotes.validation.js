const Joi = require('joi');

const createCustomerNote = Joi.object({
    params: Joi.object().keys({
        customerId: Joi.string().required()
    }),
    body: Joi.object({
        note: Joi.string().required(),
    })
});

const updateCustomerNote = Joi.object({
    params: Joi.object().keys({
        customerNoteId: Joi.string().required()
    }),
    body: Joi.object().keys({
        note: Joi.string().required(),
    })
});

const deleteCustomerNote = Joi.object({
    params: Joi.object().keys({
        customerNoteId: Joi.string().required()
    })
});

module.exports = {
    createCustomerNote,
    updateCustomerNote,
    deleteCustomerNote
};
