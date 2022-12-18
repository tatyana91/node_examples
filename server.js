import { config } from 'dotenv'
config();
 
import { PORT } from './app/config/app.js'
import express from 'express'

const server = express();
server.listen(PORT);

import homePage from './app/controllers/home.js'
import betsStreamPage, { debug as betsStreamPageDebug } from './app/controllers/bets/stream.js'
import betsAddPage from './app/controllers/bets/add.js'

server.use(express.static('public'));
server.get('/', homePage);
server.get('/bets', betsStreamPage);
server.get('/bets/add', betsAddPage);
server.get('/bets/clients-debug', betsStreamPageDebug);