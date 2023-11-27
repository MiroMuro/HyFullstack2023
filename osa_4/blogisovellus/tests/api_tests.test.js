const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const config = require("../utils/config");
beforeAll(async () => {
  /*console.log(mongoose.connection.getClient());*/
});
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});
test("Blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
test("Correct amount of blogs are returned in the correct form", async () => {
  const res = await api
    .get("/api/blogs ")
    .expect("Content-Type", /application\/json/);
  expect(res).toHaveLength(helper.initialBlogs.length);
});
test("A blog post can be appended to the db", async () => {
  const newBlog = {
    title: "My nepalese restaurant reviews",
    author: "Henry Simmons",
    url: "https://blogspot/apu/nepresrev",
    likes: 22,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const uploadedBlogs = await helper.blogsInDB();

  expect(uploadedBlogs).toHaveLength(helper.initialBlogs.length + 1);
  const titles = uploadedBlogs.map((blog) => blog.title);
  expect(titles).toContain("My nepalese restaurant reviews");
});
afterAll(async () => {
  mongoose.connection.close;
});
