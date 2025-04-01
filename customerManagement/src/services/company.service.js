const { Company } = require('../models');
const customerService = require('./customer.service');
const { ObjectId } = require('mongoose').Types;

async function createCompany(data) {
  const userExists = await Company.findOne({ name: data.name }).lean();

  if (userExists) {
    throw new Error('COMPANY_ALREADY_EXISTS');
  }

  const company = new Company(data);
  await company.save();

  const companyObject = company.toObject();

  return {
    company: {
      _id: companyObject._id,
      companyId: companyObject._id,
      name: companyObject.name,
    }
  }
}

const deleteCompany = async (companyId) => {
  const company = await Company.findOne({ _id: companyId }).lean();

  if (!company) {
    throw new Error('COMPANY_NOT_FOUND');
  }

  await Company.deleteOne({ _id: companyId });
  await customerService.updateManyCustomers({ company: companyId }, { company: null });
};

const list = async ({ page = 1, limit = 10, id }) => {
  page = Number(page);
  limit = Number(limit);
  const filter = {};

  if (id) {
    filter._id = new ObjectId(id);
  }

  const companies = await Company.find(filter)
    .select({
      _id: 1,
      name: 1,
      companyId: '$_id',
    })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
  
  const total = await Company.countDocuments(filter);

  return {
    companies,
    pagination: {
        "total": total,
        "page": page,
        "limit": limit,
        "totalPage": Math.ceil(total / limit)
    }
  }
};

const getCompanyById = async (companyId) => {
  const listData = await list({ id: companyId });

  if (listData.length === 0) {
    throw new Error('COMPANY_NOT_FOUND');
  }
  
  return listData[0];
}


module.exports = {
  createCompany,
  deleteCompany,
  list,
  getCompanyById,
};
