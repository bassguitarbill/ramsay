// import the package from url
import { MongoClient } from "https://deno.land/x/mongo@v0.23.1/mod.ts";
// Create client
const client = new MongoClient();
// Connect to mongodb
await client.connect("mongodb://127.0.0.1:27017");
// Give your database a name
const dbname = "shop-chop";
const db = client.database(dbname);

interface MealSchema {
  _id: { $oid: string };
  id: string;
  name: string;
  ingredients: Array<string>;
}
const Meal = db.collection<MealSchema>("meal");
export { db, Meal };
