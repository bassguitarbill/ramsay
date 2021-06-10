import { ServerRequest } from "https://deno.land/std@0.97.0/http/server.ts";
import { readAll } from "https://deno.land/std@0.97.0/io/util.ts";

import { methodNotAllowed } from "../NotFoundController.ts";
import MealsService from '../../service/MealsService.ts';
import { generateResponse } from '../util.ts';

import type { Meal } from '../../types.d.ts';

const DECODER = new TextDecoder();

async function getAllMeals(_req: ServerRequest) {
  return generateResponse(200, await MealsService.getAllMeals(), 'text/json');
}

async function addNewMeal(req: ServerRequest) {
  const mealToAdd = JSON.parse(DECODER.decode(await readAll(req.body))) as Meal;
  const addedMeal = await MealsService.addNewMeal(mealToAdd);
  return generateResponse(201, JSON.stringify(addedMeal), 'text/json');
}

function getMealId(req: ServerRequest) {
  const { url } = req;
  const match = url.match(/\/api\/meals\/(.*)$/);
  return match && match[1];
}

async function getMeal(req: ServerRequest) {
  const id = getMealId(req);
  if (!id) {
    return generateResponse(400, 'Bad Request: missing id', 'text/plain');
  }

  const meal = await MealsService.getMeal(id);
  if (!meal) {
    return generateResponse(404, `Meal ${id} not found`, 'text/plain');
  }
  
  return generateResponse(200, JSON.stringify(meal), 'text/json');
}

async function modifyMeal(req: ServerRequest) {
  const id = getMealId(req);
  if (!id) {
    return generateResponse(400, 'Bad Request: missing id', 'text/plain');
  }
  
  const mealToModify = JSON.parse(DECODER.decode(await readAll(req.body))) as Meal;
  const meal = await MealsService.modifyMeal(id, mealToModify);
  if (!meal) {
    return generateResponse(404, `Meal ${id} not found`, 'text/plain');
  }
  
  return generateResponse(200, JSON.stringify(meal), 'text/json');
}

async function deleteMeal(req: ServerRequest) {
  const id = getMealId(req);
  if (!id) {
    return generateResponse(400, 'Bad Request: missing id', 'text/plain');
  }

  const success = await MealsService.deleteMeal(id);
  if (!success) {
    return generateResponse(404, `Meal ${id} not found`, 'text/plain');
  }

  return generateResponse(204);
}

export default {
  route: async (req: ServerRequest) => {
    const { url, method } = req;
    switch(url) {
      case (url.match(/\/api\/meals$/) || {}).input:
        switch(method) {
          case 'GET':
            return await getAllMeals(req);
          case 'POST':
            return await addNewMeal(req);
          default:
            return methodNotAllowed();
        }

      case (url.match(/\/api\/meals\/(.*)$/) || {}).input:
        switch(method) {
          case 'GET':
            return await getMeal(req);
          case 'PUT':
            return await modifyMeal(req);
          case 'DELETE':
            return await deleteMeal(req);
          default:
            return methodNotAllowed();
        }
    }
  }
}