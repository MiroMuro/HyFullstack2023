import { useDispatch } from "react-redux";
import {
  appendNotification,
  deleteNotification,
} from "../reducers/notificationReducer";
import { postOneAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    dispatch(postOneAnecdote(anecdote));

    dispatch(appendNotification(`You added "${anecdote}"`));
    setTimeout(() => dispatch(deleteNotification("")), 5000);
  };

  return (
    <div>
      <h2>Create an anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
