import { ServerRequest } from "https://deno.land/std@0.97.0/http/server.ts";

import StaticController from './StaticController.ts';
import APIController from './api/APIController.ts';

const RESPONSE_404 = {
  status: 404,
  body: 'File not found',
};

export default async function route(request: ServerRequest) {
  const { url, method } = request;
  console.log('routing ', method, url)
  switch (url) {
    case (url.match(/\/$/)|| {}).input:
    case (url.match(/\/index.html$/) || {}).input:
    case (url.match(/\/static\//) || {}).input:
      return await StaticController.route(request);
    case (url.match(/\/api\//) || {}).input:
      return await APIController.route(request);
    default:
      return RESPONSE_404;
  }
}