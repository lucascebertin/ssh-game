import express from 'express'
import p1nger from './p1nger/route'
import bodyParser from 'body-parser'

export default express()
  .use(express.static('html'))
  .use(bodyParser.json())
  .use(p1nger)


