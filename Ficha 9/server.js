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
  var id = req.query.id;

  if (id == undefined) {
    person.findAll().then((person) => {
      res.send(person);
    });
  } else {
    if (isNaN(id)) {
      res.status(400).send("Invalid id supplied");
    } else {
      person.findByPk(id).then((person) => {
        if (person == undefined) {
          res.status(404).send("Cannot fiend id");
        } else {
          res.send(person);
        }
      });
    }
  }
});

app.post("/persons", (req, res) => {
  person.create(req.body).then((newperson) => {
    res.send(newperson);
  });
});

app.delete("/persons", (req, res) => {
  var id = req.body.id;
  if (isNaN(id)) {
    res.status(400).send("Invalid id supplied");
  } else {
    person
      .destroy({
        where: {
          id: id,
        },
      })
      .then((affectedRows) => {
        if (affectedRows == 0) {
          res.status(404).send("Cannot find id");
        } else {
          res.send("Number of deleted instances: " + affectedRows);
        }
      });
  }
});

app.delete("/persons/:id", (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.status(400).send("Invalid id supplied");
  } else {
    person
      .destroy({
        where: {
          id: id,
        },
      })
      .then((affectedRows) => {
        if (affectedRows == 0) {
          res.status(405).send("Cannot find id");
        } else {
          res.send("Number of deleted instances: " + affectedRows);
        }
      });
  }
});

app.get("/persons/:idade/:profissao", (req, res) => {
  var idade = req.params.idade;
  var profession = req.params.profissao;
  person
    .findAll({
      where: {
        age: idade,
        profession: profession,
      },
    })
    .then((personresult) => {
      res.send(personresult);
    });
});
