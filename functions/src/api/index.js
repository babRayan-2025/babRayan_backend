const app = require("express")();

const authHandler = require("./auth/routes");
const userHandler = require("./users/routes");

app.use("/auth", authHandler);
app.use("/users", userHandler);

module.exports = app;