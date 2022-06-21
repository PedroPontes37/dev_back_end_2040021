const Person = require("../sequelize").Person;

exports.test = function (req, res, next) {
  Person.findAll().then((results) => {
    res.send(results);
  });
};
