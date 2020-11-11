import { Request, Response, Router } from 'express'
import child_process from 'child_process'

export const post = (req: Request, res: Response) => {
  //TODO: validar quando não tiver payload correto, voltar badrequest
  //
  const dominioOrIp = req.body.pinger
  //código extremamente inseguro, NUNCA USE ISSO EM UMA APLICAÇÃO REAL!
  const sh3ll = `cd /home/temp_user && su -c 'rbash -c "ping -c 2 ${dominioOrIp}"' temp_user`

  child_process.exec(sh3ll, (_, stdout, stderr) => {
    res.send(`${stderr}\n${stdout}`)
  })
}

export default Router()
  .post('/api/tools/ping', post)

