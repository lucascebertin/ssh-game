"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./p1nger/route"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.default = express_1.default()
    .use(express_1.default.static('html'))
    .use(body_parser_1.default.json())
    .use(route_1.default);
//# sourceMappingURL=app.js.map