// ficha 4 -  exercicio 3

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greet = function () {
  console.log(
    "Hello" + " " + this.firstName + " " + this.lastName + " " + this.age
  );
};

Person.prototype.age = 0;

var arcanjo = new Person("Arcanjo", "Silva");
arcanjo.age = 10;
arcanjo.greet();

var pedro = new Person("Pedro", "Joao");
pedro.age = 20;
pedro.greet();

console.log(arcanjo.__proto__);
console.log(pedro.__proto__);
console.log(arcanjo.__proto__ == pedro.__proto__);
