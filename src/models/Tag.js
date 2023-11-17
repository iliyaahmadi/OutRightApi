module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'tag',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
  return Tag;
};
