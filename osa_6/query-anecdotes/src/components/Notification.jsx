import { useEffect, useState } from "react";
import { useNotif } from "./NotificationContext";
const Notification = () => {
  const notif = useNotif();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  }, [notif]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return isVisible && notif ? <div style={style}>{notif}</div> : <div></div>;
  ///////////////////////////////////////////////////// if (true) return null;
};

export default Notification;
