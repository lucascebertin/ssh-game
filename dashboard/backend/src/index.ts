import support from 'source-map-support'
import app from './app'
import config from './config'
import { connect } from './infrastructure/database'

support.install()

connect()
  .then(() => {
    app.listen(config.port, () =>
      console.log(`Application up an running under port ${config.port}`),
    )
  })
  .catch((error) => {
    console.error(error)
  })
