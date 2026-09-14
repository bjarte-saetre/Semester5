import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddUser from './components/AddUser';
import ViewUsers from './components/ViewUsers';
import ViewUser from './components/ViewUser';
import './styles.css';

function Home() {
  return (
    <main className="container">
      <h1>User Profile Manager</h1>
      <nav>
        <Link to="/adduser" className="nav-link">Add User</Link> |
         <Link to="/viewusers" className="nav-link">View Users</Link>
      </nav>
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/viewusers" element={<ViewUsers />} />
        <Route path="/viewuser/:email" element={<ViewUser />} />
      </Routes>
    </Router>
  );
}

export default App;

