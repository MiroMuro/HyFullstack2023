import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
const Userlist = ({ userData }) => {
  return (
    <div>
      <h1>Users</h1>
      <table>
        <tr>
          <td></td>
          <td>Blogs created</td>
        </tr>
        {userData.map((user) => (
          <tr key={user.id}>
            <Link to={`/users/${user.id}`}>
              <td>{user.name}</td>
            </Link>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Userlist;
