import React from 'react';

import TodosForm from '../TodosForm';

import classes from './style.module.css';

const App = () => (
  <div className={classes.root}>
    <header>
      <h1 className={classes.title}>todos</h1>
    </header>
    <main>
      <TodosForm />
      <p className={classes.usage}>Left click to toggle complete.</p>
      <p className={classes.usage}>Right click to delete the todo.</p>
    </main>
  </div>
);

export default App;
