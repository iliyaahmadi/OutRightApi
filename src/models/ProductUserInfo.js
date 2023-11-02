module.exports = (sequelize, DataTypes) => {
    const ProductUserInfo = sequelize.define('product_userInfo', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      info: {
        type: DataTypes.STRING,
      },
    });
    return ProductUserInfo;
  };
  