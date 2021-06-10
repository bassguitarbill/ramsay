import React from 'react';
import './App.css';

import { Link, Switch, Route, useParams } from 'react-router-dom';

import Meals from './Meals';
import Meal from './Meal';
import NewMeal from './NewMeal';

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/meals">Meals</Link>
        </li>
      </ul>

      <Switch>
        <Route path="/meals/new">
          <NewMeal />
        </Route>
        <Route path="/meals/edit/:id">
          <NewMeal />
        </Route>
        <Route path="/meals/:id">
          <Meal />
        </Route>
        <Route path="/meals">
          <Meals />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>
}

export default App;
