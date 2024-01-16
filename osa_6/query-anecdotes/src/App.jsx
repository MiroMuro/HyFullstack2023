import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAllAnecdotes, postAnecdote, voteAnecdote } from "./requests";
import { useNotifDispatch } from "./components/NotificationContext";
const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotifDispatch();
  const mutateAnecdote = useMutation({
    mutationFn: postAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
    onError: () => {
      dispatch({
        type: "error",
        payload: "Anecdote length too short, must have length of 5 or more",
      });
    },
  });

  const vote = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });
  const handleVote = (anecdote) => {
    dispatch({ type: "vote", payload: anecdote.content });
    vote.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAllAnecdotes,
  });

  if (result.isPending) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return (
      <div>anecdote service is not available due to problems in server</div>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm mutateAnecdote={mutateAnecdote} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
