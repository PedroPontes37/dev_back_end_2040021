const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { response } = require("express");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function readFile(fileName) {
  var file = fs.readFileSync(fileName, "utf-8");
  return file;
}

app.get("/", (req, res) => {
  res.send("Benfica Campeão!");
});

app.get("/users", (req, res) => {
  //vamos enviar para o npoint /users tudo oq esta no ficheiro persons.json
  res.send(fileobjt);
});

app.post("/users", (req, res) => {
  var person = req.body;
  //adicionar uma propriedade a um dici
  // fileobjt.person5 = person;
  //obter tamanho de um objeto
  var size = Object.keys(fileobjt).length;
  size++;
  person.id = size;
  fileobjt["person" + person.id] = person;

  res.send(person.id + "");
});

app.delete("/users/:id", (req, res) => {
  var id = req.params.id;
  var person = fileobjt["person" + id];
  if (person != undefined) {
    delete fileobjt["person" + id];
    res.send("ID: " + id + " was deleted");
  } else {
    res.send("ID does not exist");
  }
});

app.get("/users/:id", (req, res) => {
  var id = req.params.id;
  var person = fileobjt["person" + id];
  if (person != undefined) {
    res.send(person);
  } else {
    res.send("ID does not exist");
  }
});

app.put("/users/:id", (req, res) => {
  var id = req.params.id;
  var personFromBody = req.body;
  var person = fileobjt["person" + id];

  if (person != undefined) {
    personFromBody.id = id;
    fileobjt["person" + id] = personFromBody;
    res.send(personFromBody);
  } else {
    res.send("ID does not exist");
  }
  res.send("THIS IS A PUT");
});

//Fazer servidor arrancar e ficar a espera dos pedidos
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

var filestr = readFile("./persons.json");
var fileobjt = JSON.parse(filestr);
