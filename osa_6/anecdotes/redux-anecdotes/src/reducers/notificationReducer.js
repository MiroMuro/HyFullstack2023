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

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(appendNotification(content));

    setTimeout(() => {
      dispatch(deleteNotification(""));
    }, time * 1000);

    console.log(time * 1000);
  };
};
export default notificationSlice.reducer;
