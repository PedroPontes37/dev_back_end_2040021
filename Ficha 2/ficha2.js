//Ex1
function massaCorporal(peso, altura) {
  var imc = peso / altura ** 2;
  if (imc < 18.5) {
    return "Abaixo de peso";
  } else if (imc > 18.5 && imc < 25) {
    return "Peso normal";
  } else if (imc > 25 && imc < 30) {
    return "Acima do Peso";
  } else if (imc > 30) {
    return "Obeso";
  }
}
var indice = massaCorporal(64, 1.68);
// console.log(indice);

//Ex2
function contrario(frase) {
  var fraseDividida = frase.split(" ");
  var reversedStr = "";

  for (let j = 0; j < fraseDividida.length; j++) {
    var word = fraseDividida[j];
    for (var i = word.length - 1; i >= 0; i--) {
      reversedStr += word[i];
    }
  }
  return reversedStr;
}
var resultado = contrario("Hoje e domingo");
// console.log(resultado);

//Ex3
function vogais(frase) {
  var vogais = 0;
  for (let i = 0; i < frase.length; i++) {
    if (
      frase[i] == "o" ||
      frase[i] == "a" ||
      frase[i] == "e" ||
      frase[i] == "u" ||
      frase[i] == "i"
    ) {
      vogais++;
    }
  }
  return vogais;
}
// var resultado = vogais("ola mundo");
// console.log(resultado);

//Ex4

function contar(frase, letra) {
  var number = 0;
  var minusculas = frase.toLowerCase();
  for (let i = 0; i < minusculas.length; i++) {
    if (minusculas[i] == letra) {
      number++;
    }
  }
  return number;
}
// var resultado = contar("OLA MALUCA", "a");
// console.log(resultado);

//Ex5
function time(
  horaEntrada,
  minutosEntrada,
  segundosEntrada,
  horaSaida,
  minutosSaida,
  segundosSaida
) {
  var horasSegundosEntrada = horaEntrada * 3600;
  var minutosSegundosEntrada = minutosEntrada * 60;

  var horasSegundosSaida = horaSaida * 3600;
  var minutosSegundosSaida = minutosSaida * 60;

  var totalSegundosEntrada =
    horasSegundosEntrada + minutosSegundosEntrada + segundosEntrada;
  var totalSegundosSaida =
    horasSegundosSaida + minutosSegundosSaida + segundosSaida;

  var segundosTrabalhados = totalSegundosSaida - totalSegundosEntrada;

  var segundosParaHoras = Math.floor(segundosTrabalhados / 3600);
  var restohoras = segundosTrabalhados % 3600;

  var segundosParaMinutos = Math.floor(restohoras / 60);
  var restominutos = Math.floor(restohoras % 60);

  console.log("Horas Trabalhadas: " + segundosParaHoras);
  console.log("Minutos Trabalhados: " + segundosParaMinutos);
  console.log("Segundos Trabalhados: " + restominutos);
}

// time(8, 0, 0, 9, 1, 1);

//6

function buldy(altura, largura) {
  var line = "";
  for (let i = 0; i < largura; i++) {
    line += "*";
  }
  for (let e = 0; e < altura; e++) {
    console.log(line);
  }
}
// buldy(20, 10);

function triangulo(altura) {
  var line = "";
  for (let i = 0; i < altura; i++) {
    line += "*";
    console.log(line);
  }
}
// triangulo(10);

function caixa(width, height) {
  for (let i = 0; i < height; i++) {
    var line = "";

    for (let j = 0; j < width; j++) {
      if (i == 0 || i == height - 1) {
        line += "*";
      } else {
        if (j == 0 || j == width - 1) {
          line += "*";
        } else {
          line += " ";
        }
      }
    }
    console.log(line);
  }
}

// caixa(10, 10);

var student = {
  number: 1000,
  grade: 15,
};
var student1 = {
  number: 1001,
  grade: 9,
};
var student2 = {
  number: 1002,
  grade: 9.5,
};
var student3 = {
  number: 1003,
  grade: 4,
};

var students = [];
students.push(student);
students.push(student1);
students.push(student2);
students.push(student3);

// console.log(students[0].number);

// var students = [];
// for (let i = 0; i < array.length; i++) {
//   var student = {
//     number: Math.random() * 1000,
//     grade: Math.random() * 20,
//   };
//   students.push(student);
// }

function listStudents(students) {
  for (let i = 0; i < students.length; i++) {
    var student = students[i];
    console.log("Number:" + student.number + ", Grade: " + student.grade);
  }
}

function bestGrade(students) {
  var grade1 = students[0].grade;
  var bestStudent = students[0];
  for (let i = 1; i < students.length; i++) {
    if (students[i].grade > grade1) {
      grade1 = students[i].grade;
      bestStudent = students[i];
    }
  }
  console.log("Number:" + bestStudent.number + ", Grade: " + bestStudent.grade);
}

function wrostGrade(students) {
  var grade1 = students[0].grade;
  var bestStudent = students[0];
  for (let i = 1; i < students.length; i++) {
    if (students[i].grade < grade1) {
      grade1 = students[i].grade;
      wrostStudent = students[i];
    }
  }
  console.log(
    "Number:" + wrostStudent.number + ", Grade: " + wrostStudent.grade
  );
}

function average(students) {
  var soma = 0;
  for (let i = 0; i < students.length; i++) {
    soma += students[i].grade;
  }
  var media = soma / students.length;
  return media;
}
function averageGrade(students) {
  var avg = average(students);
  var student = students[0];
  var aux = Math.abs(avg - students[0].grade);
  for (var i = 1; i < students.length; i++) {
    var diff = Math.abs(avg - students[i].grade);
    if (diff < aux) {
      aux = diff;
      student = students[i];
    }
  }
  console.log(average(students));
  console.log(student);
}

function negativeGrade(students) {
  console.log("Notas negativas na turma:");
  var totalNegatives = 0;
  for (let i = 0; i < students.length; i++) {
    if (students[i].grade < 9.5) {
      totalNegatives++;
      console.log(
        "Number: " + students[i].number + " Nota: " + students[i].grade
      );
    }
  }
  console.log("Numero total de negativas na turma: " + totalNegatives);
}

function positiveGrade(students) {
  console.log("Notas positivas na turma:");
  var totalPositives = 0;
  for (let i = 0; i < students.length; i++) {
    if (students[i].grade >= 9.5) {
      totalPositives++;
      console.log(
        "Number: " + students[i].number + " Nota: " + students[i].grade
      );
    }
  }
  console.log("Numero total de positivas na turma: " + totalPositives);
}

function main(students, option) {
  switch (option) {
    case 1:
      listStudents(students);
      break;
    case 2:
      bestGrade(students);
      break;
    case 3:
      wrostGrade(students);
      break;
    case 4:
      averageGrade(students);
      break;
    case 5:
      negativeGrade(students);
      break;
    case 6:
      positiveGrade(students);
      break;

    default:
      break;
  }
}

main(students, 4);
