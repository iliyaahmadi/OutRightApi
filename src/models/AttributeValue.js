module.exports = (sequelize, DataTypes) => {
  const AttributeValue = sequelize.define('attribute_value', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
    },
  });
  return AttributeValue;
};
