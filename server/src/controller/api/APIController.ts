import { Router } from "https://deno.land/x/opine@1.4.0/mod.ts";

import mealsController from './MealsController.ts';

const apiController = new Router();

apiController.use('/meals', mealsController);
//apiController.get('/shopping-list', shoppingListController);

export default apiController;
