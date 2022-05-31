const express = require("express");
const mysql = require("mysql");
const { CLIENT_MULTI_RESULTS } = require("mysql/lib/protocol/constants/client");
const swaggerAutogen = require("swagger-autogen");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Fazer servidor arrancar e ficar a espera dos pedidos
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//SQL connection

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ficha7_backend",
});

app.get("/persons", function (request, response) {
  connection.query(
    "select*from ficha7_backend.persons",
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

app.post("/persons", function (request, response) {
  var newPerson = request.body;
  connection.query(
    "insert persons set ? ",
    [newPerson],
    function (err, rows, fields) {
      if (err) throw err;
      response.send("Inserted: " + rows.insertId);
    }
  );
});

app.delete("/persons", function (request, response) {
  var id = request.body.id;
  connection.query(
    "delete from ficha7_backend.persons where id = ? ",
    [id],
    function (err, rows, fields) {
      response.send("Affected rows: " + rows.affectedRows);
    }
  );
});

app.get("/persons/:id", function (request, response) {
  var id = request.params.id;
  connection.query(
    "select*from ficha7_backend.persons where id = ? ",
    [id],
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

app.get("/persons/:age/:profession", function (request, response) {
  var age = request.params.age;
  var profession = request.params.profession;
  connection.query(
    "select*from ficha7_backend.persons where age = ? and profession = ? ",
    [age, profession],
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

app.put("/persons/:id", function (request, response) {
  var id = request.params.id;
  var update = request.body;
  connection.query(
    "UPDATE persons set ? where id = ? ",
    [update, id],
    function (err, rows, fields) {
      response.send("Changed: " + id);
    }
  );
});
