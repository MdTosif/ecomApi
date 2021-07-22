const { addOrder, getOrderOfUser, getOrders } = require('../models/order');

exports.getOrders = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const order = await getOrderOfUser(userId);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.orderProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { userId } = req.user;
    const order = await addOrder(userId, productId);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.viewOrders = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    if (isAdmin) {
      const order = await getOrders();
      res.json(order);
    } else throw new Error('You are not admin');
  } catch (error) {
    next(error);
  }
};
