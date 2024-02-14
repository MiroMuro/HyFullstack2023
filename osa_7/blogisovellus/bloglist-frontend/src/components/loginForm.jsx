import PropTypes from "prop-types";
import { Button, Checkbox, Form, Input } from "antd";
import { login } from "../services/login";
import {
  useUserDispatch,
  useNotifDispatch,
} from "../reducers/notificationreducer";
const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  const userDispatch = useUserDispatch();
  const notifDispatch = useNotifDispatch();

  const handleLoginXD = async (values) => {
    //event.preventDefault();
    const password = values.password;
    const username = values.username;
    try {
      const user = await login({
        username,
        password,
      });
      userDispatch({ type: "LOGIN", payload: user });
      setUsername("");
      setPassword("");
    } catch (exception) {
      notifDispatch({
        type: "BADCREDENTIALS",
        payload: "Wrong username or password!",
      });
      setTimeout(() => {
        notifDispatch({ type: null });
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Log in to Blog App</h1>
      <Form name="loginForm" style={{ maxWidth: 300 }} onFinish={handleLoginXD}>
        <Form.Item
          label="username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
