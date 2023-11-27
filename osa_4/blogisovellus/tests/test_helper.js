const Blog = require("../models/blog");

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

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  console.log(blogs.map((blog) => blog.toJSON()));
  return blogs;
};

module.exports = { initialBlogs, blogsInDB };
