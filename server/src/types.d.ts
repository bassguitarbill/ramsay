type Meal = {
  _id?: { $oid: string },
  id?: string,
  name: string,
  ingredients: Array<string>,
}

export type {
  Meal,
}