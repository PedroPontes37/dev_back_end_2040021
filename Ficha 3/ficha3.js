var ArrayUtils = require("./arrayUtils");

function started() {
  console.log("Started Download");
}

function completed() {
  console.log("Download Completed");
}

function update(progress) {
  console.log(progress + "% of Dowload");
}

function perfomDownload(started_fn, completed_fn, update_fn) {
  started_fn();
  for (let i = 0; i <= 100; i++) {
    update_fn(i);
  }
  completed_fn();
}

// perfomDownload(started, completed, update);

//Ex4
console.log(ArrayUtils.booleanContains([1, 2, 4, 3], 3));
