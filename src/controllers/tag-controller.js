const Tag = require('../models').tag;
const BlogTag = require('../models').blog_tag;
const ProductTag = require('../models').product_tag;
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

const addToBlog = asyncErrorHandler(async (req, res, next) => {
  const tags = req.body.tags;
  for (let tag of tags) {
    console.log(tag);
    await BlogTag.create({
      tagId: tag,
      blogId: req.params.id,
    });
  }
  return res.status(201).json({ msg: 'برچسب های مورد نظر اضافه شدند', tags });
});

const addToProduct = asyncErrorHandler(async (req, res, next) => {
  const tags = req.body.tags;
  for (let tag of tags) {
    console.log(tag);
    await ProductTag.create({
      tagId: tag,
      productId: req.params.id,
    });
    return res.status(201).json({ msg: 'برچسب های مورد نظر اضافه شدند', tags });
  }
});

module.exports = {
  findAll,
  create,
  remove,
  addToBlog,
  addToProduct,
};
