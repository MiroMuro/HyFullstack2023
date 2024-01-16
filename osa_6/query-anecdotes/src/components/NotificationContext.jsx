import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "vote":
      console.log("Voted here");
      console.log(action.payload);
      return (state = `Anecdote '${action.payload}' voted`);
    case "add":
      console.log("Added here");
      console.log(action.payload);
      return (state = `Anecdote '${action.payload}' added`);
    case "error":
      return (state = action.payload);
    default:
      return state;
  }
};
const NotificationContext = createContext();

export const useNotifDispatch = () => {
  const notifAndDispatch = useContext(NotificationContext);
  return notifAndDispatch[1];
};

export const useNotif = () => {
  const notifAndDispatch = useContext(NotificationContext);
  return notifAndDispatch[0];
};

export const NotificationContextProvider = (props) => {
  const [notification, notifDispatch] = useReducer(notificationReducer, "");

  return (
    <NotificationContext.Provider value={[notification, notifDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
