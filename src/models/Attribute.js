module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define('attribute', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    attribute: {
      type: DataTypes.STRING,
    },
  });
  return Attribute;
};
