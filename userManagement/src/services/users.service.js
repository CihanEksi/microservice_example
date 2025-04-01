const { User } = require('../models');
const { USER_PROJECTION } = require('../enums/user.enums');
const { ObjectId } = require('mongoose').Types;

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

    const usersPromise = User.aggregate(aggregate);
    const totalPromise = User.aggregate(countAggregate);

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

const getUserById = async (userId) => {
    if (!ObjectId.isValid(userId)) {
        throw new Error('USER_NOT_FOUND');
    }

    const user = await User.findOne({ _id: userId }).select(USER_PROJECTION.general);

    if (!user) {
        throw new Error('USER_NOT_FOUND');
    }

    return user;
}

const updateUserValidation = async (userId, updateData) => {
    if (!ObjectId.isValid(userId)) {
        throw new Error('USER_NOT_FOUND');
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
        throw new Error('USER_NOT_FOUND');
    }

    const userWithEmail = await User.findOne({ email: updateData.email });

    if (userWithEmail && `${userWithEmail._id}` !== `${userId}`) {
        throw new Error('USER_ALREADY_EXISTS');
    }

    return {
        user
    }
}


const updateUser = async (userId, updateData) => {
    const { user } = await updateUserValidation(userId, updateData);

    Object.assign(user, updateData);

    await user.save();

    return user;
};

const deleteUserValidation = async (userId) => {
    if (!ObjectId.isValid(userId)) {
        throw new Error('USER_NOT_FOUND');
    }

    const user = await User.findOne({ _id: userId }).select("_id");

    if (!user) {
        throw new Error('USER_NOT_FOUND');
    }
}

const deleteUser = async (userId) => {
    await deleteUserValidation(userId);

    await User.deleteOne({ _id: userId });

    return { message: 'User deleted successfully' };
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};