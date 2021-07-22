const jwt = require('jsonwebtoken');
const user = require('../models/user');

const secret = 'lol';

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const authUser = await user.getUserByUsername(username);
    if (authUser && (password === authUser.password)) {
      const token = await jwt.sign({ userId: authUser.id, isAdmin: authUser.isAdmin }, secret, {
        expiresIn: '1d',
      });
      res.cookie('jwt', token);
      res.json({ token });
    } else throw new Error('password invalid');
  } catch (error) {
    next(error);
  }
};
exports.signup = async (req, res, next) => {
  try {
    const { body } = req;
    body.isAdmin = false;
    await user.addUser(body);
    next();
  } catch (error) {
    next(error);
  }
};

exports.isLogin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    await jwt.verify(token, secret);
    req.user = jwt.decode(token);
    next();
  } catch (error) {
    next(error);
  }
};
// exports.updateUser = () => {};
// exports.deleteUser = () => {};
