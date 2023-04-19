import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SingleUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleUSer, setSingleUSer] = useState({
    name: '',
    username: '',
    email: '',
  });
  const { name, username, email } = singleUSer;

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setSingleUSer(result.data);
  };
  return (
    <div>
      <button onClick={() => navigate('/')}>Back to Home</button>
      Single User
      <div>
        <h3>{name}</h3>
        <h2>{username}</h2>
        <h3>{email}</h3>
      </div>
    </div>
  );
};

export default SingleUser;
