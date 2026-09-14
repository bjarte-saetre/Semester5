import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import { Link } from 'react-router-dom';

const AddUser = () => {
  const [form, setForm] = useState({ name: '', email: '', country: '', photo: null });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  formData.append('name', form.name);
  formData.append('email', form.email);
  formData.append('country', form.country);
  if (form.photo) formData.append('photo', form.photo);
    try {
      await axios.post('http://localhost:3001/api/user', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/viewuser/${form.email}`);
    } catch (err) {
        console.error(err);
        setError('Failed to add user.');
    }
  };

  return (
    <main className="container">
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" className="nav-link">Home</Link>
      </div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <table className="form-table">
          <tbody>
            <tr>
              <td><label htmlFor="name">Name:</label></td>
              <td><input type="text" id="name" name="name" value={form.name} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="email">Email:</label></td>
              <td><input type="email" id="email" name="email" value={form.email} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="country">Country:</label></td>
              <td><input type="text" id="country" name="country" value={form.country} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="photo">Photo:</label></td>
              <td><input type="file" id="photo" name="photo" accept="image/*" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: 'right' }}>
                <button type="submit">Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
        {error && <div className="error">{error}</div>}
      </form>
    </main>
  );
};

export default AddUser;
