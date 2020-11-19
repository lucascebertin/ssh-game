import fs from 'fs'
import crypto from 'crypto'
import { inspect } from 'util'
import Docker, {Container} from 'dockerode'
import ssh2, { utils } from 'ssh2'
import { ParsedKey } from 'ssh2-streams'

const docker = new Docker()
const TIMEOUT = 100000
 
const allowedUser = Buffer.from('temp_user')
const allowedPassword = Buffer.from('isitthatsohard')

const start = () => {
  const pubKeyFile = fs.readFileSync('keys/id_rsa.pub')
  const allowedPubKey  = utils.parseKey(pubKeyFile) as ParsedKey

  new ssh2.Server({
    hostKeys: [fs.readFileSync('keys/id_rsa')]
  }, function(client) {
    console.log('Client connected!')
   
    client.on('authentication', function(ctx) {
      const user = Buffer.from(ctx.username)
      if (user.length !== allowedUser.length
          || !crypto.timingSafeEqual(user, allowedUser)) {
        return ctx.reject()
      }
   
      switch (ctx.method) {
        case 'password':
          const password = Buffer.from(ctx.password)
          if (password.length !== allowedPassword.length
              || !crypto.timingSafeEqual(password, allowedPassword)) {
            return ctx.reject()
          }
          break
        case 'publickey':
          if (allowedPubKey === null || allowedPubKey.getPublicSSH() === null)
            return ctx.reject()

          const allowedPubSSHKey = allowedPubKey.getPublicSSH()
          if (ctx.key.algo !== allowedPubKey.type
              || ctx.key.data.length !== allowedPubSSHKey.length
              || !crypto.timingSafeEqual(ctx.key.data, Buffer.from(allowedPubSSHKey))
              || (ctx.signature && allowedPubKey.verify(ctx.blob, ctx.signature) !== true)) {
            return ctx.reject()
          }
          break
        default:
          return ctx.reject()
      }
   
      ctx.accept()
    }).on('ready', function() {
      console.log('Client authenticated!')
   
      client.on('session', function(accept, reject) {
        const session = accept()
        session.once('exec', function(accept, reject, info) {
          console.log('Client wants to execute: ' + inspect(info.command))
          const stream = accept()
          stream.stderr.write('Oh no, the dreaded errors!\n')
          stream.write('Just kidding about the errors!\n')
          stream.exit(0)
          stream.end()
        })

        session.on('pty', function(accept, reject, info) {
          if(!accept)
            return

          accept()
        })

        
        session.once('shell', (accept) => {
          console.log('Client wants a shell!')
          let container : Container

          // Accept the connection and get a bidirectional stream.
          const stream = accept()

          const cleanupStream = function() {
            if (stream.timeoutId) {
              clearTimeout(stream.timeoutId)
            }

            if (container) {
              container.remove({force: true}, function(err) {
                if (err && container) {
                  console.log('Error removing container %s: %s', container.id, err)
                }
                console.log('Removed container')
              })
            }
          }

          docker.createContainer({
            Cmd: [ '/bin/sh' ],
            Image: 'l3ctf/nivel3:dev',
            OpenStdin: true,
            Tty: true
            }, function (err, newContainer) {
            if (err) {
              console.log(err)
              return
            }

            if(!newContainer)
              return

            container = newContainer

            if(!container)
              return 

            container.attach({
              stream: true, stdin: true, stdout: true, stderr: true
            }, function (_, ttyStream) {
              if(!newContainer || !ttyStream)
                return

              console.log("Attached to container " + newContainer.id)

              stream.write('L3CTF{y34h_y34h_g0t_th3_k3ys_n0t_th3_ch33s3_th3_k3ys}\n\n\n\r')
              stream.write('Agora, existe uma flag em /root/flag, boa sorte!\n\n\n\r')
              ttyStream.pipe(stream)

              // Attach client stream to stdin of container
              stream.pipe(ttyStream)

              // Start the container
              newContainer.start((err) => {
                if (err) {
                  console.error('Unable to start container', err)
                  return
                }
                console.log("Container started!")
              })
            })
          })

          const onTimeout = function () {
            console.log('Closing session due to timeout')
            stream.close()
          }

          stream.on('data', function() {
            // Reset timeout
            if (stream.timeoutId) {
              clearTimeout(stream.timeoutId)
            }
            stream.timeoutId = setTimeout(onTimeout, TIMEOUT)
          })

          stream.on('end', () => {
            console.log('Stream disconnected!')
            cleanupStream()
          })
        })



      })
    }).on('end', function() {
      console.log('Client disconnected')
    })
  }).listen(22222, '0.0.0.0', function() {
    console.log('Listening on port 22222')
  })
}

start()
