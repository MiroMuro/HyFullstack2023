const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");
require("express-async-errors");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
    .populate("user", {
      username: 1,
      name: 1,
      id: 1,
    })
    .populate("comments");
  res.json(blogs);
});

blogsRouter.post("/", userExtractor, async (req, res) => {
  const body = req.body;
  if (!body.likes) {
    body.likes = 0;
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: req.user._id,
  });

  const savedblog = await blog.save();
  req.user.blogs = req.user.blogs.concat(savedblog._id);
  await req.user.save();
  res.status(201).json(savedblog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const blogToAddCommentTo = await Blog.findById(request.params.id);
  const body = request.body;
  console.log(body);
  const comment = new Comment({
    content: body.content,
  });

  const savedComment = await comment.save();

  blogToAddCommentTo.comments =
    blogToAddCommentTo.comments.concat(savedComment);

  await Blog.findByIdAndUpdate(request.params.id, blogToAddCommentTo, {
    new: true,
  });

  response.status(201).json(savedComment);
});

blogsRouter.delete("/:id", userExtractor, async (req, res) => {
  const blogToDelete = await Blog.findById(req.params.id);
  console.log(req.user);
  console.log(blogToDelete);
  if (blogToDelete.user.equals(req.user._id)) {
    await Blog.findByIdAndDelete(req.params.id);
    res
      .json({
        status: `Deletion successful, a blog called ${blogToDelete.title} was deleted`,
      })
      .end();
  } else {
    res.json({ error: "Unauthorized user!" }).end();
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const blogToUpdate = req.body;
  await Blog.findByIdAndUpdate(req.params.id, blogToUpdate, { new: true });
  res.json();
});

module.exports = blogsRouter;
