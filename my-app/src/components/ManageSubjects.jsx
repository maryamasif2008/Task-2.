import React, { useEffect, useState } from 'react';

function ManageSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ subName: '', subCode: '', credit: '', instructor: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('subjects')) || [];
    setSubjects(stored);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const newSubject = {
      id: Date.now(),
      name: form.subName,
      code: form.subCode,
      credit: Number(form.credit),
      instructor: form.instructor,
    };
    const updated = [...subjects, newSubject];
    setSubjects(updated);
    localStorage.setItem('subjects', JSON.stringify(updated));
    setForm({ subName: '', subCode: '', credit: '', instructor: '' });
  };

  const handleEdit = id => {
    const s = subjects.find(sub => sub.id === id);
    const name = prompt('New Name:', s.name);
    const code = prompt('New Code:', s.code);
    const credit = prompt('New Credit Hours:', s.credit);
    const instructor = prompt('New Instructor:', s.instructor);
    if (name && code && credit && instructor) {
      const updated = subjects.map(sub =>
        sub.id === id ? { ...sub, name, code, credit: Number(credit), instructor } : sub
      );
      setSubjects(updated);
      localStorage.setItem('subjects', JSON.stringify(updated));
    }
  };

  const handleDelete = id => {
    const updated = subjects.filter(sub => sub.id !== id);
    setSubjects(updated);
    localStorage.setItem('subjects', JSON.stringify(updated));
  };

  return (
    <div>
      <h2>Manage Subjects</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="subName" placeholder="Subject Name" value={form.subName} onChange={e => setForm({ ...form, subName: e.target.value })} required />
        <input type="text" name="subCode" placeholder="Subject Code" value={form.subCode} onChange={e => setForm({ ...form, subCode: e.target.value })} required />
        <input type="number" name="credit" placeholder="Credit Hours" value={form.credit} onChange={e => setForm({ ...form, credit: e.target.value })} required />
        <input type="text" name="instructor" placeholder="Instructor Name" value={form.instructor} onChange={e => setForm({ ...form, instructor: e.target.value })} required />
        <button type="submit">Add Subject</button>
      </form>

      <div id="subjectList">
        {subjects.map(sub => (
          <div key={sub.id}>
            <strong>{sub.name}</strong> ({sub.code}) — {sub.credit} cr — {sub.instructor}
            <button onClick={() => handleEdit(sub.id)}>Edit</button>
            <button onClick={() => handleDelete(sub.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageSubjects;
