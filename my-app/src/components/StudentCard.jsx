import React, { useEffect, useState } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(stored);
  }, []);

  const deleteStudent = (id) => {
    const updated = students.filter((student) => student.id !== id);
    localStorage.setItem('students', JSON.stringify(updated));
    setStudents(updated);
  };

  const editStudent = (id) => {
    const student = students.find((s) => s.id === id);
    if (!student) return;

    const newName = prompt('Enter new name:', student.name);
    const newRoll = prompt('Enter new roll number:', student.roll);
    const newDept = prompt('Enter new department:', student.department);
    const changeImage = window.confirm('Change image?');

    if (changeImage) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          updateStudent({ ...student, name: newName, roll: newRoll, department: newDept, image: reader.result });
        };
        reader.readAsDataURL(file);
      };
      input.click();
    } else {
      updateStudent({ ...student, name: newName, roll: newRoll, department: newDept });
    }
  };

  const updateStudent = (updatedStudent) => {
    const updatedList = students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s));
    localStorage.setItem('students', JSON.stringify(updatedList));
    setStudents(updatedList);
  };

  return (
    <div className="list-container">
      <h2>Registered Students</h2>
      <div id="studentList">
        {students.map((student) => (
          <div className="student-card" key={student.id}>
            <img src={student.image} alt="Student" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Roll No:</strong> {student.roll}</p>
            <p><strong>Department:</strong> {student.department}</p>
            <button onClick={() => editStudent(student.id)}>Edit</button>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
