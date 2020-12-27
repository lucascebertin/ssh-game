import { Document, Schema } from 'mongoose'
import { FlagFound } from '../flag/flag'

export interface Team extends Document<Schema.Types.ObjectId> {
  name: string
  token: string
  flags: Array<FlagFound>
}
