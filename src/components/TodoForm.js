import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })



  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className={isTabletOrMobile ? "todo-input-mobile edit" : "todo-input edit"}
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
          <>
            <input
              placeholder='Add a todo'
              value={input}
              onChange={handleChange}
              name='text'
              className={isTabletOrMobile ? "todo-input-mobile" : "todo-input"}
              ref={inputRef}
            />
            <button onClick={handleSubmit} className='todo-button'>
              Add todo
          </button>
          </>
        )}
    </form>
  );
}

export default TodoForm;