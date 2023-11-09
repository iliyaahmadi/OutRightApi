const Product = require('../models').product;
const Trait = require('../models').trait;
const Sku = require('../models').sku;
const Attribute = require('../models').attribute;
const AttributeValue = require('../models').attribute_value;
const isUUID = require('is-uuid');

const findAll = async (req, res) => {
  const products = await Product.findAll({
    attributes: [
      'id',
      'title',
      'slug',
      'desc',
      'quantity',
      'createdAt',
    ],
  });
  return res.status(200).json(products);
};

const findById = async (req, res) => {
  await Product.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'title',
      'slug',
      'desc',
      'quantity',
      'user_info',
      'createdAt',
    ],
    include: [Trait, Attribute, Sku.include(AttributeValue)],
  })
    .then((product) => {
      return res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: err });
    });
};

const create = async (req , res) => {

}
module.exports = {
  findAll,
  findById,
  create,
  // edit,
  // remove,
};
