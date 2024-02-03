import { Link } from "react-router-dom";
import { useUser, useUserDispatch } from "../reducers/notificationreducer";
import { Button, Breadcrumb } from "antd";
const Navbar = () => {
  const user = useUser();
  const userDispatch = useUserDispatch();
  return (
    <div>
      {user && (
        <Breadcrumb
          items={[
            {
              title: <Link to={`/blogs`}>Blogs</Link>,
            },
            {
              title: <Link to={`/users`}>Users</Link>,
            },
            {
              title: (
                <Button
                  type="primary"
                  size="small"
                  danger
                  onClick={() => userDispatch({ type: "LOGOUT" })}
                >
                  Logout
                </Button>
              ),
            },
          ]}
        />
      )}
    </div>
  );
};
export default Navbar;
