module.exports = (sequelize, DataTypes) => {
  const saveSKU = sequelize.define('save-sku', {
    current: {
      type: DataTypes.INTEGER,
    },
  });
  return saveSKU;
};
