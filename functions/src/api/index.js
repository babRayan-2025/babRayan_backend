const app = require("express")();

const userHandler = require("./users/routes");

app.use("/users", userHandler);

module.exports = app;