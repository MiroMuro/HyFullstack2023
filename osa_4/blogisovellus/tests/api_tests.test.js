const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
//const config = require("../utils/config");
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
test("Correct amount of blogs are returned", async () => {
  const res = await api.get("/api/blogs ");

  expect(res.body).toHaveLength(helper.initialBlogs.length);
});
test("Blogs are returned in the correct form", async () => {
  await api.get("/api/blogs").expect("Content-Type", /application\/json/);
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
test("A like field with no value will be replaced with the number zero", async () => {
  const blogWithNoLike = {
    title: "Horrible blog with no likes",
    author: "Henry Horrible",
    url: "https://blogspot/api/horribleblog",
    likes: "",
  };

  await api
    .post("/api/blogs")
    .send(blogWithNoLike)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const uploadedBlogs = await helper.blogsInDB();

  expect(uploadedBlogs).toHaveLength(helper.initialBlogs.length + 1);

  const blogWithNoLikeInDb = uploadedBlogs.find(
    (blog) => blog.title === "Horrible blog with no likes"
  );
  expect(blogWithNoLikeInDb.likes).toBe(0);
});
test("The identifying field is called id and it exists", async () => {
  const res = await api.get("/api/blogs");
  for (let blogi of res.body) {
    expect(blogi).toHaveProperty("id");
  }
});
test("Blog without an title or an author cant be appended", async () => {
  const blogWithNoName = {
    title: "",
    author: "James Jones",
    url: "https://blogspot/api/emptyblog",
    likes: 500,
  };

  const blogWithNoUrl = {
    title: "Blog title about something",
    author: "Jesse",
    url: "",
    likes: 4,
  };
  await api.post("/api/blogs").send(blogWithNoName).expect(400);
  await api.post("/api/blogs").send(blogWithNoUrl).expect(400);
});
afterAll(async () => {
  mongoose.connection.close();
});
