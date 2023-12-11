import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/loginForm";
import loginService from "./services/login";
import "./index.css";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [x, setX] = useState([]);
  const [message, setMessage] = useState(null);
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

  const addBlog = async (event) => {
    event.preventDefault();
    await blogService.postBlog(blog);
    setX(...x, 1);
    setBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBlog((prevState) => ({ ...prevState, [name]: value }));
    console.log(blog);
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
      blogService.setToken(user.setToken);
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
    console.log(status);
    if (message === null) {
      return null;
    }
    return <div className={status}>{message}</div>;
  };

  return (
    <div>
      {!user && (
        <div>
          <div>
            <Notification message={message} status={"error"} />
          </div>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      )}

      {user && (
        <div>
          <div>
            <Notification message={message} status={"success"} />
          </div>
          <h1>blogs</h1>
          <h2>{user.name} logged in</h2>
          <div>
            <form onSubmit={addBlog}>
              <div>
                Author:
                <input
                  name="author"
                  value={blog.author}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div>
                Title:
                <input
                  name="title"
                  value={blog.title}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div>
                Url:
                <input
                  name="url"
                  value={blog.url}
                  onChange={handleInputChange}
                ></input>
              </div>
              <button type="submit">Create</button>
            </form>
          </div>
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
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
        </div>
      )}
    </div>
  );
};

export default App;
