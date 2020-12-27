import express from 'express'
import bodyParser from 'body-parser'
import passport from './auth/setup'
import authRouter from './auth/routes'
import teamRouter from './teams/routes'
import flagRouter from './flag/routes'
import rankRouter from  './rank/routes'
import cors from 'cors'

export default express()
  .use(cors())
  .use(bodyParser.json())
  .use(passport.initialize())
  .use(authRouter)
  .use(teamRouter)
  .use(flagRouter)
  .use(rankRouter)
