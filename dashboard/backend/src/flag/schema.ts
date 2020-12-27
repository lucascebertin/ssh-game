import mongoose, { Schema } from 'mongoose'
import { Flag, FlagFound } from './flag'

const pluralize = 'flagsFound'
const schemaFlag = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    required: true,
    unique: false,
  }
})

export const FlagModel = mongoose.model<Flag>('flag', schemaFlag, 'flags')

export const schemaFlagFound = new mongoose.Schema({
  flag: {
    type: Schema.Types.ObjectId,
    ref: FlagModel,
    required: true
  },
  when: {
    type: Date,
    default: Date.now,
    required: true,
  }
}, { collection: pluralize })

export const FlagFoundModel = mongoose.model<FlagFound>('flagsFound', schemaFlagFound, 'flagsFound')
