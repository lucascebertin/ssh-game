import env from 'dotenv'

env.config({ path: `${__dirname}/../.env` })

export default {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    uri() {
      return `mongodb://${this.userName}:${this.password}@${this.host}:${this.port}/${this.name}`
    },
  },
}
