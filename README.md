# Todo App
# React Todo App with Pagination

## Overview
This is a comprehensive React Todo application demonstrating pagination, state management, and efficient component design using functional components and hooks.

## Prerequisites
- Node.js (v16+)
- npm or yarn

## Project Setup

### 1. Create React Project
```bash
npx create-react-app todo-pagination-app
cd todo-pagination-app
```

### 2. Install Additional Dependencies
```bash
npm install axios react-paginate
```

### 3. Project Structure
```
todo-pagination-app/
├── public/
├── src/
│   ├── components/
│   │   ├── TodoList.js
│   │   ├── TodoItem.js
│   │   └── Pagination.js
│   ├── App.js
│   └── App.css
└── README.md
```

### 4. Implementation Steps

#### TodoItem.js
```jsx
import React from 'react';

const TodoItem = ({ todo }) => {
  return (
    <div className="todo-item">
      <h3>{todo.title}</h3>
      <p>{todo.completed ? '✅ Completed' : '⏳ Pending'}</p>
    </div>
  );
};

export default TodoItem;
```

#### TodoList.js
```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import ReactPaginate from 'react-paginate';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const todosPerPage = 10;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTodos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const pageCount = Math.ceil(todos.length / todosPerPage);

  const displayTodos = todos
    .slice(currentPage * todosPerPage, (currentPage + 1) * todosPerPage)
    .map(todo => <TodoItem key={todo.id} todo={todo} />);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="todo-list">
      <h1>Todos</h1>
      {displayTodos}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default TodoList;
```

#### App.js
```jsx
import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
```

#### App.css
```css
.App {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.todo-item {
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
}

.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 20px 0;
}

.pagination li {
  margin: 0 5px;
  cursor: pointer;
}

.pagination li.active a {
  color: blue;
  font-weight: bold;
}
```

### 5. Running the Application
```bash
npm start
```

## Features
- Fetch todos from JSONPlaceholder API
- Pagination with react-paginate
- Responsive design
- Loading state handling

