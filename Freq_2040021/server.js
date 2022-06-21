const express = require("express");
const fs = require("fs");
const { Sequelize, Model, DataTypes } = require("sequelize");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//SQL connection
//1-nome da base de dados 2-utilizador 3-password
const sequelize = new Sequelize("employees", "root", "", {
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

const employer = sequelize.define("employess", {
  birth_date: {
    type: DataTypes.STRING,
  },
  emp_no: {
    type: DataTypes.INTEGER,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  hire_date: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
});

const salaries = sequelize.define("salaries", {
  from_date: {
    type: DataTypes.STRING,
  },
  salary: {
    type: DataTypes.INTEGER,
  },
  to_date: {
    type: DataTypes.STRING,
  },
});

employer.hasOne(salaries);

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

employer.bulkCreate([
  {
    birth_date: "2002-09-25",
    emp_no: "1",
    first_name: "Pedro",
    gender: "M",
    hire_date: "2022-06-18",
    last_name: "Pontes",
  },
  {
    birth_date: "2005-09-25",
    emp_no: "2",
    first_name: "João",
    gender: "M",
    hire_date: "2022-01-18",
    last_name: "Silva",
  },
  {
    birth_date: "1999-09-25",
    emp_no: "3",
    first_name: "Martim",
    gender: "M",
    hire_date: "2019-01-18",
    last_name: "Fernandes",
  },
]);

salaries.bulkCreate([
  {
    from_date: "18-05-2020",
    salary: 1200,
    to_date: "18-06-2022",
    employessId: 1,
  },
  {
    from_date: "18-05-2020",
    salary: 900,
    to_date: "18-06-2022",
    employessId: 2,
  },
  {
    from_date: "18-05-2020",
    salary: 1400,
    to_date: "18-06-2022",
    employessId: 3,
  },
]);

function log(req, res) {
  var method = req.method;
  var path = req.route.path;
  var date = new Date();
  var str =
    "method: " +
    method +
    ", path " +
    path +
    ", date " +
    date.toDateString() +
    "\n";
  fs.appendFileSync("log.txt", str);
}

app.get("/employees", (req, res) => {
  log(req, res);

  employer
    .findAll({
      include: {
        model: salaries,
      },
    })
    .then((allEmployers) => {
      res.send(allEmployers);
    });
});

app.post("/employees", (req, res) => {
  log(req, res);
  var newPerson = req.body;
  employer
    .create(newPerson, {
      include: {
        model: salaries,
      },
    })
    .then((personCreat) => {
      res.send(personCreat);
    });
});

app.delete("/employees", (req, res) => {
  log(req, res);
  var id = req.query.id;
  if (isNaN(id)) {
    res.status(400).send("Invalid ID");
  } else {
    employer
      .destroy({
        where: {
          id: id,
        },
      })
      .then((deletedPerson) => {
        if (deletedPerson == 0) {
          res.status(404).send("Person don´t exist");
        } else {
          res.send("Affected rows:" + deletedPerson);
        }
      });
  }
});

app.put("/employees/:id/salary", (req, res) => {
  log(req, res);
  var id = req.params.id;
  var newSalary = req.body;
  if (isNaN(id)) {
    res.status(400).send("Invalid ID");
  } else {
    salaries
      .update(newSalary, {
        where: {
          id: id,
        },
      })
      .then((newDetails) => {
        if (newDetails == 0) {
          res.status(404).send("Person don´t exist");
        } else {
          salaries
            .findAll({
              where: {
                id: id,
              },
            })
            .then((result) => {
              res.send(result);
            });
        }
      });
  }
});

app.get("/employees/:id/salary", (req, res) => {
  log(req, res);
  var id = req.params.id;
  if (isNaN(id)) {
    res.status(400).send("Invalid ID");
  } else {
    employer
      .findAll({
        include: {
          model: salaries,
        },
        where: {
          id: id,
        },
      })
      .then((result) => {
        if (result == 0) {
          res.status(400).send("Person don´t exist");
        } else {
          res.send(result);
        }
      });
  }
});

app.get("/log", (red, res) => {
  res.download("log.txt");
});
