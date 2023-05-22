"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Jira_1 = __importDefault(require("../src/Jira"));
class RoutesManager {
    constructor() {
        this.router = express_1.default.Router();
        this.initRoutes();
    }
    initRoutes() {
        const jiraModule = new Jira_1.default();
        this.router.get("/healthcheck/", (req, res) => {
            res.json({
                status: 200,
                message: `Fire !!`,
            });
        });
        this.router.post("/", (req, res) => {
            jiraModule
                .createJiraIssue(req.body)
                .then((data) => {
                res.send(data.data);
            })
                .catch((err) => {
                console.log(err);
                res.send(err);
            });
        });
    }
}
exports.default = RoutesManager;
