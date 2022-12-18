import 'dotenv/config'
import Bet from '#app/models/bet.js'

Bet.sync({ alter: true });