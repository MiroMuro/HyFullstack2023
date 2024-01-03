import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    appendNotification(state, action) {
      return action.payload;
    },
    deleteNotification(state, action) {
      return false;
    },
  },
});
export const { appendNotification, deleteNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
