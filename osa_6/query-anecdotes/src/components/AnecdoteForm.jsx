import PropTypes from "prop-types";

const AnecdoteForm = (props) => {
  AnecdoteForm.propTypes = {
    mutateAnecdote: PropTypes.object,
  };
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
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
