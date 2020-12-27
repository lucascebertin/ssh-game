import config from '../../config'
import axios, { AxiosResponse } from 'axios'
import { Login } from './login'

interface LoginResponse {
  bearerToken: string
}

export function login(token: string): Promise<string> {
  const url = config.API.LOGIN
  const data: Login = { token }

  return axios
    .post<Login, AxiosResponse<LoginResponse>>(url, data)
    .then((response) => response.data.bearerToken)
}
