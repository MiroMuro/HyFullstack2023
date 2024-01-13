import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer.js";
import { voteAnecdote } from "../reducers/anecdoteReducer.js";
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
  const addVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
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
              <button onClick={() => addVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default AnecdotesList;
