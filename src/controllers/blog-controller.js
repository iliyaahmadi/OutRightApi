const Blog = require('../models').blog;
const Section = require('../models').section;
const SectionImg = require('../models').sectionImg;
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const findAll = asyncErrorHandler(async (req, res, next) => {
  const blogs = await Blog.findAll({
    attributes: [
      'id',
      'title',
      'slug',
      'thumb',
      'author',
      'createdAt',
      'updatedAt',
    ],
    include: [{ model: Section, include: [SectionImg] }],
  });
  res.status(200).json(blogs);
});

const findById = asyncErrorHandler(async (req, res, next) => {
  await Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'title',
      'slug',
      'thumb',
      'author',
      'createdAt',
      'updatedAt',
    ],
  })
    .then((blog) => {
      return res.status(200).json(blog);
    })
});

const create = asyncErrorHandler(async (req, res, next) => {
  await Blog.create({
    title: req.body.title,
    slug: req.body.slug,
    thumb: req.body.thumb,
    author: req.body.author ?? 'ادمین',
  });
  res.status(201).json({
    message: `پست شما با موفقیت ساخته شد`,
  });
});

const edit = asyncErrorHandler(async (req, res, next) => {
  const target = await Blog.findOne({
    where: {
      id: req.params.id,
    },
  });
  await Blog.update(
    {
      title: req.body.title ?? target.title,
      slug: req.body.slug ?? target.slug,
      thumb: req.body.thumb ?? target.thumb,
      author: req.body.author ?? target.author,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(200).json({
    message: ` پست با مشخصات داده شده تغییر کرد`,
  });
});

const remove = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  Blog.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res
        .status(200)
        .json({ message: `پست مورد نظر با این آیدی پاک شد ${id}` });
      return;
    })
});

module.exports = {
  findAll,
  findById,
  create,
  edit,
  remove,
};
