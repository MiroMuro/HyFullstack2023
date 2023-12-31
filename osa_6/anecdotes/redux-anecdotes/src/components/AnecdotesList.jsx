import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { appendNotification } from "../reducers/notificationReducer.js";
import { deleteNotification } from "../reducers/notificationReducer.js";
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
    dispatch(appendNotification(`You voted "${anecdote.content}"`));
    dispatch(vote(anecdote.id));
    setTimeout(() => dispatch(deleteNotification("")), 5000);
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
