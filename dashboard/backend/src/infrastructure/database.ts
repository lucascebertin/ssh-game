import mongoose from 'mongoose'
import config from '../config'

export const connect = () =>
  new Promise<void>((resolve, reject) =>
    mongoose.connect(
      config.db.uri(),
      { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
      (error) => {
        if (error) return reject(error)
        resolve()
      },
    ),
  )
