"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_manager_1 = __importDefault(require("./routes/routes-manager"));
require("dotenv").config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.port = parseInt(process.env.PORT || "3005") || 3005;
        const routesManager = new routes_manager_1.default();
        this.app.use(routesManager.router);
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server started and listening on ${this.port}`);
        });
    }
}
exports.default = Server;
const server = new Server();
server.start();
