import { Router, Request, Response } from 'express'
import { build } from './schema'
import { body, validationResult } from 'express-validator'
import { v4 } from 'uuid'

const validations = [body('name').notEmpty().isLength({ min: 3, max: 200 })]

const router = Router().post(
  '/team',
  validations,
  (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const token = v4()

    const team = build({ name: req.body.name, token })

    team
      .save()
      .then(() => {
        res.status(201).json({ token })
      })
      .catch((error) => {
        res.status(500).json({ error: 'Não foi possível cadastrar o time' })
      })
  },
)

export default router
