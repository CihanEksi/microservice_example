const customerManagement = require('../invokers/customerManagement.invoker.js');
const { SALE_STATUS } = require('../enums/sale.enums.js');
const { pool } = require('../database/mysql.database.js');

const SaleQuery = 'INSERT INTO sales (customerId, totalAmount,status) VALUES (?, ?, ?)';
const saleLogsQuery = 'INSERT INTO sale_logs (status, customerId, totalAmount,saleId) VALUES (?, ?, ?, ?)';
const notesQuery = 'INSERT INTO notes (saleId, status, note, date,saleStatus) VALUES (?, ?, ?, ?, ?)';

const saleCreateValidation = async (data, token) => {
    const {
        customerId,
    } = data;
    await customerManagement.getCustomerById(token, customerId);
};

const createSale = async (data, token) => {
    const {
        customerId,
        totalAmount = null,
        note,
        date,
    } = data;

    await saleCreateValidation(data, token);

    connection = await pool.getConnection();

    const SaleValues = [customerId, totalAmount, SALE_STATUS.new];

    await connection.beginTransaction();

    const response = {};

    try {
        const [saleResult] = await connection.query(SaleQuery, SaleValues);
        const saleId = saleResult.insertId;
        response.saleId = saleId;

        const saleLogsValues = [SALE_STATUS.new, customerId, totalAmount, saleId];
        const [saleLogResult] = await connection.query(saleLogsQuery, saleLogsValues);

        if (note || date) {
            const noteValues = [saleId, SALE_STATUS.new, note, date, SALE_STATUS.new];
            await connection.query(notesQuery, noteValues);
        }

        await connection.commit();
    }
    catch (error) {
        await connection.rollback();
        console.error('createSale failed:', error);
        throw new Error('SALE_CREATE_FAILED');
    }
    finally {
        connection.release();
    }


    return response;
};

const getSaleById = async (saleId) => {
    connection = await pool.getConnection();

    const [sale] = await connection.query('SELECT * FROM sales WHERE _id = ?', [saleId]);

    connection.release();

    if (!sale.length) {
        throw new Error('SALE_NOT_FOUND');
    }

    return sale[0];
};

const updateSale = async (saleId, data) => {
    const {
        totalAmount,
        note,
        date,
    } = data;
    const query = "UPDATE sales SET totalAmount = ?, status = ? WHERE _id = ?";

    const sale = await getSaleById(saleId);

    const status = data.status || sale.status;

    connection = await pool.getConnection();

    await connection.beginTransaction();

    try {
        const values = [totalAmount, status, saleId];
        connection.query(query, values);

        const logValues = [status, sale.customerId, totalAmount, saleId];
        await connection.query(saleLogsQuery, logValues);

        if (note || date) {
            const noteValues = [saleId, status, note, date, status];
            await connection.query(notesQuery, noteValues);
        }

        await connection.commit();
    }
    catch (error) {
        await connection.rollback();
        console.error('updateSale failed:', error);
        throw new Error('SALE_UPDATE_FAILED');
    }
    finally {
        connection.release();
    }

};

const list = async (params) => {
    let { page = 1, limit = 10, saleId } = params;
    page = Number(page);
    limit = Number(limit);
    const offset = (page - 1) * limit;
    let query = "SELECT sale_management.sales.`_id`, sale_management.sales.`_id` AS saleId, sales.status,sales.totalAmount FROM sales ";
    const saleQueryValues = [];
    if (saleId) {
        query += " WHERE sales._id = ? ";
        saleQueryValues.push(saleId);
    }

    query += " ORDER BY sales.createdAt DESC LIMIT ?, ? ";
    saleQueryValues.push(offset, limit);

    connection = await pool.getConnection();

    const [sales] = await connection.query(query, saleQueryValues);
    const salesIds = sales.map(sale => sale._id);

    const notesQuery = 'SELECT _id,note,date,createdAt,saleId,saleStatus FROM notes WHERE saleId IN (?)'
    const saleLogsQuery = 'SELECT _id,status,totalAmount,createdAt,saleId FROM sale_logs WHERE saleId IN (?)'

    const countSales = 'SELECT COUNT(*) as count FROM sales';

    const notesPromise = connection.query(notesQuery, [salesIds]);
    const saleLogsPromise = connection.query(saleLogsQuery, [salesIds]);
    const countPromise = connection.query(countSales);

    const [notes, saleLogs, count] = await Promise.all([notesPromise, saleLogsPromise, countPromise]);

    connection.release();

    sales.forEach(sale => {
        sale.notes = notes.at(0).filter(note => note.saleId === sale._id);
        sale.saleLogs = saleLogs.at(0).filter(log => log.saleId === sale._id);
    });

    const totalNumber = count[0]?.at(0)?.count || 0;

    return {
        sales,
        pagination: {
            total: totalNumber,
            page: page,
            limit: limit,
            totalPage: Math.ceil(totalNumber / limit),
        },
    }
};

module.exports = {
    createSale,
    updateSale,
    getSaleById,
    list,
};