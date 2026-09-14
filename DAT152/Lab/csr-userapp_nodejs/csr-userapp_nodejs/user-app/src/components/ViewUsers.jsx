import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then(res => {
        let data = res.data;
        if (!Array.isArray(data) && typeof data === 'object' && data !== null) {
          // Convert object/map to array
          data = Object.values(data);
        }
        setUsers(data);
      })
      .catch(() => setError('Failed to fetch users.'));
  }, []);

  return (
    <main className="container">
      <Link to="/" className="nav-link">Home</Link>
      <h2>Registered Users</h2>
      {error && <div className="error">{error}</div>}
      <table className="users-table">
        <tbody>
          {users.map(user => (
            <tr key={user.email} className="user-item">
              <td>{user.photoUrl && <img src={user.photoUrl} alt="" width="100" height="90" />}</td>
              <td><Link to={`/viewuser/${user.email}`} className="user-name-link">{user.name}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default ViewUsers;
