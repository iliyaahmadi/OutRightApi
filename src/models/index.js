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
db.user = require('./user.js')(sequelize, DataTypes);
db.role = require('./role.js')(sequelize, DataTypes);
db.product = require('./product.js')(sequelize, DataTypes);
db.blog = require('./blog.js')(sequelize, DataTypes);
db.cart = require('./cart.js')(sequelize, DataTypes);
db.notification = require('./notification.js')(sequelize, DataTypes);
db.discount = require('./discount.js')(sequelize, DataTypes);
db.tag = require('./tag.js')(sequelize, DataTypes);
db.review = require('./review.js')(sequelize, DataTypes);
db.question = require('./question.js')(sequelize, DataTypes);
db.category = require('./category.js')(sequelize, DataTypes);
db.trait = require('./trait.js')(sequelize, DataTypes);
db.sku = require('./sku.js')(sequelize, DataTypes);
db.attribute = require('./attribute.js')(sequelize, DataTypes);
db.attribute_value = require('./attributeValue.js')(sequelize, DataTypes);
db.product_userinfo = require('./productUserInfo.js')(sequelize, DataTypes);
db.product_userinfo_value = require('./productUserInfoValue.js')(
  sequelize,
  DataTypes
);
db.order = require('./order.js')(sequelize, DataTypes);

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
db.order.belongsToMany(db.product_userinfo_value, {
  through: 'order_userInfo',
});
db.product_userinfo_value.belongsToMany(db.order, {
  through: 'order_userInfo',
});

module.exports = db;
