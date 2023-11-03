const Blog = require('../models').blog;
const fs = require('fs');

const findAll = async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'id',
      'title',
      'slug',
      'banner',
      'body',
      'author',
      'createdAt',
      'updatedAt',
    ],
  });
  res.status(200).json(blogs);
};

const findById = async (req, res) => {
  await Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'title',
      'slug',
      'banner',
      'body',
      'author',
      'createdAt',
      'updatedAt',
    ],
  })
    .then((blog) => {
      return res.status(200).json(blog);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: err });
    });
};

const create = async (req, res) => {
  await Blog.create({
    title: req.body.title,
    slug: req.body.slug,
    banner: req.body.banner,
    body: req.body.body,
    author: req.body.author ?? 'ادمین',
  });
  res.status(201).json({
    message: `پست شما با موفقیت ساخته شد`,
  });
};

const edit = async (req, res) => {
  const target = await Blog.findOne({
    where: {
      id: req.params.id,
    },
  });
  await Blog.update(
    {
      title: req.body.title ?? target.title,
      slug: req.body.slug ?? target.slug,
      banner: req.body.banner ?? target.banner,
      body: req.body.body ?? target.body,
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
};

const remove = async (req, res) => {
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
    .catch((err) => {
      res.status(400).json({ message: err });
      console.log(err);
      return;
    });
};

module.exports = {
  findAll,
  findById,
  create,
  edit,
  remove,
};
