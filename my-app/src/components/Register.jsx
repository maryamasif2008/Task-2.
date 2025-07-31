import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    name: '',
    roll: '',
    department: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      id: Date.now(),
      ...form,
    };

    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    navigate('/students');
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Student Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="text" placeholder="Roll Number" required onChange={(e) => setForm({ ...form, roll: e.target.value })} />
        <input type="text" placeholder="Department" required onChange={(e) => setForm({ ...form, department: e.target.value })} />

        <label className="custom-file-upload">
          <input type="file" accept="image/*" required onChange={handleImageChange} />
          Upload Image
        </label>

        <div id="previewArea">
          <p>Image Preview:</p>
          <img
            id="imagePreview"
            src={imagePreview || '#'}
            alt="No Image"
            style={{ maxWidth: '150px', display: imagePreview ? 'block' : 'none', borderRadius: '8px' }}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
