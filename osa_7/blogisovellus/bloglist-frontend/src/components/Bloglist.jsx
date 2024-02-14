import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../reducers/notificationreducer";
const Bloglist = ({ blogs, updateBlog, deleteBlog, createBlog }) => {
  const user = useUser();
  const blogFormRef = useRef();
  return (
    <div>
      {!blogs && <div>Loading...</div>}
      {blogs && (
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => (a.title > b.title ? -1 : 1))
            .map((blog) => (
              <div className="blog" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default Bloglist;
