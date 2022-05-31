const express = require("express");
const fs = require("fs");
const { Sequelize, Model, DataTypes } = require("sequelize");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Fazer servidor arrancar e ficar a espera dos pedidos
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//SQL connection

const sequelize = new Sequelize("ficha9", "root", "", {
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been  established");
  })
  .catch((err) => {
    console.error("Unable to connect", err);
  });

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

person
  .bulkCreate([
    {
      firstname: "Pedro",
      lastname: "Pontes",
      profession: "student",
      age: "19",
    },
    {
      firstname: "Pedro",
      lastname: "Miguel",
      profession: "student",
      age: "19",
    },
    {
      firstname: "Francisco",
      lastname: "Pontes",
      profession: "student",
      age: "19",
    },
  ])
  .then(function () {
    return person.findAll();
  })
  .then(function (person) {
    console.log(person);
  });

app.get("/persons", (req, res) => {
  person.findAll().then((person) => {
    res.send(person);
  });
});

app.post("/persons", (req, res) => {
  person.create(req.body).then((newperson) => {
    res.send(newperson);
  });
});

app.delete("/persons", (req, res) => {
  person
    .destroy({
      where: {
        id: req.body,
      },
    })
    .then(() => {
      console.log("Done");
    });
});
