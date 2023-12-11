const loginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => (
  <div>
    <h1>Log in to application</h1>
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>
        password:
        <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
);

export default loginForm;
