const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const Blog = require("./models/blog");
const blogsRouter = require("./controllers/blogs");
const { clog, error } = require("./utils/logger");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    clog("connected to MongoDB");
  })
  .catch((err) => {
    error(err);
  });
console.log("dddd");
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/blogs", blogsRouter);

app.use(requestLogger);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
