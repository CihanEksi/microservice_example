const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 2999;

const userManagementUrl = process.env.USER_MANAGEMENT_URL
const customerManagementUrl = process.env.CUSTOMER_MANAGEMENT_URL
const saleManagementUrl = process.env.SALE_MANAGEMENT_URL

console.log('userManagementUrl', userManagementUrl);
console.log('customerManagementUrl', customerManagementUrl);
console.log('saleManagementUrl', saleManagementUrl);

const userManagementProxy = createProxyMiddleware({
  target: userManagementUrl,
  changeOrigin: true,
  pathRewrite: { '^/user-management': '' },
});

const customerManagementProxy = createProxyMiddleware({
  target: customerManagementUrl,
  changeOrigin: true,
  pathRewrite: { '^/customer-management': '' },
});

const saleManagementProxy = createProxyMiddleware({
  target: saleManagementUrl,
  changeOrigin: true,
  pathRewrite: { '^/sale-management': '' },
});


app.use('/user-management', userManagementProxy);
app.use('/customer-management', customerManagementProxy);
app.use('/sale-management', saleManagementProxy);



app.listen(port, () => {
  console.log(`Gateway Server is running on port ${port}`);
});