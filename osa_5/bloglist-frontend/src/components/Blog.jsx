import Togglable from "./Togglable";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const creatorOfBlog = blog.user.id === user.id ? true : false;
  return (
    <div style={{ border: "2px solid black", padding: "10px", margin: "10px" }}>
      <p>{blog.title}</p>
      <Togglable buttonLabel="view">
        {blog.url} <br />
        <div>
          <p>
            likes {blog.likes}{" "}
            <button
              onClick={() =>
                updateBlog({
                  id: blog.id,
                  title: blog.title,
                  author: blog.author,
                  url: blog.url,
                  likes: blog.likes + 1,
                })
              }
            >
              like
            </button>
          </p>
          {blog.author}
          {creatorOfBlog && (
            <button
              onClick={() => deleteBlog(blog.id, blog.author, blog.title)}
              style={{ backgroundColor: "red" }}
            >
              Delete
            </button>
          )}
          {!creatorOfBlog}
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
