import React, { useState, useEffect } from "react";
import TodoForm from "../src/components/TodoForm";
import TodoList from "../src/components/TodoList";
import TodoFilter from "../src/components/TodoFilter";
import TodoSort from "../src/components/TodoSort";
import Pagination from "../src/components/Pagination";
import { Heading } from "@chakra-ui/react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterAssignee, setFilterAssignee] = useState("");
  const [sortOption, setSortOption] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setFilteredTodos(data);
      });

    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    filterAndSortTodos();
  }, [todos, filterStatus, filterAssignee, sortOption, currentPage]);

  const addTodo = (todo) => {
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((data) => setTodos([...todos, data]));
  };

  const updateTodo = (updatedTodo) => {
    fetch(`http://localhost:3001/todos/${updatedTodo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTodos = todos.map((todo) =>
          todo.id === updatedTodo.id ? data : todo
        );
        setTodos(updatedTodos);
      });
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    }).then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  };

  const filterAndSortTodos = () => {
    let filtered = todos.filter((todo) => {
      if (filterStatus && todo.status !== filterStatus) return false;
      if (filterAssignee && todo.assignedTo !== filterAssignee) return false;
      return true;
    });

    if (sortOption === "asc") {
      filtered.sort(
        (a, b) => new Date(a.completionDate) - new Date(b.completionDate)
      );
    } else {
      filtered.sort(
        (a, b) => new Date(b.completionDate) - new Date(a.completionDate)
      );
    }

    setFilteredTodos(filtered);
  };

  const handleFilterStatusChange = (status) => {
    setFilterStatus(status);
  };

  const handleFilterAssigneeChange = (assignee) => {
    setFilterAssignee(assignee);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Heading textAlign={"center"}>Todo App</Heading>
      <TodoForm addTodo={addTodo} users={users} />
      <TodoFilter
        filterStatus={filterStatus}
        filterAssignee={filterAssignee}
        users={users}
        handleFilterStatusChange={handleFilterStatusChange}
        handleFilterAssigneeChange={handleFilterAssigneeChange}
      />
      <TodoSort sortOption={sortOption} handleSortChange={handleSortChange} />
      <TodoList
        todos={filteredTodos.slice(
          (currentPage - 1) * todosPerPage,
          currentPage * todosPerPage
        )}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredTodos.length / todosPerPage)}
        goToPage={goToPage}
      />
    </div>
  );
};

export default App;
