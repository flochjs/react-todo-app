import React, { useReducer, useState } from 'react';

import classes from './style.module.css';

const ADD = 'todo/add';
const REMOVE = 'todo/remove';
const TOGGLE_COMPLETE = 'todo/toggle-complete';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return {
        currentId: state.currentId + 1,
        todos: [...state.todos, { id: state.currentId, text: action.text }],
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case TOGGLE_COMPLETE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    default:
      return state;
  }
};

const add = (text) => ({ type: ADD, text });
const remove = (id) => ({ type: REMOVE, id });
const toggleComplete = (id) => ({ type: TOGGLE_COMPLETE, id });

const TodosForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [{ todos }, dispatch] = useReducer(reducer, {
    currentId: 0,
    todos: [],
  });

  const handleInputValueChange = ({ target: { value } }) =>
    setInputValue(value);

  const handleLeftClick = (id) => (e) => {
    e.preventDefault();

    dispatch(toggleComplete(id));
  };

  const handleKeyPress = (id) => (e) => {
    e.preventDefault();

    if (e.key === 'Enter') dispatch(toggleComplete(id));
  };

  const handleRightClick = (id) => (e) => {
    e.preventDefault();

    dispatch(remove(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(add(inputValue));
    setInputValue('');
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <input
        className={classes.input}
        type="text"
        placeholder="Enter a todo"
        autoComplete="off"
        value={inputValue}
        onChange={handleInputValueChange}
      />
      <ul>
        {todos.map(({ id, text, completed }) => (
          <li key={id}>
            <div
              className={`${classes.todo}${
                completed ? ` ${classes.completedTodo}` : ''
              }`}
              role="button"
              tabIndex={0}
              onKeyPress={handleKeyPress(id)}
              onClick={handleLeftClick(id)}
              onContextMenu={handleRightClick(id)}
            >
              {text}
            </div>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default TodosForm;
