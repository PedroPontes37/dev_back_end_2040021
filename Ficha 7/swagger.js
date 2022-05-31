const swaggerAutogen = require("swagger-autogen")();

const outpuFile = "./swagger_output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outpuFile, endpointsFiles);
