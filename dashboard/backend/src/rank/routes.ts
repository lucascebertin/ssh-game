import { Router, Request, Response } from 'express'
import TeamModel from '../teams/schema'
import { authenticate } from 'passport'

const router = Router().get(
  '/rank',
  authenticate('bearer', { session: false }),
  async (_: Request, res: Response) => {
    const allTeams = await TeamModel.find().populate('flags.flag').exec()

    if (!allTeams) return res.status(400).send()

    const ranking = allTeams.map((x) => ({
      team: x.name,
      points:
        x.flags && x.flags.length <= 0
          ? { total: 0, time: 0 }
          : x.flags
              .map((flagFound) => {
                if (!flagFound || !flagFound.flag || !flagFound.when)
                  return { total: 0, time: 0 }
                return { total: flagFound.flag.points, time: flagFound.when }
              })
              .reduce((previous, current) => ({
                total: previous.total + current.total,
                time: previous.time + current.time,
              })),
    }))

    const sortedRanking = ranking.sort((a, b) =>
      a.points.total > b.points.total
        ? -1
        : a.points.total < b.points.total
        ? 1
        : a.points.total === b.points.total && a.points.time < b.points.time
        ? -1
        : 1,
    ).map((rank, index) => ({ team: rank.team, points: rank.points.total, position: index + 1 }))

    res.json(sortedRanking)
  },
)

export default router
