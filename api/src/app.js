const express = require("express");
const routes = require("./routes/index.js");
const cors = require("cors");
const server = express();

server.name = "API";

server.use(cors());
server.use("/", routes);
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.header("Access-Control-Allow-Origin", "*");
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
