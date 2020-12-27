import config from '../../config'
import axios from 'axios'
import { Rank } from './rank'
import { Flag } from './flag'

export function obterRanking(): Promise<Rank[]> {
  const url = config.API.RANKING
  const token = localStorage.getItem('token')
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  }

  return axios
    .get<Rank[]>(url, axiosConfig)
    .then((response) => response && response.data)
}

export function enviarFlag(flag: string): Promise<boolean> {
  const url = config.API.FLAG
  const token = localStorage.getItem('token')
  const data: Flag = { flag }
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  }

  return axios
    .post<Flag>(url, data, axiosConfig)
    .then(() => true)
    .catch(() => false)
}
