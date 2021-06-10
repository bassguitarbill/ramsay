import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Meal } from './types';

import { Meal as MealType } from './types';

function displayMeal(meal: Meal) {
  return (
    <li>
      <Link to={`/meals/${meal.id}`}>{meal.name}</Link>
    </li>
  )
}

export default function Meals() {
  const [mealsInformation, setMealsInformation] = useState<Array<MealType>>();
  useEffect(() => {
    fetch(`/api/meals`).then(async result => {
      setMealsInformation(await result.json());
    });
  }, []);
  if (!mealsInformation) {
    return <h2>Loading...</h2>
  }
  return (<div>
    <h1>
      Meals
    </h1>
    <ul>
      {mealsInformation.map(displayMeal)}
    </ul>
    <Link to="/meals/new">Add Meal</Link>
  </div>);
}