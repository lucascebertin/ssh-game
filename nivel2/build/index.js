"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dockerode_1 = __importDefault(require("dockerode"));
const ssh2_1 = __importDefault(require("ssh2"));
const node_rsa_1 = __importDefault(require("node-rsa"));
const docker = new dockerode_1.default();
const key = new node_rsa_1.default({ b: 1024 });
const privKey = key.exportKey('pkcs1-private-pem');
const TIMEOUT = 100000;
new ssh2_1.default.Server({
    hostKeys: [privKey],
    banner: "Welcome!",
    ident: "ssh-sandboxes",
}, (client) => {
    console.log("Client connected!");
    client.on('authentication', (ctx) => {
        // Blindly accept all connections. Only one per IP address allowed, though.
        ctx.accept();
    }).on('ready', () => {
        console.log('Client authenticated!');
        client.on('session', function (accept) {
            console.log('Client wants new session');
            var session = accept();
            session.once('pty', (accept) => {
                accept();
            });
            session.once('shell', (accept) => {
                console.log('Client wants a shell!');
                let container;
                // Accept the connection and get a bidirectional stream.
                const stream = accept();
                var cleanupStream = function () {
                    if (stream.timeoutId) {
                        clearTimeout(stream.timeoutId);
                    }
                    if (container) {
                        container.remove({ force: true }, function (err) {
                            if (err && container) {
                                console.log('Error removing container %s: %s', container.id, err);
                            }
                            console.log('Removed container');
                        });
                    }
                };
                docker.createContainer({
                    Cmd: ['/bin/bash'],
                    Image: 'ubuntu:latest',
                    OpenStdin: true,
                    Tty: true
                }, function (err, newContainer) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    container = newContainer;
                    if (!container)
                        return;
                    container.attach({
                        stream: true, stdin: true, stdout: true, stderr: true
                    }, function (_, ttyStream) {
                        if (!newContainer || !ttyStream)
                            return;
                        console.log("Attached to container " + newContainer.id);
                        ttyStream.pipe(stream);
                        // Attach client stream to stdin of container
                        stream.pipe(ttyStream);
                        // Start the container
                        newContainer.start((err) => {
                            if (err) {
                                console.error('Unable to start container', err);
                                return;
                            }
                            console.log("Container started!");
                        });
                    });
                });
                const onTimeout = function () {
                    console.log('Closing session due to timeout');
                    stream.close();
                };
                stream.on('data', function () {
                    // Reset timeout
                    if (stream.timeoutId) {
                        clearTimeout(stream.timeoutId);
                    }
                    stream.timeoutId = setTimeout(onTimeout, TIMEOUT);
                });
                stream.on('end', () => {
                    console.log('Stream disconnected!');
                    cleanupStream();
                });
            });
        });
    }).on('abort', () => {
        console.log('Client aborted!');
    }).on('end', () => {
        console.log('Client disconnected!');
    });
}).listen(2222, '127.0.0.1', () => {
    console.log('Listening on port 2222');
});
//# sourceMappingURL=index.js.map