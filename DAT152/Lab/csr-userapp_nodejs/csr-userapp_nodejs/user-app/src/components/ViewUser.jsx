import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css';

const ViewUser = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/users/${email}`)
      .then(res => setUser(res.data))
      .catch(() => setError('Failed to fetch user.'));
  }, [email]);

  if (error) return <div className="error">{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <main className="container">
      <Link to="/" className="nav-link">Home</Link>
      <h2>{user.name}</h2>
      <div>
        {user.photoUrl && <img src={user.photoUrl} alt="Profile" width="100" height="90" />}
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Country:</strong> {user.country}</div>
      </div>
    </main>
  );
};

export default ViewUser;
