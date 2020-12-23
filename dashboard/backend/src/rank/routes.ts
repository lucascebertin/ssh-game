import { Router, Request, Response } from 'express'
import TeamModel from '../teams/schema'
import { authenticate } from 'passport'
import { Flag, FlagFound } from '../flag/flag'

const router = Router().get(
  '/rank',
  authenticate('bearer', { session: false }),
  async (_: Request, res: Response) => {
    const allTeams = await TeamModel
      .find()
      .populate('flags.flag')
      .exec()

    if (!allTeams)
      return res.status(400).send()
 
    const ranking = allTeams.map(x => ({
      team: x.name,
      points: 
        x.flags && x.flags.length <= 0 
        ? 0 
        : x.flags
            .map(y => { 
              const flagFound = (y as FlagFound)
              if(!flagFound || !flagFound.flag) return 0
              return flagFound.flag.points
            }).reduce((previous, current) => previous + current)
    })).sort((x, y) => x.points > y.points ? 1 : -1)

    res.json(ranking)
  },
)

export default router
