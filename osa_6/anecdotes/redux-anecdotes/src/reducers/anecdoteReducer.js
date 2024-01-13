import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";
const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: initialState,
  reducers: {
    vote(state, action) {
      const anecdoteToFind = state.find(
        (anecdote) => anecdote.id === action.payload.id
      );
      const changedAnecdote = {
        ...anecdoteToFind,
        votes: anecdoteToFind.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      );
    },
    add(state, action) {
      state.push(action.payload);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    appendAllAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, add, appendAnecdote, appendAllAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    console.log("JERE I AM", anecdotes);
    dispatch(appendAllAnecdotes(anecdotes));
  };
};

export const postOneAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.postAnecdotes(content);
    dispatch(appendAnecdote(anecdote));
  };
};
export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdotesService.voteAnecdote(anecdote);
    dispatch(vote(votedAnecdote));
  };
};
export default anecdoteSlice.reducer;
