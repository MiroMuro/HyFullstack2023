import { useDispatch, useSelector } from "react-redux";
import { handleVote } from "../reducers/anecdoteReducer";

const AnecdotesList = () => {
  const anecdotesList = useSelector(({ anecdotes, filter }) => {
    if (filter === null) {
      return anecdotes;
    } else {
      return anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter)
      );
    }
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(handleVote(id));
  };
  return (
    <div>
      {anecdotesList
        .sort((a, b) => (a.votes < b.votes ? 1 : -1))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default AnecdotesList;
