"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Jira_1 = __importDefault(require("../src/Jira"));
const IncomingHttpRequest_1 = require("../models/IncomingHttpRequest");
class RoutesManager {
    constructor() {
        this.router = express_1.default.Router();
        this.initRoutes();
    }
    initRoutes() {
        const jiraModule = new Jira_1.default();
        this.router.get("/healthcheck/", (req, res) => {
            console.log(`Received health check request.`);
            res.json({
                status: 200,
                message: `Fire !!`,
            });
        });
        this.router.post("/", (req, res) => {
            const { apiVersion, kind, metadata, spec } = req.body, requestBody = new IncomingHttpRequest_1.IncomingHttpRequest(apiVersion, kind, metadata, spec);
            jiraModule
                .createJiraIssue(requestBody)
                .then((data) => {
                console.log(`Received Jira issue creation request`);
                res.send(data.data);
            })
                .catch((err) => {
                console.log(err, "????");
                res.send(err);
            });
        });
    }
}
exports.default = RoutesManager;
