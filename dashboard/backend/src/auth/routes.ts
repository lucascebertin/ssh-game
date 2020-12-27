import passport from 'passport'
import { Router } from 'express'

const router = Router().post(
  '/login',
  passport.authenticate('token', { session: false }),
  (req, res) => {
    res.json({ bearerToken: req.user })
  },
)

export default router
