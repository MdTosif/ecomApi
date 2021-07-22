const Mongoose = require('./db');

const productSchema = Mongoose.Schema({
  name: {
    type: String,
    Minlength: 5,
    Maxlength: 50,
  },
  price: {
    type: Number,
  },
});

const ProductModel = Mongoose.model('product', productSchema);

async function getProducts() {
  const products = await ProductModel.find();
  return products;
}

async function getProduct(id) {
  const products = await ProductModel.findById(id);
  return products;
}

async function addProduct(name, price) {
  const product = new ProductModel();
  product.name = name;
  product.price = price;
  const result = await product.save();
  return result;
}

async function updateProduct(id, name, price) {
//   const result = await ProductModel.findByIdAndUpdate(id, { name, price }, { rawResult: true });
  const product = await ProductModel.findById(id);
  product.name = name;
  product.price = price;
  const result = await product.save();
  return result;
}

async function deleteProduct(id) {
  const p = await ProductModel.findById(id);
  const result = await p.remove();
  return result;
}

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getProduct,
};

// (async () => {
//   await deleteProduct('60f92a367655dc3630d0aa6c');

//   console.log(await getProducts());
// })();
