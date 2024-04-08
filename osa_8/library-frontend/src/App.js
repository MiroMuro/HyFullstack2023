import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
const App = () => {
  const [token, setToken] = useState(null);
  const padding = { padding: 5 };
  return (
    <Router>
      <div>
        <div></div>
        <div>
          {!token && (
            <div>
              <Link style={padding} to="/">
                authors
              </Link>
              <Link style={padding} to="/books">
                books
              </Link>
              <Link style={padding} to="/login">
                Login
              </Link>
            </div>
          )}
          {token && (
            <div>
              <Link style={padding} to="/">
                authors
              </Link>
              <Link style={padding} to="/books">
                books
              </Link>
              <Link style={padding} to="/add">
                add book
              </Link>
              <Link style={padding} to="/recommendations ">
                recommendations
              </Link>
              <Link style={padding} to="/login" state={{ logoutStatus: true }}>
                Logout
              </Link>
            </div>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Authors token={token} />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
          <Route
            path="/login"
            element={<LoginForm token={token} setToken={setToken} />}
          />
          <Route path="/recommendations" element={<Recommendations />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
