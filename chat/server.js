import 'dotenv/config'

import { PORT } from './app/config/app.js'
import { VIEW_DIR, VIEW_ENGINE, VIEW_ENGINE_NAME } from './app/config/view.js'
import express from 'express'

const server = express();

server.engine(VIEW_ENGINE_NAME, VIEW_ENGINE);
server.set('views', VIEW_DIR)
server.set('view engine', VIEW_ENGINE_NAME)

server.listen(PORT);

import loginPage from './app/controllers/login.js'
import homePage from './app/controllers/home.js'
import messagesStreamPage from './app/controllers/messages/stream.js'
import messagesAddPage from './app/controllers/messages/add.js'

server.use(express.urlencoded({ extended: false }))
server.use(express.json())
server.use(express.static('public'));

server.get('/login', loginPage);
server.get('/', homePage);
server.get('/messages', messagesStreamPage);
server.post('/messages/add', messagesAddPage);
