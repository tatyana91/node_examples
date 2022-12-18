import 'dotenv/config'
import Message from '#app/models/message.js'

Message.sync({ alter: true });