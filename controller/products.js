const { getProducts, addProduct } = require('../models/product');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    const { name, price } = req.body;
    if (isAdmin) {
      const product = await addProduct(name, price);
      res.json(product);
    } else throw new Error('you are not admin');
  } catch (error) {
    next(error);
  }
};
