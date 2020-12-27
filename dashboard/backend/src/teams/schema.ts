import mongoose, { Schema } from 'mongoose'
import { Team } from './team'
import { FlagFoundModel, schemaFlagFound } from '../flag/schema'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  flags: [schemaFlagFound]
})

const Model = mongoose.model<Team>('team', schema)

export const build = (obj: Team) => new Model(obj)
export default Model
