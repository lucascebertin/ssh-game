import axios from 'axios'
import browserHistory from '../history'

const HTTP_UNAUTHORIZED = 401

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === HTTP_UNAUTHORIZED)
      return browserHistory.push('/login')
  },
)
