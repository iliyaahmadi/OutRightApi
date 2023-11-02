const config = require('../configs/database');
const Sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;

//db settings
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models
db.user = require('./User.js')(sequelize, DataTypes);
db.role = require('./Role.js')(sequelize, DataTypes);
db.product = require('./Product.js')(sequelize, DataTypes);
db.blog = require('./Blog.js')(sequelize, DataTypes);
db.cart = require('./Cart.js')(sequelize, DataTypes);
db.notification = require('./Notification.js')(sequelize, DataTypes);
db.discount = require('./Discount.js')(sequelize, DataTypes);
db.tag = require('./Tag.js')(sequelize, DataTypes);
db.review = require('./Review.js')(sequelize, DataTypes);
db.question = require('./Question.js')(sequelize, DataTypes);
db.category = require('./Category.js')(sequelize, DataTypes);
db.trait = require('./Trait.js')(sequelize, DataTypes);
db.sku = require('./Sku.js')(sequelize, DataTypes);
db.attribute = require('./Attribute.js')(sequelize, DataTypes);
db.attribute_value = require('./AttributeValue.js')(sequelize, DataTypes);
db.product_userinfo = require('./ProductUserInfo.js')(sequelize, DataTypes);
db.product_userinfo_value = require('./ProductUserInfoValue.js')(
  sequelize,
  DataTypes
);
db.order = require('./Order.js')(sequelize, DataTypes);

// user-role
db.role.hasMany(db.user, {
  foreignKey: 'role_id',
  defaultValue: 1,
});

// cart-user / product
db.user.hasOne(db.cart, {
  foreignKey: 'user_id',
});

db.cart.belongsToMany(db.product, {
  through: 'cart_products',
});
db.product.belongsToMany(db.cart, {
  through: 'cart_products',
});

// notification-user
db.user.hasMany(db.notification, {
  foreignKey: 'user_id',
});

// discount-user
db.user.hasMany(db.discount, {
  foreignKey: 'user_id',
});

// product-tag
db.tag.belongsToMany(db.product, {
  through: 'product_tag',
});
db.product.belongsToMany(db.tag, {
  through: 'product_tag',
});
// blog-tag
db.tag.belongsToMany(db.blog, {
  through: 'blog_tag',
});
db.blog.belongsToMany(db.tag, {
  through: 'blog_tag',
});

// user-product-review / question
db.user.hasMany(db.review, {
  foreignKey: 'user_id',
});
db.product.hasMany(db.review, {
  foreignKey: 'product_id',
});

db.user.hasMany(db.question, {
  foreignKey: 'user_id',
});
db.product.hasMany(db.question, {
  foreignKey: 'product_id',
});

// product-cat
db.category.hasMany(db.product, {
  foreignKey: 'cat_id',
});

// trait-product
db.product.hasMany(db.trait, {
  foreignKey: 'product_id',
});

// sku-product
db.product.hasOne(db.sku, {
  foreignKey: 'product_id',
});

// attribute-product
db.product.hasMany(db.attribute, {
  foreignKey: 'product_id',
});

// attribute_value-attribute / sku
db.attribute.hasOne(db.attribute_value, {
  foreignKey: 'attribute_id',
});
db.sku.hasMany(db.attribute_value, {
  foreignKey: 'sku_id',
});

// product_userinfo-product
db.product.hasMany(db.product_userinfo, {
  foreignKey: 'product_id',
});

// product_userinfo-attribute / sku
db.product_userinfo.hasOne(db.product_userinfo_value, {
  foreignKey: 'product_userinfo',
});
// order_cart
db.cart.hasOne(db.order, {
  foreignKey: 'cart_id',
});
db.cart.belongsToMany(db.product_userinfo_value, {
  through: 'order_userInfo',
});
db.product_userinfo_value.belongsToMany(db.cart, {
  through: 'order_userInfo',
});

module.exports = db;
