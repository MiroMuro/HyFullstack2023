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
module.exports = { dummy, totalLikes, favouriteBlog };
