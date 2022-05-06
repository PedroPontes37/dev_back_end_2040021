//Ficha 1 ex 5

function nota(np, nt) {
  console.log("A sua nota foi:" + med);
  var med = np * 0.3 + nt * 0.7;
  if (med < 9.5) {
    console.log("Reprovado");
  } else {
    console.log("Aprovado");
  }
}
// nota(9.5,9.5)

// Ficha 1 ex 6

function month(monthNumber) {
  if (monthNumber == 1) {
    console.log("Janeiro");
  } else if (monthNumber == 2) {
    console.log("Fevereiro");
  } else {
    console.log("Numero invalido");
  }

  var months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  console.log(months[monthNumber - 1]);
}

// month(1)

// Ficha 1 ex 7

function calculater(n1, n2, operator) {
  if (operator == "+") {
    return n1 + n2;
  } else if (operator == "-") {
    return n1 - n2;
  } else if (operator == "*") {
    return n1 * n2;
  } else {
    return Math.pow(n1, n2);
  }
}

var soma = calculater(5, 5, "+");
var subtracao = calculater(5, 5, "-");
var multi = calculater(5, 5, "*");
var expo = calculater(5, 5, "^");
// console.log(soma);
// console.log(subtracao);
// console.log(multi);
// console.log(expo);

// Ficha 1 ex 8

function multipli() {
  for (let index = 1; index < 20; index++) {
    if (index % 5 == 0) {
      console.log(index);
    }
  }
}

// multipli();

//Ficha 1 ex 9

function sum() {
  var soma = 0;
  for (let index = 1; index <= 100; index++) {
    soma += index;
  }
  console.log(soma);
}
// sum()

//Ficha 1 ex 10

function fatorial(number) {
  var result = 1;
  for (let index = 1; index < number + 1; index++) {
    result *= index;
  }
  console.log(result);
}

// fatorial(5);

//Ficha 1 ex 11

function media(sequencia) {
  var soma = 0;
  for (let index = 0; index < sequencia.length; index++) {
    soma += sequencia[index];
  }
  return soma / sequencia.length;
}
var media = media([1, 2, 3, 4, 5, 6]);
// console.log(media);

function maximo(sequencia2) {
  var firstNumber = sequencia2[0];
  for (let index = 1; index < sequencia2.length; index++) {
    if (sequencia2[index] > firstNumber) {
      firstNumber = sequencia2[index];
    }
  }
  return firstNumber;
}
var maximo = maximo([7, 2, 2, 10, 5, 6]);
// console.log(maximo);

function minimo(sequencia3) {
  var firstNumber = sequencia3[0];
  for (let index = 1; index < sequencia3.length; index++) {
    if (sequencia3[index] < firstNumber) {
      firstNumber = sequencia3[index];
    }
  }
  return firstNumber;
}
var minimo = minimo([7, 2, 2, 1, 5, 6]);
console.log(minimo);
