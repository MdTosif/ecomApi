const express = require('express');
const { isLogin } = require('../controller/auth');
const { orderProduct, getOrders, viewOrders } = require('../controller/orders');

const routes = express.Router();

routes.get('/order', isLogin, getOrders);

routes.get('/order/:productId', isLogin, orderProduct);

routes.get('/orders', isLogin, viewOrders);

module.exports = routes;
