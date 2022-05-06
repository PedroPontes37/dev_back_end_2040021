var object = {
  name: "Pedro",
  age: 19,
  gender: "masculino",
};

var teste = JSON.stringify(object);
// console.log(teste);

var teste2 = JSON.parse('{"name":"Pedro","age":"19","gender":"masculino"}');
//console.log(teste2.name);

var Emiter = require("./emiter");
var config = require("./config");
var emtr = new Emiter();

//Registar o listener com a funçao para o evento LOGIN
emtr.on(config.events.LOGIN, function () {
  console.log("Someone has logged in");
});
emtr.on(config.events.LOGIN, function () {
  console.log("Someone has logged in again");
});

emtr.on(config.events.LOGOUT, function () {
  console.log("Someone has logged out");
});

emtr.on(config.events.UNIVERSIDADE, function () {
  console.log("A universidade vai fechar");
});

emtr.emit(config.events.UNIVERSIDADE);
