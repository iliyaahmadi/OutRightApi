module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('section', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.TEXT,
    },
  });
  return Section;
};
