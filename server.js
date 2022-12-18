import { config } from 'dotenv'
config();

import http from 'http';
import { PORT } from '#app/config/app.js'
import { runRouter, addRoute } from '#app/router/index.js'

const server = http.createServer(runRouter);
server.listen(PORT);

import homePage from './app/controllers/home.js'
import betsStreamPage from './app/controllers/bets/stream.js'
import betsAddPage from './app/controllers/bets/add.js'

addRoute('/', homePage);
addRoute('/bets', betsStreamPage);
addRoute('/bets/add', betsAddPage);