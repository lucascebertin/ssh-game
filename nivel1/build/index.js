"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_map_support_1 = __importDefault(require("source-map-support"));
const app_1 = __importDefault(require("./app"));
source_map_support_1.default.install();
app_1.default.listen(4444, () => console.log('Application up an running under port 4444'));
//# sourceMappingURL=index.js.map