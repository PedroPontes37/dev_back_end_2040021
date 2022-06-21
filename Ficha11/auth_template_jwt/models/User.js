//criar a tabela User

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  });
};
