import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useParams } from "react-router-dom";
import { idParams, Meal as MealType } from "./types";

export default function NewMeal() {
  const { id } = useParams<idParams>();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [savedMealId, setSavedMealId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/meals/${id}`).then(rsp => rsp.json()).then(rsp => {
        setName(rsp.name);
        setIngredients(rsp.ingredients.join('\n'));
        setLoading(false);
      })
    }
  }, []);

  function handleNameChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setName(ev.target.value);
  }

  function handleIngredientsChange(ev: React.ChangeEvent<HTMLTextAreaElement>) {
    setIngredients(ev.target.value);
  }

  function getMealToSave() {
    const splitIngredients = ingredients.split("\n");
    return { id, name, ingredients: splitIngredients };
  }

  function saveExistingMeal(meal: MealType) {
    fetch(`/api/meals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meal),
    }).then(rsp => rsp.json())
    .then(rsp => setSavedMealId(rsp.id));
  }

  function saveNewMeal(meal: MealType) {
    fetch('/api/meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meal),
    }).then(rsp => rsp.json())
    .then(rsp => setSavedMealId(rsp.id));
  }

  function saveMeal() {
    const meal = getMealToSave();
    if (id) {
      saveExistingMeal(meal);
    } else {
      saveNewMeal(meal);
    }
  }

  if (savedMealId) return <Redirect to={`/meals/${savedMealId}`} />;

  if (loading) return <h2>Loading...</h2>;

  return (
    <React.Fragment>
      <div>
        <label htmlFor="name">Meal Name</label>
        <input type="text" id="name" name="name" value={name} onChange={handleNameChange}></input>
      </div>
      <div>
        <label htmlFor="ingredients">List of Ingredients (separated with spaces)</label>
        <textarea id="ingredients" name="ingredients" value={ingredients} onChange={handleIngredientsChange}></textarea>
      </div>
      <button onClick={saveMeal}>Save</button>
    </React.Fragment>
  )
}