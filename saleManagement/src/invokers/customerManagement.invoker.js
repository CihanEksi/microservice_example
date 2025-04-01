const axios = require('axios');
const serviceUrl = process.env.GATEWAY_URL + "/customer-management/api"

const invoker = async (method, url, data, headers) => {
    try {
        const response = await axios({
            method,
            url,
            data,
            headers
        });
        return response.data;
    } catch (error) {
        const status = error.status

        console.warn(error.response.data);
        throw new Error('SOMETHING_WENT_WRONG');
    }
}

const customerList = async (token, query={}) => {
    let url = `${serviceUrl}/customer/list`;
    
    if (Object.keys(query).length > 0) {
        url += '?';
        for (const key in query) {
            url += `${key}=${query[key]}&`;
        }
        url = url.slice(0, -1);
    }

    const response = await invoker('get', url, null, { Authorization: `Bearer ${token}` });
    return response;
}

const getCustomerById = async (token, id) => {
    const list = await customerList(token, { id });
    const data = list.data;
    if (data.length === 0) {
        throw new Error('CUSTOMER_NOT_FOUND');
    } 
    return list.data.at(0);
}

module.exports = {
    customerList,
    getCustomerById,
}
