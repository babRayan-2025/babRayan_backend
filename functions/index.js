const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const server = express();
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(
  cors({
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
server.use(require("helmet")());

// ROUTES
const api =  require("./src/api")
server.use("/v1", api);

exports.api = onRequest(server);
