import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Users = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [createUser, setCreateUser] = useState({
    name: '',
    username: '',
    email: '',
  });
  const { name, username, email } = createUser;

  const onInputChange = (e) => {
    setCreateUser({ ...createUser, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/user', createUser);
    setTimeout(() => {
      setCreateUser({
        name: '',
        username: '',
        email: '',
      });
    }, 1000);
  };
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    loadUsers();
  };
  useEffect(() => {
    loadUsers();
  }, [users, createUser]);
  const loadUsers = async () => {
    const result = await axios.get('http://localhost:8080/users');
    setUsers(result.data);
  };
  return (
    <div>
      Ray ki
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        {users.map((user, idx) => {
          return (
            <tbody key={idx} onClick={() => navigate(`/singleuser/${user.id}`)}>
              <tr>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td> {user.email}</td>
                <td>
                  {' '}
                  <Link to={`/edituser/${user.id}`}>Edit User</Link>
                </td>
                <td>
                  {' '}
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            placeholder="Enter your User Name"
            name="username"
            value={username}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Users;
