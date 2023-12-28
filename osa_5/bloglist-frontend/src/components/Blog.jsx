import Togglable from "./Togglable";
import { useState } from "react";
const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const creatorOfBlog = blog.user.id === user.id ? true : false;
  const [show, setShow] = useState(true);
  return (
    <div>
      {show && (
        <div
          className="blog"
          style={{ border: "2px solid black", padding: "10px", margin: "10px" }}
        >
          <p>
            {blog.title}, {blog.author}{" "}
            <button onClick={() => setShow(!show)}>View</button>
          </p>
        </div>
      )}
      {!show && (
        <div
          className="blog"
          style={{ border: "2px solid black", padding: "10px", margin: "10px" }}
        >
          <p>
            {blog.title}, {blog.author}{" "}
            <button onClick={() => setShow(!show)}>Close</button>
          </p>
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
            {user.name}
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
        </div>
      )}
    </div>
  );
};

export default Blog;
