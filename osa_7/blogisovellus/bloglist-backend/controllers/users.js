const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
require("express-async-errors");
usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  if (!password || password.length < 3) {
    res.status(400).json({ error: "invalid password" }).end();
  }

  const user = new User({
    username,
    name,
    password: passwordHash,
  });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

usersRouter.get("/", async (req, res) => {
  const results = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  res.json(results);
});

module.exports = usersRouter;
