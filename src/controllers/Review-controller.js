const Product = require('../models').product;
const Review = require('../models').review;
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const findAll = asyncErrorHandler(async (req, res, next) => {
  const reviews = await Review.findAll({
    attributes: [
      'id',
      'comment',
      'likes',
      'dislikes',
      'userId',
      'createdAt',
      'userId',
      'productId',
    ],
  });
  return res.status(200).json(reviews);
});

const remove = asyncErrorHandler(async (req, res, next) => {
  const r_id = req.params.id;
  const u_id = req.userId;
  await Review.findOne({
    where: {
      id: r_id,
    },
  }).then(async (r) => {
    if (r.userId == u_id) {
      await r.destroy();
    }
  });
  return res.status(200).json({ message: 'پیام حذف شد' });
});

const removeByAdmin = asyncErrorHandler(async (req, res, next) => {
  const r_id = req.params.id;
  await Review.destroy({
    where: {
      id: r_id,
    },
  });
  return res.status(200).json({ message: 'پیام حذف شد' });
});


module.exports = {
  findAll,
  create,
  remove,
  removeByAdmin,
  like,
  dislike,
};
