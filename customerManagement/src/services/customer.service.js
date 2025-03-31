const { Customer } = require('../models');
const { CUSTOMER_PROJECTION } = require('../enums/customer.enums');
const { ObjectId } = require('mongoose').Types;
const companyService = require('./company.service');

const createValidation = async (customerData) => {
    const companyId = customerData.company;

    if (companyId) {
      await companyService.getCompanyById(companyId);
    }

    const customerExists = await Customer.findOne({ email: customerData.email }).lean();

    if (customerExists) {
        throw new Error('CUSTOMER_ALREADY_EXISTS');
    }

}

const createCustomer = async (customerData) => {
    await createValidation(customerData);
    const customer = new Customer(customerData);
    await customer.save();

    const customerObject = customer.toObject();

    return {
        customer: {
            customerId: customerObject._id,
            name: customerObject.name,
            email: customerObject.email,
        }
    }
};

const prepareCustomerFilter = (params) => {
    const {
        companyName,
        phone,
        email,
        id,
    } = params;

    const match = {};

    if (companyName) {
        match['company.name'] = { $regex: companyName, $options: 'i' };
    }
    
    if (phone) {
        match.phone = { $regex: phone, $options: 'i' };
    }
    
    if (email) {
        match.email = { $regex: email, $options: 'i' };
    }

    if (id) {
        match._id = new ObjectId(id);
    }

    return match;
}

const getCustomers = async (params) => {
    const {
        sortBy = 'createdAt',
        orderBy = 'desc',
        // companyName,
        // phone,
        // email,
        // id,
    } = params;

    let { page = 1, limit = 10 } = params;

    page = Number(page);
    limit = Number(limit);

    const lookups = [
        {
            $lookup: {
                from: 'company',
                localField: 'company',
                foreignField: '_id',
                as: 'company',
            }
        },
        { 
            $unwind: {
                path: '$company',
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $lookup: {
                from: 'notes',
                localField: '_id',
                foreignField: 'customerId',
                as: 'notes',
            }
        }
    ];

    const aggregate = [];
    const match = prepareCustomerFilter(params);
    const sort = {};
    const projection = CUSTOMER_PROJECTION.general;

    sort[sortBy] = orderBy === 'asc' ? 1 : -1;
    const skip = (page - 1) * limit;

    aggregate.push(...lookups);
    aggregate.push({ $match: match });
    aggregate.push({ $sort: sort });
    aggregate.push({ $project: projection });

    const countAggregate = [...aggregate, { $count: 'total' }];

    aggregate.push({ $skip: skip });
    aggregate.push({ $limit: limit });

    const customersPromise = Customer.aggregate(aggregate);
    const totalPromise = Customer.aggregate(countAggregate);

    const [customers, total] = await Promise.all([customersPromise, totalPromise]);
    const totalDocs = total.length ? total[0].total : 0;

    return {
        data: customers,
        pagination: {
            total: totalDocs,
            page: +page,
            limit: +limit,
            totalPage: Math.ceil(totalDocs / limit),
        },
    };
};

const updateManyCustomers = async (filter, updateData) => {
    if (!Object.keys(filter).length) {
        return
    }

    const customers = await Customer.updateMany(filter, updateData);
    return customers;
}

const updateCustomerValidation = async (id, updateData) => {
    if (!ObjectId.isValid(id)) {
        throw new Error('CUSTOMER_NOT_FOUND');
    }

    const customer = await Customer.findOne({ _id: id });

    if (!customer) {
        throw new Error('CUSTOMER_NOT_FOUND');
    }

    const company = updateData.company;

    if (company) {
        await companyService.getCompanyById(company);
    }

    return {
        customer,
    }
}

const updateCustomer = async (id, updateData) => {
    const validation = await updateCustomerValidation(id, updateData);

    const customer = validation.customer;

    Object.assign(customer, updateData);

    await customer.save();

    return customer;
};

const deleteCustomerValidation = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error('CUSTOMER_NOT_FOUND');
    }

    const customer = await Customer.findOne({ _id: id }).select("_id");

    if (!customer) {
        throw new Error('CUSTOMER_NOT_FOUND');
    }
}

const deleteCustomer = async (id) => {
    await deleteCustomerValidation(id);

    await Customer.deleteOne({ _id: id });

    return { message: 'Customer deleted successfully' };
}

const getCustomerById = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error('CUSTOMER_NOT_FOUND');
    }

    const customer = await Customer.findOne({ _id: id }).select(CUSTOMER_PROJECTION.general);

    if (!customer) {
        throw new Error('CUSTOMER_NOT_FOUND');
    }

    return customer;
}

module.exports = {
    createCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
    updateManyCustomers,
    getCustomerById,
};