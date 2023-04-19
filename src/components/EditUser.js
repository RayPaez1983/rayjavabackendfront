import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Users = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState({
    name: '',
    username: '',
    email: '',
  });
  const { name, username, email } = editUser;

  const onInputChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/user/${id}`, editUser);
    navigate('/');
  };
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setEditUser(result.data);
  };
  return (
    <div>
      Ray ki
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
