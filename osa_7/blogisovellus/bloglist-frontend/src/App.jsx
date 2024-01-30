import { useState, useRef, useEffect } from "react";
import Blog from "./components/Blog";
import Bloglist from "./components/Bloglist";
import Userlist from "./components/Userlist";
import LoginForm from "./components/loginForm";
import loginService from "./services/login";
import Toggable from "./components/Togglable";
import Home from "./components/Home";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import User from "./components/User";
import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";
import {
  useNotifDispatch,
  useUserDispatch,
  useUser,
} from "./reducers/notificationreducer";
import "./index.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll, postBlog, updateBlog, deleteBlog } from "./services/blogs";
import { getAllUsers } from "./services/users";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUsersData] = useState([]);
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogger");
    if (loggedUserJSON) {
      userDispatch({ type: "LOGIN", payload: JSON.parse(loggedUserJSON) });
    }
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const res = await getAllUsers();
      setUsersData(res);
    };
    getUserData();
  }, []);

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
    console.log("Täällä", blogObject);
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

  const userMatch = useMatch("/users/:id");
  const matchedUser = userMatch
    ? userData.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const matchedBlog = blogMatch
    ? bugs.find((blog) => blog.id === blogMatch.params.id)
    : null;

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

          <br />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  blog={matchedBlog}
                  updateBlog={addLikeToBlog}
                  deleteBlog={removeBlog}
                />
              }
            />
            <Route
              path="/blogs"
              element={
                <Bloglist
                  blogs={bugs}
                  updateBlog={addLikeToBlog}
                  deleteBlog={removeBlog}
                  createBlog={addBlog}
                />
              }
            />
            <Route path="/users/:id/" element={<User user={matchedUser} />} />
            <Route path="/users" element={<Userlist userData={userData} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
