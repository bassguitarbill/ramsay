import { ServerRequest } from "https://deno.land/std@0.97.0/http/server.ts";

import MealsController from './MealsController.ts';
import ShoppingListController from './ShoppingListController.ts';
import { notFound } from '../NotFoundController.ts';

export default {
  route: async (req: ServerRequest) => {
    const { url } = req;
    
    switch(url) {
      case (url.match(/\/api\/meals/) || {}).input:
        return await MealsController.route(req);
      case (url.match(/\/api\/shopping-list/) || {}).input:
        return await ShoppingListController.route(req);
      default:
        return notFound(url);
    }
  }
}