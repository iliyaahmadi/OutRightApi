module.exports = (sequelize, DataTypes) => {
  const SectionImg = sequelize.define('section_img', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
    },
  });
  return SectionImg;
};
