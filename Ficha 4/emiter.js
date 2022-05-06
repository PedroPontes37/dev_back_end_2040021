class Emiter {
  constructor() {
    this.events = {};
  }
}

Emiter.prototype.on = function (type, listener) {
  if (this.events[type] == undefined) {
    this.events[type] = [];
  }
  this.events[type].push(listener);
};

Emiter.prototype.emit = function (type) {
  if (this.events[type] != undefined) {
    this.events[type].forEach((element) => {
      element();
    });
  }
};

module.exports = Emiter;
