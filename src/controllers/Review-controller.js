const Review = require('../models').review;
const ReviewLikes = require('../models').review_likes;
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

const like = asyncErrorHandler(async (req, res) => {
  let reviewId = req.params.id;
  let userId = req.userId;
  //we check if user liked it before
  const exists = await ReviewLikes.findOne({
    where: {
      userId: userId,
      reviewId: reviewId,
    },
  });
  if (exists) {
    //if already liked
    await ReviewLikes.destroy({
      where: {
        userId: userId,
        reviewId: reviewId,
      }, //track
    }).then(async () => {
      await Review.decrement('likes', {
        where: { id: reviewId },
      });
    });
    return res.status(200).json({ message: `لایک برداشته شد` });
  } else {
    //if was not liked before
    await ReviewLikes.create({
      userId: userId,
      reviewId: reviewId,
    }).then(async () => {
      await Review.increment('likes', {
        where: { id: reviewId },
      });
    });
    return res.status(200).json({ message: `لایک شد` });
  }
});
module.exports = {
  findAll,
  // create,
  remove,
  removeByAdmin,
  like,
  // dislike,
};
