/* eslint-disable no-console */
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json({ error: err.message });
});

app.listen(3000, () => {
  console.log('app is running yayyyyy');
});
