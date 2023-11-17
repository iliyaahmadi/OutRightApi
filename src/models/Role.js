module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'role',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
  return Role;
};
