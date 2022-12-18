import { config } from 'dotenv'
config();
 
import { PORT } from './app/config/app.js'
import { VIEW_DIR, VIEW_ENGINE, VIEW_ENGINE_NAME } from './app/config/view.js'
import express from 'express'

const server = express();

server.engine(VIEW_ENGINE_NAME, VIEW_ENGINE);
server.set('views', VIEW_DIR)
server.set('view engine', VIEW_ENGINE_NAME)

server.listen(PORT);

import homePage from './app/controllers/home.js'
import betsStreamPage, { debug as betsStreamPageDebug } from './app/controllers/bets/stream.js'
import betsAddPage from './app/controllers/bets/add.js'

server.use(express.static('public'));
server.get('/', homePage);
server.get('/bets', betsStreamPage);
server.get('/bets/add', betsAddPage);
server.get('/bets/clients-debug', betsStreamPageDebug);