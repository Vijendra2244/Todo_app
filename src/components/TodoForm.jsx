import React, { useState } from 'react';

const TodoForm = ({ addTodo, users }) => {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !assignedTo || !completionDate) return;
    addTodo({
      title,
      status: 'pending',
      assignedTo,
      completionDate
    });
    setTitle('');
    setAssignedTo('');
    setCompletionDate('');
  };

  return (
    <form style={{width:"50%",margin:"auto",marginTop:"1rem",display:"flex",justifyContent:"space-between",gap:"1rem"}} onSubmit={handleSubmit}>
      <input
        style={{border:"1px solid black",padding:"5px"}}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option value="">Select Assignee</option>
        {users.map(user => (
          <option key={user.id} value={user.name}>{user.name}</option>
        ))}
      </select>
      <input
        type="datetime-local"
        value={completionDate}
        onChange={(e) => setCompletionDate(e.target.value)}
      />
      <button style={{backgroundColor:"blue",color:"white",padding:"3px",borderRadius:"10px"}} type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
