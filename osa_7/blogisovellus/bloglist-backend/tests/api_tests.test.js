const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
//const config = require("../utils/config");
beforeAll(async () => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash("password", saltRounds);
  //The password must be hashed here as beforeAll doesnt wait for await operations in other files.
  //The password must be also hashed for the bcrpyt.compare function in login.js
  const user = {
    username: "360_xx_noscopejackieChan",
    name: "Simo Jääskeläinen",
    password: passwordHash,
    blogs: [],
  };
  await User.deleteMany({});
  await User.insertMany(user);
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
  const users = await helper.usersInDb();
  //The password here is the same that is manually set in beforeAll
  const userForLogin = {
    username: users[0].username,
    password: "password",
  };
  const res = await api
    .post("/api/login/")
    .send(userForLogin)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const loginToken = res.body.token;

  const newBlog = {
    title: "My nepalese restaurant reviews",
    author: "Henry Simmons",
    url: "https://blogspot/api/nepresrev",
    likes: 22,
  };

  await api
    .post("/api/blogs")
    .set({ Authorization: `bearer ${loginToken}` })
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

  const users = await helper.usersInDb();
  //The password here is the same that is manually set in beforeAll
  const userForLogin = {
    username: users[0].username,
    password: "password",
  };
  const res = await api
    .post("/api/login/")
    .send(userForLogin)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const loginToken = res.body.token;

  await api
    .post("/api/blogs")
    .set({ Authorization: `bearer ${loginToken}` })
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

test("A blog can be deleted", async () => {
  //A blog post must first be succesfully appended to the db, before it can be deleted
  //for a blog post needs an user field, with the users id to so it can be deleted.
  const users = await helper.usersInDb();
  //The password here is the same that is manually set in beforeAll
  const userForLogin = {
    username: users[0].username,
    password: "password",
  };
  const res = await api
    .post("/api/login/")
    .send(userForLogin)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const loginToken = res.body.token;

  const newBlog = {
    title: "My nepalese restaurant reviews",
    author: "Henry Simmons",
    url: "https://blogspot/api/nepresrev",
    likes: 22,
  };

  await api
    .post("/api/blogs")
    .set({ Authorization: `bearer ${loginToken}` })
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await helper.blogsInDB();
  //This is the blog that was just appended to the end of the database
  const blogToBeDeleted = blogs[blogs.length - 1];

  await api
    .delete(`/api/blogs/${blogToBeDeleted.id}`)
    .set({ Authorization: `bearer ${loginToken}` })
    .expect(200);

  const laterBlogs = await helper.blogsInDB();

  expect(laterBlogs.length).toBe(blogs.length - 1);
});

test("A blog can be updated", async () => {
  const blogs = await helper.blogsInDB();

  console.log("Ennen puttia", blogs[0]);

  const blogToBeUpdated = {
    id: blogs[0].id,
    title: blogs[0].title,
    author: blogs[0].author,
    url: blogs[0].url,
    likes: 9999,
  };

  await api
    .put(`/api/blogs/${blogToBeUpdated.id}`)
    .send(blogToBeUpdated)
    .expect(200);
  const blogsAfterUpdate = await helper.blogsInDB();
  expect(blogsAfterUpdate[0]).toHaveProperty("likes", 9999);
});
afterAll(async () => {
  mongoose.connection.close();
});
