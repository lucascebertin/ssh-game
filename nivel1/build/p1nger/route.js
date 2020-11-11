"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const express_1 = require("express");
const child_process_1 = __importDefault(require("child_process"));
exports.post = (req, res) => {
    if (!!req.body.pinger)
        return res
            .status(400)
            .send('ping is empty');
    const dominioOrIp = req.body.pinger;
    //código extremamente inseguro, NUNCA USE ISSO EM UMA APLICAÇÃO REAL!
    const sh3ll = `cd /home/temp_user && su -c 'rbash -c "ping -c 2 ${dominioOrIp}"' temp_user`;
    child_process_1.default.exec(sh3ll, (_, stdout, stderr) => {
        res.send(`${stderr}\n${stdout}`);
    });
};
exports.default = express_1.Router()
    .post('/api/tools/ping', exports.post);
//# sourceMappingURL=route.js.map