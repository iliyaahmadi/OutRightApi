module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define('discount', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    static: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    percent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  });
  return Discount;
};
