import mongoose from 'mongoose'
import { Team } from './team'

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
})

const Model = mongoose.model('team', schema)

export const build = (obj: Team) => new Model(obj)

export default Model
