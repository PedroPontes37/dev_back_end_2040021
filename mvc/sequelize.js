const { Sequelize, Model, DataTypes } = require("sequelize");

//SQL connection

const sequelize = new Sequelize("ficha9", "root", "", {
  dialect: "mysql",
});

const PersonModel = require("./models/person");
const InvoiceModel = require("./models/invoice");

const Person = PersonModel(sequelize, DataTypes);
const Invoice = InvoiceModel(sequelize, DataTypes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been  established");
  })
  .catch((err) => {
    console.error("Unable to connect", err);
  });

//criar a tabela person
const person = sequelize.define("person", {
  firstname: {
    type: DataTypes.STRING,
  },
  lastname: {
    type: DataTypes.STRING,
  },
  profession: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
  })
  .then(function () {
    return person.findAll();
  })
  .then(function (person) {
    console.log(person);
  });

module.exports = {
  Person,
  Invoice,
};
