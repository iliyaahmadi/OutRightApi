const User = require('../models').user;
const Role = require('../models').role;
const isUUID = require('is-uuid');
const fs = require('fs');

const findAll = async (req, res) => {
  const users = await User.findAll({
    attributes: [
      'id',
      'firstname',
      'lastname',
      'email',
      'number',
      'profile',
      'createdAt',
    ],
    include: Role,
  });
  res.status(200).json(users);
};

const findById = async (req, res) => {
  const valid = isUUID.v4(req.params.id);
  if (!valid) {
    return res.status(404).json({ message: 'کاربری با این آیدی وجود ندارد' });
  } else if (req.userRole === 1 && req.userId === req.params.id) {
    await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        'firstname',
        'lastname',
        'email',
        'number',
        'profile',
        'birthday',
        'createdAt',
      ],
    })
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: err });
      });
  } else if (req.userRole === 3) {
    await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        'firstname',
        'lastname',
        'email',
        'number',
        'profile',
        'birthday',
        'createdAt',
      ],
    })
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: err });
      });
  } else {
    return res
      .status(500)
      .json({ message: 'عدم دسترسی به اکانت سایر کاربر ها' });
  }
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

const create = async (req, res) => {
  console.log('ساخت اکانت به صورت دستی قعال نمیباشد');
  return res
    .status(500)
    .json({ message: 'ساخت اکانت به صورت دستی قعال نمیباشد ' });
  // const dubEmail = await findByEmail(req.body.email);
  // const dubNumber = await findByNumber(req.body.number);
  // if (dubEmail) {
  //   return res.status(500).json({
  //     message: `کاربری بااین ایمیل قبلا ثبت نام کرده`,
  //   });
  // } else if (dubNumber) {
  //   return res.status(500).json({
  //     message: `کاربری بااین شماره قبلا ثبت نام کرده`,
  //   });
  // }
  // const hashedPass = await hashPassword(req.body.password);
  // await User.create({
  //   firstname: req.body.firstname,
  //   lastname: req.body.lastname,
  //   email: req.body.email,
  //   password: hashedPass,
  //   number: req.body.number,
  //   profile: null,
  //   roldId: 1,
  // });
  // res.status(201).json({
  //   message: `حساب کاربری با موفقیت ساخته شد`,
  // });
};

const edit = async (req, res) => {
  const target = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  await User.update(
    {
      firstname: req.body.firstname ?? target.firstname,
      lastname: req.body.lastname ?? target.lastname,
      birthday: req.body.birthday ?? target.birthday,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(200).json({
    message: ` حساب با مشخصات داده شده تغییر کرد`,
  });
};

const remove = async (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res
        .status(200)
        .json({ message: `یوزر مورد نظر با این آیدی پاک شد ${id}` });
      return;
    })
    .catch((err) => {
      res.status(400).json({ message: err });
      console.log(err);
      return;
    });
};

const updateUserRole = async (req, res) => {
  let id = req.params.id;
  let roleId = req.body.role;
  if (roleId === 'user') {
    roleId = 1;
  } else if (roleId === 'blogger') {
    roleId = 2;
  } else if (roleId === 'admin') {
    roleId = 3;
  } else {
    res.status(400).json({ message: `نقش نامعتبر`, roleId });
  }
  User.update(
    { roldId: roleId },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      res.status(200).json({ message: `نقش تغییر کرد` });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
      console.log(err);
      return;
    });
};

const uploadProfile = async (req, res) => {
  if (req.file) {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
      attributes: ['profile'],
    });
    if (user.profile) {
      fs.unlink(user.profile, (err) => {
        if (err) throw new Error(err);
      });
    }
    await User.update(
      {
        profile: req.file.path,
      },
      {
        where: {
          id: req.userId,
        },
      }
    );
    return res.status(200).json({ message: 'عکس آپلود شد' });
  } else {
    return res
      .status(200)
      .json({ message: 'لطفا یک عکس با فرمت jpg/jpeg/png انتخاب کتید' });
  }
};

const getProfile = async (req, res) => {
  try {
    console.log('--------------------------------');
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });
    console.log(user);
    if (user.profile) {
      let path = __basedir.replace(/\\src/, '//');
      return res.sendFile(path + user.profile);
    }
    return res.status(404).json({ msg: 'عکسی پیدا نشد' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

module.exports = {
  findById,
  create,
  edit,
  remove,
  findAll,
  updateUserRole,
  uploadProfile,
  getProfile,
};
