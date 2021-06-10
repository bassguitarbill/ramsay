import { ServerRequest } from "https://deno.land/std@0.97.0/http/server.ts";
import { getMediaType } from "./util.ts";

export default {
  route: async (req: ServerRequest) => {
    let { url } = req;
    if (url === '/') url = '/index.html';
    
    const path = `../client/build${url}`;
    const mediaType = getMediaType(path);
    const file = await Deno.open(path);

    const headers = new Headers();
    headers.set("content-type", mediaType);
    req.done.then(() => {
      file.close();
    });
    return {
      status: 200,
      body: file,
      headers,
    };
  }
}