import axios from "axios";

const baseUrl = "http://localhost:5174/anecdotes";

const getAll = async () => {
  const results = await axios.get(baseUrl);
  return results.data;
};

const postAnecdotes = async (content) => {
  const anecdoteToPost = { content: content, votes: 0 };
  const res = await axios.post(baseUrl, anecdoteToPost);
  return res.data;
};

const voteAnecdote = async (anecdote) => {
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote);
  console.log(res.data);
  return res.data;
};
export default { getAll, postAnecdotes, voteAnecdote };
