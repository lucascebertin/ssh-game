import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as TokenStrategy } from 'passport-local-token'
import Team from '../teams/schema'
import jwt from 'jsonwebtoken'
import { SignedToken } from './auth'

const secret = 'sup3rdup3rS3cr3t'

const bearerStrategy = new BearerStrategy(async (token, done) => {
  const { id } = jwt.verify(token, secret) as SignedToken

  const team = await Team.findById(id)

  if (!team) return done(null, false)

  done(null, true)
})

const tokenStrategy = new TokenStrategy(
  { tokenField: 'token' },
  async (token, done) => {
    const team = await Team.findOne({ token })

    if (!team) return done(null, false)

    const signedToken = jwt.sign({ id: team.id }, secret, { expiresIn: '2h' })

    done(null, signedToken)
  },
)

export default passport
  .use('bearer', bearerStrategy)
  .use('token', tokenStrategy)
