const Product = require('../models').product;
const Trait = require('../models').trait;
const Attribute = require('../models').attribute;
const AttributeValue = require('../models').attribute_value;
const CurrentSku = require('../models').saveSKU;
const Cart = require('../models').cart;
const CartProduct = require('../models').cart_products;
const ProductTag = require('../models').product_tag;
const Tag = require('../models').tag;
//TODO: add
// const product_userinfo = require('../models').product_userinfo;
// const product_userinfo_value = require('../models').product_userinfo_value;
//
const skuGenerator = require('../utils/skuGenerator');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const findAll = asyncErrorHandler(async (req, res, next) => {
  const products = await Product.findAll({
    attributes: [
      'id',
      'title',
      'slug',
      'desc',
      'amount',
      'price',
      'image',
      'createdAt',
    ],
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
      'sku',
      'price',
      'amount',
      'image',
      'user_info',
      'createdAt',
    ],
    include: [
      {
        model: Trait,
      },
      {
        model: Attribute,
        include: [{ model: AttributeValue, findAll }],
      },
      {
        model: Tag,
        through: {
          attributes: [],
        },
      },
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
    user_info: req.body.user_info ?? false,
    categoryId: req.body.categoryId,
    sku: 'OR_' + currentSku,
    amount: req.body.amount ?? -1,
    price: req.body.price,
    image: req.body.image,
  };
  // console.log(product);
  const product = await Product.create({
    title: productObj.title,
    slug: productObj.slug,
    desc: productObj.desc,
    sku: productObj.sku,
    amount: productObj.amount,
    price: productObj.price,
    image: productObj.image,
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
  });
  return res.status(201).json({ message: 'محصول ساخته شد', product: product });
});

const edit = asyncErrorHandler(async (req, res, next) => {
  const target = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (target) {
    await Product.update(
      {
        title: req.body.title ?? target.title,
        slug: req.body.slug ?? target.slug,
        desc: req.body.desc ?? target.desc,
        categoryId: req.body.categoryId ?? target.categoryId,
        amount: req.body.amount ?? target.amount,
        price: req.body.price ?? target.price,
        image: req.body.image ?? target.image,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      message: ` محصول با مشخصات داده شده تغییر کرد`,
    });
  } else {
    res.status(404).json({ message: 'محصولی با این ایدی وجود ندارد' });
    return;
  }
});

const remove = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  await Product.destroy({
    where: {
      id: id,
    },
  }).then(async (c) => {
    if (c) {
      return res.status(200).json({ message: 'محصول حذف شد' });
    } else {
      return res.status(200).json({ message: 'محصول با این ایدی پیدا نشد' });
    }
  });
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

const removeAV = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  await Attribute.destroy({
    where: {
      id: id,
    },
  }).then(async (v) => {
    if (v) {
      return res.status(200).json({ message: 'متغیر حذف شد' });
    } else {
      return res.status(200).json({ message: 'متغیر با این ایدی پیدا نشد' });
    }
  });
});

const addTrait = asyncErrorHandler(async (req, res, next) => {
  await Trait.create({
    title: req.body.title,
    content: req.body.content,
    //FIXME:
    icon: 'FIX LATER',
    productId: req.params.id,
  });
  return res.status(201).json({ message: 'ویژگی اضافه شد' });
});

const removeTrait = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  await Trait.destroy({
    where: {
      id: id,
    },
  }).then(async (t) => {
    if (t) {
      return res.status(200).json({ message: 'ویژگی حذف شد' });
    } else {
      return res.status(200).json({ message: 'ویژگی با این ایدی پیدا نشد' });
    }
  });
});
//get cart id => see if added already => if not add product if did add amount
const addToCart = asyncErrorHandler(async (req, res, next) => {
  let cartId;
  await Cart.findOne({ where: { userId: req.userId } }).then(async (cart) => {
    cartId = cart.id;
    await CartProduct.findOne({
      where: { cartId: cartId, productId: req.params.id },
    }).then(async (p) => {
      if (!p) {
        await CartProduct.create({
          productId: req.params.id,
          cartId: cartId,
        }).then(() => {
          return res.status(201).json({ message: 'محصول اضافه شد' });
        });
      } else {
        await CartProduct.increment('amount', {
          where: { cartId: cartId },
        }).then(() => {
          return res.status(201).json({ message: 'محصول اضافه شد' });
        });
      }
    });
  });
});

const removeFromCart = asyncErrorHandler(async (req, res, next) => {
  let cartId;
  await Cart.findOne({ where: { userId: req.userId } }).then(async (cart) => {
    cartId = cart.id;
    await CartProduct.findOne({
      where: { cartId: cartId, productId: req.params.id },
    }).then(async (p) => {
      if (!p) {
        return res
          .status(200)
          .json({ message: 'محصول در سبد خرید وجود ندارد' });
      } else if (p.amount == 1) {
        await CartProduct.destroy({
          where: { cartId: cartId, productId: req.params.id },
        }).then((c) => {
          if (c) {
            return res
              .status(200)
              .json({ message: 'محصول از سبد خرید حذف شد' });
          } else {
            return res
              .status(200)
              .json({ message: 'محصول در سبد خرید وجود ندارد' });
          }
        });
      } else {
        await CartProduct.decrement('amount', {
          where: { cartId: cartId },
        }).then(() => {
          return res.status(201).json({ message: 'محصول از سبد خرید حذف شد' });
        });
      }
    });
  });
});

module.exports = {
  findAll,
  findById,
  create,
  edit,
  remove,
  addAV,
  removeAV,
  addTrait,
  removeTrait,
  addToCart,
  removeFromCart,
};
