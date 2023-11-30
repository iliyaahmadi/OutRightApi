const config = require('../database/index.js');
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
db.section = require('./section.js')(sequelize, DataTypes);
db.sectionImg = require('./sectionImg.js')(sequelize, DataTypes);
db.cart = require('./cart.js')(sequelize, DataTypes);
db.notification = require('./notification.js')(sequelize, DataTypes);
db.discount = require('./discount.js')(sequelize, DataTypes);
db.tag = require('./tag.js')(sequelize, DataTypes);
db.review = require('./review.js')(sequelize, DataTypes);
db.question = require('./question.js')(sequelize, DataTypes);
db.category = require('./category.js')(sequelize, DataTypes);
db.trait = require('./trait.js')(sequelize, DataTypes);
db.attribute = require('./attribute.js')(sequelize, DataTypes);
db.attribute_value = require('./attributeValue.js')(sequelize, DataTypes);
db.product_userinfo = require('./productUserInfo.js')(sequelize, DataTypes);
db.product_userinfo_value = require('./productUserInfoValue.js')(
  sequelize,
  DataTypes
);
db.order = require('./order.js')(sequelize, DataTypes);
db.saveSKU = require('./saveSKU.js')(sequelize, DataTypes);

// user-role
db.role.hasMany(db.user);
db.user.belongsTo(db.role, { foreignKey: { defaultValue: 1 } });

// cart-user / product
db.user.hasOne(db.cart);
db.cart.belongsTo(db.user);

db.cart_products = sequelize.define(
  'cart_products',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { timestamps: false }
);
db.cart.belongsToMany(db.product, {
  through: { model: db.cart_products },
});
db.product.belongsToMany(db.cart, {
  through: { model: db.cart_products },
});

// notification-user
db.user.hasMany(db.notification);
db.notification.belongsTo(db.user);

// discount-user
db.user.hasMany(db.discount);
db.discount.belongsTo(db.user);

// product-tag
db.product_tag = sequelize.define('product_tag', {}, { timestamps: false });
db.tag.belongsToMany(db.product, {
  through: { model: db.product_tag, unique: false },
});
db.product.belongsToMany(db.tag, {
  through: { model: db.product_tag, unique: false },
});
// blog-tag
db.blog_tag = sequelize.define('blog_tag', {}, { timestamps: false });
db.tag.belongsToMany(db.blog, {
  through: { model: db.blog_tag, unique: false },
});
db.blog.belongsToMany(db.tag, {
  through: { model: db.blog_tag, unique: false },
});

//blog-section
db.blog.hasMany(db.section, { onDelete: 'CASCADE' });
db.section.belongsTo(db.blog);

//section-section_img
db.section.hasMany(db.sectionImg, { onDelete: 'CASCADE' });
db.sectionImg.belongsTo(db.section);

// user-product-review / question
db.user.hasMany(db.review);
db.review.belongsTo(db.user);

db.product.hasMany(db.review);
db.review.belongsTo(db.product);

// review likes
db.review_likes = sequelize.define('review_likes', {}, { timestamps: false });
db.user.belongsToMany(db.review, {
  through: 'review_likes',
});
db.review.belongsToMany(db.user, {
  through: 'review_likes',
});
// review dislikes
db.review_dislikes = sequelize.define(
  'review_dislikes',
  {},
  { timestamps: false }
);
db.user.belongsToMany(db.review, {
  through: 'review_dislikes',
});
db.review.belongsToMany(db.user, {
  through: 'review_dislikes',
});

db.user.hasMany(db.question);
db.question.belongsTo(db.user);

db.product.hasMany(db.question);
db.question.belongsTo(db.product);

// product-cat
db.category.hasMany(db.product);
db.product.belongsTo(db.category);

// trait-product
db.product.hasMany(db.trait);
db.trait.belongsTo(db.product);

// attribute-product
db.product.hasMany(db.attribute, { onDelete: 'CASCADE' });
db.attribute.belongsTo(db.product);

// attribute_value-attribute
db.attribute.hasMany(db.attribute_value, { onDelete: 'CASCADE' });
db.attribute_value.belongsTo(db.attribute);

// product_userinfo-product
db.product.hasMany(db.product_userinfo);
db.product_userinfo.belongsTo(db.product);

// product_userinfo-attribute
db.product_userinfo.hasOne(db.product_userinfo_value);
db.product_userinfo_value.belongsTo(db.product_userinfo);

// order_cart
db.cart.hasOne(db.order);
db.order.belongsTo(db.cart);
db.order.belongsToMany(db.product_userinfo_value, {
  through: 'order_userInfo',
});
db.product_userinfo_value.belongsToMany(db.order, {
  through: 'order_userInfo',
});

module.exports = db;
