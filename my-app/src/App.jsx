import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from '/Welcome';
import RegisterStudent from './components/RegisterStudent';
import ManageSubjects from './components/ManageSubjects';
import StudentsCGPA from './components/StudentsCGPA';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<RegisterStudent />} />
        <Route path="/subjects" element={<ManageSubjects />} />
        <Route path="/students" element={<StudentsCGPA />} />
      </Routes>
    </Router>
  );
}

export default App;
