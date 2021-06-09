import { serve, ServerRequest } from "https://deno.land/std@0.97.0/http/server.ts";
import route from "./controller/Controller.ts";
import { internalServerError } from "./controller/NotFoundController.ts";

const server = serve({ port: 8000 });
console.log("listening on localhost:8000/");

async function respond(req: ServerRequest) {
  return await route(req);
}

for await (const req of server) {
  const rsp = await respond(req);
  if (rsp) {
    await req.respond(rsp);
  } else {
    req.respond(internalServerError());
  }
  
}