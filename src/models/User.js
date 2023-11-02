module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profile: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.NULL,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    activation_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    forgot_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    forgot_code_reset: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  return User;
};
