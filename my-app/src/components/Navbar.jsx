import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/register">Register Student</Link> |
      <Link to="/subjects">Manage Subjects</Link> |
      <Link to="/students">Students & CGPA</Link>
    </nav>
  );
}

export default Navbar;
