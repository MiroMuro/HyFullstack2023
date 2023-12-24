const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
//const Blog = require("./models/blog");
const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
require("express-async-errors");
const { clog, error } = require("./utils/logger");
const middleware = require("./utils/middleware");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    clog("connected to MongoDB");
  })
  .catch((err) => {
    error(err.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(middleware.tokenExctractor);
app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
