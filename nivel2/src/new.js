var fs = require('fs');
var crypto = require('crypto');
var inspect = require('util').inspect;
var Docker = require('dockerode')

var ssh2 = require('ssh2');
var utils = ssh2.utils;

const docker = new Docker()
const TIMEOUT = 100000

 
var allowedUser = Buffer.from('foo');
var allowedPassword = Buffer.from('bar');
var allowedPubKey = utils.parseKey(fs.readFileSync('/home/lucasbertin/.ssh/id_rsa.pub'));
 
new ssh2.Server({
  hostKeys: [fs.readFileSync('/home/lucasbertin/.ssh/id_rsa')]
}, function(client) {
  console.log('Client connected!');
 
  client.on('authentication', function(ctx) {
    var user = Buffer.from(ctx.username);
    if (user.length !== allowedUser.length
        || !crypto.timingSafeEqual(user, allowedUser)) {
      return ctx.reject();
    }
 
    switch (ctx.method) {
      case 'password':
        var password = Buffer.from(ctx.password);
        if (password.length !== allowedPassword.length
            || !crypto.timingSafeEqual(password, allowedPassword)) {
          return ctx.reject();
        }
        break;
      case 'publickey':
        var allowedPubSSHKey = allowedPubKey.getPublicSSH();
        if (ctx.key.algo !== allowedPubKey.type
            || ctx.key.data.length !== allowedPubSSHKey.length
            || !crypto.timingSafeEqual(ctx.key.data, allowedPubSSHKey)
            || (ctx.signature && allowedPubKey.verify(ctx.blob, ctx.signature) !== true)) {
          return ctx.reject();
        }
        break;
      default:
        return ctx.reject();
    }
 
    ctx.accept();
  }).on('ready', function() {
    console.log('Client authenticated!');
 
    client.on('session', function(accept, reject) {
      var session = accept();
      session.once('exec', function(accept, reject, info) {
        console.log('Client wants to execute: ' + inspect(info.command));
        var stream = accept();
        stream.stderr.write('Oh no, the dreaded errors!\n');
        stream.write('Just kidding about the errors!\n');
        stream.exit(0);
        stream.end();
      });

      session.on('pty', function(accept, reject, info) {
        accept();
      });

      
      session.once('shell', (accept) => {
        console.log('Client wants a shell!')
        let container;

        // Accept the connection and get a bidirectional stream.
        const stream = accept()

        var cleanupStream = function() {
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
          Cmd: [ '/bin/bash' ],
          Image: 'ubuntu:latest',
          OpenStdin: true,
          Tty: true
          }, function (err, newContainer) {
          if (err) {
            console.log(err)
            return
          }

          container = newContainer

          if(!container)
            return 

          container.attach({
            stream: true, stdin: true, stdout: true, stderr: true
          }, function (_, ttyStream) {
            if(!newContainer || !ttyStream)
              return

            console.log("Attached to container " + newContainer.id)

            ttyStream.pipe(stream);

            // Attach client stream to stdin of container
            stream.pipe(ttyStream);

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



    });
  }).on('end', function() {
    console.log('Client disconnected');
  });
}).listen(2222, '0.0.0.0', function() {
  console.log('Listening on port ' + this.address().port);
});
