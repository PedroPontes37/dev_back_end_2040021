var utils = {
  isEmpty: function (array) {
    return array.length == 0 ? true : false;
  },
  max: function (array) {
    var firstNumber = array[0];
    for (let index = 1; index < array.length; index++) {
      if (array[index] > firstNumber) {
        firstNumber = array[index];
      }
    }
    return firstNumber;
  },
  min: function (array) {
    var firstNumber = array[0];
    for (let index = 1; index < array.length; index++) {
      if (array[index] < firstNumber) {
        firstNumber = array[index];
      }
    }
    return firstNumber;
  },
  average: function (array) {
    var soma = 0;
    for (let index = 0; index < array.length; index++) {
      soma += array[index];
    }
    return soma / array.length;
  },
  indexof: function (array, value) {
    for (let i = 0; i < array.length; i++) {
      if (value == array[i]) {
        return i;
      }
    }
    return "-1";
  },
  subArray: function (array, startIndex, endIndex) {
    var newarray = [];
    for (i = startIndex; i <= endIndex; i++) {
      newarray.push(array[i]);
    }
    return newarray;
  },
  isSameLength: function (a1, a2) {
    return a1.length == a2.length;
  },
  reverseArray: function (array) {
    var newarray = [];
    for (let i = array.length - 1; i >= 0; i--) {
      newarray.push(array[i]);
    }
    return newarray;
  },
  swap: function (array, index1, index2) {
    var x = array[index1];
    var y = array[index2];
    array[index1] = y;
    array[index2] = x;
    return array;
  },
  booleanContains: function (array, value) {
    var existe = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i] == value) {
        existe = true;
      }
    }
    return existe;
  },
  arrayConcatenate: function (a1, a2) {
    var newarray = [];
    for (let i = 0; i < a1.length; i++) {
      newarray.push(a1[i]);
    }
    for (let e = 0; e < a2.length; e++) {
      newarray.push(a2[e]);
    }
    return newarray;
  },
};

module.exports = utils;
