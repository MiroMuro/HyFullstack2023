var _ = require("lodash");
const blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs
        .map((blog) => Number(blog.likes))
        .reduce((acc, curVal) => acc + curVal, 0);
};
const favouriteBlog = (blogs) => {
  const favourite = blogs.find(
    (blog) =>
      Number(blog.likes) ===
      Math.max(...blogs.map((blog) => Number(blog.likes)))
  );
  return favourite;
};

const getHighestValueKey = (obj) => {
  //Goes through every authors name and returns the authors name with the most likes
  const key = _.maxBy(_.keys(obj), (key) => obj[key]);
  return key;
};

const mostBlogs = (blogs) => {
  //returns an object with each authors name as a key and their blogcount as the value to that key
  let authors = _.countBy(blogs, "author");

  const authorWithMostBlogs = {
    author: getHighestValueKey(authors),
    blogs: authors[getHighestValueKey(authors)],
  };
  return authorWithMostBlogs;
};

const authorWithMostLikes = (blogs) => {
  //returns an object with each authors name as a key and their likecount as the value to that key
  const authorsAndLikesObject = blogs.reduce((obj, el) => {
    obj[el.author] = (obj[el.author] || 0) + Number(el.likes);
    return obj;
  }, {});

  const TopLikedAuthor = {
    author: getHighestValueKey(authorsAndLikesObject),
    likes: authorsAndLikesObject[getHighestValueKey(authorsAndLikesObject)],
  };

  console.log(TopLikedAuthor);

  return TopLikedAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  authorWithMostLikes,
};
