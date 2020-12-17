import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'

const router = Router().post(
  '/flag',
  authenticate('bearer', { session: false }),
  (req: Request, res: Response) => {
    res.json({ success: true })
  },
)

export default router
