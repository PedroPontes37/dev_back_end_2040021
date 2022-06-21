module.exports = (sequelize, DataTypes) => {
  return sequelize.define("invoice", {
    fullname: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
  });
};
