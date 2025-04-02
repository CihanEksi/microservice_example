const axios = require('axios');
const serviceUrl = process.env.GATEWAY_URL

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
        if (status === 401) {
            throw new Error('AUTH_FAILED');
        }
        console.warn(error.response.data);
        throw new Error('SOMETHING_WENT_WRONG');
    }
}

const jwtCheck = async (token) => {
    const url = `${serviceUrl}/user-management/api/auth/jwt`;
    console.log('url',
        url
    );
    const user = await invoker('get', url, null, { Authorization: `Bearer ${token}`});
    return user;
}

module.exports = {
    jwtCheck
}
