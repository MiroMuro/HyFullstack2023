import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: " ",
  reducers: {
    filterReducer(state, action) {
      return action.payload;
    },
    handleFilterChange(state, action) {
      return action.payload;
    },
  },
});

export const { handleFilterChange } = filterSlice.actions;
export default filterSlice.reducer;
