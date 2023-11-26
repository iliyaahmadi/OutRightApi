const Blog = require('../models').blog;
const Section = require('../models').section;
const SectionImg = require('../models').sectionImg;
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const findAll = asyncErrorHandler(async (req, res, next) => {
  const blogs = await Blog.findAll({
    attributes: ['id', 'title', 'slug', 'thumb', 'author', 'createdAt'],
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
    include: [{ model: Section, include: [SectionImg] }],
  }).then((blog) => {
    return res.status(200).json(blog);
  });
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
  ).then(() => {
    return res.status(200).json({
      message: ` پست با مشخصات داده شده تغییر کرد`,
    });
  });
});

const remove = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  Blog.destroy({
    where: {
      id: id,
    },
    cascade: true,
  }).then((b) => {
    if (b) {
      return res
        .status(200)
        .json({ message: `بلاگ مورد نظر با این آیدی پاک شد ${id}` });
    } else {
      return res.status(200).json({ message: `بلاگی با این ایدی وجود ندارد` });
    }
  });
});

const addSection = asyncErrorHandler(async (req, res, next) => {
  await Section.create({
    title: req.body.title,
    desc: req.body.desc,
    blogId: req.params.id,
  }).then(() => {
    return res.status(201).json({ message: `قسمت اضافه شد` });
  });
});

const editSection = asyncErrorHandler(async (req, res, next) => {
  const target = await Section.findOne({
    where: {
      id: req.params.id,
    },
  });
  await Section.update(
    {
      title: req.body.title ?? target.title,
      desc: req.body.desc ?? target.desc,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(() => {
    return res.status(200).json({
      message: ` قسمت با مشخصات داده شده تغییر کرد`,
    });
  });
});
const removeSection = asyncErrorHandler(async (req, res, next) => {
  await Section.destroy({
    where: { id: req.params.id },
  }).then((s) => {
    if (s) return res.status(200).json({ message: `قسمت مورد نظر پاک شد` });
    return res.status(200).json({ message: `قسمتی با این ایدی وجود ندارد` });
  });
});
const addImage = asyncErrorHandler(async (req, res, next) => {
  await SectionImg.create({
    url: req.body.url,
    sectionId: req.params.id,
  }).then(() => {
    return res.status(201).json({ message: `عکس اضافه شد` });
  });
});
const removeImage = asyncErrorHandler(async (req, res, next) => {
  await SectionImg.destroy({
    where: { id: req.params.id },
  }).then((s) => {
    if (s) return res.status(200).json({ message: `عکس مورد نظر پاک شد` });
    return res.status(200).json({ message: `عکسی با این ایدی وجود ندارد` });
  });
});

module.exports = {
  findAll,
  findById,
  create,
  edit,
  remove,
  addSection,
  editSection,
  removeSection,
  addImage,
  removeImage,
};
