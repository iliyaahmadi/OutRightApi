module.exports = (sequelize, DataTypes) => {
  const ProductUserInfoValue = sequelize.define(
    'product_userInfo_value',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
  return ProductUserInfoValue;
};
