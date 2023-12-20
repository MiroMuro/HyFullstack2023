import Togglable from "./Togglable";
const Blog = ({ blog, updateBlog }) => (
  <div style={{ border: "2px solid black", padding: "10px", margin: "10px" }}>
    {blog.title}
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
      </div>
    </Togglable>
  </div>
);

export default Blog;
