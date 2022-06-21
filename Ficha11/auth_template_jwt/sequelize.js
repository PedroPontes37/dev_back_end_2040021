// TODO Implement all the models and business logic using sequelize
const { Sequelize, Model, DataTypes } = require("sequelize");
const UserModel = require("./models/User");

//SQL connection
//procees.env para ir buscar as variaveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_CHEMA,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
  }
);

const User = UserModel(sequelize, Sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been  established");
  })
  .catch((err) => {
    console.error("Unable to connect", err);
  });

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  User,
};
