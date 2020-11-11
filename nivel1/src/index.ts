import support from 'source-map-support'
import app from './app'

support.install()

app.listen(4444, () => 
  console.log('Application up an running under port 4444'))
