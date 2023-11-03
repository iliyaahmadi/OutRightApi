const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashPassword = require('../utils/hashPass');
const User = require('../models').user;
const Cart = require('../models').cart;

const login = async (req, res) => {
  const email = req.body?.email;
  const password = req.body?.password;
  let user, validPass;
  if (email && password) {
    user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      validPass = await bcrypt.compare(password, user.password);
    } else {
      if (user === null || !validPass) {
        return res.status(401).json({
          accessToken: null,
          message: 'ایمیل یا پسوورد اشتباه است',
        });
      }
    }
  } else {
    return res
      .status(400)
      .json({ message: `لطفا ایمیل و پسوورد موردنظر را وارد کنید` });
  }
  if (user === null || !validPass) {
    return res.status(401).json({
      accessToken: null,
      message: 'ایمیل یا پسوورد اشتباه است',
    });
  }

  const token = jwt.sign(
    { id: user.id, role: user.roleId },
    process.env.JWT_SECRET
  );
  return res
    .cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    .status(200)
    .json({ message: 'شما با موفقیت وارد شدید' });
};

const signup = async (req, res) => {
  const dubEmail = await findByEmail(req.body.email);
  const dubNumber = await findByNumber(req.body.number);
  if (dubEmail) {
    return res.status(500).json({
      message: `کاربری بااین ایمیل قبلا ثبت نام کرده`,
    });
  } else if (dubNumber) {
    return res.status(500).json({
      message: `کاربری بااین شماره قبلا ثبت نام کرده`,
    });
  } else {
    const hashedPass = await hashPassword(req.body.password);
    const user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPass,
      number: req.body.number,
      profile: null,
      roleId: 1,
    });
    await Cart.create({ user_id: user.id });
    res.status(201).json({ message: 'حساب کاربری با موفقیت ساخته شد' });
  }
};

const logout = (req, res) => {
  return res
    .clearCookie('access_token')
    .status(200)
    .json({ message: 'با موفقیت از حساب حارج شدید' });
};

const findByEmail = async (email) => {
  const exists = await User.findOne({
    where: {
      email,
    },
  });
  console.log(exists);
  if (exists) {
    return true;
  } else {
    return false;
  }
};

const findByNumber = async (number) => {
  const exists = await User.findOne({
    where: {
      number,
    },
  });
  console.log(exists);
  if (exists) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  login,
  signup,
  logout,
};
