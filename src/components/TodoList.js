import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

import axios from "axios";


function TodoList() {

  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('https://shrouded-springs-12483.herokuapp.com/')
      .then(function (response) {
        setTodos(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }


  const addTodo = todo => {

    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    axios.post('https://shrouded-springs-12483.herokuapp.com/', todo)
      .then(function (response) {
        setTodos(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    axios.delete(`https://shrouded-springs-12483.herokuapp.com/${id}`)
      .then(function (response) {
        setTodos(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;