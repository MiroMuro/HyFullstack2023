const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogsRouter.post("/", (req, res, next) => {
  const body = new Blog(req.body);

  body.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogsRouter;
