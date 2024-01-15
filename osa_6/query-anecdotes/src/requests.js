import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAllAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const postAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data);

export const voteAnecdote = (votedAnecdote) =>
  axios
    .put(`${baseUrl}/${votedAnecdote.id}`, votedAnecdote)
    .then((res) => res.data);
