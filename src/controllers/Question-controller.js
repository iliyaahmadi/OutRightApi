const Product = require('../models').product;
const Question = require('../models').question;
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const findAll = asyncErrorHandler(async (req, res, next) => {
  const questions = await Question.findAll({
    attributes: [
      'id',
      'comment',
      'parent_id',
      'createdAt',
      'userId',
      'productId',
    ],
  });
  return res.status(200).json(questions);
});

const remove = asyncErrorHandler(async (req, res, next) => {
  const q_id = req.params.id;
  const u_id = req.userId;
  await Question.findOne({
    where: {
      id: q_id,
    },
  }).then(async (q) => {
    if (q.userId == u_id) {
      await q.destroy();
    }
  });
  return res.status(200).json({ message: 'پیام حذف شد' });
});

const removeByAdmin = asyncErrorHandler(async (req, res, next) => {
  const q_id = req.params.id;
  await Question.destroy({
    where: {
      id: q_id,
    },
  });
  return res.status(200).json({ message: 'پیام حذف شد' });
});

module.exports = {
  findAll,
  create,
  remove,
  removeByAdmin,
};
