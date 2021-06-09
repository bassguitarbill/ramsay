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

export default {
  getAllMeals,
  addNewMeal,
}