import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { fetchTodos } from '../services/api';
import ReactPaginate from 'react-paginate';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const todosPerPage = 10;

  useEffect(() => {
    async function loadTodos() {
      try {
        const data = await fetchTodos();
        setTodos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    loadTodos();
  }, []);

  const pageCount = Math.ceil(todos.length / todosPerPage);

  const displayTodos = todos
    .slice(currentPage * todosPerPage, (currentPage + 1) * todosPerPage)
    .map(todo => <TodoItem key={todo.id} todo={todo} />);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="todo-list">
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
}

export default TodoList;
