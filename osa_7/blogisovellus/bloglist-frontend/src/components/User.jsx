const User = ({ user }) => {
  return (
    <div>
      {!user && <div>Loading user..</div>}
      {user && (
        <div>
          <h1>{user.name}</h1>

          <h2>added blogs:</h2>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;
