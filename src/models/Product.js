module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stacks: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_info: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  return Product;
};
