const Tag = require('../models').tag;
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const findAll = asyncErrorHandler(async (req, res, next) => {
  await Tag.findAll().then((t) => {
    return res.status(200).json(t);
  });
});

const create = asyncErrorHandler(async (req, res, next) => {
  await Tag.create({
    name: req.body.name,
  }).then((t) => {
    return res.status(200).json({ msg: `${t} ساخته شد` });
  });
});

const remove = asyncErrorHandler(async (req, res, next) => {
  await Tag.destroy({
    where: { id: req.params.id },
  }).then((t) => {
    if (t) return res.status(200).json({ msg: `${t} پاک شد` });
    return res.status(200).json({ msg: `${t} با این ایدی پیدا نشد` });
  });
});

module.exports = {
  findAll,
  create,
  remove,
};
