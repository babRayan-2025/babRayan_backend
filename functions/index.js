/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
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