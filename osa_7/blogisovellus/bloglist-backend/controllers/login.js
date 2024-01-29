const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  console.log(user);
  //The user found from the db above contains the encrypted password for it is stored in a database
  //The unencrypted password is sent in the requets body.
  //The compare function here takes one unencrypted and one encrypted password.
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);
  console.log(user, passwordCorrect);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id });
});

module.exports = loginRouter;
