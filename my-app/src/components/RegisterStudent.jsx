import React, { useState } from 'react';

function RegisterStudent() {
  const [student, setStudent] = useState({ name: '', roll: '', department: '', image: '' });

  const handleChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setStudent(prev => ({ ...prev, image: reader.result }));
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    students.push({ ...student, id: Date.now(), grades: {} });
    localStorage.setItem('students', JSON.stringify(students));
    alert('Student added!');
    setStudent({ name: '', roll: '', department: '', image: '' });
  };

  return (
    <form onSubmit={handleSubmit} id="studentForm">
      <input type="text" name="name" placeholder="Student Name" value={student.name} onChange={handleChange} required />
      <input type="text" name="roll" placeholder="Roll Number" value={student.roll} onChange={handleChange} required />
      <input type="text" name="department" placeholder="Department" value={student.department} onChange={handleChange} required />
      <input type="file" accept="image/*" id="studentImage" onChange={handleImage} style={{ display: 'none' }} />
      <label htmlFor="studentImage" className="upload-btn">Upload Picture</label>
      {student.image && <img src={student.image} alt="preview" id="studentImgPreview" />}
      <button type="submit">Add Student</button>
    </form>
  );
}

export default RegisterStudent;
