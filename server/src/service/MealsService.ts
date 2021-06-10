import { exists } from "https://deno.land/std@0.97.0/fs/mod.ts";
import { v4 } from "https://deno.land/std@0.97.0/uuid/mod.ts";

import type { Meal } from '../types.d.ts';

const MEAL_FILE_PATH = 'data/meals.json'

exists(MEAL_FILE_PATH).then((res: boolean) => { if (!res) initializeMealData()});

function initializeMealData() {
  const write = Deno.writeTextFile(MEAL_FILE_PATH, "[]");

  write.then(() => console.log("Meals data successfully initialized"));
}

async function getAllMeals(): Promise<string> {
  const file = await Deno.readTextFile('data/meals.json');
  return file;
}

async function addNewMeal(newMeal: Meal): Promise<Meal> {
  const file = await Deno.readTextFile('data/meals.json');
  const mealsData = JSON.parse(file) as Array<Meal>;
  newMeal.id = v4.generate();
  mealsData.push(newMeal);
  const newMealsData = JSON.stringify(mealsData);
  await Deno.writeTextFile(MEAL_FILE_PATH, newMealsData);
  return newMeal;
}

async function getMeal(id: string): Promise<Meal | undefined> {
  const file = await Deno.readTextFile('data/meals.json');
  const mealsData = JSON.parse(file) as Array<Meal>;
  const meal = mealsData.find(meal => meal.id === id);
  return meal;
}

async function modifyMeal(id: string, newMeal: Meal): Promise<Meal | null> {
  const file = await Deno.readTextFile('data/meals.json');
  const mealsData = JSON.parse(file) as Array<Meal>;
  const existingMealIndex = mealsData.findIndex(meal => meal.id === id);
  if (existingMealIndex === -1) return null;
  mealsData.splice(existingMealIndex, 1, newMeal);
  const newMealsData = JSON.stringify(mealsData);
  await Deno.writeTextFile(MEAL_FILE_PATH, newMealsData);
  return newMeal;
}

async function deleteMeal(id: string): Promise<boolean> {
  const file = await Deno.readTextFile('data/meals.json');
  const mealsData = JSON.parse(file) as Array<Meal>;
  const existingMealIndex = mealsData.findIndex(meal => meal.id === id);
  if (existingMealIndex === -1) return false;
  mealsData.splice(existingMealIndex, 1);
  const newMealsData = JSON.stringify(mealsData);
  await Deno.writeTextFile(MEAL_FILE_PATH, newMealsData);
  return true;
}

export default {
  getAllMeals,
  addNewMeal,
  getMeal,
  modifyMeal,
  deleteMeal,
}