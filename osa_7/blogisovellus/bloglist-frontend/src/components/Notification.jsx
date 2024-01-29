import { useContext } from "react";
import NotificationContext from "../reducers/notificationreducer";

const Notification = ({ status }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  if (notification === null) {
    return null;
  }
  return (
    <div id="notification" className={status}>
      {notification}
    </div>
  );
};

export default Notification;
