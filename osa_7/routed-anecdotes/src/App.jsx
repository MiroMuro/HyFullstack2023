import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";
import useField from "./hooks/index.js";
import Table from "react-bootstrap/Table";

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>
      {anecdote.content} by {anecdote.author}
    </h2>
    <p>has {anecdote.votes} votes</p>
    <p>
      for more info see <a href={anecdote.info}>{anecdote.info}</a>
    </p>
  </div>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Table bordered striped hover>
      <th>Anecdotes</th>
      <tbody>
        {anecdotes.map((anecdote) => (
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const navigate = useNavigate();

  /*const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");
*/

  const content = useField("content");
  const author = useField("author");
  const info = useField("info");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    navigate("/");
  };

  const handleReset = (e) => {
    console.log(e.target.value);
    content.onChange(e);
    author.onChange(e);
    info.onChange(e);
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type="reset" value="" onClick={(e) => handleReset(e)}>
          reset
        </button>
      </form>
    </div>
  );
};

const Notification = ({ notification }) => {
  const style = { border: "2px solid black" };
  if (notification) {
    return <p style={{ border: "2px solid black" }}>{notification}</p>;
  } else {
    return <p></p>;
  }
};

const App = () => {
  const padding = {
    padding: 5,
  };
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    setNotification(`a new anecdote ${anecdote.content} created!`);
    setTimeout(() => setNotification(""), 5000);
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes([...anecdotes, anecdote]);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;
  console.log(anecdote);

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Link style={padding} to="/">
        Anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new anecdote
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
      <Link style={padding} to="/anecdotes/:id"></Link>
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route
          path="/anecdotes/:id/"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>
      <br />
      <Footer />
    </div>
  );
};

export default App;
