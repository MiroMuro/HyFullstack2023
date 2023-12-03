const bcrypt = require("bcrypt");

const Blog = require("../models/blog");
const User = require("../models/user");
const initialBlogs = [
  {
    title: "Kokkaus blogi",
    author: "Kalle Kolmonen",
    url: "https://blogspot/api/cooking",
    likes: 145,
  },
  {
    title: "Joogan hyödyt",
    author: "Janne Joogaaja",
    url: "https://blogspot/api/jooga",
    likes: 23,
  },
  {
    title: "Netflixin salaiset helmet",
    author: "Petteri Vainanen",
    url: " https://blogpost/api/netsalhel",
    likes: 9,
  },
  {
    title: "Laivojen mastot",
    author: "Rocky Balboa",
    url: " https://blogpost/api/laivamast",
    likes: 2343,
  },
];
const initialUsers = [
  {
    username: "Stogggu",
    name: "Matias Paavola",
    password: "password",
  },
  {
    username: "salsagray6762grimreaper",
    name: "Salli Saukkola",
    password: "password",
  },
  {
    username: "xx_sniper360noscope_xx",
    name: "Juha-Pekka Toimarinen",
    password: "salasana",
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};
const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDB,
  usersInDb,
  returnUser,
};
