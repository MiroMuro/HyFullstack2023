import { add } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { appendNotification } from "../reducers/notificationReducer";
import { deleteNotification } from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    const postedAnecdote = await anecdotesService.postAnecdotes(anecdote);
    dispatch(add(postedAnecdote));
    event.target.anecdote.value = "";
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
