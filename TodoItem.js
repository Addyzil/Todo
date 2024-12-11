import React from 'react';

function TodoItem({ todo }) {
  return (
    <div className="todo-item">
      <h3>{todo.title}</h3>
      <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
    </div>
  );
}

export default TodoItem;
