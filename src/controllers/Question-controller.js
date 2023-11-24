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

const create = asyncErrorHandler(async (req, res, next) => {
  const parentId = req.body.parentId;
  if (parentId) {
    await Question.findOne({ where: { parent_id: parentId } }).then(
      async () => {
        await Question.create({
          comment: req.body.comment,
          parent_id: parentId,
          userId: req.userId,
          productId: req.body.productId,
        }).then((r) => {
          return res
            .status(201)
            .json({ message: 'ریپلای شما فرستاده شد', reply: r });
        });
      }
    );
  } else {
    await Question.create({
      comment: req.body.comment,
      parent_id: null,
      userId: req.userId,
      productId: req.body.productId,
    }).then((q) => {
      return res
        .status(201)
        .json({ message: 'سوال شما فرستاده شد', question: q });
    });
  }
});

const remove = asyncErrorHandler(async (req, res, next) => {
  const q_id = req.params.id;
  const u_id = req.userId;
  const question = await Question.findOne({
    where: {
      id: q_id,
    },
  });
  if (question) {
    if (question.userId == u_id) {
      await question.destroy();
      return res.status(200).json({ message: 'پیام حذف شد' });
    } else {
      return res
        .status(400)
        .json({ message: 'شما دسترسی به حذف پیام دیگران ندارید ' });
    }
  } else {
    return res.status(400).json({ message: 'پیامی با این ایدی وجود ندارد ' });
  }
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
