import { Document, Schema } from 'mongoose'

export interface Flag extends Document<Schema.Types.ObjectId> {
  title: string
  points: number
}

export interface FlagFound extends Document<Schema.Types.ObjectId> {
  flag: Flag
  when: number
}
