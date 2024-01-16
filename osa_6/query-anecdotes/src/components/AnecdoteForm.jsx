import PropTypes from "prop-types";
import { useNotifDispatch } from "./NotificationContext";
const AnecdoteForm = (props) => {
  const dispatch = useNotifDispatch();
  AnecdoteForm.propTypes = {
    mutateAnecdote: PropTypes.object,
  };
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch({ type: "add", payload: content });
    event.target.anecdote.value = "";
    props.mutateAnecdote.mutate({ content: content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
