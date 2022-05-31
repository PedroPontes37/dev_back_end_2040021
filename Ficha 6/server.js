const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Fazer servidor arrancar e ficar a espera dos pedidos
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  var body = "hello world";
  res.writeHead(200, {
    "Content-Lenght": Buffer.byteLength(body),
    "Content-Type": "text/plain",
  });
  res.end(body);
});

app.get("/html", (req, res) => {
  var body = "<h1>hello world</h1>";
  res.writeHead(200, {
    "Content-Lenght": Buffer.byteLength(body),
    "Content-Type": "text/html",
  });
  res.end(body);
});

app.get("/file", (req, res) => {
  var text = fs.readFileSync("pagina.html");
  res.writeHead(200, {
    "Content-Lenght": Buffer.byteLength(text),
    "Content-Type": "text/html",
  });
  res.end(text);
});

app.get("/replace/file", (req, res) => {
  var date = new Date();

  var text = fs.readFileSync("pagina.html", "utf8");
  text = text.replace("Olaaa", date.toDateString());

  res.writeHead(200, {
    "Content-Lenght": Buffer.byteLength(text),
    "Content-Type": "text/html",
  });
  res.end(text);
});

function log(req, res) {
  var method = req.method;
  var path = req.route.path;
  var date = new Date();
  var str =
    "method: " +
    method +
    ", path " +
    path +
    ", date " +
    date.toDateString() +
    "\n";
  fs.appendFileSync("log.txt", str);
}

app.get("/user/:name", (req, res) => {
  log(req, res);
  var name = req.params.name;

  var text = fs.readFileSync("pagina.html", "utf8");
  text = text.replace("Name", name);

  res.writeHead(200, {
    "Content-Lenght": Buffer.byteLength(text),
    "Content-Type": "text/html",
  });
  res.end(text);
});

app.get("/log", (req, res) => {
  var log = fs.readFileSync("log.txt", "utf8");
  res.writeHead(200, {
    "Content-Lenght": Buffer.byteLength(log),
    "Content-Type": "text/plain",
  });
  res.end(log);
});

app.get("/download", (red, res) => {
  res.download("log.txt");
});

app.get("/clear", (req, res) => {
  path = "./logging.txt";
  fs.unlinkSync(path);
  var body = "O ficheiro " + path + " foi apagado";
  res.writeHead(200, {
    "Content-Lenght": Buffer.byteLength(body),
    "Content-Type": "text/plain",
  });
  res.end(body);
});
