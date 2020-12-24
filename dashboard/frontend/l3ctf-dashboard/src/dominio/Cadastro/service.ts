import config from '../../config'
import axios, { AxiosResponse } from 'axios'
import { Time } from './time'

interface CadastroResponse {
  token: string
}

export function cadastrar(nome: string): Promise<string> {
  const url = config.API.TEAM
  const data: Time = { name: nome }

  return axios
    .post<Time, AxiosResponse<CadastroResponse>>(url, data)
    .then((response) => response.data.token)
}
