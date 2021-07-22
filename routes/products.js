const express = require('express');
const { isLogin } = require('../controller/auth');
const { addProduct, getProducts } = require('../controller/products');

const router = express.Router();
router.get('/products', getProducts);
router.post('/product', isLogin, addProduct);

module.exports = router;
