const Mongoose = require('./db');
const User = require('./user');
const Product = require('./product');

const orderSchema = Mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
});

const OrderModel = Mongoose.model('order', orderSchema);

async function getOrders() {
  const orders = await OrderModel.find();
  return orders;
}

async function getOrderOfUser(userId) {
  const orders = await OrderModel.find({ user: userId });
  return orders;
}

async function addOrder(userId, productId) {
  const user = await User.getUser(userId);
  const product = await Product.getProduct(productId);
  if (!user) throw (new Error('user not find'));
  if (!product) throw (new Error('product not find'));
  const result = new OrderModel({
    user: userId,
    product: productId,
  }).save();
  return result;
}

async function deleteOrder(id) {
  const order = await OrderModel.findById(id);
  const result = await order.remove();
  return result;
}

module.exports = {
  deleteOrder, getOrderOfUser, getOrders, addOrder,
};

// (async () => {
// //   console.log(await User.getUsers());
// //   console.log(await Product.getProducts());
//   await deleteOrder('60f976f481bae7377415d9d3');
//   const result = await getOrders();
//   console.log(result);
// })();
