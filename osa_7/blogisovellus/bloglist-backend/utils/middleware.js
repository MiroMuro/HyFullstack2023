const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("express-async-errors");
const requestLogger = (request, response, next) => {
  logger.clog("Method:", request.method);
  logger.clog("Path:  ", request.path);
  logger.clog("Body:  ", request.body);
  logger.clog("---");
  next();
};

const tokenExctractor = (req, res, next) => {
  const auth = req.get("Authorization");
  if (auth && auth.startsWith("bearer ")) {
    const token = auth.replace("bearer ", "");
    req.token = token;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "invalid token!" });
  }
  const user = await User.findById(decodedToken.id);
  console.log(user.username);
  console.log(user);
  req.user = user;
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message, "nimi:", error.name);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: "invalid username!" });
  } else if (error.name === "SyntaxError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "token missing or invalid" });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExctractor,
  userExtractor,
};
