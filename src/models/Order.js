module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(['Queue', 'Done', 'Error']),
      defaultValue: 'Queue',
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.ENUM(['IDPAY', 'ZARINPAL']),
      allowNull: false,
    },
  });
  return Order;
};
