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
//Listar todos os videos existentes na tabela
app.get("/videos", function (request, response) {
  connection.query(
    "select*from projeto_backend.videos",
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

//2
//Adicionar video a tabela mandando msg de feedback
app.post("/videos", function (request, response) {
  var newVideo = request.body;
  connection.query(
    "INSERT projeto_backend.videos set ?",
    [newVideo],
    function (err, rows, fields) {
      response.send(
        "Video com o ID: " + rows.insertId + " adicionado com sucesso"
      );
    }
  );
});

//3
//Enviar todos os videos de um determinado uploader
app.get("/videos/uploader/:uploader", function (request, response) {
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
//Incrementar likes
app.put("/videos/:id/likes", function (request, response) {
  var id = request.params.id;
  connection.query(
    "UPDATE projeto_backend.videos SET likes = likes+1 WHERE id = ?  ",
    [id],
    function (err, rows, fields) {
      connection.query(
        "select * from projeto_backend.videos WHERE id = ?  ",
        [id],
        function (err, rows, fields) {
          response.send(rows);
        }
      );
    }
  );
});

//5
//Listar todos os vídeos que contenham determinado tag
app.get("/videos/tags", function (request, response) {
  var tags = request.query.tags;
  connection.query(
    "select*from projeto_backend.videos where tags = ?",
    [tags],
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

//Parte B
//1
//Selecionar apenas um vídeo pelo seu ID
app.get("/videos/id/:id", function (request, response) {
  var id = request.params.id;
  connection.query(
    "select * from projeto_backend.videos where id = ?",
    [id],
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

//2
// apagar via query
app.delete("/videos", function (request, response) {
  var id = request.query.id;
  connection.query(
    "DELETE FROM projeto_backend.videos WHERE id = ?",
    [id],
    function (err, rows, fields) {
      if (rows.affectedRows == 0) {
        response.send("O ID escolhido não existe");
      } else {
        response.send("O video com o id: " + id + " foi eleminado com sucesso");
      }
    }
  );
});

//3
//Selecionar todos os vídeos de um determinado uploader
app.get("/videos/uploader/:uploader", function (request, response) {
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
//Adicionar um novo comentario
app.put("/videos/comments/:id", function (request, response) {
  var id = request.params.id;
  var newComment = request.body.comments;
  var atualComment;

  connection.query(
    "SELECT comments from projeto_backend.videos  where id = ? ",
    [id],
    function (err, rows, fields) {
      atualComment = rows[0].comments;
      connection.query(
        "UPDATE projeto_backend.videos set comments = ? where id = ?",
        [atualComment + " / " + newComment, id],
        function (err, rows, fields) {
          response.send("Comentário adicionado: " + newComment);
        }
      );
    }
  );
});

//5
//Ver os likes por forma crescente
app.get("/videos/likes", function (request, response) {
  var likesOrdem;
  connection.query(
    "select*from projeto_backend.videos",
    function (err, rows, fields) {
      likesOrdem = rows.sort(function (likesA, likesB) {
        return likesA.likes - likesB.likes;
      });
      response.send(likesOrdem);
    }
  );
});
