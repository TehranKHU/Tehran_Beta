const express = require("express");
const morgan = require("morgan");

const commentRouter = require("./commentRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(`${__dirname}/styles`));

app.use(commentRouter);

module.exports = app;
