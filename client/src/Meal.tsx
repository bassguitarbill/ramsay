import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { idParams } from './types';

import { Meal as MealType } from './types';



export default function Meal() {
  const { id } = useParams<idParams>();
  const [mealInformation, setMealInformation] = useState<MealType>();
  const [mealDeleted, setMealDeleted] = useState(false);

  useEffect(() => {
    fetch(`/api/meals/${id}`).then(async (result) => {
      setMealInformation(await result.json());
    });
  }, []);

  function deleteMeal() {
    const confirmation = window.confirm(`Are you sure you want to delete ${mealInformation.name}`);
    if (!confirmation) return;
    fetch(`/api/meals/${id}`, {
      method: 'DELETE',
    }).then(() => setMealDeleted(true));
  }
  if (mealDeleted) return <Redirect to="/meals" />;
  if (!mealInformation) return <h2>Loading...</h2>;

  return (<div>
    <h1>
      {mealInformation.name}
    </h1>
    <ul>
      {mealInformation.ingredients.map(ing => <li>{ing}</li>)}
    </ul>
    <Link to={`/meals/edit/${id}`}>Edit</Link>
    <button onClick={deleteMeal}>Delete</button>
  </div>);
}
