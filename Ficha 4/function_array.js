var array = [];

var funcaoum = function () {
  console.log("Hello World");
};
var funcaodois = function () {
  console.log("1,2");
};
var funcaotres = function () {
  console.log("3");
};

array.push(funcaoum, funcaodois, funcaotres);

for (var i = 0; i < array.length; i++) {
  array[i]();
}

array.forEach((element, index, array) => {
  element();
  console.log(index);
  console.log(array.length);
});
