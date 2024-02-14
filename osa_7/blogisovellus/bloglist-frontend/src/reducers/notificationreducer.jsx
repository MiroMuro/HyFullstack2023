/* eslint-disable indent */
import { createContext, useContext, useReducer } from "react";
import { setToken } from "../services/blogs";
import { login } from "../services/login";
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return action.payload;
    case "DELETE":
      return action.payload;
    case "BADCREDENTIALS":
      return action.payload;
    case "VOTE":
      return action.payload;
    case null:
      return null;
  }
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("HELLo");
      window.localStorage.setItem(
        "loggedBlogger",
        JSON.stringify(action.payload)
      );
      setToken(action.payload.token);
      return action.payload;
    case "LOGOUT":
      window.localStorage.removeItem("loggedBlogger");
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  const [user, userDispatch] = useReducer(loginReducer, null);

  return (
    <NotificationContext.Provider
      value={[notification, notificationDispatch, user, userDispatch]}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotifDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};
export const useUserDispatch = () => {
  const userAndDispatch = useContext(NotificationContext);
  return userAndDispatch[3];
};

export const useUser = () => {
  const userAndDispatch = useContext(NotificationContext);
  return userAndDispatch[2];
};

export default NotificationContext;
