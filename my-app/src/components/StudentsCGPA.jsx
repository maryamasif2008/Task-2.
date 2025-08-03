import React, { useEffect, useState } from 'react';

const gradeMap = { A: 4.0, 'A+': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7, 'C+': 2.3, C: 2.0, D: 1.0, F: 0.0 };

function calculateCGPA(grades, subjects) {
  let totalPts = 0, totalCred = 0;
  subjects.forEach(s => {
    const g = grades[s.code];
    if (g && gradeMap[g] != null) {
      totalPts += gradeMap[g] * s.credit;
      totalCred += s.credit;
    }
  });
  return totalCred ? (totalPts / totalCred).toFixed(2) : '0.00';
}

function StudentsCGPA() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem('students')) || [];
    const sub = JSON.parse(localStorage.getItem('subjects')) || [];
    setStudents(s);
    setSubjects(sub);
  }, []);

  const handleGradeChange = (studentId, code, value) => {
    const updated = students.map(st => {
      if (st.id === studentId) {
        return {
          ...st,
          grades: { ...st.grades, [code]: value }
        };
      }
      return st;
    });
    setStudents(updated);
    localStorage.setItem('students', JSON.stringify(updated));
  };

  return (
    <div>
      <h2>Students & CGPA</h2>
      <h2>Students & CGPA</h2>
      <div id="studentList">
        {students.map(student => (
          <div className="student-card" key={student.id}>
            <img src={student.image} alt="Student" />
            <div className="student-details">
              <p><strong>{student.name}</strong> (Roll: {student.roll}, Dept: {student.department})</p>
              <p><strong>CGPA:</strong> {calculateCGPA(student.grades, subjects)}</p>
              <div className="grades-section">
                {subjects.map(subject => (
                  <select
                    key={subject.code}
                    value={student.grades[subject.code] || ''}
                    onChange={e => handleGradeChange(student.id, subject.code, e.target.value)}
                  >
                    <option value="">{subject.code}</option>
                    {Object.keys(gradeMap).map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsCGPA;
