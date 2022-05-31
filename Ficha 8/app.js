// importar o express
//https://codesandbox.io/s/oqo0ylv8oy?file=/src/controllers/sample.controller.js

const { request, response, query } = require("express");
const express = require("express");
const mysql = require("mysql");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Ficha 8 API",
      description: "Ficha 8 API Information",
      contact: {
        name: "TPSI-DWB",
      },
      servers: ["http://localhost:3000"],
    },
    definitions: {
      Person: {
        type: "object",
        properties: {
          id: {
            type: "integer",

            "x-primary-key": true,
          },
          firstname: {
            type: "string",
          },
          lastname: {
            type: "string",
          },
          profession: {
            type: "string",
          },
          age: {
            type: "integer",
            format: "int64",
          },
        },
        xml: {
          name: "Person",
        },
      },
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// instanciar o express
const app = express();
// definir a porta do servidor http
const port = 3000;

// funções middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ficha7_backend",
});

/**
 * @swagger
 * /person:
 *    get:
 *      tags:
 *        - Person
 *      summary: Gets a list of persons
 *      description: Returns a list of persons
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: An array of persons
 *              schema:
 *                $ref: '#/definitions/Person'
 */
app.get("/person", (request, response) => {
  connection.query(
    "select*from ficha7_backend.persons",
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

/**
 * @swagger
 * /person:
 *    post:
 *      tags:
 *        - Person
 *      summary: Creates and stores a person
 *      description: Returns the id of the created person
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: Model
 *            description: Sample person
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/Person'
 *      responses:
 *          200:
 *              description: Successfully created
 */
app.post("/person", (request, response) => {
  var newPerson = request.body;
  connection.query(
    "insert persons set ? ",
    [newPerson],
    function (err, rows, fields) {
      if (err) throw err;
      response.send("Inserted: " + rows.insertId);
    }
  );
});

/**
 * @swagger
 * /person/:
 *    delete:
 *      tags:
 *        - Person
 *      summary: Deletes a person by id
 *      description: Deletes a single sperson by id
 *      produces:
 *          - application/json
 *      parameters:
 *       - name: id
 *         description: Person's id
 *         in: body
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: Successfully deleted
 */
app.delete("/person", (request, response) => {
  var id = request.body.id;
  connection.query(
    "delete from ficha7_backend.persons where id = ? ",
    [id],
    function (err, rows, fields) {
      response.send("Affected rows: " + rows.affectedRows);
    }
  );
});

/**
 * @swagger
 * /person/{id}:
 *    delete:
 *      tags:
 *        - Person
 *      summary: Deletes a person by id
 *      description: Deletes a single sperson by id
 *      produces:
 *          - application/json
 *      parameters:
 *       - name: id
 *         description: Person's id
 *         in: path
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: Successfully deleted
 */
app.delete("/person/:id", (request, response) => {});

/**
 * @swagger
 * /person/{id}:
 *    get:
 *      tags:
 *        - Person
 *      summary: Reads a single person by id
 *      description: Returns a single person
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: id
 *            description: Person's id
 *            in: path
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: A single person
 *              schema:
 *                $ref: '#/definitions/Person'
 */
app.get("/person/:id", (request, response) => {
  var id = request.params.id;
  connection.query(
    "select*from ficha7_backend.persons where id = ? ",
    [id],
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

/**
 * @swagger
 * /person/{age}/{profession}:
 *    get:
 *      tags:
 *        - Person
 *      summary: Reads a single person by age and profession
 *      description: Returns a single person
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: age
 *            description: Person's age
 *            in: path
 *            required: true
 *            type: string
 *          - name: profession
 *            description: Person's profession
 *            in: path
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: A single person
 *              schema:
 *                $ref: '#/definitions/Person'
 */
app.get("/person/:age/:profession", (request, response) => {
  var age = request.params.age;
  var profession = request.params.profession;
  connection.query(
    "select*from ficha7_backend.persons where age = ? and profession = ? ",
    [age, profession],
    function (err, rows, fields) {
      response.send(rows);
    }
  );
});

/**
 * @swagger
 * /person{id}:
 *    put:
 *      tags:
 *        - Person
 *      summary: Updates and stores a person
 *      description: Returns the id of the updated person
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: Id
 *            description: Person's id
 *            in: path
 *            required: true
 *          - name: Model
 *            description: Sample person
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/Person'
 *      responses:
 *          200:
 *              description: Successfully created
 */
app.put("/person/:id", (request, response) => {
  var id = request.params.id;
  var update = request.body;
  connection.query(
    "UPDATE persons set ? where id = ? ",
    [update, id],
    function (err, rows, fields) {
      response.send("Changed: " + id);
    }
  );
});

// método que arranca o servidor http e fica à escuta
app.listen(port, () => {
  console.log("Example app listening at http://localhost:${port}");
});
