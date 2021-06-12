import { readAll } from "https://deno.land/std@0.97.0/io/util.ts";

import MealsService from '../../service/MealsService.ts';

import type { Meal } from '../../types.d.ts';
import { Router } from "https://deno.land/x/opine@1.4.0/mod.ts";

const DECODER = new TextDecoder();

const mealsController = new Router();

mealsController.get('/:id', async (req, rsp) => {
  const { id } = req.params;
  const meal = await MealsService.getMeal(id);
  if (!meal) {
    rsp.setStatus(404).type('text').send(`Meal ${id} not found`);
  } else {
    rsp.setStatus(200).type('json').send(JSON.stringify(meal));
  }
});

mealsController.get('/', async (_req, rsp) => {
  const allMeals = await MealsService.getAllMeals();
  rsp.type('json').setStatus(200).send(allMeals);
});

mealsController.post('/', async (req, rsp) => {
  const mealToAdd = JSON.parse(DECODER.decode(await readAll(req.body))) as Meal;
  const addedMeal = await MealsService.addNewMeal(mealToAdd);
  rsp.setStatus(201).type('json').send(JSON.stringify(addedMeal));
});

mealsController.put('/:id', async (req, rsp) => {
  const { id } = req.params;
  const mealToModify = JSON.parse(DECODER.decode(await readAll(req.body))) as Meal;
  const meal = await MealsService.modifyMeal(id, mealToModify);
  if (!meal) {
    rsp.setStatus(404).type('text').send(`Meal ${id} not found`);
  } else {
    rsp.setStatus(200).type('json').send(JSON.stringify(meal));
  }
});

mealsController.delete('/:id', async (req, rsp) => {
  const { id } = req.params;
  const success = await MealsService.deleteMeal(id);
  if (!success) {
    rsp.setStatus(404).type('text').send(`Meal ${id} not found`);
  } else {
    rsp.sendStatus(204);
  }
})

mealsController.all('*', (req, rsp) => {
  console.log('Invalid route in meals', req.method, req.url);
  rsp.setStatus(404).type('text').send(`Invalid route in meals ${req.method} ${req.url}`);
});

export default mealsController;
