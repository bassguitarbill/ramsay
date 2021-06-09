import { ServerRequest } from "https://deno.land/std@0.97.0/http/server.ts";
import { methodNotAllowed } from "../NotFoundController.ts";
import MealsService from '../../service/MealsService.ts';
import { readAll } from "https://deno.land/std@0.97.0/io/util.ts";

import type { Meal } from '../../types.d.ts';

const DECODER = new TextDecoder();

async function getAllMeals(_req: ServerRequest) {
  const headers = new Headers;
  headers.set('content-type', 'text/json');
  return {
    status: 200,
    body: await MealsService.getAllMeals(),
    headers,
  }
}

async function addNewMeal(req: ServerRequest) {
  const mealToAdd = JSON.parse(DECODER.decode(await readAll(req.body))) as Meal;
  const addedMeal = await MealsService.addNewMeal(mealToAdd);
  const headers = new Headers;
  headers.set('content-type', 'text/json');
  return {
    status: 200,
    body: JSON.stringify(addedMeal),
    headers,
  }
}

export default {
  route: async (req: ServerRequest) => {
    const { url, method } = req;
    switch(url) {
      case (url.match('/api/meals') || {}).input:
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
            //return await getMeal();
          case 'PUT':
            //return await modifyMeal();
          case 'DELETE':
            //return await deleteMeal();
          default:
            return methodNotAllowed();
        }
    }
  }
}