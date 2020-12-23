import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
import { FlagModel  } from './schema'
import TeamModel from '../teams/schema'
import { FlagFoundModel } from '../flag/schema'

const router = Router().post(
  '/flag',
  authenticate('bearer', { session: false }),
  async (req: Request, res: Response) => {
    const { flag } = req.body

    if(!flag) return res.status(400).send('no flag?')

    const flagFound = await FlagModel.findOne({ title: flag })
    if (!flagFound || !flagFound._id) return res.status(400).send()

    const teamId = req.user
    const teamFound = await TeamModel.findById(teamId)

    if(!teamFound) return res.status(400).send('no team?')

    const alreadyFound = teamFound.flags 
      && teamFound.flags.length > 0 
      && teamFound.flags.find(x => 
        x.flag._id && x.flag._id.toString() === flagFound.id)

    if (!teamFound || alreadyFound)
      return res.status(400).send('already flagged?')
      
    const flagItem = new FlagFoundModel({ flag: flagFound, when: Date.now() })

    if(typeof teamFound.flags === 'undefined') 
      teamFound.flags = []
    
    teamFound.flags.push(flagItem)

    await TeamModel.findByIdAndUpdate(teamId, teamFound, { upsert: false, useFindAndModify: false,  })

    res.json({ success: true })
  },
)

export default router
