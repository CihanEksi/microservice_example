const CUSTOMER_PROJECTION = Object.freeze({
    general: {
        customerId: '$_id',
        name: 1,
        email: 1,
        phone: 1,
        company: {
            _id: 1,
            name: 1
        },
        createdAt: 1,
        notes: {
            _id: 1,
            note: 1,
            createdAt:1,
            customerNoteId: '$_id'
        }
    }
});

module.exports = {
    CUSTOMER_PROJECTION
};