import { useDispatch, useSelector } from "react-redux";
import { handleVote } from "../reducers/anecdoteReducer";

const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(handleVote(id));
  };
  return (
    <div>
      {anecdotes
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
