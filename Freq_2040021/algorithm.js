function array(array) {
  var newArray = [];
  for (let i = 0; i < array.length; i++) {
    var soma = 0;
    for (let e = 0; e < array.length; e++) {
      soma = array[i][0] + array[i][1];
    }
    if (soma % 2 == 0) {
      newArray.push(soma);
    }
  }
  newArray.sort(function (a, b) {
    return a - b;
  });
  console.log(newArray);
}

array([
  [9, 5],
  [1, 4],
  [5, 3],
  [7, 2],
  [2, 2],
]);
