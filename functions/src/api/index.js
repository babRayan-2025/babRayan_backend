const app = require("express")();

const authHandler = require("./auth/routes");
const userHandler = require("./users/routes");
const membersHandler = require("./member/routes");
const newsHandler = require("./news/routes");
const donHandler = require("./don/routes");

app.use("/auth", authHandler);
app.use("/users", userHandler);
app.use("/members", membersHandler);
app.use("/news", newsHandler);
app.use("/don", donHandler);

module.exports = app;