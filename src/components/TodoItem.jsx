import React, { useState } from 'react';

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleUpdate = () => {
    updateTodo({
      ...todo,
      title: editedTitle,
    });
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleStatusChange = () => {
    updateTodo({
      ...todo,
      status: todo.status === 'completed' ? 'pending' : 'completed',
    });
  };

  const markAsCompleted = () => {
    if (todo.status !== 'completed') {
      updateTodo({
        ...todo,
        status: 'completed',
      });
    }
  };
  
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <li>
      <input type="checkbox"
      checked={todo.status === 'completed'}
      onChange={handleStatusChange}
    />
    {isEditing ? (
      <input
        type="text"
        value={editedTitle}
        onChange={handleChange}
        onBlur={handleUpdate}
        autoFocus
      />
    ) : (
      <span>{todo.title}</span>
    )}
    <span>{todo.assignedTo}</span>
    <span>{todo.completionDate}</span>
    <button onClick={handleDelete}>Delete</button>
    <button onClick={toggleEdit}>Edit</button>
    <button onClick={markAsCompleted} disabled={todo.status === 'completed'}>
        Mark as Completed
      </button>
  </li>
);
    }
export default TodoItem;
