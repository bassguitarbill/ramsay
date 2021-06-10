type Meal = {
  id: string,
  name: string,
  ingredients: Array<string>,
}

type idParams = {
  id: string,
}

export type {
  Meal,
  idParams,
}