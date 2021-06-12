import { v4 } from "https://deno.land/std@0.97.0/uuid/mod.ts";
import { Meal } from '../db.ts';

import type { Meal as MealType } from '../types.d.ts';

async function getAllMeals(): Promise<string> {
  const allMeals = Meal.find({ id: { $ne: null } });
  return JSON.stringify(await allMeals.toArray());
}

async function addNewMeal(newMeal: MealType): Promise<MealType> {
  try {
    newMeal.id = v4.generate();
    await Meal.insertOne(newMeal);
    return newMeal;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function getMeal(id: string): Promise<MealType | undefined> {
  return await Meal.findOne({ id: { $eq: id }});
}

async function modifyMeal(id: string, newMeal: MealType): Promise<MealType | null> {
  await Meal.updateOne({ id: { $eq: id } }, newMeal);
  return newMeal;
}

async function deleteMeal(id: string): Promise<boolean> {
  return (await Meal.deleteOne({ id: { $eq: id } }) > 0);
}

export default {
  getAllMeals,
  addNewMeal,
  getMeal,
  modifyMeal,
  deleteMeal,
}