import { useState, useEffect, useRef, useReducer } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/loginForm";
import loginService from "./services/login";
import Toggable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import notificationReducer from "./reducers/notificationreducer";
import { NotificationContextProvider } from "./reducers/notificationreducer";
import NotificationContext from "./reducers/notificationreducer";
import { useContext } from "react";
import {
  useNotifDispatch,
  useUserDispatch,
  useUser,
} from "./reducers/notificationreducer";
import "./index.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll, postBlog, updateBlog, deleteBlog } from "./services/blogs";
import { login } from "./services/login";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const userDispatch = useUserDispatch();

  const theuser = useUser();

  const notifDispatch = useNotifDispatch();

  const queryClient = useQueryClient();

  const blogFormRef = useRef();

  const blogVoteMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bugs"] });
    },
  });

  const newBlogMutation = useMutation({
    mutationFn: postBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bugs"] });
    },
  });

  const removeBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bugs"] });
    },
  });

  const result = useQuery({
    queryKey: ["bugs"],
    queryFn: getAll,
  });

  const bugs = result.data;

  /*useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogger");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);*/

  const addBlog = (blogObject) => {
    newBlogMutation.mutate(blogObject);
    blogFormRef.current.toggleVisibility();
    notifDispatch({
      type: "ADD",
      payload: `${blogObject.title} by ${blogObject.author} added`,
    });
    setTimeout(() => {
      notifDispatch({ type: null });
    }, 5000);
  };

  const addLikeToBlog = async (blogObject) => {
    blogVoteMutation.mutate(blogObject);

    notifDispatch({
      type: "VOTE",
      payload: `Voted "${blogObject.title}" by ${blogObject.author}`,
    });
    setTimeout(() => {
      notifDispatch({
        type: null,
      });
    }, 5000);
  };

  const removeBlog = async (blog) => {
    console.log("Deleting", blog.id, blog.author, blog.title);
    if (window.confirm(`Remove blog ${blog.title} by: ${blog.author}?`)) {
      removeBlogMutation.mutate(blog.id);
      notifDispatch({
        type: "DELETE",
        payload: `${blog.title} by ${blog.author} removed.`,
      });
      setTimeout(() => {
        notifDispatch({ type: null });
      }, 5000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      userDispatch({ type: "LOGIN", payload: user });
      setUsername("");
      setPassword("");
    } catch (exception) {
      notifDispatch({
        type: "BADCREDENTIALS",
        payload: "Wrong username or password!",
      });
      setTimeout(() => {
        notifDispatch({ type: null });
      }, 5000);
    }
  };

  return (
    <div>
      {!theuser && (
        <div>
          <div>
            <Notification status={"error"} />
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

      {theuser && (
        <div>
          <div>
            <Notification message={message} status={"success"} />
          </div>
          <h1>Blogs</h1>
          <h2>{theuser.name} logged in</h2>
          <div>
            <button
              onClick={() => {
                userDispatch({ type: "LOGOUT", payload: "swag" });
              }}
            >
              Logout
            </button>
          </div>
          <Toggable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggable>
          <br />
          {!bugs && <div>Loading....</div>}
          {bugs &&
            bugs
              .sort((a, b) => (a.likes > b.likes ? 1 : -1))
              .map((blog) => (
                <Blog
                  key={blog.id}
                  updateBlog={addLikeToBlog}
                  blog={blog}
                  deleteBlog={removeBlog}
                  user={theuser}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default App;
