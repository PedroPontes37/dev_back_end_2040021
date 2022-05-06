const express = require("express");
const mysql = require("mysql");
const { CLIENT_MULTI_RESULTS } = require("mysql/lib/protocol/constants/client");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Fazer servidor arrancar e ficar a espera dos pedidos
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//SQL connection

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projeto_backend",
});

//Parte A
//1
app.get("/videos", function (request, response) {
  connection.query(
    "select*from projeto_backend.videos",
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

//2
app.post("/videos", function (request, response) {
  var newVideo = request.body;
  connection.query(
    "INSERT projeto_backend.videos set ?",
    [newVideo],
    function (err, rows, fields) {
      response.send("ID: " + rows.insertId);
    }
  );
});

//3
app.get("/videos/:uploader", function (request, response) {
  var uploader = request.params.uploader;
  connection.query(
    "select*from projeto_backend.videos where uploader = ?",
    [uploader],
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

//4
//ver com o prof
app.put("/videos/:id", function (request, response) {
  var id = request.params.id;
  var likes = request.body;
  var likesAtuais = "select from projeto_backend.videos.id.likes";
  connection.query(
    "UPDATE videos set ? where id = ? ",
    [likesAtuais + likes, id],
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

//5
//ver com o prof
app.get("/videos/:tags", function (request, response) {
  var tag = request.params.tags;
  connection.query(
    "select*from projeto_backend.videos where tags = ?",
    [tag],
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

//Parte B
//1
//ver com o prof
app.get("/videos/:id", function (request, response) {
  var id = request.params.id;
  connection.query(
    "select from projeto_backend.videos where id = ?",
    [id],
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

//2
//perguntar prof
app.delete("/videos", function (request, response) {
  var id = request.body.id;
  if (id != undefined) {
    connection.query(
      "delete from projeto_backend.videos where id = ?",
      [id],
      function (err, rows, fields) {
        response.send("video com id: " + id + " apagado com sucesso");
      }
    );
  } else {
    response.send("Id nao existe");
  }
});

//3
app.get("/videos/:uploader", function (request, response) {
  var uploader = request.params.uploader;
  connection.query(
    "select*from projeto_backend.videos where uploader = ?",
    [uploader],
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

//4
//perguntar ao prof
app.post("/videos/:id", function (request, response) {
  var id = request.params.id;
  var newComment = request.body;
  connection.query(
    "INSERT projeto_backend.videos set ? where id = ?",
    [newComment, id],
    function (err, rows, fields) {
      response.send("Comment add: " + rows.insertId);
    }
  );
});

//5
app.get("/videoss", function (request, response) {
  connection.query(
    "select*from projeto_backend.videos order by likes asc",

    function (err, rows, fields) {
      response.send(rows);
    }
  );
});
