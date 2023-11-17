const Product = require('../models').product;
const Trait = require('../models').trait;
const Sku = require('../models').sku;
const Attribute = require('../models').attribute;
const AttributeValue = require('../models').attribute_value;
const CurrentSku = require('../models').saveSKU;
const skuGenerator = require('../utils/skuGenerator');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const findAll = asyncErrorHandler(async (req, res, next) => {
  const products = await Product.findAll({
    attributes: ['id', 'title', 'slug', 'desc', 'stacks', 'createdAt'],
  });
  return res.status(200).json(products);
});

const findById = asyncErrorHandler(async (req, res, next) => {
  await Product.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'title',
      'slug',
      'desc',
      'stacks',
      'user_info',
      'createdAt',
    ],
    include: [
      Trait,
      Sku,
      { model: Attribute, include: { model: AttributeValue } },
    ],
  }).then((product) => {
    return res.status(200).json(product);
  });
});

//TODO: seperate SKU from this func
const create = asyncErrorHandler(async (req, res, next) => {
  let currentSku;
  await CurrentSku.findOne({
    where: {
      id: 1,
    },
  }).then((sku) => {
    currentSku = skuGenerator(sku.current);
  });
  const productObj = {
    title: req.body.title,
    slug: req.body.slug,
    desc: req.body.desc,
    stacks: req.body.stacks,
    user_info: req.body.user_info ?? false,
    categoryId: req.body.categoryId,
    sku: 'OR_' + currentSku,
    amount: req.body.stacks ? req.body.amount : -1,
    price: req.body.price,
  };
  // console.log(product);
  const product = await Product.create({
    title: productObj.title,
    slug: productObj.slug,
    desc: productObj.desc,
    stacks: productObj.stacks,
    user_info: productObj.user_info,
    categoryId: productObj.categoryId,
  }).then(async (p) => {
    await CurrentSku.update(
      { current: currentSku },
      {
        where: {
          id: 1,
        },
      }
    );
    await Sku.create({
      sku: productObj.sku,
      amount: productObj.amount,
      price: productObj.price,
      productId: p.id,
    });
  });
  return res.status(201).json({ message: 'محصول ساخته شد', product: product });
});

const remove = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  await Product.destroy({
    where: {
      id: id,
    },
    cascade: true,
  });
  return res.status(200).json({ message: 'محصول حذف شد' });
});

const addAV = asyncErrorHandler(async (req, res, next) => {
  const values = req.body.values;
  await Attribute.create({
    attribute: req.body.attribute,
    productId: req.params.id,
  }).then((attr) => {
    values.forEach(async (value) => {
      await AttributeValue.create({
        value: value.name,
        price: value.price,
        attributeId: attr.id,
      });
    });
  });
  return res.status(201).json({ message: 'متغیر ساخته شد' });
});

module.exports = {
  findAll,
  findById,
  create,
  // edit,
  remove,
  addAV,
};

// attr - attrvalue
