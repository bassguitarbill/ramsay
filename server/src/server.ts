import { opine, serveStatic } from 'https://deno.land/x/opine@1.4.0/mod.ts';
import { renderFileToString } from 'https://deno.land/x/dejs@0.9.3/mod.ts';
import { dirname, join } from "https://deno.land/std@0.97.0/path/mod.ts";

import apiController from "./controller/api/APIController.ts";

const app = opine();
const __dirname = dirname(import.meta.url);

app.engine('.html', renderFileToString);
app.use(serveStatic(join(__dirname, '../../client/build')));
app.set('view engine', 'html');

const index = Deno.readTextFileSync('../client/build/index.html');

//app.use('/users', ensureAuthenticated, users);
//app.use('/auth', auth)

app.use('/api', apiController);

app.get('*', (_req, res) => {
  res.send(index);
})

app.listen(8080);
console.log('running Opine on port 8080');
