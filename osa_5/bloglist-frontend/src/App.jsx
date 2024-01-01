import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/loginForm";
import loginService from "./services/login";
import Toggable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import "./index.css";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [x, setX] = useState([]);
  const [message, setMessage] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const blogFormRef = useRef();
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [x]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogger");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    await blogService.postBlog(blogObject);
    blogFormRef.current.toggleVisibility();
    setX([...x, x + 1]);
  };

  const addLikeToBlog = async (blogObject) => {
    console.log(blogObject);
    await blogService.updateBlog(blogObject);
    setX([...x, x + 1]);
  };

  const deleteBlog = async (blogid, blogauthor, blogtitle) => {
    console.log("Deleting", blogid, blogauthor, blogtitle);
    if (window.confirm(`Remove blog ${blogtitle} by: ${blogauthor}?`)) {
      await blogService.deleteBlog(blogid);
      setX([...x, x + 1]);
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogger", JSON.stringify(user));
      setUser(user);
      console.log("Kirjautunut", user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong username or password!");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      console.log(message);
    }
  };

  const Notification = ({ message, status }) => {
    if (message === null) {
      return null;
    }
    return (
      <div id="notification" className={status}>
        {message}
      </div>
    );
  };

  return (
    <div>
      {!user && (
        <div>
          <div>
            <Notification message={message} status={"error"} />
            <Toggable buttonLabel="login">
              <LoginForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
              />
            </Toggable>
          </div>
        </div>
      )}

      {user && (
        <div>
          <div>
            <Notification message={message} status={"success"} />
          </div>
          <h1>Blogs</h1>
          <h2>{user.name} logged in</h2>
          <div>
            <button
              onClick={() => {
                window.localStorage.removeItem("loggedBlogger");
                setUser(null);
              }}
            >
              Logout
            </button>
          </div>
          <Toggable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggable>
          <br />
          {blogs
            .sort((a, b) => (a.likes < b.likes ? 1 : -1))
            .map((blog) => (
              <Blog
                key={blog.id}
                updateBlog={addLikeToBlog}
                blog={blog}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
