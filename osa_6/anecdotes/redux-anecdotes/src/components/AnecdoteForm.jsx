import { add } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { appendNotification } from "../reducers/notificationReducer";
import { deleteNotification } from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    dispatch(add(anecdote));
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
