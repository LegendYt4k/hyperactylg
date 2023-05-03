"use strict"

import log from './helpers/logger.js'
log.info("Loading modules this can take a while.")

import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import express from 'express'

import mongoose from 'mongoose'
import AuthenticateToken from './api/middlewares/authenticateToken.js'
import authRoutes from './api/auth/login.js'
import userRoutes from './api/users/user.js'
import createAfkWebSocketServer from './api/afk/websocket.js'
import createServerRoute from './api/servers/create.js'
import editServerRoute from './api/servers/edit.js'
import settings from '../settings.js'
mongoose.connect(settings.database.link)
.then(()=>log.info("Connected with database."))

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const app = express()

app.use(express.static(path.join(root, 'dist')))
app.use('/assets', express.static(path.join(path.join(root, 'public'), 'assets')))
app.use('/assets', express.static(path.join(root, 'dist')))

app.get('*', async (req, res) => {
  res.sendFile(path.join(root, 'dist', 'index.html'))
})

app.use(bodyParser.json())
app.use(AuthenticateToken)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/servers', createServerRoute)
app.use('/api/servers', editServerRoute)
if(settings.afk.enabled) {
  createAfkWebSocketServer(settings.afk.ws.port)
}
app.listen(80, () => {
  log.info("Successfuly started") 
})


