const { User } = require('../models');
const { USER_PROJECTION } = require('../enums/user.enums');


const getAllUsers = async (params) => {
    const {
        sortBy = 'createdAt',
        orderBy = 'desc',
        keyword,
    } = params;
    
    let { page = 1, limit = 10 } = params;
    
    page = Number(page);
    limit = Number(limit);

    const aggregate = [];
    const match = {};
    const sort = {};
    const projection = USER_PROJECTION.general;

    if (keyword) {
        match.$or = [
            { name: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } },
        ];
    }
    
    sort[sortBy] = orderBy === 'asc' ? 1 : -1;
    const skip = (page - 1) * limit;
    
    aggregate.push({ $match: match });
    aggregate.push({ $sort: sort });
    aggregate.push({ $project: projection });
    
    const countAggregate = [...aggregate, { $count: 'total' }];
    
    aggregate.push({ $skip: skip });
    aggregate.push({ $limit: limit });

    const usersPromise =  User.aggregate(aggregate);
    const totalPromise =  User.aggregate(countAggregate);

    const [users, total] = await Promise.all([usersPromise, totalPromise]);
    const totalDocs = total.length ? total[0].total : 0;

    return {
        data: users,
        pagination: {
            total: totalDocs,
            page: +page,
            limit: +limit,
            totalPage: Math.ceil(totalDocs / limit),
        },
    };
};

module.exports = {
    getAllUsers,
};